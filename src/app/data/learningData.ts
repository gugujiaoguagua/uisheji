import type { LearnerRole } from "../context/AppContext";

export type CourseStatus = "not_started" | "in_progress" | "completed" | "locked";
export type CourseUrgency = "urgent" | "warning" | "normal";

export interface CourseSummary {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  learnerRoles: LearnerRole[];
  version: string;
  versionChange: boolean;
  status: CourseStatus;
  urgency: CourseUrgency;
  duration: number;
  deadline: string;
  tags: string[];
  desc: string;
  progress: number;
  sourceRefs?: string[];
  completionCriteria?: string[];
  taskTypeLabel?: string;
  suggestedPage?: string;
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

export const categories = [
  "全部",
  "产品知识",
  "规则制度",
  "接待流程",
  "销售话术",
  "案例复盘",
  "获客转化",
  "新品学习",
  "工艺规范",
  "设计规范",
  "系统培训",
  "必读文档",
  "岗位认知",
  "资源开拓",
  "社群 SOP",
  "数据指标",
  "转化运营",
];

export const courses: CourseSummary[] = [
  {
    id: "1",
    title: "板材基础知识与万骊板材体系（销售版）",
    subtitle: "产品基础课 · 先建立板材解释底座，再进入客户价值讲解",
    category: "产品知识",
    learnerRoles: ["sales"],
    version: "v1.0",
    versionChange: false,
    status: "not_started",
    urgency: "urgent",
    duration: 28,
    deadline: "今日优先",
    tags: ["板材", "LSB", "环保", "客户三连问"],
    desc: "围绕板材、价格、环保三连问，建立销售顾问的产品解释底座。",
    progress: 0,
    sourceRefs: ["销售顾问-映射大纲.md", "KB-PROD-MATERIAL-0001-板材基础知识与万骊板材体系（销售版）.md"],
    completionCriteria: [
      "能用自己的话说清 LSB 的 3 个核心卖点",
      "能回答客户关于板材、价格、环保的 3 类高频问题",
      "至少沉淀 1 版可复用的门店讲解话术",
    ],
    taskTypeLabel: "产品基础课",
    suggestedPage: "学习中心",
  },
  {
    id: "2",
    title: "衣柜基础五金（销售版）",
    subtitle: "产品基础课 · 用生活场景讲五金，不只背名词",
    category: "产品知识",
    learnerRoles: ["sales"],
    version: "v1.0",
    versionChange: false,
    status: "not_started",
    urgency: "warning",
    duration: 20,
    deadline: "3 天内",
    tags: ["五金", "衣柜", "场景讲解"],
    desc: "把结构连接、功能、辅助、扩展四类五金讲成客户能听懂的生活场景。",
    progress: 0,
    sourceRefs: ["销售顾问-映射大纲.md", "KB-PROD-HW-0001-衣柜基础五金销售版.md"],
    completionCriteria: [
      "至少说出 4 类五金及各自 1 个典型使用场景",
      "能把功能五金和客户生活习惯绑定讲解",
      "避免只背名称却讲不出使用价值",
    ],
    taskTypeLabel: "产品基础课",
    suggestedPage: "学习中心",
  },
  {
    id: "3",
    title: "销售接待闭环与云屏需求挖掘",
    subtitle: "接待流程课 · 把迎宾、需求挖掘到送别串成可执行接待闭环",
    category: "接待流程",
    learnerRoles: ["sales"],
    version: "v1.0",
    versionChange: false,
    status: "in_progress",
    urgency: "urgent",
    duration: 24,
    deadline: "今天完成更稳",
    tags: ["接待流程", "需求挖掘", "云屏"],
    desc: "基于销售模拟演练考核表，把迎宾、品牌塑造、展厅体验、需求探寻到安全送别串成完整链路。",
    progress: 35,
    sourceRefs: ["销售顾问-映射大纲.md", "销售模拟演练考核表.md"],
    completionCriteria: [
      "能复述迎宾、品牌塑造、展厅体验、云屏需求挖掘、量尺设计引导、安全送别 6 个环节",
      "明确云屏需求挖掘是最高权重环节",
      "至少写出 3 个围绕户型、预算、红线需求的追问题",
    ],
    taskTypeLabel: "接待流程课",
    suggestedPage: "首页今日任务 / 学习中心",
  },
  {
    id: "4",
    title: "成品家具销售及下单管理规范",
    subtitle: "规则底线课 · 先把口头承诺、非标和终审确认这些高风险点记牢",
    category: "规则制度",
    learnerRoles: ["sales"],
    version: "v1.0",
    versionChange: false,
    status: "not_started",
    urgency: "urgent",
    duration: 22,
    deadline: "明日前",
    tags: ["下单规范", "非标", "风险底线"],
    desc: "围绕口头下单、非标标注、签字确认与 24 小时终审，守住销售顾问的下单风险底线。",
    progress: 0,
    sourceRefs: ["销售顾问-映射大纲.md", "KB-RULE-ORDER-0003-成品家具销售及下单管理规范.md"],
    completionCriteria: [
      "能准确回答能否口头下单、非标怎么走、24 小时终审如何确认",
      "能识别尺寸改动、颜色/面料更换、特殊交期等非标情形",
      "做非标识别题时正确率目标 90%",
    ],
    taskTypeLabel: "规则底线课",
    suggestedPage: "学习中心 / 考核前置",
  },
  {
    id: "5",
    title: "20 分钟锁定百万订单：高净值客户识别与推进",
    subtitle: "案例复盘课 · 学高净值客户识别、预估和团队协同",
    category: "案例复盘",
    learnerRoles: ["sales"],
    version: "v1.0",
    versionChange: false,
    status: "completed",
    urgency: "normal",
    duration: 20,
    deadline: "已完成",
    tags: ["成交案例", "高净值客户", "异议处理"],
    desc: "从高预算客户识别、30% 投影预估法、团队协同到预付转化，拆解百万订单的关键动作。",
    progress: 100,
    sourceRefs: ["3.AI培训销售资料地图与转化流程总览.md", "销售S01——20分钟锁定百万订单.md"],
    completionCriteria: [
      "写出快速识人、30% 投影预估、团队协同 3 个关键动作",
      "能复述为什么不在微信里陷入价格拉扯",
      "输出 1 段自己的价格异议应对话术",
    ],
    taskTypeLabel: "案例复盘课",
    suggestedPage: "学习中心-案例课",
  },
  {
    id: "6",
    title: "社区运营岗位认知与协作边界",
    category: "岗位认知",
    learnerRoles: ["community_ops"],
    version: "v1.0",
    versionChange: true,
    status: "in_progress",
    urgency: "urgent",
    duration: 22,
    deadline: "今日优先",
    tags: ["运营新人", "协作边界", "岗位基础"],
    desc: "明确社区运营与销售、门店、设计、工厂、售后的协作边界，避免跨角色信息差",
    progress: 50,
  },
  {
    id: "7",
    title: "新小区资源开拓 SOP 与资源缺口判断",
    category: "资源开拓",
    learnerRoles: ["community_ops"],
    version: "v1.0",
    versionChange: false,
    status: "not_started",
    urgency: "urgent",
    duration: 28,
    deadline: "明日截止",
    tags: ["新小区", "资源盘点", "门店缺口"],
    desc: "从新小区识别、资源盘点、门店储备到动作派发，建立运营开拓最小闭环",
    progress: 0,
  },
  {
    id: "8",
    title: "社群建群、群人数增长与内容节奏 SOP",
    category: "社群 SOP",
    learnerRoles: ["community_ops"],
    version: "v1.0",
    versionChange: false,
    status: "not_started",
    urgency: "warning",
    duration: 24,
    deadline: "3 天内",
    tags: ["社群", "群人数", "内容节奏"],
    desc: "覆盖建群、拉新、活跃、内容发布节奏与规则维护，帮助运营新人快速上手",
    progress: 0,
  },
  {
    id: "9",
    title: "添加微信、QC、样板间与签单指标判断",
    category: "数据指标",
    learnerRoles: ["ops_manager"],
    version: "v1.0",
    versionChange: true,
    status: "not_started",
    urgency: "warning",
    duration: 26,
    deadline: "本周五",
    tags: ["指标", "异常判断", "样板间"],
    desc: "把群人数、微信添加、QC、样板间、签单目标串成可判断、可追踪的运营过程指标",
    progress: 0,
  },
  {
    id: "10",
    title: "样板间推进、活动转化与运营复盘方法",
    category: "转化运营",
    learnerRoles: ["ops_manager"],
    version: "v1.0",
    versionChange: false,
    status: "not_started",
    urgency: "normal",
    duration: 30,
    deadline: "本月底",
    tags: ["转化", "活动", "复盘"],
    desc: "围绕一对一、活动、样板间转化，形成动作复盘和案例沉淀方法",
    progress: 0,
  },
  {
    id: "11",
    title: "设计师新人规范作业与防错训练",
    category: "设计规范",
    learnerRoles: ["designer"],
    version: "v1.0",
    versionChange: true,
    status: "not_started",
    urgency: "urgent",
    duration: 26,
    deadline: "今日优先",
    tags: ["设计师", "规范作业", "防错训练"],
    desc: "把量尺、出图、报价一致性、会审讲解和审单前自检串成设计师新人上手路径",
    progress: 0,
  },
  {
    id: "12",
    title: "售后客诉 6 小时危机公关复盘",
    subtitle: "案例复盘课 · 情绪升级时先承接问题，再给动作和时间点",
    category: "案例复盘",
    learnerRoles: ["sales"],
    version: "v1.0",
    versionChange: false,
    status: "not_started",
    urgency: "warning",
    duration: 18,
    deadline: "本周内",
    tags: ["客诉", "危机公关", "售后"],
    desc: "围绕工期失控、情绪爆发和群内负面扩散，学习不推诿的处理底线。",
    progress: 0,
    sourceRefs: ["销售S02——售后客诉6小时危机公关.md"],
    completionCriteria: [
      "总结不推诿、到现场、持续反馈 3 条底层原则",
      "产出 1 版“承认问题 + 给出动作 + 给出时间点”的回复模板",
      "知道群内负面扩散时谁先到场、谁来持续反馈",
    ],
    taskTypeLabel: "案例复盘课",
    suggestedPage: "学习中心-案例课 / 成长补训",
  },
  {
    id: "13",
    title: "小红书精准获客与进店邀约",
    subtitle: "获客转化课 · 从目标小区内容到私信加微和进店邀约",
    category: "获客转化",
    learnerRoles: ["sales"],
    version: "v1.0",
    versionChange: false,
    status: "not_started",
    urgency: "normal",
    duration: 18,
    deadline: "本周内",
    tags: ["小红书", "精准获客", "邀约"],
    desc: "学习目标小区内容、标签与留钩子，建立从私信到进店的转化链。",
    progress: 0,
    sourceRefs: ["销售S04——新人半年小红书330万签单.md"],
    completionCriteria: [
      "输出 1 条目标小区笔记草稿，包含标题、3 个标签和 1 个钩子",
      "能画出私信、加微信、邀逛展厅、准备户型图、推进意向金 5 个节点",
      "明确精准流量比泛流量更重要，不只追曝光",
    ],
    taskTypeLabel: "获客转化课",
    suggestedPage: "学习中心-案例课 / 首页任务",
  },
];


export const learningPath = {
  learnerRole: "sales" as LearnerRole,
  title: "销售顾问首周上岗任务包",
  currentStage: "产品知识与接待底座",
  completedSteps: 2,
  totalSteps: 5,
  progress: 40,
  nextAction: "先完成板材 / 五金基础，再进入需求挖掘与下单规范。",
  entryCourseId: "1",
  milestones: [
    { title: "产品知识", state: "done" },
    { title: "接待闭环", state: "current" },
    { title: "规则底线", state: "todo" },
    { title: "成交案例", state: "todo" },
    { title: "获客与客诉", state: "todo" },
  ],
};

export const learningPaths = [
  learningPath,
  {
    learnerRole: "community_ops" as LearnerRole,
    title: "社区运营新人 14 日路径",
    currentStage: "岗位边界与资源开拓",
    completedSteps: 1,
    totalSteps: 6,
    progress: 17,
    nextAction: "先学岗位认知，再进入资源开拓 SOP 与社群推进陪练",
    entryCourseId: "6",
    milestones: [
      { title: "岗位认知", state: "current" },
      { title: "资源开拓", state: "todo" },
      { title: "社群 SOP", state: "todo" },
      { title: "指标判断", state: "todo" },
      { title: "AI 陪练", state: "todo" },
      { title: "岗位认证", state: "todo" },
    ],
  },
  {
    learnerRole: "ops_manager" as LearnerRole,
    title: "运营管理者看盘路径",
    currentStage: "异常识别与任务派发",
    completedSteps: 0,
    totalSteps: 5,
    progress: 0,
    nextAction: "学习过程指标判断后，再进入风险名单和复盘方法",
    entryCourseId: "9",
    milestones: [
      { title: "指标看盘", state: "current" },
      { title: "风险识别", state: "todo" },
      { title: "任务派发", state: "todo" },
      { title: "转化复盘", state: "todo" },
      { title: "补训联动", state: "todo" },
    ],
  },
  {
    learnerRole: "designer" as LearnerRole,
    title: "设计师新人 14 日路径",
    currentStage: "规范作业与防错训练",
    completedSteps: 0,
    totalSteps: 6,
    progress: 0,
    nextAction: "先学设计规范作业，再进入量尺、出图、报价一致性和会审讲解训练",
    entryCourseId: "11",
    milestones: [
      { title: "规范作业", state: "current" },
      { title: "量尺出图", state: "todo" },
      { title: "报价一致", state: "todo" },
      { title: "会审讲解", state: "todo" },
      { title: "审单自检", state: "todo" },
      { title: "岗位认证", state: "todo" },
    ],
  },
];

export const updateTopics = [
  {
    learnerRoles: ["sales"] as LearnerRole[],
    title: "销售顾问首周上岗任务包已同步",
    desc: "新增板材、五金、接待闭环、下单规范、高客单成交、客诉与小红书获客等真实任务。",
    impact: "影响首页今日任务、学习中心课程排序、案例课推荐与陪练建议",
    path: "/learning/course/1",
  },
  {
    learnerRoles: ["sales"] as LearnerRole[],
    title: "成品家具下单规范重点提醒",
    desc: "口头下单、非标标注和 24 小时终审确认是当前最需要反复记住的底线。",
    impact: "影响下单前确认、非标识别测验和后续补训判断",
    path: "/learning/course/4",
  },
  {
    learnerRoles: ["sales"] as LearnerRole[],
    title: "高客单成交与客诉案例专题上线",
    desc: "百万订单、客诉危机公关和小红书精准获客案例已加入学习中心。",
    impact: "影响案例学习、成长补训推荐和首页案例型任务展示",
    path: "/learning/course/5",
  },
  {
    learnerRoles: ["community_ops"] as LearnerRole[],
    title: "社区运营新人路径上线",
    desc: "新增岗位认知、资源开拓、社群 SOP、指标判断和转化复盘课程。",
    impact: "影响运营新人培养、运营陪练、岗位认证与成长补训",
    path: "/learning/course/6",
  },
  {
    learnerRoles: ["ops_manager"] as LearnerRole[],
    title: "运营过程指标口径同步",
    desc: "统一群人数、微信添加、QC、样板间、签单目标的判断口径。",
    impact: "影响运营看盘、异常识别、任务派发和复盘判断",
    path: "/learning/course/9",
  },
  {
    learnerRoles: ["designer"] as LearnerRole[],
    title: "设计师新人路径上线",
    desc: "新增规范作业、量尺出图、报价一致性、会审讲解和审单自检训练。",
    impact: "影响设计师新人培养、销设协同、审单前自检与成长补训",
    path: "/learning/course/11",
  },
];

export const recentLearningRecords = [
  {
    learnerRoles: ["sales"] as LearnerRole[],
    title: "销售接待闭环与云屏需求挖掘",
    status: "学习中",
    detail: "已学 2/5 节 · 下一步建议去做一轮云屏需求挖掘陪练",
  },
  {
    learnerRoles: ["sales"] as LearnerRole[],
    title: "20 分钟锁定百万订单：高净值客户识别与推进",
    status: "已完成",
    detail: "完成于昨天 18:22 · 建议把价格异议处理话术写进自己的讲解模板",
  },
  {
    learnerRoles: ["sales"] as LearnerRole[],
    title: "成品家具销售及下单管理规范",
    status: "未开始",
    detail: "已加入首周上岗任务包 · 建议在参加规则测验前先完成",
  },
  {
    learnerRoles: ["community_ops"] as LearnerRole[],
    title: "社区运营岗位认知与协作边界",
    status: "学习中",
    detail: "已学 2/4 节 · 推荐今天完成岗位基础认证前置课",
  },
  {
    learnerRoles: ["designer"] as LearnerRole[],
    title: "设计师新人规范作业与防错训练",
    status: "未开始",
    detail: "已加入设计师新人 14 日路径 · 建议今天先完成入口课",
  },
];

export const retrainReminders = [
  {
    learnerRoles: ["sales"] as LearnerRole[],
    title: "云屏需求挖掘需补练",
    reason: "需求探寻不完整会直接影响量尺、方案和成交通路，建议先补练追问结构。",
    action: "去陪练",
    path: "/learning/ai-practice",
  },
  {
    learnerRoles: ["sales"] as LearnerRole[],
    title: "下单规范需复记",
    reason: "口头承诺、非标漏标和 24 小时终审确认是当前最高风险点。",
    action: "去学习",
    path: "/learning/course/4",
  },
  {
    learnerRoles: ["sales"] as LearnerRole[],
    title: "客诉回复策略建议补学",
    reason: "面对情绪升级客户时，先承接问题再给动作和时间点，不能只做解释。",
    action: "看案例",
    path: "/learning/course/12",
  },
  {
    learnerRoles: ["community_ops"] as LearnerRole[],
    title: "运营岗位边界需补齐",
    reason: "跨角色信息差会影响销售、门店、设计和售后协同，需先统一运营边界",
    action: "去学习",
    path: "/learning/course/6",
  },
  {
    learnerRoles: ["ops_manager"] as LearnerRole[],
    title: "过程指标口径需同步",
    reason: "群人数、微信添加、QC、样板间、签单目标口径不一致会影响异常判断",
    action: "看指标课",
    path: "/learning/course/9",
  },
  {
    learnerRoles: ["designer"] as LearnerRole[],
    title: "设计规范需先补齐",
    reason: "量尺、出图、报价和会审讲解口径不一致会直接放大审单与返工风险",
    action: "去学习",
    path: "/learning/course/11",
  },
];


export const courseDetails: Record<string, CourseDetailData> = {
  "1": {
    ...courses[0],
    updateSummary: "从正式知识库提炼销售顾问最常被客户问到的板材、价格、环保三连问。",
    author: "产品知识库",
    updatedAt: "2026-05-12",
    learningGoals: [
      "说清万骊板材体系中 LSB、OSB、颗粒板、多层板的核心差异",
      "把板材、价格、环保三连问回答成客户能听懂的话",
      "先建立产品解释底座，再进入价值话术和需求挖掘",
    ],
    applicableScenes: ["门店接待", "产品讲解", "客户三连问", "AI 问答补充"],
    sections: [
      { id: "s1", title: "客户最常问的板材问题是什么", duration: 5, done: false, isKey: true },
      { id: "s2", title: "万骊板材体系与 LSB 核心卖点", duration: 8, done: false, isKey: true },
      { id: "s3", title: "环保、价格与耐用性的解释结构", duration: 7, done: false, isNew: true, isKey: true },
      { id: "s4", title: "门店讲解示例与易错表达", duration: 8, done: false },
    ],
    keyChanges: [
      { type: "add", text: "把板材知识收敛为销售顾问首周必学入口课" },
      { type: "add", text: "新增 LSB 3 个核心卖点和客户三连问答法" },
      { type: "change", text: "从单纯背板材名词改为能对客解释价格与环保差异" },
    ],
    relatedPractice: { title: "陪练：客户追问板材、环保和价格时怎么说？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：板材基础与客户三连问小测", path: "/learning/assessment" },
    relatedQnA: { title: "问答：客户问 LSB 和颗粒板差别时怎么回？", path: "/learning/ai-qna" },
    note: "建议作为销售顾问首周第一门课，学完再进入需求挖掘和价值话术。",
  },
  "2": {
    ...courses[1],
    updateSummary: "把衣柜五金知识改成能和客户生活场景直接绑定的销售表达。",
    author: "产品知识库",
    updatedAt: "2026-05-12",
    learningGoals: [
      "区分结构连接、功能、辅助、扩展四类五金",
      "把五金名称翻译成客户能感知的使用价值",
      "减少只会背词却不会讲场景的常见问题",
    ],
    applicableScenes: ["衣柜讲解", "方案演示", "加配价值说明", "门店接待"],
    sections: [
      { id: "s1", title: "四类五金全景认知", duration: 5, done: false, isKey: true },
      { id: "s2", title: "功能五金与生活习惯绑定讲解", duration: 6, done: false, isKey: true },
      { id: "s3", title: "典型使用场景与客户提问", duration: 5, done: false, isNew: true },
      { id: "s4", title: "高频误区：只讲名称不讲价值", duration: 4, done: false },
    ],
    keyChanges: [
      { type: "add", text: "新增 4 类五金与典型使用场景的对应关系" },
      { type: "change", text: "从背五金名称调整为会讲使用体验和加配价值" },
    ],
    relatedPractice: { title: "陪练：客户问为什么要上阻尼、拉篮、裤架时怎么说？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：五金分类与场景匹配小测", path: "/learning/assessment" },
    relatedQnA: { title: "问答：哪些五金最适合拿来做价值引导？", path: "/learning/ai-qna" },
    note: "建议紧接板材课学习，先把产品知识底座补齐，再进入接待与规则任务。",
  },
  "3": {
    ...courses[2],
    updateSummary: "基于销售模拟演练考核表，把接待闭环和云屏需求挖掘整理成首轮训练课。",
    author: "销售训练组",
    updatedAt: "2026-05-12",
    learningGoals: [
      "按顺序走完迎宾、品牌塑造、展厅体验、需求挖掘、量尺设计引导、安全送别",
      "理解云屏需求挖掘是整个接待闭环里权重最高的环节",
      "把户型、预算、重点空间、红线需求转成有结构的追问",
    ],
    applicableScenes: ["门店首访接待", "需求探寻", "量尺设计引导", "陪练前置"],
    sections: [
      { id: "s1", title: "迎宾与品牌塑造：别一上来就盘问客户", duration: 4, done: true },
      { id: "s2", title: "展厅体验与节奏建立", duration: 4, done: true },
      { id: "s3", title: "云屏需求挖掘：户型、预算、红线需求", duration: 7, done: false, isKey: true, isNew: true },
      { id: "s4", title: "量尺设计引导与安全送别", duration: 5, done: false, isKey: true },
      { id: "s5", title: "评分重点与易扣分项", duration: 4, done: false },
    ],
    keyChanges: [
      { type: "add", text: "新增基于考核表的接待闭环评分重点" },
      { type: "change", text: "把云屏需求挖掘单独拉出来作为高权重训练项" },
      { type: "add", text: "补充围绕户型、预算、空间和红线需求的追问模板" },
    ],
    relatedPractice: { title: "陪练：完成一轮云屏需求挖掘", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：接待闭环与需求挖掘评分", path: "/learning/assessment" },
    relatedQnA: { title: "问答：客户信息不完整时先追问什么？", path: "/learning/ai-qna" },
    note: "这是首页今日任务的主链路课，建议学完立刻做一轮需求挖掘陪练。",
  },
  "4": {
    ...courses[3],
    updateSummary: "把成品家具下单中的口头承诺、非标和终审确认整理成销售顾问的规则底线课。",
    author: "制度规则库",
    updatedAt: "2026-05-12",
    learningGoals: [
      "知道哪些承诺不能只靠口头，必须留痕和签字确认",
      "准确识别尺寸改动、颜色 / 面料更换、特殊交期等非标情形",
      "把 24 小时终审确认和非标醒目标注作为下单前固定动作",
    ],
    applicableScenes: ["下单前确认", "非标识别", "客户签字", "风险拦截"],
    sections: [
      { id: "s1", title: "下单前必须确认的底线事项", duration: 5, done: false, isKey: true },
      { id: "s2", title: "哪些情况属于非标", duration: 6, done: false, isKey: true, isNew: true },
      { id: "s3", title: "客户签字、资料留痕与 24 小时终审", duration: 6, done: false, isKey: true },
      { id: "s4", title: "典型漏标与错单处罚风险", duration: 5, done: false },
    ],
    keyChanges: [
      { type: "add", text: "新增销售顾问最常踩坑的非标识别与留痕要求" },
      { type: "change", text: "把口头下单、非标漏标、终审确认三个风险点前置成必学内容" },
    ],
    relatedPractice: { title: "陪练：客户临时改尺寸和颜色时怎么确认？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：非标需求识别与下单底线", path: "/learning/assessment" },
    relatedQnA: { title: "问答：哪些情况一定要按非标流程走？", path: "/learning/ai-qna" },
    note: "建议在参加规则测验前先完成本课，避免把高风险动作带到真实下单里。",
  },
  "5": {
    ...courses[4],
    updateSummary: "围绕高预算客户识别、30% 投影预估法和团队协同，拆解百万订单的关键动作。",
    author: "销售案例库",
    updatedAt: "2026-05-12",
    learningGoals: [
      "快速识别高净值客户，不把节奏浪费在低效拉扯上",
      "理解 30% 投影预估法为什么能帮助判断大单概率",
      "学会在价格异议里把客户重新拉回线下面谈和团队协同",
    ],
    applicableScenes: ["高净值客户接待", "价格异议处理", "团队协同", "案例复盘"],
    sections: [
      { id: "s1", title: "20 分钟内识别高预算客户", duration: 5, done: true, isKey: true },
      { id: "s2", title: "30% 投影预估法怎么用", duration: 5, done: true, isKey: true },
      { id: "s3", title: "团队协同如何推动预付转化", duration: 5, done: true },
      { id: "s4", title: "为什么不要在微信里陷入价格拉扯", duration: 5, done: true, isNew: true },
    ],
    keyChanges: [
      { type: "add", text: "新增高净值客户识别、预估和协同的完整复盘结构" },
      { type: "change", text: "把价格异议处理重点从降价拉扯改为回到线下面谈" },
    ],
    relatedPractice: { title: "陪练：客户说太贵了，如何把对话拉回线下面谈？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：百万订单案例关键动作复盘", path: "/learning/assessment" },
    relatedQnA: { title: "问答：怎么快速判断一个客户可能是大单？", path: "/learning/ai-qna" },
    note: "这门课适合在产品和流程底座补齐后学习，用来拉高对高客单场景的判断力。",
  },
  "6": {
    ...courses[5],
    prevVersion: "试运行版",
    updateSummary: "新增社区运营岗位学习入口，统一运营与销售、门店、设计、工厂、售后的协作边界",
    author: "运营训练组",
    updatedAt: "2026-05-12",
    learningGoals: [
      "说清社区运营在资源、社群、转化、复盘中的核心职责",
      "区分运营与销售、门店、设计、工厂、售后的协同边界",
      "识别新品信息不同步、培训课件滞后、产能与售后联动不足等信息差风险",
    ],
    applicableScenes: ["运营新人入职", "跨角色协同", "任务派发前置", "运营岗位认证"],
    sections: [
      { id: "s1", title: "社区运营岗位目标与日常动作", duration: 5, done: true, isKey: true },
      { id: "s2", title: "与销售、门店、设计的协作边界", duration: 6, done: true, isKey: true },
      { id: "s3", title: "与工厂产能、售后反馈的联动口径", duration: 5, done: false, isNew: true, isKey: true },
      { id: "s4", title: "典型信息差风险与处理动作", duration: 6, done: false, isNew: true },
    ],
    keyChanges: [
      { type: "add", text: "新增运营岗位认知主课，补齐运营新人学习路径第一步" },
      { type: "add", text: "新增跨角色信息差风险：新品信息不同步、课件滞后、产能和售后联动不足" },
    ],
    relatedPractice: { title: "陪练：门店资源不足时如何推动店长补资源？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：社区运营岗位基础认证", path: "/learning/assessment" },
    relatedQnA: { title: "问答：运营和销售、设计边界不清时怎么处理？", path: "/learning/ai-qna" },
    note: "这是运营学习路径的入口课，建议运营新人先完成后再进入资源开拓和社群 SOP。",
  },
  "7": {
    ...courses[6],
    updateSummary: "沉淀新小区识别、资源盘点、门店缺口判断和推进动作",
    author: "社区运营组",
    updatedAt: "2026-05-12",
    learningGoals: [
      "判断一个新小区是否值得进入资源开拓池",
      "用门店资源缺口倒推出运营开拓动作",
      "把资源问题拆成可派发、可跟进、可回执的任务",
    ],
    applicableScenes: ["新小区开拓", "门店资源盘点", "运营动作任务", "资源缺口复盘"],
    sections: [
      { id: "s1", title: "新小区识别与分层标准", duration: 7, done: false, isKey: true },
      { id: "s2", title: "门店资源储备与缺口判断", duration: 8, done: false, isKey: true },
      { id: "s3", title: "资源开拓动作拆解", duration: 7, done: false },
      { id: "s4", title: "任务派发、跟进与回执", duration: 6, done: false },
    ],
    keyChanges: [
      { type: "add", text: "新增资源开拓 SOP，承接运营工作台的资源开拓页" },
      { type: "add", text: "新增门店资源缺口判断口径，便于后续和风险名单联动" },
    ],
    relatedPractice: { title: "陪练：门店资源不足，如何沟通补资源？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：资源开拓专项测试", path: "/learning/assessment" },
    relatedQnA: { title: "问答：新小区资源不足时先做什么？", path: "/learning/ai-qna" },
    note: "本课用于把运营开拓动作标准化，后续可直接映射到运营动作任务页。",
  },
  "8": {
    ...courses[7],
    updateSummary: "补齐建群、拉新、活跃、内容节奏与规则维护的社群运营 SOP",
    author: "社群运营组",
    updatedAt: "2026-05-12",
    learningGoals: [
      "掌握建群、拉新和群人数增长的阶段动作",
      "知道不同阶段该发什么内容、用什么节奏维护群活跃",
      "识别群人数长期不达标时的原因和补救动作",
    ],
    applicableScenes: ["社群建群", "群人数增长", "内容节奏维护", "运营异常处理"],
    sections: [
      { id: "s1", title: "建群前准备与入群规则", duration: 5, done: false },
      { id: "s2", title: "群人数增长动作拆解", duration: 7, done: false, isKey: true },
      { id: "s3", title: "内容节奏与活跃维护", duration: 7, done: false, isKey: true },
      { id: "s4", title: "群人数不达标的异常处置", duration: 5, done: false },
    ],
    keyChanges: [
      { type: "add", text: "新增社群 SOP 课程，支撑运营新人从建群到活跃维护的学习闭环" },
    ],
    relatedPractice: { title: "陪练：小区群人数长期不达标，如何制定动作？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：社群运营 SOP 测试", path: "/learning/assessment" },
    relatedQnA: { title: "问答：群人数增长慢该怎么排查？", path: "/learning/ai-qna" },
    note: "本课适合运营新人第二阶段学习，建议学完后进入社群推进陪练。",
  },
  "9": {
    ...courses[8],
    prevVersion: "试运行版",
    updateSummary: "统一运营过程指标口径，补齐异常判断和看盘训练",
    author: "运营数据组",
    updatedAt: "2026-05-12",
    learningGoals: [
      "看懂群人数、微信添加、QC、样板间、签单目标之间的过程关系",
      "识别小区、门店、人员、转化四类运营风险",
      "把指标异常转成运营动作任务和补训建议",
    ],
    applicableScenes: ["运营看盘", "风险名单", "任务派发", "管理者复盘"],
    sections: [
      { id: "s1", title: "运营过程指标总览", duration: 6, done: false, isKey: true },
      { id: "s2", title: "添加微信与 QC 异常判断", duration: 6, done: false, isNew: true, isKey: true },
      { id: "s3", title: "样板间与签单目标差额判断", duration: 7, done: false, isNew: true },
      { id: "s4", title: "从指标异常到任务派发", duration: 7, done: false, isKey: true },
    ],
    keyChanges: [
      { type: "add", text: "新增运营指标判断课，承接工作台过程数据与风险名单" },
      { type: "add", text: "新增添加微信、QC、样板间、签单目标的异常判断口径" },
    ],
    relatedPractice: { title: "陪练：添加微信数据偏低，如何定位原因？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：指标异常判断测试", path: "/learning/assessment" },
    relatedQnA: { title: "问答：QC 和样板间指标异常怎么拆解？", path: "/learning/ai-qna" },
    note: "这是运营管理者看盘路径的关键课，后续要与运营过程数据页联动。",
  },
  "10": {
    ...courses[9],
    updateSummary: "围绕一对一、活动、样板间转化，建立运营复盘与案例沉淀方法",
    author: "转化运营组",
    updatedAt: "2026-05-12",
    learningGoals: [
      "区分一对一转化、活动转化、样板间转化的不同推进动作",
      "用数据和过程记录复盘转化效果差的原因",
      "把成功和失败案例沉淀为后续课程、题库和陪练场景",
    ],
    applicableScenes: ["活动转化", "样板间推进", "转化复盘", "案例沉淀"],
    sections: [
      { id: "s1", title: "三类转化对象与关键动作", duration: 7, done: false, isKey: true },
      { id: "s2", title: "活动转化差的复盘框架", duration: 8, done: false },
      { id: "s3", title: "样板间推进停滞的协同动作", duration: 8, done: false, isKey: true },
      { id: "s4", title: "案例沉淀与复用方式", duration: 7, done: false },
    ],
    keyChanges: [
      { type: "add", text: "新增转化复盘课，为后续方法沉淀页和学习回流做准备" },
    ],
    relatedPractice: { title: "陪练：活动转化差，如何做复盘？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：转化复盘能力测试", path: "/learning/assessment" },
    relatedQnA: { title: "问答：样板间推进停滞时该协调谁？", path: "/learning/ai-qna" },
    note: "本课属于 P1 前置内容，先在学习闭环中完成影子验证。",
  },
  "11": {
    ...courses[10],
    prevVersion: "试运行版",
    updateSummary: "新增设计师新人学习路径入口，把设计规范、防错训练和销设协同前置成同一条路径",
    author: "设计训练组",
    updatedAt: "2026-05-12",
    learningGoals: [
      "掌握设计师新人从量尺、出图到会审讲解的基础作业顺序",
      "识别报价、图纸、工艺边界不一致带来的审单和返工风险",
      "把设计规范学习、销设协同和审单前自检连成可执行闭环",
    ],
    applicableScenes: ["设计师新人入职", "量尺出图", "销设会审", "审单前自检", "设计岗位认证"],
    sections: [
      { id: "s1", title: "设计师岗位目标与新人作业顺序", duration: 5, done: false, isKey: true },
      { id: "s2", title: "量尺、出图、版本命名与交付口径", duration: 6, done: false, isNew: true, isKey: true },
      { id: "s3", title: "报价、图纸、工艺一致性自检", duration: 6, done: false, isNew: true, isKey: true },
      { id: "s4", title: "销售-设计会审讲解与客户需求确认", duration: 5, done: false, isKey: true },
      { id: "s5", title: "高频返工风险与审单前防错清单", duration: 4, done: false, isNew: true },
    ],
    keyChanges: [
      { type: "add", text: "新增设计师新人路径入口，和销售、运营、运营管理者路径并列展示" },
      { type: "add", text: "新增量尺出图、报价一致性、会审讲解和审单自检的阶段训练" },
    ],
    relatedPractice: { title: "陪练：会审时如何讲清方案并确认客户红线？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：设计师新人规范作业认证", path: "/learning/assessment" },
    relatedQnA: { title: "问答：图纸、报价和销售口径不一致时怎么处理？", path: "/learning/ai-qna" },
    note: "这是设计师新人路径的入口课，建议先完成后再进入设计规范专题和会审讲解训练。",
  },
  "12": {
    ...courses[11],
    updateSummary: "把售后客诉案例整理成销售顾问的情绪承接与危机处理训练课。",
    author: "销售案例库",
    updatedAt: "2026-05-12",
    learningGoals: [
      "识别工期承诺失控、设计缺位感和群内扩散是如何叠加成危机的",
      "学会在情绪升级时先承接问题，再给动作和时间点",
      "把客诉处理从解释型表达切回到行动型表达",
    ],
    applicableScenes: ["售后客诉", "群内危机扩散", "到场沟通", "成长补训"],
    sections: [
      { id: "s1", title: "客诉为什么会在 6 小时内迅速升级", duration: 4, done: false, isKey: true },
      { id: "s2", title: "不推诿、到现场、持续反馈三条底线", duration: 5, done: false, isKey: true },
      { id: "s3", title: "回复模板：承认问题 + 给出动作 + 给出时间点", duration: 5, done: false, isNew: true },
      { id: "s4", title: "群内负面扩散时的节奏控制", duration: 4, done: false },
    ],
    keyChanges: [
      { type: "add", text: "新增情绪升级型客诉的处理底线与回复模板" },
      { type: "change", text: "从只做解释调整为先承接问题、再给动作和时间点" },
    ],
    relatedPractice: { title: "陪练：客户质问“你们还是人吗”时如何回应？", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：客诉回复策略专项测验", path: "/learning/assessment" },
    relatedQnA: { title: "问答：群里开始发负面消息时先做什么？", path: "/learning/ai-qna" },
    note: "这门课适合在规则底线课之后学习，用来补齐高压场景下的回应动作。",
  },
  "13": {
    ...courses[12],
    updateSummary: "围绕目标小区内容、标签和留钩子，建立从私信到进店邀约的获客转化链。",
    author: "销售案例库",
    updatedAt: "2026-05-12",
    learningGoals: [
      "理解为什么小红书更重要的是精准流量，不是泛曝光",
      "掌握目标小区内容、标签和留钩子的基本写法",
      "把私信、加微信、邀逛展厅、准备户型图和推进意向金连成链路",
    ],
    applicableScenes: ["小红书获客", "私信转化", "进店邀约", "内容引流"],
    sections: [
      { id: "s1", title: "为什么要做目标小区内容", duration: 4, done: false, isKey: true },
      { id: "s2", title: "标题、标签和留钩子的写法", duration: 5, done: false, isKey: true, isNew: true },
      { id: "s3", title: "从私信加微到进店邀约的 5 个节点", duration: 5, done: false, isKey: true },
      { id: "s4", title: "高频误区：只追流量，不追精准转化", duration: 4, done: false },
    ],
    keyChanges: [
      { type: "add", text: "新增目标小区内容、标签和留钩子的拆解方法" },
      { type: "add", text: "新增从私信到进店邀约的 5 节点转化链" },
    ],
    relatedPractice: { title: "陪练：把一条目标小区笔记讲成可执行动作", path: "/learning/ai-practice" },
    relatedAssessment: { title: "考核：小红书获客链路理解测验", path: "/learning/assessment" },
    relatedQnA: { title: "问答：为什么精准流量比泛流量更重要？", path: "/learning/ai-qna" },
    note: "这门课适合作为首周后半段的加分项，用来把线上获客和线下邀约接起来。",
  },
};


export function getCourseDetailById(id?: string) {
  return courseDetails[id || "1"] || courseDetails["1"];
}
