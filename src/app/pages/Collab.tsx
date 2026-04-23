import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  Clock,
  Copy,
  FileText,
  MessageSquareText,
  Plus,
  Send,
  Sparkles,
  Star,
  Target,
  Users,
  X,
} from "lucide-react";
import { requests, statusMeta } from "../data/collabData";

type DetailTab = "overview" | "review" | "score" | "script" | "case";

const detailTabs: { key: DetailTab; label: string }[] = [
  { key: "overview", label: "总览" },
  { key: "review", label: "会审准备" },
  { key: "score", label: "讲解评分" },
  { key: "script", label: "AI 讲稿" },
  { key: "case", label: "案例沉淀" },
];

export default function Collab() {
  const navigate = useNavigate();
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(requests[0].id);
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");

  const selectedRequest = requests.find((item) => item.id === selectedRequestId) ?? requests[0];
  const currentStepIndex = selectedRequest.steps.findIndex((step) => !step.done);
  const currentBlock = currentStepIndex >= 0 ? selectedRequest.steps[currentStepIndex].step : "已完成沉淀";

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-gray-900">销售 · 设计协同</h1>
              <p className="text-xs text-gray-500 mt-0.5">不只停在需求交接，而是继续拆成会审准备、讲解评分、AI 讲稿和案例沉淀。</p>
            </div>
            <button
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-1.5 bg-[#2F5FD0] hover:bg-[#2550B8] text-white px-3 py-1.5 rounded-lg text-xs transition-colors"
            >
              <Plus size={13} /> 新建需求交接
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "待会审项目", value: "1", tone: "text-[#F59E0B]", bg: "bg-amber-50 border border-amber-100" },
            { label: "待优化讲稿", value: "1", tone: "text-[#2F5FD0]", bg: "bg-blue-50 border border-blue-100" },
            { label: "已沉淀案例", value: "1", tone: "text-[#16A34A]", bg: "bg-green-50 border border-green-100" },
          ].map((item) => (
            <div key={item.label} className={`rounded-xl px-4 py-3 ${item.bg}`}>
              <div className={`text-2xl font-bold ${item.tone}`}>{item.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          <div className="md:col-span-2 space-y-3">
            {requests.map((req) => {
              const meta = statusMeta[req.status];
              return (
                <button
                  key={req.id}
                  onClick={() => setSelectedRequestId(req.id)}
                  className={`w-full text-left bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all ${
                    selectedRequest.id === req.id ? "ring-2 ring-[#2F5FD0]" : ""
                  }`}
                  style={{ borderLeft: `3px solid ${req.urgency === "warning" ? "#F59E0B" : "#16A34A"}` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                        {req.urgency === "warning" && (
                          <span className="text-xs px-1 py-0.5 bg-amber-100 text-amber-700 rounded">本日推进</span>
                        )}
                        <span className={`text-xs px-1 py-0.5 rounded ${meta.tone}`}>{meta.label}</span>
                      </div>
                      <p className="text-sm text-gray-800 line-clamp-1">{req.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">销售：{req.salesperson} · 设计：{req.designer}</p>
                      <p className="text-xs text-gray-400 mt-1">{req.deadline}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-gray-400">当前卡点</div>
                      <div className="text-xs font-medium text-[#2F5FD0] mt-1">
                        {req.steps.find((step) => !step.done)?.step ?? "已沉淀"}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="md:col-span-3 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusMeta[selectedRequest.status].tone}`}>
                      {statusMeta[selectedRequest.status].label}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={11} /> {selectedRequest.submittedAt}
                    </span>
                  </div>
                  <h2 className="text-base font-medium text-gray-900">{selectedRequest.title}</h2>
                  <p className="text-xs text-gray-500 mt-1">客户：{selectedRequest.customer} · 预算：{selectedRequest.budget} · 截止：{selectedRequest.deadline}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => navigate(`/workbench/collab/request/${selectedRequest.id}`)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    需求交接页
                  </button>
                  <button
                    onClick={() => navigate(`/workbench/collab/review/${selectedRequest.id}`)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    会审准备页
                  </button>
                  <button
                    onClick={() => navigate(`/workbench/collab/score/${selectedRequest.id}`)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    评分反馈页
                  </button>
                  <button
                    onClick={() => navigate("/workbench/collab/records")}
                    className="px-3 py-1.5 rounded-lg border border-[#D9E5FF] text-xs text-[#2F5FD0] hover:bg-[#F7FAFF] transition-colors"
                  >
                    会审记录页
                  </button>
                  <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-right">
                    <div className="text-xs text-amber-700">当前卡点</div>
                    <div className="text-sm font-medium text-[#B45309] mt-1">{currentBlock}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 bg-[#F5F7FA] rounded-xl p-1 mt-4 overflow-x-auto hide-scrollbar">
                {detailTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 min-w-[88px] py-2 rounded-lg text-xs transition-colors ${
                      activeTab === tab.key ? "bg-[#2F5FD0] text-white" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "overview" && (
              <>
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {[
                      { k: "客户", v: `${selectedRequest.customer}（${selectedRequest.company}）` },
                      { k: "对接销售", v: selectedRequest.salesperson },
                      { k: "对接设计师", v: selectedRequest.designer },
                      { k: "空间", v: selectedRequest.space },
                      { k: "风格偏好", v: selectedRequest.style },
                      { k: "功能需求", v: selectedRequest.requirements },
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
                    {selectedRequest.steps.map((step, index) => (
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Target size={15} className="text-[#2F5FD0]" />
                      <span className="text-sm font-medium text-gray-900">本单重点</span>
                    </div>
                    <div className="space-y-2">
                      {selectedRequest.overviewFocus.map((item) => (
                        <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle size={15} className="text-[#F59E0B]" />
                      <span className="text-sm font-medium text-gray-900">当前收口提醒</span>
                    </div>
                    <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-700 leading-relaxed">
                      当前已经完成前置交接和会审准备，后半段还需要把“客户讲解评分 → AI 优化讲稿 → 案例沉淀”继续接上，才不会再次出现销售与设计讲法不一致。
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "review" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">会审准备</span>
                    <span className="text-xs ml-auto px-2 py-0.5 rounded-full bg-blue-50 text-[#2F5FD0]">
                      准备度 {selectedRequest.reviewPrep.readiness}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-[#2F5FD0] rounded-full" style={{ width: `${selectedRequest.reviewPrep.readiness}%` }} />
                  </div>
                  <div className="rounded-xl bg-[#F5F7FA] px-3 py-3 text-xs text-gray-600">
                    <p>会审时间：{selectedRequest.reviewPrep.meetingTime}</p>
                    <p className="mt-1">参与角色：{selectedRequest.reviewPrep.attendees.join("、")}</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">待备资料</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRequest.reviewPrep.materials.map((item) => (
                        <span key={item} className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/workbench/collab/review/${selectedRequest.id}`)}
                    className="w-full mt-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    进入会审准备独立页
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <p className="text-sm font-medium text-gray-900 mb-3">会审检查清单</p>
                    <div className="space-y-2">
                      {selectedRequest.reviewPrep.checklist.map((item) => (
                        <div key={item} className="flex items-start gap-2 rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                          <CheckCircle2 size={13} className="text-[#16A34A] flex-shrink-0 mt-0.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <p className="text-sm font-medium text-gray-900 mb-3">会审风险提示</p>
                    <div className="space-y-2">
                      {selectedRequest.reviewPrep.risks.map((item) => (
                        <div key={item} className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-700 leading-relaxed">
                          <AlertTriangle size={13} className="flex-shrink-0 mt-0.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "score" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={15} className="text-[#F59E0B]" />
                    <span className="text-sm font-medium text-gray-900">客户讲解评分</span>
                    <span className="text-xs ml-auto px-2 py-0.5 rounded-full bg-amber-50 text-[#B45309]">
                      综合 {selectedRequest.score.overall} 分
                    </span>
                  </div>
                  <div className="space-y-3">
                    {selectedRequest.score.dims.map((item) => (
                      <div key={item.label} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                        <div className="flex items-center justify-between gap-3 text-xs mb-2">
                          <span className="font-medium text-gray-900">{item.label}</span>
                          <span className="text-[#2F5FD0]">{item.score} 分</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                          <div className="h-full rounded-full bg-[#2F5FD0]" style={{ width: `${item.score}%` }} />
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.note}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(`/workbench/collab/score/${selectedRequest.id}`)}
                    className="w-full mt-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    查看完整评分反馈页
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <p className="text-sm font-medium text-gray-900 mb-3">高亮 / 风险语句预览</p>
                    <div className="space-y-2">
                      <div className="rounded-xl border border-green-100 bg-green-50 px-3 py-3 text-xs text-green-700 leading-relaxed">
                        高亮：{selectedRequest.score.highlightLines[0]}
                      </div>
                      <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-700 leading-relaxed">
                        风险：{selectedRequest.score.riskLines[0]}
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <p className="text-xs font-medium text-[#15803D] mb-1">带教建议</p>
                    <p className="text-xs text-[#166534] leading-relaxed">{selectedRequest.score.coachTip}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "script" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">AI 讲稿优化</span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] p-3">
                      <p className="text-gray-400 mb-1">原始讲法</p>
                      <p className="text-gray-600 leading-relaxed">{selectedRequest.aiScript.before}</p>
                    </div>
                    <div className="rounded-xl border border-[#2F5FD0]/20 bg-[#EEF2FF] p-3">
                      <p className="text-[#2F5FD0] mb-1 font-medium">优化后讲稿</p>
                      <p className="text-gray-700 leading-relaxed">{selectedRequest.aiScript.after}</p>
                    </div>
                    <button className="flex items-center gap-1.5 text-xs text-[#2F5FD0] hover:text-[#2550B8]">
                      <Copy size={11} /> 复制优化讲稿给销售
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <p className="text-sm font-medium text-gray-900 mb-3">优化亮点</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRequest.aiScript.highlights.map((item) => (
                        <span key={item} className="text-xs px-2 py-1 rounded-full bg-blue-50 text-[#2F5FD0]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <p className="text-sm font-medium text-gray-900 mb-3">建议讲解结构</p>
                    <div className="space-y-2">
                      {selectedRequest.aiScript.framework.map((item) => (
                        <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "case" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">案例沉淀</span>
                    <span
                      className={`text-xs ml-auto px-2 py-0.5 rounded-full ${
                        selectedRequest.caseRepo.status === "completed" ? "bg-green-100 text-[#15803D]" : "bg-amber-100 text-[#B45309]"
                      }`}
                    >
                      {selectedRequest.caseRepo.status === "completed" ? "已入库" : "待沉淀"}
                    </span>
                  </div>
                  <div className="rounded-xl bg-[#F5F7FA] p-3">
                    <p className="text-xs font-medium text-gray-900">{selectedRequest.caseRepo.title}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{selectedRequest.caseRepo.summary}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedRequest.caseRepo.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <p className="text-sm font-medium text-gray-900 mb-3">入库资产</p>
                    <div className="space-y-2">
                      {selectedRequest.caseRepo.assets.map((item) => (
                        <div key={item} className="flex items-start gap-2 rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                          <CheckCircle2 size={13} className="text-[#16A34A] flex-shrink-0 mt-0.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <p className="text-sm font-medium text-gray-900 mb-3">后续复用去向</p>
                    <div className="space-y-2">
                      {selectedRequest.caseRepo.reuseTargets.map((item) => (
                        <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/workbench/collab/request/${selectedRequest.id}`)}
                className="flex-1 min-w-[180px] flex items-center justify-center gap-1.5 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors"
              >
                <FileText size={14} /> 查看需求交接页
              </button>
              <button
                onClick={() => navigate(`/workbench/collab/review/${selectedRequest.id}`)}
                className="flex-1 min-w-[180px] flex items-center justify-center gap-1.5 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors"
              >
                <Users size={14} /> 查看会审准备页
              </button>
              <button
                onClick={() => navigate(`/workbench/collab/score/${selectedRequest.id}`)}
                className="flex-1 min-w-[180px] flex items-center justify-center gap-1.5 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors"
              >
                <Star size={14} /> 查看评分反馈页
              </button>
              <button className="flex-1 min-w-[180px] flex items-center justify-center gap-1.5 py-2 bg-[#2F5FD0] hover:bg-[#2550B8] text-white rounded-xl text-sm transition-colors">
                <Send size={14} /> 发起会审并同步讲稿
              </button>
              <button className="flex-1 min-w-[180px] flex items-center justify-center gap-1.5 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors">
                <MessageSquareText size={14} /> 提交讲解评分
              </button>
              <button className="flex-1 min-w-[180px] flex items-center justify-center gap-1.5 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors">
                <FileText size={14} /> 沉淀到案例库
              </button>
            </div>
          </div>
        </div>
      </div>

      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-5 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900">新建客户需求交接</h3>
              <button onClick={() => setShowNewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3 mb-4 text-xs">
              {[
                { label: "客户姓名", placeholder: "请输入" },
                { label: "公司/项目", placeholder: "请输入" },
                { label: "预算范围", placeholder: "如：8-12 万" },
                { label: "空间描述", placeholder: "面积、类型等" },
                { label: "风格偏好", placeholder: "现代/北欧/中式等" },
                { label: "功能需求", placeholder: "防滑/耐污/特殊要求" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="font-medium text-gray-700 block mb-1">{field.label}</label>
                  <input
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700 outline-none focus:border-[#2F5FD0] transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowNewModal(false)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                取消
              </button>
              <button onClick={() => setShowNewModal(false)} className="flex-1 py-2 bg-[#2F5FD0] hover:bg-[#2550B8] text-white rounded-lg text-sm transition-colors">
                提交交接
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
