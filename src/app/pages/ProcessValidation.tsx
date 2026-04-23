import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileCheck,
  Factory,
  History,
  Target,
} from "lucide-react";
import {
  getOrderById,
  validationSummaryLabel,
  validationSummaryTone,
  validationTone,
} from "../data/orderReviewData";
import { getProcessValidationDetailByOrderId } from "../data/processValidationDetailData";

function getScheduleStatusClass(status: "on-track" | "warning" | "overdue" | "done") {
  if (status === "done") return "bg-green-100 text-[#15803D] border-green-200";
  if (status === "overdue") return "bg-red-100 text-[#DC2626] border-red-200";
  if (status === "warning") return "bg-amber-100 text-[#B45309] border-amber-200";
  return "bg-blue-100 text-[#2F5FD0] border-blue-200";
}

function getProductionStatusClass(status: "pass" | "warning" | "block") {
  if (status === "pass") return "bg-green-50 border-green-100 text-[#15803D]";
  if (status === "block") return "bg-red-50 border-red-100 text-[#DC2626]";
  return "bg-amber-50 border-amber-100 text-[#B45309]";
}

function getHistoryStatusClass(status: "pass" | "warning" | "risk") {
  if (status === "pass") return "bg-green-100 text-[#15803D] border-green-200";
  if (status === "risk") return "bg-red-100 text-[#DC2626] border-red-200";
  return "bg-amber-100 text-[#B45309] border-amber-200";
}

export default function ProcessValidation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const order = useMemo(() => getOrderById(id), [id]);
  const detail = useMemo(() => getProcessValidationDetailByOrderId(id), [id]);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/workbench/order-review")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回审单回流工作台
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${validationSummaryTone(order.validation.overallStatus)}`}>
                  {validationSummaryLabel(order.validation.overallStatus)}
                </span>
                <span className="text-xs text-gray-400">工厂状态：{order.factoryStatus}</span>
                <span className="text-xs text-gray-400">阶段：{order.stage}</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">{order.orderNo} · 工艺 / 生产数据校验</h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                把图纸、报价、工艺规范和生产数据的对照逻辑单独展开，并继续补到工期预警、投产确认和历史校验追溯，避免异常只停留在一句“规格不符”。
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/workbench/order-review/preparation/${order.id}`)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                去下单准备页
              </button>
              <button
                onClick={() => navigate(`/workbench/order-review/annotation/${order.id}`)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                去问题标注页
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-5 gap-3">
            {[
              { label: "校验组数", value: `${order.validation.groups.length} 组` },
              { label: "阻塞项", value: `${order.validation.blockers.length} 项` },
              { label: "工期预警", value: `${detail.scheduleAlerts.filter((item) => item.status === "warning" || item.status === "overdue").length} 项` },
              { label: "投产确认", value: `${detail.productionChecks.length} 项` },
              { label: "历史校验", value: `${detail.history.length} 条` },
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
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className={`rounded-xl border p-4 ${validationSummaryTone(order.validation.overallStatus)}`}>
              <div className="flex items-center gap-2 mb-2">
                <FileCheck size={15} />
                <span className="text-sm font-medium">校验结论</span>
              </div>
              <p className="text-xs leading-relaxed">{order.validation.summary}</p>
              <div className="mt-3 rounded-xl bg-white/60 px-3 py-3 text-xs leading-relaxed">
                {detail.summary}
              </div>
            </div>

            {order.validation.groups.map((group) => (
              <div key={group.title} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{group.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{group.sourceA} vs {group.sourceB}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <div key={`${group.title}-${item.label}`} className={`rounded-xl border px-3 py-3 ${validationTone(item.status)}`}>
                      <div className="flex items-center justify-between gap-3 text-xs font-medium mb-2">
                        <span>{item.label}</span>
                        <span>
                          {item.status === "match" ? "一致" : item.status === "mismatch" ? "不一致" : "缺失"}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-2 text-xs">
                        <div className="rounded-lg bg-white/50 px-3 py-2">
                          <p className="opacity-70 mb-1">{group.sourceA}</p>
                          <p>{item.expected}</p>
                        </div>
                        <div className="rounded-lg bg-white/50 px-3 py-2">
                          <p className="opacity-70 mb-1">{group.sourceB}</p>
                          <p>{item.actual}</p>
                        </div>
                      </div>
                      <p className="text-xs mt-2 leading-relaxed">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <History size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">历史校验追溯</span>
              </div>
              <div className="space-y-4">
                {detail.history.map((item, index) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center pt-0.5">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium ${getHistoryStatusClass(item.result)}`}>
                        {index + 1}
                      </div>
                      {index < detail.history.length - 1 && <div className="mt-1 h-12 w-px bg-gray-200" />}
                    </div>
                    <div className="flex-1 rounded-xl border border-gray-200 bg-[#FAFBFC] px-4 py-3">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{item.actor}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getHistoryStatusClass(item.result)}`}>
                          {item.result === "pass" ? "通过" : item.result === "risk" ? "高风险" : "预警"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">{item.time}</p>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">阻塞项</span>
              </div>
              {order.validation.blockers.length > 0 ? (
                <div className="space-y-2">
                  {order.validation.blockers.map((item) => (
                    <div key={item} className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-700 leading-relaxed">
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-green-100 bg-green-50 px-3 py-3 text-xs text-green-700 leading-relaxed">
                  当前没有阻塞项。
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock3 size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">工期预警</span>
              </div>
              <div className="space-y-3">
                {detail.scheduleAlerts.map((item) => (
                  <div key={item.id} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <p className="text-sm font-medium text-gray-900">{item.node}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getScheduleStatusClass(item.status)}`}>
                        {item.status === "done"
                          ? "已完成"
                          : item.status === "overdue"
                            ? "已超时"
                            : item.status === "warning"
                              ? "需关注"
                              : "按计划推进"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{item.owner} · 截止 {item.deadline}</p>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Factory size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">投产确认</span>
              </div>
              <div className="space-y-3">
                {detail.productionChecks.map((item) => (
                  <div key={item.id} className={`rounded-xl border px-3 py-3 ${getProductionStatusClass(item.status)}`}>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <p className="text-sm font-medium">{item.label}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-current/20 bg-white/50">
                        {item.status === "pass" ? "可放行" : item.status === "block" ? "阻断投产" : "待补确认"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                      <div className="rounded-lg bg-white/50 px-3 py-2">
                        <p className="opacity-70 mb-1">应满足</p>
                        <p>{item.expected}</p>
                      </div>
                      <div className="rounded-lg bg-white/50 px-3 py-2">
                        <p className="opacity-70 mb-1">当前状态</p>
                        <p>{item.actual}</p>
                      </div>
                    </div>
                    <p className="text-xs mt-2 opacity-80">责任人：{item.owner}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">建议动作</span>
              </div>
              <div className="space-y-2">
                {order.validation.recommendations.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/workbench/order-review/annotation/${order.id}`)}
                className="flex-1 min-w-[180px] py-2.5 rounded-xl bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
              >
                去问题标注页固化异常
              </button>
              <button
                onClick={() => navigate(`/workbench/order-review/flowback/${order.id}`)}
                className="flex-1 min-w-[180px] py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
              >
                去培训回流页
              </button>
              <button
                onClick={() => navigate("/workbench/info-sync")}
                className="flex-1 min-w-[180px] py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
              >
                去信息同步中心追源
              </button>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3">
              <div className="flex items-center gap-2 text-[#15803D] mb-1">
                <CheckCircle2 size={14} />
                <span className="text-sm font-medium">工艺校验闭环说明</span>
              </div>
              <p className="text-xs text-green-700 leading-relaxed">{detail.closureRule}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
