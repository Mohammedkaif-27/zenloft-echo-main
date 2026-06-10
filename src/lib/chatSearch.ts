/**
 * Client-side search engine for the ZenLoft knowledge base.
 * Uses keyword matching + fuzzy scoring for retrieval.
 */

import { knowledgeBase, type KnowledgeChunk } from "@/data/knowledgeBase";

/** Normalize a string for matching */
const normalize = (str: string): string =>
  str.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();

/** Tokenize a query into meaningful words */
const tokenize = (query: string): string[] => {
  const stopWords = new Set([
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
    "do", "does", "did", "will", "would", "could", "should", "can",
    "i", "you", "we", "they", "he", "she", "it", "me", "my", "your",
    "to", "for", "of", "in", "on", "at", "by", "with", "from",
    "and", "or", "but", "not", "no", "so", "if", "then",
    "this", "that", "these", "those", "what", "which", "who",
    "have", "has", "had", "am", "about", "just", "very", "really",
    "please", "tell", "know", "want", "need", "like", "get",
  ]);

  return normalize(query)
    .split(/\s+/)
    .filter((word) => word.length > 1 && !stopWords.has(word));
};

/** Calculate relevance score for a chunk against tokens */
const scoreChunk = (chunk: KnowledgeChunk, tokens: string[]): number => {
  let score = 0;
  const normalizedQuestion = normalize(chunk.question);
  const normalizedAnswer = normalize(chunk.answer);

  for (const token of tokens) {
    // Exact keyword match (highest weight)
    if (chunk.keywords.some((kw) => kw === token)) {
      score += 10;
    }
    // Partial keyword match
    else if (chunk.keywords.some((kw) => kw.includes(token) || token.includes(kw))) {
      score += 5;
    }
    // Question text match
    if (normalizedQuestion.includes(token)) {
      score += 3;
    }
    // Answer text match
    if (normalizedAnswer.includes(token)) {
      score += 1;
    }
  }

  // Bonus for multiple keyword matches (relevance boost)
  const matchedKeywords = tokens.filter((t) =>
    chunk.keywords.some((kw) => kw.includes(t) || t.includes(kw))
  ).length;
  if (matchedKeywords >= 2) score += matchedKeywords * 3;

  return score;
};

/** Detect if user is expressing buying intent */
export const detectBuyingIntent = (query: string): boolean => {
  const intentPhrases = [
    "start a project", "hire", "get started", "work with you",
    "need a website", "need help", "looking for", "interested in",
    "quote", "proposal", "estimate", "build me", "create me",
    "how to start", "ready to", "want to build", "budget",
    "let's go", "sign me up", "book a call", "schedule",
  ];
  const normalized = normalize(query);
  return intentPhrases.some((phrase) => normalized.includes(phrase));
};

/** Search the knowledge base for the best matching chunks */
export const searchKnowledgeBase = (
  query: string,
  topK: number = 3
): KnowledgeChunk[] => {
  const tokens = tokenize(query);

  if (tokens.length === 0) {
    // Return greeting if no meaningful tokens
    const greeting = knowledgeBase.find((c) => c.id === "greeting");
    return greeting ? [greeting] : [];
  }

  const scored = knowledgeBase
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, tokens) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored.map((item) => item.chunk);
};

/** Generate a response from search results */
export const generateResponse = (query: string): string => {
  const results = searchKnowledgeBase(query, 2);

  if (results.length === 0) {
    return "I'm not sure I have the answer to that specific question. For detailed inquiries, I'd recommend reaching out to our team directly at **zenloftstudio@gmail.com** or via **WhatsApp at +91 8520030086**. They'll be happy to help!\n\nIs there anything else about our services, pricing, or portfolio I can help with?";
  }

  // Return the top result's answer
  // If multiple results are relevant, combine them
  if (results.length >= 2 && results[1]) {
    const primary = results[0].answer;
    // Only add secondary if it's from a different category and highly relevant
    if (results[0].category !== results[1].category) {
      return primary;
    }
  }

  return results[0].answer;
};
