import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock,
  Shield,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { getIdentityLabel, getStaffApprovalStatusMeta, useApp } from "../context/AppContext";

const qualificationItems = [
  { label: "完成所有必修课", note: "新品参数、工艺规范、销售话术主路径已完成", done: true },
  { label: "月度考核通过率达标", note: "最近 3 次考核通过率保持在 80% 以上", done: true },
  { label: "AI 陪练达到要求", note: "本月已完成 7 次，训练记录持续沉淀", done: true },
  { label: "专项测试通过", note: "关键规范类专项测试已通过，可进入更深权限", done: true },
  { label: "申请资料已提交", note: "转工作人员申请已经提交并审批完成", done: true },
];

const retainedAbilities = ["学习中心", "AI 问答", "AI 陪练", "考核记录", "成长档案", "补训提醒"];

export default function StaffTransfer() {
  const navigate = useNavigate();
  const { user } = useApp();

  if (!user) {
    return null;
  }

  const approvalMeta = getStaffApprovalStatusMeta(user.staffApprovalStatus);
  const latestApplication = user.applicationRecords[0];
  const completedCount = qualificationItems.filter((item) => item.done).length;
  const progress = Math.round((completedCount / qualificationItems.length) * 100);
  const approved = user.staffApprovalStatus === "approved";

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={15} /> 返回“我的”
          </button>
          <h1 className="text-gray-900">转工作人员申请</h1>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            在同一套账号体系下完成身份升级；主身份变更后，学习能力、考核记录和成长数据继续保留。
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 space-y-4">
        <div className={`rounded-2xl px-4 py-4 ${approved ? "bg-[#1E2A3A] text-white" : "bg-white border border-gray-200"}`}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
                <Shield size={12} /> {approvalMeta.label}
              </div>
              <h2 className={`text-lg font-medium mt-3 ${approved ? "text-white" : "text-gray-900"}`}>
                {approved ? "当前账号已完成身份流转" : "当前账号已满足大部分转岗条件"}
              </h2>
              <p className={`text-sm mt-1 leading-relaxed ${approved ? "text-white/75" : "text-gray-500"}`}>
                主身份：{getIdentityLabel(user.primaryIdentity)}；当前仍可自由切换学员视角处理学习与成长事项。
              </p>
            </div>
            <div className={`rounded-2xl px-4 py-3 ${approved ? "bg-white/10" : "bg-[#F5F7FA]"}`}>
              <p className={`text-xs ${approved ? "text-white/60" : "text-gray-400"}`}>资格进度</p>
              <p className={`text-3xl font-bold mt-1 ${approved ? "text-white" : "text-gray-900"}`}>{progress}%</p>
              <p className={`text-sm mt-1 ${approved ? "text-white/70" : "text-gray-500"}`}>{completedCount}/{qualificationItems.length} 项已达成</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">申请资格检查</span>
            </div>
            <div className="space-y-3">
              {qualificationItems.map((item) => (
                <div key={item.label} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <CheckCircle2 size={16} className="text-[#16A34A]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-[#15803D]">已达成</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">升级后仍保留</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {retainedAbilities.map((item) => (
                  <span key={item} className="rounded-full border border-gray-200 bg-[#F8FAFC] px-2.5 py-1 text-xs text-gray-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {latestApplication && (
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={15} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">最近一次申请</span>
                </div>
                <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                  <p className="text-sm font-medium text-gray-900">{latestApplication.title}</p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{latestApplication.summary}</p>
                  <div className="mt-3 space-y-1 text-xs text-gray-500">
                    <p>提交时间：{latestApplication.submittedAt}</p>
                    <p>审批人：{latestApplication.reviewer}</p>
                    <p>完成时间：{latestApplication.updatedAt}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase size={15} className="text-[#2F5FD0]" />
            <span className="text-sm font-medium text-gray-900">当前阶段说明</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            这一阶段已经把“学员达成条件 → 发起转工作人员申请 → 审批结果 → 主身份变更且学习能力保留”补成了正式承接链路，
            不需要再回到散落的信息点里找入口。
          </p>
          <div className="grid md:grid-cols-2 gap-2 mt-3">
            <button
              onClick={() => navigate("/profile/approval-status")}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#2F5FD0] px-4 py-2.5 text-sm text-white hover:bg-[#2550B8] transition-colors"
            >
              查看审批状态 <ChevronRight size={15} />
            </button>
            <button
              onClick={() => navigate("/learning/growth")}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              回成长页看资格进度
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
