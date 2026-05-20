import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowLeftRight,
  CheckSquare,
  Clock,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Palette,
  Phone,
  Send,
  Upload,
  UserRound,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { getRequestById, statusMeta } from "../data/collabData";

function getVisibleStepName(step: string) {
  if (step === "AI 讲稿优化") return "讲解口径同步";
  if (step === "会审准备") return "方案准备";
  if (step === "客户讲解评分") return "客户讲解确认";
  return step;
}

export default function RequestHandoff() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, currentIdentity } = useApp();
  const [confirmed, setConfirmed] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [progressNote, setProgressNote] = useState("");
  const [salesReport, setSalesReport] = useState({
    customerInfo: "",
    needs: "",
    notes: "",
    styleImageNote: "",
  });
  const [styleFileName, setStyleFileName] = useState("");
  const request = useMemo(() => getRequestById(id), [id]);
  const isSalesStaff = currentIdentity === "staff" && user?.staffRole === "sales";
  const currentStepIndex = request.steps.findIndex((step) => !step.done);
  const currentBlock = currentStepIndex >= 0 ? getVisibleStepName(request.steps[currentStepIndex].step) : "已完成同步";
  const reportValues = {
    customerInfo:
      salesReport.customerInfo ||
      `${request.customer}，${request.company}，${request.space}，预算 ${request.budget}，截止 ${request.deadline}`,
    needs: salesReport.needs || request.requirements,
    notes:
      salesReport.notes ||
      `${request.overviewFocus.join("；")}。报价前先确认预算上限，设计图和销售讲法需要同版。`,
    styleImageNote: salesReport.styleImageNote || `${request.style}。客户偏好明亮、易打理、适合老人使用的卫浴空间。`,
  };

  const updateSalesReport = (key: keyof typeof salesReport, value: string) => {
    setSalesReport((prev) => ({ ...prev, [key]: value }));
  };

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

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusMeta[request.status].tone}`}>
                  {statusMeta[request.status].label}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={11} /> {request.submittedAt}
                </span>
                <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                  截止：{request.deadline}
                </span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">销售设计师协同 · {request.title}</h1>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-sm transition-colors"
            >
              <Phone size={15} /> {isSalesStaff ? "联系设计师" : "联系销售"}
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "客户", value: `${request.customer}（${request.company}）` },
              { label: "销售", value: request.salesperson },
              { label: "预算", value: request.budget },
              { label: "当前进度", value: currentBlock },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/5 px-3 py-3">
                <p className="text-xs text-white/50 mb-1">{item.label}</p>
                <p className="text-sm text-white leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
        <div className="space-y-4">
          {isSalesStaff ? (
            <>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                  <div className="flex items-center gap-2">
                    <UserRound size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">需要联系的设计师</span>
                  </div>
                  <span className="text-xs text-gray-400">先把客户信息补齐，再同步给设计师</span>
                </div>

                <div className="grid lg:grid-cols-3 gap-3">
                  <div className="lg:col-span-2 rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-4">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <p className="text-base font-medium text-gray-900">{request.designer}</p>
                        <p className="text-sm text-gray-500 mt-1">方案设计对接 · 当前客户单负责人</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-white text-[#2F5FD0] border border-blue-100">
                        待销售补充资料
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2 mt-4 text-xs">
                      {[
                        { label: "负责内容", value: "卫浴方案、材料搭配、图纸确认" },
                        { label: "需要你补充", value: "客户预算、现场照片、风格偏好" },
                        { label: "会审时间", value: request.reviewPrep.meetingTime },
                      ].map((item) => (
                        <div key={item.label} className="rounded-lg bg-white border border-blue-100 px-3 py-3">
                          <p className="text-gray-400">{item.label}</p>
                          <p className="text-gray-800 leading-relaxed mt-1">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-4">
                    <p className="text-sm font-medium text-gray-900 mb-3">快速联系</p>
                    <div className="space-y-2">
                      <button className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#2F5FD0] text-white py-2 text-sm hover:bg-[#2550B8] transition-colors">
                        <MessageSquare size={14} /> 发消息给设计师
                      </button>
                      <button className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#16A34A] text-white py-2 text-sm hover:bg-[#15803D] transition-colors">
                        <Phone size={14} /> 打电话沟通
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mt-3">
                      建议先提交下方进度汇报，再电话说明客户最在意的预算和防滑安全点。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                  <div className="flex items-center gap-2">
                    <ArrowLeftRight size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">销售汇报当前进度</span>
                  </div>
                  <span className="text-xs text-gray-400">用于给设计师补齐客户背景和方案约束</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-sm font-medium text-gray-900">客户相关信息</span>
                      <textarea
                        value={reportValues.customerInfo}
                        onChange={(event) => updateSalesReport("customerInfo", event.target.value)}
                        className="mt-2 w-full min-h-[86px] resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F5FD0] focus:ring-1 focus:ring-[#2F5FD0]"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-gray-900">客户需求</span>
                      <textarea
                        value={reportValues.needs}
                        onChange={(event) => updateSalesReport("needs", event.target.value)}
                        className="mt-2 w-full min-h-[86px] resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F5FD0] focus:ring-1 focus:ring-[#2F5FD0]"
                      />
                    </label>
                  </div>

                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-sm font-medium text-gray-900">注意事项</span>
                      <textarea
                        value={reportValues.notes}
                        onChange={(event) => updateSalesReport("notes", event.target.value)}
                        className="mt-2 w-full min-h-[86px] resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F5FD0] focus:ring-1 focus:ring-[#2F5FD0]"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-gray-900">喜好风格图片说明</span>
                      <textarea
                        value={reportValues.styleImageNote}
                        onChange={(event) => updateSalesReport("styleImageNote", event.target.value)}
                        className="mt-2 w-full min-h-[86px] resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2F5FD0] focus:ring-1 focus:ring-[#2F5FD0]"
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-4 grid lg:grid-cols-3 gap-3">
                  <label className="lg:col-span-2 rounded-xl border border-dashed border-blue-200 bg-blue-50/40 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center text-center px-4 py-5 cursor-pointer min-h-[128px]">
                    <Upload size={22} className="text-[#2F5FD0] mb-2" />
                    <span className="text-sm text-gray-900">{styleFileName || "上传客户喜欢的风格图片、参考图或现场照片"}</span>
                    <span className="text-xs text-gray-500 mt-1">用于帮助设计师判断色系、材质和空间氛围</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => setStyleFileName(event.target.files?.[0]?.name ?? "")}
                    />
                  </label>

                  <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Palette size={15} className="text-[#F59E0B]" />
                      <p className="text-sm font-medium text-gray-900">风格偏好</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {["明亮白色系", "现代简约", "防滑安全", "易打理"].map((tag) => (
                        <span key={tag} className="rounded-lg bg-white border border-gray-100 px-2.5 py-2 text-xs text-gray-700 text-center">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 rounded-lg bg-white border border-gray-100 px-3 py-3 flex items-center gap-2 text-xs text-gray-500">
                      <ImageIcon size={14} className="text-gray-400 flex-shrink-0" />
                      {styleFileName ? "已附风格参考图" : "暂无图片时先用文字描述偏好"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-gray-100 pt-3 flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-xs text-gray-500">提交后设计师会看到客户背景、需求、注意事项和风格参考。</span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
                  >
                    <Send size={14} /> 提交给设计师
                  </button>
                </div>
              </div>
            </>
          ) : (
          <>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">销售已收集的信息</span>
              </div>
              <button
                type="button"
                onClick={() => setConfirmed(true)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-colors ${
                  confirmed
                    ? "bg-green-50 text-[#16A34A] border border-green-200"
                    : "bg-[#2F5FD0] hover:bg-[#2550B8] text-white"
                }`}
              >
                <CheckSquare size={15} /> {confirmed ? "已确认销售信息" : "确认销售信息"}
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              {[
                { k: "客户", v: `${request.customer}（${request.company}）` },
                { k: "对接销售", v: request.salesperson },
                { k: "对接设计师", v: request.designer },
                { k: "空间", v: request.space },
                { k: "预算", v: request.budget },
                { k: "截止时间", v: request.deadline },
                { k: "风格偏好", v: request.style },
                { k: "核心需求", v: request.requirements },
                { k: "当前重点", v: request.overviewFocus[0] },
              ].map((item) => (
                <div key={item.k} className="rounded-xl bg-[#F8FAFC] px-3 py-3 border border-gray-100">
                  <div className="text-gray-400">{item.k}</div>
                  <div className="text-gray-800 mt-1 leading-relaxed">{item.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 grid md:grid-cols-3 gap-2">
              {request.overviewFocus.map((item) => (
                <div key={item} className="rounded-xl border border-blue-100 bg-blue-50/50 px-3 py-3 text-xs text-[#1D4ED8] leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <ArrowLeftRight size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">设计师汇报当前进度</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">上传设计资料</p>
                <label className="min-h-[142px] rounded-xl border border-dashed border-blue-200 bg-blue-50/40 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center text-center px-4 py-5 cursor-pointer">
                  <Upload size={22} className="text-[#2F5FD0] mb-2" />
                  <span className="text-sm text-gray-900">{uploadedFileName || "点击上传图纸、方案、现场照片或资料"}</span>
                  <span className="text-xs text-gray-500 mt-1">支持图片、PDF、Word、Excel 等文件</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(event) => setUploadedFileName(event.target.files?.[0]?.name ?? "")}
                  />
                </label>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">填写进度说明</p>
                <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                  <textarea
                    value={progressNote}
                    onChange={(event) => setProgressNote(event.target.value)}
                    placeholder="例如：已完成卫浴空间初版方案，待销售确认客户是否接受 R10 防滑款和预算上限。"
                    className="w-full min-h-[102px] resize-none px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
                  />
                  <div className="border-t border-gray-100 px-3 py-2 flex items-center justify-between gap-3">
                    <span className="text-xs text-gray-400">用于同步给销售查看</span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
                    >
                      <Send size={13} /> 提交进度
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
