import type { ReactNode, CSSProperties } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type Variant = "up" | "down" | "left" | "right" | "fade" | "scale";

const HIDDEN: Record<Variant, CSSProperties> = {
  up:    { opacity: 0, transform: "translateY(52px)" },
  down:  { opacity: 0, transform: "translateY(-52px)" },
  left:  { opacity: 0, transform: "translateX(-52px)" },
  right: { opacity: 0, transform: "translateX(52px)" },
  fade:  { opacity: 0 },
  scale: { opacity: 0, transform: "scale(0.94)" },
};

const VISIBLE: CSSProperties = { opacity: 1, transform: "none" };

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

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${delay}ms`,
        ...(visible ? VISIBLE : HIDDEN[variant]),
      }}
    >
      {children}
    </div>
  );
}
