import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Clock3, Filter, RefreshCw } from "lucide-react";
import { TimelineFeed } from "../components/TimelineFeed";
import {
  historyTimelineRecords,
  timelineDomainMeta,
  type RecordTone,
  type TimelineDomain,
} from "../data/workflowData";

export default function HistoryTimeline() {
  const navigate = useNavigate();
  const [domainFilter, setDomainFilter] = useState<"all" | TimelineDomain>("all");
  const [toneFilter, setToneFilter] = useState<"all" | RecordTone>("all");

  const filteredRecords = useMemo(() => {
    return historyTimelineRecords.filter((item) => {
      const matchDomain = domainFilter === "all" || item.domain === domainFilter;
      const matchTone = toneFilter === "all" || item.tone === toneFilter;
      return matchDomain && matchTone;
    });
  }, [domainFilter, toneFilter]);

  const doneCount = historyTimelineRecords.filter((item) => item.tone === "done").length;
  const pendingCount = historyTimelineRecords.filter((item) => item.tone === "pending").length;
  const riskCount = historyTimelineRecords.filter((item) => item.tone === "risk").length;

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/workbench")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回工作台
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EEF4FF] text-[#2F5FD0]">跨模块追溯页</span>
                <span className="text-xs text-gray-400">申请、更新、会审、审单、补训都能统一往回看</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">历史记录 / 时间线</h1>
              <p className="text-sm text-gray-500 leading-relaxed">把分散在各模块里的关键节点收进同一张时间线，方便复盘“问题是怎么来的、动作有没有真的闭环”。</p>
            </div>
            <button
              onClick={() => navigate("/workbench/info-sync/records")}
              className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
            >
              查看更新记录页
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "总记录数", value: `${historyTimelineRecords.length} 条` },
              { label: "已完成", value: `${doneCount} 条` },
              { label: "待推进", value: `${pendingCount} 条` },
              { label: "风险项", value: `${riskCount} 条` },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/5 px-3 py-3">
                <p className="text-xs text-white/50 mb-1">{item.label}</p>
                <p className="text-sm text-white leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">筛选视图</span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 mb-2">按模块</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setDomainFilter("all")}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                      domainFilter === "all" ? "bg-[#2F5FD0] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    全部
                  </button>
                  {(Object.keys(timelineDomainMeta) as TimelineDomain[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setDomainFilter(key)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                        domainFilter === key ? "bg-[#EEF4FF] text-[#2F5FD0]" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {timelineDomainMeta[key].label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-2">按状态</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "all", label: "全部" },
                    { key: "done", label: "已完成" },
                    { key: "pending", label: "待推进" },
                    { key: "risk", label: "风险中" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setToneFilter(item.key as "all" | RecordTone)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                        toneFilter === item.key ? "bg-[#F7FAFF] text-[#2F5FD0] border border-[#D9E5FF]" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <TimelineFeed
            items={filteredRecords}
            emptyTitle="当前筛选下没有可追溯记录"
            emptyDesc="可以切回“全部”看看完整链路，或换一个模块继续筛选。"
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock3 size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">为什么要有这页</span>
            </div>
            <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">新品信息不同步时，问题往往不是“有没有通知”，而是下游课件、题库、陪练有没有同版。</div>
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">销售与设计讲法不一致时，不能只回看需求交接，还要看会审决议、评分反馈和案例沉淀有没有补上。</div>
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">补训与复测如果没有时间线，后面很难判断是“没学会”还是“流程没接上”。</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw size={15} className="text-[#16A34A]" />
              <span className="text-sm font-medium text-gray-900">快速跳转</span>
            </div>
            <div className="space-y-2">
              {[
                { title: "更新记录页", path: "/workbench/info-sync/records", desc: "看更新有没有真正同步完" },
                { title: "会审记录页", path: "/workbench/collab/records", desc: "看决议、评分和案例沉淀" },
                { title: "复测 / 补考页", path: "/learning/growth/retest-makeup", desc: "看补训结果有没有闭环" },
                { title: "审批状态页", path: "/profile/approval-status", desc: "看申请节点和审批时间线" },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => navigate(item.path)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-3 text-left hover:border-[#D9E5FF] hover:bg-[#F7FAFF] transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
