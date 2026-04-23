export type ScheduleAlertItem = {
  id: string;
  node: string;
  deadline: string;
  owner: string;
  status: "on-track" | "warning" | "overdue" | "done";
  note: string;
};

export type ProductionConfirmationItem = {
  id: string;
  label: string;
  expected: string;
  actual: string;
  owner: string;
  status: "pass" | "warning" | "block";
};

export type ValidationHistoryItem = {
  id: string;
  title: string;
  actor: string;
  time: string;
  result: "pass" | "warning" | "risk";
  detail: string;
};

export type ProcessValidationDetail = {
  summary: string;
  scheduleAlerts: ScheduleAlertItem[];
  productionChecks: ProductionConfirmationItem[];
  history: ValidationHistoryItem[];
  closureRule: string;
};

const processValidationDetails: Record<string, ProcessValidationDetail> = {
  o1: {
    summary: "当前不是单纯的数据不一致，而是已经逼近投产边界：如果不先锁住图纸版本和报价口径，工期和返工成本会一起被放大。",
    scheduleAlerts: [
      {
        id: "o1-s1",
        node: "规格冲突确认",
        deadline: "今天 15:00 前",
        owner: "审单回流",
        status: "overdue",
        note: "设计图最终版本还没完全回写，已超出原定确认时点。",
      },
      {
        id: "o1-s2",
        node: "销售 / 设计统一口径",
        deadline: "今天下班前",
        owner: "销设协同",
        status: "warning",
        note: "客户沟通口径已要求暂停，但统一版本说明还没回填到订单链路。",
      },
      {
        id: "o1-s3",
        node: "工厂投产确认",
        deadline: "明天上午",
        owner: "工厂协同",
        status: "warning",
        note: "当前维持暂停生产，等待图纸版本和报价规格确认后才能恢复投产。",
      },
    ],
    productionChecks: [
      {
        id: "o1-p1",
        label: "最终图纸版本",
        expected: "确认唯一版本并写入订单",
        actual: "设计图存在 V5 与旧草稿并行流转",
        owner: "设计协同",
        status: "block",
      },
      {
        id: "o1-p2",
        label: "报价与订单规格一致性",
        expected: "报价、订单、投产规格同版",
        actual: "报价与订单规格口径不一致",
        owner: "门店销售",
        status: "block",
      },
      {
        id: "o1-p3",
        label: "暂停生产保护动作",
        expected: "冲突时先暂停投产",
        actual: "系统已暂停生产",
        owner: "工厂协同",
        status: "pass",
      },
    ],
    history: [
      {
        id: "o1-h1",
        title: "系统首次命中规格冲突",
        actor: "审单规则",
        time: "2024-01-15 14:31",
        result: "risk",
        detail: "发现设计图、订单和投产口径冲突，自动阻断投产。",
      },
      {
        id: "o1-h2",
        title: "人工复核补录证据",
        actor: "审单专员-林洁",
        time: "2024-01-15 14:46",
        result: "risk",
        detail: "补录设计图版本、报价规格和订单截图，确认不是录入笔误，而是链路口径不同版。",
      },
      {
        id: "o1-h3",
        title: "等待投产前再校验",
        actor: "工厂协同",
        time: "待版本统一后",
        result: "warning",
        detail: "待图纸版本写入订单并统一报价后，需要做一次投产前复核再放行。",
      },
    ],
    closureRule: "这类校验只有在图纸版本唯一、报价与订单同版、工厂确认恢复投产后才算真正闭环。",
  },
  o2: {
    summary: "当前风险点不在工厂数据本身，而在知识版本没有同步到施工和售后模板，容易形成‘数据看起来正常、现场执行仍然错误’的假通过。",
    scheduleAlerts: [
      {
        id: "o2-s1",
        node: "禁用材料口径冻结",
        deadline: "今天 12:00 前",
        owner: "产品支持",
        status: "done",
        note: "旧版材料解释已停止继续外发。",
      },
      {
        id: "o2-s2",
        node: "v3.1 未确认人员追齐",
        deadline: "今天 18:00 前",
        owner: "信息同步中心",
        status: "warning",
        note: "仍有部分门店人员未完成新版规范确认。",
      },
      {
        id: "o2-s3",
        node: "售后模板补知识版本字段",
        deadline: "明天中午",
        owner: "售后模板维护",
        status: "warning",
        note: "字段方案在评估中，没补齐前后续追责仍会偏弱。",
      },
    ],
    productionChecks: [
      {
        id: "o2-p1",
        label: "现场执行材料",
        expected: "按 v3.1 禁用规则执行",
        actual: "现场仍使用已禁用材料",
        owner: "门店 / 施工交付",
        status: "block",
      },
      {
        id: "o2-p2",
        label: "售后模板知识版本",
        expected: "明确记录 v3.1",
        actual: "部分售后记录未写版本",
        owner: "售后模板维护",
        status: "warning",
      },
      {
        id: "o2-p3",
        label: "工厂规则状态",
        expected: "工厂规则与新版规范一致",
        actual: "工厂规则已更新",
        owner: "工艺支持",
        status: "pass",
      },
    ],
    history: [
      {
        id: "o2-h1",
        title: "售后现场反推工艺规范异常",
        actor: "售后回流",
        time: "2024-01-14 10:20",
        result: "warning",
        detail: "通过现场照片和售后记录识别禁用材料仍在使用。",
      },
      {
        id: "o2-h2",
        title: "校验培训与模板版本差异",
        actor: "信息同步",
        time: "2024-01-14 11:05",
        result: "risk",
        detail: "确认问题根因是版本同步断层，而非单点录入错误。",
      },
      {
        id: "o2-h3",
        title: "待模板字段补齐后复验",
        actor: "售后模板维护",
        time: "待字段上线",
        result: "warning",
        detail: "知识版本字段补齐后，需回抽样复验一轮历史记录。",
      },
    ],
    closureRule: "工艺类校验不能只看工厂数据是否更新，还要确认现场执行、售后模板和知识版本都已经同版。",
  },
  o3: {
    summary: "这张单属于标准通过案例，重点是保留‘为什么可以继续投产’的依据，而不是只显示一个通过结果。",
    scheduleAlerts: [
      {
        id: "o3-s1",
        node: "投产确认",
        deadline: "今天 11:00 前",
        owner: "工厂协同",
        status: "done",
        note: "图纸、订单和生产数据校验通过，已进入正常投产。",
      },
    ],
    productionChecks: [
      {
        id: "o3-p1",
        label: "图纸 / 订单一致性",
        expected: "规格与系列一致",
        actual: "已一致",
        owner: "审单回流",
        status: "pass",
      },
      {
        id: "o3-p2",
        label: "当前生产状态",
        expected: "正常推进",
        actual: "生产中",
        owner: "工厂协同",
        status: "pass",
      },
    ],
    history: [
      {
        id: "o3-h1",
        title: "完成基础校验",
        actor: "系统校验",
        time: "2024-01-13 09:05",
        result: "pass",
        detail: "图纸、订单与生产状态对照无冲突。",
      },
      {
        id: "o3-h2",
        title: "人工抽样复核",
        actor: "审单专员",
        time: "2024-01-13 09:18",
        result: "pass",
        detail: "抽样确认关键字段一致，维持正常推进。",
      },
    ],
    closureRule: "正常通过单也要保留最小校验留痕，说明为什么能继续投产。",
  },
  o4: {
    summary: "这类问题更像场景理解偏差引发的投产后风险，因此校验页里要明确哪些地方本应在安装前拦住，而不是事后才发现。",
    scheduleAlerts: [
      {
        id: "o4-s1",
        node: "湿区等级解释复核",
        deadline: "今天下班前",
        owner: "培训运营",
        status: "warning",
        note: "需要先统一 R9 / R10 适用场景口径，再回写到培训与报价解释。",
      },
      {
        id: "o4-s2",
        node: "安装前核对清单补字段",
        deadline: "明天上午",
        owner: "安装交付",
        status: "warning",
        note: "清单还没加入适用区间字段，后续仍可能漏拦。",
      },
      {
        id: "o4-s3",
        node: "复测结果回写",
        deadline: "本周内",
        owner: "店长 / 带教",
        status: "on-track",
        note: "已排复盘，等待复测完成后回写结果。",
      },
    ],
    productionChecks: [
      {
        id: "o4-p1",
        label: "湿区等级推荐",
        expected: "湿区使用 R10",
        actual: "现场实际铺设为 R9",
        owner: "门店销售 / 安装交付",
        status: "block",
      },
      {
        id: "o4-p2",
        label: "安装前核对清单",
        expected: "明确适用区间复核",
        actual: "未记录",
        owner: "安装交付",
        status: "warning",
      },
      {
        id: "o4-p3",
        label: "参数训练覆盖",
        expected: "已有湿区等级标准讲解",
        actual: "陪练与带教覆盖不足",
        owner: "培训运营",
        status: "warning",
      },
    ],
    history: [
      {
        id: "o4-h1",
        title: "售后复盘发现等级误配",
        actor: "售后回流",
        time: "2024-01-12 18:50",
        result: "warning",
        detail: "通过现场铺设和报价差异，追出湿区等级理解偏差。",
      },
      {
        id: "o4-h2",
        title: "校验安装前拦截缺失",
        actor: "培训运营",
        time: "2024-01-12 19:25",
        result: "risk",
        detail: "确认安装前核对清单未承接适用区间复核，导致问题未提前拦住。",
      },
      {
        id: "o4-h3",
        title: "等待复测与核对清单更新",
        actor: "店长 / 带教",
        time: "待复测完成",
        result: "warning",
        detail: "复测和清单更新完成后，需再复盘一次是否具备防复发条件。",
      },
    ],
    closureRule: "场景理解偏差类校验，只有讲解标准、安装前核对和复测结果三者都补齐，才算完成真正防复发。",
  },
};

const defaultDetail: ProcessValidationDetail = {
  summary: "当前订单没有单独配置更深的校验追溯信息，将按通用校验结构展示。",
  scheduleAlerts: [
    {
      id: "default-s1",
      node: "校验节点待补",
      deadline: "待确认",
      owner: "当前处理人",
      status: "on-track",
      note: "建议补充工期节点和投产确认信息。",
    },
  ],
  productionChecks: [
    {
      id: "default-p1",
      label: "投产确认",
      expected: "补充关键确认项",
      actual: "当前暂无明细",
      owner: "待确认",
      status: "warning",
    },
  ],
  history: [
    {
      id: "default-h1",
      title: "校验历史待补",
      actor: "系统",
      time: "待确认",
      result: "warning",
      detail: "建议补充至少一轮历史校验留痕，便于追溯。",
    },
  ],
  closureRule: "建议补齐工期、投产确认和历史校验三类信息后再作为完整校验页使用。",
};

export function getProcessValidationDetailByOrderId(orderId?: string) {
  if (!orderId) {
    return defaultDetail;
  }

  return processValidationDetails[orderId] ?? defaultDetail;
}
