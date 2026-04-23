import { useMemo } from "react";
import { useNavigate } from "react-router";
import {
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Dumbbell,
  BookOpen,
  ChevronRight,
  Target,
  Award,
  ClipboardList,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  currentStage,
  milestones,
  radarData,
  retrainTasks,
  reviewResults,
  strengths,
  trendData,
  weakAreas,
} from "../data/growthData";

export default function Growth() {
  const navigate = useNavigate();
  const previewTasks = useMemo(() => retrainTasks.slice(0, 3), []);
  const latestReview = reviewResults[0];

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-gray-900 mb-0.5">成长总览</h1>
          <p className="text-xs text-gray-500">看清自己差在哪、补什么，而不只是看分数</p>

          <div className="flex items-center gap-4 mt-4 p-4 bg-[#1E2A3A] rounded-xl">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">78</div>
              <div className="text-white/50 text-xs">综合能力分</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <TrendingUp size={13} className="text-[#16A34A]" />
                <span className="text-xs text-[#16A34A]">较上月提升 +6 分</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "必修完成率", value: "100%" },
                  { label: "陪练次数", value: "7/10" },
                  { label: "考核通过率", value: "83%" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-sm font-medium text-white">{s.value}</div>
                    <div className="text-xs text-white/50">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-[#D9E5FF] bg-[#F7FAFF] p-3 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
              <Target size={16} className="text-[#2F5FD0]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">当前阶段：{currentStage.label}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{currentStage.desc}</p>
              <p className="text-xs text-[#2F5FD0] mt-2">下一步：{currentStage.nextAction}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <AlertCircle size={15} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">需要补强的地方</span>
                <span className="text-xs text-gray-400 ml-auto">按优先级排序</span>
              </div>
              <div className="divide-y divide-gray-50">
                {weakAreas.map((area) => (
                  <div key={area.id} className="p-4" style={{ borderLeft: `3px solid ${area.urgency === "high" ? "#DC2626" : "#F59E0B"}` }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-sm font-medium text-gray-900">{area.area}</span>
                          <span className="text-xs text-[#DC2626] bg-red-50 px-1.5 py-0.5 rounded">{area.score}分</span>
                          <span className="text-xs text-gray-400">差 {area.gap} 分达到均线</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">📌 {area.reason}</p>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                          <div className="h-full rounded-full bg-[#DC2626]" style={{ width: `${area.score}%` }} />
                        </div>
                        <div className="bg-[#F5F7FA] rounded p-2">
                          <p className="text-xs text-gray-500">💡 建议动作：{area.action}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex flex-col gap-2 min-w-[88px]">
                        <button
                          onClick={() => navigate(`/learning/growth/weak-area/${area.id}`)}
                          className="bg-white border border-gray-200 hover:border-[#2F5FD0]/40 text-gray-700 px-3 py-1.5 rounded text-xs transition-colors"
                        >
                          查看详情
                        </button>
                        <button
                          onClick={() => navigate("/learning/growth/retrain")}
                          className="bg-[#DC2626] hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs transition-colors"
                        >
                          立即补训
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <ClipboardList size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">补训任务</span>
                <div className="ml-auto flex items-center gap-3">
                  <button
                    onClick={() => navigate("/learning/growth/retest-makeup")}
                    className="text-xs text-[#16A34A] hover:text-green-700"
                  >
                    复测 / 补考页
                  </button>
                  <button
                    onClick={() => navigate("/learning/growth/retrain")}
                    className="text-xs text-[#2F5FD0] hover:text-[#2550B8]"
                  >
                    查看全部 →
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {previewTasks.map((task) => (
                  <div key={task.id} className="px-4 py-3 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
                      <ClipboardList size={15} className="text-[#2F5FD0]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm text-gray-800">{task.title}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          task.status === "done"
                            ? "bg-green-100 text-[#16A34A]"
                            : task.status === "in_progress"
                              ? "bg-blue-100 text-[#2F5FD0]"
                              : "bg-gray-100 text-gray-500"
                        }`}>
                          {task.status === "done" ? "已完成" : task.status === "in_progress" ? "进行中" : "待开始"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{task.deadline} · {task.duration}</p>
                    </div>
                    <button
                      onClick={() => navigate(task.path)}
                      className="text-xs text-[#2F5FD0] hover:text-[#2550B8]"
                    >
                      去完成
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#16A34A]" />
                <span className="text-sm font-medium text-gray-900">表现优秀的地方</span>
              </div>
              <div className="divide-y divide-gray-50">
                {strengths.map((s, i) => (
                  <div key={i} className="px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                      <Award size={16} className="text-[#16A34A]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-800">{s.area}</span>
                        <span className="text-xs text-[#16A34A] bg-green-50 px-1.5 py-0.5 rounded">{s.score}分</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{s.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">近 5 月综合得分趋势</span>
              </div>
              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9CA3AF" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} domain={[50, 100]} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E5E7EB" }} />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#2F5FD0"
                      strokeWidth={2}
                      dot={{ r: 3, fill: "#2F5FD0" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {latestReview && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={15} className="text-[#16A34A]" />
                  <span className="text-sm font-medium text-gray-900">最近复评结果</span>
                </div>
                <div className="rounded-xl border border-green-100 bg-green-50 p-3 mb-3">
                  <p className="text-sm text-green-800">{latestReview.summary}</p>
                  <p className="text-xs text-green-700 mt-1">{latestReview.reviewedAt} · {latestReview.reviewer}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {latestReview.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-xl bg-[#F8FAFC] border border-gray-100 p-3">
                      <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
                      <p className="text-sm text-gray-900">
                        {metric.before} → <span className="text-[#16A34A] font-medium">{metric.after}</span>
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate("/learning/growth/review-result")}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#2F5FD0] hover:text-[#2550B8]"
                >
                  查看完整复评结果 <ArrowRight size={12} />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900 mb-2">能力雷达图</p>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: "#6B7280" }} />
                    <Radar name="能力" dataKey="A" stroke="#2F5FD0" fill="#2F5FD0" fillOpacity={0.15} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Target size={14} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">转岗资格进度</span>
              </div>
              <div className="space-y-2.5">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      m.done ? "bg-[#16A34A]" : m.locked ? "bg-gray-200" : "bg-[#F5F7FA] border-2 border-gray-200"
                    }`}>
                      {m.done && (
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs ${m.done ? "text-gray-500 line-through" : m.locked ? "text-gray-300" : "text-gray-700"}`}>
                        {m.label}
                      </p>
                      {m.done && m.date && <p className="text-xs text-gray-400">{m.date} 完成</p>}
                      {!m.done && m.current !== undefined && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#2F5FD0] rounded-full" style={{ width: `${(m.current / m.total!) * 100}%` }} />
                          </div>
                          <span className="text-xs text-gray-400">{m.current}/{m.total}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/profile/staff-transfer")}
                className="mt-3 w-full text-xs text-center text-[#2F5FD0] hover:text-[#2550B8]"
              >
                查看转工作人员申请 →
              </button>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900 mb-3">快速行动</p>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/learning/ai-practice")}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg text-xs text-purple-700 hover:bg-purple-100 transition-colors"
                >
                  <Dumbbell size={13} />
                  继续 AI 陪练（还差 3 次）
                  <ChevronRight size={11} className="ml-auto" />
                </button>
                <button
                  onClick={() => navigate("/learning/course/2")}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg text-xs text-orange-700 hover:bg-orange-100 transition-colors"
                >
                  <BookOpen size={13} />
                  补学工艺规范课程
                  <ChevronRight size={11} className="ml-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
