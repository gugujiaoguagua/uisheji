import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronRight,
  Clock3,
  FileText,
  Search,
  Users,
  X,
} from "lucide-react";
import { reviewRecords, type RecordTone, type ReviewRecord } from "../data/workflowData";

type FilterKey = "all" | RecordTone;

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "全部会审" },
  { key: "pending", label: "待补记录" },
  { key: "done", label: "已沉淀" },
  { key: "risk", label: "需收口" },
];

function toneMeta(tone: RecordTone) {
  if (tone === "done") return "bg-green-100 text-[#15803D]";
  if (tone === "risk") return "bg-red-100 text-[#DC2626]";
  return "bg-amber-100 text-[#B45309]";
}

function toneLabel(tone: RecordTone) {
  if (tone === "done") return "已沉淀";
  if (tone === "risk") return "需收口";
  return "待补记录";
}

function searchRecord(record: ReviewRecord, keyword: string) {
  if (!keyword) return true;
  return [
    record.title,
    record.owner,
    record.meetingTime,
    record.decision,
    record.attendees.join(" "),
  ].some((value) => value.toLowerCase().includes(keyword));
}

export default function ReviewRecords() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    return reviewRecords.filter((record) => {
      const matchFilter = activeFilter === "all" || record.tone === activeFilter;
      return matchFilter && searchRecord(record, keyword);
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-[#1E2A3A] px-4 md:px-6 pt-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-white text-xl font-semibold">方案会审记录</h1>
            <button
              onClick={() => navigate("/workbench/collab")}
              className="px-3 py-2 rounded-lg bg-white text-[#1E2A3A] hover:bg-gray-100 text-sm transition-colors"
            >
              返回客户单
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-7 pb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
            <div>
              <p className="text-sm font-medium text-gray-900">所有会审记录</p>
              <p className="text-sm text-gray-500 mt-1">先筛选，也可以按项目、负责人或会审时间查询。</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-xl text-sm transition-colors border ${
                  activeFilter === filter.key
                    ? "bg-[#2F5FD0] text-white border-[#2F5FD0]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#2F5FD0]/40"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] border border-gray-200 px-3 py-2">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="按会审项目、负责人、参与角色或时间查询"
              className="flex-1 h-10 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="w-8 h-8 rounded-lg bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {filteredRecords.length > 0 ? (
          <div className="grid xl:grid-cols-2 gap-4">
            {filteredRecords.map((record) => (
              <button
                key={record.id}
                type="button"
                onClick={() => navigate(record.relatedPath)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#2F5FD0]/40 hover:shadow-md transition-all p-4 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${toneMeta(record.tone)}`}>{toneLabel(record.tone)}</span>
                      <span className="text-xs text-gray-400 inline-flex items-center gap-1">
                        <Clock3 size={11} /> {record.meetingTime}
                      </span>
                    </div>
                    <h2 className="text-base font-medium text-gray-900 mt-2 leading-relaxed">{record.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">负责人：{record.owner}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-blue-200 bg-blue-50 text-[#2F5FD0] flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold leading-none">{record.assets.length}</span>
                    <span className="text-xs mt-0.5">资产</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mt-4">
                  <div className="rounded-xl bg-[#F8FAFC] border border-gray-100 px-3 py-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Users size={13} />
                      参与角色
                    </div>
                    <p className="text-sm text-gray-800 mt-1.5 line-clamp-1">{record.attendees.join("、")}</p>
                  </div>
                  <div className="rounded-xl bg-[#F8FAFC] border border-gray-100 px-3 py-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <FileText size={13} />
                      会审决议
                    </div>
                    <p className="text-sm text-gray-800 mt-1.5 line-clamp-1">{record.decision}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-500">后续动作 {record.followUps.length} 项</span>
                  <span className="inline-flex items-center gap-1 text-sm text-[#2F5FD0]">
                    查看详情 <ChevronRight size={14} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F7FA] mx-auto flex items-center justify-center text-gray-400 mb-3">
              <Search size={18} />
            </div>
            <p className="text-sm font-medium text-gray-900">没有找到会审记录</p>
            <p className="text-sm text-gray-500 mt-1">换一个项目、负责人或会审时间再搜。</p>
          </div>
        )}
      </div>
    </div>
  );
}
