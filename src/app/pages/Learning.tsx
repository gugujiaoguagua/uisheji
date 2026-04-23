import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  BookOpen,
  Clock,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  Play,
  CheckCircle2,
  Lock,
  Route,
  Sparkles,
  History,
  Target,
  ArrowRight,
} from "lucide-react";
import {
  categories,
  courses,
  learningPath,
  recentLearningRecords,
  retrainReminders,
  updateTopics,
  CourseStatus,
} from "../data/learningData";
import {
  designStandardsModules,
  designStandardsSummary,
} from "../data/designStandardsData";

function StatusBadge({ status }: { status: CourseStatus }) {
  if (status === "completed") {
    return (
      <span className="flex items-center gap-1 text-xs text-[#16A34A] bg-green-50 px-1.5 py-0.5 rounded">
        <CheckCircle2 size={10} /> 已完成
      </span>
    );
  }
  if (status === "in_progress") {
    return (
      <span className="flex items-center gap-1 text-xs text-[#2F5FD0] bg-blue-50 px-1.5 py-0.5 rounded">
        <Play size={10} /> 学习中
      </span>
    );
  }
  if (status === "locked") {
    return (
      <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
        <Lock size={10} /> 已锁定
      </span>
    );
  }
  return <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">未开始</span>;
}

export default function Learning() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyUpdated, setShowOnlyUpdated] = useState(false);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchCat = activeCategory === "全部" || course.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        course.title.includes(searchQuery) ||
        course.tags.some((tag) => tag.includes(searchQuery));
      const matchUpdated = !showOnlyUpdated || course.versionChange;
      return matchCat && matchSearch && matchUpdated;
    });
  }, [activeCategory, searchQuery, showOnlyUpdated]);

  const urgentCount = courses.filter((course) => course.urgency === "urgent" && course.status !== "completed").length;
  const updatedCount = courses.filter((course) => course.versionChange).length;
  const completionRate = Math.round(
    (courses.filter((course) => course.status === "completed").length / courses.length) * 100
  );
  const recommendedCourses = courses.filter((course) => course.status === "in_progress" || course.urgency !== "normal").slice(0, 3);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-gray-900">学习中心</h1>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">按学习闭环组织：路径推荐、课程学习、记录沉淀、考核验证与补训再学</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-3">
              <div className="flex items-center gap-1.5">
                <AlertCircle size={14} className="text-[#DC2626]" />
                <span className="text-sm text-[#DC2626] font-medium">紧急必学</span>
              </div>
              <div className="text-xl font-bold text-[#DC2626] mt-1">{urgentCount} <span className="text-sm font-normal">项</span></div>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-3">
              <div className="flex items-center gap-1.5">
                <RefreshCw size={14} className="text-[#F59E0B]" />
                <span className="text-sm text-[#F59E0B] font-medium">版本已更新</span>
              </div>
              <div className="text-xl font-bold text-[#F59E0B] mt-1">{updatedCount} <span className="text-sm font-normal">份</span></div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-3">
              <div className="flex items-center gap-1.5">
                <BookOpen size={14} className="text-[#2F5FD0]" />
                <span className="text-sm text-[#2F5FD0] font-medium">完成率</span>
              </div>
              <div className="text-xl font-bold text-[#2F5FD0] mt-1">{completionRate} <span className="text-sm font-normal">%</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Route size={16} className="text-[#2F5FD0]" />
                <span className="text-base font-medium text-gray-900">学习路径区</span>
                <span className="text-sm text-gray-400">系统优先给你今天该学什么</span>
              </div>
              <div className="rounded-xl bg-[#F7FAFF] border border-[#D9E5FF] p-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-base font-medium text-gray-900">{learningPath.title}</p>
                    <p className="text-sm text-gray-500 mt-1.5">当前阶段：{learningPath.currentStage}</p>
                    <p className="text-sm text-[#2F5FD0] mt-2.5">下一步：{learningPath.nextAction}</p>
                  </div>
                  <button
                    onClick={() => navigate("/learning/course/1")}
                    className="text-sm bg-[#2F5FD0] hover:bg-[#2550B8] text-white px-3.5 py-2.5 rounded-lg transition-colors"
                  >
                    继续本路径
                  </button>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-500">完成 {learningPath.completedSteps}/{learningPath.totalSteps} 步</span>
                    <span className="text-sm text-[#2F5FD0]">{learningPath.progress}%</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden border border-blue-100">
                    <div className="h-full bg-[#2F5FD0] rounded-full" style={{ width: `${learningPath.progress}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
                  {learningPath.milestones.map((item) => (
                    <div key={item.title} className="rounded-lg bg-white border border-gray-200 px-2.5 py-2.5">
                      <div className={`text-xs inline-flex px-2 py-0.5 rounded-full ${
                        item.state === "done"
                          ? "bg-green-100 text-[#16A34A]"
                          : item.state === "current"
                            ? "bg-blue-100 text-[#2F5FD0]"
                            : "bg-gray-100 text-gray-500"
                      }`}>
                        {item.state === "done" ? "已完成" : item.state === "current" ? "当前" : "待开始"}
                      </div>
                      <p className="text-sm text-gray-700 mt-2.5">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-[#D9E5FF] bg-[linear-gradient(180deg,#F7FAFF_0%,#FFFFFF_100%)]">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Target size={15} className="text-[#2F5FD0]" />
                    <span className="text-base font-medium text-gray-900">设计规范与防错训练专区</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-[#DC2626]">优先补齐</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
                    {designStandardsSummary.desc}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/learning/design-standards")}
                  className="px-3.5 py-2.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
                >
                  进入专题
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mt-4">
                {designStandardsSummary.stats.map((item) => (
                  <div key={item.label} className="rounded-xl bg-white border border-gray-200 px-3.5 py-3">
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <div className="mt-1 flex items-end gap-2">
                      <span className="text-xl font-bold text-[#2F5FD0]">{item.value}</span>
                      <span className="text-sm text-gray-400 mb-0.5">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-2 mt-4">
                {designStandardsModules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => navigate(`/learning/design-standards/${module.id}`)}
                    className="rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-left hover:border-[#2F5FD0]/30 hover:bg-[#FAFBFF] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-gray-900">{module.shortTitle}</span>
                          <span className="text-xs px-1.5 py-0.5 rounded bg-[#EAF1FF] text-[#2F5FD0]">{module.badge}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">{module.summary}</p>
                      </div>
                      <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 bg-[#F5F7FA] border border-gray-200 rounded-lg px-3 py-2.5">
                    <Search size={14} className="text-gray-400" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="搜索课程名、关键词、标签..."
                      className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  <button
                    onClick={() => setShowOnlyUpdated(!showOnlyUpdated)}
                    className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                      showOnlyUpdated
                        ? "bg-[#F59E0B] border-[#F59E0B] text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <RefreshCw size={12} />
                    仅看更新
                  </button>
                </div>
              </div>

              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex gap-1 overflow-x-auto hide-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === cat
                          ? "bg-[#2F5FD0] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-gray-50">
                {filtered.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => navigate(`/learning/course/${course.id}`)}
                    className="px-4 py-4 hover:bg-gray-50 cursor-pointer transition-all"
                    style={{
                      borderLeft:
                        course.urgency === "urgent"
                          ? "3px solid #DC2626"
                          : course.urgency === "warning"
                            ? "3px solid #F59E0B"
                            : "3px solid transparent",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                        course.category === "新品学习"
                          ? "bg-blue-50"
                          : course.category === "工艺规范"
                            ? "bg-orange-50"
                            : course.category === "销售话术"
                              ? "bg-green-50"
                              : "bg-gray-50"
                      }`}>
                        <BookOpen
                          size={20}
                          className={
                            course.category === "新品学习"
                              ? "text-blue-500"
                              : course.category === "工艺规范"
                                ? "text-orange-500"
                                : course.category === "销售话术"
                                  ? "text-green-500"
                                  : "text-gray-500"
                          }
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 flex-wrap mb-1">
                          {course.versionChange && (
                            <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded flex items-center gap-0.5">
                              <RefreshCw size={9} /> {course.version} 已更新
                            </span>
                          )}
                          {course.urgency === "urgent" && (
                            <span className="text-xs px-1.5 py-0.5 bg-red-100 text-[#DC2626] rounded">紧急必学</span>
                          )}
                          <StatusBadge status={course.status} />
                        </div>

                        <h3 className="text-base text-gray-900 line-clamp-2 leading-relaxed">{course.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">{course.desc}</p>

                        <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                          <span className="flex items-center gap-1 text-sm text-gray-400">
                            <Clock size={10} /> {course.duration} 分钟
                          </span>
                          <span className={`text-sm ${course.urgency === "urgent" ? "text-[#DC2626]" : "text-gray-400"}`}>
                            {course.deadline}
                          </span>
                          <div className="flex gap-1 flex-wrap">
                            {course.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {course.status === "in_progress" && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#2F5FD0] rounded-full" style={{ width: `${course.progress}%` }} />
                            </div>
                            <span className="text-xs text-gray-500">{course.progress}%</span>
                          </div>
                        )}
                      </div>

                      <ChevronRight size={16} className="text-gray-300 flex-shrink-0 mt-1" />
                    </div>
                  </div>
                ))}

                {filtered.length === 0 && (
                  <div className="p-8 text-center">
                    <BookOpen size={32} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">没有找到符合条件的课程</p>
                    <p className="text-xs text-gray-400 mt-1">试试切换分类或取消“仅看更新”</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={15} className="text-[#2F5FD0]" />
                  <span className="text-base font-medium text-gray-900">推荐课程区</span>
                </div>
                <div className="space-y-2">
                  {recommendedCourses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => navigate(`/learning/course/${course.id}`)}
                      className="w-full text-left rounded-xl border border-gray-200 p-3 hover:border-[#2F5FD0]/30 hover:bg-[#FAFBFF] transition-colors"
                    >
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <StatusBadge status={course.status} />
                        {course.versionChange && (
                          <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">版本更新</span>
                        )}
                      </div>
                      <p className="text-base text-gray-900 line-clamp-2 leading-relaxed">{course.title}</p>
                      <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{course.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw size={15} className="text-[#F59E0B]" />
                  <span className="text-base font-medium text-gray-900">更新专题区</span>
                </div>
                <div className="space-y-2">
                  {updateTopics.map((topic) => (
                    <button
                      key={topic.title}
                      onClick={() => navigate(topic.path)}
                      className="w-full text-left rounded-xl bg-[#FFF8ED] border border-[#FDE3B3] p-3 hover:bg-[#FFF2DA] transition-colors"
                    >
                      <p className="text-base text-gray-900">{topic.title}</p>
                      <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{topic.desc}</p>
                      <p className="text-sm text-[#B45309] mt-2.5">影响：{topic.impact}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <History size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">学习记录区</span>
              </div>
              <div className="space-y-2">
                {recentLearningRecords.map((record) => (
                  <div key={record.title} className="rounded-lg bg-[#F5F7FA] p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-gray-800">{record.title}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-500">
                        {record.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{record.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target size={15} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">补学提醒区</span>
              </div>
              <div className="space-y-2">
                {retrainReminders.map((item) => (
                  <div key={item.title} className="rounded-lg border border-gray-200 p-3.5">
                    <p className="text-sm font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{item.reason}</p>
                    <button
                      onClick={() => navigate(item.path)}
                      className="mt-2.5 text-sm text-[#2F5FD0] hover:text-[#2550B8] flex items-center gap-1"
                    >
                      {item.action} <ArrowRight size={11} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">学完后的下一步</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: "去 AI 问答补充现场说法", path: "/learning/ai-qna" },
                  { label: "去 AI 陪练做一轮场景训练", path: "/learning/ai-practice" },
                  { label: "去考核验证是否真的学会", path: "/learning/assessment" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center justify-between px-3 py-2.5 bg-[#F5F7FA] hover:bg-gray-100 rounded-lg text-sm text-gray-600 transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={12} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
