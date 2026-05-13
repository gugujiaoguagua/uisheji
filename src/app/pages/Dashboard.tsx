import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  BarChart3,
  ClipboardList,
  Clock,
  Database,
  MessageSquare,
  Target,
  Users,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  alertRuleItems,
  closureSteps,
  opsDetailPath,
  personAlerts,
  processMetrics,
  riskItems,
  teamHealth,
} from "../data/communityOpsData";

function stateTone(state: string) {
  if (state === "danger") return "bg-red-50 text-[#DC2626] border-red-100";
  if (state === "warning") return "bg-amber-50 text-[#B45309] border-amber-100";
  return "bg-green-50 text-[#15803D] border-green-100";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"risk" | "nodes" | "team">("risk");

  const highRiskCount = riskItems.filter((item) => item.level === "high").length + personAlerts.filter((item) => item.score < 50).length;
  const warningCount = riskItems.filter((item) => item.level === "medium").length + processMetrics.filter((item) => item.tone.includes("F59E0B")).length;
  const redMetricCount = processMetrics.filter((item) => item.tone.includes("DC2626")).length;
  const averageHealth = Math.round(teamHealth.reduce((sum, item) => sum + item.health, 0) / teamHealth.length);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-[#1E2A3A] px-4 md:px-6 pt-4 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-white mb-1">社区运营异常看板</h1>
              <p className="text-white/70 text-sm leading-relaxed">第一屏先暴露异常、口径问题和责任对象，再进入风险名单或任务闭环。</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => navigate("/workbench/content-ops")}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs transition-colors"
              >
                社区运营工作台
              </button>
              <button
                onClick={() => navigate("/workbench/dashboard/business")}
                className="px-3 py-1.5 rounded-lg bg-white text-[#1E2A3A] text-xs transition-colors"
              >
                打开运营总览
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            {[
              { label: "红色风险", value: `${highRiskCount}`, color: "text-red-300", bg: "bg-red-500/20 border border-red-400/30" },
              { label: "黄色预警", value: `${warningCount}`, color: "text-amber-300", bg: "bg-amber-500/20 border border-amber-400/30" },
              { label: "红色指标", value: `${redMetricCount}`, color: "text-red-200", bg: "bg-white/10 border border-white/10" },
              { label: "团队健康均值", value: `${averageHealth}`, color: "text-white", bg: "bg-white/10 border border-white/10" },
            ].map((s) => (
              <div key={s.label} className={`rounded-lg px-3 py-3 text-center ${s.bg}`}>
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-white/60 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-4">
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-4 overflow-x-auto hide-scrollbar">
          {[
            { key: "risk", label: "风险对象 & 动作" },
            { key: "nodes", label: "指标规则 & 闭环" },
            { key: "team", label: "团队全览" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "risk" | "nodes" | "team")}
              className={`min-w-[120px] flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key ? "bg-[#2F5FD0] text-white" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "risk" && (
          <div className="space-y-4">
            <div className="grid lg:grid-cols-3 gap-3">
              {personAlerts.map((person) => (
                <button
                  key={person.id}
                  onClick={() => navigate(opsDetailPath("person", person.id))}
                  className="bg-white rounded-xl shadow-sm p-4 text-left border border-red-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-gray-900">{person.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-[#DC2626]">人员预警</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{person.role} · {person.team}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#DC2626]">{person.score}</div>
                      <div className="text-xs text-gray-400">健康分</div>
                    </div>
                  </div>
                  <p className="text-sm text-[#DC2626] mt-3">{person.alert}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{person.trigger}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {person.metrics.map((metric) => (
                      <span key={metric.label} className={`text-xs px-2 py-1 rounded-full ${metric.state === "danger" ? "bg-red-100 text-[#DC2626]" : metric.state === "warning" ? "bg-amber-100 text-[#B45309]" : "bg-green-100 text-[#15803D]"}`}>
                        {metric.label} {metric.value}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              {riskItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(opsDetailPath("community", item.id))}
                  className="bg-white rounded-xl shadow-sm p-4 text-left border hover:shadow-md transition-all"
                  style={{ borderColor: item.level === "high" ? "#FECACA" : "#FDE68A" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${item.level === "high" ? "bg-red-100 text-[#DC2626]" : "bg-amber-100 text-[#B45309]"}`}>
                        {item.level === "high" ? "高风险小区" : "需关注"}
                      </span>
                      <h2 className="text-sm font-medium text-gray-900 mt-2">{item.target}</h2>
                      <p className="text-xs text-gray-500 mt-1">{item.owner}</p>
                    </div>
                    <AlertTriangle size={16} className={item.level === "high" ? "text-[#DC2626]" : "text-[#F59E0B]"} />
                  </div>
                  <p className="text-sm text-gray-700 mt-3">{item.risk}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.metric}</p>
                  <div className="mt-3 rounded-lg bg-[#F8FAFC] px-3 py-2 text-xs text-gray-600">建议动作：{item.action}</div>
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <button
                onClick={() => navigate("/workbench/dashboard/risk")}
                className="rounded-xl bg-[#DC2626] text-white px-4 py-3 text-left hover:bg-red-700 transition-colors"
              >
                <MessageSquare size={16} className="mb-2" />
                <p className="text-sm font-medium">进入风险名单</p>
                <p className="text-xs text-white/75 mt-1">按小区、门店、人员和转化类型继续筛选。</p>
              </button>
              <button
                onClick={() => navigate("/workbench/dashboard/tasks")}
                className="rounded-xl bg-[#2F5FD0] text-white px-4 py-3 text-left hover:bg-[#2550B8] transition-colors"
              >
                <ClipboardList size={16} className="mb-2" />
                <p className="text-sm font-medium">拆成运营任务</p>
                <p className="text-xs text-white/75 mt-1">每条异常必须有责任人、截止时间和回执口径。</p>
              </button>
            </div>
          </div>
        )}

        {activeTab === "nodes" && (
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Database size={16} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">核心指标预警规则</span>
              </div>
              <div className="space-y-3">
                {alertRuleItems.map((rule) => (
                  <div key={rule.id} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-3">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <p className="text-sm font-medium text-gray-900">{rule.metric}</p>
                      <p className="text-xs text-gray-400">{rule.source} · {rule.owner}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 mt-3">
                      <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-xs text-[#DC2626]">红色：{rule.redRule}</div>
                      <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2 text-xs text-[#B45309]">黄色：{rule.amberRule}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={16} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">动作闭环</span>
                </div>
                <div className="space-y-2">
                  {closureSteps.map((step, index) => (
                    <div key={step.id} className={`rounded-xl border px-3 py-3 ${stateTone(step.state)}`}>
                      <p className="text-xs opacity-80">步骤 {index + 1} · {step.owner}</p>
                      <p className="text-sm font-medium mt-1 text-gray-900">{step.step}</p>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{step.output}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={16} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">团队健康分</span>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamHealth} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                    <XAxis dataKey="team" tick={{ fontSize: 12, fill: "#6B7280" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} domain={[0, 100]} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(value: number) => [`${value}`, "健康分"]} />
                    <Bar dataKey="health" radius={[4, 4, 0, 0]}>
                      {teamHealth.map((entry) => (
                        <Cell key={entry.team} fill={entry.health < 50 ? "#DC2626" : entry.health < 70 ? "#F59E0B" : "#16A34A"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users size={16} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">团队风险拆解</span>
              </div>
              <div className="space-y-3">
                {teamHealth.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => navigate(opsDetailPath("team", team.id))}
                    className="w-full rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-left hover:bg-[#F7FAFF] hover:border-[#D9E5FF] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-gray-900">{team.team}</p>
                      <span className={team.health < 50 ? "text-sm font-bold text-[#DC2626]" : team.health < 70 ? "text-sm font-bold text-[#F59E0B]" : "text-sm font-bold text-[#16A34A]"}>
                        {team.health}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">负责人：{team.owner} · 红色 {team.red} / 黄色 {team.warning}</p>
                    <p className="text-xs text-gray-600 mt-2">主风险：{team.mainRisk}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
