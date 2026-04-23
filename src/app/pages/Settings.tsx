import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Bell,
  ChevronRight,
  Lock,
  Save,
  Shield,
  Smartphone,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { useApp, getIdentityLabel } from "../context/AppContext";

type SettingKey =
  | "syncNotice"
  | "retrainNotice"
  | "approvalNotice"
  | "rememberLastIdentity"
  | "desktopNotice"
  | "maskSensitiveData";

function ToggleRow({
  title,
  desc,
  checked,
  onToggle,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{desc}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-[#2F5FD0]" : "bg-gray-200"}`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const { user, currentIdentity } = useApp();
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<Record<SettingKey, boolean>>({
    syncNotice: true,
    retrainNotice: true,
    approvalNotice: true,
    rememberLastIdentity: true,
    desktopNotice: false,
    maskSensitiveData: true,
  });

  if (!user) {
    return null;
  }

  const toggle = (key: SettingKey) => {
    setSaved(false);
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-3"
          >
            <ArrowLeft size={15} /> 返回“我的”
          </button>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-gray-900">账号设置</h1>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                只调整通知、安全和使用偏好，不改变统一信息架构，也不会把学员与工作人员拆成两套系统。
              </p>
            </div>
            <button
              onClick={() => setSaved(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2F5FD0] px-4 py-2.5 text-sm text-white hover:bg-[#2550B8] transition-colors"
            >
              <Save size={15} /> 保存当前设置
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 space-y-4">
        <div className="grid md:grid-cols-3 gap-3">
          <div className="rounded-2xl bg-[#1E2A3A] px-4 py-4 text-white">
            <p className="text-xs text-white/60">当前账号</p>
            <p className="text-base font-medium mt-1">{user.name}</p>
            <p className="text-sm text-white/70 mt-1">{user.role}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 px-4 py-4">
            <p className="text-xs text-gray-400">当前视角</p>
            <p className="text-base font-medium text-gray-900 mt-1">{getIdentityLabel(currentIdentity)}</p>
            <p className="text-sm text-gray-500 mt-1">保留双视角能力，只调整默认使用习惯</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 px-4 py-4">
            <div className="flex items-center gap-2">
              <Shield size={15} className="text-[#16A34A]" />
              <p className="text-xs text-gray-400">安全状态</p>
            </div>
            <p className="text-base font-medium text-gray-900 mt-1">企业账号受保护</p>
            <p className="text-sm text-gray-500 mt-1">敏感信息默认脱敏显示</p>
          </div>
        </div>

        {saved && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 flex items-start gap-2">
            <CheckCircle2 size={16} className="text-[#16A34A] mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#15803D]">设置已保存</p>
              <p className="text-sm text-green-700 mt-1">当前只是原型内保存偏好，用于确认这一阶段的页面承接已经完整。</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Bell size={15} className="text-[#2F5FD0]" />
            <span className="text-sm font-medium text-gray-900">消息与提醒</span>
          </div>
          <ToggleRow
            title="同步更新提醒"
            desc="新品、参数、工艺规范有版本变化时，优先推送信息同步提醒。"
            checked={settings.syncNotice}
            onToggle={() => toggle("syncNotice")}
          />
          <ToggleRow
            title="补训 / 复测提醒"
            desc="当课程版本更新或考核未通过时，自动收到补学和复测提醒。"
            checked={settings.retrainNotice}
            onToggle={() => toggle("retrainNotice")}
          />
          <ToggleRow
            title="审批与权限提醒"
            desc="身份申请、审批结果和权限变化统一进入消息中心，并在“我的”里留痕。"
            checked={settings.approvalNotice}
            onToggle={() => toggle("approvalNotice")}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Smartphone size={15} className="text-[#2F5FD0]" />
            <span className="text-sm font-medium text-gray-900">使用习惯</span>
          </div>
          <ToggleRow
            title="记住上次使用视角"
            desc="下次登录时优先推荐上次的学员/工作人员视角，但仍保留手动选择。"
            checked={settings.rememberLastIdentity}
            onToggle={() => toggle("rememberLastIdentity")}
          />
          <ToggleRow
            title="桌面端通知弹窗"
            desc="在电脑端收到待办、风险、审批消息时，允许显示桌面提醒。"
            checked={settings.desktopNotice}
            onToggle={() => toggle("desktopNotice")}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Lock size={15} className="text-[#2F5FD0]" />
            <span className="text-sm font-medium text-gray-900">安全与隐私</span>
          </div>
          <ToggleRow
            title="敏感信息脱敏显示"
            desc="订单异常、审批记录和联系方式默认做脱敏处理，避免无关角色误读。"
            checked={settings.maskSensitiveData}
            onToggle={() => toggle("maskSensitiveData")}
          />
          <button
            onClick={() => navigate("/profile/approval-status")}
            className="w-full flex items-center justify-between rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-left hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">查看身份与审批安全记录</p>
              <p className="text-sm text-gray-500 mt-1">进入审批状态页，查看申请、审批、主身份变更与学习能力保留记录。</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
