import { useInView } from "@/hooks/use-in-view";

function WrenchIllustration() {
  return (
    <svg
      viewBox="0 0 120 240"
      width="180"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", animation: "astronautFloat 4.5s ease-in-out infinite" }}
    >
      <defs>
        <linearGradient id="ssot-wrench-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6fe2cf" />
          <stop offset="55%" stopColor="#78c7ff" />
          <stop offset="100%" stopColor="#5eb0e8" />
        </linearGradient>
        <linearGradient id="ssot-light-col" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6fe2cf" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#6fe2cf" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#6fe2cf" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ssot-glow-soft" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#6fe2cf" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6fe2cf" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ssot-hand-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ssot-bg-orange" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>
        <filter id="ssot-jaw-glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="ssot-col-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Faint circular orange background glow behind the whole composition */}
      <circle cx="60" cy="120" r="90" fill="url(#ssot-bg-orange)" />

      {/* Glow bloom at jaw */}
      <ellipse cx="60" cy="32" rx="36" ry="20" fill="url(#ssot-glow-soft)" filter="url(#ssot-jaw-glow)" />

      {/* ── Vertical wrench ── */}
      {/* Left jaw prong */}
      <path d="M 38 55 L 38 35 C 38 26 43 20 50 20 L 50 34 C 46 34 44 37 44 42 L 44 55 Z" fill="url(#ssot-wrench-grad)" />
      {/* Right jaw prong */}
      <path d="M 82 55 L 82 35 C 82 26 77 20 70 20 L 70 34 C 74 34 76 37 76 42 L 76 55 Z" fill="url(#ssot-wrench-grad)" />
      {/* Jaw opening (gap between prongs — let dark background show) */}
      <rect x="44" y="20" width="32" height="22" fill="#04101c" />

      {/* Shaft — vertical */}
      <rect x="44" y="42" width="32" height="116" rx="4" fill="url(#ssot-wrench-grad)" />

      {/* Box end (bottom) */}
      <rect x="34" y="152" width="52" height="28" rx="7" fill="url(#ssot-wrench-grad)" />
      {/* Hex socket hole */}
      <polygon points="60,158 67,162 67,170 60,174 53,170 53,162" fill="#04101c" fillOpacity="0.6" />

      {/* Shaft highlight stripe */}
      <rect x="52" y="48" width="6" height="100" rx="3" fill="rgba(255,255,255,0.12)" />

      {/* ── Vertical light column connecting wrench jaw to hand ── */}
      <rect x="56" y="158" width="8" height="42" rx="4" fill="url(#ssot-light-col)" filter="url(#ssot-col-glow)" />

      {/* ── Gloved hand below ── */}
      {/* Hand glow */}
      <ellipse cx="60" cy="210" rx="34" ry="18" fill="url(#ssot-hand-bg)" />

      {/* Palm — filled orange */}
      <path d="M 42 220 C 42 208 48 200 60 198 C 72 200 78 208 78 220 L 78 228 L 42 228 Z" fill="#ff9d5c" />

      {/* Thumb — left side, sticking out */}
      <path d="M 42 218 C 38 214 36 208 40 204 C 44 200 48 203 48 208 L 46 218 Z" fill="#ff9d5c" />
      <path d="M 46 218 C 40 216 38 210 41 206" stroke="#c46d28" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Four fingers — stubs on top */}
      <rect x="45" y="196" width="9" height="14" rx="4.5" fill="#ff9d5c" />
      <rect x="56" y="193" width="9" height="17" rx="4.5" fill="#ff9d5c" />
      <rect x="67" y="196" width="9" height="14" rx="4.5" fill="#ff9d5c" />
      <rect x="77" y="200" width="7" height="12" rx="3.5" fill="#ff9d5c" />
      {/* Finger knuckle lines */}
      <line x1="49" y1="204" x2="49" y2="208" stroke="#c46d28" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="60" y1="201" x2="60" y2="206" stroke="#c46d28" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="71" y1="204" x2="71" y2="208" stroke="#c46d28" strokeWidth="1.2" strokeLinecap="round" />

      {/* Accent sparkles */}
      <circle cx="18" cy="22" r="2.5" fill="#f5c86f" fillOpacity="0.7" />
      <circle cx="104" cy="28" r="2" fill="#78c7ff" fillOpacity="0.6" />
      <circle cx="12" cy="80" r="1.5" fill="#6fe2cf" fillOpacity="0.45" />
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
          <div className="absolute right-0 top-[-30px] hidden md:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.75 }}>
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
