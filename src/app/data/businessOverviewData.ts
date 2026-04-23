export interface FunnelStageDatum {
  stage: string;
  count: number;
  conversionRate: number;
  gapNote: string;
  tone: "primary" | "warning" | "danger";
}

export interface StorePerformanceDatum {
  store: string;
  receptionCount: number;
  quoteCount: number;
  signCount: number;
  signRate: number;
  overtimeNodes: number;
  managerNote: string;
}

export interface StaffPerformanceDatum {
  name: string;
  role: string;
  store: string;
  addWechatRate: number;
  proposalRate: number;
  signRate: number;
  overdueItems: number;
  riskTag: string;
  nextAction: string;
}

export interface OvertimeNodeDatum {
  id: string;
  orderNo: string;
  customer: string;
  stage: string;
  overdueDays: number;
  owner: string;
  impact: string;
  suggestedAction: string;
}

export interface ManagementActionDatum {
  id: string;
  title: string;
  level: "high" | "medium";
  owner: string;
  trigger: string;
  decision: string;
  followup: string;
}

export const businessOverviewSummary = {
  title: "经营总览",
  desc:
    "给管理层看关键经营漏斗、门店与人员差异、超时节点和需要介入的事项，不替代带教动作盘，而是在上层补一个经营视角。",
  stats: [
    { label: "本周接待", value: "126", sub: "环比 +8%" },
    { label: "方案输出", value: "62", sub: "转化 49%" },
    { label: "本周签单", value: "21", sub: "转化 17%" },
    { label: "需介入事项", value: "4", sub: "2 项高优先" },
  ],
  emphasis: [
    "先看接待 → 加微 → 方案 → 签单漏斗，不要只看最终签单数。",
    "门店差异和人员差异要拆开看，避免把问题一股脑归因为能力不足。",
    "超时节点和管理介入事项要直接给动作，不能只做报表展示。",
  ],
};

export const funnelStages: FunnelStageDatum[] = [
  {
    stage: "接待",
    count: 126,
    conversionRate: 100,
    gapNote: "客流整体稳定，但高意向客户记录还不够完整。",
    tone: "primary",
  },
  {
    stage: "加微",
    count: 93,
    conversionRate: 74,
    gapNote: "接待到留资有明显流失，晚班门店跟进话术不统一。",
    tone: "warning",
  },
  {
    stage: "方案",
    count: 62,
    conversionRate: 49,
    gapNote: "设计资源排期偏紧，部分门店从加微到方案等待超过 48 小时。",
    tone: "warning",
  },
  {
    stage: "报价",
    count: 38,
    conversionRate: 30,
    gapNote: "图纸与报价一致性核对不稳，报价前复核耗时拉长。",
    tone: "danger",
  },
  {
    stage: "签单",
    count: 21,
    conversionRate: 17,
    gapNote: "湿区等级解释和新品参数口径不稳，导致临门一脚转化不足。",
    tone: "danger",
  },
];

export const storePerformance: StorePerformanceDatum[] = [
  {
    store: "南山旗舰店",
    receptionCount: 42,
    quoteCount: 16,
    signCount: 8,
    signRate: 19,
    overtimeNodes: 1,
    managerNote: "整体稳定，但新品方案等待时间开始上升。",
  },
  {
    store: "福田中心店",
    receptionCount: 36,
    quoteCount: 11,
    signCount: 5,
    signRate: 14,
    overtimeNodes: 3,
    managerNote: "方案输出偏慢，销设协同卡在需求补充和版本确认。",
  },
  {
    store: "宝安体验店",
    receptionCount: 28,
    quoteCount: 7,
    signCount: 4,
    signRate: 14,
    overtimeNodes: 2,
    managerNote: "加微转化不低，但报价前解释口径分裂，影响成交。",
  },
  {
    store: "龙岗社区店",
    receptionCount: 20,
    quoteCount: 4,
    signCount: 4,
    signRate: 20,
    overtimeNodes: 0,
    managerNote: "体量小但转化稳定，可复用其低时延跟进方法。",
  },
];

export const staffPerformance: StaffPerformanceDatum[] = [
  {
    name: "陈伟",
    role: "销售顾问",
    store: "南山旗舰店",
    addWechatRate: 81,
    proposalRate: 56,
    signRate: 24,
    overdueItems: 0,
    riskTag: "稳定输出",
    nextAction: "沉淀高签单话术，复用到晚班接待脚本。",
  },
  {
    name: "张磊",
    role: "销售顾问",
    store: "福田中心店",
    addWechatRate: 75,
    proposalRate: 47,
    signRate: 18,
    overdueItems: 1,
    riskTag: "方案等待偏长",
    nextAction: "和设计协同确认需求交接模板，压缩加微到方案时长。",
  },
  {
    name: "王芳",
    role: "销售顾问",
    store: "南山旗舰店",
    addWechatRate: 70,
    proposalRate: 39,
    signRate: 11,
    overdueItems: 2,
    riskTag: "规格讲解不稳",
    nextAction: "先补新品参数训练，再复盘最近 3 次客户讲解。",
  },
  {
    name: "刘洋",
    role: "销售顾问",
    store: "宝安体验店",
    addWechatRate: 68,
    proposalRate: 42,
    signRate: 13,
    overdueItems: 2,
    riskTag: "湿区场景解释偏差",
    nextAction: "补做湿区等级陪练，统一报价和现场口径。",
  },
];

export const overtimeNodes: OvertimeNodeDatum[] = [
  {
    id: "bo1",
    orderNo: "#2024-0326",
    customer: "吴女士",
    stage: "加微后待方案",
    overdueDays: 3,
    owner: "福田中心店 / 张磊",
    impact: "客户已二次催方案，设计需求补充未闭环，存在流失风险。",
    suggestedAction: "管理层拍板需求补充规则，避免设计反复来回确认。",
  },
  {
    id: "bo2",
    orderNo: "#2024-0319",
    customer: "泓信公司",
    stage: "报价前复核",
    overdueDays: 2,
    owner: "宝安体验店 / 刘洋",
    impact: "图纸与报价字段不一致，成交窗口正在缩短。",
    suggestedAction: "安排审单前字段核对，必要时升级到审单链路先拦截。",
  },
  {
    id: "bo3",
    orderNo: "#2024-0312",
    customer: "张国栋",
    stage: "签单前规格确认",
    overdueDays: 2,
    owner: "南山旗舰店 / 王芳",
    impact: "新品规格口径不一致，客户预期和内部版本存在偏差。",
    suggestedAction: "统一销售、设计和工厂口径后再继续签单动作。",
  },
];

export const managementActions: ManagementActionDatum[] = [
  {
    id: "ma1",
    title: "新品信息在门店、课件和图纸模板之间仍未完全同步",
    level: "high",
    owner: "产品中心 / 培训运营 / 设计训练组",
    trigger: "南山与福田门店连续出现新品规格解释不一致，导致方案和签单转化受影响。",
    decision: "要求新品更新必须同步到图纸模板、培训课件和门店讲解脚本，缺一不可。",
    followup: "今天内补齐统一口径，并在信息同步中心挂出确认进度。",
  },
  {
    id: "ma2",
    title: "方案输出等待时间偏长，销设协同出现二次返问",
    level: "high",
    owner: "门店经理 / 设计协同",
    trigger: "福田中心店接待到方案平均耗时已拉长到 52 小时，影响高意向客户留存。",
    decision: "先收紧需求交接模板字段，再对 24 小时未出方案的单子设升级提醒。",
    followup: "本周试运行“超 24 小时自动升级”规则，并回看是否减少客户流失。",
  },
  {
    id: "ma3",
    title: "工厂产能提醒和售后风险预警没有前置到经营层",
    level: "medium",
    owner: "工厂协同 / 售后回流",
    trigger: "报价阶段才发现特殊工艺排期紧张，售后又反馈类似问题复发。",
    decision: "把高风险工艺和产能限制前置到经营总览，供管理层提前调配资源。",
    followup: "下周起每周在经营总览补充产能风险清单和复发问题摘要。",
  },
  {
    id: "ma4",
    title: "设计师与销售话术不一致，影响报价前临门转化",
    level: "medium",
    owner: "销售训练组 / 设计训练组",
    trigger: "湿区等级和新品规格解释在现场出现两套说法，客户信任度下降。",
    decision: "把高频争议点拉成统一话术页，并同步到 AI 问答和陪练场景。",
    followup: "先处理湿区等级与新品规格两类高频问题，作为本周闭环目标。",
  },
];
