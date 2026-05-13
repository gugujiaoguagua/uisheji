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
  title: "社区运营总览",
  desc:
    "把资源开拓、建群、群人数、添加微信、QC、样板间和签单目标串成一条管理漏斗，管理者先看缺口，再拆到门店、人员和小区动作。",
  stats: [
    { label: "新小区资源", value: "126", sub: "已开拓 93" },
    { label: "高风险小区", value: "12", sub: "本周需介入" },
    { label: "数据口径异常", value: "9", sub: "跨表待校验" },
    { label: "待闭环任务", value: "5", sub: "3 项高优先" },
  ],
  emphasis: [
    "先看资源 → 建群 → 群人数 → 添加微信 → QC → 样板间 → 签单目标漏斗，不只看最终签单数。",
    "门店资源缺口、人员推进滞后和小区过程异常要拆开看，避免只用平均值判断。",
    "数据不准确本身就是运营风险，群人数、添加微信、QC、样板间和签单目标必须有来源、负责人和更新时间。",
  ],
};

export const funnelStages: FunnelStageDatum[] = [
  {
    stage: "资源总盘",
    count: 126,
    conversionRate: 100,
    gapNote: "全上海在跟新小区资源，部分门店资源低于安全线。",
    tone: "primary",
  },
  {
    stage: "已开拓",
    count: 93,
    conversionRate: 74,
    gapNote: "青浦店和浦东旗舰店缺口明显，影响后续建群。",
    tone: "warning",
  },
  {
    stage: "群人数达标",
    count: 86,
    conversionRate: 68,
    gapNote: "临港星河湾低于总户数 50% 目标线且 2 天无增长。",
    tone: "warning",
  },
  {
    stage: "QC 达标",
    count: 68,
    conversionRate: 54,
    gapNote: "青浦悦府 QC 为 0，部分小区缺总户数无法计算目标。",
    tone: "danger",
  },
  {
    stage: "签单达标",
    count: 73,
    conversionRate: 58,
    gapNote: "一对一跟进弱，活动后复盘和样板间宣传记录不足。",
    tone: "danger",
  },
];

export const storePerformance: StorePerformanceDatum[] = [
  {
    store: "浦东旗舰店",
    receptionCount: 28,
    quoteCount: 20,
    signCount: 9,
    signRate: 61,
    overtimeNodes: 3,
    managerNote: "资源总量尚可，但临港板块群人数增长慢，需补群内拉新动作。",
  },
  {
    store: "青浦店",
    receptionCount: 18,
    quoteCount: 11,
    signCount: 4,
    signRate: 42,
    overtimeNodes: 5,
    managerNote: "资源缺口 5 个，QC 与样板间均有红色预警，需管理层介入。",
  },
  {
    store: "嘉定店",
    receptionCount: 22,
    quoteCount: 18,
    signCount: 7,
    signRate: 64,
    overtimeNodes: 2,
    managerNote: "资源接近安全线，但添加微信和一对一跟进需要拆销售明细。",
  },
  {
    store: "松江店",
    receptionCount: 16,
    quoteCount: 14,
    signCount: 6,
    signRate: 70,
    overtimeNodes: 1,
    managerNote: "资源稳定，建议沉淀活动复盘方法给新人复用。",
  },
];

export const staffPerformance: StaffPerformanceDatum[] = [
  {
    name: "周修童",
    role: "区域负责人",
    store: "汶水二队 / 澳门月星",
    addWechatRate: 42,
    proposalRate: 50,
    signRate: 31,
    overdueItems: 5,
    riskTag: "群人数和签单双低",
    nextAction: "先拆红色小区，再按门店补资源和群增长动作。",
  },
  {
    name: "李海飞",
    role: "区域负责人",
    store: "真北全案 / 真北北馆",
    addWechatRate: 58,
    proposalRate: 37,
    signRate: 44,
    overdueItems: 4,
    riskTag: "QC 与样板间不足",
    nextAction: "补 QC 对象清单，并确认样板间开放和宣传节点。",
  },
  {
    name: "丁如意",
    role: "运营专员",
    store: "建配龙 / 家饰佳",
    addWechatRate: 52,
    proposalRate: 48,
    signRate: 39,
    overdueItems: 4,
    riskTag: "数据回写不足",
    nextAction: "先补群人数、签单数、QC 数、样板间数量四项。",
  },
  {
    name: "张燕萍",
    role: "运营管理者",
    store: "金桥 / 嘉定",
    addWechatRate: 68,
    proposalRate: 72,
    signRate: 62,
    overdueItems: 1,
    riskTag: "一对一案例待沉淀",
    nextAction: "抽查 3 个小区销售跟进明细，沉淀邀约到店话术。",
  },
];

export const overtimeNodes: OvertimeNodeDatum[] = [
  {
    id: "op1",
    orderNo: "临港星河湾",
    customer: "浦东旗舰店 / 周琳",
    stage: "群人数增长",
    overdueDays: 2,
    owner: "周琳",
    impact: "当前群人数 101 / 240，低于总户数 50% 目标线，签单目标同步落后。",
    suggestedAction: "今天 18:00 前补资源入口，并回写新增人数和群内拉新动作。",
  },
  {
    id: "op2",
    orderNo: "青浦悦府",
    customer: "青浦店 / 李哲",
    stage: "QC 与样板间",
    overdueDays: 3,
    owner: "李哲",
    impact: "QC 当前为 0，样板间未启动，后续转化缺宣传节点。",
    suggestedAction: "先确认宣传节点，再指定样板间推进人和预计开放时间。",
  },
  {
    id: "op3",
    orderNo: "嘉定云著",
    customer: "嘉定店 / 陈曼",
    stage: "添加微信与签单",
    overdueDays: 1,
    owner: "陈曼",
    impact: "添加微信偏低，销售明细与月度汇总存在差异，签单差额扩大。",
    suggestedAction: "按销售拆一对一跟进明细，并用客户 ID 去重校验。",
  },
];

export const managementActions: ManagementActionDatum[] = [
  {
    id: "ma1",
    title: "群人数和添加微信跨表对不上，影响异常判断",
    level: "high",
    owner: "运营数据组 / 门店运营助理",
    trigger: "多张表都有数据，但真正使用时结果不一致，无法判断动作质量。",
    decision: "先统一小区编码、客户 ID、更新时间和负责人字段，再进入图表汇总。",
    followup: "今天内把群人数、添加微信、QC、样板间四类字段列出来源和校验动作。",
  },
  {
    id: "ma2",
    title: "青浦店资源缺口已连带影响建群、QC 和样板间",
    level: "high",
    owner: "青浦店 / 区域运营",
    trigger: "青浦店资源缺口 5 个小区，青浦悦府 QC 为 0，样板间未启动。",
    decision: "先补 3 个可开群小区，再拆 QC 候选和样板间推进人。",
    followup: "明天 12:00 前回写新增小区、群开拓人和样板间候选人。",
  },
  {
    id: "ma3",
    title: "活动筹备和复盘没有形成闭环，成功经验难复用",
    level: "medium",
    owner: "运营管理者 / 门店店长",
    trigger: "活动后只记录结果，缺活动前预热、目标设定、资源分析和失败原因。",
    decision: "活动任务必须补齐筹备、执行、转化、复盘四段字段。",
    followup: "本周先补松江活动和嘉定活动复盘模板。",
  },
  {
    id: "ma4",
    title: "新人培养仍依赖手把手带教，阶段释放不清晰",
    level: "medium",
    owner: "运营管理者",
    trigger: "新人需要一年左右才能到目标管理和团队统筹，资料散落在多个入口。",
    decision: "按资源开拓、运营规划、活动筹备、资源协调、目标管理分阶段释放。",
    followup: "先把小红书开拓、数据查看、直播和视频号直播资料归到阶段路径。",
  },
];
