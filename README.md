# 智柚

这是 `智柚` 前端预览项目代码包，用于展示统一业务训练与协同系统的 UI 方案。

## 运行方式

- 先执行 `npm i` 安装依赖
- 再执行 `npm run dev` 启动开发服务器
- 需要通过 Cloudflare 隧道对外预览时，执行 `npm run preview`，并把隧道服务指向 `http://127.0.0.1:4173`

## AI 问答接口

- 前端请求地址是 `/api/kb/query`，必须由本项目的 Vite 服务处理，不能只发布静态 `dist`。
- Cloudflare 路由不要指向 `comfy.shayuguagua.dpdns.org` 或 `127.0.0.1:8188`；那是 ComfyUI，不会处理知识库 POST。
- 如果使用当前主域名访问 `https://shayuguagua.dpdns.org/learning/ai-qna`，Cloudflare Tunnel 里需要让 `shayuguagua.dpdns.org` 的 `/api/kb/*` 路径转发到 `http://127.0.0.1:4173`，或让整个主域名都转发到 `http://127.0.0.1:4173`。

## 当前重点

- 统一系统入口与双身份视角
- 学员 / 工作人员共用同一套信息架构
- 首页按任务优先展示学习闭环或工作动作
