import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

/* slug mapping for the 6 service categories */
const serviceSlugMap: Record<string, string> = {
  "Website Development": "website-development",
  "Digital Marketing": "digital-marketing",
  "Social Media Management": "social-media-management",
  "Branding & Design": "branding-design",
  "Content Creation": "content-creation",
  "AI & Business Automation": "ai-automation",
};

const services = [
  "Website Development",
  "Digital Marketing",
  "Social Media Management",
  "Branding & Design",
  "Content Creation",
  "AI & Business Automation",
];

/* ── Typing label ── */
const TypingLabel = ({ text, inView }: { text: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setCount(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [inView, text]);

  return (
    <span className="inline-flex items-center">
      <span>{text.slice(0, count)}</span>
      <span
        className="inline-block ml-0.5"
        style={{
          width: 2,
          height: 14,
          background: "hsl(var(--accent))",
          animation: "blink-cursor 0.8s step-end infinite",
        }}
      />
    </span>
  );
};

/* ── Word reveal (body text) ── */
const WordReveal = ({ text, inView }: { text: string; inView: boolean }) => {
  const words = text.split(" ");
  return (
    <span className="inline">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ── Headline line component ── */
interface HeadlineLineProps {
  children: string;
  depth: number;
  delay: number;
  inView: boolean;
  isCyan?: boolean;
}

const HeadlineLine = ({ children, depth, delay, inView, isCyan }: HeadlineLineProps) => (
  <motion.span
    className="block"
    initial={{ rotateX: -80, y: 40, opacity: 0 }}
    animate={inView ? { rotateX: 0, y: 0, opacity: 1 } : {}}
    transition={{ duration: 0.8, delay, ease: [0.34, 1.1, 0.64, 1] }}
    style={{
      perspective: 500,
      transformStyle: "preserve-3d",
      transform: `translateZ(${depth}px)`,
      willChange: "transform",
    }}
    data-depth={depth}
    data-headline="true"
  >
    {children}
    {isCyan && inView && (
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={{ textShadow: "0 0 0px hsl(var(--primary))" }}
        animate={{
          textShadow: [
            "0 0 0px hsl(var(--primary))",
            "0 0 40px hsl(var(--primary))",
            "0 0 12px hsl(var(--primary))",
          ],
        }}
        transition={{ duration: 0.8, delay: delay + 0.8, ease: "easeOut" }}
        aria-hidden="true"
        style={{ color: "transparent" }}
      />
    )}
  </motion.span>
);

/* ── Service row ── */
const ServiceRow = ({ name, index, sectionInView }: { name: string; index: number; sectionInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const slug = serviceSlugMap[name];

  const rowContent = (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={sectionInView ? { opacity: 1, x: 0 } : {}}
      whileHover={{
        x: 8,
        rotateX: -3,
        rotateY: 2,
        z: 12,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="service-row group relative"
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shine sweep overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isHovered ? {
          opacity: 1,
          backgroundPosition: ["200% 0", "-200% 0"],
        } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(0,229,255,0.06) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
      />

      <span className="service-name font-satoshi font-medium text-lg relative z-[1]">
        {name}
      </span>
      <ArrowUpRight
        size={16}
        className="text-primary opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 shrink-0 relative z-[1]"
      />
    </motion.div>
  );

  if (slug) {
    return <Link to={`/services/${slug}`}>{rowContent}</Link>;
  }
  return rowContent;
};

/* ── Main section ── */
const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-100px" });
  const rightRef = useRef<HTMLDivElement>(null);
  const rightInView = useInView(rightRef, { once: true, margin: "-50px" });

  const mouseRef = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);
  const [isHovering, setIsHovering] = useState(false);

  const lerp = useCallback((a: number, b: number, t: number) => a + (b - a) * t, []);

  useEffect(() => {
    const section = sectionRef.current;
    const container = leftContainerRef.current;
    if (!section || !container) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseRef.current = { x, y };
      targetRotation.current = { x: y * -4, y: x * 6 };
      setIsHovering(true);
    };

    const onLeave = () => {
      setIsHovering(false);
      targetRotation.current = { x: 0, y: 0 };
      mouseRef.current = { x: 0, y: 0 };
    };

    const animate = () => {
      currentRotation.current.x = lerp(currentRotation.current.x, targetRotation.current.x, 0.06);
      currentRotation.current.y = lerp(currentRotation.current.y, targetRotation.current.y, 0.06);
      currentMouse.current.x = lerp(currentMouse.current.x, mouseRef.current.x, 0.06);
      currentMouse.current.y = lerp(currentMouse.current.y, mouseRef.current.y, 0.06);

      container.style.transform = `rotateX(${currentRotation.current.x}deg) rotateY(${currentRotation.current.y}deg)`;

      const lines = container.querySelectorAll<HTMLElement>("[data-headline]");
      lines.forEach((line) => {
        const depth = parseFloat(line.dataset.depth || "0");
        const tx = currentMouse.current.x * depth * 0.04;
        const ty = currentMouse.current.y * depth * 0.03;
        line.style.transform = `translateZ(${depth}px) translateX(${tx}px) translateY(${ty}px)`;
      });

      const bodyEl = container.querySelector<HTMLElement>("[data-body-text]");
      if (bodyEl) {
        const btx = currentMouse.current.x * 0.008 * 30;
        const bty = currentMouse.current.y * 0.006 * 30;
        bodyEl.style.transform = `translateX(${btx}px) translateY(${bty}px)`;
      }

      const orbs = sectionRef.current?.querySelectorAll<HTMLElement>("[data-orb]");
      orbs?.forEach((orb) => {
        const ox = currentMouse.current.x * 0.02 * 40;
        const oy = currentMouse.current.y * 0.02 * 40;
        orb.style.setProperty("--mouse-x", `${ox}px`);
        orb.style.setProperty("--mouse-y", `${oy}px`);
      });

      rafId.current = requestAnimationFrame(animate);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [lerp]);

  return (
    <section ref={sectionRef} id="services" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[hsl(var(--surface))] overflow-hidden">
      {/* Floating orbs */}
      <div
        data-orb
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          left: "5%",
          top: "10%",
          zIndex: 0,
          background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "orb-drift-1 8s ease-in-out infinite alternate",
          transform: "translate(var(--mouse-x, 0px), var(--mouse-y, 0px))",
        }}
      />
      <div
        data-orb
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          right: "10%",
          top: "5%",
          zIndex: 0,
          background: "radial-gradient(circle, rgba(123,47,255,0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "orb-drift-2 10s ease-in-out infinite alternate",
          transform: "translate(var(--mouse-x, 0px), var(--mouse-y, 0px))",
        }}
      />

      <div className="relative z-[1] max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-16">
        {/* Left column */}
        <div ref={leftRef} className="md:w-[40%]">
          <div
            ref={leftContainerRef}
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
              transition: !isHovering ? "transform 1s cubic-bezier(0.16,1,0.3,1)" : "none",
            }}
          >
            <p className="font-space text-[11px] text-primary tracking-[0.2em] uppercase mb-6">
              <TypingLabel text="Services we provide" inView={leftInView} />
            </p>

            <h2 className="font-clash font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[0.95] relative">
              <HeadlineLine depth={60} delay={0} inView={leftInView}>
                Everything
              </HeadlineLine>
              <HeadlineLine depth={40} delay={0.12} inView={leftInView}>
                your
              </HeadlineLine>
              <HeadlineLine depth={80} delay={0.24} inView={leftInView}>
                business
              </HeadlineLine>
              <HeadlineLine depth={100} delay={0.36} inView={leftInView} isCyan>
                needs.
              </HeadlineLine>
            </h2>

            <p
              className="font-satoshi text-base text-muted-foreground leading-[1.8] mt-6 max-w-sm"
              data-body-text
              style={{ willChange: "transform" }}
            >
              <WordReveal
                text="From concept to launch and beyond. Every service delivered to the highest standard."
                inView={leftInView}
              />
            </p>
          </div>
        </div>

        {/* Right column */}
        <div ref={rightRef} className="md:w-[60%]" style={{ perspective: 800 }}>
          {services.map((s, i) => (
            <ServiceRow key={s} name={s} index={i} sectionInView={rightInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
