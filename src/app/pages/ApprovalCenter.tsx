import { useNavigate } from "react-router";
import {
  ArrowLeft,
  BellRing,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileClock,
  Shield,
  Sparkles,
} from "lucide-react";
import { getStaffApprovalStatusMeta, useApp } from "../context/AppContext";

const pendingApprovals = [
  {
    id: "approval-1",
    tag: "转岗申请",
    applicant: "王芳",
    title: "转工作人员申请待初审",
    desc: "学习条件已达成，需确认最近一次考核与陪练记录是否满足审批标准。",
    submittedAt: "今天 09:10",
    priority: "高优先",
    path: "/profile/approval-status",
    action: "去审批",
  },
  {
    id: "approval-2",
    tag: "权限开通",
    applicant: "陈涛",
    title: "工作人员视角补开申请待确认",
    desc: "审批已通过，但尚未完成身份生效提醒，需要统一通知并确认已切换使用。",
    submittedAt: "今天 08:25",
    priority: "今日处理",
    path: "/profile/approval-status",
    action: "查看状态",
  },
];

const followUpTasks = [
  {
    title: "张晓琳转岗审批结果需要同步到消息中心",
    desc: "避免申请人只在“我的”里看到结果，需统一走审批消息通知链路。",
    time: "今天 10:20",
    path: "/messages",
    action: "查看通知",
  },
  {
    title: "审批通过后仍需提醒切换工作人员视角",
    desc: "身份已生效，但首页推荐与待办承接仍依赖用户主动切换当前使用视角。",
    time: "今天 11:40",
    path: "/profile/approval-status",
    action: "去处理",
  },
];

const approvalDynamics = [
  {
    title: "王芳提交转工作人员申请",
    time: "今天 09:10",
    desc: "系统已自动带出课程完成率、考核通过率与 AI 陪练次数。",
    status: "待初审",
  },
  {
    title: "陈涛权限补开进入身份生效提醒",
    time: "今天 08:25",
    desc: "审批已通过，当前待确认是否已切换到工作人员视角开始处理任务。",
    status: "待通知",
  },
  {
    title: "张晓琳身份升级已完成",
    time: "昨天 18:20",
    desc: "主身份已切换为工作人员，学习档案、考核记录和成长数据全部保留。",
    status: "已完成",
  },
];

const handlingRules = [
  "先看是否满足课程、考核、陪练等前置条件，再进入审批动作。",
  "审批结果需要同步到消息中心，避免只停留在个人资料页。",
  "审批通过后还要跟进身份生效提醒，确保人员真正进入工作人员承接链路。",
  "如涉及知识口径、培训条件变更，继续回流到信息同步与培训运营。",
];

export default function ApprovalCenter() {
  const navigate = useNavigate();
  const { user, switchIdentity } = useApp();

  if (!user) {
    return null;
  }

  const approvalMeta = getStaffApprovalStatusMeta(user.staffApprovalStatus);
  const completedToday = approvalDynamics.filter((item) => item.status === "已完成").length;

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-[#1E2A3A] px-4 md:px-6 pt-4 pb-10">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/workbench")}
            className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-3"
          >
            <ArrowLeft size={15} /> 返回工作台
          </button>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                <Shield size={12} /> 工作台统一入口
              </div>
              <h1 className="text-white mt-3">审批·申请中心</h1>
              <p className="text-white/65 text-sm mt-1 leading-relaxed max-w-2xl">
                把“申请发起、审批流转、身份生效提醒、结果通知”集中承接，避免只散落在“我的”里查看。
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-4 py-3 min-w-[220px]">
              <p className="text-xs text-white/60">当前账号工作人员权限</p>
              <p className="text-lg font-medium text-white mt-1">{approvalMeta.label}</p>
              <p className="text-xs text-white/65 mt-1 leading-relaxed">{approvalMeta.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            {[
              { label: "待我审批", value: `${pendingApprovals.length}`, color: "text-red-300", bg: "bg-red-500/20 border border-red-400/30" },
              { label: "待跟进", value: `${followUpTasks.length}`, color: "text-amber-300", bg: "bg-amber-500/20 border border-amber-400/30" },
              { label: "今日完成", value: `${completedToday}`, color: "text-green-300", bg: "bg-green-500/20 border border-green-400/30" },
              { label: "审批消息", value: "2", color: "text-blue-300", bg: "bg-blue-500/20 border border-blue-400/30" },
            ].map((item) => (
              <div key={item.label} className={`rounded-lg px-3 py-2 ${item.bg}`}>
                <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
                <div className="text-white/55 text-xs">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-5 pb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <FileClock size={15} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">待我处理</span>
              </div>
              <div className="divide-y divide-gray-50">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="px-4 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center flex-shrink-0">
                        <Shield size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs px-1.5 py-0.5 rounded bg-[#1E2A3A] text-white">{item.tag}</span>
                          <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-[#DC2626]">{item.priority}</span>
                          <span className="text-xs text-gray-400">申请人：{item.applicant}</span>
                        </div>
                        <p className="text-sm text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                        <p className="text-xs text-gray-400 mt-2">提交时间：{item.submittedAt}</p>
                      </div>
                      <button
                        onClick={() => navigate(item.path)}
                        className="flex items-center gap-1 rounded-xl bg-[#2F5FD0] px-3 py-2 text-xs text-white hover:bg-[#2550B8] transition-colors"
                      >
                        {item.action} <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <BellRing size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">待跟进提醒</span>
              </div>
              <div className="divide-y divide-gray-50">
                {followUpTasks.map((task) => (
                  <div key={task.title} className="px-4 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center flex-shrink-0">
                        <CircleAlert size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{task.title}</p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{task.desc}</p>
                        <p className="text-xs text-gray-400 mt-2">{task.time}</p>
                      </div>
                      <button
                        onClick={() => navigate(task.path)}
                        className="rounded-xl border border-gray-200 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        {task.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock3 size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">最近审批动态</span>
              </div>
              <div className="space-y-3">
                {approvalDynamics.map((item, index) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex flex-col items-center pt-0.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.status === "已完成" ? "bg-green-500" : "bg-[#2F5FD0]"}`}>
                        {item.status === "已完成" ? (
                          <CheckCircle2 size={13} className="text-white" />
                        ) : (
                          <span className="text-[10px] text-white">{index + 1}</span>
                        )}
                      </div>
                      {index < approvalDynamics.length - 1 && <div className="mt-1 h-10 w-px bg-gray-200" />}
                    </div>
                    <div className="flex-1 rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-3">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <span className="text-xs text-gray-400">{item.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                      <span className={`inline-flex mt-2 rounded-full px-2 py-0.5 text-xs ${item.status === "已完成" ? "bg-green-100 text-[#15803D]" : "bg-blue-100 text-[#2F5FD0]"}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">快捷入口</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: "查看转工作人员申请", path: "/profile/staff-transfer", icon: <Briefcase size={15} className="text-[#2F5FD0]" /> },
                  { label: "查看审批状态页", path: "/profile/approval-status", icon: <Shield size={15} className="text-[#2F5FD0]" /> },
                  { label: "查看审批消息", path: "/messages", icon: <BellRing size={15} className="text-[#2F5FD0]" /> },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">{item.icon}</div>
                    <span className="flex-1 text-sm text-gray-700">{item.label}</span>
                    <ChevronRight size={15} className="text-gray-300" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-[#16A34A]" />
                <span className="text-sm font-medium text-gray-900">处理原则</span>
              </div>
              <div className="space-y-2">
                {handlingRules.map((rule) => (
                  <div key={rule} className="rounded-xl border border-gray-200 bg-[#F8FAFC] px-3 py-2.5 text-sm text-gray-600 leading-relaxed">
                    {rule}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase size={15} className="text-[#1E2A3A]" />
                <span className="text-sm font-medium text-gray-900">身份已生效后</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                审批通过并不等于任务已经承接完成，仍需要把首页与工作台入口切到工作人员视角，才能进入真实待办闭环。
              </p>
              <button
                onClick={() => {
                  switchIdentity("staff");
                  navigate("/");
                }}
                className="w-full mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#1E2A3A] px-4 py-2.5 text-sm text-white hover:bg-[#162030] transition-colors"
              >
                切到工作人员视角 <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
