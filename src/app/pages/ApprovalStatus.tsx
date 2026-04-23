import { useNavigate } from "react-router";
import { ArrowLeft, BookOpen, Briefcase, CheckCircle2, ChevronRight, Clock } from "lucide-react";
import { ApprovalStatusCard } from "../components/BusinessBlocks";
import { GlobalStateCard, type GlobalStateTone } from "../components/GlobalStateCard";

import { getIdentityLabel, getStaffApprovalStatusMeta, useApp } from "../context/AppContext";
import { appActionClass, getApprovalStatusToneClass } from "../lib/visualTokens";


export default function ApprovalStatus() {
  const navigate = useNavigate();
  const { user, switchIdentity } = useApp();

  if (!user) {
    return null;
  }

  const latestApplication = user.applicationRecords[0];
  const approvalMeta = getStaffApprovalStatusMeta(user.staffApprovalStatus);
  const approved = user.staffApprovalStatus === "approved";
  const stateTone: GlobalStateTone = approved
    ? "success"
    : user.staffApprovalStatus === "rejected"
      ? "exception"
      : latestApplication
        ? "pending"
        : "empty";

  const stateTitle = approved
    ? "审批已完成，主身份已变更"
    : user.staffApprovalStatus === "rejected"
      ? "申请未通过，需补齐后重新提交"
      : latestApplication
        ? "申请正在流转中"
        : "当前还未发起申请";

  const stateDescription = approved
    ? "工作人员权限已开通，同时继续保留学习中心、历史课程、考核记录和成长档案。"
    : user.staffApprovalStatus === "rejected"
      ? "最近一次申请未通过，建议先根据驳回意见补齐必修项、专项测试或带教记录后再提交。"
      : latestApplication
        ? `当前主身份：${getIdentityLabel(user.primaryIdentity)}；审批完成前仍以学员身份为主，但消息中心和我的页会同步展示进度。`
        : "当前还没有申请记录，可先查看转岗条件与需要补齐的能力项，再决定是否发起申请。";

  const primaryAction = approved
    ? {
        label: "切到工作人员视角",
        onClick: () => {
          switchIdentity("staff");
          navigate("/");
        },
      }
    : user.staffApprovalStatus === "rejected" || user.staffApprovalStatus === "not_applied"
      ? {
          label: "去申请 / 重新申请",
          onClick: () => navigate("/profile/staff-transfer"),
        }
      : {
          label: "去消息中心看提醒",
          onClick: () => navigate("/messages"),
        };

  const secondaryAction = approved
    ? {
        label: "查看成长与补训记录",
        onClick: () => navigate("/learning/growth"),
      }
    : {
        label: "去账号设置页",
        onClick: () => navigate("/profile/settings"),
      };

  const timeline = [
    {
      title: "达成转岗资格",
      time: latestApplication?.submittedAt ?? "-",
      desc: "完成必修课、考核与陪练要求，满足身份升级前置条件。",
      done: true,
    },
    {
      title: "发起转工作人员申请",
      time: latestApplication?.submittedAt ?? "-",
      desc: "申请在统一账号体系内发起，不会丢失历史学习记录。",
      done: Boolean(latestApplication),
    },
    {
      title: "培训负责人审批",
      time: latestApplication?.updatedAt ?? "待审批",
      desc: latestApplication ? `审批人：${latestApplication.reviewer}` : "等待审批人处理。",
      done: approved,
    },
    {
      title: "主身份变更并保留学习能力",
      time: approved ? user.staffApprovalUpdatedAt : "待生效",
      desc: approved
        ? "工作人员权限已开通，同时继续保留学习中心、考核记录与成长档案。"
        : "审批完成后将自动切换主身份，但不影响学习能力。",
      done: approved,
    },
  ];

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
          <h1 className="text-gray-900">审批状态</h1>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            把申请、审批和身份生效过程集中承接，避免只在零散信息块里展示结果。
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 space-y-4">
        <GlobalStateCard
          tone={stateTone}
          badge={approvalMeta.shortLabel}
          caption={`当前主身份：${getIdentityLabel(user.primaryIdentity)}`}
          title={stateTitle}
          description={stateDescription}
          helperText={approvalMeta.description}
          action={primaryAction}
          secondaryAction={secondaryAction}
          meta={[
            { label: "最近处理时间", value: user.staffApprovalUpdatedAt },
            { label: "当前使用视角", value: getIdentityLabel(user.identity) },
            { label: "账号结果", value: approvalMeta.label },
          ]}
        />

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">审批时间线</span>
            </div>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="flex flex-col items-center pt-0.5">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full ${item.done ? "bg-[#16A34A]" : "bg-gray-200"}`}>
                      {item.done ? <CheckCircle2 size={14} className="text-white" /> : <span className="text-xs text-gray-500">{index + 1}</span>}
                    </div>
                    {index < timeline.length - 1 && <div className="mt-1 h-12 w-px bg-gray-200" />}
                  </div>
                  <div className="flex-1 rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-3">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <span className="text-xs text-gray-400">{item.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {latestApplication && (
              <ApprovalStatusCard
                title="申请摘要"
                value={latestApplication.title}
                description={latestApplication.summary}
                badgeText={approvalMeta.shortLabel}
                badgeClassName={approved ? "bg-green-100 text-[#15803D]" : user.staffApprovalStatus === "rejected" ? "bg-red-100 text-[#DC2626]" : "bg-amber-100 text-[#B45309]"}
                meta={[
                  { label: "提交时间", value: latestApplication.submittedAt },
                  { label: "审批时间", value: latestApplication.updatedAt },
                  { label: "审批人", value: latestApplication.reviewer },
                ]}
              />
            )}


            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">学习能力保留说明</span>
              </div>
              <div className="space-y-2">
                {[
                  "学习中心继续可用",
                  "历史课程与考核记录继续保留",
                  "成长总览与补训动作不会丢失",
                  "只是在首页推荐和权限深度上切到工作人员主身份",
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#F8FAFC] px-3 py-2.5 text-sm text-gray-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <button
            onClick={primaryAction.onClick}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#2F5FD0] px-4 py-2.5 text-sm text-white hover:bg-[#2550B8] transition-colors"
          >
            {primaryAction.label} <ChevronRight size={15} />
          </button>
          <button
            onClick={() => navigate("/learning/growth")}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            查看成长与补训记录
          </button>
          <button
            onClick={() => navigate("/profile/settings")}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            去账号设置页
          </button>
        </div>
      </div>
    </div>
  );
}
