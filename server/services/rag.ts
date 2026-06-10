/**
 * Lightweight RAG (Retrieval-Augmented Generation) Engine
 * In-memory keyword + TF-IDF matching against the knowledge base.
 * No external vector DB required for initial deployment.
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface KnowledgeChunk {
  id: string;
  category: string;
  question: string;
  keywords: string[];
  answer: string;
}

// Load knowledge base
let knowledgeBase: KnowledgeChunk[] = [];

try {
  knowledgeBase = JSON.parse(
    readFileSync(join(__dirname, "../data/knowledge.json"), "utf-8")
  );
  console.log(`📚 RAG: Loaded ${knowledgeBase.length} knowledge chunks`);
} catch {
  console.warn("⚠️ RAG: knowledge.json not found, using empty knowledge base");
}

/** Normalize text for matching */
const normalize = (str: string): string =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();

/** Tokenize removing stop words */
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "do", "does", "did", "will", "would", "could", "should", "can",
  "i", "you", "we", "they", "he", "she", "it", "me", "my", "your",
  "to", "for", "of", "in", "on", "at", "by", "with", "from",
  "and", "or", "but", "not", "no", "so", "if", "then",
  "this", "that", "these", "those", "what", "which", "who",
  "have", "has", "had", "am", "about", "just", "very", "really",
  "please", "tell", "know", "want", "need", "like", "get",
]);

function tokenize(query: string): string[] {
  return normalize(query)
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/** Score a chunk against query tokens */
function scoreChunk(chunk: KnowledgeChunk, tokens: string[]): number {
  let score = 0;
  const nq = normalize(chunk.question);
  const na = normalize(chunk.answer);

  for (const token of tokens) {
    if (chunk.keywords.some((kw) => kw === token)) score += 10;
    else if (chunk.keywords.some((kw) => kw.includes(token) || token.includes(kw))) score += 5;
    if (nq.includes(token)) score += 3;
    if (na.includes(token)) score += 1;
  }

  const matchedKw = tokens.filter((t) =>
    chunk.keywords.some((kw) => kw.includes(t) || t.includes(kw))
  ).length;
  if (matchedKw >= 2) score += matchedKw * 3;

  return score;
}

/**
 * Retrieve the top-K most relevant knowledge chunks for a query
 */
export function retrieveContext(query: string, topK = 3): KnowledgeChunk[] {
  const tokens = tokenize(query);

  if (tokens.length === 0) {
    const greeting = knowledgeBase.find((c) => c.id === "greeting");
    return greeting ? [greeting] : [];
  }

  return knowledgeBase
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, tokens) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((item) => item.chunk);
}

/**
 * Detect buying intent from a user message
 */
export function detectBuyingIntent(query: string): boolean {
  const intentPhrases = [
    "start a project", "hire", "get started", "work with you",
    "need a website", "need help", "looking for", "interested in",
    "quote", "proposal", "estimate", "build me", "create me",
    "how to start", "ready to", "want to build", "budget",
    "let's go", "sign me up", "book a call", "schedule",
    "consultation", "cost", "price", "pricing", "package",
  ];
  const normalized = normalize(query);
  return intentPhrases.some((phrase) => normalized.includes(phrase));
}
