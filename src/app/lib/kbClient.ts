export type KbConfidence = "high" | "mid" | "low";

export type KbCitation = {
  id: string;
  title: string;
  knowledge_type?: string;
  source_id?: string;
  source_file?: string;
  source_section?: string;
  version?: string;
  kb_revision?: string;
  relative_path?: string;
  score?: number;
};

export type KbQueryResponse = {
  answer: string;
  direct_answer: string;
  confidence: KbConfidence;
  citations: KbCitation[];
  fallback: boolean;
  fallback_reason?: string;
  trace_id: string;
  kb_snapshot_id: string;
};

export type KbQueryPayload = {
  question: string;
  scene_hint?: string;
  role_hint?: string;
  top_k?: number;
  kb_snapshot_id?: string;
};

const kbApiBase = (import.meta.env.VITE_KB_API_BASE || "").replace(/\/$/, "");

export async function queryKnowledgeBase(payload: KbQueryPayload): Promise<KbQueryResponse> {
  const response = await fetch(`${kbApiBase}/api/kb/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`知识库查询失败：${response.status}`);
  }

  return response.json();
}

export async function submitKnowledgeFeedback(payload: Record<string, unknown>) {
  const response = await fetch(`${kbApiBase}/api/kb/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`知识补充提交失败：${response.status}`);
  }

  return response.json();
}
