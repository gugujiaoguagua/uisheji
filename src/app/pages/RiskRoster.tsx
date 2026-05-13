import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  Clock3,
  Filter,
  LayoutGrid,
  MessageSquare,
  Store,
  Table2,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import { opsRiskRecords } from "../data/communityOpsData";
import { GlobalStateCard } from "../components/GlobalStateCard";

function levelTone(level: "high" | "medium") {
  return level === "high" ? "bg-red-100 text-[#DC2626]" : "bg-amber-100 text-[#B45309]";
}

function levelLabel(level: "high" | "medium") {
  return level === "high" ? "高风险" : "需关注";
}

function riskIcon(type: string) {
  if (type === "门店风险" || type === "资源缺口") return <Store size={18} />;
  if (type === "人员风险") return <UserRound size={18} />;
  if (type === "转化风险") return <Target size={18} />;
  return <Users size={18} />;
}

export default function RiskRoster() {
  const navigate = useNavigate();
  const [levelFilter, setLevelFilter] = useState<"all" | "high" | "medium">("all");
  const [typeFilter, setTypeFilter] = useState("全部");
  const [areaFilter, setAreaFilter] = useState("全部");
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");

  const typeOptions = useMemo(() => ["全部", ...Array.from(new Set(opsRiskRecords.map((item) => item.type)))], []);
  const areaOptions = useMemo(() => ["全部", ...Array.from(new Set(opsRiskRecords.map((item) => item.area)))], []);

  const filteredRisks = useMemo(() => {
    return opsRiskRecords.filter((item) => {
      const matchLevel = levelFilter === "all" || item.level === levelFilter;
      const matchType = typeFilter === "全部" || item.type === typeFilter;
      const matchArea = areaFilter === "全部" || item.area === areaFilter;
      return matchLevel && matchType && matchArea;
    });
  }, [areaFilter, levelFilter, typeFilter]);

  const highRiskCount = opsRiskRecords.filter((item) => item.level === "high").length;
  const ownerCount = new Set(opsRiskRecords.map((item) => item.owner)).size;
  const areaCount = new Set(opsRiskRecords.map((item) => item.area)).size;

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/workbench/content-ops")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回社区运营
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-[#DC2626]">运营风险名单</span>
                <span className="text-xs text-gray-400">按小区、门店、人员、转化和资源缺口统一排查</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">社区运营风险名单</h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                这里承接看板红色预警，先定位具体对象、负责人和指标背景，再进入明细或任务分派。
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate("/messages")}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                批量催办
              </button>
              <button
                onClick={() => navigate("/workbench/dashboard/tasks")}
                className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
              >
                去运营任务
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "风险对象", value: `${opsRiskRecords.length} 个` },
              { label: "高风险", value: `${highRiskCount} 个` },
              { label: "涉及负责人", value: `${ownerCount} 人` },
              { label: "涉及区域 / 门店", value: `${areaCount} 个` },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/5 px-3 py-3">
                <p className="text-xs text-white/50 mb-1">{item.label}</p>
                <p className="text-sm text-white leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">筛选视图</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 mb-2">按风险等级</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "all", label: "全部" },
                    { key: "high", label: "高风险" },
                    { key: "medium", label: "需关注" },
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
                <p className="text-xs text-gray-400 mb-2">按风险类型</p>
                <div className="flex flex-wrap gap-2">
                  {typeOptions.map((item) => (
                    <button
                      key={item}
                      onClick={() => setTypeFilter(item)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                        typeFilter === item ? "bg-red-50 text-[#DC2626]" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">按区域 / 门店</p>
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

          <div className="bg-white rounded-xl shadow-sm p-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <AlertTriangle size={15} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">风险对象</span>
              </div>
              <div className="flex rounded-lg bg-[#F5F7FA] p-1">
                {[
                  { key: "kanban", label: "看板", icon: <LayoutGrid size={13} /> },
                  { key: "table", label: "表格", icon: <Table2 size={13} /> },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setViewMode(item.key as "kanban" | "table")}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                      viewMode === item.key ? "bg-white text-[#2F5FD0] shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredRisks.length > 0 ? (
            viewMode === "kanban" ? (
              <div className="grid md:grid-cols-2 gap-3">
                {filteredRisks.map((risk) => (
                  <button
                    key={risk.id}
                    onClick={() => navigate(risk.relatedPath)}
                    className="bg-white rounded-xl shadow-sm p-4 border text-left hover:shadow-md hover:-translate-y-0.5 transition-all"
                    style={{ borderColor: risk.level === "high" ? "#FECACA" : "#FDE68A" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          risk.level === "high" ? "bg-red-100 text-[#DC2626]" : "bg-amber-100 text-[#B45309]"
                        }`}>
                          {riskIcon(risk.type)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${levelTone(risk.level)}`}>{levelLabel(risk.level)}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#F5F7FA] text-gray-600">{risk.type}</span>
                          </div>
                          <h2 className="text-sm font-medium text-gray-900 leading-relaxed mt-2">{risk.title}</h2>
                          <p className="text-xs text-gray-500 mt-1">{risk.area} · {risk.owner}</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 mt-1 flex-shrink-0" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="rounded-xl bg-[#FAFBFC] px-3 py-2">
                        <p className="text-xs text-gray-400">对象</p>
                        <p className="text-sm text-gray-800 mt-1">{risk.object}</p>
                      </div>
                      <div className="rounded-xl bg-[#FAFBFC] px-3 py-2">
                        <p className="text-xs text-gray-400">指标</p>
                        <p className="text-sm text-gray-800 mt-1">{risk.metric}</p>
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-2">
                      <p className="text-xs text-gray-500 leading-relaxed">{risk.nextNode}</p>
                    </div>
                    <div className="flex items-center justify-between gap-3 mt-3">
                      <div className="flex flex-wrap gap-1.5">
                        {risk.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 rounded-full bg-[#F5F7FA] text-xs text-gray-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock3 size={12} /> {risk.deadline}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-sm">
                    <thead className="bg-[#F8FAFC] text-xs text-gray-500">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">风险对象</th>
                        <th className="px-4 py-3 text-left font-medium">类型</th>
                        <th className="px-4 py-3 text-left font-medium">负责人</th>
                        <th className="px-4 py-3 text-left font-medium">指标背景</th>
                        <th className="px-4 py-3 text-left font-medium">截止</th>
                        <th className="px-4 py-3 text-right font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredRisks.map((risk) => (
                        <tr key={risk.id} className="hover:bg-[#FAFBFC]">
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{risk.object}</div>
                            <div className="text-xs text-gray-500 mt-1">{risk.title}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${levelTone(risk.level)}`}>{risk.type}</span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{risk.owner}</td>
                          <td className="px-4 py-3 text-gray-600">{risk.metric}</td>
                          <td className="px-4 py-3 text-gray-500">{risk.deadline}</td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => navigate(risk.relatedPath)} className="text-xs text-[#2F5FD0] hover:text-[#2550B8]">
                              看明细
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          ) : (
            <GlobalStateCard
              tone="empty"
              size="sm"
              title="当前筛选条件下没有运营风险"
              description="当前等级、类型和区域条件没有命中风险对象。可以切回全部继续看完整名单。"
              action={{
                label: "恢复全部筛选",
                onClick: () => {
                  setLevelFilter("all");
                  setTypeFilter("全部");
                  setAreaFilter("全部");
                },
              }}
            />
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={15} className="text-[#DC2626]" />
              <span className="text-sm font-medium text-gray-900">优先处理顺序</span>
            </div>
            <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
              <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-3 text-[#DC2626]">先处理高风险小区和资源缺口门店。</div>
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">人员风险要拆到具体小区和指标，不只看负责人平均分。</div>
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">转化风险必须关联前序资源、群人数、添加和样板间动作。</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">风险类型分布</span>
            </div>
            <div className="space-y-2.5">
              {typeOptions.filter((item) => item !== "全部").map((type) => {
                const count = opsRiskRecords.filter((item) => item.type === type).length;
                return (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className="w-full rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-left hover:bg-[#F7FAFF] hover:border-[#D9E5FF] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-gray-900">{type}</span>
                      <span className="text-xs text-gray-400">{count} 个</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/workbench/dashboard/tasks")}
              className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <Target size={14} className="text-[#2F5FD0] mb-2" />
              <p className="text-sm font-medium text-gray-900">运营任务</p>
              <p className="text-xs text-gray-500 mt-1">把风险拆成动作</p>
            </button>
            <button
              onClick={() => navigate("/messages")}
              className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <MessageSquare size={14} className="text-[#16A34A] mb-2" />
              <p className="text-sm font-medium text-gray-900">消息催办</p>
              <p className="text-xs text-gray-500 mt-1">追回执和结果</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
