import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Database,
  Flag,
  GitBranch,
  Layers,
  MapPin,
  Target,
  UserRound,
} from "lucide-react";
import {
  conversionCards,
  alertRuleItems,
  closureSteps,
  dataQualityItems,
  enablementStages,
  methodItems,
  opsDetailPath,
  personAlerts,
  processMetrics,
  resourceRows,
  riskItems,
  summaryCards,
  teamHealth,
} from "../data/communityOpsData";

type OpsView = "overview" | "resource" | "process" | "governance" | "conversion" | "method" | "enablement";

const resourceKanban = [
  {
    title: "红色预警",
    helper: "资源缺口会影响后续运营",
    tone: "border-red-100 bg-red-50",
    items: resourceRows.filter((row) => row.status === "高风险"),
  },
  {
    title: "需补充",
    helper: "本周补开拓动作",
    tone: "border-amber-100 bg-amber-50",
    items: resourceRows.filter((row) => row.status === "需补充"),
  },
  {
    title: "稳定推进",
    helper: "持续观察转化指标",
    tone: "border-green-100 bg-green-50",
    items: resourceRows.filter((row) => row.status === "稳定"),
  },
];

function riskTone(level: string) {
  return level === "high" ? "bg-red-50 text-[#DC2626] border-red-100" : "bg-amber-50 text-[#B45309] border-amber-100";
}

function healthTone(score: number) {
  if (score < 50) return "bg-red-50 text-[#DC2626] border-red-100";
  if (score < 70) return "bg-amber-50 text-[#B45309] border-amber-100";
  return "bg-green-50 text-[#15803D] border-green-100";
}

function metricTone(state: string) {
  if (state === "danger") return "bg-red-100 text-[#DC2626]";
  if (state === "warning") return "bg-amber-100 text-[#B45309]";
  return "bg-green-100 text-[#15803D]";
}

function stateBorderTone(state: string) {
  if (state === "danger") return "border-red-100 bg-red-50 text-[#DC2626]";
  if (state === "warning") return "border-amber-100 bg-amber-50 text-[#B45309]";
  return "border-green-100 bg-green-50 text-[#15803D]";
}

function methodIcon(icon: string) {
  if (icon === "layers") return <Layers size={16} />;
  if (icon === "flag") return <Flag size={16} />;
  if (icon === "book") return <BookOpen size={16} />;
  return <GitBranch size={16} />;
}

export default function ContentOps() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<OpsView>("overview");

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-gray-900">社区运营工作台</h1>
              <p className="text-sm text-gray-500 mt-1">
                围绕资源开拓、运营过程、转化节点和异常风险，先让运营负责人看到问题，再进入明细处理。
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => navigate("/workbench/dashboard/risk")}
                className="px-3 py-2 rounded-lg border border-red-100 bg-red-50 text-sm text-[#DC2626] hover:bg-red-100 transition-colors"
              >
                查看风险名单
              </button>
              <button
                onClick={() => navigate("/workbench/dashboard/tasks")}
                className="px-3 py-2 rounded-lg bg-[#2F5FD0] text-sm text-white hover:bg-[#2550B8] transition-colors"
              >
                进入运营任务
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {summaryCards.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(opsDetailPath("metric", item.id))}
              className={`rounded-xl border px-4 py-3 shadow-sm text-left hover:shadow-md hover:-translate-y-0.5 transition-all ${item.bg}`}
            >
              <div className={`text-2xl font-bold ${item.tone}`}>{item.value}</div>
              <div className="text-sm text-gray-700 mt-1">{item.label}</div>
              <div className="text-xs text-gray-500 mt-0.5 flex items-center justify-between gap-2">
                <span>{item.helper}</span>
                <ChevronRight size={13} className="text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-1 rounded-xl bg-white p-1 shadow-sm overflow-x-auto hide-scrollbar">
          {[
            { key: "overview", label: "异常总览" },
            { key: "resource", label: "资源开拓" },
            { key: "process", label: "运营过程" },
            { key: "governance", label: "数据治理" },
            { key: "conversion", label: "转化管理" },
            { key: "method", label: "方法沉淀" },
            { key: "enablement", label: "新人培养" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveView(tab.key as OpsView)}
              className={`min-w-[100px] flex-1 rounded-lg px-3 py-2 text-sm transition-colors ${
                activeView === tab.key ? "bg-[#2F5FD0] text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeView === "overview" && (
          <div className="space-y-4">
            <div className="bg-[#1E2A3A] rounded-xl p-4 text-white shadow-sm">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-300" />
                    <span className="text-sm font-medium">人员红色预警</span>
                  </div>
                  <p className="text-xs text-white/60 mt-1">按负责人汇总异常，先看人，再点到门店和小区。</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-red-500/15 text-red-100 border border-red-400/30">3 人需立即介入</span>
              </div>
              <div className="grid lg:grid-cols-3 gap-3">
                {personAlerts.map((person) => (
                  <button
                    key={person.name}
                    onClick={() => navigate(opsDetailPath("person", person.id))}
                    className="rounded-xl border border-red-400/25 bg-white/8 p-4 text-left hover:bg-white/12 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                          <UserRound size={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-base font-semibold">{person.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-100">红色预警</span>
                          </div>
                          <p className="text-xs text-white/55 mt-1">{person.role} · {person.team}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-red-200">{person.score}</div>
                        <div className="text-xs text-white/45">健康分</div>
                      </div>
                    </div>
                    <p className="text-sm text-red-100 mt-3">{person.alert}</p>
                    <p className="text-xs text-white/55 mt-1 leading-relaxed">{person.trigger}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {person.metrics.map((metric) => (
                        <span key={metric.label} className={`text-xs px-2 py-1 rounded-full ${metricTone(metric.state)}`}>
                          {metric.label} {metric.value}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">团队健康热力看板</span>
                  </div>
                  <span className="text-xs text-gray-400">红色越多，越需要负责人介入</span>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {teamHealth.map((team) => (
                    <button
                      key={team.team}
                      onClick={() => navigate(opsDetailPath("team", team.id))}
                      className={`rounded-xl border p-3 text-left hover:shadow-sm transition-all ${healthTone(team.health)}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{team.team}</p>
                          <p className="text-xs text-gray-500 mt-1">负责人：{team.owner} · {team.communities} 个小区</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">{team.health}</div>
                          <div className="text-xs text-gray-400">健康分</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div className="rounded-lg bg-white px-2 py-2">
                          <p className="text-lg font-bold text-[#DC2626]">{team.red}</p>
                          <p className="text-xs text-gray-500">红色</p>
                        </div>
                        <div className="rounded-lg bg-white px-2 py-2">
                          <p className="text-lg font-bold text-[#F59E0B]">{team.warning}</p>
                          <p className="text-xs text-gray-500">黄色</p>
                        </div>
                        <div className="rounded-lg bg-white px-2 py-2">
                          <p className="text-xs text-gray-500">主风险</p>
                          <p className="text-xs text-gray-700 mt-1 line-clamp-1">{team.mainRisk}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 size={16} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">运营漏斗</span>
                </div>
                <div className="space-y-3">
                  {["资源已开拓 74%", "建群已启动 69%", "群人数达标 68%", "添加微信达标 61%", "QC 达标 54%", "签单达标 58%"].map((item, index) => (
                    <div key={item}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">{item}</span>
                        <span className="text-gray-400">阶段 {index + 1}</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#2F5FD0]"
                          style={{ width: `${Math.max(46, 84 - index * 6)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-[#DC2626]" />
                    <span className="text-sm font-medium text-gray-900">小区异常雷达</span>
                  </div>
                  <span className="text-xs text-gray-400">按小区 / 门店 / 人员继续下钻</span>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {riskItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigate(opsDetailPath("community", item.id))}
                      className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-3 text-left hover:border-[#2F5FD0]/30 hover:bg-[#F7FAFF] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-gray-900">{item.target}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${riskTone(item.level)}`}>
                              {item.level === "high" ? "高风险" : "需关注"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{item.owner}</p>
                          <p className="text-sm text-[#DC2626] mt-2">{item.risk}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.metric}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 mt-1 flex-shrink-0" />
                      </div>
                      <div className="mt-3 rounded-lg bg-white border border-gray-200 px-3 py-2 text-xs text-gray-600">
                        建议动作：{item.action}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList size={16} className="text-[#16A34A]" />
                  <span className="text-sm font-medium text-gray-900">今日动作</span>
                </div>
                <div className="space-y-2">
                  {["补青浦店资源缺口", "催临港星河湾群人数增长", "复盘嘉定云著添加微信动作"].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600">
                      <CheckCircle2 size={13} className="text-[#16A34A]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === "resource" && (
          <div className="grid lg:grid-cols-3 gap-4">
            {resourceKanban.map((column) => (
              <div key={column.title} className={`rounded-xl border p-3 shadow-sm ${column.tone}`}>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className={column.title === "红色预警" ? "text-[#DC2626]" : "text-[#2F5FD0]"} />
                    <span className="text-sm font-medium text-gray-900">{column.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">{column.items.length} 个门店</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">{column.helper}</p>
                <div className="space-y-3">
                  {column.items.map((row) => {
                    const openRate = Math.round((row.opened / row.total) * 100);
                    return (
                      <button
                        key={row.store}
                        onClick={() => navigate(opsDetailPath("store", row.id))}
                        className="w-full rounded-xl bg-white border border-white/70 px-3 py-3 text-left hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{row.store}</p>
                            <p className="text-xs text-gray-500 mt-1">负责人：{row.owner}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            row.status === "高风险" ? "bg-red-100 text-[#DC2626]" : row.status === "需补充" ? "bg-amber-100 text-[#B45309]" : "bg-green-100 text-[#15803D]"
                          }`}>
                            {row.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          <div className="rounded-lg bg-[#F8FAFC] px-2 py-2">
                            <p className="text-sm font-bold text-gray-900">{row.total}</p>
                            <p className="text-xs text-gray-500">总资源</p>
                          </div>
                          <div className="rounded-lg bg-[#F8FAFC] px-2 py-2">
                            <p className="text-sm font-bold text-[#2F5FD0]">{openRate}%</p>
                            <p className="text-xs text-gray-500">开拓率</p>
                          </div>
                          <div className="rounded-lg bg-[#F8FAFC] px-2 py-2">
                            <p className={`text-sm font-bold ${row.shortage > 0 ? "text-[#DC2626]" : "text-[#16A34A]"}`}>{row.shortage}</p>
                            <p className="text-xs text-gray-500">缺口</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={16} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">资源开拓健康分布</span>
              </div>
              <div className="grid md:grid-cols-4 gap-3">
                {resourceRows.map((row) => {
                  const openRate = Math.round((row.opened / row.total) * 100);
                  return (
                    <button
                      key={`${row.store}-mini`}
                      onClick={() => navigate(opsDetailPath("store", row.id))}
                      className="rounded-xl border border-gray-200 p-3 text-left hover:border-[#2F5FD0]/30 hover:bg-[#F7FAFF] transition-colors"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-900">{row.store}</span>
                        <span className={openRate < 70 ? "text-[#DC2626]" : "text-[#16A34A]"}>{openRate}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden mt-3">
                        <div className={openRate < 70 ? "h-full bg-[#DC2626]" : "h-full bg-[#16A34A]"} style={{ width: `${openRate}%` }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeView === "process" && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-5 gap-3">
              {processMetrics.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(opsDetailPath("metric", item.id))}
                  className="bg-white rounded-xl shadow-sm p-4 text-left hover:shadow-md transition-all"
                >
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <div className={`text-2xl font-bold mt-2 ${item.tone}`}>{item.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.target}</div>
                  <div className="text-xs text-gray-500 mt-3 flex items-center justify-between gap-2">
                    <span>较目标 {item.trend}</span>
                    <ChevronRight size={13} className="text-gray-300" />
                  </div>
                </button>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList size={16} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">发现异常后的动作闭环</span>
              </div>
              <div className="grid md:grid-cols-5 gap-3">
                {closureSteps.map((step, index) => (
                  <div key={step.id} className={`rounded-xl border px-3 py-3 ${stateBorderTone(step.state)}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/70">步骤 {index + 1}</span>
                      <span className="text-xs">{step.owner}</span>
                    </div>
                    <p className="text-sm font-medium mt-3 text-gray-900">{step.step}</p>
                    <p className="text-xs mt-2 leading-relaxed text-gray-600">{step.output}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === "governance" && (
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                  <div className="flex items-center gap-2">
                    <Database size={16} className="text-[#DC2626]" />
                    <span className="text-sm font-medium text-gray-900">数据来源与口径校验</span>
                  </div>
                  <span className="text-xs text-gray-400">先解决跨表对不上，再谈图表看板</span>
                </div>
                <div className="space-y-3">
                  {dataQualityItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigate(opsDetailPath("metric", "data-quality"))}
                      className="w-full rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-3 text-left hover:border-[#2F5FD0]/30 hover:bg-[#F7FAFF] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${stateBorderTone(item.state)}`}>
                              {item.state === "danger" ? "需对账" : item.state === "warning" ? "待补字段" : "正常"}
                            </span>
                            <span className="text-sm font-medium text-gray-900">{item.field}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">{item.source}</p>
                          <p className="text-xs text-gray-700 mt-2 leading-relaxed">{item.issue}</p>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          <p>{item.owner}</p>
                          <p className="mt-1">{item.updateCycle}</p>
                        </div>
                      </div>
                      <div className="mt-3 rounded-lg bg-white border border-gray-200 px-3 py-2 text-xs text-gray-600">
                        校验动作：{item.action}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={16} className="text-[#DC2626]" />
                  <span className="text-sm font-medium text-gray-900">异常判定规则</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[860px] text-sm">
                    <thead className="bg-[#F8FAFC] text-xs text-gray-500">
                      <tr>
                        <th className="px-3 py-3 text-left font-medium">指标</th>
                        <th className="px-3 py-3 text-left font-medium">红色规则</th>
                        <th className="px-3 py-3 text-left font-medium">黄色规则</th>
                        <th className="px-3 py-3 text-left font-medium">来源</th>
                        <th className="px-3 py-3 text-left font-medium">责任方</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {alertRuleItems.map((rule) => (
                        <tr key={rule.id} className="hover:bg-[#FAFBFC]">
                          <td className="px-3 py-3 font-medium text-gray-900">{rule.metric}</td>
                          <td className="px-3 py-3 text-[#DC2626]">{rule.redRule}</td>
                          <td className="px-3 py-3 text-[#B45309]">{rule.amberRule}</td>
                          <td className="px-3 py-3 text-gray-600">{rule.source}</td>
                          <td className="px-3 py-3 text-gray-600">{rule.owner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1E2A3A] rounded-xl shadow-sm p-4 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Database size={16} className="text-red-200" />
                  <span className="text-sm font-medium">本周治理重点</span>
                </div>
                <div className="space-y-2 text-xs text-white/75 leading-relaxed">
                  <div className="rounded-xl bg-white/8 border border-white/10 px-3 py-3">群人数、添加微信先做明细与汇总一致性校验。</div>
                  <div className="rounded-xl bg-white/8 border border-white/10 px-3 py-3">QC 必须先补总户数，否则不能进入目标达成率。</div>
                  <div className="rounded-xl bg-white/8 border border-white/10 px-3 py-3">样板间要同时补开放时间和宣传记录。</div>
                </div>
              </div>
              <button
                onClick={() => navigate("/workbench/dashboard/tasks")}
                className="w-full rounded-xl bg-[#2F5FD0] px-4 py-3 text-left text-white hover:bg-[#2550B8] transition-colors"
              >
                <p className="text-sm font-medium">把口径异常拆成任务</p>
                <p className="text-xs text-white/70 mt-1">进入运营动作任务页，追踪负责人和回执。</p>
              </button>
            </div>
          </div>
        )}

        {activeView === "conversion" && (
          <div className="grid md:grid-cols-3 gap-4">
            {conversionCards.map((item) => (
              <button
                key={item.title}
                onClick={() => navigate(opsDetailPath("conversion", item.id))}
                className="bg-white rounded-xl shadow-sm p-4 text-left hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">{item.title}</span>
                  </div>
                  <span className="text-lg font-bold text-[#2F5FD0]">{item.value}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed min-h-[44px]">{item.desc}</p>
                <div className="mt-4 text-sm text-[#2F5FD0] flex items-center gap-1">
                  {item.action} <ChevronRight size={13} />
                </div>
              </button>
            ))}
          </div>
        )}

        {activeView === "method" && (
          <div className="grid md:grid-cols-2 gap-4">
            {methodItems.map((item) => (
              <button
                key={item.title}
                onClick={() => navigate(opsDetailPath("method", item.id))}
                className="bg-white rounded-xl shadow-sm p-4 text-left hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] text-[#2F5FD0] flex items-center justify-center flex-shrink-0">
                    {methodIcon(item.icon)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-sm font-medium text-gray-900">{item.title}</h2>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{item.count}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 mt-1 flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        )}

        {activeView === "enablement" && (
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">运营新人阶段培养</span>
                </div>
                <span className="text-xs text-gray-400">按能力释放，不一次性把所有工作压给新人</span>
              </div>
              <div className="space-y-3">
                {enablementStages.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => navigate(opsDetailPath("method", "talent-path"))}
                    className="w-full rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-3 text-left hover:border-[#2F5FD0]/30 hover:bg-[#F7FAFF] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${stateBorderTone(stage.state)}`}>
                            {stage.stage}
                          </span>
                          <span className="text-sm font-medium text-gray-900">{stage.capability}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">资料：{stage.material}</p>
                        <p className="text-xs text-gray-700 mt-2">释放门槛：{stage.gate}</p>
                      </div>
                      <div className="w-28 flex-shrink-0">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-400">进度</span>
                          <span className={stage.state === "danger" ? "text-[#DC2626]" : stage.state === "warning" ? "text-[#B45309]" : "text-[#15803D]"}>
                            {stage.progress}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className={stage.state === "danger" ? "h-full bg-[#DC2626]" : stage.state === "warning" ? "h-full bg-[#F59E0B]" : "h-full bg-[#16A34A]"}
                            style={{ width: `${stage.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={16} className="text-[#16A34A]" />
                  <span className="text-sm font-medium text-gray-900">资料整合入口</span>
                </div>
                <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
                  <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">小红书开拓、勘探流程和资源台账放在资源开拓阶段。</div>
                  <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">数据查看、指标含义和异常判断放在运营规划阶段。</div>
                  <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">直播、视频号直播、活动复盘放在活动筹备阶段。</div>
                </div>
              </div>
              <button
                onClick={() => navigate("/learning")}
                className="w-full rounded-xl border border-[#D9E5FF] bg-[#F7FAFF] px-4 py-3 text-left hover:bg-[#EEF4FF] transition-colors"
              >
                <p className="text-sm font-medium text-[#2F5FD0]">去学习中心看运营课程</p>
                <p className="text-xs text-gray-500 mt-1">承接新人资料，不在工作台重复堆课件。</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
