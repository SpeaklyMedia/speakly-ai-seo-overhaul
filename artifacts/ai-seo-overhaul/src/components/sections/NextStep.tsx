import { useInView } from "@/hooks/use-in-view";

function SecureChipIllustration() {
  const Pin = ({ x1, y1, x2, y2, cx, cy, teal }: { x1: number; y1: number; x2: number; y2: number; cx: number; cy: number; teal?: boolean }) => {
    const color = teal ? "#6fe2cf" : "#ff9d5c";
    return (
      <g>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={3} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={4} fill={color} />
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 160 160"
      width="200"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="chip-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9d5c" />
          <stop offset="50%" stopColor="#f5a53a" />
          <stop offset="100%" stopColor="#f5c86f" />
        </linearGradient>
        <radialGradient id="chip-inner-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6fe2cf" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#6fe2cf" stopOpacity="0" />
        </radialGradient>
        <filter id="chip-check-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── 4 pins per side (16 total) ── */}
      {/* Top */}
      <Pin x1={56} y1={30} x2={56} y2={14} cx={56} cy={12} />
      <Pin x1={70} y1={30} x2={70} y2={14} cx={70} cy={12} teal />
      <Pin x1={84} y1={30} x2={84} y2={14} cx={84} cy={12} />
      <Pin x1={98} y1={30} x2={98} y2={14} cx={98} cy={12} teal />
      {/* Bottom */}
      <Pin x1={56} y1={130} x2={56} y2={146} cx={56} cy={148} teal />
      <Pin x1={70} y1={130} x2={70} y2={146} cx={70} cy={148} />
      <Pin x1={84} y1={130} x2={84} y2={146} cx={84} cy={148} teal />
      <Pin x1={98} y1={130} x2={98} y2={146} cx={98} cy={148} />
      {/* Left */}
      <Pin x1={30} y1={56} x2={14} y2={56} cx={12} cy={56} teal />
      <Pin x1={30} y1={70} x2={14} y2={70} cx={12} cy={70} />
      <Pin x1={30} y1={84} x2={14} y2={84} cx={12} cy={84} teal />
      <Pin x1={30} y1={98} x2={14} y2={98} cx={12} cy={98} />
      {/* Right */}
      <Pin x1={130} y1={56} x2={146} y2={56} cx={148} cy={56} />
      <Pin x1={130} y1={70} x2={146} y2={70} cx={148} cy={70} teal />
      <Pin x1={130} y1={84} x2={146} y2={84} cx={148} cy={84} />
      <Pin x1={130} y1={98} x2={146} y2={98} cx={148} cy={98} teal />

      {/* ── Chip body — FILLED gradient ── */}
      <rect x={30} y={30} width={100} height={100} rx={12} fill="url(#chip-body-grad)" />
      {/* Inner inset panel */}
      <rect x={36} y={36} width={88} height={88} rx={8} fill="#0d1e2e" fillOpacity={0.75} />
      {/* Inner glow */}
      <rect x={38} y={38} width={84} height={84} rx={7} fill="url(#chip-inner-glow)" />

      {/* Circuit trace details inside chip */}
      <polyline points="44,48 44,60 58,60" stroke="#ff9d5c" strokeWidth={1.5} fill="none" strokeOpacity={0.5} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="116,112 116,100 102,100" stroke="#6fe2cf" strokeWidth={1.5} fill="none" strokeOpacity={0.5} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="44,110 44,102 54,102" stroke="#78c7ff" strokeWidth={1.2} fill="none" strokeOpacity={0.4} strokeLinecap="round" strokeLinejoin="round" />

      {/* ── Central shield — FILLED ── */}
      <path
        d="M 80 48 C 80 48 58 56 58 70 C 58 84 68 96 80 102 C 92 96 102 84 102 70 C 102 56 80 48 80 48 Z"
        fill="#ff9d5c"
        fillOpacity={0.22}
      />
      <path
        d="M 80 48 C 80 48 58 56 58 70 C 58 84 68 96 80 102 C 92 96 102 84 102 70 C 102 56 80 48 80 48 Z"
        stroke="#ff9d5c"
        strokeWidth={2}
        fill="none"
        strokeOpacity={0.6}
      />

      {/* Teal checkmark with glow */}
      <polyline points="68,74 77,84 96,62" stroke="#6fe2cf" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#chip-check-glow)" />
      <polyline points="68,74 77,84 96,62" stroke="#6fe2cf" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
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
