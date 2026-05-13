import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  Clock3,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  businessOverviewSummary,
  funnelStages,
  managementActions,
  overtimeNodes,
  staffPerformance,
  storePerformance,
} from "../data/businessOverviewData";

function toneClass(tone: "primary" | "warning" | "danger") {
  if (tone === "danger") return "bg-red-50 border-red-100 text-[#DC2626]";
  if (tone === "warning") return "bg-amber-50 border-amber-100 text-[#B45309]";
  return "bg-[#EEF4FF] border-[#D9E5FF] text-[#2F5FD0]";
}

function actionLevelClass(level: "high" | "medium") {
  return level === "high"
    ? "bg-red-100 text-[#DC2626]"
    : "bg-amber-100 text-[#B45309]";
}

export default function BusinessOverview() {
  const navigate = useNavigate();

  const bestStore = [...storePerformance].sort((a, b) => b.signRate - a.signRate)[0];
  const highestOverdueStore = [...storePerformance].sort((a, b) => b.overtimeNodes - a.overtimeNodes)[0];
  const highestSignStaff = [...staffPerformance].sort((a, b) => b.signRate - a.signRate)[0];
  const highestRiskStaff = [...staffPerformance].sort((a, b) => b.overdueItems - a.overdueItems)[0];

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/workbench/dashboard")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
              <ArrowLeft size={16} /> 返回异常看板
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EEF4FF] text-[#2F5FD0]">社区运营总览</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-[#DC2626]">管理层看盘</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">{businessOverviewSummary.title}</h1>
              <p className="text-sm text-gray-500 leading-relaxed max-w-4xl">{businessOverviewSummary.desc}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate("/workbench/dashboard/risk")}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                去风险名单
              </button>
              <button
                onClick={() => navigate("/workbench/dashboard/tasks")}
                className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
              >
                去运营任务页
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {businessOverviewSummary.stats.map((item) => (
              <div key={item.label} className="rounded-xl bg-white/5 px-3 py-3">
                <p className="text-xs text-white/50 mb-1">{item.label}</p>
                <p className="text-sm text-white leading-relaxed">{item.value}</p>
                <p className="text-xs text-white/40 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">社区运营漏斗</span>
            </div>
            <div className="grid md:grid-cols-5 gap-3">
              {funnelStages.map((item, index) => (
                <div key={item.stage} className={`rounded-xl border px-3.5 py-3 ${toneClass(item.tone)}`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/70">步骤 {index + 1}</span>
                    <span className="text-xs">{item.conversionRate}%</span>
                  </div>
                  <p className="text-sm font-medium">{item.stage}</p>
                  <p className="text-2xl font-bold mt-2">{item.count}</p>
                  <p className="text-xs mt-2 leading-relaxed opacity-90">{item.gapNote}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Building2 size={16} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">门店对比</span>
            </div>
            <div className="space-y-3">
              {storePerformance.map((store) => (
                <div key={store.store} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-3">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="text-sm font-medium text-gray-900">{store.store}</p>
                        {bestStore.store === store.store && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-[#15803D]">运营健康最佳</span>
                        )}
                        {highestOverdueStore.store === store.store && store.overtimeNodes > 0 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-[#DC2626]">风险节点最多</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{store.managerNote}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">运营健康</p>
                      <p className={`text-lg font-semibold ${store.signRate >= 18 ? "text-[#15803D]" : "text-[#DC2626]"}`}>{store.signRate}%</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-2 mt-3">
                    {[
                      { label: "资源总盘", value: `${store.receptionCount}` },
                      { label: "已开拓", value: `${store.quoteCount}` },
                      { label: "签单达标", value: `${store.signCount}` },
                      { label: "风险节点", value: `${store.overtimeNodes}` },
                    ].map((item) => (
                      <div key={item.label} className="rounded-lg bg-white border border-gray-200 px-3 py-2.5">
                        <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                        <p className="text-sm text-gray-700">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">人员对比</span>
            </div>
            <div className="space-y-3">
              {staffPerformance.map((staff) => (
                <div key={staff.name} className="rounded-xl border border-gray-200 px-4 py-3">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="text-sm font-medium text-gray-900">{staff.name}</p>
                        <span className="text-xs text-gray-400">{staff.role} · {staff.store}</span>
                        {highestSignStaff.name === staff.name && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-[#15803D]">推进效率最好</span>
                        )}
                        {highestRiskStaff.name === staff.name && staff.overdueItems > 0 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-[#DC2626]">待跟进较多</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{staff.nextAction}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${staff.overdueItems > 1 ? "bg-red-100 text-[#DC2626]" : "bg-[#EEF4FF] text-[#2F5FD0]"}`}>
                      {staff.riskTag}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-4 gap-2 mt-3">
                    {[
                      { label: "加微率", value: `${staff.addWechatRate}%` },
                      { label: "过程达标", value: `${staff.proposalRate}%` },
                      { label: "签单率", value: `${staff.signRate}%` },
                      { label: "超时项", value: `${staff.overdueItems}` },
                    ].map((item) => (
                      <div key={item.label} className="rounded-lg bg-[#FAFBFC] px-3 py-2.5">
                        <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                        <p className="text-sm text-gray-700">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock3 size={16} className="text-[#F59E0B]" />
              <span className="text-sm font-medium text-gray-900">滞后节点</span>
            </div>
            <div className="space-y-3">
              {overtimeNodes.map((item) => (
                <div key={item.id} className="rounded-xl border border-amber-100 bg-amber-50 px-3.5 py-3">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="text-sm font-medium text-gray-900">{item.orderNo}</p>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-white text-[#B45309]">滞后 {item.overdueDays} 天</span>
                  </div>
                  <p className="text-xs text-gray-500">{item.customer} · {item.stage}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{item.impact}</p>
                  <p className="text-xs text-[#B45309] mt-2 leading-relaxed">建议：{item.suggestedAction}</p>
                  <p className="text-xs text-gray-400 mt-2">负责人：{item.owner}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-[#DC2626]" />
              <span className="text-sm font-medium text-gray-900">管理层介入事项</span>
            </div>
            <div className="space-y-3">
              {managementActions.map((item) => (
                <div key={item.id} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3.5 py-3">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${actionLevelClass(item.level)}`}>
                      {item.level === "high" ? "高优先" : "中优先"}
                    </span>
                    <span className="text-xs text-gray-400">责任方：{item.owner}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 leading-relaxed">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">触发：{item.trigger}</p>
                  <p className="text-xs text-gray-700 mt-2 leading-relaxed">决策：{item.decision}</p>
                  <p className="text-xs text-[#2F5FD0] mt-2 leading-relaxed">跟进：{item.followup}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={16} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">使用提醒</span>
            </div>
            <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
              {businessOverviewSummary.emphasis.map((item) => (
                <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/workbench/dashboard")}
              className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <TrendingUp size={14} className="text-[#2F5FD0] mb-2" />
              <p className="text-sm font-medium text-gray-900">回异常看板</p>
              <p className="text-xs text-gray-500 mt-1">继续看动作盘</p>
            </button>
            <button
              onClick={() => navigate("/messages")}
              className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <ArrowRight size={14} className="text-[#16A34A] mb-2" />
              <p className="text-sm font-medium text-gray-900">去消息中心</p>
              <p className="text-xs text-gray-500 mt-1">推动跨角色跟进</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
