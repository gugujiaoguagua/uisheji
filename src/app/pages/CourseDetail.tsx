import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Clock,
  RefreshCw,
  AlertCircle,
  Play,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  FileText,
  Dumbbell,
  Lock,
  Target,
  Sparkles,
} from "lucide-react";
import { getCourseDetailById } from "../data/learningData";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandChanges, setExpandChanges] = useState(true);

  const course = useMemo(() => getCourseDetailById(id), [id]);
  const completedSections = course.sections.filter((section) => section.done).length;
  const progress = Math.round((completedSections / course.sections.length) * 100);
  const isLocked = course.status === "locked";

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/learning")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回学习中心
          </button>

          <div className="flex items-start gap-2 flex-wrap mb-2">
            {course.versionChange && course.prevVersion && (
              <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full flex items-center gap-1">
                <RefreshCw size={10} /> {course.prevVersion} → {course.version} 有更新，请重学
              </span>
            )}
            {course.urgency === "urgent" && (
              <span className="text-xs px-2 py-0.5 bg-red-100 text-[#DC2626] rounded-full flex items-center gap-1">
                <AlertCircle size={10} /> {course.deadline}
              </span>
            )}
            {isLocked && (
              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full flex items-center gap-1">
                <Lock size={10} /> 当前未解锁
              </span>
            )}
          </div>

          <h1 className="text-gray-900 text-base leading-snug mb-1">{course.title}</h1>
          <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
            <span>{course.author}</span>
            <span>|</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {course.duration} 分钟</span>
            <span>|</span>
            <span>更新于 {course.updatedAt}</span>
            <span>|</span>
            <span>{course.category}</span>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">学习进度 {completedSections}/{course.sections.length} 节</span>
              <span className="text-xs text-[#2F5FD0]">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#2F5FD0] rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            {course.versionChange && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandChanges(!expandChanges)}
                  className="w-full flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <RefreshCw size={15} className="text-amber-600" />
                    <span className="text-sm font-medium text-amber-800">版本变更摘要：{course.updateSummary}</span>
                  </div>
                  {expandChanges ? <ChevronDown size={14} className="text-amber-600" /> : <ChevronRight size={14} className="text-amber-600" />}
                </button>

                {expandChanges && (
                  <div className="px-4 pb-4 space-y-2">
                    {course.keyChanges.map((change, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded mt-0.5 ${
                          change.type === "add"
                            ? "bg-green-100 text-green-700"
                            : change.type === "change"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                        }`}>
                          {change.type === "add" ? "新增" : change.type === "change" ? "变更" : "删除"}
                        </span>
                        <span className="text-xs text-amber-800">{change.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">学这门课要解决什么</span>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#F7FAFF] border border-[#D9E5FF] p-3">
                  <p className="text-xs font-medium text-gray-900 mb-2">学习目标</p>
                  <div className="space-y-2">
                    {course.learningGoals.map((goal) => (
                      <div key={goal} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle2 size={12} className="text-[#2F5FD0] mt-0.5 flex-shrink-0" />
                        <span>{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-[#FAFBFC] border border-gray-200 p-3">
                  <p className="text-xs font-medium text-gray-900 mb-2">适用场景</p>
                  <div className="flex flex-wrap gap-1.5">
                    {course.applicableScenes.map((scene) => (
                      <span key={scene} className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                        {scene}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed">{course.note}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-900">课程目录</h2>
                <span className="text-xs text-gray-400">重点节会标记为“重点”</span>
              </div>
              <div className="divide-y divide-gray-50">
                {course.sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                      activeSection === section.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium ${
                        section.done ? "bg-[#16A34A] text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        {section.done ? <CheckCircle2 size={14} /> : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm text-gray-800">{section.title}</span>
                          {section.isNew && <span className="text-xs px-1 py-0.5 bg-blue-100 text-blue-600 rounded">新增</span>}
                          {section.isKey && <span className="text-xs px-1 py-0.5 bg-purple-100 text-purple-600 rounded">重点</span>}
                        </div>
                        <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock size={9} /> {section.duration} 分钟
                        </span>
                      </div>
                      <button
                        className={`flex-shrink-0 px-3 py-1 rounded text-xs font-medium transition-colors ${
                          section.done
                            ? "bg-green-50 text-[#16A34A] border border-green-200"
                            : isLocked
                              ? "bg-gray-100 text-gray-400"
                              : "bg-[#2F5FD0] text-white hover:bg-[#2550B8]"
                        }`}
                      >
                        {section.done ? "已完成" : isLocked ? "待解锁" : "开始学习"}
                      </button>
                    </div>
                    {activeSection === section.id && (
                      <div className="mt-3 ml-10 rounded-lg bg-white border border-blue-100 px-3 py-2 text-xs text-gray-500">
                        这一节将帮助你把知识点转成能在现场直接使用的说法；学完建议继续去做陪练或考核验证。
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">学完后去哪里</span>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { title: "去 AI 问答", desc: course.relatedQnA.title, path: course.relatedQnA.path, icon: <BookOpen size={14} className="text-[#2F5FD0]" /> },
                  { title: "去 AI 陪练", desc: course.relatedPractice.title, path: course.relatedPractice.path, icon: <Dumbbell size={14} className="text-purple-600" /> },
                  { title: "去考核验证", desc: course.relatedAssessment.title, path: course.relatedAssessment.path, icon: <FileText size={14} className="text-orange-600" /> },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => navigate(item.path)}
                    className="rounded-xl border border-gray-200 p-3 text-left hover:border-[#2F5FD0]/30 hover:bg-[#FAFBFF] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {item.icon}
                      <span className="text-sm font-medium text-gray-900">{item.title}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed min-h-[40px]">{item.desc}</p>
                    <span className="text-xs text-[#2F5FD0] mt-2 inline-flex items-center gap-1">
                      立即前往 <ChevronRight size={11} />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={isLocked}
              className={`w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                isLocked
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#2F5FD0] hover:bg-[#2550B8] text-white"
              }`}
            >
              {isLocked ? <Lock size={16} /> : <Play size={16} />}
              {isLocked ? "完成前置课程后解锁" : progress > 0 ? "继续学习" : "开始学习"}
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-900 mb-3">课程信息</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">分类</span>
                  <span className="text-gray-700 text-right">{course.category}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">当前版本</span>
                  <span className="text-[#2F5FD0] font-medium">{course.version}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">更新时间</span>
                  <span className="text-gray-700 text-right">{course.updatedAt}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">发布机构</span>
                  <span className="text-gray-700 text-right">{course.author}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">完成要求</span>
                  <span className={course.urgency === "urgent" ? "text-[#DC2626] font-medium text-right" : "text-gray-700 text-right"}>
                    {course.deadline}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-900 mb-3">学习提醒</h3>
              <div className="rounded-lg bg-[#F5F7FA] p-3">
                <p className="text-xs text-gray-700 leading-relaxed">
                  {course.versionChange
                    ? "这门课涉及版本变化，建议先看变更摘要，再学习新增与重点章节。"
                    : "建议先过一遍目录中的重点章节，再决定是否去做陪练或考核。"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-900 mb-3">快速入口</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate(course.relatedQnA.path)}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-[#F5F7FA] hover:bg-gray-100 rounded-lg text-xs text-gray-600 transition-colors"
                >
                  <BookOpen size={13} className="text-[#2F5FD0]" />
                  遇到问题？去 AI 问答
                </button>
                <button
                  onClick={() => navigate(course.relatedAssessment.path)}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-[#F5F7FA] hover:bg-gray-100 rounded-lg text-xs text-gray-600 transition-colors"
                >
                  <FileText size={13} className="text-[#2F5FD0]" />
                  学完去考核验证
                </button>
                <button
                  onClick={() => navigate(course.relatedPractice.path)}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-[#F5F7FA] hover:bg-gray-100 rounded-lg text-xs text-gray-600 transition-colors"
                >
                  <Dumbbell size={13} className="text-[#2F5FD0]" />
                  学完去做陪练
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
