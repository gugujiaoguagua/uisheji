import React, { createContext, useContext, useState, ReactNode } from "react";

export type Identity = "student" | "staff";
export type LearnerRole = "sales" | "community_ops" | "ops_manager" | "designer";
export type StaffRole = "training_teacher" | "ops" | "designer" | "sales" | "order_reviewer";
export type StaffApprovalStatus = "not_applied" | "pending" | "approved" | "rejected";

export interface ApplicationRecord {
  id: string;
  type: "staff-transfer";
  title: string;
  status: StaffApprovalStatus;
  submittedAt: string;
  updatedAt: string;
  reviewer: string;
  summary: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  learnerRole: LearnerRole;
  staffRole: StaffRole;
  identity: Identity;
  primaryIdentity: Identity;
  availableIdentities: Identity[];
  staffApprovalStatus: StaffApprovalStatus;
  staffApprovalUpdatedAt: string;
  level: number;
  points: number;
  permissions: string[];
  applicationRecords: ApplicationRecord[];
}

interface AppContextType {
  user: User | null;
  isLoggedIn: boolean;
  currentIdentity: Identity;
  login: (identity: Identity, userOverrides?: Partial<User>) => void;
  logout: () => void;
  switchIdentity: (identity: Identity) => void;
  switchLearnerRole: (learnerRole: LearnerRole) => void;
  switchStaffRole: (staffRole: StaffRole) => void;
  unreadMessages: number;
  pendingTasks: number;
}

const defaultUser: User = {
  id: "u001",
  name: "张晓琳",
  avatar: "张",
  role: "培训老师",
  department: "直营赋能组",
  learnerRole: "sales",
  staffRole: "training_teacher",
  identity: "student",
  primaryIdentity: "staff",
  availableIdentities: ["student", "staff"],
  staffApprovalStatus: "approved",
  staffApprovalUpdatedAt: "2026-04-12 18:20",
  level: 3,
  points: 2840,
  permissions: [
    "学习中心",
    "AI 问答",
    "AI 陪练",
    "考核与成长",
    "信息同步",
    "场景演练",
    "补训闭环",
    "案例库",
    "学员画像",
  ],
  applicationRecords: [
    {
      id: "app-20260412",
      type: "staff-transfer",
      title: "转工作人员申请",
      status: "approved",
      submittedAt: "2026-04-08 09:30",
      updatedAt: "2026-04-12 18:20",
      reviewer: "培训负责人-周老师",
      summary: "审批通过后主身份已变更为工作人员，原学习档案、考核记录与成长数据全部保留。",
    },
    {
      id: "app-20260320",
      type: "staff-transfer",
      title: "转工作人员申请（补件前）",
      status: "rejected",
      submittedAt: "2026-03-18 14:10",
      updatedAt: "2026-03-20 11:40",
      reviewer: "培训负责人-周老师",
      summary: "专项测试成绩和带教跟岗记录不足，需补齐相关材料后重新发起申请。",
    },
  ],
};

const AppContext = createContext<AppContextType>({
  user: null,
  isLoggedIn: false,
  currentIdentity: "student",
  login: () => {},
  logout: () => {},
  switchIdentity: () => {},
  switchLearnerRole: () => {},
  switchStaffRole: () => {},
  unreadMessages: 0,
  pendingTasks: 0,
});

export const learnerRoleProfiles: Record<LearnerRole, {
  label: string;
  shortLabel: string;
  roleTitle: string;
  desc: string;
  tags: string[];
}> = {
  sales: {
    label: "销售顾问",
    shortLabel: "销售",
    roleTitle: "门店销售顾问",
    desc: "优先学习新品参数、客户异议、价值话术和成交考核。",
    tags: ["新品学习", "销售话术", "AI 陪练", "成交考核"],
  },
  community_ops: {
    label: "社区运营",
    shortLabel: "运营新人",
    roleTitle: "社区运营新人",
    desc: "优先学习岗位边界、资源开拓、社群 SOP 和过程指标。",
    tags: ["岗位认知", "资源开拓", "社群 SOP", "指标判断"],
  },
  ops_manager: {
    label: "运营管理者",
    shortLabel: "运营管理",
    roleTitle: "运营管理者",
    desc: "优先学习指标看盘、风险识别、任务派发和转化复盘。",
    tags: ["指标看盘", "风险识别", "任务派发", "复盘管理"],
  },
  designer: {
    label: "设计师",
    shortLabel: "设计",
    roleTitle: "设计师新人",
    desc: "优先学习设计规范、量尺出图、报价一致性和会审讲解。",
    tags: ["设计规范", "量尺出图", "会审讲解", "审单自检"],
  },
};

export function getLearnerRoleMeta(learnerRole?: LearnerRole) {
  return learnerRoleProfiles[learnerRole || "sales"];
}

export const staffRoleProfiles: Record<StaffRole, {
  label: string;
  shortLabel: string;
  roleTitle: string;
  desc: string;
  tags: string[];
}> = {
  training_teacher: {
    label: "培训老师",
    shortLabel: "培训",
    roleTitle: "培训老师",
    desc: "优先处理新人分层、场景演练、评分反馈、补训闭环和案例沉淀。",
    tags: ["新人培养", "场景演练", "评分反馈", "补训闭环"],
  },
  ops: {
    label: "运营",
    shortLabel: "运营",
    roleTitle: "运营负责人",
    desc: "后续接入资源开拓、社群运营、转化复盘和任务闭环。",
    tags: ["资源开拓", "社群运营", "转化复盘", "数据治理"],
  },
  designer: {
    label: "设计师",
    shortLabel: "设计",
    roleTitle: "设计师",
    desc: "后续接入方案讲解、图纸准备、会审反馈和设计协同。",
    tags: ["方案讲解", "图纸准备", "会审反馈", "设计协同"],
  },
  sales: {
    label: "销售",
    shortLabel: "销售",
    roleTitle: "销售顾问",
    desc: "后续接入客户跟进、报价推进、成交复盘和话术训练。",
    tags: ["客户跟进", "报价推进", "成交复盘", "话术训练"],
  },
  order_reviewer: {
    label: "审单",
    shortLabel: "审单",
    roleTitle: "审单专员",
    desc: "后续接入订单校验、异常标注、回流复盘和规则同步。",
    tags: ["订单校验", "异常标注", "规则同步", "回流复盘"],
  },
};

export function getStaffRoleMeta(staffRole?: StaffRole) {
  return staffRoleProfiles[staffRole || "training_teacher"];
}

export function getIdentityLabel(identity: Identity) {
  return identity === "staff" ? "工作人员" : "学员";
}

export function getStaffApprovalStatusMeta(status: StaffApprovalStatus) {
  switch (status) {
    case "approved":
      return {
        label: "已审批开通",
        shortLabel: "审批通过",
        description: "当前账号已开通工作人员权限，可切换工作人员视角，学习能力继续保留。",
      };
    case "pending":
      return {
        label: "审批中",
        shortLabel: "审批中",
        description: "已发起转工作人员申请，审批完成前仍以学员身份为主。",
      };
    case "rejected":
      return {
        label: "审批未通过",
        shortLabel: "未通过",
        description: "最近一次申请未通过，可根据反馈补齐条件后重新发起申请。",
      };
    default:
      return {
        label: "需审批开通",
        shortLabel: "未开通",
        description: "当前账号尚未开通工作人员权限，可先使用学员能力并在“我的”中发起申请。",
      };
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const currentIdentity: Identity = user?.identity ?? "student";

  const login = (identity: Identity, userOverrides: Partial<User> = {}) => {
    const mergedUser: User = {
      ...defaultUser,
      ...userOverrides,
      availableIdentities: userOverrides.availableIdentities ?? defaultUser.availableIdentities,
      learnerRole: userOverrides.learnerRole ?? defaultUser.learnerRole,
      staffRole: userOverrides.staffRole ?? defaultUser.staffRole,
      permissions: userOverrides.permissions ?? defaultUser.permissions,
      applicationRecords: userOverrides.applicationRecords ?? defaultUser.applicationRecords,
    };
    const nextPrimaryIdentity = mergedUser.availableIdentities.includes(mergedUser.primaryIdentity)
      ? mergedUser.primaryIdentity
      : mergedUser.availableIdentities[0] || "student";
    const nextIdentity = mergedUser.availableIdentities.includes(identity) ? identity : nextPrimaryIdentity;

    setUser({
      ...mergedUser,
      primaryIdentity: nextPrimaryIdentity,
      identity: nextIdentity,
    });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const switchIdentity = (identity: Identity) => {
    setUser((prev) => {
      if (!prev?.availableIdentities.includes(identity)) return prev;
      return { ...prev, identity };
    });
  };

  const switchLearnerRole = (learnerRole: LearnerRole) => {
    setUser((prev) => (prev ? { ...prev, learnerRole, role: getLearnerRoleMeta(learnerRole).roleTitle } : prev));
  };

  const switchStaffRole = (staffRole: StaffRole) => {
    setUser((prev) => (prev ? { ...prev, staffRole, role: getStaffRoleMeta(staffRole).roleTitle } : prev));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        currentIdentity,
        login,
        logout,
        switchIdentity,
        switchLearnerRole,
        switchStaffRole,
        unreadMessages: user?.identity === "staff" ? (user.staffRole === "training_teacher" ? 3 : user.staffRole === "ops" ? 4 : user.staffRole === "designer" ? 3 : 5) : 5,
        pendingTasks: 4,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
