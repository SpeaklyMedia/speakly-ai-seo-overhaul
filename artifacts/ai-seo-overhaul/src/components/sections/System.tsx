import { useInView } from "@/hooks/use-in-view";

function CommanderIllustration() {
  return (
    <svg
      viewBox="0 0 280 220"
      width="380"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", animation: "astronautFloat 5.5s ease-in-out infinite" }}
    >
      <defs>
        <radialGradient id="sys-cmd-glow" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sys-gold-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5c86f" stopOpacity="0.9" />
          <stop offset="65%" stopColor="#f5c86f" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f5c86f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sys-helmet-grad" cx="28%" cy="28%" r="68%">
          <stop offset="0%" stopColor="#ffb87d" />
          <stop offset="100%" stopColor="#e8884a" />
        </radialGradient>
        <filter id="sys-gold-bloom">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="sys-teal-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <ellipse cx={140} cy={140} rx={80} ry={65} fill="url(#sys-cmd-glow)" />

      {/* Stars */}
      <circle cx={22} cy={16} r={2.2} fill="#78c7ff" fillOpacity={0.6} />
      <circle cx={254} cy={12} r={1.8} fill="#6fe2cf" fillOpacity={0.5} />
      <circle cx={268} cy={60} r={2} fill="#78c7ff" fillOpacity={0.4} />
      <circle cx={10} cy={95} r={1.5} fill="#f5c86f" fillOpacity={0.55} />
      <circle cx={215} cy={28} r={1.2} fill="#f5c86f" fillOpacity={0.5} />

      {/* Gold wrench — held aloft by right arm */}
      <circle cx={198} cy={22} r={24} fill="url(#sys-gold-glow)" filter="url(#sys-gold-bloom)" opacity={0.85} />
      {/* Jaw prong */}
      <path d="M 174 18 C 174 10 178 6 182 6 L 182 14 C 180 14 178 16 178 20 C 178 24 180 26 182 26 L 182 34 C 178 34 174 30 174 18 Z" fill="#f5c86f" />
      {/* Shaft */}
      <rect x={182} y={16} width={28} height={8} rx={3} fill="#f5c86f" />
      {/* Box end */}
      <rect x={210} y={12} width={18} height={16} rx={3.5} fill="#f5c86f" />
      <polygon points="219,15 226,18 226,24 219,27 212,24 212,18" fill="#04101c" fillOpacity={0.45} />

      {/* Commander — shoulder pads */}
      <ellipse cx={112} cy={105} rx={18} ry={12} fill="#e8884a" />
      <ellipse cx={168} cy={105} rx={18} ry={12} fill="#e8884a" />
      {/* Torso */}
      <rect x={112} y={96} width={56} height={54} rx={10} fill="#ff9d5c" />
      {/* S badge panel */}
      <rect x={120} y={104} width={40} height={28} rx={5} fill="#c46d28" />
      {/* S letterform — filled orange shape */}
      <path d="M 146 111 C 146 108 143 106 140 107 C 136 107 133 109 133 112 C 133 114 135 115 138 116 L 142 117 C 146 118 148 120 148 123 C 148 127 144 130 140 130 C 136 130 132 128 132 124 L 134 124 C 134 127 137 128 140 128 C 143 128 146 126 146 123 C 146 121 144 120 141 119 L 137 118 C 134 117 131 115 131 112 C 131 108 135 105 140 105 C 145 105 148 108 148 111 Z" fill="#ff9d5c" />
      {/* Belt */}
      <rect x={112} y={143} width={56} height={8} rx={4} fill="#c46d28" />
      {/* Left arm — relaxed, hanging down */}
      <rect x={98} y={100} width={14} height={36} rx={7} fill="#ff9d5c" />
      <ellipse cx={105} cy={140} rx={8} ry={6} fill="#c46d28" />
      {/* Right arm — fully extended upward, holding wrench */}
      <path d="M 168 102 C 180 94 192 76 186 60 C 184 54 178 52 172 56 C 176 68 176 84 168 102 Z" fill="#ff9d5c" />
      <ellipse cx={184} cy={57} rx={10} ry={8} fill="#c46d28" />
      {/* Legs */}
      <rect x={118} y={150} width={18} height={42} rx={9} fill="#e8884a" />
      <rect x={144} y={150} width={18} height={42} rx={9} fill="#e8884a" />
      {/* Boots */}
      <rect x={114} y={182} width={26} height={12} rx={6} fill="#c46d28" />
      <rect x={140} y={182} width={26} height={12} rx={6} fill="#c46d28" />
      {/* Neck */}
      <rect x={126} y={88} width={28} height={8} rx={4} fill="#c46d28" />
      {/* Helmet */}
      <circle cx={140} cy={72} r={24} fill="url(#sys-helmet-grad)" />
      <circle cx={140} cy={72} r={24} fill="none" stroke="#ffb87d" strokeWidth="2" strokeOpacity="0.4" />
      <rect x={128} y={60} width={24} height={26} rx={12} fill="#04101c" fillOpacity={0.75} />
      {/* Visor teal crescent */}
      <path d="M 130 64 C 130 56 134 52 140 52" stroke="#6fe2cf" strokeWidth="3.5" fill="none" strokeLinecap="round" filter="url(#sys-teal-glow)" />
      {/* Visor glint */}
      <circle cx={133} cy={60} r={3} fill="#78c7ff" fillOpacity={0.45} />
      {/* Ear units */}
      <rect x={114} y={68} width={7} height={10} rx={3.5} fill="#c46d28" />
      <rect x={159} y={68} width={7} height={10} rx={3.5} fill="#c46d28" />

      {/* Left flanking robot */}
      <g style={{ animation: "astronautFloat 4.8s ease-in-out 0.3s infinite" }}>
        <ellipse cx={54} cy={207} rx={24} ry={7} fill="#c46d28" fillOpacity={0.40} />
        {/* Body */}
        <rect x={36} y={148} width={36} height={28} rx={7} fill="#c46d28" />
        <rect x={42} y={154} width={24} height={14} rx={3} fill="#04101c" fillOpacity={0.5} />
        <circle cx={50} cy={161} r={3.5} fill="#6fe2cf" filter="url(#sys-teal-glow)" />
        <circle cx={58} cy={161} r={3.5} fill="#78c7ff" />
        {/* Arms */}
        <rect x={28} y={151} width={8} height={16} rx={4} fill="#e8884a" />
        <rect x={72} y={151} width={8} height={16} rx={4} fill="#e8884a" />
        {/* Legs */}
        <rect x={38} y={174} width={12} height={18} rx={5} fill="#e8884a" />
        <rect x={54} y={174} width={12} height={18} rx={5} fill="#e8884a" />
        {/* Feet */}
        <rect x={35} y={186} width={18} height={8} rx={4} fill="#c46d28" />
        <rect x={51} y={186} width={18} height={8} rx={4} fill="#c46d28" />
        {/* Neck */}
        <rect x={46} y={142} width={16} height={6} rx={3} fill="#e8884a" />
        {/* Head */}
        <rect x={36} y={122} width={36} height={22} rx={9} fill="#ff9d5c" />
        {/* Eyes */}
        <ellipse cx={48} cy={133} rx={6} ry={5} fill="#6fe2cf" />
        <ellipse cx={60} cy={133} rx={6} ry={5} fill="#6fe2cf" />
        <circle cx={48} cy={133} r={2.5} fill="#04101c" fillOpacity={0.5} />
        <circle cx={60} cy={133} r={2.5} fill="#04101c" fillOpacity={0.5} />
        {/* Antenna */}
        <line x1={54} y1={122} x2={54} y2={112} stroke="#ff9d5c" strokeWidth={2} strokeLinecap="round" />
        <circle cx={54} cy={110} r={3.5} fill="#6fe2cf" />
      </g>

      {/* Right flanking robot */}
      <g style={{ animation: "astronautFloat 4.6s ease-in-out 0.6s infinite" }}>
        <ellipse cx={226} cy={207} rx={24} ry={7} fill="#c46d28" fillOpacity={0.40} />
        <rect x={208} y={148} width={36} height={28} rx={7} fill="#c46d28" />
        <rect x={214} y={154} width={24} height={14} rx={3} fill="#04101c" fillOpacity={0.5} />
        <circle cx={222} cy={161} r={3.5} fill="#6fe2cf" filter="url(#sys-teal-glow)" />
        <circle cx={230} cy={161} r={3.5} fill="#78c7ff" />
        <rect x={200} y={151} width={8} height={16} rx={4} fill="#e8884a" />
        <rect x={244} y={151} width={8} height={16} rx={4} fill="#e8884a" />
        <rect x={210} y={174} width={12} height={18} rx={5} fill="#e8884a" />
        <rect x={226} y={174} width={12} height={18} rx={5} fill="#e8884a" />
        <rect x={207} y={186} width={18} height={8} rx={4} fill="#c46d28" />
        <rect x={223} y={186} width={18} height={8} rx={4} fill="#c46d28" />
        <rect x={218} y={142} width={16} height={6} rx={3} fill="#e8884a" />
        <rect x={208} y={122} width={36} height={22} rx={9} fill="#ff9d5c" />
        <ellipse cx={220} cy={133} rx={6} ry={5} fill="#6fe2cf" />
        <ellipse cx={232} cy={133} rx={6} ry={5} fill="#6fe2cf" />
        <circle cx={220} cy={133} r={2.5} fill="#04101c" fillOpacity={0.5} />
        <circle cx={232} cy={133} r={2.5} fill="#04101c" fillOpacity={0.5} />
        <line x1={226} y1={122} x2={226} y2={112} stroke="#ff9d5c" strokeWidth={2} strokeLinecap="round" />
        <circle cx={226} cy={110} r={3.5} fill="#6fe2cf" />
      </g>
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
          <div className="absolute right-[-20px] top-[-50px] hidden md:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.65 }}>
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
