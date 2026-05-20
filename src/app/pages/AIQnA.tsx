import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Send,
  ThumbsDown,
  ThumbsUp,
  Zap,
} from "lucide-react";
import type { LearnerRole } from "../context/AppContext";
import { getLearnerRoleMeta, useApp } from "../context/AppContext";
import { queryKnowledgeBase, submitKnowledgeFeedback } from "../lib/kbClient";


interface Source {
  id?: string;
  title: string;
  version: string;
  section: string;
  reliability: "high" | "medium";
  sourceId?: string;
  sourceFile?: string;
  kbRevision?: string;
}


interface KnowledgeGap {
  title: string;
  reason: string;
  missingItems: string[];
  suggestedOwner: string;
  suggestedSync: string;
  priority: "high" | "medium";
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  question?: string;
  sources?: Source[];
  directAnswer?: string;
  timestamp: Date;
  feedback?: "up" | "down";
  answerState?: "resolved" | "needs-review";
  knowledgeGap?: KnowledgeGap;
}

const suggestedQuestionsByRole: Record<LearnerRole, string[]> = {
  sales: [
    "板材怎么向客户解释环保等级？",
    "客户问万骊板材为什么贵怎么回答？",
    "全屋定制估价有哪些核心计价项？",
    "智柚下单时文件命名有什么要求？",
  ],
  community_ops: [
    "小红书私域转化怎么维护业主群？",
    "门店会议制度怎么落地？",
    "渠道管理标准化有哪些关键动作？",
    "智柚系统下单流程怎么给新人讲？",
  ],
  ops_manager: [
    "门店会议制度怎么检查执行？",
    "渠道管理标准化有哪些关键动作？",
    "小红书运营数据应该复盘哪些环节？",
    "智柚系统下单风险怎么做培训回流？",
  ],
  designer: [
    "全屋估价空间报价怎么拆？",
    "三维家导报价怎么操作？",
    "衣柜类三维家下单有哪些注意事项？",
    "设计师会审前资料要检查什么？",
  ],
};


function createKnowledgeGap(question: string, reason?: string): KnowledgeGap {
  return {
    title: "知识缺口待补充",
    reason: reason || `当前问题“${question}”缺少正式知识库依据，现有资料不足以支持直接对客户承诺。`,
    missingItems: ["正式知识条目", "适用范围与限制条件", "可直接对外复述的话术"],
    suggestedOwner: "信息同步中心",
    suggestedSync: "补齐后同步到题库、陪练场景与消息通知",
    priority: "high",
  };
}

async function buildResponse(question: string, learnerRole: LearnerRole) {
  try {
    const result = await queryKnowledgeBase({
      question,
      role_hint: learnerRole,
      top_k: 5,
    });

    if (result.fallback || result.citations.length === 0) {
      const knowledgeGap = createKnowledgeGap(question, result.answer);
      return {
        direct: result.direct_answer,
        full: `${result.answer}\n\n**处理建议：**已按“无依据不回答”策略拦截，可发起知识补充或转人工复核。`,
        sources: undefined,
        answerState: "needs-review" as const,

        knowledgeGap,
      };
    }

    return {
      direct: result.direct_answer,
      full: `${result.answer}\n\n追踪号：${result.trace_id} · 知识库快照：${result.kb_snapshot_id}`,
      sources: result.citations.map((item) => ({
        id: item.id,
        title: item.title,
        version: item.version || "未标注版本",
        section: item.source_section || item.relative_path || "正式知识库条目",
        reliability: result.confidence === "high" ? "high" as const : "medium" as const,
        sourceId: item.source_id,
        sourceFile: item.source_file,
        kbRevision: item.kb_revision,
      })),
      answerState: result.confidence === "low" ? "needs-review" as const : "resolved" as const,
      knowledgeGap: undefined,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "知识库服务暂不可用";
    const knowledgeGap = createKnowledgeGap(question, reason);
    return {
      direct: "知识库服务暂时不可用，我先不编造答案。请稍后重试或转人工复核。",
      full: `当前无法连接正式知识库接口：${reason}\n\n**处理建议：**检查本地预览服务是否已重启，并确认知识库目录可访问。`,
      sources: undefined,
      answerState: "needs-review" as const,

      knowledgeGap,
    };
  }
}


export default function AIQnA() {
  const navigate = useNavigate();
  const { user, currentIdentity } = useApp();
  const selectedLearnerRole = user?.learnerRole ?? "sales";
  const learnerRoleMeta = getLearnerRoleMeta(selectedLearnerRole);
  const suggestedQuestions = currentIdentity === "student" ? suggestedQuestionsByRole[selectedLearnerRole] : suggestedQuestionsByRole.sales;
  const showHeaderHelperText = false;
  const headerHelperText = "先给对客户说的话，再给来源依据；推荐问题跟随当前学习身份";
  const [messages, setMessages] = useState<Message[]>([

    {
      id: "welcome",
      role: "assistant",
      content: "你好！我是智柚 AI 助手。你可以直接问我产品参数、工艺规范、销售话术、报价和下单流程等问题，我会先检索正式知识库，再给你可追溯的答案；如果当前答不上来，也会给你发起知识补充的入口。",

      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<string[]>([]);
  const [expandedSources, setExpandedSources] = useState<string[]>([]);
  const [submittedGapIds, setSubmittedGapIds] = useState<string[]>([]);
  const [activeGapMessageId, setActiveGapMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeGapMessageId]);

  const handleSend = (question?: string) => {
    const q = question || inputValue.trim();
    if (!q || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: q,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    void buildResponse(q, selectedLearnerRole)
      .then((response) => {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.full,
          question: q,
          directAnswer: response.direct,
          sources: response.sources,
          answerState: response.answerState,
          knowledgeGap: response.knowledgeGap,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      })
      .finally(() => {
        setIsLoading(false);
      });

  };

  const toggleSources = (msgId: string) => {
    setExpandedSources((prev) =>
      prev.includes(msgId) ? prev.filter((id) => id !== msgId) : [...prev, msgId]
    );
  };

  const toggleDetails = (msgId: string) => {
    setExpandedDetails((prev) =>
      prev.includes(msgId) ? prev.filter((id) => id !== msgId) : [...prev, msgId]
    );
  };

  const handleFeedback = (msgId: string, feedback: "up" | "down") => {
    setMessages((prev) => prev.map((m) => (m.id === msgId ? { ...m, feedback } : m)));

    if (feedback === "down") {
      setActiveGapMessageId(msgId);
    }
  };

  const handleSubmitGap = (msgId: string) => {
    const targetMessage = messages.find((msg) => msg.id === msgId);
    void submitKnowledgeFeedback({
      question: targetMessage?.question || "",
      fallback_reason: targetMessage?.knowledgeGap?.reason || "用户主动提交知识补充",
      scene: currentIdentity === "student" ? learnerRoleMeta.label : "工作人员",
    }).catch(() => undefined);
    setSubmittedGapIds((prev) => (prev.includes(msgId) ? prev : [...prev, msgId]));
    setActiveGapMessageId(null);
  };


  const activeGapMessage = messages.find((msg) => msg.id === activeGapMessageId && msg.role === "assistant");
  const activeGap = activeGapMessage?.knowledgeGap ??
    (activeGapMessage?.question ? createKnowledgeGap(activeGapMessage.question) : null);

  return (
    <div className="flex flex-col h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex-shrink-0">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-visible">
            <img src="/APP.png" alt="AI Avatar" className="w-full h-full object-cover scale-[1.25]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-sm font-semibold text-gray-900">AI 问答</h1>
              {currentIdentity === "student" && <span className="text-xs px-2 py-0.5 rounded-full bg-[#EAF1FF] text-[#2F5FD0]">{learnerRoleMeta.label}</span>}
            </div>
            {showHeaderHelperText && <p className="text-xs text-gray-500">{headerHelperText}</p>}

          </div>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-[#16A34A] bg-green-50 px-2 py-1 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
            正式知识库已接入

          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => {
            const isGapSubmitted = submittedGapIds.includes(msg.id);
            const isDetailExpanded = expandedDetails.includes(msg.id);

            return (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-1 overflow-visible">
                    <img src="/APP.png" alt="AI Avatar" className="w-full h-full object-cover scale-[1.25]" />
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.role === "user" ? "max-w-[75%]" : ""}`}>
                  {msg.role === "user" ? (
                    <div className="bg-[#2F5FD0] text-white px-4 py-2.5 rounded-xl rounded-tr-sm text-sm">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {msg.directAnswer && (
                        <div className="bg-[#EEF2FF] border border-[#2F5FD0]/20 rounded-xl px-4 py-3">
                          <div className="flex items-center gap-1.5 mb-2">
                            <Zap size={12} className="text-[#2F5FD0]" />
                            <span className="text-xs font-medium text-[#2F5FD0]">可直接对客户说的话</span>
                          </div>
                          <p className="text-sm text-gray-800 leading-relaxed">{msg.directAnswer}</p>
                          <button
                            onClick={() => navigator.clipboard.writeText(msg.directAnswer || "")}
                            className="flex items-center gap-1 text-xs text-[#2F5FD0] mt-2 hover:text-[#2550B8]"
                          >
                            <Copy size={10} /> 复制话术
                          </button>
                        </div>
                      )}

                      {msg.content !== messages[0].content && (
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                          <button
                            type="button"
                            onClick={() => toggleDetails(msg.id)}
                            className="w-full flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                            aria-expanded={isDetailExpanded}
                          >
                            <span className="text-xs text-gray-500">详细解释</span>
                            {msg.answerState === "needs-review" && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs text-[#B45309]">
                                <AlertTriangle size={11} /> 来源不足，建议回流补充
                              </span>
                            )}
                            <span className="ml-auto">
                              {isDetailExpanded ? (
                                <ChevronUp size={13} className="text-gray-400" />
                              ) : (
                                <ChevronDown size={13} className="text-gray-400" />
                              )}
                            </span>
                          </button>
                          {isDetailExpanded && (
                            <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                              {msg.content.split("**").map((part, i) =>
                                i % 2 === 1 ? (
                                  <strong key={i} className="font-medium text-gray-900">{part}</strong>
                                ) : (
                                  <span key={i}>{part}</span>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {!msg.directAnswer && !msg.sources && (
                        <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
                          <p className="text-sm text-gray-700 leading-relaxed">{msg.content}</p>
                        </div>
                      )}

                      {msg.sources && (
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                          <button
                            onClick={() => toggleSources(msg.id)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                          >
                            <BookOpen size={13} className="text-gray-400" />
                            <span className="text-xs text-gray-500">来源依据 ({msg.sources.length})</span>
                            <span className="ml-auto">
                              {expandedSources.includes(msg.id) ? (
                                <ChevronUp size={13} className="text-gray-400" />
                              ) : (
                                <ChevronDown size={13} className="text-gray-400" />
                              )}
                            </span>
                          </button>

                          {expandedSources.includes(msg.id) && (
                            <div className="border-t border-gray-100 divide-y divide-gray-50">
                              {msg.sources.map((source, i) => (
                                <div key={i} className="px-4 py-2.5">
                                  <div className="flex items-start gap-2">
                                    <span className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded mt-0.5 ${
                                      source.reliability === "high"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-amber-100 text-amber-700"
                                    }`}>
                                      {source.reliability === "high" ? "高可信" : "参考"}
                                    </span>
                                    <div>
                                      <p className="text-xs text-gray-700">{source.id ? `${source.id} · ` : ""}{source.title}</p>
                                      <p className="text-xs text-gray-400 mt-0.5">
                                        {source.version}{source.kbRevision ? ` · ${source.kbRevision}` : ""} · {source.section}
                                      </p>
                                      {(source.sourceId || source.sourceFile) && (
                                        <p className="text-xs text-gray-400 mt-0.5">
                                          {source.sourceId || "未标注来源ID"} · {source.sourceFile || "未标注来源文件"}
                                        </p>
                                      )}
                                    </div>

                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {msg.directAnswer && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-gray-400">回答是否有帮助？</span>
                          <button
                            onClick={() => handleFeedback(msg.id, "up")}
                            className={`p-1 rounded transition-colors ${
                              msg.feedback === "up" ? "text-[#16A34A] bg-green-50" : "text-gray-400 hover:text-gray-600"
                            }`}
                          >
                            <ThumbsUp size={12} />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, "down")}
                            className={`p-1 rounded transition-colors ${
                              msg.feedback === "down" ? "text-[#DC2626] bg-red-50" : "text-gray-400 hover:text-gray-600"
                            }`}
                          >
                            <ThumbsDown size={12} />
                          </button>
                          <button
                            onClick={() => setActiveGapMessageId(msg.id)}
                            className="text-xs text-[#2F5FD0] hover:text-[#2550B8]"
                          >
                            答案不够准确？提交知识补充
                          </button>
                          <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                            <Clock size={9} />
                            {msg.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      )}

                      {msg.knowledgeGap && (
                        <div className={`rounded-xl border px-4 py-3 ${isGapSubmitted ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
                          <div className="flex items-start gap-2">
                            {isGapSubmitted ? (
                              <CheckCircle2 size={15} className="text-[#15803D] mt-0.5 flex-shrink-0" />
                            ) : (
                              <AlertTriangle size={15} className="text-[#B45309] mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className={`text-sm font-medium ${isGapSubmitted ? "text-[#15803D]" : "text-[#92400E]"}`}>
                                  {isGapSubmitted ? "知识补充已提交" : msg.knowledgeGap.title}
                                </p>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${isGapSubmitted ? "bg-green-100 text-[#15803D]" : "bg-amber-100 text-[#B45309]"}`}>
                                  {msg.knowledgeGap.priority === "high" ? "高优先" : "常规"}
                                </span>
                              </div>
                              <p className={`text-xs mt-1 leading-relaxed ${isGapSubmitted ? "text-[#166534]" : "text-[#92400E]"}`}>
                                {isGapSubmitted
                                  ? "已生成待补知识项，后续应同步到信息同步中心、培训题库与陪练场景。"
                                  : msg.knowledgeGap.reason}
                              </p>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {msg.knowledgeGap.missingItems.map((item) => (
                                  <span
                                    key={item}
                                    className={`text-xs px-2 py-1 rounded-full ${isGapSubmitted ? "bg-white text-[#166534] border border-green-200" : "bg-white/80 text-[#92400E] border border-amber-200"}`}
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                              <div className="mt-3 flex items-center gap-2 flex-wrap">
                                <button
                                  onClick={() => setActiveGapMessageId(msg.id)}
                                  disabled={isGapSubmitted}
                                  className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                                    isGapSubmitted
                                      ? "bg-green-100 text-[#15803D] cursor-default"
                                      : "bg-[#1E2A3A] hover:bg-[#162030] text-white"
                                  }`}
                                >
                                  {isGapSubmitted ? "已提交待补充" : "发起知识补充"}
                                </button>
                                <button
                                  onClick={() => navigate("/workbench/info-sync")}
                                  className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-white transition-colors"
                                >
                                  转信息同步中心
                                </button>
                                <button
                                  onClick={() => navigate("/workbench/content-ops")}
                                  className="text-xs text-[#2F5FD0] hover:text-[#2550B8]"
                                >
                                  查看社区运营同步状态
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-visible">
                <img src="/APP.png" alt="AI Avatar" className="w-full h-full object-cover scale-[1.25]" />
              </div>
              <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FD0] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FD0] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FD0] animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="text-xs text-gray-400 ml-1">正在检索知识库与标准口径...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {messages.length <= 1 && (
        <div className="px-4 md:px-6 pb-2 flex-shrink-0">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-gray-400 mb-2">常见问题</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs bg-white border border-gray-200 hover:border-[#2F5FD0] hover:text-[#2F5FD0] text-gray-600 px-2.5 py-1.5 rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border-t border-gray-200 px-4 md:px-6 py-2.5 flex-shrink-0">
        <div className="max-w-3xl mx-auto flex items-end gap-2">
          <div className="flex-1 bg-[#F5F7FA] border border-gray-200 rounded-xl px-4 py-2 focus-within:border-[#2F5FD0] transition-colors">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="问我任何产品、工艺、话术问题..."
              className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none resize-none max-h-28"
              rows={1}
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
              inputValue.trim() && !isLoading
                ? "bg-[#2F5FD0] hover:bg-[#2550B8] text-white"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {activeGapMessageId && activeGap && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-[#B45309]" />
                <h3 className="text-base font-medium text-gray-900">发起知识补充</h3>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                回答不足时，先生成待补知识项，再同步到信息同步中心、培训题库与陪练场景。
              </p>
            </div>

            <div className="px-5 py-4 space-y-4">
              <div className="rounded-xl bg-[#F5F7FA] px-3 py-3">
                <p className="text-xs text-gray-400">问题</p>
                <p className="text-sm text-gray-800 mt-1 leading-relaxed">{activeGapMessage?.question}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-900 mb-2">待补内容</p>
                <div className="flex flex-wrap gap-1.5">
                  {activeGap.missingItems.map((item) => (
                    <span key={item} className="text-xs px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#92400E]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-gray-200 px-3 py-3">
                  <p className="text-xs text-gray-400">建议承接方</p>
                  <p className="text-sm text-gray-800 mt-1">{activeGap.suggestedOwner}</p>
                </div>
                <div className="rounded-xl border border-gray-200 px-3 py-3">
                  <p className="text-xs text-gray-400">后续同步</p>
                  <p className="text-sm text-gray-800 mt-1">{activeGap.suggestedSync}</p>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">{activeGap.reason}</p>
            </div>

            <div className="px-5 py-4 bg-[#FAFBFC] border-t border-gray-100 flex gap-2">
              <button
                onClick={() => setActiveGapMessageId(null)}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                先取消
              </button>
              <button
                onClick={() => handleSubmitGap(activeGapMessageId)}
                className="flex-1 rounded-xl bg-[#2F5FD0] py-2.5 text-sm text-white hover:bg-[#2550B8] transition-colors"
              >
                提交待补知识项
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
