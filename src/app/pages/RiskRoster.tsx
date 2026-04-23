import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Clock,
  MessageSquare,
  Phone,
  Target,
  Users,
} from "lucide-react";
import { keyNodes, riskMembers, riskMeta } from "../data/dashboardData";
import { GlobalStateCard } from "../components/GlobalStateCard";


export default function RiskRoster() {
  const navigate = useNavigate();
  const [levelFilter, setLevelFilter] = useState<"all" | "high" | "medium">("all");
  const [areaFilter, setAreaFilter] = useState("全部");

  const areaOptions = useMemo(() => ["全部", ...new Set(riskMembers.map((item) => item.weakArea))], []);
  const filteredMembers = useMemo(() => {
    return riskMembers.filter((item) => {
      const matchLevel = levelFilter === "all" || item.risk === levelFilter;
      const matchArea = areaFilter === "全部" || item.weakArea === areaFilter;
      return matchLevel && matchArea;
    });
  }, [areaFilter, levelFilter]);

  const highRiskCount = riskMembers.filter((item) => item.risk === "high").length;
  const totalPendingTasks = riskMembers.reduce((sum, item) => sum + item.pendingTasks, 0);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/workbench/dashboard")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回带教看板
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-[#DC2626]">优先干预列表</span>
                <span className="text-xs text-gray-400">第一屏先看人和动作，不先看图表</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">风险名单</h1>
              <p className="text-sm text-gray-500 leading-relaxed">把掉队对象、风险原因、当前节点和建议动作拆成完整列表，方便店长和带教直接分配处理。</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate("/messages")}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                去消息中心批量催办
              </button>
              <button
                onClick={() => navigate("/workbench/dashboard")}
                className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
              >
                回带教看板总览
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "风险人数", value: `${riskMembers.length} 人` },
              { label: "高风险", value: `${highRiskCount} 人` },
              { label: "待跟进任务", value: `${totalPendingTasks} 项` },
              { label: "关键节点", value: `${keyNodes.length} 个` },
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
              <p className="text-sm font-medium text-gray-900 mb-3">筛选视图</p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-2">按风险等级</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "all", label: "全部" },
                      { key: "high", label: "高风险" },
                      { key: "medium", label: "中风险" },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setLevelFilter(item.key as "all" | "high" | "medium")}
                        className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                          levelFilter === item.key ? "bg-[#2F5FD0] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">按主要短板</p>
                  <div className="flex flex-wrap gap-2">
                    {areaOptions.map((item) => (
                      <button
                        key={item}
                        onClick={() => setAreaFilter(item)}
                        className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                          areaFilter === item ? "bg-[#EEF4FF] text-[#2F5FD0]" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => {
                const meta = riskMeta[member.risk];
                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl shadow-sm p-4"
                    style={{ borderLeft: `3px solid ${meta.border}` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 ${meta.avatar}`}>
                        {member.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-base font-medium text-gray-900">{member.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${meta.pill}`}>{meta.label}</span>
                          <span className="text-sm text-gray-400">{member.role}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{member.detail}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {member.riskTags.map((tag) => (
                            <span key={tag} className="px-2 py-1 rounded-full bg-[#F5F7FA] text-xs text-gray-600">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="grid md:grid-cols-3 gap-3 mt-4">
                          {[
                            { label: "完成率", value: `${member.completionRate}%` },
                            { label: "待处理任务", value: `${member.pendingTasks} 项` },
                            { label: "下一关键节点", value: member.upcomingNode },
                          ].map((item) => (
                            <div key={item.label} className="rounded-xl bg-[#F8FAFC] px-3 py-3">
                              <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                              <p className="text-sm text-gray-700 leading-relaxed">{item.value}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 rounded-xl border border-[#D9E5FF] bg-[#F7FAFF] px-3 py-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Target size={14} className="text-[#2F5FD0]" />
                            <span className="text-sm font-medium text-gray-900">建议动作</span>
                          </div>
                          <p className="text-xs text-[#2F5FD0] leading-relaxed">{member.suggestedAction}</p>
                        </div>

                        <div className="mt-4">
                          <p className="text-xs text-gray-400 mb-2">带教计划</p>
                          <div className="space-y-2">
                            {member.coachPlan.map((item) => (
                              <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <button
                            onClick={() => navigate("/messages")}
                            className="px-3 py-2 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors flex items-center gap-1"
                          >
                            <MessageSquare size={12} /> 发消息
                          </button>
                          <button
                            onClick={() => navigate("/learning/growth")}
                            className="px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1"
                          >
                            <Users size={12} /> 去成长总览
                          </button>
                          <button
                            onClick={() => navigate("/messages")}
                            className="px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1"
                          >
                            <Phone size={12} /> 直接联系
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <GlobalStateCard
                tone="empty"
                size="sm"
                title="当前筛选条件下没有风险对象"
                description="不是没有风险名单，而是当前等级和短板条件没有命中对象。可以切回“全部”继续看完整名单。"
                action={{
                  label: "恢复全部筛选",
                  onClick: () => {
                    setLevelFilter("all");
                    setAreaFilter("全部");
                  },
                }}
              />
            )}

          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">关键节点预警</span>
              </div>
              <div className="space-y-3">
                {keyNodes.map((node) => (
                  <div key={node.id} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-900">{node.event}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${node.urgent ? "bg-red-100 text-[#DC2626]" : "bg-amber-100 text-[#B45309]"}`}>
                        {node.urgent ? "紧急" : "预警"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-2">{node.riskNote}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={11} /> 还有 {node.daysLeft} 天
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-sm font-medium text-gray-900 mb-3">名单说明</p>
              <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
                <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">高风险优先看“近期节点 + 连续掉队 + 讲解波动”。</div>
                <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">中风险优先看“知识版本未确认 + 可通过补学修正”的对象。</div>
                <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">带教任务页已经独立补齐，可直接从这张名单页继续拆动作分派和催办节奏。</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
