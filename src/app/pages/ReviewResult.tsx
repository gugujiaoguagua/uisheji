import { useNavigate } from "react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Sparkles,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import { reviewResults, weakAreas } from "../data/growthData";

export default function ReviewResult() {
  const navigate = useNavigate();
  const improvedCount = reviewResults.filter((item) => item.status === "improved").length;
  const watchCount = reviewResults.filter((item) => item.status === "watch").length;

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

          <h1 className="text-gray-900 mb-0.5">复评结果</h1>
          <p className="text-sm text-gray-500">补训之后不只看分数，还要看旧问题有没有真正被纠正。</p>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "本轮复评", value: `${reviewResults.length} 项` },
              { label: "明显提升", value: `${improvedCount} 项` },
              { label: "继续观察", value: `${watchCount} 项` },
              { label: "建议下一步", value: "先稳表达，再做复测" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-[#F7FAFF] border border-[#D9E5FF] p-3">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className="text-sm font-medium text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          {reviewResults.map((review) => {
            const area = weakAreas.find((item) => item.id === review.weakAreaId);
            return (
              <div key={review.id} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="text-sm font-medium text-gray-900">{review.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        review.status === "improved" ? "bg-green-100 text-[#16A34A]" : "bg-amber-100 text-amber-700"
                      }`}>
                        {review.status === "improved" ? "提升明显" : "继续观察"}
                      </span>
                      {area && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">来源：{area.area}</span>}
                    </div>
                    <p className="text-xs text-gray-400">{review.reviewedAt} · {review.reviewer}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/learning/growth/weak-area/${review.weakAreaId}`)}
                    className="text-xs text-[#2F5FD0] hover:text-[#2550B8]"
                  >
                    查看对应薄弱项 →
                  </button>
                </div>

                <div className={`rounded-xl p-3 mb-3 ${review.status === "improved" ? "bg-green-50 border border-green-100" : "bg-amber-50 border border-amber-100"}`}>
                  <p className={`text-sm ${review.status === "improved" ? "text-green-800" : "text-amber-800"}`}>{review.summary}</p>
                  <p className={`text-xs mt-1 ${review.status === "improved" ? "text-green-700" : "text-amber-700"}`}>下一步：{review.nextAction}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-3 mb-3">
                  {review.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-xl bg-[#F8FAFC] border border-gray-100 p-3">
                      <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
                      <p className="text-sm text-gray-900">
                        {metric.before} → <span className="font-medium text-[#16A34A]">{metric.after}</span>
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-green-100 bg-green-50 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-[#16A34A]" />
                      <span className="text-sm font-medium text-green-900">本轮亮点</span>
                    </div>
                    <div className="space-y-1.5">
                      {review.highlights.map((item) => (
                        <div key={item} className="text-xs text-green-800 leading-relaxed">- {item}</div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TriangleAlert size={14} className="text-amber-700" />
                      <span className="text-sm font-medium text-amber-900">仍需关注</span>
                    </div>
                    <div className="space-y-1.5">
                      {review.risks.map((item) => (
                        <div key={item} className="text-xs text-amber-800 leading-relaxed">- {item}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">怎么看这页</span>
            </div>
            <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
              <div className="rounded-xl bg-[#F7FAFF] border border-[#D9E5FF] p-3">
                先看 <span className="text-gray-900 font-medium">总结</span>，确认这轮补训有没有把旧问题纠掉。
              </div>
              <div className="rounded-xl bg-green-50 border border-green-100 p-3">
                再看 <span className="text-gray-900 font-medium">亮点</span>，知道哪些动作有效，后续继续保持。
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-100 p-3">
                最后看 <span className="text-gray-900 font-medium">仍需关注</span>，避免以为分数上来了就完全没问题。
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">下一步常用入口</span>
            </div>
            <div className="space-y-2">
              {[
                { title: "继续补训任务", path: "/learning/growth/retrain", icon: <ClipboardList size={14} className="text-[#2F5FD0]" /> },
                { title: "回到考核验证", path: "/learning/assessment", icon: <CheckCircle2 size={14} className="text-green-600" /> },
                { title: "回成长总览", path: "/learning/growth", icon: <TrendingUp size={14} className="text-orange-600" /> },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-700 hover:border-[#2F5FD0]/30 hover:bg-[#FAFBFF] transition-colors"
                >
                  {item.icon}
                  <span>{item.title}</span>
                  <ChevronRight size={14} className="ml-auto text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
