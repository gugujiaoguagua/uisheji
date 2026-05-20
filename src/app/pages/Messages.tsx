import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  BookOpen,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  ClipboardList,
  Clock,
  GraduationCap,
  RefreshCw,
  Shield,
} from "lucide-react";
import {
  messages,
  communityOpsMessages,
  designerMessages,
  salesMessages,
  receiptItemTone,
  receiptStatusLabel,
  receiptStatusTone,
  trainingTeacherMessages,
  type MessageCategory,
  type MessageItem,
  type QuickFilter,
  type ReceiptStatus,
} from "../data/messagesData";
import { GlobalStateCard } from "../components/GlobalStateCard";
import { useApp } from "../context/AppContext";

type BatchReceipt = {
  count: number;
  updatedAt: string;
  summary: string;
};

const typeIconMap: Record<string, { icon: ReactNode; color: string; bg: string }> = {
  sync: { icon: <RefreshCw size={15} />, color: "text-blue-600", bg: "bg-blue-50" },
  task: { icon: <AlertTriangle size={15} />, color: "text-[#DC2626]", bg: "bg-red-50" },
  exam: { icon: <ClipboardList size={15} />, color: "text-[#F59E0B]", bg: "bg-amber-50" },
  retrain: { icon: <BookOpen size={15} />, color: "text-orange-500", bg: "bg-orange-50" },
  order: { icon: <AlertTriangle size={15} />, color: "text-[#DC2626]", bg: "bg-red-50" },
  approval: { icon: <Shield size={15} />, color: "text-[#2F5FD0]", bg: "bg-blue-50" },
  "approval-progress": { icon: <Shield size={15} />, color: "text-[#2F5FD0]", bg: "bg-blue-50" },
};

const categoryMeta: Record<MessageCategory, { label: string; desc: string; icon: ReactNode; active: string; idle: string }> = {
  system: {
    label: "系统通知",
    desc: "版本、公告、信息同步",
    icon: <Bell size={14} />,
    active: "bg-[#1E2A3A] text-white border-[#1E2A3A]",
    idle: "bg-white text-gray-700 border-gray-200 hover:border-gray-300",
  },
  task: {
    label: "任务消息",
    desc: "待办、异常、跟进事项",
    icon: <ClipboardList size={14} />,
    active: "bg-[#2F5FD0] text-white border-[#2F5FD0]",
    idle: "bg-white text-gray-700 border-gray-200 hover:border-gray-300",
  },
  approval: {
    label: "审批消息",
    desc: "申请、审批、身份生效提醒",
    icon: <Shield size={14} />,
    active: "bg-slate-700 text-white border-slate-700",
    idle: "bg-white text-gray-700 border-gray-200 hover:border-gray-300",
  },
  training: {
    label: "培训通知",
    desc: "课程、考核、补训提醒",
    icon: <GraduationCap size={14} />,
    active: "bg-[#15803D] text-white border-[#15803D]",
    idle: "bg-white text-gray-700 border-gray-200 hover:border-gray-300",
  },
};

function getNowLabel() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

const showMessageOverviewStats = false;
const showMessageRightPanel = false;
const showMessageDetailPanel = false;
const showMessageSourceChainPanel = false;
const showMessageReceiptPanel = false;
const showMessageSuggestedActionsPanel = false;

const messageUsesSplitDesktopLayout = showMessageRightPanel;
const messageDesktopContainerClass = messageUsesSplitDesktopLayout ? "max-w-6xl" : "max-w-[860px] xl:max-w-[980px]";
const messageDesktopContentClass = messageUsesSplitDesktopLayout ? "grid xl:grid-cols-5 gap-4 items-start" : "space-y-2";
const messageListClass = messageUsesSplitDesktopLayout ? "xl:col-span-2 space-y-2" : "space-y-2";


export default function Messages() {
  const navigate = useNavigate();
  const { user, currentIdentity } = useApp();
  const activeMessages =
    currentIdentity === "staff" && user?.staffRole === "training_teacher"
      ? trainingTeacherMessages
      : currentIdentity === "staff" && user?.staffRole === "ops"
        ? communityOpsMessages
        : currentIdentity === "staff" && user?.staffRole === "designer"
          ? designerMessages
          : currentIdentity === "staff" && user?.staffRole === "sales"
            ? salesMessages
        : messages;
  const [category, setCategory] = useState<MessageCategory | "all">("all");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [readIds, setReadIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState(activeMessages[0]?.id ?? "");
  const [batchMode, setBatchMode] = useState(false);
  const [selectedBatchIds, setSelectedBatchIds] = useState<string[]>([]);
  const [receiptDoneIds, setReceiptDoneIds] = useState<string[]>([]);
  const [receiptUpdates, setReceiptUpdates] = useState<Record<string, string>>({});
  const [batchReceipt, setBatchReceipt] = useState<BatchReceipt | null>(null);
  const isTrainingTeacherMessages = currentIdentity === "staff" && user?.staffRole === "training_teacher";
  const isOpsMessages = currentIdentity === "staff" && user?.staffRole === "ops";
  const isDesignerMessages = currentIdentity === "staff" && user?.staffRole === "designer";
  const isSalesMessages = currentIdentity === "staff" && user?.staffRole === "sales";

  useEffect(() => {
    setCategory("all");
    setQuickFilter("all");
    setSelectedId(activeMessages[0]?.id ?? "");
    setSelectedBatchIds([]);
    setBatchMode(false);
  }, [activeMessages]);

  const isRead = (message: MessageItem) => readIds.includes(message.id) || !message.unread;
  const resolvedReceiptStatus = (message: MessageItem): ReceiptStatus => (receiptDoneIds.includes(message.id) ? "done" : message.receipt.status);
  const resolvedReceiptTime = (message: MessageItem) => receiptUpdates[message.id] ?? message.receipt.updatedAt;

  const markRead = (id: string) => {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const openMessage = (id: string) => {
    setSelectedId(id);
    markRead(id);
  };

  const unreadCount = activeMessages.filter((message) => !isRead(message)).length;
  const urgentCount = activeMessages.filter((message) => message.urgency === "urgent").length;
  const pendingReceiptCount = activeMessages.filter((message) => resolvedReceiptStatus(message) !== "done").length;

  const filteredMessages = useMemo(() => {
    return activeMessages.filter((message) => {
      const matchCategory = category === "all" || message.category === category;
      const matchQuickFilter =
        quickFilter === "all"
          ? true
          : quickFilter === "unread"
            ? !isRead(message)
            : message.urgency === "urgent";

      return matchCategory && matchQuickFilter;
    });
  }, [activeMessages, category, quickFilter, readIds]);

  const selectedMessage = useMemo(
    () => filteredMessages.find((message) => message.id === selectedId) ?? filteredMessages[0] ?? null,
    [filteredMessages, selectedId],
  );

  const toggleBatchSelection = (id: string) => {
    setSelectedBatchIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleBatchRead = () => {
    if (selectedBatchIds.length === 0) return;
    setReadIds((prev) => Array.from(new Set([...prev, ...selectedBatchIds])));
    setBatchReceipt({
      count: selectedBatchIds.length,
      updatedAt: `今天 ${getNowLabel()}`,
      summary: `已批量标记 ${selectedBatchIds.length} 条消息为已读，并保留原业务链路入口。`,
    });
    setSelectedBatchIds([]);
    setBatchMode(false);
  };

  const handleBatchReceipt = () => {
    if (selectedBatchIds.length === 0) return;
    const nowLabel = `今天 ${getNowLabel()}`;

    setReadIds((prev) => Array.from(new Set([...prev, ...selectedBatchIds])));
    setReceiptDoneIds((prev) => Array.from(new Set([...prev, ...selectedBatchIds])));
    setReceiptUpdates((prev) => {
      const next = { ...prev };
      selectedBatchIds.forEach((id) => {
        next[id] = nowLabel;
      });
      return next;
    });
    setBatchReceipt({
      count: selectedBatchIds.length,
      updatedAt: nowLabel,
      summary: `已为 ${selectedBatchIds.length} 条消息生成处理回执，后续可继续从详情态追踪业务链路。`,
    });
    setSelectedBatchIds([]);
    setBatchMode(false);
  };

  const handleSingleReceipt = (message: MessageItem) => {
    const nowLabel = `今天 ${getNowLabel()}`;
    markRead(message.id);
    setReceiptDoneIds((prev) => (prev.includes(message.id) ? prev : [...prev, message.id]));
    setReceiptUpdates((prev) => ({ ...prev, [message.id]: nowLabel }));
  };

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div>
              <h1 className="text-gray-900">消息中心</h1>
              <p className="text-sm text-gray-500 mt-1">
                {isTrainingTeacherMessages
                  ? "培训老师只看学员跟进、演练评分、公司产品确认和案例沉淀相关消息。"
                  : isOpsMessages
                    ? "运营只看资源开拓、社群过程、转化风险、数据口径和新人培养相关消息。"
                    : isDesignerMessages
                      ? "设计师只看销设协同、方案会审、公司产品确认和设计规范相关消息。"
                      : isSalesMessages
                        ? "销售只看客户跟进、报价推进、销设协同和公司产品确认相关消息。"
                  : "保留现有统一承接入口，在页内补齐消息详情态、批量处理、处理回执和来源业务链路。"}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setBatchMode((prev) => !prev)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${batchMode ? "bg-[#1E2A3A] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-200"}`}
              >
                {batchMode ? "退出批量处理" : "批量处理"}
              </button>
              <button
                onClick={() => setReadIds(activeMessages.map((message) => message.id))}
                className="text-xs text-[#2F5FD0] hover:text-[#2550B8]"
              >
                全部已读
              </button>
            </div>
          </div>

          {showMessageOverviewStats && (
            <div className="grid md:grid-cols-4 grid-cols-2 gap-2 mb-4">
              {[
                { label: "全部消息", value: `${activeMessages.length}`, tone: "text-gray-900", bg: "bg-gray-100" },
                { label: "未读消息", value: `${unreadCount}`, tone: "text-[#DC2626]", bg: "bg-red-50" },
                { label: "紧急处理", value: `${urgentCount}`, tone: "text-[#B45309]", bg: "bg-amber-50" },
                { label: "待回执", value: `${pendingReceiptCount}`, tone: "text-[#2F5FD0]", bg: "bg-blue-50" },
              ].map((item) => (
                <div key={item.label} className={`rounded-xl px-3 py-3 ${item.bg}`}>
                  <div className={`text-lg font-semibold ${item.tone}`}>{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          )}


          <div className="grid md:grid-cols-4 gap-2">
            {Object.entries(categoryMeta).map(([key, meta]) => {
              const count = activeMessages.filter((message) => message.category === key).length;
              const unread = activeMessages.filter((message) => message.category === key && !isRead(message)).length;
              const active = category === key;
              if (count === 0) return null;

              return (
                <button
                  key={key}
                  onClick={() => setCategory(key as MessageCategory)}
                  className={`rounded-xl border px-3 py-3 text-left transition-colors ${active ? meta.active : meta.idle}`}
                >
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {meta.icon}
                    {meta.label}
                  </div>
                  <p className={`text-xs mt-1 ${active ? "text-white/80" : "text-gray-400"}`}>{meta.desc}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-lg font-semibold ${active ? "text-white" : "text-gray-900"}`}>{count}</span>
                    {unread > 0 && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? "bg-white/15 text-white" : "bg-red-100 text-[#DC2626]"}`}>
                        {unread} 未读
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <button
              onClick={() => setCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${category === "all" ? "bg-[#2F5FD0] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-200"}`}
            >
              查看全部
            </button>
            {[
              { key: "all", label: "全部" },
              { key: "unread", label: `未读${unreadCount > 0 ? ` (${unreadCount})` : ""}` },
              { key: "urgent", label: "紧急" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setQuickFilter(item.key as QuickFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${quickFilter === item.key ? "bg-[#1E2A3A] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-200"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {batchMode && (
            <div className="mt-4 rounded-xl border border-[#D9E5FF] bg-[linear-gradient(180deg,#F7FAFF_0%,#FFFFFF_100%)] p-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckSquare size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">批量处理工具条</span>
                  </div>
                  <p className="text-xs text-gray-500">已选 {selectedBatchIds.length} 条消息，可批量标记已读或生成处理回执。</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleBatchRead}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    批量标记已读
                  </button>
                  <button
                    onClick={handleBatchReceipt}
                    className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
                  >
                    批量生成回执
                  </button>
                </div>
              </div>
            </div>
          )}

          {batchReceipt && (
            <div className="mt-4 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
              <div className="flex items-center gap-2 text-[#15803D] mb-1">
                <CheckCircle2 size={14} />
                <span className="text-sm font-medium">最近批量处理回执</span>
              </div>
              <p className="text-xs text-green-700 leading-relaxed">{batchReceipt.updatedAt} · 处理 {batchReceipt.count} 条 · {batchReceipt.summary}</p>
            </div>
          )}
        </div>
      </div>

      <div className={`${messageDesktopContainerClass} mx-auto px-4 md:px-6 py-4`}>
        {filteredMessages.length > 0 ? (
          <div className={messageDesktopContentClass}>
            <div className={messageListClass}>

              {filteredMessages.map((message) => {
                const typeInfo = typeIconMap[message.type] || typeIconMap.sync;
                const currentCategory = categoryMeta[message.category];
                const currentRead = isRead(message);
                const currentReceiptStatus = resolvedReceiptStatus(message);

                return (
                  <div
                    key={message.id}
                    className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${selectedMessage?.id === message.id ? "ring-2 ring-[#2F5FD0]" : "hover:shadow-md"}`}
                  >
                    <div className="p-4 flex items-start gap-3">
                      {batchMode && (
                        <label className="pt-1">
                          <input
                            type="checkbox"
                            checked={selectedBatchIds.includes(message.id)}
                            onChange={() => toggleBatchSelection(message.id)}
                            className="accent-[#2F5FD0]"
                          />
                        </label>
                      )}

                      <div className="flex-1 min-w-0">
                        <button type="button" onClick={() => openMessage(message.id)} className="w-full text-left min-w-0">
                          <div className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${typeInfo.bg}`}>
                              <span className={typeInfo.color}>{typeInfo.icon}</span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  {!currentRead && <div className="w-2 h-2 rounded-full bg-[#DC2626] flex-shrink-0" />}
                                  <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">{currentCategory.label}</span>
                                  {message.urgency === "urgent" && <span className="text-xs px-1.5 py-0.5 bg-red-100 text-[#DC2626] rounded">紧急</span>}
                                  <span className={`text-xs px-1.5 py-0.5 rounded ${receiptStatusTone(currentReceiptStatus)}`}>
                                    {receiptStatusLabel(currentReceiptStatus)}
                                  </span>
                                </div>
                                <span className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                                  <Clock size={9} /> {message.time}
                                </span>
                              </div>

                              <p className={`text-sm mb-1 line-clamp-2 ${currentRead ? "text-gray-600" : "text-gray-900"}`}>{message.title}</p>
                              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{message.body}</p>
                            </div>
                          </div>
                        </button>

                        <div className="mt-2 flex items-center justify-between gap-2 flex-wrap pl-12">
                          <div className="flex items-center gap-2 flex-wrap text-xs text-gray-400">
                            <span>{message.sender}</span>
                            <span>·</span>
                            <span>{message.sourceBusiness}</span>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap justify-end text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                markRead(message.id);
                                navigate(message.path);
                              }}
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-white transition-colors ${message.urgency === "urgent" ? "bg-[#DC2626] hover:bg-red-700" : "bg-[#2F5FD0] hover:bg-[#2550B8]"}`}
                            >
                              {message.action}
                            </button>
                            <span className={currentRead ? "text-gray-400" : "text-[#2F5FD0]"}>{currentRead ? "已查看" : "待处理"}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {showMessageRightPanel && (
              <div className="xl:col-span-3">
                {selectedMessage && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl shadow-sm p-4">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className="text-xs px-1.5 py-0.5 rounded bg-[#EEF4FF] text-[#2F5FD0]">{categoryMeta[selectedMessage.category].label}</span>
                            {selectedMessage.urgency === "urgent" && <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-[#DC2626]">紧急</span>}
                            <span className={`text-xs px-1.5 py-0.5 rounded ${receiptStatusTone(resolvedReceiptStatus(selectedMessage))}`}>
                              {receiptStatusLabel(resolvedReceiptStatus(selectedMessage))}
                            </span>
                            <span className="text-xs text-gray-400">发送方：{selectedMessage.sender}</span>
                          </div>
                          <h2 className="text-base font-medium text-gray-900">{selectedMessage.title}</h2>
                          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{selectedMessage.summary}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => handleSingleReceipt(selectedMessage)}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            记录处理结果
                          </button>
                          <button
                            onClick={() => {
                              markRead(selectedMessage.id);
                              navigate(selectedMessage.path);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${selectedMessage.urgency === "urgent" ? "bg-[#DC2626] hover:bg-red-700 text-white" : "bg-[#2F5FD0] hover:bg-[#2550B8] text-white"}`}
                          >
                            {selectedMessage.action}
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-3 mt-4 text-xs">
                        <div className="rounded-xl bg-[#F8FAFC] px-3 py-3">
                          <p className="text-gray-400 mb-1">消息时间</p>
                          <p className="text-gray-700">{selectedMessage.time}</p>
                        </div>
                        <div className="rounded-xl bg-[#F8FAFC] px-3 py-3">
                          <p className="text-gray-400 mb-1">来源业务</p>
                          <p className="text-gray-700">{selectedMessage.sourceBusiness}</p>
                        </div>
                        <div className="rounded-xl bg-[#F8FAFC] px-3 py-3">
                          <p className="text-gray-400 mb-1">最近回执更新时间</p>
                          <p className="text-gray-700">{resolvedReceiptTime(selectedMessage)}</p>
                        </div>
                      </div>
                    </div>

                    {showMessageDetailPanel && (
                      <div className="bg-white rounded-xl shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Bell size={15} className="text-[#2F5FD0]" />
                          <span className="text-sm font-medium text-gray-900">消息详情态</span>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-sm text-gray-700 leading-relaxed mb-3">
                          {selectedMessage.body}
                        </div>
                        <div className="space-y-2">
                          {selectedMessage.detailPoints.map((item) => (
                            <div key={item} className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-xs text-gray-600 leading-relaxed">
                              {item}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap mt-3">
                          {selectedMessage.tags.map((tag) => (
                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-[#F5F7FA] border border-gray-200 text-gray-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {showMessageSourceChainPanel && (
                      <div className="bg-white rounded-xl shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <ArrowRight size={15} className="text-[#2F5FD0]" />
                          <span className="text-sm font-medium text-gray-900">来源业务链路关联</span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap mb-4">
                          {selectedMessage.sourceChain.map((item, index) => (
                            <div key={`${selectedMessage.id}-${item}`} className="flex items-center gap-2">
                              <span className="text-xs px-2 py-1 rounded-full bg-[#EEF4FF] text-[#2F5FD0]">{item}</span>
                              {index < selectedMessage.sourceChain.length - 1 && <ChevronRight size={12} className="text-gray-300" />}
                            </div>
                          ))}
                        </div>
                        <div className="grid md:grid-cols-3 gap-3">
                          {selectedMessage.relatedLinks.map((link) => (
                            <button
                              key={`${selectedMessage.id}-${link.label}`}
                              onClick={() => {
                                markRead(selectedMessage.id);
                                navigate(link.path);
                              }}
                              className={`rounded-xl border px-3 py-3 text-left transition-colors ${link.emphasis === "primary" ? "border-[#D9E5FF] bg-[linear-gradient(180deg,#F7FAFF_0%,#FFFFFF_100%)] hover:border-[#2F5FD0]/40" : "border-gray-200 bg-white hover:bg-gray-50"}`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{link.label}</p>
                                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{link.desc}</p>
                                </div>
                                <ArrowRight size={14} className="text-gray-300 flex-shrink-0" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {showMessageReceiptPanel && (
                      <div className="bg-white rounded-xl shadow-sm p-4">
                        <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                          <div className="flex items-center gap-2">
                            <ClipboardList size={15} className="text-[#2F5FD0]" />
                            <span className="text-sm font-medium text-gray-900">处理回执</span>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${receiptStatusTone(resolvedReceiptStatus(selectedMessage))}`}>
                            {receiptStatusLabel(resolvedReceiptStatus(selectedMessage))}
                          </span>
                        </div>
                        <div className={`rounded-xl border px-3 py-3 text-xs leading-relaxed mb-3 ${receiptStatusTone(resolvedReceiptStatus(selectedMessage))}`}>
                          回执编号：{selectedMessage.receipt.code} · 最近更新：{resolvedReceiptTime(selectedMessage)}
                          <div className="mt-1">{selectedMessage.receipt.summary}</div>
                        </div>
                        <div className="space-y-2">
                          {selectedMessage.receipt.items.map((item) => (
                            <div key={`${selectedMessage.id}-${item.label}`} className={`rounded-xl border px-3 py-3 ${receiptItemTone(item.status)}`}>
                              <div className="flex items-center justify-between gap-3 text-xs font-medium flex-wrap mb-2">
                                <span>{item.label}</span>
                                <span>{item.time}</span>
                              </div>
                              <p className="text-xs leading-relaxed">责任人：{item.owner}</p>
                              <p className="text-xs mt-1 leading-relaxed">{item.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {showMessageSuggestedActionsPanel && (
                      <div className="bg-white rounded-xl shadow-sm p-4">
                        <p className="text-sm font-medium text-gray-900 mb-3">建议动作</p>
                        <div className="space-y-2 mb-3">
                          {selectedMessage.suggestedActions.map((item) => (
                            <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                              {item}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => {
                              markRead(selectedMessage.id);
                              navigate(selectedMessage.path);
                            }}
                            className="flex-1 min-w-[180px] py-2.5 rounded-xl bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
                          >
                            进入来源业务处理
                          </button>
                          <button
                            onClick={() => handleSingleReceipt(selectedMessage)}
                            className="flex-1 min-w-[180px] py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                          >
                            回写处理回执
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        ) : (
          <GlobalStateCard
            tone="empty"
            title="当前筛选下没有消息"
            description="不是系统没有消息，而是当前分类和快捷筛选没有命中。可以先切回全部，再继续处理未读或紧急事项。"
            helperText="消息中心仍保留原有分类、批量处理和回执能力，这里只统一状态表达。"
            action={{
              label: "切回查看全部",
              onClick: () => {
                setCategory("all");
                setQuickFilter("all");
                setSelectedId(activeMessages[0]?.id ?? "");
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
