import { useInView } from "@/hooks/use-in-view";

function RobotShape({ x, y, scale = 1, delay = 0 }: { x: number; y: number; scale?: number; delay?: number }) {
  const w = 32 * scale;
  const h = 48 * scale;
  const cx = x + w / 2;
  return (
    <g style={{ animation: `astronautFloat ${3.8 + delay}s ease-in-out infinite`, animationDelay: `${delay}s` }}>
      {/* Antenna */}
      <line x1={cx} y1={y - 2} x2={cx} y2={y - 10 * scale} stroke="#ff9d5c" strokeWidth={1.4 * scale} strokeLinecap="round" />
      <circle cx={cx} cy={y - 12 * scale} r={2.5 * scale} fill="#ff9d5c" />
      {/* Head */}
      <rect x={x + 4 * scale} y={y} width={24 * scale} height={18 * scale} rx={9 * scale} fill="#ff9d5c" />
      {/* Eyes */}
      <ellipse cx={cx - 6 * scale} cy={y + 9 * scale} rx={4 * scale} ry={3.5 * scale} fill="#6fe2cf" />
      <ellipse cx={cx + 6 * scale} cy={y + 9 * scale} rx={4 * scale} ry={3.5 * scale} fill="#6fe2cf" />
      {/* Eye shine */}
      <ellipse cx={cx - 7 * scale} cy={y + 8 * scale} rx={1.2 * scale} ry={1 * scale} fill="rgba(255,255,255,0.5)" />
      <ellipse cx={cx + 5 * scale} cy={y + 8 * scale} rx={1.2 * scale} ry={1 * scale} fill="rgba(255,255,255,0.5)" />
      {/* Neck */}
      <rect x={cx - 5 * scale} y={y + 18 * scale} width={10 * scale} height={4 * scale} rx={2 * scale} fill="#e8884a" />
      {/* Body */}
      <rect x={x} y={y + 22 * scale} width={w} height={h * 0.45} rx={5 * scale} fill="#ff9d5c" />
      {/* Chest circle */}
      <circle cx={cx} cy={y + 32 * scale} r={4 * scale} fill="rgba(4,16,28,0.35)" />
      {/* Arms */}
      <rect x={x - 8 * scale} y={y + 24 * scale} width={8 * scale} height={12 * scale} rx={4 * scale} fill="#e8884a" />
      <rect x={x + w} y={y + 24 * scale} width={8 * scale} height={12 * scale} rx={4 * scale} fill="#e8884a" />
      {/* Legs */}
      <rect x={x + 4 * scale} y={y + 43 * scale} width={10 * scale} height={14 * scale} rx={4 * scale} fill="#e8884a" />
      <rect x={x + 18 * scale} y={y + 43 * scale} width={10 * scale} height={14 * scale} rx={4 * scale} fill="#e8884a" />
    </g>
  );
}

function ProblemIllustration() {
  return (
    <svg
      viewBox="0 0 220 170"
      width="290"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="prob-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="110" cy="110" rx="100" ry="60" fill="url(#prob-glow)" />

      {/* Small robot left */}
      <RobotShape x={10} y={60} scale={0.75} delay={0.4} />

      {/* Center robot — tallest */}
      <RobotShape x={82} y={35} scale={1.0} delay={0} />

      {/* Small robot right */}
      <RobotShape x={162} y={60} scale={0.75} delay={0.7} />

      {/* Phone held by left robot arm */}
      <rect x={3} y={77} width={10} height={15} rx={2} fill="#04101c" stroke="#6fe2cf" strokeWidth={1.2} />
      <rect x={5} y={79} width={6} height={9} rx={1} fill="#6fe2cf" fillOpacity={0.3} />

      {/* Thruster flame under right robot */}
      <ellipse cx={186} cy={163} rx={6} ry={4} fill="#f5c86f" fillOpacity={0.7} />
      <ellipse cx={186} cy={167} rx={4} ry={3} fill="#ff9d5c" fillOpacity={0.5} />

      {/* Tiny stars */}
      <circle cx={8} cy={25} r={1.5} fill="#78c7ff" fillOpacity={0.55} />
      <circle cx={210} cy={40} r={1.2} fill="#78c7ff" fillOpacity={0.45} />
      <circle cx={58} cy={15} r={1} fill="#6fe2cf" fillOpacity={0.5} />
      <circle cx={155} cy={20} r={1.5} fill="#78c7ff" fillOpacity={0.4} />
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
          <div className="absolute right-0 top-0 hidden lg:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.35 }}>
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
