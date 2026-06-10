import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/zenloftstudio" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/zenloftstudio" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/zenloftstudio" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/zenloftstudio" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[rgba(255,255,255,0.06)]">
      <div className="px-6 md:px-12 lg:px-20 pt-16 pb-8">
        {/* Top row - mirrors nav */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <Link to="/services" className="hidden md:inline-flex font-space text-xs text-muted-foreground hover:text-primary transition-colors min-h-[44px] items-center">
            Services
          </Link>
          <Link to="/" className="flex items-center gap-1.5">
            <span className="font-clash text-lg font-bold text-foreground">ZENLOFT</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="font-clash text-lg font-bold text-primary">STUDIO</span>
          </Link>
          <Link to="/works" className="hidden md:inline-flex font-space text-xs text-muted-foreground hover:text-primary transition-colors min-h-[44px] items-center">
            Works
          </Link>
        </div>

        {/* Middle row */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 py-10 text-center md:text-left mb-6">
          <div className="font-satoshi text-sm text-muted-foreground space-y-1">
            <p>Hyderabad, India</p>
            <p>zenloftstudio@gmail.com</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-11 h-11 flex items-center justify-center border border-[rgba(255,255,255,0.06)] rounded group-hover:border-primary transition-colors">
                  <Icon size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="font-space text-[11px] text-muted-foreground group-hover:text-primary transition-colors">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[rgba(255,255,255,0.06)] pt-6 text-center">
          <span className="font-space text-[11px] text-muted-foreground">
            © 2025 Zenloft Studio. All rights reserved.
          </span>
          <span className="font-space text-[11px] text-muted-foreground">
            Designed and Built by Zenloft Studio
          </span>
          <div className="flex gap-4">
            <Link to="/privacy" className="font-space text-[11px] text-muted-foreground hover:text-foreground transition-colors py-2 px-1 min-h-[44px] flex items-center">
              Privacy Policy
            </Link>
            <Link to="/terms" className="font-space text-[11px] text-muted-foreground hover:text-foreground transition-colors py-2 px-1 min-h-[44px] flex items-center">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Large background wordmark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%] pointer-events-none select-none">
        <span className="font-clash font-extrabold text-[clamp(80px,14vw,180px)] text-[rgba(255,255,255,0.03)] whitespace-nowrap">
          ZENLOFT
        </span>
      </div>
    </footer>
  );
};

export default Footer;
