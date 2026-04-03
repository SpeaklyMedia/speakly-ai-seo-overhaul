import { useInView } from "@/hooks/use-in-view";

function MarketIllustration() {
  return (
    <svg
      viewBox="0 0 130 150"
      width="220"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", animation: "astronautFloat 5s ease-in-out infinite" }}
    >
      <defs>
        <radialGradient id="mkt-brain-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6fe2cf" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6fe2cf" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mkt-halo-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>
        <filter id="mkt-blur">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Halo glow behind head */}
      <ellipse cx="52" cy="68" rx="42" ry="42" fill="url(#mkt-halo-glow)" />

      {/* Outer arc (partial ring, ~300°) */}
      <path
        d="M 18 85 A 42 42 0 1 1 65 27"
        stroke="#ff9d5c"
        strokeWidth="1.8"
        fill="none"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />

      {/* Head profile silhouette */}
      <path
        d="M 52 26
           C 72 26 86 40 86 58
           C 86 74 76 88 62 93
           L 58 100 L 44 100 L 44 93
           C 30 88 20 74 20 58
           C 20 40 34 26 52 26 Z"
        stroke="#ff9d5c"
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
      />

      {/* Brain teal glow */}
      <circle cx="56" cy="60" r="14" fill="url(#mkt-brain-glow)" />
      <circle cx="56" cy="60" r="6" fill="#6fe2cf" fillOpacity="0.85" filter="url(#mkt-blur)" />
      <circle cx="56" cy="60" r="3.5" fill="#6fe2cf" />

      {/* Circuit traces from right side of head */}
      <polyline
        points="86,50 105,44 118,44"
        stroke="#6fe2cf"
        strokeWidth="1.6"
        fill="none"
        strokeOpacity="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="118" cy="44" r="3" fill="#6fe2cf" fillOpacity="0.8" />

      <polyline
        points="86,62 108,62 108,72 120,72"
        stroke="#6fe2cf"
        strokeWidth="1.4"
        fill="none"
        strokeOpacity="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="120" cy="72" r="2.5" fill="#6fe2cf" fillOpacity="0.7" />

      <polyline
        points="80,80 100,92 118,92"
        stroke="#ff9d5c"
        strokeWidth="1.2"
        fill="none"
        strokeOpacity="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="118" cy="92" r="2" fill="#ff9d5c" fillOpacity="0.65" />

      {/* Left side trace */}
      <polyline
        points="20,52 8,48"
        stroke="#78c7ff"
        strokeWidth="1.2"
        fill="none"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />
      <circle cx="8" cy="48" r="2" fill="#78c7ff" fillOpacity="0.55" />

      {/* Accent dots */}
      <circle cx="14" cy="30" r="1.5" fill="#78c7ff" fillOpacity="0.5" />
      <circle cx="8" cy="100" r="1.2" fill="#78c7ff" fillOpacity="0.35" />
      <circle cx="126" cy="55" r="1.5" fill="#78c7ff" fillOpacity="0.4" />
    </svg>
  );
}

export function Market() {
  const { ref, isInView } = useInView();

  return (
    <section id="market" className="py-[100px] relative scroll-mt-[86px]">
      <div className="shell">
        <div className="relative mb-[44px]">
          <div ref={ref} className={`relative z-10 max-w-[620px] reveal ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[16px]">The market</div>
            <h2>Search is no longer just a list of links. It is an answer layer.</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              The shift is not "Google versus AI." AI is increasingly built into Google, while ChatGPT, Perplexity, commerce, video, and social all influence discovery. If your brand is hard to interpret, it becomes easy to ignore.
            </p>
          </div>
          <div className="absolute right-0 top-0 hidden lg:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.45 }}>
            <MarketIllustration />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 19H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M6 15L10 11L13 14L18 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">AI search is now built into Google's main experience</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Google made Gemini 3 the default model for AI Overviews globally and now lets users continue directly into AI Mode conversations from the results page.<sup>4</sup></p>
            <div className="inline-flex items-center gap-[8px] px-[10px] py-[7px] rounded-full bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-[0.72rem] text-ink-soft uppercase tracking-[0.12em] mt-[12px] w-fit">Google • Jan 2026</div>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '70ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M7 8C7 5.791 9.239 4 12 4C14.761 4 17 5.791 17 8C17 10.209 14.761 12 12 12C9.239 12 7 13.791 7 16C7 18.209 9.239 20 12 20C14.761 20 17 18.209 17 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">AI answers are already changing click behavior</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Bain reports that about 60% of searches now end without the user moving to another destination, and Pew found that users click traditional results far less often when AI summaries appear.<sup>1,2</sup></p>
            <div className="inline-flex items-center gap-[8px] px-[10px] py-[7px] rounded-full bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-[0.72rem] text-ink-soft uppercase tracking-[0.12em] mt-[12px] w-fit">Bain + Pew • 2025</div>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '140ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 4V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">Search now happens everywhere</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">SparkToro and Datos frame search as a behavior, not a single channel. Google still dominates, but discovery also happens on AI tools, commerce sites, video platforms, and social.<sup>3</sup></p>
            <div className="inline-flex items-center gap-[8px] px-[10px] py-[7px] rounded-full bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-[0.72rem] text-ink-soft uppercase tracking-[0.12em] mt-[12px] w-fit">SparkToro / Datos • Mar 2026</div>
          </article>
        </div>
      </div>
    </section>
  );
}
