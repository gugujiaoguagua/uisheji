export type ApprovalToneStatus = "approved" | "pending" | "rejected" | "not_applied" | undefined | null;

export const appSurfaceClass = {
  page: "bg-page-surface",
  soft: "bg-surface-soft",
  subtle: "bg-surface-subtle",
} as const;

export const appShellClass = {
  staffHeader: "bg-nav-dark",
  studentHeader: "bg-brand",
  desktopNav: "bg-nav-dark text-white",
  desktopNavSub: "bg-nav-dark-active",
} as const;

export const appActionClass = {
  solidBrand: "bg-brand text-white hover:bg-brand-hover",
  outlineBrand: "border border-brand text-brand hover:bg-brand-soft",
  inlineBrand: "text-brand hover:text-brand-hover",
} as const;

export const statusBadgeClass = {
  success: "bg-state-success-soft text-state-success-foreground",
  warning: "bg-state-warning-soft text-state-warning-foreground",
  danger: "bg-state-danger-soft text-state-danger",
  neutral: "bg-gray-100 text-gray-500",
  info: "bg-brand-soft text-brand",
} as const;

export const moduleIconToneClass = {
  sales: "bg-module-sales-soft text-module-sales",
  design: "bg-module-design-soft text-module-design",
  order: "bg-module-order-soft text-module-order",
  factory: "bg-module-factory-soft text-module-factory",
  delivery: "bg-module-delivery-soft text-module-delivery",
  approval: "bg-module-approval-soft text-module-approval",
} as const;

export function getApprovalStatusToneClass(status?: ApprovalToneStatus) {
  if (status === "approved") return statusBadgeClass.success;
  if (status === "pending") return statusBadgeClass.warning;
  if (status === "rejected") return statusBadgeClass.danger;
  return statusBadgeClass.neutral;
}
