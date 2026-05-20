export type RootCause = {
  label: string;
  owner: string;
  status: "confirmed" | "pending" | "risk";
  note: string;
};

export type FlowbackTask = {
  label: string;
  owner: string;
  status: "done" | "pending" | "risk";
  note: string;
};

export type AnnotationData = {
  type: string;
  level: "high" | "medium" | "low";
  source: string;
  owner: string;
  description: string;
  evidence: string[];
  impactNodes: string[];
  tags: string[];
  suggestedActions: string[];
  syncTargets: string[];
  shouldFlowback: boolean;
};

export type ValidationItem = {
  label: string;
  expected: string;
  actual: string;
  status: "match" | "mismatch" | "missing";
  note: string;
};

export type ValidationGroup = {
  title: string;
  sourceA: string;
  sourceB: string;
  items: ValidationItem[];
};

export type ValidationData = {
  overallStatus: "pass" | "warning" | "risk";
  summary: string;
  groups: ValidationGroup[];
  blockers: string[];
  recommendations: string[];
};

export type AttributionCategory = {
  label: string;
  owner: string;
  status: "confirmed" | "pending" | "risk";
  note: string;
  impact: string;
};

export type AfterSaleAttributionData = {
  summary: string;
  repeatRisk: string;
  categories: AttributionCategory[];
  recoveryActions: string[];
  syncTargets: string[];
};

export type FlowbackTarget = {
  type: string;
  label: string;
  owner: string;
  status: "done" | "pending" | "risk";
  note: string;
  due: string;
};

export type TrainingFlowbackData = {
  summary: string;
  standardGap: string;
  targets: FlowbackTarget[];
  publishActions: string[];
  expectedImpact: string[];
};

export type OrderItem = {
  id: string;
  orderNo: string;
  customer: string;
  salesperson: string;
  product: string;
  issue: string;
  status: "abnormal" | "normal";
  urgency: "urgent" | "warning" | "normal";
  stage: string;
  factoryStatus: string;
  submittedAt: string;
  canFlowback: boolean;
  afterSale?: boolean;
  taskType: string;
  ownerView: string;
  nextActions: string[];
  rootCauses: RootCause[];
  flowbackPlan: FlowbackTask[];
  annotation: AnnotationData;
  validation: ValidationData;
  afterSaleAttribution: AfterSaleAttributionData;
  trainingFlowback: TrainingFlowbackData;
};

export type AfterSaleIssue = {
  id: string;
  type: string;
  desc: string;
  relatedOrder: string;
  relatedOrderId: string;
  flowedBack: boolean;
  training: string;
  flowbackSteps: { label: string; done: boolean }[];
};

export const orders: OrderItem[] = [
  {
    id: "o1",
    orderNo: "#2024-0312",
    customer: "张国栋",
    salesperson: "王芳",
    product: "云岚石·暖冬系列 P800×800",
    issue: "规格与设计图不符：设计图标注 P600×1200，订单填写 P800×800",
    status: "abnormal",
    urgency: "urgent",
    stage: "审单发现",
    factoryStatus: "已暂停生产",
    submittedAt: "2024-01-15 14:30",
    canFlowback: true,
    taskType: "规格冲突",
    ownerView: "门店销售",
    nextActions: ["先确认设计图和订单的版本来源", "暂停对客承诺，避免继续扩大问题", "回流到培训与题库，避免再出现规格误填"],
    rootCauses: [
      { label: "销售录单", owner: "门店销售", status: "confirmed", note: "规格填写时沿用了旧草稿，未再次核对设计图。" },
      { label: "设计图版本", owner: "设计协同", status: "pending", note: "需核对是否存在不同版本设计图在群里并行流转。" },
      { label: "审单提示规则", owner: "审单回流", status: "risk", note: "规格冲突提示词需要继续补强，避免仅靠人工发现。" },
    ],
    flowbackPlan: [
      { label: "更新规格核对培训内容", owner: "社区运营", status: "pending", note: "把规格核对流程写入学习课件和审单规范。" },
      { label: "补一题规格冲突场景题", owner: "题库", status: "pending", note: "把设计图与订单不一致的判题逻辑补进题库。" },
      { label: "新增规格异常陪练场景", owner: "AI 陪练", status: "pending", note: "训练销售在客户追问时如何解释并快速止损。" },
    ],
    annotation: {
      type: "规格填写错误",
      level: "high",
      source: "审单发现",
      owner: "审单回流",
      description: "设计图、订单系统与准备投产的数据三方不一致，属于高风险规格异常，需要先冻结对客承诺和生产动作。",
      evidence: [
        "设计图 V5 标注为 P600×1200。",
        "订单系统提交记录为 P800×800。",
        "审单规则命中“规格冲突”提示并暂停生产。",
      ],
      impactNodes: ["对客报价说明", "工厂投产数据", "规格核对培训内容"],
      tags: ["规格冲突", "审单异常", "高风险", "需回流培训"],
      suggestedActions: [
        "先锁单并核对设计图最终版本。",
        "同步销售和设计确认客户沟通口径。",
        "将该异常回流到培训课件、题库和 AI 陪练场景。",
      ],
      syncTargets: ["社区运营", "信息同步中心", "销售-设计协同"],
      shouldFlowback: true,
    },
    validation: {
      overallStatus: "risk",
      summary: "当前主要风险是设计图和订单规格不一致，且生产前置数据已被影响；如果不先统一版本来源，会继续扩大到报价和客户承诺。",
      groups: [
        {
          title: "图纸 / 订单对照",
          sourceA: "设计图",
          sourceB: "订单系统",
          items: [
            { label: "产品规格", expected: "P600×1200", actual: "P800×800", status: "mismatch", note: "核心冲突项，必须先确认最终规格。" },
            { label: "产品系列", expected: "云岚石·暖冬系列", actual: "云岚石·暖冬系列", status: "match", note: "系列信息一致。" },
            { label: "图纸版本号", expected: "V5", actual: "未写入订单", status: "missing", note: "订单侧缺少版本字段，难以追溯来源。" },
          ],
        },
        {
          title: "报价 / 生产数据对照",
          sourceA: "报价单",
          sourceB: "工厂生产数据",
          items: [
            { label: "报价规格", expected: "P600×1200", actual: "P800×800", status: "mismatch", note: "报价口径和投产口径不同。" },
            { label: "投产状态", expected: "待确认后投产", actual: "已暂停生产", status: "match", note: "系统已触发保护动作。" },
          ],
        },
      ],
      blockers: ["最终设计图版本未确认", "订单系统缺少图纸版本字段"],
      recommendations: ["先进入问题标注页固定异常类型与责任线索。", "补齐订单系统中的图纸版本字段。", "把规格核对作为培训回流的新增标准案例。"],
    },
    afterSaleAttribution: {
      summary: "这类问题的第一责任点在前端录单与版本核对，但真正扩大的原因是设计图版本没有被强制写进订单链路。",
      repeatRisk: "如果后续仍允许旧草稿或群聊版本直接流入下单，规格冲突会继续在报价、工厂和客户承诺之间重复出现。",
      categories: [
        { label: "前端原因", owner: "门店销售", status: "confirmed", note: "销售录单沿用了旧草稿，没有在提交前核对最终设计图。", impact: "直接导致客户口径和订单规格不一致。" },
        { label: "生产原因", owner: "工厂协同", status: "pending", note: "工厂已暂停生产，但仍需补充版本字段校验，避免后续误投产。", impact: "当前已被拦截，但规则仍有漏口。" },
        { label: "安装原因", owner: "施工交付", status: "confirmed", note: "当前尚未进入安装阶段，不构成主要责任来源。", impact: "暂无直接影响。" },
        { label: "承诺偏差", owner: "销设协同", status: "risk", note: "客户已收到基于错误规格的初步口径，需统一改口。", impact: "可能引发客户预期落差和返工成本。" },
      ],
      recoveryActions: [
        "锁定当前单据并要求补录图纸版本字段。",
        "同步销售、设计与客户沟通统一口径。",
        "把规格核对错误作为审单和培训的重复问题案例。",
      ],
      syncTargets: ["信息同步中心", "社区运营", "销设协同"],
    },
    trainingFlowback: {
      summary: "这张单需要把“规格核对”从经验动作升级成标准动作，同时让培训、题库和 AI 陪练都能覆盖到。",
      standardGap: "目前缺少“设计图版本必须写入订单”的硬约束，也缺少专门训练销售识别规格冲突的内容。",
      targets: [
        { type: "课程", label: "《规格核对与图纸版本确认》补训课", owner: "社区运营", status: "pending", note: "补齐版本确认和规格核对动作。", due: "今天 18:00 前" },
        { type: "题库", label: "规格冲突判断题 3 题", owner: "题库", status: "pending", note: "让销售能识别订单与图纸冲突。", due: "明天中午" },
        { type: "AI 陪练", label: "客户追问规格差异说明场景", owner: "AI 陪练", status: "pending", note: "训练止损和重解释话术。", due: "本周内" },
        { type: "错误库", label: "规格冲突标准案例", owner: "错误库", status: "risk", note: "需要补充统一模板和追溯字段。", due: "待模板确认" },
      ],
      publishActions: [
        "发布规格核对补训任务并指定门店销售优先完成。",
        "把新增题目挂到本周复测任务中。",
        "同步到信息同步中心，提醒设计与销售确认新口径。",
      ],
      expectedImpact: ["减少规格冲突重复发生", "让客户改口动作更快", "补齐订单来源追溯能力"],
    },
  },
  {
    id: "o2",
    orderNo: "#2024-0298",
    customer: "李总（泓信公司）",
    salesperson: "陈伟",
    product: "防水产品·卫浴套餐 A",
    issue: "施工规范选择了已被 v3.1 禁用的材料：OPC 普通硅酸盐水泥",
    status: "abnormal",
    urgency: "warning",
    stage: "售后发现",
    factoryStatus: "已发货",
    submittedAt: "2024-01-14 10:15",
    canFlowback: true,
    afterSale: true,
    taskType: "工艺版本未同步",
    ownerView: "信息同步",
    nextActions: ["立即同步售后和门店，停止继续使用旧材料口径", "追溯客户沟通记录，看是否沿用旧版施工解释", "将禁用材料案例回流到信息同步与社区运营"],
    rootCauses: [
      { label: "知识版本同步", owner: "信息同步", status: "confirmed", note: "门店仍有人员未确认 v3.1，导致继续使用旧口径。" },
      { label: "题库 / 课件", owner: "社区运营", status: "risk", note: "题库和陪练场景仍沿用旧厚度与材料解释。" },
      { label: "售后归因标准", owner: "售后回流", status: "pending", note: "需补充售后记录模板，明确知识版本字段。" },
    ],
    flowbackPlan: [
      { label: "触发工艺规范重学", owner: "社区运营", status: "pending", note: "覆盖已学习旧版规范的相关人员。" },
      { label: "替换旧版材料题", owner: "题库", status: "pending", note: "题库中旧材料题需要全部替换。" },
      { label: "更新卫浴施工陪练", owner: "AI 陪练", status: "pending", note: "同步到新版施工解释场景。" },
    ],
    annotation: {
      type: "禁用材料使用",
      level: "medium",
      source: "售后发现",
      owner: "售后回流",
      description: "施工现场仍在使用 v3.1 已禁用材料，说明前台话术、培训内容和售后归因模板之间存在版本断层。",
      evidence: [
        "售后照片显示使用了 OPC 普通硅酸盐水泥。",
        "门店培训确认记录中仍有人未确认 v3.1。",
        "题库与陪练中残留旧材料解释。",
      ],
      impactNodes: ["门店施工解释口径", "售后归因模板", "工艺规范培训内容"],
      tags: ["禁用材料", "知识未同步", "售后回流", "工艺风险"],
      suggestedActions: [
        "先冻结旧材料口径并通知门店。",
        "回到信息同步中心追齐未确认人员。",
        "同步替换题库和陪练中的旧材料案例。",
      ],
      syncTargets: ["信息同步中心", "社区运营", "售后归因"],
      shouldFlowback: true,
    },
    validation: {
      overallStatus: "warning",
      summary: "当前不是生产数据录入错误，而是工艺规范版本未完全同步，导致售后记录与门店实际执行的材料口径不一致。",
      groups: [
        {
          title: "工艺规范 / 现场执行对照",
          sourceA: "工艺规范 v3.1",
          sourceB: "现场执行",
          items: [
            { label: "禁用材料", expected: "不得使用 OPC 普通硅酸盐水泥", actual: "现场仍使用 OPC 普通硅酸盐水泥", status: "mismatch", note: "核心工艺风险。" },
            { label: "厚度口径", expected: "卫浴区最小厚度 2.0mm", actual: "售后记录未明确", status: "missing", note: "售后模板缺少关键工艺字段。" },
          ],
        },
        {
          title: "培训版本 / 售后记录对照",
          sourceA: "培训与题库",
          sourceB: "售后归因记录",
          items: [
            { label: "知识版本确认", expected: "记录 v3.1", actual: "部分记录未写版本", status: "missing", note: "导致后续无法准确追责。" },
            { label: "禁用材料解释", expected: "新版禁用口径", actual: "仍有旧版解释残留", status: "mismatch", note: "培训与售后未完全同版。" },
          ],
        },
      ],
      blockers: ["售后记录模板缺少知识版本字段"],
      recommendations: ["把知识版本字段补进售后归因模板。", "回流培训并发起规范重学。", "用该案例补齐禁用材料校验规则。"],
    },
    afterSaleAttribution: {
      summary: "根因不是单点施工失误，而是新版工艺没有完整同步到门店、售后和训练系统，导致旧材料口径继续被沿用。",
      repeatRisk: "如果版本确认仍只停留在公告层，门店会继续在现场解释中混用新旧规范，售后问题会反复出现。",
      categories: [
        { label: "前端原因", owner: "门店销售", status: "confirmed", note: "销售在解释施工材料时仍沿用了旧版口径。", impact: "客户现场理解和培训内容出现断层。" },
        { label: "生产原因", owner: "工艺支持", status: "confirmed", note: "工厂侧规则已更新，但门店和售后模板未同步到位。", impact: "规则没问题，执行侧掉链。" },
        { label: "安装原因", owner: "安装交付", status: "pending", note: "安装现场需回收旧版材料说明卡，并核对后续替换方案。", impact: "如果现场继续沿用旧说明，会扩大返工面。" },
        { label: "承诺偏差", owner: "售后回流", status: "risk", note: "售后记录未写知识版本，导致后续无法准确界定责任。", impact: "影响归因和标准更新效率。" },
      ],
      recoveryActions: [
        "冻结旧材料解释卡和旧版口径。",
        "要求售后记录补写知识版本字段。",
        "让信息同步中心追齐 v3.1 未确认人员。",
      ],
      syncTargets: ["信息同步中心", "社区运营", "售后模板"],
    },
    trainingFlowback: {
      summary: "回流重点不只是更新一条课件，而是让“版本确认 -> 现场解释 -> 售后记录”形成同一套标准。",
      standardGap: "目前培训、题库、陪练和售后模板之间没有共用的知识版本字段，导致回流后仍难闭环。",
      targets: [
        { type: "课程", label: "《防水规范 v3.1》补学任务", owner: "社区运营", status: "pending", note: "覆盖仍未确认新版规范的人员。", due: "今天 17:00 前" },
        { type: "题库", label: "禁用材料判断题替换", owner: "题库", status: "pending", note: "删除旧版材料解释题。", due: "明天上午" },
        { type: "AI 陪练", label: "卫浴施工新版解释场景", owner: "AI 陪练", status: "pending", note: "训练销售在现场快速纠偏。", due: "本周内" },
        { type: "错误库", label: "禁用材料复发案例库", owner: "错误库", status: "done", note: "已建立基础模板，可继续沉淀案例。", due: "已完成" },
      ],
      publishActions: [
        "面向卫浴相关人员推送重学任务。",
        "同步更新售后归因模板中的知识版本字段。",
        "把该案例加入新版规范复测名单。",
      ],
      expectedImpact: ["减少新版规范未确认问题", "缩短售后归因时间", "让工艺问题能真正回流成标准"],
    },
  },
  {
    id: "o3",
    orderNo: "#2024-0285",
    customer: "刘女士",
    salesperson: "张磊",
    product: "云岚石·暖冬系列 P600×600",
    issue: "",
    status: "normal",
    urgency: "normal",
    stage: "已通过",
    factoryStatus: "生产中",
    submittedAt: "2024-01-13 09:00",
    canFlowback: false,
    taskType: "校验通过",
    ownerView: "系统",
    nextActions: ["维持正常跟进"],
    rootCauses: [
      { label: "销售录单", owner: "门店销售", status: "confirmed", note: "录单与设计图一致。" },
      { label: "设计图版本", owner: "设计协同", status: "confirmed", note: "版本统一，信息无冲突。" },
      { label: "审单提示规则", owner: "审单回流", status: "confirmed", note: "规则命中正常。" },
    ],
    flowbackPlan: [{ label: "无需回流", owner: "系统", status: "done", note: "当前订单正常，无需额外培训动作。" }],
    annotation: {
      type: "无需标注",
      level: "low",
      source: "系统校验通过",
      owner: "系统",
      description: "当前订单通过图纸、报价和生产数据的基础对照，无需进入异常回流流程。",
      evidence: ["设计图与订单规格一致。", "生产状态正常推进。"],
      impactNodes: ["无需额外回流"],
      tags: ["正常单", "校验通过"],
      suggestedActions: ["保持正常推进。"],
      syncTargets: ["无"],
      shouldFlowback: false,
    },
    validation: {
      overallStatus: "pass",
      summary: "订单信息、图纸与当前生产状态一致，属于正常通过单。",
      groups: [
        {
          title: "图纸 / 订单对照",
          sourceA: "设计图",
          sourceB: "订单系统",
          items: [
            { label: "产品规格", expected: "P600×600", actual: "P600×600", status: "match", note: "规格一致。" },
            { label: "产品系列", expected: "云岚石·暖冬系列", actual: "云岚石·暖冬系列", status: "match", note: "系列一致。" },
          ],
        },
      ],
      blockers: [],
      recommendations: ["继续按当前流程推进。"],
    },
    afterSaleAttribution: {
      summary: "当前订单没有形成售后问题，也没有需要额外拆分的责任线。",
      repeatRisk: "保持现有审单和版本确认动作即可。",
      categories: [
        { label: "前端原因", owner: "门店销售", status: "confirmed", note: "录单与设计图一致。", impact: "无异常影响。" },
        { label: "生产原因", owner: "工厂协同", status: "confirmed", note: "生产数据匹配。", impact: "无异常影响。" },
        { label: "安装原因", owner: "施工交付", status: "confirmed", note: "当前未发现安装风险。", impact: "无异常影响。" },
        { label: "承诺偏差", owner: "销设协同", status: "confirmed", note: "客户口径一致。", impact: "无异常影响。" },
      ],
      recoveryActions: ["持续沿用现有正常流程。"],
      syncTargets: ["无"],
    },
    trainingFlowback: {
      summary: "当前不需要触发培训回流。",
      standardGap: "无明显标准缺口。",
      targets: [{ type: "系统", label: "无需新增回流任务", owner: "系统", status: "done", note: "当前单据已正常闭环。", due: "已完成" }],
      publishActions: ["保持观察。"],
      expectedImpact: ["维持稳定执行"],
    },
  },
  {
    id: "o4",
    orderNo: "#2024-0265",
    customer: "周女士",
    salesperson: "刘洋",
    product: "雨汐灰·湿区防滑砖 R10",
    issue: "客户湿区实际铺设了 R9 产品，报价与现场解释对防滑等级理解不一致",
    status: "abnormal",
    urgency: "warning",
    stage: "售后复盘",
    factoryStatus: "已安装",
    submittedAt: "2024-01-12 18:40",
    canFlowback: true,
    afterSale: true,
    taskType: "场景匹配偏差",
    ownerView: "社区运营",
    nextActions: ["确认报价、门店讲解和现场铺设记录是否同版", "补做湿区防滑等级解释训练", "将该案例加入带教复盘"],
    rootCauses: [
      { label: "参数理解", owner: "门店销售", status: "confirmed", note: "对 R9 / R10 适用场景理解不清。" },
      { label: "讲解训练", owner: "社区运营", status: "risk", note: "陪练场景没有覆盖湿区等级选择。" },
      { label: "安装核对", owner: "安装交付", status: "pending", note: "安装前未再次核对产品适用区间。" },
    ],
    flowbackPlan: [
      { label: "补充防滑等级课程案例", owner: "社区运营", status: "pending", note: "把湿区 / 干区区分讲清楚。" },
      { label: "新增 R9 / R10 判断题", owner: "题库", status: "pending", note: "减少参数概念混淆。" },
      { label: "带教复盘任务", owner: "店长 / 带教", status: "pending", note: "针对刘洋安排 1 对 1 复盘。" },
    ],
    annotation: {
      type: "参数理解偏差",
      level: "medium",
      source: "售后复盘",
      owner: "售后回流",
      description: "湿区铺设使用了不匹配的防滑等级，说明销售推荐、报价解释和安装核对之间没有形成一致标准。",
      evidence: [
        "报价单标注为湿区推荐 R10。",
        "客户现场照片显示实际铺设为 R9。",
        "销售回访记录中对湿区等级解释存在犹豫。",
      ],
      impactNodes: ["报价说明", "现场安装核对", "带教训练内容"],
      tags: ["参数理解偏差", "湿区场景", "售后复盘", "需带教跟进"],
      suggestedActions: [
        "先固定湿区等级推荐标准。",
        "安排销售复盘并补做场景陪练。",
        "把该案例同步到异常看板和培训回流。",
      ],
      syncTargets: ["社区运营", "异常看板", "售后归因"],
      shouldFlowback: true,
    },
    validation: {
      overallStatus: "warning",
      summary: "问题出在参数场景理解和安装前核对不足，不是单纯的系统录错，但仍然需要把场景判断做成明确标准。",
      groups: [
        {
          title: "报价 / 现场铺设对照",
          sourceA: "报价说明",
          sourceB: "现场铺设",
          items: [
            { label: "湿区等级", expected: "R10", actual: "R9", status: "mismatch", note: "湿区应用场景不匹配。" },
            { label: "产品系列", expected: "雨汐灰", actual: "雨汐灰", status: "match", note: "系列一致。" },
          ],
        },
        {
          title: "讲解训练 / 安装核对对照",
          sourceA: "培训与陪练", 
          sourceB: "安装前核对",
          items: [
            { label: "R9 / R10 场景训练", expected: "已有标准讲解", actual: "覆盖不足", status: "missing", note: "陪练场景未覆盖湿区等级判断。" },
            { label: "安装前核对清单", expected: "确认适用区间", actual: "未记录", status: "missing", note: "现场缺少二次核对动作。" },
          ],
        },
      ],
      blockers: ["安装前核对清单缺少适用区间字段"],
      recommendations: ["把湿区等级判断加入陪练和题库。", "补一条安装前核对动作。", "在异常看板里跟进该人员复盘结果。"],
    },
    afterSaleAttribution: {
      summary: "核心问题是场景理解偏差：销售知道参数名词，但没有把参数和真实使用场景绑定起来。",
      repeatRisk: "如果 R9 / R10 等等级解释仍停留在知识点记忆，类似问题会在湿区、地面和特殊区域反复出现。",
      categories: [
        { label: "前端原因", owner: "门店销售", status: "confirmed", note: "销售对湿区场景推荐标准理解不稳。", impact: "前端推荐偏差直接传导到报价解释。" },
        { label: "生产原因", owner: "产品支持", status: "confirmed", note: "产品参数本身明确，不是生产侧数据错误。", impact: "生产无直接问题。" },
        { label: "安装原因", owner: "安装交付", status: "pending", note: "安装前未再次核对适用区间。", impact: "现场本可二次拦截但未拦住。" },
        { label: "承诺偏差", owner: "带教复盘", status: "risk", note: "销售对客户解释时没有强调湿区差异。", impact: "客户预期和现场结果错位。" },
      ],
      recoveryActions: [
        "固定湿区 / 干区等级解释模板。",
        "安排销售复盘并要求重新过一遍陪练。",
        "把安装核对动作补进标准清单。",
      ],
      syncTargets: ["异常看板", "社区运营", "售后归因"],
    },
    trainingFlowback: {
      summary: "这条回流要同时进入课程、题库和运营任务，避免参数理解偏差只停留在售后复盘。",
      standardGap: "目前参数类训练偏重名词记忆，缺少“真实使用场景 -> 正确推荐 -> 现场核对”的完整链路。",
      targets: [
        { type: "课程", label: "《防滑等级与应用场景》案例补充", owner: "社区运营", status: "pending", note: "补强湿区 / 干区判断。", due: "明天下午" },
        { type: "题库", label: "R9 / R10 场景判断题", owner: "题库", status: "pending", note: "做成复测题。", due: "本周内" },
        { type: "带教", label: "刘洋 1 对 1 参数复盘任务", owner: "店长 / 带教", status: "pending", note: "盯实际讲解纠偏。", due: "今天下班前排期" },
        { type: "错误库", label: "湿区参数误配案例", owner: "错误库", status: "pending", note: "沉淀为高频错误案例。", due: "本周内" },
      ],
      publishActions: [
        "向相关销售发起参数类复测。",
        "同步店长在异常看板建立跟进任务。",
        "把案例同步到 AI 陪练结果反馈中。",
      ],
      expectedImpact: ["减少参数类售后复发", "带教动作更聚焦", "参数解释和场景推荐统一起来"],
    },
  },
];

export const afterSaleIssues: AfterSaleIssue[] = [
  {
    id: "a1",
    type: "材料误用",
    desc: "销售推荐使用了 v3.1 禁用材料，客户施工后发现问题。",
    relatedOrder: "#2024-0298",
    relatedOrderId: "o2",
    flowedBack: false,
    training: "防水施工规范 v3.1",
    flowbackSteps: [
      { label: "售后归因记录", done: true },
      { label: "知识版本确认", done: false },
      { label: "回流培训系统", done: false },
    ],
  },
  {
    id: "a2",
    type: "参数理解偏差",
    desc: "销售对 R9 / R10 区别理解不稳，导致湿区铺设了不匹配的等级。",
    relatedOrder: "#2024-0265",
    relatedOrderId: "o4",
    flowedBack: false,
    training: "防滑等级与应用场景",
    flowbackSteps: [
      { label: "售后归因记录", done: true },
      { label: "带教复盘排期", done: false },
      { label: "回流培训系统", done: false },
    ],
  },
];

export function rootTone(status: RootCause["status"]) {
  if (status === "confirmed") return "bg-green-50 border-green-100 text-[#15803D]";
  if (status === "risk") return "bg-red-50 border-red-100 text-[#DC2626]";
  return "bg-amber-50 border-amber-100 text-[#B45309]";
}

export function flowTone(status: FlowbackTask["status"] | FlowbackTarget["status"]) {
  if (status === "done") return "bg-green-50 border-green-100 text-[#15803D]";
  if (status === "risk") return "bg-red-50 border-red-100 text-[#DC2626]";
  return "bg-amber-50 border-amber-100 text-[#B45309]";
}

export function annotationLevelTone(level: AnnotationData["level"]) {
  if (level === "high") return "bg-red-100 text-[#DC2626]";
  if (level === "medium") return "bg-amber-100 text-[#B45309]";
  return "bg-green-100 text-[#15803D]";
}

export function annotationLevelLabel(level: AnnotationData["level"]) {
  if (level === "high") return "高风险";
  if (level === "medium") return "中风险";
  return "低风险";
}

export function validationTone(status: ValidationItem["status"]) {
  if (status === "match") return "bg-green-50 border-green-100 text-[#15803D]";
  if (status === "mismatch") return "bg-red-50 border-red-100 text-[#DC2626]";
  return "bg-amber-50 border-amber-100 text-[#B45309]";
}

export function validationSummaryTone(status: ValidationData["overallStatus"]) {
  if (status === "pass") return "bg-green-50 border-green-100 text-[#15803D]";
  if (status === "risk") return "bg-red-50 border-red-100 text-[#DC2626]";
  return "bg-amber-50 border-amber-100 text-[#B45309]";
}

export function validationSummaryLabel(status: ValidationData["overallStatus"]) {
  if (status === "pass") return "校验通过";
  if (status === "risk") return "高风险待处理";
  return "存在预警";
}

export function urgencyTone(status: OrderItem["urgency"]) {
  if (status === "urgent") return "bg-red-100 text-[#DC2626]";
  if (status === "warning") return "bg-amber-100 text-[#B45309]";
  return "bg-green-100 text-[#15803D]";
}

export function urgencyLabel(status: OrderItem["urgency"]) {
  if (status === "urgent") return "紧急";
  if (status === "warning") return "预警";
  return "正常";
}

export function getOrderById(id?: string) {
  return orders.find((item) => item.id === id) ?? orders[0];
}

export function getAfterSaleIssueByOrderId(orderId?: string) {
  return afterSaleIssues.find((item) => item.relatedOrderId === orderId);
}
