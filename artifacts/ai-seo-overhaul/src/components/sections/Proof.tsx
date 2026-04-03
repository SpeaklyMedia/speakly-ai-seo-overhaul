import { useInView } from "@/hooks/use-in-view";
import { useCountUp } from "@/hooks/use-count-up";
import astronautSpeech from "@assets/B360D418-5C13-49A9-B3D5-E5B625E203B2_1775246793840.png";
import magnetIcon from "@assets/B8D35E42-BF1A-4E3C-AA9D-9556E2C80BD2_1775246793840.png";

function TrustShieldIllustration() {
  const Person = ({ cx, cy }: { cx: number; cy: number }) => (
    <g>
      {/* Head */}
      <circle cx={cx} cy={cy} r={11} fill="#ff9d5c" />
      {/* Body / shoulders */}
      <path d={`M ${cx - 16} ${cy + 32} C ${cx - 16} ${cy + 16} ${cx + 16} ${cy + 16} ${cx + 16} ${cy + 32}`} fill="#ff9d5c" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 200 200"
      width="240"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", animation: "astronautFloat 5s ease-in-out infinite" }}
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

      {/* Outer ring glow */}
      <circle cx={100} cy={100} r={80} fill="none" stroke="#6fe2cf" strokeWidth="1" strokeOpacity="0.12" />
      <circle cx={100} cy={100} r={60} fill="url(#proof-outer-glow)" />

      {/* Dashed connecting ARCS WITH glow — N/S/E/W (quadratic bezier curves) */}
      {/* North arc: person bottom → shield top */}
      <path d="M 100 42 Q 112 50 100 60" stroke="#ff9d5c" strokeWidth="2.5" strokeDasharray="4 4" strokeOpacity="0.7" fill="none" filter="url(#proof-arc-glow)" />
      {/* East arc: shield right edge → person left side */}
      <path d="M 130 90 Q 148 88 158 100" stroke="#ff9d5c" strokeWidth="2.5" strokeDasharray="4 4" strokeOpacity="0.7" fill="none" filter="url(#proof-arc-glow)" />
      {/* West arc: person right side → shield left edge */}
      <path d="M 42 100 Q 52 88 70 90" stroke="#ff9d5c" strokeWidth="2.5" strokeDasharray="4 4" strokeOpacity="0.7" fill="none" filter="url(#proof-arc-glow)" />
      {/* South arc: shield bottom → person top */}
      <path d="M 100 134 Q 112 148 100 158" stroke="#ff9d5c" strokeWidth="2.5" strokeDasharray="4 4" strokeOpacity="0.7" fill="none" filter="url(#proof-arc-glow)" />

      {/* 4 filled person icons at compass points */}
      <Person cx={100} cy={20} />
      <Person cx={178} cy={100} />
      <Person cx={22} cy={100} />
      <Person cx={100} cy={178} />

      {/* Central shield — FILLED */}
      <path
        d="M 100 58 C 100 58 70 66 70 86 C 70 108 84 126 100 134 C 116 126 130 108 130 86 C 130 66 100 58 100 58 Z"
        fill="url(#proof-shield-grad)"
      />
      {/* Shield inner highlight */}
      <path
        d="M 100 66 C 100 66 78 73 78 88 C 78 104 88 118 100 124"
        stroke="rgba(255,210,160,0.25)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Thick teal checkmark inside shield — with glow */}
      <polyline
        points="84,98 96,110 118,82"
        stroke="#6fe2cf"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#proof-check-glow)"
      />
      <polyline
        points="84,98 96,110 118,82"
        stroke="#6fe2cf"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Accent dots at line ends */}
      <circle cx={100} cy={42} r={3} fill="#ff9d5c" fillOpacity={0.7} />
      <circle cx={158} cy={100} r={3} fill="#ff9d5c" fillOpacity={0.7} />
      <circle cx={42} cy={100} r={3} fill="#ff9d5c" fillOpacity={0.7} />
      <circle cx={100} cy={158} r={3} fill="#ff9d5c" fillOpacity={0.7} />
    </svg>
  );
}

export function Proof() {
  const { ref, isInView } = useInView();

  const count12  = useCountUp(12,  { enabled: isInView, duration: 800 });
  const count78  = useCountUp(78,  { enabled: isInView, duration: 1600 });
  const count43  = useCountUp(43,  { enabled: isInView, duration: 1300 });

  return (
    <section id="proof" className="py-[100px] relative scroll-mt-[86px]">
      <div className="shell">
        <div className="relative mb-[44px]">
          <div ref={ref} className={`relative z-10 max-w-[620px] reveal ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[16px]">Selected proof</div>
            <h2>Real work. Real visibility movement.</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              These are customer-facing proof points drawn from the existing Speakly sales deck. They show the kind of visibility and clarity gains this work is built to create.
            </p>
          </div>
          <div className="absolute right-0 top-0 hidden md:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.45 }}>
            <TrustShieldIllustration />
          </div>
          <div className="absolute right-[214px] top-[-8px] hidden lg:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.20 }}>
            <img src={astronautSpeech} alt="" width={76} height={76} style={{ display: "block", objectFit: "contain" }} />
          </div>
          <div className="absolute right-[216px] top-[72px] hidden lg:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.28 }}>
            <img src={magnetIcon} alt="" width={68} height={68} style={{ display: "block", objectFit: "contain", mixBlendMode: "screen" }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <small className="block uppercase tracking-[0.16em] text-ink-soft text-[0.76rem] mb-[10px]">Wolf Moon Wellness</small>
            <h3 className="mb-[18px]">From weak AI visibility to stronger answer-layer presence</h3>
            <div className="mb-[14px]">
              <strong className="block text-[1.4rem] mb-[4px]">
                <span style={{ color: "var(--orange)" }}>{count12}%</span>
                <span className="text-ink-soft/60 mx-[0.3em] font-normal">→</span>
                <span style={{ color: "var(--teal)" }}>{count78}%</span>
              </strong>
              <span className="text-ink-muted text-[0.9rem]">AI-indexed visibility probability</span>
            </div>
            <div className="mb-[18px]">
              <strong className="block text-[1.4rem] mb-[4px]" style={{ color: "var(--teal)" }}>+{count43}%</strong>
              <span className="text-ink-muted text-[0.9rem]">Organic traffic growth within 3 months</span>
            </div>
            <p className="m-0 text-ink-muted text-[0.95rem]">Appeared in Google, Bing Copilot, ChatGPT, and Perplexity after the visibility overhaul work described in the original deck.</p>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '70ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <small className="block uppercase tracking-[0.16em] text-ink-soft text-[0.76rem] mb-[10px]">Tula Kitchen</small>
            <h3 className="mb-[18px]">Better discoverability for the searches that actually matter</h3>
            <ul className="list-none p-0 grid gap-[12px]">
              <li className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">Improved local visibility and rankings</li>
              <li className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">Stronger alignment between site content and AI-driven queries</li>
              <li className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">Better positioning for seasonal and intent-rich discovery</li>
            </ul>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '140ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <small className="block uppercase tracking-[0.16em] text-ink-soft text-[0.76rem] mb-[10px]">Beaudette Beverage / BEValuator</small>
            <h3 className="mb-[18px]">Stronger positioning inside an AI-driven market</h3>
            <ul className="list-none p-0 grid gap-[12px]">
              <li className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">Clearer story for a changing search environment</li>
              <li className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">More structured visibility and automation roadmap</li>
              <li className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">Higher-confidence competitive positioning</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
