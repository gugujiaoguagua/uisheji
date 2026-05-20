import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  ArrowLeftRight,
  BarChart3,
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  Dumbbell,
  FileCheck,
  GitBranch,
  Layers,
  MessageSquare,
  RefreshCw,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

type BlueprintTab = "architecture" | "journey" | "loops";

const architectureGroups = [
  {
    title: "统一底座",
    tone: "bg-slate-50 border-slate-200 text-slate-700",
    items: ["统一账号", "身份选择 / 切换", "消息中心", "全局搜索", "权限与审批状态"],
  },
  {
    title: "学习主链路",
    tone: "bg-blue-50 border-blue-100 text-[#2F5FD0]",
    items: ["学习中心", "AI 问答", "AI 陪练", "考核", "成长与补训"],
  },
  {
    title: "工作人员主链路",
    tone: "bg-amber-50 border-amber-100 text-[#B45309]",
    items: ["信息同步中心", "社区运营", "销售-设计协同", "审单·回流", "审批·申请", "异常看板"],
  },
];

const learnerJourney = [
  { label: "登录 / 选择身份", desc: "同一账号进入学员或工作人员视角" },
  { label: "学员首页", desc: "优先看到今日学习、陪练和成长动作" },
  { label: "学习中心", desc: "课程、任务、重点产品和规范统一承接" },
  { label: "AI 问答 / AI 陪练", desc: "现场救场与训练提分双入口" },
  { label: "考核 / 成长与补训", desc: "形成复测、补训、提升建议闭环" },
];

const staffJourney = [
  { label: "登录 / 选择身份", desc: "同一账号进入工作人员视角" },
  { label: "工作人员首页 / 工作台", desc: "先看风险、待办、异常和推进动作" },
  { label: "信息同步中心", desc: "识别更新、影响范围和旧内容风险" },
  { label: "社区运营", desc: "把资源、群运营、转化和新人培养同步到同一版本" },
  { label: "销设协同 / 审单回流 / 审批带教", desc: "处理跨角色交接、回流培训与身份流转" },
];

const crossFlows = [
  {
    title: "现场救场回流",
    from: "AI 问答",
    to: "信息同步中心 / 社区运营",
    note: "答不上来时发起知识补充，避免销售与培训口径继续分裂。",
  },
  {
    title: "销设案例回流",
    from: "销售-设计协同",
    to: "案例库 / AI 陪练 / 培训课件",
    note: "会审资料、讲稿评分和优化稿一起沉淀，复用于后续训练。",
  },
  {
    title: "异常问题回流",
    from: "审单·回流 / 售后",
    to: "社区运营 / 信息同步中心",
    note: "把真实异常转成题库、陪练场景和规范修订，而不是只处理当单。",
  },
  {
    title: "身份流转",
    from: "审批·申请",
    to: "首页 / 我的 / 权限状态",
    note: "审批结果和主身份生效信息在统一链路里同步，不拆账户。",
  },
];

const loopCards = [
  {
    title: "学习闭环",
    status: "完成",
    note: "推荐路径 -> 学习 -> 考核 -> 成长反馈 -> 补训。",
  },
  {
    title: "现场救场闭环",
    status: "完成",
    note: "AI 问答先给可直接说的话，再给来源，答不上来时可发起补充。",
  },
  {
    title: "陪练闭环",
    status: "完成",
    note: "场景选择、训练说明、实战训练、结果反馈已在学习端独立成阶段。",
  },
  {
    title: "信息同步闭环",
    status: "完成",
    note: "信息同步中心与社区运营之间显性追踪资源口径、运营动作和新人培养资料是否真正同步。",
  },
  {
    title: "销设协同闭环",
    status: "完成",
    note: "交接 -> 会审 -> 评分 -> 讲稿优化 -> 案例沉淀已经拆成独立视图。",
  },
  {
    title: "审单-售后回流闭环",
    status: "完成",
    note: "异常详情、责任归因和回流计划已拆开，问题能回流到培训与同步链。",
  },
  {
    title: "身份流转闭环",
    status: "完成",
    note: "申请、审批、结果通知、主身份生效与学习能力保留已打通。",
  },
];

const quickLinks = [
  { label: "打开学习中心", path: "/learning", icon: <BookOpen size={14} /> },
  { label: "打开 AI 问答", path: "/learning/ai-qna", icon: <Brain size={14} /> },
  { label: "打开信息同步中心", path: "/workbench/info-sync", icon: <RefreshCw size={14} /> },
  { label: "打开社区运营", path: "/workbench/content-ops", icon: <Layers size={14} /> },
  { label: "打开销设协同", path: "/workbench/collab", icon: <ArrowLeftRight size={14} /> },
  { label: "打开审单回流", path: "/workbench/order-review", icon: <FileCheck size={14} /> },
  { label: "打开双端映射验收", path: "/workbench/dual-end-acceptance", icon: <CheckCircle2 size={14} /> },
];


function JourneyLine({ items, tone }: { items: typeof learnerJourney; tone: string }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-start gap-3">
          <div className="flex flex-col items-center flex-shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${tone}`}>
              {index + 1}
            </div>
            {index < items.length - 1 && <div className="w-px h-8 bg-gray-200 mt-1" />}
          </div>
          <div className="pt-1">
            <p className="text-sm font-medium text-gray-900">{item.label}</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductBlueprint() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BlueprintTab>("architecture");

  const completionMeta = useMemo(
    () => ({ done: loopCards.filter((item) => item.status === "完成").length, total: loopCards.length }),
    [],
  );

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-[#1E2A3A] px-4 md:px-6 pt-4 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-white/60 text-xs mb-1">独立收口页</p>
              <h1 className="text-white text-xl font-semibold">产品蓝图 & 页面关系总览</h1>
              <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-3xl">
                把统一架构、页面关系图和 7 条闭环单独拎出来，方便作为第一轮设计交付的说明页，不改主体 UI 框架。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 min-w-[220px]">
              <div className="rounded-xl bg-white/10 px-4 py-3 text-center">
                <div className="text-2xl font-bold text-white">2</div>
                <div className="text-white/60 text-xs mt-1">核心视角</div>
              </div>
              <div className="rounded-xl bg-white/10 px-4 py-3 text-center">
                <div className="text-2xl font-bold text-white">{completionMeta.done}/{completionMeta.total}</div>
                <div className="text-white/60 text-xs mt-1">闭环已收口</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            {[
              { key: "architecture", label: "统一产品架构" },
              { key: "journey", label: "页面关系图" },
              { key: "loops", label: "闭环验收" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as BlueprintTab)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  activeTab === tab.key ? "bg-white text-[#1E2A3A]" : "bg-white/10 text-white/75 hover:bg-white/15"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-4 pb-6 space-y-4">
        {activeTab === "architecture" && (
          <>
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5">
              <div className="flex items-center gap-2 mb-4">
                <GitBranch size={16} className="text-[#2F5FD0]" />
                <h2 className="text-sm font-medium text-gray-900">统一产品架构图</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {architectureGroups.map((group) => (
                  <div key={group.title} className={`rounded-2xl border p-4 ${group.tone}`}>
                    <p className="text-sm font-semibold">{group.title}</p>
                    <div className="space-y-2 mt-3">
                      {group.items.map((item) => (
                        <div key={item} className="rounded-xl bg-white/80 px-3 py-2 text-xs leading-relaxed">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-4 gap-3 mt-4">
                {crossFlows.map((flow) => (
                  <div key={flow.title} className="rounded-2xl border border-gray-200 bg-[#FAFBFC] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-[#2F5FD0]" />
                      <p className="text-sm font-medium text-gray-900">{flow.title}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>{flow.from}</span>
                      <ArrowRight size={12} />
                      <span>{flow.to}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{flow.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-3 bg-white rounded-2xl shadow-sm p-4 md:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={16} className="text-[#2F5FD0]" />
                  <h2 className="text-sm font-medium text-gray-900">核心模块映射</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-center gap-2 text-[#2F5FD0] mb-3">
                      <BookOpen size={16} />
                      <p className="text-sm font-medium">学员优先链路</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "学习中心", icon: <BookOpen size={13} /> },
                        { label: "AI 问答", icon: <Brain size={13} /> },
                        { label: "AI 陪练", icon: <Dumbbell size={13} /> },
                        { label: "考核", icon: <ClipboardList size={13} /> },
                        { label: "成长与补训", icon: <TrendingUp size={13} /> },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl bg-white px-3 py-2 text-xs text-gray-700 flex items-center gap-2">
                          {item.icon}
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                    <div className="flex items-center gap-2 text-[#B45309] mb-3">
                      <Briefcase size={16} />
                      <p className="text-sm font-medium">工作人员优先链路</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "信息同步", icon: <RefreshCw size={13} /> },
                        { label: "社区运营", icon: <Layers size={13} /> },
                        { label: "销设协同", icon: <ArrowLeftRight size={13} /> },
                        { label: "审单回流", icon: <FileCheck size={13} /> },
                        { label: "审批申请", icon: <Shield size={13} /> },
                        { label: "异常看板", icon: <BarChart3 size={13} /> },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl bg-white px-3 py-2 text-xs text-gray-700 flex items-center gap-2">
                          {item.icon}
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-4">
                <p className="text-sm font-medium text-gray-900 mb-3">快捷打开</p>
                <div className="space-y-2">
                  {quickLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => navigate(link.path)}
                      className="w-full rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-2.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between gap-2"
                    >
                      <span className="flex items-center gap-2">
                        {link.icon}
                        {link.label}
                      </span>
                      <ArrowRight size={12} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "journey" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} className="text-[#2F5FD0]" />
                <h2 className="text-sm font-medium text-gray-900">学员页面关系图</h2>
              </div>
              <JourneyLine items={learnerJourney} tone="bg-blue-100 text-[#2F5FD0]" />
              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs text-blue-700 leading-relaxed">
                学员链路强调“先完成今天动作，再补强薄弱项”，不是单纯看课程列表。
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={16} className="text-[#B45309]" />
                <h2 className="text-sm font-medium text-gray-900">工作人员页面关系图</h2>
              </div>
              <JourneyLine items={staffJourney} tone="bg-amber-100 text-[#B45309]" />
              <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs text-amber-700 leading-relaxed">
                工作人员链路强调“先定位风险，再推进更新、协同与回流”，避免跨角色信息不同步。
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-4 md:p-5">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare size={16} className="text-[#2F5FD0]" />
                <h2 className="text-sm font-medium text-gray-900">跨链路承接关系</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-3">
                {crossFlows.map((flow) => (
                  <div key={flow.title} className="rounded-2xl border border-gray-200 bg-[#FAFBFC] px-4 py-4">
                    <p className="text-sm font-medium text-gray-900">{flow.title}</p>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{flow.note}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-[#2F5FD0]">
                      <span>{flow.from}</span>
                      <ArrowRight size={12} />
                      <span>{flow.to}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "loops" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={16} className="text-[#16A34A]" />
                <h2 className="text-sm font-medium text-gray-900">7 条闭环验收</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {loopCards.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-gray-200 bg-[#FAFBFC] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-[#15803D]">{item.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-4 md:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Target size={16} className="text-[#2F5FD0]" />
                  <h2 className="text-sm font-medium text-gray-900">这页补齐了什么</h2>
                </div>
                <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
                  {[
                    "把统一产品架构单独展示出来，避免只能从零散页面里推断系统结构。",
                    "把学员链路、工作人员链路和跨角色回流链路整理成一页，适合作为页面关系图交付。",
                    "把闭环完成情况显性标注出来，方便和 `01-Figma AI 项目总输入.md` 做对照验收。",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-gray-200 bg-[#F8FAFC] px-4 py-3">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-4">
                <p className="text-sm font-medium text-gray-900 mb-3">相关入口</p>
                <div className="space-y-2">
                  {[
                    { label: "去工作台首页", path: "/workbench" },
                    { label: "去双端映射验收", path: "/workbench/dual-end-acceptance" },
                    { label: "去消息中心", path: "/messages" },
                    { label: "去审批申请", path: "/workbench/approvals" },
                  ].map((item) => (

                    <button
                      key={item.label}
                      onClick={() => navigate(item.path)}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <ArrowRight size={12} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
