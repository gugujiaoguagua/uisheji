export type MessageCategory = "system" | "task" | "approval" | "training";
export type QuickFilter = "all" | "unread" | "urgent";
export type MessageUrgency = "urgent" | "warning" | "normal";
export type ReceiptStatus = "pending" | "processing" | "done";
export type ReceiptItemStatus = "done" | "pending" | "risk";

export interface MessageLink {
  label: string;
  path: string;
  desc: string;
  emphasis?: "primary" | "secondary";
}

export interface ReceiptTimelineItem {
  label: string;
  owner: string;
  time: string;
  status: ReceiptItemStatus;
  note: string;
}

export interface MessageReceipt {
  status: ReceiptStatus;
  code: string;
  updatedAt: string;
  summary: string;
  items: ReceiptTimelineItem[];
}

export interface MessageItem {
  id: string;
  type: string;
  category: MessageCategory;
  title: string;
  body: string;
  summary: string;
  time: string;
  unread: boolean;
  urgency: MessageUrgency;
  sender: string;
  action: string;
  path: string;
  sourceBusiness: string;
  sourceChain: string[];
  tags: string[];
  detailPoints: string[];
  suggestedActions: string[];
  relatedLinks: MessageLink[];
  receipt: MessageReceipt;
}

export const messages: MessageItem[] = [
  {
    id: "m1",
    type: "sync",
    category: "system",
    title: "【系统通知】防水规范 v3.1 需要你确认",
    body: "防水产品施工规范已更新至 v3.1，新增 2 类禁用材料，请确认已阅读并了解变更内容。",
    summary: "这条消息的重点不是“看过公告”本身，而是确认更新已经同步到门店、培训和后续审单标准。",
    time: "今天 09:15",
    unread: true,
    urgency: "urgent",
    sender: "信息同步中心",
    action: "去确认",
    path: "/workbench/info-sync",
    sourceBusiness: "信息同步闭环",
    sourceChain: ["信息同步中心", "影响范围确认", "培训运营替换", "重学 / 复测触发"],
    tags: ["版本更新", "禁用材料", "需确认"],
    detailPoints: [
      "本次更新新增 2 类禁用材料，并同步调整了现场解释口径。",
      "如果只确认消息、不追齐未确认人员，门店仍可能继续讲旧版本内容。",
      "后续需要联动培训运营和题库替换，避免售后继续出现版本断层。",
    ],
    suggestedActions: [
      "先去信息同步中心查看谁还未确认。",
      "检查课件、题库和陪练是否已经切到 v3.1。",
      "必要时发起重学和复测任务。",
    ],
    relatedLinks: [
      { label: "去信息同步中心", path: "/workbench/info-sync", desc: "查看变更影响、确认进度和关联动作", emphasis: "primary" },
      { label: "看更新记录", path: "/workbench/info-sync/records", desc: "追溯版本发布和确认历史" },
      { label: "去培训运营", path: "/workbench/content-ops", desc: "核对课件 / 题库 / 陪练替换情况" },
    ],
    receipt: {
      status: "processing",
      code: "MSG-SYNC-031",
      updatedAt: "今天 09:20",
      summary: "信息同步中心已推送更新，但门店仍有 4 人未确认，培训替换动作进行中。",
      items: [
        { label: "版本公告发布", owner: "信息同步中心", time: "今天 09:15", status: "done", note: "v3.1 已推送到相关角色。" },
        { label: "影响范围确认", owner: "门店 / 店长", time: "今天 09:20", status: "pending", note: "仍有 4 人未点确认。" },
        { label: "培训内容替换", owner: "培训运营", time: "今天 10:30 前", status: "pending", note: "课件和题库正在切版。" },
      ],
    },
  },
  {
    id: "m2",
    type: "task",
    category: "task",
    title: "【任务消息】你有 3 名团队成员处于高风险",
    body: "李明、王芳本周连续未完成必修课，建议今天联系跟进，下周有产品推介活动。",
    summary: "这条消息需要从“通知”升级成“带教动作”，最好直接联动风险名单和带教任务，不要只停留在提醒。",
    time: "今天 08:30",
    unread: true,
    urgency: "urgent",
    sender: "带教看板",
    action: "查看名单",
    path: "/workbench/dashboard/risk",
    sourceBusiness: "带教看板风险链路",
    sourceChain: ["带教看板", "风险名单", "带教任务", "结果反馈"],
    tags: ["高风险成员", "需催办", "带教跟进"],
    detailPoints: [
      "风险成员连续未完成必修课，且下周有新品推介活动。",
      "如果今天不跟进，消息就会变成业务损失，不只是学习逾期。",
      "建议同时建立带教任务和催办记录，避免沟通只停留在口头。",
    ],
    suggestedActions: [
      "先去风险名单确认风险原因和优先级。",
      "同步建立带教任务，明确谁跟、何时复查。",
      "必要时发消息催办并记录处理回执。",
    ],
    relatedLinks: [
      { label: "去风险名单", path: "/workbench/dashboard/risk", desc: "查看 3 名成员的风险详情", emphasis: "primary" },
      { label: "去带教任务页", path: "/workbench/dashboard/tasks", desc: "建立任务和复查节点" },
      { label: "看经营总览", path: "/workbench/dashboard/business", desc: "从管理层视角看整体风险影响" },
    ],
    receipt: {
      status: "pending",
      code: "MSG-TASK-118",
      updatedAt: "待处理",
      summary: "当前还没有形成正式回执，系统只记录了风险提醒。",
      items: [
        { label: "风险识别", owner: "带教看板", time: "今天 08:30", status: "done", note: "系统已识别高风险成员。" },
        { label: "建立带教任务", owner: "店长 / 带教", time: "待处理", status: "pending", note: "需形成明确跟进任务。" },
        { label: "催办结果回写", owner: "消息中心", time: "待处理", status: "risk", note: "尚未记录沟通结果。" },
      ],
    },
  },
  {
    id: "m3",
    type: "exam",
    category: "training",
    title: "【培训通知】防水产品专项测试本周截止",
    body: "你尚未完成“防水施工规范 v3.1 专项测试”，请在本周五前完成，否则将影响操作权限。",
    summary: "这是标准的“通知 + 截止 + 权限影响”类消息，详情态需要把截止时间、后果和补救路径都说清楚。",
    time: "昨天 18:00",
    unread: true,
    urgency: "warning",
    sender: "考核系统",
    action: "立即参加",
    path: "/learning/assessment",
    sourceBusiness: "学习考核链路",
    sourceChain: ["课程更新", "专项测试", "结果反馈", "权限影响"],
    tags: ["专项测试", "截止提醒", "权限影响"],
    detailPoints: [
      "本周五前未完成专项测试，会影响相关操作权限。",
      "这类消息需要能直接跳到考核页，而不是让用户再手动找入口。",
      "处理回执应该明确“已开始 / 已完成 / 待补考”三种状态。",
    ],
    suggestedActions: [
      "优先进入考核页完成专项测试。",
      "若来不及完成，提前查看是否需要补考安排。",
      "完成后回消息中心确认回执状态是否已更新。",
    ],
    relatedLinks: [
      { label: "去考核页", path: "/learning/assessment", desc: "直接参加专项测试", emphasis: "primary" },
      { label: "去复测 / 补考页", path: "/learning/growth/retest-makeup", desc: "查看补救路径" },
      { label: "去成长页", path: "/learning/growth", desc: "查看近期学习与补训状态" },
    ],
    receipt: {
      status: "processing",
      code: "MSG-TRAIN-052",
      updatedAt: "昨天 18:05",
      summary: "系统已推送测试提醒，但用户尚未开始答题，当前为待处理中的提醒回执。",
      items: [
        { label: "测试任务发布", owner: "考核系统", time: "昨天 18:00", status: "done", note: "专项测试已发布。" },
        { label: "用户开始作答", owner: "学员本人", time: "待处理", status: "pending", note: "当前尚未开始。" },
        { label: "结果同步权限状态", owner: "系统", time: "测试完成后", status: "pending", note: "完成后自动回写。" },
      ],
    },
  },
  {
    id: "m4",
    type: "retrain",
    category: "training",
    title: "【培训通知】陶瓷砖防滑规范已更新，请重学",
    body: "你之前学习的内容涉及本次 v2.3 更新，建议重学“云岚石暖冬系列参数手册”，确保内容与最新版一致。",
    summary: "这类消息不只是课程提醒，还应串起“版本更新 -> 重学 -> 复测”的完整业务链路。",
    time: "2天前",
    unread: false,
    urgency: "warning",
    sender: "学习中心",
    action: "去重学",
    path: "/learning/growth/retrain",
    sourceBusiness: "版本更新后的重学链路",
    sourceChain: ["版本变更", "重学任务", "复测", "案例回流"],
    tags: ["重学", "参数规范", "版本联动"],
    detailPoints: [
      "本次更新影响你已学过的参数规范内容。",
      "如果只重学不复测，后续消息中心仍难判断是否真正消化。",
      "建议把重学消息和版本源头、复测任务关联起来。",
    ],
    suggestedActions: [
      "先进入重学任务页查看必修内容。",
      "完成课程后再关注是否生成复测。",
      "必要时查看设计规范页组补相关防错内容。",
    ],
    relatedLinks: [
      { label: "去重学任务页", path: "/learning/growth/retrain", desc: "查看本次版本变更对应的重学任务", emphasis: "primary" },
      { label: "去课程详情", path: "/learning/course/1", desc: "打开关联课程内容" },
      { label: "去设计规范专区", path: "/learning/design-standards", desc: "补相关规范和防错训练" },
    ],
    receipt: {
      status: "done",
      code: "MSG-RETRAIN-021",
      updatedAt: "昨天 20:10",
      summary: "用户已进入重学任务页并完成课程确认，等待后续复测安排。",
      items: [
        { label: "重学任务生成", owner: "学习中心", time: "2天前", status: "done", note: "任务已自动生成。" },
        { label: "课程重新学习", owner: "学员本人", time: "昨天 20:05", status: "done", note: "已完成重学确认。" },
        { label: "复测任务补发", owner: "系统", time: "待排期", status: "pending", note: "如版本影响较大，后续会补发复测。" },
      ],
    },
  },
  {
    id: "m5",
    type: "order",
    category: "task",
    title: "【任务消息】订单 #2024-0312 需要你处理",
    body: "张国栋提交的订单存在参数异常，规格与设计图不符，工厂已暂停生产，需要你进行确认和处理。",
    summary: "这类消息不能只跳到审单列表，详情态应该让人一眼看到准备页、标注页和校验页分别去哪。",
    time: "2天前",
    unread: false,
    urgency: "urgent",
    sender: "审单系统",
    action: "处理订单",
    path: "/workbench/order-review/preparation/o1",
    sourceBusiness: "审单回流链路",
    sourceChain: ["审单任务", "下单准备", "问题标注", "工艺校验", "培训回流"],
    tags: ["订单异常", "规格冲突", "需追责"],
    detailPoints: [
      "当前高风险项是订单规格与设计图不一致，工厂已经暂停生产。",
      "处理时要先看下单准备，再做问题标注和工艺校验，不能直接跳过前置确认。",
      "这类消息最好保留处理回执，说明谁补了字段、谁确认了版本。",
    ],
    suggestedActions: [
      "先去下单准备页确认关键字段和责任留痕。",
      "再去问题标注页固化异常类型。",
      "最后进入工艺 / 生产数据校验页完成闭环。",
    ],
    relatedLinks: [
      { label: "去下单准备页", path: "/workbench/order-review/preparation/o1", desc: "先补关键字段和节点提醒", emphasis: "primary" },
      { label: "去问题标注页", path: "/workbench/order-review/annotation/o1", desc: "固化异常类型与证据" },
      { label: "去工艺校验页", path: "/workbench/order-review/validation/o1", desc: "查看图纸 / 报价 / 生产数据对照" },
    ],
    receipt: {
      status: "processing",
      code: "MSG-ORDER-077",
      updatedAt: "2天前 16:20",
      summary: "订单已被系统拦截并进入审单处理，但设计图版本确认仍未完全完成。",
      items: [
        { label: "系统拦截异常单", owner: "审单系统", time: "2天前 15:55", status: "done", note: "已暂停生产。" },
        { label: "下单准备补字段", owner: "门店销售 / 设计协同", time: "进行中", status: "pending", note: "仍待统一图纸版本。" },
        { label: "处理回执回写", owner: "消息中心", time: "待完成", status: "pending", note: "完成后需通知相关角色。" },
      ],
    },
  },
  {
    id: "m8",
    type: "approval",
    category: "approval",
    title: "【审批消息】王芳转工作人员申请待你初审",
    body: "系统已带出课程完成率、考核通过率与 AI 陪练次数，请在今天内完成首轮审批。",
    summary: "审批类消息最怕只剩一条提醒，所以详情态里要把审批当前节点、需要谁处理、处理后回执写清楚。",
    time: "今天 10:05",
    unread: true,
    urgency: "urgent",
    sender: "审批·申请中心",
    action: "去审批",
    path: "/workbench/approvals",
    sourceBusiness: "身份申请审批链路",
    sourceChain: ["发起申请", "首轮审批", "终审", "身份生效通知"],
    tags: ["转工作人员", "待初审", "身份变化"],
    detailPoints: [
      "系统已自动带出学习完成率、考核通过率与 AI 陪练次数。",
      "今天内未完成首轮审批，后续身份切换和任务承接会一起延后。",
      "审批完成后还需要给申请人发身份生效提醒，避免只停留在审批页。",
    ],
    suggestedActions: [
      "先进入审批中心完成首轮审批。",
      "关注审批完成后的身份状态同步。",
      "必要时去“我的”里确认历史申请留痕。",
    ],
    relatedLinks: [
      { label: "去审批中心", path: "/workbench/approvals", desc: "完成首轮审批动作", emphasis: "primary" },
      { label: "看审批状态", path: "/profile/approval-status", desc: "追踪当前流转节点与状态" },
      { label: "看转工作人员申请页", path: "/profile/staff-transfer", desc: "核对申请原始信息" },
    ],
    receipt: {
      status: "pending",
      code: "MSG-APV-014",
      updatedAt: "待处理",
      summary: "审批消息已发送，但当前还没有首轮审批回执。",
      items: [
        { label: "审批消息生成", owner: "审批中心", time: "今天 10:05", status: "done", note: "已推送给当前审批人。" },
        { label: "首轮审批", owner: "当前审批人", time: "今天内", status: "pending", note: "需在今天内完成。" },
        { label: "身份生效通知", owner: "系统 / 消息中心", time: "审批通过后", status: "risk", note: "若不通知，申请人可能不知道需要切换身份。" },
      ],
    },
  },
  {
    id: "m9",
    type: "approval-progress",
    category: "approval",
    title: "【审批消息】陈涛权限补开已通过，待通知身份生效",
    body: "审批动作已完成，但仍需提醒申请人切换到工作人员视角，避免任务承接断档。",
    summary: "这类消息说明消息中心不只是提醒入口，也要承接“审批已完成后的结果通知和留痕”。",
    time: "今天 09:40",
    unread: true,
    urgency: "warning",
    sender: "审批·申请中心",
    action: "查看流转",
    path: "/profile/approval-status",
    sourceBusiness: "审批完成后的结果同步",
    sourceChain: ["审批通过", "结果同步", "身份生效通知", "历史留痕"],
    tags: ["审批已通过", "待通知", "身份切换"],
    detailPoints: [
      "审批动作已完成，但申请人仍未收到身份切换提醒。",
      "如果消息中心没有回执和处理记录，这类结果消息很容易被忽略。",
      "建议把结果通知是否送达也作为一条回执记录。",
    ],
    suggestedActions: [
      "先核对审批状态时间线。",
      "再通知申请人切换身份并确认收到。",
      "在消息中心回写处理结果，方便后续追溯。",
    ],
    relatedLinks: [
      { label: "看审批状态时间线", path: "/profile/approval-status", desc: "确认当前已经通过的节点", emphasis: "primary" },
      { label: "去我的页面", path: "/profile", desc: "核对身份展示是否已更新" },
      { label: "回审批中心", path: "/workbench/approvals", desc: "查看其他待处理审批" },
    ],
    receipt: {
      status: "processing",
      code: "MSG-APV-019",
      updatedAt: "今天 09:45",
      summary: "审批通过已经回写，但申请人尚未确认身份切换通知。",
      items: [
        { label: "审批通过", owner: "审批中心", time: "今天 09:40", status: "done", note: "权限补开已通过。" },
        { label: "消息通知申请人", owner: "消息中心", time: "今天 09:45", status: "done", note: "已发出生效提醒。" },
        { label: "申请人确认切换", owner: "申请人", time: "待确认", status: "pending", note: "仍需确认是否已切换身份。" },
      ],
    },
  },
];

export function receiptStatusLabel(status: ReceiptStatus) {
  if (status === "done") return "已回执";
  if (status === "processing") return "处理中";
  return "待回执";
}

export function receiptStatusTone(status: ReceiptStatus) {
  if (status === "done") return "bg-green-50 border-green-100 text-[#15803D]";
  if (status === "processing") return "bg-amber-50 border-amber-100 text-[#B45309]";
  return "bg-red-50 border-red-100 text-[#DC2626]";
}

export function receiptItemTone(status: ReceiptItemStatus) {
  if (status === "done") return "bg-green-50 border-green-100 text-[#15803D]";
  if (status === "risk") return "bg-red-50 border-red-100 text-[#DC2626]";
  return "bg-amber-50 border-amber-100 text-[#B45309]";
}
