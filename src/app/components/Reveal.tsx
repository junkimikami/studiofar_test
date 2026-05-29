import type { ReactNode, CSSProperties } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type Variant = "up" | "down" | "left" | "right" | "fade" | "scale" | "clip" | "blur" | "scale-in";

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 900,
  className = "",
  threshold,
}: RevealProps) {
  const { ref, visible } = useScrollReveal({ threshold });
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  const t = (prop: string) => `${prop} ${duration}ms ${ease} ${delay}ms`;

  // ── Clip reveal: overflow-hidden mask + inner element rises up ──────────
  if (variant === "clip") {
    return (
      <div ref={ref} className={className} style={{ overflow: "hidden" }}>
        <div
          style={{
            transform: visible ? "translateY(0)" : "translateY(110%)",
            transition: t("transform"),
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  // ── Blur dissolve: opacity + blur + subtle lift ─────────────────────────
  if (variant === "blur") {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          opacity: visible ? 1 : 0,
          filter: visible ? "blur(0px)" : "blur(14px)",
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: `${t("opacity")}, ${t("filter")}, ${t("transform")}`,
        }}
      >
        {children}
      </div>
    );
  }

  // ── Scale-in: images/cards zoom out slightly as they settle ────────────
  if (variant === "scale-in") {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(1.06)",
          transition: `${t("opacity")}, ${t("transform")}`,
        }}
      >
        {children}
      </div>
    );
  }

  // ── Legacy variants ─────────────────────────────────────────────────────
  const HIDDEN: Record<string, CSSProperties> = {
    up:    { opacity: 0, transform: "translateY(52px)" },
    down:  { opacity: 0, transform: "translateY(-52px)" },
    left:  { opacity: 0, transform: "translateX(-52px)" },
    right: { opacity: 0, transform: "translateX(52px)" },
    fade:  { opacity: 0 },
    scale: { opacity: 0, transform: "scale(0.94)" },
  };
  const VISIBLE: CSSProperties = { opacity: 1, transform: "none" };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity ${duration}ms ${ease}, transform ${duration}ms ${ease}`,
        transitionDelay: `${delay}ms`,
        ...(visible ? VISIBLE : HIDDEN[variant]),
      }}
    >
      {children}
    </div>
  );
}
