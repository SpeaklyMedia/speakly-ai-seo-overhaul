import { useInView } from "@/hooks/use-in-view";

function CommanderIllustration() {
  return (
    <svg
      viewBox="0 0 240 210"
      width="340"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="sys-commander-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sys-wrench-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5c86f" stopOpacity="1" />
          <stop offset="60%" stopColor="#f5c86f" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f5c86f" stopOpacity="0" />
        </radialGradient>
        <filter id="sys-wrench-bloom">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Stars */}
      <circle cx={20} cy={18} r={2} fill="#78c7ff" fillOpacity={0.6} />
      <circle cx={210} cy={12} r={1.5} fill="#6fe2cf" fillOpacity={0.5} />
      <circle cx={230} cy={55} r={1.8} fill="#78c7ff" fillOpacity={0.45} />
      <circle cx={8} cy={90} r={1.2} fill="#6fe2cf" fillOpacity={0.4} />
      <circle cx={180} cy={30} r={1} fill="#f5c86f" fillOpacity={0.6} />

      {/* Wrench glow bloom */}
      <circle cx={120} cy={22} r={20} fill="url(#sys-wrench-glow)" filter="url(#sys-wrench-bloom)" opacity={0.9} />

      {/* Wrench held high (centered at top) */}
      {/* Shaft */}
      <rect x={112} y={28} width={16} height={7} rx={3} fill="#f5c86f" />
      {/* Left open jaw */}
      <path d="M 100 20 C 100 14 104 10 108 10 L 108 16 C 106 16 104 18 104 21 C 104 24 106 26 108 26 L 108 32 C 104 32 100 28 100 20 Z" fill="#f5c86f" />
      {/* Right end (box) */}
      <rect x={128} y={12} width={14} height={18} rx={3} fill="#f5c86f" />
      <rect x={131} y={15} width={8} height={12} rx={2} fill="rgba(4,16,28,0.35)" />

      {/* Commander glow */}
      <ellipse cx={120} cy={130} rx={40} ry={55} fill="url(#sys-commander-glow)" />

      {/* Commander astronaut — center, tall */}
      {/* Helmet */}
      <circle cx={120} cy={68} r={22} fill="#ff9d5c" />
      <circle cx={120} cy={68} r={18} fill="#c46d28" />
      <ellipse cx={120} cy={68} rx={11} ry={12} fill="#04101c" fillOpacity={0.75} />
      {/* Visor glint */}
      <ellipse cx={115} cy={63} rx={4} ry={3} fill="#78c7ff" fillOpacity={0.35} />
      {/* Side ears */}
      <rect x={96} y={64} width={6} height={8} rx={3} fill="#c46d28" />
      <rect x={138} y={64} width={6} height={8} rx={3} fill="#c46d28" />
      {/* Neck ring */}
      <rect x={112} y={88} width={16} height={5} rx={2.5} fill="#c46d28" />
      {/* Torso */}
      <rect x={98} y={93} width={44} height={46} rx={8} fill="#ff9d5c" />
      {/* S badge */}
      <rect x={106} y={100} width={28} height={20} rx={4} fill="#c46d28" />
      <text x={120} y={114} textAnchor="middle" fontSize={14} fontWeight="bold" fill="#ff9d5c" fontFamily="sans-serif">S</text>
      {/* Belt */}
      <rect x={98} y={132} width={44} height={7} rx={3.5} fill="#c46d28" />
      {/* Right arm — raised holding wrench */}
      <path d="M 98 98 C 86 90 78 74 82 60 C 84 54 90 52 96 56 C 92 68 92 82 98 98 Z" fill="#ff9d5c" />
      {/* Left arm — relaxed */}
      <rect x={142} y={96} width={12} height={30} rx={6} fill="#ff9d5c" />
      <ellipse cx={148} cy={130} rx={6} ry={5} fill="#c46d28" />
      {/* Legs */}
      <rect x={104} y={138} width={14} height={36} rx={7} fill="#ff9d5c" />
      <rect x={122} y={138} width={14} height={36} rx={7} fill="#ff9d5c" />
      {/* Boots */}
      <rect x={102} y={168} width={18} height={10} rx={5} fill="#c46d28" />
      <rect x={120} y={168} width={18} height={10} rx={5} fill="#c46d28" />

      {/* === Left flanking robot === */}
      {/* Antenna */}
      <line x1={52} y1={105} x2={52} y2={96} stroke="#ff9d5c" strokeWidth={1.2} strokeLinecap="round" />
      <circle cx={52} cy={94} r={2} fill="#ff9d5c" />
      {/* Head */}
      <rect x={40} y={105} width={24} height={17} rx={8} fill="#ff9d5c" />
      <ellipse cx={48} cy={113} rx={3.5} ry={3} fill="#6fe2cf" />
      <ellipse cx={58} cy={113} rx={3.5} ry={3} fill="#6fe2cf" />
      {/* Neck */}
      <rect x={48} y={122} width={8} height={4} rx={2} fill="#c46d28" />
      {/* Body */}
      <rect x={38} y={126} width={28} height={20} rx={5} fill="#ff9d5c" />
      <circle cx={52} cy={136} r={3.5} fill="rgba(4,16,28,0.3)" />
      {/* Arms */}
      <rect x={30} y={128} width={8} height={10} rx={4} fill="#c46d28" />
      <rect x={66} y={128} width={8} height={10} rx={4} fill="#c46d28" />
      {/* Legs */}
      <rect x={40} y={146} width={8} height={12} rx={4} fill="#c46d28" />
      <rect x={52} y={146} width={8} height={12} rx={4} fill="#c46d28" />

      {/* === Right flanking robot === */}
      <line x1={188} y1={105} x2={188} y2={96} stroke="#ff9d5c" strokeWidth={1.2} strokeLinecap="round" />
      <circle cx={188} cy={94} r={2} fill="#ff9d5c" />
      <rect x={176} y={105} width={24} height={17} rx={8} fill="#ff9d5c" />
      <ellipse cx={184} cy={113} rx={3.5} ry={3} fill="#6fe2cf" />
      <ellipse cx={194} cy={113} rx={3.5} ry={3} fill="#6fe2cf" />
      <rect x={184} y={122} width={8} height={4} rx={2} fill="#c46d28" />
      <rect x={174} y={126} width={28} height={20} rx={5} fill="#ff9d5c" />
      <circle cx={188} cy={136} r={3.5} fill="rgba(4,16,28,0.3)" />
      <rect x={166} y={128} width={8} height={10} rx={4} fill="#c46d28" />
      <rect x={202} y={128} width={8} height={10} rx={4} fill="#c46d28" />
      <rect x={176} y={146} width={8} height={12} rx={4} fill="#c46d28" />
      <rect x={188} y={146} width={8} height={12} rx={4} fill="#c46d28" />
    </svg>
  );
}

export function System() {
  const { ref, isInView } = useInView();

  return (
    <section id="system" className="py-[100px] relative scroll-mt-[86px]">
      <div className="shell">
        <div className="relative mb-[44px]">
          <div ref={ref} className={`relative z-10 max-w-[620px] reveal ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[16px]">How it works</div>
            <h2>A three-phase engagement built for momentum</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              Speakly's customer-facing process mirrors the operator system without exposing proprietary mechanics. The structure is simple: diagnose, align, then compound.
            </p>
          </div>
          <div className="absolute right-[-20px] top-[-50px] hidden lg:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.58 }}>
            <CommanderIllustration />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div>
              <div className="text-[2rem] font-bold text-blue/30 leading-none mb-[10px]">0</div>
              <small className="block uppercase tracking-[0.16em] text-ink-soft text-[0.76rem] mb-[10px]">Phase 0</small>
              <h3 className="mb-[18px]">Diagnose and map</h3>
            </div>
            <ul className="list-none p-0 grid gap-[12px]">
              {["Current-site visibility review", "Competitor and market snapshot", "AI-readiness gap identification", "Priority opportunity roadmap"].map(item => (
                <li key={item} className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '70ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div>
              <div className="text-[2rem] font-bold text-blue/30 leading-none mb-[10px]">1</div>
              <small className="block uppercase tracking-[0.16em] text-ink-soft text-[0.76rem] mb-[10px]">Phase 1</small>
              <h3 className="mb-[18px]">Build and align</h3>
            </div>
            <ul className="list-none p-0 grid gap-[12px]">
              {["Website source-of-truth alignment", "Core page enhancement", "Answer-ready visibility improvements", "Measurement and reporting setup"].map(item => (
                <li key={item} className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '140ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div>
              <div className="text-[2rem] font-bold text-blue/30 leading-none mb-[10px]">2</div>
              <small className="block uppercase tracking-[0.16em] text-ink-soft text-[0.76rem] mb-[10px]">Phase 2</small>
              <h3 className="mb-[18px]">Expand and compound</h3>
            </div>
            <ul className="list-none p-0 grid gap-[12px]">
              {["Supporting content expansion", "Visibility refinement cycles", "Performance review and iteration", "Growth roadmap updates"].map(item => (
                <li key={item} className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
