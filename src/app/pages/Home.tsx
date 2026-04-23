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
} from "lucide-react";
import {
  useApp,
  getIdentityLabel,
  getStaffApprovalStatusMeta,
} from "../context/AppContext";
import { IdentityStatusBar, QuickActionGrid, TodayTaskCard } from "../components/BusinessBlocks";
import { GlobalStateCard, type GlobalStateTone } from "../components/GlobalStateCard";
import { appShellClass, getApprovalStatusToneClass, moduleIconToneClass } from "../lib/visualTokens";

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

const staffTasks = [
  {
    id: 1,
    type: "risk",
    title: "⚠️ 风险：3 名学员本周连续未完成新品课",
    desc: "李明、王芳、赵强 · 下周将有产品推介活动",
    urgency: "urgent",
    action: "查看名单并跟进",
    path: "/workbench/dashboard",
  },
  {
    id: 2,
    type: "sync",
    title: "【待确认】防水产品施工规范 v3.1 更新",
    desc: "影响：卫浴系列 4 款产品 · 需告知 12 名销售",
    urgency: "urgent",
    action: "确认并推送",
    path: "/workbench/info-sync",
  },
  {
    id: 3,
    type: "review",
    title: "审单任务：张国栋订单有参数异常",
    desc: "规格不符 · 等待工厂确认 · 已暂停生产",
    urgency: "warning",
    action: "处理异常",
    path: "/workbench/order-review",
  },
  {
    id: 4,
    type: "training",
    title: "本月培训完成率：64%（目标 80%）",
    desc: "还差 6 人完成必修课 · 差距最大：云岚石新品",
    urgency: "warning",
    action: "推送补训",
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
    { label: "带教看板", icon: <BarChart3 size={18} />, path: "/workbench/dashboard", color: moduleIconToneClass.design },
    { label: "培训运营", icon: <Users size={18} />, path: "/workbench/content-ops", color: moduleIconToneClass.delivery },
  ],
};

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
    desc: "谁掉队了、哪一单卡住了、今天该盯谁，要先给出动作。",
    action: "去带教看板",
    path: "/workbench/dashboard",
    icon: <AlertTriangle size={15} className="text-red-600" />,
    tone: "bg-red-50 border-red-100",
  },
  {
    title: "补训与回流",
    desc: "把售后、审单、考核问题继续回流成培训动作和标准更新。",
    action: "去培训运营",
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

function getUpdateBadge(type: UpdateType) {
  if (type === "product") return "bg-brand-soft text-brand";
  if (type === "spec") return "bg-state-warning-soft text-state-warning-foreground";
  if (type === "qa") return "bg-state-success-soft text-state-success-foreground";
  return "bg-gray-100 text-gray-500";
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
    heroTitle: "先从第一条任务开始",
    heroDesc: "这是你第一次进入学员首页，系统先给你最短学习路径，不先塞复杂信息。",
    stats: [
      { label: "今日任务", value: "1", sub: "条起步任务" },
      { label: "学习阶段", value: "1/4", sub: "已解锁" },
      { label: "成长记录", value: "0", sub: "次训练" },
    ],
    focusCard: {
      tone: "bg-[#F7FAFF] border-[#D9E5FF]",
      title: "首次进入建议",
      desc: "先看新人上岗路径和第一门必学课，完成后系统会继续给你下一步。",
      actionLabel: "开始第一条任务",
      actionPath: "/learning",
    },
    taskTitle: "起步任务",
    tasks: [
      {
        id: 1,
        type: "course",
        title: "新人销售上岗 7 日路径 · 第 1 步",
        desc: "先熟悉学习中心、AI 问答和今日任务的基本入口",
        urgency: "normal",
        deadline: "今天完成更好",
        duration: "约 10 分钟",
        progress: 0,
        path: "/learning",
      },
      {
        id: 2,
        type: "course",
        title: "先看：云岚石暖冬系列新品基础介绍",
        desc: "从最常用的新产品知识开始，避免一上来信息过多",
        urgency: "normal",
        deadline: "本周内",
        duration: "约 12 分钟",
        progress: 0,
        path: "/learning/course/1",
      },
    ],
    updates: [{ title: "新手指引已为你准备好", time: "刚刚", type: "system" }],
    growthCard: {
      tone: "bg-[#F5F7FA]",
      title: "成长提醒：先开始，再看反馈",
      desc: "首次进入时先建立节奏，成长分析会在你完成训练后逐步出现。",
      actionLabel: "去成长页看看结构",
      actionPath: "/learning/growth",
    },
  },
  "new-product": {
    label: "有新品待看",
    heroTitle: "今天先看新品更新",
    heroDesc: "这类更新会直接影响门店推荐和客户解释，优先级高于普通练习。",
    stats: [
      { label: "新品待看", value: "1", sub: "门重点更新" },
      { label: "影响场景", value: "3", sub: "类接待话题" },
      { label: "重学建议", value: "今天", sub: "完成" },
    ],
    focusCard: {
      tone: "bg-blue-50 border-blue-100",
      title: "有新品更新待查看",
      desc: "暖冬系列参数和防滑信息已更新，今天接待前建议先补齐。",
      actionLabel: "立即去看新品课",
      actionPath: "/learning/course/1",
    },
    taskTitle: "新品相关任务",
    tasks: [
      {
        id: 1,
        type: "course",
        title: "【必学】暖冬系列新品参数更新",
        desc: "新增 3 款规格、防滑等级更新、推荐场景变化",
        urgency: "urgent",
        deadline: "今日截止",
        duration: "约 20 分钟",
        progress: 0,
        path: "/learning/course/1",
      },
      {
        id: 2,
        type: "practice",
        title: "AI 陪练：新品怎么向客户介绍更清楚",
        desc: "练习把参数差异讲成人话，不只会背数据",
        urgency: "warning",
        deadline: "今天下班前",
        duration: "约 10 分钟",
        progress: 0,
        path: "/learning/ai-practice",
      },
    ],
    updates: [
      { title: "云岚石·暖冬系列新增 3 款规格", time: "2小时前", type: "product" },
      { title: "新品对应的问答口径已同步", time: "1小时前", type: "qa" },
    ],
    growthCard: {
      tone: "bg-blue-50",
      title: "成长提醒：新品知识会影响你近期得分",
      desc: "这类内容通常会进入陪练和考核，越早补齐越不容易掉队。",
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
    label: "有补训任务",
    heroTitle: "先把补训闭环走完",
    heroDesc: "系统已经识别到薄弱项，当前优先级最高的是补学、补练和复测，不建议跳过。",
    stats: [
      { label: "补训任务", value: "3", sub: "项待完成" },
      { label: "当前弱项", value: "2", sub: "个" },
      { label: "复测目标", value: "85+", sub: "分" },
    ],
    focusCard: {
      tone: "bg-red-50 border-red-100",
      title: "你有补训任务待完成",
      desc: "工艺规范和审单流程是当前最明显的薄弱项，建议按系统顺序完成闭环。",
      actionLabel: "查看补训任务页",
      actionPath: "/learning/growth/retrain",
    },
    taskTitle: "补训闭环任务",
    tasks: [
      {
        id: 1,
        type: "growth",
        title: "补学：防水施工规范 v3.1 关键变更",
        desc: "先补新版本变化，再去复述和复测",
        urgency: "urgent",
        deadline: "今天 18:00 前",
        duration: "约 12 分钟",
        progress: 0,
        path: "/learning/growth/retrain",
        ctaLabel: "去补训",
      },
      {
        id: 2,
        type: "practice",
        title: "练习：施工说明口径复述 1 次",
        desc: "把新规范说成客户能听懂的话，避免只会看课件",
        urgency: "warning",
        deadline: "今天下班前",
        duration: "约 8 分钟",
        progress: 0,
        path: "/learning/ai-practice",
      },
      {
        id: 3,
        type: "exam",
        title: "复测：防水施工规范 v3.1 专项测试",
        desc: "复测通过线 85 分，通过后才算这一轮补训完成",
        urgency: "warning",
        deadline: "本周五",
        duration: "约 25 分钟",
        progress: 0,
        path: "/learning/assessment",
      },
    ],
    updates: [
      { title: "系统已为你生成补训任务清单", time: "刚刚", type: "system" },
      { title: "最近一次复测未通过，建议先补学后再考", time: "今天", type: "system" },
    ],
    growthCard: {
      tone: "bg-red-50",
      title: "成长提醒：别只看分数，要看哪里没补到位",
      desc: "薄弱项详情、补训任务和复评结果已经连成闭环，可以按页查看。",
      actionLabel: "查看薄弱项详情",
      actionPath: "/learning/growth/weak-area/craft-standard",
    },
  },
  completed: {
    label: "今日已完成",
    heroTitle: "今日任务已完成",
    heroDesc: "今天的必做项已经清完了，你可以选择巩固练习，也可以先看成长反馈。",
    stats: [
      { label: "今日任务", value: "0", sub: "项待完成" },
      { label: "完成情况", value: "100%", sub: "已收口" },
      { label: "推荐动作", value: "可选", sub: "巩固练习" },
    ],
    focusCard: {
      tone: "bg-green-50 border-green-100",
      title: "今日任务已完成",
      desc: "如果还有余力，建议再练一次高频场景，拉开和基础线的差距。",
      actionLabel: "做一次加练",
      actionPath: "/learning/ai-practice",
    },
    taskTitle: "可选加练",
    tasks: [
      {
        id: 1,
        type: "practice",
        title: "可选：再练一次高频价值引导场景",
        desc: "不是必做项，用来把今天刚学的内容讲得更顺",
        urgency: "normal",
        deadline: "今天任意时间",
        duration: "约 10 分钟",
        progress: 0,
        path: "/learning/ai-practice",
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
      desc: "如果你正在接待客户，建议先查看本地缓存的课程或已保存话术，恢复后再同步最新内容。",
      actionLabel: "先去看已缓存课程",
      actionPath: "/learning/course/2",
    },
    taskTitle: "缓存任务提醒",
    tasks: [
      {
        id: 1,
        type: "course",
        title: "缓存可用：防水施工规范 v3.1 关键变更",
        desc: "这门课程可先离线查看关键页，网络恢复后再同步完整记录",
        urgency: "warning",
        deadline: "恢复后记得同步",
        duration: "约 8 分钟",
        progress: 45,
        path: "/learning/course/2",
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

export default function Home() {
  const { user, currentIdentity } = useApp();
  const navigate = useNavigate();
  const isStaff = currentIdentity === "staff";
  const [studentHomeState, setStudentHomeState] = useState<StudentHomeState>("normal");
  const today = new Date().toLocaleDateString("zh-CN", { month: "long", day: "numeric", weekday: "long" });
  const approvalMeta = user ? getStaffApprovalStatusMeta(user.staffApprovalStatus) : null;
  const currentStudentState = useMemo(() => studentHomeStates[studentHomeState], [studentHomeState]);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className={`${isStaff ? "bg-[#1E2A3A]" : "bg-[#2F5FD0]"} px-4 md:px-6 pt-4 pb-10`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm mb-1">{today}</p>
              <h1 className="text-white text-xl font-semibold">
                {isStaff ? `${user?.name}，今天先处理风险和待办` : `${user?.name}，${currentStudentState.heroTitle}`}
              </h1>
              <p className="text-white/80 text-sm mt-2 leading-relaxed">
                {isStaff
                  ? `工作人员视角 · 主身份${user ? getIdentityLabel(user.primaryIdentity) : "工作人员"} · 首页先给动作，不先给图表`
                  : `学员视角 · 主身份${user ? getIdentityLabel(user.primaryIdentity) : "学员"} · ${currentStudentState.heroDesc}`}
              </p>
            </div>
            <button
              onClick={() => navigate("/messages")}
              className="relative bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors"
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#DC2626] text-white text-xs rounded-full flex items-center justify-center">5</span>
            </button>
          </div>

          {!isStaff ? (
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
          ) : (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { label: "今日待办", value: "4", sub: "项", urgent: true },
                { label: "风险学员", value: "3", sub: "人", urgent: true },
                { label: "团队完成率", value: "64", sub: "%", urgent: false },
              ].map((stat, i) => (
                <div key={i} className={`rounded-lg px-3 py-3 ${stat.urgent ? "bg-red-500/20 border border-red-400/30" : "bg-white/10"}`}>
                  <div className={`text-xl font-bold ${stat.urgent ? "text-red-300" : "text-white"}`}>
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

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-5">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3 gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-[#2F5FD0]" />
                  <span className="text-base font-medium text-gray-900">{isStaff ? "快捷入口" : "学习快捷入口"}</span>
                </div>
                <span className="text-sm text-gray-400">{isStaff ? "同一系统内优先展示工作动作" : "同一系统内优先展示学习动作"}</span>
              </div>
              <QuickActionGrid
                items={quickLinks[isStaff ? "staff" : "student"].map((link) => ({
                  label: link.label,
                  icon: link.icon,
                  colorClassName: link.color,
                  onClick: () => navigate(link.path),
                }))}
              />
            </div>

            {!isStaff ? (
              <>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Target size={16} className="text-[#2F5FD0]" />
                    <span className="text-base font-medium text-gray-900">首页关键状态</span>
                    <span className="text-sm text-gray-400">当前查看：{currentStudentState.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {studentStateOptions.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setStudentHomeState(item.key)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                          studentHomeState === item.key ? "bg-[#2F5FD0] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

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
              </>
            ) : (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Target size={16} className="text-[#2F5FD0]" />
                  <span className="text-base font-medium text-gray-900">今日动作面板</span>
                  <span className="text-sm text-gray-400">先给动作，再给数据</span>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {staffActionBoard.map((item) => (
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
            )}

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame size={16} className="text-[#DC2626]" />
                  <span className="text-sm font-medium text-gray-900">{isStaff ? "今日待办 & 风险预警" : currentStudentState.taskTitle}</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(isStaff ? "/workbench/dashboard/tasks" : "/learning/growth")}
                  className="text-xs text-[#2F5FD0] hover:text-[#2550B8] flex items-center gap-0.5"
                >
                  全部 <ChevronRight size={12} />
                </button>
              </div>

              <div className="divide-y divide-gray-50">
                {isStaff ? (
                  staffTasks.map((task) => (
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
            </div>

            {!isStaff && (
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

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <Zap size={14} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">重要更新</span>
              </div>
              <div className="divide-y divide-gray-50">
                {(isStaff ? [
                  { title: "云岚石·暖冬系列防滑参数更新", time: "2小时前", type: "product" as UpdateType },
                  { title: "防水施工规范 v3.1 发布", time: "昨天", type: "spec" as UpdateType },
                  { title: "客户异议处理话术库新增 5 条", time: "2天前", type: "qa" as UpdateType },
                ] : currentStudentState.updates).length > 0 ? (
                  (isStaff
                    ? [
                        { title: "云岚石·暖冬系列防滑参数更新", time: "2小时前", type: "product" as UpdateType },
                        { title: "防水施工规范 v3.1 发布", time: "昨天", type: "spec" as UpdateType },
                        { title: "客户异议处理话术库新增 5 条", time: "2天前", type: "qa" as UpdateType },
                      ]
                    : currentStudentState.updates
                  ).map((update, i) => (
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

            {isStaff ? (
              <>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={14} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">团队本周状态</span>
                  </div>
                  {[
                    { name: "李明", status: "风险", detail: "3天未学习", color: "text-[#DC2626]", bg: "bg-red-50" },
                    { name: "王芳", status: "预警", detail: "考核得分下降", color: "text-[#F59E0B]", bg: "bg-amber-50" },
                    { name: "陈伟", status: "正常", detail: "完成率 90%", color: "text-[#16A34A]", bg: "bg-green-50" },
                  ].map((member, i) => (
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
                    onClick={() => navigate("/workbench/dashboard")}
                    className="w-full mt-2 text-xs text-[#2F5FD0] hover:text-[#2550B8] flex items-center justify-center gap-1"
                  >
                    查看带教看板 <ChevronRight size={12} />
                  </button>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={14} className="text-[#16A34A]" />
                    <span className="text-base font-medium text-gray-900">补学与闭环入口</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { title: "补训任务待发起", desc: "6 人未完成新品课，建议先推送重学" },
                      { title: "售后问题待回流", desc: "2 条高频问题尚未沉淀到培训标准" },
                      { title: "审批事项待确认", desc: "1 条身份/权限申请待处理" },
                    ].map((item) => (
                      <div key={item.title} className="rounded-lg bg-[#F5F7FA] p-3.5">
                        <p className="text-sm font-medium text-gray-800">{item.title}</p>
                        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
