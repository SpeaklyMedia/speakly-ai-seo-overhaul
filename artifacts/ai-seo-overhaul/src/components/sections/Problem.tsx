import { useInView } from "@/hooks/use-in-view";
import { useParallax } from "@/hooks/use-parallax";

function WireframeGrid() {
  const { ref, offset } = useParallax(0.06);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        transform: `translateY(${-offset * 0.4}px)`,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "115%", top: "-8%" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="grid-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.18" />
            <stop offset="65%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width="100" height="100" fill="url(#grid-fade)" />
          </mask>
        </defs>
        <g mask="url(#grid-mask)">
          {/* Vertical grid lines */}
          {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95].map(x => (
            <line key={`v${x}`} x1={x} y1={0} x2={x} y2={100} stroke="#ff9d5c" strokeWidth="0.25" />
          ))}
          {/* Horizontal grid lines */}
          {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95].map(y => (
            <line key={`h${y}`} x1={0} y1={y} x2={100} y2={y} stroke="#ff9d5c" strokeWidth="0.25" />
          ))}
          {/* Junction accent dots */}
          {[25, 50, 75].map(x =>
            [25, 50, 75].map(y => (
              <circle key={`d${x}${y}`} cx={x} cy={y} r={0.6} fill="#ff9d5c" fillOpacity="0.45" />
            ))
          )}
        </g>
      </svg>

      {/* Diagonal accent lines */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "115%", top: "-8%", opacity: 0.06 }}
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="#ff9d5c" strokeWidth="0.4" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#ff9d5c" strokeWidth="0.4" />
        <line x1="0" y1="50" x2="50" y2="0" stroke="#ff9d5c" strokeWidth="0.3" />
        <line x1="50" y1="100" x2="100" y2="50" stroke="#ff9d5c" strokeWidth="0.3" />
      </svg>
    </div>
  );
}

function Robot({ cx, topY, s = 1, floatDelay = 0 }: { cx: number; topY: number; s?: number; floatDelay?: number }) {
  return (
    <g style={{ animation: `astronautFloat ${4.2 + floatDelay}s ease-in-out ${floatDelay}s infinite` }}>
      {/* Grid connection lines from robot feet */}
      <line x1={cx} y1={topY + 95 * s} x2={cx} y2={topY + 108 * s} stroke="#ff9d5c" strokeWidth={0.8 * s} strokeOpacity={0.35} strokeDasharray={`${2 * s} ${3 * s}`} />
      <line x1={cx - 18 * s} y1={topY + 97 * s} x2={cx - 35 * s} y2={topY + 97 * s} stroke="#ff9d5c" strokeWidth={0.6 * s} strokeOpacity={0.20} />
      <line x1={cx + 18 * s} y1={topY + 97 * s} x2={cx + 35 * s} y2={topY + 97 * s} stroke="#ff9d5c" strokeWidth={0.6 * s} strokeOpacity={0.20} />

      <ellipse cx={cx} cy={topY + 96 * s} rx={22 * s} ry={7 * s} fill="#c46d28" fillOpacity={0.45} />
      <rect x={cx - 20 * s} y={topY + 34 * s} width={40 * s} height={30 * s} rx={7 * s} fill="#c46d28" />
      <rect x={cx - 11 * s} y={topY + 40 * s} width={22 * s} height={14 * s} rx={3 * s} fill="#04101c" fillOpacity={0.55} />
      <circle cx={cx - 4 * s} cy={topY + 47 * s} r={3 * s} fill="#6fe2cf" />
      <circle cx={cx + 5 * s} cy={topY + 47 * s} r={3 * s} fill="#78c7ff" />
      <rect x={cx - 28 * s} y={topY + 37 * s} width={8 * s} height={16 * s} rx={4 * s} fill="#e8884a" />
      <rect x={cx + 20 * s} y={topY + 37 * s} width={8 * s} height={16 * s} rx={4 * s} fill="#e8884a" />
      <rect x={cx - 16 * s} y={topY + 62 * s} width={12 * s} height={18 * s} rx={5 * s} fill="#e8884a" />
      <rect x={cx + 4 * s} y={topY + 62 * s} width={12 * s} height={18 * s} rx={5 * s} fill="#e8884a" />
      <rect x={cx - 18 * s} y={topY + 76 * s} width={16 * s} height={8 * s} rx={4 * s} fill="#c46d28" />
      <rect x={cx + 2 * s} y={topY + 76 * s} width={16 * s} height={8 * s} rx={4 * s} fill="#c46d28" />
      <rect x={cx - 7 * s} y={topY + 28 * s} width={14 * s} height={6 * s} rx={3 * s} fill="#e8884a" />
      <rect x={cx - 20 * s} y={topY + 8 * s} width={40 * s} height={24 * s} rx={10 * s} fill="#ff9d5c" />
      <ellipse cx={cx - 8 * s} cy={topY + 21 * s} rx={7 * s} ry={6 * s} fill="#6fe2cf" />
      <ellipse cx={cx + 8 * s} cy={topY + 21 * s} rx={7 * s} ry={6 * s} fill="#6fe2cf" />
      <circle cx={cx - 8 * s} cy={topY + 21 * s} r={3 * s} fill="#04101c" fillOpacity={0.55} />
      <circle cx={cx + 8 * s} cy={topY + 21 * s} r={3 * s} fill="#04101c" fillOpacity={0.55} />
      <circle cx={cx - 11 * s} cy={topY + 18 * s} r={1.8 * s} fill="rgba(255,255,255,0.55)" />
      <circle cx={cx + 5 * s} cy={topY + 18 * s} r={1.8 * s} fill="rgba(255,255,255,0.55)" />
      <line x1={cx} y1={topY + 8 * s} x2={cx} y2={topY - 2 * s} stroke="#ff9d5c" strokeWidth={2 * s} strokeLinecap="round" />
      <circle cx={cx} cy={topY - 4 * s} r={3.5 * s} fill="#6fe2cf" />
      <circle cx={cx} cy={topY - 4 * s} r={1.8 * s} fill="#04101c" fillOpacity={0.4} />
    </g>
  );
}

function ProblemIllustration({ size = 320 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 240 200"
      width={size}
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="prob-bg-glow" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>
        <filter id="prob-glow-filter">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Grid base glow under robots */}
      <ellipse cx="120" cy="170" rx="110" ry="22" fill="url(#prob-bg-glow)" />

      {/* Grid connection lines between robots */}
      <line x1="42" y1="155" x2="120" y2="130" stroke="#ff9d5c" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="4 5" />
      <line x1="198" y1="155" x2="120" y2="130" stroke="#ff9d5c" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="4 5" />
      <line x1="42" y1="155" x2="198" y2="155" stroke="#ff9d5c" strokeWidth="0.5" strokeOpacity="0.15" />

      <Robot cx={42} topY={60} s={0.72} floatDelay={0.4} />
      <Robot cx={120} topY={30} s={1.0} floatDelay={0} />
      <Robot cx={198} topY={60} s={0.72} floatDelay={0.7} />
      <ellipse cx={120} cy={172} rx={70} ry={8} fill="#04101c" fillOpacity={0.25} />
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
    <section id="problem" className="py-[100px] relative scroll-mt-[86px] section-problem-bg overflow-hidden">
      {/* Orange wireframe grid background with parallax */}
      <WireframeGrid />

      <div className="shell relative z-10">

        <div className="relative mb-[44px]">
          <div ref={ref} className={`relative z-10 max-w-[620px] reveal-left ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-orange mb-[16px]">The problem</div>
            <h2>Most websites were built to be browsed. They were not built to be understood.</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              That gap is why strong businesses disappear from AI answers. A polished website is not enough if your services, proof, differentiators, audiences, and offers are fragmented or thin. If AI cannot clearly understand what you do and why you matter, it cannot confidently recommend you.
            </p>
          </div>

          {/* Desktop illustration */}
          <div className={`absolute right-0 top-0 hidden md:block pointer-events-none reveal-right ${isInView ? "is-visible" : ""}`} aria-hidden="true" style={{ opacity: 0.65 }}>
            <ProblemIllustration size={340} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px] glass-card-group">
          <article className={`p-[24px] relative overflow-hidden bg-panel border-l-[3px] border border-[#ff9d5c]/30 border-l-[#ff9d5c]/60 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] glass-card reveal ${isInView ? "is-visible" : ""}`}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(255,157,92,0.10),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#ff9d5c]/10 border border-[#ff9d5c]/20 text-orange" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 7H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M5 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M5 17H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><rect x="14" y="5" width="5" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">Fragmented business story</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Services, audiences, offers, proof, locations, and differentiators are often spread across disconnected pages with no clear hierarchy.</p>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border-l-[3px] border border-[#ff9d5c]/30 border-l-[#ff9d5c]/60 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] glass-card reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '70ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(255,157,92,0.10),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#ff9d5c]/10 border border-[#ff9d5c]/20 text-orange" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 12H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M10 17H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">Thin answer-readiness</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Most sites do not answer the real questions people ask AI — which means the models have less confidence in recommending the business.</p>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border-l-[3px] border border-[#ff9d5c]/30 border-l-[#ff9d5c]/60 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] glass-card reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '140ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(255,157,92,0.10),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#ff9d5c]/10 border border-[#ff9d5c]/20 text-orange" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 19V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 19V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M19 19V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">No governed source model</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Future blog posts, landing pages, ad copy, and sales materials get created from scratch instead of from a single trusted foundation.</p>
          </article>
        </div>

        {/* Mobile-only: robots illustration — replaces the removed faint watermark */}
        <div className="md:hidden mt-[32px] flex justify-center pointer-events-none" aria-hidden="true" style={{ opacity: 0.65 }}>
          <ProblemIllustration size={240} />
        </div>

        {/* Warning banner */}
        <div className={`mt-[24px] p-[24px_28px] rounded-[18px] relative overflow-hidden bg-[rgba(18,8,4,0.85)] border border-[#ff9d5c]/30 shadow-[0_0_40px_rgba(255,157,92,0.08),inset_0_1px_0_rgba(255,157,92,0.06)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: "210ms" }}>
          <div className="absolute inset-0 rounded-[18px] bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(255,157,92,0.08),transparent_60%)] pointer-events-none" />
          <div className="relative flex items-start gap-[16px]">
            <div className="shrink-0 w-[36px] h-[36px] rounded-full bg-[#ff9d5c]/15 border border-[#ff9d5c]/30 inline-grid place-items-center mt-[2px]" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 8V12" stroke="#ff9d5c" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#ff9d5c"/><path d="M10.3 4.3L2.5 18A2 2 0 0 0 4.2 21H19.8A2 2 0 0 0 21.5 18L13.7 4.3A2 2 0 0 0 10.3 4.3Z" stroke="#ff9d5c" strokeWidth="1.8" strokeLinejoin="round"/></svg>
            </div>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.6vw,1.12rem)] leading-[1.65]">
              If AI cannot clearly understand what you do, who you serve, why you are credible, and what makes you different, it cannot confidently recommend you.
            </p>
          </div>
        </div>

        <div className="mt-[36px] text-center">
          <a
            href="#next-step"
            className="inline-flex items-center gap-[8px] px-[22px] py-[12px] rounded-full text-[0.9rem] text-ink-soft tracking-[0.04em] btn-ghost"
            style={{ border: "1px solid rgba(120,199,255,0.20)", background: "rgba(120,199,255,0.04)" }}
          >
            See what's possible
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12H19M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
