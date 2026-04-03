import { useInView } from "@/hooks/use-in-view";

function MarketIllustration() {
  return (
    <svg
      viewBox="0 0 160 180"
      width="240"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", animation: "astronautFloat 5s ease-in-out infinite" }}
    >
      <defs>
        <radialGradient id="mkt-head-grad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffb87d" />
          <stop offset="100%" stopColor="#ff9d5c" />
        </radialGradient>
        <radialGradient id="mkt-brain-soft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6fe2cf" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6fe2cf" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mkt-halo-soft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>
        <filter id="mkt-brain-filter">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="mkt-node-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Atmospheric halo behind head */}
      <circle cx="68" cy="85" r="62" fill="url(#mkt-halo-soft)" />

      {/* Bold partial arc halo — 270° */}
      <path d="M 16 108 A 62 62 0 1 1 92 24" stroke="#ff9d5c" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeOpacity="0.65" />

      {/* Head — filled orange silhouette */}
      <path
        d="M 58 24 C 82 18 114 32 120 62 C 126 88 116 118 98 130 L 88 138 L 62 138 L 54 130 C 32 116 20 92 24 66 C 28 40 42 26 58 24 Z"
        fill="url(#mkt-head-grad)"
      />
      {/* Face shading — darker right side gives profile feel */}
      <path
        d="M 98 130 C 116 118 126 88 120 62 C 114 32 82 18 58 24 L 66 26 C 88 32 112 48 116 70 C 120 94 112 120 100 132 Z"
        fill="#c46d28"
        fillOpacity="0.30"
      />

      {/* Brain blob — filled teal inside head */}
      <ellipse cx="74" cy="78" rx="30" ry="25" fill="url(#mkt-brain-soft)" filter="url(#mkt-brain-filter)" />
      <path
        d="M 52 78 C 52 62 60 52 74 50 C 88 50 98 60 98 74 C 98 86 90 96 78 98 C 66 100 52 92 52 78 Z"
        fill="#6fe2cf"
        fillOpacity="0.88"
      />
      {/* Brain lobe fold detail */}
      <path d="M 60 72 C 64 66 74 66 78 72" stroke="#04101c" strokeWidth="2" fill="none" strokeOpacity="0.35" strokeLinecap="round" />
      <path d="M 68 84 C 74 80 84 82 86 88" stroke="#04101c" strokeWidth="2" fill="none" strokeOpacity="0.35" strokeLinecap="round" />

      {/* Eye — filled teal dot on face */}
      <circle cx="102" cy="72" r="6" fill="#6fe2cf" filter="url(#mkt-node-glow)" />
      <circle cx="102" cy="72" r="3" fill="#04101c" fillOpacity="0.5" />

      {/* Circuit traces — Manhattan routing (right angles only) */}
      {/* Trace 1 — top right */}
      <polyline points="120,56 136,56 136,40 154,40" stroke="#6fe2cf" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="154" cy="40" r="5.5" fill="#6fe2cf" filter="url(#mkt-node-glow)" />
      <circle cx="154" cy="40" r="2.5" fill="#04101c" fillOpacity="0.5" />

      {/* Trace 2 — mid right */}
      <polyline points="122,74 140,74 140,90 156,90" stroke="#6fe2cf" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="156" cy="90" r="4.5" fill="#6fe2cf" fillOpacity="0.85" />

      {/* Trace 3 — lower right */}
      <polyline points="118,96 134,96 134,112 154,112" stroke="#78c7ff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="154" cy="112" r="4" fill="#78c7ff" fillOpacity="0.85" />

      {/* Trace 4 — chin right */}
      <polyline points="102,130 118,130 118,148 140,148" stroke="#ff9d5c" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.65" />
      <circle cx="140" cy="148" r="3.5" fill="#ff9d5c" fillOpacity="0.7" />

      {/* Trace 5 — upper right, from forehead area */}
      <polyline points="80,32 100,32 100,20 140,20" stroke="#f5c86f" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <circle cx="140" cy="20" r="3.5" fill="#f5c86f" fillOpacity="0.70" />

      {/* Left side trace */}
      <polyline points="26,80 8,80 8,60" stroke="#78c7ff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55" />
      <circle cx="8" cy="60" r="3.5" fill="#78c7ff" fillOpacity="0.65" />

      {/* Accent stars */}
      <circle cx="10" cy="32" r="2.5" fill="#f5c86f" fillOpacity="0.55" />
      <circle cx="148" cy="162" r="1.8" fill="#78c7ff" fillOpacity="0.4" />
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
          <div className="absolute right-0 top-0 hidden md:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.65 }}>
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
