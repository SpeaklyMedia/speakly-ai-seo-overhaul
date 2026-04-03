import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "top",       label: "Intro" },
  { id: "market",    label: "Market" },
  { id: "problem",   label: "Problem" },
  { id: "ssot",      label: "Source of Truth" },
  { id: "solution",  label: "Solution" },
  { id: "system",    label: "How it works" },
  { id: "proof",     label: "Proof" },
  { id: "next-step", label: "Get started" },
];

export function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section, idx) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(idx);
          }
        },
        { threshold: 0.2, rootMargin: "-80px 0px -35% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const nextSection = SECTIONS[activeIndex + 1];

  return (
    <>
      <nav
        aria-label="Section navigation"
        className="hidden lg:flex flex-col gap-[12px] fixed right-[24px] top-1/2 -translate-y-1/2 z-50 items-end pointer-events-none"
      >
        {SECTIONS.map((section, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              aria-label={`Go to ${section.label}`}
              className={`pointer-events-auto flex items-center gap-[9px] group transition-all duration-300 ${isActive ? "opacity-100" : "opacity-35 hover:opacity-65"}`}
            >
              <span
                className={`text-[0.7rem] uppercase tracking-[0.12em] whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "text-ink-soft opacity-100 translate-x-0"
                    : "text-ink-soft opacity-0 translate-x-[10px] group-hover:opacity-80 group-hover:translate-x-0"
                }`}
              >
                {section.label}
              </span>
              <span
                className={`rounded-full flex-shrink-0 transition-all duration-300 ${
                  isActive
                    ? "w-[10px] h-[10px] bg-teal shadow-[0_0_14px_rgba(111,226,207,0.65)]"
                    : "w-[7px] h-[7px] bg-[rgba(120,199,255,0.28)] group-hover:bg-[rgba(120,199,255,0.5)]"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {nextSection && (
        <div className="lg:hidden fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={() => scrollTo(nextSection.id)}
            className="flex items-center gap-[9px] px-[20px] py-[11px] rounded-full bg-[#08182a]/92 border border-[#78c7ff]/22 backdrop-blur-[18px] shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] text-ink text-[0.84rem] font-medium tracking-[0.01em] transition-all duration-200 active:scale-[0.96] hover:-translate-y-[1px]"
          >
            <span className="text-ink-soft">{nextSection.label}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="text-teal flex-shrink-0"
            >
              <path
                d="M7 2V12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M3 8L7 12L11 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
