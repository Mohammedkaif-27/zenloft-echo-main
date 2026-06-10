import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    // Try Lenis first (used on homepage)
    const lenisInstance = (document.querySelector("[data-lenis]") as any)?.__lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-[88px] right-6 z-50 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center
            bg-background/80 backdrop-blur-md border border-[rgba(255,255,255,0.1)]
            hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]
            active:scale-95
            transition-all duration-200 group"
          aria-label="Scroll to top"
        >
          <ArrowUp
            size={18}
            className="text-muted-foreground group-hover:text-primary transition-colors duration-200"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
