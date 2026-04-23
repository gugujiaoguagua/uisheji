import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowLeftRight,
  CheckCircle2,
  Clock,
  FileText,
  Target,
  Users,
} from "lucide-react";
import { getRequestById, statusMeta } from "../data/collabData";

export default function RequestHandoff() {
  const navigate = useNavigate();
  const { id } = useParams();
  const request = useMemo(() => getRequestById(id), [id]);
  const currentStepIndex = request.steps.findIndex((step) => !step.done);
  const currentBlock = currentStepIndex >= 0 ? request.steps[currentStepIndex].step : "已完成沉淀";

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
                  <Clock size={11} /> {request.submittedAt}
                </span>
                <span className="text-xs text-gray-400">截止：{request.deadline}</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">{request.title} · 客户需求交接</h1>
              <p className="text-sm text-gray-500 leading-relaxed">把销售侧需求、设计侧理解和后续会审承接拆清楚，避免交接后仍然出现客户重点和讲解顺序不一致。</p>
            </div>
            <button
              onClick={() => navigate(`/workbench/collab/review/${request.id}`)}
              className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
            >
              查看会审准备页
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "客户", value: `${request.customer}（${request.company}）` },
              { label: "预算", value: request.budget },
              { label: "空间", value: request.space },
              { label: "当前卡点", value: currentBlock },
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
                <FileText size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">交接基础信息</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { k: "客户", v: `${request.customer}（${request.company}）` },
                  { k: "对接销售", v: request.salesperson },
                  { k: "对接设计师", v: request.designer },
                  { k: "空间", v: request.space },
                  { k: "风格偏好", v: request.style },
                  { k: "功能需求", v: request.requirements },
                ].map((item) => (
                  <div key={item.k} className="rounded-xl bg-[#F8FAFC] px-3 py-3">
                    <div className="text-gray-400">{item.k}</div>
                    <div className="text-gray-700 mt-1 leading-relaxed">{item.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <ArrowLeftRight size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">协同闭环进度</span>
              </div>
              <div className="space-y-2">
                {request.steps.map((step, index) => (
                  <div key={step.step} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.done ? "bg-[#16A34A]" : index === currentStepIndex ? "bg-[#2F5FD0]" : "bg-gray-200"
                      }`}
                    >
                      {step.done ? <CheckCircle2 size={11} className="text-white" /> : <span className="text-[10px] text-white font-bold">{index + 1}</span>}
                    </div>
                    <span className={`text-xs ${step.done ? "text-gray-400 line-through" : "text-gray-700"}`}>{step.step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">交接重点</span>
              </div>
              <div className="space-y-2">
                {request.overviewFocus.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">当前收口提醒</span>
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-700 leading-relaxed">
                这类交接页的目标不是把信息填完就结束，而是确保销售重点、设计方案和后续会审口径一致，尤其避免预算和价值讲解顺序错位。
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">会审承接预览</span>
              </div>
              <div className="rounded-xl bg-[#F5F7FA] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                <p>会审时间：{request.reviewPrep.meetingTime}</p>
                <p className="mt-1">参与角色：{request.reviewPrep.attendees.join("、")}</p>
                <p className="mt-1">准备度：{request.reviewPrep.readiness}%</p>
              </div>
              <button
                onClick={() => navigate(`/workbench/collab/review/${request.id}`)}
                className="w-full mt-3 py-2.5 rounded-xl border border-[#2F5FD0] text-[#2F5FD0] hover:bg-blue-50 text-sm transition-colors"
              >
                进入会审准备页
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">已带上的关键资料</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {request.reviewPrep.materials.map((item) => (
                  <span key={item} className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
