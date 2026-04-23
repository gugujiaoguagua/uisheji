import { useMemo, useState } from "react";
import {
  Dumbbell,
  ChevronRight,
  AlertTriangle,
  Target,
  Mic,
  MicOff,
  Send,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Play,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Sparkles,
  TriangleAlert,
  CircleAlert,
} from "lucide-react";

type Stage = "scene-select" | "briefing" | "session" | "result";

interface Scenario {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  desc: string;
  riskTag?: string;
  lastScore?: number;
  recommended?: boolean;
}

const scenarios: Scenario[] = [
  {
    id: "1",
    title: "客户质疑：'你们的砖为什么比别人贵？'",
    difficulty: "medium",
    category: "价值引导",
    desc: "客户直接质疑价格，需要从产品价值切入，避免被带入价格战",
    riskTag: "高频失分场景",
    lastScore: 72,
    recommended: true,
  },
  {
    id: "2",
    title: "客户问：'防水效果真的像你说的那么好吗？'",
    difficulty: "medium",
    category: "产品说明",
    desc: "客户质疑产品功效，需要结构化介绍技术参数与场景适配",
    recommended: true,
  },
  {
    id: "3",
    title: "客户说：'我再考虑考虑，不急'（临近成交时）",
    difficulty: "hard",
    category: "成交推进",
    desc: "临近成交客户拖延，需要判断原因并给出有针对性的推进动作",
    riskTag: "易流失场景",
    lastScore: 65,
  },
  {
    id: "4",
    title: "介绍云岚石暖冬系列新品（首次推荐场景）",
    difficulty: "easy",
    category: "新品推介",
    desc: "结构化介绍新品特点，包含规格、防滑、安装亮点",
  },
  {
    id: "5",
    title: "客户设计师提需求：'我们要一款适合卫浴的大规格砖'",
    difficulty: "medium",
    category: "需求对接",
    desc: "精准识别需求并推荐合适规格，同时避免被价格锁死",
  },
];

const mockConversation = [
  { role: "customer", content: "你们这款砖要 380 元一平，隔壁店才卖 200，凭什么贵这么多？" },
  { role: "user", content: "您的关注点我完全理解。380 和 200 的差距确实需要我来解释清楚。这款云岚石暖冬系列有几个地方和普通产品不一样——" },
  { role: "customer", content: "说说看，我听说过很多这样的解释，最后都差不多。" },
  { role: "user", content: "好的，我从三个角度说：第一，防滑系数。这款是 R10，比普通 R9 高一级，特别适合有老人或小孩的家庭..." },
];

const resultData = {
  totalScore: 78,
  prevScore: 72,
  dimensions: [
    { name: "需求识别", score: 85, feedback: "准确抓住了客户的价格敏感点，开头定位清晰" },
    { name: "价值传递", score: 80, feedback: "三点说明结构清晰，防滑系数引用准确" },
    { name: "话术流畅度", score: 72, feedback: "第二轮回应有停顿，建议准备好应对'我听说过'类反驳" },
    { name: "成交推进", score: 75, feedback: "价值说完后未及时试探成交意向，建议加上“您现在最关注的是哪个方面？”" },
  ],
  highlights: ["防滑系数 R10 vs R9 的对比引用准确且有说服力", "开场快速定位问题，没有绕圈子"],
  riskPoints: [
    "第二轮回应里对“我已经听过类似说法”的反驳准备不足。",
    "价值说完后没有顺势推进到客户真实顾虑和成交试探。",
  ],
  omissions: [
    "没有主动确认客户家里是否有老人、小孩或湿区使用场景。",
    "没有补充安装标准和品质认证这一层证据，价值支撑还差半步。",
  ],
  suggestedPractice: "建议继续练习：'临近成交客户拖延' 场景，进一步强化成交推进话术",
};

function getScenarioGoals(scenario?: Scenario | null) {
  if (scenario?.category === "新品推介") {
    return [
      "先把新品定位讲清楚，再说参数，不要一上来堆规格。",
      "把防滑、安装亮点转成客户能听懂的话，而不是培训术语。",
      "最后落到适用场景，让客户知道这款适合谁。",
    ];
  }

  return [
    "识别客户价格敏感背后的真实顾虑（便宜 ≠ 同质化）。",
    "用产品差异化（R10 防滑、安装标准、品质认证）建立价值感。",
    "价值说完后试探成交意向，不要停在“解释”层面。",
  ];
}

function getRiskAlerts(scenario?: Scenario | null) {
  if (scenario?.category === "成交推进") {
    return [
      "不要在客户说“再考虑”后立即结束对话，要先追问真实原因。",
      "避免一味重复卖点，重点要落在“为什么现在不决定”。",
      "推进动作要轻，不要给客户过强压迫感。",
    ];
  }

  return [
    "不要被带入价格比较，忘记价值说明。",
    "解释产品参数时别太专业，客户要先听懂。",
    "说完价值别停住，要顺手试探客户下一步。",
  ];
}

function getLiveHints(messageCount: number) {
  if (messageCount > mockConversation.length) {
    return [
      { tag: "建议补一句", text: "现在可以追问客户：他更担心价格本身，还是担心花高价不值。", tone: "bg-blue-50 text-[#2F5FD0]" },
      { tag: "注意漏项", text: "你还没确认客户的使用场景，防滑优势缺少具体落点。", tone: "bg-amber-50 text-amber-700" },
      { tag: "继续保持", text: "R10 对比 R9 的表达是有效亮点，可以继续保留。", tone: "bg-green-50 text-[#16A34A]" },
    ];
  }

  return [
    { tag: "开场方向对", text: "你已经先接住了客户情绪，这一步做对了。", tone: "bg-green-50 text-[#16A34A]" },
    { tag: "接下来建议", text: "先说差异，再说为什么值，不要马上和别人拼价格。", tone: "bg-blue-50 text-[#2F5FD0]" },
    { tag: "容易漏掉", text: "价值说完后记得试探客户最关心的点。", tone: "bg-amber-50 text-amber-700" },
  ];
}

export default function AIPractice() {
  const [stage, setStage] = useState<Stage>("scene-select");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState(mockConversation);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [activeCategory, setActiveCategory] = useState("全部");

  const categories = ["全部", "价值引导", "产品说明", "成交推进", "新品推介", "需求对接"];

  const filteredScenarios = activeCategory === "全部" ? scenarios : scenarios.filter((s) => s.category === activeCategory);
  const difficultyLabel = { easy: "简单", medium: "中等", hard: "困难" };
  const difficultyColor = {
    easy: "text-green-600 bg-green-50",
    medium: "text-[#F59E0B] bg-amber-50",
    hard: "text-[#DC2626] bg-red-50",
  };

  const liveHints = useMemo(() => getLiveHints(messages.length), [messages.length]);
  const scenarioGoals = useMemo(() => getScenarioGoals(selectedScenario), [selectedScenario]);
  const riskAlerts = useMemo(() => getRiskAlerts(selectedScenario), [selectedScenario]);

  if (stage === "result") {
    return (
      <div className="min-h-full bg-[#F5F7FA] px-4 md:px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setStage("scene-select")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft size={16} /> 返回场景选择
          </button>

          <div className="bg-[#1E2A3A] rounded-2xl p-6 mb-4 text-white">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-white/60 text-xs mb-1">本次陪练结果</p>
                <h2 className="text-white text-lg">{selectedScenario?.title}</h2>
                <p className="text-white/60 text-xs mt-2">总结果已经生成，下面会拆开给你看：哪里做得好、哪里有风险、哪里漏讲了。</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-white">{resultData.totalScore}</div>
                <div className="flex items-center gap-1 text-sm justify-end mt-0.5">
                  {resultData.totalScore > resultData.prevScore ? (
                    <>
                      <TrendingUp size={14} className="text-[#16A34A]" />
                      <span className="text-[#16A34A]">+{resultData.totalScore - resultData.prevScore} 分提升</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={14} className="text-[#DC2626]" />
                      <span className="text-[#DC2626]">{resultData.totalScore - resultData.prevScore} 分</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-5">
              {resultData.dimensions.map((dim, i) => (
                <div key={i} className="bg-white/10 rounded-lg px-2 py-2 text-center">
                  <div className="text-lg font-bold text-white">{dim.score}</div>
                  <div className="text-xs text-white/60">{dim.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">分维度评分与反馈</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {resultData.dimensions.map((dim, i) => (
                <div key={i} className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-800">{dim.name}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden mx-2">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${dim.score}%`,
                          backgroundColor: dim.score >= 80 ? "#16A34A" : dim.score >= 70 ? "#F59E0B" : "#DC2626",
                        }}
                      />
                    </div>
                    <span className={`text-sm font-bold ${dim.score >= 80 ? "text-[#16A34A]" : dim.score >= 70 ? "text-[#F59E0B]" : "text-[#DC2626]"}`}>{dim.score}</span>
                  </div>
                  <p className="text-xs text-gray-500">{dim.feedback}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ThumbsUp size={14} className="text-[#16A34A]" />
                <span className="text-sm font-medium text-gray-900">亮点</span>
              </div>
              <ul className="space-y-2">
                {resultData.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                    <CheckCircle2 size={12} className="text-[#16A34A] flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ThumbsDown size={14} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">风险点</span>
              </div>
              <ul className="space-y-2">
                {resultData.riskPoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                    <TriangleAlert size={12} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <CircleAlert size={14} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">漏项</span>
              </div>
              <ul className="space-y-2">
                {resultData.omissions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                    <span className="text-xs px-1 py-0.5 bg-red-100 text-[#DC2626] rounded flex-shrink-0">漏讲</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-[#EEF2FF] border border-[#2F5FD0]/20 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-2">
              <Target size={16} className="text-[#2F5FD0] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#2F5FD0] mb-0.5">下一轮建议</p>
                <p className="text-xs text-gray-600">{resultData.suggestedPractice}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStage("session")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#2F5FD0] text-[#2F5FD0] rounded-xl text-sm hover:bg-blue-50 transition-colors"
            >
              <RotateCcw size={15} /> 再练一次
            </button>
            <button
              onClick={() => setStage("scene-select")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#2F5FD0] text-white rounded-xl text-sm hover:bg-[#2550B8] transition-colors"
            >
              <Play size={15} /> 换个场景继续
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "session") {
    return (
      <div className="flex flex-col min-h-full bg-[#F5F7FA]">
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setStage("briefing")} className="text-gray-500 hover:text-gray-700">
              <ArrowLeft size={18} />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">AI 陪练进行中</p>
              <p className="text-sm text-gray-800 truncate">{selectedScenario?.title}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#DC2626] bg-red-50 px-2 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
              训练中
            </div>
            <button
              onClick={() => setStage("result")}
              className="text-xs text-[#2F5FD0] bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
            >
              结束并获得反馈
            </button>
          </div>
        </div>

        <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex-shrink-0">
          <p className="text-xs text-amber-700">
            🎭 <strong>场景设定：</strong>客户正在对比价格，刚看过便宜产品，情绪略带质疑。目标：价值引导 + 试探成交意向
          </p>
        </div>

        <div className="max-w-6xl mx-auto w-full px-4 py-4 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-4 flex-1 overflow-hidden">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[520px]">
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "customer" && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs flex-shrink-0 mr-2">客</div>
                  )}
                  <div className="max-w-[78%]">
                    {msg.role === "customer" ? (
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">模拟客户</p>
                        <div className="bg-gray-100 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-700">{msg.content}</div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5 text-right">你的回应</p>
                        <div className="bg-[#2F5FD0] text-white rounded-xl rounded-tr-sm px-4 py-2.5 text-sm">{msg.content}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
              <div className="flex items-end gap-2">
                <div className="flex-1 bg-[#F5F7FA] border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#2F5FD0]">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="输入你的回应话术..."
                    className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none resize-none"
                    rows={2}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isRecording ? "bg-[#DC2626] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                  >
                    {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                  <button
                    onClick={() => {
                      if (inputValue.trim()) {
                        setMessages((prev) => [...prev, { role: "user", content: inputValue }]);
                        setInputValue("");
                        setTimeout(() => {
                          setMessages((prev) => [
                            ...prev,
                            {
                              role: "customer",
                              content: "这个说法还可以，但我还是不确定值不值这个价。",
                            },
                          ]);
                        }, 800);
                      }
                    }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${inputValue.trim() ? "bg-[#2F5FD0] text-white hover:bg-[#2550B8]" : "bg-gray-100 text-gray-400"}`}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button className="text-xs text-[#2F5FD0] hover:text-[#2550B8] flex items-center gap-1">
                  <BookOpen size={10} /> 查看参考话术
                </button>
                <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                  <MessageSquare size={10} /> 查看对话历史
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target size={14} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">任务目标区</span>
              </div>
              <div className="space-y-2">
                {scenarioGoals.map((goal) => (
                  <div key={goal} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2F5FD0] flex-shrink-0 mt-1.5" />
                    {goal}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={14} className="text-[#DC2626]" />
                <span className="text-sm font-medium text-gray-900">风险提示区</span>
              </div>
              <div className="space-y-2">
                {riskAlerts.map((risk) => (
                  <div key={risk} className="rounded-lg bg-red-50 border border-red-100 px-3 py-2.5 text-xs text-red-700 leading-relaxed">
                    {risk}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">实时轻提示区</span>
              </div>
              <div className="space-y-2.5">
                {liveHints.map((hint) => (
                  <div key={hint.text} className="rounded-xl border border-gray-100 p-3">
                    <span className={`inline-flex text-xs px-2 py-0.5 rounded-full ${hint.tone}`}>{hint.tag}</span>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">{hint.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "briefing") {
    return (
      <div className="min-h-full bg-[#F5F7FA] px-4 md:px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setStage("scene-select")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft size={16} /> 返回
          </button>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
            <div className="bg-[#1E2A3A] px-5 py-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[selectedScenario!.difficulty]}`}>{difficultyLabel[selectedScenario!.difficulty]}</span>
                <span className="text-xs text-white/60">{selectedScenario?.category}</span>
                {selectedScenario?.riskTag && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 flex items-center gap-1">
                    <AlertTriangle size={9} /> {selectedScenario.riskTag}
                  </span>
                )}
              </div>
              <h2 className="text-white text-base mb-1">{selectedScenario?.title}</h2>
              <p className="text-white/60 text-xs">{selectedScenario?.desc}</p>
            </div>

            <div className="px-5 py-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target size={14} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">训练目标</span>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {scenarioGoals.map((goal) => (
                    <li key={goal} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#2F5FD0] flex-shrink-0 mt-1.5"></span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle size={12} className="text-[#DC2626]" />
                  <span className="text-xs font-medium text-[#DC2626]">常见失误预警</span>
                </div>
                <ul className="space-y-1 text-xs text-red-700">
                  {riskAlerts.map((risk) => (
                    <li key={risk}>• {risk}</li>
                  ))}
                </ul>
              </div>

              {selectedScenario?.lastScore && (
                <div className="bg-[#F5F7FA] rounded-lg px-3 py-2.5">
                  <p className="text-xs text-gray-500">
                    上次练习得分：<span className="text-[#F59E0B] font-medium">{selectedScenario.lastScore} 分</span>
                    <span className="ml-2 text-gray-400">目标分数 ≥ 80</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setMessages(mockConversation);
              setInputValue("");
              setStage("session");
            }}
            className="w-full bg-[#2F5FD0] hover:bg-[#2550B8] text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Play size={16} />
            开始训练
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center">
              <Dumbbell size={18} className="text-purple-600" />
            </div>
            <div>
              <h1 className="text-gray-900">AI 陪练</h1>
              <p className="text-xs text-gray-500">选择真实场景，练完获得评分、风险点和漏项提醒</p>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs transition-colors ${activeCategory === cat ? "bg-[#2F5FD0] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 space-y-3">
        {filteredScenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all p-4"
            onClick={() => {
              setSelectedScenario(scenario);
              setMessages(mockConversation);
              setStage("briefing");
            }}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${scenario.difficulty === "hard" ? "bg-red-50" : scenario.difficulty === "medium" ? "bg-amber-50" : "bg-green-50"}`}>
                <Dumbbell size={18} className={scenario.difficulty === "hard" ? "text-red-500" : scenario.difficulty === "medium" ? "text-amber-500" : "text-green-500"} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${difficultyColor[scenario.difficulty]}`}>{difficultyLabel[scenario.difficulty]}</span>
                  <span className="text-xs text-gray-400">{scenario.category}</span>
                  {scenario.recommended && <span className="text-xs px-1.5 py-0.5 bg-[#2F5FD0] text-white rounded">推荐练习</span>}
                  {scenario.riskTag && (
                    <span className="text-xs px-1.5 py-0.5 bg-red-100 text-[#DC2626] rounded flex items-center gap-0.5">
                      <AlertTriangle size={8} /> {scenario.riskTag}
                    </span>
                  )}
                </div>
                <h3 className="text-sm text-gray-900 mb-0.5">{scenario.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-1">{scenario.desc}</p>
                {scenario.lastScore && (
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-gray-400">上次得分</span>
                    <span className={`text-xs font-medium ${scenario.lastScore >= 80 ? "text-[#16A34A]" : "text-[#F59E0B]"}`}>{scenario.lastScore} 分</span>
                    {scenario.lastScore < 80 && <span className="text-xs text-[#F59E0B]">· 建议再练</span>}
                  </div>
                )}
              </div>
              <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
