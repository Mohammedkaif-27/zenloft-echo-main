import { useState, useCallback, useRef, useEffect } from "react";
import { generateResponse, detectBuyingIntent } from "@/lib/chatSearch";
import { welcomeMessage, suggestedQuestions } from "@/data/knowledgeBase";
import { submitLeadCapture } from "@/lib/supabase";
import { API_BASE } from "@/lib/api";

export interface ChatMessage {
  id: string;
  role: "user" | "bot" | "system";
  content: string;
  timestamp: number;
}

export interface LeadData {
  name: string;
  email: string;
  projectType: string;
  brief: string;
}

/** Check if backend is available */
async function checkBackend(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

export const useChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      content: welcomeMessage,
      timestamp: Date.now(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [useGemini, setUseGemini] = useState(false);
  const messageIdCounter = useRef(1);
  const buyingIntentCount = useRef(0);

  // Check backend availability on mount
  useEffect(() => {
    checkBackend().then(setUseGemini);
  }, []);

  // We no longer persist conversation to session storage (Fix 5)
  // Chat starts fresh on every page reload

  const createMessage = useCallback(
    (role: ChatMessage["role"], content: string): ChatMessage => ({
      id: `msg-${messageIdCounter.current++}`,
      role,
      content,
      timestamp: Date.now(),
    }),
    []
  );

  /** Stream words into a message for a typing effect */
  const streamWords = useCallback(
    (msgId: string, fullText: string, onComplete?: () => void) => {
      const words = fullText.split(/(\s+)/);
      let i = 0;
      const interval = setInterval(() => {
        if (i < words.length) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msgId
                ? { ...m, content: words.slice(0, i + 1).join("") }
                : m
            )
          );
          i++;
        } else {
          clearInterval(interval);
          onComplete?.();
        }
      }, 25);
    },
    []
  );

  /**
   * Send a message — routes to Gemini backend if available, else uses client-side search
   */
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      // Add user message
      const userMsg = createMessage("user", trimmed);
      setMessages((prev) => [...prev, userMsg]);

      // Check buying intent
      if (detectBuyingIntent(trimmed)) {
        buyingIntentCount.current++;
      }

      setIsTyping(true);

      if (useGemini) {
        // ── Gemini Backend Mode ──
        try {
          let history = messages
            .filter((m) => m.role !== "system")
            .slice(-20)
            .map((m) => ({
              role: m.role === "bot" ? "model" : "user",
              content: m.content,
            }));

          // FIX: Gemini strictly requires the first history message to have role 'user'.
          // Since our chat starts with a 'bot' welcome message, we must strip any leading 'model' messages.
          while (history.length > 0 && history[0].role === "model") {
            history.shift();
          }

          // Get country code from cached pricing data for localized responses
          let countryCode: string | undefined;
          try {
            const cached = sessionStorage.getItem("zenloft-pricing");
            if (cached) {
              const parsed = JSON.parse(cached);
              countryCode = parsed.country || undefined;
            }
          } catch { /* ignore */ }

          const res = await fetch(`${API_BASE}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: trimmed, history, countryCode }),
          });

          if (res.ok) {
            const data = await res.json();
            const botMsg = createMessage("bot", "");
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);

            streamWords(botMsg.id, data.response, () => {
              if (data.showLeadForm && !leadCaptured && buyingIntentCount.current >= 1) {
                setTimeout(() => setShowLeadForm(true), 1500);
              }
            });

            // Return the response text for voice hook to speak
            return data.response;
          }
        } catch {
          // Fall through to client-side
        }
      }

      // ── Client-Side Fallback Mode ──
      const typingDelay = Math.min(300 + trimmed.length * 15, 1500);

      return new Promise<string>((resolve) => {
        setTimeout(() => {
          const response = generateResponse(trimmed);
          const botMsg = createMessage("bot", "");
          setMessages((prev) => [...prev, botMsg]);
          setIsTyping(false);

          streamWords(botMsg.id, response, () => {
            if (buyingIntentCount.current >= 1 && !leadCaptured) {
              setTimeout(() => setShowLeadForm(true), 1000);
            }
          });

          resolve(response);
        }, typingDelay);
      });
    },
    [createMessage, leadCaptured, useGemini, messages, streamWords]
  );

  const submitLead = useCallback((data: LeadData) => {
    setLeadCaptured(true);
    setShowLeadForm(false);

    // Save to Supabase (fire-and-forget — don't block the UI)
    submitLeadCapture({
      name: data.name,
      email: data.email,
      project_type: data.projectType,
      brief: data.brief,
      source: "ai_chatbot",
    }).catch((err) => console.error("Lead capture save failed:", err));

    const confirmMsg: ChatMessage = {
      id: `msg-${messageIdCounter.current++}`,
      role: "bot",
      content: `Thanks, **${data.name}**! 🎉 I've noted your project details. Our team will reach out to you at **${data.email}** within 24 hours to discuss next steps.\n\nIn the meantime, feel free to explore our [Case Studies](/works) or ask me anything else!`,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, confirmMsg]);
  }, []);

  const dismissLeadForm = useCallback(() => {
    setShowLeadForm(false);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        role: "bot",
        content: welcomeMessage,
        timestamp: Date.now(),
      },
    ]);
    buyingIntentCount.current = 0;
    setLeadCaptured(false);
    setLeadCaptured(false);
    setShowLeadForm(false);
  }, []);

  return {
    messages,
    isTyping,
    isOpen,
    setIsOpen,
    sendMessage,
    showLeadForm,
    submitLead,
    dismissLeadForm,
    clearChat,
    suggestedQuestions,
    useGemini,
  };
};
