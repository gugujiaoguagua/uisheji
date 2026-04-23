export type SyncState = "done" | "pending" | "risk";

export type ContentItem = {
  id: string;
  title: string;
  type: string;
  currentVersion: string;
  lastVersion: string;
  status: "published" | "pending_push";
  completionRate: number;
  passRate: number;
  retestNeeded: number;
  lastUpdated: string;
  sourceUpdate: string;
  sourceUpdateId: string;
  syncStatus: {
    course: SyncState;
    questionBank: SyncState;
    practiceScenario: SyncState;
  };
  syncNotes: string[];
  versionHistory: { version: string; date: string; note: string; state: "legacy" | "published" | "current" }[];
  executionPlan: { label: string; status: SyncState; note: string }[];
  targetUsers: string[];
};

export const contents: ContentItem[] = [
  {
    id: "c1",
    title: "云岚石暖冬系列产品参数手册",
    type: "产品课件",
    currentVersion: "v2.3",
    lastVersion: "v2.1",
    status: "published",
    completionRate: 100,
    passRate: 88,
    retestNeeded: 3,
    lastUpdated: "2024-01-15",
    sourceUpdate: "新品参数更新 v2.3",
    sourceUpdateId: "u2",
    syncStatus: {
      course: "done",
      questionBank: "done",
      practiceScenario: "done",
    },
    syncNotes: ["课件、题库与陪练场景已一起切到 R10 新参数。", "当前可直接发起重学与复测。"],
    versionHistory: [
      { version: "v2.1", date: "2023-12-20", note: "旧版参数手册，仍含 R9 口径。", state: "legacy" },
      { version: "v2.2", date: "2024-01-05", note: "补充规格但未完全覆盖新品推荐话术。", state: "published" },
      { version: "v2.3", date: "2024-01-15", note: "已切换到 R10 与新规格，作为当前标准版本。", state: "current" },
    ],
    executionPlan: [
      { label: "同步学习中心课程", status: "done", note: "学习中心与课件已同版上线。" },
      { label: "发起新品参数复测", status: "pending", note: "仍有 3 人需要完成新版参数复测。" },
      { label: "更新陪练推荐场景", status: "done", note: "卫浴推荐场景已切换到新参数。" },
    ],
    targetUsers: ["李明", "王芳", "赵强"],
  },
  {
    id: "c2",
    title: "防水产品施工规范",
    type: "工艺规范",
    currentVersion: "v3.1",
    lastVersion: "v3.0",
    status: "pending_push",
    completionRate: 45,
    passRate: 70,
    retestNeeded: 8,
    lastUpdated: "2024-01-14",
    sourceUpdate: "防水产品施工规范 v3.1 发布",
    sourceUpdateId: "u1",
    syncStatus: {
      course: "done",
      questionBank: "pending",
      practiceScenario: "pending",
    },
    syncNotes: ["课件已更新到 v3.1，但题库里仍有旧厚度标准。", "AI 陪练场景还未替换到新版施工口径。"],
    versionHistory: [
      { version: "v3.0", date: "2023-11-10", note: "旧版厚度标准仍在题库和部分话术里残留。", state: "legacy" },
      { version: "v3.1-beta", date: "2024-01-10", note: "内部评审稿，新增禁用材料。", state: "published" },
      { version: "v3.1", date: "2024-01-14", note: "当前正式标准版本，需要同步题库和陪练。", state: "current" },
    ],
    executionPlan: [
      { label: "推送重学任务", status: "pending", note: "覆盖 12 名已学习旧版人员。" },
      { label: "替换题库旧厚度标准题", status: "pending", note: "仍有 8 道题未替换。" },
      { label: "更新施工解释陪练场景", status: "pending", note: "需要同步 AI 陪练中的新版口径。" },
    ],
    targetUsers: ["李明", "王芳", "赵强", "陈伟", "张磊", "孙洁", "周浩", "林娜"],
  },
  {
    id: "c3",
    title: "客户价值异议处理话术库",
    type: "销售话术",
    currentVersion: "v1.8",
    lastVersion: "v1.7",
    status: "published",
    completionRate: 73,
    passRate: 82,
    retestNeeded: 2,
    lastUpdated: "2024-01-12",
    sourceUpdate: "客户异议处理话术库 v1.8 更新",
    sourceUpdateId: "u3",
    syncStatus: {
      course: "done",
      questionBank: "risk",
      practiceScenario: "pending",
    },
    syncNotes: ["价格异议题库解释已补，但答案解析还偏弱。", "高频异议陪练场景还没替换成新话术结构。"],
    versionHistory: [
      { version: "v1.7", date: "2023-12-18", note: "旧版价格异议结构，偏解释型。", state: "legacy" },
      { version: "v1.8-rc", date: "2024-01-08", note: "新增高频异议回应草稿。", state: "published" },
      { version: "v1.8", date: "2024-01-12", note: "正式版强调三步引导结构。", state: "current" },
    ],
    executionPlan: [
      { label: "补强题库答案解释", status: "risk", note: "答案解析仍然偏弱，无法支撑带教复盘。" },
      { label: "更新价格异议陪练场景", status: "pending", note: "高频异议场景需改成新话术结构。" },
      { label: "沉淀优秀案例到案例库", status: "pending", note: "还需要和销设协同联动。" },
    ],
    targetUsers: ["王芳", "陈伟"],
  },
];

export function syncTone(status: SyncState) {
  if (status === "done") return "bg-green-50 text-[#15803D] border-green-100";
  if (status === "risk") return "bg-red-50 text-[#DC2626] border-red-100";
  return "bg-amber-50 text-[#B45309] border-amber-100";
}

export function syncLabel(status: SyncState) {
  if (status === "done") return "已同步";
  if (status === "risk") return "待复核";
  return "待同步";
}

export function getContentById(id?: string) {
  return contents.find((item) => item.id === id) ?? contents[0];
}
