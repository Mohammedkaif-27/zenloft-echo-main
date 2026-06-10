import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const whatsappMessage = [
  `*Hello, Zenloft Studio!* `,
  ``,
  `I'm interested in your services and would love to discuss a potential project.`,
  ``,
  `▸ *Name:*`,
  `▸ *Service Required:*`,
  `▸ *Project Brief:*`,
  `▸ *Budget Range:*`,
  `▸ *Preferred Timeline:*`,
  ``,
  `_Looking forward to connecting with you!_`,
].join("\n");

const whatsappUrl = `https://wa.me/918520030086?text=${encodeURIComponent(whatsappMessage)}`;

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div
        initial={{ backgroundColor: "hsl(228 50% 3%)" }}
        animate={inView ? { backgroundColor: "hsl(187 100% 50%)" } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-16 md:py-24 lg:py-36 px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.6 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="font-space text-xs tracking-[0.2em] text-[#04050A] mb-8"
        >
          YOUR JOURNEY STARTS HERE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-clash font-extrabold text-[#04050A] leading-[0.9]"
          style={{ fontSize: "clamp(32px, 8vw, 80px)" }}
        >
          Ready to Build
          <br />
          Your Empire?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.6 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="font-satoshi text-lg text-[#04050A] leading-[1.7] max-w-lg mx-auto mt-8"
        >
          Book a free strategy call. No pitch.
          No pressure. Just an honest conversation
          about what's possible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-10"
        >
          <a
            href="mailto:zenloftstudio@gmail.com"
            className="inline-flex items-center justify-center font-satoshi font-bold text-base bg-[#04050A] text-primary h-14 px-9 rounded-none hover:bg-[rgba(4,5,10,0.85)] hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(4,5,10,0.3)] transition-all duration-200 w-full sm:w-auto"
          >
            Start a Project
          </a>
          <p className="font-satoshi text-sm text-[rgba(4,5,10,0.5)] mt-4">
            or{" "}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#04050A] transition-colors inline-block py-2">
              WhatsApp us directly
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
