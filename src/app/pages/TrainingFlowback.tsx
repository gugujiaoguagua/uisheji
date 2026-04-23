import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  History,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { getTrainingFlowbackDetailByOrderId } from "../data/trainingFlowbackDetailData";
import { flowTone, getOrderById } from "../data/orderReviewData";

const publishToneMap = {
  done: "border-green-100 bg-green-50 text-green-700",
  scheduled: "border-[#D9E5FF] bg-[#F7FAFF] text-[#2F5FD0]",
  blocked: "border-red-100 bg-red-50 text-red-700",
} as const;

const publishLabelMap = {
  done: "已发布",
  scheduled: "待执行",
  blocked: "受阻",
} as const;

const completionToneMap = {
  good: "border-green-100 bg-green-50 text-green-700",
  attention: "border-amber-100 bg-amber-50 text-amber-700",
  risk: "border-red-100 bg-red-50 text-red-700",
} as const;

const completionLabelMap = {
  good: "完成稳定",
  attention: "需要跟进",
  risk: "高风险",
} as const;

const retestToneMap = {
  pass: "border-green-100 bg-green-50 text-green-700",
  pending: "border-[#D9E5FF] bg-[#F7FAFF] text-[#2F5FD0]",
  risk: "border-red-100 bg-red-50 text-red-700",
} as const;

const retestLabelMap = {
  pass: "已通过",
  pending: "待复测",
  risk: "未达标",
} as const;

export default function TrainingFlowback() {
  const navigate = useNavigate();
  const { id } = useParams();
  const order = useMemo(() => getOrderById(id), [id]);
  const detail = useMemo(() => getTrainingFlowbackDetailByOrderId(order.id), [order.id]);
  const latestRetest = detail.retestResults[0];

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/workbench/order-review")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回审单回流工作台
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${order.canFlowback ? "bg-[#EEF4FF] text-[#2F5FD0]" : "bg-green-100 text-[#15803D]"}`}>
                  {order.canFlowback ? "可回流培训" : "无需回流"}
                </span>
                <span className="text-xs text-gray-400">责任视角：{order.ownerView}</span>
                <span className="text-xs text-gray-400">当前阶段：{order.stage}</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">{order.orderNo} · 培训回流</h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                把问题回流到课程、题库、AI 陪练、错误库和带教动作里，并继续追发布是否完成、学习是否学完、复测是否真正纠正。
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/workbench/order-review/attribution/${order.id}`)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                回看售后归因
              </button>
              <button
                onClick={() => navigate("/workbench/content-ops")}
                className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
              >
                去培训运营执行
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "回流目标", value: `${order.trainingFlowback.targets.length} 项` },
              { label: "发布动作", value: `${order.trainingFlowback.publishActions.length} 条` },
              { label: "预期影响", value: `${order.trainingFlowback.expectedImpact.length} 项` },
              { label: "标准缺口", value: order.trainingFlowback.standardGap },
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
                <BookOpen size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">回流总述</span>
              </div>
              <div className={`rounded-xl border px-3 py-3 text-xs leading-relaxed ${order.canFlowback ? "border-[#D9E5FF] bg-[#F7FAFF] text-[#2F5FD0]" : "border-green-100 bg-green-50 text-[#166534]"}`}>
                {order.trainingFlowback.summary}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">回流目标清单</span>
              </div>
              <div className="space-y-3">
                {order.trainingFlowback.targets.map((item) => (
                  <div key={`${item.type}-${item.label}`} className={`rounded-xl border px-3 py-3 ${flowTone(item.status)}`}>
                    <div className="flex items-center justify-between gap-3 text-xs font-medium mb-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span>{item.label}</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/50">{item.type}</span>
                      </div>
                      <span>{item.owner}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{item.note}</p>
                    <p className="text-xs mt-2 opacity-80">计划完成：{item.due}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">发布动作</span>
              </div>
              <div className="space-y-2">
                {order.trainingFlowback.publishActions.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <History size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">回流发布记录</span>
              </div>
              <div className="rounded-xl border border-[#D9E5FF] bg-[#F7FAFF] px-3 py-3 text-xs text-[#2F5FD0] leading-relaxed mb-3">
                {detail.publishSummary}
              </div>
              <div className="space-y-3">
                {detail.publishRecords.map((item) => (
                  <div key={item.id} className={`rounded-xl border px-3 py-3 ${publishToneMap[item.status]}`}>
                    <div className="flex items-center justify-between gap-3 flex-wrap text-xs font-medium mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span>{item.title}</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/70">{item.channel}</span>
                      </div>
                      <span>{publishLabelMap[item.status]}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{item.note}</p>
                    <div className="mt-2 grid sm:grid-cols-2 gap-2 text-[11px] opacity-90">
                      <div className="rounded-lg bg-white/70 px-3 py-2">发布时间：{item.publishedAt}</div>
                      <div className="rounded-lg bg-white/70 px-3 py-2">责任人：{item.owner}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">学习完成反馈</span>
              </div>
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed mb-3">
                {detail.completionSummary}
              </div>
              <div className="space-y-3">
                {detail.completionFeedback.map((item) => (
                  <div key={item.id} className={`rounded-xl border px-3 py-3 ${completionToneMap[item.status]}`}>
                    <div className="flex items-center justify-between gap-3 flex-wrap text-xs font-medium mb-2">
                      <span>{item.audience}</span>
                      <span>{completionLabelMap[item.status]}</span>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2 text-[11px] mb-2 opacity-90">
                      <div className="rounded-lg bg-white/70 px-3 py-2">完成率：{item.completionRate}</div>
                      <div className="rounded-lg bg-white/70 px-3 py-2">已完成：{item.completed}</div>
                      <div className="rounded-lg bg-white/70 px-3 py-2">未完成：{item.pending}</div>
                    </div>
                    <p className="text-xs leading-relaxed">{item.note}</p>
                    <div className="mt-2 rounded-lg bg-white/70 px-3 py-2 text-xs leading-relaxed">下一步：{item.nextAction}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-xs font-medium text-[#B45309] mb-1">标准缺口</p>
              <p className="text-xs text-amber-700 leading-relaxed">{order.trainingFlowback.standardGap}</p>
              <div className={`mt-3 rounded-xl border px-3 py-3 ${retestToneMap[latestRetest.status]}`}>
                <p className="text-[11px] opacity-80 mb-1">当前复测判断</p>
                <p className="text-sm font-medium mb-1">{retestLabelMap[latestRetest.status]} · {latestRetest.current}</p>
                <p className="text-xs leading-relaxed opacity-90">{latestRetest.note}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-[#16A34A]" />
                <span className="text-sm font-medium text-gray-900">预期影响</span>
              </div>
              <div className="space-y-2">
                {order.trainingFlowback.expectedImpact.map((item) => (
                  <div key={item} className="rounded-xl border border-green-100 bg-green-50 px-3 py-3 text-xs text-green-700 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">复测结果追踪</span>
              </div>
              <div className="space-y-3">
                {detail.retestResults.map((item) => (
                  <div key={item.id} className={`rounded-xl border px-3 py-3 ${retestToneMap[item.status]}`}>
                    <div className="flex items-center justify-between gap-3 text-xs font-medium mb-2">
                      <span>{item.title}</span>
                      <span>{retestLabelMap[item.status]}</span>
                    </div>
                    <div className="grid gap-2 text-[11px] opacity-90 mb-2">
                      <div className="rounded-lg bg-white/70 px-3 py-2">目标：{item.target}</div>
                      <div className="rounded-lg bg-white/70 px-3 py-2">当前：{item.current}</div>
                      <div className="rounded-lg bg-white/70 px-3 py-2">责任人：{item.owner}</div>
                    </div>
                    <p className="text-xs leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                闭环判断：{detail.closureRule}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-sm font-medium text-gray-900 mb-3">下游承接</p>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/workbench/content-ops")}
                  className="w-full py-2.5 rounded-xl bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
                >
                  去培训运营执行回流
                </button>
                <button
                  onClick={() => navigate("/learning/growth/retest-makeup")}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  去复测 / 补考页看结果
                </button>
                <button
                  onClick={() => navigate("/workbench/info-sync")}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  去信息同步中心看源问题
                </button>
                <button
                  onClick={() => navigate(`/workbench/order-review/attribution/${order.id}`)}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  返回售后归因页
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3">
              <p className="text-sm font-medium text-[#15803D] mb-1">本页已补齐培训回流后段追踪</p>
              <p className="text-xs text-green-700 leading-relaxed">
                现在已经承接回流发布记录、学习完成反馈和复测结果追踪，后续可以直接从这张页判断回流有没有真正生效。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
