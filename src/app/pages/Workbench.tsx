import { useMemo } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  Clock,
  RefreshCw,
  FileCheck,
  BarChart3,
  ArrowLeftRight,
  Layers,
  CheckCircle2,
  Circle,
  Flame,
  GitBranch,
  Shield,
  Bell,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import { useApp, getStaffApprovalStatusMeta, getIdentityLabel } from "../context/AppContext";
import { IdentityStatusBar, QuickActionGrid, TodayTaskCard } from "../components/BusinessBlocks";
import { appShellClass, getApprovalStatusToneClass, moduleIconToneClass } from "../lib/visualTokens";

const urgentTasks = [
  {
    id: 1,
    type: "risk",
    title: "临港星河湾群人数低于 50% 目标线",
    desc: "当前 101 / 240 · 2 天无增长 · 今天需补资源入口和群内拉新动作",
    urgency: "urgent",
    action: "查看异常看板",
    path: "/workbench/dashboard",
    module: "社区运营",
  },
  {
    id: 2,
    type: "sync",
    title: "群人数 / 添加微信跨表对账异常",
    desc: "嘉定云著销售明细与月度汇总不一致 · 需要先校验口径再看转化",
    urgency: "urgent",
    action: "去数据治理",
    path: "/workbench/content-ops",
    module: "数据口径",
  },
  {
    id: 3,
    type: "order",
    title: "青浦悦府 QC 为 0，样板间未启动",
    desc: "QC 目标 4 / 当前 0 · 样板间候选人和宣传节点缺失",
    urgency: "urgent",
    action: "拆任务闭环",
    path: "/workbench/dashboard/tasks",
    module: "样板间",
  },
];

const pendingTasks = [
  {
    id: 4,
    title: "青浦店资源缺口 5 个小区 · 明天前需补计划",
    desc: "先补 3 个可开群小区，再明确群开拓人和可开群时间",
    urgency: "warning",
    action: "查看资源盘点",
    path: "/workbench/content-ops",
    module: "社区运营",
  },
  {
    id: 5,
    title: "一对一转化跟进弱 · 需抽查销售明细",
    desc: "添加微信后缺持续跟进记录 · 本周沉淀 3 条邀约到店话术",
    urgency: "warning",
    action: "看转化管理",
    path: "/workbench/content-ops",
    module: "转化管理",
  },
  {
    id: 6,
    title: "活动复盘模板待补 · 新人培养资料散落",
    desc: "直播、视频号、活动筹备和复盘资料需要归到阶段培养路径",
    urgency: "warning",
    action: "看新人培养",
    path: "/workbench/content-ops",
    module: "培养沉淀",
  },
];

const completedTasks = [
  { title: "推送新品参数更新通知 · 15/18 人已确认", module: "信息同步", time: "今天 10:30" },
  { title: "2 条售后异常已回流培训系统", module: "审单回流", time: "昨天 16:20" },
];

const moduleCards = [
  {
    label: "社区运营",
    icon: <Layers size={20} />,
    color: "bg-green-50 text-green-600",
    path: "/workbench/content-ops",
    badge: "12 风险",
    badgeColor: "bg-red-100 text-[#DC2626]",
  },
  {
    label: "异常看板",
    icon: <BarChart3 size={20} />,
    color: "bg-red-50 text-[#DC2626]",
    path: "/workbench/dashboard",
    badge: "9 对账",
    badgeColor: "bg-amber-100 text-[#B45309]",
  },
  {
    label: "运营任务",
    icon: <CheckCircle2 size={20} />,
    color: "bg-blue-50 text-blue-600",
    path: "/workbench/dashboard/tasks",
    badge: "5 待闭环",
    badgeColor: "bg-red-100 text-[#DC2626]",
  },
  {
    label: "信息同步中心",
    icon: <RefreshCw size={20} />,
    color: "bg-blue-50 text-blue-600",
    path: "/workbench/info-sync",
    badge: "规则口径",
    badgeColor: "bg-[#EEF4FF] text-[#2F5FD0]",
  },
  {
    label: "销设协同",
    icon: <ArrowLeftRight size={20} />,
    color: "bg-purple-50 text-purple-600",
    path: "/workbench/collab",
    badge: "1 待确认",
    badgeColor: "bg-amber-100 text-[#F59E0B]",
  },
  {
    label: "审单·回流",
    icon: <FileCheck size={20} />,
    color: "bg-orange-50 text-orange-600",
    path: "/workbench/order-review",
    badge: "1 异常",
    badgeColor: "bg-red-100 text-[#DC2626]",
  },
  {
    label: "审批·申请",
    icon: <Shield size={20} />,
    color: "bg-slate-50 text-slate-700",
    path: "/workbench/approvals",
    badge: "2 待处理",
    badgeColor: "bg-amber-100 text-[#B45309]",
  },
];

const showStaffCompletedPanel = false;
const showStaffSidebar = false;

export default function Workbench() {


  const navigate = useNavigate();
  const { currentIdentity, user } = useApp();
  const isStaff = currentIdentity === "staff";
  const approvalMeta = user ? getStaffApprovalStatusMeta(user.staffApprovalStatus) : null;
  const urgentCount = urgentTasks.length;
  const pendingCount = pendingTasks.length;
  const completedCount = completedTasks.length;
  const totalOpenTasks = urgentCount + pendingCount;

  const studentQuickCards = useMemo(
    () => [
      {
        label: "转工作人员申请",
        icon: <Briefcase size={18} />,
        color: moduleIconToneClass.design,
        path: "/profile/staff-transfer",
        badge: user?.staffApprovalStatus === "approved" ? "已开通" : user?.staffApprovalStatus === "pending" ? "审批中" : "去申请",
      },
      {
        label: "申请状态",
        icon: <Shield size={18} />,
        color: "bg-green-50 text-green-600",
        path: "/profile/approval-status",
        badge: approvalMeta?.shortLabel || "查看",
      },
      {
        label: "协同提醒",
        icon: <ArrowLeftRight size={18} />,
        color: "bg-purple-50 text-purple-600",
        path: "/workbench/collab",
        badge: "1 待补充",
      },
      {
        label: "消息通知",
        icon: <Bell size={18} />,
        color: "bg-orange-50 text-orange-600",
        path: "/messages",
        badge: "2 未读",
      },
    ],
    [approvalMeta?.shortLabel, user?.staffApprovalStatus]
  );

  const studentAttentionItems = useMemo(
    () => [
      {
        id: 1,
        title:
          user?.staffApprovalStatus === "approved"
            ? "你已开通工作人员权限，可按需要切回工作人员视角"
            : user?.staffApprovalStatus === "pending"
              ? "你的转工作人员申请正在审批中"
              : user?.staffApprovalStatus === "rejected"
                ? "最近一次转工作人员申请未通过，建议补齐条件后重提"
                : "当前还没有工作人员权限，需审批开通后才能进入工作人员视角",
        desc:
          user?.staffApprovalStatus === "approved"
            ? "现在这页保留的是轻量入口；要处理正式待办和风险任务时，可切换到工作人员视角。"
            : user?.staffApprovalStatus === "pending"
              ? "审批完成前，工作台只保留申请、协同和通知类轻入口。"
              : user?.staffApprovalStatus === "rejected"
                ? "建议先完成补训与考核要求，再去“我的”里重新发起申请。"
                : "你仍可先用学员能力完成学习、训练和成长闭环。",
        action: user?.staffApprovalStatus === "approved" ? "去我的查看身份详情" : "去发起 / 查看申请",
        path: user?.staffApprovalStatus === "approved" ? "/profile" : "/profile/staff-transfer",
      },
      {
        id: 2,
        title: "客户李总的需求交接还差 1 项信息",
        desc: "设计师已回传需要补充“卫浴区防滑等级”和交付时间，补齐后协同会更顺。",
        action: "去补充协同信息",
        path: "/workbench/collab",
      },
      {
        id: 3,
        title: "防水规范 v3.1 更新已推送，建议你今天看完",
        desc: "这类通知会影响现场解释口径，学员工作台会保留可见提醒，但不承载重运营动作。",
        action: "去看通知",
        path: "/messages",
      },
    ],
    [user?.staffApprovalStatus]
  );

  if (!isStaff) {
    return (
      <div className="min-h-full bg-[#F5F7FA]">
        <div className="bg-[#2F5FD0] px-4 md:px-6 pt-4 pb-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-white">工作台</h1>
                <p className="text-white/70 text-xs mt-0.5">学员轻量视角 · 保留申请 / 协同 / 通知，不承载重工作流</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-white/50 text-xs">轻事项提醒</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { label: "申请", value: user?.staffApprovalStatus === "approved" ? "已开通" : "1", bg: "bg-white/10" },
                { label: "协同提醒", value: "1", bg: "bg-white/10" },
                { label: "通知未读", value: "2", bg: "bg-white/10" },
              ].map((s) => (
                <div key={s.label} className={`rounded-lg px-3 py-2 ${s.bg}`}>
                  <div className="text-lg font-bold text-white">{s.value}</div>
                  <div className="text-white/60 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-5">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3 gap-3">
                  <div className="flex items-center gap-2">
                    <Shield size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">轻量入口</span>
                  </div>
                  <span className="text-xs text-gray-400">同一系统内保留可见工作入口，但弱化重流程</span>
                </div>
                <QuickActionGrid
                  items={studentQuickCards.map((item) => ({
                    label: item.label,
                    icon: item.icon,
                    colorClassName: item.color,
                    badge: item.badge,
                    onClick: () => navigate(item.path),
                  }))}
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <Clock size={15} className="text-[#F59E0B]" />
                  <span className="text-sm font-medium text-gray-900">需要你留意的事</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {studentAttentionItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      onClick={() => navigate(item.path)}
                    >
                      <div className="flex items-start gap-3">
                        <Circle size={15} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                        <span className="flex-shrink-0 bg-[#2F5FD0] text-white px-3 py-1.5 rounded text-xs transition-colors">
                          {item.action}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <Bell size={15} className="text-[#16A34A]" />
                  <span className="text-sm font-medium text-gray-900">最近通知与协同记录</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {[
                    { title: "暖冬系列新品参数更新已发布", detail: "建议先看新品课，再继续门店推荐", time: "2小时前" },
                    { title: "设计侧已留言：补充卫浴区防滑等级", detail: "客户李总项目仍差这项信息", time: "今天 09:40" },
                    { title: "审批中心提醒：申请状态已更新", detail: "可前往“申请状态”查看完整说明", time: "昨天 18:20" },
                  ].map((item) => (
                    <div key={item.title} className="px-4 py-3">
                      <p className="text-sm text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                      <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={14} className="text-[#2F5FD0]" />
                  <p className="text-sm font-medium text-gray-900">当前身份与权限</p>
                </div>
                <div className="rounded-xl bg-[#F8FAFC] border border-gray-200 p-3">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-sm font-medium text-gray-800">主身份：学员</span>
                    {user && approvalMeta && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getApprovalStatusToneClass(user.staffApprovalStatus)}`}>
                        {approvalMeta.label}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {approvalMeta?.description || "当前账号以学员身份为主，工作台只保留轻量入口。"}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {[
                      "申请入口仍可见",
                      "协同提醒可查看",
                      "通知消息可处理",
                      user?.staffApprovalStatus === "approved" ? "可切回工作人员视角" : "工作人员视角待审批",
                    ].map((item) => (
                      <div key={item} className="text-xs text-gray-500 bg-white rounded-lg px-3 py-2 border border-gray-200">
                        {item}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(user?.staffApprovalStatus === "approved" ? "/profile" : "/profile/staff-transfer")}
                    className="mt-3 w-full text-xs text-brand hover:text-brand-hover text-center"
                  >
                    {user?.staffApprovalStatus === "approved" ? "去“我的”查看身份详情 →" : "去发起 / 查看转工作人员申请 →"}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch size={14} className="text-[#2F5FD0]" />
                  <p className="text-sm font-medium text-gray-900">轻量工作入口说明</p>
                </div>
                <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
                  <div className="rounded-xl bg-[#F7FAFF] border border-[#D9E5FF] p-3">
                    申请：保留入口，方便你随时发起或查看转工作人员进度。
                  </div>
                  <div className="rounded-xl bg-purple-50 border border-purple-100 p-3">
                    协同：只保留需你补充或确认的信息，不把复杂工作流全部塞进来。
                  </div>
                  <div className="rounded-xl bg-green-50 border border-green-100 p-3">
                    通知：重点提醒新品、规范、审批和消息，不要求你在这里做重运营动作。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-full bg-page-surface">
      <div className={`${appShellClass.staffHeader} px-4 md:px-6 pt-4 pb-10`}>

        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-white">工作台</h1>
              <p className="text-white/60 text-xs mt-0.5">工作人员视角 · 优先展示风险、任务、状态与下一步动作</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{totalOpenTasks}</div>
              <div className="text-white/50 text-xs">今日待办</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: "紧急", value: `${urgentCount}`, color: "text-red-300", bg: "bg-red-500/20 border border-red-400/30" },
              { label: "待处理", value: `${pendingCount}`, color: "text-amber-300", bg: "bg-amber-500/20 border border-amber-400/30" },
              { label: "今日完成", value: `${completedCount}`, color: "text-green-300", bg: "bg-green-500/20 border border-green-400/30" },
            ].map((s) => (
              <div key={s.label} className={`rounded-lg px-3 py-2 ${s.bg}`}>
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-white/50 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-5">
        <div className={`grid gap-4 ${showStaffSidebar ? "md:grid-cols-3" : "grid-cols-1"}`}>
          <div className={`${showStaffSidebar ? "md:col-span-2" : ""} space-y-4`}>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="grid grid-cols-3 gap-2">
                {moduleCards.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => navigate(m.path)}
                    className="flex flex-col items-center gap-1.5 py-3 rounded-lg hover:bg-gray-50 transition-colors relative"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.color}`}>{m.icon}</div>
                    <span className="text-xs text-gray-700 text-center">{m.label}</span>
                    {m.badge && <span className={`text-xs px-1.5 py-0.5 rounded-full ${m.badgeColor}`}>{m.badge}</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <Flame size={15} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">紧急 · 需立即处理</span>
              </div>
              <div className="divide-y divide-gray-50">
                {urgentTasks.map((task) => (
                  <TodayTaskCard
                    key={task.id}
                    title={task.title}
                    description={task.desc}
                    urgency="urgent"
                    moduleLabel={task.module}
                    actionLabel={task.action}
                    onClick={() => navigate(task.path)}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <Clock size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">待处理</span>
              </div>
              <div className="divide-y divide-gray-50">
                {pendingTasks.map((task) => (
                  <TodayTaskCard
                    key={task.id}
                    title={task.title}
                    description={task.desc}
                    urgency="warning"
                    moduleLabel={task.module}
                    actionLabel={task.action}
                    onClick={() => navigate(task.path)}
                  />
                ))}
              </div>
            </div>

            {showStaffCompletedPanel && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#16A34A]" />
                  <span className="text-sm font-medium text-gray-900">今日已完成</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {completedTasks.map((task) => (
                    <div key={task.title} className="px-4 py-3 flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-[#16A34A] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-400 line-through">{task.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{task.module} · {task.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {showStaffSidebar && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-900 mb-3">各模块状态</p>
                <div className="space-y-2">
                  {[
                    { label: "信息同步", status: "2 待确认", color: "text-[#DC2626]", bg: "bg-red-50" },
                    { label: "社区运营", status: "高风险 12", color: "text-[#F59E0B]", bg: "bg-amber-50" },
                    { label: "审单回流", status: "1 异常订单", color: "text-[#DC2626]", bg: "bg-red-50" },
                    { label: "销设协同", status: "1 待确认", color: "text-[#F59E0B]", bg: "bg-amber-50" },
                    { label: "审批申请", status: "2 待初审", color: "text-[#B45309]", bg: "bg-amber-50" },
                    { label: "异常看板", status: "12 风险小区", color: "text-[#DC2626]", bg: "bg-red-50" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{item.label}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${item.bg} ${item.color}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch size={14} className="text-[#2F5FD0]" />
                  <p className="text-sm font-medium text-gray-900">设计收口总览</p>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "查看产品蓝图", desc: "统一架构图 + 页面关系图", path: "/workbench/blueprint" },
                    { label: "查看双端映射验收", desc: "桌面端 / 手机端映射与差异边界", path: "/workbench/dual-end-acceptance" },
                    { label: "查看信息同步链路", desc: "更新详情 / 影响范围 / 下游同步", path: "/workbench/info-sync" },
                    { label: "查看审单回流拆解", desc: "异常详情 / 责任归因 / 回流计划", path: "/workbench/order-review" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => navigate(item.path)}
                      className="w-full text-left rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-xs font-medium text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-900 mb-3">近期操作记录</p>
                <div className="space-y-3">
                  {[
                    { action: "推送了防水规范更新通知", time: "10:30" },
                    { action: "审核并回流了 2 条售后异常", time: "昨天" },
                    { action: "新增了 1 个陪练话术场景", time: "昨天" },
                    { action: "集中处理 2 条审批与申请提醒", time: "今天" },
                  ].map((log) => (
                    <div key={`${log.action}-${log.time}`} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0 mt-1.5" />
                      <div>
                        <p className="text-xs text-gray-600">{log.action}</p>
                        <p className="text-xs text-gray-400">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
