import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  BarChart3,
  Clock,
  MessageSquare,
  Phone,
  Send,
  Target,
  Users,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  completionData,
  keyNodes,
  riskMembers,
  riskMeta,
  teamMembers,
  type RiskMember,
} from "../data/dashboardData";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<RiskMember | null>(null);
  const [activeTab, setActiveTab] = useState<"risk" | "team" | "nodes">("risk");

  const highRiskCount = riskMembers.filter((item) => item.risk === "high").length;
  const mediumRiskCount = riskMembers.filter((item) => item.risk === "medium").length;
  const averageCompletion = Math.round(teamMembers.reduce((sum, item) => sum + item.completionRate, 0) / teamMembers.length);
  const totalPractice = teamMembers.reduce((sum, item) => sum + item.practiceCount, 0);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-[#1E2A3A] px-4 md:px-6 pt-4 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-white mb-1">带教看板</h1>
              <p className="text-white/70 text-sm leading-relaxed">第一屏先给动作，不是先给图表</p>
            </div>
            <button
              onClick={() => navigate("/workbench/dashboard/business")}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs transition-colors"
            >
              打开经营总览
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            {[
              { label: "高风险", value: `${highRiskCount}`, color: "text-red-300", bg: "bg-red-500/20" },
              { label: "中风险", value: `${mediumRiskCount}`, color: "text-amber-300", bg: "bg-amber-500/20" },
              { label: "完成率均值", value: `${averageCompletion}%`, color: "text-white", bg: "bg-white/10" },
              { label: "本周陪练总次数", value: `${totalPractice}`, color: "text-white", bg: "bg-white/10" },
            ].map((s) => (
              <div key={s.label} className={`rounded-lg px-3 py-3 text-center ${s.bg}`}>
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-white/60 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-4">
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-4">
          {[
            { key: "risk", label: "风险名单 & 动作" },
            { key: "nodes", label: "节点预警" },
            { key: "team", label: "团队全览" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "risk" | "team" | "nodes")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key ? "bg-[#2F5FD0] text-white" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            {activeTab === "risk" && (
              <>
                {riskMembers.map((member) => {
                  const meta = riskMeta[member.risk];
                  return (
                    <div
                      key={member.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
                      onClick={() => setSelectedMember(selectedMember?.id === member.id ? null : member)}
                      style={{ borderLeft: `3px solid ${meta.border}` }}
                    >
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 ${meta.avatar}`}>
                            {member.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-base font-medium text-gray-900">{member.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded font-medium ${meta.pill}`}>{meta.label}</span>
                              <span className="text-sm text-gray-400">{member.role}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2.5 leading-relaxed">{member.detail}</p>
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-gray-400">完成率</span>
                                  <span className={`text-sm font-medium ${member.completionRate < 50 ? "text-[#DC2626]" : "text-[#F59E0B]"}`}>
                                    {member.completionRate}%
                                  </span>
                                </div>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      width: `${member.completionRate}%`,
                                      backgroundColor: member.completionRate < 50 ? "#DC2626" : "#F59E0B",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-start gap-2 bg-[#F5F7FA] rounded-lg p-3">
                          <Target size={13} className="text-[#2F5FD0] flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-600 leading-relaxed">建议动作：{member.suggestedAction}</p>
                          </div>
                          <div className="flex gap-1.5 flex-wrap justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/messages");
                              }}
                              className="flex items-center gap-1 text-sm bg-[#2F5FD0] text-white px-2.5 py-1.5 rounded hover:bg-[#2550B8] transition-colors"
                            >
                              <MessageSquare size={10} /> 发消息
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/workbench/dashboard/risk");
                              }}
                              className="flex items-center gap-1 text-sm bg-white text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded hover:bg-gray-50 transition-colors"
                            >
                              <Users size={10} /> 风险名单页
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/messages");
                              }}
                              className="flex items-center gap-1 text-sm bg-[#DC2626] text-white px-2.5 py-1.5 rounded hover:bg-red-700 transition-colors"
                            >
                              <Phone size={10} /> 联系
                            </button>
                          </div>
                        </div>

                        {selectedMember?.id === member.id && (
                          <div className="mt-3 pt-3 border-t border-gray-100 grid md:grid-cols-4 grid-cols-2 gap-3 text-center">
                            <div>
                              <div className="text-base font-medium text-gray-700">{member.completionRate}%</div>
                              <div className="text-sm text-gray-400">完成率</div>
                            </div>
                            <div>
                              <div className="text-base font-medium text-gray-700">{member.lastActive}</div>
                              <div className="text-sm text-gray-400">最近活跃</div>
                            </div>
                            <div>
                              <div className="text-base font-medium text-[#DC2626]">{member.weakArea}</div>
                              <div className="text-sm text-gray-400">主要短板</div>
                            </div>
                            <div>
                              <div className="text-base font-medium text-gray-700">{member.pendingTasks} 项</div>
                              <div className="text-sm text-gray-400">待处理任务</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {activeTab === "nodes" && (
              <div className="space-y-3">
                {keyNodes.map((node) => (
                  <div
                    key={node.id}
                    className="bg-white rounded-xl shadow-sm p-4"
                    style={{ borderLeft: `3px solid ${node.urgent ? "#DC2626" : "#F59E0B"}` }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded ${node.urgent ? "bg-red-100 text-[#DC2626]" : "bg-amber-100 text-[#F59E0B]"}`}>
                            {node.urgent ? "紧急" : "预警"}
                          </span>
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <Clock size={10} /> 还有 {node.daysLeft} 天
                          </span>
                        </div>
                        <h3 className="text-base font-medium text-gray-900">{node.event}</h3>
                        <p className="text-sm text-gray-500 mt-1">{node.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          {node.readyCount}
                          <span className="text-base text-gray-400">/{node.totalCount}</span>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">人已就绪</div>
                      </div>
                    </div>

                    <div className="bg-red-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-red-700 flex items-start gap-1.5 leading-relaxed">
                        <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
                        {node.riskNote}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 text-sm py-2 bg-[#DC2626] hover:bg-red-700 text-white rounded transition-colors">
                        推送紧急学习提醒
                      </button>
                      <button
                        onClick={() => navigate("/workbench/dashboard/tasks")}
                        className="flex-1 text-sm py-2 border border-gray-200 text-gray-600 rounded hover:bg-gray-50 transition-colors"
                      >
                        查看带教任务页
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "team" && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-900">团队完成率（本月必修课）</h3>
                </div>
                <div className="p-4">
                  <div className="h-44 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={completionData} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} />
                        <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} domain={[0, 100]} />
                        <Tooltip
                          contentStyle={{ fontSize: 12, borderRadius: 8 }}
                          formatter={(value: number) => [`${value}%`, "完成率"]}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {completionData.map((entry) => (
                            <Cell key={entry.name} fill={entry.risk ? "#DC2626" : "#2F5FD0"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="divide-y divide-gray-50">
                    {teamMembers.map((member) => (
                      <div key={member.name} className="py-2.5 flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 ${
                          member.status === "risk"
                            ? "bg-[#DC2626]"
                            : member.status === "warning"
                              ? "bg-[#F59E0B]"
                              : "bg-[#16A34A]"
                        }`}>
                          {member.name[0]}
                        </div>
                        <span className="text-sm text-gray-700 w-12">{member.name}</span>
                        <div className="flex-1">
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${member.completionRate}%`,
                                backgroundColor:
                                  member.status === "risk" ? "#DC2626" : member.status === "warning" ? "#F59E0B" : "#16A34A",
                              }}
                            />
                          </div>
                        </div>
                        <span className={`text-xs font-medium w-8 text-right ${
                          member.status === "risk"
                            ? "text-[#DC2626]"
                            : member.status === "warning"
                              ? "text-[#F59E0B]"
                              : "text-[#16A34A]"
                        }`}>
                          {member.completionRate}%
                        </span>
                        <span className="text-xs text-gray-400 w-10 text-right">{member.score}分</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900 mb-3">快速动作</p>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2.5 bg-red-50 text-[#DC2626] rounded-lg text-sm hover:bg-red-100 transition-colors">
                  <Send size={13} /> 一键催所有未完成成员
                </button>
                <button
                  onClick={() => navigate("/workbench/dashboard/risk")}
                  className="w-full flex items-center gap-2 px-3 py-2.5 bg-[#EEF4FF] text-[#2F5FD0] rounded-lg text-sm hover:bg-[#DCE8FF] transition-colors"
                >
                  <Users size={13} /> 打开风险名单页
                </button>
                <button
                  onClick={() => navigate("/workbench/dashboard/tasks")}
                  className="w-full flex items-center gap-2 px-3 py-2.5 bg-green-50 text-[#15803D] rounded-lg text-sm hover:bg-green-100 transition-colors"
                >
                  <Target size={13} /> 打开带教任务页
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2.5 bg-[#F5F7FA] text-gray-600 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                  <BarChart3 size={13} /> 导出月度数据
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900 mb-3">本月快照</p>
              <div className="space-y-3">
                {[
                  { label: "团队必修完成率", value: `${averageCompletion}%`, target: "80%", bad: averageCompletion < 80 },
                  { label: "平均考核得分", value: `${Math.round(teamMembers.reduce((sum, item) => sum + item.score, 0) / teamMembers.length)}分`, target: "≥80分", bad: true },
                  { label: "AI 陪练总次数", value: `${totalPractice}次`, target: "目标 30", bad: totalPractice < 30 },
                  { label: "本月高风险人数", value: `${highRiskCount}人`, target: "目标 0", bad: highRiskCount > 0 },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-sm text-gray-500">{stat.label}</span>
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${stat.bad ? "text-[#DC2626]" : "text-[#16A34A]"}`}>{stat.value}</span>
                        <span className="text-sm text-gray-400">/ {stat.target}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
