import { useEffect, useRef, useState } from "react";

export function useScrollReveal(options: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
} = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -60px 0px",
    once = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, visible };
}
