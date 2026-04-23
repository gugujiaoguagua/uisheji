import { createBrowserRouter, Navigate } from "react-router";
import Login from "./pages/Login";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Learning from "./pages/Learning";
import CourseDetail from "./pages/CourseDetail";
import AIQnA from "./pages/AIQnA";
import AIPractice from "./pages/AIPractice";
import Assessment from "./pages/Assessment";
import Growth from "./pages/Growth";
import DesignStandards from "./pages/DesignStandards";
import DesignStandardsDetail from "./pages/DesignStandardsDetail";
import WeakAreaDetail from "./pages/WeakAreaDetail";
import RetrainTasks from "./pages/RetrainTasks";
import ReviewResult from "./pages/ReviewResult";
import Workbench from "./pages/Workbench";
import InfoSync from "./pages/InfoSync";
import InfoSyncDetail from "./pages/InfoSyncDetail";
import ContentOps from "./pages/ContentOps";
import VersionManagement from "./pages/VersionManagement";
import Collab from "./pages/Collab";
import RequestHandoff from "./pages/RequestHandoff";
import ReviewPreparation from "./pages/ReviewPreparation";
import ScoreFeedback from "./pages/ScoreFeedback";
import OrderReview from "./pages/OrderReview";
import OrderPreparation from "./pages/OrderPreparation";
import IssueAnnotation from "./pages/IssueAnnotation";
import ProcessValidation from "./pages/ProcessValidation";
import AfterSaleAttribution from "./pages/AfterSaleAttribution";
import TrainingFlowback from "./pages/TrainingFlowback";
import Dashboard from "./pages/Dashboard";
import BusinessOverview from "./pages/BusinessOverview";
import RiskRoster from "./pages/RiskRoster";
import CoachTasks from "./pages/CoachTasks";
import HistoryTimeline from "./pages/HistoryTimeline";
import UpdateRecords from "./pages/UpdateRecords";
import ReviewRecords from "./pages/ReviewRecords";
import RetestMakeup from "./pages/RetestMakeup";
import StateStandards from "./pages/StateStandards";
import ProductBlueprint from "./pages/ProductBlueprint";
import DualEndAcceptance from "./pages/DualEndAcceptance";
import ApprovalCenter from "./pages/ApprovalCenter";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import StaffTransfer from "./pages/StaffTransfer";
import ApprovalStatus from "./pages/ApprovalStatus";
import RouteErrorFallback from "./pages/RouteErrorFallback";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
    errorElement: <RouteErrorFallback />,
  },
  {
    path: "/",
    Component: Layout,
    errorElement: <RouteErrorFallback />,
    children: [
      { index: true, Component: Home },
      { path: "learning", Component: Learning },
      { path: "learning/course/:id", Component: CourseDetail },
      { path: "learning/ai-qna", Component: AIQnA },
      { path: "learning/ai-practice", Component: AIPractice },
      { path: "learning/assessment", Component: Assessment },
      { path: "learning/growth", Component: Growth },
      { path: "learning/design-standards", Component: DesignStandards },
      { path: "learning/design-standards/:topicId", Component: DesignStandardsDetail },
      { path: "learning/growth/weak-area/:id", Component: WeakAreaDetail },
      { path: "learning/growth/retrain", Component: RetrainTasks },
      { path: "learning/growth/review-result", Component: ReviewResult },
      { path: "learning/growth/retest-makeup", Component: RetestMakeup },
      { path: "workbench", Component: Workbench },
      { path: "workbench/history", Component: HistoryTimeline },
      { path: "workbench/info-sync", Component: InfoSync },
      { path: "workbench/info-sync/update/:id", Component: InfoSyncDetail },
      { path: "workbench/info-sync/records", Component: UpdateRecords },
      { path: "workbench/content-ops", Component: ContentOps },
      { path: "workbench/content-ops/version/:id", Component: VersionManagement },
      { path: "workbench/collab", Component: Collab },
      { path: "workbench/collab/request/:id", Component: RequestHandoff },
      { path: "workbench/collab/review/:id", Component: ReviewPreparation },
      { path: "workbench/collab/score/:id", Component: ScoreFeedback },
      { path: "workbench/collab/records", Component: ReviewRecords },
      { path: "workbench/order-review", Component: OrderReview },
      { path: "workbench/order-review/preparation/:id", Component: OrderPreparation },
      { path: "workbench/order-review/annotation/:id", Component: IssueAnnotation },
      { path: "workbench/order-review/validation/:id", Component: ProcessValidation },
      { path: "workbench/order-review/attribution/:id", Component: AfterSaleAttribution },
      { path: "workbench/order-review/flowback/:id", Component: TrainingFlowback },
      { path: "workbench/blueprint", Component: ProductBlueprint },
      { path: "workbench/dual-end-acceptance", Component: DualEndAcceptance },
      { path: "workbench/approvals", Component: ApprovalCenter },
      { path: "workbench/dashboard", Component: Dashboard },
      { path: "workbench/dashboard/business", Component: BusinessOverview },
      { path: "workbench/dashboard/risk", Component: RiskRoster },
      { path: "workbench/dashboard/tasks", Component: CoachTasks },
      { path: "workbench/state-standards", Component: StateStandards },
      { path: "messages", Component: Messages },
      { path: "profile", Component: Profile },
      { path: "profile/settings", Component: Settings },
      { path: "profile/staff-transfer", Component: StaffTransfer },
      { path: "profile/approval-status", Component: ApprovalStatus },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
