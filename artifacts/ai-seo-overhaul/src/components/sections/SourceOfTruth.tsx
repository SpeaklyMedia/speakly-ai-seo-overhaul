import { useInView } from "@/hooks/use-in-view";

function WrenchIllustration() {
  return (
    <svg
      viewBox="0 0 140 210"
      width="200"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", animation: "astronautFloat 4.5s ease-in-out infinite" }}
    >
      <defs>
        <linearGradient id="ssot-wrench-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6fe2cf" />
          <stop offset="100%" stopColor="#78c7ff" />
        </linearGradient>
        <radialGradient id="ssot-beam-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6fe2cf" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#6fe2cf" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ssot-hand-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>
        <filter id="ssot-glow-filter">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Light beam between hand and wrench */}
      <rect x={66} y={82} width={8} height={60} rx={4} fill="url(#ssot-beam-glow)" opacity={0.8} />
      <rect x={68} y={88} width={4} height={50} rx={2} fill="#6fe2cf" opacity={0.35} />

      {/* Wrench body — horizontal, centered */}
      {/* Left jaw (open end) */}
      <path
        d="M 22 58
           C 22 48 28 42 36 42
           L 36 50
           C 32 50 30 54 30 58
           C 30 62 32 66 36 66
           L 36 74
           C 28 74 22 68 22 58 Z"
        fill="url(#ssot-wrench-grad)"
      />
      {/* Left jaw gap (the opening) */}
      <path
        d="M 36 50 L 48 50 L 48 66 L 36 66 Z"
        fill="none"
      />
      {/* Shaft */}
      <rect x={36} y={54} width={68} height={8} rx={2} fill="url(#ssot-wrench-grad)" />
      {/* Right hex end */}
      <path
        d="M 104 50 L 118 50 L 118 66 L 104 66 Z"
        fill="url(#ssot-wrench-grad)"
      />
      {/* Hex hole */}
      <polygon
        points="111,53 116,56 116,62 111,65 106,62 106,56"
        fill="rgba(4,16,28,0.5)"
        stroke="#78c7ff"
        strokeWidth="1"
      />

      {/* Glow on wrench */}
      <rect x={22} y={42} width={96} height={32} rx={4} fill="url(#ssot-beam-glow)" opacity={0.2} filter="url(#ssot-glow-filter)" />

      {/* Palm / glove (open upward hand silhouette) */}
      <ellipse cx={70} cy={155} rx={38} ry={14} fill="url(#ssot-hand-glow)" />
      {/* Palm base */}
      <path
        d="M 45 165
           C 45 155 50 148 60 146
           L 60 158
           C 60 162 63 164 70 164
           C 77 164 80 162 80 158
           L 80 146
           C 90 148 95 155 95 165 Z"
        stroke="#ff9d5c"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Fingers */}
      <path d="M 55 146 C 55 138 58 134 62 134 C 65 134 67 138 67 146" stroke="#ff9d5c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 63 144 C 63 136 66 132 70 132 C 74 132 77 136 77 144" stroke="#ff9d5c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 71 146 C 71 138 74 134 78 134 C 81 134 83 138 83 146" stroke="#ff9d5c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 47 158 C 44 152 45 146 49 144 C 53 142 56 145 56 150" stroke="#ff9d5c" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Sparkle dots near wrench */}
      <circle cx={20} cy={44} r={2} fill="#f5c86f" fillOpacity={0.8} />
      <circle cx={122} cy={48} r={1.5} fill="#78c7ff" fillOpacity={0.65} />
      <circle cx={14} cy={62} r={1.2} fill="#6fe2cf" fillOpacity={0.5} />
    </svg>
  );
}

export function SourceOfTruth() {
  const { ref, isInView } = useInView();

  return (
    <section id="ssot" className="py-[100px] relative scroll-mt-[86px]">
      <div className="shell">
        <div className="relative mb-[44px]">
          <div ref={ref} className={`relative z-10 max-w-[620px] reveal ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[16px]">The core idea</div>
            <h2>Your website becomes the single source of truth.</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              Once your website is structured as the clearest version of your business, it starts fueling every other asset you create. Future service pages, FAQs, articles, campaigns, and sales materials become faster to produce and more consistent because the source is already clear.
            </p>
          </div>
          <div className="absolute right-0 top-[-30px] hidden md:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.60 }}>
            <WrenchIllustration />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,1fr)_minmax(0,1.3fr)] gap-[22px] items-stretch">
          <article className={`p-[32px] rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,rgba(120,199,255,0.18),transparent_40%),linear-gradient(180deg,rgba(11,28,46,0.96),rgba(7,18,30,0.96))] border border-[#78c7ff]/20 shadow-[0_24px_80px_rgba(2,7,16,0.45)] grid content-start gap-[20px] relative reveal ${isInView ? "is-visible" : ""}`}>
            <div className="inline-flex items-center gap-[8px] px-[10px] py-[7px] rounded-full bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-[0.72rem] text-ink-soft uppercase tracking-[0.12em] w-fit">Website-first strategy</div>
            <strong className="block text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02] tracking-[-0.04em]">Your site stops acting like a brochure and starts acting like infrastructure.</strong>
            <p className="text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">It becomes the place where your business facts, audience routes, proof, offers, FAQs, differentiators, and positioning are aligned — so every downstream asset has a stronger starting point.</p>
            <div className="p-[18px] rounded-[18px] bg-white/5 border border-[#ff9d5c]/20 text-ink-muted">
              <strong className="block mb-[8px] text-gold">This is the fuel tank for the future content engine.</strong>
              Future service pages, local pages, articles, campaigns, email sequences, and sales assets become faster to produce — and more consistent — because the source is already clear.
            </div>
          </article>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] content-start">
            <article className={`p-[22px] rounded-[22px] relative bg-[#0a1828]/70 border border-[#7db0e7]/15 min-h-[160px] reveal ${isInView ? "is-visible" : ""}`}>
              <div className="hidden md:block absolute -left-[15px] top-1/2 w-[15px] h-[1px] bg-gradient-to-r from-[#78c7ff]/55 to-transparent"></div>
              <strong className="block mb-[10px] text-[1.04rem]">AI answers and recommendation flows</strong>
              <p className="text-ink-muted">Clearer source material makes you easier to interpret and easier to cite across AI-assisted discovery.</p>
            </article>
            <article className={`p-[22px] rounded-[22px] relative bg-[#0a1828]/70 border border-[#7db0e7]/15 min-h-[160px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '70ms' }}>
              <div className="hidden md:block absolute -left-[15px] top-1/2 w-[15px] h-[1px] bg-gradient-to-r from-[#78c7ff]/55 to-transparent"></div>
              <strong className="block mb-[10px] text-[1.04rem]">Core service and location pages</strong>
              <p className="text-ink-muted">The most important pages become more consistent, more discoverable, and more persuasive.</p>
            </article>
            <article className={`p-[22px] rounded-[22px] relative bg-[#0a1828]/70 border border-[#7db0e7]/15 min-h-[160px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '140ms' }}>
              <div className="hidden md:block absolute -left-[15px] top-1/2 w-[15px] h-[1px] bg-gradient-to-r from-[#78c7ff]/55 to-transparent"></div>
              <strong className="block mb-[10px] text-[1.04rem]">FAQs, supporting content, and proof assets</strong>
              <p className="text-ink-muted">Instead of "what should we publish next?", you work from a structured expansion plan.</p>
            </article>
            <article className={`p-[22px] rounded-[22px] relative bg-[#0a1828]/70 border border-[#7db0e7]/15 min-h-[160px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '210ms' }}>
              <div className="hidden md:block absolute -left-[15px] top-1/2 w-[15px] h-[1px] bg-gradient-to-r from-[#78c7ff]/55 to-transparent"></div>
              <strong className="block mb-[10px] text-[1.04rem]">Ads, social, email, and sales enablement</strong>
              <p className="text-ink-muted">Campaign language becomes stronger because it pulls from the same clarified business story.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
