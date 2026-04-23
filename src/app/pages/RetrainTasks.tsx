import { useMemo } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  Dumbbell,
  FileText,
  Target,
} from "lucide-react";
import { retrainTasks, weakAreas } from "../data/growthData";

export default function RetrainTasks() {
  const navigate = useNavigate();

  const summary = useMemo(() => {
    const done = retrainTasks.filter((task) => task.status === "done").length;
    const inProgress = retrainTasks.filter((task) => task.status === "in_progress").length;
    const todo = retrainTasks.filter((task) => task.status === "todo").length;
    return { done, inProgress, todo };
  }, []);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/learning/growth")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回成长总览
          </button>

          <h1 className="text-gray-900 mb-0.5">补训任务</h1>
          <p className="text-sm text-gray-500">把“哪里薄弱”拆成能执行的动作，按顺序完成更容易形成闭环。</p>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "总任务数", value: `${retrainTasks.length} 项` },
              { label: "进行中", value: `${summary.inProgress} 项` },
              { label: "待开始", value: `${summary.todo} 项` },
              { label: "已完成", value: `${summary.done} 项` },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-[#F7FAFF] border border-[#D9E5FF] p-3">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className="text-sm font-medium text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <ClipboardList size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">当前补训清单</span>
              <span className="text-xs text-gray-400 ml-auto">按闭环顺序展示</span>
            </div>
            <div className="divide-y divide-gray-50">
              {retrainTasks.map((task, index) => {
                const weakArea = weakAreas.find((item) => item.id === task.weakAreaId);
                return (
                  <div key={task.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#2F5FD0] flex items-center justify-center text-xs font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <span className="text-sm font-medium text-gray-900">{task.title}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{task.type}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            task.status === "done"
                              ? "bg-green-100 text-[#16A34A]"
                              : task.status === "in_progress"
                                ? "bg-blue-100 text-[#2F5FD0]"
                                : "bg-amber-100 text-amber-700"
                          }`}>
                            {task.status === "done" ? "已完成" : task.status === "in_progress" ? "进行中" : "待开始"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-2">{task.desc}</p>
                        <div className="flex items-center gap-3 flex-wrap text-xs text-gray-400">
                          <span>来源：{weakArea?.area || "成长总览"}</span>
                          <span>截止：{task.deadline}</span>
                          <span>预计耗时：{task.duration}</span>
                          <span>安排人：{task.owner}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(task.path)}
                        className="flex-shrink-0 rounded-lg bg-[#2F5FD0] text-white px-3 py-1.5 text-xs hover:bg-[#2550B8] transition-colors"
                      >
                        去完成
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target size={15} className="text-[#16A34A]" />
              <span className="text-sm font-medium text-gray-900">完成这一轮补训后，会怎么闭环</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                {
                  title: "回到考核验证",
                  desc: "先用复测确认知识点和旧口径是否真正纠正。",
                  path: "/learning/assessment",
                  icon: <FileText size={14} className="text-[#2F5FD0]" />,
                },
                {
                  title: "再做一次 AI 陪练",
                  desc: "把补学内容说顺，避免只会做题不会表达。",
                  path: "/learning/ai-practice",
                  icon: <Dumbbell size={14} className="text-purple-600" />,
                },
                {
                  title: "查看复评结果",
                  desc: "系统会告诉你这轮补训还剩什么风险点。",
                  path: "/learning/growth/review-result",
                  icon: <CheckCircle2 size={14} className="text-green-600" />,
                },
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
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock3 size={15} className="text-[#F59E0B]" />
              <span className="text-sm font-medium text-gray-900">今日建议顺序</span>
            </div>
            <div className="space-y-2.5 text-xs text-gray-500">
              <div className="rounded-xl bg-amber-50 border border-amber-100 p-3">
                1. 先完成 <span className="text-gray-900 font-medium">工艺规范 v3.1</span> 关键变更补学。
              </div>
              <div className="rounded-xl bg-[#F7FAFF] border border-[#D9E5FF] p-3">
                2. 再去做一次 <span className="text-gray-900 font-medium">施工说明复述练习</span>，把新口径说顺。
              </div>
              <div className="rounded-xl bg-green-50 border border-green-100 p-3">
                3. 最后回到 <span className="text-gray-900 font-medium">专项测试</span>，用结果确认是否补到位。
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">常用入口</h3>
            <div className="space-y-2">
              {[
                { title: "去学习中心", path: "/learning", icon: <BookOpen size={14} className="text-[#2F5FD0]" /> },
                { title: "去成长总览", path: "/learning/growth", icon: <Target size={14} className="text-orange-600" /> },
                { title: "去复测 / 补考页", path: "/learning/growth/retest-makeup", icon: <FileText size={14} className="text-[#16A34A]" /> },
                { title: "去查看薄弱项详情", path: "/learning/growth/weak-area/craft-standard", icon: <ClipboardList size={14} className="text-green-600" /> },
              ].map((item) => (

                <button
                  key={item.title}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-700 hover:border-[#2F5FD0]/30 hover:bg-[#FAFBFF] transition-colors"
                >
                  {item.icon}
                  <span>{item.title}</span>
                  <ChevronRight size={14} className="ml-auto text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
