export type ReviewMinuteItem = {
  id: string;
  title: string;
  actor: string;
  time: string;
  status: "consensus" | "risk" | "pending";
  note: string;
};

export type ReviewDecisionItem = {
  id: string;
  title: string;
  owner: string;
  status: "confirmed" | "pending" | "done";
  decision: string;
  nextNode: string;
};

export type ReviewFollowupItem = {
  id: string;
  title: string;
  owner: string;
  deadline: string;
  status: "today" | "scheduled" | "done";
  note: string;
};

export type ReviewPreparationDetail = {
  minutesSummary: string;
  minutes: ReviewMinuteItem[];
  decisions: ReviewDecisionItem[];
  followUps: ReviewFollowupItem[];
  closureRule: string;
};

const reviewPreparationDetails: Record<string, ReviewPreparationDetail> = {
  r1: {
    minutesSummary: "这场会审的重点不是把资料念一遍，而是把“老人安全、预算上限、R10 防滑讲法”先统一成同一套会后口径，避免客户讲解时销售和设计各说各话。",
    minutes: [
      {
        id: "r1-m1",
        title: "先统一老人安全场景表达",
        actor: "带教-周老师",
        time: "今天 16:08",
        status: "consensus",
        note: "会审确认讲解顺序必须先复述老人使用场景，再进入 R10 防滑和打理成本，不建议直接上价格。",
      },
      {
        id: "r1-m2",
        title: "预算上限提醒",
        actor: "销售-陈伟",
        time: "今天 16:12",
        status: "risk",
        note: "客户预算已接近上限，如果价值没讲透就进报价，会被直接拉去做低价比较。",
      },
      {
        id: "r1-m3",
        title: "施工限制说明待补口径",
        actor: "设计-刘设计师",
        time: "今天 16:18",
        status: "pending",
        note: "需要把施工限制说明和推荐规格一起写进会后纪要，避免后续只记住产品卖点、忘了施工边界。",
      },
    ],
    decisions: [
      {
        id: "r1-d1",
        title: "讲解顺序决议",
        owner: "销售-陈伟",
        status: "confirmed",
        decision: "客户讲解统一采用“需求复述 → 安全价值 → 维护成本 → 预算承接”的顺序，先不直接比较价格。",
        nextNode: "客户讲解评分反馈",
      },
      {
        id: "r1-d2",
        title: "图纸与规格对齐决议",
        owner: "设计-刘设计师",
        status: "confirmed",
        decision: "会后输出的设计图、推荐规格和竞品对比话术必须同版，不允许会前资料和现场讲法分叉。",
        nextNode: "讲稿优化",
      },
      {
        id: "r1-d3",
        title: "案例沉淀决议",
        owner: "销设协同",
        status: "pending",
        decision: "这次会审先保留纪要和责任人，待评分出来后再决定是否沉淀成“老人安全型卫浴方案”标准案例。",
        nextNode: "案例沉淀评估",
      },
    ],
    followUps: [
      {
        id: "r1-f1",
        title: "补会审纪要并写清责任人",
        owner: "销设协同",
        deadline: "今天 17:30 前",
        status: "today",
        note: "至少写清会审结论、责任归属和下次回看节点，不能只留口头结论。",
      },
      {
        id: "r1-f2",
        title: "客户讲解后回填评分反馈",
        owner: "带教-周老师",
        deadline: "客户讲解结束后 30 分钟内",
        status: "scheduled",
        note: "把高风险语句和替代表达直接回写到评分反馈页，避免准备页和评分页断层。",
      },
      {
        id: "r1-f3",
        title: "决定是否进入案例库",
        owner: "社区运营",
        deadline: "本周内",
        status: "scheduled",
        note: "如果评分稳定且讲法可复用，再把优化讲稿和设计方案一起沉淀成标准案例。",
      },
    ],
    closureRule: "会审准备只有在纪要留痕、决议明确、评分反馈接上并沉淀后续动作后，才算真正完成从准备到闭环的交接。",
  },
  r2: {
    minutesSummary: "这场会审已经形成可复用结论，重点不是继续补准备，而是把“为什么这套讲法有效”沉淀清楚，供后续新单直接借用。",
    minutes: [
      {
        id: "r2-m1",
        title: "统一空间感优先级已对齐",
        actor: "销售-李明",
        time: "昨天 10:35",
        status: "consensus",
        note: "会审确认客户核心诉求是整体统一感，因此讲解顺序必须先讲空间完整性，再讲规格和预算。",
      },
      {
        id: "r2-m2",
        title: "设计图与材质图保持同版",
        actor: "设计-刘设计师",
        time: "昨天 10:42",
        status: "consensus",
        note: "会审中已确认设计图、材质图和现场讲稿同版输出，减少客户理解成本。",
      },
      {
        id: "r2-m3",
        title: "可直接沉淀成标准案例",
        actor: "销设协同",
        time: "昨天 10:55",
        status: "consensus",
        note: "本次会审内容和后续评分反馈高度一致，具备直接进入案例库的条件。",
      },
    ],
    decisions: [
      {
        id: "r2-d1",
        title: "讲解结构决议",
        owner: "销售-李明",
        status: "done",
        decision: "保留“先统一感、后规格、再预算”的稳定讲法，作为今后新房整屋方案的标准结构。",
        nextNode: "案例库复用",
      },
      {
        id: "r2-d2",
        title: "素材输出决议",
        owner: "设计-刘设计师",
        status: "done",
        decision: "设计对照图、材质说明和标准讲稿绑定输出，作为会审后统一资料包。",
        nextNode: "新人带教",
      },
      {
        id: "r2-d3",
        title: "沉淀复用决议",
        owner: "社区运营",
        status: "done",
        decision: "该项目正式进入案例库，可同步给培训课件、AI 陪练和后续新单会审准备页复用。",
        nextNode: "培训 / 陪练同步",
      },
    ],
    followUps: [
      {
        id: "r2-f1",
        title: "同步标准讲稿到新人带教",
        owner: "社区运营",
        deadline: "已完成",
        status: "done",
        note: "已把讲稿加入新人带教素材包。",
      },
      {
        id: "r2-f2",
        title: "把高亮表达加入 AI 陪练句库",
        owner: "AI 陪练",
        deadline: "已完成",
        status: "done",
        note: "后续可以直接在整屋统一感场景中复用。",
      },
      {
        id: "r2-f3",
        title: "回看后续新单会审复用效果",
        owner: "销设协同",
        deadline: "下周复盘",
        status: "scheduled",
        note: "观察新人是否能稳定沿用这套讲法，而不是又回到只讲规格不讲空间统一感。",
      },
    ],
    closureRule: "已沉淀案例的会审页，也要保留纪要、决议和后续复用动作，说明这套讲法为什么能成为标准，而不是只显示“准备完成”。",
  },
};

const defaultDetail: ReviewPreparationDetail = {
  minutesSummary: "当前会审没有配置更深的闭环信息，将按通用纪要、决议和跟进动作结构展示。",
  minutes: [
    {
      id: "default-m1",
      title: "会审纪要待补",
      actor: "当前处理人",
      time: "待确认",
      status: "pending",
      note: "建议至少补一条会审纪要，说明现场真正达成了什么共识。",
    },
  ],
  decisions: [
    {
      id: "default-d1",
      title: "会审决议待补",
      owner: "当前处理人",
      status: "pending",
      decision: "建议补充一条明确决议，避免会后只剩模糊方向。",
      nextNode: "待确认",
    },
  ],
  followUps: [
    {
      id: "default-f1",
      title: "后续动作待补",
      owner: "当前处理人",
      deadline: "待确认",
      status: "scheduled",
      note: "建议补充责任人和截止时间，避免准备页和后续评分页脱节。",
    },
  ],
  closureRule: "建议至少补齐会审纪要、决议和跟进动作三类信息后，再作为完整的会审准备闭环页使用。",
};

export function getReviewPreparationDetailByRequestId(requestId?: string) {
  if (!requestId) {
    return defaultDetail;
  }

  return reviewPreparationDetails[requestId] ?? defaultDetail;
}
