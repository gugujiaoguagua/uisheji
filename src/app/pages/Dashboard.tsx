import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock,
  Database,
  MessageSquare,
  Phone,
  Search,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useApp } from "../context/AppContext";
import {
  alertRuleItems,
  closureSteps,
  opsDetailPath,
  personAlerts,
  riskItems,
  teamHealth,
} from "../data/communityOpsData";
import { trainingStudents } from "../data/trainingTeacherData";

function stateTone(state: string) {
  if (state === "danger") return "bg-red-50 text-[#DC2626] border-red-100";
  if (state === "warning") return "bg-amber-50 text-[#B45309] border-amber-100";
  return "bg-green-50 text-[#15803D] border-green-100";
}

function studentStatusTone(status: string) {
  if (status === "红色") return "border-red-100 bg-red-50 text-[#DC2626]";
  if (status === "需跟进") return "border-amber-100 bg-amber-50 text-[#B45309]";
  return "border-green-100 bg-green-50 text-[#15803D]";
}

function scoreTone(score: number) {
  if (score < 60) return "border-red-200 bg-red-50 text-[#DC2626]";
  if (score < 75) return "border-amber-200 bg-amber-50 text-[#B45309]";
  return "border-green-200 bg-green-50 text-[#16A34A]";
}

function studentPriority(status: string) {
  if (status === "红色") return 0;
  if (status === "需跟进") return 1;
  return 2;
}

function TrainingTeacherDashboard() {
  const navigate = useNavigate();
  const cohortOptions = ["全部班级", ...Array.from(new Set(trainingStudents.map((student) => student.cohort)))];
  const [selectedCohort, setSelectedCohort] = useState("全部班级");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const orderedStudents = [...trainingStudents].sort((a, b) => studentPriority(a.status) - studentPriority(b.status) || a.score - b.score);
  const filteredStudents = orderedStudents.filter((student) => {
    const cohortMatched = selectedCohort === "全部班级" || student.cohort === selectedCohort;
    const nameMatched = student.name.includes(searchQuery.trim());
    return cohortMatched && nameMatched;
  });
  const selectedStudent = selectedStudentId ? trainingStudents.find((student) => student.id === selectedStudentId) : null;

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-[#1E2A3A] px-4 md:px-6 pt-4 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-white mb-1">学员培养看板</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-4 space-y-4">
        <div className="space-y-4">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                <div>
                  <h2 className="text-sm font-medium text-gray-900">{selectedStudent ? "学员详情看板" : "所有学员综合"}</h2>
                </div>
                {selectedStudent && (
                  <button
                    onClick={() => setSelectedStudentId(null)}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
                  >
                    返回全部学员
                  </button>
                )}
              </div>
              {!selectedStudent && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {cohortOptions.map((cohort) => (
                      <button
                        key={cohort}
                        onClick={() => {
                          setSelectedCohort(cohort);
                          setSelectedStudentId(null);
                        }}
                        className={`w-full rounded-xl border px-3 py-2 text-sm transition-colors ${
                          selectedCohort === cohort
                            ? "border-[#2F5FD0] bg-[#2F5FD0] text-white"
                            : "border-gray-200 bg-[#FAFBFC] text-gray-600 hover:border-[#D9E5FF]"
                        }`}
                      >
                        {cohort}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="按学员姓名查询"
                      className="w-full rounded-xl border border-gray-200 bg-[#FAFBFC] py-2.5 pl-9 pr-3 text-sm text-gray-900 outline-none focus:border-[#2F5FD0] focus:bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {!selectedStudent ? (
              <div className="grid lg:grid-cols-2 gap-4">
                {filteredStudents.map((student) => {
                  const weakestItem = student.assessmentItems.reduce((min, item) => (item.score < min.score ? item : min), student.assessmentItems[0]);
                  return (
                    <div
                      key={student.id}
                      onClick={() => setSelectedStudentId(student.id)}
                      className="rounded-xl bg-white p-4 shadow-sm border border-transparent hover:border-[#D9E5FF] hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-base font-medium text-gray-900">{student.name}</h2>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${studentStatusTone(student.status)}`}>{student.status}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{student.cohort} · {student.stage}</p>
                        </div>
                        <div className={`w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center ${scoreTone(student.score)}`}>
                          <div className="text-xl font-bold leading-none">{student.score}</div>
                          <div className="text-[10px] mt-0.5">总分</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <button
                          onClick={(event) => event.stopPropagation()}
                          className="flex items-center justify-center gap-2 rounded-xl bg-[#2F5FD0] px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#2550B8]"
                        >
                          <MessageSquare size={16} /> 发消息
                        </button>
                        <button
                          onClick={(event) => event.stopPropagation()}
                          className="flex items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#15803D]"
                        >
                          <Phone size={16} /> 打电话
                        </button>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500">学习进度</span>
                          <span className="text-[#2F5FD0]">{student.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full bg-[#2F5FD0]" style={{ width: `${student.progress}%` }} />
                        </div>
                      </div>

                      <div className="mt-4 grid md:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                          <p className="text-xs text-gray-500">当前卡点</p>
                          <p className="text-sm text-[#DC2626] mt-2">{student.risk}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                          <p className="text-xs text-gray-500">最低分项</p>
                          <p className="text-sm text-gray-700 mt-2">{weakestItem.label} {weakestItem.score}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredStudents.length === 0 && (
                  <div className="lg:col-span-2 rounded-xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
                    没有匹配的学员
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base font-medium text-gray-900">{selectedStudent.name}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${studentStatusTone(selectedStudent.status)}`}>{selectedStudent.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{selectedStudent.cohort} · {selectedStudent.stage}</p>
                  </div>
                  <div className={`w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center ${scoreTone(selectedStudent.score)}`}>
                    <div className="text-xl font-bold leading-none">{selectedStudent.score}</div>
                    <div className="text-[10px] mt-0.5">总分</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-[#2F5FD0] px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#2550B8]">
                    <MessageSquare size={16} /> 发消息
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#15803D]">
                    <Phone size={16} /> 打电话
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">学习进度</span>
                    <span className="text-[#2F5FD0]">{selectedStudent.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#2F5FD0]" style={{ width: `${selectedStudent.progress}%` }} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mt-4">
                  <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                    <p className="text-xs text-gray-500">当前卡点</p>
                    <p className="text-sm text-[#DC2626] mt-2">{selectedStudent.risk}</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                    <p className="text-xs text-gray-500">最近演练</p>
                    <p className="text-sm text-gray-700 mt-2">{selectedStudent.lastPractice}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {selectedStudent.weakAreas.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-amber-50 text-[#B45309]">{tag}</span>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardList size={14} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">分项评分与真实考核情况</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {selectedStudent.assessmentItems.map((item) => (
                      <div key={item.label} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-gray-900">{item.label}</span>
                          <span className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-sm font-bold ${scoreTone(item.score)}`}>
                            {item.score}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${item.score < 60 ? "bg-red-50 text-[#DC2626]" : item.score < 75 ? "bg-amber-50 text-[#B45309]" : "bg-green-50 text-[#15803D]"}`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">{item.evidence}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-[#D9E5FF] bg-[#F7FAFF] px-3 py-3 text-sm text-[#2F5FD0]">
                  跟进动作：{selectedStudent.nextAction}
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}

function DashboardLegacy() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"risk" | "nodes" | "team">("risk");

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-[#1E2A3A] px-4 md:px-6 pt-4 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-white mb-1">社区运营异常看板</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-4">
        <div className="grid grid-cols-3 gap-1 bg-white rounded-xl p-1 shadow-sm mb-4">
          {[
            { key: "risk", label: "风险对象 & 动作" },
            { key: "nodes", label: "指标规则 & 闭环" },
            { key: "team", label: "团队全览" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "risk" | "nodes" | "team")}
              className={`w-full min-h-[44px] px-2 py-2 rounded-lg text-xs sm:text-sm font-medium leading-snug transition-colors ${
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

export default function Dashboard() {
  const { user } = useApp();

  if ((user?.staffRole ?? "training_teacher") === "training_teacher") {
    return <TrainingTeacherDashboard />;
  }

  return <DashboardLegacy />;
}
