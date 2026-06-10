import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import HeroParticles from "./HeroParticles";

interface WordProps {
  children: string;
  delay: number;
  from: "left" | "right" | "bottom";
  className: string;
  style?: React.CSSProperties;
  depth: number;
  isCyan?: boolean;
}

const ScatteredWord = ({ children, delay, from, className, style, depth, isCyan }: WordProps) => (
  <motion.span
    initial={{
      opacity: 0,
      rotateX: 90,
      y: 30,
    }}
    animate={{
      opacity: 1,
      rotateX: 0,
      y: 0,
    }}
    transition={{
      duration: 0.7,
      delay,
      ease: [0.34, 1.2, 0.64, 1],
    }}
    className={`absolute font-clash font-extrabold hero-word ${isCyan ? "hero-word-cyan" : ""} ${className}`}
    style={{
      ...style,
      perspective: "400px",
      transform: `translateZ(${depth}px)`,
      willChange: "transform",
    }}
    data-depth={depth}
  >
    {children}
    {isCyan && (
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={{ textShadow: "0 0 0px hsl(var(--primary))" }}
        animate={{
          textShadow: [
            "0 0 0px hsl(var(--primary))",
            "0 0 30px hsl(var(--primary))",
            "0 0 8px hsl(var(--primary))",
          ],
        }}
        transition={{ duration: 0.6, delay: delay + 0.7, ease: "easeOut" }}
        aria-hidden="true"
        style={{ color: "transparent" }}
      />
    )}
  </motion.span>
);

const PulsingDot = ({ delay }: { delay: number }) => (
  <motion.span
    animate={{ opacity: [1, 0.2, 1] }}
    transition={{ duration: 1.5, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    .
  </motion.span>
);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const [isHovering, setIsHovering] = useState(true);

  const lerp = useCallback((a: number, b: number, t: number) => a + (b - a) * t, []);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    // ── Mouse handlers (desktop) ──
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      mouseRef.current = { x, y };
      targetRotation.current = { x: y * -6, y: x * 8 };
    };

    const onLeave = () => {
      setIsHovering(false);
      targetRotation.current = { x: 0, y: 0 };
      mouseRef.current = { x: 0, y: 0 };
    };
    const onEnter = () => setIsHovering(true);

    // ── Touch handlers (mobile) ──
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (touch.clientX - centerX) / (rect.width / 2);
      const y = (touch.clientY - centerY) / (rect.height / 2);

      mouseRef.current = { x, y };
      targetRotation.current = { x: y * -6, y: x * 8 };
      setIsHovering(true);
    };

    const onTouchEnd = () => {
      setIsHovering(false);
      targetRotation.current = { x: 0, y: 0 };
      mouseRef.current = { x: 0, y: 0 };
    };

    // ── Animation loop (same for both) ──
    const animate = () => {
      currentRotation.current.x = lerp(currentRotation.current.x, targetRotation.current.x, 0.08);
      currentRotation.current.y = lerp(currentRotation.current.y, targetRotation.current.y, 0.08);
      currentMouse.current.x = lerp(currentMouse.current.x, mouseRef.current.x, 0.08);
      currentMouse.current.y = lerp(currentMouse.current.y, mouseRef.current.y, 0.08);

      if (container) {
        const rx = currentRotation.current.x;
        const ry = currentRotation.current.y;
        container.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;

        const words = container.querySelectorAll<HTMLElement>(".hero-word");
        words.forEach((word) => {
          const depth = parseFloat(word.dataset.depth || "0");
          const multiplier = depth / 100;
          const tx = currentMouse.current.x * depth * 0.15 * multiplier;
          const ty = currentMouse.current.y * depth * 0.12 * multiplier;
          word.style.transform = `translateZ(${depth}px) translateX(${tx}px) translateY(${ty}px)`;
        });
      }

      rafId.current = requestAnimationFrame(animate);
    };

    // Bind both mouse + touch
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("touchmove", onTouchMove, { passive: true });
    section.addEventListener("touchend", onTouchEnd);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("touchmove", onTouchMove);
      section.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(rafId.current);
    };
  }, [lerp]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden noise-overlay flex items-center">
      {/* Radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.04)_0%,transparent_70%)]" />

      {/* 3D Particles */}
      <HeroParticles mouseRef={mouseRef} />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        {/* Top line with pulsing dots */}
        <motion.p
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-space text-[10px] sm:text-[11px] text-muted-foreground tracking-[0.2em] text-center mb-6 md:mb-12 lg:mb-16"
        >
          design<PulsingDot delay={0} /> develop<PulsingDot delay={0.5} /> and deliver<PulsingDot delay={1} />
        </motion.p>

        {/* 3D word container — single layout for all viewports */}
        <div
          ref={containerRef}
          className="relative max-w-6xl mx-auto"
          style={{
            height: "clamp(350px, 50vh, 480px)",
            perspective: "1200px",
            transformStyle: "preserve-3d",
            transition: !isHovering ? "transform 1.2s cubic-bezier(0.16,1,0.3,1)" : "none",
          }}
        >
          {/* Row 1 — main headline */}
          <ScatteredWord delay={0.06} from="left" depth={40} className="text-foreground text-[clamp(20px,7vw,72px)]" style={{ top: "0%", left: "0%" }}>
            We
          </ScatteredWord>
          <ScatteredWord delay={0.12} from="bottom" depth={40} className="text-foreground text-[clamp(20px,7vw,72px)]" style={{ top: "0%", left: "16%" }}>
            Build
          </ScatteredWord>
          <ScatteredWord delay={0.18} from="right" depth={80} className="text-foreground text-[clamp(20px,7vw,72px)]" style={{ top: "0%", left: "38%" }}>
            Brands
          </ScatteredWord>

          {/* Row 2 */}
          <ScatteredWord delay={0.24} from="right" depth={20} className="text-foreground text-[clamp(20px,7vw,72px)]" style={{ top: "16%", right: "32%" }}>
            That
          </ScatteredWord>
          <ScatteredWord delay={0.30} from="bottom" depth={20} className="text-foreground text-[clamp(20px,7vw,72px)]" style={{ top: "16%", right: "6%" }}>
            Shape
          </ScatteredWord>
          <ScatteredWord delay={0.36} from="right" depth={20} className="text-foreground text-[clamp(20px,7vw,72px)]" style={{ top: "32%", right: "12%" }}>
            the Future.
          </ScatteredWord>

          {/* Row 3 — secondary text */}
          <ScatteredWord delay={0.42} from="left" depth={60} className="text-muted-foreground/40 text-[clamp(14px,4.5vw,48px)]" style={{ top: "52%", left: "0%" }}>
            Digital
          </ScatteredWord>
          <ScatteredWord delay={0.48} from="bottom" depth={100} isCyan className="text-primary text-[clamp(14px,4.5vw,48px)]" style={{ top: "52%", left: "18%" }}>
            solutions
          </ScatteredWord>
          <ScatteredWord delay={0.54} from="bottom" depth={30} className="text-muted-foreground/40 text-[clamp(14px,4.5vw,48px)]" style={{ top: "54%", left: "48%" }}>
            for
          </ScatteredWord>
          <ScatteredWord delay={0.60} from="right" depth={50} className="text-muted-foreground/40 text-[clamp(14px,4.5vw,48px)]" style={{ top: "52%", left: "58%" }}>
            the
          </ScatteredWord>
          <ScatteredWord delay={0.66} from="right" depth={70} className="text-muted-foreground/40 text-[clamp(14px,4.5vw,48px)]" style={{ top: "54%", right: "0%" }}>
            bold
          </ScatteredWord>

          {/* Row 4 */}
          <ScatteredWord delay={0.72} from="left" depth={40} className="text-muted-foreground/40 text-[clamp(14px,4.5vw,48px)]" style={{ top: "70%", left: "4%" }}>
            and
          </ScatteredWord>
          <ScatteredWord delay={0.78} from="bottom" depth={90} isCyan className="text-primary text-[clamp(14px,4.5vw,48px)]" style={{ top: "70%", left: "40%" }}>
            ambitious.
          </ScatteredWord>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
