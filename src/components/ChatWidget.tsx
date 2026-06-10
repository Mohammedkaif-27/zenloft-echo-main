import { useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, RotateCcw, ArrowUpRight, User, Mic, MicOff } from "lucide-react";
import { useChatBot, type ChatMessage, type LeadData } from "@/hooks/useChatBot";
import { useVoice, isVoiceSupported } from "@/hooks/useVoice";
import { useState } from "react";
import { AssistantAvatar } from "@/components/ui/AssistantAvatar";
import { usePricing } from "@/hooks/usePricing";
import { PricingCard } from "@/components/ui/PricingCard";

/* ── Voice Waveform Animation ── */
const VoiceWaveform = () => (
  <div className="flex items-center gap-[3px] h-4">
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full bg-primary"
        animate={{ height: ["6px", "16px", "6px"] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

/* ── Message Bubble ── */
const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"} mb-4`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
          isUser
            ? "bg-primary/20 border border-primary/30"
            : "bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)]"
        }`}
      >
        {isUser ? (
          <User size={13} className="text-primary" />
        ) : (
          <AssistantAvatar size={16} />
        )}
      </div>

      {/* Bubble and Timestamp */}
      <div className={`max-w-[80%] flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`w-full rounded-xl px-4 py-3 text-[13px] leading-[1.6] ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-foreground rounded-bl-sm"
          }`}
        >
          {(() => {
            const content = message.content;
            const hasPricing = content.includes("[PRICING]");
            
            // Helper to render text with bold support
            const renderText = (text: string) =>
              text.split("\n").map((line, i) => (
                <p key={i} className={i > 0 ? "mt-1.5 min-h-[1rem]" : "min-h-[1rem]"}>
                  {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={j} className="font-semibold">
                        {part.slice(2, -2)}
                      </strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </p>
              ));

            if (!hasPricing) {
              return renderText(content);
            }

            // Split content by [PRICING]...[/PRICING] blocks and render each segment
            const segments: Array<{ type: "text" | "pricing"; data: any }> = [];
            let remaining = content;

            while (remaining.length > 0) {
              const startIdx = remaining.indexOf("[PRICING]");
              if (startIdx === -1) {
                // No more pricing blocks — rest is text
                if (remaining.trim()) segments.push({ type: "text", data: remaining.trim() });
                break;
              }

              // Text before the pricing block
              const before = remaining.substring(0, startIdx).trim();
              if (before) segments.push({ type: "text", data: before });

              const endIdx = remaining.indexOf("[/PRICING]", startIdx);
              if (endIdx === -1) {
                // Malformed — treat rest as text
                segments.push({ type: "text", data: remaining.substring(startIdx).trim() });
                break;
              }

              const jsonStr = remaining.substring(startIdx + "[PRICING]".length, endIdx).trim();
              try {
                const parsed = JSON.parse(jsonStr);
                segments.push({ type: "pricing", data: parsed });
              } catch {
                // Parse failed — skip this block
              }

              remaining = remaining.substring(endIdx + "[/PRICING]".length);
            }

            return (
              <div className="flex flex-col gap-2">
                {segments.map((seg, i) =>
                  seg.type === "text" ? (
                    <div key={i}>{renderText(seg.data)}</div>
                  ) : (
                    <div key={i} className="grid gap-2 my-1">
                      {(seg.data as Array<{ service: string; price: string }>).map((pkg, j) => (
                        <PricingCard key={j} service={pkg.service} price={pkg.price} />
                      ))}
                    </div>
                  )
                )}
              </div>
            );
          })()}
        </div>
        {message.content.length > 0 && (
          <span className="text-[9px] font-space text-muted-foreground/60 px-1 uppercase tracking-wider">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </motion.div>
  );
};

/* ── Typing Indicator ── */
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex gap-2.5 mb-4"
  >
    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)]">
      <AssistantAvatar size={16} />
    </div>
    <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  </motion.div>
);

/* ── Lead Capture Form ── */
const LeadCaptureForm = ({
  onSubmit,
  onDismiss,
}: {
  onSubmit: (data: LeadData) => void;
  onDismiss: () => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [brief, setBrief] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onSubmit({ name, email, projectType, brief });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="mb-4 mx-2"
    >
      <div className="bg-[rgba(0,229,255,0.04)] border border-primary/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-space text-[10px] text-primary uppercase tracking-widest">
            Quick Project Brief
          </p>
          <button
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={14} />
          </button>
        </div>
        <p className="font-satoshi text-xs text-muted-foreground mb-3">
          Share your details and we'll reach out within 24 hours.
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="Your name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-background/60 border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none transition-colors"
          />
          <input
            type="email"
            placeholder="Email address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-background/60 border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none transition-colors"
          />
          <input
            type="text"
            placeholder="Project type (optional)"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full bg-background/60 border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none transition-colors"
          />
          <textarea
            placeholder="Brief description (optional)"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={2}
            className="w-full bg-background/60 border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none transition-colors resize-none"
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-satoshi font-semibold text-xs py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Submit & Get a Call Back
          </button>
        </form>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════
   MAIN CHAT WIDGET
   ═══════════════════════════════════════ */
const ChatWidget = () => {
  const {
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
  } = useChatBot();

   const {
    voiceState,
    transcript,
    startListening,
    stopListening,
  } = useVoice();

  // FIX 2 & 3: Actually call usePricing so the frontend triggers location detection!
  const { pricing, countryName, currency, rate, fallbackMode } = usePricing();

  useEffect(() => {
    if (pricing) {
      console.log("=== PRICING DEBUG ===");
      console.log(`Detected Country: ${countryName}`);
      console.log(`Detected Currency: ${currency}`);
      console.log(`Exchange Rate: ${rate}`);
      console.log(`Fallback Mode: ${fallbackMode}`);
      console.log("Converted Prices:");
      Object.values(pricing.services).forEach((s: any) => {
        s.packages.forEach((pkg: any) => {
          console.log(`  ${pkg.name}: ${pricing.symbol}${pkg.minLocal.toLocaleString()}`);
        });
      });
      console.log("=====================");
    }
  }, [pricing, countryName, currency, rate, fallbackMode]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showLeadForm]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const text = input;
      setInput("");
      const response = await sendMessage(text);
    }
  };

  const handleSuggestion = async (q: string) => {
    const response = await sendMessage(q);
  };

  const handleVoiceInput = () => {
    if (voiceState === "listening") {
      stopListening();
    } else {
      startListening(async (text) => {
        await sendMessage(text);
      });
    }
  };

  // Voice state label
  const voiceStatusLabel =
    voiceState === "listening" ? "Listening..." :
    voiceState === "processing" ? "Processing..." : null;

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center
              bg-gradient-to-br from-primary to-[hsl(200,100%,45%)]
              shadow-[0_4px_24px_rgba(0,229,255,0.3)]
              hover:shadow-[0_6px_32px_rgba(0,229,255,0.45)] hover:scale-105
              active:scale-95 transition-all duration-200 group"
            aria-label="Open chat assistant"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping opacity-30" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[60]
              w-[calc(100vw-2rem)] sm:w-[400px] h-[min(600px,calc(100vh-2rem))] sm:h-[min(560px,calc(100vh-32px))]
              rounded-2xl overflow-hidden
              bg-background/95 backdrop-blur-xl
              border border-[rgba(255,255,255,0.08)]
              shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,229,255,0.08)]
              flex flex-col"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-transparent">
                  <AssistantAvatar size={36} />
                </div>
                <div>
                  <p className="font-clash font-bold text-sm text-foreground leading-tight">
                    ZenLoft Assistant
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${useGemini ? "bg-emerald-400" : "bg-amber-400"} animate-pulse`} />
                    <span className="font-space text-[10px] text-muted-foreground">
                      {useGemini ? "AI Powered" : "Online"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-all"
                  title="Clear chat"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-all"
                  title="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ── Voice Status Bar ── */}
            <AnimatePresence>
              {voiceStatusLabel && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 py-2 border-b border-[rgba(255,255,255,0.04)] bg-primary/5 flex items-center justify-center gap-2"
                >
                  <VoiceWaveform />
                  <span className="font-space text-[10px] text-primary uppercase tracking-widest">
                    {voiceStatusLabel}
                  </span>
                  {transcript && (
                    <span className="font-satoshi text-xs text-foreground/70 truncate max-w-[200px]">
                      {transcript}
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Messages Area ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(255,255,255,0.1)] overscroll-contain">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>

              <AnimatePresence>
                {showLeadForm && (
                  <LeadCaptureForm
                    onSubmit={submitLead}
                    onDismiss={dismissLeadForm}
                  />
                )}
              </AnimatePresence>

              {/* Suggested questions — only show after welcome */}
              {messages.length === 1 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="flex flex-wrap gap-2 mt-2"
                >
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSuggestion(q)}
                      className="font-space text-[10px] px-3 py-2 rounded-full
                        border border-[rgba(255,255,255,0.1)] text-muted-foreground
                        hover:border-primary/40 hover:text-primary hover:bg-primary/5
                        transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Human Handoff Bar ── */}
            <div className="px-4 py-2 border-t border-[rgba(255,255,255,0.04)]">
              <a
                href="mailto:zenloftstudio@gmail.com"
                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <span className="font-space text-[10px]">Talk to a human</span>
                <ArrowUpRight
                  size={10}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>

            {/* ── Input Area ── */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-[rgba(255,255,255,0.06)]"
            >
              {/* Mic Button */}
              {isVoiceSupported && (
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                    voiceState === "listening"
                      ? "bg-red-500/20 text-red-400 animate-pulse"
                      : voiceState === "speaking"
                      ? "bg-primary/20 text-primary"
                      : "bg-[rgba(255,255,255,0.05)] text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                  title={voiceState === "listening" ? "Stop listening" : "Start speaking"}
                >
                  {voiceState === "listening" ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
              )}

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={voiceState === "listening" ? "Listening..." : "Ask about services, pricing, portfolio..."}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none font-satoshi"
                disabled={voiceState === "listening"}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-lg flex items-center justify-center
                  bg-primary/10 text-primary
                  hover:bg-primary hover:text-primary-foreground
                  disabled:opacity-30 disabled:hover:bg-primary/10 disabled:hover:text-primary
                  transition-all duration-200"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
