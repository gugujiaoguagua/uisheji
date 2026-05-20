export type RecurrenceTrendItem = {
  id: string;
  period: string;
  issueCount: string;
  rate: string;
  status: "rising" | "watch" | "stable" | "improving";
  note: string;
};

export type AttributionTemplateHistoryItem = {
  id: string;
  title: string;
  version: string;
  updatedAt: string;
  owner: string;
  status: "current" | "updating" | "retired";
  note: string;
  nextAction: string;
};

export type AttributionReuseItem = {
  id: string;
  title: string;
  scenario: string;
  owner: string;
  status: "ready" | "pilot" | "pending";
  note: string;
  targets: string[];
};

export type AfterSaleAttributionDetail = {
  trendSummary: string;
  recurrenceTrend: RecurrenceTrendItem[];
  templateHistory: AttributionTemplateHistoryItem[];
  reuseCards: AttributionReuseItem[];
  closureRule: string;
};

const afterSaleAttributionDetails: Record<string, AfterSaleAttributionDetail> = {
  o1: {
    trendSummary: "最近 4 周“规格冲突 / 多版本并行”类售后单占比持续抬升，说明问题不只是一单失误，而是旧草稿、旧模板和订单字段没有真正锁版。",
    recurrenceTrend: [
      {
        id: "o1-t1",
        period: "近 4 周",
        issueCount: "3 单",
        rate: "12%",
        status: "stable",
        note: "问题主要集中在旧草稿继续被当成最终版使用。",
      },
      {
        id: "o1-t2",
        period: "近 3 周",
        issueCount: "4 单",
        rate: "16%",
        status: "watch",
        note: "报价口径和设计图版本不一致的情况开始增多。",
      },
      {
        id: "o1-t3",
        period: "近 2 周",
        issueCount: "5 单",
        rate: "20%",
        status: "rising",
        note: "部分门店仍绕过最终图纸确认，直接推进下单。",
      },
      {
        id: "o1-t4",
        period: "本周",
        issueCount: "2 单",
        rate: "21%",
        status: "rising",
        note: "如果版本字段还不写进订单，规格冲突会继续反复出现。",
      },
    ],
    templateHistory: [
      {
        id: "o1-h1",
        title: "订单录入模板",
        version: "v3.1 待上线",
        updatedAt: "2026-04-20 11:30",
        owner: "订单系统维护",
        status: "updating",
        note: "新增图纸版本字段与最终确认人字段，当前还在灰度发布。",
        nextAction: "上线后强制录单前补齐版本字段，避免旧草稿直接流入投产。",
      },
      {
        id: "o1-h2",
        title: "客户承诺说明卡",
        version: "v1.8 待替换",
        updatedAt: "2026-04-19 16:10",
        owner: "销设协同",
        status: "retired",
        note: "旧卡片仍保留错误规格示例，容易让前端继续沿用旧口径。",
        nextAction: "统一回收旧版承诺卡，只保留最终设计图绑定版。",
      },
      {
        id: "o1-h3",
        title: "售后归因模板",
        version: "v2.5 当前版",
        updatedAt: "2026-04-21 09:20",
        owner: "售后回流",
        status: "current",
        note: "已补充“图纸版本是否唯一”与“承诺口径是否已统一”两项归因字段。",
        nextAction: "把这次案例沉淀成规格冲突标准模板，供后续同类单直接复用。",
      },
    ],
    reuseCards: [
      {
        id: "o1-r1",
        title: "规格冲突归因模板",
        scenario: "适用于图纸、报价和投产口径多版本并行的异常单。",
        owner: "审单回流",
        status: "ready",
        note: "保留责任拆解、影响范围和统一改口动作，后续同类问题可直接套用。",
        targets: ["问题标注", "培训回流", "信息同步"],
      },
      {
        id: "o1-r2",
        title: "客户改口话术包",
        scenario: "适用于客户已收到错误规格口径，需要重新解释的场景。",
        owner: "销设协同",
        status: "pilot",
        note: "目前已在 2 个门店试跑，后续可和售后归因页联动生成标准话术。",
        targets: ["门店销售", "消息中心", "售后跟进"],
      },
    ],
    closureRule: "这类售后归因只有在版本字段强制写入订单、旧模板停止流转、统一话术同步到门店后，才算真正具备防复发条件。",
  },
  o2: {
    trendSummary: "当前复发的不是单一施工动作，而是“新版工艺已更新、现场和售后模板还在用旧口径”的版本断层问题。",
    recurrenceTrend: [
      {
        id: "o2-t1",
        period: "近 4 周",
        issueCount: "5 单",
        rate: "24%",
        status: "watch",
        note: "禁用材料旧口径在门店解释和售后记录里都有残留。",
      },
      {
        id: "o2-t2",
        period: "近 3 周",
        issueCount: "6 单",
        rate: "27%",
        status: "rising",
        note: "新品说明已发，但模板与课件替换不够彻底。",
      },
      {
        id: "o2-t3",
        period: "近 2 周",
        issueCount: "4 单",
        rate: "19%",
        status: "improving",
        note: "信息同步确认推进后，复发占比开始回落。",
      },
      {
        id: "o2-t4",
        period: "本周",
        issueCount: "3 单",
        rate: "14%",
        status: "watch",
        note: "仍有少量旧版售后模板没写知识版本，追责链还不够稳。",
      },
    ],
    templateHistory: [
      {
        id: "o2-h1",
        title: "售后归因记录模板",
        version: "v3.1 补字段中",
        updatedAt: "2026-04-21 08:45",
        owner: "售后模板维护",
        status: "updating",
        note: "正在补知识版本字段和现场执行材料字段，避免后续无法判断用的是哪版标准。",
        nextAction: "字段上线后回抽样复查近两周售后单。",
      },
      {
        id: "o2-h2",
        title: "禁用材料解释卡",
        version: "v2.0 已停用",
        updatedAt: "2026-04-18 18:20",
        owner: "产品支持",
        status: "retired",
        note: "旧版卡片仍被个别门店保存，造成现场继续引用错误解释。",
        nextAction: "通过信息同步中心追齐未回收门店，并补一次确认动作。",
      },
      {
        id: "o2-h3",
        title: "培训案例脚本",
        version: "v3.1 当前版",
        updatedAt: "2026-04-20 14:00",
        owner: "社区运营",
        status: "current",
        note: "已补“版本断层”案例，能直接和售后归因页对齐。",
        nextAction: "继续把案例同步到题库和 AI 场景，避免只改课程不改练习。",
      },
    ],
    reuseCards: [
      {
        id: "o2-r1",
        title: "版本断层归因模板",
        scenario: "适用于工艺规范已更新，但门店、售后或培训模板没有同版替换的场景。",
        owner: "信息同步中心",
        status: "ready",
        note: "可以直接复用“谁已确认 / 谁仍在用旧版 / 哪些模板未替换”的闭环字段。",
        targets: ["信息同步", "内容版本治理", "培训回流"],
      },
      {
        id: "o2-r2",
        title: "模板补字段方案",
        scenario: "适用于售后记录缺关键字段、导致责任判断偏弱的场景。",
        owner: "售后模板维护",
        status: "pilot",
        note: "已沉淀成补字段清单，下一步可接到版本管理与消息提醒。",
        targets: ["版本管理", "消息中心", "售后模板"],
      },
    ],
    closureRule: "版本同步类售后归因，只有门店话术、售后模板、培训案例和知识版本都确认同版后，才算真正闭环。",
  },
  o3: {
    trendSummary: "这是一张低风险通过单，重点不是制造更多动作，而是保留“为什么当前模板足够稳定”的最小证据链。",
    recurrenceTrend: [
      {
        id: "o3-t1",
        period: "近 4 周",
        issueCount: "1 单",
        rate: "4%",
        status: "stable",
        note: "同类规格问题占比始终较低。",
      },
      {
        id: "o3-t2",
        period: "近 3 周",
        issueCount: "1 单",
        rate: "4%",
        status: "stable",
        note: "流程执行一致，没有新的异常扩散。",
      },
      {
        id: "o3-t3",
        period: "近 2 周",
        issueCount: "0 单",
        rate: "0%",
        status: "improving",
        note: "模板更新后未再出现同类冲突。",
      },
      {
        id: "o3-t4",
        period: "本周",
        issueCount: "0 单",
        rate: "0%",
        status: "improving",
        note: "当前只需维持最小留痕和抽样复核。",
      },
    ],
    templateHistory: [
      {
        id: "o3-h1",
        title: "订单录入模板",
        version: "v3.1 当前版",
        updatedAt: "2026-04-20 09:00",
        owner: "订单系统维护",
        status: "current",
        note: "规格、系列和版本字段都已标准化，当前执行稳定。",
        nextAction: "继续保持抽样复核，不需要额外加码动作。",
      },
      {
        id: "o3-h2",
        title: "售后归因模板",
        version: "v2.5 当前版",
        updatedAt: "2026-04-21 09:20",
        owner: "售后回流",
        status: "current",
        note: "当前模板可直接说明“为什么无需异常升级”。",
        nextAction: "保留最小通过案例，作为后续正常单参考。",
      },
    ],
    reuseCards: [
      {
        id: "o3-r1",
        title: "标准通过案例模板",
        scenario: "适用于没有售后异常、但需要说明为什么能继续推进的正常单。",
        owner: "审单回流",
        status: "ready",
        note: "可直接复用“通过依据 + 最小留痕 + 抽样复核说明”结构。",
        targets: ["工艺校验", "售后归因", "复盘记录"],
      },
    ],
    closureRule: "正常通过单也应保留最小趋势和模板依据，说明当前流程为什么可信，而不是只给一个“正常”结论。",
  },
  o4: {
    trendSummary: "这类售后问题本质是“参数知道了，但没和真实场景绑定”，如果不把场景模板和核对清单一起补齐，复发率会持续波动。",
    recurrenceTrend: [
      {
        id: "o4-t1",
        period: "近 4 周",
        issueCount: "2 单",
        rate: "9%",
        status: "stable",
        note: "湿区等级误解主要出现在个别门店。",
      },
      {
        id: "o4-t2",
        period: "近 3 周",
        issueCount: "3 单",
        rate: "12%",
        status: "watch",
        note: "安装前核对清单没有承接适用区间判断。",
      },
      {
        id: "o4-t3",
        period: "近 2 周",
        issueCount: "4 单",
        rate: "15%",
        status: "rising",
        note: "门店解释和现场执行之间的断层开始放大。",
      },
      {
        id: "o4-t4",
        period: "本周",
        issueCount: "2 单",
        rate: "11%",
        status: "watch",
        note: "复测已排期，但场景化模板和核对清单还没完全同步。",
      },
    ],
    templateHistory: [
      {
        id: "o4-h1",
        title: "湿区等级解释模板",
        version: "v1.4 待替换",
        updatedAt: "2026-04-20 17:00",
        owner: "社区运营",
        status: "updating",
        note: "正在从知识点说明改成“场景 + 推荐等级 + 禁用边界”的结构。",
        nextAction: "替换课件、题库和讲解话术中的旧版解释。",
      },
      {
        id: "o4-h2",
        title: "安装前核对清单",
        version: "v2.1 当前版",
        updatedAt: "2026-04-21 10:30",
        owner: "安装交付",
        status: "current",
        note: "已准备补“适用区间复核”字段，但现场还没全部执行。",
        nextAction: "跟着复测结果一起回看是否真的拦住同类问题。",
      },
      {
        id: "o4-h3",
        title: "售后归因模板",
        version: "v2.4 已归档",
        updatedAt: "2026-04-18 19:10",
        owner: "售后回流",
        status: "retired",
        note: "旧版模板只记录参数错误，没有记录“场景理解偏差”这一层。",
        nextAction: "统一改用新版场景归因模板，避免只追知识点不追场景。",
      },
    ],
    reuseCards: [
      {
        id: "o4-r1",
        title: "场景理解偏差模板",
        scenario: "适用于参数本身没错，但前端推荐与真实使用场景不匹配的异常单。",
        owner: "带教复盘",
        status: "ready",
        note: "能直接复用“场景判断失误 / 现场二次拦截缺失 / 复测回写”三段式归因。",
        targets: ["培训回流", "运营任务", "问题标注"],
      },
      {
        id: "o4-r2",
        title: "核对清单补字段建议",
        scenario: "适用于现场本可提前拦截、但清单字段未覆盖的场景。",
        owner: "安装交付",
        status: "pending",
        note: "字段方案已给出，等待和安装端执行表合并后再全面启用。",
        targets: ["安装交付", "流程校验", "复盘纪要"],
      },
    ],
    closureRule: "场景类售后归因只有在解释模板、安装前核对和复测结果三者都补齐时，才算真正具备可复用的防复发方案。",
  },
};

const defaultDetail: AfterSaleAttributionDetail = {
  trendSummary: "当前订单没有配置更深的售后归因追溯信息，将按通用趋势、模板和复用结构展示。",
  recurrenceTrend: [
    {
      id: "default-t1",
      period: "本周",
      issueCount: "待确认",
      rate: "--",
      status: "watch",
      note: "建议补一轮基础复发趋势，避免只看当前单。",
    },
  ],
  templateHistory: [
    {
      id: "default-h1",
      title: "售后归因模板",
      version: "待确认",
      updatedAt: "待确认",
      owner: "当前处理人",
      status: "updating",
      note: "建议补充模板版本和更新时间，便于追源。",
      nextAction: "至少明确本单使用的是哪版归因模板。",
    },
  ],
  reuseCards: [
    {
      id: "default-r1",
      title: "通用归因复用卡",
      scenario: "适用于当前还没有沉淀复用能力的售后单。",
      owner: "当前处理人",
      status: "pending",
      note: "建议补一个可复用的责任拆解模板，供后续同类单直接套用。",
      targets: ["售后归因", "培训回流"],
    },
  ],
  closureRule: "建议至少补齐复发趋势、模板版本和一条可复用归因卡后，再作为完整的售后归因页使用。",
};

export function getAfterSaleAttributionDetailByOrderId(orderId?: string) {
  if (!orderId) {
    return defaultDetail;
  }

  return afterSaleAttributionDetails[orderId] ?? defaultDetail;
}
