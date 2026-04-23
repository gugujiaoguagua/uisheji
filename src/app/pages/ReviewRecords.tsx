import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
  Star,
  Users,
} from "lucide-react";
import { TimelineFeed } from "../components/TimelineFeed";
import { reviewRecords, type RecordTone } from "../data/workflowData";

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

export default function ReviewRecords() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(reviewRecords[0].id);

  const selectedRecord = useMemo(
    () => reviewRecords.find((item) => item.id === selectedId) ?? reviewRecords[0],
    [selectedId],
  );

  const doneCount = reviewRecords.filter((item) => item.tone === "done").length;
  const pendingCount = reviewRecords.filter((item) => item.tone === "pending").length;

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/workbench/collab")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回销设协同
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EEF4FF] text-[#2F5FD0]">会审留痕独立页</span>
                <span className="text-xs text-gray-400">不只看准备，还把决议、评分和案例沉淀继续接上</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">会审记录页</h1>
              <p className="text-sm text-gray-500 leading-relaxed">把会审后的决议、责任人、后续动作和可复用资产沉淀下来，减少销售、设计和带教之间再次出现讲法不一致。</p>
            </div>
            <button
              onClick={() => navigate("/workbench/history")}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
            >
              查看通用时间线
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "记录数", value: `${reviewRecords.length} 条` },
              { label: "已沉淀", value: `${doneCount} 条` },
              { label: "待补记录", value: `${pendingCount} 条` },
              { label: "可复用资产", value: `${reviewRecords.reduce((sum, item) => sum + item.assets.length, 0)} 项` },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/5 px-3 py-3">
                <p className="text-xs text-white/50 mb-1">{item.label}</p>
                <p className="text-sm text-white leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 grid md:grid-cols-5 gap-4">
        <div className="md:col-span-2 space-y-3">
          {reviewRecords.map((record) => (
            <button
              key={record.id}
              onClick={() => setSelectedId(record.id)}
              className={`w-full text-left bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all ${
                selectedRecord.id === record.id ? "ring-2 ring-[#2F5FD0]" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EEF4FF] flex items-center justify-center flex-shrink-0">
                  <Users size={16} className="text-[#2F5FD0]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${toneMeta(record.tone)}`}>{toneLabel(record.tone)}</span>
                    <span className="text-xs text-gray-400">{record.meetingTime}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{record.title}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{record.summary}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${toneMeta(selectedRecord.tone)}`}>{toneLabel(selectedRecord.tone)}</span>
                  <span className="text-xs text-gray-400">会审时间：{selectedRecord.meetingTime}</span>
                  <span className="text-xs text-gray-400">负责人：{selectedRecord.owner}</span>
                </div>
                <h2 className="text-base font-medium text-gray-900">{selectedRecord.title}</h2>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{selectedRecord.summary}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => navigate(selectedRecord.relatedPath)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  查看会审准备页
                </button>
                <button
                  onClick={() => navigate(selectedRecord.scorePath)}
                  className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
                >
                  查看评分反馈页
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">会审决议</span>
              </div>
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                {selectedRecord.decision}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">参与角色</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedRecord.attendees.map((item) => (
                  <span key={item} className="text-xs px-2 py-1 rounded-full bg-[#F5F7FA] border border-gray-200 text-gray-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Star size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">当前判断</span>
              </div>
              <div className={`rounded-xl px-3 py-3 text-xs leading-relaxed ${selectedRecord.tone === "done" ? "bg-green-50 text-[#15803D]" : selectedRecord.tone === "risk" ? "bg-red-50 text-[#DC2626]" : "bg-amber-50 text-[#B45309]"}`}>
                {selectedRecord.tone === "done"
                  ? "当前这条会审已经完成评分和案例沉淀，可以直接复用。"
                  : "当前会审还没有完全闭环，需要把决议、评分与资产沉淀继续补齐。"}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-[#16A34A]" />
                <span className="text-sm font-medium text-gray-900">后续动作</span>
              </div>
              <div className="space-y-2">
                {selectedRecord.followUps.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">沉淀资产</span>
              </div>
              <div className="space-y-2">
                {selectedRecord.assets.map((item) => (
                  <div key={item} className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-700 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock3 size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">会审推进记录</span>
            </div>
            <TimelineFeed items={selectedRecord.history} />
          </div>
        </div>
      </div>
    </div>
  );
}
