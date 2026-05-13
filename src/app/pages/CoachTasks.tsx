import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  LayoutGrid,
  MessageSquare,
  Table2,
  Target,
  Users,
} from "lucide-react";
import { opsTaskRecords } from "../data/communityOpsData";
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
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");

  const sourceOptions = useMemo(
    () => ["全部", ...Array.from(new Set(opsTaskRecords.map((item) => item.source)))],
    [],
  );

  const filteredTasks = useMemo(() => {
    return opsTaskRecords.filter((item) => {
      const matchStatus = statusFilter === "all" || item.status === statusFilter;
      const matchPriority = priorityFilter === "all" || item.priority === priorityFilter;
      const matchSource = sourceFilter === "全部" || item.source === sourceFilter;
      return matchStatus && matchPriority && matchSource;
    });
  }, [priorityFilter, sourceFilter, statusFilter]);

  const pendingCount = opsTaskRecords.filter((item) => item.status !== "done").length;
  const highPriorityCount = opsTaskRecords.filter((item) => item.priority === "high" && item.status !== "done").length;
  const dueTodayCount = opsTaskRecords.filter((item) => item.deadline.includes("今天")).length;
  const ownerSummary = useMemo(() => {
    return Array.from(
      opsTaskRecords.reduce((map, item) => {
        const prev = map.get(item.owner) ?? { total: 0, pending: 0 };
        prev.total += 1;
        if (item.status !== "done") prev.pending += 1;
        map.set(item.owner, prev);
        return map;
      }, new Map<string, { total: number; pending: number }>()),
    );
  }, []);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/workbench/content-ops")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回社区运营
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EEF4FF] text-[#2F5FD0]">运营动作任务</span>
                <span className="text-xs text-gray-400">每条任务必须有对象、责任人、截止时间和回执口径</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">运营动作任务页</h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                把风险名单后的处理动作拆成可执行任务，避免只看到红色预警但没有负责人和闭环结果。
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate("/workbench/dashboard/risk")}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                回风险名单
              </button>
              <button
                onClick={() => navigate("/messages")}
                className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
              >
                去消息中心催办
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "当前任务", value: `${opsTaskRecords.length} 项` },
              { label: "待闭环", value: `${pendingCount} 项` },
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

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">筛选视图</span>
            </div>
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
                        priorityFilter === item.key ? "bg-red-50 text-[#DC2626]" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
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
                        sourceFilter === item ? "bg-[#EEF4FF] text-[#2F5FD0]" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Target size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">任务视图</span>
              </div>
              <div className="flex rounded-lg bg-[#F5F7FA] p-1">
                {[
                  { key: "kanban", label: "看板", icon: <LayoutGrid size={13} /> },
                  { key: "table", label: "表格", icon: <Table2 size={13} /> },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setViewMode(item.key as "kanban" | "table")}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                      viewMode === item.key ? "bg-white text-[#2F5FD0] shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredTasks.length > 0 ? (
            viewMode === "kanban" ? (
              <div className="grid lg:grid-cols-3 gap-3">
                {[
                  { key: "todo", label: "待开始", icon: <AlertTriangle size={16} />, tone: "border-amber-100 bg-amber-50 text-[#B45309]" },
                  { key: "in_progress", label: "推进中", icon: <Clock3 size={16} />, tone: "border-blue-100 bg-blue-50 text-[#2F5FD0]" },
                  { key: "done", label: "已完成", icon: <CheckCircle2 size={16} />, tone: "border-green-100 bg-green-50 text-[#15803D]" },
                ].map((column) => {
                  const columnTasks = filteredTasks.filter((task) => task.status === column.key);
                  return (
                    <div key={column.key} className={`rounded-xl border p-3 ${column.tone}`}>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          {column.icon}
                          <span className="text-sm font-medium">{column.label}</span>
                        </div>
                        <span className="text-xs">{columnTasks.length} 项</span>
                      </div>
                      <div className="space-y-3">
                        {columnTasks.map((task) => (
                          <button
                            key={task.id}
                            onClick={() => navigate(task.relatedPath)}
                            className="w-full rounded-xl bg-white border border-white/70 px-3 py-3 text-left hover:shadow-sm transition-all"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap mb-2">
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${priorityTone(task.priority)}`}>{priorityLabel(task.priority)}</span>
                                  <span className="text-xs text-gray-400">{task.source}</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900 leading-relaxed">{task.title}</p>
                                <p className="text-xs text-gray-500 mt-1">{task.object} · {task.owner}</p>
                              </div>
                              <ChevronRight size={15} className="text-gray-300 mt-1 flex-shrink-0" />
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-3">
                              <div className="rounded-lg bg-[#F8FAFC] px-2 py-2">
                                <p className="text-xs text-gray-400">截止</p>
                                <p className="text-xs text-gray-700 mt-1">{task.deadline}</p>
                              </div>
                              <div className="rounded-lg bg-[#F8FAFC] px-2 py-2">
                                <p className="text-xs text-gray-400">下一节点</p>
                                <p className="text-xs text-gray-700 mt-1 line-clamp-1">{task.nextNode}</p>
                              </div>
                            </div>
                            <div className="mt-3 rounded-lg bg-[#F7FAFF] border border-[#D9E5FF] px-2 py-2">
                              <p className="text-xs text-[#2F5FD0] leading-relaxed">{task.receipt}</p>
                            </div>
                          </button>
                        ))}
                        {columnTasks.length === 0 && (
                          <div className="rounded-xl border border-dashed border-white/80 px-3 py-4 text-center text-xs opacity-70">
                            暂无任务
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[860px] text-sm">
                    <thead className="bg-[#F8FAFC] text-xs text-gray-500">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">任务</th>
                        <th className="px-4 py-3 text-left font-medium">对象</th>
                        <th className="px-4 py-3 text-left font-medium">负责人</th>
                        <th className="px-4 py-3 text-left font-medium">状态</th>
                        <th className="px-4 py-3 text-left font-medium">回执口径</th>
                        <th className="px-4 py-3 text-right font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredTasks.map((task) => (
                        <tr key={task.id} className="hover:bg-[#FAFBFC]">
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{task.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{task.deadline}</div>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{task.object}</td>
                          <td className="px-4 py-3 text-gray-600">{task.owner}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${statusTone(task.status)}`}>{statusLabel(task.status)}</span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{task.receipt}</td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => navigate(task.relatedPath)} className="text-xs text-[#2F5FD0] hover:text-[#2550B8]">
                              看对象
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          ) : (
            <GlobalStateCard
              tone="empty"
              size="sm"
              title="当前筛选条件下没有运营任务"
              description="当前状态、优先级和来源条件没有命中任务。可以切回全部继续查看完整分派列表。"
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
                    <span className="text-xs text-gray-400">{summary.pending}/{summary.total} 未闭环</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock3 size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">今日必须回执</span>
            </div>
            <div className="space-y-2">
              {opsTaskRecords.filter((item) => item.deadline.includes("今天")).map((task) => (
                <button
                  key={task.id}
                  onClick={() => navigate(task.relatedPath)}
                  className="w-full text-left rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 hover:border-[#D9E5FF] hover:bg-[#F7FAFF] transition-colors"
                >
                  <p className="text-sm text-gray-900 leading-relaxed">{task.object}</p>
                  <p className="text-xs text-gray-500 mt-1">{task.receipt}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target size={15} className="text-[#16A34A]" />
              <span className="text-sm font-medium text-gray-900">任务闭环规则</span>
            </div>
            <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">每条任务必须有具体对象，不能只写“跟进运营异常”。</div>
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">回执必须包含指标变化、动作结果和下一节点。</div>
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">红色预警任务当天必须回写，未回写继续留在风险名单。</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/workbench/dashboard/risk")}
              className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <AlertTriangle size={14} className="text-[#DC2626] mb-2" />
              <p className="text-sm font-medium text-gray-900">风险名单</p>
              <p className="text-xs text-gray-500 mt-1">继续排查对象</p>
            </button>
            <button
              onClick={() => navigate("/messages")}
              className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <MessageSquare size={14} className="text-[#2F5FD0] mb-2" />
              <p className="text-sm font-medium text-gray-900">消息催办</p>
              <p className="text-xs text-gray-500 mt-1">追踪处理回执</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
