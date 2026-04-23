import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileCheck,
  Ruler,
  Target,
  Users,
} from "lucide-react";
import {
  designStandardsModules,
  getDesignStandardModuleById,
} from "../data/designStandardsData";

const moduleIcons = {
  "software-drawing": <BookOpen size={18} className="text-[#2F5FD0]" />,
  measurement: <Ruler size={18} className="text-[#2F5FD0]" />,
  "craft-boundary": <Target size={18} className="text-[#2F5FD0]" />,
  precheck: <FileCheck size={18} className="text-[#2F5FD0]" />,
  "error-library": <AlertTriangle size={18} className="text-[#2F5FD0]" />,
};

export default function DesignStandardsDetail() {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const module = useMemo(() => getDesignStandardModuleById(topicId), [topicId]);

  const currentIndex = designStandardsModules.findIndex((item) => item.id === module.id);
  const prevModule = currentIndex > 0 ? designStandardsModules[currentIndex - 1] : null;
  const nextModule = currentIndex < designStandardsModules.length - 1 ? designStandardsModules[currentIndex + 1] : null;

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/learning/design-standards")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回专题总览
          </button>

          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F7FA] flex items-center justify-center flex-shrink-0">
              {moduleIcons[module.id as keyof typeof moduleIcons]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EAF1FF] text-[#2F5FD0]">{module.badge}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                  第 {currentIndex + 1} 项 / 共 {designStandardsModules.length} 项
                </span>
                <span className="text-xs text-gray-400 inline-flex items-center gap-1">
                  <Clock size={11} /> {module.duration}
                </span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug">{module.title}</h1>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed max-w-3xl">{module.intro}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap mt-2.5">
                <span>维护组：{module.owner}</span>
                <span>|</span>
                <span>更新于 {module.updatedAt}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mt-4">
            <div className="rounded-xl bg-[#F7FAFF] border border-[#D9E5FF] px-4 py-3">
              <p className="text-sm text-[#2F5FD0] font-medium">这页要解决什么</p>
              <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{module.summary}</p>
            </div>
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3">
              <p className="text-sm text-[#DC2626] font-medium">高风险信号</p>
              <p className="text-sm text-[#991B1B] mt-1.5 leading-relaxed">优先看右侧风险提醒，再决定先补哪个动作。</p>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
              <p className="text-sm text-gray-700 font-medium">适用场景</p>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{module.scenarios.join(" / ")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">先盯住这 3 个结果</span>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {module.goals.map((goal) => (
                  <div key={goal} className="rounded-xl bg-[#F5F7FA] border border-gray-200 px-3.5 py-3">
                    <p className="text-sm text-gray-600 leading-relaxed">{goal}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {module.blocks.map((block) => (
                <div key={block.title} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                    <div>
                      <h2 className="text-base text-gray-900">{block.title}</h2>
                      <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{block.desc}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {block.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 rounded-lg bg-[#FAFBFC] border border-gray-200 px-3 py-3">
                        <CheckCircle2 size={14} className="text-[#2F5FD0] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileCheck size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">提交前自检</span>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {module.checklist.map((item, index) => (
                  <div key={item} className="rounded-lg bg-[#F5F7FA] px-3 py-3 text-sm text-gray-600 leading-relaxed">
                    <span className="text-[#2F5FD0] font-medium mr-2">{index + 1}.</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">高频错误与预防</span>
              </div>
              <div className="space-y-3">
                {module.mistakes.map((item) => (
                  <div key={item.title} className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-[#991B1B]">{item.title}</p>
                    <p className="text-sm text-[#7F1D1D] mt-1.5 leading-relaxed">后果：{item.consequence}</p>
                    <p className="text-sm text-[#991B1B] mt-1.5 leading-relaxed">预防：{item.prevention}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">高风险信号</span>
              </div>
              <div className="space-y-2">
                {module.riskSignals.map((item) => (
                  <div key={item} className="rounded-lg bg-red-50 border border-red-100 px-3 py-3">
                    <p className="text-sm text-[#991B1B] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">跨角色同步提醒</span>
              </div>
              <div className="space-y-2">
                {module.syncAlerts.map((item) => (
                  <div key={item} className="rounded-lg bg-[#F5F7FA] border border-gray-200 px-3 py-3">
                    <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <ChevronRight size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">下一步动作</span>
              </div>
              <div className="space-y-2">
                {module.nextActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => navigate(action.path)}
                    className={`w-full text-left rounded-lg px-3.5 py-3 transition-colors border ${
                      action.emphasis === "primary"
                        ? "bg-[#2F5FD0] hover:bg-[#2550B8] text-white border-[#2F5FD0]"
                        : "bg-[#F5F7FA] hover:bg-gray-100 text-gray-600 border-gray-200"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3 text-sm">
                      <span>{action.label}</span>
                      <ArrowRight size={14} className="flex-shrink-0" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">前后衔接</span>
              </div>
              <div className="space-y-2">
                {prevModule && (
                  <button
                    onClick={() => navigate(`/learning/design-standards/${prevModule.id}`)}
                    className="w-full flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <span>上一项：{prevModule.shortTitle}</span>
                    <ArrowLeft size={14} />
                  </button>
                )}
                {nextModule && (
                  <button
                    onClick={() => navigate(`/learning/design-standards/${nextModule.id}`)}
                    className="w-full flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <span>下一项：{nextModule.shortTitle}</span>
                    <ArrowRight size={14} />
                  </button>
                )}
                {!prevModule && !nextModule && (
                  <div className="rounded-lg bg-[#F5F7FA] px-3 py-3 text-sm text-gray-500">
                    当前只有这一项内容。
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
