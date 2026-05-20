import { lazy, Suspense, type ComponentType } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import RouteErrorFallback from "./pages/RouteErrorFallback";

const Login = lazy(() => import("./pages/Login"));
const Layout = lazy(() => import("./components/Layout").then((module) => ({ default: module.Layout })));
const Home = lazy(() => import("./pages/Home"));
const Learning = lazy(() => import("./pages/Learning"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const AIQnA = lazy(() => import("./pages/AIQnA"));
const AIPractice = lazy(() => import("./pages/AIPractice"));
const Assessment = lazy(() => import("./pages/Assessment"));
const Growth = lazy(() => import("./pages/Growth"));
const DesignStandards = lazy(() => import("./pages/DesignStandards"));
const DesignStandardsDetail = lazy(() => import("./pages/DesignStandardsDetail"));
const WeakAreaDetail = lazy(() => import("./pages/WeakAreaDetail"));
const RetrainTasks = lazy(() => import("./pages/RetrainTasks"));
const ReviewResult = lazy(() => import("./pages/ReviewResult"));
const Workbench = lazy(() => import("./pages/Workbench"));
const InfoSync = lazy(() => import("./pages/InfoSync"));
const InfoSyncDetail = lazy(() => import("./pages/InfoSyncDetail"));
const ContentOps = lazy(() => import("./pages/ContentOps"));
const ContentOpsDetail = lazy(() => import("./pages/ContentOpsDetail"));
const VersionManagement = lazy(() => import("./pages/VersionManagement"));
const Collab = lazy(() => import("./pages/Collab"));
const RequestHandoff = lazy(() => import("./pages/RequestHandoff"));
const ReviewPreparation = lazy(() => import("./pages/ReviewPreparation"));
const ScoreFeedback = lazy(() => import("./pages/ScoreFeedback"));
const OrderReview = lazy(() => import("./pages/OrderReview"));
const OrderPreparation = lazy(() => import("./pages/OrderPreparation"));
const IssueAnnotation = lazy(() => import("./pages/IssueAnnotation"));
const ProcessValidation = lazy(() => import("./pages/ProcessValidation"));
const AfterSaleAttribution = lazy(() => import("./pages/AfterSaleAttribution"));
const TrainingFlowback = lazy(() => import("./pages/TrainingFlowback"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const BusinessOverview = lazy(() => import("./pages/BusinessOverview"));
const RiskRoster = lazy(() => import("./pages/RiskRoster"));
const CoachTasks = lazy(() => import("./pages/CoachTasks"));
const HistoryTimeline = lazy(() => import("./pages/HistoryTimeline"));
const UpdateRecords = lazy(() => import("./pages/UpdateRecords"));
const ReviewRecords = lazy(() => import("./pages/ReviewRecords"));
const SalesFollowup = lazy(() => import("./pages/SalesFollowup"));
const RetestMakeup = lazy(() => import("./pages/RetestMakeup"));
const StateStandards = lazy(() => import("./pages/StateStandards"));
const ProductBlueprint = lazy(() => import("./pages/ProductBlueprint"));
const DualEndAcceptance = lazy(() => import("./pages/DualEndAcceptance"));
const ApprovalCenter = lazy(() => import("./pages/ApprovalCenter"));
const Messages = lazy(() => import("./pages/Messages"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const StaffTransfer = lazy(() => import("./pages/StaffTransfer"));
const ApprovalStatus = lazy(() => import("./pages/ApprovalStatus"));

function withSuspense(Page: ComponentType) {
  return function SuspendedRoute() {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#F5F7FA]" />}>
        <Page />
      </Suspense>
    );
  };
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: withSuspense(Login),
    errorElement: <RouteErrorFallback />,
  },
  {
    path: "/",
    Component: withSuspense(Layout),
    errorElement: <RouteErrorFallback />,
    children: [
      { index: true, Component: withSuspense(Home) },
      { path: "learning", Component: withSuspense(Learning) },
      { path: "learning/course/:id", Component: withSuspense(CourseDetail) },
      { path: "learning/ai-qna", Component: withSuspense(AIQnA) },
      { path: "learning/ai-practice", Component: withSuspense(AIPractice) },
      { path: "learning/assessment", Component: withSuspense(Assessment) },
      { path: "learning/growth", Component: withSuspense(Growth) },
      { path: "learning/design-standards", Component: withSuspense(DesignStandards) },
      { path: "learning/design-standards/:topicId", Component: withSuspense(DesignStandardsDetail) },
      { path: "learning/growth/weak-area/:id", Component: withSuspense(WeakAreaDetail) },
      { path: "learning/growth/retrain", Component: withSuspense(RetrainTasks) },
      { path: "learning/growth/review-result", Component: withSuspense(ReviewResult) },
      { path: "learning/growth/retest-makeup", Component: withSuspense(RetestMakeup) },
      { path: "workbench", Component: withSuspense(Workbench) },
      { path: "workbench/history", Component: withSuspense(HistoryTimeline) },
      { path: "workbench/info-sync", Component: withSuspense(InfoSync) },
      { path: "workbench/info-sync/update/:id", Component: withSuspense(InfoSyncDetail) },
      { path: "workbench/info-sync/records", Component: withSuspense(UpdateRecords) },
      { path: "workbench/content-ops", Component: withSuspense(ContentOps) },
      { path: "workbench/content-ops/version/:id", Component: withSuspense(VersionManagement) },
      { path: "workbench/content-ops/:detailType/:id", Component: withSuspense(ContentOpsDetail) },
      { path: "workbench/collab", Component: withSuspense(Collab) },
      { path: "workbench/collab/request/:id", Component: withSuspense(RequestHandoff) },
      { path: "workbench/collab/review/:id", Component: withSuspense(ReviewPreparation) },
      { path: "workbench/collab/score/:id", Component: withSuspense(ScoreFeedback) },
      { path: "workbench/collab/records", Component: withSuspense(ReviewRecords) },
      { path: "workbench/sales-followup", Component: withSuspense(SalesFollowup) },
      { path: "workbench/order-review", Component: withSuspense(OrderReview) },
      { path: "workbench/order-review/preparation/:id", Component: withSuspense(OrderPreparation) },
      { path: "workbench/order-review/annotation/:id", Component: withSuspense(IssueAnnotation) },
      { path: "workbench/order-review/validation/:id", Component: withSuspense(ProcessValidation) },
      { path: "workbench/order-review/attribution/:id", Component: withSuspense(AfterSaleAttribution) },
      { path: "workbench/order-review/flowback/:id", Component: withSuspense(TrainingFlowback) },
      { path: "workbench/blueprint", Component: withSuspense(ProductBlueprint) },
      { path: "workbench/dual-end-acceptance", Component: withSuspense(DualEndAcceptance) },
      { path: "workbench/approvals", Component: withSuspense(ApprovalCenter) },
      { path: "workbench/dashboard", Component: withSuspense(Dashboard) },
      { path: "workbench/dashboard/business", Component: withSuspense(BusinessOverview) },
      { path: "workbench/dashboard/risk", Component: withSuspense(RiskRoster) },
      { path: "workbench/dashboard/tasks", Component: withSuspense(CoachTasks) },
      { path: "workbench/state-standards", Component: withSuspense(StateStandards) },
      { path: "messages", Component: withSuspense(Messages) },
      { path: "profile", Component: withSuspense(Profile) },
      { path: "profile/settings", Component: withSuspense(Settings) },
      { path: "profile/staff-transfer", Component: withSuspense(StaffTransfer) },
      { path: "profile/approval-status", Component: withSuspense(ApprovalStatus) },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
