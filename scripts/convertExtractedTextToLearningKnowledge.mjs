import fs from "node:fs";
import path from "node:path";

const DEFAULT_SOURCE_ROOT = "D:/AI课程/4-17会议文档/1.提取文本";
const DEFAULT_OUTPUT_FILE = "src/app/data/generatedLearningKnowledge.ts";
const DEFAULT_SEED_OUTPUT_FILE = "src/app/data/generatedLearningKnowledgeSeeds.ts";

const sourceRoot = path.resolve(process.env.ZHIYOU_EXTRACTED_TEXT_ROOT || DEFAULT_SOURCE_ROOT);
const outputFile = path.resolve(process.env.ZHIYOU_LEARNING_KB_OUTPUT || DEFAULT_OUTPUT_FILE);
const seedOutputFile = path.resolve(process.env.ZHIYOU_LEARNING_KB_SEED_OUTPUT || DEFAULT_SEED_OUTPUT_FILE);

const learnerRoleRules = [
  {
    role: "sales",
    keywords: ["销售", "销冠", "客户", "接待", "报价", "成交", "门店", "店长", "高客单", "获客", "小红书", "转销售"],
  },
  {
    role: "designer",
    keywords: ["设计师", "设计", "方案", "量尺", "出图", "会审", "图纸", "审单", "临场发挥"],
  },
  {
    role: "community_ops",
    keywords: ["社区", "社群", "小区", "资源", "群人数", "拉群", "派单", "小区运营", "社群运营"],
  },
  {
    role: "ops_manager",
    keywords: ["运营管理", "数据", "指标", "看板", "复盘", "团队管理", "门店管理", "目标", "QC", "微信", "转化"],
  },
];

const competencyRules = [
  { tag: "板材产品解释", keywords: ["板材", "LSB", "颗粒板", "环保", "基材"] },
  { tag: "五金场景讲解", keywords: ["五金", "拉篮", "阻尼", "裤架", "铰链"] },
  { tag: "报价推进", keywords: ["报价", "价格", "预算", "贵", "折扣", "定金"] },
  { tag: "需求挖掘", keywords: ["需求", "追问", "云屏", "户型", "红线", "生活习惯"] },
  { tag: "客户接待闭环", keywords: ["接待", "迎宾", "送别", "展厅", "客户体验"] },
  { tag: "非标下单底线", keywords: ["非标", "下单", "签字", "终审", "口头承诺", "颜色", "尺寸"] },
  { tag: "高客单成交", keywords: ["高客单", "百万", "大单", "成交", "高净值"] },
  { tag: "客诉处理", keywords: ["客诉", "售后", "投诉", "情绪", "危机", "责任"] },
  { tag: "小红书获客", keywords: ["小红书", "笔记", "私信", "加微", "邀约", "进店"] },
  { tag: "岗位边界", keywords: ["岗位", "职责", "边界", "协作", "分工"] },
  { tag: "资源开拓", keywords: ["资源", "拓客", "开拓", "楼盘", "小区", "渠道"] },
  { tag: "社群SOP", keywords: ["社群", "群", "SOP", "群人数", "活跃", "拉新"] },
  { tag: "指标异常判断", keywords: ["指标", "异常", "数据", "看板", "QC", "微信", "样板间"] },
  { tag: "转化复盘", keywords: ["转化", "复盘", "活动", "漏斗", "签单"] },
  { tag: "设计方案讲解", keywords: ["方案讲解", "讲方案", "设计方案", "客户把控", "临场发挥"] },
  { tag: "量尺出图", keywords: ["量尺", "出图", "图纸", "尺寸", "测量"] },
  { tag: "会审协同", keywords: ["会审", "销售配合", "协同", "交接", "口径"] },
  { tag: "审单防错", keywords: ["审单", "防错", "校验", "复核", "错误", "返工"] },
  { tag: "新人培养与考核", keywords: ["新人", "培训", "带教", "考核", "评分", "补训", "能力画像"] },
];

const sceneRules = [
  { tag: "客户首次进店", keywords: ["首次", "进店", "接待", "展厅"] },
  { tag: "客户追问价格", keywords: ["价格", "贵", "报价", "预算"] },
  { tag: "客户方案会审", keywords: ["会审", "方案讲解", "设计方案"] },
  { tag: "订单下单前", keywords: ["下单", "终审", "签字", "非标"] },
  { tag: "社群运营推进", keywords: ["社群", "小区", "群人数", "拉新"] },
  { tag: "运营复盘看板", keywords: ["复盘", "看板", "指标", "数据"] },
  { tag: "新人入门考核", keywords: ["新人", "考核", "评分", "能力"] },
];

function walkFiles(dir, extensions) {
  if (!fs.existsSync(dir)) return [];
  const result = [];
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

function normalizeText(value) {
  return value.replace(/\r/g, "\n").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

function compactText(value) {
  return value.toLowerCase().replace(/[\s`*_#|:：，。；;、（）()\[\]【】《》“”"']/g, "");
}

function occurrenceCount(text, keyword) {
  const compact = compactText(text);
  const target = compactText(keyword);
  if (!target) return 0;
  let count = 0;
  let index = compact.indexOf(target);
  while (index >= 0) {
    count += 1;
    index = compact.indexOf(target, index + target.length);
  }
  return count;
}

function scoreRules(primaryText, secondaryText, rules, outputKey, maxItems = 6) {
  return rules
    .map((rule) => {
      const primaryScore = rule.keywords.reduce((sum, keyword) => sum + occurrenceCount(primaryText, keyword) * 6, 0);
      const secondaryScore = rule.keywords.reduce((sum, keyword) => sum + Math.min(occurrenceCount(secondaryText, keyword), 4), 0);
      return { value: rule[outputKey], score: primaryScore + secondaryScore };
    })
    .filter((item) => item.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxItems)
    .map((item) => item.value);
}

function inferLearnerRoles(relativePath, title, text) {
  const primaryText = `${relativePath}\n${title}`;
  const secondaryText = text.slice(0, 6000);
  const directRoles = [];
  const compactPrimary = compactText(primaryText);

  if (/(设计师|设计部门|设计总监|设计团队|方案讲解|量尺|会审|审单)/.test(compactPrimary)) directRoles.push("designer");
  if (/(销售|销冠|客户接待|报价|成交|高客单|转销售|华拓)/.test(compactPrimary)) directRoles.push("sales");
  if (/(社区|社群|小区)/.test(compactPrimary)) directRoles.push("community_ops");
  if (/(运营管理|门店管理|数据|派单|加盟商|店长|复盘|指标)/.test(compactPrimary)) directRoles.push("ops_manager");

  if (directRoles.length) return unique(directRoles).slice(0, 3);

  const inferred = scoreRules(primaryText, secondaryText, learnerRoleRules, "role", 2);
  return inferred.length ? inferred : ["sales"];
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function cleanTitle(filePath) {
  return path.basename(filePath, path.extname(filePath)).replace(/^\d+[-_]/, "").trim();
}

function sourceKind(relativePath) {
  if (relativePath.includes("流程清单")) return "process_document";
  if (relativePath.endsWith(".md")) return "structured_markdown";
  return "raw_transcript";
}

function splitBlocks(text) {
  return normalizeText(text)
    .split(/\n(?=#{1,4}\s)|\n{2,}/)
    .map((item) => item.replace(/^#+\s*/, "").replace(/^[-*]\s*/, "").trim())
    .filter((item) => item.length >= 28);
}

function extractEvidenceSnippets(text, competencyTags) {
  const blocks = splitBlocks(text);
  const preferredKeywords = competencyRules
    .filter((rule) => competencyTags.includes(rule.tag))
    .flatMap((rule) => rule.keywords);
  const ranked = blocks
    .map((block) => {
      const compact = compactText(block);
      const score = preferredKeywords.reduce((sum, keyword) => sum + (compact.includes(compactText(keyword)) ? 1 : 0), 0);
      return { block, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.block.slice(0, 220));

  if (ranked.length) return ranked;
  return blocks.slice(0, 2).map((block) => block.slice(0, 220));
}

function suggestedUses(text, competencyTags) {
  const uses = ["qna"];
  const compact = compactText(text);
  if (competencyTags.length || compact.includes("培训") || compact.includes("课程")) uses.push("course");
  if (compact.includes("客户") || compact.includes("场景") || compact.includes("话术") || compact.includes("演练")) uses.push("practice");
  if (compact.includes("考核") || compact.includes("评分") || compact.includes("测验")) uses.push("assessment");
  if (compact.includes("补训") || compact.includes("带教") || compact.includes("新人")) uses.push("retrain");
  return unique(uses);
}

function makePriority(roles, competencyTags, text) {
  const compact = compactText(text);
  if (compact.includes("新人") || compact.includes("考核") || compact.includes("高频") || compact.includes("痛点")) return "high";
  if (roles.length >= 2 || competencyTags.length >= 3) return "medium";
  return "low";
}

function rankSeedEntry(entry) {
  const priorityScore = entry.priority === "high" ? 300 : entry.priority === "medium" ? 200 : 100;
  return priorityScore + entry.competencyTags.length * 8 + entry.sceneTags.length * 4 + entry.suggestedUses.length * 3;
}

function makeTask(entryTitle, roles, competencyTags, scenes) {
  const mainCompetency = competencyTags[0] || "岗位基础";
  const scene = scenes[0] || "真实业务场景";
  return {
    courseTitle: `${mainCompetency}：${entryTitle}`,
    practicePrompt: `围绕“${scene}”，让学员用自己的话完成一次${mainCompetency}表达。`,
    assessmentFocus: `检查学员是否能说清${mainCompetency}的关键动作、风险边界和下一步处理。`,
    targetRoles: roles,
  };
}

function toTsString(value) {
  return JSON.stringify(value, null, 2);
}

function convert() {
  if (!fs.existsSync(sourceRoot)) {
    throw new Error(`源目录不存在：${sourceRoot}`);
  }

  const files = walkFiles(sourceRoot, [".txt", ".md"]).sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
  const entries = files.map((filePath, index) => {
    const rawText = fs.readFileSync(filePath, "utf-8");
    const text = normalizeText(rawText);
    const relativePath = path.relative(sourceRoot, filePath).replace(/\\/g, "/");
    const title = cleanTitle(filePath);
    const primaryText = `${relativePath}\n${title}`;
    const searchable = `${primaryText}\n${text.slice(0, 8000)}`;
    const roles = inferLearnerRoles(relativePath, title, text);
    const competencyTags = unique(scoreRules(primaryText, text.slice(0, 12000), competencyRules, "tag", 6));
    const sceneTags = unique(scoreRules(primaryText, text.slice(0, 8000), sceneRules, "tag", 4));

    return {
      id: `lk-${String(index + 1).padStart(4, "0")}`,
      title,
      sourceFile: path.basename(filePath),
      relativePath,
      sourceKind: sourceKind(relativePath),
      learnerRoles: roles,
      competencyTags: competencyTags.length ? competencyTags : ["新人培养与考核"],
      sceneTags,
      suggestedUses: suggestedUses(searchable, competencyTags),
      priority: makePriority(roles, competencyTags, searchable),
      sourceUpdatedAt: fs.statSync(filePath).mtime.toISOString(),
      charCount: text.length,
      evidenceSnippets: extractEvidenceSnippets(text, competencyTags),
      generatedTask: makeTask(title, roles, competencyTags, sceneTags),
    };
  });

  const summaryByRole = {};
  const summaryByCompetency = {};
  for (const entry of entries) {
    for (const role of entry.learnerRoles) summaryByRole[role] = (summaryByRole[role] || 0) + 1;
    for (const tag of entry.competencyTags) summaryByCompetency[tag] = (summaryByCompetency[tag] || 0) + 1;
  }

  const content = `import type { LearnerRole } from "../context/AppContext";

export type LearningKnowledgeUse = "qna" | "course" | "practice" | "assessment" | "retrain";
export type LearningKnowledgePriority = "high" | "medium" | "low";
export type LearningKnowledgeSourceKind = "raw_transcript" | "structured_markdown" | "process_document";

export interface GeneratedLearningTask {
  courseTitle: string;
  practicePrompt: string;
  assessmentFocus: string;
  targetRoles: LearnerRole[];
}

export interface GeneratedLearningKnowledgeEntry {
  id: string;
  title: string;
  sourceFile: string;
  relativePath: string;
  sourceKind: LearningKnowledgeSourceKind;
  learnerRoles: LearnerRole[];
  competencyTags: string[];
  sceneTags: string[];
  suggestedUses: LearningKnowledgeUse[];
  priority: LearningKnowledgePriority;
  sourceUpdatedAt: string;
  charCount: number;
  evidenceSnippets: string[];
  generatedTask: GeneratedLearningTask;
}

export const generatedLearningKnowledgeMeta = ${toTsString({
    sourceRoot: sourceRoot.replace(/\\/g, "/"),
    generatedAt: new Date().toISOString(),
    entryCount: entries.length,
    summaryByRole,
    summaryByCompetency,
  })} as const;

export const generatedLearningKnowledgeEntries: GeneratedLearningKnowledgeEntry[] = ${toTsString(entries)};
`;

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, content, "utf-8");

  const seedEntryMap = new Map();
  for (const role of ["sales", "community_ops", "ops_manager", "designer"]) {
    entries
      .filter((entry) => entry.learnerRoles.includes(role))
      .sort((a, b) => rankSeedEntry(b) - rankSeedEntry(a))
      .slice(0, 24)
      .forEach((entry) => seedEntryMap.set(entry.id, entry));
  }
  const seedEntries = Array.from(seedEntryMap.values());
  const seedContent = `import type { GeneratedLearningKnowledgeEntry } from "./generatedLearningKnowledge";

export const generatedLearningKnowledgeSeedMeta = ${toTsString({
    sourceRoot: sourceRoot.replace(/\\/g, "/"),
    generatedAt: new Date().toISOString(),
    fullEntryCount: entries.length,
    seedEntryCount: seedEntries.length,
    summaryByRole,
    summaryByCompetency,
  })} as const;

export const generatedLearningKnowledgeSeedEntries: GeneratedLearningKnowledgeEntry[] = ${toTsString(seedEntries)};
`;
  fs.mkdirSync(path.dirname(seedOutputFile), { recursive: true });
  fs.writeFileSync(seedOutputFile, seedContent, "utf-8");

  return {
    sourceRoot,
    outputFile,
    seedOutputFile,
    entryCount: entries.length,
    seedEntryCount: seedEntries.length,
    summaryByRole,
    topCompetencies: Object.entries(summaryByCompetency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10),
  };
}

const result = convert();
console.log(JSON.stringify(result, null, 2));
