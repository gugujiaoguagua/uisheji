import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  AlertCircle,
  BookOpen,
  ClipboardList,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  getWeakAreaById,
  getRetrainTasksByWeakAreaId,
  getReviewResultsByWeakAreaId,
} from "../data/growthData";

export default function WeakAreaDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const area = useMemo(() => getWeakAreaById(id), [id]);
  const tasks = useMemo(() => getRetrainTasksByWeakAreaId(area.id), [area.id]);
  const reviews = useMemo(() => getReviewResultsByWeakAreaId(area.id), [area.id]);
  const latestReview = reviews[0];

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

          <div className="flex items-start gap-2 flex-wrap mb-2">
            <span className="text-xs px-2 py-0.5 bg-red-50 text-[#DC2626] rounded-full flex items-center gap-1">
              <AlertCircle size={10} /> 高优先级薄弱项
            </span>
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
              复测目标：{area.examLabel}
            </span>
          </div>

          <h1 className="text-gray-900 text-base leading-snug mb-1">{area.area} · 薄弱项详情</h1>
          <p className="text-sm text-gray-500 leading-relaxed">{area.summary}</p>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "当前得分", value: `${area.score} 分` },
              { label: "距均线差值", value: `${area.gap} 分` },
              { label: "当前影响", value: area.impact },
              { label: "建议动作", value: area.action },
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
                <AlertCircle size={15} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">为什么这里会变成薄弱项</span>
              </div>
              <div className="rounded-xl bg-red-50 border border-red-100 p-3 mb-3">
                <p className="text-xs text-red-700 leading-relaxed">{area.reason}</p>
              </div>
              <div className="space-y-3">
                {area.history.map((item) => (
                  <div key={item.label} className="rounded-xl border border-gray-100 p-3">
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{item.score} 分</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">怎么补，系统建议你先做这些</span>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {area.focuses.map((focus) => (
                  <div key={focus.title} className="rounded-xl border border-[#D9E5FF] bg-[#F7FAFF] p-3">
                    <p className="text-sm font-medium text-gray-900 mb-1.5">{focus.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{focus.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {latestReview && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={15} className="text-[#16A34A]" />
                  <span className="text-sm font-medium text-gray-900">最近一次复评反馈</span>
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
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">关联补训任务</span>
              </div>
              <div className="space-y-2.5">
                {tasks.map((task) => (
                  <div key={task.id} className="rounded-xl border border-gray-100 p-3">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <p className="text-sm text-gray-900">{task.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.status === "done"
                          ? "bg-green-100 text-[#16A34A]"
                          : task.status === "in_progress"
                            ? "bg-blue-100 text-[#2F5FD0]"
                            : "bg-gray-100 text-gray-500"
                      }`}>
                        {task.status === "done" ? "已完成" : task.status === "in_progress" ? "进行中" : "待开始"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{task.desc}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{task.deadline}</span>
                      <span>{task.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/learning/growth/retrain")}
                className="mt-3 w-full rounded-xl border border-[#2F5FD0] text-[#2F5FD0] py-2.5 text-sm hover:bg-blue-50 transition-colors"
              >
                查看补训任务页
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">可直接去做</h3>
              <div className="space-y-2">
                {[
                  {
                    title: "先去补学课程",
                    desc: "补掉最关键的版本变更内容",
                    path: area.coursePath,
                    icon: <BookOpen size={14} className="text-[#2F5FD0]" />,
                  },
                  {
                    title: "去补训任务页",
                    desc: "按系统推荐顺序完成这一轮动作",
                    path: "/learning/growth/retrain",
                    icon: <ClipboardList size={14} className="text-orange-600" />,
                  },
                  {
                    title: "看完整复评结果",
                    desc: "确认这轮补训后还有哪些风险点",
                    path: "/learning/growth/review-result",
                    icon: <CheckCircle2 size={14} className="text-green-600" />,
                  },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => navigate(item.path)}
                    className="w-full rounded-xl border border-gray-200 p-3 text-left hover:border-[#2F5FD0]/30 hover:bg-[#FAFBFF] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      {item.icon}
                      <span className="text-sm font-medium text-gray-900">{item.title}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    <span className="text-xs text-[#2F5FD0] mt-2 inline-flex items-center gap-1">
                      立即前往 <ChevronRight size={11} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
