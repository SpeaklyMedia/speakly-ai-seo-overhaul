import { useInView } from "@/hooks/use-in-view";
import { useCountUp } from "@/hooks/use-count-up";

function TrustShieldIllustration() {
  const personAt = (cx: number, cy: number) => (
    <g>
      <circle cx={cx} cy={cy} r={9} fill="#ff9d5c" />
      <path d={`M ${cx - 14} ${cy + 28} C ${cx - 14} ${cy + 14} ${cx + 14} ${cy + 14} ${cx + 14} ${cy + 28}`} stroke="#ff9d5c" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 180 180"
      width="210"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", animation: "astronautFloat 5s ease-in-out infinite" }}
    >
      <defs>
        <radialGradient id="proof-shield-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6fe2cf" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6fe2cf" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient glow behind shield */}
      <circle cx={90} cy={90} r={50} fill="url(#proof-shield-glow)" />

      {/* Connecting arcs (dashed) */}
      {/* Top person to shield */}
      <path d="M 90 38 L 90 58" stroke="#ff9d5c" strokeWidth="1.4" strokeDasharray="3,3" strokeOpacity="0.55" />
      {/* Left person to shield */}
      <path d="M 38 90 L 62 90" stroke="#ff9d5c" strokeWidth="1.4" strokeDasharray="3,3" strokeOpacity="0.55" />
      {/* Right person to shield */}
      <path d="M 118 90 L 142 90" stroke="#ff9d5c" strokeWidth="1.4" strokeDasharray="3,3" strokeOpacity="0.55" />
      {/* Bottom person to shield */}
      <path d="M 90 142 L 90 122" stroke="#ff9d5c" strokeWidth="1.4" strokeDasharray="3,3" strokeOpacity="0.55" />

      {/* 4 person silhouettes at N/S/E/W */}
      {personAt(90, 18)}
      {personAt(18, 90)}
      {personAt(162, 90)}
      {personAt(90, 162)}

      {/* Central shield */}
      <path
        d="M 90 58 C 90 58 66 65 66 82 C 66 100 78 116 90 122 C 102 116 114 100 114 82 C 114 65 90 58 90 58 Z"
        stroke="#ff9d5c"
        strokeWidth="2.5"
        fill="rgba(255,157,92,0.08)"
        strokeLinejoin="round"
      />
      {/* Teal checkmark inside shield */}
      <polyline
        points="79,90 87,100 103,76"
        stroke="#6fe2cf"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Small connecting dots at arc ends */}
      <circle cx={90} cy={38} r={2} fill="#ff9d5c" fillOpacity={0.5} />
      <circle cx={18} cy={90} r={2} fill="#ff9d5c" fillOpacity={0.5} />
      <circle cx={162} cy={90} r={2} fill="#ff9d5c" fillOpacity={0.5} />
      <circle cx={90} cy={162} r={2} fill="#ff9d5c" fillOpacity={0.5} />
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
          <div className="absolute right-0 top-0 hidden md:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.30 }}>
            <TrustShieldIllustration />
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
