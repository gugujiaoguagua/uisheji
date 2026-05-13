import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router";
import {
  Home,
  BookOpen,
  Briefcase,
  MessageSquare,
  User,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Brain,
  Dumbbell,
  ClipboardList,
  TrendingUp,
  RefreshCw,
  Layers,
  FileCheck,
  BarChart3,
  ArrowLeftRight,
  GitBranch,
  LogOut,
  X,
  Shield,
} from "lucide-react";
import {
  useApp,
  getIdentityLabel,
  getLearnerRoleMeta,
  getStaffApprovalStatusMeta,
} from "../context/AppContext";
import { appActionClass, appShellClass, appSurfaceClass, getApprovalStatusToneClass } from "../lib/visualTokens";

interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  children?: { key: string; label: string; path: string; icon: React.ReactNode }[];
}

const navItems: NavItem[] = [
  {
    key: "home",
    label: "首页",
    icon: <Home size={20} />,
    path: "/",
  },
  {
    key: "learning",
    label: "学习",
    icon: <BookOpen size={20} />,
    path: "/learning",
    children: [
      { key: "learning-center", label: "学习中心", path: "/learning", icon: <LayoutDashboard size={16} /> },
      { key: "ai-qna", label: "AI 问答", path: "/learning/ai-qna", icon: <Brain size={16} /> },
      { key: "ai-practice", label: "AI 陪练", path: "/learning/ai-practice", icon: <Dumbbell size={16} /> },
      { key: "assessment", label: "考核", path: "/learning/assessment", icon: <ClipboardList size={16} /> },
      { key: "growth", label: "成长与补训", path: "/learning/growth", icon: <TrendingUp size={16} /> },
    ],
  },
  {
    key: "workbench",
    label: "工作台",
    icon: <Briefcase size={20} />,
    path: "/workbench",
    children: [
      { key: "workbench-home", label: "今日待办", path: "/workbench", icon: <ClipboardList size={16} /> },
      { key: "info-sync", label: "信息同步中心", path: "/workbench/info-sync", icon: <RefreshCw size={16} /> },
      { key: "content-ops", label: "社区运营", path: "/workbench/content-ops", icon: <Layers size={16} /> },
      { key: "collab", label: "销售-设计协同", path: "/workbench/collab", icon: <ArrowLeftRight size={16} /> },
      { key: "order-review", label: "审单·回流", path: "/workbench/order-review", icon: <FileCheck size={16} /> },
      { key: "blueprint", label: "产品蓝图", path: "/workbench/blueprint", icon: <GitBranch size={16} /> },
      { key: "approvals", label: "审批·申请", path: "/workbench/approvals", icon: <Shield size={16} /> },
      { key: "dashboard", label: "异常看板", path: "/workbench/dashboard", icon: <BarChart3 size={16} /> },
    ],
  },
  {
    key: "messages",
    label: "消息",
    icon: <MessageSquare size={20} />,
    path: "/messages",
  },
  {
    key: "profile",
    label: "我的",
    icon: <User size={20} />,
    path: "/profile",
  },
];

function getActiveNav(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/learning")) return "learning";
  if (pathname.startsWith("/workbench")) return "workbench";
  if (pathname.startsWith("/messages")) return "messages";
  if (pathname.startsWith("/profile")) return "profile";
  return "";
}

export function Layout() {
  const { user, currentIdentity, switchIdentity, logout, unreadMessages, pendingTasks, isLoggedIn } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedNav, setExpandedNav] = useState<string | null>(null);
  const [showIdentityMenu, setShowIdentityMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const activeNav = getActiveNav(location.pathname);

  const handleNavClick = (item: NavItem) => {
    if (item.children) {
      setExpandedNav(expandedNav === item.key ? null : item.key);
      navigate(item.path);
    } else {
      setExpandedNav(null);
      navigate(item.path);
    }
  };

  const isStaff = currentIdentity === "staff";
  const learnerRoleMeta = getLearnerRoleMeta(user?.learnerRole);
  const approvalMeta = user ? getStaffApprovalStatusMeta(user.staffApprovalStatus) : null;
  const identityChoices = user?.availableIdentities ?? [];

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      <aside className="hidden md:flex flex-col w-56 bg-[#1E2A3A] text-white flex-shrink-0">
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <img
            src="/app-icon.png"
            alt="智柚 APP 图标"
            className="w-12 h-12 rounded-2xl object-cover border border-white/10"
          />
          <div>
            <div className="text-xl font-bold text-white tracking-wide">智柚</div>
          </div>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeNav === item.key;
            const isExpanded = expandedNav === item.key || (isActive && item.children);

            return (
              <div key={item.key}>
                <button
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
                    isActive
                      ? "bg-[#2F5FD0] text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-white/60"}>{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.key === "messages" && unreadMessages > 0 && (
                    <span className="bg-state-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadMessages}
                    </span>
                  )}
                  {item.key === "workbench" && isStaff && pendingTasks > 0 && (
                    <span className="bg-[#F59E0B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {pendingTasks}
                    </span>
                  )}
                  {item.children && (
                    <span className="text-white/40">
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                  )}
                </button>
                {item.children && isExpanded && (
                  <div className={appShellClass.desktopNavSub}>
                    {item.children.map((child) => (
                      <NavLink
                        key={child.key}
                        to={child.path}
                        end={child.path === "/learning" || child.path === "/workbench"}
                        className={({ isActive: isChildActive }) =>
                          `flex items-center gap-2.5 pl-10 pr-4 py-2.5 text-sm transition-all ${
                            isChildActive
                              ? "text-[#2F5FD0] bg-white/5 border-r-2 border-[#2F5FD0]"
                              : "text-white/60 hover:text-white/85 hover:bg-white/5"
                          }`
                        }
                      >
                        {child.icon}
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-sm">
              {user?.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white truncate">{user?.name}</div>
              <div className="text-sm text-white/60 truncate">{isStaff ? user?.role : `学习身份：${learnerRoleMeta.label}`}</div>
              {user && (
                <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/85">
                    主身份：{getIdentityLabel(user.primaryIdentity)}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={logout}
              className="text-white/40 hover:text-white/80 transition-colors"
              title="退出"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="hidden md:flex items-center gap-3 h-14 px-4 bg-white border-b border-gray-200 flex-shrink-0">
          <div className="relative">
            <button
              onClick={() => setShowIdentityMenu(!showIdentityMenu)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                isStaff
                  ? "bg-nav-dark text-white"
                  : "bg-brand-soft text-brand"
              }`}
            >
              <span>当前视角：{isStaff ? "工作人员" : "学员"}</span>
              <ChevronDown size={12} />
            </button>
            {showIdentityMenu && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 w-56 overflow-hidden">
                {identityChoices.map((identity) => {
                  const active = currentIdentity === identity;
                  const primary = user?.primaryIdentity === identity;
                  const Icon = identity === "staff" ? Briefcase : BookOpen;
                  return (
                    <button
                      key={identity}
                      onClick={() => {
                        switchIdentity(identity);
                        setShowIdentityMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 hover:bg-gray-50 flex items-start gap-2.5 ${
                        active ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        active
                          ? identity === "staff"
                            ? "bg-nav-dark text-white"
                            : "bg-brand text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-sm font-medium ${active ? "text-gray-900" : "text-gray-700"}`}>
                            {getIdentityLabel(identity)}视角
                          </span>
                          {primary && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                              主身份
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                          {identity === "staff" ? "优先展示待办、风险和协同任务" : "优先展示学习任务、陪练和成长提醒"}
                        </p>
                      </div>
                    </button>
                  );
                })}
                <div className="border-t border-gray-100 px-3 py-2.5 bg-gray-50">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    只切换当前使用视角，不会把另一类模块从系统中移除。
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-400">|</div>

          {user && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500">主身份：{getIdentityLabel(user.primaryIdentity)}</span>
              {!isStaff && <span className="text-sm text-[#2F5FD0]">学习身份：{learnerRoleMeta.label}</span>}
              {approvalMeta && (
                <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  user.staffApprovalStatus === "approved"
                    ? "bg-green-100 text-[#15803D]"
                    : user.staffApprovalStatus === "pending"
                      ? "bg-amber-100 text-[#B45309]"
                      : "bg-gray-100 text-gray-500"
                }`}>
                  <Shield size={11} />
                  {approvalMeta.shortLabel}
                </span>
              )}
              <span className="text-sm text-gray-400">{user.department}</span>
            </div>
          )}

          <div className="flex-1" />

          {showSearch ? (
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <Search size={15} className="text-gray-400" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索所有身份课程..."
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  const keyword = searchQuery.trim();
                  if (!keyword) return;
                  navigate(`/learning?keyword=${encodeURIComponent(keyword)}`);
                  setShowSearch(false);
                }}
                className="bg-transparent text-sm outline-none w-56 text-gray-700 placeholder-gray-400"
              />
              <button onClick={() => setShowSearch(false)} className="text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
            >
              <Search size={14} />
              搜索
            </button>
          )}

          <button
            onClick={() => navigate("/messages")}
            className="relative p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            title="查看消息"
          >
            <Bell size={16} />
            {unreadMessages > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#DC2626] text-white text-xs rounded-full flex items-center justify-center">
                {unreadMessages}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-100 transition-colors"
            title="查看我的"
          >
            <div className="w-7 h-7 rounded-full bg-[#2F5FD0] flex items-center justify-center text-white text-xs">
              {user?.avatar}
            </div>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-16 md:pb-0">
          <Outlet key={currentIdentity} />
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 h-16">
          <div className="flex items-center h-full">
            {navItems.map((item) => {
              const isActive = activeNav === item.key;
              return (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full relative"
                  onClick={() => {
                    if (item.children) setExpandedNav(item.key);
                  }}
                >
                  <span className={`transition-colors ${isActive ? "text-[#2F5FD0]" : "text-gray-400"}`}>
                    {item.icon}
                  </span>
                  <span className={`text-xs transition-colors ${isActive ? "text-[#2F5FD0]" : "text-gray-400"}`}>
                    {item.label}
                  </span>
                  {item.key === "messages" && unreadMessages > 0 && (
                    <span className="absolute top-1 right-1/4 w-4 h-4 bg-state-danger text-white text-xs rounded-full flex items-center justify-center">
                      {unreadMessages}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
