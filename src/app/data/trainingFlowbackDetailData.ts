export type FlowbackPublishRecord = {
  id: string;
  title: string;
  channel: string;
  publishedAt: string;
  owner: string;
  status: "done" | "scheduled" | "blocked";
  note: string;
};

export type CompletionFeedbackItem = {
  id: string;
  audience: string;
  completionRate: string;
  completed: string;
  pending: string;
  status: "good" | "attention" | "risk";
  note: string;
  nextAction: string;
};

export type RetestResultItem = {
  id: string;
  title: string;
  target: string;
  current: string;
  owner: string;
  status: "pass" | "pending" | "risk";
  note: string;
};

export type TrainingFlowbackDetail = {
  publishSummary: string;
  publishRecords: FlowbackPublishRecord[];
  completionSummary: string;
  completionFeedback: CompletionFeedbackItem[];
  retestResults: RetestResultItem[];
  closureRule: string;
};

const trainingFlowbackDetails: Record<string, TrainingFlowbackDetail> = {
  o1: {
    publishSummary: "这次回流不能只停在“已发补训”，还要看门店是否真的收到、学习是否完成、复测是否把旧口径纠正掉。",
    publishRecords: [
      {
        id: "o1-p1",
        title: "规格核对补训课发布",
        channel: "培训运营",
        publishedAt: "2026-04-21 09:30",
        owner: "培训运营-王敏",
        status: "done",
        note: "已面向相关门店销售推送课程和标准动作卡。",
      },
      {
        id: "o1-p2",
        title: "规格冲突判断题上线",
        channel: "题库",
        publishedAt: "2026-04-21 13:00",
        owner: "题库维护",
        status: "scheduled",
        note: "题目已审核通过，等待和补训课同步发布。",
      },
      {
        id: "o1-p3",
        title: "错误库标准案例沉淀",
        channel: "错误库",
        publishedAt: "待模板确认",
        owner: "审单回流",
        status: "blocked",
        note: "追溯字段模板还没完全统一，案例无法作为稳定母版复用。",
      },
    ],
    completionSummary: "当前重点不是看“有没有发”，而是看关键门店销售是否真的完成补训，否则同类规格冲突还会继续回流。",
    completionFeedback: [
      {
        id: "o1-c1",
        audience: "重点门店销售",
        completionRate: "62%",
        completed: "8 人",
        pending: "5 人",
        status: "attention",
        note: "已完成人员能复述“最终图纸版本必须写入订单”规则，但仍有 5 人未学习。",
        nextAction: "今晚前催完未学习人员，避免次日继续按旧口径录单。",
      },
      {
        id: "o1-c2",
        audience: "设计协同",
        completionRate: "100%",
        completed: "4 人",
        pending: "0 人",
        status: "good",
        note: "设计侧已统一“最终版本回写订单”的动作要求。",
        nextAction: "继续盯门店是否按新字段提交。",
      },
      {
        id: "o1-c3",
        audience: "店长 / 带教",
        completionRate: "50%",
        completed: "2 人",
        pending: "2 人",
        status: "risk",
        note: "还没有全部完成带教复盘，后续口径纠偏可能不稳。",
        nextAction: "把规格冲突案例加进本周带教复盘清单。",
      },
    ],
    retestResults: [
      {
        id: "o1-r1",
        title: "规格冲突专项复测",
        target: "目标 85 分以上",
        current: "平均 79 分",
        owner: "培训运营",
        status: "risk",
        note: "多数人知道要核对版本，但在客户追问时仍会沿用旧草稿解释。",
      },
      {
        id: "o1-r2",
        title: "AI 陪练止损话术复测",
        target: "通过率 90%",
        current: "待本周排期",
        owner: "AI 陪练",
        status: "pending",
        note: "需要验证销售是否能在客户已收到错误口径后完成止损解释。",
      },
    ],
    closureRule: "培训回流只有在发布完成、重点人群学完、复测能把旧口径纠正掉后，才算真正把问题从单据回流成标准。",
  },
  o2: {
    publishSummary: "版本同步类问题更怕“内容更新了一半”，所以要同时追发布触达、完成反馈和复测，而不是只看课件是否改过。",
    publishRecords: [
      {
        id: "o2-p1",
        title: "《防水规范 v3.1》补学任务推送",
        channel: "培训运营",
        publishedAt: "2026-04-21 08:50",
        owner: "培训运营-王敏",
        status: "done",
        note: "已对卫浴相关销售、施工支持和售后人员发起重学。",
      },
      {
        id: "o2-p2",
        title: "禁用材料判断题替换",
        channel: "题库",
        publishedAt: "2026-04-21 12:00",
        owner: "题库维护",
        status: "scheduled",
        note: "旧题已下线，新题等待和知识版本字段一起生效。",
      },
      {
        id: "o2-p3",
        title: "售后记录模板补字段公告",
        channel: "信息同步",
        publishedAt: "待字段上线",
        owner: "售后模板维护",
        status: "blocked",
        note: "知识版本字段没上线前，售后侧完成反馈仍然难追溯。",
      },
    ],
    completionSummary: "当前完成反馈要重点看“仍在用旧口径的人”有没有被追出来，否则版本断层问题会继续重复。",
    completionFeedback: [
      {
        id: "o2-c1",
        audience: "卫浴相关门店销售",
        completionRate: "71%",
        completed: "12 人",
        pending: "5 人",
        status: "attention",
        note: "大部分已完成新版重学，但仍有少量门店未确认。",
        nextAction: "按门店维度催办未确认人员，并同步店长。",
      },
      {
        id: "o2-c2",
        audience: "售后记录维护",
        completionRate: "40%",
        completed: "2 人",
        pending: "3 人",
        status: "risk",
        note: "字段方案理解不一，后续记录仍可能遗漏知识版本。",
        nextAction: "字段上线前先做一次填写演练，避免上线后继续漏写。",
      },
      {
        id: "o2-c3",
        audience: "施工支持",
        completionRate: "100%",
        completed: "3 人",
        pending: "0 人",
        status: "good",
        note: "新版禁用材料边界已全部确认。",
        nextAction: "继续配合售后回收旧解释卡。",
      },
    ],
    retestResults: [
      {
        id: "o2-r1",
        title: "新版禁用材料专项复测",
        target: "目标 85 分以上",
        current: "平均 86 分",
        owner: "培训运营",
        status: "pass",
        note: "已学人员对新版规范理解基本稳定，复发率开始回落。",
      },
      {
        id: "o2-r2",
        title: "现场解释场景陪练复核",
        target: "通过率 90%",
        current: "82%",
        owner: "AI 陪练",
        status: "pending",
        note: "面对客户追问时仍有少部分人会混用旧材料口径。",
      },
    ],
    closureRule: "版本同步类培训回流，只有发布触达、旧版回收和复测通过三者都成立时，才算真正完成同版切换。",
  },
  o3: {
    publishSummary: "这是一张无需额外回流的正常单，重点是保留“为什么无需补训 / 复测”的最小闭环说明。",
    publishRecords: [
      {
        id: "o3-p1",
        title: "无需新增回流任务",
        channel: "系统",
        publishedAt: "已确认",
        owner: "系统",
        status: "done",
        note: "当前单据已正常闭环，不触发补训和复测。",
      },
    ],
    completionSummary: "正常通过单也要说明没有新增学习动作，避免后续复盘时误以为流程漏发。",
    completionFeedback: [
      {
        id: "o3-c1",
        audience: "相关人员",
        completionRate: "--",
        completed: "无需补训",
        pending: "0 项",
        status: "good",
        note: "当前无需额外学习或带教纠偏。",
        nextAction: "保留最小留痕即可。",
      },
    ],
    retestResults: [
      {
        id: "o3-r1",
        title: "复测结果",
        target: "无需发起",
        current: "保持观察",
        owner: "系统",
        status: "pass",
        note: "当前没有触发补训闭环，也不需要新增复测。",
      },
    ],
    closureRule: "无需回流的单据也要保留最小发布和结果留痕，说明为什么这次没有进入补训闭环。",
  },
  o4: {
    publishSummary: "场景理解偏差类问题，关键不是单纯发课，而是让课程、带教和复测三件事顺着同一条链走完。",
    publishRecords: [
      {
        id: "o4-p1",
        title: "《防滑等级与应用场景》案例补充",
        channel: "培训运营",
        publishedAt: "2026-04-21 10:10",
        owner: "培训运营-王敏",
        status: "done",
        note: "已补到湿区 / 干区场景说明和错误案例。",
      },
      {
        id: "o4-p2",
        title: "R9 / R10 场景判断题上线",
        channel: "题库",
        publishedAt: "2026-04-21 15:00",
        owner: "题库维护",
        status: "scheduled",
        note: "题目审核完成，等待和复测安排一起开放。",
      },
      {
        id: "o4-p3",
        title: "刘洋 1 对 1 带教任务排期",
        channel: "带教任务",
        publishedAt: "今天下班前",
        owner: "店长 / 带教",
        status: "scheduled",
        note: "需要先完成一轮讲解复盘，再进入正式复测。",
      },
    ],
    completionSummary: "当前要重点看带教和陪练有没有真的跟上，否则“知道参数名词”不等于“能在真实场景里推荐正确”。",
    completionFeedback: [
      {
        id: "o4-c1",
        audience: "涉单销售",
        completionRate: "58%",
        completed: "7 人",
        pending: "5 人",
        status: "risk",
        note: "一半以上人还没完成场景化补训，短期内仍有复发风险。",
        nextAction: "把补训和 1 对 1 带教串在一起执行，减少只学不练。",
      },
      {
        id: "o4-c2",
        audience: "店长 / 带教",
        completionRate: "75%",
        completed: "3 人",
        pending: "1 人",
        status: "attention",
        note: "大部分已开始复盘，但现场核对动作还没完全带起来。",
        nextAction: "复盘时强制加入“安装前核对”口述检查。",
      },
      {
        id: "o4-c3",
        audience: "安装交付",
        completionRate: "100%",
        completed: "2 人",
        pending: "0 人",
        status: "good",
        note: "已确认后续安装前增加适用区间二次核对。",
        nextAction: "等待复测后回看实际拦截效果。",
      },
    ],
    retestResults: [
      {
        id: "o4-r1",
        title: "湿区等级场景专项复测",
        target: "目标 85 分以上",
        current: "平均 74 分",
        owner: "培训运营",
        status: "risk",
        note: "知识点能答对，但遇到真实使用场景仍容易判断失误。",
      },
      {
        id: "o4-r2",
        title: "1 对 1 带教复述检查",
        target: "通过率 100%",
        current: "待排期",
        owner: "店长 / 带教",
        status: "pending",
        note: "需要验证销售是否能把参数与场景、安装核对动作一起讲清楚。",
      },
    ],
    closureRule: "场景类培训回流只有在案例发布、带教完成、复测通过三者都成立时，才算真正把售后问题沉淀成新标准。",
  },
};

const defaultDetail: TrainingFlowbackDetail = {
  publishSummary: "当前订单没有配置更深的培训回流追踪信息，将按通用发布、完成反馈和复测结构展示。",
  publishRecords: [
    {
      id: "default-p1",
      title: "回流发布记录待补",
      channel: "待确认",
      publishedAt: "待确认",
      owner: "当前处理人",
      status: "scheduled",
      note: "建议至少保留一条发布记录，说明回流动作有没有真的发出去。",
    },
  ],
  completionSummary: "建议补充一轮学习完成反馈，避免只看到“已回流”却不知道谁真正学完。",
  completionFeedback: [
    {
      id: "default-c1",
      audience: "待确认对象",
      completionRate: "--",
      completed: "待确认",
      pending: "待确认",
      status: "attention",
      note: "建议补充学习完成率、已完成人数和未完成人数。",
      nextAction: "至少追一轮关键对象的完成情况。",
    },
  ],
  retestResults: [
    {
      id: "default-r1",
      title: "复测结果待补",
      target: "待确认",
      current: "待确认",
      owner: "当前处理人",
      status: "pending",
      note: "建议补至少一条复测结果，判断这次回流有没有真正生效。",
    },
  ],
  closureRule: "建议至少补齐发布记录、完成反馈和复测结果三类信息后，再作为完整培训回流页使用。",
};

export function getTrainingFlowbackDetailByOrderId(orderId?: string) {
  if (!orderId) {
    return defaultDetail;
  }

  return trainingFlowbackDetails[orderId] ?? defaultDetail;
}
