export type CourseStatus = "not_started" | "in_progress" | "completed" | "locked";
export type CourseUrgency = "urgent" | "warning" | "normal";

export interface CourseSummary {
  id: string;
  title: string;
  category: string;
  version: string;
  versionChange: boolean;
  status: CourseStatus;
  urgency: CourseUrgency;
  duration: number;
  deadline: string;
  tags: string[];
  desc: string;
  progress: number;
}

export interface CourseSection {
  id: string;
  title: string;
  duration: number;
  done: boolean;
  isNew?: boolean;
  isKey?: boolean;
}

export interface CourseDetailData extends CourseSummary {
  prevVersion?: string;
  updateSummary: string;
  author: string;
  updatedAt: string;
  learningGoals: string[];
  applicableScenes: string[];
  sections: CourseSection[];
  keyChanges: { type: "add" | "change" | "delete"; text: string }[];
  relatedPractice: { title: string; path: string };
  relatedAssessment: { title: string; path: string };
  relatedQnA: { title: string; path: string };
  note: string;
}

export const categories = ["全部", "新品学习", "工艺规范", "销售话术", "系统培训", "必读文档"];

export const courses: CourseSummary[] = [
  {
    id: "1",
    title: "【必学·新版】云岚石·暖冬系列 2024 完整参数手册",
    category: "新品学习",
    version: "v2.3",
    versionChange: true,
    status: "not_started",
    urgency: "urgent",
    duration: 25,
    deadline: "今日截止",
    tags: ["新品", "参数更新", "防滑"],
    desc: "包含 3 款新品规格、防滑系数、安装要求，及与旧款差异对比",
    progress: 0,
  },
  {
    id: "2",
    title: "防水产品施工规范 v3.1（含新增禁用材料清单）",
    category: "工艺规范",
    version: "v3.1",
    versionChange: true,
    status: "in_progress",
    urgency: "warning",
    duration: 18,
    deadline: "3 天后",
    tags: ["规范更新", "防水", "禁用材料"],
    desc: "v3.0 → v3.1 更新：新增 2 类禁用材料，修改卫浴区施工标准",
    progress: 45,
  },
  {
    id: "3",
    title: "客户价值异议处理话术（含拒绝场景应对）",
    category: "销售话术",
    version: "v1.8",
    versionChange: false,
    status: "completed",
    urgency: "normal",
    duration: 20,
    deadline: "已完成",
    tags: ["话术", "价值说明", "异议处理"],
    desc: "覆盖 12 类常见价值异议场景，含金句和结构化引导步骤",
    progress: 100,
  },
  {
    id: "4",
    title: "陶瓷砖吸水率与应用场景匹配指南",
    category: "工艺规范",
    version: "v2.0",
    versionChange: false,
    status: "not_started",
    urgency: "normal",
    duration: 15,
    deadline: "本月底",
    tags: ["参数", "应用匹配"],
    desc: "吸水率从 0.5% 到 10% 各区间的适用场景、禁用场景说明",
    progress: 0,
  },
  {
    id: "5",
    title: "审单规则与常见返单原因分析",
    category: "系统培训",
    version: "v1.2",
    versionChange: false,
    status: "locked",
    urgency: "normal",
    duration: 30,
    deadline: "完成前置课程后解锁",
    tags: ["审单", "返单", "协同"],
    desc: "覆盖 8 类常见返单原因，含设计师与销售协同要点",
    progress: 0,
  },
];

export const learningPath = {
  title: "新人销售上岗 7 日路径",
  currentStage: "新品知识补齐",
  completedSteps: 2,
  totalSteps: 5,
  progress: 40,
  nextAction: "先完成新品参数课，再进入价值话术陪练",
  milestones: [
    { title: "基础认知", state: "done" },
    { title: "产品知识", state: "done" },
    { title: "新品补齐", state: "current" },
    { title: "话术训练", state: "todo" },
    { title: "考核验证", state: "todo" },
  ],
};

export const updateTopics = [
  {
    title: "暖冬系列更新专题",
    desc: "本周集中同步 3 款新品、2 个参数变更和 1 个安装禁忌。",
    impact: "影响销售讲解、AI 问答回答口径与陪练场景",
    path: "/learning/course/1",
  },
  {
    title: "防水规范更新专题",
    desc: "禁用材料和施工厚度有变更，需要重学后再继续接待相关客户。",
    impact: "影响设计沟通、施工说明和售后解释",
    path: "/learning/course/2",
  },
];

export const recentLearningRecords = [
  {
    title: "防水产品施工规范 v3.1",
    status: "学习中",
    detail: "已学 2/4 节 · 上次学习时间 14:10",
  },
  {
    title: "客户价值异议处理话术",
    status: "已完成",
    detail: "完成于昨天 18:22 · 推荐去做考核验证",
  },
  {
    title: "吸水率与应用场景匹配",
    status: "未开始",
    detail: "已加入推荐补学列表 · 建议本周完成",
  },
];

export const retrainReminders = [
  {
    title: "防水规范需补学",
    reason: "规范已更新，旧版说法可能导致现场解释错误",
    action: "去重学",
    path: "/learning/course/2",
  },
  {
    title: "新品参数需复记",
    reason: "明天有新品推介活动，建议先完成参数课并做一次陪练",
    action: "去学习",
    path: "/learning/course/1",
  },
  {
    title: "审单协同课未解锁",
    reason: "需先完成前置基础课，解锁后可继续学习跨角色协同内容",
    action: "看前置课",
    path: "/learning/course/4",
  },
];

export const courseDetails: Record<string, CourseDetailData> = {
  "1": {
    ...courses[0],
    prevVersion: "v2.1",
    updateSummary: "新增 3 款新品规格，防滑系数标准更新，安装要求变更",
    author: "产品中心",
    updatedAt: "2026-04-18",
    learningGoals: [
      "快速说清暖冬系列 3 款新品的核心参数与定位",
      "理解防滑系数升级后对推荐场景的影响",
      "避免继续沿用旧款停产规格和旧安装说法",
    ],
    applicableScenes: ["新品推介", "客户参数咨询", "门店接待", "AI 问答补充"],
    sections: [
      { id: "s1", title: "新品概览与市场定位", duration: 5, done: false, isKey: true },
      { id: "s2", title: "完整规格参数表（3 款）", duration: 8, done: false, isNew: true, isKey: true },
      { id: "s3", title: "防滑系数更新说明（重要变更）", duration: 4, done: false, isNew: true, isKey: true },
      { id: "s4", title: "安装要求与禁忌", duration: 5, done: false },
      { id: "s5", title: "与旧款差异对比", duration: 3, done: false, isNew: true },
    ],
    keyChanges: [
      { type: "add", text: "新增 P800×800、P600×1200、P600×600 三种规格" },
      { type: "change", text: "防滑系数标准从 R9 提升至 R10，影响推荐场景" },
      { type: "change", text: "卫浴安装不再允许使用 OPC 普通硅酸盐水泥" },
      { type: "delete", text: "暖冬系列旧款 P400×800 已停产，不再推荐" },
    ],
    relatedPractice: { title: "陪练：如何向客户介绍新防滑系数的优势？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：暖冬系列参数更新专题", path: "/learning/assessment" },
    relatedQnA: { title: "问答：客户问新品和旧款差异时怎么说？", path: "/learning/ai-qna" },
    note: "这是门店推介前的必学课，建议先学完再做一轮价值引导陪练。",
  },
  "2": {
    ...courses[1],
    prevVersion: "v3.0",
    updateSummary: "新增 2 类禁用材料，卫浴区施工标准修订",
    author: "工程标准部",
    updatedAt: "2026-04-17",
    learningGoals: [
      "识别 v3.1 新增禁用材料，避免继续给客户错误建议",
      "掌握卫浴区施工厚度和验收标准的新要求",
      "知道现场无法确认时该如何转到 AI 问答或上报补充",
    ],
    applicableScenes: ["施工说明", "设计沟通", "售后解释", "工艺答疑"],
    sections: [
      { id: "s1", title: "防水材料分类与选用原则", duration: 5, done: true },
      { id: "s2", title: "新增禁用材料清单（v3.1 新增）", duration: 4, done: false, isNew: true, isKey: true },
      { id: "s3", title: "卫浴区施工标准更新", duration: 5, done: false, isNew: true, isKey: true },
      { id: "s4", title: "验收标准与检测方法", duration: 4, done: false },
    ],
    keyChanges: [
      { type: "add", text: "新增禁用材料：单组分聚氨酯（潮湿基层）、强溶剂型防水涂料" },
      { type: "change", text: "卫浴区防水涂层最小厚度从 1.5mm 提升至 2.0mm" },
      { type: "change", text: "地漏周边加强层尺寸要求扩大为半径 300mm（原 200mm）" },
    ],
    relatedPractice: { title: "陪练：客户问施工注意事项怎么解答？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：施工规范变更复测", path: "/learning/assessment" },
    relatedQnA: { title: "问答：施工现场不确定材料能否使用怎么办？", path: "/learning/ai-qna" },
    note: "这是典型的版本变更课，学完后建议立即做一次复测，避免旧口径残留。",
  },
  "3": {
    ...courses[2],
    updateSummary: "整理 12 类高频价值异议，统一价值解释结构",
    author: "销售训练组",
    updatedAt: "2026-04-13",
    learningGoals: [
      "面对价格异议时先稳住节奏，再做价值拆解",
      "把“为什么贵”回答成可直接对客户说的话",
      "把容易漏讲的卖点转成训练项",
    ],
    applicableScenes: ["门店成交", "客户异议处理", "话术复盘"],
    sections: [
      { id: "s1", title: "高频异议类型识别", duration: 5, done: true },
      { id: "s2", title: "价值引导结构（先回应再展开）", duration: 6, done: true, isKey: true },
      { id: "s3", title: "拒绝场景应对示例", duration: 5, done: true },
      { id: "s4", title: "易错表达与风险点", duration: 4, done: true },
    ],
    keyChanges: [
      { type: "change", text: "补充了 3 组“低价对比”场景的推荐话术" },
      { type: "add", text: "新增“客户当场质疑价格”的应对示例" },
    ],
    relatedPractice: { title: "陪练：客户说价格贵怎么继续聊？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：价值异议处理复盘", path: "/learning/assessment" },
    relatedQnA: { title: "问答：客户问为什么同类产品更便宜时怎么说？", path: "/learning/ai-qna" },
    note: "这门课已完成，建议直接去做一次陪练，把结构讲顺。",
  },
  "4": {
    ...courses[3],
    updateSummary: "帮助快速匹配吸水率与不同应用场景，减少误推荐",
    author: "产品培训组",
    updatedAt: "2026-04-11",
    learningGoals: [
      "判断不同吸水率区间适合的使用场景",
      "避免把不适合的砖型推荐到错误空间",
      "形成参数解释到推荐动作的最短链路",
    ],
    applicableScenes: ["产品选型", "应用推荐", "门店讲解"],
    sections: [
      { id: "s1", title: "吸水率基础概念", duration: 4, done: false },
      { id: "s2", title: "场景匹配与禁用场景", duration: 5, done: false, isKey: true },
      { id: "s3", title: "常见误区与推荐话术", duration: 3, done: false },
      { id: "s4", title: "参数解释模板", duration: 3, done: false },
    ],
    keyChanges: [
      { type: "add", text: "新增“高湿区域不推荐场景”案例" },
      { type: "change", text: "补充了吸水率与耐污性能的关联解释" },
    ],
    relatedPractice: { title: "陪练：客户问吸水率会影响什么？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：参数与场景匹配小测", path: "/learning/assessment" },
    relatedQnA: { title: "问答：不同吸水率该怎么向客户解释？", path: "/learning/ai-qna" },
    note: "建议把它作为参数类课程的补学入口，学完后做一次参数问答练习。",
  },
  "5": {
    ...courses[4],
    updateSummary: "聚焦返单原因和销售-设计协同边界，前置课完成后开放",
    author: "协同标准组",
    updatedAt: "2026-04-09",
    learningGoals: [
      "认识返单问题常见来源与协同责任边界",
      "为后续销设协同和审单回流模块打基础",
      "知道什么信息必须在交接前说清楚",
    ],
    applicableScenes: ["设计交接", "审单准备", "协同理解"],
    sections: [
      { id: "s1", title: "返单场景概览", duration: 6, done: false },
      { id: "s2", title: "销售与设计交接边界", duration: 8, done: false, isKey: true },
      { id: "s3", title: "高频返单原因复盘", duration: 8, done: false },
      { id: "s4", title: "前置要求与注意事项", duration: 8, done: false },
    ],
    keyChanges: [
      { type: "change", text: "本课需先完成“吸水率与应用场景匹配指南”后解锁" },
    ],
    relatedPractice: { title: "陪练：客户需求交接前怎么确认关键信息？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：返单原因识别", path: "/learning/assessment" },
    relatedQnA: { title: "问答：什么情况下最容易返单？", path: "/learning/ai-qna" },
    note: "这是跨角色协同的前置训练课，当前未解锁，建议先完成前置基础课。",
  },
};

export function getCourseDetailById(id?: string) {
  return courseDetails[id || "1"] || courseDetails["1"];
}
