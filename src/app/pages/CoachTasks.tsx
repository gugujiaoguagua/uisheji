import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MessageSquare,
  Target,
  Users,
} from "lucide-react";
import { coachTasks, historyTimelineRecords } from "../data/workflowData";
import { GlobalStateCard } from "../components/GlobalStateCard";


function priorityTone(priority: "high" | "medium" | "normal") {
  if (priority === "high") return "bg-red-100 text-[#DC2626]";
  if (priority === "medium") return "bg-amber-100 text-[#B45309]";
  return "bg-gray-100 text-gray-500";
}

function priorityLabel(priority: "high" | "medium" | "normal") {
  if (priority === "high") return "高优先";
  if (priority === "medium") return "中优先";
  return "常规";
}

function statusTone(status: "todo" | "in_progress" | "done") {
  if (status === "done") return "bg-green-100 text-[#15803D]";
  if (status === "in_progress") return "bg-[#EEF4FF] text-[#2F5FD0]";
  return "bg-amber-100 text-[#B45309]";
}

function statusLabel(status: "todo" | "in_progress" | "done") {
  if (status === "done") return "已完成";
  if (status === "in_progress") return "推进中";
  return "待开始";
}

export default function CoachTasks() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<"all" | "todo" | "in_progress" | "done">("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "high" | "medium" | "normal">("all");
  const [sourceFilter, setSourceFilter] = useState("全部");

  const sourceOptions = useMemo(
    () => ["全部", ...Array.from(new Set(coachTasks.map((item) => item.source)))],
    [],
  );

  const filteredTasks = useMemo(() => {
    return coachTasks.filter((item) => {
      const matchStatus = statusFilter === "all" || item.status === statusFilter;
      const matchPriority = priorityFilter === "all" || item.priority === priorityFilter;
      const matchSource = sourceFilter === "全部" || item.source === sourceFilter;
      return matchStatus && matchPriority && matchSource;
    });
  }, [priorityFilter, sourceFilter, statusFilter]);

  const pendingCount = coachTasks.filter((item) => item.status !== "done").length;
  const highPriorityCount = coachTasks.filter((item) => item.priority === "high" && item.status !== "done").length;
  const dueTodayCount = coachTasks.filter((item) => item.deadline.includes("今天")).length;
  const ownerSummary = useMemo(() => {
    return Array.from(
      coachTasks.reduce((map, item) => {
        const prev = map.get(item.owner) ?? { total: 0, pending: 0 };
        prev.total += 1;
        if (item.status !== "done") prev.pending += 1;
        map.set(item.owner, prev);
        return map;
      }, new Map<string, { total: number; pending: number }>()),
    );
  }, []);

  const recentRecords = useMemo(() => historyTimelineRecords.slice(0, 3), []);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/workbench/dashboard")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回带教看板
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EEF4FF] text-[#2F5FD0]">动作分派独立页</span>
                <span className="text-xs text-gray-400">先看人、节点和动作，不先看平均分</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">带教任务页</h1>
              <p className="text-sm text-gray-500 leading-relaxed">把风险名单后的动作分派拆成独立任务页，方便店长、带教和培训运营按优先级推进闭环。</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate("/workbench/history")}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                查看通用时间线
              </button>
              <button
                onClick={() => navigate("/messages")}
                className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
              >
                去消息中心催办
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "当前任务", value: `${coachTasks.length} 项` },
              { label: "待完成", value: `${pendingCount} 项` },
              { label: "高优先", value: `${highPriorityCount} 项` },
              { label: "今天截止", value: `${dueTodayCount} 项` },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/5 px-3 py-3">
                <p className="text-xs text-white/50 mb-1">{item.label}</p>
                <p className="text-sm text-white leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm font-medium text-gray-900 mb-3">筛选视图</p>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 mb-2">按状态</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "all", label: "全部" },
                    { key: "todo", label: "待开始" },
                    { key: "in_progress", label: "推进中" },
                    { key: "done", label: "已完成" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setStatusFilter(item.key as "all" | "todo" | "in_progress" | "done")}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                        statusFilter === item.key ? "bg-[#2F5FD0] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-2">按优先级</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "all", label: "全部" },
                    { key: "high", label: "高优先" },
                    { key: "medium", label: "中优先" },
                    { key: "normal", label: "常规" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setPriorityFilter(item.key as "all" | "high" | "medium" | "normal")}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                        priorityFilter === item.key ? "bg-[#EEF4FF] text-[#2F5FD0]" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-2">按来源模块</p>
                <div className="flex flex-wrap gap-2">
                  {sourceOptions.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSourceFilter(item)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                        sourceFilter === item ? "bg-[#F7FAFF] text-[#2F5FD0] border border-[#D9E5FF]" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task.id} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${priorityTone(task.priority)}`}>{priorityLabel(task.priority)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusTone(task.status)}`}>{statusLabel(task.status)}</span>
                      <span className="text-xs text-gray-400">来源：{task.source}</span>
                    </div>
                    <h2 className="text-sm font-medium text-gray-900 leading-relaxed">{task.title}</h2>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{task.action}</p>
                  </div>
                  <div className="rounded-xl bg-[#F8FAFC] px-3 py-3 min-w-[150px]">
                    <p className="text-xs text-gray-400 mb-1">下一关键节点</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{task.nextNode}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3 mt-4">
                  {[
                    { label: "负责人 / 对象", value: task.owner },
                    { label: "截止时间", value: task.deadline },
                    { label: "带教提醒", value: task.note },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                      <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded-full bg-[#F5F7FA] text-xs text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate(task.relatedPath)}
                    className="px-3 py-2 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
                  >
                    查看关联页
                  </button>
                  <button
                    onClick={() => navigate("/messages")}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1"
                  >
                    <MessageSquare size={12} /> 发消息催办
                  </button>
                </div>
              </div>
            ))
          ) : (
            <GlobalStateCard
              tone="empty"
              size="sm"
              title="当前筛选条件下没有带教任务"
              description="当前负责人、优先级和状态条件没有命中任务。可以切回“全部”继续查看完整分派列表。"
              action={{
                label: "恢复全部筛选",
                onClick: () => {
                  setStatusFilter("all");
                  setPriorityFilter("all");
                  setSourceFilter("全部");
                },
              }}
            />
          )}

        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">负责人负载</span>
            </div>
            <div className="space-y-2.5">
              {ownerSummary.map(([owner, summary]) => (
                <div key={owner} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-gray-900">{owner}</span>
                    <span className="text-xs text-gray-400">{summary.pending}/{summary.total} 未完成</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock3 size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">最近推进记录</span>
            </div>
            <div className="space-y-2">
              {recentRecords.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.relatedPath)}
                  className="w-full text-left rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 hover:border-[#D9E5FF] hover:bg-[#F7FAFF] transition-colors"
                >
                  <p className="text-sm text-gray-900 leading-relaxed">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target size={15} className="text-[#16A34A]" />
              <span className="text-sm font-medium text-gray-900">带教页使用规则</span>
            </div>
            <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">先看最近节点和掉队对象，再分配动作，不要只盯均值报表。</div>
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">补学、陪练、复测三个动作最好顺序推进，减少无效催办。</div>
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">跨模块任务要回到对应独立页处理，避免又挤回总览页里。</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/workbench/dashboard/risk")}
              className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <AlertTriangle size={14} className="text-[#DC2626] mb-2" />
              <p className="text-sm font-medium text-gray-900">回风险名单</p>
              <p className="text-xs text-gray-500 mt-1">继续看人和风险原因</p>
            </button>
            <button
              onClick={() => navigate("/learning/growth/retest-makeup")}
              className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <CheckCircle2 size={14} className="text-[#16A34A] mb-2" />
              <p className="text-sm font-medium text-gray-900">看复测补考</p>
              <p className="text-xs text-gray-500 mt-1">确认任务闭环结果</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
