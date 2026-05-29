import { Outlet, useLocation, Link } from "react-router";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SideNav } from "./SideNav";

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on mouse devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let x = -100, y = -100;
    let rx = -100, ry = -100;
    let animId: number;

    const animate = () => {
      rx += (x - rx) * 0.13;
      ry += (y - ry) * 0.13;
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top  = `${y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top  = `${ry}px`;
      }
      animId = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };

    const onEnter = () => {
      dotRef.current?.classList.remove("is-hidden");
      ringRef.current?.classList.remove("is-hidden");
    };
    const onLeave = () => {
      dotRef.current?.classList.add("is-hidden");
      ringRef.current?.classList.add("is-hidden");
    };
    const onHoverStart = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("a, button, [role='button']")) {
        ringRef.current?.classList.add("is-hovering");
      }
    };
    const onHoverEnd = () => ringRef.current?.classList.remove("is-hovering");

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onHoverStart);
    document.addEventListener("mouseout", onHoverEnd);
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onHoverStart);
      document.removeEventListener("mouseout", onHoverEnd);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot is-hidden" />
      <div ref={ringRef} className="cursor-ring is-hidden" />
    </>
  );
}

export function MainLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen font-sans">
      <CustomCursor />
      {/* Mobile header (md:hidden set inside Header) */}
      <Header />

      {/* Desktop fixed sidebar */}
      <SideNav />

      {/* Main content — pushed right by sidebar on desktop */}
      <div className="md:ml-[210px] flex flex-col min-h-screen pb-[80px] md:pb-[100px]">
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* Fixed bottom reserve banner — matches Group_5.svg design */}
      <Link
        to="/reserve"
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-4 group hover:opacity-95 transition-opacity duration-300"
        style={{
          height: "80px",
          background: "linear-gradient(to right, #8AAFC4, #6FAFAA)",
          boxShadow: "0 -8px 28px rgba(79, 106, 123, 0.22)",
        }}
      >
        <span className="font-['Hiragino_UD_Sans_Std:W4',sans-serif] tracking-[5px] text-white" style={{ fontSize: "clamp(13px, 2vw, 17px)" }}>
          ご予約はこちら
        </span>
        <ArrowRight size={18} className="text-white/80 group-hover:translate-x-1.5 transition-transform duration-200" />
      </Link>
    </div>
  );
}
