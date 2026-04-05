import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Market", id: "market" },
  { label: "Problem", id: "problem" },
  { label: "Source of Truth", id: "ssot" },
  { label: "Solution", id: "solution" },
  { label: "System", id: "system" },
  { label: "Proof", id: "proof" },
  { label: "Next Step", id: "next-step" },
];

function TalkBubbleIcon() {
  return (
    <div
      className="relative w-[42px] h-[42px] rounded-[14px] shrink-0 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, rgba(10,24,40,0.96), rgba(7,18,30,0.96))",
        border: "1px solid rgba(120,199,255,0.22)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04), 0 8px 30px rgba(0,0,0,0.22)",
      }}
      aria-hidden="true"
    >
      <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bubble-grad" x1="0" y1="0" x2="26" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6fe2cf" />
            <stop offset="100%" stopColor="#78c7ff" />
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="23" height="17" rx="4.5" stroke="url(#bubble-grad)" strokeWidth="1.6" fill="rgba(120,199,255,0.07)" />
        <path d="M5 21.5 L5 18.5 L9.5 18.5" stroke="url(#bubble-grad)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="9" cy="10" r="1.4" fill="url(#bubble-grad)" />
        <circle cx="13" cy="10" r="1.4" fill="url(#bubble-grad)" />
        <circle cx="17" cy="10" r="1.4" fill="url(#bubble-grad)" />
      </svg>
    </div>
  );
}

export function Nav() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["top", "market", "problem", "ssot", "solution", "system", "proof", "next-step"];
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const XL_BREAKPOINT = 1280;
    function handleResize() {
      if (window.innerWidth >= XL_BREAKPOINT && menuOpen) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <div className="sticky top-0 z-50 backdrop-blur-[14px] border-b border-white/10 bg-[#05101b]/70">
        <div className="shell flex items-center justify-between gap-[18px] min-h-[76px] py-3 md:py-0">
          {/* Logo — links to speaklymedia.com at all breakpoints */}
          <a
            href="https://speaklymedia.com"
            target="_parent"
            rel="noopener noreferrer"
            className="flex items-center gap-[14px] min-w-0"
            aria-label="Speakly Media — back to home"
            data-testid="link-home"
          >
            <TalkBubbleIcon />
            <div className="hidden md:block">
              <strong className="block text-[0.98rem] tracking-[0.06em] uppercase">Speakly Media</strong>
              <span className="block text-[0.78rem] tracking-[0.08em] uppercase text-ink-soft whitespace-nowrap overflow-hidden text-ellipsis">AI-SEO Overhaul web deck</span>
            </div>
          </a>

          {/* Desktop section nav (xl+) */}
          <nav className="hidden xl:flex items-center gap-[10px] justify-end" aria-label="Section navigation">
            {NAV_ITEMS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                data-testid={`link-nav-${id}`}
                className={`text-[0.9rem] px-[12px] py-[10px] rounded-full border transition-all duration-300 ${
                  active === id
                    ? "text-ink bg-[#78c7ff]/10 border-[#78c7ff]/20 -translate-y-[1px]"
                    : "text-ink-soft border-transparent hover:text-ink hover:bg-[#78c7ff]/10 hover:border-[#78c7ff]/20 hover:-translate-y-[1px]"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-[10px]">
            {/* speaklymedia.com back-link — desktop only */}
            <a
              href="https://speaklymedia.com"
              target="_parent"
              rel="noopener noreferrer"
              data-testid="link-speaklymedia"
              className="hidden xl:inline-flex items-center gap-[6px] text-[0.82rem] text-ink-soft hover:text-ink transition-colors duration-200 whitespace-nowrap"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              speaklymedia.com
            </a>

            {/* "Request assessment" — xl+ top bar only */}
            <a
              className="hidden xl:inline-flex items-center justify-center gap-[10px] min-h-[44px] px-[24px] rounded-full font-bold tracking-[0.01em] transition-all duration-300 border text-ink bg-white/5 border-[#7db0e7]/20 hover:-translate-y-[2px]"
              href="#next-step"
              data-testid="button-nav-cta"
            >
              Request assessment
            </a>

            {/* Hamburger — mobile/tablet only (hidden at xl+) */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="xl:hidden flex flex-col items-center justify-center w-[44px] h-[44px] rounded-[12px] gap-[5px] transition-colors duration-200"
              style={{
                background: menuOpen ? "rgba(120,199,255,0.10)" : "rgba(120,199,255,0.05)",
                border: "1px solid rgba(120,199,255,0.15)",
              }}
            >
              <span
                className="block w-[18px] h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{
                  background: "linear-gradient(90deg, #6fe2cf, #78c7ff)",
                  transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block w-[18px] h-[2px] rounded-full transition-all duration-300"
                style={{
                  background: "linear-gradient(90deg, #6fe2cf, #78c7ff)",
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "scaleX(0)" : "none",
                }}
              />
              <span
                className="block w-[18px] h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{
                  background: "linear-gradient(90deg, #6fe2cf, #78c7ff)",
                  transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — xl+ hidden */}
      {menuOpen && (
        <div
          className="xl:hidden mobile-menu-enter sticky top-[76px] z-40 w-full border-b border-white/10"
          style={{
            background: "rgba(5,16,27,0.97)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="shell py-[16px] flex flex-col gap-[4px]">
            {/* speaklymedia.com back-link */}
            <a
              href="https://speaklymedia.com"
              target="_parent"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex items-center gap-[8px] min-h-[48px] px-[12px] rounded-[12px] text-[0.88rem] text-ink-soft hover:text-ink transition-colors duration-150"
              style={{ border: "1px solid transparent" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              speaklymedia.com
            </a>

            {/* Divider */}
            <div className="h-[1px] mx-[12px] my-[4px]" style={{ background: "rgba(120,199,255,0.10)" }} aria-hidden="true" />

            {/* Section links */}
            {NAV_ITEMS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={closeMenu}
                className={`flex items-center min-h-[48px] px-[12px] rounded-[12px] text-[0.95rem] font-medium transition-all duration-150 ${
                  active === id
                    ? "text-ink bg-[#78c7ff]/10"
                    : "text-ink-soft hover:text-ink hover:bg-[#78c7ff]/06"
                }`}
              >
                {label}
                {active === id && (
                  <span
                    className="ml-auto w-[6px] h-[6px] rounded-full shrink-0"
                    style={{ background: "linear-gradient(135deg, #6fe2cf, #78c7ff)" }}
                    aria-hidden="true"
                  />
                )}
              </a>
            ))}

            {/* Divider */}
            <div className="h-[1px] mx-[12px] my-[4px]" style={{ background: "rgba(120,199,255,0.10)" }} aria-hidden="true" />

            {/* Request assessment CTA */}
            <a
              href="#next-step"
              onClick={closeMenu}
              className="flex items-center justify-center min-h-[44px] px-[24px] mx-[12px] my-[8px] rounded-full font-bold text-[0.95rem] tracking-[0.01em] transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #6fe2cf, #78c7ff)",
                color: "#04101c",
              }}
              data-testid="button-mobile-cta"
            >
              Request assessment
            </a>
          </div>
        </div>
      )}
    </>
  );
}
