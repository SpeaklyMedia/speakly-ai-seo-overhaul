import { useInView } from "@/hooks/use-in-view";

function Robot({ cx, topY, s = 1, floatDelay = 0 }: { cx: number; topY: number; s?: number; floatDelay?: number }) {
  return (
    <g style={{ animation: `astronautFloat ${4.2 + floatDelay}s ease-in-out ${floatDelay}s infinite` }}>
      {/* Cast shadow — darker orange ellipse */}
      <ellipse cx={cx} cy={topY + 96 * s} rx={22 * s} ry={7 * s} fill="#c46d28" fillOpacity={0.45} />

      {/* Body */}
      <rect x={cx - 20 * s} y={topY + 34 * s} width={40 * s} height={30 * s} rx={7 * s} fill="#c46d28" />
      {/* Chest panel */}
      <rect x={cx - 11 * s} y={topY + 40 * s} width={22 * s} height={14 * s} rx={3 * s} fill="#04101c" fillOpacity={0.55} />
      <circle cx={cx - 4 * s} cy={topY + 47 * s} r={3 * s} fill="#6fe2cf" />
      <circle cx={cx + 5 * s} cy={topY + 47 * s} r={3 * s} fill="#78c7ff" />

      {/* Arms */}
      <rect x={cx - 28 * s} y={topY + 37 * s} width={8 * s} height={16 * s} rx={4 * s} fill="#e8884a" />
      <rect x={cx + 20 * s} y={topY + 37 * s} width={8 * s} height={16 * s} rx={4 * s} fill="#e8884a" />

      {/* Legs */}
      <rect x={cx - 16 * s} y={topY + 62 * s} width={12 * s} height={18 * s} rx={5 * s} fill="#e8884a" />
      <rect x={cx + 4 * s} y={topY + 62 * s} width={12 * s} height={18 * s} rx={5 * s} fill="#e8884a" />
      {/* Feet */}
      <rect x={cx - 18 * s} y={topY + 76 * s} width={16 * s} height={8 * s} rx={4 * s} fill="#c46d28" />
      <rect x={cx + 2 * s} y={topY + 76 * s} width={16 * s} height={8 * s} rx={4 * s} fill="#c46d28" />

      {/* Neck */}
      <rect x={cx - 7 * s} y={topY + 28 * s} width={14 * s} height={6 * s} rx={3 * s} fill="#e8884a" />

      {/* Head */}
      <rect x={cx - 20 * s} y={topY + 8 * s} width={40 * s} height={24 * s} rx={10 * s} fill="#ff9d5c" />
      {/* Eyes — big dominant teal ovals */}
      <ellipse cx={cx - 8 * s} cy={topY + 21 * s} rx={7 * s} ry={6 * s} fill="#6fe2cf" />
      <ellipse cx={cx + 8 * s} cy={topY + 21 * s} rx={7 * s} ry={6 * s} fill="#6fe2cf" />
      {/* Pupils */}
      <circle cx={cx - 8 * s} cy={topY + 21 * s} r={3 * s} fill="#04101c" fillOpacity={0.55} />
      <circle cx={cx + 8 * s} cy={topY + 21 * s} r={3 * s} fill="#04101c" fillOpacity={0.55} />
      {/* Eye glint */}
      <circle cx={cx - 11 * s} cy={topY + 18 * s} r={1.8 * s} fill="rgba(255,255,255,0.55)" />
      <circle cx={cx + 5 * s} cy={topY + 18 * s} r={1.8 * s} fill="rgba(255,255,255,0.55)" />

      {/* Antenna */}
      <line x1={cx} y1={topY + 8 * s} x2={cx} y2={topY - 2 * s} stroke="#ff9d5c" strokeWidth={2 * s} strokeLinecap="round" />
      <circle cx={cx} cy={topY - 4 * s} r={3.5 * s} fill="#6fe2cf" />
      <circle cx={cx} cy={topY - 4 * s} r={1.8 * s} fill="#04101c" fillOpacity={0.4} />
    </g>
  );
}

function ProblemIllustration() {
  return (
    <svg
      viewBox="0 0 240 180"
      width="320"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="prob-bg-glow" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>
        <filter id="prob-glow-filter">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ambient floor glow */}
      <ellipse cx="120" cy="162" rx="110" ry="22" fill="url(#prob-bg-glow)" />

      {/* Left small robot */}
      <Robot cx={42} topY={60} s={0.72} floatDelay={0.4} />

      {/* Center robot — hero size */}
      <Robot cx={120} topY={30} s={1.0} floatDelay={0} />

      {/* Right small robot */}
      <Robot cx={198} topY={60} s={0.72} floatDelay={0.7} />

      {/* Ground shadow arcs */}
      <ellipse cx={120} cy={164} rx={70} ry={8} fill="#04101c" fillOpacity={0.25} />

      {/* Accent stars */}
      <circle cx={10} cy={20} r={2} fill="#78c7ff" fillOpacity={0.5} filter="url(#prob-glow-filter)" />
      <circle cx={228} cy={30} r={1.5} fill="#6fe2cf" fillOpacity={0.45} />
      <circle cx={66} cy={14} r={1.2} fill="#f5c86f" fillOpacity={0.5} />
      <circle cx={175} cy={18} r={1.8} fill="#78c7ff" fillOpacity={0.4} />
    </svg>
  );
}

export function Problem() {
  const { ref, isInView } = useInView();

  return (
    <section id="problem" className="py-[100px] relative scroll-mt-[86px]">
      <div className="shell">
        <div className="relative mb-[44px]">
          <div ref={ref} className={`relative z-10 max-w-[620px] reveal ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[16px]">The problem</div>
            <h2>Most websites were built to be browsed. They were not built to be understood.</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              That gap is why strong businesses disappear from AI answers. A polished website is not enough if your services, proof, differentiators, audiences, and offers are fragmented or thin. If AI cannot clearly understand what you do and why you matter, it cannot confidently recommend you.
            </p>
          </div>
          <div className="absolute right-0 top-0 hidden md:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.55 }}>
            <ProblemIllustration />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 7H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M5 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M5 17H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><rect x="14" y="5" width="5" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">Fragmented business story</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Services, audiences, offers, proof, locations, and differentiators are often spread across disconnected pages with no clear hierarchy.</p>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '70ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 12H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M10 17H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">Thin answer-readiness</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Most sites do not answer the real questions people ask AI — which means the models have less confidence in recommending the business.</p>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '140ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 19V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 19V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M19 19V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">No governed source model</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Future blog posts, landing pages, ad copy, and sales materials get created from scratch instead of from a single trusted foundation.</p>
          </article>
        </div>

        <div className={`mt-[18px] p-[18px_20px] rounded-[18px] bg-gradient-to-r from-[#78c7ff]/10 to-[#6fe2cf]/5 border border-[#78c7ff]/15 text-ink-muted reveal ${isInView ? "is-visible" : ""}`}>
          If AI cannot clearly understand what you do, who you serve, why you are credible, and what makes you different, it cannot confidently recommend you.
        </div>
      </div>
    </section>
  );
}
