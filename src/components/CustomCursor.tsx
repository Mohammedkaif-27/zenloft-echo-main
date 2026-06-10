import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });
  const [hoverType, setHoverType] = useState<"default" | "project" | "link" | "text">("default");
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      const target = e.target as HTMLElement;
      const projectCard = target.closest("[data-cursor='project']");
      const link = target.closest("a, button");
      const heading = target.closest("h1, h2");

      if (projectCard) setHoverType("project");
      else if (link) setHoverType("link");
      else if (heading) setHoverType("text");
      else setHoverType("default");
    };

    const animate = () => {
      circlePos.current.x += (mouse.current.x - circlePos.current.x) * 0.15;
      circlePos.current.y += (mouse.current.y - circlePos.current.y) * 0.15;
      if (circleRef.current) {
        const size = hoverType === "project" ? 60 : hoverType === "link" ? 24 : 40;
        circleRef.current.style.transform = `translate(${circlePos.current.x - size / 2}px, ${circlePos.current.y - size / 2}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [hoverType]);

  if (isTouch) return null;

  const circleSize = hoverType === "project" ? 60 : hoverType === "link" ? 24 : hoverType === "text" ? 2 : 40;
  const circleHeight = hoverType === "text" ? 32 : circleSize;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-foreground pointer-events-none z-[9998]"
        style={{ willChange: "transform" }}
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center transition-[width,height,background,border] duration-200"
        style={{
          width: circleSize,
          height: circleHeight,
          border: hoverType === "text" ? "none" : "1.5px solid rgba(0,229,255,0.5)",
          backgroundColor:
            hoverType === "project"
              ? "rgba(0,229,255,0.1)"
              : hoverType === "link"
              ? "rgba(0,229,255,0.15)"
              : hoverType === "text"
              ? "hsl(187 100% 50%)"
              : "transparent",
          borderRadius: hoverType === "text" ? "1px" : "50%",
          willChange: "transform",
        }}
      >
        {hoverType === "project" && (
          <span className="font-space text-[9px] text-foreground">VIEW</span>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
