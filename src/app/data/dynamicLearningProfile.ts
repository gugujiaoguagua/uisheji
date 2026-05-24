import type { LearnerRole } from "../context/AppContext";
import type { CourseSummary } from "./learningData";
import {
  generatedLearningKnowledgeMeta,
  getLearningKnowledgeEntries,
  getRoleCompetencyTags,
} from "./learningKnowledgeMap";

type DynamicWeakArea = {
  id: string;
  area: string;
  score: number | null;
  gap: number;
  reason: string;
  action: string;
  urgency: "high" | "medium";
};

type DynamicMilestone = {
  label: string;
  done: boolean;
  date?: string;
  current?: number;
  total?: number;
  locked?: boolean;
};

function urgencyFromPriority(priority: "high" | "medium" | "low") {
  if (priority === "high") return "urgent" as const;
  if (priority === "medium") return "warning" as const;
  return "normal" as const;
}

function durationFromChars(charCount: number) {
  return Math.min(35, Math.max(12, Math.round(charCount / 520)));
}

function categoryFromTags(tags: string[]) {
  return tags[0] || "岗位能力";
}

export function getDynamicLearningCourses(role: LearnerRole): CourseSummary[] {
  return getLearningKnowledgeEntries({ role, use: "course", limit: 12 }).map((entry, index) => ({
    id: `kb-${entry.id}`,
    title: entry.generatedTask.courseTitle,
    subtitle: `来源：${entry.sourceFile}`,
    category: categoryFromTags(entry.competencyTags),
    learnerRoles: entry.learnerRoles,
    version: "知识库动态",
    versionChange: entry.sourceKind === "process_document",
    status: index === 0 ? "in_progress" : "not_started",
    urgency: urgencyFromPriority(entry.priority),
    duration: durationFromChars(entry.charCount),
    deadline: entry.priority === "high" ? "今日优先" : "本周内",
    tags: entry.competencyTags.slice(0, 4),
    desc: `${entry.generatedTask.practicePrompt} 来源文件：${entry.sourceFile}`,
    progress: index === 0 ? 0 : 0,
    sourceRefs: [entry.relativePath],
    completionCriteria: [
      entry.generatedTask.assessmentFocus,
      "能说清来源材料中的关键动作和风险边界",
      "能把知识点转成客户或业务场景中的下一步处理",
    ],
    taskTypeLabel: "知识库动态课",
    suggestedPage: "学习中心 / 首页今日任务",
  }));
}

export function getDynamicLearningPath(role: LearnerRole) {
  const competencies = getRoleCompetencyTags(role).slice(0, 5);
  return {
    title: "知识库动态入门路径",
    currentStage: competencies[0]?.tag || "岗位基础能力",
    nextAction: `先完成${competencies.slice(0, 2).map((item) => item.tag).join(" / ") || "入门能力"}学习，再进入陪练和考核。`,
    completedSteps: 0,
    totalSteps: Math.max(3, competencies.length),
    progress: 0,
    entryCourseId: "kb-dynamic",
    milestones: competencies.map((item, index) => ({
      title: item.tag,
      state: index === 0 ? "current" as const : "todo" as const,
    })),
  };
}

export function getDynamicGrowthProfile(role: LearnerRole) {
  const competencyCounts = getRoleCompetencyTags(role).slice(0, 6);
  const knowledgeCount = generatedLearningKnowledgeMeta.summaryByRole[role] ?? 0;
  const weakAreas: DynamicWeakArea[] = competencyCounts.slice(0, 4).map((item, index) => ({
    id: `kb-${index + 1}`,
    area: item.tag,
    score: null,
    gap: 0,
    reason: `已从 ${item.count} 条会议提取文本识别为当前岗位高频能力点，等待学员完成课程、陪练和考核后生成真实分数。`,
    action: `先完成${item.tag}动态课程，再做一次 AI 陪练和入门考核。`,
    urgency: index < 2 ? "high" : "medium",
  }));

  return {
    scoreLabel: "未测",
    scoreSub: "待完成入门考核",
    knowledgeCount,
    requiredCourseRate: 0,
    practiceDone: 0,
    practiceTotal: Math.max(1, getLearningKnowledgeEntries({ role, use: "practice", limit: 6 }).length),
    assessmentRateLabel: "未测",
    radarData: competencyCounts.map((item) => ({ subject: item.tag, A: 0, fullMark: 100 })),
    weakAreas,
    milestones: [
      { label: "完成知识库动态课程", done: false, current: 0, total: Math.max(1, getLearningKnowledgeEntries({ role, use: "course", limit: 6 }).length) },
      { label: "完成 AI 陪练", done: false, current: 0, total: Math.max(1, getLearningKnowledgeEntries({ role, use: "practice", limit: 6 }).length) },
      { label: "入门考核通过", done: false, current: 0, total: 1 },
      { label: "生成真实能力画像", done: false, locked: true },
    ] satisfies DynamicMilestone[],
  };
}

export function getDynamicProfileStats(role: LearnerRole, points: number) {
  const growth = getDynamicGrowthProfile(role);
  const courseTotal = getLearningKnowledgeEntries({ role, use: "course", limit: 12 }).length;

  return [
    { label: "综合评分", value: growth.scoreLabel, unit: "" },
    { label: "动态课程", value: String(courseTotal), unit: "门" },
    { label: "AI 陪练", value: `${growth.practiceDone}/${growth.practiceTotal}`, unit: "次" },
    { label: "知识来源", value: String(growth.knowledgeCount), unit: "条" },
    { label: "获得积分", value: String(points), unit: "分" },
  ];
}
