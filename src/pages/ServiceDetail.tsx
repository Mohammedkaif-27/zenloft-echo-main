import { useParams, Link } from "react-router-dom";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ArrowLeft, Check, ChevronDown, Palette, Bot, Code2, Megaphone, Layout, Cpu, Layers, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { servicesData } from "@/data/servicesData";
import { projects } from "@/data/projectsData";
import { useSEO } from "@/hooks/useSEO";

/* ── Shared animation helpers (matches ProjectDetail / PhilosophySection) ── */
const RevealSection = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Icon map for feature cards ── */
const featureIcons: Record<string, React.ReactNode> = {
  "Custom Design": <Palette size={22} />,
  "Mobile First": <Layout size={22} />,
  "Lightning Fast": <Sparkles size={22} />,
  "SEO Ready": <ArrowUpRight size={22} />,
  "CMS Integration": <Layers size={22} />,
  "Analytics Built In": <Code2 size={22} />,
  "Secure & Scalable": <Cpu size={22} />,
  "Lifetime Support": <Check size={22} />,
  "Custom AI Agents": <Bot size={22} />,
  "WhatsApp Integration": <Megaphone size={22} />,
  "Lead Generation": <Sparkles size={22} />,
  "Workflow Automation": <Cpu size={22} />,
  "Data Processing": <Layers size={22} />,
  "API Integrations": <Code2 size={22} />,
  "Voice Assistants": <Bot size={22} />,
  "Analytics Dashboard": <Layout size={22} />,
  "Auth System": <Cpu size={22} />,
  "Payment Integration": <Sparkles size={22} />,
  "Admin Dashboard": <Layout size={22} />,
  "Real-Time Features": <Layers size={22} />,
  "API Architecture": <Code2 size={22} />,
  "Database Design": <Layers size={22} />,
  "Email System": <Megaphone size={22} />,
  "Deployment Pipeline": <ArrowUpRight size={22} />,
  "Brand Identity": <Palette size={22} />,
  "Social Media Kit": <Megaphone size={22} />,
  "Ad Creatives": <Sparkles size={22} />,
  "Pitch Decks": <Layout size={22} />,
  "Email Templates": <Megaphone size={22} />,
  "Print Materials": <Palette size={22} />,
  "Motion Graphics": <Sparkles size={22} />,
  "Brand Guidelines": <Layers size={22} />,
};

/* ── Accent gradient map ── */
const accentGradients: Record<string, string> = {
  cyan: "radial-gradient(ellipse at 30% 20%, rgba(0,229,255,0.06) 0%, transparent 70%)",
  purple: "radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.06) 0%, transparent 70%)",
  mixed: "radial-gradient(ellipse at 30% 20%, rgba(0,229,255,0.04) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)",
  gold: "radial-gradient(ellipse at 30% 20%, rgba(255,184,0,0.04) 0%, transparent 70%)",
};

/* ═══════════════════════════════════════════
   HERO GRAPHICS — pure CSS per-service
   ═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   HERO GRAPHICS — one unique animated illustration per service
   DROP THIS ENTIRE BLOCK into ServiceDetail.tsx, replacing
   everything from "const BrowserMockup" through "heroGraphics"
   ═══════════════════════════════════════════════════════════════ */

/* ── 1. WEBSITE DEVELOPMENT — Browser with animated code cursor ── */
const BrowserMockup = () => (
  <motion.div
    initial={{ opacity: 0, x: 80 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="relative w-[320px] h-[220px]"
    style={{ animation: "float 6s ease-in-out infinite" }}
  >
    <div className="w-full h-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm overflow-hidden">
      {/* Top bar */}
      <div className="h-8 flex items-center gap-1.5 px-3 border-b border-[rgba(255,255,255,0.06)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <div className="ml-3 flex-1 h-4 rounded bg-[rgba(255,255,255,0.06)] flex items-center px-2">
          <span className="font-space text-[7px] text-[rgba(0,229,255,0.4)]">zenloftstudio.online</span>
        </div>
      </div>
      {/* Fake layout */}
      <div className="p-3 space-y-2">
        <motion.div
          className="h-16 rounded bg-primary/10 flex items-center justify-center"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="h-2 w-28 rounded bg-primary/30" />
        </motion.div>
        <div className="flex gap-2">
          <div className="flex-1 h-10 rounded bg-[rgba(255,255,255,0.04)]" />
          <div className="flex-1 h-10 rounded bg-[rgba(255,255,255,0.04)]" />
        </div>
        <div className="flex gap-2">
          <div className="w-1/3 h-20 rounded bg-primary/5" />
          <div className="flex-1 space-y-1.5 pt-1">
            <div className="h-2 rounded bg-[rgba(255,255,255,0.06)]" />
            <div className="h-2 w-4/5 rounded bg-[rgba(255,255,255,0.04)]" />
            <div className="h-2 w-3/5 rounded bg-[rgba(255,255,255,0.04)]" />
            {/* Blinking cursor */}
            <motion.div
              className="inline-block w-1 h-2.5 bg-primary/70 rounded-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </div>
    {/* Speed badge */}
    <motion.div
      className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full border border-[rgba(0,229,255,0.25)] bg-[rgba(0,229,255,0.08)] flex items-center gap-1.5"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.3, type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-[rgba(40,200,64,0.8)]"
        animate={{ scale: [1, 1.6, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className="font-space text-[8px] text-[rgba(0,229,255,0.7)]">100 / 100</span>
    </motion.div>
  </motion.div>
);

/* ── 2. DIGITAL MARKETING — Funnel + live metrics ── */
const MarketingFunnel = () => (
  <motion.div
    initial={{ opacity: 0, x: 80 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="relative w-[300px] h-[280px]"
    style={{ animation: "float 6s ease-in-out infinite" }}
  >
    {/* Trend line chart */}
    <div className="w-full h-[130px] rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3 mb-3 overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="font-space text-[8px] text-muted-foreground">Organic Traffic</span>
        <motion.span
          className="font-space text-[9px] text-[rgba(40,200,64,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          ↑ 142%
        </motion.span>
      </div>
      {/* SVG trend line */}
      <svg viewBox="0 0 260 70" className="w-full h-[70px]">
        {/* Grid lines */}
        {[20, 40, 60].map((y) => (
          <line key={y} x1="0" y1={y} x2="260" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
        ))}
        {/* Area fill */}
        <motion.path
          d="M0 65 L40 55 L80 48 L110 42 L140 35 L170 25 L200 18 L230 12 L260 8 L260 70 L0 70 Z"
          fill="rgba(0,229,255,0.06)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        {/* Trend line */}
        <motion.path
          d="M0 65 L40 55 L80 48 L110 42 L140 35 L170 25 L200 18 L230 12 L260 8"
          fill="none"
          stroke="rgba(0,229,255,0.5)"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        />
        {/* Dot at tip */}
        <motion.circle
          cx="260" cy="8" r="3"
          fill="rgba(0,229,255,0.8)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.2 }}
        />
      </svg>
    </div>

    {/* Metrics row */}
    <div className="grid grid-cols-3 gap-2 mb-3">
      {[
        { label: "CTR", value: "8.4%", color: "rgba(0,229,255,0.5)", delay: 1.0 },
        { label: "ROAS", value: "4.2×", color: "rgba(40,200,64,0.6)", delay: 1.1 },
        { label: "CPC", value: "₹12", color: "rgba(139,92,246,0.6)", delay: 1.2 },
      ].map((m, i) => (
        <motion.div
          key={i}
          className="rounded-md border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: m.delay }}
        >
          <span className="font-space text-[7px] text-muted-foreground block">{m.label}</span>
          <span className="font-clash font-bold text-sm" style={{ color: m.color }}>{m.value}</span>
        </motion.div>
      ))}
    </div>

    {/* Funnel stages */}
    <div className="space-y-1.5">
      {[
        { label: "Impressions", w: "100%", color: "rgba(0,229,255,0.15)", val: "48K" },
        { label: "Clicks", w: "65%", color: "rgba(0,229,255,0.22)", val: "3.1K" },
        { label: "Leads", w: "35%", color: "rgba(0,229,255,0.32)", val: "680" },
        { label: "Clients", w: "18%", color: "rgba(0,229,255,0.5)", val: "97" },
      ].map((f, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="font-space text-[7px] text-muted-foreground w-16 shrink-0">{f.label}</span>
          <div className="flex-1 h-4 rounded bg-[rgba(255,255,255,0.03)] overflow-hidden">
            <motion.div
              className="h-full rounded"
              style={{ background: f.color }}
              initial={{ width: 0 }}
              animate={{ width: f.w }}
              transition={{ duration: 0.8, delay: 1.4 + i * 0.15, ease: "easeOut" }}
            />
          </div>
          <span className="font-space text-[7px] text-muted-foreground w-6 text-right">{f.val}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

/* ── 3. SOCIAL MEDIA MANAGEMENT — Phone with live social feed ── */
const SocialFeed = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
    className="relative w-[220px] h-[320px]"
    style={{ animation: "float 6s ease-in-out infinite" }}
  >
    {/* Phone frame */}
    <div className="w-full h-full rounded-[28px] border-2 border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] overflow-hidden relative">
      {/* Notch */}
      <div className="w-16 h-4 bg-[rgba(255,255,255,0.05)] rounded-b-xl mx-auto" />
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pb-1">
        <span className="font-space text-[6px] text-muted-foreground">9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-1.5 rounded-sm border border-[rgba(255,255,255,0.2)] bg-[rgba(40,200,64,0.4)]" />
        </div>
      </div>
      {/* Story rings */}
      <div className="flex gap-2 px-3 py-1 mb-1 overflow-hidden">
        {["#00E5FF", "#8B5CF6", "#FF5F57", "#FFB800"].map((c, i) => (
          <motion.div
            key={i}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `conic-gradient(${c}60 0%, transparent 75%)`, padding: 2 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 300 }}
          >
            <div className="w-full h-full rounded-full bg-[rgba(0,0,0,0.7)]" />
          </motion.div>
        ))}
      </div>
      {/* Feed posts */}
      <div className="px-3 space-y-2 overflow-hidden">
        {[
          { color: "rgba(0,229,255,0.12)", likes: "2.4K", delay: 1.0 },
          { color: "rgba(139,92,246,0.12)", likes: "891", delay: 1.2 },
        ].map((post, i) => (
          <motion.div
            key={i}
            className="rounded-lg border border-[rgba(255,255,255,0.06)] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: post.delay }}
          >
            {/* Post image area */}
            <div className="h-20" style={{ background: post.color }} />
            {/* Post actions */}
            <div className="px-3 py-2 flex items-center gap-3 bg-[rgba(255,255,255,0.02)]">
              <motion.div
                className="flex items-center gap-1"
                animate={{ scale: i === 0 ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.4, delay: 2.5, repeat: i === 0 ? 3 : 0, repeatDelay: 4 }}
              >
                <div className="w-2.5 h-2.5 rounded-full border border-[rgba(255,95,87,0.5)]" />
                <span className="font-space text-[7px] text-muted-foreground">{post.likes}</span>
              </motion.div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded border border-[rgba(255,255,255,0.1)]" />
                <span className="font-space text-[7px] text-muted-foreground">128</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Floating engagement badge */}
    <motion.div
      className="absolute -right-6 top-16 px-2.5 py-1.5 rounded-xl border border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.1)] flex items-center gap-1.5"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.8 }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-[rgba(139,92,246,0.8)]"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="font-space text-[8px] text-[rgba(139,92,246,0.8)]">+34% reach</span>
    </motion.div>
  </motion.div>
);

/* ── 4. BRANDING & DESIGN — Logo mark with color system ── */
const BrandMark = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
    className="relative w-[280px] h-[280px]"
    style={{ animation: "float 6s ease-in-out infinite" }}
  >
    {/* Grid lines */}
    <svg viewBox="0 0 280 280" className="absolute inset-0 w-full h-full">
      {[70, 140, 210].map((v, i) => (
        <g key={i}>
          <line x1={v} y1="20" x2={v} y2="260" stroke="rgba(255,184,0,0.08)" strokeWidth={1} />
          <line x1="20" y1={v} x2="260" y2={v} stroke="rgba(255,184,0,0.08)" strokeWidth={1} />
        </g>
      ))}
    </svg>
    {/* Central brand mark */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-28 h-28 rounded-2xl border-2 border-[rgba(255,184,0,0.3)] flex items-center justify-center"
        style={{ background: "rgba(255,184,0,0.05)" }}
        animate={{ rotate: [0, 6, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="font-clash font-extrabold text-4xl text-[rgba(255,184,0,0.5)]">Z</div>
      </motion.div>
    </div>
    {/* Color palette chips */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
      {["#00E5FF", "#8B5CF6", "#FFB800", "#FF5F57", "#28C840"].map((c, i) => (
        <motion.div
          key={i}
          className="w-6 h-6 rounded-full border border-[rgba(255,255,255,0.1)]"
          style={{ background: `${c}30` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 300 }}
        />
      ))}
    </div>
    {/* Typography samples */}
    <div className="absolute top-8 left-8 space-y-1.5">
      <div className="h-2.5 w-14 rounded bg-[rgba(255,184,0,0.15)]" />
      <div className="h-1.5 w-10 rounded bg-[rgba(255,255,255,0.06)]" />
      <div className="h-1.5 w-12 rounded bg-[rgba(255,255,255,0.04)]" />
    </div>
    {/* Ruler / spacing guide */}
    <div className="absolute top-8 right-8 flex flex-col items-end gap-1">
      <div className="flex items-center gap-1">
        <div className="w-8 h-px bg-[rgba(255,184,0,0.2)]" />
        <span className="font-space text-[6px] text-[rgba(255,184,0,0.4)]">16px</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-5 h-px bg-[rgba(255,184,0,0.15)]" />
        <span className="font-space text-[6px] text-[rgba(255,184,0,0.3)]">8px</span>
      </div>
    </div>
  </motion.div>
);

/* ── 5. CONTENT CREATION — Content board (video + article + visuals) ── */
const ContentBoard = () => (
  <motion.div
    initial={{ opacity: 0, x: 80 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="relative w-[300px] h-[280px]"
    style={{ animation: "float 6s ease-in-out infinite" }}
  >
    {/* Video thumbnail card */}
    <motion.div
      className="w-full h-[110px] rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] overflow-hidden mb-2.5 relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(139,92,246,0.12)] to-[rgba(0,229,255,0.06)]" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.08)] flex items-center justify-center"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-l-[9px] border-t-transparent border-b-transparent border-l-[rgba(255,255,255,0.7)] ml-0.5" />
        </motion.div>
      </div>
      {/* Duration badge */}
      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[rgba(0,0,0,0.5)]">
        <span className="font-space text-[7px] text-white/70">0:45</span>
      </div>
      <div className="absolute top-2 left-3">
        <span className="font-space text-[7px] text-[rgba(139,92,246,0.7)] uppercase tracking-wide">Reel</span>
      </div>
    </motion.div>

    {/* Bottom row: article + visual grid */}
    <div className="flex gap-2.5">
      {/* Article card */}
      <motion.div
        className="flex-1 h-[145px] rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3 space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="h-1.5 w-8 rounded bg-[rgba(0,229,255,0.2)]" />
        <div className="h-2 w-full rounded bg-[rgba(255,255,255,0.08)]" />
        <div className="h-2 w-4/5 rounded bg-[rgba(255,255,255,0.06)]" />
        <div className="h-2 w-3/5 rounded bg-[rgba(255,255,255,0.04)]" />
        <div className="h-px w-full bg-[rgba(255,255,255,0.05)]" />
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-[rgba(0,229,255,0.1)]" />
          <div className="h-1.5 w-12 rounded bg-[rgba(255,255,255,0.05)]" />
        </div>
        <motion.div
          className="px-2 py-1 rounded bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.15)]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="font-space text-[7px] text-[rgba(0,229,255,0.6)]">SEO — 2.4K / mo</span>
        </motion.div>
      </motion.div>

      {/* Visual grid */}
      <motion.div
        className="w-[100px] h-[145px] grid grid-cols-2 gap-1.5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        {[
          "rgba(139,92,246,0.15)",
          "rgba(0,229,255,0.12)",
          "rgba(255,184,0,0.12)",
          "rgba(255,95,87,0.1)",
        ].map((bg, i) => (
          <motion.div
            key={i}
            className="rounded-md border border-[rgba(255,255,255,0.05)]"
            style={{ background: bg }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 + i * 0.1, type: "spring", stiffness: 280 }}
          />
        ))}
      </motion.div>
    </div>

    {/* Floating "Published" badge */}
    <motion.div
      className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full border border-[rgba(40,200,64,0.3)] bg-[rgba(40,200,64,0.08)] flex items-center gap-1"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-[rgba(40,200,64,0.8)]"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className="font-space text-[8px] text-[rgba(40,200,64,0.8)]">Live</span>
    </motion.div>
  </motion.div>
);

/* ── 6. AI & BUSINESS AUTOMATION — Neural network (keep original, it's perfect) ── */
const NodeNetwork = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
    className="relative w-[280px] h-[280px]"
    style={{ animation: "spin 20s linear infinite" }}
  >
    <svg viewBox="0 0 280 280" className="w-full h-full">
      {[
        [140, 60, 60, 140],
        [140, 60, 220, 140],
        [60, 140, 140, 220],
        [220, 140, 140, 220],
        [140, 60, 140, 220],
        [60, 140, 220, 140],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(139,92,246,0.25)"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.6 + i * 0.15 }}
        />
      ))}
      {[
        [140, 60], [60, 140], [220, 140], [140, 220], [90, 80], [190, 200],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx} cy={cy} r={i < 4 ? 8 : 5}
          fill={i < 4 ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.15)"}
          stroke="rgba(139,92,246,0.5)"
          strokeWidth={1}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </svg>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════
   MAP — slug → component  (update heroGraphics record)
   ═══════════════════════════════════════════════════════ */
const heroGraphics: Record<string, React.FC> = {
  "website-development": BrowserMockup,
  "digital-marketing": MarketingFunnel,
  "social-media-management": SocialFeed,
  "branding-design": BrandMark,
  "content-creation": ContentBoard,
  "ai-automation": NodeNetwork,
};


/* ═══════════════════════════════════════════
   FAQ ACCORDION
   ═══════════════════════════════════════════ */
const FAQItem = ({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <RevealSection delay={index * 0.06}>
      <div className="border-b border-[rgba(255,255,255,0.06)]">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-5 text-left min-h-[44px] group"
        >
          <span className="font-clash font-semibold text-lg text-foreground group-hover:text-primary transition-colors pr-4">
            {question}
          </span>
          <ChevronDown
            size={18}
            className={`text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
        <div
          className="overflow-hidden transition-all duration-400"
          style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}
        >
          <p className="font-satoshi text-[15px] text-muted-foreground leading-[1.7] pb-5">
            {answer}
          </p>
        </div>
      </div>
    </RevealSection>
  );
};

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */
const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find((s) => s.slug === slug);

  // Refs for sections
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  useSEO({
    title: service ? `${service.name} — Zenloft Studio` : "Service — Zenloft Studio",
    description: service?.description || "",
  });

  if (!service) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-clash font-bold text-4xl text-foreground mb-4">Service not found</h1>
            <Link to="/" className="font-space text-sm text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const HeroGraphic = heroGraphics[service.slug];
  const relatedProjects = projects
    .filter((p) => service.relatedCategories.includes(p.industry) || service.relatedCategories.includes(p.category))
    .slice(0, 3);

  return (
    <>
      <Navigation />

      {/* ════════════════════════════════════════
          SECTION 1 — SERVICE HERO
          ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] md:min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
        style={{ background: accentGradients[service.accentType] }}
      >
        {/* Noise overlay */}
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-12">
            {/* Left column — 55% */}
            <div className="w-full md:w-[55%]">
              {/* Breadcrumb */}
              <motion.nav
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-2 font-space text-xs text-muted-foreground mb-8"
              >
                <Link to="/" className="hover:text-primary transition-colors min-h-[44px] flex items-center">Home</Link>
                <span className="text-[rgba(255,255,255,0.2)]">/</span>
                <Link to="/services" className="hover:text-primary transition-colors min-h-[44px] flex items-center">Services</Link>
                <span className="text-[rgba(255,255,255,0.2)]">/</span>
                <span className="text-foreground">{service.name}</span>
              </motion.nav>

              {/* Label */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={heroInView ? { opacity: 0.6, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-space text-[11px] tracking-[0.2em] text-primary mb-4"
              >
                // {service.category}
              </motion.p>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-clash font-extrabold text-foreground leading-[0.95]"
                style={{ fontSize: "clamp(32px, 7vw, 72px)" }}
              >
                {service.headline[0]}
                <br />
                {service.headline[1]}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="font-satoshi text-[17px] text-muted-foreground leading-[1.7] max-w-[520px] mt-6"
              >
                {service.description}
              </motion.p>

              {/* Sub-services Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex flex-wrap gap-2 mt-6 max-w-[100vw] overflow-x-auto pb-2 scrollbar-hide"
              >
                {service.subServices.map((sub, idx) => (
                  <span
                    key={idx}
                    className="font-space text-[10px] px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.1)] text-muted-foreground bg-[rgba(255,255,255,0.03)]"
                  >
                    {sub}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
                <a
                  href="mailto:zenloftstudio@gmail.com"
                  className="inline-flex items-center justify-center font-satoshi font-bold text-sm bg-primary text-primary-foreground h-12 px-8 rounded-none hover:opacity-90 transition-all duration-200"
                >
                  Start This Project
                </a>
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center font-satoshi font-medium text-sm border border-[rgba(255,255,255,0.12)] text-foreground h-12 px-8 rounded-none hover:border-[rgba(255,255,255,0.3)] transition-all duration-200"
                >
                  See Related Work
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-wrap gap-6 mt-8"
              >
                {service.trustIndicators.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check size={14} className="text-primary" />
                    <span className="font-space text-[11px] text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right column — 45%, hidden on mobile */}
            <div className="hidden md:flex w-[45%] items-center justify-center">
              {HeroGraphic && <HeroGraphic />}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 2 — WHAT WE DO
          ════════════════════════════════════════ */}
      <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 bg-[rgba(255,255,255,0.02)]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left — sticky headline */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-24 lg:self-start">
            <RevealSection>
              <p className="font-space text-[11px] tracking-[0.2em] text-primary mb-4">
                // WHAT&apos;S INCLUDED
              </p>
              <h2
                className="font-clash font-bold text-foreground leading-[1.05]"
                style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
              >
                What&apos;s included in{" "}
                <span className="text-primary">{service.name}</span>
              </h2>
              <p className="font-satoshi text-[17px] text-muted-foreground leading-[1.7] mt-4">
                {service.whatWeDoIntro}
              </p>
            </RevealSection>
          </div>

          {/* Right — feature cards grid */}
          <div className="w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((f, i) => (
              <RevealSection key={i} delay={i * 0.08}>
                <div className="group p-7 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-[10px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-primary mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                    {featureIcons[f.name] || <Sparkles size={22} />}
                  </div>
                  <h3 className="font-clash font-semibold text-lg text-foreground mb-1">
                    {f.name}
                  </h3>
                  <p className="font-satoshi text-sm text-muted-foreground leading-[1.7]">
                    {f.description}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 3 — OUR PROCESS (Timeline)
          ════════════════════════════════════════ */}
      <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="font-space text-[11px] tracking-[0.2em] text-primary mb-4">
              // HOW IT WORKS
            </p>
            <h2
              className="font-clash font-bold text-foreground"
              style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
            >
              From brief to <span className="text-primary">launch.</span>
            </h2>
          </RevealSection>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)] md:-translate-x-px" />

            {service.processSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <RevealSection key={i} delay={i * 0.12} className="relative mb-12 last:mb-0">
                  <div className={`flex flex-col md:flex-row items-start ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Content card */}
                    <div className={`w-full md:w-[calc(50%-32px)] pl-14 md:pl-0 ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                      <div className="p-6 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                        <div className={`flex items-center gap-3 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                          <span className="font-space text-[11px] text-muted-foreground">
                            STEP {i + 1}
                          </span>
                          <span className="font-space text-[11px] text-primary">
                            {step.timeframe}
                          </span>
                        </div>
                        <h3 className="font-clash font-bold text-xl text-foreground mb-2">
                          {step.name}
                        </h3>
                        <p className="font-satoshi text-sm text-muted-foreground leading-[1.7] mb-3">
                          {step.description}
                        </p>
                        <ul className="space-y-1">
                          {step.deliverables.map((d, j) => (
                            <li key={j} className={`flex items-center gap-2 font-space text-[11px] text-muted-foreground ${isLeft ? "md:justify-end" : ""}`}>
                              <Check size={12} className="text-primary shrink-0" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Circle on line */}
                    <div className="absolute left-5 md:left-1/2 top-6 w-10 h-10 -translate-x-1/2 rounded-full border border-[rgba(255,255,255,0.12)] bg-background flex items-center justify-center z-10">
                      <span className="font-space text-[11px] text-primary font-bold">{i + 1}</span>
                    </div>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 4 — TECH STACK
          ════════════════════════════════════════ */}
      <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 bg-[rgba(255,255,255,0.02)]">
        <div className="max-w-4xl mx-auto text-center">
          <RevealSection>
            <p className="font-space text-[11px] tracking-[0.2em] text-primary mb-4">
              // TOOLS WE USE
            </p>
            <h2
              className="font-clash font-bold text-foreground mb-12"
              style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
            >
              Built with the <span className="text-primary">best.</span>
            </h2>
          </RevealSection>

          <div className="flex flex-wrap justify-center gap-3">
            {service.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.03,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="inline-flex items-center font-space text-xs text-muted-foreground px-4 py-2 rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-primary hover:text-foreground transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 5 — RELATED PROJECTS
          ════════════════════════════════════════ */}
      {relatedProjects.length > 0 && (
        <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <RevealSection className="mb-12">
              <p className="font-space text-[11px] tracking-[0.2em] text-primary mb-4">
                // RELATED WORK
              </p>
              <h2
                className="font-clash font-bold text-foreground"
                style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
              >
                Projects like <span className="text-primary">this.</span>
              </h2>
            </RevealSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProjects.map((project, i) => (
                <RevealSection key={project.slug} delay={i * 0.1}>
                  <Link
                    to={`/works/${project.slug}`}
                    className="group relative block h-[280px] rounded-lg overflow-hidden"
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(4,5,10,0.9)] to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
                      <div>
                        <h3 className="font-clash font-bold text-xl text-foreground">{project.name}</h3>
                        <p className="font-space text-[11px] text-muted-foreground mt-1">{project.tag}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.1)] transition-all duration-200 group-hover:bg-primary group-hover:border-primary">
                        <ArrowUpRight size={20} className="text-foreground group-hover:text-primary-foreground transition-colors" />
                      </div>
                    </div>
                  </Link>
                </RevealSection>
              ))}
            </div>

            <RevealSection delay={0.3} className="text-center mt-10">
              <Link
                to="/works"
                className="inline-flex items-center gap-2 font-space text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                View All Projects →
              </Link>
            </RevealSection>
          </div>
        </section>
      )}




      <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <RevealSection className="text-center mb-12">
            <p className="font-space text-[11px] tracking-[0.2em] text-primary mb-4">
              // COMMON QUESTIONS
            </p>
            <h2
              className="font-clash font-bold text-foreground"
              style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
            >
              Everything you need to <span className="text-primary">know.</span>
            </h2>
          </RevealSection>

          <div>
            {service.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 8 — CTA (existing component)
          ════════════════════════════════════════ */}
      <CTASection />

      <Footer />
    </>
  );
};

export default ServiceDetail;
