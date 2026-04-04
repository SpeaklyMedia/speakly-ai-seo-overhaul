import { useState, useEffect } from "react";

export function Nav() {
  const [active, setActive] = useState("");

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

  return (
    <div className="sticky top-0 z-50 backdrop-blur-[14px] border-b border-white/10 bg-[#05101b]/70">
      <div className="shell flex items-center justify-between gap-[18px] min-h-[76px] py-3 md:py-0">
        <a href="#top" className="flex items-center gap-[14px] min-w-0" aria-label="Speakly Media AI-SEO Overhaul" data-testid="link-home">
          <div className="relative w-[42px] h-[42px] rounded-[14px] bg-gradient-to-br from-[#78c7ff]/20 to-[#ff9d5c]/20 border border-[#78b0e7]/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_8px_30px_rgba(0,0,0,0.22)]" aria-hidden="true">
            <div className="absolute inset-[10px] rounded-full border-2 border-[#78c7ff]/60 -rotate-[16deg]"></div>
            <div className="absolute inset-[15px_10px_15px_16px] rounded-full border-2 border-[#ff9d5c]/75 rotate-[25deg]"></div>
          </div>
          <div className="hidden md:block">
            <strong className="block text-[0.98rem] tracking-[0.06em] uppercase">Speakly Media</strong>
            <span className="block text-[0.78rem] tracking-[0.08em] uppercase text-ink-soft whitespace-nowrap overflow-hidden text-ellipsis">AI-SEO Overhaul web deck</span>
          </div>
        </a>
        <nav className="hidden xl:flex items-center gap-[10px] justify-end" aria-label="Section navigation">
          {["Market", "Problem", "Source of Truth", "Solution", "System", "Proof", "Next Step"].map((item) => {
            const id = item === "Source of Truth" ? "ssot" : item.toLowerCase().replace(/ /g, "-");
            return (
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
                {item}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-[10px]">
          <a
            href="https://speaklymedia.com"
            target="_parent"
            rel="noopener noreferrer"
            data-testid="link-speaklymedia"
            className="hidden md:inline-flex items-center gap-[6px] text-[0.82rem] text-ink-soft hover:text-ink transition-colors duration-200 whitespace-nowrap"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            speaklymedia.com
          </a>
          <a className="inline-flex items-center justify-center gap-[10px] min-h-[44px] px-[24px] rounded-full font-bold tracking-[0.01em] transition-all duration-300 border cursor-pointer w-full md:w-auto text-ink bg-white/5 border-[#7db0e7]/20 hover:-translate-y-[2px]" href="#next-step" data-testid="button-nav-cta">
            Request assessment
          </a>
        </div>
      </div>
    </div>
  );
}
