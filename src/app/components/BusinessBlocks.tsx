import { type ReactNode } from "react";
import { AlertTriangle, ArrowRight, BellRing, ChevronRight, Shield } from "lucide-react";
import { cn } from "./ui/utils";
import { appActionClass } from "../lib/visualTokens";

type BlockTone = "blue" | "amber" | "red" | "green" | "gray" | "purple" | "slate";
type TaskUrgency = "urgent" | "warning" | "normal";

type BlockAction = {
  label: string;
  onClick: () => void;
};

type IdentityItem = {
  label: string;
  value: string;
  helper?: string;
};

type QuickActionItem = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  badge?: string;
  badgeClassName?: string;
  hint?: string;
  description?: string;
  actionLabel?: string;
  colorClassName?: string;
  toneClassName?: string;
};

type ApprovalMetaItem = {
  label: string;
  value: string;
};

const toneMeta: Record<
  BlockTone,
  {
    panel: string;
    softPanel: string;
    iconWrap: string;
    title: string;
    description: string;
    badge: string;
    button: string;
    borderAccent: string;
  }
> = {
  blue: {
    panel: "border-brand-border bg-brand-panel",
    softPanel: "bg-brand-soft text-brand",
    iconWrap: "bg-brand-soft text-brand",
    title: "text-brand-strong",
    description: "text-brand-muted",
    badge: "bg-brand-soft text-brand",
    button: "bg-brand text-white hover:bg-brand-hover",
    borderAccent: "var(--brand)",
  },
  amber: {
    panel: "border-state-warning-border bg-state-warning-panel",
    softPanel: "bg-state-warning-soft text-state-warning-foreground",
    iconWrap: "bg-state-warning-soft text-state-warning-foreground",
    title: "text-state-warning-strong",
    description: "text-state-warning-foreground",
    badge: "bg-state-warning-soft text-state-warning-foreground",
    button: "bg-state-warning text-white hover:bg-state-warning-hover",
    borderAccent: "var(--state-warning)",
  },
  red: {
    panel: "border-state-danger-border bg-state-danger-panel",
    softPanel: "bg-state-danger-soft text-state-danger",
    iconWrap: "bg-state-danger-soft text-state-danger",
    title: "text-state-danger-strong",
    description: "text-state-danger",
    badge: "bg-state-danger-soft text-state-danger",
    button: "bg-state-danger text-white hover:bg-state-danger-hover",
    borderAccent: "var(--state-danger)",
  },
  green: {
    panel: "border-state-success-border bg-state-success-panel",
    softPanel: "bg-state-success-soft text-state-success-foreground",
    iconWrap: "bg-state-success-soft text-state-success-foreground",
    title: "text-state-success-strong",
    description: "text-state-success-foreground",
    badge: "bg-state-success-soft text-state-success-foreground",
    button: "bg-state-success text-white hover:bg-state-success-hover",
    borderAccent: "var(--state-success)",
  },
  gray: {
    panel: "border-state-neutral-border bg-surface-subtle",
    softPanel: "bg-state-neutral-soft text-state-neutral-foreground",
    iconWrap: "bg-state-neutral-soft text-state-neutral-foreground",
    title: "text-gray-900",
    description: "text-gray-500",
    badge: "bg-state-neutral-soft text-state-neutral-foreground",
    button: appActionClass.solidBrand,
    borderAccent: "var(--state-neutral-border)",
  },
  purple: {
    panel: "border-module-design-soft bg-module-design-soft",
    softPanel: "bg-module-design-soft text-module-design",
    iconWrap: "bg-module-design-soft text-module-design",
    title: "text-module-design",
    description: "text-module-design",
    badge: "bg-white/80 text-module-design",
    button: "bg-module-design text-white hover:opacity-90",
    borderAccent: "var(--module-design)",
  },
  slate: {
    panel: "border-module-approval-soft bg-module-approval-soft",
    softPanel: "bg-white/80 text-module-approval",
    iconWrap: "bg-white/80 text-module-approval",
    title: "text-module-approval",
    description: "text-module-approval",
    badge: "bg-white/80 text-module-approval",
    button: "bg-module-approval text-white hover:opacity-90",
    borderAccent: "var(--module-approval)",
  },
};

const urgencyMeta: Record<
  TaskUrgency,
  {
    tone: BlockTone;
    label: string;
    hover: string;
  }
> = {
  urgent: {
    tone: "red",
    label: "紧急",
    hover: "hover:bg-state-danger-panel",
  },
  warning: {
    tone: "amber",
    label: "待处理",
    hover: "hover:bg-state-warning-panel",
  },
  normal: {
    tone: "blue",
    label: "待完成",
    hover: "hover:bg-gray-50",
  },
};

const impactMeta = {
  high: { tone: "red" as const, label: "高影响" },
  medium: { tone: "amber" as const, label: "需同步" },
  low: { tone: "blue" as const, label: "已纳入" },
};

function getGridClass(columns: 2 | 3 | 4 | 5) {
  if (columns === 2) return "grid-cols-2";
  if (columns === 3) return "grid-cols-1 md:grid-cols-3";
  if (columns === 5) return "grid-cols-2 md:grid-cols-5";
  return "grid-cols-2 md:grid-cols-4";
}

export function IdentityStatusBar({
  title,
  description,
  statusLabel,
  statusBadgeClassName,
  items,
  highlights,
  action,
  className,
}: {
  title: string;
  description: string;
  statusLabel: string;
  statusBadgeClassName: string;
  items: IdentityItem[];
  highlights?: string[];
  action?: BlockAction;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-gray-200 bg-surface-soft p-3.5", className)}>
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand flex-shrink-0">
          <Shield size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <span className={cn("text-xs px-2 py-0.5 rounded-full", statusBadgeClassName)}>{statusLabel}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mt-1">{description}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-2 mt-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl border border-gray-200 bg-white px-3 py-3">
            <p className="text-xs text-gray-400">{item.label}</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{item.value}</p>
            {item.helper && <p className="text-xs text-gray-500 leading-relaxed mt-1">{item.helper}</p>}
          </div>
        ))}
      </div>

      {highlights && highlights.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          {highlights.map((item) => (
            <div key={item} className="text-xs text-gray-500 bg-white rounded-lg px-3 py-2 border border-gray-200">
              {item}
            </div>
          ))}
        </div>
      )}

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={cn("mt-3 inline-flex items-center gap-1.5 text-sm", appActionClass.inlineBrand)}
        >
          {action.label}
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

export function ReminderStrip({
  tone = "blue",
  title,
  description,
  badge,
  icon,
  action,
  className,
}: {
  tone?: BlockTone;
  title: string;
  description: string;
  badge?: string;
  icon?: ReactNode;
  action?: BlockAction;
  className?: string;
}) {
  const meta = toneMeta[tone];

  return (
    <div className={cn("rounded-xl border px-3 py-3", meta.panel, className)}>
      <div className="flex items-start gap-3 justify-between flex-wrap">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-xl flex-shrink-0", meta.iconWrap)}>
            {icon ?? <BellRing size={15} />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className={cn("text-sm font-medium", meta.title)}>{title}</p>
              {badge && <span className={cn("text-[10px] px-2 py-0.5 rounded-full", meta.badge)}>{badge}</span>}
            </div>
            <p className={cn("text-xs leading-relaxed mt-1", meta.description)}>{description}</p>
          </div>
        </div>

        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className={cn("inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs transition-colors", meta.button)}
          >
            {action.label}
            <ArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

export function QuickActionGrid({
  items,
  variant = "icon",
  columns = 4,
  className,
}: {
  items: QuickActionItem[];
  variant?: "icon" | "board";
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}) {
  if (variant === "board") {
    return (
      <div className={cn("grid gap-3", getGridClass(columns), className)}>
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className={cn(
              "rounded-xl border p-3.5 text-left hover:shadow-sm transition-all",
              item.toneClassName ?? "border-gray-200 bg-white",
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              {item.icon}
              <span className="text-base font-medium text-gray-900">{item.label}</span>
            </div>
            {item.description && <p className="text-sm text-gray-600 leading-relaxed min-h-[60px]">{item.description}</p>}
            {item.actionLabel && (
              <div className="text-sm text-brand mt-3 flex items-center gap-1">
                {item.actionLabel} <ChevronRight size={12} />
              </div>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-2", getGridClass(columns), className)}>
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={item.onClick}
          className="flex flex-col items-center gap-1.5 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.colorClassName ?? "bg-brand-soft text-brand")}>{item.icon}</div>
          <span className="text-xs md:text-sm text-gray-700 text-center">{item.label}</span>
          {item.badge && (
            <span className={cn("text-xs px-1.5 py-0.5 rounded-full", item.badgeClassName ?? "bg-gray-100 text-gray-500")}>{item.badge}</span>
          )}
          {item.hint && <span className="text-[11px] text-gray-400 text-center leading-relaxed">{item.hint}</span>}
        </button>
      ))}
    </div>
  );
}

export function TodayTaskCard({
  title,
  description,
  urgency,
  actionLabel,
  onClick,
  progress,
  deadline,
  duration,
  moduleLabel,
  className,
}: {
  title: string;
  description: string;
  urgency: TaskUrgency;
  actionLabel: string;
  onClick: () => void;
  progress?: number;
  deadline?: string;
  duration?: string;
  moduleLabel?: string;
  className?: string;
}) {
  const urgencyInfo = urgencyMeta[urgency];
  const meta = toneMeta[urgencyInfo.tone];

  return (
    <button
      type="button"
      className={cn("w-full px-4 py-3 text-left cursor-pointer transition-colors", urgencyInfo.hover, className)}
      style={{ borderLeft: `3px solid ${meta.borderAccent}` }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {moduleLabel && <span className="text-xs px-1.5 py-0.5 bg-nav-dark text-white rounded">{moduleLabel}</span>}
            <span className={cn("text-xs px-1.5 py-0.5 rounded font-medium", meta.badge)}>{urgencyInfo.label}</span>
            <span className="text-sm text-gray-900 line-clamp-1">{title}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">{description}</p>

          {(typeof progress === "number" || deadline || duration) && (
            <div className="mt-2 space-y-2">
              {typeof progress === "number" && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-xs text-gray-400">{progress}%</span>
                </div>
              )}
              {(deadline || duration) && (
                <div className="flex items-center gap-3 flex-wrap">
                  {deadline && <span className="text-sm text-gray-400">{deadline}</span>}
                  {duration && <span className="text-sm text-gray-400">{duration}</span>}
                </div>
              )}
            </div>
          )}
        </div>

        <span className={cn("flex-shrink-0 px-3 py-1.5 rounded text-sm font-medium transition-colors", meta.button)}>
          {actionLabel}
        </span>
      </div>
    </button>
  );
}

export function ApprovalStatusCard({
  title,
  value,
  description,
  badgeText,
  badgeClassName,
  action,
  meta,
  className,
}: {
  title: string;
  value: string;
  description: string;
  badgeText: string;
  badgeClassName: string;
  action?: BlockAction;
  meta?: ApprovalMetaItem[];
  className?: string;
}) {
  return (
    <div className={cn("bg-white rounded-xl shadow-sm p-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <span className={cn("text-[10px] px-2 py-0.5 rounded-full", badgeClassName)}>{badgeText}</span>
      </div>
      <p className="text-base font-medium text-gray-900 mt-3 leading-relaxed">{value}</p>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{description}</p>

      {meta && meta.length > 0 && (
        <div className={cn("grid gap-2 mt-3", meta.length >= 3 ? "md:grid-cols-3" : meta.length === 2 ? "md:grid-cols-2" : "grid-cols-1")}>
          {meta.map((item) => (
            <div key={item.label} className="rounded-lg bg-page-surface px-3 py-2">
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className="text-xs text-gray-700 mt-1 leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={cn("mt-4 inline-flex items-center gap-1.5 text-sm", appActionClass.inlineBrand)}
        >
          {action.label}
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

export function ImpactScopeCard({
  title,
  owner,
  note,
  severity,
  className,
}: {
  title: string;
  owner: string;
  note: string;
  severity: "high" | "medium" | "low";
  className?: string;
}) {
  const current = impactMeta[severity];
  const meta = toneMeta[current.tone];

  return (
    <div className={cn("rounded-xl border px-3 py-3", meta.panel, className)}>
      <div className="flex items-center justify-between gap-3 flex-wrap text-xs font-medium">
        <span className={meta.title}>{title}</span>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn("px-1.5 py-0.5 rounded-full", meta.badge)}>{current.label}</span>
          <span className={meta.description}>{owner}</span>
        </div>
      </div>
      <p className={cn("text-xs mt-2 leading-relaxed", meta.description)}>{note}</p>
    </div>
  );
}

export function RiskSummaryCard({
  tone = "red",
  title,
  description,
  summaryLabel,
  summaryValue,
  helperText,
  action,
  className,
}: {
  tone?: BlockTone;
  title: string;
  description: string;
  summaryLabel?: string;
  summaryValue?: string;
  helperText?: string;
  action?: BlockAction;
  className?: string;
}) {
  const meta = toneMeta[tone];

  return (
    <div className={cn("rounded-xl border p-4", meta.panel, className)}>
      <div className="flex items-start gap-3">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0", meta.iconWrap)}>
          <AlertTriangle size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-medium", meta.title)}>{title}</p>
          <p className={cn("text-xs leading-relaxed mt-1", meta.description)}>{description}</p>
        </div>
      </div>

      {(summaryLabel || summaryValue) && (
        <div className={cn("mt-3 rounded-xl border px-3 py-3", meta.panel)}>
          {summaryLabel && <p className="text-[11px] opacity-80 mb-1">{summaryLabel}</p>}
          {summaryValue && <p className="text-sm font-medium mb-1">{summaryValue}</p>}
          {helperText && <p className="text-xs leading-relaxed opacity-90">{helperText}</p>}
        </div>
      )}

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={cn("mt-3 inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs transition-colors", meta.button)}
        >
          {action.label}
          <ArrowRight size={12} />
        </button>
      )}
    </div>
  );
}
