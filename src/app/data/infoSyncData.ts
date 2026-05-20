export type SyncNode = {
  label: string;
  owner: string;
  status: "done" | "pending" | "risk";
  note: string;
};

export type ImpactScope = {
  label: string;
  owner: string;
  severity: "high" | "medium" | "low";
  note: string;
};

export type Update = {
  id: string;
  title: string;
  category: string;
  version: string;
  publishedAt: string;
  urgency: "urgent" | "normal";
  affectedRoles: string[];
  affectedCount: number;
  confirmedCount: number;
  pendingCount: number;
  pendingUsers: string[];
  oldContentUsers: number;
  summary: string;
  status: "pending" | "pushed" | "completed";
  changes: string[];
  impactScopes: ImpactScope[];
  syncLinks: SyncNode[];
};

export const updates: Update[] = [
  {
    id: "u1",
    title: "防水产品施工规范 v3.1 发布",
    category: "工艺规范",
    version: "v3.1",
    publishedAt: "2024-01-15 09:00",
    urgency: "urgent",
    affectedRoles: ["销售顾问", "设计师", "审单人员"],
    affectedCount: 18,
    confirmedCount: 12,
    pendingCount: 6,
    pendingUsers: ["李明", "王芳", "赵强", "陈伟", "张磊", "孙洁"],
    oldContentUsers: 10,
    summary: "新增 2 类禁用材料，卫浴区施工厚度要求提升，影响现有话术、题库和审单标准。",
    status: "pushed",
    changes: [
      "新增禁用：单组分聚氨酯（潮湿基层）",
      "新增禁用：强溶剂型防水涂料",
      "卫浴涂层最小厚度：1.5mm → 2.0mm",
      "地漏周边加强层：200mm → 300mm",
    ],
    impactScopes: [
      { label: "销售对客解释口径", owner: "门店销售", severity: "high", note: "仍有人沿用旧厚度标准，对客承诺存在风险。" },
      { label: "设计与方案说明", owner: "设计协同", severity: "medium", note: "设计图备注和施工提示需要同步到新版限制。" },
      { label: "审单规则", owner: "审单回流", severity: "low", note: "审单提示词已更新，但需要继续核对历史草稿。" },
    ],
    syncLinks: [
      { label: "培训课件", owner: "社区运营", status: "done", note: "规范讲义已更新到 v3.1。" },
      { label: "考核题库", owner: "社区运营", status: "pending", note: "仍有 8 道旧厚度标准题未替换。" },
      { label: "AI 陪练场景", owner: "社区运营", status: "pending", note: "卫浴施工解释场景仍沿用旧口径。" },
      { label: "审单标准", owner: "审单回流", status: "done", note: "审单提示词已同步新版厚度要求。" },
    ],
  },
  {
    id: "u2",
    title: "云岚石·暖冬系列参数更新 v2.3",
    category: "新品参数",
    version: "v2.3",
    publishedAt: "2024-01-14 14:30",
    urgency: "urgent",
    affectedRoles: ["销售顾问"],
    affectedCount: 15,
    confirmedCount: 15,
    pendingCount: 0,
    pendingUsers: [],
    oldContentUsers: 3,
    summary: "防滑系数从 R9 升级至 R10，新增规格，旧款停产。",
    status: "completed",
    changes: ["防滑系数 R9 → R10", "新增规格：P800×800、P600×1200", "旧款 P400×800 已停产"],
    impactScopes: [
      { label: "对客推荐话术", owner: "门店销售", severity: "medium", note: "要统一改成 R10 与湿区安全场景的讲法。" },
      { label: "学习中心资料", owner: "社区运营", severity: "low", note: "学习中心和课件已全量更新。" },
      { label: "陪练训练场景", owner: "AI 陪练", severity: "low", note: "新品推荐场景已切换到新参数。" },
    ],
    syncLinks: [
      { label: "培训课件", owner: "社区运营", status: "done", note: "课件与学习中心已全量更新。" },
      { label: "考核题库", owner: "社区运营", status: "done", note: "R10 相关题已全部替换并上线。" },
      { label: "AI 陪练场景", owner: "社区运营", status: "done", note: "卫浴推荐场景已切换到新参数。" },
      { label: "销售话术", owner: "内容治理", status: "done", note: "直接对客话术已更新。" },
    ],
  },
  {
    id: "u3",
    title: "客户异议处理话术库 v1.8 更新",
    category: "销售话术",
    version: "v1.8",
    publishedAt: "2024-01-12 11:00",
    urgency: "normal",
    affectedRoles: ["销售顾问"],
    affectedCount: 15,
    confirmedCount: 8,
    pendingCount: 7,
    pendingUsers: ["李明", "王芳", "赵强", "陈伟", "张磊", "周浩", "林娜"],
    oldContentUsers: 0,
    summary: "新增 5 条高频异议场景回应，优化价格异议引导结构。",
    status: "pushed",
    changes: ["新增：客户质疑品牌知名度回应", "新增：同类产品直接对比回应", "优化：价格异议 3 步引导结构"],
    impactScopes: [
      { label: "客户价格异议处理", owner: "门店销售", severity: "high", note: "如果继续使用旧话术，容易重新回到纯比价。" },
      { label: "培训题库答案解析", owner: "社区运营", severity: "medium", note: "题目已补，但答案解释还不够强。" },
      { label: "案例库沉淀", owner: "销设协同", severity: "medium", note: "高频异议尚未形成标准案例可复用。" },
    ],
    syncLinks: [
      { label: "培训课件", owner: "社区运营", status: "done", note: "讲义已同步新结构。" },
      { label: "考核题库", owner: "社区运营", status: "risk", note: "题库已补，但正确答案解释仍较弱。" },
      { label: "AI 陪练场景", owner: "社区运营", status: "pending", note: "价格异议场景还未换成新话术。" },
      { label: "案例库", owner: "销设协同", status: "pending", note: "高频异议尚未沉淀为标准案例。" },
    ],
  },
];

export function nodeTone(status: SyncNode["status"]) {
  if (status === "done") return "bg-green-50 border-green-100 text-[#15803D]";
  if (status === "risk") return "bg-red-50 border-red-100 text-[#DC2626]";
  return "bg-amber-50 border-amber-100 text-[#B45309]";
}

export function impactTone(severity: ImpactScope["severity"]) {
  if (severity === "high") return "bg-red-50 border-red-100 text-[#DC2626]";
  if (severity === "medium") return "bg-amber-50 border-amber-100 text-[#B45309]";
  return "bg-blue-50 border-blue-100 text-[#2F5FD0]";
}

export function getUpdateById(id?: string) {
  return updates.find((item) => item.id === id) ?? updates[0];
}
