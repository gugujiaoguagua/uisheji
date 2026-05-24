import fs from "node:fs";
import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";

type KbMeta = Record<string, string | string[]>;

type KbEntry = {
  id: string;
  title: string;
  knowledge_type: string;
  authority_level: string;
  source_id: string;
  source_file: string;
  source_section: string;
  applicable_roles: string[];
  applicable_scenes: string[];
  version: string;
  kb_revision: string;
  status: string;
  review_status: string;
  summary: string;
  updated_at: string;
  tags: string[];
  category: string;
  filePath: string;
  relativePath: string;
  body: string;
};

type KbQueryPayload = {
  question?: string;
  scene_hint?: string;
  role_hint?: string;
  top_k?: number;
};

type AnswerSections = {
  internal_explanation?: string;
  basis_summary?: string[];
  risk_boundary?: string;
  next_step?: string;
};

type SourceRoot = {
  label: string;
  path: string;
};

type LastQueryStatus = {
  status: "idle" | "ok" | "fallback" | "error";
  checked_at?: string;
  question?: string;
  role_hint?: string;
  hit_count?: number;
  top_score?: number;
  confidence?: string;
  fallback_reason?: string;
  model?: string;
  latency_ms?: number;
  error?: string;
};

function loadLocalEnv() {
  for (const filename of [".env.local", ".env"]) {
    const envPath = path.resolve(process.cwd(), filename);
    if (!fs.existsSync(envPath)) continue;
    const raw = fs.readFileSync(envPath, "utf-8");
    for (const line of raw.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
    }
  }
}

loadLocalEnv();

const DEFAULT_DATA_ROOT = "D:/AI课程/1数据整理";
const DEFAULT_EXTRACTED_TEXT_ROOT = "D:/AI课程/4-17会议文档/1.提取文本";
const dataRoot = process.env.ZHIYOU_DATA_ROOT || DEFAULT_DATA_ROOT;
const extractedTextRoot = process.env.ZHIYOU_EXTRACTED_TEXT_ROOT || DEFAULT_EXTRACTED_TEXT_ROOT;
const kbRoot = process.env.ZHIYOU_KB_ROOT || path.join(dataRoot, "2.知识库");
const officialRoot = path.join(kbRoot, "4.正式知识库");
const structuredRoot = path.join(kbRoot, "5.结构化数据集");
const snapshotId = process.env.ZHIYOU_KB_SNAPSHOT_ID || "kb-v1.3-local";
const minimaxApiKey = process.env.MINIMAX_API_KEY || "";
const minimaxBaseUrl = process.env.MINIMAX_BASE_URL || "https://api.minimaxi.com/anthropic";
const minimaxModel = process.env.MINIMAX_MODEL || "MiniMax-M2.7";
const minimaxApiStyle = process.env.MINIMAX_API_STYLE || (minimaxBaseUrl.includes("/anthropic") ? "anthropic" : "openai");

let cachedEntries: KbEntry[] | null = null;
let cachedAt = "";
let cachedLoadStats: {
  source_file_count: number;
  parsed_entry_count: number;
  filtered_entry_count: number;
  roots: Array<SourceRoot & { exists: boolean; file_count: number; current_entry_count: number }>;
  recent_files: Array<{ name: string; relative_path: string; updated_at: string; size: number }>;
} | null = null;
let lastQueryStatus: LastQueryStatus = { status: "idle" };

function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.end(JSON.stringify(payload));
}

function sendNoContent(res: ServerResponse) {
  res.statusCode = 204;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.end();
}

function readJson(req: IncomingMessage): Promise<KbQueryPayload> {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function walkFiles(dir: string, extensions: string[]) {
  if (!fs.existsSync(dir)) return [] as string[];

  const result: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkFiles(fullPath, extensions));
      continue;
    }
    if (extensions.includes(path.extname(entry.name).toLowerCase())) {
      result.push(fullPath);
    }
  }
  return result;
}

function getSourceRoots(): SourceRoot[] {
  return [
    { label: "正式知识库", path: officialRoot },
    { label: "会议提取文本", path: extractedTextRoot },
    { label: "会议提取文本-流程清单", path: path.join(extractedTextRoot, "流程清单") },
    { label: "录音处理后", path: path.join(dataRoot, "录音", "录音处理后") },
    { label: "文档处理后", path: path.join(dataRoot, "文档", "文档处理后") },
    { label: "录音文本", path: path.join(dataRoot, "录音", "录音文本") },
    { label: "文档文本", path: path.join(dataRoot, "文档", "文档文本") },
  ];
}

function fileUpdatedAt(filePath: string) {
  try {
    return fs.statSync(filePath).mtime.toISOString();
  } catch {
    return "";
  }
}

function fileSize(filePath: string) {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

function isPathInside(filePath: string, root: string) {
  const relative = path.relative(root, filePath);
  return Boolean(relative) && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function cleanScalar(value: string) {
  const trimmed = value.trim();
  return trimmed.replace(/^['"]|['"]$/g, "");
}

function parseFrontmatter(markdown: string) {
  const match = markdown.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  if (!match) return { meta: {} as KbMeta, body: markdown };

  const meta: KbMeta = {};
  let currentKey = "";

  for (const line of match[1].split(/\r?\n/)) {
    const keyMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      const rawValue = keyMatch[2];
      meta[currentKey] = rawValue.trim() ? cleanScalar(rawValue) : [];
      continue;
    }

    const itemMatch = line.match(/^\s*-\s*(.*)$/);
    if (itemMatch && currentKey) {
      const currentValue = meta[currentKey];
      if (Array.isArray(currentValue)) {
        currentValue.push(cleanScalar(itemMatch[1]));
      }
    }
  }

  return { meta, body: markdown.slice(match[0].length).trim() };
}

function asString(meta: KbMeta, key: string) {
  const value = meta[key];
  return Array.isArray(value) ? value.join("、") : value || "";
}

function asArray(meta: KbMeta, key: string) {
  const value = meta[key];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function loadEntries() {
  if (cachedEntries) return cachedEntries;

  const roots = getSourceRoots();
  const files = Array.from(new Set([
    ...roots.flatMap((root) => walkFiles(root.path, [".md", ".txt"])),
    ...walkFiles(dataRoot, [".md", ".txt"]).filter((filePath) => path.dirname(filePath) === dataRoot),
  ]));
  const parsedEntries = files
    .map((filePath) => {
      const markdown = fs.readFileSync(filePath, "utf-8");
      const { meta, body } = parseFrontmatter(markdown);
      const id = asString(meta, "id") || path.basename(filePath, ".md");
      const relativePath = path.relative(dataRoot, filePath).replace(/\\/g, "/");
      const category = relativePath.split("/").slice(0, -1).join("/") || "根目录";

      return {
        id,
        title: asString(meta, "title") || id,
        knowledge_type: asString(meta, "knowledge_type"),
        authority_level: asString(meta, "authority_level"),
        source_id: asString(meta, "source_id"),
        source_file: asString(meta, "source_file"),
        source_section: asString(meta, "source_section"),
        applicable_roles: asArray(meta, "applicable_roles"),
        applicable_scenes: asArray(meta, "applicable_scenes"),
        version: asString(meta, "version") || "未标注版本",
        kb_revision: asString(meta, "kb_revision"),
        status: asString(meta, "status"),
        review_status: asString(meta, "review_status"),
        summary: asString(meta, "summary"),
        updated_at: asString(meta, "updated_at"),
        tags: asArray(meta, "tags"),
        category,
        filePath,
        relativePath,
        body,
      };
    });
  cachedEntries = parsedEntries.filter((entry) => {
    if (!entry.status && !entry.review_status) return true;
    return (!entry.status || entry.status === "current") && (!entry.review_status || entry.review_status === "approved");
  });

  cachedLoadStats = {
    source_file_count: files.length,
    parsed_entry_count: parsedEntries.length,
    filtered_entry_count: parsedEntries.length - cachedEntries.length,
    roots: roots.map((root) => {
      const rootFiles = files.filter((filePath) => isPathInside(filePath, root.path));
      return {
        ...root,
        exists: fs.existsSync(root.path),
        file_count: rootFiles.length,
        current_entry_count: cachedEntries?.filter((entry) => isPathInside(entry.filePath, root.path)).length || 0,
      };
    }),
    recent_files: files
      .map((filePath) => ({
        name: path.basename(filePath),
        relative_path: path.relative(dataRoot, filePath).replace(/\\/g, "/"),
        updated_at: fileUpdatedAt(filePath),
        size: fileSize(filePath),
      }))
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
      .slice(0, 8),
  };

  cachedAt = new Date().toISOString();
  return cachedEntries;
}

function getHealth() {
  const entries = loadEntries();
  const stats = cachedLoadStats;
  return {
    kb_snapshot_id: snapshotId,
    data_root: dataRoot,
    source_root: officialRoot,
    structured_root: structuredRoot,
    entry_count: entries.length,
    source_file_count: stats?.source_file_count || entries.length,
    parsed_entry_count: stats?.parsed_entry_count || entries.length,
    filtered_entry_count: stats?.filtered_entry_count || 0,
    structured_file_count: walkFiles(structuredRoot, [".md", ".txt", ".csv"]).length,
    source_roots: stats?.roots || [],
    recent_files: stats?.recent_files || [],
    minimax: {
      configured: Boolean(minimaxApiKey),
      model: minimaxModel,
      api_style: minimaxApiStyle,
      base_url: minimaxBaseUrl.replace(/sk-[A-Za-z0-9_-]+/g, "[redacted]"),
    },
    filters: {
      status: "current",
      review_status: "approved",
      answer_source: "2.知识库/4.正式知识库",
    },
    last_query: lastQueryStatus,
    indexed_at: cachedAt,
  };
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[\s`*_#|:：，。；;、（）()\[\]【】《》“”"']/g, "");
}

function buildTokens(question: string) {
  const compact = normalizeText(question);
  const words = question
    .toLowerCase()
    .split(/[\s,，。；;、？?！!：:（）()\[\]【】《》“”"']+/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 2);

  const chineseTerms = Array.from(compact.matchAll(/[\u4e00-\u9fa5]{2,}/g)).map((item) => item[0]);
  const bigrams: string[] = [];
  for (const term of chineseTerms) {
    for (let index = 0; index < term.length - 1; index += 1) {
      bigrams.push(term.slice(index, index + 2));
    }
  }

  return Array.from(new Set([...words, ...chineseTerms, ...bigrams])).filter((token) => token.length >= 2);
}

function roleKeywords(roleHint?: string) {
  if (roleHint === "designer") return ["设计", "设计师"];
  if (roleHint === "community_ops" || roleHint === "ops_manager") return ["运营", "门店", "社群", "小区"];
  if (roleHint === "sales") return ["销售", "家居顾问", "客户"];
  return [];
}

function scoreEntry(entry: KbEntry, tokens: string[], payload: KbQueryPayload) {
  const title = normalizeText(entry.title);
  const summary = normalizeText(entry.summary);
  const meta = normalizeText([
    entry.knowledge_type,
    entry.category,
    entry.source_file,
    ...entry.tags,
    ...entry.applicable_roles,
    ...entry.applicable_scenes,
  ].join(" "));
  const body = normalizeText(entry.body.slice(0, 12000));
  let score = 0;

  for (const token of tokens) {
    const normalizedToken = normalizeText(token);
    if (!normalizedToken) continue;
    if (title.includes(normalizedToken)) score += 12;
    if (summary.includes(normalizedToken)) score += 8;
    if (meta.includes(normalizedToken)) score += 6;
    if (body.includes(normalizedToken)) score += normalizedToken.length >= 3 ? 3 : 1;
  }

  for (const token of roleKeywords(payload.role_hint)) {
    const normalizedToken = normalizeText(token);
    if (meta.includes(normalizedToken) || summary.includes(normalizedToken)) score += 4;
  }

  if (payload.scene_hint) {
    const scene = normalizeText(payload.scene_hint);
    if (meta.includes(scene) || summary.includes(scene)) score += 6;
  }

  if (entry.authority_level === "official") score += 1;
  if (entry.kb_revision === "r3") score += 1;
  return score;
}

function stripMarkdown(value: string) {
  return value
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/^#+\s*/gm, "")
    .trim();
}

function extractDirectAnswer(entry: KbEntry) {
  const conclusion = entry.body.match(/(?:^|\n)#*\s*一句话结论\s*\n([\s\S]*?)(?=\n#|$)/);
  const text = conclusion?.[1]
    ?.split(/\r?\n/)
    .map((line) => stripMarkdown(line.replace(/^[-*\s]+/, "").trim()))
    .filter(Boolean)
    .join(" ");

  return text || entry.summary || `${entry.title}已有正式知识库条目，可按来源口径回答。`;
}


function extractExcerpts(entry: KbEntry, tokens: string[]) {
  const blocks = entry.body
    .split(/\n(?=#{1,3}\s)|\n{2,}/)
    .map((block) => block.replace(/\r/g, "").trim())
    .filter((block) => block.length > 24 && !block.startsWith("---"));

  const ranked = blocks
    .map((block) => {
      const normalized = normalizeText(block);
      const score = tokens.reduce((sum, token) => sum + (normalized.includes(normalizeText(token)) ? 1 : 0), 0);
      return { block, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((item) => item.block.slice(0, 260));

  return ranked.length ? ranked : [extractDirectAnswer(entry).slice(0, 260)];
}

function getMatchedTerms(entry: KbEntry, tokens: string[]) {
  const searchable = normalizeText([
    entry.title,
    entry.summary,
    entry.knowledge_type,
    entry.category,
    entry.source_file,
    entry.source_section,
    ...entry.tags,
    ...entry.applicable_roles,
    ...entry.applicable_scenes,
    entry.body.slice(0, 12000),
  ].join(" "));

  return Array.from(new Set(tokens
    .map((token) => token.trim())
    .filter((token) => token.length >= 2 && searchable.includes(normalizeText(token)))))
    .slice(0, 8);
}

function buildMatchReason(entry: KbEntry, matchedTerms: string[]) {
  const reasons: string[] = [];
  if (entry.authority_level === "official" || entry.review_status === "approved") reasons.push("正式知识库条目");
  if (entry.kb_revision) reasons.push(`知识版本 ${entry.kb_revision}`);
  if (matchedTerms.length) reasons.push(`命中 ${matchedTerms.slice(0, 4).join("、")}`);
  if (entry.applicable_roles.length) reasons.push(`适用 ${entry.applicable_roles.slice(0, 3).join("、")}`);
  return reasons.length ? reasons : ["内容与问题语义相关"];
}

function buildAnswer(question: string, hits: Array<{ entry: KbEntry; score: number }>, tokens: string[]) {
  const primary = hits[0].entry;
  const directAnswer = extractDirectAnswer(primary);
  const excerpts = hits.slice(0, 3).flatMap((hit) => extractExcerpts(hit.entry, tokens).slice(0, 1));
  const answerSections = {
    internal_explanation: directAnswer,
    basis_summary: excerpts,
    risk_boundary: "涉及规则、价格、责任界定或交期承诺时，以当前正式知识库最新发布口径为准；未命中的细节不要自行承诺。",
    next_step: "如客户追问具体尺寸、价格、版本或责任归属，建议继续补充关键信息后再次检索，或转人工复核。",
  };

  return {
    direct_answer: directAnswer,
    answer: [
      `**结论：**${directAnswer}`,
      "",
      "**依据摘要：**",
      ...answerSections.basis_summary.map((excerpt) => `• ${excerpt}`),
      "",
      `**风险提醒：**${answerSections.risk_boundary}`,
      "",
      `**下一步建议：**${answerSections.next_step}`,
    ].join("\n"),
    answer_sections: answerSections,
    citations: hits.slice(0, 5).map(({ entry, score }) => {
      const matchedTerms = getMatchedTerms(entry, tokens);
      return {
        id: entry.id,
        title: entry.title,
        knowledge_type: entry.knowledge_type,
        authority_level: entry.authority_level,
        source_id: entry.source_id,
        source_file: entry.source_file,
        source_section: entry.source_section,
        version: entry.version,
        kb_revision: entry.kb_revision,
        relative_path: entry.relativePath,
        category: entry.category,
        updated_at: entry.updated_at,
        applicable_roles: entry.applicable_roles,
        applicable_scenes: entry.applicable_scenes,
        tags: entry.tags,
        matched_terms: matchedTerms,
        match_reason: buildMatchReason(entry, matchedTerms),
        score,
        excerpt: extractExcerpts(entry, tokens)[0],
      };
    }),
  };
}

function stripThinkTags(value: string) {
  return value.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
}

function cleanModelJsonText(value: string) {
  return stripThinkTags(value)
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

function isJsonLikeText(value: string) {
  const cleaned = cleanModelJsonText(value);
  return (
    /^\s*[{[]/.test(cleaned) ||
    cleaned.includes('\\"direct_answer\\"') ||
    cleaned.includes('"direct_answer"') ||
    cleaned.includes('\\"answer_sections\\"') ||
    cleaned.includes('"answer_sections"')
  );
}

function pickFirstSentence(value: string) {
  return stripMarkdown(value)
    .split(/\n+/)
    .map((line) => line.trim())
    .find(Boolean)
    ?.slice(0, 180) || "我先基于知识库给您核实口径。";
}

function extractJsonObject(value: string): Record<string, unknown> | null {
  const cleaned = cleanModelJsonText(value);
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  const candidates = [cleaned];

  if (start >= 0 && end > start) {
    candidates.push(cleaned.slice(start, end + 1));
  }

  if (cleaned.includes('\\"')) {
    candidates.push(cleaned.replace(/\\"/g, '"').replace(/\\n/g, "\n"));
    if (start >= 0 && end > start) {
      candidates.push(cleaned.slice(start, end + 1).replace(/\\"/g, '"').replace(/\\n/g, "\n"));
    }
  }

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      if (typeof parsed === "string") {
        const nested = extractJsonObject(parsed);
        if (nested) return nested;
      }
      if (parsed && typeof parsed === "object") {
        return parsed as Record<string, unknown>;
      }
    } catch {
      // Try the next candidate. MiniMax occasionally returns escaped JSON text.
    }
  }

  return null;
}

function asStringValue(value: unknown) {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) {
    return value.map((item) => asStringValue(item)).filter(Boolean).join("\n");
  }
  return "";
}

function asStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => asStringValue(item)).filter(Boolean);
  }
  const text = asStringValue(value);
  if (!text) return [];
  return text
    .split(/\n|(?:^|\s)[•\-]\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeModelObject(value: unknown): Record<string, unknown> | null {
  if (!value) return null;
  if (typeof value === "string") return extractJsonObject(value);
  if (typeof value === "object") return value as Record<string, unknown>;
  return null;
}

function hasUsefulSections(sections: AnswerSections) {
  return Boolean(
    sections.internal_explanation ||
    sections.basis_summary?.length ||
    sections.risk_boundary ||
    sections.next_step
  );
}

function normalizeAnswerSections(source: Record<string, unknown>, fallback: AnswerSections): AnswerSections {
  const nestedSections = normalizeModelObject(source.answer_sections) || {};
  const merged = {
    ...source,
    ...nestedSections,
  };
  const sections: AnswerSections = {
    internal_explanation: asStringValue(
      merged.internal_explanation || merged.internal || merged.explanation || merged.detail || merged.answer
    ),
    basis_summary: asStringArray(merged.basis_summary || merged.basis || merged.evidence || merged.sources),
    risk_boundary: asStringValue(merged.risk_boundary || merged.risk || merged.boundary || merged.warning),
    next_step: asStringValue(merged.next_step || merged.next_steps || merged.suggestion || merged.action),
  };

  return {
    internal_explanation: sections.internal_explanation || fallback.internal_explanation,
    basis_summary: sections.basis_summary?.length ? sections.basis_summary.slice(0, 5) : fallback.basis_summary,
    risk_boundary: sections.risk_boundary || fallback.risk_boundary,
    next_step: sections.next_step || fallback.next_step,
  };
}

function buildPlainAnswerFromSections(sections: AnswerSections) {
  return [
    sections.internal_explanation ? `**详细解释：**${sections.internal_explanation}` : "",
    sections.basis_summary?.length ? ["", "**依据摘要：**", ...sections.basis_summary.map((item) => `• ${item}`)].join("\n") : "",
    sections.risk_boundary ? `\n**风险提醒：**${sections.risk_boundary}` : "",
    sections.next_step ? `\n**下一步建议：**${sections.next_step}` : "",
  ].filter(Boolean).join("\n");
}

function buildMiniMaxPrompt(question: string, hits: Array<{ entry: KbEntry; score: number }>, tokens: string[]) {
  const contexts = hits.slice(0, 5).map(({ entry }, index) => {
    const excerpts = extractExcerpts(entry, tokens).join("\n");
    return [
      `[K${index + 1}] ${entry.title}`,
      `来源：${entry.relativePath}`,
      `版本：${entry.version || "未标注版本"} ${entry.kb_revision || ""}`,
      excerpts,
    ].join("\n");
  });

  return [
    "你是智柚内部知识库问答助手。",
    "必须只依据下面提供的知识库片段回答；如果片段不足，明确说明不能承诺，不要编造。",
    "输出严格 JSON 对象，不要输出 Markdown 代码块，也不要把 JSON 再包成字符串。",
    '{"direct_answer":"可直接对客户说的话，80字以内","answer_sections":{"internal_explanation":"内部解释","basis_summary":["依据1","依据2"],"risk_boundary":"风险边界","next_step":"下一步建议"}}',
    "",
    `用户问题：${question}`,
    "",
    "知识库片段：",
    contexts.join("\n\n---\n\n"),
  ].join("\n");
}

function parseMiniMaxAnswer(content: string, question: string, hits: Array<{ entry: KbEntry; score: number }>, tokens: string[]) {
  const fallback = buildAnswer(question, hits, tokens);
  const parsed = extractJsonObject(content);
  const nestedDirectAnswer = normalizeModelObject(parsed?.direct_answer);
  const nestedAnswer = normalizeModelObject(parsed?.answer);
  const nestedSections = normalizeModelObject(parsed?.answer_sections);
  const merged = {
    ...(parsed || {}),
    ...(nestedAnswer || {}),
    ...(nestedDirectAnswer || {}),
    ...(nestedSections ? { answer_sections: nestedSections } : {}),
  };

  const sections = normalizeAnswerSections(merged, fallback.answer_sections);
  const rawDirectAnswer = asStringValue(merged.direct_answer);
  const directAnswer = rawDirectAnswer && !isJsonLikeText(rawDirectAnswer)
    ? rawDirectAnswer
    : sections.internal_explanation || fallback.direct_answer;
  const rawAnswer = asStringValue(merged.answer);
  const plainAnswer = hasUsefulSections(sections)
    ? buildPlainAnswerFromSections(sections)
    : (!isJsonLikeText(rawAnswer) ? stripThinkTags(rawAnswer) : fallback.answer);

  return {
    direct_answer: stripMarkdown(directAnswer || pickFirstSentence(plainAnswer)),
    answer: plainAnswer || buildAnswer(question, hits, tokens).answer,
    answer_sections: sections,
  };
}

async function callMiniMaxOpenAI(question: string, hits: Array<{ entry: KbEntry; score: number }>, tokens: string[]) {
  const response = await fetch(`${minimaxBaseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${minimaxApiKey}`,
    },
    body: JSON.stringify({
      model: minimaxModel,
      messages: [
        {
          role: "system",
          content: "你是严谨的企业知识库问答助手。只基于给定资料回答，避免过度承诺。",
        },
        {
          role: "user",
          content: buildMiniMaxPrompt(question, hits, tokens),
        },
      ],
      temperature: 0.3,
      max_tokens: 900,
    }),
  });

  if (!response.ok) {
    throw new Error(`MiniMax 调用失败：${response.status}`);
  }

  const data = await response.json() as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content || "";
  return parseMiniMaxAnswer(content, question, hits, tokens);
}

async function callMiniMaxAnthropic(question: string, hits: Array<{ entry: KbEntry; score: number }>, tokens: string[]) {
  const baseUrl = minimaxBaseUrl.replace(/\/$/, "");
  const endpoint = baseUrl.endsWith("/v1") ? `${baseUrl}/messages` : `${baseUrl}/v1/messages`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
      "x-api-key": minimaxApiKey,
    },
    body: JSON.stringify({
      model: minimaxModel,
      max_tokens: 900,
      system: "你是严谨的企业知识库问答助手。只基于给定资料回答，避免过度承诺。",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: buildMiniMaxPrompt(question, hits, tokens),
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`MiniMax 调用失败：${response.status}`);
  }

  const data = await response.json() as {
    content?: Array<{ type?: string; text?: string; thinking?: string }>;
  };
  const content = data.content
    ?.filter((block) => block.type === "text" && block.text)
    .map((block) => block.text)
    .join("\n") || "";
  return parseMiniMaxAnswer(content, question, hits, tokens);
}

async function callMiniMax(question: string, hits: Array<{ entry: KbEntry; score: number }>, tokens: string[]) {
  if (!minimaxApiKey) return null;
  return minimaxApiStyle === "anthropic"
    ? callMiniMaxAnthropic(question, hits, tokens)
    : callMiniMaxOpenAI(question, hits, tokens);
}

async function queryKnowledgeBase(payload: KbQueryPayload) {
  const startedAt = Date.now();
  const question = payload.question?.trim() || "";
  const topK = Math.min(Math.max(payload.top_k || 5, 1), 10);
  const entries = loadEntries();
  const tokens = buildTokens(question);

  if (!question || tokens.length === 0) {
    lastQueryStatus = {
      status: "fallback",
      checked_at: new Date().toISOString(),
      question,
      role_hint: payload.role_hint,
      hit_count: 0,
      fallback_reason: "empty_question",
      latency_ms: Date.now() - startedAt,
    };
    return {
      answer: "知识库暂无依据：请先输入完整问题。",
      direct_answer: "请先输入完整问题，我再检索正式知识库。",
      confidence: "low",
      citations: [],
      fallback: true,
      fallback_reason: "empty_question",
      trace_id: `kb-${Date.now()}`,
      kb_snapshot_id: snapshotId,
    };
  }

  const hits = entries
    .map((entry) => ({ entry, score: scoreEntry(entry, tokens, payload) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  if (!hits.length || hits[0].score < 6) {
    lastQueryStatus = {
      status: "fallback",
      checked_at: new Date().toISOString(),
      question,
      role_hint: payload.role_hint,
      hit_count: hits.length,
      top_score: hits[0]?.score || 0,
      fallback_reason: "low_confidence_or_no_hit",
      latency_ms: Date.now() - startedAt,
    };
    return {
      answer: "知识库暂无足够依据，不能直接给客户承诺。建议补充产品型号、空间场景、价格口径或订单状态后再查，或发起知识补充。",
      direct_answer: "这个问题我先帮您核实一下，稍后把准确口径回给您。",
      confidence: "low",
      citations: [],
      fallback: true,
      fallback_reason: "low_confidence_or_no_hit",
      trace_id: `kb-${Date.now()}`,
      kb_snapshot_id: snapshotId,
    };
  }

  const confidence = hits[0].score >= 18 ? "high" : "mid";
  const extractiveAnswer = buildAnswer(question, hits, tokens);
  let llmAnswer: { direct_answer: string; answer: string; answer_sections?: AnswerSections } | null = null;
  let modelError = "";

  try {
    llmAnswer = await callMiniMax(question, hits, tokens);
  } catch (error) {
    modelError = error instanceof Error ? error.message : "调用失败";
    llmAnswer = {
      direct_answer: extractiveAnswer.direct_answer,
      answer: `${extractiveAnswer.answer}\n\n**MiniMax 状态：**${modelError}，当前已回退为本地知识库摘要。`,
      answer_sections: extractiveAnswer.answer_sections,
    };
  }

  lastQueryStatus = {
    status: modelError ? "fallback" : "ok",
    checked_at: new Date().toISOString(),
    question,
    role_hint: payload.role_hint,
    hit_count: hits.length,
    top_score: hits[0].score,
    confidence,
    fallback_reason: modelError ? "minimax_error_local_extractive_used" : undefined,
    model: llmAnswer ? minimaxModel : "local-extractive",
    latency_ms: Date.now() - startedAt,
    error: modelError || undefined,
  };

  return {
    ...extractiveAnswer,
    ...(llmAnswer || {}),
    confidence,
    fallback: false,
    trace_id: `kb-${Date.now()}`,
    kb_snapshot_id: snapshotId,
    model: llmAnswer ? minimaxModel : "local-extractive",
  };
}

type KbServer = {
  middlewares: {
    use: (path: string, handler: (req: IncomingMessage, res: ServerResponse) => void) => void;
  };
};

function registerKbRoutes(server: KbServer) {
  server.middlewares.use("/api/kb/health", (_req, res) => {
    try {
      sendJson(res, 200, getHealth());
    } catch (error) {
      sendJson(res, 500, { error: error instanceof Error ? error.message : "知识库健康检查失败" });
    }
  });

  server.middlewares.use("/api/kb/query", async (req, res) => {
    if (req.method === "OPTIONS") {
      sendNoContent(res);
      return;
    }
    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Method Not Allowed" });
      return;
    }

    try {
      const payload = await readJson(req);
      sendJson(res, 200, await queryKnowledgeBase(payload));
    } catch (error) {
      lastQueryStatus = {
        status: "error",
        checked_at: new Date().toISOString(),
        error: error instanceof Error ? error.message : "知识库查询失败",
      };
      sendJson(res, 500, { error: error instanceof Error ? error.message : "知识库查询失败" });
    }
  });

  server.middlewares.use("/api/kb/feedback", async (req, res) => {
    if (req.method === "OPTIONS") {
      sendNoContent(res);
      return;
    }
    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Method Not Allowed" });
      return;
    }

    try {
      const payload = await readJson(req);
      sendJson(res, 200, {
        accepted: true,
        trace_id: `kb-feedback-${Date.now()}`,
        received_question: payload.question || "",
        note: "当前预览版只记录提交状态，不写回正式知识库目录。",
      });
    } catch (error) {
      sendJson(res, 500, { error: error instanceof Error ? error.message : "反馈提交失败" });
    }
  });
}

export function kbDevServer() {
  return {
    name: "zhiyou-kb-dev-server",
    configureServer(server: KbServer) {
      registerKbRoutes(server);
    },
    configurePreviewServer(server: KbServer) {
      registerKbRoutes(server);
    },
  };
}
