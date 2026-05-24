import type { LearnerRole } from "../context/AppContext";
import type { GeneratedLearningKnowledgeEntry, LearningKnowledgeUse } from "./generatedLearningKnowledge";
import {
  generatedLearningKnowledgeSeedEntries,
  generatedLearningKnowledgeSeedMeta,
} from "./generatedLearningKnowledgeSeeds";

export { generatedLearningKnowledgeSeedMeta as generatedLearningKnowledgeMeta };
export type { GeneratedLearningKnowledgeEntry, LearningKnowledgeUse };

export type LearningKnowledgeQuery = {
  role?: LearnerRole;
  use?: LearningKnowledgeUse;
  competency?: string;
  limit?: number;
};

const priorityWeight: Record<GeneratedLearningKnowledgeEntry["priority"], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

function rankKnowledgeEntry(entry: GeneratedLearningKnowledgeEntry) {
  return priorityWeight[entry.priority] * 100 + entry.competencyTags.length * 8 + entry.sceneTags.length * 4;
}

export function getLearningKnowledgeEntries(query: LearningKnowledgeQuery = {}) {
  const { role, use, competency, limit } = query;
  const filtered = generatedLearningKnowledgeSeedEntries.filter((entry) => {
    if (role && !entry.learnerRoles.includes(role)) return false;
    if (use && !entry.suggestedUses.includes(use)) return false;
    if (competency && !entry.competencyTags.includes(competency)) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => rankKnowledgeEntry(b) - rankKnowledgeEntry(a));
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getRoleCompetencyTags(role: LearnerRole) {
  const counts = new Map<string, number>();
  for (const entry of generatedLearningKnowledgeSeedEntries) {
    if (!entry.learnerRoles.includes(role)) continue;
    for (const tag of entry.competencyTags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}

export function getOnboardingKnowledgeSeeds(role: LearnerRole) {
  return getLearningKnowledgeEntries({ role, use: "assessment", limit: 8 }).map((entry) => ({
    id: entry.id,
    title: entry.title,
    sourceFile: entry.sourceFile,
    competencyTags: entry.competencyTags.slice(0, 3),
    assessmentFocus: entry.generatedTask.assessmentFocus,
    evidenceSnippets: entry.evidenceSnippets.slice(0, 2),
  }));
}

export function getPracticeKnowledgeSeeds(role: LearnerRole) {
  return getLearningKnowledgeEntries({ role, use: "practice", limit: 8 }).map((entry) => ({
    id: entry.id,
    title: entry.generatedTask.courseTitle,
    sourceFile: entry.sourceFile,
    prompt: entry.generatedTask.practicePrompt,
    competencyTags: entry.competencyTags.slice(0, 3),
  }));
}
