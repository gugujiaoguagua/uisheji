import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  RefreshCw,
  Send,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";
import { impactTone, nodeTone, updates } from "../data/infoSyncData";

type SyncDetailTab = "summary" | "impact" | "sync";

const showSummaryChangesPanel = false;
const showSyncReminderPanel = false;

export default function InfoSync() {

  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(updates[0].id);
  const [detailTab, setDetailTab] = useState<SyncDetailTab>("summary");
  const [showPushModal, setShowPushModal] = useState(false);

  const selectedUpdate = updates.find((item) => item.id === selectedId) ?? updates[0];
  const pendingSyncCount = updates.reduce(
    (sum, item) => sum + item.syncLinks.filter((link) => link.status !== "done").length,
    0,
  );
  const pendingPracticeCount = updates.reduce(
    (sum, item) => sum + item.syncLinks.filter((link) => link.label === "AI 陪练场景" && link.status !== "done").length,
    0,
  );
  const totalPendingUsers = updates.reduce((sum, item) => sum + item.pendingCount, 0);
  const oldUsers = updates.reduce((sum, item) => sum + item.oldContentUsers, 0);

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-gray-900">信息同步中心</h1>
              <p className="text-xs text-gray-500 mt-0.5">把“更新详情、影响范围、下游同步”拆开看，避免只发通知不管后续。</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5">
                <AlertTriangle size={13} className="text-[#DC2626]" />
                <span className="text-xs text-[#DC2626] font-medium">待确认</span>
              </div>
              <div className="text-xl font-bold text-[#DC2626] mt-0.5">2 <span className="text-xs font-normal">项更新</span></div>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-[#F59E0B]" />
                <span className="text-xs text-[#F59E0B] font-medium">未确认人员</span>
              </div>
              <div className="text-xl font-bold text-[#F59E0B] mt-0.5">{totalPendingUsers} <span className="text-xs font-normal">人</span></div>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5">
                <Eye size={13} className="text-orange-500" />
                <span className="text-xs text-orange-500 font-medium">使用旧内容</span>
              </div>
              <div className="text-xl font-bold text-orange-500 mt-0.5">{oldUsers} <span className="text-xs font-normal">人次</span></div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5">
                <Target size={13} className="text-[#2F5FD0]" />
                <span className="text-xs text-[#2F5FD0] font-medium">下游待同步</span>
              </div>
              <div className="text-xl font-bold text-[#2F5FD0] mt-0.5">{pendingSyncCount} <span className="text-xs font-normal">个节点</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
        <div className="grid md:grid-cols-5 gap-4">
          <div className="md:col-span-2 space-y-3">
            {updates.map((update) => {
              const pendingSyncNodes = update.syncLinks.filter((link) => link.status !== "done").length;
              return (
                <button
                  key={update.id}
                  onClick={() => setSelectedId(update.id)}
                  className={`w-full text-left bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all ${
                    selectedUpdate.id === update.id ? "ring-2 ring-[#2F5FD0]" : ""
                  }`}
                  style={{ borderLeft: `3px solid ${update.urgency === "urgent" ? "#DC2626" : "#6B7280"}` }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${update.status === "completed" ? "bg-green-50" : "bg-blue-50"}`}>
                      <RefreshCw size={17} className={update.status === "completed" ? "text-[#16A34A]" : "text-[#2F5FD0]"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${update.urgency === "urgent" ? "bg-red-100 text-[#DC2626]" : "bg-gray-100 text-gray-500"}`}>
                          {update.urgency === "urgent" ? "紧急" : "普通"}
                        </span>
                        <span className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">{update.category}</span>
                        <span className="text-xs text-gray-400">{update.version}</span>
                      </div>
                      <p className="text-sm text-gray-900 mb-1">{update.title}</p>
                      <p className="text-xs text-gray-500 line-clamp-2">{update.summary}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 flex-wrap">
                        <span>{update.confirmedCount}/{update.affectedCount} 已确认</span>
                        {update.pendingCount > 0 && <span className="text-[#F59E0B]">{update.pendingCount} 人待确认</span>}
                        {pendingSyncNodes > 0 && <span className="text-[#2F5FD0]">{pendingSyncNodes} 个节点待同步</span>}
                      </div>
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
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${selectedUpdate.urgency === "urgent" ? "bg-red-100 text-[#DC2626]" : "bg-gray-100 text-gray-500"}`}>
                      {selectedUpdate.urgency === "urgent" ? "紧急更新" : "常规更新"}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-[#2F5FD0]">{selectedUpdate.category}</span>
                    <span className="text-xs text-gray-400">{selectedUpdate.version}</span>
                  </div>
                  <h2 className="text-base font-medium text-gray-900">{selectedUpdate.title}</h2>
                  <p className="text-xs text-gray-500 mt-1">{selectedUpdate.summary}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => navigate(`/workbench/info-sync/update/${selectedUpdate.id}`)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    查看独立页
                  </button>
                  <button
                    onClick={() => navigate("/workbench/info-sync/records")}
                    className="px-3 py-1.5 rounded-lg border border-[#D9E5FF] text-xs text-[#2F5FD0] hover:bg-[#F7FAFF] transition-colors"
                  >
                    更新记录页
                  </button>
                  <button
                    onClick={() => setShowPushModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#2F5FD0] hover:bg-[#2550B8] text-white text-xs transition-colors"
                  >
                    推进同步
                  </button>
                </div>
              </div>

              <div className="flex gap-1 bg-[#F5F7FA] rounded-xl p-1 mt-4 overflow-x-auto hide-scrollbar">
                {[
                  { key: "summary", label: "更新详情" },
                  { key: "impact", label: "影响范围" },
                  { key: "sync", label: "下游同步" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setDetailTab(tab.key as SyncDetailTab)}
                    className={`flex-1 min-w-[96px] py-2 rounded-lg text-xs transition-colors ${
                      detailTab === tab.key ? "bg-[#2F5FD0] text-white" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {detailTab === "summary" && (
              <>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "影响角色", value: `${selectedUpdate.affectedRoles.length} 类`, tone: "text-[#2F5FD0]" },
                    { label: "未确认人员", value: `${selectedUpdate.pendingCount} 人`, tone: "text-[#F59E0B]" },
                    { label: "旧内容使用", value: `${selectedUpdate.oldContentUsers} 人次`, tone: "text-[#DC2626]" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white rounded-xl shadow-sm px-4 py-3">
                      <div className={`text-lg font-bold ${item.tone}`}>{item.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
                    </div>
                  ))}
                </div>
                {showSummaryChangesPanel && (
                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText size={15} className="text-[#2F5FD0]" />
                      <span className="text-sm font-medium text-gray-900">本次变更详情</span>
                    </div>
                    <div className="space-y-2">
                      {selectedUpdate.changes.map((change) => (
                        <div key={change} className="rounded-xl border border-gray-200 bg-[#FAFBFC] px-3 py-3 text-xs text-gray-600 leading-relaxed">
                          {change}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </>
            )}

            {detailTab === "impact" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">影响角色 & 待确认人员</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selectedUpdate.affectedRoles.map((role) => (
                      <span key={role} className="text-xs px-2 py-1 rounded-full bg-[#F5F7FA] border border-gray-200 text-gray-600">
                        {role}
                      </span>
                    ))}
                  </div>
                  {selectedUpdate.pendingUsers.length > 0 ? (
                    <div className="space-y-2">
                      {selectedUpdate.pendingUsers.map((name) => (
                        <div key={name} className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2.5 text-xs text-amber-700">
                          {name} 尚未确认新版内容
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-green-100 bg-green-50 px-3 py-3 text-xs text-[#15803D]">
                      当前影响人员已全部确认。
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={15} className="text-[#F59E0B]" />
                    <span className="text-sm font-medium text-gray-900">影响范围拆解</span>
                  </div>
                  <div className="space-y-2">
                    {selectedUpdate.impactScopes.map((item) => (
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
              </div>
            )}

            {detailTab === "sync" && (
              <>
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={15} className="text-[#2F5FD0]" />
                    <span className="text-sm font-medium text-gray-900">下游同步链路</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedUpdate.syncLinks.map((link) => (
                      <div key={link.label} className={`rounded-xl border px-3 py-3 ${nodeTone(link.status)}`}>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-medium">{link.label}</span>
                          <span className="text-[11px]">{link.owner}</span>
                        </div>
                        <p className="text-xs mt-2 leading-relaxed">{link.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={15} className="text-[#16A34A]" />
                    <span className="text-sm font-medium text-gray-900">同步纪律</span>
                  </div>
                  <div className="space-y-2 text-xs text-gray-600">
                    {[
                      "先确认人员是否知道变更，再看培训内容是否真正更新。",
                      "课件更新后，题库和陪练场景必须一起改，不然考核与训练仍会沿用旧口径。",
                      "同步完成后再触发重学与复测，避免重复推送和重复通知。",
                    ].map((item) => (
                      <div key={item} className="rounded-xl border border-gray-200 bg-[#F8FAFC] px-3 py-3 leading-relaxed">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowPushModal(true)}
                className="flex-1 min-w-[180px] flex items-center justify-center gap-1.5 py-2 bg-[#2F5FD0] hover:bg-[#2550B8] text-white rounded-xl text-sm transition-colors"
              >
                <Send size={14} /> 推进同步
              </button>
              <button
                onClick={() => navigate(`/workbench/info-sync/update/${selectedUpdate.id}`)}
                className="flex-1 min-w-[180px] py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors"
              >
                查看更新详情独立页
              </button>
              <button
                onClick={() => navigate("/workbench/content-ops")}
                className="flex-1 min-w-[180px] py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors"
              >
                去培训运营处理题库 / 陪练
              </button>
              <button
                onClick={() => navigate("/workbench/blueprint")}
                className="flex-1 min-w-[180px] py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors"
              >
                查看产品蓝图关系图
              </button>
            </div>

            {showSyncReminderPanel && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Target size={14} className="text-[#2F5FD0]" />
                  <span className="text-sm font-medium text-gray-900">同步链路提醒</span>
                </div>
                <div className="rounded-xl bg-amber-50 border border-amber-100 px-3 py-3 text-xs text-amber-700 leading-relaxed">
                  当前还有 {pendingSyncCount} 个下游同步节点未完成，其中 {pendingPracticeCount} 个与 AI 陪练场景有关。
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {showPushModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-medium text-gray-900">推进同步</h3>
                <button onClick={() => setShowPushModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>

              <div className="bg-[#F5F7FA] rounded-lg p-3 mb-4 text-xs text-gray-600 leading-relaxed">
                将针对 <strong className="text-gray-900">《{selectedUpdate.title}》</strong> 继续推进未确认人员提醒，以及题库 / AI 陪练场景等下游节点的同步动作。
              </div>

              <div className="space-y-2 mb-4">
                {[
                  { label: "系统消息 + App 推送提醒未确认人员", checked: true },
                  { label: "同步创建题库更新待办", checked: true },
                  { label: "同步创建 AI 陪练场景更新待办", checked: true },
                  { label: "同步完成后自动触发重学 / 复测", checked: false },
                ].map((opt) => (
                  <label key={opt.label} className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                    <input type="checkbox" defaultChecked={opt.checked} className="accent-[#2F5FD0]" />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowPushModal(false)}
                  className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => setShowPushModal(false)}
                  className="flex-1 py-2 bg-[#2F5FD0] hover:bg-[#2550B8] text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={14} /> 确认推进
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
