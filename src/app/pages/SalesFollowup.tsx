import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeftRight, MessageSquare, Phone, Plus, Search, X } from "lucide-react";

type CustomerStatus = "urgent" | "quote" | "new";

const customers = [
  {
    id: "c1",
    name: "李总",
    project: "临港星河湾 · 卫浴改造",
    status: "urgent" as CustomerStatus,
    statusLabel: "今日必须跟进",
    phone: "138****7621",
    need: "防滑 R10+、耐污、适合老人使用",
    budget: "12 万",
    nextAction: "确认预算上限和是否接受 R10 防滑款",
    lastTouch: "今天 09:20 已沟通老人使用场景",
    path: "/workbench/collab/request/r1",
  },
  {
    id: "c2",
    name: "张女士",
    project: "青浦悦府 · 全屋瓷砖",
    status: "quote" as CustomerStatus,
    statusLabel: "报价回访",
    phone: "136****5028",
    need: "大规格砖、哑光、统一色调",
    budget: "8 万",
    nextAction: "回访报价接受度，确认是否进入定稿",
    lastTouch: "昨天 17:40 已发方案图",
    path: "/workbench/collab/request/r2",
  },
  {
    id: "c3",
    name: "王先生",
    project: "嘉定云著 · 厨卫翻新",
    status: "new" as CustomerStatus,
    statusLabel: "需求初访",
    phone: "159****3188",
    need: "厨卫局部翻新、耐污、预算可控",
    budget: "待确认",
    nextAction: "补充户型照片和预算范围",
    lastTouch: "新线索，尚未完整建单",
    path: "/workbench/collab",
  },
];

const filters: { key: "all" | CustomerStatus; label: string }[] = [
  { key: "all", label: "全部客户" },
  { key: "urgent", label: "今日必跟" },
  { key: "quote", label: "报价回访" },
  { key: "new", label: "新线索" },
];

function statusClass(status: CustomerStatus) {
  if (status === "urgent") return "bg-red-50 text-[#DC2626]";
  if (status === "quote") return "bg-amber-50 text-[#B45309]";
  return "bg-blue-50 text-[#2F5FD0]";
}

export default function SalesFollowup() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<"all" | CustomerStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    return customers.filter((customer) => {
      if (activeFilter !== "all" && customer.status !== activeFilter) return false;
      if (!keyword) return true;
      return [customer.name, customer.project, customer.need, customer.nextAction].some((value) => value.toLowerCase().includes(keyword));
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-[#1E2A3A] px-4 md:px-6 pt-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-white text-xl font-semibold">客户跟进</h1>
            <button
              onClick={() => navigate("/workbench/collab")}
              className="inline-flex items-center gap-1.5 bg-white text-[#1E2A3A] hover:bg-gray-100 px-3 py-2 rounded-lg text-sm transition-colors"
            >
              <Plus size={14} /> 新建客户单
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-7 pb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
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
              placeholder="按客户、楼盘、需求或下一步动作查询"
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

        <div className="grid xl:grid-cols-2 gap-4">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-medium text-gray-900">{customer.name}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusClass(customer.status)}`}>{customer.statusLabel}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{customer.project}</p>
                </div>
                <span className="text-sm text-gray-400">{customer.phone}</span>
              </div>

              <div className="grid md:grid-cols-2 gap-3 mt-4">
                <div className="rounded-xl bg-[#F8FAFC] border border-gray-100 px-3 py-3">
                  <p className="text-xs text-gray-400">客户需求</p>
                  <p className="text-sm text-gray-800 mt-1 leading-relaxed">{customer.need}</p>
                </div>
                <div className="rounded-xl bg-[#F8FAFC] border border-gray-100 px-3 py-3">
                  <p className="text-xs text-gray-400">预算</p>
                  <p className="text-sm text-gray-800 mt-1">{customer.budget}</p>
                </div>
              </div>

              <div className="rounded-xl bg-blue-50/60 border border-blue-100 px-3 py-3 mt-3">
                <p className="text-xs text-[#2F5FD0]">下一步</p>
                <p className="text-sm text-gray-800 mt-1 leading-relaxed">{customer.nextAction}</p>
                <p className="text-xs text-gray-500 mt-2">{customer.lastTouch}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <button className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#2F5FD0] text-white py-2 text-sm hover:bg-[#2550B8] transition-colors">
                  <MessageSquare size={14} /> 发消息
                </button>
                <button className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#16A34A] text-white py-2 text-sm hover:bg-[#15803D] transition-colors">
                  <Phone size={14} /> 打电话
                </button>
                <button
                  onClick={() => navigate(customer.path)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 text-gray-700 py-2 text-sm hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeftRight size={14} /> 客户单
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
