import { useState, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useCountUp } from "@/hooks/use-count-up";
import astronautSpeech from "@assets/B360D418-5C13-49A9-B3D5-E5B625E203B2_1775246793840.png";
import magnetIcon from "@assets/B8D35E42-BF1A-4E3C-AA9D-9556E2C80BD2_1775246793840.png";

function TrustShieldIllustration({ size = 300 }: { size?: number }) {
  const Person = ({ cx, cy }: { cx: number; cy: number }) => (
    <g>
      <circle cx={cx} cy={cy} r={11} fill="#ff9d5c" />
      <path d={`M ${cx - 16} ${cy + 32} C ${cx - 16} ${cy + 16} ${cx + 16} ${cy + 16} ${cx + 16} ${cy + 32}`} fill="#ff9d5c" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="proof-outer-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6fe2cf" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#6fe2cf" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="proof-shield-grad" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#c46d28" stopOpacity="0.55" />
        </radialGradient>
        <filter id="proof-arc-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="proof-check-glow">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx={100} cy={100} r={80} fill="none" stroke="#6fe2cf" strokeWidth="1" strokeOpacity="0.12" />
      <circle cx={100} cy={100} r={60} fill="url(#proof-outer-glow)" />
      <path d="M 100 42 Q 112 50 100 60" stroke="#ff9d5c" strokeWidth="2.5" strokeDasharray="4 4" strokeOpacity="0.7" fill="none" filter="url(#proof-arc-glow)" />
      <path d="M 130 90 Q 148 88 158 100" stroke="#ff9d5c" strokeWidth="2.5" strokeDasharray="4 4" strokeOpacity="0.7" fill="none" filter="url(#proof-arc-glow)" />
      <path d="M 42 100 Q 52 88 70 90" stroke="#ff9d5c" strokeWidth="2.5" strokeDasharray="4 4" strokeOpacity="0.7" fill="none" filter="url(#proof-arc-glow)" />
      <path d="M 100 134 Q 112 148 100 158" stroke="#ff9d5c" strokeWidth="2.5" strokeDasharray="4 4" strokeOpacity="0.7" fill="none" filter="url(#proof-arc-glow)" />
      <Person cx={100} cy={20} />
      <Person cx={178} cy={100} />
      <Person cx={22} cy={100} />
      <Person cx={100} cy={178} />
      <path d="M 100 58 C 100 58 70 66 70 86 C 70 108 84 126 100 134 C 116 126 130 108 130 86 C 130 66 100 58 100 58 Z" fill="url(#proof-shield-grad)" />
      <path d="M 100 66 C 100 66 78 73 78 88 C 78 104 88 118 100 124" stroke="rgba(255,210,160,0.25)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <polyline points="84,98 96,110 118,82" stroke="#6fe2cf" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#proof-check-glow)" />
      <polyline points="84,98 96,110 118,82" stroke="#6fe2cf" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={100} cy={42} r={3} fill="#ff9d5c" fillOpacity={0.7} />
      <circle cx={158} cy={100} r={3} fill="#ff9d5c" fillOpacity={0.7} />
      <circle cx={42} cy={100} r={3} fill="#ff9d5c" fillOpacity={0.7} />
      <circle cx={100} cy={158} r={3} fill="#ff9d5c" fillOpacity={0.7} />
    </svg>
  );
}

export function Proof() {
  const { ref, isInView } = useInView();

  const count12 = useCountUp(12,  { enabled: isInView, duration: 800 });
  const count78 = useCountUp(78,  { enabled: isInView, duration: 1600 });
  const count43 = useCountUp(43,  { enabled: isInView, duration: 1300 });
  const count67 = useCountUp(67,  { enabled: isInView, duration: 1400 });
  const count3x = useCountUp(3,   { enabled: isInView, duration: 900 });
  const count2x = useCountUp(2,   { enabled: isInView, duration: 1000 });
  const count55 = useCountUp(55,  { enabled: isInView, duration: 1350 });

  const [proofComplete, setProofComplete] = useState(false);
  useEffect(() => {
    if (count78 === 78) setProofComplete(true);
  }, [count78]);

  return (
    <section id="proof" className="py-[100px] relative scroll-mt-[86px] section-proof-bg">
      <div className="shell">
        <div className="relative mb-[32px]">
          <div ref={ref} className={`relative z-10 max-w-[620px] reveal-left ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-teal mb-[16px]">Selected proof</div>
            <h2>Real work. Real visibility movement.</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              These proof points show the kind of visibility and clarity gains this work is built to create — across wellness, food, beverage, professional services, and home services categories.
            </p>
          </div>
          {/* Accent icons — desktop only, in section header area */}
          <div className="absolute right-0 top-0 hidden lg:flex gap-[10px] pointer-events-none" aria-hidden="true">
            <div style={{ opacity: 0.44 }}>
              <div style={{ width: 76, height: 76, borderRadius: 18, background: "rgba(7,18,30,0.88)", border: "1px solid rgba(120,199,255,0.15)", backdropFilter: "blur(8px)", overflow: "hidden" }}>
                <img src={astronautSpeech} alt="" width={76} height={76} style={{ display: "block", objectFit: "contain" }} />
              </div>
            </div>
            <div style={{ opacity: 0.28 }}>
              <img src={magnetIcon} alt="" width={72} height={72} style={{ display: "block", objectFit: "contain", mixBlendMode: "screen" }} />
            </div>
          </div>
        </div>

        {/* Tablet-only: TrustShield illustration between heading and cards */}
        <div className="hidden md:flex lg:hidden justify-center mb-[32px] pointer-events-none" aria-hidden="true" style={{ opacity: 0.50 }}>
          <TrustShieldIllustration size={200} />
        </div>

        {/* Hero proof card — Wellness brand */}
        <article className={`w-full mb-[18px] relative overflow-hidden rounded-[24px] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(111,226,207,0.12),transparent_55%),linear-gradient(180deg,rgba(11,28,46,0.97),rgba(7,18,30,0.97))] border border-[#6fe2cf]/20 shadow-[0_24px_80px_rgba(2,7,16,0.45),inset_0_1px_0_rgba(111,226,207,0.06)] glass-card reveal ${isInView ? "is-visible" : ""}`}>
          {/* Top-edge teal accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[24px]" style={{ background: "linear-gradient(90deg, transparent 0%, #ff9d5c 20%, #6fe2cf 70%, transparent 100%)" }} aria-hidden="true" />

          {/* TrustShield centered behind hero card content */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true" style={{ opacity: 0.055 }}>
            <TrustShieldIllustration size={300} />
          </div>

          <div className="relative z-10 p-[28px] md:p-[40px] grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-[32px] md:gap-[48px] items-start">
            {/* Left: stats + progress bar */}
            <div>
              <small className="block uppercase tracking-[0.16em] text-teal/80 text-[0.76rem] mb-[20px]">AI-SEO Overhaul Results</small>
              <div className="mb-[10px]">
                <div className="relative inline-block">
                  <strong className="block text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-[-0.05em] mb-[6px]">
                    <span style={{ color: "var(--orange)" }}>{count12}%</span>
                    <span className="text-ink-soft/50 mx-[0.3em] font-normal text-[0.55em]">→</span>
                    <span style={{ color: "var(--teal)" }}>{count78}%</span>
                  </strong>
                  {proofComplete && (
                    <div className="proof-glow-burst absolute inset-0 pointer-events-none rounded-lg" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(111,226,207,0.35), transparent 70%)" }} aria-hidden="true" />
                  )}
                </div>
                <span className="block text-ink-soft text-[0.85rem] mb-[20px]">AI-indexed visibility probability</span>

                {/* Progress bar */}
                <div className="relative h-[10px] rounded-full bg-[#071320] border border-[#7db0e7]/12 overflow-hidden" aria-label="Visibility improved from 12% to 78%">
                  {/* 12% baseline marker */}
                  <div className="absolute left-[12%] top-0 bottom-0 w-[1px] bg-[#ff9d5c]/40 z-10" aria-hidden="true" />
                  {/* Animated fill */}
                  <div
                    className="absolute left-0 top-0 bottom-0 rounded-full"
                    style={{
                      width: isInView ? "78%" : "0%",
                      transition: "width 1.6s cubic-bezier(.16,.84,.44,1) 0.2s",
                      background: "linear-gradient(90deg, #ff9d5c 0%, #f5c86f 30%, #6fe2cf 100%)",
                    }}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex justify-between mt-[6px] text-[0.7rem] text-ink-soft/60">
                  <span>12% before</span><span>78% after</span>
                </div>
              </div>

              <div className="mt-[20px] pt-[20px] border-t border-[#7db0e7]/12">
                <strong className="block text-[clamp(1.5rem,2.6vw,2rem)] leading-none tracking-[-0.04em] mb-[4px]" style={{ color: "var(--teal)" }}>+{count43}%</strong>
                <span className="block text-ink-soft text-[0.85rem]">Organic traffic growth within 3 months</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[1px] self-stretch bg-[#7db0e7]/12" aria-hidden="true" />

            {/* Right: context */}
            <div>
              <h3 className="mb-[14px] font-extrabold tracking-[-0.03em] leading-[1.04]">From weak AI visibility to stronger answer-layer presence</h3>
              <p className="text-ink-muted text-[0.95rem] mb-[20px]">Appeared in Google, Bing Copilot, ChatGPT, and Perplexity after the visibility overhaul. Source material was restructured to directly answer the questions the AI platforms were asking.</p>
              <div className="flex flex-wrap gap-[8px]">
                {["Google", "Bing Copilot", "ChatGPT", "Perplexity"].map(platform => (
                  <span key={platform} className="inline-flex items-center px-[10px] py-[5px] rounded-full bg-[#6fe2cf]/10 border border-[#6fe2cf]/20 text-[0.76rem] text-teal tracking-[0.06em]">{platform}</span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Supporting proof cards — 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] glass-card-group">

          {/* Local restaurant */}
          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] glass-card reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '70ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <small className="block uppercase tracking-[0.16em] text-ink-soft text-[0.76rem] mb-[10px]">AI-SEO Overhaul Results</small>
            <h3 className="mb-[14px]">Better discoverability for the searches that actually matter</h3>
            <div className="grid grid-cols-2 gap-[12px] mb-[16px]">
              <div className="p-[12px] rounded-[12px] bg-[#091726]/60 border border-[#7db0e7]/12">
                <strong className="block text-[1.4rem] leading-none tracking-[-0.04em] mb-[4px]" style={{ color: "var(--blue)" }}>+{count67}%</strong>
                <span className="block text-ink-soft text-[0.75rem] leading-[1.4]">Local discovery impressions</span>
              </div>
              <div className="p-[12px] rounded-[12px] bg-[#091726]/60 border border-[#7db0e7]/12">
                <strong className="block text-[1.4rem] leading-none tracking-[-0.04em] mb-[4px]" style={{ color: "var(--teal)" }}>{count3x}×</strong>
                <span className="block text-ink-soft text-[0.75rem] leading-[1.4]">More AI answer appearances</span>
              </div>
            </div>
            <ul className="list-none p-0 grid gap-[10px]">
              <li className="relative pl-[22px] text-ink-muted text-[0.9rem] before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">Stronger alignment between site content and AI-driven local queries</li>
              <li className="relative pl-[22px] text-ink-muted text-[0.9rem] before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">Better positioning for seasonal and intent-rich discovery</li>
            </ul>
          </article>

          {/* Beverage / platform brand */}
          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] glass-card reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '140ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <small className="block uppercase tracking-[0.16em] text-ink-soft text-[0.76rem] mb-[10px]">AI-SEO Overhaul Results</small>
            <h3 className="mb-[14px]">Stronger positioning inside an AI-driven market</h3>
            <div className="grid grid-cols-2 gap-[12px] mb-[16px]">
              <div className="p-[12px] rounded-[12px] bg-[#091726]/60 border border-[#7db0e7]/12">
                <strong className="block text-[1.4rem] leading-none tracking-[-0.04em] mb-[4px]" style={{ color: "var(--blue)" }}>{count2x}×</strong>
                <span className="block text-ink-soft text-[0.75rem] leading-[1.4]">AI platform mentions</span>
              </div>
              <div className="p-[12px] rounded-[12px] bg-[#091726]/60 border border-[#7db0e7]/12">
                <strong className="block text-[1.4rem] leading-none tracking-[-0.04em] mb-[4px]" style={{ color: "var(--teal)" }}>+{count55}%</strong>
                <span className="block text-ink-soft text-[0.75rem] leading-[1.4]">Structured content clarity</span>
              </div>
            </div>
            <ul className="list-none p-0 grid gap-[10px]">
              <li className="relative pl-[22px] text-ink-muted text-[0.9rem] before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">More structured visibility and automation roadmap</li>
              <li className="relative pl-[22px] text-ink-muted text-[0.9rem] before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">Higher-confidence competitive positioning across AI platforms</li>
            </ul>
          </article>
        </div>

        {/* Results disclaimer */}
        <div className="mt-[28px] flex items-start gap-[12px] px-[20px] py-[16px] rounded-[14px] bg-[#071320]/70 border border-[#7db0e7]/10">
          <div className="shrink-0 w-[6px] h-[6px] rounded-full bg-[#78c7ff]/40 mt-[7px]" aria-hidden="true" />
          <p className="text-[0.76rem] text-ink-soft/60 leading-[1.6]">
            Results may vary. Outcomes depend on starting conditions, category competitiveness, existing site architecture, and execution consistency. These proof points represent illustrative visibility movement, not guaranteed outcomes.
          </p>
        </div>

        <div className="mt-[36px] text-center">
          <a
            href="#next-step"
            className="inline-flex items-center gap-[8px] px-[22px] py-[12px] rounded-full text-[0.9rem] text-ink-soft tracking-[0.04em] btn-ghost"
            style={{ border: "1px solid rgba(120,199,255,0.20)", background: "rgba(120,199,255,0.04)" }}
          >
            Get similar results
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12H19M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
