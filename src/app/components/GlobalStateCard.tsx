import { type ReactNode } from "react";
import { ArrowRight, CheckCircle2, Clock3, SearchX, WifiOff } from "lucide-react";
import { cn } from "./ui/utils";
import { appActionClass } from "../lib/visualTokens";

export type GlobalStateTone = "empty" | "exception" | "success" | "pending";

type StateAction = {
  label: string;
  onClick: () => void;
};

type StateMetaItem = {
  label: string;
  value: string;
};

export const globalStateMeta: Record<
  GlobalStateTone,
  {
    label: string;
    pill: string;
    icon: ReactNode;
    panel: string;
    iconWrap: string;
    description: string;
    helper: string;
    primaryButton: string;
    metaCard: string;
  }
> = {
  empty: {
    label: "空状态",
    pill: "bg-state-neutral-soft text-state-neutral-foreground",
    icon: <SearchX size={18} className="text-gray-500" />,
    panel: "border-state-neutral-border bg-[linear-gradient(180deg,#FFFFFF_0%,#FAFBFC_100%)]",
    iconWrap: "bg-page-surface",
    description: "text-gray-500",
    helper: "text-gray-400",
    primaryButton: appActionClass.solidBrand,
    metaCard: "border-state-neutral-border bg-white/85 text-gray-700",
  },
  exception: {
    label: "异常状态",
    pill: "bg-state-danger-soft text-state-danger",
    icon: <WifiOff size={18} className="text-state-danger" />,
    panel: "border-state-danger-border bg-[linear-gradient(180deg,#FFF7F7_0%,#FFFFFF_100%)]",
    iconWrap: "bg-state-danger-panel",
    description: "text-state-danger",
    helper: "text-state-danger/80",
    primaryButton: "bg-state-danger text-white hover:bg-state-danger-hover",
    metaCard: "border-state-danger-border bg-white/90 text-state-danger",
  },
  success: {
    label: "成功态",
    pill: "bg-state-success-soft text-state-success-foreground",
    icon: <CheckCircle2 size={18} className="text-state-success" />,
    panel: "border-state-success-border bg-[linear-gradient(180deg,#F3FBF5_0%,#FFFFFF_100%)]",
    iconWrap: "bg-state-success-panel",
    description: "text-state-success-foreground",
    helper: "text-state-success-foreground/80",
    primaryButton: "bg-state-success text-white hover:bg-state-success-hover",
    metaCard: "border-state-success-border bg-white/90 text-state-success-foreground",
  },
  pending: {
    label: "待处理态",
    pill: "bg-brand-soft text-brand",
    icon: <Clock3 size={18} className="text-brand" />,
    panel: "border-brand-border bg-[linear-gradient(180deg,#F7FAFF_0%,#FFFFFF_100%)]",
    iconWrap: "bg-brand-soft",
    description: "text-brand",
    helper: "text-brand-muted",
    primaryButton: appActionClass.solidBrand,
    metaCard: "border-brand-border bg-white/90 text-brand",
  },
};

interface GlobalStateCardProps {
  tone: GlobalStateTone;
  title: string;
  description: string;
  badge?: string;
  caption?: string;
  helperText?: string;
  icon?: ReactNode;
  action?: StateAction;
  secondaryAction?: StateAction;
  meta?: StateMetaItem[];
  layout?: "centered" | "inline";
  size?: "sm" | "md";
  className?: string;
}

export function GlobalStateCard({
  tone,
  title,
  description,
  badge,
  caption,
  helperText,
  icon,
  action,
  secondaryAction,
  meta,
  layout = "centered",
  size = "md",
  className,
}: GlobalStateCardProps) {
  const toneMeta = globalStateMeta[tone];
  const compact = size === "sm";
  const hasActions = Boolean(action || secondaryAction);
  const metaGridClass = meta
    ? meta.length >= 3
      ? "md:grid-cols-3"
      : meta.length === 2
        ? "md:grid-cols-2"
        : "grid-cols-1"
    : "grid-cols-1";

  return (
    <div
      className={cn(
        "rounded-2xl border shadow-sm",
        toneMeta.panel,
        compact ? "p-4" : "p-5",
        className,
      )}
    >
      <div
        className={cn(
          layout === "inline"
            ? "flex items-start justify-between gap-3 flex-wrap"
            : "flex flex-col items-center text-center gap-3",
        )}
      >
        <div
          className={cn(
            layout === "inline"
              ? "flex items-start gap-3 flex-1 min-w-0"
              : "flex flex-col items-center gap-3 w-full",
          )}
        >
          <div
            className={cn(
              "rounded-2xl flex items-center justify-center flex-shrink-0",
              compact ? "h-10 w-10" : "h-11 w-11",
              toneMeta.iconWrap,
            )}
          >
            {icon ?? toneMeta.icon}
          </div>

          <div className={cn("min-w-0", layout === "centered" && "text-center")}>
            <div
              className={cn(
                "flex items-center gap-2 flex-wrap mb-2",
                layout === "centered" ? "justify-center" : "justify-start",
              )}
            >
              <span className={cn("text-xs px-2 py-0.5 rounded-full", toneMeta.pill)}>{badge ?? toneMeta.label}</span>
              {caption && <span className="text-xs text-gray-400">{caption}</span>}
            </div>
            <h3 className={cn("font-medium text-gray-900", compact ? "text-sm" : "text-base")}>{title}</h3>
            <p className={cn("leading-relaxed mt-1", compact ? "text-xs" : "text-sm", toneMeta.description)}>{description}</p>
            {helperText && <p className={cn("text-xs leading-relaxed mt-2", toneMeta.helper)}>{helperText}</p>}
          </div>
        </div>

        {hasActions && (
          <div
            className={cn(
              "flex gap-2 flex-wrap",
              layout === "centered" ? "justify-center" : "justify-start",
            )}
          >
            {secondaryAction && (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {secondaryAction.label}
              </button>
            )}
            {action && (
              <button
                type="button"
                onClick={action.onClick}
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs transition-colors",
                  toneMeta.primaryButton,
                )}
              >
                {action.label}
                <ArrowRight size={12} />
              </button>
            )}
          </div>
        )}
      </div>

      {meta && meta.length > 0 && (
        <div className={cn("grid gap-2 mt-4", metaGridClass)}>
          {meta.map((item) => (
            <div key={item.label} className={cn("rounded-xl border px-3 py-3", toneMeta.metaCard)}>
              <p className="text-[11px] opacity-70 mb-1">{item.label}</p>
              <p className={cn("leading-relaxed", compact ? "text-xs" : "text-sm")}>{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
