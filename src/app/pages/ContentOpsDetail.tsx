import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Database,
  LayoutGrid,
  MessageSquare,
  Table2,
} from "lucide-react";
import {
  Cell,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getOpsDetail, type AlertState } from "../data/communityOpsData";

function stateTone(state: AlertState | "danger" | "warning" | "normal") {
  if (state === "danger") return "bg-red-50 text-[#DC2626] border-red-100";
  if (state === "warning") return "bg-amber-50 text-[#B45309] border-amber-100";
  return "bg-green-50 text-[#15803D] border-green-100";
}

function dotTone(state: AlertState | "danger" | "warning" | "normal") {
  if (state === "danger") return "bg-[#DC2626]";
  if (state === "warning") return "bg-[#F59E0B]";
  return "bg-[#16A34A]";
}

function stateScore(state: AlertState | "danger" | "warning" | "normal") {
  if (state === "danger") return 38;
  if (state === "warning") return 62;
  return 82;
}

function valueNumber(value: string, fallback: number) {
  const matched = value.match(/\d+/);
  return matched ? Number(matched[0]) : fallback;
}

const pieColors = ["#DC2626", "#F59E0B", "#16A34A"];

export default function ContentOpsDetail() {
  const navigate = useNavigate();
  const { detailType, id } = useParams();
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const detail = useMemo(() => getOpsDetail(detailType, id), [detailType, id]);

  const trendData = useMemo(() => {
    const base = detail.metrics.reduce((sum, item, index) => sum + valueNumber(item.current, stateScore(item.state) + index * 4), 0) / Math.max(detail.metrics.length, 1);
    return ["周一", "周二", "周三", "周四", "周五", "周六"].map((day, index) => ({
      day,
      current: Math.max(18, Math.round(base - 14 + index * 4 + (detail.status === "danger" ? -index : index))),
      target: 70,
    }));
  }, [detail]);

  const trendCurrent = trendData[trendData.length - 1]?.current ?? 0;
  const trendStart = trendData[0]?.current ?? 0;
  const trendDelta = trendCurrent - trendStart;

  const activeCurveData = useMemo(() => {
    const seed = detail.type === "person" ? 42 : detail.type === "community" ? 48 : detail.type === "store" ? 56 : 52;
    return ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"].map((time, index) => ({
      time,
      active: Math.max(12, seed + index * 5 - (detail.status === "danger" ? index * 2 : 0)),
    }));
  }, [detail]);

  const activePeak = Math.max(...activeCurveData.map((item) => item.active));
  const activeCurrent = activeCurveData[activeCurveData.length - 1]?.active ?? 0;

  const rankingData = useMemo(() => {
    return detail.relatedRows.map((row, index) => ({
      name: row.label,
      score: valueNumber(row.value, stateScore(row.state) + index * 6),
      state: row.state,
    })).sort((a, b) => a.score - b.score);
  }, [detail]);

  const statePieData = useMemo(() => {
    const allStates = [
      ...detail.metrics.map((item) => item.state),
      ...detail.relatedRows.map((item) => item.state),
      ...detail.events.map((item) => item.state),
    ];
    return [
      { name: "红色", value: allStates.filter((item) => item === "danger").length },
      { name: "黄色", value: allStates.filter((item) => item === "warning").length },
      { name: "正常", value: allStates.filter((item) => item === "normal").length },
    ].filter((item) => item.value > 0);
  }, [detail]);

  const stateTotal = statePieData.reduce((sum, item) => sum + item.value, 0);

  const funnelData = useMemo(() => {
    const start = detail.status === "danger" ? 100 : 126;
    return [
      { label: "资源", value: start },
      { label: "建群", value: Math.round(start * 0.78) },
      { label: "触达", value: Math.round(start * 0.62) },
      { label: "KOC", value: Math.round(start * 0.38) },
      { label: "签单", value: Math.round(start * 0.26) },
    ];
  }, [detail.status]);

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
                <span className={`text-xs px-2 py-0.5 rounded-full border ${stateTone(detail.status)}`}>{detail.badge}</span>
                <span className="text-xs text-gray-400">可追踪到事件、指标和关联数据</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">{detail.title}</h1>
              <p className="text-sm text-gray-500 leading-relaxed">{detail.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate("/messages")}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                发消息催办
              </button>
              <button
                onClick={() => navigate("/workbench/dashboard/tasks")}
                className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
              >
                建立跟进任务
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-4">
        <div className="bg-white rounded-xl shadow-sm p-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Database size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">明细视图</span>
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
      </div>

      {viewMode === "kanban" ? (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 space-y-4">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">趋势图</span>
              </div>
              <div className="text-right">
                <p className={trendCurrent < 70 ? "text-lg font-bold text-[#DC2626]" : "text-lg font-bold text-[#16A34A]"}>
                  {trendCurrent}%
                </p>
                <p className="text-xs text-gray-400">较周一 {trendDelta >= 0 ? "+" : ""}{trendDelta}</p>
              </div>
            </div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 8, right: 8, bottom: 0, left: -24 }}>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="target" stroke="#CBD5E1" strokeDasharray="4 4" dot={false} />
                  <Line type="monotone" dataKey="current" stroke={detail.status === "danger" ? "#DC2626" : "#2F5FD0"} strokeWidth={3} dot={{ r: 3 }}>
                    <LabelList dataKey="current" position="top" formatter={(value: number) => `${value}%`} style={{ fontSize: 11, fill: "#64748B" }} />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {detail.metrics.slice(0, 3).map((metric) => (
                <div key={metric.label} className={`rounded-lg border px-2 py-2 ${stateTone(metric.state)}`}>
                  <p className="font-medium">{metric.label}</p>
                  <p className="mt-1">{metric.current} / {metric.target}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Database size={16} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">饼图</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{stateTotal}</p>
                <p className="text-xs text-gray-400">异常/正常项</p>
              </div>
            </div>
            <div className="h-[190px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie data={statePieData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={3}>
                    {statePieData.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{stateTotal}</p>
                  <p className="text-xs text-gray-400">总项</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
              {statePieData.map((item, index) => (
                <div key={item.name} className="rounded-lg bg-[#F8FAFC] px-2 py-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pieColors[index % pieColors.length] }} />
                    <span>{item.name}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">群活跃度曲线</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#16A34A]">{activeCurrent}</p>
                <p className="text-xs text-gray-400">峰值 {activePeak}</p>
              </div>
            </div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeCurveData} margin={{ top: 8, right: 8, bottom: 0, left: -24 }}>
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="active" stroke="#16A34A" strokeWidth={3} dot={{ r: 3 }}>
                    <LabelList dataKey="active" position="top" style={{ fontSize: 11, fill: "#64748B" }} />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={16} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">排名榜</span>
            </div>
            <div className="space-y-3">
              {rankingData.map((item, index) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-700">{index + 1}. {item.name}</span>
                    <span className={item.state === "danger" ? "text-[#DC2626]" : item.state === "warning" ? "text-[#B45309]" : "text-[#15803D]"}>{item.score}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={item.state === "danger" ? "h-full bg-[#DC2626]" : item.state === "warning" ? "h-full bg-[#F59E0B]" : "h-full bg-[#16A34A]"}
                      style={{ width: `${Math.min(100, item.score)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Database size={16} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">漏斗图</span>
            </div>
            <div className="space-y-2">
              {funnelData.map((item, index) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="w-10 text-xs text-gray-500">{item.label}</span>
                  <div className="flex-1 h-8 rounded-lg bg-[#EEF4FF] overflow-hidden">
                    <div
                      className="h-full rounded-lg bg-[#2F5FD0] text-white text-xs flex items-center justify-end pr-2"
                      style={{ width: `${Math.max(24, 100 - index * 14)}%` }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-sm">
                <thead className="bg-[#F8FAFC] text-xs text-gray-500">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">类别</th>
                    <th className="px-4 py-3 text-left font-medium">项目</th>
                    <th className="px-4 py-3 text-left font-medium">当前 / 内容</th>
                    <th className="px-4 py-3 text-left font-medium">目标 / 时间</th>
                    <th className="px-4 py-3 text-left font-medium">状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {detail.metrics.map((metric) => (
                    <tr key={`metric-${metric.label}`} className="hover:bg-[#FAFBFC]">
                      <td className="px-4 py-3 text-gray-500">指标</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{metric.label}</td>
                      <td className="px-4 py-3 text-gray-700">{metric.current}</td>
                      <td className="px-4 py-3 text-gray-600">{metric.target}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${stateTone(metric.state)}`}>
                          {metric.state === "danger" ? "红色" : metric.state === "warning" ? "黄色" : "正常"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {detail.events.map((event) => (
                    <tr key={`event-${event.time}-${event.title}`} className="hover:bg-[#FAFBFC]">
                      <td className="px-4 py-3 text-gray-500">事件</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{event.title}</td>
                      <td className="px-4 py-3 text-gray-700">{event.desc}</td>
                      <td className="px-4 py-3 text-gray-600">{event.time}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${stateTone(event.state)}`}>
                          {event.state === "danger" ? "红色" : event.state === "warning" ? "黄色" : "正常"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {detail.relatedRows.map((row) => (
                    <tr key={`related-${row.label}-${row.value}`} className="hover:bg-[#FAFBFC]">
                      <td className="px-4 py-3 text-gray-500">关联</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.label}</td>
                      <td className="px-4 py-3 text-gray-700">{row.value}</td>
                      <td className="px-4 py-3 text-gray-600">{row.note}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${stateTone(row.state)}`}>
                          {row.state === "danger" ? "红色" : row.state === "warning" ? "黄色" : "正常"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
