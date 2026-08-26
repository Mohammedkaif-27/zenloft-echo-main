/**
 * Chat Service — uses Groq SDK with llama-3.1-8b-instant
 * Provides RAG-augmented chat with ZenLoft brand voice.
 * Uses the cheapest, fastest model to minimize credit usage.
 */

import Groq from "groq-sdk";
import { retrieveContext, detectBuyingIntent } from "./rag.js";
import { getLocalizedPricing } from "./geoPricing.js";

const SYSTEM_PROMPT = `You are the ZenLoft Studio AI Assistant — a friendly, knowledgeable, and professional representative of ZenLoft Studio, a premium digital agency based in Hyderabad, India.

## Your Personality
- Warm, confident, and approachable
- Professional but not corporate — think modern startup vibe
- Concise and helpful — avoid long walls of text
- Use bold (**text**) for emphasis and line breaks for readability

## Company Facts
- **Founder:** Mohammed Kaif
- **Location:** Hyderabad, India
- **Founded:** 2025
- NEVER mention any other founder name. The ONLY founder is Mohammed Kaif.

## Your Knowledge
You know everything about ZenLoft Studio: services, pricing, portfolio, process, team, and technology stack. Use the provided CONTEXT to answer accurately.

## Pricing Behavior
- Show prices in the user's LOCAL CURRENCY first (the one provided in the PRICING section)
- If the user is in India, show INR prices
- If the user is outside India, show their local currency prices. Optionally mention the INR equivalent.
- If pricing is shown in USD due to location detection failure, present it naturally without mentioning detection issues
- Always mention that pricing is approximate and depends on project requirements
- Encourage booking a free consultation for custom quotes
- NEVER make up prices — only use the data provided
- IMPORTANT: When listing prices for services, ALWAYS output them in this exact format so the UI can render premium cards:
[PRICING]
[
  {"service": "Starter Website", "price": "€180 – €700"},
  {"service": "Business Website", "price": "€700 – €1800"}
]
[/PRICING]

## Lead Capture
When a user shows buying intent (asking for quotes, wanting to start a project, discussing budgets), naturally encourage them to share:
- Their name
- Email address
- What they need built
Signal this by including [LEAD_CAPTURE] at the end of your response (the frontend will show a lead form).

## Rules
- NEVER pretend to be a human
- NEVER make up information not in the context
- For questions outside ZenLoft's domain, politely redirect to the company's services
- Keep responses under 200 words unless the user asks for detail
- Always end with a helpful follow-up question or CTA`;

let groqClient: Groq | null = null;

function getGroq(): Groq | null {
  if (groqClient) return groqClient;
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === "YOUR_GROQ_API_KEY_HERE") {
    console.warn("⚠️ Groq: No API key configured. AI chat will use fallback mode.");
    return null;
  }
  groqClient = new Groq({ apiKey });
  return groqClient;
}

export interface ChatRequest {
  message: string;
  history?: { role: "user" | "model"; content: string }[];
  countryCode?: string;
}

export interface ChatResponse {
  response: string;
  showLeadForm: boolean;
  sources: string[];
}

/**
 * Generate a chat response using Groq (llama-3.1-8b-instant) + RAG context
 */
export async function generateChatResponse(req: ChatRequest): Promise<ChatResponse> {
  const { message, history = [], countryCode = "IN" } = req;

  // Retrieve relevant knowledge
  const context = retrieveContext(message, 3);
  const hasBuyingIntent = detectBuyingIntent(message);

  // Get pricing context if query is pricing-related
  let pricingContext = "";
  const pricingKeywords = ["cost", "price", "pricing", "budget", "quote", "package", "rate", "charge", "fee", "how much", "estimate"];
  const isPricingQuery = pricingKeywords.some((kw) => message.toLowerCase().includes(kw));

  if (isPricingQuery) {
    try {
      const pricing = await getLocalizedPricing(countryCode || null);
      const isINR = pricing.currency === "INR";
      pricingContext = `\n\nCURRENT PRICING (User country: ${pricing.countryName}, Currency: ${pricing.currency} ${pricing.symbol})`;
      if (pricing.fallbackMode === "usd") {
        pricingContext += ` [Note: Showing USD because location detection was unavailable]`;
      } else if (pricing.fallbackMode === "inr") {
        pricingContext += ` [Note: Showing base INR pricing because exchange rates are unavailable]`;
      }
      pricingContext += `:\n`;
      for (const [, service] of Object.entries(pricing.services) as any[]) {
        pricingContext += `\n${service.name}:\n`;
        for (const pkg of service.packages) {
          const localMin = `${pkg.symbol}${pkg.minLocal.toLocaleString()}`;
          const localMax = `${pkg.symbol}${pkg.maxLocal.toLocaleString()}`;
          const unit = pkg.unit === "month" ? "/month" : "";
          pricingContext += `  • ${pkg.name}: ${localMin}–${localMax}${unit}`;
          if (!isINR) {
            const inrMin = `₹${pkg.minINR.toLocaleString("en-IN")}`;
            const inrMax = `₹${pkg.maxINR.toLocaleString("en-IN")}`;
            pricingContext += ` (INR: ${inrMin}–${inrMax}${unit})`;
          }
          pricingContext += `\n`;
        }
      }
      pricingContext += `\nPricing shown using current exchange rates. Final pricing depends on project requirements.\n`;
    } catch {
      // Pricing context unavailable — continue without it
    }
  }

  // Build RAG context string
  const ragContext = context.length > 0
    ? context.map((c) => `[${c.category}] ${c.question}\n${c.answer}`).join("\n\n---\n\n")
    : "No specific context found. Use your general knowledge about ZenLoft Studio.";

  const groq = getGroq();

  // Fallback mode (no API key)
  if (!groq) {
    const fallbackResponse = context.length > 0
      ? context[0].answer
      : "I'd be happy to help! For detailed information, please reach out to us at **zenloftstudio@gmail.com** or via **WhatsApp at +91 8520030086**.";

    return {
      response: fallbackResponse,
      showLeadForm: hasBuyingIntent,
      sources: context.map((c) => c.id),
    };
  }

  // Build messages for Groq (OpenAI-compatible format)
  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  // Add conversation history (last 10 messages to save tokens)
  for (const msg of history.slice(-10)) {
    const text = (msg.content || "").trim();
    if (!text) continue;
    messages.push({
      role: msg.role === "user" ? "user" : "assistant",
      content: text,
    });
  }

  // Add the current user message with RAG context
  const contextPrompt = `CONTEXT FROM KNOWLEDGE BASE:\n${ragContext}${pricingContext}\n\n---\n\nUSER MESSAGE: ${message}${hasBuyingIntent ? "\n\n[Note: User shows buying intent. Encourage lead capture naturally.]" : ""}`;
  messages.push({ role: "user", content: contextPrompt });

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages,
      temperature: 0.7,
      max_tokens: 800,
      top_p: 0.9,
    });

    let responseText = completion.choices[0]?.message?.content || "";

    // Check if model signaled lead capture
    const showLeadForm = hasBuyingIntent || responseText.includes("[LEAD_CAPTURE]");
    responseText = responseText.replace(/\[LEAD_CAPTURE\]/g, "").trim();

    console.log("✅ [GROQ] Response generated successfully");

    return {
      response: responseText,
      showLeadForm,
      sources: context.map((c) => c.id),
    };
  } catch (err) {
    console.error("Groq API error:", err);
    // Fall back to RAG-only response
    return {
      response: context.length > 0
        ? context[0].answer
        : "I'm having trouble connecting right now. Please try again or reach out at **zenloftstudio@gmail.com**.",
      showLeadForm: hasBuyingIntent,
      sources: context.map((c) => c.id),
    };
  }
}
