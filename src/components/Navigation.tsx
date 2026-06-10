import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Volume2, VolumeX, Menu, X, ChevronDown } from "lucide-react";
import { toggleAmbientSound } from "@/lib/ambient-sound";

const serviceLinks = [
  { slug: "website-development", name: "Website Development" },
  { slug: "digital-marketing", name: "Digital Marketing" },
  { slug: "social-media-management", name: "Social Media Management" },
  { slug: "branding-design", name: "Branding & Design" },
  { slug: "content-creation", name: "Content Creation" },
  { slug: "ai-automation", name: "AI & Business Automation" },
];

const Navigation = () => {
  const [soundOn, setSoundOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();

  const handleSoundToggle = () => {
    const next = !soundOn;
    setSoundOn(next);
    toggleAmbientSound(next);
  };

  useEffect(() => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16">
        <div className="h-full flex items-center justify-between px-6 md:px-12">
          {/* Left - Services with dropdown (hidden on mobile) */}
          <div
            ref={dropdownRef}
            className="hidden md:block relative"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-1 font-space text-xs text-muted-foreground hover:text-primary transition-colors duration-200 relative group min-h-[44px]"
            >
              Services
              <ChevronDown size={10} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Dropdown — now single column since only 6 items */}
            <div
              className={`absolute top-full left-0 mt-1 w-[260px] rounded-lg border border-[rgba(255,255,255,0.06)] bg-background/95 backdrop-blur-md p-2 transition-all duration-200 ${dropdownOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
            >
              <div className="flex flex-col gap-0.5">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="block px-3 py-2 rounded-md hover:bg-[rgba(255,255,255,0.04)] transition-colors group"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className="font-satoshi text-[13px] text-foreground group-hover:text-primary transition-colors">
                      {s.name}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="border-t border-[rgba(255,255,255,0.06)] mt-1 pt-1">
                <Link
                  to="/services"
                  className="block px-3 py-2 rounded-md hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className="font-space text-[10px] text-muted-foreground hover:text-primary transition-colors">
                    VIEW ALL SERVICES →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Hamburger button (mobile only) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex items-center justify-center w-11 h-11 text-foreground"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Center - Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            <span className="font-clash text-lg font-bold text-foreground tracking-wide">ZENLOFT</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="font-clash text-lg font-bold text-primary tracking-wide">STUDIO</span>
          </Link>

          {/* Right - Works + Sound (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/works"
              className="inline-flex items-center font-space text-xs text-muted-foreground hover:text-primary transition-colors duration-200 relative group min-h-[44px]"
            >
              Works
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <button
              onClick={handleSoundToggle}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors min-h-[44px]"
            >
              <span className="font-space text-[10px] uppercase">Sound</span>
              {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center justify-center font-satoshi font-bold text-xs bg-primary text-[#04050A] h-9 px-5 rounded-full hover:bg-[hsl(187,100%,45%)] hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300 ml-2"
            >
              Start a Project
            </Link>
          </div>

          {/* Hamburger placeholder right side (mobile only, for flex balance) */}
          <div className="md:hidden w-11 h-11" />
        </div>
        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgba(255,255,255,0.06)]" />
      </nav>

      {/* Full-screen mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 md:hidden overflow-y-auto py-10"
          onClick={() => setMenuOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-foreground"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-1.5 mb-4">
            <span className="font-clash text-lg font-bold text-foreground tracking-wide">ZENLOFT</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="font-clash text-lg font-bold text-primary tracking-wide">STUDIO</span>
          </div>

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="font-clash text-2xl font-bold text-foreground hover:text-primary transition-colors min-h-[44px] flex items-center"
          >
            Home
          </Link>

          {/* Services - expandable on mobile */}
          <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="font-clash text-2xl font-bold text-foreground hover:text-primary transition-colors min-h-[44px] flex items-center gap-2"
            >
              Services
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-400 flex flex-col items-center"
              style={{ maxHeight: mobileServicesOpen ? "400px" : "0px", opacity: mobileServicesOpen ? 1 : 0 }}
            >
              {serviceLinks.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                  className="font-satoshi text-base text-muted-foreground hover:text-primary transition-colors min-h-[44px] flex items-center"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/works"
            onClick={() => setMenuOpen(false)}
            className="font-clash text-2xl font-bold text-foreground hover:text-primary transition-colors min-h-[44px] flex items-center"
          >
            Works
          </Link>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSoundToggle();
            }}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors min-h-[44px] mt-2"
          >
            <span className="font-space text-xs uppercase">Sound</span>
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-6 w-[80%] max-w-[280px] h-12 bg-primary text-[#04050A] font-satoshi font-bold text-sm rounded-lg flex items-center justify-center hover:bg-[hsl(187,100%,45%)] transition-colors"
          >
            Start a Project
          </Link>
        </div>
      )}
    </>
  );
};

export default Navigation;
