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
      <div className="md:ml-[200px] flex flex-col min-h-screen pb-[58px]">
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* Fixed bottom reserve banner */}
      <Link
        to="/reserve"
        className="fixed bottom-0 left-0 right-0 md:left-[200px] z-40 flex items-center justify-center gap-5 group bg-[#4F6A7B] hover:bg-[#3d5562] transition-colors duration-300"
        style={{ height: "58px" }}
      >
        <span className="font-['Montserrat'] tracking-[5px] text-white" style={{ fontSize: "13px" }}>
          ご予約はこちら
        </span>
        <ArrowRight size={15} className="text-white/70 group-hover:translate-x-1 transition-transform duration-200" />
      </Link>
    </div>
  );
}
