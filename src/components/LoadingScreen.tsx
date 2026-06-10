import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  const progressRef = useRef(0);

  useEffect(() => {
    const duration = 2500;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // Smooth easing curve
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      progressRef.current = eased;
      setDisplayProgress(eased * 100);

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsSplitting(true);
          setTimeout(() => {
            setIsDone(true);
            onComplete();
          }, 700);
        }, 200);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Glimpse of site content behind */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute top-1/3 left-1/4 font-clash font-extrabold text-6xl text-foreground">
          We Build Brands
        </div>
        <div className="absolute top-1/2 right-1/4 font-clash font-extrabold text-4xl text-primary">
          solutions
        </div>
      </div>

      {/* Top half */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-background overflow-hidden"
        animate={isSplitting ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              className="font-clash"
              fill="none"
              stroke="hsl(187 100% 50%)"
              strokeWidth="1.5"
              fontSize="36"
              fontWeight="700"
            >
              ZL
            </text>
          </svg>
        </div>
      </motion.div>

      {/* Bottom half */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-background overflow-hidden"
        animate={isSplitting ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16">
          <span className="font-space text-5xl md:text-7xl font-bold text-foreground tabular-nums">
            {Math.floor(displayProgress)}%
          </span>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-muted/30">
          <div
            className="h-full bg-primary transition-none"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
