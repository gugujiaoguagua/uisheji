import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  MessageSquareText,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import { getRequestById, statusMeta } from "../data/collabData";

export default function ScoreFeedback() {
  const navigate = useNavigate();
  const { id } = useParams();
  const request = useMemo(() => getRequestById(id), [id]);
  const lowScoreDim = [...request.score.dims].sort((a, b) => a.score - b.score)[0];

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/workbench/collab")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回销设协同
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusMeta[request.status].tone}`}>
                  {statusMeta[request.status].label}
                </span>
                <span className="text-xs text-gray-400">客户：{request.customer}</span>
                <span className="text-xs text-gray-400">讲解人：{request.salesperson}</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">{request.title} · 讲解评分反馈</h1>
              <p className="text-sm text-gray-500 leading-relaxed">这一页单独承接总分、分维度表现、可复用高亮语句和风险语句，方便带教和 AI 讲稿继续往下接。</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/workbench/collab/review/${request.id}`)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                回看会审准备
              </button>
              <button
                onClick={() => navigate("/workbench/collab")}
                className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
              >
                进入 AI 讲稿入口
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "综合总分", value: `${request.score.overall} 分` },
              { label: "评分维度", value: `${request.score.dims.length} 项` },
              { label: "高亮语句", value: `${request.score.highlightLines.length} 条` },
              { label: "风险语句", value: `${request.score.riskLines.length} 条` },
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
                <Star size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">分维度评分</span>
              </div>
              <div className="space-y-3">
                {request.score.dims.map((item) => (
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
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={15} className="text-[#16A34A]" />
                  <span className="text-sm font-medium text-gray-900">高亮语句</span>
                </div>
                <div className="space-y-2">
                  {request.score.highlightLines.map((item) => (
                    <div key={item} className="rounded-xl border border-green-100 bg-green-50 px-3 py-3 text-xs text-green-700 leading-relaxed">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={15} className="text-[#F59E0B]" />
                  <span className="text-sm font-medium text-gray-900">风险语句</span>
                </div>
                <div className="space-y-2">
                  {request.score.riskLines.map((item) => (
                    <div key={item} className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-700 leading-relaxed">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">建议动作</span>
              </div>
              <div className="space-y-2">
                {request.score.recommendedActions.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquareText size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">客户现场表现</span>
              </div>
              <div className="space-y-2">
                {request.score.clientMoments.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <p className="text-xs font-medium text-[#DC2626] mb-1">当前最低分维度</p>
              <p className="text-sm text-red-700">{lowScoreDim.label} · {lowScoreDim.score} 分</p>
              <p className="text-xs text-red-600 mt-2 leading-relaxed">{lowScoreDim.note}</p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="text-xs font-medium text-[#15803D] mb-1">带教建议</p>
              <p className="text-xs text-[#166534] leading-relaxed">{request.score.coachTip}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">下游承接</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/workbench/collab")}
                  className="w-full py-2.5 rounded-xl bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
                >
                  去 AI 讲稿继续优化
                </button>
                <button
                  onClick={() => navigate(`/workbench/collab/request/${request.id}`)}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  返回客户需求交接页
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
