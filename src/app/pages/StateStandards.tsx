import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { AlertTriangle, ArrowLeft, CheckCircle2, Sparkles, Zap } from "lucide-react";
import { GlobalStateCard, globalStateMeta, type GlobalStateTone } from "../components/GlobalStateCard";
import { stateScenes } from "../data/workflowData";

const reuseTargets = [
  "Home：首页空态、当前状态提醒、网络异常提示",
  "Messages：筛选为空时统一给回退动作",
  "RiskRoster / CoachTasks / RetestMakeup：筛选无结果统一处理",
  "OrderReview：列表和详情位的筛选空态统一收口",
  "InfoSyncDetail：影响人员全部确认时统一成功态",
  "ApprovalStatus：审批中 / 已完成 / 未申请统一状态卡承接",
];

export default function StateStandards() {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState<"all" | GlobalStateTone>("all");
  const [selectedId, setSelectedId] = useState(stateScenes[0].id);

  const filteredScenes = useMemo(() => {
    return stateScenes.filter((item) => categoryFilter === "all" || item.category === categoryFilter);
  }, [categoryFilter]);

  const selectedScene = useMemo(() => {
    return filteredScenes.find((item) => item.id === selectedId) ?? filteredScenes[0] ?? stateScenes[0];
  }, [filteredScenes, selectedId]);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/workbench")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回工作台
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EEF4FF] text-[#2F5FD0]">状态规范已工程化</span>
                <span className="text-xs text-gray-400">统一空态、异常态、成功态和待处理态的组件口径</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">空状态 / 异常状态页</h1>
              <p className="text-sm text-gray-500 leading-relaxed">第十一项已经从“规范说明”升级成可直接复用的状态组件层，避免首页、审批、消息和筛选页继续各写一套状态卡。</p>
            </div>
            <button
              onClick={() => navigate(selectedScene.actionPath)}
              className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
            >
              打开当前示例来源
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "规范场景", value: `${stateScenes.length} 类` },
              { label: "组件类型", value: "Empty / Exception / Success / Pending" },
              { label: "首批接入", value: "8 处页面状态位" },
              { label: "复用方式", value: "不改路由，只替换页内状态卡" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/5 px-3 py-3">
                <p className="text-xs text-white/50 mb-1">{item.label}</p>
                <p className="text-sm text-white leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 grid md:grid-cols-5 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                  categoryFilter === "all" ? "bg-[#2F5FD0] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                }`}
              >
                全部
              </button>
              {(Object.keys(globalStateMeta) as GlobalStateTone[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                    categoryFilter === key ? "bg-[#EEF4FF] text-[#2F5FD0]" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {globalStateMeta[key].label}
                </button>
              ))}
            </div>
          </div>

          {filteredScenes.map((scene) => {
            const meta = globalStateMeta[scene.category];
            return (
              <button
                key={scene.id}
                onClick={() => setSelectedId(scene.id)}
                className={`w-full text-left bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all ${
                  selectedScene.id === scene.id ? "ring-2 ring-[#2F5FD0]" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F7FA] flex items-center justify-center flex-shrink-0">
                    {meta.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${meta.pill}`}>{meta.label}</span>
                      <span className="text-xs text-gray-400">来源：{scene.source}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{scene.title}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{scene.summary}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="md:col-span-3 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${globalStateMeta[selectedScene.category].pill}`}>
                    {globalStateMeta[selectedScene.category].label}
                  </span>
                  <span className="text-xs text-gray-400">来源页：{selectedScene.source}</span>
                </div>
                <h2 className="text-base font-medium text-gray-900">{selectedScene.title}</h2>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{selectedScene.summary}</p>
              </div>
              <button
                onClick={() => navigate(selectedScene.actionPath)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {selectedScene.actionLabel}
              </button>
            </div>
          </div>

          <GlobalStateCard
            tone={selectedScene.category}
            badge="组件预览"
            caption={`来源：${selectedScene.source}`}
            title={selectedScene.title}
            description={selectedScene.summary}
            helperText="第十一项已把这类状态抽成统一组件，后续页面只需要喂文案、动作和元信息，不再每页单独拼色块和按钮。"
            action={{ label: selectedScene.actionLabel, onClick: () => navigate(selectedScene.actionPath) }}
            meta={[
              { label: "触发条件", value: selectedScene.trigger },
              { label: "推荐动作", value: selectedScene.actionLabel },
              { label: "组件收益", value: "统一文案语气、色彩和 CTA，降低状态位重复实现。" },
            ]}
          />

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={15} className="text-[#2F5FD0]" />
              <span className="text-sm font-medium text-gray-900">首批复用落点</span>
            </div>
            <div className="space-y-2">
              {reuseTargets.map((item) => (
                <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">触发条件</span>
              </div>
              <div className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                {selectedScene.trigger}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                {globalStateMeta[selectedScene.category].icon}
                <span className="text-sm font-medium text-gray-900">使用规则</span>
              </div>
              <div className="space-y-2">
                {selectedScene.rules.map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={15} className="text-[#16A34A]" />
              <span className="text-sm font-medium text-gray-900">工程化结果</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              {[
                { label: "统一入口", value: "`GlobalStateCard` 组件" },
                { label: "统一语义", value: "Empty / Exception / Success / Pending" },
                { label: "统一动作", value: "每类状态都强制保留明确 CTA" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-gray-600 leading-relaxed">
                  <p className="text-[11px] text-gray-400 mb-1">{item.label}</p>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={15} className="text-[#F59E0B]" />
              <span className="text-sm font-medium text-gray-900">不要这样做</span>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-xs text-amber-700 leading-relaxed">
              {selectedScene.avoid}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
