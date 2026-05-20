import { useMemo } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  BookOpen,
  Brain,
  Clock,
  Dumbbell,
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
  Target,
  Users,
  Phone,
  MessageSquare,
} from "lucide-react";
import { useApp, getStaffApprovalStatusMeta, getIdentityLabel, getStaffRoleMeta } from "../context/AppContext";
import { IdentityStatusBar, QuickActionGrid, TodayTaskCard } from "../components/BusinessBlocks";
import { appShellClass, getApprovalStatusToneClass, moduleIconToneClass } from "../lib/visualTokens";
import { trainingStudents } from "../data/trainingTeacherData";
import { orders } from "../data/orderReviewData";

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
  { title: "青浦店资源缺口已补 3 个候选小区", module: "资源开拓", time: "今天 10:30" },
  { title: "嘉定云著添加微信口径已完成一次对账", module: "数据治理", time: "昨天 16:20" },
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
    label: "AI问答",
    icon: <Brain size={20} />,
    color: "bg-cyan-50 text-cyan-700",
    path: "/learning/ai-qna",
    badge: "问口径",
    badgeColor: "bg-[#EEF4FF] text-[#2F5FD0]",
  },
];

const showStaffCompletedPanel = false;
const showStaffSidebar = false;

const trainingTeacherQuickActions = [
  {
    label: "AI问答",
    icon: <Brain size={18} />,
    colorClassName: "bg-blue-50 text-blue-600",
    badge: "答疑",
    badgeClassName: "bg-blue-100 text-[#2F5FD0]",
    path: "/learning/ai-qna",
  },
  {
    label: "演练评分",
    icon: <Dumbbell size={18} />,
    colorClassName: "bg-indigo-50 text-indigo-600",
    badge: "分项",
    badgeClassName: "bg-indigo-100 text-indigo-700",
    path: "/workbench/dashboard",
  },
  {
    label: "公司产品",
    icon: <RefreshCw size={18} />,
    colorClassName: "bg-blue-50 text-blue-600",
    badge: "3 更新",
    badgeClassName: "bg-amber-100 text-[#B45309]",
    path: "/workbench/info-sync",
  },
  {
    label: "案例库",
    icon: <BookOpen size={18} />,
    colorClassName: "bg-green-50 text-green-600",
    badge: "4 待入库",
    badgeClassName: "bg-green-100 text-[#15803D]",
    path: "/workbench/content-ops",
  },
];

const designerQuickActions = [
  {
    label: "销售设计师协同",
    icon: <ArrowLeftRight size={18} />,
    colorClassName: "bg-green-50 text-green-600",
    badge: "2 待补",
    badgeClassName: "bg-red-100 text-[#DC2626]",
    path: "/workbench/collab",
  },
  {
    label: "AI问答",
    icon: <Brain size={18} />,
    colorClassName: "bg-blue-50 text-blue-600",
    badge: "问口径",
    badgeClassName: "bg-blue-100 text-[#2F5FD0]",
    path: "/learning/ai-qna",
  },
  {
    label: "公司产品",
    icon: <RefreshCw size={18} />,
    colorClassName: "bg-amber-50 text-amber-600",
    badge: "3 未看",
    badgeClassName: "bg-amber-100 text-[#B45309]",
    path: "/workbench/info-sync",
  },
  {
    label: "设计规范",
    icon: <BookOpen size={18} />,
    colorClassName: "bg-indigo-50 text-indigo-600",
    badge: "防错",
    badgeClassName: "bg-indigo-100 text-indigo-700",
    path: "/learning/design-standards",
  },
];

const designerUrgentTasks = [
  {
    id: 1,
    title: "客户李总方案会审前缺防滑等级确认",
    desc: "销售只写了老人安全诉求，设计侧需要补齐卫浴区 R10/R11 选择、示意图和讲解口径。",
    urgency: "urgent" as const,
    action: "去协同补齐",
    path: "/workbench/collab",
    module: "销售设计师协同",
  },
  {
    id: 2,
    title: "销售报价口径与设计方案不一致",
    desc: "套餐内外、模块估价和方案图版本需要会审前对齐，避免客户现场听到两套说法。",
    urgency: "urgent" as const,
    action: "看会审记录",
    path: "/workbench/collab/records",
    module: "方案会审",
  },
];

const designerPendingTasks = [
  {
    id: 3,
    title: "铝套盒与皮抽面组合升级需要看完确认",
    desc: "新品图示、适用场景和现场工艺说明会影响方案讲解，确认后再用于客户方案。",
    urgency: "warning" as const,
    action: "看产品",
    path: "/workbench/info-sync",
    module: "公司产品",
  },
  {
    id: 4,
    title: "优秀方案讲解案例待复盘",
    desc: "把客户顾虑、图纸表达、报价边界和会审反馈沉淀成可复用讲解材料。",
    urgency: "warning" as const,
    action: "看协同",
    path: "/workbench/collab",
    module: "案例沉淀",
  },
];

const salesQuickActions = [
  {
    label: "客户跟进",
    icon: <Phone size={18} />,
    colorClassName: "bg-green-50 text-green-600",
    badge: "5 今日",
    badgeClassName: "bg-red-100 text-[#DC2626]",
    path: "/workbench/sales-followup",
  },
  {
    label: "建客户单",
    icon: <ArrowLeftRight size={18} />,
    colorClassName: "bg-blue-50 text-blue-600",
    badge: "交设计",
    badgeClassName: "bg-blue-100 text-[#2F5FD0]",
    path: "/workbench/collab",
  },
  {
    label: "方案会审",
    icon: <FileCheck size={18} />,
    colorClassName: "bg-indigo-50 text-indigo-600",
    badge: "同设计",
    badgeClassName: "bg-indigo-100 text-indigo-700",
    path: "/workbench/collab/records",
  },
  {
    label: "公司产品",
    icon: <RefreshCw size={18} />,
    colorClassName: "bg-amber-50 text-amber-600",
    badge: "3 更新",
    badgeClassName: "bg-amber-100 text-[#B45309]",
    path: "/workbench/info-sync",
  },
  {
    label: "AI问答",
    icon: <Brain size={18} />,
    colorClassName: "bg-cyan-50 text-cyan-700",
    badge: "问话术",
    badgeClassName: "bg-cyan-100 text-cyan-700",
    path: "/learning/ai-qna",
  },
];

const salesUrgentTasks = [
  {
    id: 1,
    title: "李总卫浴改造单今天要确认预算边界",
    desc: "客户关注老人防滑和总价，先确认是否接受 R10 防滑款，再把预算上限同步给设计师。",
    urgency: "urgent" as const,
    action: "去跟进",
    path: "/workbench/sales-followup",
    module: "客户跟进",
  },
  {
    id: 2,
    title: "张女士全屋瓷砖单缺一次报价回访",
    desc: "设计方案已同步，客户还没确认大规格哑光砖报价，需要今天补一次回访记录。",
    urgency: "urgent" as const,
    action: "打电话",
    path: "/workbench/sales-followup",
    module: "报价推进",
  },
];

const salesPendingTasks = [
  {
    id: 3,
    title: "防水产品施工规范 v3.1 需要看完",
    desc: "新禁用材料和卫浴厚度要求会影响客户解释口径，看完再用于门店讲解。",
    urgency: "warning" as const,
    action: "看产品",
    path: "/workbench/info-sync",
    module: "公司产品",
  },
  {
    id: 4,
    title: "临港星河湾客户单待补现场照片",
    desc: "设计师已接收需求，但还需要你上传现场照片和客户预算说明。",
    urgency: "warning" as const,
    action: "补客户单",
    path: "/workbench/collab/request/r1",
    module: "销售设计师协同",
  },
];

const salesCustomers = [
  { name: "李总", project: "临港星河湾 · 卫浴改造", stage: "需确认预算", next: "今天 16:00 前", tone: "red" },
  { name: "张女士", project: "青浦悦府 · 全屋瓷砖", stage: "报价回访", next: "今天 18:00 前", tone: "amber" },
  { name: "王先生", project: "嘉定云著 · 厨卫翻新", stage: "需求初访", next: "明天上午", tone: "blue" },
];

const orderReviewerQuickActions = [
  {
    label: "审单任务",
    icon: <FileCheck size={18} />,
    colorClassName: "bg-red-50 text-[#DC2626]",
    badge: "异常",
    badgeClassName: "bg-red-100 text-[#DC2626]",
    path: "/workbench/order-review",
  },
  {
    label: "下单准备",
    icon: <CheckCircle2 size={18} />,
    colorClassName: "bg-blue-50 text-blue-600",
    badge: "字段",
    badgeClassName: "bg-blue-100 text-[#2F5FD0]",
    path: "/workbench/order-review/preparation/o1",
  },
  {
    label: "工艺校验",
    icon: <Shield size={18} />,
    colorClassName: "bg-indigo-50 text-indigo-600",
    badge: "三方",
    badgeClassName: "bg-indigo-100 text-indigo-700",
    path: "/workbench/order-review/validation/o1",
  },
  {
    label: "回流培训",
    icon: <RefreshCw size={18} />,
    colorClassName: "bg-green-50 text-green-600",
    badge: "防错",
    badgeClassName: "bg-green-100 text-[#15803D]",
    path: "/workbench/order-review/flowback/o1",
  },
];

const orderReviewerUrgentTasks = [
  {
    id: 1,
    title: "规格与设计图不一致，先冻结生产口径",
    desc: "核对签字图纸、订单系统、生产数据三方是否一致，避免规格错误流到工厂和客户承诺。",
    urgency: "urgent" as const,
    action: "标注异常",
    path: "/workbench/order-review/annotation/o1",
    module: "尺寸/规格",
  },
  {
    id: 2,
    title: "大单/混油单签字链路缺口待确认",
    desc: "50 万以上正常单和所有混油单必须按制度核对签字，缺签禁止下单/审单。",
    urgency: "urgent" as const,
    action: "查准备页",
    path: "/workbench/order-review/preparation/o1",
    module: "签字合规",
  },
];

const orderReviewerPendingTasks = [
  {
    id: 3,
    title: "颜色与材质备注需要复核",
    desc: "下单颜色与签字图纸、CAD 备注、三维家翻图要一致，特别留意水晶板/双饰面同色误判。",
    urgency: "warning" as const,
    action: "去校验",
    path: "/workbench/order-review/validation/o1",
    module: "颜色/材质",
  },
  {
    id: 4,
    title: "加急单责任判定需要留痕",
    desc: "制度要求审单部门判定是否个人原因导致加急，并同步对应责任人和扣款备注。",
    urgency: "warning" as const,
    action: "看归因",
    path: "/workbench/order-review/attribution/o1",
    module: "加急判定",
  },
  {
    id: 5,
    title: "高频错误需要回流新人防错训练",
    desc: "把尺寸、颜色、结构格局、165 度铰链等高频漏项同步到课程、题库和陪练。",
    urgency: "warning" as const,
    action: "做回流",
    path: "/workbench/order-review/flowback/o1",
    module: "培训回流",
  },
];

const orderReviewerRiskChecks = [
  { label: "尺寸", value: "底单=下单", detail: "先 CAD 排版再三维家翻图" },
  { label: "颜色", value: "图纸=系统", detail: "水晶板/双饰面需二次确认" },
  { label: "结构", value: "交叉/内缩", detail: "板件格局不能靠想当然" },
  { label: "合规", value: "签字/审批", detail: "大单混油、加急、成品家具要留痕" },
];

function trainingStatusTone(status: string) {
  if (status === "红色") return "bg-red-50 text-[#DC2626]";
  if (status === "需跟进") return "bg-amber-50 text-[#B45309]";
  return "bg-green-50 text-[#15803D]";
}

export default function Workbench() {


  const navigate = useNavigate();
  const { currentIdentity, user } = useApp();
  const isStaff = currentIdentity === "staff";
  const approvalMeta = user ? getStaffApprovalStatusMeta(user.staffApprovalStatus) : null;
  const selectedStaffRole = user?.staffRole ?? "training_teacher";
  const staffRoleMeta = getStaffRoleMeta(selectedStaffRole);
  const isTrainingTeacher = isStaff && selectedStaffRole === "training_teacher";
  const isDesigner = isStaff && selectedStaffRole === "designer";
  const isSales = isStaff && selectedStaffRole === "sales";
  const isOrderReviewer = isStaff && selectedStaffRole === "order_reviewer";
  const abnormalOrderCount = orders.filter((order) => order.status === "abnormal").length;
  const flowbackOrderCount = orders.filter((order) => order.canFlowback).length;

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

  if (isTrainingTeacher) {
    return (
      <div className="min-h-full bg-page-surface">
        <div className={`${appShellClass.staffHeader} px-4 md:px-6 pt-4 pb-10`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-white">培训老师工作台</h1>
                <p className="text-white/60 text-xs mt-0.5">
                  {staffRoleMeta.label}视角 · 先看学员看板、AI问答、演练评分和案例沉淀
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-5">
          <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">培训工作入口</span>
                  </div>
                  <span className="text-xs text-gray-400">先答疑，再看学员真实考核</span>
                </div>
                <QuickActionGrid
                  columns={4}
                  items={trainingTeacherQuickActions.map((item) => ({
                    label: item.label,
                    icon: item.icon,
                    colorClassName: item.colorClassName,
                    badge: item.badge,
                    badgeClassName: item.badgeClassName,
                    onClick: () => navigate(item.path),
                  }))}
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Users size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">学员看板</span>
                  </div>
                  <button
                    onClick={() => navigate("/workbench/dashboard")}
                    className="text-xs text-[#2F5FD0] hover:text-[#2550B8] flex items-center gap-0.5"
                  >
                    查看分项评分 <ChevronRight size={12} />
                  </button>
                </div>
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
                              <span className={`text-xs px-2 py-0.5 rounded-full ${trainingStatusTone(student.status)}`}>{student.status}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{student.cohort} · {student.stage}</p>
                          </div>
                          <div className={student.score < 65 ? "text-2xl font-bold text-[#DC2626]" : "text-2xl font-bold text-[#2F5FD0]"}>
                            {student.score}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {student.assessmentItems.map((item) => (
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
              </div>

          </div>
        </div>
      </div>
    );
  }

  if (isDesigner) {
    return (
      <div className="min-h-full bg-page-surface">
        <div className={`${appShellClass.staffHeader} px-4 md:px-6 pt-4 pb-10`}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-white">设计师工作台</h1>
                <p className="text-white/60 text-xs mt-0.5">
                  {staffRoleMeta.label}视角 · 先看方案协同、图纸准备、会审反馈和产品口径
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-5">
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                <div className="flex items-center gap-2">
                  <FileCheck size={15} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">设计工作入口</span>
                </div>
                <span className="text-xs text-gray-400">先对齐口径，再进入会审</span>
              </div>
              <QuickActionGrid
                columns={4}
                items={designerQuickActions.map((item) => ({
                  label: item.label,
                  icon: item.icon,
                  colorClassName: item.colorClassName,
                  badge: item.badge,
                  badgeClassName: item.badgeClassName,
                  onClick: () => navigate(item.path),
                }))}
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <AlertTriangle size={15} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">紧急 · 会审前必须补齐</span>
              </div>
              <div className="divide-y divide-gray-50">
                {designerUrgentTasks.map((task) => (
                  <TodayTaskCard
                    key={task.id}
                    title={task.title}
                    description={task.desc}
                    urgency={task.urgency}
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
                <span className="text-sm font-medium text-gray-900">待处理 · 产品与案例沉淀</span>
              </div>
              <div className="divide-y divide-gray-50">
                {designerPendingTasks.map((task) => (
                  <TodayTaskCard
                    key={task.id}
                    title={task.title}
                    description={task.desc}
                    urgency={task.urgency}
                    moduleLabel={task.module}
                    actionLabel={task.action}
                    onClick={() => navigate(task.path)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSales) {
    return (
      <div className="min-h-full bg-page-surface">
        <div className={`${appShellClass.staffHeader} px-4 md:px-6 pt-4 pb-10`}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-white">销售工作台</h1>
                <p className="text-white/60 text-xs mt-0.5">
                  {staffRoleMeta.label}视角 · 先看客户跟进、报价推进、产品口径和设计协同
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-5">
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                <div className="flex items-center gap-2">
                  <Briefcase size={15} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">销售工作入口</span>
                </div>
                <span className="text-xs text-gray-400">先跟进客户，再同步设计</span>
              </div>
              <QuickActionGrid
                columns={5}
                items={salesQuickActions.map((item) => ({
                  label: item.label,
                  icon: item.icon,
                  colorClassName: item.colorClassName,
                  badge: item.badge,
                  badgeClassName: item.badgeClassName,
                  onClick: () => navigate(item.path),
                }))}
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <Flame size={15} className="text-[#DC2626]" />
                  <span className="text-sm font-medium text-gray-900">今日必须推进</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {salesUrgentTasks.map((task) => (
                    <TodayTaskCard
                      key={task.id}
                      title={task.title}
                      description={task.desc}
                      urgency={task.urgency}
                      moduleLabel={task.module}
                      actionLabel={task.action}
                      onClick={() => navigate(task.path)}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={15} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">重点客户</span>
                </div>
                <div className="space-y-2">
                  {salesCustomers.map((customer) => (
                    <button
                      key={customer.name}
                      type="button"
                      onClick={() => navigate("/workbench/sales-followup")}
                      className="w-full rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-left hover:border-[#D9E5FF] hover:bg-[#F7FAFF] transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          customer.tone === "red" ? "bg-red-50 text-[#DC2626]" : customer.tone === "amber" ? "bg-amber-50 text-[#B45309]" : "bg-blue-50 text-[#2F5FD0]"
                        }`}>
                          {customer.stage}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{customer.project}</p>
                      <p className="text-xs text-gray-400 mt-1">下次动作：{customer.next}</p>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <span className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#2F5FD0] text-white py-1.5 text-xs">
                          <MessageSquare size={12} /> 发消息
                        </span>
                        <span className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#16A34A] text-white py-1.5 text-xs">
                          <Phone size={12} /> 打电话
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <Clock size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">待处理 · 产品与协同</span>
              </div>
              <div className="divide-y divide-gray-50">
                {salesPendingTasks.map((task) => (
                  <TodayTaskCard
                    key={task.id}
                    title={task.title}
                    description={task.desc}
                    urgency={task.urgency}
                    moduleLabel={task.module}
                    actionLabel={task.action}
                    onClick={() => navigate(task.path)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isOrderReviewer) {
    return (
      <div className="min-h-full bg-page-surface">
        <div className={`${appShellClass.staffHeader} px-4 md:px-6 pt-4 pb-10`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-white">审单工作台</h1>
                <p className="text-white/60 text-xs mt-0.5">
                  {staffRoleMeta.label}视角 · 先拦截尺寸、颜色、结构、签字和加急风险
                </p>
              </div>
              <div className="hidden sm:grid grid-cols-3 gap-2 text-right">
                {[
                  { label: "异常单", value: `${abnormalOrderCount}` },
                  { label: "可回流", value: `${flowbackOrderCount}` },
                  { label: "红线项", value: "4" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-white/10 px-3 py-2">
                    <div className="text-xl font-bold text-white">{item.value}</div>
                    <div className="text-white/50 text-xs">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-5">
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                <div className="flex items-center gap-2">
                  <FileCheck size={15} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">审单工作入口</span>
                </div>
                <span className="text-xs text-gray-400">先拦截风险，再回流标准</span>
              </div>
              <QuickActionGrid
                columns={4}
                items={orderReviewerQuickActions.map((item) => ({
                  label: item.label,
                  icon: item.icon,
                  colorClassName: item.colorClassName,
                  badge: item.badge,
                  badgeClassName: item.badgeClassName,
                  onClick: () => navigate(item.path),
                }))}
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <Flame size={15} className="text-[#DC2626]" />
                  <span className="text-sm font-medium text-gray-900">紧急 · 今日先拦截</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {orderReviewerUrgentTasks.map((task) => (
                    <TodayTaskCard
                      key={task.id}
                      title={task.title}
                      description={task.desc}
                      urgency={task.urgency}
                      moduleLabel={task.module}
                      actionLabel={task.action}
                      onClick={() => navigate(task.path)}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={15} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">审单红线核查</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {orderReviewerRiskChecks.map((item) => (
                    <div key={item.label} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">{item.value}</p>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <Clock size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">待处理 · 规则与回流</span>
              </div>
              <div className="divide-y divide-gray-50">
                {orderReviewerPendingTasks.map((task) => (
                  <TodayTaskCard
                    key={task.id}
                    title={task.title}
                    description={task.desc}
                    urgency={task.urgency}
                    moduleLabel={task.module}
                    actionLabel={task.action}
                    onClick={() => navigate(task.path)}
                  />
                ))}
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
              <h1 className="text-white">运营工作台</h1>
              <p className="text-white/60 text-xs mt-0.5">{staffRoleMeta.label}视角 · 先看资源缺口、社群过程、转化风险和数据口径</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-5">
        <div className={`grid gap-4 ${showStaffSidebar ? "md:grid-cols-3" : "grid-cols-1"}`}>
          <div className={`${showStaffSidebar ? "md:col-span-2" : ""} space-y-4`}>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                <div className="flex items-center gap-2">
                  <Layers size={15} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">常用工作入口</span>
                </div>
                <span className="text-xs text-gray-400">按今日风险优先级排序</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {moduleCards.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => navigate(m.path)}
                    className="min-h-[104px] flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-lg border border-gray-100 hover:border-[#D9E5FF] hover:bg-[#F7FAFF] transition-colors relative"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.color}`}>{m.icon}</div>
                    <span className="text-xs text-gray-700 text-center leading-snug">{m.label}</span>
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
                    { label: "资源开拓", status: "5 个缺口", color: "text-[#DC2626]", bg: "bg-red-50" },
                    { label: "数据治理", status: "2 条对账", color: "text-[#B45309]", bg: "bg-amber-50" },
                    { label: "新人培养", status: "3 个阶段", color: "text-[#2F5FD0]", bg: "bg-[#EEF4FF]" },
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
                    { label: "资源开拓看板", desc: "小区资源 / 门店缺口 / 负责人", path: "/workbench/content-ops" },
                    { label: "异常风险名单", desc: "人员 / 小区 / 门店红黄预警", path: "/workbench/dashboard/risk" },
                    { label: "运营任务闭环", desc: "负责人 / 截止时间 / 处理回执", path: "/workbench/dashboard/tasks" },
                    { label: "数据口径治理", desc: "群人数 / 添加微信 / QC 对账", path: "/workbench/content-ops" },
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
                    { action: "补齐青浦店 3 个小区资源入口", time: "10:30" },
                    { action: "回写临港星河湾群人数拉新动作", time: "昨天" },
                    { action: "对齐嘉定云著添加微信统计口径", time: "昨天" },
                    { action: "拆出 2 条样板间推进任务", time: "今天" },
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
