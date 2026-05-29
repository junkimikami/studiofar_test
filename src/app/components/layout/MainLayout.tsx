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
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let x = -100, y = -100;
    let rx = -100, ry = -100;
    let animId: number;
    let hoverEl: Element | null = null;

    const animate = () => {
      // When hovering an element, ring gravitates to its center
      let tx = x, ty = y;
      if (hoverEl) {
        const r = hoverEl.getBoundingClientRect();
        tx = r.left + r.width / 2;
        ty = r.top + r.height / 2;
      }
      const lerp = hoverEl ? 0.20 : 0.13;
      rx += (tx - rx) * lerp;
      ry += (ty - ry) * lerp;

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

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a, button, [role='button']");
      if (el && el !== hoverEl) {
        hoverEl = el;
        const rect = el.getBoundingClientRect();
        const pad = 10;
        if (ringRef.current) {
          ringRef.current.style.width        = `${rect.width  + pad * 2}px`;
          ringRef.current.style.height       = `${rect.height + pad * 2}px`;
          ringRef.current.style.borderRadius = `${Math.min(rect.height / 2 + pad, 30)}px`;
          ringRef.current.classList.add("is-hovering");
        }
        dotRef.current?.classList.add("is-hovering");
      } else if (!el && hoverEl) {
        hoverEl = null;
        if (ringRef.current) {
          ringRef.current.style.width        = "";
          ringRef.current.style.height       = "";
          ringRef.current.style.borderRadius = "";
          ringRef.current.classList.remove("is-hovering");
        }
        dotRef.current?.classList.remove("is-hovering");
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
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
      <div className="md:ml-[210px] flex flex-col min-h-screen pb-[70px] md:pb-[90px]">
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* Fixed bottom reserve banner — matches Group_5.svg design */}
      <Link
        to="/reserve"
        className="fixed bottom-0 left-0 right-0 md:left-[210px] z-40 flex items-center justify-center gap-4 group hover:opacity-95 transition-opacity duration-300"
        style={{
          height: "70px",
          background: "linear-gradient(to right, #A6BACC, #8CBCB7)",
        }}
      >
        <span className="font-['Hiragino_UD_Sans_Std:W4',sans-serif] tracking-[4px] text-white" style={{ fontSize: "clamp(13px, 2vw, 16px)" }}>
          ご予約はこちら
        </span>
        <ArrowRight size={16} className="text-white/80 group-hover:translate-x-1 transition-transform duration-200" />
      </Link>
    </div>
  );
}
