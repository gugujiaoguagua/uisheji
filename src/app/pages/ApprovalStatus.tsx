import { useNavigate } from "react-router";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import { GlobalStateCard, type GlobalStateTone } from "../components/GlobalStateCard";

import { getIdentityLabel, getStaffApprovalStatusMeta, useApp } from "../context/AppContext";


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

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={15} className="text-[#2F5FD0]" />
            <span className="text-sm font-medium text-gray-900">学习能力保留说明</span>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
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
