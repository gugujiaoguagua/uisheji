import { useMemo, useState } from "react";
import {
  Dumbbell,
  ChevronRight,
  AlertTriangle,
  Target,
  Mic,
  MicOff,
  Send,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Play,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Sparkles,
  TriangleAlert,
  CircleAlert,
} from "lucide-react";
import type { LearnerRole } from "../context/AppContext";
import { getLearnerRoleMeta, useApp } from "../context/AppContext";

type Stage = "scene-select" | "briefing" | "session" | "result";

interface Scenario {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  learnerRoles: LearnerRole[];
  desc: string;
  riskTag?: string;
  lastScore?: number;
  recommended?: boolean;
}

const scenarios: Scenario[] = [
  {
    id: "1",
    title: "客户追问：'LSB 和颗粒板到底差在哪？'",
    difficulty: "medium",
    category: "产品讲解",
    learnerRoles: ["sales"],
    desc: "客户同时关心板材、价格和环保，需要把产品差异讲成能听懂的价值",
    riskTag: "高频失分场景",
    lastScore: 72,
    recommended: true,
  },
  {
    id: "2",
    title: "客户问：'衣柜五金为什么还要单独加钱？'",
    difficulty: "medium",
    category: "五金讲解",
    learnerRoles: ["sales", "designer"],
    desc: "客户对功能五金加配价值不敏感，需要从生活习惯和使用体验解释",
    recommended: true,
  },
  {
    id: "3",
    title: "云屏需求挖掘：客户只说'先随便看看'",
    difficulty: "hard",
    category: "接待流程",
    learnerRoles: ["sales"],
    desc: "客户信息不完整时，训练如何围绕户型、预算、重点空间和红线需求追问",
    riskTag: "易流失场景",
    lastScore: 65,
  },
  {
    id: "4",
    title: "客户临时改尺寸和颜色，如何确认非标需求？",
    difficulty: "hard",
    category: "下单规范",
    learnerRoles: ["sales"],
    desc: "下单前客户提出尺寸、颜色或交期变更，需要识别非标并完成留痕确认",
    riskTag: "规则底线",
  },
  {
    id: "5",
    title: "高预算客户微信里反复压价，如何拉回线下面谈？",
    difficulty: "medium",
    category: "高客单成交",
    learnerRoles: ["sales"],
    desc: "训练高净值客户识别、30% 投影预估和团队协同，不在微信里陷入价格拉扯",
  },
  {
    id: "12",
    title: "客户群内情绪爆发：'你们还是人吗？'",
    difficulty: "hard",
    category: "客诉处理",
    learnerRoles: ["sales"],
    desc: "客诉情绪升级时，训练先承接问题，再给动作、责任人和时间点",
    riskTag: "危机公关",
    lastScore: 68,
  },
  {
    id: "13",
    title: "把目标小区小红书线索转成进店邀约",
    difficulty: "medium",
    category: "获客转化",
    learnerRoles: ["sales"],
    desc: "训练从笔记钩子、私信加微到邀逛展厅的 5 节点转化链",
  },
  {
    id: "6",
    title: "门店资源不足，如何向店长沟通补资源",
    difficulty: "medium",
    category: "资源开拓",
    learnerRoles: ["community_ops"],
    desc: "门店现有资源不足，需要运营判断缺口并推动店长补充资源",
    riskTag: "运营新人必练",
    recommended: true,
  },
  {
    id: "7",
    title: "某小区群人数长期不达标，如何制定动作",
    difficulty: "hard",
    category: "社群运营",
    learnerRoles: ["community_ops"],
    desc: "小区群人数低于目标，需要拆解原因、制定拉新和活跃动作",
    riskTag: "高风险小区",
    lastScore: 62,
    recommended: true,
  },
  {
    id: "8",
    title: "添加微信数据偏低，如何定位原因",
    difficulty: "hard",
    category: "指标异常",
    learnerRoles: ["ops_manager"],
    desc: "从曝光、触达、邀约、执行和人员动作中定位微信添加偏低原因",
    riskTag: "指标判断",
    lastScore: 68,
  },
  {
    id: "9",
    title: "活动转化差，如何组织复盘",
    difficulty: "medium",
    category: "转化复盘",
    learnerRoles: ["ops_manager"],
    desc: "活动后转化不达标，需要用数据和过程记录做复盘并沉淀动作",
  },
  {
    id: "10",
    title: "样板间推进停滞，如何协调门店和人员",
    difficulty: "medium",
    category: "转化复盘",
    learnerRoles: ["ops_manager"],
    desc: "样板间推进卡住时，训练运营如何协调门店、销售和执行人员",
  },
  {
    id: "11",
    title: "会审时如何讲清方案并确认客户红线",
    difficulty: "medium",
    category: "方案讲解",
    learnerRoles: ["designer"],
    desc: "训练设计师把客户需求、图纸表达、报价边界和销售口径讲清楚",
    riskTag: "设计师必练",
    recommended: true,
  },
];

const mockConversation = [
  { role: "customer", content: "你们一直说 LSB 板更好，但我看别家颗粒板也差不多，为什么要多花这笔钱？" },
  { role: "user", content: "您问得很关键。板材不能只看名字，我会从稳定性、环保表达和后期使用三个角度给您讲清楚。" },
  { role: "customer", content: "我不想听太专业的名词，你就说跟我家使用有什么关系。" },
  { role: "user", content: "好的。比如衣柜每天开关、受潮和承重都会考验板材，LSB 的优势要落到不易变形、使用更稳和环保更安心这些体验上。" },
];

const salesConversationMap: Record<string, { role: string; content: string }[]> = {
  "2": [
    { role: "customer", content: "拉篮、阻尼、裤架这些听起来都不错，但为什么每一项都要加钱？" },
    { role: "user", content: "我先不按配件名讲，我按您每天怎么用衣柜来讲。哪些是基础结构，哪些是省力和提升收纳效率的功能五金。" },
    { role: "customer", content: "如果预算有限，哪些是真的值得留？" },
    { role: "user", content: "我会先保留高频使用、影响寿命和体验的部分，比如铰链、阻尼和常用收纳，再看您的生活习惯决定是否加扩展五金。" },
  ],
  "3": [
    { role: "customer", content: "我们今天就是随便看看，还没想那么细。" },
    { role: "user", content: "没关系，我先帮您把方向理出来。方便问下是新房还是旧改？重点想先看哪个空间？" },
    { role: "customer", content: "主要是衣柜和客厅，但预算还没定。" },
    { role: "user", content: "那我先按户型、常住人口、预算区间和不能接受的红线来帮您初步判断，后面量尺设计才不会偏。" },
  ],
  "4": [
    { role: "customer", content: "我想把这个柜子的尺寸再改一下，颜色也换个特殊色，应该没什么问题吧？" },
    { role: "user", content: "这两个都可能涉及非标，我先帮您确认影响范围。尺寸、颜色、交期和费用都需要在下单前书面确认。" },
    { role: "customer", content: "之前口头说过可以改，为什么现在还要签字？" },
    { role: "user", content: "签字不是增加麻烦，是为了避免生产和交付口径不一致。我会把变更点、确认版本和终审时间一起留痕。" },
  ],
  "5": [
    { role: "customer", content: "你先在微信里给我最低价吧，合适我再过去。" },
    { role: "user", content: "价格我会帮您算清楚，但这类全屋方案单看微信报价容易漏项。我建议先用户型和需求做一版预估，再约到店里把方案拆开看。" },
    { role: "customer", content: "我就是想先比个价，没必要到店。" },
    { role: "user", content: "理解。您这个房子的预算空间比较大，差价往往来自配置和方案完整度。我先帮您做 30% 投影预估，再判断哪些项值得现场细看。" },
  ],
  "12": [
    { role: "customer", content: "工期一拖再拖，群里没人正面回复，你们还是人吗？" },
    { role: "user", content: "这件事让您这么着急，是我们响应没有做到位。我先把问题接下来，今天几点前给您现场处理动作和下一次反馈时间。" },
    { role: "customer", content: "你别再解释了，我要看到有人管。" },
    { role: "user", content: "我不再空解释。第一，我现在同步负责人到场；第二，列出今天能解决和需要二次确认的事项；第三，每两个小时给您一次进展。" },
  ],
  "13": [
    { role: "customer", content: "我看到你发的小区案例，想了解一下，但我还没准备户型图。" },
    { role: "user", content: "可以先不用完整户型图。我先确认您是哪个小区、准备做哪些空间，再判断是不是适合到店看样和做初步方案。" },
    { role: "customer", content: "我就是先问问，暂时不一定去店里。" },
    { role: "user", content: "没问题。我可以先发您同小区的空间参考，再约一个不超过 30 分钟的看样时间，现场把预算和材料选择讲清楚。" },
  ],
};

const opsConversation = [
  { role: "customer", content: "这个小区我们跟了两周，群人数还是上不去，门店也说没什么新资源，你打算怎么推？" },
  { role: "user", content: "我先把问题拆成资源、触达和执行三层看。先确认门店现有客户池和小区触达名单，再判断是资源不足还是动作节奏不够。" },
  { role: "customer", content: "如果店长觉得这不是他的重点，你怎么让他配合？" },
  { role: "user", content: "我会用缺口数据说明影响，比如群人数、添加微信和 QC 差额，再把需要店长配合的动作拆成具体清单和截止时间。" },
];

const designerConversation = [
  { role: "customer", content: "这个方案我感觉还可以，但有些地方我怕后期不好用，你能讲清楚为什么这样设计吗？" },
  { role: "user", content: "我先按您的核心需求讲：收纳、动线和预算边界。这个位置这样处理，是为了减少开门冲突，同时保留后期调整空间。" },
  { role: "customer", content: "那销售前面说的预算和你这个方案能对上吗？" },
  { role: "user", content: "我会把图纸版本、报价范围和不可做项一起核对，确认哪些是已包含，哪些需要二次确认，避免后面审单返工。" },
];

function getInitialConversation(scenario?: Scenario | null) {
  if (scenario?.learnerRoles.includes("sales") && salesConversationMap[scenario.id]) {
    return salesConversationMap[scenario.id];
  }

  if (scenario?.category === "方案讲解") {
    return designerConversation;
  }

  if (["资源开拓", "社群运营", "指标异常", "转化复盘"].includes(scenario?.category || "")) {
    return opsConversation;
  }

  return mockConversation;
}

const resultData = {
  totalScore: 78,
  prevScore: 72,
  dimensions: [
    { name: "需求识别", score: 85, feedback: "能先抓住客户真正关心的是价格、环保还是后期使用风险" },
    { name: "知识解释", score: 80, feedback: "能把板材、五金或规则知识翻译成客户能听懂的使用价值" },
    { name: "风险收口", score: 72, feedback: "下单、客诉等高风险场景还需要更明确责任人、时间点和留痕动作" },
    { name: "推进动作", score: 75, feedback: "解释完之后要顺手推进到量尺、到店、确认版本或下一次反馈" },
  ],
  highlights: ["没有只背产品名词，而是尝试把知识点转成客户体验", "开场先接住客户问题，再进入结构化解释"],
  riskPoints: [
    "规则和客诉类场景里，容易只解释原因，没有同步下一步动作。",
    "价值说完后没有顺势追问客户更关心预算、环保还是使用寿命。",
  ],
  omissions: [
    "没有主动确认客户户型、重点空间、预算区间或红线需求。",
    "没有补充来源依据、签字留痕或时间节点，闭环还差半步。",
  ],
  suggestedPractice: "建议继续练习：云屏需求挖掘和下单规范场景，把知识解释落到真实动作闭环",
};

function getScenarioGoals(scenario?: Scenario | null) {
  if (scenario?.category === "产品讲解") {
    return [
      "先判断客户问的是价格、环保还是使用寿命，不要只背板材名词。",
      "把 LSB、颗粒板等差异转成稳定性、环保安心和长期使用体验。",
      "最后追问客户家的空间和预算，让产品讲解进入方案判断。",
    ];
  }

  if (scenario?.category === "五金讲解") {
    return [
      "先按客户生活习惯讲使用价值，再说五金名称。",
      "区分基础结构五金和提升体验的功能五金，帮助客户做取舍。",
      "预算有限时给出优先级，不要一味堆配置。",
    ];
  }

  if (scenario?.category === "接待流程") {
    return [
      "客户说随便看看时，先降低压力，再进入结构化追问。",
      "围绕户型、常住人口、重点空间、预算区间和红线需求挖掘。",
      "把云屏需求挖掘结果引向量尺设计或下一步到店动作。",
    ];
  }

  if (scenario?.category === "下单规范") {
    return [
      "识别尺寸、颜色、面料、交期等是否触发非标。",
      "明确哪些内容不能只靠口头承诺，必须版本确认和签字留痕。",
      "把 24 小时终审、责任人和客户确认动作说清楚。",
    ];
  }

  if (scenario?.category === "高客单成交") {
    return [
      "先识别高预算客户信号，不急着进入低价比较。",
      "用 30% 投影预估帮助客户理解全屋方案的预算结构。",
      "把微信价格拉扯转回线下面谈和团队协同。",
    ];
  }

  if (scenario?.category === "客诉处理") {
    return [
      "先承接客户情绪和问题，不把第一句话变成解释或推责。",
      "给出现场动作、责任人、反馈时间点和后续复盘方式。",
      "群内负面扩散时，要稳定节奏并持续同步进展。",
    ];
  }

  if (scenario?.category === "获客转化") {
    return [
      "确认线索来自哪个小区和哪个内容钩子，判断是否精准。",
      "把私信沟通引导到加微信、发户型、邀逛展厅的节点。",
      "不要只追曝光，要把内容转成可跟进的进店动作。",
    ];
  }

  if (["资源开拓", "社群运营", "指标异常", "转化复盘"].includes(scenario?.category || "")) {
    return [
      "先判断对象是小区、门店、人员还是转化风险，不要直接下结论。",
      "用群人数、微信添加、QC、样板间、签单目标等指标拆解原因。",
      "把下一步动作说成责任人、截止时间、回执口径和复盘节点。",
    ];
  }

  if (scenario?.category === "方案讲解") {
    return [
      "先复述客户核心需求，再说明方案为什么这样设计。",
      "把图纸、报价、工艺边界和销售承诺统一到同一口径。",
      "最后确认客户红线和待二次确认项，避免审单前返工。",
    ];
  }

  return [
    "识别客户问题背后的真实顾虑，不要停在表面关键词。",
    "把产品、流程或案例知识转成客户能理解的行动建议。",
    "讲完之后要推进到下一步，不要停在解释层面。",
  ];
}

function getRiskAlerts(scenario?: Scenario | null) {
  if (scenario?.category === "下单规范") {
    return [
      "不要口头答应非标变更，必须做版本确认和签字留痕。",
      "不要把颜色、尺寸、面料、交期改动当成普通备注处理。",
      "不要漏掉 24 小时终审确认和责任人。",
    ];
  }

  if (scenario?.category === "客诉处理") {
    return [
      "不要第一句就解释原因，客户情绪高时先承接问题。",
      "不要只说“我们会处理”，必须给出动作和时间点。",
      "群内扩散时不要沉默，要保持固定节奏反馈。",
    ];
  }

  if (scenario?.category === "高客单成交") {
    return [
      "不要在微信里陷入单项低价比较，容易漏掉方案完整度。",
      "不要没识别预算和户型就直接报价。",
      "推进到店要给出理由，不要只说“您来店里再说”。",
    ];
  }

  if (["资源开拓", "社群运营", "指标异常", "转化复盘"].includes(scenario?.category || "")) {
    return [
      "不要只说“加强跟进”，必须说明先查哪个指标、找谁确认、何时回执。",
      "避免把资源不足全部归因给门店，要区分资源池、人员动作和内容节奏。",
      "复盘时不要只看结果差，要补充过程记录和下一轮验证动作。",
    ];
  }

  if (scenario?.category === "方案讲解") {
    return [
      "不要只讲效果图，要说明需求、预算、工艺和交付边界。",
      "避免销售话术和设计方案口径不一致，关键差异要现场确认。",
      "客户红线、不可做项和待确认项必须收口，否则容易后续返工。",
    ];
  }

  return [
    "不要只背产品名词，客户要先听懂和自己家的关系。",
    "解释板材、五金和案例时别太专业，要落到使用体验。",
    "说完价值别停住，要顺手追问需求或推进下一步。",
  ];
}

function getLiveHints(messageCount: number, scenario?: Scenario | null) {
  const isOpsScenario = ["资源开拓", "社群运营", "指标异常", "转化复盘"].includes(scenario?.category || "");

  if (isOpsScenario) {
    return [
      { tag: "先拆对象", text: "先说明这是小区、门店、人员还是转化问题，再进入动作建议。", tone: "bg-blue-50 text-[#2F5FD0]" },
      { tag: "补指标", text: "建议补一句当前差在哪个指标：群人数、微信添加、QC、样板间或签单目标。", tone: "bg-amber-50 text-amber-700" },
      { tag: "落到闭环", text: "最后要给出责任人、截止时间和回执方式，避免只说加强跟进。", tone: "bg-green-50 text-[#16A34A]" },
    ];
  }

  if (messageCount > mockConversation.length) {
    return [
      { tag: "建议补一句", text: "现在可以追问客户更关心预算、环保、收纳还是交付风险。", tone: "bg-blue-50 text-[#2F5FD0]" },
      { tag: "注意漏项", text: "你还没把下一步动作说清楚：量尺、到店、版本确认或反馈时间。", tone: "bg-amber-50 text-amber-700" },
      { tag: "继续保持", text: "把专业知识翻译成客户体验的方向是对的，可以继续保留。", tone: "bg-green-50 text-[#16A34A]" },
    ];
  }

  return [
    { tag: "开场方向对", text: "你已经先接住了客户情绪，这一步做对了。", tone: "bg-green-50 text-[#16A34A]" },
    { tag: "接下来建议", text: "先说客户能感知的差异，再补知识依据，不要一上来堆术语。", tone: "bg-blue-50 text-[#2F5FD0]" },
    { tag: "容易漏掉", text: "价值说完后记得追问户型、预算或下一步确认动作。", tone: "bg-amber-50 text-amber-700" },
  ];
}

function getScenarioContext(scenario?: Scenario | null) {
  if (["资源开拓", "社群运营", "指标异常", "转化复盘"].includes(scenario?.category || "")) {
    return "运营对象出现资源、过程或转化异常，需要你先拆解原因，再给出责任人、截止时间和回执动作。";
  }

  if (scenario?.category === "方案讲解") {
    return "客户对方案和报价边界还有疑问，需要你统一需求、图纸、报价和工艺口径。";
  }

  if (scenario?.category === "下单规范") {
    return "客户在下单前提出变更，需要你判断是否非标，并完成版本、签字和终审确认。";
  }

  if (scenario?.category === "客诉处理") {
    return "客户情绪已经升级，目标不是辩解，而是承接问题、给出动作和稳定反馈节奏。";
  }

  if (scenario?.category === "获客转化") {
    return "客户来自小红书目标小区内容，需要你把轻咨询推进到加微、发户型和到店看样。";
  }

  return "客户正在追问产品、价格或使用价值。目标：听懂顾虑 + 讲清差异 + 推进下一步动作。";
}

function getFollowUpCustomerMessage(scenario?: Scenario | null) {
  if (scenario?.category === "下单规范") {
    return "那你告诉我，今天到底怎么确认，什么时候能给我最终版本？";
  }

  if (scenario?.category === "客诉处理") {
    return "我现在不想听解释，你说清楚谁来处理、几点给我反馈。";
  }

  if (scenario?.category === "获客转化") {
    return "听起来可以，但我还不确定有没有必要专门去一趟店里。";
  }

  return "这个说法还可以，但我还是不确定这笔钱到底值不值。";
}

const aiPracticeSectionVisibility = {
  sessionGoalsRail: false,
  sessionRiskRail: false,
  sessionLiveHintsRail: false,
  sessionFooterHelperActions: false,
} as const;


export default function AIPractice() {

  const [stage, setStage] = useState<Stage>("scene-select");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState(mockConversation);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [activeCategory, setActiveCategory] = useState("全部");

  const { user, currentIdentity } = useApp();
  const selectedLearnerRole = user?.learnerRole ?? "sales";
  const learnerRoleMeta = getLearnerRoleMeta(selectedLearnerRole);
  const isStudentView = currentIdentity === "student";
  const roleScenarios = isStudentView ? scenarios.filter((scenario) => scenario.learnerRoles.includes(selectedLearnerRole)) : scenarios;
  const categories = ["全部", ...Array.from(new Set(roleScenarios.map((scenario) => scenario.category)))];

  const filteredScenarios = activeCategory === "全部" ? roleScenarios : roleScenarios.filter((s) => s.category === activeCategory);
  const difficultyLabel = { easy: "简单", medium: "中等", hard: "困难" };
  const difficultyColor = {
    easy: "text-green-600 bg-green-50",
    medium: "text-[#F59E0B] bg-amber-50",
    hard: "text-[#DC2626] bg-red-50",
  };

  const liveHints = useMemo(() => getLiveHints(messages.length, selectedScenario), [messages.length, selectedScenario]);
  const scenarioGoals = useMemo(() => getScenarioGoals(selectedScenario), [selectedScenario]);
  const riskAlerts = useMemo(() => getRiskAlerts(selectedScenario), [selectedScenario]);
  const showAIPracticeSessionRightRail =
    aiPracticeSectionVisibility.sessionGoalsRail ||
    aiPracticeSectionVisibility.sessionRiskRail ||
    aiPracticeSectionVisibility.sessionLiveHintsRail;
  const aiPracticeSessionLayoutClass = showAIPracticeSessionRightRail
    ? "max-w-6xl mx-auto w-full px-4 py-4 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-4 flex-1 overflow-hidden"
    : "max-w-6xl mx-auto w-full px-4 py-4 grid gap-4 flex-1 overflow-hidden";

  if (stage === "result") {

    return (
      <div className="min-h-full bg-[#F5F7FA] px-4 md:px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setStage("scene-select")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft size={16} /> 返回场景选择
          </button>

          <div className="bg-[#1E2A3A] rounded-2xl p-6 mb-4 text-white">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-white/60 text-xs mb-1">本次陪练结果</p>
                <h2 className="text-white text-lg">{selectedScenario?.title}</h2>
                <p className="text-white/60 text-xs mt-2">总结果已经生成，下面会拆开给你看：哪里做得好、哪里有风险、哪里漏讲了。</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-white">{resultData.totalScore}</div>
                <div className="flex items-center gap-1 text-sm justify-end mt-0.5">
                  {resultData.totalScore > resultData.prevScore ? (
                    <>
                      <TrendingUp size={14} className="text-[#16A34A]" />
                      <span className="text-[#16A34A]">+{resultData.totalScore - resultData.prevScore} 分提升</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={14} className="text-[#DC2626]" />
                      <span className="text-[#DC2626]">{resultData.totalScore - resultData.prevScore} 分</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-5">
              {resultData.dimensions.map((dim, i) => (
                <div key={i} className="bg-white/10 rounded-lg px-2 py-2 text-center">
                  <div className="text-lg font-bold text-white">{dim.score}</div>
                  <div className="text-xs text-white/60">{dim.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">分维度评分与反馈</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {resultData.dimensions.map((dim, i) => (
                <div key={i} className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-800">{dim.name}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden mx-2">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${dim.score}%`,
                          backgroundColor: dim.score >= 80 ? "#16A34A" : dim.score >= 70 ? "#F59E0B" : "#DC2626",
                        }}
                      />
                    </div>
                    <span className={`text-sm font-bold ${dim.score >= 80 ? "text-[#16A34A]" : dim.score >= 70 ? "text-[#F59E0B]" : "text-[#DC2626]"}`}>{dim.score}</span>
                  </div>
                  <p className="text-xs text-gray-500">{dim.feedback}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ThumbsUp size={14} className="text-[#16A34A]" />
                <span className="text-sm font-medium text-gray-900">亮点</span>
              </div>
              <ul className="space-y-2">
                {resultData.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                    <CheckCircle2 size={12} className="text-[#16A34A] flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ThumbsDown size={14} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">风险点</span>
              </div>
              <ul className="space-y-2">
                {resultData.riskPoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                    <TriangleAlert size={12} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <CircleAlert size={14} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">漏项</span>
              </div>
              <ul className="space-y-2">
                {resultData.omissions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                    <span className="text-xs px-1 py-0.5 bg-red-100 text-[#DC2626] rounded flex-shrink-0">漏讲</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-[#EEF2FF] border border-[#2F5FD0]/20 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-2">
              <Target size={16} className="text-[#2F5FD0] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#2F5FD0] mb-0.5">下一轮建议</p>
                <p className="text-xs text-gray-600">{resultData.suggestedPractice}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStage("session")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#2F5FD0] text-[#2F5FD0] rounded-xl text-sm hover:bg-blue-50 transition-colors"
            >
              <RotateCcw size={15} /> 再练一次
            </button>
            <button
              onClick={() => setStage("scene-select")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#2F5FD0] text-white rounded-xl text-sm hover:bg-[#2550B8] transition-colors"
            >
              <Play size={15} /> 换个场景继续
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "session") {
    return (
      <div className="flex flex-col min-h-full bg-[#F5F7FA]">
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setStage("briefing")} className="text-gray-500 hover:text-gray-700">
              <ArrowLeft size={18} />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">AI 陪练进行中</p>
              <p className="text-sm text-gray-800 truncate">{selectedScenario?.title}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#DC2626] bg-red-50 px-2 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
              训练中
            </div>
            <button
              onClick={() => setStage("result")}
              className="text-xs text-[#2F5FD0] bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
            >
              结束并获得反馈
            </button>
          </div>
        </div>

        <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex-shrink-0">
              <p className="text-xs text-amber-700">
            <strong>场景设定：</strong>{getScenarioContext(selectedScenario)}
          </p>
        </div>

        <div className={aiPracticeSessionLayoutClass}>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[520px]">
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "customer" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs flex-shrink-0 mr-2">客</div>
                  )}
                  <div className="max-w-[78%]">
                    {msg.role === "customer" ? (
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">模拟客户</p>
                        <div className="bg-gray-100 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-700">{msg.content}</div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5 text-right">你的回应</p>
                        <div className="bg-[#2F5FD0] text-white rounded-xl rounded-tr-sm px-4 py-2.5 text-sm">{msg.content}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
              <div className="flex items-end gap-2">
                <div className="flex-1 bg-[#F5F7FA] border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#2F5FD0]">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="输入你的回应话术..."
                    className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none resize-none"
                    rows={2}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isRecording ? "bg-[#DC2626] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                  >
                    {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                  <button
                    onClick={() => {
                      if (inputValue.trim()) {
                        setMessages((prev) => [...prev, { role: "user", content: inputValue }]);
                        setInputValue("");
                        setTimeout(() => {
                          setMessages((prev) => [
                            ...prev,
                            {
                              role: "customer",
                              content: getFollowUpCustomerMessage(selectedScenario),
                            },
                          ]);
                        }, 800);
                      }
                    }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${inputValue.trim() ? "bg-[#2F5FD0] text-white hover:bg-[#2550B8]" : "bg-gray-100 text-gray-400"}`}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button className="text-xs text-[#2F5FD0] hover:text-[#2550B8] flex items-center gap-1">
                  <BookOpen size={10} /> 查看参考话术
                </button>
                <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                  <MessageSquare size={10} /> 查看对话历史
                </button>
              </div>
            </div>
          </div>

          {showAIPracticeSessionRightRail && (
            <div className="space-y-4 overflow-y-auto">
              {aiPracticeSectionVisibility.sessionGoalsRail && (
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Target size={14} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">任务目标区</span>
                  </div>
                  <div className="space-y-2">
                    {scenarioGoals.map((goal) => (
                      <div key={goal} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FD0] flex-shrink-0 mt-1.5" />
                        {goal}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {aiPracticeSectionVisibility.sessionRiskRail && (
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={14} className="text-[#DC2626]" />
                    <span className="text-sm font-medium text-gray-900">风险提示区</span>
                  </div>
                  <div className="space-y-2">
                    {riskAlerts.map((risk) => (
                      <div key={risk} className="rounded-lg bg-red-50 border border-red-100 px-3 py-2.5 text-xs text-red-700 leading-relaxed">
                        {risk}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {aiPracticeSectionVisibility.sessionLiveHintsRail && (
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">实时轻提示区</span>
                  </div>
                  <div className="space-y-2.5">
                    {liveHints.map((hint) => (
                      <div key={hint.text} className="rounded-xl border border-gray-100 p-3">
                        <span className={`inline-flex text-xs px-2 py-0.5 rounded-full ${hint.tone}`}>{hint.tag}</span>
                        <p className="text-xs text-gray-600 mt-2 leading-relaxed">{hint.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    );
  }

  if (stage === "briefing") {
    return (
      <div className="min-h-full bg-[#F5F7FA] px-4 md:px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setStage("scene-select")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft size={16} /> 返回
          </button>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
            <div className="bg-[#1E2A3A] px-5 py-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[selectedScenario!.difficulty]}`}>{difficultyLabel[selectedScenario!.difficulty]}</span>
                <span className="text-xs text-white/60">{selectedScenario?.category}</span>
                {selectedScenario?.riskTag && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 flex items-center gap-1">
                    <AlertTriangle size={9} /> {selectedScenario.riskTag}
                  </span>
                )}
              </div>
              <h2 className="text-white text-base mb-1">{selectedScenario?.title}</h2>
              <p className="text-white/60 text-xs">{selectedScenario?.desc}</p>
            </div>

            <div className="px-5 py-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target size={14} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">训练目标</span>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {scenarioGoals.map((goal) => (
                    <li key={goal} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#2F5FD0] flex-shrink-0 mt-1.5"></span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle size={12} className="text-[#DC2626]" />
                  <span className="text-xs font-medium text-[#DC2626]">常见失误预警</span>
                </div>
                <ul className="space-y-1 text-xs text-red-700">
                  {riskAlerts.map((risk) => (
                    <li key={risk}>• {risk}</li>
                  ))}
                </ul>
              </div>

              {selectedScenario?.lastScore && (
                <div className="bg-[#F5F7FA] rounded-lg px-3 py-2.5">
                  <p className="text-xs text-gray-500">
                    上次练习得分：<span className="text-[#F59E0B] font-medium">{selectedScenario.lastScore} 分</span>
                    <span className="ml-2 text-gray-400">目标分数 ≥ 80</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setMessages(getInitialConversation(selectedScenario));
              setInputValue("");
              setStage("session");
            }}
            className="w-full bg-[#2F5FD0] hover:bg-[#2550B8] text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Play size={16} />
            开始训练
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center">
              <Dumbbell size={18} className="text-purple-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-gray-900">AI 陪练</h1>
                {isStudentView && <span className="text-xs px-2 py-0.5 rounded-full bg-[#EAF1FF] text-[#2F5FD0]">{learnerRoleMeta.label}</span>}
              </div>
              <p className="text-xs text-gray-500">按当前学习身份推荐真实场景，练完获得评分、风险点和漏项提醒</p>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs transition-colors ${activeCategory === cat ? "bg-[#2F5FD0] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 space-y-3">
        {filteredScenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all p-4"
            onClick={() => {
              setSelectedScenario(scenario);
              setMessages(getInitialConversation(scenario));
              setStage("briefing");
            }}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${scenario.difficulty === "hard" ? "bg-red-50" : scenario.difficulty === "medium" ? "bg-amber-50" : "bg-green-50"}`}>
                <Dumbbell size={18} className={scenario.difficulty === "hard" ? "text-red-500" : scenario.difficulty === "medium" ? "text-amber-500" : "text-green-500"} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${difficultyColor[scenario.difficulty]}`}>{difficultyLabel[scenario.difficulty]}</span>
                  <span className="text-xs text-gray-400">{scenario.category}</span>
                  {scenario.recommended && <span className="text-xs px-1.5 py-0.5 bg-[#2F5FD0] text-white rounded">推荐练习</span>}
                  {scenario.riskTag && (
                    <span className="text-xs px-1.5 py-0.5 bg-red-100 text-[#DC2626] rounded flex items-center gap-0.5">
                      <AlertTriangle size={8} /> {scenario.riskTag}
                    </span>
                  )}
                </div>
                <h3 className="text-sm text-gray-900 mb-0.5">{scenario.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-1">{scenario.desc}</p>
                {scenario.lastScore && (
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-gray-400">上次得分</span>
                    <span className={`text-xs font-medium ${scenario.lastScore >= 80 ? "text-[#16A34A]" : "text-[#F59E0B]"}`}>{scenario.lastScore} 分</span>
                    {scenario.lastScore < 80 && <span className="text-xs text-[#F59E0B]">· 建议再练</span>}
                  </div>
                )}
              </div>
              <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
