import { useMemo } from "react";
import { useNavigate, useRouteError } from "react-router";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { appActionClass, appShellClass, appSurfaceClass, statusBadgeClass } from "../lib/visualTokens";

export default function RouteErrorFallback() {
  const navigate = useNavigate();
  const error = useRouteError();

  const message = useMemo(() => {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "页面在渲染时遇到了异常，已被路由兜底页拦住，避免出现整屏黑屏或白屏。";
  }, [error]);

  return (
    <div className={`min-h-screen ${appSurfaceClass.page}`}>
      <div className={`${appShellClass.staffHeader} px-4 md:px-6 pt-6 pb-16`}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadgeClass.warning}`}>页面异常已拦截</span>
            <span className="text-xs text-white/60">这不是正常业务页面，而是运行时兜底页</span>
          </div>
          <h1 className="text-white text-xl font-semibold">页面没有正常渲染</h1>
          <p className="text-white/70 text-sm mt-2 leading-relaxed">
            我们已经拦住了异常，避免整页继续黑屏。你可以先返回上一页或回到首页，我会继续排查具体原因。
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 -mt-6 pb-8 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-state-danger" />
            <h2 className="text-sm font-medium text-gray-900">异常信息</h2>
          </div>
          <div className={`rounded-xl border border-gray-200 ${appSurfaceClass.subtle} px-4 py-4 text-xs text-gray-600 leading-relaxed break-all`}>
            {message}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} /> 返回上一页
          </button>
          <button
            onClick={() => navigate("/")}
            className={`rounded-xl px-4 py-3 text-sm transition-colors flex items-center justify-center gap-2 ${appActionClass.solidBrand}`}
          >
            <Home size={16} /> 回到首页
          </button>
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} /> 刷新重试
          </button>
        </div>
      </div>
    </div>
  );
}
