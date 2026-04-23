import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileCheck,
  Ruler,
  Target,
} from "lucide-react";
import {
  designStandardsModules,
  designStandardsSummary,
} from "../data/designStandardsData";

const moduleIcons = {
  "software-drawing": <BookOpen size={18} className="text-[#2F5FD0]" />,
  measurement: <Ruler size={18} className="text-[#2F5FD0]" />,
  "craft-boundary": <Target size={18} className="text-[#2F5FD0]" />,
  precheck: <FileCheck size={18} className="text-[#2F5FD0]" />,
  "error-library": <AlertTriangle size={18} className="text-[#2F5FD0]" />,
};

export default function DesignStandards() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/learning")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回学习中心
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EAF1FF] text-[#2F5FD0]">学习专题</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-[#DC2626]">高优先级补齐</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug">{designStandardsSummary.title}</h1>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed max-w-3xl">
                {designStandardsSummary.desc}
              </p>
            </div>
            <button
              onClick={() => navigate("/learning/design-standards/software-drawing")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
            >
              从第一项开始 <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            {designStandardsSummary.stats.map((item) => (
              <div key={item.label} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-3">
                <p className="text-sm text-gray-500">{item.label}</p>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-2xl font-bold text-[#2F5FD0]">{item.value}</span>
                  <span className="text-sm text-gray-400 mb-0.5">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-[#D9E5FF] bg-[linear-gradient(180deg,#F7FAFF_0%,#FFFFFF_100%)]">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={16} className="text-[#2F5FD0]" />
                <span className="text-base font-medium text-gray-900">建议使用顺序</span>
              </div>
              <div className="space-y-2">
                {designStandardsSummary.sequence.map((item, index) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-white border border-[#E5E7EB] px-3.5 py-3">
                    <span className="w-6 h-6 rounded-full bg-[#EAF1FF] text-[#2F5FD0] text-xs font-medium flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {designStandardsModules.map((module, index) => (
                <button
                  key={module.id}
                  onClick={() => navigate(`/learning/design-standards/${module.id}`)}
                  className="w-full text-left bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#2F5FD0]/30 hover:bg-[#FAFBFF] transition-colors p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#F5F7FA] flex items-center justify-center flex-shrink-0">
                      {moduleIcons[module.id as keyof typeof moduleIcons]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#EAF1FF] text-[#2F5FD0]">第 {index + 1} 项</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{module.badge}</span>
                        <span className="text-xs text-gray-400 inline-flex items-center gap-1">
                          <Clock size={11} /> {module.duration}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-base text-gray-900 leading-relaxed">{module.title}</h2>
                          <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{module.summary}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 flex-shrink-0 mt-1" />
                      </div>
                      <div className="grid md:grid-cols-3 gap-2 mt-3">
                        {module.cardPoints.map((point) => (
                          <div key={point} className="rounded-lg bg-[#F5F7FA] px-3 py-2 text-sm text-gray-600">
                            {point}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {module.scenarios.slice(0, 4).map((scene) => (
                          <span key={scene} className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-500">
                            {scene}
                          </span>
                        ))}
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
                <AlertTriangle size={15} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">本专题重点盯的风险</span>
              </div>
              <div className="space-y-2">
                {designStandardsSummary.commonWarnings.map((item) => (
                  <div key={item} className="rounded-lg bg-red-50 border border-red-100 px-3 py-3">
                    <p className="text-sm text-[#991B1B] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">进入后怎么用</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
                <p>先看当前主题的“高风险信号”，确认最近最容易出错的点。</p>
                <p>再按“规则块 → 自检清单 → 高频错误”的顺序过一遍，确保不是只看不落动作。</p>
                <p>最后从右侧快捷动作跳到 AI 问答、陪练或工作台链路里，验证是否真的能用起来。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
