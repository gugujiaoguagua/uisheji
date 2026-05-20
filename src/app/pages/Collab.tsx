import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeftRight,
  ChevronRight,
  FileText,
  Plus,
  Search,
  X,
} from "lucide-react";
import { requests, statusMeta, type RequestItem } from "../data/collabData";

type FilterKey = "all" | RequestItem["status"];

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "全部客户单" },
  { key: "review_ready", label: "待会审收口" },
  { key: "case_done", label: "已完成同步" },
];

function getVisibleStepName(step: string) {
  return step === "AI 讲稿优化" ? "讲解口径同步" : step;
}

function getOrderProgress(order: RequestItem) {
  const completed = order.steps.filter((step) => step.done).length;
  return Math.round((completed / order.steps.length) * 100);
}

function getCurrentStep(order: RequestItem) {
  return getVisibleStepName(order.steps.find((step) => !step.done)?.step ?? "已完成");
}

export default function Collab() {
  const navigate = useNavigate();
  const [showNewModal, setShowNewModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    return requests.filter((order) => {
      const matchFilter = activeFilter === "all" || order.status === activeFilter;
      if (!matchFilter) return false;
      if (!keyword) return true;
      return [
        order.title,
        order.customer,
        order.company,
        order.salesperson,
        order.designer,
        order.space,
        order.requirements,
      ].some((value) => value.toLowerCase().includes(keyword));
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-[#1E2A3A] px-4 md:px-6 pt-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-white text-xl font-semibold">销售设计师协同</h1>
            <button
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-1.5 bg-white text-[#1E2A3A] hover:bg-gray-100 px-3 py-2 rounded-lg text-sm transition-colors"
            >
              <Plus size={14} /> 新建客户单
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-7 pb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
            <div>
              <p className="text-sm font-medium text-gray-900">所有客户单</p>
              <p className="text-sm text-gray-500 mt-1">先筛选，也可以按姓名查询。</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-xl text-sm transition-colors border ${
                  activeFilter === filter.key
                    ? "bg-[#2F5FD0] text-white border-[#2F5FD0]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#2F5FD0]/40"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] border border-gray-200 px-3 py-2">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="按客户单、小区、业主、销售或设计师查询"
              className="flex-1 h-10 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="w-8 h-8 rounded-lg bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="grid xl:grid-cols-2 gap-4">
            {filteredOrders.map((order) => {
              const progress = getOrderProgress(order);
              const currentStep = getCurrentStep(order);
              const meta = statusMeta[order.status];
              const progressTone = progress >= 100 ? "text-[#16A34A] border-green-200 bg-green-50" : "text-[#2F5FD0] border-blue-200 bg-blue-50";

              return (
                <button
                  key={order.id}
                  type="button"
                  onClick={() => navigate(`/workbench/collab/request/${order.id}`)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#2F5FD0]/40 hover:shadow-md transition-all p-4 text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${meta.tone}`}>{meta.label}</span>
                        {order.urgency === "warning" && <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-[#DC2626]">本日推进</span>}
                      </div>
                      <h2 className="text-base font-medium text-gray-900 mt-2 leading-relaxed">{order.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">销售 {order.salesperson} → 设计 {order.designer}</p>
                    </div>
                    <div className={`w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center flex-shrink-0 ${progressTone}`}>
                      <span className="text-lg font-bold leading-none">{progress}</span>
                      <span className="text-xs mt-0.5">%</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-gray-500">当前进度</span>
                      <span className="text-[#2F5FD0]">{currentStep}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2F5FD0] rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 mt-4">
                    <div className="rounded-xl bg-[#F8FAFC] border border-gray-100 px-3 py-3">
                      <p className="text-xs text-gray-400">空间</p>
                      <p className="text-sm text-gray-800 mt-1">{order.space}</p>
                    </div>
                    <div className="rounded-xl bg-[#F8FAFC] border border-gray-100 px-3 py-3">
                      <p className="text-xs text-gray-400">需求</p>
                      <p className="text-sm text-gray-800 mt-1 line-clamp-1">{order.requirements}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <ArrowLeftRight size={14} />
                      {order.customer}（{order.company}）
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm text-[#2F5FD0]">
                      查看详情 <ChevronRight size={14} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F7FA] mx-auto flex items-center justify-center text-gray-400 mb-3">
              <Search size={18} />
            </div>
            <p className="text-sm font-medium text-gray-900">没有找到客户单</p>
            <p className="text-sm text-gray-500 mt-1">换一个小区、业主、销售或设计师名字再搜。</p>
          </div>
        )}
      </div>

      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-5 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900">新建客户单</h3>
              <button onClick={() => setShowNewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3 mb-4 text-xs">
              {[
                { label: "小区 / 项目", placeholder: "如：临港星河湾" },
                { label: "业主姓名", placeholder: "请输入" },
                { label: "对接销售", placeholder: "请输入" },
                { label: "对接设计师", placeholder: "请输入" },
                { label: "空间与预算", placeholder: "如：主卫 8m² / 12 万" },
                { label: "核心需求", placeholder: "防滑、耐污、风格偏好等" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="font-medium text-gray-700 block mb-1">{field.label}</label>
                  <input
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700 outline-none focus:border-[#2F5FD0] transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowNewModal(false)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                取消
              </button>
              <button onClick={() => setShowNewModal(false)} className="flex-1 py-2 bg-[#2F5FD0] hover:bg-[#2550B8] text-white rounded-lg text-sm transition-colors">
                提交客户单
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
