import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ArrowLeft, Check, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { projects } from "@/data/projectsData";
import { useSEO } from "@/hooks/useSEO";

/* ── Word reveal (reuse pattern from PhilosophySection) ── */
const WordReveal = ({ text, startDelay = 0 }: { text: string; startDelay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className="inline-flex flex-wrap">
      {text.split(" ").map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : { y: "110%" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: startDelay + i * 0.04 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ── Section reveal wrapper ── */
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

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  useSEO({
    title: project
      ? `${project.name} — ${project.category} Project | Zenloft Studio`
      : "Project Not Found | Zenloft Studio",
    description: project
      ? `${project.description} ${project.industry} ${project.projectType}. Technologies: ${project.techStack.slice(0, 4).join(", ")}.`
      : "The requested project could not be found.",
    ogUrl: project ? `https://zenloftstudio.online/works/${project.slug}` : undefined,
  });

  useEffect(() => {
    if (!project) {
      navigate("/works", { replace: true });
    }
  }, [project, navigate]);

  if (!project) return null;

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <div className="bg-background min-h-screen">
      <Navigation />

      {/* ====== 1. HERO ====== */}
      <section
        className="relative min-h-[80vh] md:min-h-screen flex items-center pt-16 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.color}14 0%, ${project.color2}1A 50%, hsl(228 50% 3%) 100%)`,
        }}
      >
        {/* Noise overlay */}
        <div className="absolute inset-0 noise-overlay pointer-events-none" />

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Left side (60%) */}
            <div className="w-full lg:w-[60%]">
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link
                  to="/works"
                  className="font-space text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 min-h-[44px] py-2"
                >
                  Works <span className="text-[rgba(255,255,255,0.2)]">/</span>{" "}
                  <span className="text-foreground">{project.name}</span>
                </Link>
              </motion.div>

              {/* Category pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6"
              >
                <span
                  className="inline-block font-space text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border"
                  style={{
                    color: project.color,
                    borderColor: `${project.color}40`,
                    backgroundColor: `${project.color}10`,
                  }}
                >
                  {project.category}
                </span>
              </motion.div>

              {/* Project name */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-clash font-extrabold text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-foreground mt-6 leading-[0.95]"
              >
                {project.name}
              </motion.h1>

              {/* Metadata row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-6 mt-6"
              >
                {[
                  { label: project.industry },
                  { label: project.projectType },
                  { label: project.year },
                ].map((item, i) => (
                  <span
                    key={i}
                    className="font-space text-[11px] text-muted-foreground tracking-wide"
                  >
                    {item.label}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-satoshi text-base text-muted-foreground leading-[1.8] mt-8 max-w-lg"
              >
                {project.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row flex-wrap gap-4 mt-10"
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-satoshi text-sm font-medium transition-all duration-200 hover:opacity-90 w-full sm:w-auto"
                  style={{
                    backgroundColor: project.color,
                    color: project.color2,
                  }}
                >
                  View Live Demo
                  <ArrowUpRight size={16} />
                </a>
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-satoshi text-sm font-medium border border-[rgba(255,255,255,0.12)] text-foreground hover:border-[rgba(255,255,255,0.3)] transition-all duration-200 w-full sm:w-auto"
                >
                  <ArrowLeft size={16} />
                  Back to Works
                </Link>
              </motion.div>
            </div>

            {/* Right side (40%) — Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="w-full lg:w-[40%]"
            >
              <div
                className="relative rounded-lg overflow-hidden border border-[rgba(255,255,255,0.08)]"
                style={{
                  boxShadow: `0 20px 60px ${project.color}15, 0 8px 24px rgba(0,0,0,0.4)`,
                }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== 2. CHALLENGE + SOLUTION ====== */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Disclaimer Banner */}
          <RevealSection className="mb-16">
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-lg">!</span>
              </div>
              <div>
                <p className="font-space text-[11px] text-primary tracking-[0.1em] uppercase mb-1">
                  Concept Project Disclaimer
                </p>
                <p className="font-satoshi text-sm text-muted-foreground leading-[1.6]">
                  This is a {project.projectType.toLowerCase()} built by Zenloft Studio to demonstrate our design, engineering, and strategic capabilities within the {project.industry} space. It is not affiliated with a real brand or client.
                </p>
              </div>
            </div>
          </RevealSection>

          <div className="flex flex-col md:flex-row gap-16">
            {/* Left — Challenge */}
            <RevealSection className="md:w-1/2">
              <p className="font-space text-[11px] text-primary tracking-[0.2em] uppercase mb-6">
                Problem Statement
              </p>
              <p className="font-satoshi text-base text-muted-foreground leading-[1.8]">
                {project.challenge}
              </p>
            </RevealSection>

            {/* Right — Solution */}
            <RevealSection className="md:w-1/2" delay={0.15}>
              <p className="font-space text-[11px] text-primary tracking-[0.2em] uppercase mb-6">
                Proposed Solution
              </p>
              <p className="font-satoshi text-base text-muted-foreground leading-[1.8]">
                {project.solution}
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ====== 3. RESULTS & LEARNINGS ====== */}
      <section className="py-24 md:py-32 px-6 bg-[hsl(var(--surface))]">
        <div className="max-w-[900px] mx-auto text-center">
          <RevealSection>
            <p className="font-space text-[11px] text-primary tracking-[0.25em] uppercase mb-10">
              Expected Impact
            </p>
            <h2 className="font-clash font-bold text-foreground">
              <span className="text-3xl md:text-[40px] leading-[1.2] block">
                <WordReveal text={project.results} />
              </span>
            </h2>
            </RevealSection>

            {project.keyLearnings && (
              <RevealSection delay={0.2} className="mt-16 text-left max-w-2xl mx-auto">
                <div className="border-t border-[rgba(255,255,255,0.06)] pt-12">
                  <p className="font-space text-[11px] text-primary tracking-[0.25em] uppercase mb-6">
                    Key Learnings
                  </p>
                  <p className="font-satoshi text-base text-muted-foreground leading-[1.8]">
                    {project.keyLearnings}
                  </p>
                </div>
              </RevealSection>
            )}
          </div>
        </section>

      {/* ====== 4. DELIVERABLES + TECH STACK ====== */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-16">
          {/* Left — Deliverables */}
          <RevealSection className="sm:w-1/2">
            <p className="font-space text-[11px] text-primary tracking-[0.2em] uppercase mb-8">
              Features Built
            </p>
            <ul className="space-y-4">
              {project.deliverables.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${project.color}20`,
                      border: `1px solid ${project.color}40`,
                    }}
                  >
                    <Check size={12} style={{ color: project.color }} />
                  </div>
                  <span className="font-satoshi text-sm text-muted-foreground">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </RevealSection>

          {/* Right — Tech Stack */}
          <RevealSection className="sm:w-1/2" delay={0.15}>
            <p className="font-space text-[11px] text-primary tracking-[0.2em] uppercase mb-8">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="font-space text-[11px] px-4 py-2 rounded-full border border-[rgba(255,255,255,0.1)] text-muted-foreground bg-[rgba(255,255,255,0.03)] hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ====== 5. PROJECT DETAILS BAR ====== */}
      <RevealSection>
        <section className="border-t border-b border-[rgba(255,255,255,0.06)] py-12 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Type", value: project.projectType },
              { label: "Industry", value: project.industry },
              { label: "Year", value: project.year },
              { label: "Duration", value: project.duration },
            ].map((item, i) => (
              <div key={i}>
                <p className="font-space text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-2">
                  {item.label}
                </p>
                <p className="font-space text-sm text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* ====== 6. NEXT PROJECT ====== */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <RevealSection>
            <p className="font-space text-[11px] text-muted-foreground tracking-[0.2em] uppercase mb-6">
              Next Project
            </p>
            <Link
              to={`/works/${nextProject.slug}`}
              className="group inline-flex flex-col items-center gap-4"
            >
              <h2 className="font-clash font-extrabold text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-foreground group-hover:text-primary transition-colors duration-300">
                {nextProject.name}
              </h2>
              <div className="flex items-center gap-2 font-space text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300">
                <span>{nextProject.tag}</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </div>
            </Link>
          </RevealSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
