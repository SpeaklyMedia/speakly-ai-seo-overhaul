import { useInView } from "@/hooks/use-in-view";

function SecureChipIllustration() {
  const pins = (side: "top" | "bottom" | "left" | "right") => {
    const pinCount = 3;
    const spacing = 22;
    const start = 60 - spacing;
    return Array.from({ length: pinCount }, (_, i) => {
      const pos = start + i * spacing;
      const isBlue = side === "top" && i === 1;
      const color = isBlue ? "#78c7ff" : "#ff9d5c";
      if (side === "top")    return <g key={i}><line x1={pos} y1={26} x2={pos} y2={10} stroke={color} strokeWidth={2.5} strokeLinecap="round"/><circle cx={pos} cy={8} r={3} fill={color}/></g>;
      if (side === "bottom") return <g key={i}><line x1={pos} y1={114} x2={pos} y2={130} stroke={color} strokeWidth={2.5} strokeLinecap="round"/><circle cx={pos} cy={132} r={3} fill={color}/></g>;
      if (side === "left")   return <g key={i}><line x1={26} y1={pos} x2={10} y2={pos} stroke={color} strokeWidth={2.5} strokeLinecap="round"/><circle cx={8} cy={pos} r={3} fill={color}/></g>;
      if (side === "right")  return <g key={i}><line x1={114} y1={pos} x2={130} y2={pos} stroke={color} strokeWidth={2.5} strokeLinecap="round"/><circle cx={132} cy={pos} r={3} fill={color}/></g>;
      return null;
    });
  };

  return (
    <svg
      viewBox="0 0 140 140"
      width="180"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="chip-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9d5c" />
          <stop offset="100%" stopColor="#f5c86f" />
        </linearGradient>
        <radialGradient id="chip-inner-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6fe2cf" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#6fe2cf" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Pins */}
      {pins("top")}
      {pins("bottom")}
      {pins("left")}
      {pins("right")}

      {/* Chip body */}
      <rect x={26} y={26} width={88} height={88} rx={10} fill="none" stroke="url(#chip-grad)" strokeWidth={3} />
      {/* Inner glow fill */}
      <rect x={28} y={28} width={84} height={84} rx={8} fill="url(#chip-inner-glow)" />

      {/* Inner circuit details */}
      <line x1={45} y1={40} x2={45} y2={55} stroke="#ff9d5c" strokeWidth={1.2} strokeOpacity={0.4} />
      <line x1={45} y1={55} x2={60} y2={55} stroke="#ff9d5c" strokeWidth={1.2} strokeOpacity={0.4} />
      <line x1={95} y1={85} x2={95} y2={100} stroke="#ff9d5c" strokeWidth={1.2} strokeOpacity={0.4} />
      <line x1={80} y1={85} x2={95} y2={85} stroke="#ff9d5c" strokeWidth={1.2} strokeOpacity={0.4} />

      {/* Central shield */}
      <path
        d="M 70 46 C 70 46 52 52 52 64 C 52 76 61 86 70 90 C 79 86 88 76 88 64 C 88 52 70 46 70 46 Z"
        stroke="#ff9d5c"
        strokeWidth={2}
        fill="rgba(255,157,92,0.1)"
      />
      {/* Teal checkmark */}
      <polyline
        points="61,68 68,76 81,58"
        stroke="#6fe2cf"
        strokeWidth={2.8}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NextStep() {
  const { ref, isInView } = useInView();

  return (
    <section id="next-step" className="py-[100px] relative scroll-mt-[86px]">
      <div className="shell">
        <div ref={ref} className={`p-[34px] md:p-[50px] rounded-[28px] bg-[radial-gradient(circle_at_80%_0%,rgba(120,199,255,0.18),transparent_40%),linear-gradient(180deg,rgba(11,28,46,0.96),rgba(7,18,30,0.96))] border border-[#78c7ff]/20 shadow-[0_24px_80px_rgba(2,7,16,0.45)] relative overflow-hidden reveal ${isInView ? "is-visible" : ""}`}>

          {/* Chip illustration — bottom-right corner, clipped by overflow:hidden */}
          <div className="hidden md:block absolute bottom-[-10px] right-[-10px] pointer-events-none" aria-hidden="true" style={{ opacity: 0.18 }}>
            <SecureChipIllustration />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-[40px] items-start relative z-10">
            <div>
              <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[14px]">Next step</div>
              <h2 className="max-w-[12ch] mb-[18px]">Start with a free AI-search readiness assessment.</h2>
              <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch] mb-[24px]">
                We'll show you where AI can see you today, where competitors are easier to recommend, and what a Phase 0 to Phase 2 overhaul could look like for your business.
              </p>

              <ul className="list-none p-0 grid gap-[12px] mb-[34px]">
                {["AI visibility snapshot", "Competitor comparison", "Source-of-truth gap review", "Tailored roadmap"].map(item => (
                  <li key={item} className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-[14px]">
                <a className="inline-flex items-center justify-center gap-[10px] min-h-[50px] px-[20px] rounded-full font-bold tracking-[0.01em] transition-all duration-300 border border-transparent cursor-pointer text-[#04101c] bg-gradient-to-br from-teal to-blue shadow-[0_12px_30px_rgba(70,170,214,0.28)] hover:-translate-y-[2px]" href="mailto:mark@speaklymedia.com?subject=AI-Search%20Readiness%20Assessment" data-testid="button-cta-primary">
                  Request assessment
                </a>
                <a className="inline-flex items-center justify-center gap-[10px] min-h-[50px] px-[20px] rounded-full font-bold tracking-[0.01em] transition-all duration-300 border cursor-pointer text-ink bg-white/5 border-[#7db0e7]/20 hover:-translate-y-[2px]" href="#market" data-testid="button-cta-secondary">
                  Review market shift
                </a>
              </div>
            </div>

            <aside className="p-[28px] rounded-[24px] bg-[#0a1828]/80 border border-[#7db0e7]/15">
              <h3 className="mb-[18px] text-[1.1rem]">Best-fit prospects</h3>
              <ul className="list-none p-0 grid gap-[12px] mb-[28px]">
                <li className="relative pl-[22px] text-ink-muted text-[0.9rem] before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[6px] before:h-[6px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal">Businesses with strong real-world value but weak AI-era visibility</li>
                <li className="relative pl-[22px] text-ink-muted text-[0.9rem] before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[6px] before:h-[6px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal">Teams that have outgrown a brochure-style website</li>
                <li className="relative pl-[22px] text-ink-muted text-[0.9rem] before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[6px] before:h-[6px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal">Brands that want future content to be easier, faster, and more consistent</li>
                <li className="relative pl-[22px] text-ink-muted text-[0.9rem] before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[6px] before:h-[6px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal">Owners who want a system, not a random pile of SEO activity</li>
              </ul>

              <div className="pt-[20px] border-t border-[#7db0e7]/15">
                <p className="mb-[10px] text-[0.9rem] font-medium text-ink-soft">Sources used</p>
                <ul className="list-none p-0 grid gap-[8px] text-[0.8rem] text-ink-muted">
                  <li>1. Bain &amp; Company — consumer reliance on AI search results (Feb 2025)</li>
                  <li>2. Pew Research Center — AI summaries reduce clicks (Jul 2025)</li>
                  <li>3. SparkToro / Datos — search happens everywhere (Mar 2026)</li>
                  <li>4. Google — AI Overviews and AI Mode updates (Jan 2026)</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
