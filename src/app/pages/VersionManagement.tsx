import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Layers,
  Send,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { getContentById, syncLabel, syncTone } from "../data/contentOpsData";
import { getUpdateById } from "../data/infoSyncData";

export default function VersionManagement() {
  const navigate = useNavigate();
  const { id } = useParams();
  const content = useMemo(() => getContentById(id), [id]);
  const sourceUpdate = useMemo(() => getUpdateById(content.sourceUpdateId), [content.sourceUpdateId]);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/workbench/content-ops")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回社区运营
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-[#2F5FD0]">{content.type}</span>
                <span className="text-xs text-gray-400">当前版本 {content.currentVersion}</span>
                <span className="text-xs text-gray-400">上一版本 {content.lastVersion}</span>
                <span className="text-xs text-gray-400">最近更新 {content.lastUpdated}</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">{content.title} · 版本管理</h1>
              <p className="text-sm text-gray-500 leading-relaxed">来源更新：{content.sourceUpdate}。这个页面把版本时间线、同步矩阵和执行计划拆开承接，避免仍埋在综合页 tab 里。</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/workbench/info-sync/update/${content.sourceUpdateId}`)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                查看来源更新页
              </button>
              <button
                onClick={() => navigate("/learning/ai-practice")}
                className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
              >
                看 AI 陪练承接
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "完成率", value: `${content.completionRate}%` },
              { label: "通过率", value: `${content.passRate}%` },
              { label: "需复测", value: `${content.retestNeeded} 人` },
              { label: "执行对象", value: `${content.targetUsers.length} 人` },
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
                <Layers size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">版本时间线</span>
              </div>
              <div className="space-y-3">
                {content.versionHistory.map((item, index) => (
                  <div key={`${item.version}-${item.date}`} className="flex items-start gap-3">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium ${item.state === "current" ? "bg-[#2F5FD0] text-white" : item.state === "published" ? "bg-blue-100 text-[#2F5FD0]" : "bg-gray-100 text-gray-500"}`}>
                        {index + 1}
                      </div>
                      {index < content.versionHistory.length - 1 && <div className="w-px h-8 bg-gray-200 mt-1" />}
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

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={15} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">同步矩阵</span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "培训课件", status: content.syncStatus.course, icon: <BookOpen size={12} /> },
                    { label: "考核题库", status: content.syncStatus.questionBank, icon: <BarChart3 size={12} /> },
                    { label: "AI 陪练场景", status: content.syncStatus.practiceScenario, icon: <Target size={12} /> },
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
                  {content.syncNotes.map((note) => (
                    <div key={note} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">执行计划</span>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {content.executionPlan.map((item) => (
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

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">本轮执行对象</span>
              </div>
              {content.targetUsers.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {content.targetUsers.map((name) => (
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
                <Layers size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">来源更新摘要</span>
              </div>
              <div className="rounded-xl bg-[#F5F7FA] px-3 py-3 mb-3">
                <p className="text-sm text-gray-900">{sourceUpdate.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{sourceUpdate.summary}</p>
              </div>
              <div className="space-y-2">
                {sourceUpdate.changes.slice(0, 3).map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Send size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">后续动作</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => navigate(`/workbench/info-sync/update/${content.sourceUpdateId}`)}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  回到来源更新页
                </button>
                <button
                  onClick={() => navigate("/learning/ai-practice")}
                  className="w-full py-2.5 rounded-xl bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
                >
                  查看 AI 陪练版本承接
                </button>
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-700 leading-relaxed mt-3">
                当前版本页已经独立承接，后面可以继续扩成“发布记录 / 回滚记录 / 影响人群”而不必挤在综合总览里。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
