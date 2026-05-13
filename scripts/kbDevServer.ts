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

const DEFAULT_KB_ROOT = "D:/AI课程/1数据整理/2.知识库";
const kbRoot = process.env.ZHIYOU_KB_ROOT || DEFAULT_KB_ROOT;
const officialRoot = path.join(kbRoot, "4.正式知识库");
const structuredRoot = path.join(kbRoot, "5.结构化数据集");
const snapshotId = process.env.ZHIYOU_KB_SNAPSHOT_ID || "kb-v1.3-local";

let cachedEntries: KbEntry[] | null = null;
let cachedAt = "";

function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
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

  const files = walkFiles(officialRoot, [".md"]);
  cachedEntries = files
    .map((filePath) => {
      const markdown = fs.readFileSync(filePath, "utf-8");
      const { meta, body } = parseFrontmatter(markdown);
      const id = asString(meta, "id") || path.basename(filePath, ".md");

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
        category: path.basename(path.dirname(filePath)),
        filePath,
        relativePath: path.relative(officialRoot, filePath).replace(/\\/g, "/"),
        body,
      };
    })
    .filter((entry) => entry.status === "current" && entry.review_status === "approved");

  cachedAt = new Date().toISOString();
  return cachedEntries;
}

function getHealth() {
  const entries = loadEntries();
  return {
    kb_snapshot_id: snapshotId,
    source_root: officialRoot,
    structured_root: structuredRoot,
    entry_count: entries.length,
    structured_file_count: walkFiles(structuredRoot, [".md", ".txt", ".csv"]).length,
    filters: {
      status: "current",
      review_status: "approved",
      answer_source: "2.知识库/4.正式知识库",
    },
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

function buildAnswer(question: string, hits: Array<{ entry: KbEntry; score: number }>, tokens: string[]) {
  const primary = hits[0].entry;
  const directAnswer = extractDirectAnswer(primary);
  const excerpts = hits.slice(0, 3).flatMap((hit) => extractExcerpts(hit.entry, tokens).slice(0, 1));

  return {
    direct_answer: directAnswer,
    answer: [
      `**结论：**${directAnswer}`,
      "",
      "**依据摘要：**",
      ...excerpts.map((excerpt) => `• ${excerpt}`),
      "",
      "**风险提醒：**涉及规则、价格、责任界定或交期承诺时，以当前正式知识库最新发布口径为准；未命中的细节不要自行承诺。",
      "",
      "**下一步建议：**如客户追问具体尺寸、价格、版本或责任归属，建议继续补充关键信息后再次检索，或转人工复核。",
    ].join("\n"),
    citations: hits.slice(0, 5).map(({ entry, score }) => ({
      id: entry.id,
      title: entry.title,
      knowledge_type: entry.knowledge_type,
      source_id: entry.source_id,
      source_file: entry.source_file,
      source_section: entry.source_section,
      version: entry.version,
      kb_revision: entry.kb_revision,
      relative_path: entry.relativePath,
      score,
    })),
  };
}

function queryKnowledgeBase(payload: KbQueryPayload) {
  const question = payload.question?.trim() || "";
  const topK = Math.min(Math.max(payload.top_k || 5, 1), 10);
  const entries = loadEntries();
  const tokens = buildTokens(question);

  if (!question || tokens.length === 0) {
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
  return {
    ...buildAnswer(question, hits, tokens),
    confidence,
    fallback: false,
    trace_id: `kb-${Date.now()}`,
    kb_snapshot_id: snapshotId,
  };
}

export function kbDevServer() {
  return {
    name: "zhiyou-kb-dev-server",
    configureServer(server: { middlewares: { use: (path: string, handler: (req: IncomingMessage, res: ServerResponse) => void) => void } }) {
      server.middlewares.use("/api/kb/health", (_req, res) => {
        try {
          sendJson(res, 200, getHealth());
        } catch (error) {
          sendJson(res, 500, { error: error instanceof Error ? error.message : "知识库健康检查失败" });
        }
      });

      server.middlewares.use("/api/kb/query", async (req, res) => {
        if (req.method !== "POST") {
          sendJson(res, 405, { error: "Method Not Allowed" });
          return;
        }

        try {
          const payload = await readJson(req);
          sendJson(res, 200, queryKnowledgeBase(payload));
        } catch (error) {
          sendJson(res, 500, { error: error instanceof Error ? error.message : "知识库查询失败" });
        }
      });

      server.middlewares.use("/api/kb/feedback", async (req, res) => {
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
    },
  };
}
