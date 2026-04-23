import { ArrowUpRight, AlertTriangle, CheckCircle2, Clock3 } from "lucide-react";
import { useNavigate } from "react-router";
import type { RecordTone, TimelineRecord } from "../data/workflowData";
import { timelineDomainMeta } from "../data/workflowData";

function toneMeta(tone: RecordTone) {
  if (tone === "done") {
    return {
      dot: "bg-[#16A34A] text-white",
      card: "border-green-100 bg-green-50/60",
      icon: <CheckCircle2 size={13} className="text-white" />,
      label: "已完成",
    };
  }

  if (tone === "risk") {
    return {
      dot: "bg-[#DC2626] text-white",
      card: "border-red-100 bg-red-50/70",
      icon: <AlertTriangle size={13} className="text-white" />,
      label: "风险中",
    };
  }

  return {
    dot: "bg-[#2F5FD0] text-white",
    card: "border-blue-100 bg-[#F7FAFF]",
    icon: <Clock3 size={13} className="text-white" />,
    label: "待推进",
  };
}

interface TimelineFeedProps {
  items: TimelineRecord[];
  emptyTitle?: string;
  emptyDesc?: string;
}

export function TimelineFeed({
  items,
  emptyTitle = "暂无时间线记录",
  emptyDesc = "当前筛选条件下还没有可展示的历史记录。",
}: TimelineFeedProps) {
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="w-11 h-11 rounded-2xl bg-[#F5F7FA] mx-auto flex items-center justify-center mb-3">
          <Clock3 size={18} className="text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-900">{emptyTitle}</p>
        <p className="text-xs text-gray-500 mt-1">{emptyDesc}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="space-y-3">
        {items.map((item, index) => {
          const tone = toneMeta(item.tone);
          const domain = timelineDomainMeta[item.domain];
          const showLine = index < items.length - 1;

          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className="flex flex-col items-center pt-0.5 flex-shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${tone.dot}`}>
                  {tone.icon}
                </div>
                {showLine && <div className="mt-1 h-12 w-px bg-gray-200" />}
              </div>

              <div className={`flex-1 rounded-xl border px-4 py-3 ${tone.card}`}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${domain.badge}`}>{domain.label}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/80 border border-white/70 text-gray-500">{tone.label}</span>
                      <span className="text-xs text-gray-400">{item.actor}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 leading-relaxed">{item.title}</p>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{item.detail}</p>
                  </div>

                  <div className="text-right min-w-[84px]">
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                      {tag}
                    </span>
                  ))}
                  <button
                    onClick={() => navigate(item.relatedPath)}
                    className="ml-auto inline-flex items-center gap-1 text-xs text-[#2F5FD0] hover:text-[#2550B8]"
                  >
                    查看关联页 <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
