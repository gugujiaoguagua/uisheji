import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileCheck,
  Target,
} from "lucide-react";
import { getOrderById } from "../data/orderReviewData";
import {
  getOrderPreparationById,
  preparationConsistencyLabel,
  preparationConsistencyTone,
  preparationFieldLabel,
  preparationFieldTone,
  preparationOverallLabel,
  preparationOverallTone,
  preparationReminderLabel,
  preparationReminderTone,
  preparationTraceLabel,
  preparationTraceTone,
} from "../data/orderPreparationData";

export default function OrderPreparation() {
  const navigate = useNavigate();
  const { id } = useParams();

  const order = useMemo(() => getOrderById(id), [id]);
  const preparation = useMemo(() => getOrderPreparationById(id), [id]);

  const pendingFieldCount = preparation.keyFields.filter((item) => item.status !== "pass").length;
  const riskReminderCount = preparation.reminders.filter((item) => item.status !== "on-track").length;
  const pendingTraceCount = preparation.responsibilityTrace.filter((item) => item.status !== "done").length;

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
                <span className={`text-xs px-2 py-0.5 rounded-full ${preparationOverallTone(preparation.overallStatus)}`}>
                  {preparationOverallLabel(preparation.overallStatus)}
                </span>
                <span className="text-xs text-gray-400">当前阶段：{order.stage}</span>
                <span className="text-xs text-gray-400">工厂状态：{order.factoryStatus}</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">{order.orderNo} · 下单准备</h1>
              <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
                这页专门承接下单前准备动作：先看关键字段、图纸 / 报价口径、节点提醒和责任留痕是否齐，再决定能不能进入后续校验与执行。
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/workbench/order-review/validation/${order.id}`)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                去工艺 / 生产数据校验页
              </button>
              <button
                onClick={() => navigate(`/workbench/order-review/annotation/${order.id}`)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                去问题标注页
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "待补字段", value: `${pendingFieldCount} 项` },
              { label: "风险提醒", value: `${riskReminderCount} 条` },
              { label: "待确认留痕", value: `${pendingTraceCount} 条` },
              { label: "责任视角", value: order.ownerView },
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
            <div className={`rounded-xl border p-4 ${preparationOverallTone(preparation.overallStatus)}`}>
              <div className="flex items-center gap-2 mb-2">
                <FileCheck size={15} />
                <span className="text-sm font-medium">准备结论</span>
              </div>
              <p className="text-xs leading-relaxed">{preparation.summary}</p>
            </div>

            <div className="rounded-xl border border-[#D9E5FF] bg-[linear-gradient(180deg,#F7FAFF_0%,#FFFFFF_100%)] p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EAF1FF] flex items-center justify-center flex-shrink-0">
                  <Target size={16} className="text-[#2F5FD0]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">这页和校验页的分工不同</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{preparation.pageHint}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileCheck size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">下单前关键字段校验</span>
              </div>
              <div className="space-y-2">
                {preparation.keyFields.map((item) => (
                  <div key={item.label} className={`rounded-xl border px-3 py-3 ${preparationFieldTone(item.status)}`}>
                    <div className="flex items-center justify-between gap-3 text-xs font-medium flex-wrap mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span>{item.label}</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/50">{preparationFieldLabel(item.status)}</span>
                      </div>
                      <span>责任：{item.owner}</span>
                    </div>
                    <div className="rounded-lg bg-white/50 px-3 py-2 text-xs mb-2">
                      <p className="opacity-70 mb-1">来源：{item.source}</p>
                      <p>{item.value}</p>
                    </div>
                    <p className="text-xs leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">图纸与报价一致性校验</span>
              </div>
              <div className="space-y-2">
                {preparation.drawingQuoteChecks.map((item) => (
                  <div key={item.label} className={`rounded-xl border px-3 py-3 ${preparationConsistencyTone(item.status)}`}>
                    <div className="flex items-center justify-between gap-3 text-xs font-medium flex-wrap mb-2">
                      <span>{item.label}</span>
                      <span>{preparationConsistencyLabel(item.status)}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-xs">
                      <div className="rounded-lg bg-white/50 px-3 py-2">
                        <p className="opacity-70 mb-1">图纸 / 标准</p>
                        <p>{item.drawing}</p>
                      </div>
                      <div className="rounded-lg bg-white/50 px-3 py-2">
                        <p className="opacity-70 mb-1">报价 / 前台口径</p>
                        <p>{item.quote}</p>
                      </div>
                    </div>
                    <p className="text-xs mt-2 leading-relaxed">影响：{item.impact}</p>
                    <p className="text-xs mt-1 leading-relaxed">说明：{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">节点提醒</span>
              </div>
              <div className="space-y-2">
                {preparation.reminders.map((item) => (
                  <div key={`${item.node}-${item.deadline}`} className={`rounded-xl border px-3 py-3 ${preparationReminderTone(item.status)}`}>
                    <div className="flex items-center justify-between gap-3 text-xs font-medium flex-wrap mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span>{item.node}</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/50">{preparationReminderLabel(item.status)}</span>
                      </div>
                      <span>{item.deadline}</span>
                    </div>
                    <p className="text-xs leading-relaxed">责任人：{item.owner}</p>
                    <p className="text-xs mt-1 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">提交前必须补齐</span>
              </div>
              <div className="space-y-2">
                {preparation.requiredBeforeSubmit.map((item) => (
                  <div key={item} className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-700 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">执行责任留痕</span>
              </div>
              <div className="space-y-2">
                {preparation.responsibilityTrace.map((item) => (
                  <div key={`${item.role}-${item.action}`} className={`rounded-xl border px-3 py-3 ${preparationTraceTone(item.status)}`}>
                    <div className="flex items-center justify-between gap-3 text-xs font-medium flex-wrap mb-2">
                      <span>{item.role}</span>
                      <span>{preparationTraceLabel(item.status)}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{item.action}</p>
                    <p className="text-xs mt-1 leading-relaxed opacity-80">时间：{item.time}</p>
                    <p className="text-xs mt-1 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-sm font-medium text-gray-900 mb-3">跨角色同步提醒</p>
              <div className="space-y-2">
                {preparation.syncNotes.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-sm font-medium text-gray-900 mb-3">下一步动作</p>
              <div className="space-y-2">
                {preparation.nextActions.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap mt-3">
                <button
                  onClick={() => navigate(`/workbench/order-review/validation/${order.id}`)}
                  className="flex-1 min-w-[180px] py-2.5 rounded-xl bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
                >
                  补齐后去校验页
                </button>
                <button
                  onClick={() => navigate("/workbench/info-sync")}
                  className="flex-1 min-w-[180px] py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  去信息同步追源
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
