export type WeakAreaUrgency = "high" | "medium";
export type RetrainTaskStatus = "todo" | "in_progress" | "done";
export type ReviewStatus = "improved" | "watch";

export interface WeakAreaHistoryItem {
  label: string;
  detail: string;
  score: number;
}

export interface WeakAreaFocusItem {
  title: string;
  detail: string;
}

export interface WeakArea {
  id: string;
  area: string;
  score: number;
  gap: number;
  reason: string;
  action: string;
  coursePath: string;
  urgency: WeakAreaUrgency;
  summary: string;
  impact: string;
  examLabel: string;
  history: WeakAreaHistoryItem[];
  focuses: WeakAreaFocusItem[];
}

export interface RetrainTask {
  id: string;
  weakAreaId: string;
  title: string;
  type: "课程补学" | "专项练习" | "复测";
  status: RetrainTaskStatus;
  deadline: string;
  duration: string;
  owner: string;
  desc: string;
  path: string;
}

export interface ReviewMetric {
  label: string;
  before: number;
  after: number;
}

export interface ReviewResult {
  id: string;
  weakAreaId: string;
  title: string;
  reviewedAt: string;
  reviewer: string;
  status: ReviewStatus;
  summary: string;
  nextAction: string;
  metrics: ReviewMetric[];
  highlights: string[];
  risks: string[];
}

export const radarData = [
  { subject: "资源开拓", A: 62, fullMark: 100 },
  { subject: "社群运营", A: 58, fullMark: 100 },
  { subject: "数据判断", A: 64, fullMark: 100 },
  { subject: "异常处理", A: 60, fullMark: 100 },
  { subject: "转化推进", A: 66, fullMark: 100 },
  { subject: "复盘沉淀", A: 55, fullMark: 100 },
  { subject: "销售话术", A: 90, fullMark: 100 },
];

export const trendData = [
  { month: "9月", score: 68 },
  { month: "10月", score: 72 },
  { month: "11月", score: 75 },
  { month: "12月", score: 78 },
  { month: "1月", score: 82 },
];

export const weakAreas: WeakArea[] = [
  {
    id: "community-growth",
    area: "社群运营力",
    score: 58,
    gap: 22,
    reason: "小区群人数长期低于目标，拉新动作、内容节奏和责任回执不够清晰",
    action: "学习社群 SOP 课程 + 完成群人数异常陪练 + 做一次岗位复盘",
    coursePath: "/learning/course/8",
    urgency: "high",
    summary: "能发现群人数不达标，但还不能稳定拆解资源、触达、内容和执行责任。",
    impact: "会影响后续微信添加、QC、样板间和签单目标达成。",
    examLabel: "社群运营 SOP 测试",
    history: [
      { label: "课程完成度", detail: "社群 SOP 课程未开始，群人数增长动作未形成固定清单", score: 0 },
      { label: "陪练反馈", detail: "能提出拉新方向，但责任人和截止时间不够明确", score: 62 },
      { label: "过程指标", detail: "最近 2 个小区群人数目标达成率低于 70%", score: 58 },
    ],
    focuses: [
      { title: "先补社群 SOP", detail: "重点看建群、拉新、内容节奏和群人数异常处置四部分。" },
      { title: "把异常拆成任务", detail: "每个动作必须有责任人、截止时间和回执口径。" },
      { title: "用复盘确认动作有效", detail: "复盘不能只看群人数，要同步看添加微信和 QC 是否改善。" },
    ],
  },
  {
    id: "ops-data-judgement",
    area: "数据判断力",
    score: 64,
    gap: 16,
    reason: "能看到微信添加、QC、样板间异常，但原因拆解和优先级判断不够稳定",
    action: "学习运营指标判断课，完成指标异常测试和一次 AI 陪练",
    coursePath: "/learning/course/9",
    urgency: "high",
    summary: "当前看盘时容易只看单个结果，缺少过程指标之间的联动判断。",
    impact: "会影响风险名单排序、任务派发优先级和管理者复盘质量。",
    examLabel: "运营指标异常判断测试",
    history: [
      { label: "课程完成度", detail: "运营指标判断课未开始，过程指标口径尚未统一", score: 0 },
      { label: "模拟看盘", detail: "能发现添加微信偏低，但未追到资源和触达环节", score: 66 },
      { label: "任务拆解", detail: "动作描述偏笼统，缺少回执标准", score: 60 },
    ],
    focuses: [
      { title: "先统一指标口径", detail: "把群人数、添加、QC、样板间、签单目标串起来看。" },
      { title: "按风险对象分类", detail: "区分小区、门店、人员、转化四类风险，不混在一起处理。" },
      { title: "输出下一步动作", detail: "异常判断必须落到任务、补训或复盘其中一个出口。" },
    ],
  },
  {
    id: "craft-standard",
    area: "工艺规范",
    score: 68,
    gap: 12,
    reason: "防水施工规范 v3.1 尚未完成学习，现场解释仍沿用旧版口径",
    action: "完成防水规范课程 + 专项测试 + 1 次场景复述",
    coursePath: "/learning/course/2",
    urgency: "high",
    summary: "变更点记忆不稳定，尤其是禁用材料和卫浴施工厚度。",
    impact: "会直接影响客户说明、施工交底和售后解释的准确性。",
    examLabel: "防水施工规范 v3.1 专项测试",
    history: [
      { label: "课程完成度", detail: "当前完成 2/4 节，关键变更节未完成", score: 45 },
      { label: "最近专项测", detail: "禁用材料题答错 2 题，施工厚度题答错 1 题", score: 72 },
      { label: "陪练反馈", detail: "客户追问施工细节时仍会引用旧版本表述", score: 69 },
    ],
    focuses: [
      { title: "先补新版本变更", detail: "优先看 v3.1 新增禁用材料和施工厚度变化，不要重头刷一遍。" },
      { title: "把知识点转成可说的话", detail: "补学后做一轮“客户问施工要求怎么说”的简短复述练习。" },
      { title: "用复测确认旧口径是否清掉", detail: "复测通过前，不建议继续接待高风险施工问答场景。" },
    ],
  },
  {
    id: "order-review",
    area: "审单流程",
    score: 55,
    gap: 25,
    reason: "审单规则课程未开始，返单原因识别和协同边界理解不足",
    action: "学习审单规则课程，补做返单原因识别练习，再参加专项考核",
    coursePath: "/learning",
    urgency: "high",
    summary: "跨角色交接信息不完整，容易在订单回流环节遗漏关键字段。",
    impact: "影响设计师衔接、返单处理效率和跨角色信息一致性。",
    examLabel: "返单原因识别小测",
    history: [
      { label: "前置课程", detail: "协同类基础课未完成，导致相关能力尚未解锁", score: 20 },
      { label: "回流记录", detail: "最近 3 次模拟中，有 2 次遗漏交付时间与工艺限制", score: 58 },
      { label: "带教点评", detail: "对“谁该补充什么信息”判断不稳定", score: 60 },
    ],
    focuses: [
      { title: "先建立交接清单", detail: "先把审单前必填信息清单看懂，再进入返单案例。" },
      { title: "识别高频返单原因", detail: "重点关注尺寸、工艺限制、交付时间这三类高频漏项。" },
      { title: "补齐跨角色边界意识", detail: "练习把“销售要说清什么、设计要确认什么”分开记。" },
    ],
  },
];

export const strengths = [
  { area: "销售话术", score: 90, note: "连续 5 次陪练 85+，话术稳定" },
  { area: "新品知识", score: 85, note: "暖冬系列课程已完成，考核 88 分" },
  { area: "协作意识", score: 82, note: "能主动识别销售、门店、设计之间的信息差" },
];

export const milestones = [
  { label: "完成所有必修课", done: true, date: "12月10日" },
  { label: "月度考核通过率 ≥ 80%", done: true, date: "12月28日" },
  { label: "AI 陪练累计 10 次", done: false, current: 7, total: 10 },
  { label: "专项测试全部通过", done: false, current: 2, total: 4 },
  { label: "申请转工作人员资格", done: false, locked: true },
];

export const retrainTasks: RetrainTask[] = [
  {
    id: "task-ops-1",
    weakAreaId: "community-growth",
    title: "补学：社群建群与群人数增长 SOP",
    type: "课程补学",
    status: "in_progress",
    deadline: "今天 18:00 前",
    duration: "14 分钟",
    owner: "你自己",
    desc: "优先学习群人数增长动作和异常处置两节，学完进入运营陪练。",
    path: "/learning/course/8",
  },
  {
    id: "task-ops-2",
    weakAreaId: "community-growth",
    title: "练习：小区群人数不达标处置",
    type: "专项练习",
    status: "todo",
    deadline: "今天下班前",
    duration: "10 分钟",
    owner: "系统安排",
    desc: "在 AI 陪练中把资源、触达、内容节奏和责任回执说清楚。",
    path: "/learning/ai-practice",
  },
  {
    id: "task-ops-3",
    weakAreaId: "ops-data-judgement",
    title: "复测：运营指标异常判断测试",
    type: "复测",
    status: "todo",
    deadline: "本周五",
    duration: "25 分钟",
    owner: "系统安排",
    desc: "重点验证添加微信、QC、样板间和签单差额的原因拆解能力。",
    path: "/learning/assessment",
  },
  {
    id: "task-1",
    weakAreaId: "craft-standard",
    title: "补学：防水施工规范 v3.1 关键变更",
    type: "课程补学",
    status: "in_progress",
    deadline: "今天 18:00 前",
    duration: "12 分钟",
    owner: "你自己",
    desc: "只看新增禁用材料和卫浴施工标准变更两节，学完立即做题。",
    path: "/learning/course/2",
  },
  {
    id: "task-2",
    weakAreaId: "craft-standard",
    title: "练习：施工说明口径复述 1 次",
    type: "专项练习",
    status: "todo",
    deadline: "今天下班前",
    duration: "8 分钟",
    owner: "你自己",
    desc: "把新版本要求讲成客户能听懂的话，重点避免旧版说法。",
    path: "/learning/ai-practice",
  },
  {
    id: "task-3",
    weakAreaId: "craft-standard",
    title: "复测：防水施工规范 v3.1 专项测试",
    type: "复测",
    status: "todo",
    deadline: "本周五",
    duration: "25 分钟",
    owner: "系统安排",
    desc: "复测通过线 85 分，通过后才算完成这一轮补训。",
    path: "/learning/assessment",
  },
  {
    id: "task-4",
    weakAreaId: "order-review",
    title: "补学：返单原因识别基础课",
    type: "课程补学",
    status: "todo",
    deadline: "2 天内",
    duration: "18 分钟",
    owner: "你自己",
    desc: "先补审单前置信息与返单高频原因，建立判断框架。",
    path: "/learning",
  },
  {
    id: "task-5",
    weakAreaId: "order-review",
    title: "练习：交接信息检查清单",
    type: "专项练习",
    status: "todo",
    deadline: "本周内",
    duration: "10 分钟",
    owner: "带教安排",
    desc: "根据模拟订单判断哪些信息必须先补充给设计师。",
    path: "/workbench/order-review",
  },
];

export const reviewResults: ReviewResult[] = [
  {
    id: "review-1",
    weakAreaId: "craft-standard",
    title: "工艺规范补训后复评",
    reviewedAt: "昨天 17:20",
    reviewer: "系统自动复评 + 带教抽查",
    status: "improved",
    summary: "禁用材料识别和施工厚度说明明显提升，旧版口径基本被清掉。",
    nextAction: "再完成 1 次 AI 陪练，把现场表达稳定下来。",
    metrics: [
      { label: "专项测试", before: 72, after: 88 },
      { label: "现场复述", before: 68, after: 84 },
      { label: "风险提醒", before: 65, after: 82 },
    ],
    highlights: [
      "已经能主动提到 v3.1 新增禁用材料，不再漏讲。",
      "回答客户施工厚度问题时，能直接给出新版标准。",
    ],
    risks: [
      "遇到复杂售后场景时，仍需要先确认再回答，避免过度承诺。",
    ],
  },
  {
    id: "review-2",
    weakAreaId: "order-review",
    title: "审单流程首轮复评",
    reviewedAt: "3 天前",
    reviewer: "带教老师",
    status: "watch",
    summary: "已经知道返单来自信息缺失，但交接边界判断还不稳，需要继续补训。",
    nextAction: "先补前置课，再完成一次返单原因识别练习。",
    metrics: [
      { label: "返单原因识别", before: 42, after: 61 },
      { label: "交接完整度", before: 50, after: 63 },
      { label: "协同边界判断", before: 48, after: 58 },
    ],
    highlights: [
      "已能识别常见漏项，不再把所有问题都归到设计侧。",
    ],
    risks: [
      "尺寸确认和工艺限制的责任边界仍容易判断错。",
      "遇到紧急订单时，容易跳过必填检查。",
    ],
  },
];

export const currentStage = {
  label: "运营岗位补强期",
  desc: "当前重点是把社区运营的资源、社群、指标、转化和复盘能力补成闭环。",
  nextAction: "先完成社群 SOP 和运营指标判断补训，再进入岗位认证与工作台任务联动。",
};

export function getWeakAreaById(id?: string) {
  return weakAreas.find((item) => item.id === id) || weakAreas[0];
}

export function getRetrainTasksByWeakAreaId(id?: string) {
  return retrainTasks.filter((task) => task.weakAreaId === id);
}

export function getReviewResultsByWeakAreaId(id?: string) {
  return reviewResults.filter((item) => item.weakAreaId === id);
}
