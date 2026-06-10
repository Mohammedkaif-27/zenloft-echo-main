import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

const PhilosophySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-36 px-6" ref={ref}>
      <div className="max-w-[900px] mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-space text-[11px] text-primary tracking-[0.25em] uppercase mb-10"
        >
          we're more than just developers
        </motion.p>

        <h2 className="font-clash font-bold text-foreground">
          <span className="text-3xl sm:text-4xl md:text-[56px] leading-[1.1] block">
            <WordReveal text="we're innovators, builders," />
          </span>
          <span className="text-2xl sm:text-3xl md:text-[40px] leading-[1.2] block mt-2">
            <WordReveal text="and problem solvers." startDelay={0.3} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-satoshi text-lg text-muted-foreground leading-[1.9] max-w-[680px] mx-auto mt-10"
        >
          Zenloft Studio specializes in turning bold ideas into
          extraordinary digital products that outperform expectations.
          From premium websites to AI-powered systems, we build
          technology that gives businesses an unfair advantage.
        </motion.p>
      </div>
    </section>
  );
};

export default PhilosophySection;
