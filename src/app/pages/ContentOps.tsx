import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Layers,
  Plus,
  RefreshCw,
  Send,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { contents, syncLabel, syncTone } from "../data/contentOpsData";

type OpsTab = "version" | "sync" | "execution";

export default function ContentOps() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("c2");
  const [activeTab, setActiveTab] = useState<OpsTab>("version");
  const [showPushModal, setShowPushModal] = useState(false);

  const selectedContent = contents.find((item) => item.id === selectedId) ?? contents[0];
  const pendingSyncNodes = contents.reduce(
    (sum, item) =>
      sum + [item.syncStatus.course, item.syncStatus.questionBank, item.syncStatus.practiceScenario].filter((status) => status !== "done").length,
    0,
  );
  const pendingPractice = contents.filter((item) => item.syncStatus.practiceScenario !== "done").length;

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-gray-900">培训运营 & 内容版本治理</h1>
              <p className="text-xs text-gray-500 mt-0.5">把内容页拆成版本管理、同步矩阵、执行计划，避免只看到课件而看不到题库和陪练场景。</p>
            </div>
            <button className="flex items-center gap-1.5 bg-[#2F5FD0] hover:bg-[#2550B8] text-white px-3 py-1.5 rounded-lg text-xs transition-colors">
              <Plus size={13} /> 发布新版本
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 space-y-4">
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "待推送更新", value: "1", tone: "text-[#F59E0B]", bg: "bg-amber-50 border border-amber-200" },
            { label: "需重学人次", value: "13", tone: "text-[#F59E0B]", bg: "bg-amber-50 border border-amber-200" },
            { label: "待同步节点", value: `${pendingSyncNodes}`, tone: "text-[#2F5FD0]", bg: "bg-blue-50 border border-blue-100" },
            { label: "待改陪练场景", value: `${pendingPractice}`, tone: "text-[#DC2626]", bg: "bg-red-50 border border-red-100" },
          ].map((item) => (
            <div key={item.label} className={`rounded-xl px-4 py-3 shadow-sm ${item.bg}`}>
              <div className={`text-2xl font-bold ${item.tone}`}>{item.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          <div className="md:col-span-2 space-y-3">
            {contents.map((content) => (
              <button
                key={content.id}
                onClick={() => setSelectedId(content.id)}
                className={`w-full text-left bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all ${
                  selectedContent.id === content.id ? "ring-2 ring-[#2F5FD0]" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Layers size={17} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs text-gray-400">{content.type}</span>
                      <span className="text-xs text-[#2F5FD0] bg-blue-50 px-1.5 py-0.5 rounded">{content.currentVersion}</span>
                      {content.status === "pending_push" ? (
                        <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded flex items-center gap-1">
                          <RefreshCw size={9} /> 待推送重学
                        </span>
                      ) : (
                        <span className="text-xs px-1.5 py-0.5 bg-green-100 text-[#16A34A] rounded">已发布</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-900">{content.title}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 flex-wrap">
                      <span>完成率 {content.completionRate}%</span>
                      <span>通过率 {content.passRate}%</span>
                      <span className={content.retestNeeded > 0 ? "text-[#DC2626]" : "text-gray-400"}>复测 {content.retestNeeded} 人</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="md:col-span-3 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-[#2F5FD0]">{selectedContent.type}</span>
                    <span className="text-xs text-gray-400">来源：{selectedContent.sourceUpdate}</span>
                  </div>
                  <h2 className="text-base font-medium text-gray-900">{selectedContent.title}</h2>
                  <p className="text-xs text-gray-500 mt-1">当前版本 {selectedContent.currentVersion} · 上一版本 {selectedContent.lastVersion} · 最近更新 {selectedContent.lastUpdated}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => navigate(`/workbench/content-ops/version/${selectedContent.id}`)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    查看版本页
                  </button>
                  {selectedContent.status === "pending_push" && (
                    <button
                      onClick={() => setShowPushModal(true)}
                      className="px-3 py-1.5 rounded-lg bg-[#F59E0B] hover:bg-amber-600 text-white text-xs transition-colors"
                    >
                      推送重学任务
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-1 bg-[#F5F7FA] rounded-xl p-1 mt-4 overflow-x-auto hide-scrollbar">
                {[
                  { key: "version", label: "版本管理" },
                  { key: "sync", label: "同步矩阵" },
                  { key: "execution", label: "执行计划" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as OpsTab)}
                    className={`flex-1 min-w-[96px] py-2 rounded-lg text-xs transition-colors ${
                      activeTab === tab.key ? "bg-[#2F5FD0] text-white" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "version" && (
              <>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "完成率", value: `${selectedContent.completionRate}%`, tone: selectedContent.completionRate < 60 ? "text-[#DC2626]" : selectedContent.completionRate < 80 ? "text-[#F59E0B]" : "text-[#16A34A]" },
                    { label: "通过率", value: `${selectedContent.passRate}%`, tone: selectedContent.passRate < 75 ? "text-[#F59E0B]" : "text-[#16A34A]" },
                    { label: "需复测", value: `${selectedContent.retestNeeded} 人`, tone: selectedContent.retestNeeded > 0 ? "text-[#DC2626]" : "text-gray-400" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white rounded-xl shadow-sm px-4 py-3">
                      <div className={`text-lg font-bold ${item.tone}`}>{item.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">版本时间线</span>
                  </div>
                  <div className="space-y-3">
                    {selectedContent.versionHistory.map((item, index) => (
                      <div key={`${item.version}-${item.date}`} className="flex items-start gap-3">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium ${item.state === "current" ? "bg-[#2F5FD0] text-white" : item.state === "published" ? "bg-blue-100 text-[#2F5FD0]" : "bg-gray-100 text-gray-500"}`}>
                            {index + 1}
                          </div>
                          {index < selectedContent.versionHistory.length - 1 && <div className="w-px h-8 bg-gray-200 mt-1" />}
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 flex-1">
                          <div className="flex items-center justify-between gap-3 text-xs">
                            <span className="font-medium text-gray-900">{item.version}</span>
                            <span className="text-gray-400">{item.date}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "sync" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">内容同步矩阵</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "培训课件", status: selectedContent.syncStatus.course, icon: <BookOpen size={12} /> },
                      { label: "考核题库", status: selectedContent.syncStatus.questionBank, icon: <BarChart3 size={12} /> },
                      { label: "AI 陪练场景", status: selectedContent.syncStatus.practiceScenario, icon: <Target size={12} /> },
                    ].map((item) => (
                      <div key={item.label} className={`rounded-xl border px-3 py-3 ${syncTone(item.status)}`}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-xs font-medium">
                            {item.icon}
                            {item.label}
                          </div>
                          <span className="text-[11px]">{syncLabel(item.status)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={15} className="text-[#16A34A]" />
                    <span className="text-sm font-medium text-gray-900">同步备注</span>
                  </div>
                  <div className="space-y-2">
                    {selectedContent.syncNotes.map((note) => (
                      <div key={note} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                        {note}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(`/workbench/info-sync/update/${selectedContent.sourceUpdateId}`)}
                    className="w-full mt-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    去来源更新页查看变更详情
                  </button>
                </div>
              </div>
            )}

            {activeTab === "execution" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">本轮执行对象</span>
                  </div>
                  {selectedContent.targetUsers.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedContent.targetUsers.map((name) => (
                        <span key={name} className="text-xs px-2 py-1 rounded-full bg-[#F5F7FA] border border-gray-200 text-gray-600">
                          {name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-500">
                      当前没有待执行对象。
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={15} className="text-[#F59E0B]" />
                    <span className="text-sm font-medium text-gray-900">执行计划</span>
                  </div>
                  <div className="space-y-2">
                    {selectedContent.executionPlan.map((item) => (
                      <div key={item.label} className={`rounded-xl border px-3 py-3 ${syncTone(item.status)}`}>
                        <div className="flex items-center justify-between gap-3 text-xs font-medium">
                          <span>{item.label}</span>
                          <span>{syncLabel(item.status)}</span>
                        </div>
                        <p className="text-xs mt-2 leading-relaxed">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              {selectedContent.status === "pending_push" && (
                <button
                  onClick={() => setShowPushModal(true)}
                  className="flex-1 min-w-[180px] flex items-center justify-center gap-1 py-2 bg-[#F59E0B] hover:bg-amber-600 text-white rounded-xl text-sm transition-colors"
                >
                  <Send size={13} /> 推送重学任务
                </button>
              )}
              <button
                onClick={() => navigate(`/workbench/content-ops/version/${selectedContent.id}`)}
                className="flex-1 min-w-[180px] py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors"
              >
                查看版本管理独立页
              </button>
              {selectedContent.retestNeeded > 0 && (
                <button className="flex-1 min-w-[180px] py-2 bg-[#2F5FD0] hover:bg-[#2550B8] text-white rounded-xl text-sm transition-colors">
                  发起复测
                </button>
              )}
              <button
                onClick={() => navigate("/learning/ai-practice")}
                className="flex-1 min-w-[180px] py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors"
              >
                查看 AI 陪练场景承接
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPushModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-5">
            <h3 className="text-sm font-medium text-gray-900 mb-3">推送重学任务</h3>
            <div className="bg-amber-50 rounded-lg p-3 mb-4 text-xs text-amber-800 leading-relaxed">
              将为已学习旧版本的用户创建重学任务：<strong>《{selectedContent.title}》{selectedContent.currentVersion}</strong>，并同步处理题库与 AI 陪练场景的版本待办。
            </div>
            <div className="space-y-2 mb-4">
              {[
                { label: "覆盖所有已学旧版用户", checked: true },
                { label: "同时发送消息通知", checked: true },
                { label: "同步创建题库更新待办", checked: true },
                { label: "同步创建 AI 陪练场景更新待办", checked: true },
                { label: "完成后自动发起复测", checked: false },
              ].map((opt) => (
                <label key={opt.label} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked={opt.checked} className="accent-[#2F5FD0]" />
                  <span className="text-xs text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowPushModal(false)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                取消
              </button>
              <button onClick={() => setShowPushModal(false)} className="flex-1 py-2 bg-[#F59E0B] hover:bg-amber-600 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-1">
                <Send size={13} /> 确认推送
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
