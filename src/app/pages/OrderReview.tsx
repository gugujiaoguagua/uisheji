import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  FileCheck,
  Send,
  SlidersHorizontal,
  Tag,
  X,
} from "lucide-react";
import {
  afterSaleIssues,
  annotationLevelLabel,
  annotationLevelTone,
  flowTone,
  orders,
  rootTone,
  urgencyLabel,
  urgencyTone,
  validationSummaryLabel,
  validationSummaryTone,
} from "../data/orderReviewData";
import { GlobalStateCard } from "../components/GlobalStateCard";

type MainTab = "orders" | "aftersale";
type DetailTab = "detail" | "attribution" | "flowback";

export default function OrderReview() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MainTab>("orders");
  const [detailTab, setDetailTab] = useState<DetailTab>("detail");
  const [showAnnotateModal, setShowAnnotateModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0].id);
  const [typeFilter, setTypeFilter] = useState("全部");
  const [nodeFilter, setNodeFilter] = useState("全部");
  const [ownerFilter, setOwnerFilter] = useState("全部");

  const typeOptions = useMemo(() => ["全部", ...new Set(orders.map((item) => item.taskType))], []);
  const nodeOptions = useMemo(() => ["全部", ...new Set(orders.map((item) => item.stage))], []);
  const ownerOptions = useMemo(() => ["全部", ...new Set(orders.map((item) => item.ownerView))], []);

  const filteredOrders = useMemo(() => {
    return orders.filter((item) => {
      const matchType = typeFilter === "全部" || item.taskType === typeFilter;
      const matchNode = nodeFilter === "全部" || item.stage === nodeFilter;
      const matchOwner = ownerFilter === "全部" || item.ownerView === ownerFilter;
      return matchType && matchNode && matchOwner;
    });
  }, [nodeFilter, ownerFilter, typeFilter]);

  const selectedOrder = useMemo(
    () => filteredOrders.find((item) => item.id === selectedOrderId) ?? filteredOrders[0] ?? null,
    [filteredOrders, selectedOrderId],
  );

  const abnormalCount = orders.filter((item) => item.status === "abnormal").length;
  const afterSaleCount = orders.filter((item) => item.afterSale).length;
  const flowbackReadyCount = orders.filter((item) => item.canFlowback).length;

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-gray-900 mb-0.5">审单 · 售后 · 回流培训</h1>
          <p className="text-xs text-gray-500">把异常详情、责任归因和培训回流拆开，也把审单任务本身补成更完整的风险任务列表。</p>

          <div className="flex gap-1 mt-3">
            {[
              { key: "orders", label: "审单任务" },
              { key: "aftersale", label: "售后归因 & 回流" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as MainTab)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  activeTab === tab.key ? "bg-[#2F5FD0] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
        {activeTab === "orders" ? (
          <div className="space-y-4">
            <div className="grid md:grid-cols-4 gap-3">
              {[
                { label: "当前任务总数", value: `${orders.length} 单` },
                { label: "异常待处理", value: `${abnormalCount} 单` },
                { label: "售后复盘单", value: `${afterSaleCount} 单` },
                { label: "可回流培训", value: `${flowbackReadyCount} 单` },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-white shadow-sm px-4 py-3">
                  <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                  <p className="text-sm text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <SlidersHorizontal size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">任务筛选</span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-2">按异常类型</p>
                  <div className="flex flex-wrap gap-2">
                    {typeOptions.map((item) => (
                      <button
                        key={item}
                        onClick={() => setTypeFilter(item)}
                        className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                          typeFilter === item ? "bg-[#2F5FD0] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">按当前节点</p>
                  <div className="flex flex-wrap gap-2">
                    {nodeOptions.map((item) => (
                      <button
                        key={item}
                        onClick={() => setNodeFilter(item)}
                        className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                          nodeFilter === item ? "bg-[#EEF4FF] text-[#2F5FD0]" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2">按责任视角</p>
                  <div className="flex flex-wrap gap-2">
                    {ownerOptions.map((item) => (
                      <button
                        key={item}
                        onClick={() => setOwnerFilter(item)}
                        className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                          ownerFilter === item ? "bg-[#EEF4FF] text-[#2F5FD0]" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-2 space-y-3">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <button
                      key={order.id}
                      onClick={() => setSelectedOrderId(order.id)}
                      className={`w-full text-left bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all ${
                        selectedOrder?.id === order.id ? "ring-2 ring-[#2F5FD0]" : ""
                      }`}
                      style={{ borderLeft: `3px solid ${order.urgency === "urgent" ? "#DC2626" : order.urgency === "warning" ? "#F59E0B" : "#16A34A"}` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${order.status === "abnormal" ? "bg-red-50" : "bg-green-50"}`}>
                          {order.status === "abnormal" ? (
                            <AlertTriangle size={17} className="text-[#DC2626]" />
                          ) : (
                            <CheckCircle2 size={17} className="text-[#16A34A]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-xs font-medium text-gray-900">{order.orderNo}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${urgencyTone(order.urgency)}`}>
                              {urgencyLabel(order.urgency)}
                            </span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-[#EEF4FF] text-[#2F5FD0]">{order.taskType}</span>
                          </div>
                          <p className="text-sm text-gray-800">{order.customer} · {order.salesperson}</p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{order.product}</p>
                          <div className="flex items-center gap-2 flex-wrap mt-2">
                            <span className="text-xs px-1.5 py-0.5 rounded bg-[#F5F7FA] text-gray-600">{order.stage}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-[#F5F7FA] text-gray-600">责任：{order.ownerView}</span>
                          </div>
                          <p className={`text-xs mt-2 line-clamp-2 ${order.issue ? "text-[#DC2626]" : "text-[#15803D]"}`}>
                            {order.issue || "当前订单通过校验，可继续推进。"}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <GlobalStateCard
                    tone="empty"
                    size="sm"
                    title="当前筛选条件下没有任务"
                    description="不是审单列表为空，而是当前任务类型、节点或责任视角没有命中结果。可以切回“全部”继续查看完整任务列表。"
                    action={{
                      label: "恢复全部筛选",
                      onClick: () => {
                        setTypeFilter("全部");
                        setNodeFilter("全部");
                        setOwnerFilter("全部");
                      },
                    }}
                  />
                )}
              </div>

              <div className="md:col-span-3 space-y-4">
                {selectedOrder ? (
                  <>
                    <div className="bg-white rounded-xl shadow-sm p-4">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${selectedOrder.status === "abnormal" ? "bg-red-100 text-[#DC2626]" : "bg-green-100 text-[#16A34A]"}`}>
                              {selectedOrder.status === "abnormal" ? "异常单" : "正常单"}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${annotationLevelTone(selectedOrder.annotation.level)}`}>
                              {annotationLevelLabel(selectedOrder.annotation.level)}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock size={11} /> {selectedOrder.submittedAt}
                            </span>
                          </div>
                          <h2 className="text-base font-medium text-gray-900">{selectedOrder.orderNo}</h2>
                          <p className="text-xs text-gray-500 mt-1">客户：{selectedOrder.customer} · 产品：{selectedOrder.product}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => navigate(`/workbench/order-review/preparation/${selectedOrder.id}`)}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            下单准备页
                          </button>
                          <button
                            onClick={() => navigate(`/workbench/order-review/validation/${selectedOrder.id}`)}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            工艺 / 生产数据校验页
                          </button>
                          <button
                            onClick={() => navigate(`/workbench/order-review/attribution/${selectedOrder.id}`)}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            售后归因页
                          </button>
                          <button
                            onClick={() => navigate(`/workbench/order-review/flowback/${selectedOrder.id}`)}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            培训回流页
                          </button>
                          {selectedOrder.status === "abnormal" && (
                            <>
                              <button
                                onClick={() => navigate(`/workbench/order-review/annotation/${selectedOrder.id}`)}
                                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                              >
                                问题标注页
                              </button>
                              <button
                                onClick={() => setShowAnnotateModal(true)}
                                className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
                              >
                                标注异常
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-1 bg-[#F5F7FA] rounded-xl p-1 mt-4 overflow-x-auto hide-scrollbar">
                        {[
                          { key: "detail", label: "异常详情" },
                          { key: "attribution", label: "责任归因" },
                          { key: "flowback", label: "回流计划" },
                        ].map((tab) => (
                          <button
                            key={tab.key}
                            onClick={() => setDetailTab(tab.key as DetailTab)}
                            className={`flex-1 min-w-[96px] py-2 rounded-lg text-xs transition-colors ${
                              detailTab === tab.key ? "bg-[#2F5FD0] text-white" : "text-gray-600 hover:text-gray-800"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {detailTab === "detail" && (
                      <>
                        <div className="bg-white rounded-xl shadow-sm p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <FileCheck size={15} className="text-[#2F5FD0]" />
                            <span className="text-sm font-medium text-gray-900">异常详情</span>
                          </div>
                          {selectedOrder.issue ? (
                            <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-3 text-xs text-red-700 leading-relaxed">
                              {selectedOrder.issue}
                            </div>
                          ) : (
                            <div className="rounded-xl border border-green-100 bg-green-50 px-3 py-3 text-xs text-[#15803D]">
                              当前订单无异常。
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-3 text-xs mt-4">
                            {[
                              { k: "当前阶段", v: selectedOrder.stage },
                              { k: "工厂状态", v: selectedOrder.factoryStatus },
                              { k: "责任视角", v: selectedOrder.ownerView },
                              { k: "回流条件", v: selectedOrder.canFlowback ? "可回流培训" : "无需回流" },
                            ].map((item) => (
                              <div key={item.k} className="rounded-xl bg-[#F8FAFC] px-3 py-3">
                                <div className="text-gray-400">{item.k}</div>
                                <div className="text-gray-700 mt-1">{item.v}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white rounded-xl shadow-sm p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Tag size={15} className="text-[#2F5FD0]" />
                              <span className="text-sm font-medium text-gray-900">问题标注预览</span>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed mb-3">
                              {selectedOrder.annotation.description}
                            </div>
                            <button
                              onClick={() => navigate(`/workbench/order-review/annotation/${selectedOrder.id}`)}
                              className="w-full py-2 border border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              进入问题标注页
                            </button>
                          </div>

                          <div className="bg-white rounded-xl shadow-sm p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <FileCheck size={15} className="text-[#2F5FD0]" />
                              <span className="text-sm font-medium text-gray-900">校验结论预览</span>
                            </div>
                            <div className={`rounded-xl border px-3 py-3 text-xs leading-relaxed mb-3 ${validationSummaryTone(selectedOrder.validation.overallStatus)}`}>
                              {validationSummaryLabel(selectedOrder.validation.overallStatus)}：{selectedOrder.validation.summary}
                            </div>
                            <button
                              onClick={() => navigate(`/workbench/order-review/validation/${selectedOrder.id}`)}
                              className="w-full py-2 border border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              进入工艺 / 生产数据校验页
                            </button>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-4">
                          <p className="text-sm font-medium text-gray-900 mb-3">下一步处理动作</p>
                          <div className="space-y-2">
                            {selectedOrder.nextActions.map((item) => (
                              <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {detailTab === "attribution" && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl shadow-sm p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle size={15} className="text-[#F59E0B]" />
                            <span className="text-sm font-medium text-gray-900">责任归因拆解</span>
                          </div>
                          <div className="space-y-2">
                            {selectedOrder.afterSaleAttribution.categories.map((item) => (
                              <div key={item.label} className={`rounded-xl border px-3 py-3 ${rootTone(item.status)}`}>
                                <div className="flex items-center justify-between gap-3 text-xs font-medium">
                                  <span>{item.label}</span>
                                  <span>{item.owner}</span>
                                </div>
                                <p className="text-xs mt-2 leading-relaxed">{item.note}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-4">
                          <p className="text-sm font-medium text-gray-900 mb-3">归因结论</p>
                          <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-700 leading-relaxed mb-3">
                            {selectedOrder.afterSaleAttribution.summary}
                          </div>
                          <button
                            onClick={() => navigate(`/workbench/order-review/attribution/${selectedOrder.id}`)}
                            className="w-full py-2.5 rounded-xl bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
                          >
                            进入售后归因页
                          </button>
                        </div>
                      </div>
                    )}

                    {detailTab === "flowback" && (
                      <>
                        <div className="bg-white rounded-xl shadow-sm p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <BookOpen size={15} className="text-[#2F5FD0]" />
                            <span className="text-sm font-medium text-gray-900">培训回流计划</span>
                          </div>
                          <div className="space-y-2">
                            {selectedOrder.trainingFlowback.targets.map((item) => (
                              <div key={`${item.type}-${item.label}`} className={`rounded-xl border px-3 py-3 ${flowTone(item.status)}`}>
                                <div className="flex items-center justify-between gap-3 text-xs font-medium flex-wrap">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span>{item.label}</span>
                                    <span className="px-1.5 py-0.5 rounded bg-white/50">{item.type}</span>
                                  </div>
                                  <span>{item.owner}</span>
                                </div>
                                <p className="text-xs mt-2 leading-relaxed">{item.note}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => navigate(`/workbench/order-review/flowback/${selectedOrder.id}`)}
                            className="flex-1 min-w-[180px] py-2 bg-[#2F5FD0] hover:bg-[#2550B8] text-white rounded-xl text-sm transition-colors"
                          >
                            去培训回流页
                          </button>
                          <button
                            onClick={() => navigate("/workbench/content-ops")}
                            className="flex-1 min-w-[180px] py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors"
                          >
                            去培训运营执行回流
                          </button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <GlobalStateCard
                    tone="empty"
                    size="sm"
                    title="当前筛选条件下暂无可查看订单"
                    description="右侧详情位没有可承接订单，是因为当前筛选没有命中。请先恢复筛选后再继续查看详情。"
                    action={{
                      label: "恢复全部筛选",
                      onClick: () => {
                        setTypeFilter("全部");
                        setNodeFilter("全部");
                        setOwnerFilter("全部");
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs text-amber-800">
                🎯 售后归因的目标不只是解决当前问题，而是把问题回流成培训标准，让同类问题不再发生。
              </p>
            </div>

            {afterSaleIssues.map((issue) => (
              <div key={issue.id} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded">{issue.type}</span>
                      <span className="text-xs text-gray-400">关联订单 {issue.relatedOrder}</span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">{issue.desc}</p>
                  </div>
                  {issue.flowedBack ? (
                    <span className="text-xs px-1.5 py-0.5 bg-green-100 text-[#16A34A] rounded flex-shrink-0">已回流</span>
                  ) : (
                    <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded flex-shrink-0">待回流</span>
                  )}
                </div>

                <div className="rounded-xl bg-[#F5F7FA] p-3 mb-3">
                  <p className="text-xs text-gray-500 mb-0.5">关联培训内容</p>
                  <p className="text-xs text-gray-700">《{issue.training}》</p>
                </div>

                <div className="space-y-2">
                  {issue.flowbackSteps.map((step, index) => (
                    <div key={step.label} className="flex items-center gap-3 text-xs">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${step.done ? "bg-[#16A34A]" : "bg-gray-200"}`}>
                        {step.done ? <CheckCircle2 size={11} className="text-white" /> : <span className="text-[10px] text-gray-600">{index + 1}</span>}
                      </div>
                      <span className={step.done ? "text-gray-400 line-through" : "text-gray-700"}>{step.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-3 flex-wrap">
                  <button
                    onClick={() => navigate(`/workbench/order-review/attribution/${issue.relatedOrderId}`)}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                  >
                    <FileCheck size={11} /> 售后归因页
                  </button>
                  <button
                    onClick={() => navigate(`/workbench/order-review/flowback/${issue.relatedOrderId}`)}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 bg-[#16A34A] hover:bg-green-700 text-white rounded transition-colors"
                  >
                    <BookOpen size={11} /> 培训回流页
                  </button>
                  {!issue.flowedBack && (
                    <button className="flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                      <Send size={11} /> 通知相关人员
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAnnotateModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900">标注异常 · {selectedOrder.orderNo}</h3>
              <button onClick={() => setShowAnnotateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">异常类型</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#2F5FD0]" defaultValue={selectedOrder.annotation.type}>
                  <option>规格填写错误</option>
                  <option>禁用材料使用</option>
                  <option>施工规范不符</option>
                  <option>价格异常</option>
                  <option>参数理解偏差</option>
                  <option>无需标注</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">异常说明</label>
                <textarea
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#2F5FD0] resize-none"
                  rows={3}
                  defaultValue={selectedOrder.annotation.description}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-[#2F5FD0]" defaultChecked={selectedOrder.annotation.shouldFlowback} />
                  <span className="text-xs text-gray-700">同时回流培训系统（推荐）</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setShowAnnotateModal(false)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                取消
              </button>
              <button onClick={() => navigate(`/workbench/order-review/annotation/${selectedOrder.id}`)} className="flex-1 py-2 bg-[#2F5FD0] hover:bg-[#2550B8] text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-1">
                <Tag size={13} /> 去完整标注页
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
