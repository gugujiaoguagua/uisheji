import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Clock, FileText, MessageSquare, Send, Upload } from "lucide-react";
import { getRequestById } from "../data/collabData";
import { getReviewPreparationDetailByRequestId } from "../data/reviewPreparationDetailData";

export default function ReviewPreparation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [recordText, setRecordText] = useState("");
  const request = useMemo(() => getRequestById(id), [id]);
  const detail = useMemo(() => getReviewPreparationDetailByRequestId(request.id), [request.id]);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/workbench/collab")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回销售设计师协同
          </button>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-gray-900 text-base leading-snug">{request.title} · 会审记录</h1>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock size={11} /> {request.reviewPrep.meetingTime}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={15} className="text-[#2F5FD0]" />
            <span className="text-sm font-medium text-gray-900">会审记录</span>
          </div>
          <div className="rounded-xl border border-[#D9E5FF] bg-[#F7FAFF] px-3 py-3 text-sm text-[#2F5FD0] leading-relaxed mb-3">
            {detail.minutesSummary}
          </div>
          <div className="space-y-2">
            {detail.minutes.map((item) => (
              <div key={item.id} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-1">
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={15} className="text-[#2F5FD0]" />
            <span className="text-sm font-medium text-gray-900">资料</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {request.reviewPrep.materials.map((item) => (
              <span key={item} className="text-sm px-3 py-2 rounded-xl bg-[#F8FAFC] border border-gray-200 text-gray-700">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <Upload size={15} className="text-[#2F5FD0]" />
            <span className="text-sm font-medium text-gray-900">上传资料和文本入口</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <label className="min-h-[160px] rounded-xl border border-dashed border-blue-200 bg-blue-50/40 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center text-center px-4 py-5 cursor-pointer">
              <Upload size={24} className="text-[#2F5FD0] mb-2" />
              <span className="text-sm text-gray-900">{uploadedFileName || "点击上传会审资料"}</span>
              <span className="text-xs text-gray-500 mt-1">支持图片、PDF、Word、Excel 等文件</span>
              <input
                type="file"
                className="hidden"
                onChange={(event) => setUploadedFileName(event.target.files?.[0]?.name ?? "")}
              />
            </label>

            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <textarea
                value={recordText}
                onChange={(event) => setRecordText(event.target.value)}
                placeholder="在这里填写会审记录、补充说明或需要同步的事项。"
                className="w-full min-h-[118px] resize-none px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
              />
              <div className="border-t border-gray-100 px-3 py-2 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                  <MessageSquare size={13} /> 文本入口
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
                >
                  <Send size={13} /> 提交
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
