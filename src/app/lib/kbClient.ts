export type KbConfidence = "high" | "mid" | "low";

export type KbCitation = {
  id: string;
  title: string;
  knowledge_type?: string;
  authority_level?: string;
  source_id?: string;
  source_file?: string;
  source_section?: string;
  version?: string;
  kb_revision?: string;
  relative_path?: string;
  category?: string;
  updated_at?: string;
  applicable_roles?: string[];
  applicable_scenes?: string[];
  tags?: string[];
  matched_terms?: string[];
  match_reason?: string[];
  score?: number;
  excerpt?: string;
};

export type KbAnswerSections = {
  internal_explanation?: string;
  basis_summary?: string[];
  risk_boundary?: string;
  next_step?: string;
};

export type KbQueryResponse = {
  answer: string;
  direct_answer: string;
  answer_sections?: KbAnswerSections;
  confidence: KbConfidence;
  citations: KbCitation[];
  fallback: boolean;
  fallback_reason?: string;
  trace_id: string;
  kb_snapshot_id: string;
  model?: string;
};

export type KbHealthResponse = {
  kb_snapshot_id: string;
  data_root?: string;
  source_root: string;
  structured_root: string;
  entry_count: number;
  source_file_count?: number;
  parsed_entry_count?: number;
  filtered_entry_count?: number;
  structured_file_count: number;
  indexed_at: string;
  source_roots?: Array<{
    label: string;
    path: string;
    exists: boolean;
    file_count: number;
    current_entry_count: number;
  }>;
  recent_files?: Array<{
    name: string;
    relative_path: string;
    updated_at: string;
    size: number;
  }>;
  last_query?: {
    status: "idle" | "ok" | "fallback" | "error";
    checked_at?: string;
    question?: string;
    role_hint?: string;
    hit_count?: number;
    top_score?: number;
    confidence?: string;
    fallback_reason?: string;
    model?: string;
    latency_ms?: number;
    error?: string;
  };
  minimax?: {
    configured: boolean;
    model: string;
    api_style: string;
    base_url: string;
  };
};

export type KbQueryPayload = {
  question: string;
  scene_hint?: string;
  role_hint?: string;
  top_k?: number;
  kb_snapshot_id?: string;
};

const kbApiBase = (import.meta.env.VITE_KB_API_BASE || "").replace(/\/$/, "");

export async function queryKnowledgeHealth(): Promise<KbHealthResponse> {
  const response = await fetch(`${kbApiBase}/api/kb/health`);

  if (!response.ok) {
    throw new Error(`知识库状态检查失败：${response.status}`);
  }

  return response.json();
}

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
