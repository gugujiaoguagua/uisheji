export type PreparationOverallStatus = "ready" | "warning" | "risk";
export type PreparationFieldStatus = "pass" | "warning" | "missing";
export type PreparationConsistencyStatus = "aligned" | "warning" | "mismatch";
export type PreparationReminderStatus = "on-track" | "warning" | "overdue";
export type PreparationTraceStatus = "done" | "pending" | "risk";

export type PreparationField = {
  label: string;
  source: string;
  value: string;
  owner: string;
  status: PreparationFieldStatus;
  note: string;
};

export type PreparationConsistencyItem = {
  label: string;
  drawing: string;
  quote: string;
  status: PreparationConsistencyStatus;
  impact: string;
  note: string;
};

export type PreparationReminder = {
  node: string;
  deadline: string;
  owner: string;
  status: PreparationReminderStatus;
  note: string;
};

export type PreparationTrace = {
  role: string;
  action: string;
  time: string;
  status: PreparationTraceStatus;
  note: string;
};

export type OrderPreparationData = {
  overallStatus: PreparationOverallStatus;
  summary: string;
  pageHint: string;
  requiredBeforeSubmit: string[];
  keyFields: PreparationField[];
  drawingQuoteChecks: PreparationConsistencyItem[];
  reminders: PreparationReminder[];
  responsibilityTrace: PreparationTrace[];
  syncNotes: string[];
  nextActions: string[];
};

export const orderPreparations: Record<string, OrderPreparationData> = {
  o1: {
    overallStatus: "risk",
    summary: "当前不是简单字段录错，而是图纸版本、订单规格和报价口径都没有在下单前统一，必须先补准备动作再进入后续校验。",
    pageHint: "本页看的是下单前准备是否齐套、谁确认过、还能不能继续推进；不是替代工艺 / 生产数据校验页。",
    requiredBeforeSubmit: [
      "补写图纸版本号，并确认唯一有效版本。",
      "统一订单规格与报价口径，先冻结错误对客承诺。",
      "由销售、设计、审单三方在同一条记录里确认最终规格。",
    ],
    keyFields: [
      {
        label: "图纸版本号",
        source: "设计图 V5 / 订单系统",
        value: "订单侧未写入版本字段",
        owner: "设计协同",
        status: "missing",
        note: "没有版本号就无法判断订单引用的是哪一版图纸，后续追责也会断链。",
      },
      {
        label: "下单规格",
        source: "设计图 / 订单系统",
        value: "图纸 P600×1200；订单 P800×800",
        owner: "门店销售",
        status: "warning",
        note: "核心字段不一致，当前不能直接下单。",
      },
      {
        label: "客户确认口径",
        source: "客户沟通记录",
        value: "仍沿用旧规格解释",
        owner: "销设协同",
        status: "warning",
        note: "先统一改口，避免客户继续按错误规格预期推进。",
      },
      {
        label: "交付地址与收货时间",
        source: "订单系统",
        value: "已补齐",
        owner: "门店销售",
        status: "pass",
        note: "基础物流字段完整，可复用。",
      },
    ],
    drawingQuoteChecks: [
      {
        label: "规格一致性",
        drawing: "P600×1200",
        quote: "P800×800",
        status: "mismatch",
        impact: "会直接导致报价、生产和客户承诺全部串错。",
        note: "属于下单前必须拦截的高风险项。",
      },
      {
        label: "图纸版本 vs 报价备注",
        drawing: "V5",
        quote: "未注明版本",
        status: "warning",
        impact: "报价单无法证明引用的是哪一版图纸。",
        note: "建议把图纸版本写进报价备注和下单留痕里。",
      },
      {
        label: "系列与色号",
        drawing: "云岚石·暖冬系列",
        quote: "云岚石·暖冬系列",
        status: "aligned",
        impact: "主系列信息一致。",
        note: "可保留现有选择。",
      },
    ],
    reminders: [
      {
        node: "销售补齐版本字段",
        deadline: "今天 16:30 前",
        owner: "王芳",
        status: "overdue",
        note: "当前已超时，继续拖延会影响工厂排产和客户改口。",
      },
      {
        node: "设计确认最终图纸",
        deadline: "今天 17:00 前",
        owner: "设计协同",
        status: "warning",
        note: "若仍存在群聊并行版本，需要先回收旧稿。",
      },
      {
        node: "审单复核并允许进入校验页",
        deadline: "图纸与报价统一后 30 分钟内",
        owner: "审单回流",
        status: "warning",
        note: "本节点不能先于版本统一发生。",
      },
    ],
    responsibilityTrace: [
      {
        role: "门店销售",
        action: "提交订单草稿并补录交付信息",
        time: "2024-01-15 13:50",
        status: "done",
        note: "基础单据信息已提交，但规格引用了旧草稿。",
      },
      {
        role: "设计协同",
        action: "确认最终图纸版本",
        time: "待确认",
        status: "risk",
        note: "版本未统一是当前最大风险源。",
      },
      {
        role: "审单回流",
        action: "下单前准备复核",
        time: "待图纸统一后执行",
        status: "pending",
        note: "需确认关键字段、报价口径和责任签名都完整。",
      },
    ],
    syncNotes: [
      "如果客户已经收到旧规格报价，需要同步销设协同统一对客改口。",
      "该单要把“图纸版本必须写入订单”沉淀成后续标准。",
    ],
    nextActions: [
      "先进入设计协同链路确认唯一有效图纸版本。",
      "补写订单版本字段后，再进入工艺 / 生产数据校验页。",
      "把本次异常的责任确认结果留到审单记录中，避免后续口径漂移。",
    ],
  },
  o2: {
    overallStatus: "warning",
    summary: "这张单的关键不是生产字段缺失，而是下单前对知识版本和材料口径没有确认到位，导致后续售后与培训模板都断层。",
    pageHint: "本页前置检查知识版本、材料口径和责任确认；后面的工艺校验页再看规范与现场执行差异。",
    requiredBeforeSubmit: [
      "在下单或售后补录中写明当前采用的知识版本。",
      "确认报价说明已经切到 v3.1 新口径。",
      "门店、售后、培训三方确认旧材料解释不再继续使用。",
    ],
    keyFields: [
      {
        label: "知识版本字段",
        source: "门店确认 / 售后模板",
        value: "部分记录未写 v3.1",
        owner: "信息同步",
        status: "missing",
        note: "缺少版本号会让后续归因和重学动作失准。",
      },
      {
        label: "禁用材料说明",
        source: "报价备注 / 门店讲解",
        value: "仍有旧口径残留",
        owner: "门店销售",
        status: "warning",
        note: "需要统一替换为新版禁用口径。",
      },
      {
        label: "客户施工提示",
        source: "对客说明",
        value: "已通知暂停旧材料使用",
        owner: "售后回流",
        status: "pass",
        note: "客户侧已收到初步纠偏通知。",
      },
      {
        label: "收货 / 施工时间",
        source: "订单系统",
        value: "已补齐",
        owner: "门店销售",
        status: "pass",
        note: "时间字段可用于追踪后续替换。",
      },
    ],
    drawingQuoteChecks: [
      {
        label: "工艺版本与报价备注",
        drawing: "工艺规范 v3.1",
        quote: "部分旧版材料解释",
        status: "warning",
        impact: "报价和现场解释会继续沿用旧材料口径。",
        note: "需要在下单准备阶段就统一为新版说明。",
      },
      {
        label: "禁用材料提示",
        drawing: "不得使用 OPC 普通硅酸盐水泥",
        quote: "未明确禁用",
        status: "mismatch",
        impact: "会把知识不同步问题带到现场执行。",
        note: "这类口径必须在下单前明确写给客户与施工方。",
      },
    ],
    reminders: [
      {
        node: "追齐 v3.1 未确认人员",
        deadline: "今天 17:00 前",
        owner: "信息同步",
        status: "warning",
        note: "未确认人员仍可能继续讲旧版口径。",
      },
      {
        node: "替换报价说明模板",
        deadline: "今天下班前",
        owner: "培训运营 / 门店销售",
        status: "warning",
        note: "模板替换完成后，后续新单可直接复用。",
      },
      {
        node: "售后模板补知识版本字段",
        deadline: "明天上午",
        owner: "售后回流",
        status: "on-track",
        note: "目前已进入改版排期。",
      },
    ],
    responsibilityTrace: [
      {
        role: "信息同步",
        action: "发布 v3.1 并追踪确认进度",
        time: "2024-01-14 09:20",
        status: "done",
        note: "公告已发，但确认闭环不完整。",
      },
      {
        role: "门店销售",
        action: "替换客户解释口径",
        time: "待完成",
        status: "pending",
        note: "仍需统一禁用材料说明。",
      },
      {
        role: "售后回流",
        action: "在模板中补知识版本字段",
        time: "排期中",
        status: "pending",
        note: "补完后才能形成稳定留痕。",
      },
    ],
    syncNotes: [
      "这类问题要同步到培训运营，不然下单准备补了，题库和陪练仍会讲旧内容。",
      "建议把知识版本字段沉淀为下单和售后共用字段。",
    ],
    nextActions: [
      "先补齐知识版本字段，再继续现场执行对照。",
      "统一替换报价说明中的旧材料口径。",
      "回到信息同步中心确认剩余未确认人员。",
    ],
  },
  o3: {
    overallStatus: "ready",
    summary: "这张单的下单准备已基本齐套，关键字段完整、图纸与报价一致，可以继续进入后续校验与执行流程。",
    pageHint: "本页显示的是准备完成度，不代表后续生产或交付环节完全没有风险。",
    requiredBeforeSubmit: ["当前已满足下单准备条件，可继续推进。"],
    keyFields: [
      {
        label: "图纸版本号",
        source: "设计图 / 订单系统",
        value: "V3，已写入订单",
        owner: "设计协同",
        status: "pass",
        note: "来源统一，可追溯。",
      },
      {
        label: "下单规格",
        source: "设计图 / 订单系统",
        value: "P600×600",
        owner: "门店销售",
        status: "pass",
        note: "关键规格一致。",
      },
      {
        label: "客户确认口径",
        source: "对客沟通记录",
        value: "已按最终图纸确认",
        owner: "销设协同",
        status: "pass",
        note: "无需额外改口。",
      },
      {
        label: "交付地址与时间",
        source: "订单系统",
        value: "已补齐",
        owner: "门店销售",
        status: "pass",
        note: "物流字段完整。",
      },
    ],
    drawingQuoteChecks: [
      {
        label: "规格一致性",
        drawing: "P600×600",
        quote: "P600×600",
        status: "aligned",
        impact: "不会造成前端解释与后续执行分叉。",
        note: "可直接进入正常校验流程。",
      },
      {
        label: "系列与色号",
        drawing: "云岚石·暖冬系列",
        quote: "云岚石·暖冬系列",
        status: "aligned",
        impact: "系列口径一致。",
        note: "当前无需额外处理。",
      },
    ],
    reminders: [
      {
        node: "审单复核",
        deadline: "今天 15:00 前",
        owner: "审单回流",
        status: "on-track",
        note: "已在正常 SLA 内。",
      },
      {
        node: "工厂投产确认",
        deadline: "明天上午",
        owner: "工厂协同",
        status: "on-track",
        note: "准备动作已满足投产前条件。",
      },
    ],
    responsibilityTrace: [
      {
        role: "门店销售",
        action: "提交订单草稿并补录交付信息",
        time: "2024-01-13 08:20",
        status: "done",
        note: "提交完整。",
      },
      {
        role: "设计协同",
        action: "确认最终图纸与版本",
        time: "2024-01-13 08:35",
        status: "done",
        note: "图纸版本已对齐。",
      },
      {
        role: "审单回流",
        action: "下单准备复核",
        time: "2024-01-13 08:50",
        status: "done",
        note: "准备链路通过，可进入正常执行。",
      },
    ],
    syncNotes: ["当前单据可作为“正常通过”的准备样例，供后续培训或带教参考。"],
    nextActions: ["继续进入工艺 / 生产数据校验。", "保持现有准备模板。"],
  },
  o4: {
    overallStatus: "warning",
    summary: "这张单的问题不是字段完全缺失，而是参数推荐和场景说明没有在下单前被明确写进准备链路，导致后续安装前核对也失守。",
    pageHint: "下单准备页重点提前确认“适用场景、推荐等级、客户讲解口径”，避免问题拖到售后才暴露。",
    requiredBeforeSubmit: [
      "在报价备注里明确湿区推荐等级和适用场景。",
      "把安装前核对清单中的“适用区间”字段补齐。",
      "要求门店销售完成一次带教复盘后再继续独立推荐该类产品。",
    ],
    keyFields: [
      {
        label: "适用场景说明",
        source: "报价备注 / 销售讲解",
        value: "湿区等级解释不完整",
        owner: "门店销售",
        status: "warning",
        note: "参数名称知道，但没和真实场景绑定清楚。",
      },
      {
        label: "推荐等级字段",
        source: "报价单",
        value: "R10 已写，但未强调湿区必选",
        owner: "门店销售",
        status: "warning",
        note: "字段有值，但解释力度不够。",
      },
      {
        label: "安装前核对字段",
        source: "安装清单",
        value: "缺少适用区间记录",
        owner: "安装交付",
        status: "missing",
        note: "缺少二次拦截点。",
      },
      {
        label: "客户确认口径",
        source: "回访记录",
        value: "已知晓需改铺更高等级",
        owner: "售后回流",
        status: "pass",
        note: "客户侧已开始修正。",
      },
    ],
    drawingQuoteChecks: [
      {
        label: "湿区等级一致性",
        drawing: "R10",
        quote: "R10（但未突出湿区限制）",
        status: "warning",
        impact: "会让前端推荐正确但讲解不够，导致客户和安装都没形成强约束。",
        note: "建议把场景说明做成固定备注模板。",
      },
      {
        label: "报价说明 vs 安装核对",
        drawing: "湿区必须使用 R10",
        quote: "安装前未二次核对",
        status: "mismatch",
        impact: "现场原本可以二次拦截，但准备链路没留到安装核对表。",
        note: "需要把报价里的场景要求同步到安装前清单。",
      },
    ],
    reminders: [
      {
        node: "补齐安装前核对字段",
        deadline: "今天 18:00 前",
        owner: "安装交付",
        status: "warning",
        note: "补完后后续同类单可以提前拦截。",
      },
      {
        node: "参数类带教复盘排期",
        deadline: "今天下班前",
        owner: "店长 / 带教",
        status: "warning",
        note: "需要盯“场景 -> 参数 -> 推荐”的讲解链路。",
      },
      {
        node: "更新报价备注模板",
        deadline: "明天下午",
        owner: "培训运营",
        status: "on-track",
        note: "已进入模板补充清单。",
      },
    ],
    responsibilityTrace: [
      {
        role: "门店销售",
        action: "提交报价并讲解参数等级",
        time: "2024-01-12 16:10",
        status: "done",
        note: "已推荐正确等级，但场景强调不足。",
      },
      {
        role: "安装交付",
        action: "安装前核对适用区间",
        time: "未记录",
        status: "risk",
        note: "关键留痕缺失，导致现场未能二次拦截。",
      },
      {
        role: "店长 / 带教",
        action: "参数类推荐复盘",
        time: "待排期",
        status: "pending",
        note: "需要把个人复盘与标准动作绑定。",
      },
    ],
    syncNotes: [
      "这类参数问题要同步到带教看板，不能只停留在售后复盘。",
      "建议把“适用场景字段”纳入报价模板和安装核对清单的共同字段。",
    ],
    nextActions: [
      "先补报价模板中的场景说明，再去做后续校验。",
      "把安装前核对字段补齐并纳入标准模板。",
      "同步店长安排 1 对 1 复盘。",
    ],
  },
};

export function getOrderPreparationById(id?: string) {
  return orderPreparations[id ?? ""] ?? orderPreparations.o1;
}

export function preparationOverallTone(status: PreparationOverallStatus) {
  if (status === "ready") return "bg-green-50 border-green-100 text-[#15803D]";
  if (status === "risk") return "bg-red-50 border-red-100 text-[#DC2626]";
  return "bg-amber-50 border-amber-100 text-[#B45309]";
}

export function preparationOverallLabel(status: PreparationOverallStatus) {
  if (status === "ready") return "准备通过";
  if (status === "risk") return "准备未完成";
  return "准备待补齐";
}

export function preparationFieldTone(status: PreparationFieldStatus) {
  if (status === "pass") return "bg-green-50 border-green-100 text-[#15803D]";
  if (status === "missing") return "bg-red-50 border-red-100 text-[#DC2626]";
  return "bg-amber-50 border-amber-100 text-[#B45309]";
}

export function preparationFieldLabel(status: PreparationFieldStatus) {
  if (status === "pass") return "已确认";
  if (status === "missing") return "缺失";
  return "待统一";
}

export function preparationConsistencyTone(status: PreparationConsistencyStatus) {
  if (status === "aligned") return "bg-green-50 border-green-100 text-[#15803D]";
  if (status === "mismatch") return "bg-red-50 border-red-100 text-[#DC2626]";
  return "bg-amber-50 border-amber-100 text-[#B45309]";
}

export function preparationConsistencyLabel(status: PreparationConsistencyStatus) {
  if (status === "aligned") return "一致";
  if (status === "mismatch") return "不一致";
  return "需补说明";
}

export function preparationReminderTone(status: PreparationReminderStatus) {
  if (status === "on-track") return "bg-green-50 border-green-100 text-[#15803D]";
  if (status === "overdue") return "bg-red-50 border-red-100 text-[#DC2626]";
  return "bg-amber-50 border-amber-100 text-[#B45309]";
}

export function preparationReminderLabel(status: PreparationReminderStatus) {
  if (status === "on-track") return "进行中";
  if (status === "overdue") return "已超时";
  return "待处理";
}

export function preparationTraceTone(status: PreparationTraceStatus) {
  if (status === "done") return "bg-green-50 border-green-100 text-[#15803D]";
  if (status === "risk") return "bg-red-50 border-red-100 text-[#DC2626]";
  return "bg-amber-50 border-amber-100 text-[#B45309]";
}

export function preparationTraceLabel(status: PreparationTraceStatus) {
  if (status === "done") return "已留痕";
  if (status === "risk") return "留痕缺失";
  return "待确认";
}
