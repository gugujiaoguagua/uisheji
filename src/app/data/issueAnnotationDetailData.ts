export type AnnotationHistoryItem = {
  id: string;
  title: string;
  actor: string;
  time: string;
  status: "done" | "current" | "pending";
  detail: string;
};

export type ResponsibilityHandoffItem = {
  id: string;
  from: string;
  to: string;
  status: "done" | "pending" | "risk";
  reason: string;
  expectation: string;
};

export type ApprovalRecordItem = {
  id: string;
  node: string;
  owner: string;
  status: "approved" | "pending" | "rejected";
  time: string;
  note: string;
};

export type IssueAnnotationDetail = {
  summary: string;
  history: AnnotationHistoryItem[];
  handoffs: ResponsibilityHandoffItem[];
  approvals: ApprovalRecordItem[];
  closureRule: string;
};

const issueAnnotationDetails: Record<string, IssueAnnotationDetail> = {
  o1: {
    summary: "这类规格冲突不是只标一句备注就能结束，必须留清楚谁先发现、谁确认版本、谁批准回流，后续培训才有依据。",
    history: [
      {
        id: "o1-h1",
        title: "审单命中规格冲突规则",
        actor: "审单回流",
        time: "2024-01-15 14:32",
        status: "done",
        detail: "系统识别设计图与订单规格不一致，自动触发暂停生产提醒并创建标注草稿。",
      },
      {
        id: "o1-h2",
        title: "补录设计图与订单证据",
        actor: "审单专员-林洁",
        time: "2024-01-15 14:45",
        status: "done",
        detail: "上传设计图版本、订单截图和审单命中记录，固定为“规格填写错误”。",
      },
      {
        id: "o1-h3",
        title: "销售与设计统一客户口径",
        actor: "销设协同",
        time: "2024-01-15 15:10",
        status: "done",
        detail: "要求暂停对客承诺，先确认最终图纸版本，再回写统一解释话术。",
      },
      {
        id: "o1-h4",
        title: "进入培训回流待发布",
        actor: "培训运营",
        time: "2024-01-15 17:30",
        status: "current",
        detail: "已确认纳入规格核对补训案例，等待课件、题库和陪练场景一起发布。",
      },
    ],
    handoffs: [
      {
        id: "o1-f1",
        from: "审单回流",
        to: "销设协同",
        status: "done",
        reason: "需要确认设计图最终版本和客户沟通口径。",
        expectation: "统一“最终规格”口径后再继续后续动作。",
      },
      {
        id: "o1-f2",
        from: "销设协同",
        to: "培训运营",
        status: "done",
        reason: "问题已不是单张订单特例，需要沉淀成规格核对标准案例。",
        expectation: "补一条规格冲突课件案例，并同步题库与 AI 陪练。",
      },
      {
        id: "o1-f3",
        from: "培训运营",
        to: "信息同步中心",
        status: "pending",
        reason: "门店和设计都要收到统一版本字段要求，避免继续沿用旧图纸。",
        expectation: "面向相关角色发布版本字段补录提醒。",
      },
    ],
    approvals: [
      {
        id: "o1-a1",
        node: "高风险异常确认",
        owner: "审单主管-周岚",
        status: "approved",
        time: "2024-01-15 14:50",
        note: "确认为高风险规格冲突，维持暂停生产并禁止继续对客承诺。",
      },
      {
        id: "o1-a2",
        node: "回流培训立项",
        owner: "培训负责人-周老师",
        status: "approved",
        time: "2024-01-15 16:20",
        note: "同意作为规格核对标准案例进入补训、题库与陪练更新。",
      },
      {
        id: "o1-a3",
        node: "版本字段补录追踪",
        owner: "信息同步负责人-王玥",
        status: "pending",
        time: "待确认",
        note: "待确认订单系统增加图纸版本字段后的同步口径和执行范围。",
      },
    ],
    closureRule: "只有当最终图纸版本确认、客户解释口径统一、回流任务立项后，这条标注才算真正闭环。",
  },
  o2: {
    summary: "这个问题本质是知识版本断层，所以标注页里不仅要留证据，还要留清楚谁接走了“旧版口径仍在被用”这个责任。",
    history: [
      {
        id: "o2-h1",
        title: "售后现场发现禁用材料",
        actor: "售后回流",
        time: "2024-01-14 10:20",
        status: "done",
        detail: "售后照片确认现场仍使用 v3.1 已禁用材料，触发异常标注。",
      },
      {
        id: "o2-h2",
        title: "补齐知识版本未确认证据",
        actor: "信息同步",
        time: "2024-01-14 11:00",
        status: "done",
        detail: "调取门店确认记录，发现仍有人未完成新版规范确认。",
      },
      {
        id: "o2-h3",
        title: "锁定旧材料口径",
        actor: "培训运营",
        time: "2024-01-14 13:30",
        status: "current",
        detail: "先停止旧版材料解释继续流转，再排查题库和陪练中残留内容。",
      },
    ],
    handoffs: [
      {
        id: "o2-f1",
        from: "售后回流",
        to: "信息同步中心",
        status: "done",
        reason: "需要先找出谁还在继续使用旧版规范。",
        expectation: "追齐未确认 v3.1 的门店和角色名单。",
      },
      {
        id: "o2-f2",
        from: "信息同步中心",
        to: "培训运营",
        status: "done",
        reason: "确认旧知识残留后，需要同步更新课件、题库和陪练场景。",
        expectation: "完成新版规范重学和复测推送。",
      },
      {
        id: "o2-f3",
        from: "培训运营",
        to: "售后模板维护",
        status: "risk",
        reason: "售后模板没写知识版本字段，后续仍可能难以界定责任。",
        expectation: "把知识版本字段纳入售后归因模板。",
      },
    ],
    approvals: [
      {
        id: "o2-a1",
        node: "旧材料口径冻结",
        owner: "产品支持-赵航",
        status: "approved",
        time: "2024-01-14 11:20",
        note: "确认旧版材料口径不得继续用于现场解释和售后说明。",
      },
      {
        id: "o2-a2",
        node: "重学任务发布",
        owner: "培训负责人-周老师",
        status: "approved",
        time: "2024-01-14 15:10",
        note: "要求相关门店完成新版规范重学，并纳入复测名单。",
      },
      {
        id: "o2-a3",
        node: "模板字段补齐",
        owner: "售后主管-李青",
        status: "pending",
        time: "待补模板",
        note: "正在评估售后模板中增加知识版本字段的改造范围。",
      },
    ],
    closureRule: "只有当旧材料口径被冻结、未确认人员追齐、售后模板补上知识版本字段，这类标注才算能支撑后续追责。",
  },
  o3: {
    summary: "正常单也需要保留最小留痕：说明为什么没有进入异常链路，避免后续回看时只看到“无需标注”却不知道依据。",
    history: [
      {
        id: "o3-h1",
        title: "完成基础校验",
        actor: "系统校验",
        time: "2024-01-13 09:05",
        status: "done",
        detail: "图纸、订单和生产状态基础对照通过，没有进入异常标注主链路。",
      },
      {
        id: "o3-h2",
        title: "保留通过说明",
        actor: "审单回流",
        time: "2024-01-13 09:10",
        status: "current",
        detail: "留存“无需标注”的原因，供后续复盘和抽查时追溯。",
      },
    ],
    handoffs: [
      {
        id: "o3-f1",
        from: "系统",
        to: "审单回流",
        status: "done",
        reason: "当前单据无需异常升级，但仍需保留最小校验留痕。",
        expectation: "维持正常推进即可。",
      },
    ],
    approvals: [
      {
        id: "o3-a1",
        node: "正常单确认",
        owner: "系统",
        status: "approved",
        time: "2024-01-13 09:05",
        note: "当前单据通过基础校验，不进入回流培训链路。",
      },
    ],
    closureRule: "对正常单，闭环标准是“说明为什么没问题”而不是强行补出异常链。",
  },
  o4: {
    summary: "这条标注关键不在“参数填错”四个字，而在于把销售理解偏差、安装核对缺失和带教复盘关系串起来。",
    history: [
      {
        id: "o4-h1",
        title: "售后复盘发现湿区等级误配",
        actor: "售后回流",
        time: "2024-01-12 18:50",
        status: "done",
        detail: "客户现场铺设与报价说明不一致，确认进入参数理解偏差标注。",
      },
      {
        id: "o4-h2",
        title: "固定 R9 / R10 证据",
        actor: "培训运营",
        time: "2024-01-12 19:20",
        status: "done",
        detail: "整理报价单、现场照片和销售回访记录，锁定湿区推荐标准。",
      },
      {
        id: "o4-h3",
        title: "带教复盘排期",
        actor: "店长 / 带教",
        time: "2024-01-12 20:00",
        status: "current",
        detail: "已经建立 1 对 1 复盘任务，待回写复盘结果和复测结论。",
      },
    ],
    handoffs: [
      {
        id: "o4-f1",
        from: "售后回流",
        to: "培训运营",
        status: "done",
        reason: "问题已经明确是参数理解偏差，需要转成训练案例。",
        expectation: "补湿区 / 干区等级训练内容。",
      },
      {
        id: "o4-f2",
        from: "培训运营",
        to: "店长 / 带教",
        status: "done",
        reason: "这类偏差需要对具体销售做跟岗复盘，而不仅是统一发通知。",
        expectation: "安排 1 对 1 复盘并跟踪复测结果。",
      },
      {
        id: "o4-f3",
        from: "店长 / 带教",
        to: "安装交付",
        status: "pending",
        reason: "安装前核对动作缺失，现场还需要补一层拦截。",
        expectation: "把适用区间写进安装前核对清单。",
      },
    ],
    approvals: [
      {
        id: "o4-a1",
        node: "参数偏差归类确认",
        owner: "售后主管-李青",
        status: "approved",
        time: "2024-01-12 19:05",
        note: "确认归类为参数理解偏差，而不是单纯安装错误。",
      },
      {
        id: "o4-a2",
        node: "带教复盘建立",
        owner: "店长-王晨",
        status: "approved",
        time: "2024-01-12 20:10",
        note: "同意建立 1 对 1 带教复盘任务，并纳入本周跟进。",
      },
      {
        id: "o4-a3",
        node: "复测结果回写",
        owner: "培训运营",
        status: "pending",
        time: "待复测",
        note: "待补完参数类复测结果后，回写到带教记录与错误库。",
      },
    ],
    closureRule: "参数理解偏差类问题，必须同时看到“谁讲错了、谁带教了、谁复测了”，否则很难真正防复发。",
  },
};

const defaultDetail: IssueAnnotationDetail = {
  summary: "当前订单没有单独配置更深的标注追溯信息，将按通用留痕结构展示。",
  history: [
    {
      id: "default-h1",
      title: "创建标注记录",
      actor: "系统",
      time: "待补充",
      status: "current",
      detail: "建议补充标注历史、责任转交和审批留痕后再做后续追溯。",
    },
  ],
  handoffs: [
    {
      id: "default-f1",
      from: "当前处理人",
      to: "下一责任人",
      status: "pending",
      reason: "当前还没有补充责任转交说明。",
      expectation: "明确转交原因和下一步动作。",
    },
  ],
  approvals: [
    {
      id: "default-a1",
      node: "审批留痕待补",
      owner: "待确认",
      status: "pending",
      time: "待补充",
      note: "建议把关键确认节点补到本页，避免后续只有结果没有过程。",
    },
  ],
  closureRule: "建议补齐关键节点的确认过程和责任转交信息。",
};

export function getIssueAnnotationDetailByOrderId(orderId?: string) {
  if (!orderId) {
    return defaultDetail;
  }

  return issueAnnotationDetails[orderId] ?? defaultDetail;
}
