import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ClipboardList,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  FileText,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import type { LearnerRole } from "../context/AppContext";
import { getLearnerRoleMeta, useApp } from "../context/AppContext";
import {
  generatedLearningKnowledgeMeta,
  getOnboardingKnowledgeSeeds,
  getRoleCompetencyTags,
} from "../data/learningKnowledgeMap";

type Stage = "list" | "instructions" | "answering" | "result";

type Question = {
  id: number;
  type: "single" | "multiple";
  question: string;
  options: string[];
  correct: number | number[];
  explanation: string;
};

type AnswerValue = number | number[] | null;

const allLearnerRoles: LearnerRole[] = ["sales", "community_ops", "ops_manager", "designer"];

const exams = [
  {
    id: "onboarding",
    title: "新人入门能力摸底考核",
    learnerRoles: allLearnerRoles,
    questionCount: 5,
    duration: 15,
    deadline: "入职必做",
    urgency: "warning",
    status: "not_started",
    passingScore: 85,
    desc: "不同学习身份使用同一个入门考核入口，题目会按当前身份检查是否具备对应岗位的基础胜任力",
  },
  {
    id: "1",
    title: "板材基础与客户三连问小测",
    learnerRoles: ["sales"] as LearnerRole[],
    questionCount: 5,
    duration: 12,
    deadline: "3天后",
    urgency: "normal",
    status: "not_started",
    passingScore: 80,
    desc: "围绕板材差异、环保表达、价格解释和客户常见追问，共 5 题",
  },
  {
    id: "2",
    title: "非标需求识别与下单底线",
    learnerRoles: ["sales"] as LearnerRole[],
    questionCount: 5,
    duration: 12,
    deadline: "本周五",
    urgency: "warning",
    status: "not_started",
    passingScore: 90,
    desc: "重点考核口头承诺、非标标注、签字留痕和 24 小时终审确认",
  },
  {
    id: "3",
    title: "销售顾问首周任务综合认证",
    learnerRoles: ["sales"] as LearnerRole[],
    questionCount: 8,
    duration: 20,
    deadline: "已通过",
    urgency: "normal",
    status: "passed",
    passingScore: 80,
    lastScore: 88,
    desc: "覆盖板材、五金、接待闭环、高客单、客诉和小红书获客关键动作",
  },
  {
    id: "4",
    title: "社区运营岗位基础认证",
    learnerRoles: ["community_ops"] as LearnerRole[],
    questionCount: 12,
    duration: 20,
    deadline: "今日优先",
    urgency: "warning",
    status: "not_started",
    passingScore: 85,
    desc: "考核岗位边界、资源开拓、社群 SOP、指标含义和异常判断基础",
  },
  {
    id: "5",
    title: "运营指标异常判断测试",
    learnerRoles: ["ops_manager"] as LearnerRole[],
    questionCount: 15,
    duration: 25,
    deadline: "本周五",
    urgency: "warning",
    status: "not_started",
    passingScore: 85,
    desc: "围绕群人数、微信添加、QC、样板间、签单目标判断运营风险",
  },
  {
    id: "6",
    title: "设计师新人规范作业认证",
    learnerRoles: ["designer"] as LearnerRole[],
    questionCount: 12,
    duration: 20,
    deadline: "今日优先",
    urgency: "warning",
    status: "not_started",
    passingScore: 85,
    desc: "考核量尺出图、报价一致性、会审讲解和审单前自检基础",
  },
] as const;

const questions: Question[] = [
  {
    id: 1,
    type: "single",
    question: "客户问 LSB 和普通颗粒板差在哪时，销售顾问最合适的第一反应是？",
    options: ["直接说 LSB 更高级", "先确认客户关心价格、环保还是耐用，再用场景解释差异", "告诉客户大家都买 LSB", "马上给折扣降低疑虑"],
    correct: 1,
    explanation: "板材讲解要先识别客户真实顾虑，再把差异落到环保、稳定性和长期使用体验，不能只背名词或直接降价。",
  },
  {
    id: 2,
    type: "single",
    question: "解释板材价格差异时，以下哪种表达最符合销售顾问训练要求？",
    options: ["我们就是比别人贵", "便宜板材肯定不环保", "价格差异要结合板材稳定性、环保表达和后期使用风险讲清楚", "客户不懂板材，没必要讲太细"],
    correct: 2,
    explanation: "价格解释不能空泛说贵或贬低竞品，应把差异具体化，并转换成客户能理解的长期使用价值。",
  },
  {
    id: 3,
    type: "multiple",
    question: "客户追问板材、环保和价格时，销售顾问需要覆盖哪些信息？（多选）",
    options: [
      "客户具体使用空间",
      "板材核心差异和环保表达",
      "价格差异背后的使用价值",
      "只给一个最低价即可",
    ],
    correct: [0, 1, 2],
    explanation: "板材基础课要求能回答客户三连问，同时结合客户家的空间和使用场景；只给最低价会丢掉价值解释。",
  },
  {
    id: 4,
    type: "single",
    question: "衣柜五金讲解中，最容易扣分的做法是？",
    options: [
      "按结构连接、功能、辅助、扩展分类解释",
      "结合客户生活习惯说明哪些五金优先保留",
      "只背五金名称，但讲不出使用价值",
      "预算有限时给出配置优先级",
    ],
    correct: 2,
    explanation: "五金课的重点不是背名称，而是把功能五金和客户生活习惯、收纳效率、使用体验绑定。",
  },
  {
    id: 5,
    type: "single",
    question: "客户说“我先随便看看”时，云屏需求挖掘最合适的切入方式是？",
    options: [
      "直接介绍所有产品卖点",
      "降低压力后，围绕户型、重点空间、预算和红线需求轻量追问",
      "让客户自己先看，不再打扰",
      "马上要求客户交定金",
    ],
    correct: 1,
    explanation: "接待闭环要求把迎宾、需求挖掘和量尺设计引导串起来，客户轻咨询时也要温和进入结构化追问。",
  },
];

const questionBank: Record<string, Question[]> = {
  "2": [
    {
      id: 1,
      type: "single",
      question: "客户下单前临时提出尺寸调整，销售顾问首先应判断什么？",
      options: ["能不能口头答应", "是否触发非标及是否需要版本确认", "能不能先生产再补手续", "是否可以忽略小改动"],
      correct: 1,
      explanation: "尺寸、颜色、面料、交期等变更都可能触发非标，必须先判断风险并做版本确认。",
    },
    {
      id: 2,
      type: "multiple",
      question: "以下哪些情况通常需要作为非标或高风险变更处理？（多选）",
      options: ["尺寸改动", "颜色 / 面料更换", "特殊交期", "客户口头说先按原方案"],
      correct: [0, 1, 2],
      explanation: "尺寸、颜色 / 面料、特殊交期都可能影响生产和交付，需要醒目标注和客户确认。",
    },
    {
      id: 3,
      type: "single",
      question: "关于口头承诺，最符合下单管理规范的是？",
      options: ["熟客可以只口头确认", "金额不大可以不留痕", "关键变更必须书面确认和签字留痕", "销售自己记住即可"],
      correct: 2,
      explanation: "下单规范的底线是关键变更不能只靠口头承诺，必须书面确认、签字留痕。",
    },
    {
      id: 4,
      type: "single",
      question: "24 小时终审确认的目的是什么？",
      options: ["拖延客户下单", "统一客户确认、版本资料和生产口径，降低错单风险", "让客户重新选方案", "方便销售以后解释"],
      correct: 1,
      explanation: "终审确认是为了让客户、销售、设计和生产口径一致，防止非标漏标、版本错乱和交付争议。",
    },
    {
      id: 5,
      type: "multiple",
      question: "下单前风险收口需要包含哪些动作？（多选）",
      options: ["变更点清单", "客户签字或确认记录", "责任人和终审时间", "只在聊天里随口说一下"],
      correct: [0, 1, 2],
      explanation: "下单风险收口需要可追踪、可复核，随口确认不能替代正式留痕。",
    },
  ],
  "3": [
    ...questions,
    {
      id: 6,
      type: "single",
      question: "高预算客户在微信里反复压价时，更稳的推进方式是？",
      options: ["直接报最低价", "把对话拉回户型、配置和线下面谈，避免只比单项价格", "停止跟进", "只发产品图片"],
      correct: 1,
      explanation: "百万订单案例强调不要在微信里陷入价格拉扯，要结合户型、配置、团队协同和线下面谈推进。",
    },
    {
      id: 7,
      type: "single",
      question: "客诉情绪爆发时，第一句话最应该做到什么？",
      options: ["解释公司流程", "承接问题和情绪，给出处理动作和反馈时间", "让客户冷静一点", "说明不是自己的责任"],
      correct: 1,
      explanation: "客诉危机公关要求先承接问题，再给动作、责任人和时间点，避免推诿和空解释。",
    },
    {
      id: 8,
      type: "multiple",
      question: "小红书精准获客从内容到进店通常要串起哪些节点？（多选）",
      options: ["目标小区内容钩子", "私信沟通和加微信", "邀逛展厅或准备户型图", "只追求泛曝光"],
      correct: [0, 1, 2],
      explanation: "小红书获客课强调精准流量和转化链路，不是只追曝光。",
    },
  ],
  "4": [
    {
      id: 1,
      type: "single",
      question: "社区运营新人第一阶段最应该先确认什么？",
      options: ["产品参数背诵", "岗位职责和跨角色协作边界", "报价政策", "售后赔付规则"],
      correct: 1,
      explanation: "运营新人需要先建立岗位边界，明确与销售、门店、设计、工厂、售后的协作关系。",
    },
    {
      id: 2,
      type: "multiple",
      question: "以下哪些属于社区运营常见信息差风险？（多选）",
      options: ["新品信息不同步", "培训课件滞后", "工厂产能与售后联动不足", "天气变化"],
      correct: [0, 1, 2],
      explanation: "新品、课件、产能和售后联动都是跨角色协同中需要运营关注的信息差风险。",
    },
    {
      id: 3,
      type: "single",
      question: "门店资源不足时，运营最合适的第一步是？",
      options: ["直接催门店补资源", "先盘点资源池和缺口，再明确动作", "暂停该小区", "只发群公告"],
      correct: 1,
      explanation: "资源问题要先盘点现有资源和缺口，再拆成可执行、可回执的动作。",
    },
    {
      id: 4,
      type: "single",
      question: "社群人数长期不达标，以下哪种处理更符合 SOP？",
      options: ["只要求销售多拉人", "拆解资源、触达、内容节奏和执行责任", "直接降低目标", "停止该群运营"],
      correct: 1,
      explanation: "社群异常不能只归因给销售，需要从资源、触达、内容节奏和执行责任综合判断。",
    },
    {
      id: 5,
      type: "multiple",
      question: "运营动作任务需要包含哪些闭环要素？（多选）",
      options: ["责任人", "截止时间", "回执口径", "任务背景和指标缺口"],
      correct: [0, 1, 2, 3],
      explanation: "运营任务必须能追踪和复盘，因此责任人、截止时间、回执口径和指标背景都需要明确。",
    },
  ],
  "5": [
    {
      id: 1,
      type: "single",
      question: "添加微信数据偏低时，最不应该直接得出的结论是？",
      options: ["人员执行可能有问题", "触达资源可能不足", "客户一定没有需求", "邀约话术可能需要复盘"],
      correct: 2,
      explanation: "添加偏低需要先拆解资源、触达、话术和执行，不能直接判断客户没有需求。",
    },
    {
      id: 2,
      type: "multiple",
      question: "运营过程指标通常应包括哪些？（多选）",
      options: ["群人数", "微信添加", "QC", "样板间和签单目标"],
      correct: [0, 1, 2, 3],
      explanation: "群人数、微信添加、QC、样板间和签单目标共同构成运营过程判断链路。",
    },
    {
      id: 3,
      type: "single",
      question: "样板间推进停滞时，运营最应该补充哪类信息？",
      options: ["只看最终签单数", "推进卡点、责任对象和下一步协同动作", "只通知客户", "只更新海报"],
      correct: 1,
      explanation: "样板间停滞要定位卡点、责任对象和协同动作，才能进入任务闭环。",
    },
    {
      id: 4,
      type: "single",
      question: "活动转化差的复盘不应只看什么？",
      options: ["报名人数", "执行过程", "触达质量", "跟进节奏"],
      correct: 0,
      explanation: "复盘不能只看报名人数，还要看触达质量、执行过程、跟进节奏和转化链路。",
    },
    {
      id: 5,
      type: "multiple",
      question: "从工作台风险名单回流到学习补训时，可以推送哪些内容？（多选）",
      options: ["运营指标判断课", "社群推进 AI 陪练", "岗位认证复测", "转化复盘案例"],
      correct: [0, 1, 2, 3],
      explanation: "风险名单发现能力弱项后，可以联动课程、陪练、考核和案例复盘。",
    },
  ],
  "6": [
    {
      id: 1,
      type: "single",
      question: "设计师新人做方案讲解时，最先应该确认什么？",
      options: ["客户核心需求和红线", "只展示效果图", "先讲价格优惠", "直接进入下单"],
      correct: 0,
      explanation: "方案讲解应先围绕客户需求、红线和方案逻辑展开，再进入图纸和报价边界。",
    },
    {
      id: 2,
      type: "multiple",
      question: "审单前设计师需要重点自检哪些一致性？（多选）",
      options: ["图纸版本", "报价范围", "工艺边界", "销售承诺口径"],
      correct: [0, 1, 2, 3],
      explanation: "图纸、报价、工艺和销售承诺任一口径不一致，都可能导致返工或审单异常。",
    },
    {
      id: 3,
      type: "single",
      question: "客户提出方案疑问时，设计师最合适的回应方式是？",
      options: ["只说这是标准做法", "先复述需求，再解释设计取舍", "让销售单独解释", "马上承诺都能改"],
      correct: 1,
      explanation: "先复述需求能确认理解一致，再解释设计取舍，避免客户认为设计师没有听懂。",
    },
  ],
};

const onboardingQuestionBank: Record<LearnerRole, Question[]> = {
  sales: [
    {
      id: 1,
      type: "single",
      question: "新人销售顾问接到客户第一句“你们板材为什么贵”时，最能体现基础能力的处理是？",
      options: ["先给最低价", "先判断客户关心价格、环保还是耐用，再结合空间场景解释", "直接说品牌更好", "让客户先看宣传册"],
      correct: 1,
      explanation: "入门销售能力首先看能否识别客户真实顾虑，并把产品知识转成客户能理解的使用价值。",
    },
    {
      id: 2,
      type: "multiple",
      question: "销售新人做需求确认时，至少要问清哪些信息？（多选）",
      options: ["户型和重点空间", "预算区间", "客户不能接受的红线", "只问什么时候付款"],
      correct: [0, 1, 2],
      explanation: "能否围绕户型、空间、预算和红线建立需求底座，是判断新人能否进入真实销售动作的关键。",
    },
    {
      id: 3,
      type: "single",
      question: "客户临时要求改尺寸和颜色，销售新人最应该先做什么？",
      options: ["口头答应客户", "判断是否触发非标并提醒版本确认", "让工厂先做", "忽略小改动"],
      correct: 1,
      explanation: "下单前变更必须先识别风险，不能靠口头承诺推进。",
    },
    {
      id: 4,
      type: "single",
      question: "客户在群里情绪升级时，销售新人第一句话应该优先做到什么？",
      options: ["解释流程", "承接问题和情绪，并给出处理动作与反馈时间", "说明不是自己的责任", "让客户冷静"],
      correct: 1,
      explanation: "客诉处理的基础能力是先承接，再给动作和时间点，避免空解释和推责。",
    },
    {
      id: 5,
      type: "multiple",
      question: "判断销售新人是否能上岗，以下哪些表现可以作为通过依据？（多选）",
      options: ["能把产品差异讲成客户体验", "能识别非标和留痕风险", "能把沟通推进到量尺、到店或确认版本", "只会背产品名词"],
      correct: [0, 1, 2],
      explanation: "入门考核不是考背诵，而是看能否把知识、风险和推进动作串起来。",
    },
  ],
  community_ops: [
    {
      id: 1,
      type: "single",
      question: "社区运营新人看到小区群人数长期不达标，最合适的第一步是？",
      options: ["直接要求销售多拉人", "拆解资源、触达、内容节奏和执行责任", "降低目标", "停止运营该小区"],
      correct: 1,
      explanation: "社区运营新人必须先会拆问题，而不是直接把责任推给单一角色。",
    },
    {
      id: 2,
      type: "multiple",
      question: "社区运营基础动作需要能追踪哪些闭环要素？（多选）",
      options: ["责任人", "截止时间", "回执口径", "指标缺口"],
      correct: [0, 1, 2, 3],
      explanation: "可追踪、可回执、可复盘，是判断社区运营新人是否能落地执行的基础。",
    },
    {
      id: 3,
      type: "single",
      question: "门店反馈没有新资源时，社区运营新人不应直接做的是？",
      options: ["盘点现有资源池", "确认缺口和目标小区优先级", "只发一句继续跟进", "拆成门店和人员动作"],
      correct: 2,
      explanation: "“继续跟进”不是动作，入门能力要能把资源问题拆成具体任务。",
    },
    {
      id: 4,
      type: "single",
      question: "社区运营发现新品信息、培训课件和 AI 陪练口径不一致时，应优先判断为什么问题？",
      options: ["个人记忆问题", "跨角色信息同步风险", "客户没有需求", "页面样式问题"],
      correct: 1,
      explanation: "社区运营要能识别信息差，并推动信息同步到课件、题库、陪练和业务端。",
    },
    {
      id: 5,
      type: "multiple",
      question: "以下哪些能证明社区运营新人具备入门能力？（多选）",
      options: ["能拆解指标异常", "能派发责任人和截止时间", "能记录回执和复盘节点", "只看最终签单数"],
      correct: [0, 1, 2],
      explanation: "社区运营入门能力重点看过程管理和闭环推进，不是只看结果。",
    },
  ],
  ops_manager: [
    {
      id: 1,
      type: "single",
      question: "运营管理新人看到微信添加偏低，最不应该直接判断的是？",
      options: ["触达资源可能不足", "邀约话术可能有问题", "人员执行可能偏弱", "客户一定没有需求"],
      correct: 3,
      explanation: "运营管理要先拆资源、触达、执行和话术，不能直接用单一结论替代分析。",
    },
    {
      id: 2,
      type: "multiple",
      question: "运营管理新人做异常判断时，应同时看哪些过程指标？（多选）",
      options: ["群人数", "微信添加", "QC", "样板间和签单目标"],
      correct: [0, 1, 2, 3],
      explanation: "过程指标链路完整，才能判断异常来自资源、执行还是转化。",
    },
    {
      id: 3,
      type: "single",
      question: "样板间推进停滞时，运营管理新人最需要补齐的信息是？",
      options: ["只看最后签单数", "卡点、责任对象和下一步协同动作", "换一张海报", "直接通知客户"],
      correct: 1,
      explanation: "运营管理入门能力要能把停滞问题定位到卡点、责任和下一步动作。",
    },
    {
      id: 4,
      type: "single",
      question: "活动转化差的复盘如果只看报名人数，会漏掉什么？",
      options: ["过程质量和跟进节奏", "页面颜色", "员工头像", "天气记录"],
      correct: 0,
      explanation: "复盘要看触达质量、执行过程、跟进节奏和转化链路。",
    },
    {
      id: 5,
      type: "multiple",
      question: "以下哪些表现说明运营管理新人具备基础胜任力？（多选）",
      options: ["能定位异常来源", "能安排处理优先级", "能把问题回流到补训或流程优化", "只要求大家努力"],
      correct: [0, 1, 2],
      explanation: "运营管理的入门能力是判断、排序和闭环，不是泛泛要求。",
    },
  ],
  designer: [
    {
      id: 1,
      type: "single",
      question: "设计师新人讲方案前，最先应该确认什么？",
      options: ["客户核心需求和红线", "只展示效果图", "先讲优惠", "直接进入下单"],
      correct: 0,
      explanation: "设计师入门能力首先看能否围绕客户需求和红线组织方案表达。",
    },
    {
      id: 2,
      type: "multiple",
      question: "审单前设计师新人必须自检哪些一致性？（多选）",
      options: ["图纸版本", "报价范围", "工艺边界", "销售承诺口径"],
      correct: [0, 1, 2, 3],
      explanation: "图纸、报价、工艺和销售承诺任一不一致，都可能导致返工或审单异常。",
    },
    {
      id: 3,
      type: "single",
      question: "客户问“为什么这样设计”时，设计师新人最合适的回应方式是？",
      options: ["只说这是标准做法", "先复述需求，再解释设计取舍", "让销售解释", "直接承诺都能改"],
      correct: 1,
      explanation: "先复述需求能确认理解一致，再解释设计取舍，体现真实方案能力。",
    },
    {
      id: 4,
      type: "single",
      question: "销售前面说的预算和设计方案对不上时，设计师新人应该怎么处理？",
      options: ["忽略差异", "统一图纸版本、报价范围和待确认项", "让客户自己判断", "只改效果图"],
      correct: 1,
      explanation: "设计师要能把销售口径、图纸和报价收口，避免会审后返工。",
    },
    {
      id: 5,
      type: "multiple",
      question: "以下哪些表现能证明设计师新人具备入门能力？（多选）",
      options: ["能讲清方案取舍", "能识别图纸报价不一致", "能收口客户红线和待确认项", "只会展示效果图"],
      correct: [0, 1, 2],
      explanation: "设计师入门考核看真实作业能力，不只看展示能力。",
    },
  ],
};

function createKnowledgeLinkedOnboardingQuestions(learnerRole: LearnerRole): Question[] {
  const seeds = getOnboardingKnowledgeSeeds(learnerRole).slice(0, 5);
  const distractors = [
    "只复述材料标题，不需要说明真实动作和风险边界",
    "只记住来源文件名称，不需要结合岗位场景判断",
    "遇到客户或业务问题时先承诺结果，再补流程依据",
  ];

  return seeds.map((seed, index) => {
    const correctText = seed.assessmentFocus.replace(/^检查学员是否能/, "能");
    const correctIndex = index % 4;
    const options = [...distractors];
    options.splice(correctIndex, 0, correctText);

    return {
      id: 1000 + index,
      type: "single",
      question: `知识库来源《${seed.sourceFile}》提到“${seed.competencyTags.join(" / ")}”，入门考核最应该验证新人什么能力？`,
      options,
      correct: correctIndex,
      explanation: `来源：${seed.sourceFile}。依据片段：${seed.evidenceSnippets[0] || "该题来自会议提取文本转换后的岗位能力点。"}`,
    };
  });
}

const examInstructionMap: Record<string, string[]> = {
  onboarding: [
    "这是所有学习身份共用的新人入门能力摸底考核入口。",
    "系统会按当前学习身份切换题目，用来判断新人是否真的具备对应岗位的基础胜任力。",
    "未通过不建议直接上岗，应先进入补训或对应 AI 陪练，再重新考核。",
  ],
  "1": [
    "本场考核重点验证你是否能把板材、环保、价格三连问讲清楚。",
    "题目会检查你能否把板材名词转成客户能理解的使用价值。",
    "如果未通过，建议先回到板材基础课和产品讲解陪练补齐，再来复测。",
  ],
  "2": [
    "本场重点是下单前的非标识别、版本确认和签字留痕。",
    "特别留意尺寸、颜色、面料、交期等变更，不要把高风险事项当普通备注。",
    "未通过会进入补训闭环，建议先补成品家具下单规范再复测。",
  ],
  "3": [
    "综合认证覆盖销售顾问首周主线，建议先把近期课程和陪练记录快速过一遍。",
    "除产品知识外，也会检查接待、下单、客诉、高客单和获客转化动作。",
    "如果对某块拿不准，先回顾相关课程或做一轮 AI 陪练再开始答题。",
  ],
  "4": [
    "本场重点验证社区运营岗位边界、资源开拓和社群 SOP 的基础理解。",
    "题目会检查你能否识别跨角色信息差，而不是只背概念。",
    "未通过时建议先补岗位认知课，再进入运营 AI 陪练。",
  ],
  "5": [
    "本场重点验证你是否能把过程指标转成异常判断和下一步动作。",
    "注意不要只看结果，要同时看资源、触达、执行和转化过程。",
    "未通过时建议先补运营指标判断课，再做指标异常陪练。",
  ],
  "6": [
    "本场重点验证设计师新人是否能把需求、图纸、报价和工艺边界讲清楚。",
    "特别留意销售承诺与设计方案口径是否一致，避免会审后返工。",
    "未通过时建议先补设计规范入口课，再做方案讲解陪练。",
  ],
};

const prepPathMap: Record<string, string> = {
  onboarding: "/learning/growth/retrain",
  "1": "/learning/course/1",
  "2": "/learning/course/4",
  "3": "/learning/course/3",
  "4": "/learning/course/6",
  "5": "/learning/course/9",
  "6": "/learning/course/11",
};

const onboardingPrepPathMap: Record<LearnerRole, string> = {
  sales: "/learning/course/1",
  community_ops: "/learning/course/6",
  ops_manager: "/learning/course/9",
  designer: "/learning/course/11",
};

const initialAnswers = (count = questions.length) => Array<AnswerValue>(count).fill(null);

function isQuestionCorrect(question: Question, answer: AnswerValue) {
  if (question.type === "single") {
    return answer === question.correct;
  }

  const normalizedAnswer = [...(((answer as number[]) ?? []))].sort((a, b) => a - b);
  const normalizedCorrect = [...(question.correct as number[])].sort((a, b) => a - b);
  return JSON.stringify(normalizedAnswer) === JSON.stringify(normalizedCorrect);
}

function getExamQuestions(exam: (typeof exams)[number] | null, learnerRole: LearnerRole) {
  if (exam?.id === "onboarding") {
    const knowledgeLinkedQuestions = createKnowledgeLinkedOnboardingQuestions(learnerRole);
    return knowledgeLinkedQuestions.length >= 5 ? knowledgeLinkedQuestions : onboardingQuestionBank[learnerRole];
  }

  return exam ? questionBank[exam.id] || questions : questions;
}

function getExamInstructionList(
  exam: (typeof exams)[number] | null,
  learnerRole: LearnerRole,
  learnerRoleMeta: ReturnType<typeof getLearnerRoleMeta>
) {
  if (exam?.id === "onboarding") {
    const roleKnowledgeCount = generatedLearningKnowledgeMeta.summaryByRole[learnerRole] ?? 0;
    const competencyNames = getRoleCompetencyTags(learnerRole).slice(0, 3).map((item) => item.tag);
    return [
      `当前按“${learnerRoleMeta.label}”身份出题，已连接 ${roleKnowledgeCount} 条会议提取文本。`,
      `本场优先检查：${competencyNames.join("、") || "岗位基础能力"}。`,
      ...examInstructionMap.onboarding,
    ];
  }

  return exam ? examInstructionMap[exam.id] || examInstructionMap["1"] : [];
}

function getExamPrepPath(exam: (typeof exams)[number] | null, learnerRole: LearnerRole) {
  if (exam?.id === "onboarding") {
    return onboardingPrepPathMap[learnerRole];
  }

  return exam ? prepPathMap[exam.id] || "/learning/course/1" : "/learning/course/1";
}

function getExamDisplayDesc(exam: (typeof exams)[number], learnerRoleMeta: ReturnType<typeof getLearnerRoleMeta>) {
  if (exam.id === "onboarding") {
    return `统一入门考核入口，当前按${learnerRoleMeta.label}能力模型和会议提取文本出题，检查新人能否进入对应岗位实操`;
  }

  return exam.desc;
}

const assessmentSectionVisibility = {
  instructionNotice: false,
  instructionPrepActions: false,
  instructionPrepEntries: false,
} as const;

export default function Assessment() {

  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("list");
  const [selectedExam, setSelectedExam] = useState<(typeof exams)[number] | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<AnswerValue[]>(initialAnswers);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const { user, currentIdentity } = useApp();
  const selectedLearnerRole = user?.learnerRole ?? "sales";
  const learnerRoleMeta = getLearnerRoleMeta(selectedLearnerRole);
  const visibleExams = currentIdentity === "student"
    ? exams.filter((exam) => exam.learnerRoles.includes(selectedLearnerRole))
    : exams;
  const activeQuestions = getExamQuestions(selectedExam, selectedLearnerRole);

  const correctCount = useMemo(
    () => activeQuestions.filter((question, index) => isQuestionCorrect(question, answers[index])).length,
    [activeQuestions, answers]
  );
  const score = Math.round((correctCount / activeQuestions.length) * 100);
  const passed = score >= (selectedExam?.passingScore ?? 80);
  const wrongCount = activeQuestions.length - correctCount;
  const instructionList = getExamInstructionList(selectedExam, selectedLearnerRole, learnerRoleMeta);
  const prepPath = getExamPrepPath(selectedExam, selectedLearnerRole);
  const showAssessmentInstructionPrepGrid =
    assessmentSectionVisibility.instructionPrepActions || assessmentSectionVisibility.instructionPrepEntries;

  useEffect(() => {

    if (stage !== "answering") {
      return undefined;
    }

    if (timeLeft <= 0) {
      setStage("result");
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [stage, timeLeft]);

  const openInstructions = (exam: (typeof exams)[number]) => {
    const nextQuestions = getExamQuestions(exam, selectedLearnerRole);
    setSelectedExam(exam);
    setCurrentQ(0);
    setAnswers(initialAnswers(nextQuestions.length));
    setTimeLeft(exam.duration * 60);
    setStage("instructions");
  };

  const startAnswering = () => {
    if (!selectedExam) {
      return;
    }
    setCurrentQ(0);
    setAnswers(initialAnswers(activeQuestions.length));
    setTimeLeft(selectedExam.duration * 60);
    setStage("answering");
  };

  const restartExam = () => {
    setCurrentQ(0);
    setAnswers(initialAnswers(activeQuestions.length));
    setTimeLeft((selectedExam?.duration ?? 25) * 60);
    setStage("answering");
  };

  const handleSingleAnswer = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = optionIndex;
      return next;
    });
  };

  const handleMultipleAnswer = (optionIndex: number) => {
    setAnswers((prev) => {
      const current = (prev[currentQ] as number[]) ?? [];
      const next = [...prev];
      next[currentQ] = current.includes(optionIndex)
        ? current.filter((item) => item !== optionIndex)
        : [...current, optionIndex].sort((a, b) => a - b);
      return next;
    });
  };

  if (stage === "result") {
    return (
      <div className="min-h-full bg-[#F5F7FA] px-4 md:px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-2xl p-6 mb-4 ${passed ? "bg-[#16A34A]" : "bg-[#DC2626]"}`}>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-1">{score}</div>
              <p className="text-white/80 text-sm mb-3">{passed ? "🎉 恭喜通过！" : "❌ 未通过，需补训后重考"}</p>
              <div className="flex justify-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-white font-medium">{correctCount}</div>
                  <div className="text-white/60 text-xs">答对</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-medium">{wrongCount}</div>
                  <div className="text-white/60 text-xs">答错</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-medium">{selectedExam?.passingScore}+</div>
                  <div className="text-white/60 text-xs">通过线</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {activeQuestions.map((question, index) => {
              const isCorrect = isQuestionCorrect(question, answers[index]);
              return (
                <div
                  key={question.id}
                  className="bg-white rounded-xl p-4 shadow-sm"
                  style={{ borderLeft: `3px solid ${isCorrect ? "#16A34A" : "#DC2626"}` }}
                >
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle2 size={15} className="text-[#16A34A] flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={15} className="text-[#DC2626] flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm text-gray-800">
                      {index + 1}. {question.question}
                    </p>
                  </div>
                  {!isCorrect && (
                    <div className="ml-5 mt-2 rounded-lg bg-amber-50 p-3">
                      <p className="text-xs text-gray-500 mb-1">解析：</p>
                      <p className="text-xs text-amber-800">{question.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!passed && (
            <div className="bg-[#EEF2FF] border border-[#2F5FD0]/20 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-[#2F5FD0] mb-1">建议补训内容</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 板材基础知识与万骊板材体系（销售版）</li>
                <li>• 成品家具销售及下单管理规范</li>
                <li>• 对应 AI 陪练：产品讲解 / 下单规范 / 客诉处理</li>
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => navigate("/learning/growth/retrain")}
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#2F5FD0] text-white hover:bg-[#2550B8] transition-colors"
                >
                  查看补训任务
                </button>
                <button
                  onClick={() => navigate(prepPath)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-[#2F5FD0] text-[#2F5FD0] hover:bg-blue-50 transition-colors"
                >
                  先去补学
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {!passed && (
              <button
                onClick={restartExam}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#2F5FD0] text-[#2F5FD0] rounded-xl text-sm hover:bg-blue-50 transition-colors"
              >
                <RotateCcw size={15} /> 重新考核
              </button>
            )}
            <button
              onClick={() => setStage("list")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#2F5FD0] text-white rounded-xl text-sm hover:bg-[#2550B8] transition-colors"
            >
              返回考核列表
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "instructions" && selectedExam) {
    return (
      <div className="min-h-full bg-[#F5F7FA] px-4 md:px-6 py-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-5">
            <button
              onClick={() => setStage("list")}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
            >
              <ArrowLeft size={16} /> 返回考核列表
            </button>

            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedExam.urgency === "warning" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-[#2F5FD0]"
              }`}>
                {selectedExam.urgency === "warning" ? "需优先完成" : "待开始"}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">截止：{selectedExam.deadline}</span>
            </div>

            <h1 className="text-gray-900 mb-1">考前说明</h1>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {selectedExam.title} · {selectedExam.id === "onboarding" ? `当前按${learnerRoleMeta.label}能力模型出题，重点检查新人是否能进入真实岗位动作。` : "开始作答前先看清本次重点和注意事项。"}
              </p>

            <div className="grid md:grid-cols-4 gap-3 mb-4">
              {[
                { label: "题量", value: `${activeQuestions.length} 题`, icon: <FileText size={14} className="text-[#2F5FD0]" /> },
                { label: "时长", value: `${selectedExam.duration} 分钟`, icon: <Clock size={14} className="text-[#2F5FD0]" /> },
                { label: "通过线", value: `${selectedExam.passingScore} 分`, icon: <ShieldCheck size={14} className="text-green-600" /> },
                { label: "未通过后", value: "进入补训闭环", icon: <TriangleAlert size={14} className="text-amber-600" /> },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-[#F7FAFF] border border-[#D9E5FF] p-3">
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
                    <span className="text-xs text-gray-500">{item.label}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            {assessmentSectionVisibility.instructionNotice && (
              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={15} className="text-amber-700" />
                  <span className="text-sm font-medium text-amber-900">本次作答前你需要知道</span>
                </div>
                <div className="space-y-2">
                  {instructionList.map((item) => (
                    <div key={item} className="text-xs text-amber-800 leading-relaxed">- {item}</div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {showAssessmentInstructionPrepGrid && (
            <div className="grid md:grid-cols-2 gap-4">
              {assessmentSectionVisibility.instructionPrepActions && (
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardList size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">建议准备动作</span>
                  </div>
                  <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
                    <div className="rounded-xl bg-[#F7FAFF] border border-[#D9E5FF] p-3">先确认最近是否有版本更新，不要用旧版信息作答。</div>
                    <div className="rounded-xl bg-green-50 border border-green-100 p-3">如果是工艺/规范类考核，优先记住高风险变更点和禁用项。</div>
                    <div className="rounded-xl bg-purple-50 border border-purple-100 p-3">如果担心现场表达不稳，可以先去做一轮 AI 陪练再回来答题。</div>
                  </div>
                </div>
              )}

              {assessmentSectionVisibility.instructionPrepEntries && (
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={15} className="text-[#16A34A]" />
                    <span className="text-sm font-medium text-gray-900">开始前的两个入口</span>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => navigate(prepPath)}
                      className="w-full rounded-xl border border-gray-200 p-3 text-left hover:border-[#2F5FD0]/30 hover:bg-[#FAFBFF] transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-900 mb-1">先补一下相关课程</p>
                      <p className="text-xs text-gray-500">适合还有点心虚、想先看重点变更后再答题。</p>
                    </button>
                    <button
                      onClick={() => navigate("/learning/growth/retrain")}
                      className="w-full rounded-xl border border-gray-200 p-3 text-left hover:border-[#2F5FD0]/30 hover:bg-[#FAFBFF] transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-900 mb-1">查看补训任务页</p>
                      <p className="text-xs text-gray-500">适合想先确认自己这一轮闭环任务的人。</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}


          <div className="flex gap-3">
            <button
              onClick={() => setStage("list")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              稍后再考
            </button>
            <button
              onClick={startAnswering}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#2F5FD0] text-white rounded-xl text-sm hover:bg-[#2550B8] transition-colors"
            >
              开始作答 <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "answering") {
    const question = activeQuestions[currentQ];
    const currentAnswer = answers[currentQ];
    const isAnswered = currentAnswer !== null && (!Array.isArray(currentAnswer) || currentAnswer.length > 0);

    return (
      <div className="min-h-full bg-[#F5F7FA]">
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => setStage("instructions")} className="text-gray-500">
              <ArrowLeft size={18} />
            </button>
            <span className="text-sm text-gray-700 flex-1">{selectedExam?.title}</span>
            <div className="flex items-center gap-1.5 text-xs text-[#DC2626] bg-red-50 px-2 py-1 rounded-full">
              <Clock size={11} />
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2F5FD0] rounded-full transition-all"
                style={{ width: `${((currentQ + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {currentQ + 1}/{activeQuestions.length}
            </span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-5">
          <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 bg-[#2F5FD0] text-white rounded">
                {question.type === "single" ? "单选" : "多选"}
              </span>
              <span className="text-xs text-gray-400">第 {currentQ + 1} 题</span>
            </div>
            <p className="text-sm text-gray-900 mb-4 leading-relaxed">{question.question}</p>

            <div className="space-y-2">
              {question.options.map((option, index) => {
                const selected = question.type === "single"
                  ? currentAnswer === index
                  : ((currentAnswer as number[]) ?? []).includes(index);

                return (
                  <button
                    key={option}
                    onClick={() => (question.type === "single" ? handleSingleAnswer(index) : handleMultipleAnswer(index))}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                      selected
                        ? "bg-[#EEF2FF] border-[#2F5FD0] text-[#2F5FD0]"
                        : "bg-[#F5F7FA] border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-flex w-5 h-5 rounded border mr-2 items-center justify-center text-xs ${
                        selected ? "bg-[#2F5FD0] border-[#2F5FD0] text-white" : "border-gray-300"
                      }`}
                    >
                      {selected && "✓"}
                    </span>
                    {String.fromCharCode(65 + index)}. {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentQ((prev) => Math.max(0, prev - 1))}
              disabled={currentQ === 0}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={15} /> 上一题
            </button>

            {currentQ < activeQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQ((prev) => prev + 1)}
                disabled={!isAnswered}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-colors ${
                  isAnswered ? "bg-[#2F5FD0] text-white hover:bg-[#2550B8]" : "bg-gray-100 text-gray-400"
                }`}
              >
                下一题 <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={() => setStage("result")}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#16A34A] text-white rounded-xl text-sm hover:bg-green-700 transition-colors"
              >
                提交考核 <CheckCircle2 size={15} />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {activeQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQ(index)}
                className={`w-7 h-7 rounded text-xs transition-colors ${
                  index === currentQ
                    ? "bg-[#2F5FD0] text-white"
                    : answers[index] !== null
                      ? "bg-green-100 text-green-700"
                      : "bg-white border border-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-gray-900 mb-0.5">考核</h1>
            {currentIdentity === "student" && <span className="text-xs px-2 py-0.5 rounded-full bg-[#EAF1FF] text-[#2F5FD0]">{learnerRoleMeta.label}</span>}
          </div>
          <p className="text-xs text-gray-500">先用统一入门考核确认新人是否具备对应岗位能力，未通过再进入补训闭环</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 space-y-3">
        {visibleExams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                exam.status === "passed" ? "bg-green-50" : "bg-blue-50"
              }`}>
                <ClipboardList size={20} className={exam.status === "passed" ? "text-[#16A34A]" : "text-[#2F5FD0]"} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {exam.status === "passed" ? (
                    <span className="text-xs px-1.5 py-0.5 bg-green-100 text-[#16A34A] rounded flex items-center gap-0.5">
                      <CheckCircle2 size={9} /> 已通过 {exam.lastScore}分
                    </span>
                  ) : exam.urgency === "warning" ? (
                    <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">待完成</span>
                  ) : (
                    <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">未开始</span>
                  )}
                </div>
                <h3 className="text-sm text-gray-900 mb-0.5">{exam.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{getExamDisplayDesc(exam, learnerRoleMeta)}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                  <span>{getExamQuestions(exam, selectedLearnerRole).length} 题</span>
                  <span className="flex items-center gap-0.5">
                    <Clock size={9} />
                    {exam.duration} 分钟
                  </span>
                  <span>通过线 {exam.passingScore} 分</span>
                  <span className={exam.urgency === "warning" ? "text-[#F59E0B]" : ""}>{exam.deadline}</span>
                  {exam.id === "onboarding" && <span className="text-[#2F5FD0]">按{learnerRoleMeta.label}出题</span>}
                </div>
              </div>
              {exam.status !== "passed" && (
                <button
                  onClick={() => openInstructions(exam)}
                  className="flex-shrink-0 bg-[#2F5FD0] hover:bg-[#2550B8] text-white px-4 py-1.5 rounded-lg text-xs transition-colors"
                >
                  开始考核
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
