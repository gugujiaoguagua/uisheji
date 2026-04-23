export type RiskLevel = "high" | "medium";

export type RiskMember = {
  id: string;
  name: string;
  risk: RiskLevel;
  avatar: string;
  role: string;
  detail: string;
  completionRate: number;
  lastActive: string;
  weakArea: string;
  suggestedAction: string;
  pendingTasks: number;
  upcomingNode: string;
  riskTags: string[];
  coachPlan: string[];
};

export type TeamMember = {
  name: string;
  completionRate: number;
  score: number;
  practiceCount: number;
  status: "normal" | "warning" | "risk";
};

export type CompletionDatum = {
  name: string;
  value: number;
  risk: boolean;
};

export type KeyNode = {
  id: string;
  event: string;
  date: string;
  daysLeft: number;
  readyCount: number;
  totalCount: number;
  riskNote: string;
  urgent: boolean;
};

export const riskMeta: Record<RiskLevel, { label: string; pill: string; border: string; avatar: string }> = {
  high: {
    label: "高风险",
    pill: "bg-red-100 text-[#DC2626]",
    border: "#DC2626",
    avatar: "bg-[#DC2626]",
  },
  medium: {
    label: "中风险",
    pill: "bg-amber-100 text-[#B45309]",
    border: "#F59E0B",
    avatar: "bg-[#F59E0B]",
  },
};

export const riskMembers: RiskMember[] = [
  {
    id: "m1",
    name: "李明",
    risk: "high",
    avatar: "李",
    role: "销售顾问",
    detail: "连续 3 天未完成新品课，下周有产品推介活动，当前对新品参数仍不稳定。",
    completionRate: 32,
    lastActive: "3天前",
    weakArea: "新品参数",
    suggestedAction: "今天先电话确认阻塞点，再下发《暖冬系列参数速记》补学任务。",
    pendingTasks: 3,
    upcomingNode: "下周一新品推介活动",
    riskTags: ["连续掉队", "活动临近", "参数不稳"],
    coachPlan: ["先确认是否卡在规格理解。", "安排 15 分钟参数速记复盘。"],
  },
  {
    id: "m2",
    name: "王芳",
    risk: "high",
    avatar: "王",
    role: "销售顾问",
    detail: "考核得分连续下降：88→75→62，最近讲解中多次出现规格核对口径不稳。",
    completionRate: 55,
    lastActive: "今天",
    weakArea: "销售话术",
    suggestedAction: "安排 1 对 1 陪练复盘，重点盯客户追问和规格解释。",
    pendingTasks: 2,
    upcomingNode: "本周客户讲解复盘",
    riskTags: ["分数下滑", "讲解波动", "需陪练"],
    coachPlan: ["今晚补做一轮 AI 陪练。", "带教人明天抽查讲解 10 分钟。"],
  },
  {
    id: "m3",
    name: "赵强",
    risk: "medium",
    avatar: "赵",
    role: "销售顾问",
    detail: "防水规范未确认，仍在使用 v3.0 旧规范话术，存在知识版本断层风险。",
    completionRate: 70,
    lastActive: "昨天",
    weakArea: "工艺规范",
    suggestedAction: "提醒确认 v3.1 并推送重学任务，避免继续沿用旧版材料口径。",
    pendingTasks: 1,
    upcomingNode: "本月工艺复测",
    riskTags: ["旧版口径", "待确认", "规范风险"],
    coachPlan: ["先补看 v3.1 更新摘要。", "复测前抽查一题禁用材料判断。"],
  },
];

export const teamMembers: TeamMember[] = [
  { name: "陈伟", completionRate: 90, score: 88, practiceCount: 8, status: "normal" },
  { name: "张磊", completionRate: 85, score: 82, practiceCount: 6, status: "normal" },
  { name: "刘洋", completionRate: 78, score: 79, practiceCount: 5, status: "warning" },
  { name: "赵强", completionRate: 70, score: 72, practiceCount: 4, status: "warning" },
  { name: "王芳", completionRate: 55, score: 62, practiceCount: 3, status: "risk" },
  { name: "李明", completionRate: 32, score: 45, practiceCount: 1, status: "risk" },
];

export const completionData: CompletionDatum[] = [
  { name: "陈伟", value: 90, risk: false },
  { name: "张磊", value: 85, risk: false },
  { name: "刘洋", value: 78, risk: false },
  { name: "赵强", value: 70, risk: true },
  { name: "王芳", value: 55, risk: true },
  { name: "李明", value: 32, risk: true },
];

export const keyNodes: KeyNode[] = [
  {
    id: "n1",
    event: "新品推介活动",
    date: "下周一",
    daysLeft: 5,
    readyCount: 4,
    totalCount: 6,
    riskNote: "2 人（李明、王芳）尚未完成必学课程。",
    urgent: true,
  },
  {
    id: "n2",
    event: "月度考核截止",
    date: "本月底",
    daysLeft: 14,
    readyCount: 5,
    totalCount: 6,
    riskNote: "赵强需完成 2 门课程并确认新版规范。",
    urgent: false,
  },
];
