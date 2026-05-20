import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  FileText,
  RefreshCw,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { getUpdateById, impactTone, nodeTone } from "../data/infoSyncData";
import { ImpactScopeCard, ReminderStrip } from "../components/BusinessBlocks";
import { GlobalStateCard } from "../components/GlobalStateCard";



export default function InfoSyncDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const update = useMemo(() => getUpdateById(id), [id]);
  const pendingSyncCount = update.syncLinks.filter((item) => item.status !== "done").length;

  return (
    <div className="min-h-full bg-page-surface">

      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/workbench/info-sync")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={16} /> 返回信息同步中心
          </button>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${update.urgency === "urgent" ? "bg-red-100 text-[#DC2626]" : "bg-gray-100 text-gray-500"}`}>
                  {update.urgency === "urgent" ? "紧急更新" : "常规更新"}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-[#2F5FD0]">{update.category}</span>
                <span className="text-xs text-gray-400">{update.version}</span>
                <span className="text-xs text-gray-400">发布时间：{update.publishedAt}</span>
              </div>
              <h1 className="text-gray-900 text-base leading-snug mb-1">{update.title}</h1>
              <p className="text-sm text-gray-500 leading-relaxed">{update.summary}</p>
            </div>
            <button
              onClick={() => navigate("/workbench/content-ops")}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
            >
              去社区运营继续处理
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-[#1E2A3A] p-4 md:p-5 grid md:grid-cols-4 gap-3">
            {[
              { label: "已确认", value: `${update.confirmedCount}/${update.affectedCount}` },
              { label: "待确认人员", value: `${update.pendingCount} 人` },
              { label: "旧内容使用", value: `${update.oldContentUsers} 人次` },
              { label: "待同步节点", value: `${pendingSyncCount} 个` },
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
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">更新详情</span>
              </div>
              <div className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-3 text-xs text-blue-700 leading-relaxed mb-3">
                这次更新不是只发通知，而是要把对客话术、设计说明、培训内容和后续审单标准一起切到同一口径。
              </div>
              <div className="space-y-2">
                {update.changes.map((change) => (
                  <div key={change} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {change}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-[#F59E0B]" />
                <span className="text-sm font-medium text-gray-900">影响范围拆解</span>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {update.impactScopes.map((item) => (
                  <div key={item.label} className={`rounded-xl border px-3 py-3 ${impactTone(item.severity)}`}>
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
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">推进建议</span>
              </div>
              <div className="space-y-2">
                {[
                  `先追齐 ${update.pendingCount} 位未确认人员，避免前线继续使用旧版本。`,
                  "再检查题库、陪练和其他下游节点是否同步，否则培训和实操会继续分裂。",
                  "同步完成后再发起重学或复测，避免重复通知和无效补训。",
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">影响角色与待确认</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {update.affectedRoles.map((role) => (
                  <span key={role} className="text-xs px-2 py-1 rounded-full bg-[#F5F7FA] border border-gray-200 text-gray-600">
                    {role}
                  </span>
                ))}
              </div>
              {update.pendingUsers.length > 0 ? (
                <div className="space-y-2">
                  {update.pendingUsers.map((name) => (
                    <div key={name} className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2.5 text-xs text-amber-700">
                      {name} 尚未确认新版内容
                    </div>
                  ))}
                </div>
              ) : (
                <GlobalStateCard
                  tone="success"
                  size="sm"
                  title="当前影响人员已全部确认"
                  description="这次更新的影响角色已经完成确认，可以继续看版本承接或回到更新记录页查看留痕。"
                  action={{
                    label: "去更新记录页",
                    onClick: () => navigate("/workbench/info-sync/records"),
                  }}
                  className="shadow-none"
                />
              )}

            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">下游同步链路</span>
              </div>
              <div className="space-y-2">
                {update.syncLinks.map((link) => (
                  <div key={link.label} className={`rounded-xl border px-3 py-3 ${nodeTone(link.status)}`}>
                    <div className="flex items-center justify-between gap-3 text-xs font-medium">
                      <span>{link.label}</span>
                      <span>{link.owner}</span>
                    </div>
                    <p className="text-xs mt-2 leading-relaxed">{link.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target size={15} className="text-[#2F5FD0]" />
                <span className="text-sm font-medium text-gray-900">后续动作</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/workbench/content-ops")}
                  className="w-full py-2.5 rounded-xl bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-sm transition-colors"
                >
                  去社区运营处理版本承接
                </button>
                <button
                  onClick={() => navigate("/workbench/blueprint")}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors"
                >
                  查看产品蓝图关系图
                </button>
              </div>
              <ReminderStrip
                tone="amber"
                title="旧内容使用提醒"
                description={`当前还有 ${update.oldContentUsers} 人次命中过往旧内容，建议优先处理高频使用节点。`}
                icon={<Eye size={13} />}
                className="mt-3"
              />

            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3">
              <div className="flex items-center gap-2 text-[#15803D] mb-1">
                <CheckCircle2 size={14} />
                <span className="text-sm font-medium">本页已把更新详情与影响范围拆开承接</span>
              </div>
              <p className="text-xs text-green-700 leading-relaxed">后续即使仍保留信息同步中心总览，也能从总览进入这张独立页，不再只停留在综合 tab 内。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
