import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Copy,
  GitBranch,
  History,
  Target,
  TrendingUp,
} from "lucide-react";
import { RiskSummaryCard } from "../components/BusinessBlocks";
import { getAfterSaleAttributionDetailByOrderId } from "../data/afterSaleAttributionDetailData";
import { getOrderById, rootTone } from "../data/orderReviewData";


const trendToneMap = {
  rising: "border-state-danger-border bg-state-danger-panel text-state-danger",
  watch: "border-state-warning-border bg-state-warning-panel text-state-warning-foreground",
  stable: "border-brand-border bg-brand-panel text-brand",
  improving: "border-state-success-border bg-state-success-panel text-state-success-foreground",
} as const;


const trendLabelMap = {
  rising: "上升中",
  watch: "持续关注",
  stable: "相对稳定",
  improving: "已回落",
} as const;

const templateToneMap = {
  current: "border-green-100 bg-green-50 text-green-700",
  updating: "border-amber-100 bg-amber-50 text-amber-700",
  retired: "border-gray-200 bg-[#F6F7F9] text-gray-600",
} as const;

const templateLabelMap = {
  current: "当前使用",
  updating: "更新中",
  retired: "已停用",
} as const;

const reuseToneMap = {
  ready: "border-[#D9E5FF] bg-[#F7FAFF] text-[#2F5FD0]",
  pilot: "border-amber-100 bg-amber-50 text-amber-700",
  pending: "border-gray-200 bg-[#F6F7F9] text-gray-600",
} as const;

const reuseLabelMap = {
  ready: "可直接复用",
  pilot: "试跑中",
  pending: "待补齐",
} as const;

export default function AfterSaleAttribution() {
  const navigate = useNavigate();
  const { id } = useParams();
  const order = useMemo(() => getOrderById(id), [id]);
  const detail = useMemo(() => getAfterSaleAttributionDetailByOrderId(order.id), [order.id]);
  const latestTrend = detail.recurrenceTrend[detail.recurrenceTrend.length - 1];

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
                <span className={`text-xs px-2 py-0.5 rounded-full ${order.afterSale ? "bg-amber-100 text-[#B45309]" : "bg-green-100 text-[#15803D]"}`}>
                  {order.afterSale ? "售后复盘单" : "审单归因单"}
                </span>
                <span className="text-xs text-gray-400">责任视角：{order.ownerView}</span>
                <span className="text-xs text-gray-400">当前阶段：{order.stage}</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">{order.orderNo} · 售后归因</h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                把前端原因、生产原因、安装原因和承诺偏差拆开看，再结合复发趋势和模板历史判断哪些问题会继续反复出现。
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/workbench/order-review/flowback/${order.id}`)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                去培训回流页
              </button>
              <button
                onClick={() => navigate(`/workbench/order-review/annotation/${order.id}`)}
                className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
              >
                回问题标注页
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "归因分类", value: `${order.afterSaleAttribution.categories.length} 类` },
              { label: "恢复动作", value: `${order.afterSaleAttribution.recoveryActions.length} 条` },
              { label: "同步对象", value: `${order.afterSaleAttribution.syncTargets.length} 个` },
              { label: "重复风险", value: order.afterSaleAttribution.repeatRisk },
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
                <AlertTriangle size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">归因结论</span>
              </div>
              <div className={`rounded-xl border px-3 py-3 text-xs leading-relaxed ${order.status === "normal" ? "border-green-100 bg-green-50 text-[#166534]" : "border-amber-100 bg-amber-50 text-[#92400E]"}`}>
                {order.afterSaleAttribution.summary}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">归因拆解</span>
              </div>
              <div className="space-y-3">
                {order.afterSaleAttribution.categories.map((item) => (
                  <div key={item.label} className={`rounded-xl border px-3 py-3 ${rootTone(item.status)}`}>
                    <div className="flex items-center justify-between gap-3 text-xs font-medium mb-2">
                      <span>{item.label}</span>
                      <span>{item.owner}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{item.note}</p>
                    <div className="mt-2 rounded-lg bg-white/50 px-3 py-2 text-xs leading-relaxed">
                      影响范围：{item.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">复发率趋势</span>
              </div>
              <div className="rounded-xl border border-[#D9E5FF] bg-[#F7FAFF] px-3 py-3 text-xs text-[#2F5FD0] leading-relaxed mb-3">
                {detail.trendSummary}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {detail.recurrenceTrend.map((item) => (
                  <div key={item.id} className={`rounded-xl border px-3 py-3 ${trendToneMap[item.status]}`}>
                    <div className="flex items-center justify-between gap-3 text-xs font-medium mb-2">
                      <span>{item.period}</span>
                      <span>{trendLabelMap[item.status]}</span>
                    </div>
                    <div className="flex items-end justify-between gap-3 mb-2">
                      <div>
                        <p className="text-[11px] opacity-80">异常单量</p>
                        <p className="text-sm font-medium">{item.issueCount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] opacity-80">复发占比</p>
                        <p className="text-base font-semibold">{item.rate}</p>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed opacity-90">{item.note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                闭环判断：{detail.closureRule}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <History size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">模板历史</span>
              </div>
              <div className="space-y-3">
                {detail.templateHistory.map((item) => (
                  <div key={item.id} className={`rounded-xl border px-3 py-3 ${templateToneMap[item.status]}`}>
                    <div className="flex items-center justify-between gap-3 flex-wrap text-xs font-medium mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span>{item.title}</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/70">{item.version}</span>
                      </div>
                      <span>{templateLabelMap[item.status]}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{item.note}</p>
                    <div className="mt-2 grid sm:grid-cols-2 gap-2 text-[11px] opacity-90">
                      <div className="rounded-lg bg-white/70 px-3 py-2">更新时间：{item.updatedAt}</div>
                      <div className="rounded-lg bg-white/70 px-3 py-2">责任人：{item.owner}</div>
                    </div>
                    <div className="mt-2 rounded-lg bg-white/70 px-3 py-2 text-xs leading-relaxed">下一步：{item.nextAction}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <RiskSummaryCard
              tone={latestTrend.status === "improving" ? "green" : latestTrend.status === "stable" ? "blue" : latestTrend.status === "watch" ? "amber" : "red"}
              title="重复风险提醒"
              description={order.afterSaleAttribution.repeatRisk}
              summaryLabel="当前趋势判断"
              summaryValue={`${latestTrend.rate} · ${trendLabelMap[latestTrend.status]}`}
              helperText={latestTrend.note}
            />


            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">恢复动作</span>
              </div>
              <div className="space-y-2">
                {order.afterSaleAttribution.recoveryActions.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Copy size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">归因复用能力</span>
              </div>
              <div className="space-y-3">
                {detail.reuseCards.map((item) => (
                  <div key={item.id} className={`rounded-xl border px-3 py-3 ${reuseToneMap[item.status]}`}>
                    <div className="flex items-center justify-between gap-3 text-xs font-medium mb-2">
                      <span>{item.title}</span>
                      <span>{reuseLabelMap[item.status]}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{item.scenario}</p>
                    <p className="text-xs mt-2 opacity-90">{item.note}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.targets.map((target) => (
                        <span key={target} className="px-2 py-1 rounded-full bg-white/70 text-[11px]">
                          {target}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] mt-2 opacity-80">维护人：{item.owner}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-[#16A34A]" />
                <span className="text-sm font-medium text-gray-900">下游同步</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {order.afterSaleAttribution.syncTargets.map((item) => (
                  <span key={item} className="px-2 py-1 rounded-full bg-[#EEF4FF] text-xs text-[#2F5FD0]">
                    {item}
                  </span>
                ))}
              </div>
              <div className="space-y-2 mt-4">
                <button
                  onClick={() => navigate(`/workbench/order-review/flowback/${order.id}`)}
                  className="w-full py-2.5 rounded-xl bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
                >
                  去培训回流页继续闭环
                </button>
                <button
                  onClick={() => navigate("/workbench/content-ops")}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  去培训运营同步模板
                </button>
                <button
                  onClick={() => navigate("/workbench/info-sync")}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  去信息同步中心追源
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3">
              <p className="text-sm font-medium text-[#15803D] mb-1">本页已补齐售后归因深度信息</p>
              <p className="text-xs text-green-700 leading-relaxed">
                现在已经承接复发率趋势、模板历史和归因复用判断，后续可以直接把结果继续推到培训回流和版本治理链路。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
