import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronRight,
  Clock,
  TrendingUp,
  Brain,
  Dumbbell,
  ClipboardList,
  Bell,
  ArrowRight,
  RefreshCw,
  FileCheck,
  Users,
  BarChart3,
  Zap,
  Flame,
  Shield,
  CheckCircle2,
  Target,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  BookOpen,
  WifiOff,
  Phone,
  MessageSquare,
} from "lucide-react";
import {
  useApp,
  getIdentityLabel,
  getLearnerRoleMeta,
  getStaffRoleMeta,
  getStaffApprovalStatusMeta,
} from "../context/AppContext";
import { IdentityStatusBar, QuickActionGrid, TodayTaskCard } from "../components/BusinessBlocks";
import { GlobalStateCard, type GlobalStateTone } from "../components/GlobalStateCard";
import { appShellClass, getApprovalStatusToneClass, moduleIconToneClass } from "../lib/visualTokens";
import { trainingStudents } from "../data/trainingTeacherData";

type StudentHomeState =
  | "normal"
  | "first"
  | "new-product"
  | "relearn"
  | "retrain"
  | "completed"
  | "empty"
  | "network";

type UpdateType = "product" | "spec" | "qa" | "system";

interface StudentTask {
  id: number;
  type: "course" | "practice" | "exam" | "growth";
  title: string;
  desc: string;
  urgency: "urgent" | "warning" | "normal";
  deadline: string;
  duration: string;
  progress: number;
  path: string;
  ctaLabel?: string;
}

interface UpdateItem {
  title: string;
  time: string;
  type: UpdateType;
}

function getStudentFocusTone(state: StudentHomeState): GlobalStateTone {
  if (state === "completed") return "success";
  if (state === "empty") return "empty";
  if (state === "network") return "exception";
  return "pending";
}

interface StudentStateConfig {
  label: string;
  heroTitle: string;
  heroDesc: string;
  stats: { label: string; value: string; sub: string }[];
  focusCard: {
    tone: string;
    title: string;
    desc: string;
    actionLabel: string;
    actionPath: string;
  };
  taskTitle: string;
  tasks: StudentTask[];
  updates: UpdateItem[];
  growthCard: {
    tone: string;
    title: string;
    desc: string;
    actionLabel: string;
    actionPath: string;
  };
  emptyTaskState?: {
    title: string;
    desc: string;
    actionLabel: string;
    actionPath: string;
  };
  networkTip?: {
    title: string;
    desc: string;
    actionLabel: string;
  };
}

const studentStateOptions: { key: StudentHomeState; label: string }[] = [
  { key: "first", label: "首次进入" },
  { key: "normal", label: "正常训练中" },
  { key: "new-product", label: "有新品待看" },
  { key: "relearn", label: "有课件待重学" },
  { key: "retrain", label: "有补训任务" },
  { key: "completed", label: "今日已完成" },
  { key: "empty", label: "无数据" },
  { key: "network", label: "网络异常" },
];

const homeSectionVisibility = {
  studentHeroDescription: false,
  studentIdentityCard: false,
  studentUpdatesPanel: false,
  studentPermissionReminder: false,
  studentGrowthReminder: false,
  studentCurrentStatusReminder: false,
} as const;



const staffTasks = [
  {
    id: 1,
    type: "risk",
    title: "临港星河湾群人数低于 50% 目标线",
    desc: "当前 101 / 240 · 2 天无增长 · 需补资源入口和拉新动作",
    urgency: "urgent",
    action: "查看异常看板",
    path: "/workbench/dashboard",
  },
  {
    id: 2,
    type: "sync",
    title: "群人数 / 添加微信跨表口径不一致",
    desc: "嘉定云著销售明细与月度汇总不一致 · 先校验口径再看转化",
    urgency: "urgent",
    action: "去数据治理",
    path: "/workbench/content-ops",
  },
  {
    id: 3,
    type: "review",
    title: "青浦悦府 QC 为 0，样板间未启动",
    desc: "QC 目标 4 / 当前 0 · 样板间候选人和宣传节点缺失",
    urgency: "warning",
    action: "拆任务闭环",
    path: "/workbench/dashboard/tasks",
  },
  {
    id: 4,
    type: "training",
    title: "活动复盘模板待补 · 新人培养资料散落",
    desc: "直播、视频号、活动筹备和复盘资料需要归到阶段培养路径",
    urgency: "warning",
    action: "看新人培养",
    path: "/workbench/content-ops",
  },
];

const quickLinks = {
  student: [
    { label: "AI 问答", icon: <Brain size={18} />, path: "/learning/ai-qna", color: moduleIconToneClass.sales },
    { label: "开始陪练", icon: <Dumbbell size={18} />, path: "/learning/ai-practice", color: moduleIconToneClass.design },
    { label: "参加考核", icon: <ClipboardList size={18} />, path: "/learning/assessment", color: moduleIconToneClass.factory },
    { label: "成长总览", icon: <TrendingUp size={18} />, path: "/learning/growth", color: moduleIconToneClass.delivery },
  ],
  staff: [
    { label: "信息同步", icon: <RefreshCw size={18} />, path: "/workbench/info-sync", color: moduleIconToneClass.sales },
    { label: "审单·回流", icon: <FileCheck size={18} />, path: "/workbench/order-review", color: "bg-state-danger-soft text-state-danger" },
    { label: "异常看板", icon: <BarChart3 size={18} />, path: "/workbench/dashboard", color: moduleIconToneClass.design },
    { label: "社区运营", icon: <Users size={18} />, path: "/workbench/content-ops", color: moduleIconToneClass.delivery },
  ],
};

const opsQuickLinks = [
  { label: "社区运营", icon: <Users size={18} />, path: "/workbench/content-ops", color: moduleIconToneClass.delivery },
  { label: "异常看板", icon: <BarChart3 size={18} />, path: "/workbench/dashboard", color: moduleIconToneClass.design },
  { label: "运营任务", icon: <ClipboardList size={18} />, path: "/workbench/dashboard/tasks", color: moduleIconToneClass.factory },
  { label: "公司产品", icon: <RefreshCw size={18} />, path: "/workbench/info-sync", color: moduleIconToneClass.sales },
];

const designerQuickLinks = [
  { label: "销设协同", icon: <ArrowRight size={18} />, path: "/workbench/collab", color: moduleIconToneClass.delivery },
  { label: "AI问答", icon: <Brain size={18} />, path: "/learning/ai-qna", color: moduleIconToneClass.sales },
  { label: "公司产品", icon: <RefreshCw size={18} />, path: "/workbench/info-sync", color: moduleIconToneClass.factory },
  { label: "设计规范", icon: <BookOpen size={18} />, path: "/learning/design-standards", color: moduleIconToneClass.design },
];

const salesQuickLinks = [
  { label: "客户跟进", icon: <Phone size={18} />, path: "/workbench/sales-followup", color: moduleIconToneClass.delivery },
  { label: "建客户单", icon: <ArrowRight size={18} />, path: "/workbench/collab", color: moduleIconToneClass.sales },
  { label: "公司产品", icon: <RefreshCw size={18} />, path: "/workbench/info-sync", color: moduleIconToneClass.factory },
  { label: "AI问答", icon: <Brain size={18} />, path: "/learning/ai-qna", color: moduleIconToneClass.sales },
  { label: "消息中心", icon: <MessageSquare size={18} />, path: "/messages", color: moduleIconToneClass.design },
];

const orderReviewerQuickLinks = [
  { label: "审单任务", icon: <FileCheck size={18} />, path: "/workbench/order-review", color: "bg-state-danger-soft text-state-danger" },
  { label: "下单准备", icon: <CheckCircle2 size={18} />, path: "/workbench/order-review/preparation/o1", color: moduleIconToneClass.sales },
  { label: "工艺校验", icon: <Shield size={18} />, path: "/workbench/order-review/validation/o1", color: moduleIconToneClass.design },
  { label: "回流培训", icon: <RefreshCw size={18} />, path: "/workbench/order-review/flowback/o1", color: moduleIconToneClass.delivery },
];

const staffActionBoard = [
  {
    title: "先处理同步",
    desc: "新品、参数、工艺变化需要先确认影响范围，再触达相关角色。",
    action: "去信息同步中心",
    path: "/workbench/info-sync",
    icon: <RefreshCw size={15} className="text-blue-600" />,
    tone: "bg-blue-50 border-blue-100",
  },
  {
    title: "再盯风险",
    desc: "哪个小区卡住、哪位负责人风险最高、今天要先追哪条数据，要先给出动作。",
    action: "去异常看板",
    path: "/workbench/dashboard",
    icon: <AlertTriangle size={15} className="text-red-600" />,
    tone: "bg-red-50 border-red-100",
  },
  {
    title: "社区运营闭环",
    desc: "把资源开拓、群运营、转化跟进和新人培养串成可追踪的工作流。",
    action: "去社区运营",
    path: "/workbench/content-ops",
    icon: <Target size={15} className="text-green-600" />,
    tone: "bg-green-50 border-green-100",
  },
  {
    title: "状态规范",
    desc: "统一空状态、异常状态和成功态的文案与动作，避免各页风格分裂。",
    action: "去状态规范页",
    path: "/workbench/state-standards",
    icon: <Sparkles size={15} className="text-purple-600" />,
    tone: "bg-purple-50 border-purple-100",
  },
];

const trainingTeacherQuickLinks = [
  { label: "AI问答", icon: <Brain size={18} />, path: "/learning/ai-qna", color: moduleIconToneClass.sales },
  { label: "演练评分", icon: <Dumbbell size={18} />, path: "/workbench/dashboard", color: moduleIconToneClass.design },
  { label: "公司产品", icon: <RefreshCw size={18} />, path: "/workbench/info-sync", color: moduleIconToneClass.sales },
  { label: "案例沉淀", icon: <BookOpen size={18} />, path: "/workbench/content-ops", color: moduleIconToneClass.delivery },
];

const trainingTeacherActionBoard = [
  {
    title: "先看演练",
    desc: "今天先批 3 份新人接待流程演练，判断是否只是会背课件、还没转成现场动作。",
    action: "去演练评分",
    path: "/learning/ai-practice",
    icon: <Dumbbell size={15} className="text-indigo-600" />,
    tone: "bg-indigo-50 border-indigo-100",
  },
  {
    title: "再拆补训",
    desc: "把报价、产品工艺、需求追问这三类薄弱项拆成可执行补训任务。",
    action: "去补训闭环",
    path: "/learning/growth/retrain",
    icon: <AlertTriangle size={15} className="text-red-600" />,
    tone: "bg-red-50 border-red-100",
  },
  {
    title: "回收案例",
    desc: "把带教师傅反馈、优秀接待片段和售后复盘沉淀进案例库，避免经验只留在个人口头。",
    action: "去案例沉淀",
    path: "/workbench/content-ops",
    icon: <BookOpen size={15} className="text-green-600" />,
    tone: "bg-green-50 border-green-100",
  },
  {
    title: "跟进产品",
    desc: "新品、工艺、报价边界有变更时，要追到课件、题库、陪练场景是否同版。",
    action: "看公司产品",
    path: "/workbench/info-sync",
    icon: <RefreshCw size={15} className="text-blue-600" />,
    tone: "bg-blue-50 border-blue-100",
  },
];

const trainingTeacherTasks = [
  {
    id: 1,
    type: "practice",
    title: "3 份新人完整接待流程演练待评分",
    desc: "重点看开场破冰、需求追问、报价边界和服务意识，不只看是否背出知识点",
    urgency: "urgent" as const,
    action: "进入评分",
    path: "/learning/ai-practice",
  },
  {
    id: 2,
    type: "retrain",
    title: "报价与产品工艺薄弱项需拆补训",
    desc: "带教师傅反馈：产品知识、模块报价、工艺细节仍是新人最容易卡住的前三项",
    urgency: "urgent" as const,
    action: "拆补训",
    path: "/learning/growth/retrain",
  },
  {
    id: 3,
    type: "sync",
    title: "防水规范 v3.1 公司产品更新需拆到题库和陪练",
    desc: "课件已更新，但题库解释和 AI 陪练仍有旧口径残留，需要追齐",
    urgency: "warning" as const,
    action: "看产品",
    path: "/workbench/info-sync",
  },
  {
    id: 4,
    type: "case",
    title: "本周优秀方案讲解案例待入库",
    desc: "设计总监复盘材料已上传，需要补齐评分点、讲解亮点和可复用话术",
    urgency: "warning" as const,
    action: "收案例",
    path: "/workbench/content-ops",
  },
];

const designerTasks = [
  {
    id: 1,
    type: "collab",
    title: "客户李总方案会审前缺防滑等级确认",
    desc: "销售交接里只写了老人安全诉求，设计侧需要补齐卫浴区 R10/R11 选择和解释口径",
    urgency: "urgent" as const,
    action: "去销设协同",
    path: "/workbench/collab",
  },
  {
    id: 2,
    type: "review",
    title: "销售报价口径与设计方案不一致",
    desc: "套餐内外、模块估价和方案图版本需要会审前对齐，避免客户现场听到两套说法",
    urgency: "urgent" as const,
    action: "看会审",
    path: "/workbench/collab/records",
  },
  {
    id: 3,
    type: "product",
    title: "铝套盒与皮抽面组合升级需要看完确认",
    desc: "新品图示、适用场景和现场工艺说明会影响方案讲解，先确认再对客输出",
    urgency: "warning" as const,
    action: "看产品",
    path: "/workbench/info-sync",
  },
  {
    id: 4,
    type: "standard",
    title: "设计规范与防错清单需补到会审资料",
    desc: "量尺异常、工艺限制和报价一致性要在会审资料里留痕，减少后续返工",
    urgency: "warning" as const,
    action: "看规范",
    path: "/learning/design-standards",
  },
];

const salesTasks = [
  {
    id: 1,
    type: "followup",
    title: "李总预算边界今天 16:00 前确认",
    desc: "客户关注老人防滑和总价，先确认 R10 防滑款接受度，再把预算上限同步给设计师",
    urgency: "urgent" as const,
    action: "去跟进",
    path: "/workbench/sales-followup",
  },
  {
    id: 2,
    type: "quote",
    title: "张女士全屋瓷砖单缺一次报价回访",
    desc: "设计方案已同步，客户还未确认大规格哑光砖报价，今天需要补报价解释和异议记录",
    urgency: "urgent" as const,
    action: "补回访",
    path: "/workbench/sales-followup",
  },
  {
    id: 3,
    type: "product",
    title: "防水施工规范 v3.1 需要看完确认",
    desc: "新禁用材料和卫浴厚度要求会影响门店讲解，确认后再用于客户解释",
    urgency: "warning" as const,
    action: "看产品",
    path: "/workbench/info-sync",
  },
  {
    id: 4,
    type: "collab",
    title: "临港星河湾客户单待补现场照片",
    desc: "设计师已接收需求，但还缺现场照片和客户预算说明，补齐后才能继续方案推进",
    urgency: "warning" as const,
    action: "补客户单",
    path: "/workbench/collab/request/r1",
  },
];

const orderReviewerTasks = [
  {
    id: 1,
    type: "dimension",
    title: "张国栋订单规格与设计图不一致，需先冻结并标注",
    desc: "审单访谈里尺寸/规格是最高频错误，先核对签字图纸、订单系统和生产数据三方口径。",
    urgency: "urgent" as const,
    action: "去标注异常",
    path: "/workbench/order-review/annotation/o1",
  },
  {
    id: 2,
    type: "big-order",
    title: "大单/混油订单签字链路需复核",
    desc: "混油单或 50 万以上订单必须核对店长、设计总监、设计师、销售签字，缺签禁止下单/审单。",
    urgency: "urgent" as const,
    action: "查下单准备",
    path: "/workbench/order-review/preparation/o1",
  },
  {
    id: 3,
    type: "color",
    title: "颜色与材质一致性待二次校验",
    desc: "水晶板、双饰面、暴富色等容易在软件里误判，需要和签字图纸、备注文件一起看。",
    urgency: "warning" as const,
    action: "去工艺校验",
    path: "/workbench/order-review/validation/o1",
  },
  {
    id: 4,
    type: "flowback",
    title: "规格核对错误需要回流到培训和题库",
    desc: "不是只处理当前异常单，还要把尺寸、颜色、结构格局三类高频错回流成新人防错训练。",
    urgency: "warning" as const,
    action: "做回流计划",
    path: "/workbench/order-review/flowback/o1",
  },
];

const salesUpdates: UpdateItem[] = [
  { title: "李总预算边界今天 16:00 前必须回写", time: "今天", type: "system" },
  { title: "防水施工规范 v3.1 已推到公司产品页", time: "昨天", type: "spec" },
  { title: "张女士报价异议需要补一次回访记录", time: "昨天", type: "qa" },
];

const orderReviewerUpdates: UpdateItem[] = [
  { title: "审单访谈已整理：尺寸、颜色、结构是前三类高频错误", time: "今天", type: "system" },
  { title: "加急单制度：审单部门负责判定个人原因加急", time: "制度", type: "spec" },
  { title: "大单/混油订单管控：缺签禁止下单/审单", time: "制度", type: "spec" },
];

const trainingTeacherUpdates: UpdateItem[] = [
  { title: "带教师傅访谈已整理：练要大于学，演练评分需前置", time: "今天", type: "system" },
  { title: "云屏考核打分表待同步到新人评分规则", time: "昨天", type: "qa" },
  { title: "防水施工规范 v3.1 已发布，需追齐题库解释", time: "昨天", type: "spec" },
];

const trainingTeacherTrainees = [
  { name: "李明", status: "高风险", detail: "报价逻辑断点多", color: "text-[#DC2626]", bg: "bg-red-50" },
  { name: "王芳", status: "需补练", detail: "需求追问浅", color: "text-[#B45309]", bg: "bg-amber-50" },
  { name: "陈伟", status: "可上客", detail: "流程演练通过", color: "text-[#16A34A]", bg: "bg-green-50" },
];

const trainingTeacherLoopEntries = [
  { title: "演练待评分", desc: "3 份完整接待流程需要今天给出评分和反馈。" },
  { title: "补训待派发", desc: "报价、工艺、需求追问三类薄弱项需要拆成补训动作。" },
  { title: "案例待入库", desc: "优秀方案讲解视频需补齐亮点、话术和适用场景。" },
];

function getUpdateBadge(type: UpdateType) {
  if (type === "product") return "bg-brand-soft text-brand";
  if (type === "spec") return "bg-state-warning-soft text-state-warning-foreground";
  if (type === "qa") return "bg-state-success-soft text-state-success-foreground";
  return "bg-gray-100 text-gray-500";
}

function trainingStudentStatusTone(status: string) {
  if (status === "红色") return "bg-red-50 text-[#DC2626]";
  if (status === "需跟进") return "bg-amber-50 text-[#B45309]";
  return "bg-green-50 text-[#15803D]";
}

const studentHomeStates: Record<StudentHomeState, StudentStateConfig> = {
  normal: {
    label: "正常训练中",
    heroTitle: "今天先完成学习闭环",
    heroDesc: "你当前处在正常训练节奏里，先完成课程、陪练和考核，再看成长反馈。",
    stats: [
      { label: "今日任务", value: "3", sub: "项待完成" },
      { label: "本周训练", value: "2/5", sub: "次陪练" },
      { label: "综合评分", value: "82", sub: "分" },
    ],
    focusCard: {
      tone: "bg-[#F7FAFF] border-[#D9E5FF]",
      title: "当前状态提醒：正常训练中",
      desc: "今天按“课程 → 陪练 → 考核”顺序推进，节奏最稳。",
      actionLabel: "去学习中心",
      actionPath: "/learning",
    },
    taskTitle: "今日学习任务",
    tasks: [
      {
        id: 1,
        type: "course",
        title: "【必学】云岚石·2024 秋冬新品参数更新",
        desc: "含 3 款新品规格、防滑系数、安装要求更新",
        urgency: "urgent",
        deadline: "今日截止",
        duration: "约 20 分钟",
        progress: 0,
        path: "/learning/course/1",
      },
      {
        id: 2,
        type: "practice",
        title: "AI 陪练：客户问“为什么这款瓷砖这么贵？”",
        desc: "价值引导话术 · 上次得分 72 分，建议重练",
        urgency: "warning",
        deadline: "本周截止",
        duration: "约 15 分钟",
        progress: 30,
        path: "/learning/ai-practice",
      },
      {
        id: 3,
        type: "exam",
        title: "月度考核 - 防滑产品专题",
        desc: "共 20 题 · 含新增案例题",
        urgency: "normal",
        deadline: "3 天后",
        duration: "约 30 分钟",
        progress: 0,
        path: "/learning/assessment",
      },
    ],
    updates: [
      { title: "云岚石·暖冬系列防滑参数更新", time: "2小时前", type: "product" },
      { title: "防水施工规范 v3.1 发布", time: "昨天", type: "spec" },
      { title: "客户异议处理话术库新增 5 条", time: "2天前", type: "qa" },
    ],
    growthCard: {
      tone: "bg-[#F5F7FA]",
      title: "成长提醒：当前整体节奏稳定",
      desc: "先把今日任务做完，再去看完整成长分析，不必提前跳步骤。",
      actionLabel: "查看成长总览",
      actionPath: "/learning/growth",
    },
  },
  first: {
    label: "首次进入",
    heroTitle: "先把销售顾问起步任务跑起来",
    heroDesc: "第一次进入先给你最短起步链路：产品基础 → 接待闭环 → 规则底线。",
    stats: [
      { label: "起步任务", value: "2", sub: "条" },
      { label: "学习阶段", value: "1/5", sub: "已解锁" },
      { label: "成长记录", value: "0", sub: "次训练" },
    ],
    focusCard: {
      tone: "bg-[#F7FAFF] border-[#D9E5FF]",
      title: "首次进入建议",
      desc: "先看销售顾问首周上岗任务包和第一门板材基础课，完成后系统会继续给你下一步。",
      actionLabel: "开始起步任务",
      actionPath: "/learning",
    },
    taskTitle: "起步任务",
    tasks: [
      {
        id: 1,
        type: "course",
        title: "销售顾问首周上岗任务包 · 第 1 步",
        desc: "先熟悉学习中心、首页任务和接下来 5 步学习链路",
        urgency: "normal",
        deadline: "今天完成更好",
        duration: "约 8 分钟",
        progress: 0,
        path: "/learning",
      },
      {
        id: 2,
        type: "course",
        title: "先看：《板材基础知识与万骊板材体系》",
        desc: "从客户最常问的板材、价格、环保三连问开始，不一上来塞太多信息",
        urgency: "normal",
        deadline: "本周内",
        duration: "约 28 分钟",
        progress: 0,
        path: "/learning/course/1",
      },
    ],
    updates: [{ title: "销售顾问起步任务已为你准备好", time: "刚刚", type: "system" }],
    growthCard: {
      tone: "bg-[#F5F7FA]",
      title: "成长提醒：先开始，再看反馈",
      desc: "先把起步链路跑起来，成长分析会在你完成课程、陪练和测验后逐步出现。",
      actionLabel: "去成长页看看结构",
      actionPath: "/learning/growth",
    },
  },

  "new-product": {
    label: "有产品基础待补",
    heroTitle: "先补产品基础再去接待",
    heroDesc: "产品知识不稳时，先补板材和五金，再做需求挖掘和案例训练。",
    stats: [
      { label: "待补课程", value: "2", sub: "门基础课" },
      { label: "影响场景", value: "4", sub: "类接待话题" },
      { label: "推荐动作", value: "先学后练", sub: "今天完成" },
    ],
    focusCard: {
      tone: "bg-blue-50 border-blue-100",
      title: "有产品基础待补",
      desc: "板材和五金是销售顾问最常被客户追问的基础内容，建议今天接待前先补齐。",
      actionLabel: "立即去看板材课",
      actionPath: "/learning/course/1",
    },
    taskTitle: "产品基础任务",
    tasks: [
      {
        id: 1,
        type: "course",
        title: "《板材基础知识与万骊板材体系》",
        desc: "先把板材、价格、环保三连问讲顺，再去做接待训练",
        urgency: "urgent",
        deadline: "今日优先",
        duration: "约 28 分钟",
        progress: 0,
        path: "/learning/course/1",
      },
      {
        id: 2,
        type: "course",
        title: "《衣柜基础五金（销售版）》",
        desc: "学习 4 类五金和典型使用场景，避免只会背名称",
        urgency: "warning",
        deadline: "今天下班前",
        duration: "约 20 分钟",
        progress: 0,
        path: "/learning/course/2",
      },
    ],
    updates: [
      { title: "销售顾问首周上岗任务包已同步", time: "刚刚", type: "system" },
      { title: "五金基础课已加入学习中心", time: "今天", type: "product" },
    ],
    growthCard: {
      tone: "bg-blue-50",
      title: "成长提醒：产品知识会直接影响接待自信度",
      desc: "板材和五金补齐后，需求挖掘和价值引导会更稳。",
      actionLabel: "去成长页看影响",
      actionPath: "/learning/growth",
    },
  },

  relearn: {
    label: "有课件待重学",
    heroTitle: "有课件更新待重学",
    heroDesc: "旧版说法可能已经失效，这一类状态优先处理，避免现场继续沿用旧口径。",
    stats: [
      { label: "待重学", value: "1", sub: "门变更课" },
      { label: "高风险点", value: "2", sub: "处变更" },
      { label: "推荐动作", value: "先重学", sub: "再复测" },
    ],
    focusCard: {
      tone: "bg-amber-50 border-amber-100",
      title: "有课件更新待重学",
      desc: "防水规范 v3.1 已替换旧版口径，建议先重学关键变更，再继续答疑或考核。",
      actionLabel: "去重学关键课件",
      actionPath: "/learning/course/2",
    },
    taskTitle: "重学任务",
    tasks: [
      {
        id: 1,
        type: "course",
        title: "防水产品施工规范 v3.1（关键变更）",
        desc: "新增禁用材料、施工厚度变化，需先把旧口径清掉",
        urgency: "urgent",
        deadline: "今天完成更稳妥",
        duration: "约 18 分钟",
        progress: 45,
        path: "/learning/course/2",
      },
      {
        id: 2,
        type: "exam",
        title: "施工规范变更复测",
        desc: "重学后建议立刻复测，确认旧版表达已纠正",
        urgency: "warning",
        deadline: "本周五",
        duration: "约 25 分钟",
        progress: 0,
        path: "/learning/assessment",
      },
    ],
    updates: [
      { title: "防水施工规范 v3.1 发布", time: "昨天", type: "spec" },
      { title: "相关陪练场景已更新为新版口径", time: "昨天", type: "qa" },
    ],
    growthCard: {
      tone: "bg-amber-50",
      title: "成长提醒：当前风险来自旧版残留",
      desc: "这类问题往往不是不会，而是继续沿用旧口径，复测能更快确认。",
      actionLabel: "去成长页看补训建议",
      actionPath: "/learning/growth/retrain",
    },
  },
  retrain: {
    label: "有需求挖掘补训",
    heroTitle: "先把需求挖掘补练完",
    heroDesc: "系统识别到你当前最明显的短板是需求探寻和追问结构，先走完补训闭环。",
    stats: [
      { label: "补训任务", value: "3", sub: "项待完成" },
      { label: "当前弱项", value: "1", sub: "个" },
      { label: "复测目标", value: "80+", sub: "分" },
    ],
    focusCard: {
      tone: "bg-red-50 border-red-100",
      title: "你有需求挖掘补训待完成",
      desc: "当前最明显的短板是追问不够深，建议按“复盘流程 → 重新陪练 → 再测验”顺序完成闭环。",
      actionLabel: "查看补训任务页",
      actionPath: "/learning/growth/retrain",
    },
    taskTitle: "补训闭环任务",
    tasks: [
      {
        id: 1,
        type: "growth",
        title: "补学：回看《销售接待闭环与云屏需求挖掘》重点节",
        desc: "先复盘接待 6 环节和云屏需求挖掘的高权重追问点",
        urgency: "urgent",
        deadline: "今天 18:00 前",
        duration: "约 12 分钟",
        progress: 35,
        path: "/learning/course/3",
        ctaLabel: "去补训",
      },
      {
        id: 2,
        type: "practice",
        title: "练习：完成 1 次云屏需求挖掘追问",
        desc: "围绕户型、预算、重点空间和红线需求做完整追问，目标 80 分以上",
        urgency: "warning",
        deadline: "今天下班前",
        duration: "约 15 分钟",
        progress: 0,
        path: "/learning/ai-practice",
      },
      {
        id: 3,
        type: "exam",
        title: "复测：接待闭环与需求挖掘评分",
        desc: "复测通过后，才算这一轮需求挖掘补训完成",
        urgency: "warning",
        deadline: "本周五",
        duration: "约 20 分钟",
        progress: 0,
        path: "/learning/assessment",
      },
    ],
    updates: [
      { title: "系统已为你生成需求挖掘补训清单", time: "刚刚", type: "system" },
      { title: "最近一次陪练追问深度不足，建议先补学后再练", time: "今天", type: "system" },
    ],
    growthCard: {
      tone: "bg-red-50",
      title: "成长提醒：别只看分数，要看需求有没有问透",
      desc: "薄弱项详情、补训任务和复评结果已经连成闭环，可以按页查看。",
      actionLabel: "查看薄弱项详情",
      actionPath: "/learning/growth/weak-area/craft-standard",
    },
  },

  completed: {
    label: "今日已完成",
    heroTitle: "今日任务已完成",
    heroDesc: "今天的必做项已经清完了，你可以选择继续看案例，也可以先看成长反馈。",
    stats: [
      { label: "今日任务", value: "0", sub: "项待完成" },
      { label: "完成情况", value: "100%", sub: "已收口" },
      { label: "推荐动作", value: "可选", sub: "案例加练" },
    ],
    focusCard: {
      tone: "bg-green-50 border-green-100",
      title: "今日任务已完成",
      desc: "如果还有余力，建议再看一个真实案例，把今天学的内容和业务场景接起来。",
      actionLabel: "去看案例课",
      actionPath: "/learning/course/12",
    },
    taskTitle: "可选加练",
    tasks: [
      {
        id: 1,
        type: "course",
        title: "可选：补看《售后客诉 6 小时危机公关复盘》",
        desc: "不是必做项，用来把今天的规则和沟通动作带进真实高压场景",
        urgency: "normal",
        deadline: "今天任意时间",
        duration: "约 18 分钟",
        progress: 0,
        path: "/learning/course/12",
      },
    ],
    updates: [{ title: "今日学习任务已全部完成", time: "刚刚", type: "system" }],
    growthCard: {
      tone: "bg-green-50",
      title: "成长提醒：今天可以看看复盘",
      desc: "任务做完后最适合看成长反馈和复评结果，知道自己今天补到了什么。",
      actionLabel: "去成长页复盘",
      actionPath: "/learning/growth/review-result",
    },
  },

  empty: {
    label: "无数据",
    heroTitle: "当前暂无学习数据",
    heroDesc: "系统暂时还没有给你分配任务或同步记录，先给一个可执行的兜底动作。",
    stats: [
      { label: "今日任务", value: "0", sub: "项" },
      { label: "更新提醒", value: "0", sub: "条" },
      { label: "建议动作", value: "先看", sub: "推荐练习" },
    ],
    focusCard: {
      tone: "bg-gray-50 border-gray-200",
      title: "暂无今日任务",
      desc: "这不代表今天什么都不做，建议先看看推荐练习，避免训练断档。",
      actionLabel: "去看推荐练习",
      actionPath: "/learning/ai-practice",
    },
    taskTitle: "今日学习任务",
    tasks: [],
    updates: [],
    growthCard: {
      tone: "bg-gray-50",
      title: "成长提醒：暂无新数据可分析",
      desc: "完成一次课程、陪练或考核后，这里会逐步出现你的学习和成长反馈。",
      actionLabel: "去开始一轮训练",
      actionPath: "/learning",
    },
    emptyTaskState: {
      title: "暂无今日任务",
      desc: "先看看推荐练习，或者去学习中心补一门高频课程。",
      actionLabel: "去学习中心",
      actionPath: "/learning",
    },
  },
  network: {
    label: "网络异常",
    heroTitle: "网络异常，已切到轻量兜底状态",
    heroDesc: "关键内容可能没有同步完整，当前先展示可恢复动作和本地缓存提醒。",
    stats: [
      { label: "同步状态", value: "异常", sub: "待重试" },
      { label: "缓存任务", value: "1", sub: "条" },
      { label: "建议动作", value: "重试", sub: "刷新" },
    ],
    focusCard: {
      tone: "bg-red-50 border-red-100",
      title: "当前网络异常",
      desc: "如果你正在接待客户，建议先查看本地缓存的板材基础课或已保存话术，恢复后再同步最新内容。",
      actionLabel: "先去看已缓存课程",
      actionPath: "/learning/course/1",
    },
    taskTitle: "缓存任务提醒",
    tasks: [
      {
        id: 1,
        type: "course",
        title: "缓存可用：《板材基础知识与万骊板材体系》",
        desc: "这门课程可先离线查看关键页，网络恢复后再同步完整记录",
        urgency: "warning",
        deadline: "恢复后记得同步",
        duration: "约 8 分钟",
        progress: 20,
        path: "/learning/course/1",
      },
    ],
    updates: [{ title: "网络异常，最新通知未完全拉取", time: "刚刚", type: "system" }],
    growthCard: {
      tone: "bg-red-50",
      title: "成长提醒：当前数据可能不是最新",
      desc: "恢复网络后再看完整成长反馈更准确，当前先完成能离线做的动作。",
      actionLabel: "恢复后去成长页",
      actionPath: "/learning/growth",
    },
    networkTip: {
      title: "连接失败",
      desc: "已自动切到轻量模式，你可以先看缓存内容，稍后重试同步。",
      actionLabel: "重新连接",
    },
  },

};

const learnerRoleHomeStates = {
  sales: studentHomeStates.normal,
  community_ops: {
    ...studentHomeStates.normal,
    label: "社区运营",
    heroTitle: "今天先推进社区运营学习闭环",
    heroDesc: "你当前选择的是社区运营身份，首页只展示岗位边界、资源开拓、社群 SOP 和指标相关任务。",
    stats: [
      { label: "今日任务", value: "3", sub: "项运营课" },
      { label: "路径进度", value: "1/6", sub: "步" },
      { label: "资源任务", value: "2", sub: "项待练" },
    ],
    focusCard: {
      tone: "bg-[#F7FAFF] border-[#D9E5FF]",
      title: "当前身份：社区运营",
      desc: "先补齐岗位边界，再进入资源开拓 SOP 和社群推进训练。",
      actionLabel: "去社区运营路径",
      actionPath: "/learning/course/6",
    },
    taskTitle: "社区运营学习任务",
    tasks: [
      { id: 1, type: "course" as const, title: "社区运营岗位认知与协作边界", desc: "先明确和销售、门店、设计、工厂、售后的协作边界", urgency: "urgent" as const, deadline: "今日优先", duration: "约 22 分钟", progress: 50, path: "/learning/course/6" },
      { id: 2, type: "course" as const, title: "新小区资源开拓 SOP 与资源缺口判断", desc: "学习新小区识别、资源盘点和门店缺口判断", urgency: "urgent" as const, deadline: "明日截止", duration: "约 28 分钟", progress: 0, path: "/learning/course/7" },
      { id: 3, type: "practice" as const, title: "AI 陪练：门店资源不足时如何推动补资源", desc: "把资源缺口拆成可派发、可跟进、可回执的动作", urgency: "warning" as const, deadline: "本周内", duration: "约 15 分钟", progress: 0, path: "/learning/ai-practice" },
    ],
    updates: [
      { title: "社区运营新人路径上线", time: "刚刚", type: "system" as const },
      { title: "资源开拓 SOP 已加入学习中心", time: "今天", type: "system" as const },
    ],
    growthCard: {
      tone: "bg-[#F5F7FA]",
      title: "成长提醒：先稳住岗位边界",
      desc: "运营新人最容易卡在跨角色边界不清，先完成入口课再做陪练。",
      actionLabel: "查看成长总览",
      actionPath: "/learning/growth",
    },
  },
  ops_manager: {
    ...studentHomeStates.normal,
    label: "运营管理者",
    heroTitle: "今天先看指标和风险",
    heroDesc: "你当前选择的是运营管理者身份，首页只展示指标看盘、风险识别、任务派发和复盘任务。",
    stats: [
      { label: "看盘任务", value: "2", sub: "项" },
      { label: "风险口径", value: "4", sub: "类" },
      { label: "复盘任务", value: "1", sub: "项" },
    ],
    focusCard: {
      tone: "bg-[#F7FAFF] border-[#D9E5FF]",
      title: "当前身份：运营管理者",
      desc: "先学习过程指标判断，再进入风险名单、任务派发和转化复盘。",
      actionLabel: "去看盘路径",
      actionPath: "/learning/course/9",
    },
    taskTitle: "运营管理学习任务",
    tasks: [
      { id: 1, type: "course" as const, title: "添加微信、QC、样板间与签单指标判断", desc: "统一过程指标口径，识别异常并转成动作", urgency: "warning" as const, deadline: "本周五", duration: "约 26 分钟", progress: 0, path: "/learning/course/9" },
      { id: 2, type: "course" as const, title: "样板间推进、活动转化与运营复盘方法", desc: "围绕转化效果形成复盘和案例沉淀方法", urgency: "normal" as const, deadline: "本月底", duration: "约 30 分钟", progress: 0, path: "/learning/course/10" },
    ],
    updates: [
      { title: "运营过程指标口径同步", time: "今天", type: "system" as const },
      { title: "样板间与签单目标判断已更新", time: "今天", type: "spec" as const },
    ],
    growthCard: {
      tone: "bg-[#F5F7FA]",
      title: "成长提醒：指标要能转成动作",
      desc: "管理者路径不只看数据，要把异常拆成任务、催办和复盘。",
      actionLabel: "查看成长总览",
      actionPath: "/learning/growth",
    },
  },
  designer: {
    ...studentHomeStates.normal,
    label: "设计师",
    heroTitle: "今天先完成设计规范训练",
    heroDesc: "你当前选择的是设计师身份，首页只展示设计规范、量尺出图、报价一致性和会审讲解任务。",
    stats: [
      { label: "今日任务", value: "3", sub: "项设计课" },
      { label: "路径进度", value: "0/6", sub: "步" },
      { label: "防错清单", value: "5", sub: "项" },
    ],
    focusCard: {
      tone: "bg-[#F7FAFF] border-[#D9E5FF]",
      title: "当前身份：设计师",
      desc: "先学规范作业，再进入量尺、出图、报价一致性和会审讲解训练。",
      actionLabel: "去设计师路径",
      actionPath: "/learning/course/11",
    },
    taskTitle: "设计师学习任务",
    tasks: [
      { id: 1, type: "course" as const, title: "设计师新人规范作业与防错训练", desc: "把量尺、出图、报价一致性和审单前自检串起来", urgency: "urgent" as const, deadline: "今日优先", duration: "约 26 分钟", progress: 0, path: "/learning/course/11" },
      { id: 2, type: "course" as const, title: "防水产品施工规范 v3.1", desc: "设计沟通和施工说明需要同步新版规范", urgency: "warning" as const, deadline: "3 天后", duration: "约 18 分钟", progress: 45, path: "/learning/course/2" },
      { id: 3, type: "practice" as const, title: "AI 陪练：会审时如何讲清方案", desc: "练习把客户需求、图纸表达和销售口径对齐", urgency: "warning" as const, deadline: "本周内", duration: "约 15 分钟", progress: 0, path: "/learning/ai-practice" },
    ],
    updates: [
      { title: "设计师新人路径上线", time: "刚刚", type: "system" as const },
      { title: "设计规范与防错训练专题已开放", time: "今天", type: "spec" as const },
    ],
    growthCard: {
      tone: "bg-[#F5F7FA]",
      title: "成长提醒：先减少返工风险",
      desc: "设计师路径优先把图纸、报价、工艺和会审口径对齐。",
      actionLabel: "查看成长总览",
      actionPath: "/learning/growth",
    },
  },
} satisfies Record<string, StudentStateConfig>;

export default function Home() {
  const { user, currentIdentity, unreadMessages } = useApp();
  const navigate = useNavigate();
  const isStaff = currentIdentity === "staff";
  const [studentHomeState, setStudentHomeState] = useState<StudentHomeState>("normal");
  const selectedLearnerRole = user?.learnerRole ?? "sales";
  const learnerRoleMeta = getLearnerRoleMeta(selectedLearnerRole);
  const selectedStaffRole = user?.staffRole ?? "training_teacher";
  const staffRoleMeta = getStaffRoleMeta(selectedStaffRole);
  const isTrainingTeacher = isStaff && selectedStaffRole === "training_teacher";
  const isOpsStaff = isStaff && selectedStaffRole === "ops";
  const isDesignerStaff = isStaff && selectedStaffRole === "designer";
  const isSalesStaff = isStaff && selectedStaffRole === "sales";
  const isOrderReviewerStaff = isStaff && selectedStaffRole === "order_reviewer";
  const today = new Date().toLocaleDateString("zh-CN", { month: "long", day: "numeric", weekday: "long" });
  const approvalMeta = user ? getStaffApprovalStatusMeta(user.staffApprovalStatus) : null;
  const currentStudentState = useMemo(
    () => (studentHomeState === "normal" ? learnerRoleHomeStates[selectedLearnerRole] : studentHomeStates[studentHomeState]),
    [selectedLearnerRole, studentHomeState]
  );
  const showStaffActionBoard = false;
  const showStaffUpdatesPanel = false;
  const showStaffLoopEntry = false;
  const showStaffTeamStatus = false;
  const showStudentRightSidebar = homeSectionVisibility.studentUpdatesPanel || homeSectionVisibility.studentPermissionReminder;
  const showStaffRightSidebar = showStaffUpdatesPanel || showStaffLoopEntry || showStaffTeamStatus;
  const showHomeRightSidebar = isStaff ? showStaffRightSidebar : showStudentRightSidebar;

  const homeDesktopContainerClass = showHomeRightSidebar ? "max-w-6xl" : "max-w-6xl xl:max-w-[1240px]";
  const homeDesktopGridClass = showHomeRightSidebar ? "grid md:grid-cols-3 gap-4" : "grid gap-4";
  const homePrimaryColumnClass = showHomeRightSidebar ? "md:col-span-2 space-y-4" : "space-y-4";
  const activeStaffQuickLinks = isTrainingTeacher
    ? trainingTeacherQuickLinks
    : isOpsStaff
      ? opsQuickLinks
      : isDesignerStaff
        ? designerQuickLinks
        : isSalesStaff
          ? salesQuickLinks
          : isOrderReviewerStaff
            ? orderReviewerQuickLinks
          : quickLinks.staff;
  const activeStaffActionBoard = isTrainingTeacher ? trainingTeacherActionBoard : staffActionBoard;
  const activeStaffTasks = isTrainingTeacher
    ? trainingTeacherTasks
    : isDesignerStaff
      ? designerTasks
      : isSalesStaff
        ? salesTasks
        : isOrderReviewerStaff
          ? orderReviewerTasks
        : staffTasks;
  const activeStaffUpdates = isTrainingTeacher
    ? trainingTeacherUpdates
    : isSalesStaff
      ? salesUpdates
      : isOrderReviewerStaff
        ? orderReviewerUpdates
    : [
        { title: "云岚石·暖冬系列防滑参数更新", time: "2小时前", type: "product" as UpdateType },
        { title: "防水施工规范 v3.1 发布", time: "昨天", type: "spec" as UpdateType },
        { title: "客户异议处理话术库新增 5 条", time: "2天前", type: "qa" as UpdateType },
      ];
  const activeStaffMembers = isTrainingTeacher
    ? trainingTeacherTrainees
    : [
        { name: "李明", status: "风险", detail: "3天未学习", color: "text-[#DC2626]", bg: "bg-red-50" },
        { name: "王芳", status: "预警", detail: "考核得分下降", color: "text-[#F59E0B]", bg: "bg-amber-50" },
        { name: "陈伟", status: "正常", detail: "完成率 90%", color: "text-[#16A34A]", bg: "bg-green-50" },
      ];
  const activeLoopEntries = isTrainingTeacher
    ? trainingTeacherLoopEntries
    : [
        { title: "补训任务待发起", desc: "6 人未完成新品课，建议先推送重学" },
        { title: "售后问题待回流", desc: "2 条高频问题尚未沉淀到培训标准" },
        { title: "审批事项待确认", desc: "1 条身份/权限申请待处理" },
      ];
  return (


    <div className="min-h-full bg-[#F5F7FA]">
      <div className={`${isStaff ? "bg-[#1E2A3A]" : "bg-[#2F5FD0]"} px-4 md:px-6 pt-4 pb-10`}>
        <div className={`${homeDesktopContainerClass} mx-auto`}>

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm mb-1">{today}</p>
              <h1 className="text-white text-xl font-semibold">
                {isStaff
                  ? isTrainingTeacher
                    ? `${user?.name}，今天先看新人培训事项`
                      : isOpsStaff
                        ? `${user?.name}，今天先看运营风险和动作`
                        : isDesignerStaff
                          ? `${user?.name}，今天先看方案协同和会审事项`
                          : isSalesStaff
                            ? `${user?.name}，今天先跟客户和报价`
                            : isOrderReviewerStaff
                              ? `${user?.name}，今天先拦截订单风险`
                          : `${user?.name}，今天先处理风险和待办`
                  : `${user?.name}，${currentStudentState.heroTitle}`}
              </h1>
              {!isStaff && homeSectionVisibility.studentHeroDescription && (
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  学员视角 · 当前学习身份：{learnerRoleMeta.label} · {currentStudentState.heroDesc}
                </p>
              )}

            </div>
            <button
              onClick={() => navigate("/messages")}
              className="relative bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors"
            >
              <Bell size={18} />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#DC2626] text-white text-xs rounded-full flex items-center justify-center">{unreadMessages}</span>
              )}
            </button>
          </div>

          {!isStaff && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {currentStudentState.stats.map((stat, i) => (
                <div key={i} className="bg-white/10 rounded-lg px-3 py-3">
                  <div className="text-xl font-bold text-white">
                    {stat.value}
                    <span className="text-sm font-normal ml-1">{stat.sub}</span>
                  </div>
                  <div className="text-white/70 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`${homeDesktopContainerClass} mx-auto px-4 md:px-6 -mt-5`}>
        <div className={homeDesktopGridClass}>
          <div className={homePrimaryColumnClass}>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3 gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-[#2F5FD0]" />
                  <span className="text-base font-medium text-gray-900">{isStaff ? "快捷入口" : "学习快捷入口"}</span>
                </div>
                <span className="text-sm text-gray-400">{isStaff ? `${staffRoleMeta.label}优先动作` : "同一系统内优先展示学习动作"}</span>
              </div>
              <QuickActionGrid
                columns={isStaff && isSalesStaff ? 5 : 4}
                items={(isStaff ? activeStaffQuickLinks : quickLinks.student).map((link) => ({
                  label: link.label,
                  icon: link.icon,
                  colorClassName: link.color,
                  onClick: () => navigate(link.path),
                }))}
              />
            </div>

            {!isStaff ? (
              <>
                {homeSectionVisibility.studentIdentityCard && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Target size={16} className="text-[#2F5FD0]" />
                      <span className="text-base font-medium text-gray-900">当前学习身份</span>
                      <span className="text-sm text-gray-400">只显示：{learnerRoleMeta.label}</span>
                    </div>
                    <div className="rounded-xl bg-[#F7FAFF] border border-[#D9E5FF] p-3">
                      <p className="text-sm font-medium text-gray-900">{learnerRoleMeta.roleTitle}</p>
                      <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{learnerRoleMeta.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {learnerRoleMeta.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white border border-blue-100 text-[#2F5FD0]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}


                {currentStudentState.networkTip && (
                  <GlobalStateCard
                    tone="exception"
                    layout="inline"
                    size="sm"
                    badge="网络异常"
                    title={currentStudentState.networkTip.title}
                    description={currentStudentState.networkTip.desc}
                    helperText="系统已自动切到轻量模式，恢复后会重新拉取完整数据。"
                    action={{
                      label: currentStudentState.networkTip.actionLabel,
                      onClick: () => setStudentHomeState("normal"),
                    }}
                  />
                )}

                {homeSectionVisibility.studentCurrentStatusReminder && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Target size={16} className="text-[#2F5FD0]" />
                      <span className="text-base font-medium text-gray-900">当前状态提醒</span>
                      <span className="text-sm text-gray-400">任务优先，而不是展示优先</span>
                    </div>
                    <GlobalStateCard
                      tone={getStudentFocusTone(studentHomeState)}
                      size="sm"
                      badge={currentStudentState.label}
                      title={currentStudentState.focusCard.title}
                      description={currentStudentState.focusCard.desc}
                      action={{
                        label: currentStudentState.focusCard.actionLabel,
                        onClick: () => navigate(currentStudentState.focusCard.actionPath),
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              showStaffActionBoard && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Target size={16} className="text-[#2F5FD0]" />
                    <span className="text-base font-medium text-gray-900">{isTrainingTeacher ? "培养动作面板" : "今日动作面板"}</span>
                    <span className="text-sm text-gray-400">{isTrainingTeacher ? "先看演练，再拆补训" : "先给动作，再给数据"}</span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {activeStaffActionBoard.map((item) => (
                      <button
                        key={item.title}
                        onClick={() => navigate(item.path)}
                        className={`rounded-xl border p-3.5 text-left hover:shadow-sm transition-all ${item.tone}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {item.icon}
                          <span className="text-base font-medium text-gray-900">{item.title}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed min-h-[60px]">{item.desc}</p>
                        <div className="text-sm text-[#2F5FD0] mt-3 flex items-center gap-1">
                          {item.action} <ChevronRight size={12} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}


            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isTrainingTeacher ? <Users size={16} className="text-[#2F5FD0]" /> : isDesignerStaff ? <FileCheck size={16} className="text-[#2F5FD0]" /> : isSalesStaff ? <Phone size={16} className="text-[#2F5FD0]" /> : isOrderReviewerStaff ? <Shield size={16} className="text-[#2F5FD0]" /> : <Flame size={16} className="text-[#DC2626]" />}
                  <span className="text-sm font-medium text-gray-900">{isStaff ? (isTrainingTeacher ? "学员看板" : isDesignerStaff ? "设计协同待办" : isSalesStaff ? "销售今日待办" : isOrderReviewerStaff ? "审单今日待办" : "今日待办 & 风险预警") : currentStudentState.taskTitle}</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(isStaff ? (isTrainingTeacher ? "/workbench/dashboard" : isDesignerStaff ? "/workbench/collab" : isSalesStaff ? "/workbench/sales-followup" : isOrderReviewerStaff ? "/workbench/order-review" : "/workbench/dashboard/tasks") : "/learning/growth")}
                  className="text-xs text-[#2F5FD0] hover:text-[#2550B8] flex items-center gap-0.5"
                >
                  {isTrainingTeacher ? "完整看板" : "全部"} <ChevronRight size={12} />
                </button>
              </div>

              {isStaff && isTrainingTeacher ? (
                <div className="grid lg:grid-cols-2 gap-3 p-4">
                  {trainingStudents.map((student) => {
                    const weakestItem = student.assessmentItems.reduce((min, item) => (item.score < min.score ? item : min), student.assessmentItems[0]);
                    return (
                      <button
                        key={student.id}
                        onClick={() => navigate("/workbench/dashboard")}
                        className="rounded-xl border border-gray-200 bg-[#FAFBFC] p-4 text-left hover:border-[#D9E5FF] hover:bg-[#F7FAFF] transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium text-gray-900">{student.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${trainingStudentStatusTone(student.status)}`}>{student.status}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{student.cohort} · {student.stage}</p>
                          </div>
                          <div className={student.score < 65 ? "text-2xl font-bold text-[#DC2626]" : "text-2xl font-bold text-[#2F5FD0]"}>
                            {student.score}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {student.assessmentItems.slice(0, 4).map((item) => (
                            <div key={item.label} className="rounded-lg bg-white border border-gray-100 px-2.5 py-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs text-gray-500">{item.label}</span>
                                <span className={item.score < 60 ? "text-xs font-bold text-[#DC2626]" : item.score < 75 ? "text-xs font-bold text-[#F59E0B]" : "text-xs font-bold text-[#16A34A]"}>
                                  {item.score}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-3 line-clamp-1">最低项：{weakestItem.label} · {weakestItem.evidence}</p>
                      </button>
                    );
                  })}
                </div>
              ) : (
              <div className="divide-y divide-gray-50">
                {isStaff ? (
                  activeStaffTasks.map((task) => (
                    <TodayTaskCard
                      key={task.id}
                      title={task.title}
                      description={task.desc}
                      urgency={task.urgency}
                      actionLabel={task.action}
                      onClick={() => navigate(task.path)}
                    />
                  ))
                ) : currentStudentState.tasks.length > 0 ? (
                  currentStudentState.tasks.map((task) => (
                    <TodayTaskCard
                      key={task.id}
                      title={task.title}
                      description={task.desc}
                      urgency={task.urgency}
                      progress={task.progress}
                      deadline={task.deadline}
                      duration={task.duration}
                      actionLabel={task.ctaLabel || "开始"}
                      onClick={() => navigate(task.path)}
                    />
                  ))
                ) : (
                  <div className="px-4 py-4">
                    <GlobalStateCard
                      tone="empty"
                      size="sm"
                      title={currentStudentState.emptyTaskState?.title || "暂无任务"}
                      description={currentStudentState.emptyTaskState?.desc || "先看看推荐练习，或者去学习中心补一门高频课程。"}
                      helperText="当前不是没有事情可做，而是系统没有命中明确任务。"
                      action={currentStudentState.emptyTaskState
                        ? {
                            label: currentStudentState.emptyTaskState.actionLabel,
                            onClick: () => navigate(currentStudentState.emptyTaskState.actionPath),
                          }
                        : undefined}
                      className="shadow-none"
                    />
                  </div>
                )}
              </div>
              )}
            </div>

            {!isStaff && homeSectionVisibility.studentGrowthReminder && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <TrendingUp size={16} className="text-[#16A34A]" />
                  <span className="text-base font-medium text-gray-900">成长提醒</span>
                  <span className="text-sm text-gray-400">· 与当前状态联动</span>
                </div>
                <div className={`rounded-lg p-3 ${currentStudentState.growthCard.tone}`}>
                  <p className="text-sm font-medium text-gray-800">{currentStudentState.growthCard.title}</p>
                  <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{currentStudentState.growthCard.desc}</p>
                  <button onClick={() => navigate(currentStudentState.growthCard.actionPath)} className="text-sm text-[#2F5FD0] mt-2">
                    {currentStudentState.growthCard.actionLabel} →
                  </button>
                </div>
                <button onClick={() => navigate("/learning/growth")} className="mt-3 w-full text-sm text-center text-[#2F5FD0] hover:text-[#2550B8] flex items-center justify-center gap-1">
                  查看完整成长分析 <ArrowRight size={12} />
                </button>
              </div>
            )}

          </div>

          {showHomeRightSidebar && (
            <div className="space-y-4">
              {((isStaff && showStaffUpdatesPanel) || (!isStaff && homeSectionVisibility.studentUpdatesPanel)) && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <Zap size={14} className="text-[#F59E0B]" />
                  <span className="text-sm font-medium text-gray-900">重要更新</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {(isStaff ? activeStaffUpdates : currentStudentState.updates).length > 0 ? (
                    (isStaff ? activeStaffUpdates : currentStudentState.updates).map((update, i) => (
                      <button
                        key={`${update.title}-${i}`}
                        type="button"
                        onClick={() => navigate(isStaff ? "/workbench/info-sync" : "/messages")}
                        className="w-full px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <p className="text-sm text-gray-800 line-clamp-2 leading-relaxed">{update.title}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`text-xs px-1.5 py-0.5 rounded ${getUpdateBadge(update.type)}`}>
                            {update.type === "product" ? "新品" : update.type === "spec" ? "规范" : update.type === "qa" ? "话术" : "系统"}
                          </span>
                          <span className="text-xs text-gray-400">{update.time}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <div className="w-10 h-10 rounded-2xl bg-[#F5F7FA] mx-auto flex items-center justify-center mb-3">
                        <Zap size={16} className="text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">暂无重要更新</p>
                      <p className="text-xs text-gray-500 mt-1">当前没有新品、规范或系统提醒。</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => navigate(isStaff ? "/workbench/info-sync" : "/messages")}
                  className="w-full px-4 py-2.5 text-xs text-[#2F5FD0] hover:bg-gray-50 flex items-center justify-center gap-1 border-t border-gray-100"
                >
                  查看全部更新 <ChevronRight size={12} />
                </button>
              </div>
            )}



            {isStaff ? (
              <>
                {showStaffTeamStatus && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={14} className="text-[#2F5FD0]" />
                      <span className="text-sm font-medium text-gray-900">{isTrainingTeacher ? "学员本周状态" : "团队本周状态"}</span>
                    </div>
                    {activeStaffMembers.map((member, i) => (
                      <div key={i} className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-600">{member.name[0]}</div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-gray-700">{member.name}</span>
                          <span className="text-sm text-gray-400 ml-2">{member.detail}</span>
                        </div>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${member.bg} ${member.color}`}>{member.status}</span>
                      </div>
                    ))}
                    <button
                      onClick={() => navigate(isTrainingTeacher ? "/learning/growth" : "/workbench/dashboard")}
                      className="w-full mt-2 text-xs text-[#2F5FD0] hover:text-[#2550B8] flex items-center justify-center gap-1"
                    >
                      {isTrainingTeacher ? "查看学员画像" : "查看异常看板"} <ChevronRight size={12} />
                    </button>
                  </div>
                )}

                {showStaffLoopEntry && (

                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 size={14} className="text-[#16A34A]" />
                      <span className="text-base font-medium text-gray-900">{isTrainingTeacher ? "培养闭环入口" : "补学与闭环入口"}</span>
                    </div>
                    <div className="space-y-2">
                      {activeLoopEntries.map((item) => (
                        <div key={item.title} className="rounded-lg bg-[#F5F7FA] p-3.5">
                          <p className="text-sm font-medium text-gray-800">{item.title}</p>
                          <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </>
            ) : (
              homeSectionVisibility.studentPermissionReminder && (

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield size={14} className="text-[#2F5FD0]" />
                    <span className="text-base font-medium text-gray-900">身份与权限提醒</span>
                  </div>
                  <div className="space-y-3">
                    <IdentityStatusBar
                      title="同一账号内保留双端能力"
                      description="当前只是切到学员视角做学习与训练，工作人员模块没有消失；工作相关入口会弱化保留在工作台和“我的”里。"
                      statusLabel={approvalMeta?.label || "待审批"}
                      statusBadgeClassName={getApprovalStatusToneClass(user?.staffApprovalStatus)}
                      items={[
                        {
                          label: "当前视角",
                          value: user ? getIdentityLabel(user.identity) : "学员",
                          helper: "影响首页推荐和快捷入口",
                        },
                        {
                          label: "主身份",
                          value: user ? getIdentityLabel(user.primaryIdentity) : "-",
                          helper: "账号层面的正式归属",
                        },
                        {
                          label: "工作人员权限",
                          value: approvalMeta?.label || "待审批",
                          helper: user?.staffApprovalUpdatedAt ? `最近更新：${user.staffApprovalUpdatedAt}` : "去“我的”查看申请进度",
                        },
                      ]}
                      highlights={[
                        "学习档案已保留",
                        user?.staffApprovalStatus === "approved" ? "可随时切回工作人员" : "工作人员权限待审批",
                        user?.staffApprovalStatus === "approved" ? "审批结果已生效" : "可在“我的”发起申请",
                        "两类模块共用同一账号",
                      ]}
                      action={{
                        label: user?.staffApprovalStatus === "approved" ? "查看审批状态" : "去发起申请",
                        onClick: () => navigate(user?.staffApprovalStatus === "approved" ? "/profile/approval-status" : "/profile/staff-transfer"),
                      }}
                    />
                    <button
                      onClick={() => navigate("/workbench")}
                      className="w-full text-sm rounded-lg border border-brand text-brand py-2 hover:bg-brand-soft transition-colors"
                    >
                      去轻量工作台
                    </button>
                  </div>
                </div>
              )

            )}

            </div>
          )}
        </div>
      </div>

    </div>
  );
}
