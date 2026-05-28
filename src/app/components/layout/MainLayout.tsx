import { Outlet, useLocation, Link } from "react-router";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SideNav } from "./SideNav";

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
