import { useState, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import aiHeadIcon from "@assets/FC0BFFD3-D5CB-47F7-A959-30E0EBA3A1AE_1775246793840.png";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function MarketIllustration({ width = 300, reduced = false }: { width?: number; reduced?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={width}
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <radialGradient id="mkt-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6fe2cf" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#6fe2cf" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mkt-node-glow-r" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#78c7ff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#78c7ff" stopOpacity="0" />
        </radialGradient>
        <filter id="mkt-glow-f">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="mkt-soft-glow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Signal pulse paths — original spokes */}
        <path id="path-top" d="M 100 72 L 100 50" />
        <path id="path-tr" d="M 124 76 L 148 52" />
        <path id="path-right" d="M 128 100 L 158 100" />
        <path id="path-left" d="M 72 100 L 42 100" />
        {/* Signal pulse paths — sub-branch extensions */}
        <path id="path-top-sub-l" d="M 100 50 L 76 24 L 56 8" />
        <path id="path-tr-sub" d="M 148 52 L 174 30 L 196 14" />
        <path id="path-right-sub-t" d="M 158 100 L 186 78" />
        <path id="path-bottom-sub-l" d="M 100 158 L 80 182" />
      </defs>

      {/* Outer ring — faint orbit */}
      <circle cx="100" cy="100" r="86" stroke="#6fe2cf" strokeWidth="0.6" strokeOpacity="0.12" fill="none" strokeDasharray="5 8" />
      <circle cx="100" cy="100" r="60" stroke="#78c7ff" strokeWidth="0.5" strokeOpacity="0.10" fill="none" strokeDasharray="4 6" />

      {/* Core halo */}
      <circle cx="100" cy="100" r="42" fill="url(#mkt-core-glow)" filter="url(#mkt-soft-glow)" />

      {/* Core brain node */}
      <circle cx="100" cy="100" r="28" fill="#04101c" stroke="#6fe2cf" strokeWidth="1.6" strokeOpacity="0.7" />
      <circle cx="100" cy="100" r="24" fill="rgba(111,226,207,0.08)" />
      {/* Brain squiggle lines */}
      <path d="M 88 96 C 90 92 94 90 100 90 C 106 90 110 94 110 100 C 110 106 106 108 100 108" stroke="#6fe2cf" strokeWidth="2.4" fill="none" strokeLinecap="round" filter="url(#mkt-glow-f)" />
      <path d="M 88 104 C 88 108 92 110 96 108" stroke="#6fe2cf" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.65" />
      <circle cx="100" cy="100" r="5" fill="#6fe2cf" opacity="0.22" />

      {/* Spoke connections — 6 spokes */}
      {/* Top */}
      <line x1="100" y1="72" x2="100" y2="50" stroke="#6fe2cf" strokeWidth="1.2" strokeOpacity="0.45" strokeDasharray="3 4" />
      {/* Top-right */}
      <line x1="124" y1="76" x2="148" y2="52" stroke="#78c7ff" strokeWidth="1.2" strokeOpacity="0.40" strokeDasharray="3 4" />
      {/* Bottom-right */}
      <line x1="128" y1="100" x2="158" y2="100" stroke="#ff9d5c" strokeWidth="1.2" strokeOpacity="0.40" strokeDasharray="3 4" />
      {/* Bottom */}
      <line x1="100" y1="128" x2="100" y2="158" stroke="#f5c86f" strokeWidth="1.2" strokeOpacity="0.38" strokeDasharray="3 4" />
      {/* Bottom-left */}
      <line x1="76" y1="124" x2="52" y2="148" stroke="#6fe2cf" strokeWidth="1.2" strokeOpacity="0.36" strokeDasharray="3 4" />
      {/* Left */}
      <line x1="72" y1="100" x2="42" y2="100" stroke="#78c7ff" strokeWidth="1.2" strokeOpacity="0.40" strokeDasharray="3 4" />

      {/* Mid-ring nodes */}
      <circle cx="100" cy="72" r="8" fill="#04101c" stroke="#6fe2cf" strokeWidth="1.4" filter="url(#mkt-glow-f)" />
      <circle cx="100" cy="72" r="3.5" fill="#6fe2cf" opacity="0.8" />

      <circle cx="124" cy="76" r="7" fill="#04101c" stroke="#78c7ff" strokeWidth="1.2" filter="url(#mkt-glow-f)" />
      <circle cx="124" cy="76" r="3" fill="#78c7ff" opacity="0.75" />

      <circle cx="128" cy="100" r="7" fill="#04101c" stroke="#ff9d5c" strokeWidth="1.2" />
      <circle cx="128" cy="100" r="3" fill="#ff9d5c" opacity="0.70" />

      <circle cx="100" cy="128" r="7" fill="#04101c" stroke="#f5c86f" strokeWidth="1.2" />
      <circle cx="100" cy="128" r="3" fill="#f5c86f" opacity="0.68" />

      <circle cx="76" cy="124" r="7" fill="#04101c" stroke="#6fe2cf" strokeWidth="1.2" />
      <circle cx="76" cy="124" r="3" fill="#6fe2cf" opacity="0.65" />

      <circle cx="72" cy="100" r="7" fill="#04101c" stroke="#78c7ff" strokeWidth="1.2" filter="url(#mkt-glow-f)" />
      <circle cx="72" cy="100" r="3" fill="#78c7ff" opacity="0.70" />

      {/* Outer nodes */}
      <circle cx="100" cy="50" r="5.5" fill="#04101c" stroke="#6fe2cf" strokeWidth="1.2" />
      <circle cx="100" cy="50" r="2.5" fill="#6fe2cf" opacity="0.85" />

      <circle cx="148" cy="52" r="5" fill="#04101c" stroke="#78c7ff" strokeWidth="1" />
      <circle cx="148" cy="52" r="2" fill="#78c7ff" opacity="0.80" />

      <circle cx="158" cy="100" r="5" fill="#04101c" stroke="#ff9d5c" strokeWidth="1" />
      <circle cx="158" cy="100" r="2" fill="#ff9d5c" opacity="0.75" />

      <circle cx="100" cy="158" r="4.5" fill="#04101c" stroke="#f5c86f" strokeWidth="1" />
      <circle cx="100" cy="158" r="2" fill="#f5c86f" opacity="0.72" />

      <circle cx="52" cy="148" r="4.5" fill="#04101c" stroke="#6fe2cf" strokeWidth="1" />
      <circle cx="52" cy="148" r="2" fill="#6fe2cf" opacity="0.68" />

      <circle cx="42" cy="100" r="4.5" fill="#04101c" stroke="#78c7ff" strokeWidth="1" />
      <circle cx="42" cy="100" r="2" fill="#78c7ff" opacity="0.70" />

      {/* Animated signal pulses — suppressed when prefers-reduced-motion */}
      {!reduced && <>
        <circle cx="100" cy="72" r="3" fill="#6fe2cf" opacity="0">
          <animateMotion dur="2.2s" repeatCount="indefinite" begin="0s">
            <mpath xlinkHref="#path-top" />
          </animateMotion>
          <animate attributeName="opacity" values="0;0.9;0" dur="2.2s" repeatCount="indefinite" begin="0s" />
        </circle>
        <circle cx="0" cy="0" r="2.5" fill="#78c7ff" opacity="0">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.6s">
            <mpath xlinkHref="#path-tr" />
          </animateMotion>
          <animate attributeName="opacity" values="0;0.85;0" dur="2.8s" repeatCount="indefinite" begin="0.6s" />
        </circle>
        <circle cx="0" cy="0" r="2" fill="#ff9d5c" opacity="0">
          <animateMotion dur="2.4s" repeatCount="indefinite" begin="1.1s">
            <mpath xlinkHref="#path-right" />
          </animateMotion>
          <animate attributeName="opacity" values="0;0.8;0" dur="2.4s" repeatCount="indefinite" begin="1.1s" />
        </circle>
        <circle cx="0" cy="0" r="2" fill="#6fe2cf" opacity="0">
          <animateMotion dur="2.6s" repeatCount="indefinite" begin="1.8s">
            <mpath xlinkHref="#path-left" />
          </animateMotion>
          <animate attributeName="opacity" values="0;0.75;0" dur="2.6s" repeatCount="indefinite" begin="1.8s" />
        </circle>
      </>}

      {/* ── Extra branches from outer nodes for tree-like depth ── */}
      {/* Top node (100,50) → two sub-branches */}
      <line x1="100" y1="50" x2="76" y2="24" stroke="#6fe2cf" strokeWidth="0.9" strokeOpacity="0.35" strokeDasharray="3 5" />
      <line x1="100" y1="50" x2="126" y2="22" stroke="#78c7ff" strokeWidth="0.9" strokeOpacity="0.32" strokeDasharray="3 5" />
      <circle cx="76" cy="24" r="3.5" fill="#04101c" stroke="#6fe2cf" strokeWidth="0.9" />
      <circle cx="76" cy="24" r="1.5" fill="#6fe2cf" opacity="0.75" />
      <circle cx="126" cy="22" r="3.5" fill="#04101c" stroke="#78c7ff" strokeWidth="0.9" />
      <circle cx="126" cy="22" r="1.5" fill="#78c7ff" opacity="0.72" />
      {/* Sub-sub branches from top-left sub-node */}
      <line x1="76" y1="24" x2="56" y2="8" stroke="#6fe2cf" strokeWidth="0.7" strokeOpacity="0.22" strokeDasharray="2 5" />
      <circle cx="56" cy="8" r="2.5" fill="#04101c" stroke="#6fe2cf" strokeWidth="0.7" opacity="0.6" />
      <circle cx="56" cy="8" r="1" fill="#6fe2cf" opacity="0.55" />

      {/* TR node (148,52) → sub-branch */}
      <line x1="148" y1="52" x2="174" y2="30" stroke="#ff9d5c" strokeWidth="0.9" strokeOpacity="0.32" strokeDasharray="3 5" />
      <circle cx="174" cy="30" r="3.5" fill="#04101c" stroke="#ff9d5c" strokeWidth="0.9" />
      <circle cx="174" cy="30" r="1.5" fill="#ff9d5c" opacity="0.70" />
      {/* And a further sub from there */}
      <line x1="174" y1="30" x2="196" y2="14" stroke="#ff9d5c" strokeWidth="0.7" strokeOpacity="0.20" strokeDasharray="2 5" />
      <circle cx="196" cy="14" r="2.5" fill="#04101c" stroke="#ff9d5c" strokeWidth="0.7" opacity="0.5" />
      <circle cx="196" cy="14" r="1" fill="#ff9d5c" opacity="0.50" />

      {/* Right node (158,100) → two sub-branches */}
      <line x1="158" y1="100" x2="186" y2="78" stroke="#78c7ff" strokeWidth="0.9" strokeOpacity="0.30" strokeDasharray="3 5" />
      <line x1="158" y1="100" x2="188" y2="122" stroke="#6fe2cf" strokeWidth="0.9" strokeOpacity="0.28" strokeDasharray="3 5" />
      <circle cx="186" cy="78" r="3.5" fill="#04101c" stroke="#78c7ff" strokeWidth="0.9" />
      <circle cx="186" cy="78" r="1.5" fill="#78c7ff" opacity="0.68" />
      <circle cx="188" cy="122" r="3.5" fill="#04101c" stroke="#6fe2cf" strokeWidth="0.9" />
      <circle cx="188" cy="122" r="1.5" fill="#6fe2cf" opacity="0.65" />

      {/* Bottom node (100,158) → two sub-branches */}
      <line x1="100" y1="158" x2="80" y2="182" stroke="#f5c86f" strokeWidth="0.9" strokeOpacity="0.30" strokeDasharray="3 5" />
      <line x1="100" y1="158" x2="122" y2="180" stroke="#ff9d5c" strokeWidth="0.9" strokeOpacity="0.28" strokeDasharray="3 5" />
      <circle cx="80" cy="182" r="3" fill="#04101c" stroke="#f5c86f" strokeWidth="0.8" />
      <circle cx="80" cy="182" r="1.2" fill="#f5c86f" opacity="0.68" />
      <circle cx="122" cy="180" r="3" fill="#04101c" stroke="#ff9d5c" strokeWidth="0.8" />
      <circle cx="122" cy="180" r="1.2" fill="#ff9d5c" opacity="0.65" />

      {/* BL node (52,148) → sub-branch */}
      <line x1="52" y1="148" x2="26" y2="170" stroke="#6fe2cf" strokeWidth="0.9" strokeOpacity="0.28" strokeDasharray="3 5" />
      <circle cx="26" cy="170" r="3" fill="#04101c" stroke="#6fe2cf" strokeWidth="0.8" />
      <circle cx="26" cy="170" r="1.2" fill="#6fe2cf" opacity="0.60" />

      {/* Left node (42,100) → sub-branch */}
      <line x1="42" y1="100" x2="14" y2="82" stroke="#78c7ff" strokeWidth="0.9" strokeOpacity="0.26" strokeDasharray="3 5" />
      <line x1="42" y1="100" x2="12" y2="118" stroke="#78c7ff" strokeWidth="0.7" strokeOpacity="0.20" strokeDasharray="2 5" />
      <circle cx="14" cy="82" r="3" fill="#04101c" stroke="#78c7ff" strokeWidth="0.8" />
      <circle cx="14" cy="82" r="1.2" fill="#78c7ff" opacity="0.62" />
      <circle cx="12" cy="118" r="2.5" fill="#04101c" stroke="#78c7ff" strokeWidth="0.7" />
      <circle cx="12" cy="118" r="1" fill="#78c7ff" opacity="0.52" />

      {/* Extra animated signal pulses for new branches — suppressed when prefers-reduced-motion */}
      {!reduced && <>
        <circle r="1.4" fill="#6fe2cf" fillOpacity="0.9">
          <animateMotion dur="3.1s" repeatCount="indefinite" begin="0.4s">
            <mpath xlinkHref="#path-top-sub-l" />
          </animateMotion>
          <animate attributeName="opacity" values="0;0.9;0" dur="3.1s" repeatCount="indefinite" begin="0.4s" />
        </circle>
        <circle r="1.4" fill="#ff9d5c" fillOpacity="0.9">
          <animateMotion dur="3.6s" repeatCount="indefinite" begin="1.4s">
            <mpath xlinkHref="#path-tr-sub" />
          </animateMotion>
          <animate attributeName="opacity" values="0;0.85;0" dur="3.6s" repeatCount="indefinite" begin="1.4s" />
        </circle>
        <circle r="1.4" fill="#78c7ff" fillOpacity="0.9">
          <animateMotion dur="3.3s" repeatCount="indefinite" begin="2.0s">
            <mpath xlinkHref="#path-right-sub-t" />
          </animateMotion>
          <animate attributeName="opacity" values="0;0.80;0" dur="3.3s" repeatCount="indefinite" begin="2.0s" />
        </circle>
        <circle r="1.4" fill="#f5c86f" fillOpacity="0.9">
          <animateMotion dur="3.8s" repeatCount="indefinite" begin="0.9s">
            <mpath xlinkHref="#path-bottom-sub-l" />
          </animateMotion>
          <animate attributeName="opacity" values="0;0.78;0" dur="3.8s" repeatCount="indefinite" begin="0.9s" />
        </circle>
      </>}

    </svg>
  );
}

export function Market() {
  const { ref, isInView } = useInView();
  const reduced = useReducedMotion();

  return (
    <section id="market" className="py-[100px] relative scroll-mt-[86px] section-market-bg">
      <div className="shell">

        {/* Section header with ghost numeral */}
        <div className="relative mb-[44px]">
          {/* Ghost "60" behind heading */}
          <div className="absolute left-[-10px] top-[-60px] pointer-events-none select-none" aria-hidden="true">
            <span style={{
              fontSize: "clamp(9rem, 26vw, 20rem)",
              fontWeight: 800,
              color: "#78c7ff",
              opacity: 0.028,
              lineHeight: 1,
              letterSpacing: "-0.06em",
              display: "block",
            }}>60</span>
          </div>

          <div ref={ref} className={`relative z-10 max-w-[620px] reveal-left ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[16px]">The market</div>
            <h2>Search is no longer just a list of links. It is an answer layer.</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              The shift is not "Google versus AI." AI is increasingly built into Google, while ChatGPT, Perplexity, commerce, video, and social all influence discovery. If your brand is hard to interpret, it becomes easy to ignore.
            </p>
          </div>

          {/* AI neural-network illustration — shown from tablet */}
          <div className={`absolute right-0 top-0 hidden sm:block pointer-events-none reveal-right ${isInView ? "is-visible" : ""}`} aria-hidden="true" style={{ opacity: 0.78 }}>
            <MarketIllustration reduced={reduced} />
          </div>
          <div className="absolute right-[258px] top-[10px] hidden lg:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.50 }}>
            <div style={{ width: 80, height: 80, borderRadius: 18, background: "rgba(7,18,30,0.88)", border: "1px solid rgba(120,199,255,0.15)", backdropFilter: "blur(8px)", overflow: "hidden" }}>
              <img src={aiHeadIcon} alt="" width={80} height={80} style={{ display: "block", objectFit: "contain" }} />
            </div>
          </div>
        </div>

        {/* Hero stat card — "60%" takes the spotlight with connectivity elements */}
        <article className={`w-full mb-[18px] p-[32px] md:p-[40px] relative overflow-hidden rounded-[22px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(120,199,255,0.16),transparent_55%),linear-gradient(180deg,rgba(11,28,48,0.97),rgba(7,18,30,0.97))] border border-[#78c7ff]/25 shadow-[0_24px_80px_rgba(2,7,16,0.45)] backdrop-blur-[14px] glass-card reveal ${isInView ? "is-visible" : ""}`}>
          {/* Blue glow orb top-right */}
          <div className="absolute w-[320px] h-[320px] -right-[60px] -top-[60px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.12),transparent_70%)] pointer-events-none" />

          {/* Connectivity node decorations — top-right corner */}
          <div className="absolute top-[18px] right-[18px] pointer-events-none hidden md:block" aria-hidden="true">
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
              <circle cx="12" cy="12" r="5" fill="#78c7ff" fillOpacity="0.18" stroke="#78c7ff" strokeWidth="1" strokeOpacity="0.35" />
              <circle cx="12" cy="12" r="2" fill="#78c7ff" fillOpacity="0.6" />
              <circle cx="60" cy="20" r="4" fill="#6fe2cf" fillOpacity="0.15" stroke="#6fe2cf" strokeWidth="1" strokeOpacity="0.30" />
              <circle cx="60" cy="20" r="1.5" fill="#6fe2cf" fillOpacity="0.55" />
              <circle cx="108" cy="8" r="3.5" fill="#78c7ff" fillOpacity="0.14" stroke="#78c7ff" strokeWidth="0.8" strokeOpacity="0.28" />
              <circle cx="108" cy="8" r="1.5" fill="#78c7ff" fillOpacity="0.52" />
              <circle cx="90" cy="54" r="3" fill="#ff9d5c" fillOpacity="0.12" stroke="#ff9d5c" strokeWidth="0.8" strokeOpacity="0.25" />
              <circle cx="90" cy="54" r="1.2" fill="#ff9d5c" fillOpacity="0.48" />
              <line x1="17" y1="12" x2="56" y2="20" stroke="#78c7ff" strokeWidth="0.7" strokeOpacity="0.22" strokeDasharray="3 4" />
              <line x1="64" y1="20" x2="104" y2="10" stroke="#6fe2cf" strokeWidth="0.7" strokeOpacity="0.20" strokeDasharray="3 4" />
              <line x1="106" y1="12" x2="93" y2="50" stroke="#78c7ff" strokeWidth="0.7" strokeOpacity="0.18" strokeDasharray="3 4" />
              {/* Animated pulse */}
              <circle r="1.8" fill="#6fe2cf" fillOpacity="0.9">
                <animateMotion dur="3.4s" repeatCount="indefinite">
                  <mpath xlinkHref="#mkt-card-path" />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;0" dur="3.4s" repeatCount="indefinite" />
              </circle>
              <path id="mkt-card-path" d="M 12 12 L 60 20 L 108 8 L 90 54" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-[28px] md:gap-[44px] items-center">
            <div>
              <div className="text-[clamp(4rem,10vw,7rem)] font-extrabold leading-none tracking-[-0.05em] mb-[6px]" style={{ color: "var(--blue)" }}>60%</div>
              <div className="text-[0.78rem] uppercase tracking-[0.14em] text-ink-soft">Bain + Pew • 2025</div>
            </div>
            <div>
              <h3 className="mb-[14px] font-extrabold tracking-[-0.03em] leading-[1.04] text-ink">AI answers are already changing click behavior</h3>
              <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.1rem)]">Bain reports that about 60% of searches now end without the user moving to another destination, and Pew found that users click traditional results far less often when AI summaries appear.<sup>1,2</sup></p>
            </div>
          </div>
        </article>

        {/* Two supporting cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] glass-card reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: "70ms" }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 19H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M6 15L10 11L13 14L18 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">AI search is now built into Google's main experience</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Google made Gemini 3 the default model for AI Overviews globally and now lets users continue directly into AI Mode conversations from the results page.<sup>4</sup></p>
            <div className="inline-flex items-center gap-[8px] px-[10px] py-[7px] rounded-full bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-[0.72rem] text-ink-soft uppercase tracking-[0.12em] mt-[12px] w-fit">Google • Jan 2026</div>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] glass-card reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: "140ms" }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 4V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">Search now happens everywhere</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">SparkToro and Datos frame search as a behavior, not a single channel. Google still dominates, but discovery also happens on AI tools, commerce sites, video platforms, and social.<sup>3</sup></p>
            <div className="inline-flex items-center gap-[8px] px-[10px] py-[7px] rounded-full bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-[0.72rem] text-ink-soft uppercase tracking-[0.12em] mt-[12px] w-fit">SparkToro / Datos • Mar 2026</div>
          </article>
        </div>

        {/* Mobile-only: neural-network illustration below cards */}
        <div className="sm:hidden mt-[36px] flex justify-center pointer-events-none" aria-hidden="true" style={{ opacity: 0.62 }}>
          <MarketIllustration width={220} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
