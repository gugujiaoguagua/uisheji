import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  BookOpen,
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
            </div>
            <button
              onClick={() => navigate("/learning/design-standards/software-drawing")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
            >
              从第一项开始 <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
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
    </div>
  );
}
