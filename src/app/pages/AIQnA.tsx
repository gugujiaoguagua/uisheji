import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Gauge,
  Mic,
  MicOff,
  Radio,
  Send,
  Square,
  ThumbsDown,
  ThumbsUp,
  Zap,
} from "lucide-react";
import type { LearnerRole } from "../context/AppContext";
import { getLearnerRoleMeta, useApp } from "../context/AppContext";
import {
  queryKnowledgeBase,
  queryKnowledgeHealth,
  submitKnowledgeFeedback,
  type KbAnswerSections,
  type KbHealthResponse,
} from "../lib/kbClient";
import { getLearningKnowledgeEntries } from "../data/learningKnowledgeMap";

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: {
    resultIndex: number;
    results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
  }) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type VoiceMonitorStatus = "idle" | "listening" | "scoring";

interface VoiceScoreDimension {
  label: string;
  score: number;
  detail: string;
}

interface VoiceScoreRecord {
  id: string;
  question: string;
  transcript: string;
  durationSeconds: number;
  totalScore: number;
  level: "excellent" | "pass" | "risk";
  dimensions: VoiceScoreDimension[];
  missingFocus: string[];
  createdAt: Date;
}


interface Source {
  id?: string;
  title: string;
  version: string;
  section: string;
  reliability: "high" | "medium";
  sourceId?: string;
  sourceFile?: string;
  kbRevision?: string;
  relativePath?: string;
  knowledgeType?: string;
  authorityLevel?: string;
  category?: string;
  updatedAt?: string;
  applicableRoles?: string[];
  applicableScenes?: string[];
  tags?: string[];
  matchedTerms?: string[];
  matchReason?: string[];
  score?: number;
  excerpt?: string;
}

interface EvaluationQuestion {
  id: string;
  role: LearnerRole;
  category: string;
  question: string;
  expectedFocus: string[];
}

interface EvaluationResult {
  id: string;
  question: string;
  category: string;
  status: "pass" | "review" | "error";
  confidence?: string;
  sourceCount: number;
  latency: number;
  reason: string;
  expectedFocus: string[];
  missingFocus: string[];
  role: LearnerRole;
}


interface KnowledgeGap {
  title: string;
  reason: string;
  missingItems: string[];
  suggestedOwner: string;
  suggestedSync: string;
  priority: "high" | "medium";
}

interface EvaluationGapDraft {
  result: EvaluationResult;
  gap: KnowledgeGap;
  markdown: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  question?: string;
  sources?: Source[];
  directAnswer?: string;
  answerSections?: KbAnswerSections;
  model?: string;
  traceId?: string;
  kbSnapshotId?: string;
  timestamp: Date;
  feedback?: "up" | "down";
  answerState?: "resolved" | "needs-review";
  knowledgeGap?: KnowledgeGap;
}

const suggestedQuestionsByRole: Record<LearnerRole, string[]> = {
  sales: [
    "板材怎么向客户解释环保等级？",
    "客户问万骊板材为什么贵怎么回答？",
    "全屋定制估价有哪些核心计价项？",
    "智柚下单时文件命名有什么要求？",
  ],
  community_ops: [
    "小红书私域转化怎么维护业主群？",
    "门店会议制度怎么落地？",
    "渠道管理标准化有哪些关键动作？",
    "智柚系统下单流程怎么给新人讲？",
  ],
  ops_manager: [
    "门店会议制度怎么检查执行？",
    "渠道管理标准化有哪些关键动作？",
    "小红书运营数据应该复盘哪些环节？",
    "智柚系统下单风险怎么做培训回流？",
  ],
  designer: [
    "全屋估价空间报价怎么拆？",
    "三维家导报价怎么操作？",
    "衣柜类三维家下单有哪些注意事项？",
    "设计师会审前资料要检查什么？",
  ],
};

const evaluationQuestions: EvaluationQuestion[] = [
  { id: "sales-01", role: "sales", category: "产品解释", question: "拉迷万骊板材体系完整教材包含哪些内容？", expectedFocus: ["板材", "教材", "百问百答"] },
  { id: "sales-02", role: "sales", category: "环保话术", question: "客户问板材环保等级怎么解释才不夸大？", expectedFocus: ["环保", "标准", "不承诺"] },
  { id: "sales-03", role: "sales", category: "报价推进", question: "全屋定制估价应该先问客户哪些信息？", expectedFocus: ["空间", "需求", "预算"] },
  { id: "sales-04", role: "sales", category: "产品对比", question: "客户觉得万骊板材贵，销售应该怎么说明价值？", expectedFocus: ["工艺", "环保", "适用"] },
  { id: "sales-05", role: "sales", category: "订单协同", question: "销售把客户需求同步给设计师前要准备哪些信息？", expectedFocus: ["户型", "需求", "注意事项"] },
  { id: "sales-06", role: "sales", category: "风险边界", question: "客户追问具体价格和交期时，销售哪些话不能直接承诺？", expectedFocus: ["价格", "交期", "复核"] },
  { id: "sales-07", role: "sales", category: "客户沟通", question: "客户问防水施工规范 v3.1 有什么影响，怎么回复？", expectedFocus: ["规范", "影响", "确认"] },
  { id: "sales-08", role: "sales", category: "下单准备", question: "智柚下单前客户信息和文件命名要注意什么？", expectedFocus: ["文件", "客户", "下单"] },
  { id: "designer-01", role: "designer", category: "方案准备", question: "设计师会审前需要检查哪些客户资料？", expectedFocus: ["户型", "需求", "图纸"] },
  { id: "designer-02", role: "designer", category: "报价拆解", question: "全屋估价空间报价怎么拆给销售看？", expectedFocus: ["空间", "报价", "清单"] },
  { id: "designer-03", role: "designer", category: "三维家", question: "三维家导报价时有哪些容易出错的地方？", expectedFocus: ["三维家", "报价", "复核"] },
  { id: "designer-04", role: "designer", category: "下单规范", question: "衣柜类三维家下单有哪些注意事项？", expectedFocus: ["衣柜", "下单", "规范"] },
  { id: "designer-05", role: "designer", category: "协同", question: "销售提交客户单后，设计师需要回收哪些确认信息？", expectedFocus: ["客户", "确认", "协同"] },
  { id: "designer-06", role: "designer", category: "图纸标准", question: "图纸准备进入会审前要看哪些规范项？", expectedFocus: ["图纸", "规范", "会审"] },
  { id: "designer-07", role: "designer", category: "需求复盘", question: "客户偏好风格图片应该怎样转成设计需求？", expectedFocus: ["风格", "需求", "图片"] },
  { id: "designer-08", role: "designer", category: "风险边界", question: "方案没有确认前设计师哪些内容不能直接进入下单？", expectedFocus: ["确认", "方案", "下单"] },
  { id: "community-01", role: "community_ops", category: "社群转化", question: "小红书私域转化后怎么维护业主群？", expectedFocus: ["私域", "业主群", "维护"] },
  { id: "community-02", role: "community_ops", category: "资源开拓", question: "社区运营开拓资源时应该记录哪些信息？", expectedFocus: ["资源", "记录", "跟进"] },
  { id: "community-03", role: "community_ops", category: "异常处理", question: "社群运营发现异常数据时应该先看什么？", expectedFocus: ["异常", "数据", "责任"] },
  { id: "community-04", role: "community_ops", category: "渠道管理", question: "渠道管理标准化有哪些关键动作？", expectedFocus: ["渠道", "标准", "动作"] },
  { id: "community-05", role: "community_ops", category: "门店会议", question: "门店会议制度怎么落地到每日动作？", expectedFocus: ["会议", "门店", "落地"] },
  { id: "community-06", role: "community_ops", category: "新人培训", question: "智柚系统下单流程怎么给运营新人讲？", expectedFocus: ["新人", "下单", "培训"] },
  { id: "manager-01", role: "ops_manager", category: "运营复盘", question: "小红书运营数据应该复盘哪些环节？", expectedFocus: ["数据", "复盘", "转化"] },
  { id: "manager-02", role: "ops_manager", category: "风险管理", question: "运营负责人看到红色预警后怎么安排处理顺序？", expectedFocus: ["预警", "风险", "优先级"] },
  { id: "manager-03", role: "ops_manager", category: "培训回流", question: "智柚系统下单风险怎么做培训回流？", expectedFocus: ["下单", "风险", "培训"] },
  { id: "manager-04", role: "ops_manager", category: "指标治理", question: "团队健康均值下降时运营负责人要追踪什么？", expectedFocus: ["团队", "指标", "追踪"] },
  { id: "manager-05", role: "ops_manager", category: "闭环", question: "运营问题从发现到闭环需要记录哪些节点？", expectedFocus: ["发现", "闭环", "记录"] },
  { id: "manager-06", role: "ops_manager", category: "责任对象", question: "异常事件要怎么区分资源问题、流程问题和责任对象？", expectedFocus: ["异常", "流程", "责任"] },
  { id: "sales-09", role: "sales", category: "异议处理", question: "客户担心防潮和耐污，销售应该依据哪些知识点解释？", expectedFocus: ["防潮", "耐污", "依据"] },
  { id: "designer-09", role: "designer", category: "方案会审", question: "方案会审记录里后续动作应该怎么沉淀？", expectedFocus: ["会审", "记录", "后续动作"] },
];

const politeTerms = ["您好", "您", "可以", "建议", "我先", "我们先", "帮您", "确认", "复核", "看一下"];
const absoluteRiskTerms = ["一定", "绝对", "保证", "肯定", "随便", "不用看", "马上就能", "百分百"];
const structureTerms = ["首先", "第一", "第二", "然后", "同时", "最后", "下一步", "建议"];
const boundaryTerms = ["不能承诺", "以合同为准", "以图纸为准", "复核", "确认", "看版本", "看现场", "转人工", "再报价"];

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function countIncludes(text: string, terms: string[]) {
  return terms.filter((term) => text.includes(term)).length;
}

function getExpectedFocusForQuestion(question: string, role: LearnerRole) {
  const matchedEvaluation = evaluationQuestions.find((item) => item.role === role && item.question === question);
  if (matchedEvaluation) return matchedEvaluation.expectedFocus;

  const matchedKnowledge = getLearningKnowledgeEntries({ role, use: "qna", limit: 8 }).find((entry) => {
    const haystack = `${entry.title}${entry.generatedTask.courseTitle}${entry.generatedTask.practicePrompt}${entry.competencyTags.join("")}`;
    return question.split(/[，。！？\s]/).some((word) => word.length >= 2 && haystack.includes(word));
  });

  if (matchedKnowledge) return matchedKnowledge.competencyTags.slice(0, 4);
  return question.split(/[，。！？、\s]/).filter((word) => word.length >= 2).slice(0, 4);
}

function scoreVoiceTranscript(
  question: string,
  transcript: string,
  role: LearnerRole,
  durationSeconds: number
): Omit<VoiceScoreRecord, "id" | "createdAt"> {
  const text = transcript.trim();
  const expectedFocus = getExpectedFocusForQuestion(question, role);
  const hitFocus = expectedFocus.filter((focus) => text.includes(focus));
  const missingFocus = expectedFocus.filter((focus) => !text.includes(focus));
  const politeCount = countIncludes(text, politeTerms);
  const riskyCount = countIncludes(text, absoluteRiskTerms);
  const structureCount = countIncludes(text, structureTerms);
  const boundaryCount = countIncludes(text, boundaryTerms);

  const contentScore = clampScore((hitFocus.length / Math.max(expectedFocus.length, 1)) * 100);
  const toneScore = clampScore(68 + politeCount * 8 - riskyCount * 18 + Math.min(durationSeconds, 60) * 0.2);
  const structureScore = clampScore(50 + structureCount * 14 + (text.length > 45 ? 18 : 0));
  const methodScore = clampScore(58 + boundaryCount * 14 + (text.includes("客户") || text.includes("需求") ? 10 : 0) - riskyCount * 10);
  const fluencyScore = clampScore(text.length < 12 ? 35 : text.length < 35 ? 58 : durationSeconds < 6 ? 62 : 82);
  const totalScore = clampScore(contentScore * 0.34 + toneScore * 0.18 + structureScore * 0.18 + methodScore * 0.2 + fluencyScore * 0.1);

  return {
    question,
    transcript: text,
    durationSeconds,
    totalScore,
    level: totalScore >= 85 ? "excellent" : totalScore >= 70 ? "pass" : "risk",
    missingFocus,
    dimensions: [
      {
        label: "题目命中",
        score: contentScore,
        detail: hitFocus.length ? `已命中：${hitFocus.join("、")}` : "暂未命中题目关键点",
      },
      {
        label: "语气稳定",
        score: toneScore,
        detail: riskyCount ? "存在过度承诺或绝对化表达" : "语气相对稳妥，未发现明显绝对化承诺",
      },
      {
        label: "表达方式",
        score: methodScore,
        detail: boundaryCount ? "有复核、确认或边界意识" : "建议补充复核条件和不可承诺边界",
      },
      {
        label: "结构完整",
        score: structureScore,
        detail: structureCount ? "回答有分层表达" : "建议按先判断、再解释、再给下一步组织回答",
      },
      {
        label: "回答充分度",
        score: fluencyScore,
        detail: text.length < 12 ? "回答过短，难以判断真实能力" : "已形成可评估回答",
      },
    ],
  };
}

function formatKbTime(value?: string) {
  if (!value) return "未生成";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatFileSize(value?: number) {
  if (!value) return "0 KB";
  if (value < 1024 * 1024) return `${Math.max(1, Math.round(value / 1024))} KB`;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

function getLastQueryLabel(status?: string) {
  if (status === "ok") return "最近查询正常";
  if (status === "fallback") return "最近查询已回退";
  if (status === "error") return "最近查询异常";
  return "暂无查询记录";
}

function looksLikeJsonAnswer(value: string) {
  const text = value.trim();
  return (
    text.startsWith("{") ||
    text.includes('"direct_answer"') ||
    text.includes('\\"direct_answer\\"') ||
    text.includes('"answer_sections"') ||
    text.includes('\\"answer_sections\\"')
  );
}

function normalizeDisplayContent(value: string) {
  return looksLikeJsonAnswer(value) ? "模型返回的是结构化数据，已按上方字段拆分展示。" : value;
}

function createKnowledgeGap(question: string, reason?: string): KnowledgeGap {
  return {
    title: "知识缺口待补充",
    reason: reason || `当前问题“${question}”缺少正式知识库依据，现有资料不足以支持直接对客户承诺。`,
    missingItems: ["正式知识条目", "适用范围与限制条件", "可直接对外复述的话术"],
    suggestedOwner: "信息同步中心",
    suggestedSync: "补齐后同步到题库、陪练场景与消息通知",
    priority: "high",
  };
}

function createEvaluationGap(result: EvaluationResult): KnowledgeGap {
  const missingFocus = result.missingFocus.length ? result.missingFocus.join("、") : "关键依据、适用范围、风险边界";
  return {
    title: `补充“${result.category}”标准知识`,
    reason: `评测问题“${result.question}”未通过：${result.reason}。缺少或未稳定命中的要点：${missingFocus}。`,
    missingItems: [
      "正式知识条目",
      "可直接对外复述的话术",
      "适用角色与适用场景",
      "风险边界与不可承诺项",
    ],
    suggestedOwner: "信息同步中心",
    suggestedSync: "补齐后同步到 AI 问答评测集、题库和 AI 陪练",
    priority: result.status === "error" || result.sourceCount === 0 ? "high" : "medium",
  };
}

function buildGapMarkdown(result: EvaluationResult, gap: KnowledgeGap) {
  const date = new Date().toISOString().slice(0, 10);
  return [
    "---",
    `title: ${gap.title}`,
    `knowledge_type: ${result.category}`,
    "authority_level: official",
    "status: current",
    "review_status: draft",
    `applicable_roles: [${result.role}]`,
    "applicable_scenes: [AI问答, 培训题库, AI陪练]",
    `updated_at: ${date}`,
    "---",
    "",
    "# 一句话结论",
    "",
    "请补充一段可以直接对客户或内部人员复述的标准口径。",
    "",
    "# 触发问题",
    "",
    `- ${result.question}`,
    "",
    "# 缺口原因",
    "",
    `- ${gap.reason}`,
    `- 当前评测状态：${result.status === "error" ? "异常" : "待复核"}`,
    `- 当前来源数量：${result.sourceCount}`,
    `- 当前置信度：${result.confidence || "未返回"}`,
    "",
    "# 需要补充",
    "",
    ...gap.missingItems.map((item) => `- ${item}`),
    "",
    "# 期望覆盖要点",
    "",
    ...result.expectedFocus.map((item) => `- ${item}${result.missingFocus.includes(item) ? "（当前未稳定命中）" : ""}`),
    "",
    "# 风险边界",
    "",
    "- 哪些情况不能直接对客户承诺？",
    "- 是否需要转人工、看合同、看图纸、看产品版本或复核价格？",
    "",
    "# 同步位置",
    "",
    `- ${gap.suggestedSync}`,
  ].join("\n");
}

async function buildResponse(question: string, learnerRole: LearnerRole) {
  try {
    const result = await queryKnowledgeBase({
      question,
      role_hint: learnerRole,
      top_k: 5,
    });

    if (result.fallback || result.citations.length === 0) {
      const knowledgeGap = createKnowledgeGap(question, result.answer);
      return {
        direct: result.direct_answer,
        full: `${result.answer}\n\n**处理建议：**已按“无依据不回答”策略拦截，可发起知识补充或转人工复核。`,
        sources: undefined,
        answerState: "needs-review" as const,
        answerSections: result.answer_sections,
        model: result.model,
        traceId: result.trace_id,
        kbSnapshotId: result.kb_snapshot_id,
        knowledgeGap,
      };
    }

    return {
      direct: result.direct_answer,
      full: `${result.answer}\n\n追踪号：${result.trace_id} · 知识库快照：${result.kb_snapshot_id}`,
      sources: result.citations.map((item) => ({
        id: item.id,
        title: item.title,
        version: item.version || "未标注版本",
        section: item.source_section || item.relative_path || "正式知识库条目",
        reliability: result.confidence === "high" ? "high" as const : "medium" as const,
        knowledgeType: item.knowledge_type,
        authorityLevel: item.authority_level,
        sourceId: item.source_id,
        sourceFile: item.source_file,
        kbRevision: item.kb_revision,
        relativePath: item.relative_path,
        category: item.category,
        updatedAt: item.updated_at,
        applicableRoles: item.applicable_roles,
        applicableScenes: item.applicable_scenes,
        tags: item.tags,
        matchedTerms: item.matched_terms,
        matchReason: item.match_reason,
        score: item.score,
        excerpt: item.excerpt,
      })),
      answerState: result.confidence === "low" ? "needs-review" as const : "resolved" as const,
      knowledgeGap: undefined,
      answerSections: result.answer_sections,
      model: result.model,
      traceId: result.trace_id,
      kbSnapshotId: result.kb_snapshot_id,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "知识库服务暂不可用";
    const knowledgeGap = createKnowledgeGap(question, reason);
    return {
      direct: "知识库服务暂时不可用，我先不编造答案。请稍后重试或转人工复核。",
      full: `当前无法连接正式知识库接口：${reason}\n\n**处理建议：**检查本地预览服务是否已重启，并确认知识库目录可访问。`,
      sources: undefined,
      answerState: "needs-review" as const,

      knowledgeGap,
    };
  }
}


export default function AIQnA() {
  const navigate = useNavigate();
  const { user, currentIdentity } = useApp();
  const selectedLearnerRole = user?.learnerRole ?? "sales";
  const learnerRoleMeta = getLearnerRoleMeta(selectedLearnerRole);
  const suggestedQuestions = currentIdentity === "student" ? suggestedQuestionsByRole[selectedLearnerRole] : suggestedQuestionsByRole.sales;
  const showHeaderHelperText = false;
  const headerHelperText = "先给对客户说的话，再给来源依据；推荐问题跟随当前学习身份";
  const [messages, setMessages] = useState<Message[]>([

    {
      id: "welcome",
      role: "assistant",
      content: "你好！我是智柚 AI 助手。你可以直接问我产品参数、工艺规范、销售话术、报价和下单流程等问题，我会先检索正式知识库，再给你可追溯的答案；如果当前答不上来，也会给你发起知识补充的入口。",

      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<string[]>([]);
  const [expandedSources, setExpandedSources] = useState<string[]>([]);
  const [submittedGapIds, setSubmittedGapIds] = useState<string[]>([]);
  const [activeGapMessageId, setActiveGapMessageId] = useState<string | null>(null);
  const [showKbStatus, setShowKbStatus] = useState(false);
  const [kbHealth, setKbHealth] = useState<KbHealthResponse | null>(null);
  const [kbHealthError, setKbHealthError] = useState("");
  const [showEvaluationPanel, setShowEvaluationPanel] = useState(true);
  const [evaluationResults, setEvaluationResults] = useState<EvaluationResult[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [activeEvaluationGap, setActiveEvaluationGap] = useState<EvaluationGapDraft | null>(null);
  const [submittedEvaluationGapIds, setSubmittedEvaluationGapIds] = useState<string[]>([]);
  const [isVoicePanelOpen, setIsVoicePanelOpen] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<VoiceMonitorStatus>("idle");
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [voiceElapsed, setVoiceElapsed] = useState(0);
  const [voiceScores, setVoiceScores] = useState<VoiceScoreRecord[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechRecognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const voiceTimerRef = useRef<number | null>(null);
  const voiceStartedAtRef = useRef<number>(0);
  const voiceTranscriptRef = useRef("");
  const voiceFinalTranscriptRef = useRef("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeGapMessageId]);

  const activeVoiceQuestion = useMemo(() => {
    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
    return latestUserMessage?.content || suggestedQuestions[0] || "请围绕当前学习题目进行口头回答";
  }, [messages, suggestedQuestions]);

  const activeVoiceFocus = useMemo(
    () => getExpectedFocusForQuestion(activeVoiceQuestion, selectedLearnerRole),
    [activeVoiceQuestion, selectedLearnerRole]
  );

  const liveVoiceScore = useMemo(() => {
    if (!voiceTranscript.trim()) return null;
    return scoreVoiceTranscript(activeVoiceQuestion, voiceTranscript, selectedLearnerRole, voiceElapsed);
  }, [activeVoiceQuestion, selectedLearnerRole, voiceElapsed, voiceTranscript]);

  const clearVoiceCapture = () => {
    if (voiceTimerRef.current !== null) {
      window.clearInterval(voiceTimerRef.current);
      voiceTimerRef.current = null;
    }
    speechRecognitionRef.current?.stop();
    speechRecognitionRef.current = null;
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
  };

  useEffect(() => {
    return () => clearVoiceCapture();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && voiceStatus === "listening") {
        clearVoiceCapture();
        setVoiceStatus("idle");
        setVoiceError("页面已切到后台，本轮语音监听已中断且不计分。请回到 AI 问答页后重新开始。");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [voiceStatus]);

  const refreshKbHealth = () => {
    setKbHealthError("");
    void queryKnowledgeHealth()
      .then((health) => setKbHealth(health))
      .catch((error) => {
        setKbHealth(null);
        setKbHealthError(error instanceof Error ? error.message : "知识库状态检查失败");
      });
  };

  useEffect(() => {
    refreshKbHealth();
  }, []);

  const handleSend = (question?: string) => {
    const q = question || inputValue.trim();
    if (!q || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: q,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    void buildResponse(q, selectedLearnerRole)
      .then((response) => {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.full,
          question: q,
          directAnswer: response.direct,
          answerSections: response.answerSections,
          model: response.model,
          traceId: response.traceId,
          kbSnapshotId: response.kbSnapshotId,
          sources: response.sources,
          answerState: response.answerState,
          knowledgeGap: response.knowledgeGap,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      })
      .finally(() => {
        setIsLoading(false);
      });

  };

  const startVoiceMonitor = async () => {
    if (voiceStatus === "listening") return;

    if (!navigator.mediaDevices?.getUserMedia) {
      setVoiceError("当前浏览器不支持麦克风权限，无法进行语音问答监听。");
      setIsVoicePanelOpen(true);
      return;
    }

    setIsVoicePanelOpen(true);
    setVoiceStatus("scoring");
    setVoiceError("");
    setVoiceTranscript("");
    setVoiceElapsed(0);
    voiceTranscriptRef.current = "";
    voiceFinalTranscriptRef.current = "";
    voiceStartedAtRef.current = Date.now();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const SpeechRecognitionCtor =
        (window as typeof window & {
          SpeechRecognition?: SpeechRecognitionConstructor;
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        }).SpeechRecognition ||
        (window as typeof window & {
          SpeechRecognition?: SpeechRecognitionConstructor;
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        }).webkitSpeechRecognition;

      if (!SpeechRecognitionCtor) {
        setVoiceError("当前浏览器没有语音转写能力，已获得麦克风权限，但暂不能按题自动计分。建议用 Chrome/Edge 预览。");
        setVoiceStatus("idle");
        clearVoiceCapture();
        return;
      }

      const recognition = new SpeechRecognitionCtor();
      recognition.lang = "zh-CN";
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (event) => {
        let interimTranscript = "";
        for (let index = event.resultIndex; index < event.results.length; index += 1) {
          const text = event.results[index][0].transcript.trim();
          if (event.results[index].isFinal) {
            voiceFinalTranscriptRef.current = `${voiceFinalTranscriptRef.current} ${text}`.trim();
          } else {
            interimTranscript += text;
          }
        }
        const nextTranscript = `${voiceFinalTranscriptRef.current} ${interimTranscript}`.trim();
        voiceTranscriptRef.current = nextTranscript;
        setVoiceTranscript(nextTranscript);
      };
      recognition.onerror = (event) => {
        setVoiceError(event.error ? `语音识别异常：${event.error}` : "语音识别暂时不可用，请检查麦克风权限。");
      };
      recognition.start();
      speechRecognitionRef.current = recognition;

      voiceTimerRef.current = window.setInterval(() => {
        setVoiceElapsed(Math.round((Date.now() - voiceStartedAtRef.current) / 1000));
      }, 1000);
      setVoiceStatus("listening");
    } catch (error) {
      setVoiceStatus("idle");
      clearVoiceCapture();
      setVoiceError(error instanceof Error ? error.message : "无法打开麦克风，请检查浏览器权限。");
    }
  };

  const stopVoiceMonitor = () => {
    if (voiceStatus !== "listening") return;
    const transcript = voiceTranscriptRef.current.trim();
    const duration = Math.max(voiceElapsed, Math.round((Date.now() - voiceStartedAtRef.current) / 1000));
    clearVoiceCapture();
    setVoiceStatus("idle");

    if (!transcript) {
      setVoiceError("本轮没有识别到有效回答，不能计分。请让学员重新回答。");
      return;
    }

    const score = scoreVoiceTranscript(activeVoiceQuestion, transcript, selectedLearnerRole, duration);
    setVoiceScores((prev) => [
      {
        ...score,
        id: `${Date.now()}`,
        createdAt: new Date(),
      },
      ...prev,
    ].slice(0, 5));
  };

  const toggleSources = (msgId: string) => {
    setExpandedSources((prev) =>
      prev.includes(msgId) ? prev.filter((id) => id !== msgId) : [...prev, msgId]
    );
  };

  const toggleDetails = (msgId: string) => {
    setExpandedDetails((prev) =>
      prev.includes(msgId) ? prev.filter((id) => id !== msgId) : [...prev, msgId]
    );
  };

  const handleFeedback = (msgId: string, feedback: "up" | "down") => {
    setMessages((prev) => prev.map((m) => (m.id === msgId ? { ...m, feedback } : m)));

    if (feedback === "down") {
      setActiveGapMessageId(msgId);
    }
  };

  const handleSubmitGap = (msgId: string) => {
    const targetMessage = messages.find((msg) => msg.id === msgId);
    void submitKnowledgeFeedback({
      question: targetMessage?.question || "",
      fallback_reason: targetMessage?.knowledgeGap?.reason || "用户主动提交知识补充",
      scene: currentIdentity === "student" ? learnerRoleMeta.label : "工作人员",
    }).catch(() => undefined);
    setSubmittedGapIds((prev) => (prev.includes(msgId) ? prev : [...prev, msgId]));
    setActiveGapMessageId(null);
  };

  const activeEvalRole = currentIdentity === "student" ? selectedLearnerRole : "sales";
  const activeEvaluationQuestions = evaluationQuestions.filter((item) => item.role === activeEvalRole);
  const evaluationSummary = evaluationResults.reduce(
    (summary, item) => {
      if (item.status === "pass") summary.pass += 1;
      if (item.status === "review") summary.review += 1;
      if (item.status === "error") summary.error += 1;
      summary.sources += item.sourceCount;
      return summary;
    },
    { pass: 0, review: 0, error: 0, sources: 0 }
  );

  const runEvaluation = async (limit?: number) => {
    const testItems = activeEvaluationQuestions.slice(0, limit || activeEvaluationQuestions.length);
    setIsEvaluating(true);
    setEvaluationResults([]);

    const nextResults: EvaluationResult[] = [];
    for (const item of testItems) {
      const startedAt = Date.now();
      try {
        const result = await queryKnowledgeBase({
          question: item.question,
          role_hint: item.role,
          top_k: 5,
        });
        const hasJsonLeak = looksLikeJsonAnswer(result.direct_answer) || looksLikeJsonAnswer(result.answer);
        const hasExpectedFocus = item.expectedFocus.some((focus) =>
          `${result.direct_answer}\n${result.answer}`.includes(focus)
        );
        const missingFocus = item.expectedFocus.filter((focus) =>
          !`${result.direct_answer}\n${result.answer}`.includes(focus)
        );
        const status = !result.fallback && result.citations.length > 0 && result.answer_sections && !hasJsonLeak && hasExpectedFocus
          ? "pass"
          : "review";
        nextResults.push({
          id: item.id,
          question: item.question,
          category: item.category,
          status,
          confidence: result.confidence,
          sourceCount: result.citations.length,
          latency: Date.now() - startedAt,
          expectedFocus: item.expectedFocus,
          missingFocus,
          role: item.role,
          reason: status === "pass"
            ? "有结构化答案、来源依据和关键命中"
            : result.fallback
              ? "进入回退，需要补知识或优化检索"
              : hasJsonLeak
                ? "存在 JSON 字符串透出风险"
                : "关键要点或来源不足，建议复核",
        });
      } catch (error) {
        nextResults.push({
          id: item.id,
          question: item.question,
          category: item.category,
          status: "error",
          sourceCount: 0,
          latency: Date.now() - startedAt,
          expectedFocus: item.expectedFocus,
          missingFocus: item.expectedFocus,
          role: item.role,
          reason: error instanceof Error ? error.message : "评测调用失败",
        });
      }
      setEvaluationResults([...nextResults]);
    }

    setIsEvaluating(false);
  };

  const openEvaluationGap = (result: EvaluationResult) => {
    const gap = createEvaluationGap(result);
    setActiveEvaluationGap({
      result,
      gap,
      markdown: buildGapMarkdown(result, gap),
    });
  };

  const copyEvaluationGapMarkdown = (result: EvaluationResult) => {
    const gap = createEvaluationGap(result);
    void navigator.clipboard.writeText(buildGapMarkdown(result, gap));
  };

  const submitEvaluationGap = (draft: EvaluationGapDraft) => {
    void submitKnowledgeFeedback({
      question: draft.result.question,
      fallback_reason: draft.gap.reason,
      scene: `AI问答评测 / ${draft.result.category}`,
      missing_items: draft.gap.missingItems,
      markdown_template: draft.markdown,
    }).catch(() => undefined);
    setSubmittedEvaluationGapIds((prev) => prev.includes(draft.result.id) ? prev : [...prev, draft.result.id]);
    setActiveEvaluationGap(null);
  };


  const activeGapMessage = messages.find((msg) => msg.id === activeGapMessageId && msg.role === "assistant");
  const activeGap = activeGapMessage?.knowledgeGap ??
    (activeGapMessage?.question ? createKnowledgeGap(activeGapMessage.question) : null);

  return (
    <div className="flex flex-col h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex-shrink-0">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-visible">
            <img src="/APP.png" alt="AI Avatar" className="w-full h-full object-cover scale-[1.25]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-sm font-semibold text-gray-900">AI 问答</h1>
              {currentIdentity === "student" && <span className="text-xs px-2 py-0.5 rounded-full bg-[#EAF1FF] text-[#2F5FD0]">{learnerRoleMeta.label}</span>}
            </div>
            {showHeaderHelperText && <p className="text-xs text-gray-500">{headerHelperText}</p>}

          </div>
          <button
            type="button"
            onClick={() => setShowKbStatus((value) => !value)}
            className={`ml-auto flex items-center gap-1.5 text-xs px-2 py-1 rounded-full transition-colors ${
              kbHealthError
                ? "text-[#B45309] bg-amber-50 hover:bg-amber-100"
                : "text-[#16A34A] bg-green-50 hover:bg-green-100"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${kbHealthError ? "bg-[#F59E0B]" : "bg-[#16A34A]"}`} />
            {kbHealthError ? "知识库待检查" : "正式知识库已接入"}
            {showKbStatus ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
        {showKbStatus && (
          <div className="max-w-3xl mx-auto mt-3 rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-gray-900">知识库状态检查</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {kbHealthError || `已索引 ${kbHealth?.entry_count ?? "-"} 条 · 快照 ${kbHealth?.kb_snapshot_id ?? "-"}`}
                </p>
              </div>
              <button
                type="button"
                onClick={refreshKbHealth}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-white"
              >
                刷新
              </button>
            </div>
            {kbHealth && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                <div className="rounded-lg bg-white border border-gray-100 px-2.5 py-2">
                  <p className="text-[11px] text-gray-400">正式条目</p>
                  <p className="text-sm font-semibold text-gray-900">{kbHealth.entry_count}</p>
                </div>
                <div className="rounded-lg bg-white border border-gray-100 px-2.5 py-2">
                  <p className="text-[11px] text-gray-400">源文件</p>
                  <p className="text-sm font-semibold text-gray-900">{kbHealth.source_file_count ?? "-"}</p>
                </div>
                <div className="rounded-lg bg-white border border-gray-100 px-2.5 py-2">
                  <p className="text-[11px] text-gray-400">被过滤</p>
                  <p className="text-sm font-semibold text-[#F59E0B]">{kbHealth.filtered_entry_count ?? 0}</p>
                </div>
                <div className="rounded-lg bg-white border border-gray-100 px-2.5 py-2">
                  <p className="text-[11px] text-gray-400">最近查询</p>
                  <p className={`text-sm font-semibold ${
                    kbHealth.last_query?.status === "ok"
                      ? "text-[#16A34A]"
                      : kbHealth.last_query?.status === "error"
                        ? "text-[#DC2626]"
                        : "text-[#F59E0B]"
                  }`}>
                    {getLastQueryLabel(kbHealth.last_query?.status)}
                  </p>
                </div>
              </div>
            )}
            {kbHealth && (
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl bg-white border border-gray-100 px-3 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-gray-900">目录扫描</p>
                    <span className="text-[11px] text-gray-400">索引 {formatKbTime(kbHealth.indexed_at)}</span>
                  </div>
                  <div className="mt-2 space-y-2">
                    {kbHealth.source_roots?.map((root) => (
                      <div key={root.path} className="rounded-lg bg-[#F5F7FA] px-2.5 py-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${root.exists ? "bg-[#16A34A]" : "bg-[#DC2626]"}`} />
                          <p className="text-xs text-gray-800 flex-1">{root.label}</p>
                          <span className="text-[11px] text-gray-500">{root.current_entry_count}/{root.file_count}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1 truncate">{root.path}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-white border border-gray-100 px-3 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-gray-900">模型与最近查询</p>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                      kbHealth.minimax?.configured ? "bg-green-50 text-[#15803D]" : "bg-amber-50 text-[#B45309]"
                    }`}>
                      MiniMax {kbHealth.minimax?.configured ? "已配置" : "未配置"}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-[#F5F7FA] px-2.5 py-2">
                      <p className="text-[11px] text-gray-400">模型</p>
                      <p className="text-xs font-medium text-gray-900 truncate">{kbHealth.minimax?.model || "本地摘要"}</p>
                    </div>
                    <div className="rounded-lg bg-[#F5F7FA] px-2.5 py-2">
                      <p className="text-[11px] text-gray-400">调用方式</p>
                      <p className="text-xs font-medium text-gray-900">{kbHealth.minimax?.api_style || "-"}</p>
                    </div>
                    <div className="rounded-lg bg-[#F5F7FA] px-2.5 py-2">
                      <p className="text-[11px] text-gray-400">命中数</p>
                      <p className="text-xs font-medium text-gray-900">{kbHealth.last_query?.hit_count ?? "-"}</p>
                    </div>
                    <div className="rounded-lg bg-[#F5F7FA] px-2.5 py-2">
                      <p className="text-[11px] text-gray-400">耗时</p>
                      <p className="text-xs font-medium text-gray-900">
                        {kbHealth.last_query?.latency_ms ? `${(kbHealth.last_query.latency_ms / 1000).toFixed(1)}s` : "-"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 rounded-lg bg-[#F5F7FA] px-2.5 py-2">
                    <p className="text-[11px] text-gray-400">最近问题</p>
                    <p className="text-xs text-gray-700 mt-0.5 line-clamp-2">{kbHealth.last_query?.question || "暂无查询记录"}</p>
                    {(kbHealth.last_query?.fallback_reason || kbHealth.last_query?.error) && (
                      <p className="text-[11px] text-[#B45309] mt-1">
                        {kbHealth.last_query.error || kbHealth.last_query.fallback_reason}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {kbHealth && Boolean(kbHealth.recent_files?.length) && (
              <div className="mt-3 rounded-xl bg-white border border-gray-100 px-3 py-3">
                <p className="text-xs font-medium text-gray-900">最近入库文件</p>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  {kbHealth.recent_files?.slice(0, 6).map((file) => (
                    <div key={`${file.relative_path}-${file.updated_at}`} className="rounded-lg bg-[#F5F7FA] px-2.5 py-2">
                      <p className="text-xs text-gray-800 truncate">{file.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 truncate">{file.relative_path}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {formatKbTime(file.updated_at)} · {formatFileSize(file.size)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {kbHealth && (
              <div className="mt-2 text-[11px] text-gray-400 truncate">
                来源目录：{kbHealth.source_root} · 数据根目录：{kbHealth.data_root}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => {
            const isGapSubmitted = submittedGapIds.includes(msg.id);
            const isDetailExpanded = expandedDetails.includes(msg.id);

            return (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-1 overflow-visible">
                    <img src="/APP.png" alt="AI Avatar" className="w-full h-full object-cover scale-[1.25]" />
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.role === "user" ? "max-w-[75%]" : ""}`}>
                  {msg.role === "user" ? (
                    <div className="bg-[#2F5FD0] text-white px-4 py-2.5 rounded-xl rounded-tr-sm text-sm">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {msg.directAnswer && (
                        <div className="bg-[#EEF2FF] border border-[#2F5FD0]/20 rounded-xl px-4 py-3">
                          <div className="flex items-center gap-1.5 mb-2">
                            <Zap size={12} className="text-[#2F5FD0]" />
                            <span className="text-xs font-medium text-[#2F5FD0]">可直接对客户说的话</span>
                          </div>
                          <p className="text-sm text-gray-800 leading-relaxed">{msg.directAnswer}</p>
                          <button
                            onClick={() => navigator.clipboard.writeText(msg.directAnswer || "")}
                            className="flex items-center gap-1 text-xs text-[#2F5FD0] mt-2 hover:text-[#2550B8]"
                          >
                            <Copy size={10} /> 复制话术
                          </button>
                        </div>
                      )}

                      {msg.content !== messages[0].content && (
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                          <button
                            type="button"
                            onClick={() => toggleDetails(msg.id)}
                            className="w-full flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                            aria-expanded={isDetailExpanded}
                          >
                            <span className="text-xs text-gray-500">详细解释</span>
                            {msg.answerState === "needs-review" && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs text-[#B45309]">
                                <AlertTriangle size={11} /> 来源不足，建议回流补充
                              </span>
                            )}
                            <span className="ml-auto">
                              {isDetailExpanded ? (
                                <ChevronUp size={13} className="text-gray-400" />
                              ) : (
                                <ChevronDown size={13} className="text-gray-400" />
                              )}
                            </span>
                          </button>
                          {isDetailExpanded && (
                            <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-700 leading-relaxed">
                              {msg.answerSections ? (
                                <div className="space-y-3">
                                  {msg.answerSections.internal_explanation && (
                                    <div>
                                      <p className="text-xs font-medium text-gray-900 mb-1">内部解释</p>
                                      <p>{msg.answerSections.internal_explanation}</p>
                                    </div>
                                  )}
                                  {Boolean(msg.answerSections.basis_summary?.length) && (
                                    <div>
                                      <p className="text-xs font-medium text-gray-900 mb-1">依据摘要</p>
                                      <ul className="space-y-1">
                                        {msg.answerSections.basis_summary?.map((item, index) => (
                                          <li key={`${item}-${index}`} className="flex gap-1.5">
                                            <span className="text-[#2F5FD0]">•</span>
                                            <span>{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {msg.answerSections.risk_boundary && (
                                    <div>
                                      <p className="text-xs font-medium text-gray-900 mb-1">风险边界</p>
                                      <p>{msg.answerSections.risk_boundary}</p>
                                    </div>
                                  )}
                                  {msg.answerSections.next_step && (
                                    <div>
                                      <p className="text-xs font-medium text-gray-900 mb-1">下一步建议</p>
                                      <p>{msg.answerSections.next_step}</p>
                                    </div>
                                  )}
                                  {(msg.model || msg.traceId || msg.kbSnapshotId) && (
                                    <p className="pt-2 border-t border-gray-100 text-xs text-gray-400">
                                      {msg.model || "local-extractive"}{msg.traceId ? ` · ${msg.traceId}` : ""}{msg.kbSnapshotId ? ` · ${msg.kbSnapshotId}` : ""}
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <div className="whitespace-pre-line">
                                  {normalizeDisplayContent(msg.content).split("**").map((part, i) =>
                                    i % 2 === 1 ? (
                                      <strong key={i} className="font-medium text-gray-900">{part}</strong>
                                    ) : (
                                      <span key={i}>{part}</span>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {!msg.directAnswer && !msg.sources && (
                        <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
                          <p className="text-sm text-gray-700 leading-relaxed">{msg.content}</p>
                        </div>
                      )}

                      {msg.sources && (
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                          <button
                            onClick={() => toggleSources(msg.id)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                          >
                            <BookOpen size={13} className="text-gray-400" />
                            <span className="text-xs text-gray-500">来源依据 ({msg.sources.length})</span>
                            <span className="ml-auto">
                              {expandedSources.includes(msg.id) ? (
                                <ChevronUp size={13} className="text-gray-400" />
                              ) : (
                                <ChevronDown size={13} className="text-gray-400" />
                              )}
                            </span>
                          </button>

                          {expandedSources.includes(msg.id) && (
                            <div className="border-t border-gray-100 divide-y divide-gray-50">
                              {msg.sources.map((source, i) => (
                                <div key={i} className="px-4 py-2.5">
                                  <div className="flex items-start gap-2">
                                    <span className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded mt-0.5 ${
                                      source.reliability === "high"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-amber-100 text-amber-700"
                                    }`}>
                                      {source.reliability === "high" ? "高可信" : "参考"}
                                    </span>
                                    <div className="min-w-0">
                                      <div className="flex items-start gap-2">
                                        <p className="text-xs text-gray-700 flex-1">{source.id ? `${source.id} · ` : ""}{source.title}</p>
                                        {source.excerpt && (
                                          <button
                                            type="button"
                                            onClick={() => navigator.clipboard.writeText(source.excerpt || "")}
                                            className="text-xs text-[#2F5FD0] hover:text-[#2550B8] flex-shrink-0"
                                          >
                                            复制依据
                                          </button>
                                        )}
                                      </div>
                                      <p className="text-xs text-gray-400 mt-0.5">
                                        {source.version}{source.kbRevision ? ` · ${source.kbRevision}` : ""} · {source.section}
                                      </p>
                                      <div className="flex flex-wrap gap-1 mt-1.5">
                                        {source.knowledgeType && (
                                          <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[11px] text-[#2F5FD0]">{source.knowledgeType}</span>
                                        )}
                                        {source.authorityLevel && (
                                          <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] text-[#15803D]">{source.authorityLevel}</span>
                                        )}
                                        {source.category && (
                                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">{source.category}</span>
                                        )}
                                      </div>
                                      {(source.sourceId || source.sourceFile) && (
                                        <p className="text-xs text-gray-400 mt-0.5">
                                          {source.sourceId || "未标注来源ID"} · {source.sourceFile || "未标注来源文件"}
                                        </p>
                                      )}
                                      {(source.relativePath || source.score !== undefined) && (
                                        <p className="text-xs text-gray-400 mt-0.5 truncate">
                                          {source.relativePath || "正式知识库"}{source.score !== undefined ? ` · 命中 ${source.score}` : ""}
                                        </p>
                                      )}
                                      {Boolean(source.matchReason?.length) && (
                                        <div className="flex flex-wrap gap-1 mt-1.5">
                                          {source.matchReason?.slice(0, 4).map((reason) => (
                                            <span key={reason} className="rounded-full border border-gray-200 px-2 py-0.5 text-[11px] text-gray-500">
                                              {reason}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                      {Boolean(source.matchedTerms?.length) && (
                                        <p className="text-[11px] text-gray-400 mt-1">
                                          命中词：{source.matchedTerms?.slice(0, 8).join("、")}
                                        </p>
                                      )}
                                      {Boolean(source.applicableRoles?.length || source.applicableScenes?.length) && (
                                        <p className="text-[11px] text-gray-400 mt-1">
                                          适用：{[...(source.applicableRoles || []), ...(source.applicableScenes || [])].slice(0, 6).join("、")}
                                        </p>
                                      )}
                                      {source.excerpt && (
                                        <p className="text-xs text-gray-600 mt-2 leading-relaxed bg-[#F5F7FA] rounded-lg px-2.5 py-2">
                                          {source.excerpt}
                                        </p>
                                      )}
                                      {Boolean(source.tags?.length || source.updatedAt) && (
                                        <p className="text-[11px] text-gray-400 mt-1">
                                          {source.tags?.slice(0, 5).join("、")}{source.updatedAt ? ` · 更新 ${source.updatedAt}` : ""}
                                        </p>
                                      )}
                                    </div>

                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {msg.directAnswer && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-gray-400">回答是否有帮助？</span>
                          <button
                            onClick={() => handleFeedback(msg.id, "up")}
                            className={`p-1 rounded transition-colors ${
                              msg.feedback === "up" ? "text-[#16A34A] bg-green-50" : "text-gray-400 hover:text-gray-600"
                            }`}
                          >
                            <ThumbsUp size={12} />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, "down")}
                            className={`p-1 rounded transition-colors ${
                              msg.feedback === "down" ? "text-[#DC2626] bg-red-50" : "text-gray-400 hover:text-gray-600"
                            }`}
                          >
                            <ThumbsDown size={12} />
                          </button>
                          <button
                            onClick={() => setActiveGapMessageId(msg.id)}
                            className="text-xs text-[#2F5FD0] hover:text-[#2550B8]"
                          >
                            答案不够准确？提交知识补充
                          </button>
                          <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                            <Clock size={9} />
                            {msg.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      )}

                      {msg.knowledgeGap && (
                        <div className={`rounded-xl border px-4 py-3 ${isGapSubmitted ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
                          <div className="flex items-start gap-2">
                            {isGapSubmitted ? (
                              <CheckCircle2 size={15} className="text-[#15803D] mt-0.5 flex-shrink-0" />
                            ) : (
                              <AlertTriangle size={15} className="text-[#B45309] mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className={`text-sm font-medium ${isGapSubmitted ? "text-[#15803D]" : "text-[#92400E]"}`}>
                                  {isGapSubmitted ? "知识补充已提交" : msg.knowledgeGap.title}
                                </p>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${isGapSubmitted ? "bg-green-100 text-[#15803D]" : "bg-amber-100 text-[#B45309]"}`}>
                                  {msg.knowledgeGap.priority === "high" ? "高优先" : "常规"}
                                </span>
                              </div>
                              <p className={`text-xs mt-1 leading-relaxed ${isGapSubmitted ? "text-[#166534]" : "text-[#92400E]"}`}>
                                {isGapSubmitted
                                  ? "已生成待补知识项，后续应同步到信息同步中心、培训题库与陪练场景。"
                                  : msg.knowledgeGap.reason}
                              </p>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {msg.knowledgeGap.missingItems.map((item) => (
                                  <span
                                    key={item}
                                    className={`text-xs px-2 py-1 rounded-full ${isGapSubmitted ? "bg-white text-[#166534] border border-green-200" : "bg-white/80 text-[#92400E] border border-amber-200"}`}
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                              <div className="mt-3 flex items-center gap-2 flex-wrap">
                                <button
                                  onClick={() => setActiveGapMessageId(msg.id)}
                                  disabled={isGapSubmitted}
                                  className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                                    isGapSubmitted
                                      ? "bg-green-100 text-[#15803D] cursor-default"
                                      : "bg-[#1E2A3A] hover:bg-[#162030] text-white"
                                  }`}
                                >
                                  {isGapSubmitted ? "已提交待补充" : "发起知识补充"}
                                </button>
                                <button
                                  onClick={() => navigate("/workbench/info-sync")}
                                  className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-white transition-colors"
                                >
                                  转信息同步中心
                                </button>
                                <button
                                  onClick={() => navigate("/workbench/content-ops")}
                                  className="text-xs text-[#2F5FD0] hover:text-[#2550B8]"
                                >
                                  查看社区运营同步状态
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-visible">
                <img src="/APP.png" alt="AI Avatar" className="w-full h-full object-cover scale-[1.25]" />
              </div>
              <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FD0] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FD0] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FD0] animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="text-xs text-gray-400 ml-1">正在检索知识库与标准口径...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {messages.length <= 1 && (
        <div className="px-4 md:px-6 pb-2 flex-shrink-0">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-gray-400 mb-2">常见问题</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs bg-white border border-gray-200 hover:border-[#2F5FD0] hover:text-[#2F5FD0] text-gray-600 px-2.5 py-1.5 rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border-t border-gray-200 px-4 md:px-6 py-2.5 flex-shrink-0">
        <div className="max-w-3xl mx-auto flex items-end gap-2">
          <div className="flex-1 bg-[#F5F7FA] border border-gray-200 rounded-xl px-4 py-2 focus-within:border-[#2F5FD0] transition-colors">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="问我任何产品、工艺、话术问题..."
              className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none resize-none max-h-28"
              rows={1}
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
              inputValue.trim() && !isLoading
                ? "bg-[#2F5FD0] hover:bg-[#2550B8] text-white"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <div className="fixed right-4 bottom-[calc(8.75rem+env(safe-area-inset-bottom))] md:bottom-20 z-40 flex flex-col items-end gap-3">
        {isVoicePanelOpen && (
          <div className="w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
            <div className="px-4 py-3 bg-[#1E2A3A] text-white">
              <div className="flex items-center gap-2">
                <Radio size={15} className={voiceStatus === "listening" ? "text-[#16A34A]" : "text-white/70"} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">语音问答监听</p>
                  <p className="text-xs text-white/60 truncate">
                    {voiceStatus === "listening" ? `监听中 ${voiceElapsed}s` : "按当前题目采集学员口头回答"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVoicePanelOpen(false)}
                  className="text-xs text-white/60 hover:text-white"
                >
                  收起
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="rounded-xl bg-[#F5F7FA] px-3 py-3">
                <p className="text-xs text-gray-400">当前计分题目</p>
                <p className="text-sm text-gray-800 leading-relaxed mt-1 line-clamp-3">{activeVoiceQuestion}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activeVoiceFocus.map((focus) => (
                    <span key={focus} className="text-xs rounded-full bg-white border border-gray-200 px-2 py-0.5 text-gray-500">
                      {focus}
                    </span>
                  ))}
                </div>
              </div>

              {voiceError && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-[#92400E] leading-relaxed">
                  {voiceError}
                </div>
              )}

              <div className="grid grid-cols-[1fr_auto] gap-2">
                <button
                  type="button"
                  onClick={voiceStatus === "listening" ? stopVoiceMonitor : startVoiceMonitor}
                  className={`rounded-xl px-3 py-2.5 text-sm text-white transition-colors flex items-center justify-center gap-2 ${
                    voiceStatus === "listening" ? "bg-[#DC2626] hover:bg-red-700" : "bg-[#2F5FD0] hover:bg-[#2550B8]"
                  }`}
                >
                  {voiceStatus === "listening" ? <Square size={14} /> : <Mic size={15} />}
                  {voiceStatus === "listening" ? "结束并计分" : "开始监听"}
                </button>
                <button
                  type="button"
                  onClick={() => handleSend(activeVoiceQuestion)}
                  className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                >
                  问AI
                </button>
              </div>

              <div className="rounded-xl border border-gray-200 px-3 py-3">
                <div className="flex items-center gap-2 mb-2">
                  {voiceStatus === "listening" ? <Mic size={13} className="text-[#16A34A]" /> : <MicOff size={13} className="text-gray-400" />}
                  <span className="text-xs font-medium text-gray-900">实时转写</span>
                  {liveVoiceScore && (
                    <span className={`ml-auto text-xs rounded-full px-2 py-0.5 ${
                      liveVoiceScore.totalScore >= 70 ? "bg-green-50 text-[#15803D]" : "bg-red-50 text-[#DC2626]"
                    }`}>
                      {liveVoiceScore.totalScore} 分
                    </span>
                  )}
                </div>
                <p className="min-h-14 max-h-28 overflow-y-auto text-sm text-gray-700 leading-relaxed">
                  {voiceTranscript || "等待学员开始回答。系统会按题目关键点、语气、表达方式、结构和充分度进行评分。"}
                </p>
              </div>

              {liveVoiceScore && (
                <div className="space-y-2">
                  {liveVoiceScore.dimensions.map((dimension) => (
                    <div key={dimension.label}>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs text-gray-600">{dimension.label}</span>
                        <span className="text-xs text-gray-400">{dimension.score}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full bg-[#2F5FD0]" style={{ width: `${dimension.score}%` }} />
                      </div>
                    </div>
                  ))}
                  {liveVoiceScore.missingFocus.length > 0 && (
                    <p className="text-xs text-[#DC2626] leading-relaxed">
                      缺少要点：{liveVoiceScore.missingFocus.join("、")}
                    </p>
                  )}
                </div>
              )}

              {voiceScores.length > 0 && (
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-medium text-gray-900 mb-2">最近语音计分</p>
                  <div className="space-y-2 max-h-36 overflow-y-auto">
                    {voiceScores.map((record) => (
                      <div key={record.id} className="rounded-xl bg-[#F8FAFC] border border-gray-100 px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Gauge size={13} className={record.level === "risk" ? "text-[#DC2626]" : "text-[#16A34A]"} />
                          <span className="text-sm font-medium text-gray-900">{record.totalScore} 分</span>
                          <span className="text-xs text-gray-400 ml-auto">{record.durationSeconds}s</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{record.transcript}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsVoicePanelOpen((value) => !value)}
          className={`relative h-14 w-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all ${
            voiceStatus === "listening" ? "bg-[#DC2626]" : "bg-[#2F5FD0] hover:bg-[#2550B8]"
          }`}
          aria-label="打开语音问答监听"
        >
          {voiceStatus === "listening" ? <MicOff size={22} /> : <Mic size={22} />}
          {voiceStatus === "listening" && (
            <span className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-white px-1 text-[10px] text-[#DC2626] flex items-center justify-center">
              {voiceElapsed}
            </span>
          )}
        </button>
      </div>

      {activeGapMessageId && activeGap && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-[#B45309]" />
                <h3 className="text-base font-medium text-gray-900">发起知识补充</h3>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                回答不足时，先生成待补知识项，再同步到信息同步中心、培训题库与陪练场景。
              </p>
            </div>

            <div className="px-5 py-4 space-y-4">
              <div className="rounded-xl bg-[#F5F7FA] px-3 py-3">
                <p className="text-xs text-gray-400">问题</p>
                <p className="text-sm text-gray-800 mt-1 leading-relaxed">{activeGapMessage?.question}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-900 mb-2">待补内容</p>
                <div className="flex flex-wrap gap-1.5">
                  {activeGap.missingItems.map((item) => (
                    <span key={item} className="text-xs px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#92400E]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-gray-200 px-3 py-3">
                  <p className="text-xs text-gray-400">建议承接方</p>
                  <p className="text-sm text-gray-800 mt-1">{activeGap.suggestedOwner}</p>
                </div>
                <div className="rounded-xl border border-gray-200 px-3 py-3">
                  <p className="text-xs text-gray-400">后续同步</p>
                  <p className="text-sm text-gray-800 mt-1">{activeGap.suggestedSync}</p>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">{activeGap.reason}</p>
            </div>

            <div className="px-5 py-4 bg-[#FAFBFC] border-t border-gray-100 flex gap-2">
              <button
                onClick={() => setActiveGapMessageId(null)}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                先取消
              </button>
              <button
                onClick={() => handleSubmitGap(activeGapMessageId)}
                className="flex-1 rounded-xl bg-[#2F5FD0] py-2.5 text-sm text-white hover:bg-[#2550B8] transition-colors"
              >
                提交待补知识项
              </button>
            </div>
          </div>
        </div>
      )}

      {activeEvaluationGap && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-[#B45309]" />
                <h3 className="text-base font-medium text-gray-900">评测缺口待补知识项</h3>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                这条来自 AI 问答评测失败项，可提交为待补知识，也可以复制 Markdown 后补到正式知识库。
              </p>
            </div>

            <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="rounded-xl bg-[#F5F7FA] px-3 py-3">
                <p className="text-xs text-gray-400">评测问题</p>
                <p className="text-sm text-gray-800 mt-1 leading-relaxed">{activeEvaluationGap.result.question}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {activeEvaluationGap.result.category} · 来源 {activeEvaluationGap.result.sourceCount} · {activeEvaluationGap.result.confidence || "-"} · {(activeEvaluationGap.result.latency / 1000).toFixed(1)}s
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p className="text-xs font-medium text-gray-900">待补内容</p>
                  <span className={`text-xs rounded-full px-2 py-0.5 ${
                    activeEvaluationGap.gap.priority === "high"
                      ? "bg-red-50 text-[#DC2626]"
                      : "bg-amber-50 text-[#B45309]"
                  }`}>
                    {activeEvaluationGap.gap.priority === "high" ? "高优先" : "常规"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeEvaluationGap.gap.missingItems.map((item) => (
                    <span key={item} className="text-xs px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#92400E]">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mt-2">{activeEvaluationGap.gap.reason}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="rounded-xl border border-gray-200 px-3 py-3">
                  <p className="text-xs text-gray-400">建议承接方</p>
                  <p className="text-sm text-gray-800 mt-1">{activeEvaluationGap.gap.suggestedOwner}</p>
                </div>
                <div className="rounded-xl border border-gray-200 px-3 py-3">
                  <p className="text-xs text-gray-400">后续同步</p>
                  <p className="text-sm text-gray-800 mt-1">{activeEvaluationGap.gap.suggestedSync}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p className="text-xs font-medium text-gray-900">Markdown 补充模板</p>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(activeEvaluationGap.markdown)}
                    className="text-xs text-[#2F5FD0] hover:text-[#2550B8]"
                  >
                    复制 Markdown
                  </button>
                </div>
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-[#111827] px-3 py-3 text-xs leading-relaxed text-gray-100">
                  {activeEvaluationGap.markdown}
                </pre>
              </div>
            </div>

            <div className="px-5 py-4 bg-[#FAFBFC] border-t border-gray-100 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveEvaluationGap(null)}
                className="flex-1 min-w-28 rounded-xl border border-gray-200 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                先取消
              </button>
              <button
                onClick={() => {
                  navigate("/workbench/info-sync", {
                    state: {
                      from: "ai-qna-evaluation",
                      knowledgeGap: activeEvaluationGap.gap,
                      markdown: activeEvaluationGap.markdown,
                      question: activeEvaluationGap.result.question,
                    },
                  });
                }}
                className="flex-1 min-w-28 rounded-xl border border-gray-200 py-2.5 text-sm text-gray-700 hover:bg-white transition-colors"
              >
                转信息同步
              </button>
              <button
                onClick={() => submitEvaluationGap(activeEvaluationGap)}
                className="flex-1 min-w-28 rounded-xl bg-[#2F5FD0] py-2.5 text-sm text-white hover:bg-[#2550B8] transition-colors"
              >
                提交待补知识项
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
