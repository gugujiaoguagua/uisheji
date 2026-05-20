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
    sourceChain: ["信息同步中心", "影响范围确认", "社区运营替换", "重学 / 复测触发"],
    tags: ["版本更新", "禁用材料", "需确认"],
    detailPoints: [
      "本次更新新增 2 类禁用材料，并同步调整了现场解释口径。",
      "如果只确认消息、不追齐未确认人员，门店仍可能继续讲旧版本内容。",
      "后续需要联动社区运营和题库替换，避免售后继续出现版本断层。",
    ],
    suggestedActions: [
      "先去信息同步中心查看谁还未确认。",
      "检查课件、题库和陪练是否已经切到 v3.1。",
      "必要时发起重学和复测任务。",
    ],
    relatedLinks: [
      { label: "去信息同步中心", path: "/workbench/info-sync", desc: "查看变更影响、确认进度和关联动作", emphasis: "primary" },
      { label: "看更新记录", path: "/workbench/info-sync/records", desc: "追溯版本发布和确认历史" },
      { label: "去社区运营", path: "/workbench/content-ops", desc: "核对课件 / 题库 / 陪练替换情况" },
    ],
    receipt: {
      status: "processing",
      code: "MSG-SYNC-031",
      updatedAt: "今天 09:20",
      summary: "信息同步中心已推送更新，但门店仍有 4 人未确认，培训替换动作进行中。",
      items: [
        { label: "版本公告发布", owner: "信息同步中心", time: "今天 09:15", status: "done", note: "v3.1 已推送到相关角色。" },
        { label: "影响范围确认", owner: "门店 / 店长", time: "今天 09:20", status: "pending", note: "仍有 4 人未点确认。" },
        { label: "培训内容替换", owner: "社区运营", time: "今天 10:30 前", status: "pending", note: "课件和题库正在切版。" },
      ],
    },
  },
  {
    id: "m2",
    type: "task",
    category: "task",
    title: "【任务消息】你有 3 名团队成员处于高风险",
    body: "李明、王芳本周连续未完成必修课，建议今天联系跟进，下周有产品推介活动。",
    summary: "这条消息需要从“通知”升级成“带教动作”，最好直接联动风险名单和运营任务，不要只停留在提醒。",
    time: "今天 08:30",
    unread: true,
    urgency: "urgent",
    sender: "异常看板",
    action: "查看名单",
    path: "/workbench/dashboard/risk",
    sourceBusiness: "异常看板风险链路",
    sourceChain: ["异常看板", "风险名单", "运营任务", "结果反馈"],
    tags: ["高风险成员", "需催办", "带教跟进"],
    detailPoints: [
      "风险成员连续未完成必修课，且下周有新品推介活动。",
      "如果今天不跟进，消息就会变成业务损失，不只是学习逾期。",
      "建议同时建立运营任务和催办记录，避免沟通只停留在口头。",
    ],
    suggestedActions: [
      "先去风险名单确认风险原因和优先级。",
      "同步建立运营任务，明确谁跟、何时复查。",
      "必要时发消息催办并记录处理回执。",
    ],
    relatedLinks: [
      { label: "去风险名单", path: "/workbench/dashboard/risk", desc: "查看 3 名成员的风险详情", emphasis: "primary" },
      { label: "去运营任务页", path: "/workbench/dashboard/tasks", desc: "建立任务和复查节点" },
      { label: "看经营总览", path: "/workbench/dashboard/business", desc: "从管理层视角看整体风险影响" },
    ],
    receipt: {
      status: "pending",
      code: "MSG-TASK-118",
      updatedAt: "待处理",
      summary: "当前还没有形成正式回执，系统只记录了风险提醒。",
      items: [
        { label: "风险识别", owner: "异常看板", time: "今天 08:30", status: "done", note: "系统已识别高风险成员。" },
        { label: "建立运营任务", owner: "店长 / 带教", time: "待处理", status: "pending", note: "需形成明确跟进任务。" },
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

export const trainingTeacherMessages: MessageItem[] = [
  {
    id: "tt-m1",
    type: "task",
    category: "task",
    title: "【学员跟进】王予总分 59，需要今天联系",
    body: "王予在销售新人15天班第 11 天，需求追问 49、开场破冰 54、服务意识 57，属于红色学员。",
    summary: "这条消息直接面向培训老师，不再提醒运营或审单事项，而是告诉老师今天先跟进哪位学员。",
    time: "今天 09:20",
    unread: true,
    urgency: "urgent",
    sender: "学员培养看板",
    action: "查看学员",
    path: "/workbench/dashboard",
    sourceBusiness: "学员培养闭环",
    sourceChain: ["演练评分", "学员看板", "老师联系", "复练安排"],
    tags: ["红色学员", "需电话跟进", "需求追问"],
    detailPoints: [
      "王予的最低分项是需求追问 49 分，客户说预算高后没有继续拆需求。",
      "建议先电话确认真实卡点，再安排一次需求追问专项复练。",
      "处理后需要在学员详情里回看总分和最低分项是否改善。",
    ],
    suggestedActions: [
      "打开学员看板查看王予分项评分。",
      "先打电话确认卡点，再补发针对性复练。",
      "复练后回看需求追问是否超过 60 分。",
    ],
    relatedLinks: [
      { label: "去学员看板", path: "/workbench/dashboard", desc: "查看王予分项评分和真实考核情况", emphasis: "primary" },
      { label: "去演练评分", path: "/workbench/dashboard", desc: "继续处理学员演练分数" },
    ],
    receipt: {
      status: "pending",
      code: "TT-STUDENT-059",
      updatedAt: "待处理",
      summary: "系统已识别红色学员，但老师还未记录联系或复练动作。",
      items: [
        { label: "红色学员识别", owner: "学员培养看板", time: "今天 09:20", status: "done", note: "王予总分低于 60。" },
        { label: "老师联系学员", owner: "培训老师", time: "今天内", status: "pending", note: "建议先电话跟进。" },
        { label: "复练结果回写", owner: "演练评分", time: "复练后", status: "risk", note: "暂无复练结果。" },
      ],
    },
  },
  {
    id: "tt-m2",
    type: "exam",
    category: "training",
    title: "【演练评分】3 份新人接待流程待评分",
    body: "销售新人15天班有 3 份完整接待流程演练需要今天评分，重点看开场破冰、需求追问、报价边界和服务意识。",
    summary: "培训老师需要进入评分看板，看每个学员每一项分数和真实考核情况，而不是只看到一个待办数字。",
    time: "今天 08:50",
    unread: true,
    urgency: "urgent",
    sender: "演练评分系统",
    action: "进入评分",
    path: "/workbench/dashboard",
    sourceBusiness: "演练评分闭环",
    sourceChain: ["新人演练", "分项评分", "学员看板", "补训动作"],
    tags: ["待评分", "新人接待", "分项考核"],
    detailPoints: [
      "待评分内容来自新人完整接待流程，不是课程签到。",
      "评分完成后会影响学员看板里的总分、最低分项和跟进动作。",
      "低于 60 分的项目需要被拆成后续复练任务。",
    ],
    suggestedActions: [
      "先完成 3 份演练评分。",
      "对低分项写清楚真实考核表现。",
      "评分后回到学员看板确认红色学员排序。",
    ],
    relatedLinks: [
      { label: "进入学员看板", path: "/workbench/dashboard", desc: "查看待评分学员和分项结果", emphasis: "primary" },
    ],
    receipt: {
      status: "processing",
      code: "TT-SCORE-003",
      updatedAt: "今天 08:55",
      summary: "评分任务已推送，仍有 3 份未完成。",
      items: [
        { label: "演练提交", owner: "新人学员", time: "今天 08:40", status: "done", note: "3 份完整流程已提交。" },
        { label: "老师评分", owner: "培训老师", time: "今天内", status: "pending", note: "等待分项评分。" },
        { label: "补训建议生成", owner: "系统", time: "评分后", status: "pending", note: "根据低分项生成。" },
      ],
    },
  },
  {
    id: "tt-m3",
    type: "sync",
    category: "system",
    title: "【公司产品】防水施工规范 v3.1 需要看完确认",
    body: "现场工艺图片和防水施工说明已更新，培训老师看完后需要确认，并检查课件、题库和陪练口径是否同步。",
    summary: "产品更新对培训老师的重点是看图、看说明、确认已读，并决定是否要拆到课件、题库和复练场景。",
    time: "今天 09:10",
    unread: true,
    urgency: "warning",
    sender: "公司产品更新",
    action: "看产品",
    path: "/workbench/info-sync",
    sourceBusiness: "产品更新同步",
    sourceChain: ["公司产品", "老师确认", "课件题库", "陪练场景"],
    tags: ["现场工艺", "看完确认", "题库同步"],
    detailPoints: [
      "本次更新包含现场工艺图和施工厚度变化说明。",
      "老师需要确认是否影响现有课件和演练题库。",
      "看完确认后，未同步的陪练场景需要继续追齐。",
    ],
    suggestedActions: [
      "进入公司产品页查看图片和详情。",
      "看完后点击确认。",
      "检查相关题库和陪练是否仍使用旧口径。",
    ],
    relatedLinks: [
      { label: "去公司产品", path: "/workbench/info-sync", desc: "查看产品图、详情和确认状态", emphasis: "primary" },
      { label: "看培训工作台", path: "/workbench", desc: "回到培训老师工作台" },
    ],
    receipt: {
      status: "processing",
      code: "TT-PRODUCT-031",
      updatedAt: "今天 09:15",
      summary: "产品更新已推送，等待培训老师看完确认。",
      items: [
        { label: "产品更新发布", owner: "产品资料库", time: "今天 09:10", status: "done", note: "防水施工规范 v3.1 已发布。" },
        { label: "老师看完确认", owner: "培训老师", time: "待处理", status: "pending", note: "尚未点击确认。" },
        { label: "课件题库追齐", owner: "培训老师", time: "确认后", status: "pending", note: "需判断是否拆到训练内容。" },
      ],
    },
  },
  {
    id: "tt-m4",
    type: "retrain",
    category: "training",
    title: "【补训提醒】李萌报价边界低于 60",
    body: "李萌最近演练总分 71，但报价边界 58，套餐内外和模块估价解释不稳定，需要安排一次模块报价复演练。",
    summary: "这条消息不是泛泛提示学习进度，而是提醒培训老师针对低分项拆补训。",
    time: "昨天 18:30",
    unread: false,
    urgency: "warning",
    sender: "学员看板",
    action: "安排复练",
    path: "/workbench/dashboard",
    sourceBusiness: "补训闭环",
    sourceChain: ["分项低分", "老师判断", "补训安排", "复练评分"],
    tags: ["报价边界", "需跟进", "复练"],
    detailPoints: [
      "李萌整体进度不低，但报价边界低于 60 分。",
      "建议不要重新学整套课程，而是只拆模块报价和边界解释。",
      "复练结果要回到学员看板里更新最低分项。",
    ],
    suggestedActions: [
      "进入学员看板查看李萌详情。",
      "安排一次模块报价复演练。",
      "复练后重新评分报价边界。",
    ],
    relatedLinks: [
      { label: "查看李萌详情", path: "/workbench/dashboard", desc: "看分项评分和当前卡点", emphasis: "primary" },
      { label: "回培训待办", path: "/workbench", desc: "查看其它培训优先动作" },
    ],
    receipt: {
      status: "done",
      code: "TT-RETRAIN-071",
      updatedAt: "昨天 19:05",
      summary: "老师已查看学员详情，等待下一次复练评分。",
      items: [
        { label: "低分项识别", owner: "学员看板", time: "昨天 18:30", status: "done", note: "报价边界 58。" },
        { label: "老师查看详情", owner: "培训老师", time: "昨天 19:05", status: "done", note: "已进入学员详情。" },
        { label: "复练评分", owner: "演练评分", time: "待安排", status: "pending", note: "尚无新评分。" },
      ],
    },
  },
  {
    id: "tt-m5",
    type: "task",
    category: "task",
    title: "【案例沉淀】优秀方案讲解案例待入库",
    body: "设计总监复盘材料已上传，需要培训老师补齐评分亮点、讲解亮点和可复用话术，沉淀到案例库。",
    summary: "培训老师收到的是案例沉淀任务，不是运营任务；重点是把优秀接待片段转成可复用教学素材。",
    time: "2天前",
    unread: false,
    urgency: "normal",
    sender: "案例沉淀",
    action: "收案例",
    path: "/workbench/content-ops",
    sourceBusiness: "优秀案例沉淀",
    sourceChain: ["优秀演练", "老师复盘", "案例入库", "学员复用"],
    tags: ["案例入库", "讲解亮点", "复用话术"],
    detailPoints: [
      "当前材料已上传，但缺少老师视角的评分亮点。",
      "案例需要能回到学员看板和后续补训使用。",
      "入库时要写清适用场景，避免只存一段好话术。",
    ],
    suggestedActions: [
      "查看已上传复盘材料。",
      "补齐评分亮点和讲解亮点。",
      "把可复用话术沉淀到案例库。",
    ],
    relatedLinks: [
      { label: "去案例沉淀", path: "/workbench/content-ops", desc: "补齐案例亮点并入库", emphasis: "primary" },
      { label: "看学员看板", path: "/workbench/dashboard", desc: "确认案例可用于哪些学员" },
    ],
    receipt: {
      status: "pending",
      code: "TT-CASE-015",
      updatedAt: "待处理",
      summary: "案例材料已上传，但老师尚未完成入库说明。",
      items: [
        { label: "复盘材料上传", owner: "设计总监", time: "2天前", status: "done", note: "材料已进入待入库。" },
        { label: "老师补齐亮点", owner: "培训老师", time: "待处理", status: "pending", note: "评分亮点和话术仍待补。" },
        { label: "案例可复用", owner: "案例库", time: "入库后", status: "pending", note: "等待沉淀完成。" },
      ],
    },
  },
];

export const communityOpsMessages: MessageItem[] = [
  {
    id: "ops-m1",
    type: "task",
    category: "task",
    title: "【运营预警】临港星河湾群人数低于目标线",
    body: "当前 101 / 240，低于 50% 目标线且 2 天无增长，今天需要补资源入口和群内拉新动作。",
    summary: "这条消息只面向运营角色，第一优先级是小区增长风险和负责人动作，不混入培训、审单消息。",
    time: "今天 09:30",
    unread: true,
    urgency: "urgent",
    sender: "社区运营异常看板",
    action: "查看异常",
    path: "/workbench/dashboard",
    sourceBusiness: "社区运营风险闭环",
    sourceChain: ["异常识别", "风险名单", "运营任务", "结果回写"],
    tags: ["群人数", "红色风险", "需拉新"],
    detailPoints: [
      "群人数低于目标线，且连续 2 天没有新增。",
      "需要先确认资源入口是否断档，再拆门店和小区负责人动作。",
      "处理后应回写群人数变化和拉新来源。",
    ],
    suggestedActions: ["查看异常看板", "拆运营任务", "记录负责人和截止时间"],
    relatedLinks: [
      { label: "去异常看板", path: "/workbench/dashboard", desc: "查看红色小区和负责人", emphasis: "primary" },
      { label: "去运营任务", path: "/workbench/dashboard/tasks", desc: "拆分今日处理动作" },
    ],
    receipt: {
      status: "pending",
      code: "OPS-RISK-101",
      updatedAt: "待处理",
      summary: "风险已识别，但还未形成负责人动作回执。",
      items: [
        { label: "异常识别", owner: "异常看板", time: "今天 09:30", status: "done", note: "群人数低于目标线。" },
        { label: "拆运营任务", owner: "运营负责人", time: "今天内", status: "pending", note: "需明确负责人和动作。" },
        { label: "结果回写", owner: "消息中心", time: "处理后", status: "risk", note: "暂无拉新结果。" },
      ],
    },
  },
  {
    id: "ops-m2",
    type: "task",
    category: "task",
    title: "【数据治理】群人数 / 添加微信跨表口径不一致",
    body: "嘉定云著销售明细与月度汇总不一致，先做口径校验，再判断转化是否异常。",
    summary: "运营要先解决数据来源和口径问题，否则看板数字会误导任务优先级。",
    time: "今天 08:40",
    unread: true,
    urgency: "urgent",
    sender: "数据治理",
    action: "去对账",
    path: "/workbench/content-ops",
    sourceBusiness: "运营数据治理",
    sourceChain: ["明细数据", "汇总口径", "异常判断", "任务拆解"],
    tags: ["口径不一致", "添加微信", "需对账"],
    detailPoints: [
      "销售明细和月度汇总当前对不上。",
      "如果直接看转化率，可能把统计口径问题误判为业务执行问题。",
      "需要确认数据来源、统计周期和负责人。",
    ],
    suggestedActions: ["进入数据治理页", "确认明细与汇总口径", "对账后再拆转化任务"],
    relatedLinks: [
      { label: "去数据治理", path: "/workbench/content-ops", desc: "查看口径校验项", emphasis: "primary" },
      { label: "去运营总览", path: "/workbench/dashboard/business", desc: "回看整体指标影响" },
    ],
    receipt: {
      status: "processing",
      code: "OPS-DATA-024",
      updatedAt: "今天 08:55",
      summary: "数据异常已进入对账，等待负责人补齐来源说明。",
      items: [
        { label: "口径异常发现", owner: "数据治理", time: "今天 08:40", status: "done", note: "明细与汇总不一致。" },
        { label: "来源确认", owner: "运营负责人", time: "今天内", status: "pending", note: "需确认统计周期。" },
        { label: "任务拆解", owner: "运营任务", time: "对账后", status: "pending", note: "对账完成后再判断是否拆任务。" },
      ],
    },
  },
  {
    id: "ops-m3",
    type: "sync",
    category: "system",
    title: "【公司产品】防水施工规范 v3.1 影响现场话术",
    body: "防水施工规范更新会影响社区运营现场解释口径，需要确认活动话术和门店素材是否同版。",
    summary: "运营看到的是现场口径同步，而不是培训老师的课件拆解。",
    time: "今天 09:10",
    unread: true,
    urgency: "warning",
    sender: "信息同步中心",
    action: "看口径",
    path: "/workbench/info-sync",
    sourceBusiness: "运营公司产品同步",
    sourceChain: ["产品更新", "运营话术", "门店素材", "现场执行"],
    tags: ["现场话术", "素材同版", "需确认"],
    detailPoints: [
      "本次更新会影响社区活动中的防水解释口径。",
      "运营需要确认门店素材和活动话术是否已经替换。",
      "未替换素材的门店需要单独提醒。",
    ],
    suggestedActions: ["查看公司产品更新", "确认门店素材是否同版", "提醒未确认门店"],
    relatedLinks: [
      { label: "去公司产品", path: "/workbench/info-sync", desc: "查看产品图和更新说明", emphasis: "primary" },
      { label: "去社区运营", path: "/workbench/content-ops", desc: "确认素材和现场动作" },
    ],
    receipt: {
      status: "processing",
      code: "OPS-SYNC-031",
      updatedAt: "今天 09:15",
      summary: "口径已推送，等待运营确认门店素材是否同版。",
      items: [
        { label: "规范更新发布", owner: "信息同步中心", time: "今天 09:10", status: "done", note: "v3.1 已发布。" },
        { label: "门店素材确认", owner: "运营负责人", time: "待处理", status: "pending", note: "素材是否同版待确认。" },
        { label: "现场执行提醒", owner: "社区运营", time: "确认后", status: "pending", note: "待通知门店。" },
      ],
    },
  },
  {
    id: "ops-m4",
    type: "task",
    category: "training",
    title: "【新人培养】活动复盘模板待补齐",
    body: "直播、视频号和活动筹备资料散落，需要归到运营新人阶段培养路径，方便新人按阶段释放能力。",
    summary: "这条消息属于运营新人培养，不是培训老师的演练评分。",
    time: "昨天 17:20",
    unread: true,
    urgency: "warning",
    sender: "新人培养",
    action: "看培养",
    path: "/workbench/content-ops",
    sourceBusiness: "运营新人培养",
    sourceChain: ["资料整理", "阶段路径", "能力门槛", "上岗释放"],
    tags: ["新人培养", "活动复盘", "资料归档"],
    detailPoints: [
      "活动资料目前散落，无法支撑新人按阶段学习。",
      "需要把直播、视频号、活动筹备和复盘资料归到阶段路径。",
      "每个阶段要有明确释放门槛。",
    ],
    suggestedActions: ["进入新人培养页", "归档活动复盘模板", "补齐阶段能力门槛"],
    relatedLinks: [
      { label: "去新人培养", path: "/workbench/content-ops", desc: "整理运营新人阶段路径", emphasis: "primary" },
      { label: "去学习中心", path: "/learning", desc: "查看运营课程承接" },
    ],
    receipt: {
      status: "pending",
      code: "OPS-ENABLE-017",
      updatedAt: "待处理",
      summary: "培养资料待归档，暂无完成回执。",
      items: [
        { label: "资料缺口识别", owner: "新人培养", time: "昨天 17:20", status: "done", note: "活动资料散落。" },
        { label: "阶段路径整理", owner: "运营负责人", time: "本周内", status: "pending", note: "需补齐模板。" },
        { label: "能力门槛确认", owner: "社区运营", time: "整理后", status: "pending", note: "待确认释放标准。" },
      ],
    },
  },
];

export const designerMessages: MessageItem[] = [
  {
    id: "designer-m1",
    type: "task",
    category: "task",
    title: "【销设协同】客户李总方案缺防滑等级确认",
    body: "销售交接只记录了老人安全诉求，设计侧需要在会审前补齐卫浴区防滑等级、现场图和讲解口径。",
    summary: "这条消息只面向设计师，重点是会审前把需求、图纸和讲法对齐，不混入运营或培训事项。",
    time: "今天 09:20",
    unread: true,
    urgency: "urgent",
    sender: "销设协同",
    action: "去补齐",
    path: "/workbench/collab",
    sourceBusiness: "销售-设计协同",
    sourceChain: ["销售交接", "设计确认", "会审准备", "客户确认"],
    tags: ["会审前", "防滑等级", "需补资料"],
    detailPoints: [
      "客户核心顾虑是老人安全，但当前交接没有明确 R10/R11 选择。",
      "会审前需要补现场图、材料建议和解释顺序。",
      "补齐后再进入会审，避免客户认为设计没有承接真实需求。",
    ],
    suggestedActions: ["进入销设协同页", "补齐防滑等级和现场图", "同步会审讲解口径"],
    relatedLinks: [
      { label: "去销设协同", path: "/workbench/collab", desc: "查看交接信息并补齐设计侧确认", emphasis: "primary" },
      { label: "看会审记录", path: "/workbench/collab/records", desc: "确认会审决议和后续动作" },
    ],
    receipt: {
      status: "pending",
      code: "DESIGN-COLLAB-021",
      updatedAt: "待处理",
      summary: "销售交接已进入设计确认，但防滑等级和图示仍未补齐。",
      items: [
        { label: "销售提交交接", owner: "销售顾问", time: "今天 09:20", status: "done", note: "已提交客户顾虑。" },
        { label: "设计补齐资料", owner: "设计师", time: "今天内", status: "pending", note: "需补防滑等级和现场图。" },
        { label: "会审确认", owner: "设计师 / 销售", time: "补齐后", status: "pending", note: "等待会审统一讲法。" },
      ],
    },
  },
  {
    id: "designer-m2",
    type: "task",
    category: "task",
    title: "【方案会审】销售报价口径与设计方案不一致",
    body: "套餐内外、模块估价和方案图版本存在不一致，需要会审前统一客户能听懂的一版说法。",
    summary: "设计师看到的是报价和图纸一致性风险，处理目标是减少会审返工。",
    time: "今天 08:45",
    unread: true,
    urgency: "urgent",
    sender: "方案会审",
    action: "看会审",
    path: "/workbench/collab/records",
    sourceBusiness: "方案会审闭环",
    sourceChain: ["报价差异", "图纸版本", "会审决议", "复盘沉淀"],
    tags: ["报价一致性", "图纸版本", "会审风险"],
    detailPoints: [
      "客户会审前仍有两套报价解释顺序。",
      "设计图版本和销售推荐规格需要统一。",
      "会审后要把最终说法沉淀到案例和讲稿里。",
    ],
    suggestedActions: ["查看会审记录", "确认最终报价边界", "把统一口径回写到协同页"],
    relatedLinks: [
      { label: "去会审记录", path: "/workbench/collab/records", desc: "查看会审决议和责任人", emphasis: "primary" },
      { label: "去销设协同", path: "/workbench/collab", desc: "回看交接和设计补充" },
    ],
    receipt: {
      status: "processing",
      code: "DESIGN-REVIEW-014",
      updatedAt: "今天 08:55",
      summary: "已识别报价和图纸版本不一致，等待设计师确认最终版本。",
      items: [
        { label: "差异识别", owner: "方案会审", time: "今天 08:45", status: "done", note: "报价口径存在差异。" },
        { label: "设计确认版本", owner: "设计师", time: "今天内", status: "pending", note: "需确认最终图纸和模块边界。" },
        { label: "销售同步客户", owner: "销售顾问", time: "确认后", status: "pending", note: "等待统一话术。" },
      ],
    },
  },
  {
    id: "designer-m3",
    type: "sync",
    category: "system",
    title: "【公司产品】铝套盒与皮抽面组合升级需确认",
    body: "新品图示、适用场景和现场工艺说明已更新，设计师需要看完产品图和详情后再用于方案讲解。",
    summary: "设计师收到的是产品图和现场工艺确认，不需要进入运营口径或培训拆课。",
    time: "昨天 18:10",
    unread: true,
    urgency: "warning",
    sender: "公司产品",
    action: "看产品",
    path: "/workbench/info-sync",
    sourceBusiness: "公司产品更新",
    sourceChain: ["产品图示", "适用场景", "设计讲解", "客户确认"],
    tags: ["新品图示", "现场工艺", "看完确认"],
    detailPoints: [
      "本次更新影响方案图里的五金组合展示。",
      "设计师需要确认产品图、现场工艺和适用场景。",
      "确认后才能用于客户方案和会审讲解。",
    ],
    suggestedActions: ["查看公司产品页", "放大产品图核对细节", "看完后点击确认"],
    relatedLinks: [
      { label: "去公司产品", path: "/workbench/info-sync", desc: "查看产品图、详情和确认入口", emphasis: "primary" },
      { label: "去设计规范", path: "/learning/design-standards", desc: "同步看相关防错规则" },
    ],
    receipt: {
      status: "pending",
      code: "DESIGN-PRODUCT-008",
      updatedAt: "待处理",
      summary: "产品图已推送，等待设计师看完确认。",
      items: [
        { label: "产品更新发布", owner: "公司产品", time: "昨天 18:10", status: "done", note: "图示和详情已发布。" },
        { label: "设计师确认", owner: "设计师", time: "待处理", status: "pending", note: "尚未点击看完确认。" },
        { label: "方案使用", owner: "设计师", time: "确认后", status: "pending", note: "确认后用于客户方案。" },
      ],
    },
  },
];

export const salesMessages: MessageItem[] = [
  {
    id: "sales-m1",
    type: "task",
    category: "task",
    title: "【客户跟进】李总预算边界今天 16:00 前确认",
    body: "临港星河湾卫浴改造单还缺预算上限和防滑等级意向，确认后需要同步给设计师继续出方案。",
    summary: "销售看到的第一优先级是客户下一步动作，处理目标是把预算、顾虑和交付时间补齐后交给设计侧。",
    time: "今天 09:25",
    unread: true,
    urgency: "urgent",
    sender: "客户跟进",
    action: "去跟进",
    path: "/workbench/sales-followup",
    sourceBusiness: "客户跟进闭环",
    sourceChain: ["客户回访", "预算确认", "需求补齐", "设计交接"],
    tags: ["预算边界", "防滑等级", "今日回访"],
    detailPoints: [
      "客户关注老人安全和总价，先确认是否接受 R10 防滑款。",
      "回访后把预算上限、交付时间和客户顾虑同步给设计师。",
      "如果今天没有更新回访记录，设计侧会继续缺关键判断信息。",
    ],
    suggestedActions: ["进入客户跟进页", "补预算与防滑等级", "同步设计师继续出方案"],
    relatedLinks: [
      { label: "去客户跟进", path: "/workbench/sales-followup", desc: "记录回访结果和下一次动作", emphasis: "primary" },
      { label: "去销设协同", path: "/workbench/collab", desc: "把客户需求同步给设计师" },
    ],
    receipt: {
      status: "pending",
      code: "SALES-FOLLOW-016",
      updatedAt: "待处理",
      summary: "客户回访提醒已生成，等待销售补齐预算边界和防滑等级。",
      items: [
        { label: "回访提醒生成", owner: "客户跟进", time: "今天 09:25", status: "done", note: "已识别今日必须回访客户。" },
        { label: "销售确认预算", owner: "销售顾问", time: "今天 16:00 前", status: "pending", note: "预算上限和防滑等级未填写。" },
        { label: "同步设计师", owner: "销售顾问 / 设计师", time: "回访后", status: "pending", note: "等待补齐后进入设计方案。" },
      ],
    },
  },
  {
    id: "sales-m2",
    type: "task",
    category: "task",
    title: "【报价推进】张女士全屋瓷砖单缺一次报价回访",
    body: "设计方案已同步，但客户还没有确认大规格哑光砖报价，需要今天补一次报价解释和异议记录。",
    summary: "这条消息面向销售的报价推进，不是培训或审单提醒；重点是把客户异议和成交障碍记录清楚。",
    time: "今天 08:40",
    unread: true,
    urgency: "urgent",
    sender: "报价推进",
    action: "补回访",
    path: "/workbench/sales-followup",
    sourceBusiness: "报价推进链路",
    sourceChain: ["方案同步", "报价解释", "客户异议", "成交推进"],
    tags: ["报价回访", "客户异议", "成交推进"],
    detailPoints: [
      "客户已收到方案，但还没有确认大规格哑光砖报价。",
      "本次回访需要记录客户卡点，是价格、交期还是材料选择。",
      "记录完成后才能判断是否需要设计侧调整方案或销售侧补价值说明。",
    ],
    suggestedActions: ["打开客户跟进", "记录报价异议", "必要时回到销设协同调整方案"],
    relatedLinks: [
      { label: "去客户跟进", path: "/workbench/sales-followup", desc: "补一次报价回访记录", emphasis: "primary" },
      { label: "去销设协同", path: "/workbench/collab", desc: "需要调整方案时同步设计师" },
    ],
    receipt: {
      status: "processing",
      code: "SALES-QUOTE-024",
      updatedAt: "今天 08:45",
      summary: "报价回访已进入今日待办，等待销售回写客户异议。",
      items: [
        { label: "方案同步", owner: "设计师", time: "昨天 18:20", status: "done", note: "方案已同步给销售。" },
        { label: "报价回访", owner: "销售顾问", time: "今天内", status: "pending", note: "需要补客户异议记录。" },
        { label: "成交判断", owner: "销售顾问", time: "回访后", status: "pending", note: "根据客户反馈决定下一步动作。" },
      ],
    },
  },
  {
    id: "sales-m3",
    type: "sync",
    category: "system",
    title: "【公司产品】防水施工规范 v3.1 影响门店讲解",
    body: "防水施工规范已更新，新增禁用材料和卫浴厚度要求，销售需要看完产品图和详情后再用于客户解释。",
    summary: "销售收到的是客户现场讲解口径，不需要进入培训拆课；处理目标是确认自己讲给客户的一版内容是最新的。",
    time: "昨天 18:10",
    unread: true,
    urgency: "warning",
    sender: "公司产品",
    action: "看产品",
    path: "/workbench/info-sync",
    sourceBusiness: "公司产品更新",
    sourceChain: ["产品图示", "销售讲解", "客户确认", "门店成交"],
    tags: ["产品更新", "现场话术", "看完确认"],
    detailPoints: [
      "本次更新会影响客户现场对防水材料和厚度的理解。",
      "销售需要确认产品图、适用场景和禁用材料说明。",
      "确认后再用于客户讲解，避免继续沿用旧版说法。",
    ],
    suggestedActions: ["查看公司产品页", "放大产品图核对细节", "看完后点击确认"],
    relatedLinks: [
      { label: "去公司产品", path: "/workbench/info-sync", desc: "查看产品图、详情和确认入口", emphasis: "primary" },
      { label: "去客户跟进", path: "/workbench/sales-followup", desc: "回到客户列表检查受影响客户" },
    ],
    receipt: {
      status: "pending",
      code: "SALES-PRODUCT-031",
      updatedAt: "待处理",
      summary: "产品更新已推送，等待销售看完确认。",
      items: [
        { label: "产品更新发布", owner: "公司产品", time: "昨天 18:10", status: "done", note: "防水施工规范 v3.1 已发布。" },
        { label: "销售确认", owner: "销售顾问", time: "待处理", status: "pending", note: "尚未点击看完确认。" },
        { label: "客户讲解使用", owner: "销售顾问", time: "确认后", status: "pending", note: "确认后用于门店客户解释。" },
      ],
    },
  },
  {
    id: "sales-m4",
    type: "task",
    category: "task",
    title: "【销设协同】临港星河湾客户单待补现场照片",
    body: "设计师已接收需求，但现场照片和客户预算说明还缺失，需要补齐后才能继续方案推进。",
    summary: "这条消息让销售回到销设协同补资料，核心是减少设计侧反复追问和方案返工。",
    time: "2天前",
    unread: false,
    urgency: "warning",
    sender: "销设协同",
    action: "补客户单",
    path: "/workbench/collab/request/r1",
    sourceBusiness: "销售-设计协同",
    sourceChain: ["客户单创建", "设计接收", "资料补齐", "方案输出"],
    tags: ["现场照片", "预算说明", "待补资料"],
    detailPoints: [
      "设计师已接收客户单，但缺少现场照片。",
      "客户预算说明没有写清，设计侧无法判断推荐边界。",
      "补齐后再推进方案输出，避免会审前再返工。",
    ],
    suggestedActions: ["进入客户单", "上传现场照片", "补客户预算说明"],
    relatedLinks: [
      { label: "补客户单", path: "/workbench/collab/request/r1", desc: "补现场照片和预算说明", emphasis: "primary" },
      { label: "去销设协同", path: "/workbench/collab", desc: "查看所有销售交接事项" },
    ],
    receipt: {
      status: "processing",
      code: "SALES-COLLAB-019",
      updatedAt: "2天前 16:40",
      summary: "客户单已被设计师接收，但资料仍未补齐。",
      items: [
        { label: "客户单创建", owner: "销售顾问", time: "2天前 15:10", status: "done", note: "客户基础信息已提交。" },
        { label: "设计接收", owner: "设计师", time: "2天前 16:20", status: "done", note: "设计师已接收需求。" },
        { label: "销售补资料", owner: "销售顾问", time: "待处理", status: "pending", note: "现场照片和预算说明仍缺。" },
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
