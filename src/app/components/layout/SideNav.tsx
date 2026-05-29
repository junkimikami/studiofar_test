import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Instagram, ChevronDown } from "lucide-react";

const LOGO_PATHS = [
  "M37.93,218.91c-9.36-1.54-17.44-2.87-17.44-8.97,0-5.18,5.67-8.15,15.55-8.15,8.06,0,15.12,1.84,21.56,5.63l.35.2,7.16-14.18-.3-.18c-6.53-3.95-18.03-6.6-28.63-6.6-20.53,0-33.79,9.47-33.79,24.12,0,18.22,16.7,20.82,30.12,22.91,9.02,1.4,16.81,2.62,16.81,8.23,0,5.31-5.23,8.01-15.55,8.01-9.06,0-19.36-2.93-26.24-7.47l-.35-.23-7.16,14.18.27.19c7.26,5.14,20.26,8.6,32.35,8.6,10.49,0,19.28-2.24,25.42-6.47,6.13-4.22,9.37-10.23,9.37-17.37,0-17.61-16.35-20.3-29.48-22.46Z",
  "M144.78,246.76c-2.52,1.99-5.88,3.05-9.72,3.05-6.63,0-10.14-3.8-10.14-11v-35.74h20.33v-14.98h-20.33v-17.35h-18.53v68.49c0,16.75,9.43,25.97,26.54,25.97,6.86,0,13.17-1.9,17.3-5.2l.22-.17-5.26-13.39-.4.32Z",
  "M245.11,226.3c0,7.29-1.9,12.97-5.64,16.89-3.51,3.68-8.61,5.62-14.74,5.62-11.38,0-17.4-6.9-17.4-19.96v-41.33h-18.53v43.75c0,11.16,3.08,19.78,9.16,25.63,5.64,5.43,13.91,8.3,23.92,8.3s18.44-3.64,24.08-10.01v9.02h17.68v-76.69h-18.53v38.77Z",
  "M364.28,196.3c-5.79-6.3-14.09-9.62-24.08-9.62-10.91,0-20.76,3.79-27.73,10.67-7.22,7.13-11.04,17-11.04,28.53,0,23.16,15.94,39.34,38.77,39.34,10.36,0,18.9-3.51,24.79-10.16v9.16h17.82v-106.26h-18.53v38.34ZM342.33,249.24c-13.09,0-22.23-9.61-22.23-23.37s9.14-23.37,22.23-23.37,22.23,9.61,22.23,23.37-9.14,23.37-22.23,23.37Z",
  "M439.62,153.69c-6.7,0-11.75,4.75-11.75,11.04s5.05,11.04,11.75,11.04,11.75-4.82,11.75-11.47c0-6.05-5.05-10.62-11.75-10.62Z",
  "M560.59,197.66c-7.41-7.08-17.84-10.98-29.37-10.98s-21.79,3.9-29.2,10.98c-7.46,7.12-11.56,17.14-11.56,28.21,0,22.79,17.14,39.34,40.76,39.34,11.52,0,21.95-3.93,29.38-11.05,7.43-7.14,11.53-17.18,11.53-28.28s-4.09-21.11-11.53-28.21ZM547.1,242.92c-3.99,4.08-9.63,6.32-15.88,6.32-13,0-22.09-9.61-22.09-23.37s9.08-23.37,22.09-23.37c6.26,0,11.9,2.24,15.88,6.32,4.15,4.24,6.34,10.14,6.34,17.05s-2.19,12.8-6.34,17.05Z",
  "M798.25,11.4c-9.15-7.24-22.7-11.4-37.17-11.4-34.38,0-55.74,21.23-55.74,55.41v209.86h30.22v-137.04h56.24l.08-6.77c.07-6.54-.62-15.13-4.35-18.9-1.61-1.63-3.71-2.52-5.93-2.52h-46.04v-43.28c0-19.49,8.33-28.56,26.2-28.56,8.94,0,17.01,2.84,22.72,8.01l6.1,5.52,4.32-7.01c6.85-11.12,8.09-18.62,3.77-22.95l-.42-.38Z",
  "M1087.44,235.16c-15.94-8.97-24.37-25.41-24.37-47.55,0-.11-.09-10.85-.09-11.02,0-54.66-40.65-94.33-96.66-94.33s-96.66,39.67-96.66,94.33c0,54.66,40.65,94.33,96.66,94.33,16.37,0,31.57-3.31,45.16-9.83,13.45-6.45,24.69-15.73,33.41-27.59,8.7,13.7,21.94,24.32,38.3,30.73l5.89,2.31,2.5-18.75c1.06-9.53-3.93-12.5-4.15-12.62ZM966.32,242.7c-38.69,0-65.72-27.18-65.72-66.11s27.02-66.11,65.72-66.11,65.72,27.18,65.72,66.11-27.02,66.11-65.72,66.11Z",
  "M1277.07,76.13c-3.06-.41-6.24-.61-9.46-.61-19.81,0-40.34,7.62-54.92,20.38-16.75,14.67-25.6,35.27-25.6,59.58v109.79h30.79v-105.9c0-34.5,19.81-54.28,54.36-54.28,5.65,0,7.1-4.46,9.88-22.19l.93-5.97-5.99-.8Z",
];

function SidebarLogo() {
  return (
    <svg
      viewBox="0 0 1283.06 270.92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "164px", height: "auto" }}
    >
      <g transform="translate(4,4)" opacity="0.3">
        {LOGO_PATHS.map((d, i) => <path key={i} d={d} fill="#4F6A7B" />)}
        <rect x="430.28" y="187.53" width="18.53" height="76.69" fill="#4F6A7B" />
      </g>
      <g>
        {LOGO_PATHS.map((d, i) => <path key={i} d={d} fill="#4F6A7B" />)}
        <rect x="430.28" y="187.53" width="18.53" height="76.69" fill="#4F6A7B" />
      </g>
    </svg>
  );
}

const studioFloors = [
  { name: "RADIANCE", sub: "1st floor", path: "/studio/radiance" },
  { name: "AIR", sub: "2nd floor", path: "/studio/air" },
  { name: "FUTURE", sub: "3rd floor", path: "/studio/future" },
];

const mainNavItems = [
  { name: "PRICE", path: "/price" },
  { name: "ACCESS", path: "/#access" },
  { name: "GUIDE", path: "/guide" },
  { name: "RESERVE", path: "/reserve" },
];

export function SideNav() {
  const location = useLocation();
  const [studioOpen, setStudioOpen] = useState(
    location.pathname.startsWith("/studio")
  );

  const isActive = (path: string) => location.pathname === path;
  const isStudioActive = location.pathname.startsWith("/studio");

  const navLinkClass = (active: boolean) =>
    `block font-['Montserrat'] tracking-[3px] transition-colors duration-200 ${
      active ? "text-[#4F6A7B] font-medium" : "text-[#8BAAB8] hover:text-[#4F6A7B]"
    }`;

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 flex-col bg-[#F4F8FA] border-r border-[#C2D0D9]"
      style={{ width: "210px" }}>
      {/* Logo */}
      <div className="px-6 pt-10 pb-8">
        <Link to="/" className="block">
          <SidebarLogo />
        </Link>
      </div>

      <div className="w-10 mx-auto border-t border-[#C2D0D9] mb-8" />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-6 space-y-1">
        {/* STUDIO */}
        <div>
          <button
            onClick={() => setStudioOpen((o) => !o)}
            className={`w-full flex items-center justify-between py-3 font-['Montserrat'] tracking-[3px] transition-colors duration-200 ${
              isStudioActive ? "text-[#4F6A7B] font-medium" : "text-[#8BAAB8] hover:text-[#4F6A7B]"
            }`}
            style={{ fontSize: "13px" }}
          >
            <span>STUDIO</span>
            <ChevronDown
              size={14}
              className="transition-transform duration-200"
              style={{ transform: studioOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
          {studioOpen && (
            <div className="pl-3 pb-2 space-y-1 border-l border-[#C2D0D9] ml-1">
              {studioFloors.map((floor) => (
                <Link
                  key={floor.path}
                  to={floor.path}
                  className={`block py-2 transition-colors duration-200 ${
                    isActive(floor.path) ? "text-[#4F6A7B] font-medium" : "text-[#8BAAB8] hover:text-[#4F6A7B]"
                  }`}
                  style={{ fontSize: "11px" }}
                >
                  <span className="font-['Montserrat'] tracking-[2px] block">{floor.name}</span>
                  <span className="font-['Montserrat'] tracking-[1px] opacity-60" style={{ fontSize: "10px" }}>{floor.sub}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Other nav items */}
        {mainNavItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={navLinkClass(isActive(item.path))}
            style={{ fontSize: "13px", display: "block", paddingTop: "12px", paddingBottom: "12px" }}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Bottom — Instagram */}
      <div className="px-5 py-6 border-t border-[#C2D0D9]">
        <a
          href="https://www.instagram.com/studio_far.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 border border-[#C2D0D9] hover:border-[#4F6A7B] text-[#8BAAB8] hover:text-[#4F6A7B] transition-all duration-200 px-3 py-2.5"
          aria-label="Instagram"
        >
          <Instagram size={15} strokeWidth={1.5} />
          <span className="font-['Montserrat'] tracking-[0.5px]" style={{ fontSize: "10px" }}>
            @studio_far.official
          </span>
        </a>
      </div>
    </aside>
  );
}
