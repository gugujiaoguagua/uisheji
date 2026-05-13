import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  BookOpen,
  Briefcase,
  Eye,
  EyeOff,
  ChevronRight,
  Shield,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck,
  MapPinned,
  Palette,
  TrendingUp,
} from "lucide-react";
import {
  useApp,
  Identity,
  LearnerRole,
  StaffApprovalStatus,
  getIdentityLabel,
  getLearnerRoleMeta,
  getStaffApprovalStatusMeta,
  learnerRoleProfiles,
} from "../context/AppContext";

const previewBase = {
  name: "张晓琳",
  avatar: "张",
  department: "华南区销售部",
  level: 3,
  points: 2840,
};

const flowSteps = ["学员达成条件", "提交申请", "审批流转", "开通后可切换工作人员视角"];

const loginTextVisibility = {
  brandSubtitle: false,
  accountStatusDescription: false,
  identitySelectionHint: false,
  staffOptionDescription: false,
  learnerRoleHint: false,
  learnerRoleCountBadge: false,
  learnerRoleDescription: false,
  identityFlowSection: false,
} as const;


const learnerRoleIcons: Record<LearnerRole, typeof BookOpen> = {
  sales: BookOpen,
  community_ops: MapPinned,
  ops_manager: TrendingUp,
  designer: Palette,
};

const learnerRoleKeys: LearnerRole[] = ["sales", "community_ops", "designer"];


const approvalStatusOptions: { key: StaffApprovalStatus; label: string }[] = [
  { key: "not_applied", label: "需审批开通" },
  { key: "pending", label: "审批中" },
  { key: "rejected", label: "审批未通过" },
  { key: "approved", label: "已审批开通" },
];

function getApprovalBadgeClass(status: StaffApprovalStatus) {
  if (status === "approved") return "bg-green-100 text-[#15803D]";
  if (status === "pending") return "bg-amber-100 text-[#B45309]";
  if (status === "rejected") return "bg-red-100 text-[#DC2626]";
  return "bg-gray-100 text-gray-500";
}

function getPreviewAccount(status: StaffApprovalStatus) {
  switch (status) {
    case "approved":
      return {
        ...previewBase,
        role: "区域带教销售顾问 · 华南区销售部",
        primaryIdentity: "staff" as Identity,
        availableIdentities: ["student", "staff"] as Identity[],
        staffApprovalStatus: status,
        updatedAt: "2026-04-12 18:20",
        permissions: [
          "学习中心",
          "AI 问答",
          "AI 陪练",
          "考核与成长",
          "信息同步",
          "培训运营",
          "销设协同",
          "审单回流",
          "带教看板",
        ],
        applicationRecords: [
          {
            id: "app-approved",
            type: "staff-transfer" as const,
            title: "转工作人员申请",
            status,
            submittedAt: "2026-04-08 09:30",
            updatedAt: "2026-04-12 18:20",
            reviewer: "培训负责人-周老师",
            summary: "审批通过后主身份已变更为工作人员，原学习档案、考核记录与成长数据全部保留。",
          },
          {
            id: "app-approved-history",
            type: "staff-transfer" as const,
            title: "转工作人员申请（补件前）",
            status: "rejected",
            submittedAt: "2026-03-18 14:10",
            updatedAt: "2026-03-20 11:40",
            reviewer: "培训负责人-周老师",
            summary: "专项测试成绩和带教跟岗记录不足，需补齐相关材料后重新发起申请。",
          },
        ],
      };
    case "pending":
      return {
        ...previewBase,
        role: "门店销售顾问 · 华南区销售部",
        primaryIdentity: "student" as Identity,
        availableIdentities: ["student"] as Identity[],
        staffApprovalStatus: status,
        updatedAt: "2026-04-20 09:15",
        permissions: ["学习中心", "AI 问答", "AI 陪练", "考核与成长"],
        applicationRecords: [
          {
            id: "app-pending",
            type: "staff-transfer" as const,
            title: "转工作人员申请",
            status,
            submittedAt: "2026-04-20 09:15",
            updatedAt: "2026-04-20 09:15",
            reviewer: "待主管审批",
            summary: "申请已提交，审批完成前仍以学员身份为主，工作人员视角暂不可用。",
          },
        ],
      };
    case "rejected":
      return {
        ...previewBase,
        role: "门店销售顾问 · 华南区销售部",
        primaryIdentity: "student" as Identity,
        availableIdentities: ["student"] as Identity[],
        staffApprovalStatus: status,
        updatedAt: "2026-04-18 16:40",
        permissions: ["学习中心", "AI 问答", "AI 陪练", "考核与成长"],
        applicationRecords: [
          {
            id: "app-rejected",
            type: "staff-transfer" as const,
            title: "转工作人员申请",
            status,
            submittedAt: "2026-04-16 11:20",
            updatedAt: "2026-04-18 16:40",
            reviewer: "培训负责人-周老师",
            summary: "当前申请未通过，建议先补齐专项考核和带教评价后重新发起。",
          },
          {
            id: "app-rejected-history",
            type: "staff-transfer" as const,
            title: "转工作人员申请（更早一次）",
            status: "pending",
            submittedAt: "2026-03-26 09:50",
            updatedAt: "2026-03-27 18:00",
            reviewer: "审批流转中止",
            summary: "更早一次申请因资料未补齐自动退回，当前页面保留该次流转痕迹供追溯。",
          },
        ],
      };
    default:
      return {
        ...previewBase,
        role: "门店销售顾问 · 华南区销售部",
        primaryIdentity: "student" as Identity,
        availableIdentities: ["student"] as Identity[],
        staffApprovalStatus: status,
        updatedAt: "尚未发起申请",
        permissions: ["学习中心", "AI 问答", "AI 陪练", "考核与成长"],
        applicationRecords: [],
      };
  }
}

export default function Login() {
  const [step, setStep] = useState<"login" | "identity">("login");
  const [phone, setPhone] = useState("13800138000");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedIdentity, setSelectedIdentity] = useState<Identity | null>(null);
  const [selectedLearnerRole, setSelectedLearnerRole] = useState<LearnerRole>("sales");
  const [previewStatus, setPreviewStatus] = useState<StaffApprovalStatus>("not_applied");
  const { login } = useApp();
  const navigate = useNavigate();

  const previewAccount = useMemo(() => getPreviewAccount(previewStatus), [previewStatus]);
  const approvalMeta = useMemo(() => getStaffApprovalStatusMeta(previewAccount.staffApprovalStatus), [previewAccount.staffApprovalStatus]);

  useEffect(() => {
    setSelectedIdentity((prev) => {
      if (prev && previewAccount.availableIdentities.includes(prev)) return prev;
      return previewAccount.availableIdentities[0] ?? null;
    });
  }, [previewAccount.availableIdentities]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedIdentity(previewAccount.availableIdentities[0] ?? previewAccount.primaryIdentity);
    setStep("identity");
  };

  const handleIdentityConfirm = () => {
    if (!selectedIdentity) return;
    const learnerRoleMeta = getLearnerRoleMeta(selectedLearnerRole);
    login(selectedIdentity, {
      name: previewAccount.name,
      avatar: previewAccount.avatar,
      role: selectedIdentity === "student" ? learnerRoleMeta.roleTitle : previewAccount.role,
      department: previewAccount.department,
      learnerRole: selectedLearnerRole,
      primaryIdentity: previewAccount.primaryIdentity,
      availableIdentities: previewAccount.availableIdentities,
      staffApprovalStatus: previewAccount.staffApprovalStatus,
      staffApprovalUpdatedAt: previewAccount.updatedAt,
      applicationRecords: previewAccount.applicationRecords,
      permissions: previewAccount.permissions,
      level: previewAccount.level,
      points: previewAccount.points,
    });
    navigate("/");
  };

  const identityOptions = [
    {
      key: "student" as Identity,
      icon: BookOpen,
      title: "学员",
      desc: "首页优先展示今日学习任务、陪练考核、成长提醒",
      tags: ["学习中心", "AI 问答", "AI 陪练", "考核", "成长总览"],
      available: true,
      badge: selectedIdentity === "student" ? "当前选择" : previewAccount.primaryIdentity === "student" ? "主身份" : "保留学习能力",
      activeClass: "border-[#2F5FD0] bg-[#EEF2FF]",
      iconClass: "bg-[#2F5FD0] text-white",
      defaultIconClass: "bg-gray-100 text-gray-500",
      badgeClass: previewAccount.primaryIdentity === "student" ? "bg-[#2F5FD0] text-white" : "bg-blue-100 text-[#2F5FD0]",
    },
    {
      key: "staff" as Identity,
      icon: Briefcase,
      title: "工作人员",
      desc: "首页优先展示今日待办、待处理任务、风险提醒、快捷入口",
      tags: ["信息同步", "培训运营", "销设协同", "审单回流", "带教看板"],
      available: previewAccount.availableIdentities.includes("staff"),
      badge: previewAccount.availableIdentities.includes("staff")
        ? previewAccount.primaryIdentity === "staff"
          ? `主身份 · ${approvalMeta.shortLabel}`
          : approvalMeta.label
        : approvalMeta.label,
      activeClass: "border-[#1E2A3A] bg-[#F0F2F4]",
      iconClass: "bg-[#1E2A3A] text-white",
      defaultIconClass: "bg-gray-100 text-gray-500",
      badgeClass: getApprovalBadgeClass(previewAccount.staffApprovalStatus),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      <div className="hidden md:flex flex-col justify-between w-[480px] bg-[#1E2A3A] p-10">
        <div>
          <div className="flex items-center gap-[18px] mb-[72px]">
            <img
              src="/app-icon.png"
              alt="智柚 APP 图标"
              className="w-[66px] h-[66px] rounded-3xl object-cover border border-white/10 shadow-sm"
            />
            <div>
              <div className="text-white text-[27px] font-semibold leading-tight">智柚</div>
              {loginTextVisibility.brandSubtitle && <div className="text-white/50 text-lg mt-1">统一业务训练与协同系统</div>}
            </div>

          </div>

          <h1 className="text-white text-3xl font-semibold mb-4 leading-tight">培训信息架构可视化平台</h1>
          <p className="text-white/60 text-sm leading-relaxed">
            智柚统一承接学习、现场答疑、协同审单、信息同步与问题回流。
          </p>
        </div>

        <div className="space-y-3">
          {[
            { icon: "📡", text: "新品/参数/工艺变化实时同步" },
            { icon: "🤖", text: "AI 问答先给能直接说的话，再给来源依据" },
            { icon: "🎯", text: "AI 陪练按训练闭环组织，而不是普通聊天" },
            { icon: "🧭", text: "工作人员审批通过后，仍保留学习档案与成长记录" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-white/80 text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="md:hidden flex items-center gap-3 mb-8">
            <img
              src="/app-icon.png"
              alt="智柚 APP 图标"
              className="w-10 h-10 rounded-2xl object-cover shadow-sm"
            />
            <div>
              <div className="text-gray-900 font-semibold">智柚</div>
              {loginTextVisibility.brandSubtitle && <div className="text-gray-400 text-xs">统一业务训练与协同系统</div>}
            </div>

          </div>

          {step === "login" ? (
            <div>
              <h2 className="text-gray-900 text-2xl font-semibold mb-1">欢迎回来</h2>
              <p className="text-gray-500 text-sm mb-5">请使用企业账号登录智柚统一入口</p>

              <div className="mb-5 rounded-xl border border-gray-200 bg-white p-3">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck size={14} className="text-[#2F5FD0]" />
                  <span className="text-xs font-medium text-gray-900">账号审批状态预览</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {approvalStatusOptions.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setPreviewStatus(item.key)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        previewStatus === item.key ? "bg-[#2F5FD0] text-white" : "bg-[#F5F7FA] text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  用于演示同一统一入口下，不同审批状态对身份选择和可用能力的影响。
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">手机号 / 工号</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-[#2F5FD0] focus:ring-1 focus:ring-[#2F5FD0] transition-colors"
                    placeholder="请输入手机号或工号"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">密码</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-[#2F5FD0] focus:ring-1 focus:ring-[#2F5FD0] transition-colors pr-10"
                      placeholder="请输入密码"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-500">
                    <input type="checkbox" className="rounded" defaultChecked />
                    记住登录
                  </label>
                  <button type="button" className="text-sm text-[#2F5FD0] hover:text-[#2550B8]">
                    忘记密码？
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2F5FD0] hover:bg-[#2550B8] text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  登录
                  <ChevronRight size={16} />
                </button>
              </form>

              <div className="mt-4 rounded-xl border border-[#2F5FD0]/15 bg-[#EEF2FF] p-3">
                <div className="flex items-center gap-2 text-[#2F5FD0] mb-1">
                  <Shield size={14} />
                  <span className="text-xs font-medium">统一入口说明</span>
                </div>
                <p className="text-xs text-[#3651A3] leading-relaxed">
                  登录后先选择本次使用视角；学员模块与工作人员模块不会被拆成两个系统，只是展示优先级和权限深度不同。
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
                <Shield size={12} />
                <span>数据加密传输 · 企业级安全认证</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#2F5FD0] flex items-center justify-center text-white font-medium">
                  {previewAccount.avatar}
                </div>
                <div>
                  <div className="text-gray-900 font-medium text-sm">{previewAccount.name}</div>
                  <div className="text-gray-500 text-xs">{previewAccount.role}</div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-3 mb-5">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-xs text-gray-500">当前账号状态</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-sm font-medium text-gray-900">
                        主身份：{getIdentityLabel(previewAccount.primaryIdentity)}
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${getApprovalBadgeClass(previewAccount.staffApprovalStatus)}`}>
                        {approvalMeta.label}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">最近状态时间</p>
                    <p className="text-xs text-gray-600 mt-1">{previewAccount.updatedAt}</p>
                  </div>
                </div>
                {loginTextVisibility.accountStatusDescription && (
                  <p className="text-xs text-gray-500 leading-relaxed mt-2">{approvalMeta.description}</p>
                )}

                {!previewAccount.availableIdentities.includes("staff") && (
                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 flex items-start gap-2">
                    <AlertTriangle size={14} className="text-amber-700 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 leading-relaxed">
                      当前账号还不能直接进入工作人员视角，需审批开通后才能处理重工作流；现在仍可先用学员能力完成学习与训练。
                    </p>
                  </div>
                )}
              </div>

              <h2 className="text-gray-900 text-xl font-semibold mb-1">选择本次使用身份</h2>
              {loginTextVisibility.identitySelectionHint && (
                <p className="text-gray-500 text-sm mb-6">
                  {previewAccount.availableIdentities.includes("staff")
                    ? `当前账号已开通工作人员权限，本次可按任务需要选择 ${getIdentityLabel(previewAccount.primaryIdentity)} 或学员视角进入。`
                    : "当前账号以学员身份为主，工作人员视角会显示为需审批开通。"}
                </p>
              )}


              <div className="space-y-3">
                {identityOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedIdentity === option.key;
                  return (
                    <button
                      key={option.key}
                      onClick={() => option.available && setSelectedIdentity(option.key)}
                      disabled={!option.available}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        option.available
                          ? isSelected
                            ? option.activeClass
                            : "border-gray-200 bg-white hover:border-gray-300"
                          : "border-dashed border-gray-200 bg-gray-50 cursor-not-allowed opacity-80"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isSelected && option.available ? option.iconClass : option.defaultIconClass
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="font-medium text-gray-900 text-sm">{option.title}</div>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${option.badgeClass}`}>{option.badge}</span>
                          </div>
                          {(option.key !== "staff" || loginTextVisibility.staffOptionDescription) && (
                            <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                          )}

                          <div className="flex flex-wrap gap-1 mt-2">
                            {option.tags.map((tag) => (
                              <span key={tag} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          {!option.available && option.key === "staff" && (
                            <p className="text-xs text-amber-700 mt-2">需审批通过后才会开放这一视角入口。</p>
                          )}
                        </div>
                        {isSelected && option.available && (
                          <div className="ml-auto flex-shrink-0 text-[#2F5FD0]">
                            <CheckCircle2 size={18} />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedIdentity === "student" && (
                <div className="mt-4 rounded-xl border border-[#D9E5FF] bg-[#F7FAFF] p-3">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">选择学员学习身份</h3>
                      {loginTextVisibility.learnerRoleHint && (
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          首页和学习中心只显示所选身份的内容，其他身份课程不会删除，可在学习页搜索查看。
                        </p>
                      )}
                    </div>
                    {loginTextVisibility.learnerRoleCountBadge && (
                      <span className="text-xs px-2 py-1 rounded-full bg-[#2F5FD0] text-white">四选一</span>
                    )}

                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {learnerRoleKeys.map((roleKey) => {
                      const role = learnerRoleProfiles[roleKey];
                      const Icon = learnerRoleIcons[roleKey];
                      const active = selectedLearnerRole === roleKey;
                      return (
                        <button
                          key={roleKey}
                          type="button"
                          onClick={() => setSelectedLearnerRole(roleKey)}
                          className={`rounded-xl border p-3 text-left transition-all ${
                            active ? "border-[#2F5FD0] bg-white shadow-sm" : "border-gray-200 bg-white/70 hover:border-[#2F5FD0]/40"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-[#2F5FD0] text-white" : "bg-gray-100 text-gray-500"}`}>
                              <Icon size={16} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900">{role.label}</p>
                              <p className="text-xs text-gray-400">{role.shortLabel}</p>
                            </div>
                          </div>
                          {loginTextVisibility.learnerRoleDescription && (
                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{role.desc}</p>
                          )}

                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {loginTextVisibility.identityFlowSection && (
                <div className="mt-4 rounded-xl bg-[#F8FAFC] border border-gray-200 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={14} className="text-[#2F5FD0]" />
                    <span className="text-xs font-medium text-gray-900">身份流转说明</span>
                  </div>
                  <div className="space-y-2">
                    {flowSteps.map((stepLabel, index) => {
                      const activeIndex = previewStatus === "approved" ? 3 : previewStatus === "pending" ? 2 : previewStatus === "rejected" ? 2 : 1;
                      return (
                        <div key={stepLabel} className="flex items-center gap-2 text-xs text-gray-600">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              index <= activeIndex ? "bg-[#2F5FD0] text-white" : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span>{stepLabel}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}


              <button
                onClick={handleIdentityConfirm}
                disabled={!selectedIdentity}
                className={`w-full mt-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedIdentity ? "bg-[#2F5FD0] hover:bg-[#2550B8] text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {selectedIdentity
                  ? selectedIdentity === "student"
                    ? `确认，进入${getLearnerRoleMeta(selectedLearnerRole).label}学习视角`
                    : `确认，进入${getIdentityLabel(selectedIdentity)}视角`
                  : "请选择本次使用身份"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
