import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { getRequestById, statusMeta } from "../data/collabData";
import { getReviewPreparationDetailByRequestId } from "../data/reviewPreparationDetailData";

const minuteToneMap = {
  consensus: "border-[#D9E5FF] bg-[#F7FAFF] text-[#2F5FD0]",
  risk: "border-amber-100 bg-amber-50 text-amber-700",
  pending: "border-red-100 bg-red-50 text-red-700",
} as const;

const minuteLabelMap = {
  consensus: "已对齐",
  risk: "需提醒",
  pending: "待补纪要",
} as const;

const decisionToneMap = {
  confirmed: "border-[#D9E5FF] bg-[#F7FAFF] text-[#2F5FD0]",
  pending: "border-amber-100 bg-amber-50 text-amber-700",
  done: "border-green-100 bg-green-50 text-green-700",
} as const;

const decisionLabelMap = {
  confirmed: "已确认",
  pending: "待收口",
  done: "已落地",
} as const;

const followupToneMap = {
  today: "border-amber-100 bg-amber-50 text-amber-700",
  scheduled: "border-[#D9E5FF] bg-[#F7FAFF] text-[#2F5FD0]",
  done: "border-green-100 bg-green-50 text-green-700",
} as const;

const followupLabelMap = {
  today: "今天处理",
  scheduled: "已排期",
  done: "已完成",
} as const;

export default function ReviewPreparation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const request = useMemo(() => getRequestById(id), [id]);
  const detail = useMemo(() => getReviewPreparationDetailByRequestId(request.id), [request.id]);
  const pendingFollowups = detail.followUps.filter((item) => item.status !== "done").length;

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/workbench/collab")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回销设协同
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusMeta[request.status].tone}`}>
                  {statusMeta[request.status].label}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={11} /> {request.reviewPrep.meetingTime}
                </span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">{request.title} · 会审准备</h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                把参与角色、会审资料、风险提示和检查清单单独承接出来，并继续把会审纪要、决议和跟进动作留在同一页，避免会后断链。
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/workbench/collab/request/${request.id}`)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                返回需求交接页
              </button>
              <button
                onClick={() => navigate(`/workbench/collab/score/${request.id}`)}
                className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
              >
                去评分反馈页
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "准备度", value: `${request.reviewPrep.readiness}%` },
              { label: "参与角色", value: `${request.reviewPrep.attendees.length} 人` },
              { label: "待备资料", value: `${request.reviewPrep.materials.length} 项` },
              { label: "风险点", value: `${request.reviewPrep.risks.length} 条` },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/5 px-3 py-3">
                <p className="text-xs text-white/50 mb-1">{item.label}</p>
                <p className="text-sm text-white leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">会审信息</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-[#2F5FD0] rounded-full" style={{ width: `${request.reviewPrep.readiness}%` }} />
              </div>
              <div className="rounded-xl bg-[#F5F7FA] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                <p>会审时间：{request.reviewPrep.meetingTime}</p>
                <p className="mt-1">参与角色：{request.reviewPrep.attendees.join("、")}</p>
                <p className="mt-1">预算：{request.budget} · 空间：{request.space}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">待备资料</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {request.reviewPrep.materials.map((item) => (
                  <span key={item} className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-[#16A34A]" />
                <span className="text-sm font-medium text-gray-900">会审检查清单</span>
              </div>
              <div className="space-y-2">
                {request.reviewPrep.checklist.map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    <CheckCircle2 size={13} className="text-[#16A34A] flex-shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">会审纪要</span>
              </div>
              <div className="rounded-xl border border-[#D9E5FF] bg-[#F7FAFF] px-3 py-3 text-xs text-[#2F5FD0] leading-relaxed mb-3">
                {detail.minutesSummary}
              </div>
              <div className="space-y-3">
                {detail.minutes.map((item) => (
                  <div key={item.id} className={`rounded-xl border px-3 py-3 ${minuteToneMap[item.status]}`}>
                    <div className="flex items-center justify-between gap-3 flex-wrap text-xs font-medium mb-2">
                      <span>{item.title}</span>
                      <span>{minuteLabelMap[item.status]}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{item.note}</p>
                    <div className="mt-2 grid sm:grid-cols-2 gap-2 text-[11px] opacity-90">
                      <div className="rounded-lg bg-white/70 px-3 py-2">记录人：{item.actor}</div>
                      <div className="rounded-lg bg-white/70 px-3 py-2">时间：{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">会审决议</span>
              </div>
              <div className="space-y-3">
                {detail.decisions.map((item) => (
                  <div key={item.id} className={`rounded-xl border px-3 py-3 ${decisionToneMap[item.status]}`}>
                    <div className="flex items-center justify-between gap-3 flex-wrap text-xs font-medium mb-2">
                      <span>{item.title}</span>
                      <span>{decisionLabelMap[item.status]}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{item.decision}</p>
                    <div className="mt-2 grid sm:grid-cols-2 gap-2 text-[11px] opacity-90">
                      <div className="rounded-lg bg-white/70 px-3 py-2">责任人：{item.owner}</div>
                      <div className="rounded-lg bg-white/70 px-3 py-2">下一节点：{item.nextNode}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">会审风险提示</span>
              </div>
              <div className="space-y-2">
                {request.reviewPrep.risks.map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-700 leading-relaxed">
                    <AlertTriangle size={13} className="flex-shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">交接重点回看</span>
              </div>
              <div className="space-y-2">
                {request.overviewFocus.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-[#16A34A]" />
                <span className="text-sm font-medium text-gray-900">跟进动作</span>
              </div>
              <div className="space-y-3">
                {detail.followUps.map((item) => (
                  <div key={item.id} className={`rounded-xl border px-3 py-3 ${followupToneMap[item.status]}`}>
                    <div className="flex items-center justify-between gap-3 flex-wrap text-xs font-medium mb-2">
                      <span>{item.title}</span>
                      <span>{followupLabelMap[item.status]}</span>
                    </div>
                    <div className="grid gap-2 text-[11px] opacity-90 mb-2">
                      <div className="rounded-lg bg-white/70 px-3 py-2">责任人：{item.owner}</div>
                      <div className="rounded-lg bg-white/70 px-3 py-2">截止时间：{item.deadline}</div>
                    </div>
                    <p className="text-xs leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                闭环判断：{detail.closureRule}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-xs font-medium text-[#2F5FD0] mb-1">当前闭环状态</p>
              <p className="text-sm text-blue-700">待继续跟进 {pendingFollowups} 项</p>
              <p className="text-xs text-blue-700 mt-2 leading-relaxed">
                建议按“会审纪要 → 评分反馈 → 讲稿优化 / 案例沉淀”的顺序继续推进，避免准备完就断在会后。
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">下游承接</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => navigate(`/workbench/collab/score/${request.id}`)}
                  className="w-full py-2.5 rounded-xl bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
                >
                  去讲解评分反馈页
                </button>
                <button
                  onClick={() => navigate("/workbench/collab/records")}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  去会审记录页看留痕
                </button>
                <button
                  onClick={() => navigate(`/workbench/collab/request/${request.id}`)}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  返回客户需求交接页
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
              <div className="flex items-center gap-2 text-[#2F5FD0] mb-1">
                <Users size={14} />
                <span className="text-sm font-medium">本页已补齐会审准备后续闭环</span>
              </div>
              <p className="text-xs text-blue-700 leading-relaxed">
                现在已经能在这张页里直接看到会审纪要、决议留痕和跟进动作，不需要再只靠口头同步或跳出去拼信息。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
