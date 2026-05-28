import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Instagram } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [studioDropdownOpen, setStudioDropdownOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const dropdownCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoFg = "white";
  const logoBg = "#BCCAD2";
  const navColorClass = "text-white hover:text-white/70";
  const navActiveClass = "text-white";
  const iconColorClass = "text-white hover:text-white/70";

  const navItems = [
    { name: "STUDIO", path: "/studio/radiance", hasDropdown: true },
    { name: "PRICE", path: "/price" },
    { name: "ACCESS", path: "/#access" },
    { name: "GUIDE", path: "/guide" },
    { name: "RESERVE", path: "/reserve" },
  ];

  const studioFloors = [
    { name: "floor 1 / RADIANCE", path: "/studio/radiance" },
    { name: "floor 2 / AIR", path: "/studio/air" },
    { name: "floor 3 / FUTURE", path: "/studio/future" },
  ];

  const handleStudioEnter = () => {
    if (dropdownCloseTimerRef.current) clearTimeout(dropdownCloseTimerRef.current);
    setStudioDropdownOpen(true);
  };

  const handleStudioLeave = () => {
    dropdownCloseTimerRef.current = setTimeout(() => {
      setStudioDropdownOpen(false);
    }, 320);
  };

  return (
    <header
      className="md:hidden sticky top-0 z-50 border-b"
      style={{ backgroundColor: "rgba(186,201,210,0.7)", borderColor: "rgba(255,255,255,0.15)" }}
    >
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-[60px]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <HorizontalLogo className="h-[22px] w-auto" fg={logoFg} bg={logoBg} />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={handleStudioEnter}
                  onMouseLeave={handleStudioLeave}
                >
                  <Link
                    to={item.path}
                    className={`font-['Montserrat'] text-sm tracking-[3px] transition-colors ${
                      location.pathname.startsWith("/studio") ? navActiveClass : navColorClass
                    }`}
                  >
                    {item.name}
                  </Link>
                  {studioDropdownOpen && (
                    <div className="absolute top-full left-0 pt-4 z-50">
                      <div className="bg-white/90 backdrop-blur-sm border border-[#D1DCE3] shadow-sm py-4 min-w-[200px]">
                        {studioFloors.map((floor) => (
                          <Link
                            key={floor.name}
                            to={floor.path}
                            onClick={() => setStudioDropdownOpen(false)}
                            className="block px-6 py-3 font-['Montserrat'] text-xs tracking-[2px] text-gray-400 hover:text-[#4F6A7B] hover:bg-[#F8FAFC] transition-colors whitespace-nowrap"
                          >
                            {floor.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-['Montserrat'] text-sm tracking-[3px] transition-colors ${
                    location.pathname === item.path ? navActiveClass : navColorClass
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
            {/* Instagram icon — placed after RESERVE */}
            <a
              href="https://www.instagram.com/studio_far.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${iconColorClass}`}
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors focus:outline-none ${iconColorClass}`}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/20" style={{ backgroundColor: "rgba(186,201,210,0.9)" }}>
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-4 font-['Montserrat'] text-sm tracking-[3px] text-white hover:text-white/70 transition-colors"
                >
                  {item.name}
                </Link>
                {item.hasDropdown && (
                  <div className="pl-4 pb-2 space-y-1">
                    {studioFloors.map((floor) => (
                      <Link
                        key={floor.name}
                        to={floor.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 font-['Montserrat'] text-xs tracking-[2px] text-white/70 hover:text-white"
                      >
                        {floor.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href="https://www.instagram.com/studio_far.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 py-4 font-['Montserrat'] text-sm tracking-[3px] text-white hover:text-white/70 transition-colors"
            >
              <Instagram size={16} />
              Instagram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function HorizontalLogo({ className, fg, bg }: { className?: string; fg: string; bg: string }) {
  const paths = [
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
  return (
    <svg
      className={className}
      viewBox="0 0 1283.06 270.92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: "all 0.3s ease" }}
    >
      <g transform="translate(4, 4)" opacity="0.7">
        {paths.map((d, i) => <path key={i} d={d} fill={bg} />)}
        <rect x="430.28" y="187.53" width="18.53" height="76.69" fill={bg} />
      </g>
      <g>
        {paths.map((d, i) => <path key={i} d={d} fill={fg} />)}
        <rect x="430.28" y="187.53" width="18.53" height="76.69" fill={fg} />
      </g>
    </svg>
  );
}
