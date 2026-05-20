export type RecordTone = "done" | "pending" | "risk";
export type TimelineDomain = "sync" | "collab" | "growth" | "approval" | "order";

export interface TimelineRecord {
  id: string;
  domain: TimelineDomain;
  tone: RecordTone;
  title: string;
  detail: string;
  time: string;
  actor: string;
  tags: string[];
  relatedPath: string;
}

export interface CoachTask {
  id: string;
  title: string;
  owner: string;
  source: string;
  priority: "high" | "medium" | "normal";
  status: "todo" | "in_progress" | "done";
  deadline: string;
  nextNode: string;
  action: string;
  relatedPath: string;
  tags: string[];
  note: string;
}

export interface UpdateRecord {
  id: string;
  title: string;
  version: string;
  owner: string;
  tone: RecordTone;
  publishedAt: string;
  affectedSummary: string;
  confirmation: string;
  syncSummary: string;
  nextActions: string[];
  risks: string[];
  relatedPath: string;
  versionPath: string;
  history: TimelineRecord[];
}

export interface ReviewRecord {
  id: string;
  title: string;
  tone: RecordTone;
  meetingTime: string;
  owner: string;
  decision: string;
  summary: string;
  attendees: string[];
  followUps: string[];
  assets: string[];
  relatedPath: string;
  scorePath: string;
  history: TimelineRecord[];
}

export interface RetestSession {
  id: string;
  title: string;
  kind: "复测" | "补考";
  tone: RecordTone;
  status: "待开始" | "进行中" | "已通过" | "未通过";
  candidate: string;
  relatedArea: string;
  scheduledAt: string;
  score: string;
  prerequisite: string[];
  notes: string[];
  nextAction: string;
  relatedPath: string;
}

export interface StateScene {
  id: string;
  category: "empty" | "success" | "pending" | "exception";
  title: string;
  source: string;
  summary: string;
  trigger: string;
  actionLabel: string;
  actionPath: string;
  rules: string[];
  avoid: string;
}


export const timelineDomainMeta: Record<TimelineDomain, { label: string; badge: string }> = {
  sync: { label: "更新同步", badge: "bg-blue-50 text-[#2F5FD0]" },
  collab: { label: "销设协同", badge: "bg-purple-50 text-purple-700" },
  growth: { label: "补训复测", badge: "bg-green-50 text-[#15803D]" },
  approval: { label: "审批申请", badge: "bg-amber-50 text-[#B45309]" },
  order: { label: "审单回流", badge: "bg-red-50 text-[#DC2626]" },
};

export const historyTimelineRecords: TimelineRecord[] = [
  {
    id: "timeline-1",
    domain: "sync",
    tone: "pending",
    title: "防水产品施工规范 v3.1 已发布，仍有题库与陪练节点待同步",
    detail: "当前真正的风险不只是没通知到人，而是课件、题库、AI 陪练口径还没有完全切齐。",
    time: "今天 09:10",
    actor: "社区运营",
    tags: ["工艺规范", "题库待替换", "AI 陪练待更新"],
    relatedPath: "/workbench/info-sync/records",
  },
  {
    id: "timeline-2",
    domain: "collab",
    tone: "pending",
    title: "卫浴改造项目完成会审准备，等待客户讲解评分闭环",
    detail: "前半段交接和会审都齐了，但还没把评分反馈、AI 讲稿优化和案例沉淀继续接上。",
    time: "今天 11:30",
    actor: "销设协同",
    tags: ["会审准备", "评分待补", "案例沉淀待做"],
    relatedPath: "/workbench/collab/records",
  },
  {
    id: "timeline-3",
    domain: "growth",
    tone: "done",
    title: "工艺规范补训后完成首轮复评，旧版口径基本被清掉",
    detail: "复评结果显示专项测试、现场复述和风险提醒三个维度都有明显抬升，可以继续补一轮表达稳定性。",
    time: "昨天 17:20",
    actor: "系统复评 + 带教",
    tags: ["复评通过", "工艺规范", "继续巩固表达"],
    relatedPath: "/learning/growth/retest-makeup",
  },
  {
    id: "timeline-4",
    domain: "approval",
    tone: "pending",
    title: "转工作人员申请进入审批阶段，待店长初审",
    detail: "当前已具备学习侧基础条件，但正式权限还没切换完成，仍需看完整审批进度和说明。",
    time: "昨天 18:20",
    actor: "审批中心",
    tags: ["转岗申请", "待初审"],
    relatedPath: "/profile/approval-status",
  },
  {
    id: "timeline-5",
    domain: "order",
    tone: "risk",
    title: "订单 #2024-0312 出现规格异常，工厂暂停生产等待确认",
    detail: "问题已经不只是当前订单本身，还需要继续回流到培训和审单标准，避免同类漏项重复出现。",
    time: "昨天 15:40",
    actor: "审单回流",
    tags: ["规格不符", "暂停生产", "需回流培训"],
    relatedPath: "/workbench/order-review",
  },
  {
    id: "timeline-6",
    domain: "sync",
    tone: "done",
    title: "暖冬系列参数更新已全量同步，R10 口径切换完成",
    detail: "新品参数、学习中心、题库和陪练场景都已完成同版承接，可以直接发起复测。",
    time: "前天 16:00",
    actor: "社区运营",
    tags: ["新品参数", "R10", "同步完成"],
    relatedPath: "/workbench/info-sync/records",
  },
];

export const coachTasks: CoachTask[] = [
  {
    id: "coach-task-1",
    title: "联系李明确认阻塞点，并下发《暖冬系列参数速记》补学任务",
    owner: "李明",
    source: "异常看板",
    priority: "high",
    status: "todo",
    deadline: "今天 15:30 前",
    nextNode: "下周一新品推介活动",
    action: "先确认为什么 3 天未学，再推送补学与 1 次简短抽查。",
    relatedPath: "/workbench/dashboard/risk",
    tags: ["连续掉队", "新品参数", "活动临近"],
    note: "这类对象优先看“近期节点 + 连续掉队”，不要先看平均分。",
  },
  {
    id: "coach-task-2",
    title: "安排王芳做 1 对 1 陪练复盘，并记录高风险语句",
    owner: "王芳",
    source: "异常看板",
    priority: "high",
    status: "in_progress",
    deadline: "今天下班前",
    nextNode: "本周客户讲解复盘",
    action: "围绕客户追问和规格解释做 10 分钟抽查，复盘高风险表达。",
    relatedPath: "/workbench/collab/records",
    tags: ["讲解波动", "评分反馈", "需陪练"],
    note: "不要只告诉她“去练”，要把风险语句和替代讲法一起留痕。",
  },
  {
    id: "coach-task-3",
    title: "追齐施工规范 v3.1 的题库替换，并决定何时发起重学 / 复测",
    owner: "社区运营",
    source: "信息同步",
    priority: "high",
    status: "todo",
    deadline: "今天 18:00 前",
    nextNode: "本周五专项复测",
    action: "先把旧厚度标准题替换完，再统一触发重学与复测，避免重复通知。",
    relatedPath: "/workbench/info-sync/records",
    tags: ["题库待替换", "重学触发", "复测时机"],
    note: "更新未闭环时，复测发得越早，反而越容易造成无效补训。",
  },
  {
    id: "coach-task-4",
    title: "督导赵强先确认新版规范，再补一次施工说明复述",
    owner: "赵强",
    source: "成长与补训",
    priority: "medium",
    status: "todo",
    deadline: "明天中午前",
    nextNode: "本月工艺复测",
    action: "先看更新摘要，再做 1 次客户解释复述，最后再进专项测试。",
    relatedPath: "/learning/growth/retest-makeup",
    tags: ["旧版口径", "待确认", "工艺规范"],
    note: "先纠正口径，再追求速度。不要直接把人推进考试。",
  },
  {
    id: "coach-task-5",
    title: "为卫浴改造项目补一条会审决议与后续动作记录",
    owner: "销设协同",
    source: "销售-设计协同",
    priority: "medium",
    status: "in_progress",
    deadline: "今天 17:00 前",
    nextNode: "客户讲解评分反馈",
    action: "把会审决议、责任人和下次复盘节点一起写清，不要只留口头结论。",
    relatedPath: "/workbench/collab/records",
    tags: ["会审纪要", "决议留痕", "责任人"],
    note: "如果只做准备页、不做记录页，后续评分和案例沉淀会断链。",
  },
  {
    id: "coach-task-6",
    title: "复盘订单 #2024-0312 的异常原因，并回流到培训动作",
    owner: "审单回流",
    source: "审单·回流",
    priority: "high",
    status: "done",
    deadline: "昨天 16:20",
    nextNode: "沉淀返单原因识别练习",
    action: "已完成责任归因和培训回流拆解，下一步是把案例转成练习素材。",
    relatedPath: "/workbench/order-review",
    tags: ["规格异常", "责任归因", "回流培训"],
    note: "异常单不只要处理当前订单，还要沉淀到题库、陪练和带教动作。",
  },
];

export const updateRecords: UpdateRecord[] = [
  {
    id: "update-record-1",
    title: "防水产品施工规范",
    version: "v3.1",
    owner: "社区运营",
    tone: "pending",
    publishedAt: "2024-01-15 09:00",
    affectedSummary: "影响销售、设计、审单三类角色，共 18 人",
    confirmation: "12/18 已确认，仍有 6 人未读新版要求",
    syncSummary: "课件已完成，题库与 AI 陪练仍待同步",
    nextActions: [
      "替换 8 道旧厚度标准题，再发起统一复测。",
      "把卫浴施工解释场景切到新版口径，避免训练仍在教旧版本。",
      "对未确认人员分角色催办，优先盯门店一线和本周要接单的人。",
    ],
    risks: [
      "销售与设计说法不一致，容易继续对客户做旧标准承诺。",
      "培训课件虽然已更新，但题库和陪练没跟上，会造成“学一套、考一套、练一套”。",
    ],
    relatedPath: "/workbench/info-sync/update/u1",
    versionPath: "/workbench/content-ops/version/c2",
    history: [
      {
        id: "update-history-1",
        domain: "sync",
        tone: "done",
        title: "课件已切换到 v3.1 正式版",
        detail: "学习中心和独立课件页已更新，变更点对一线已可见。",
        time: "2024-01-15 10:10",
        actor: "社区运营",
        tags: ["课件完成"],
        relatedPath: "/workbench/content-ops/version/c2",
      },
      {
        id: "update-history-2",
        domain: "sync",
        tone: "pending",
        title: "题库仍有旧厚度标准题未替换",
        detail: "如果直接发起复测，会把旧知识再强化一遍。",
        time: "2024-01-15 11:40",
        actor: "社区运营",
        tags: ["题库待替换"],
        relatedPath: "/workbench/content-ops/version/c2",
      },
      {
        id: "update-history-3",
        domain: "sync",
        tone: "pending",
        title: "AI 陪练施工场景还没切到新版口径",
        detail: "这会让表达训练和课件内容继续分裂。",
        time: "2024-01-15 12:30",
        actor: "AI 陪练配置",
        tags: ["陪练待同步"],
        relatedPath: "/learning/ai-practice",
      },
    ],
  },
  {
    id: "update-record-2",
    title: "云岚石暖冬系列产品参数手册",
    version: "v2.3",
    owner: "内容治理",
    tone: "done",
    publishedAt: "2024-01-14 14:30",
    affectedSummary: "影响 15 名销售，重点涉及 R10 防滑和新增规格",
    confirmation: "15/15 已确认，前线口径已切齐",
    syncSummary: "学习中心、题库、陪练场景与销售话术都已完成同版承接",
    nextActions: [
      "直接发起 3 人复测，验证新品参数是否真正会讲。",
      "把这次同步过程沉淀成标准模板，后续新品发布沿用。",
    ],
    risks: [
      "虽然同步已完成，但仍有 3 人旧内容使用记录，需通过复测确认是否真的纠正。",
    ],
    relatedPath: "/workbench/info-sync/update/u2",
    versionPath: "/workbench/content-ops/version/c1",
    history: [
      {
        id: "update-history-4",
        domain: "sync",
        tone: "done",
        title: "新品参数课件和学习中心同步完成",
        detail: "R10 与新增规格已更新到所有前台材料。",
        time: "2024-01-14 15:00",
        actor: "社区运营",
        tags: ["学习中心"],
        relatedPath: "/workbench/content-ops/version/c1",
      },
      {
        id: "update-history-5",
        domain: "sync",
        tone: "done",
        title: "陪练场景切换到新品参数版本",
        detail: "卫浴推荐场景已能够承接新规格与 R10 讲法。",
        time: "2024-01-14 16:10",
        actor: "AI 陪练配置",
        tags: ["AI 陪练"],
        relatedPath: "/learning/ai-practice",
      },
    ],
  },
  {
    id: "update-record-3",
    title: "客户异议处理话术库",
    version: "v1.8",
    owner: "社区运营 + 销设协同",
    tone: "risk",
    publishedAt: "2024-01-12 11:00",
    affectedSummary: "影响一线销售高频异议处理话术与案例沉淀",
    confirmation: "8/15 已确认，仍有 7 人未读新版话术结构",
    syncSummary: "课件完成，但题库解释偏弱、陪练场景和案例库都没完全接上",
    nextActions: [
      "补强题库答案解析，让带教复盘时有统一依据。",
      "把高频异议改写成 AI 陪练场景，不要只停留在文档更新。",
      "把优秀讲法沉淀为案例，减少销售与设计说法不一致。",
    ],
    risks: [
      "新版话术如果不进入陪练，就只能停在“看过”，很难真的说出来。",
      "案例库未接上，后续新人带教仍然只能靠口口相传。",
    ],
    relatedPath: "/workbench/info-sync/update/u3",
    versionPath: "/workbench/content-ops/version/c3",
    history: [
      {
        id: "update-history-6",
        domain: "sync",
        tone: "done",
        title: "课件已更新为三步引导结构",
        detail: "价值确认、价格承接和异议追问顺序已调整。",
        time: "2024-01-12 13:00",
        actor: "社区运营",
        tags: ["课件完成"],
        relatedPath: "/workbench/content-ops/version/c3",
      },
      {
        id: "update-history-7",
        domain: "collab",
        tone: "pending",
        title: "高频异议案例仍未沉淀到协同案例库",
        detail: "设计侧和销售侧还没有共用同一个“怎么讲”的案例模板。",
        time: "2024-01-12 17:40",
        actor: "销设协同",
        tags: ["案例库待补"],
        relatedPath: "/workbench/collab/records",
      },
    ],
  },
];

export const reviewRecords: ReviewRecord[] = [
  {
    id: "review-record-1",
    title: "卫浴改造 · 老人安全型方案会审",
    tone: "pending",
    meetingTime: "今天 16:00",
    owner: "陈伟 / 刘设计师 / 周老师",
    decision: "先统一 R10 防滑、安全和维护成本的讲解顺序，再进入报价。",
    summary: "会审准备已完成，但客户讲解评分、AI 讲稿优化和案例沉淀还没有形成正式记录。",
    attendees: ["销售-陈伟", "设计-刘设计师", "带教-周老师"],
    followUps: [
      "客户讲解结束后，记录 3 条高风险语句与替代讲法。",
      "将评分反馈直接回写到 AI 优化讲稿，避免复盘断层。",
      "把最终讲稿与设计方案一起沉淀进案例库。",
    ],
    assets: ["客户平面图", "会审资料包", "评分反馈草稿", "优化后讲稿"],
    relatedPath: "/workbench/collab/review/r1",
    scorePath: "/workbench/collab/score/r1",
    history: [
      {
        id: "review-history-1",
        domain: "collab",
        tone: "done",
        title: "会审准备材料收齐",
        detail: "平面图、竞品对比话术和施工限制说明已齐。",
        time: "今天 14:20",
        actor: "销设协同",
        tags: ["材料齐套"],
        relatedPath: "/workbench/collab/review/r1",
      },
      {
        id: "review-history-2",
        domain: "collab",
        tone: "pending",
        title: "会审纪要与责任人尚未留痕",
        detail: "如果会后不补记录页，评分反馈和案例沉淀会找不到明确起点。",
        time: "今天 15:10",
        actor: "销设协同",
        tags: ["纪要待补"],
        relatedPath: "/workbench/collab/records",
      },
    ],
  },
  {
    id: "review-record-2",
    title: "全屋统一空间感方案复盘",
    tone: "done",
    meetingTime: "昨天 10:30",
    owner: "李明 / 刘设计师",
    decision: "保留“先统一感、后规格、再预算”的讲解结构，作为标准案例沉淀。",
    summary: "该项目已经形成标准案例，可直接反哺培训课件、陪练场景和后续新单会审。",
    attendees: ["销售-李明", "设计-刘设计师"],
    followUps: [
      "把标准讲稿同步到新人带教素材。",
      "将评分结果中的高亮表达加入 AI 陪练推荐句库。",
    ],
    assets: ["标准讲稿", "设计对照图", "讲解评分记录", "客户异议回应模板"],
    relatedPath: "/workbench/collab/review/r2",
    scorePath: "/workbench/collab/score/r2",
    history: [
      {
        id: "review-history-3",
        domain: "collab",
        tone: "done",
        title: "客户讲解评分已完成并达 91 分",
        detail: "需求复述、价值讲解和异议处理三个维度都达到可沉淀标准。",
        time: "昨天 11:20",
        actor: "带教老师",
        tags: ["评分完成"],
        relatedPath: "/workbench/collab/score/r2",
      },
      {
        id: "review-history-4",
        domain: "collab",
        tone: "done",
        title: "案例已进入案例库，可复用于新房整屋方案",
        detail: "后续可直接在会审准备、培训课件和 AI 陪练场景里复用。",
        time: "昨天 17:00",
        actor: "销设协同",
        tags: ["案例入库"],
        relatedPath: "/workbench/collab/records",
      },
    ],
  },
];

export const retestSessions: RetestSession[] = [
  {
    id: "retest-session-1",
    title: "防水施工规范 v3.1 专项测试",
    kind: "复测",
    tone: "pending",
    status: "待开始",
    candidate: "赵强",
    relatedArea: "工艺规范",
    scheduledAt: "本周五 15:00",
    score: "通过线 85 分",
    prerequisite: ["完成 v3.1 关键变更补学", "完成 1 次施工说明复述"],
    notes: [
      "本场重点验证禁用材料和卫浴施工厚度，避免继续沿用旧版口径。",
      "先确认题库是否已经替换完成，再正式开考。",
    ],
    nextAction: "先看补训任务，再到考核页完成专项复测。",
    relatedPath: "/learning/assessment",
  },
  {
    id: "retest-session-2",
    title: "返单原因识别补考",
    kind: "补考",
    tone: "risk",
    status: "未通过",
    candidate: "王芳",
    relatedArea: "审单流程",
    scheduledAt: "昨天 19:30",
    score: "61 / 85",
    prerequisite: ["补返单原因识别基础课", "完成 1 次交接信息检查练习"],
    notes: [
      "主要失分在尺寸确认与工艺限制边界判断。",
      "目前不建议直接重考，先把前置课和练习做完。",
    ],
    nextAction: "回到补训任务页，先补课再安排下一次补考。",
    relatedPath: "/learning/growth/retrain",
  },
  {
    id: "retest-session-3",
    title: "工艺规范补训后首轮复评",
    kind: "复测",
    tone: "done",
    status: "已通过",
    candidate: "李明",
    relatedArea: "工艺规范",
    scheduledAt: "昨天 17:20",
    score: "88 / 100",
    prerequisite: ["完成关键变更补学", "完成 1 次 AI 陪练复述"],
    notes: [
      "禁用材料识别和施工厚度说明明显提升。",
      "下一步只需继续巩固表达稳定性。",
    ],
    nextAction: "查看复评结果，确认还需不需要继续观察。",
    relatedPath: "/learning/growth/review-result",
  },
  {
    id: "retest-session-4",
    title: "暖冬系列参数 R10 版本复测",
    kind: "复测",
    tone: "pending",
    status: "进行中",
    candidate: "陈伟",
    relatedArea: "新品参数",
    scheduledAt: "今天 18:30",
    score: "已完成课件，待做试题",
    prerequisite: ["确认新品参数更新已读", "完成 1 次新品推荐陪练"],
    notes: [
      "重点不是重新背产品，而是确认 R10 和新增规格能不能说清楚。",
      "如果陪练结果不稳，先补讲解再交卷。",
    ],
    nextAction: "先去 AI 陪练把新品推荐讲顺，再回到考核页提交。",
    relatedPath: "/learning/ai-practice",
  },
];

export const stateScenes: StateScene[] = [
  {
    id: "state-empty-learning",
    category: "empty",
    title: "首页无数据 / 暂无任务",
    source: "Home",
    summary: "系统暂时没有分配任务时，要给用户一个可执行的兜底动作，而不是只说“暂无数据”。",
    trigger: "当前没有学习任务、没有更新提醒、也没有成长数据可展示。",
    actionLabel: "去首页看无数据态",
    actionPath: "/",
    rules: [
      "标题直接说明当前没有什么，如“暂无今日任务”“当前暂无学习数据”。",
      "正文要告诉用户下一步能做什么，比如去学习中心或推荐练习。",
      "CTA 只保留 1 个主动作，避免空态再制造选择压力。",
    ],
    avoid: "不要只丢一个空图标和“暂无数据”，用户会不知道接下来该做什么。",
  },
  {
    id: "state-filter-empty",
    category: "empty",
    title: "筛选后为空的业务空态",
    source: "RiskRoster / OrderReview",
    summary: "筛选空态要告诉用户“不是系统没有数据，而是当前条件下没命中”，并给回退路径。",
    trigger: "用户应用了筛选条件，但当前列表没有命中对象。",
    actionLabel: "去风险名单页看筛选空态",
    actionPath: "/workbench/dashboard/risk",
    rules: [
      "标题要说明是“当前筛选条件下没有结果”。",
      "说明里要给出调回“全部”或放宽筛选的建议。",
      "保持信息密度轻，不要做成像系统故障一样的异常态。",
    ],
    avoid: "不要把筛选空态和系统异常态混成同一种红色错误提示。",
  },
  {
    id: "state-network-fallback",
    category: "exception",
    title: "网络异常轻量兜底态",
    source: "Home",
    summary: "异常状态不应只报错，要给用户当前还能做的事，比如先看缓存内容、稍后重试同步。",
    trigger: "关键数据拉取失败，系统已切到轻量模式。",
    actionLabel: "去首页看网络异常态",
    actionPath: "/",
    rules: [
      "先说明问题是什么，再说明系统已做了什么兜底。",
      "保留一个恢复动作，比如“重新连接”，并给一个可继续完成的替代路径。",
      "异常文案要短，不要把技术错误细节直接抛给业务用户。",
    ],
    avoid: "不要把异常态写成只有失败，没有恢复动作。",
  },
  {
    id: "state-success-confirmed",
    category: "success",
    title: "全部确认 / 当前无异常成功态",
    source: "InfoSyncDetail / OrderReview",
    summary: "成功态不是庆祝就结束，而是告诉用户当前闭环到了哪一步、接下来可以去哪。",
    trigger: "影响人员已全部确认，或当前订单无异常可处理。",
    actionLabel: "去更新详情页看成功态",
    actionPath: "/workbench/info-sync/update/u2",
    rules: [
      "颜色和语义要明确区分于普通提示态。",
      "成功态最好顺手给一个下一步入口，如“去版本承接”“查看记录”。",
      "只在真正闭环或阶段性完成时使用，不要把“已读”误写成“已完成”。",
    ],
    avoid: "不要在成功态里继续塞大量风险提示，容易让用户误判当前状态。",
  },
  {
    id: "state-approval-pending",
    category: "pending",
    title: "审批流转中的待处理态",
    source: "ApprovalStatus / Home",
    summary: "待处理态不是简单提示“处理中”，而是说明当前卡在哪一步、系统会同步到哪里、用户现在还能做什么。",
    trigger: "审批、生成或同步动作已发起，但还没有走到最终完成态。",
    actionLabel: "去审批状态页看待处理态",
    actionPath: "/profile/approval-status",
    rules: [
      "先说明当前处在什么节点，比如“审批中”“待确认”“生成中”。",
      "告诉用户结果会同步到哪里，减少来回翻页确认。",
      "给一个当前仍可执行的动作，如查看提醒、补齐材料、返回上一层继续处理。",
    ],
    avoid: "不要只写“处理中”却不给阶段说明和下一步动作。",
  },
];

