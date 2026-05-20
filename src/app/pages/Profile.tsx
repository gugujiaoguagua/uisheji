import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRightLeft,
  Award,
  Bell,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock,
  Dumbbell,
  FileClock,
  History,
  LockKeyhole,
  LogOut,
  Settings,
  Shield,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import {
  StaffApprovalStatus,
  getIdentityLabel,
  getStaffApprovalStatusMeta,
  useApp,
} from "../context/AppContext";
import { ApprovalStatusCard, IdentityStatusBar, ReminderStrip } from "../components/BusinessBlocks";

const certifications = [
  { name: "产品基础知识认证", date: "2023-12-28", score: 88, valid: true },
  { name: "销售话术初级认证", date: "2023-11-15", score: 91, valid: true },
];

const identityDescriptions = {
  student: "保留学习中心、AI 问答、AI 陪练、考核与成长能力。",
  staff: "优先承接待办、风险、协同、审单和带教等工作台能力。",
};

const identityActions = {
  student: ["学习中心", "AI 问答", "AI 陪练", "考核", "成长与补训"],
  staff: ["信息同步", "社区运营", "销设协同", "审单回流", "审批·申请", "异常看板"],
};

const retainedLearningAbilities = ["学习中心", "历史课程", "考核记录", "成长档案", "补训任务"];

const showIdentityPermissionSummary = false;
const showPermissionBoundarySections = false;
const showPermissionStatusCard = false;
const showIdentityChangeCard = false;
const showStatusSyncCard = false;
const showLatestApplicationPanel = false;
const showApplicationHistoryPanel = false;
const showIdentityFlowPanel = false;
const showLearningArchivePanel = false;
const showStatusNextStepPanel = false;


function getStatusBadgeClass(status: StaffApprovalStatus) {




  if (status === "approved") return "bg-green-100 text-[#15803D]";
  if (status === "pending") return "bg-amber-100 text-[#B45309]";
  if (status === "rejected") return "bg-red-100 text-[#DC2626]";
  return "bg-gray-100 text-gray-500";
}

export default function Profile() {
  const { user, currentIdentity, switchIdentity, logout, unreadMessages } = useApp();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!user) {
    return null;
  }

  const isStaff = currentIdentity === "staff";
  const approvalMeta = getStaffApprovalStatusMeta(user.staffApprovalStatus);
  const latestApplication = user.applicationRecords[0];
  const canSwitchStaff = user.availableIdentities.includes("staff");

  const stats = [
    { label: "综合评分", value: "78", unit: "分" },
    { label: "已完成课程", value: "12", unit: "门" },
    { label: "AI 陪练", value: "7", unit: "次" },
    { label: "获得积分", value: String(user.points), unit: "分" },
  ];

  const staffActionDescription = canSwitchStaff
    ? identityDescriptions.staff
    : user.staffApprovalStatus === "pending"
      ? "申请已提交，审批完成前暂不可切换工作人员视角。"
      : user.staffApprovalStatus === "rejected"
        ? "最近一次申请未通过，补齐条件后可重新发起。"
        : "当前尚未开通工作人员视角，可先查看条件并发起申请。";

  const permissionBoundaryGroups = [
    {
      title: "当前已开通",
      desc: "这些能力现在就能直接进入并执行，不需要再额外申请。",
      badge: `${user.permissions.length} 项可用`,
      tone: "blue",
      items: user.permissions,
    },
    {
      title: "始终保留的学习能力",
      desc: "无论主身份是否变化，这些学习档案和补学能力都会继续保留。",
      badge: "不会消失",
      tone: "green",
      items: retainedLearningAbilities,
    },
    {
      title: canSwitchStaff ? "仍受岗位边界控制" : "审批通过后可追加",
      desc: canSwitchStaff
        ? "切到工作人员视角后，也不是所有深权限都自动放开，仍按岗位和审批节点控制。"
        : "以下属于工作人员深权限，审批通过后才会出现在首页推荐、快捷入口和操作深度里。",
      badge: canSwitchStaff ? "按岗位开放" : "待审批",
      tone: "amber",
      items: ["审批处理", "高风险异常升级", "批量回流发布", "管理介入标记"],
    },
  ];

  const identityFlowSteps = [
    {
      title: "登录先选本次视角",
      desc: "视角决定首页推荐、快捷入口和操作深度，不会把另一类内容从系统里删掉。",
    },
    {
      title: "主身份由审批结果决定",
      desc: `当前主身份是${getIdentityLabel(user.primaryIdentity)}，审批通过后系统会自动更新。`,
    },
    {
      title: "学习记录持续保留",
      desc: "即使主身份变更，课程、考核、成长档案和补训任务也会继续保留。",
    },
    {
      title: "权限变化会同步留痕",
      desc: "消息中心、审批状态页和我的页会同步显示结果，便于回看和追溯。",
    },
  ];

  const statusFeedbackCards = [
    {
      title: "权限状态",
      value: approvalMeta.label,
      desc: approvalMeta.description,
      actionLabel: user.staffApprovalStatus === "approved" ? "查看审批状态" : user.staffApprovalStatus === "pending" ? "查看流转进度" : "去申请 / 重新申请",
      actionPath: user.staffApprovalStatus === "approved" || user.staffApprovalStatus === "pending"
        ? "/profile/approval-status"
        : "/profile/staff-transfer",
      badgeClass: getStatusBadgeClass(user.staffApprovalStatus),
      badgeText: approvalMeta.shortLabel,
    },
    {
      title: "身份变化说明",
      value: `当前视角：${getIdentityLabel(currentIdentity)}`,
      desc: canSwitchStaff
        ? "你可以按任务在学员与工作人员视角间切换，但主身份仍是账号层面的正式归属。"
        : "当前还没有工作人员视角，建议先看申请条件或审批反馈，再决定下一步。",
      actionLabel: canSwitchStaff ? "切到工作人员视角" : "查看转工作人员申请",
      actionPath: canSwitchStaff ? "/" : "/profile/staff-transfer",
      badgeClass: canSwitchStaff ? "bg-brand-soft text-brand" : "bg-state-warning-soft text-state-warning-foreground",
      badgeText: canSwitchStaff ? "可切换" : "待开通",
    },
    {
      title: "状态反馈同步",
      value: `${unreadMessages} 条待查看提醒`,
      desc: "审批结果、权限变化和身份提醒会同步进入消息中心，同时在这里保留历史说明。",
      actionLabel: "去消息中心查看",
      actionPath: "/messages",
      badgeClass: unreadMessages > 0 ? "bg-state-danger-soft text-state-danger" : "bg-gray-100 text-gray-500",
      badgeText: unreadMessages > 0 ? "有新提醒" : "已同步",
    },
  ];

  const visibleStatusFeedbackCards = statusFeedbackCards.filter((card) => {
    if (card.title === "权限状态") {
      return showPermissionStatusCard;
    }

    if (card.title === "身份变化说明") {
      return showIdentityChangeCard;
    }

    if (card.title === "状态反馈同步") {
      return showStatusSyncCard;
    }

    return true;
  });



  const latestFlowNote = latestApplication
    ? latestApplication.status === "approved"
      ? "主身份已变更为工作人员；你仍可继续使用学员视角查看学习中心、历史课程、考核记录和成长数据。"
      : latestApplication.status === "pending"
        ? "申请已进入审批流转，当前仍以学员身份为主；审批完成后系统会自动同步权限结果。"
        : latestApplication.status === "rejected"
          ? "最近一次申请未通过，建议根据驳回意见补齐专项测试、带教记录等材料后重新发起。"
          : "当前还没有发起申请，可先查看条件和需要补齐的能力项。"
    : "当前还没有发起申请，可先查看条件和需要补齐的能力项。";

  const handleStaffAction = () => {
    if (canSwitchStaff) {
      switchIdentity("staff");
      return;
    }

    navigate(user.staffApprovalStatus === "pending" ? "/profile/approval-status" : "/profile/staff-transfer");
  };

  const actionEntries = [
    { icon: <Dumbbell size={16} className="text-purple-500" />, label: "我的陪练记录", path: "/learning/ai-practice" },
    { icon: <BookOpen size={16} className="text-blue-500" />, label: "我的学习记录", path: "/learning" },
    { icon: <TrendingUp size={16} className="text-green-500" />, label: "成长总览", path: "/learning/growth" },
    { icon: <Briefcase size={16} className="text-indigo-500" />, label: "转工作人员申请", path: "/profile/staff-transfer" },
    { icon: <Clock size={16} className="text-amber-500" />, label: "审批状态", path: "/profile/approval-status" },
    { icon: <Settings size={16} className="text-gray-500" />, label: "账号设置", path: "/profile/settings" },
  ];

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className={`${isStaff ? "bg-[#1E2A3A]" : "bg-[#2F5FD0]"} px-4 md:px-6 pt-5 pb-12`}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl font-semibold">
              {user.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-white text-lg">{user.name}</h2>
              <p className="text-white/70 text-sm">{user.role} · {user.department}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  isStaff ? "bg-white text-[#1E2A3A]" : "bg-white/20 text-white"
                }`}>
                  当前视角：{getIdentityLabel(currentIdentity)}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white">
                  主身份：{getIdentityLabel(user.primaryIdentity)}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white">
                  {approvalMeta.shortLabel}
                </span>
                <span className="text-xs text-white/60">Lv.{user.level}</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/messages")}
              className="relative bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-colors"
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-[#DC2626] text-white text-[10px] rounded-full flex items-center justify-center">
                {unreadMessages}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-xl px-2 py-2 text-center">
                <div className="text-lg font-bold text-white">
                  {stat.value}
                  <span className="text-xs font-normal">{stat.unit}</span>
                </div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 -mt-6">
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">身份与权限</span>
            </div>

            {showIdentityPermissionSummary && (
              <div className="grid md:grid-cols-3 gap-2 mb-4">
                <div className="rounded-xl bg-[#F5F7FA] px-3 py-3">
                  <p className="text-xs text-gray-400">当前视角</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{getIdentityLabel(currentIdentity)}</p>
                  <p className="text-xs text-gray-500 mt-1">只影响首页推荐、快捷入口和操作深度</p>
                </div>
                <div className="rounded-xl bg-[#F5F7FA] px-3 py-3">
                  <p className="text-xs text-gray-400">主身份</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{getIdentityLabel(user.primaryIdentity)}</p>
                  <p className="text-xs text-gray-500 mt-1">审批通过后自动变更，学习能力保留</p>
                </div>
                <div className="rounded-xl bg-[#F5F7FA] px-3 py-3">
                  <p className="text-xs text-gray-400">工作人员权限</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{approvalMeta.label}</p>
                  <p className="text-xs text-gray-500 mt-1">最近更新：{user.staffApprovalUpdatedAt}</p>
                </div>
              </div>
            )}


            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => switchIdentity("student")}
                className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 transition-all ${
                  !isStaff ? "border-[#2F5FD0] bg-[#EEF2FF]" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  !isStaff ? "bg-[#2F5FD0]" : "bg-gray-100"
                }`}>
                  <BookOpen size={16} className={!isStaff ? "text-white" : "text-gray-500"} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className={`text-xs font-medium ${!isStaff ? "text-[#2F5FD0]" : "text-gray-700"}`}>学员视角</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{identityDescriptions.student}</p>
                </div>
                {!isStaff && <CheckCircle2 size={14} className="text-[#2F5FD0]" />}
              </button>

              <button
                onClick={handleStaffAction}
                className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 transition-all ${
                  isStaff
                    ? "border-[#1E2A3A] bg-[#F0F2F4]"
                    : canSwitchStaff
                      ? "border-gray-200 hover:border-gray-300"
                      : "border-amber-200 bg-amber-50 hover:bg-amber-100"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isStaff ? "bg-[#1E2A3A]" : canSwitchStaff ? "bg-gray-100" : "bg-amber-100"
                }`}>
                  <Briefcase size={16} className={isStaff ? "text-white" : canSwitchStaff ? "text-gray-500" : "text-[#B45309]"} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-xs font-medium ${isStaff ? "text-[#1E2A3A]" : canSwitchStaff ? "text-gray-700" : "text-[#B45309]"}`}>
                      工作人员视角
                    </p>
                    {!canSwitchStaff && (
                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px] text-[#B45309] border border-amber-200">
                        {approvalMeta.shortLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{staffActionDescription}</p>
                </div>
                {isStaff ? (
                  <CheckCircle2 size={14} className="text-[#1E2A3A]" />
                ) : (
                  <ChevronRight size={14} className={canSwitchStaff ? "text-gray-300" : "text-[#B45309]"} />
                )}
              </button>
            </div>

            {showPermissionBoundarySections && (
              <>
                <div className="mt-4 rounded-xl border border-gray-200 bg-[#F8FAFC] p-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
                    <span className="text-xs font-medium text-gray-900">当前账号可使用能力</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-[#15803D]">
                      {user.permissions.length} 项已开通
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {user.permissions.map((permission) => (
                      <span key={permission} className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid md:grid-cols-3 gap-3">
                  {permissionBoundaryGroups.map((group) => (
                    <div key={group.title} className="rounded-xl border border-gray-200 p-3 bg-white">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <p className="text-sm font-medium text-gray-900">{group.title}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          group.tone === "green"
                            ? "bg-green-100 text-[#15803D]"
                            : group.tone === "amber"
                              ? "bg-amber-100 text-[#B45309]"
                              : "bg-blue-100 text-[#2F5FD0]"
                        }`}>
                          {group.badge}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{group.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {group.items.map((item) => (
                          <span key={item} className="text-xs px-2 py-1 rounded-full bg-[#F8FAFC] border border-gray-200 text-gray-600">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>

          {visibleStatusFeedbackCards.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4">
              {visibleStatusFeedbackCards.map((card) => (
                <ApprovalStatusCard
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  description={card.desc}
                  badgeText={card.badgeText}
                  badgeClassName={card.badgeClass}
                  action={{
                    label: card.actionLabel,
                    onClick: () => {
                      if (card.title === "身份变化说明" && canSwitchStaff) {
                        switchIdentity("staff");
                      }
                      navigate(card.actionPath);
                    },
                  }}
                />
              ))}
            </div>
          )}


          {showLatestApplicationPanel && latestApplication && (
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">最近一次申请</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ml-auto ${getStatusBadgeClass(latestApplication.status)}`}>
                  {getStaffApprovalStatusMeta(latestApplication.status).shortLabel}
                </span>
              </div>

              <div className="rounded-xl border border-gray-200 p-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{latestApplication.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{latestApplication.summary}</p>
                  </div>
                  <div className="text-right text-xs text-gray-400 whitespace-nowrap">
                    <div>提交：{latestApplication.submittedAt}</div>
                    <div className="mt-1">审批：{latestApplication.updatedAt}</div>
                  </div>
                </div>

                <div className="mt-3 grid md:grid-cols-3 gap-2">
                  {[
                    { label: "发起申请", value: latestApplication.submittedAt },
                    { label: "审批人", value: latestApplication.reviewer },
                    { label: "结果", value: getStaffApprovalStatusMeta(latestApplication.status).label },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg bg-[#F5F7FA] px-3 py-2">
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-xs text-gray-700 mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <ReminderStrip
                tone="blue"
                title="身份流转结果"
                description={latestFlowNote}
                icon={<Clock size={14} />}
                className="mt-3"
              />
            </div>
          )}


          {showApplicationHistoryPanel && (
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <History size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">历史申请追溯</span>
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#2F5FD0]">
                  {user.applicationRecords.length} 条记录
                </span>
              </div>
              <div className="space-y-3">
                {user.applicationRecords.map((record, index) => {
                  const recordMeta = getStaffApprovalStatusMeta(record.status);

                  return (
                    <div key={record.id} className="rounded-xl border border-gray-200 p-3">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full ${
                          record.status === "approved"
                            ? "bg-green-100 text-[#15803D]"
                            : record.status === "pending"
                              ? "bg-amber-100 text-[#B45309]"
                              : record.status === "rejected"
                                ? "bg-red-100 text-[#DC2626]"
                                : "bg-gray-100 text-gray-500"
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{record.title}</p>
                              <p className="text-xs text-gray-400 mt-1">提交于 {record.submittedAt}</p>
                            </div>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusBadgeClass(record.status)}`}>
                              {recordMeta.shortLabel}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-2 leading-relaxed">{record.summary}</p>
                          <div className="mt-3 grid md:grid-cols-3 gap-2">
                            {[
                              { label: "提交时间", value: record.submittedAt },
                              { label: "处理时间", value: record.updatedAt },
                              { label: "审批人", value: record.reviewer },
                            ].map((item) => (
                              <div key={item.label} className="rounded-lg bg-[#F5F7FA] px-3 py-2">
                                <p className="text-xs text-gray-400">{item.label}</p>
                                <p className="text-xs text-gray-700 mt-1">{item.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}


          {showIdentityFlowPanel && (
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <ArrowRightLeft size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">身份变化说明</span>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {identityFlowSteps.map((step, index) => (
                  <div key={step.title} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EEF2FF] text-xs font-medium text-[#2F5FD0]">
                        {index + 1}
                      </span>
                      <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showLearningArchivePanel && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Award size={15} className="text-[#F59E0B]" />
                  <span className="text-sm font-medium text-gray-900">学习档案与认证</span>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-gray-50 space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-900 mb-2">学习能力保留范围</p>
                  <div className="flex flex-wrap gap-1.5">
                    {identityActions.student.map((item) => (
                      <span key={item} className="text-xs px-2 py-1 rounded-full bg-blue-50 text-[#2F5FD0]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-[#F8FAFC] px-3 py-3 flex items-start gap-2">
                  <LockKeyhole size={14} className="text-[#2F5FD0] mt-0.5" />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    即使工作人员权限已开通，学习档案、历史考核记录、成长页和补训入口也仍然保留，不会因为主身份变化被清空。
                  </p>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {certifications.map((cert) => (
                  <div key={cert.name} className="px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Award size={16} className="text-[#F59E0B]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{cert.name}</p>
                      <p className="text-xs text-gray-400">{cert.date} · {cert.score} 分</p>
                    </div>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${cert.valid ? "bg-green-100 text-[#16A34A]" : "bg-gray-100 text-gray-500"}`}>
                      {cert.valid ? "有效" : "失效"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showStatusNextStepPanel && (
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">状态反馈与下一步</span>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  {
                    icon: <Clock size={15} className="text-[#2F5FD0]" />,
                    title: "最近权限更新时间",
                    value: user.staffApprovalUpdatedAt,
                    desc: "权限变更后会同步更新到审批状态页与消息中心。",
                  },
                  {
                    icon: <FileClock size={15} className="text-[#2F5FD0]" />,
                    title: "最近申请结果",
                    value: latestApplication ? getStaffApprovalStatusMeta(latestApplication.status).label : "暂无申请",
                    desc: latestApplication ? latestApplication.summary : "当前还没有申请记录，可按条件发起申请。",
                  },
                  {
                    icon: <Shield size={15} className="text-[#2F5FD0]" />,
                    title: "建议下一步",
                    value: user.staffApprovalStatus === "approved" ? "切到工作人员视角处理任务" : user.staffApprovalStatus === "pending" ? "跟进审批进度并留意消息" : "补齐条件后重新发起申请",
                    desc: user.staffApprovalStatus === "approved"
                      ? "当前已经可以回到工作台处理信息同步、协同和审单回流任务。"
                      : user.staffApprovalStatus === "pending"
                        ? "审批完成前仍以学员身份为主，建议先继续完成学习和补训事项。"
                        : "可先去转工作人员申请页查看资格项和待补材料。",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-3">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mt-3">{item.value}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}


          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {actionEntries.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="flex-1 text-left text-sm text-gray-700">{item.label}</span>
                <ChevronRight size={15} className="text-gray-300" />
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full bg-white rounded-xl shadow-sm py-3 text-sm text-[#DC2626] hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={15} /> 退出登录
          </button>

          <div className="h-4" />
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs shadow-xl p-5">
            <h3 className="text-base font-medium text-gray-900 mb-2">确认退出登录？</h3>
            <p className="text-xs text-gray-500 mb-5">退出后需要重新登录才能访问系统</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="flex-1 py-2 bg-[#DC2626] hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
