export type RequestItem = {
  id: string;
  title: string;
  customer: string;
  company: string;
  salesperson: string;
  designer: string;
  budget: string;
  space: string;
  style: string;
  requirements: string;
  deadline: string;
  status: "review_ready" | "case_done";
  urgency: "warning" | "normal";
  submittedAt: string;
  overviewFocus: string[];
  steps: { step: string; done: boolean }[];
  reviewPrep: {
    meetingTime: string;
    attendees: string[];
    materials: string[];
    risks: string[];
    checklist: string[];
    readiness: number;
  };
  score: {
    overall: number;
    dims: { label: string; score: number; note: string }[];
    clientMoments: string[];
    highlightLines: string[];
    riskLines: string[];
    recommendedActions: string[];
    coachTip: string;
  };
  aiScript: {
    before: string;
    after: string;
    highlights: string[];
    framework: string[];
  };
  caseRepo: {
    status: "pending" | "completed";
    title: string;
    tags: string[];
    summary: string;
    assets: string[];
    reuseTargets: string[];
  };
};

export const requests: RequestItem[] = [
  {
    id: "r1",
    title: "临港星河湾 · 李总卫浴改造单",
    customer: "李总",
    company: "泓信公司",
    salesperson: "陈伟",
    designer: "刘设计师",
    budget: "12 万",
    space: "主卫 8m²、客卫 5m²",
    style: "现代简约，偏白色系",
    requirements: "防滑 R10+，耐污，适合老人使用",
    deadline: "周五前需定稿",
    status: "review_ready",
    urgency: "warning",
    submittedAt: "2024-01-15 14:00",
    overviewFocus: ["客户核心顾虑是老人安全", "预算接近上限，必须先讲价值后报价", "设计和销售需统一 R10 防滑讲法"],
    steps: [
      { step: "销售填写客户需求", done: true },
      { step: "系统推荐适配产品", done: true },
      { step: "设计师确认接收", done: true },
      { step: "会审准备", done: true },
      { step: "客户讲解评分", done: false },
      { step: "AI 讲稿优化", done: false },
      { step: "案例沉淀", done: false },
    ],
    reviewPrep: {
      meetingTime: "今天 16:00",
      attendees: ["销售-陈伟", "设计-刘设计师", "带教-周老师"],
      materials: ["客户平面图", "主推砖样组合", "施工限制说明", "竞品对比话术"],
      risks: ["客户非常关注老人防滑安全", "预算已接近上限，需先讲价值再报价"],
      checklist: ["讲解顺序先复述需求，再讲安全和打理成本", "设计图与推荐规格必须完全对齐", "价格异议的应答要和培训话术版本一致"],
      readiness: 82,
    },
    score: {
      overall: 78,
      dims: [
        { label: "需求复述准确度", score: 84, note: "客户关注点说清楚了，但预算边界略模糊。" },
        { label: "价值讲解完整度", score: 76, note: "能说出防滑和耐污，但缺少工艺背书。" },
        { label: "异议处理稳定度", score: 72, note: "对价格异议回应略早，容易被带到低价比较。" },
      ],
      clientMoments: ["客户在听到 R10 防滑时有明显停顿并继续追问细节", "报价前没有先确认老人使用场景，节奏略快"],
      highlightLines: [
        "它是 R10 防滑等级，对老人更安全。",
        "表面耐污，日常打理压力更小。",
        "两个卫生间的风格可以统一起来。",
      ],
      riskLines: [
        "价格虽然比普通款高一点，但品质更稳定。",
        "这套方案整体比较适合您家。",
        "先不区分老人使用场景，直接进入价格对比。",
      ],
      recommendedActions: [
        "先复述老人使用场景，再进入 R10 防滑与耐污价值讲解。",
        "补上施工工艺背书，别只讲表面参数。",
        "把价格异议放到价值确认之后再承接。",
      ],
      coachTip: "先确认老人使用场景，再讲 R10 防滑、耐污和后续维护成本，最后再进入报价。",
    },
    aiScript: {
      before: "这套方案整体比较适合您家，砖的质感和颜色都比较高级，价格虽然比普通款高一点，但品质更稳定。",
      after: "这套方案我先不急着说价格，先说为什么它更适合您家卫浴场景：第一，它是 R10 防滑等级，对老人更安全；第二，表面耐污，日常打理压力更小；第三，规格和铺贴方式能把两个卫生间的风格统一起来。等这三个核心点确认后，我们再看预算怎么配最合适。",
      highlights: ["先价值后报价", "加入防滑等级与打理成本", "统一空间方案的讲解顺序更清晰"],
      framework: ["先复述客户需求和家庭使用场景", "再讲方案价值，不直接进入价格比较", "最后试探客户最关注的点并推进确认"],
    },
    caseRepo: {
      status: "pending",
      title: "卫浴改造 · 老人安全型方案讲解",
      tags: ["卫浴", "防滑", "老人安全", "预算敏感"],
      summary: "适合客户先关注安全和维护成本的卫浴改造项目，可复用于 R10 防滑与价值引导场景。",
      assets: ["会审资料包", "客户异议记录", "优化后讲稿", "设计方案对比图"],
      reuseTargets: ["培训课件案例", "AI 陪练场景", "销售新单会审准备"],
    },
  },
  {
    id: "r2",
    title: "青浦悦府 · 张女士全屋瓷砖单",
    customer: "张女士",
    company: "个人",
    salesperson: "李明",
    designer: "刘设计师",
    budget: "8 万",
    space: "客厅 40m²、卧室 3 间",
    style: "北欧轻奢",
    requirements: "大规格砖，哑光，统一色调",
    deadline: "下周三前",
    status: "case_done",
    urgency: "normal",
    submittedAt: "2024-01-13 11:30",
    overviewFocus: ["客户优先关注整体统一感", "已形成标准讲法，可作为案例库模板", "后续可复用于新房整屋方案讲解"],
    steps: [
      { step: "销售填写客户需求", done: true },
      { step: "系统推荐适配产品", done: true },
      { step: "设计师确认接收", done: true },
      { step: "会审准备", done: true },
      { step: "客户讲解评分", done: true },
      { step: "AI 讲稿优化", done: true },
      { step: "案例沉淀", done: true },
    ],
    reviewPrep: {
      meetingTime: "昨天 10:30",
      attendees: ["销售-李明", "设计-刘设计师"],
      materials: ["空间动线图", "大规格砖铺贴示意", "风格参考图"],
      risks: ["客户在意整体统一感，不接受色差过大"],
      checklist: ["先讲空间统一感，再讲规格优势", "设计图与材质图必须同版输出", "报价时强调长期耐看与维护便利"],
      readiness: 100,
    },
    score: {
      overall: 91,
      dims: [
        { label: "需求复述准确度", score: 92, note: "客户要点和风格约束表达清晰。" },
        { label: "价值讲解完整度", score: 90, note: "兼顾美观、规格和铺贴效果。" },
        { label: "异议处理稳定度", score: 89, note: "对色差和预算异议处理稳定。" },
      ],
      clientMoments: ["客户对统一色系的感知点被准确接住", "设计图和话术顺序保持一致，理解成本低"],
      highlightLines: [
        "您希望全屋看起来干净统一。",
        "优先用大规格哑光砖，是为了让空间更完整。",
        "卧室和客厅用同一色系，更容易把风格做统一。",
      ],
      riskLines: [
        "大规格砖看起来更大气。",
        "比较符合北欧风格。",
      ],
      recommendedActions: [
        "继续把统一感放在第一顺位，避免被客户带到单点价格比较。",
        "把设计图与材质图继续保持同版输出。",
        "将该讲法沉淀为标准案例，反哺新人带教。",
      ],
      coachTip: "这一版可作为“大规格统一空间讲解”的标准案例。",
    },
    aiScript: {
      before: "大规格砖看起来更大气，也比较符合北欧风格。",
      after: "您希望全屋看起来干净统一，那我们优先用大规格哑光砖的原因有三个：一是视觉上更完整，空间会更开阔；二是卧室和客厅用同一色系，更容易把风格做统一；三是哑光表面更耐看，后期不会那么容易显脏。",
      highlights: ["结构更完整", "对齐客户核心诉求", "已沉淀成标准案例"],
      framework: ["先确认客户偏好的是统一感不是单点便宜", "围绕空间视觉效果讲价值", "最后再承接预算和材质细节"],
    },
    caseRepo: {
      status: "completed",
      title: "全屋统一空间感方案讲解",
      tags: ["全屋", "大规格砖", "风格统一", "北欧轻奢"],
      summary: "已进入案例库，可直接复用于新房整屋方案讲解与会审准备。",
      assets: ["标准讲稿", "设计对照图", "讲解评分记录", "客户异议回应模板"],
      reuseTargets: ["培训课件案例", "销设协同复盘", "AI 陪练标准场景"],
    },
  },
];

export const statusMeta = {
  review_ready: { label: "待会审收口", tone: "bg-amber-100 text-amber-700" },
  case_done: { label: "已完成沉淀", tone: "bg-green-100 text-[#16A34A]" },
} as const;

export function getRequestById(id?: string) {
  return requests.find((item) => item.id === id) ?? requests[0];
}
