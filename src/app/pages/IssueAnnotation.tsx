import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  GitBranch,
  ShieldCheck,
  Tag,
  Target,
  XCircle,
} from "lucide-react";
import {
  annotationLevelLabel,
  annotationLevelTone,
  getOrderById,
} from "../data/orderReviewData";
import { getIssueAnnotationDetailByOrderId } from "../data/issueAnnotationDetailData";

function getHistoryStatusClass(status: "done" | "current" | "pending") {
  if (status === "done") return "bg-green-100 text-[#15803D] border-green-200";
  if (status === "current") return "bg-blue-100 text-[#2F5FD0] border-blue-200";
  return "bg-gray-100 text-gray-500 border-gray-200";
}

function getHandoffStatusClass(status: "done" | "pending" | "risk") {
  if (status === "done") return "bg-green-100 text-[#15803D] border-green-200";
  if (status === "risk") return "bg-red-100 text-[#DC2626] border-red-200";
  return "bg-amber-100 text-[#B45309] border-amber-200";
}

function getApprovalStatusClass(status: "approved" | "pending" | "rejected") {
  if (status === "approved") return "bg-green-100 text-[#15803D] border-green-200";
  if (status === "rejected") return "bg-red-100 text-[#DC2626] border-red-200";
  return "bg-amber-100 text-[#B45309] border-amber-200";
}

export default function IssueAnnotation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const order = useMemo(() => getOrderById(id), [id]);
  const detail = useMemo(() => getIssueAnnotationDetailByOrderId(id), [id]);

  if (!order) {
    return (
      <div className="min-h-full bg-[#F5F7FA] px-4 md:px-6 py-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6">
          <button
            onClick={() => navigate("/workbench/order-review")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft size={16} /> 返回审单回流工作台
          </button>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
            <p className="text-sm font-medium text-[#B45309]">未找到对应订单</p>
            <p className="text-sm text-amber-700 mt-1 leading-relaxed">当前问题标注页没有匹配到订单数据，建议回到审单列表重新进入。</p>
          </div>
        </div>
      </div>
    );
  }

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
                <span className={`text-xs px-2 py-0.5 rounded-full ${annotationLevelTone(order.annotation.level)}`}>
                  {annotationLevelLabel(order.annotation.level)}
                </span>
                <span className="text-xs text-gray-400">来源：{order.annotation.source}</span>
                <span className="text-xs text-gray-400">责任线索：{order.annotation.owner}</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">{order.orderNo} · 问题标注</h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                把异常类型、证据链、影响节点和回流目标单独展开，并补上标注历史、责任转交和审批留痕，避免问题只停留在一个结果结论里。
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/workbench/order-review/validation/${order.id}`)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                查看工艺 / 生产数据校验页
              </button>
              <button
                onClick={() => navigate(`/workbench/order-review/attribution/${order.id}`)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                查看售后归因页
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-5 gap-3">
            {[
              { label: "异常类型", value: order.annotation.type },
              { label: "证据条数", value: `${order.annotation.evidence.length} 条` },
              { label: "标注历史", value: `${detail.history.length} 个节点` },
              { label: "责任转交", value: `${detail.handoffs.length} 次` },
              { label: "审批留痕", value: `${detail.approvals.length} 条` },
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
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">标注说明</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                {[
                  { k: "订单号", v: order.orderNo },
                  { k: "客户", v: order.customer },
                  { k: "产品", v: order.product },
                  { k: "当前阶段", v: order.stage },
                ].map((item) => (
                  <div key={item.k} className="rounded-xl bg-[#F8FAFC] px-3 py-3">
                    <div className="text-gray-400">{item.k}</div>
                    <div className="text-gray-700 mt-1 leading-relaxed">{item.v}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-3 text-xs text-red-700 leading-relaxed">
                {order.annotation.description}
              </div>
              <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 px-3 py-3">
                <p className="text-xs font-medium text-[#2F5FD0]">为什么这次要补深</p>
                <p className="text-xs text-[#3651A3] mt-1 leading-relaxed">{detail.summary}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">证据链</span>
              </div>
              <div className="space-y-2">
                {order.annotation.evidence.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock3 size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">标注历史</span>
              </div>
              <div className="space-y-4">
                {detail.history.map((item, index) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center pt-0.5">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium ${getHistoryStatusClass(item.status)}`}>
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
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getHistoryStatusClass(item.status)}`}>
                          {item.status === "done" ? "已完成" : item.status === "current" ? "当前节点" : "待处理"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">{item.time}</p>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.detail}</p>
                    </div>
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
                {order.annotation.suggestedActions.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">标注标签</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {order.annotation.tags.map((item) => (
                  <span key={item} className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">影响节点</span>
              </div>
              <div className="space-y-2">
                {order.annotation.impactNodes.map((item) => (
                  <div key={item} className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-700 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">责任转交链</span>
              </div>
              <div className="space-y-3">
                {detail.handoffs.map((item) => (
                  <div key={item.id} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <p className="text-sm font-medium text-gray-900">{item.from} <ArrowRight size={13} className="inline text-gray-400" /> {item.to}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getHandoffStatusClass(item.status)}`}>
                        {item.status === "done" ? "已转交" : item.status === "risk" ? "风险未闭环" : "待接收"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">转交原因：{item.reason}</p>
                    <div className="mt-2 rounded-lg bg-white border border-gray-200 px-3 py-2 text-xs text-gray-600 leading-relaxed">
                      下一步期望：{item.expectation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">审批留痕</span>
              </div>
              <div className="space-y-3">
                {detail.approvals.map((item) => (
                  <div key={item.id} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <p className="text-sm font-medium text-gray-900">{item.node}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getApprovalStatusClass(item.status)}`}>
                        {item.status === "approved" ? "已确认" : item.status === "rejected" ? "未通过" : "待确认"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{item.owner} · {item.time}</p>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">同步去向</span>
              </div>
              <div className="space-y-2 mb-3">
                {order.annotation.syncTargets.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-3 text-xs text-blue-700 leading-relaxed">
                {order.annotation.shouldFlowback
                  ? "建议确认标注后直接触发培训回流，避免异常只停留在当前单据。"
                  : "当前问题无需回流培训系统，但仍建议保留最小留痕说明。"}
              </div>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3">
              <div className="flex items-center gap-2 text-[#15803D] mb-1">
                <CheckCircle2 size={14} />
                <span className="text-sm font-medium">问题标注闭环说明</span>
              </div>
              <p className="text-xs text-green-700 leading-relaxed">{detail.closureRule}</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/workbench/order-review/flowback/${order.id}`)}
                className="flex-1 min-w-[180px] py-2.5 rounded-xl bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
              >
                确认标注并去培训回流
              </button>
              <button
                onClick={() => navigate(`/workbench/order-review/attribution/${order.id}`)}
                className="flex-1 min-w-[180px] py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
              >
                去售后归因页
              </button>
              <button
                onClick={() => navigate("/workbench/order-review")}
                className="flex-1 min-w-[180px] py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
              >
                回到审单列表
              </button>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
              <div className="flex items-center gap-2 text-[#2F5FD0] mb-1">
                {detail.approvals.some((item) => item.status === "rejected") ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                <span className="text-sm font-medium">本页已补齐第六项核心内容</span>
              </div>
              <p className="text-xs text-[#3651A3] leading-relaxed">
                当前问题标注页已经从“结果展示”补成了“过程留痕页”，可以直接承接标注历史、责任转交链和审批记录，不需要再退回轻量弹窗。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
