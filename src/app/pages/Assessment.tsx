import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ClipboardList,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  FileText,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

type Stage = "list" | "instructions" | "answering" | "result";

type Question = {
  id: number;
  type: "single" | "multiple";
  question: string;
  options: string[];
  correct: number | number[];
  explanation: string;
};

type AnswerValue = number | number[] | null;

const exams = [
  {
    id: "1",
    title: "月度考核 - 防滑产品专题",
    questionCount: 20,
    duration: 30,
    deadline: "3天后",
    urgency: "normal",
    status: "not_started",
    passingScore: 80,
    desc: "含新品防滑系数、应用场景、客户说明要点，共 20 题",
  },
  {
    id: "2",
    title: "防水施工规范 v3.1 专项测试",
    questionCount: 15,
    duration: 25,
    deadline: "本周五",
    urgency: "warning",
    status: "not_started",
    passingScore: 85,
    desc: "重点考核禁用材料清单、施工标准变更，需通过方可操作相关订单",
  },
  {
    id: "3",
    title: "产品基础知识认证（季度）",
    questionCount: 30,
    duration: 45,
    deadline: "已通过",
    urgency: "normal",
    status: "passed",
    passingScore: 80,
    lastScore: 88,
    desc: "含瓷砖分类、参数解读、应用场景全覆盖",
  },
] as const;

const questions: Question[] = [
  {
    id: 1,
    type: "single",
    question: "云岚石暖冬系列防滑系数为哪一级别？",
    options: ["R8", "R9", "R10", "R11"],
    correct: 2,
    explanation: "云岚石暖冬系列 v2.3 版本将防滑系数从 R9 升级至 R10，适合卫浴、厨房等湿区使用。",
  },
  {
    id: 2,
    type: "single",
    question: "防水施工规范 v3.1 中，卫浴区防水涂层最小厚度要求是多少？",
    options: ["1.0mm", "1.5mm", "2.0mm", "2.5mm"],
    correct: 2,
    explanation: "v3.1 将最小厚度从 1.5mm 提升至 2.0mm，这是重要的变更点。",
  },
  {
    id: 3,
    type: "multiple",
    question: "以下哪些材料在 v3.1 禁用材料清单中被明确禁止？（多选）",
    options: [
      "单组分聚氨酯（潮湿基层）",
      "JS 防水涂料",
      "强溶剂型防水涂料",
      "水泥基渗透结晶型材料",
    ],
    correct: [0, 2],
    explanation: "v3.1 新增禁用：单组分聚氨酯（潮湿基层）和强溶剂型防水涂料，JS 和渗透结晶型材料仍可使用。",
  },
  {
    id: 4,
    type: "single",
    question: "面对客户说'你们的砖比别家贵多了'，以下哪种回应最恰当？",
    options: [
      "我们可以给您一些折扣",
      "贵有贵的道理，我们质量更好",
      "价格差异主要来自防滑标准和施工认证，我来说明一下",
      "便宜的砖用不了多久的，我们的性价比更高",
    ],
    correct: 2,
    explanation: "正确做法是将差异具体化（防滑标准、认证），避免空谈'质量更好'或直接降价，应先建立价值认知。",
  },
  {
    id: 5,
    type: "single",
    question: "云岚石暖冬系列 P800×800 规格最适合推荐给以下哪种客户？",
    options: [
      "家庭卫浴 3m² 以下",
      "客厅 30m² 以上大空间",
      "商业写字楼走廊",
      "室外庭院地面",
    ],
    correct: 1,
    explanation: "P800×800 大规格砖视觉延伸效果最佳，主推客厅等大空间，小空间反而显拥挤。",
  },
];

const examInstructionMap: Record<string, string[]> = {
  "1": [
    "本场考核重点验证你是否能把新品参数、应用场景和客户解释说清楚。",
    "题目里会混入旧版说法，注意识别版本变更，不要沿用过时口径。",
    "如果未通过，建议先回到相关课程和 AI 陪练补齐，再来复测。",
  ],
  "2": [
    "本场重点是 v3.1 变更点，不是把旧版知识全部重背一遍。",
    "特别留意禁用材料、施工厚度和风险提醒，这些都是现场高风险点。",
    "未通过会进入补训闭环，建议先补学课程再做复测。",
  ],
  "3": [
    "季度认证覆盖范围更广，建议先把近期更新课程和训练记录快速过一遍。",
    "除基础知识外，也会检查你是否能把知识点转成面向客户的话术。",
    "如果对某块拿不准，先回顾相关课程再开始答题。",
  ],
};

const initialAnswers = () => Array<AnswerValue>(questions.length).fill(null);

function isQuestionCorrect(question: Question, answer: AnswerValue) {
  if (question.type === "single") {
    return answer === question.correct;
  }

  const normalizedAnswer = [...(((answer as number[]) ?? []))].sort((a, b) => a - b);
  const normalizedCorrect = [...(question.correct as number[])].sort((a, b) => a - b);
  return JSON.stringify(normalizedAnswer) === JSON.stringify(normalizedCorrect);
}

export default function Assessment() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("list");
  const [selectedExam, setSelectedExam] = useState<(typeof exams)[number] | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<AnswerValue[]>(initialAnswers);
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  const correctCount = useMemo(
    () => questions.filter((question, index) => isQuestionCorrect(question, answers[index])).length,
    [answers]
  );
  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= (selectedExam?.passingScore ?? 80);
  const wrongCount = questions.length - correctCount;
  const instructionList = selectedExam ? examInstructionMap[selectedExam.id] || examInstructionMap["1"] : [];
  const prepPath = selectedExam?.id === "2" ? "/learning/course/2" : "/learning/course/1";

  useEffect(() => {
    if (stage !== "answering") {
      return undefined;
    }

    if (timeLeft <= 0) {
      setStage("result");
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [stage, timeLeft]);

  const openInstructions = (exam: (typeof exams)[number]) => {
    setSelectedExam(exam);
    setCurrentQ(0);
    setAnswers(initialAnswers());
    setTimeLeft(exam.duration * 60);
    setStage("instructions");
  };

  const startAnswering = () => {
    if (!selectedExam) {
      return;
    }
    setCurrentQ(0);
    setAnswers(initialAnswers());
    setTimeLeft(selectedExam.duration * 60);
    setStage("answering");
  };

  const restartExam = () => {
    setCurrentQ(0);
    setAnswers(initialAnswers());
    setTimeLeft((selectedExam?.duration ?? 25) * 60);
    setStage("answering");
  };

  const handleSingleAnswer = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = optionIndex;
      return next;
    });
  };

  const handleMultipleAnswer = (optionIndex: number) => {
    setAnswers((prev) => {
      const current = (prev[currentQ] as number[]) ?? [];
      const next = [...prev];
      next[currentQ] = current.includes(optionIndex)
        ? current.filter((item) => item !== optionIndex)
        : [...current, optionIndex].sort((a, b) => a - b);
      return next;
    });
  };

  if (stage === "result") {
    return (
      <div className="min-h-full bg-[#F5F7FA] px-4 md:px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-2xl p-6 mb-4 ${passed ? "bg-[#16A34A]" : "bg-[#DC2626]"}`}>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-1">{score}</div>
              <p className="text-white/80 text-sm mb-3">{passed ? "🎉 恭喜通过！" : "❌ 未通过，需补训后重考"}</p>
              <div className="flex justify-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-white font-medium">{correctCount}</div>
                  <div className="text-white/60 text-xs">答对</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-medium">{wrongCount}</div>
                  <div className="text-white/60 text-xs">答错</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-medium">{selectedExam?.passingScore}+</div>
                  <div className="text-white/60 text-xs">通过线</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {questions.map((question, index) => {
              const isCorrect = isQuestionCorrect(question, answers[index]);
              return (
                <div
                  key={question.id}
                  className="bg-white rounded-xl p-4 shadow-sm"
                  style={{ borderLeft: `3px solid ${isCorrect ? "#16A34A" : "#DC2626"}` }}
                >
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle2 size={15} className="text-[#16A34A] flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={15} className="text-[#DC2626] flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm text-gray-800">
                      {index + 1}. {question.question}
                    </p>
                  </div>
                  {!isCorrect && (
                    <div className="ml-5 mt-2 rounded-lg bg-amber-50 p-3">
                      <p className="text-xs text-gray-500 mb-1">解析：</p>
                      <p className="text-xs text-amber-800">{question.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!passed && (
            <div className="bg-[#EEF2FF] border border-[#2F5FD0]/20 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-[#2F5FD0] mb-1">建议补训内容</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 防水施工规范 v3.1 - 禁用材料章节</li>
                <li>• 云岚石暖冬系列新品参数手册</li>
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => navigate("/learning/growth/retrain")}
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#2F5FD0] text-white hover:bg-[#2550B8] transition-colors"
                >
                  查看补训任务
                </button>
                <button
                  onClick={() => navigate(prepPath)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-[#2F5FD0] text-[#2F5FD0] hover:bg-blue-50 transition-colors"
                >
                  先去补学
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {!passed && (
              <button
                onClick={restartExam}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#2F5FD0] text-[#2F5FD0] rounded-xl text-sm hover:bg-blue-50 transition-colors"
              >
                <RotateCcw size={15} /> 重新考核
              </button>
            )}
            <button
              onClick={() => setStage("list")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#2F5FD0] text-white rounded-xl text-sm hover:bg-[#2550B8] transition-colors"
            >
              返回考核列表
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "instructions" && selectedExam) {
    return (
      <div className="min-h-full bg-[#F5F7FA] px-4 md:px-6 py-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-5">
            <button
              onClick={() => setStage("list")}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
            >
              <ArrowLeft size={16} /> 返回考核列表
            </button>

            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedExam.urgency === "warning" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-[#2F5FD0]"
              }`}>
                {selectedExam.urgency === "warning" ? "需优先完成" : "待开始"}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">截止：{selectedExam.deadline}</span>
            </div>

            <h1 className="text-gray-900 mb-1">考前说明</h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{selectedExam.title} · 开始作答前先看清本次重点和注意事项。</p>

            <div className="grid md:grid-cols-4 gap-3 mb-4">
              {[
                { label: "题量", value: `${selectedExam.questionCount} 题`, icon: <FileText size={14} className="text-[#2F5FD0]" /> },
                { label: "时长", value: `${selectedExam.duration} 分钟`, icon: <Clock size={14} className="text-[#2F5FD0]" /> },
                { label: "通过线", value: `${selectedExam.passingScore} 分`, icon: <ShieldCheck size={14} className="text-green-600" /> },
                { label: "未通过后", value: "进入补训闭环", icon: <TriangleAlert size={14} className="text-amber-600" /> },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-[#F7FAFF] border border-[#D9E5FF] p-3">
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
                    <span className="text-xs text-gray-500">{item.label}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={15} className="text-amber-700" />
                <span className="text-sm font-medium text-amber-900">本次作答前你需要知道</span>
              </div>
              <div className="space-y-2">
                {instructionList.map((item) => (
                  <div key={item} className="text-xs text-amber-800 leading-relaxed">- {item}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">建议准备动作</span>
              </div>
              <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
                <div className="rounded-xl bg-[#F7FAFF] border border-[#D9E5FF] p-3">先确认最近是否有版本更新，不要用旧版信息作答。</div>
                <div className="rounded-xl bg-green-50 border border-green-100 p-3">如果是工艺/规范类考核，优先记住高风险变更点和禁用项。</div>
                <div className="rounded-xl bg-purple-50 border border-purple-100 p-3">如果担心现场表达不稳，可以先去做一轮 AI 陪练再回来答题。</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-[#16A34A]" />
                <span className="text-sm font-medium text-gray-900">开始前的两个入口</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => navigate(prepPath)}
                  className="w-full rounded-xl border border-gray-200 p-3 text-left hover:border-[#2F5FD0]/30 hover:bg-[#FAFBFF] transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900 mb-1">先补一下相关课程</p>
                  <p className="text-xs text-gray-500">适合还有点心虚、想先看重点变更后再答题。</p>
                </button>
                <button
                  onClick={() => navigate("/learning/growth/retrain")}
                  className="w-full rounded-xl border border-gray-200 p-3 text-left hover:border-[#2F5FD0]/30 hover:bg-[#FAFBFF] transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900 mb-1">查看补训任务页</p>
                  <p className="text-xs text-gray-500">适合想先确认自己这一轮闭环任务的人。</p>
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStage("list")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              稍后再考
            </button>
            <button
              onClick={startAnswering}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#2F5FD0] text-white rounded-xl text-sm hover:bg-[#2550B8] transition-colors"
            >
              开始作答 <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "answering") {
    const question = questions[currentQ];
    const currentAnswer = answers[currentQ];
    const isAnswered = currentAnswer !== null && (!Array.isArray(currentAnswer) || currentAnswer.length > 0);

    return (
      <div className="min-h-full bg-[#F5F7FA]">
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => setStage("instructions")} className="text-gray-500">
              <ArrowLeft size={18} />
            </button>
            <span className="text-sm text-gray-700 flex-1">{selectedExam?.title}</span>
            <div className="flex items-center gap-1.5 text-xs text-[#DC2626] bg-red-50 px-2 py-1 rounded-full">
              <Clock size={11} />
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2F5FD0] rounded-full transition-all"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {currentQ + 1}/{questions.length}
            </span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-5">
          <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 bg-[#2F5FD0] text-white rounded">
                {question.type === "single" ? "单选" : "多选"}
              </span>
              <span className="text-xs text-gray-400">第 {currentQ + 1} 题</span>
            </div>
            <p className="text-sm text-gray-900 mb-4 leading-relaxed">{question.question}</p>

            <div className="space-y-2">
              {question.options.map((option, index) => {
                const selected = question.type === "single"
                  ? currentAnswer === index
                  : ((currentAnswer as number[]) ?? []).includes(index);

                return (
                  <button
                    key={option}
                    onClick={() => (question.type === "single" ? handleSingleAnswer(index) : handleMultipleAnswer(index))}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                      selected
                        ? "bg-[#EEF2FF] border-[#2F5FD0] text-[#2F5FD0]"
                        : "bg-[#F5F7FA] border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-flex w-5 h-5 rounded border mr-2 items-center justify-center text-xs ${
                        selected ? "bg-[#2F5FD0] border-[#2F5FD0] text-white" : "border-gray-300"
                      }`}
                    >
                      {selected && "✓"}
                    </span>
                    {String.fromCharCode(65 + index)}. {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentQ((prev) => Math.max(0, prev - 1))}
              disabled={currentQ === 0}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={15} /> 上一题
            </button>

            {currentQ < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQ((prev) => prev + 1)}
                disabled={!isAnswered}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-colors ${
                  isAnswered ? "bg-[#2F5FD0] text-white hover:bg-[#2550B8]" : "bg-gray-100 text-gray-400"
                }`}
              >
                下一题 <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={() => setStage("result")}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#16A34A] text-white rounded-xl text-sm hover:bg-green-700 transition-colors"
              >
                提交考核 <CheckCircle2 size={15} />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQ(index)}
                className={`w-7 h-7 rounded text-xs transition-colors ${
                  index === currentQ
                    ? "bg-[#2F5FD0] text-white"
                    : answers[index] !== null
                      ? "bg-green-100 text-green-700"
                      : "bg-white border border-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-gray-900 mb-0.5">考核</h1>
          <p className="text-xs text-gray-500">通过考核验证学习成果，未通过可进入补训闭环</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 space-y-3">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                exam.status === "passed" ? "bg-green-50" : "bg-blue-50"
              }`}>
                <ClipboardList size={20} className={exam.status === "passed" ? "text-[#16A34A]" : "text-[#2F5FD0]"} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {exam.status === "passed" ? (
                    <span className="text-xs px-1.5 py-0.5 bg-green-100 text-[#16A34A] rounded flex items-center gap-0.5">
                      <CheckCircle2 size={9} /> 已通过 {exam.lastScore}分
                    </span>
                  ) : exam.urgency === "warning" ? (
                    <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">待完成</span>
                  ) : (
                    <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">未开始</span>
                  )}
                </div>
                <h3 className="text-sm text-gray-900 mb-0.5">{exam.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{exam.desc}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                  <span>{exam.questionCount} 题</span>
                  <span className="flex items-center gap-0.5">
                    <Clock size={9} />
                    {exam.duration} 分钟
                  </span>
                  <span>通过线 {exam.passingScore} 分</span>
                  <span className={exam.urgency === "warning" ? "text-[#F59E0B]" : ""}>{exam.deadline}</span>
                </div>
              </div>
              {exam.status !== "passed" && (
                <button
                  onClick={() => openInstructions(exam)}
                  className="flex-shrink-0 bg-[#2F5FD0] hover:bg-[#2550B8] text-white px-4 py-1.5 rounded-lg text-xs transition-colors"
                >
                  开始考核
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
