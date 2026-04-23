import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  RotateCcw,
} from "lucide-react";
import { retestSessions, type RecordTone } from "../data/workflowData";
import { GlobalStateCard } from "../components/GlobalStateCard";


function toneMeta(tone: RecordTone) {
  if (tone === "done") return "bg-green-100 text-[#15803D]";
  if (tone === "risk") return "bg-red-100 text-[#DC2626]";
  return "bg-amber-100 text-[#B45309]";
}

export default function RetestMakeup() {
  const navigate = useNavigate();
  const [kindFilter, setKindFilter] = useState<"all" | "复测" | "补考">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "待开始" | "进行中" | "已通过" | "未通过">("all");
  const [selectedId, setSelectedId] = useState(retestSessions[0].id);

  const filteredSessions = useMemo(() => {
    return retestSessions.filter((item) => {
      const matchKind = kindFilter === "all" || item.kind === kindFilter;
      const matchStatus = statusFilter === "all" || item.status === statusFilter;
      return matchKind && matchStatus;
    });
  }, [kindFilter, statusFilter]);

  const selectedSession = useMemo(() => {
    return filteredSessions.find((item) => item.id === selectedId) ?? filteredSessions[0] ?? retestSessions[0];
  }, [filteredSessions, selectedId]);

  const pendingCount = retestSessions.filter((item) => item.tone === "pending").length;
  const riskCount = retestSessions.filter((item) => item.tone === "risk").length;
  const passedCount = retestSessions.filter((item) => item.tone === "done").length;

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/learning/growth")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回成长总览
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EEF4FF] text-[#2F5FD0]">补训闭环独立页</span>
                <span className="text-xs text-gray-400">把“补了什么、什么时候考、结果怎样”拆开承接</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">复测 / 补考页</h1>
              <p className="text-sm text-gray-500 leading-relaxed">把补训后的复测、补考、前置条件和下一步动作收在同一页，避免只看到“未通过”却不知道接下来怎么补。</p>
            </div>
            <button
              onClick={() => navigate("/learning/growth/review-result")}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
            >
              查看复评结果页
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "场次数", value: `${retestSessions.length} 场` },
              { label: "待开始 / 进行中", value: `${pendingCount} 场` },
              { label: "未通过", value: `${riskCount} 场` },
              { label: "已通过", value: `${passedCount} 场` },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/5 px-3 py-3">
                <p className="text-xs text-white/50 mb-1">{item.label}</p>
                <p className="text-sm text-white leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 grid md:grid-cols-5 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 mb-2">按类型</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "all", label: "全部" },
                    { key: "复测", label: "复测" },
                    { key: "补考", label: "补考" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setKindFilter(item.key as "all" | "复测" | "补考")}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                        kindFilter === item.key ? "bg-[#2F5FD0] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">按结果</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "all", label: "全部" },
                    { key: "待开始", label: "待开始" },
                    { key: "进行中", label: "进行中" },
                    { key: "已通过", label: "已通过" },
                    { key: "未通过", label: "未通过" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setStatusFilter(item.key as "all" | "待开始" | "进行中" | "已通过" | "未通过")}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                        statusFilter === item.key ? "bg-[#EEF4FF] text-[#2F5FD0]" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {filteredSessions.length > 0 ? (
            filteredSessions.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all ${
                  selectedSession.id === item.id ? "ring-2 ring-[#2F5FD0]" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EEF4FF] flex items-center justify-center flex-shrink-0">
                    <FileText size={16} className="text-[#2F5FD0]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${toneMeta(item.tone)}`}>{item.kind}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${toneMeta(item.tone)}`}>{item.status}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.candidate} · {item.relatedArea}</p>
                    <p className="text-xs text-gray-400 mt-2">{item.scheduledAt}</p>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <GlobalStateCard
              tone="empty"
              size="sm"
              title="当前筛选条件下没有复测 / 补考安排"
              description="不是系统没有闭环安排，而是当前复测类型和状态筛选没有命中。可以切回“全部”继续查看完整安排。"
              action={{
                label: "恢复全部筛选",
                onClick: () => {
                  setKindFilter("all");
                  setStatusFilter("all");
                },
              }}
            />
          )}

        </div>

        <div className="md:col-span-3 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${toneMeta(selectedSession.tone)}`}>{selectedSession.kind}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${toneMeta(selectedSession.tone)}`}>{selectedSession.status}</span>
                  <span className="text-xs text-gray-400">对象：{selectedSession.candidate}</span>
                </div>
                <h2 className="text-base font-medium text-gray-900">{selectedSession.title}</h2>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">安排时间：{selectedSession.scheduledAt} · 当前分数 / 门槛：{selectedSession.score}</p>
              </div>
              <button
                onClick={() => navigate(selectedSession.relatedPath)}
                className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
              >
                去关联页面
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">相关薄弱项</span>
              </div>
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                {selectedSession.relatedArea}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock3 size={15} className="text-[#16A34A]" />
                <span className="text-sm font-medium text-gray-900">当前判断</span>
              </div>
              <div className={`rounded-xl px-3 py-3 text-xs leading-relaxed ${selectedSession.tone === "done" ? "bg-green-50 text-[#15803D]" : selectedSession.tone === "risk" ? "bg-red-50 text-[#DC2626]" : "bg-amber-50 text-[#B45309]"}`}>
                {selectedSession.nextAction}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <RotateCcw size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">推荐动作</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/learning/growth/retrain")}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-left text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  先看补训任务页
                </button>
                <button
                  onClick={() => navigate("/learning/growth/review-result")}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-left text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  再看复评结果页
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-[#16A34A]" />
                <span className="text-sm font-medium text-gray-900">前置条件</span>
              </div>
              <div className="space-y-2">
                {selectedSession.prerequisite.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">结果说明</span>
              </div>
              <div className="space-y-2">
                {selectedSession.notes.map((item) => (
                  <div key={item} className={`rounded-xl px-3 py-3 text-xs leading-relaxed ${selectedSession.tone === "risk" ? "border border-red-100 bg-red-50 text-[#DC2626]" : "border border-gray-200 bg-[#FAFBFC] text-gray-600"}`}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
