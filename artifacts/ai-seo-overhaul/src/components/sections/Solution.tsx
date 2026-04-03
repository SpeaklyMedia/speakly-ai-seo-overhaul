import { useInView } from "@/hooks/use-in-view";

function WavingAstronautIllustration() {
  return (
    <svg
      viewBox="0 0 100 170"
      width="160"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", animation: "astronautFloat 3.8s ease-in-out infinite" }}
    >
      <defs>
        <radialGradient id="sol-glow" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sol-visor" cx="35%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#78c7ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#04101c" stopOpacity="0.8" />
        </radialGradient>
      </defs>

      {/* Body glow */}
      <ellipse cx="50" cy="110" rx="38" ry="50" fill="url(#sol-glow)" />

      {/* Helmet */}
      <circle cx="50" cy="38" r="26" fill="#ff9d5c" />
      <circle cx="50" cy="38" r="22" fill="#e8884a" />
      {/* Visor — outline only, no fill */}
      <ellipse cx="50" cy="38" rx="14" ry="15" stroke="#78c7ff" strokeWidth="1.5" fill="none" strokeOpacity="0.55" />
      {/* Helmet ring */}
      <circle cx="50" cy="38" r="26" stroke="#c46d28" strokeWidth="1.5" fill="none" />
      {/* Helmet side details */}
      <rect x="22" y="34" width="6" height="8" rx="3" fill="#c46d28" />
      <rect x="72" y="34" width="6" height="8" rx="3" fill="#c46d28" />

      {/* Neck ring */}
      <rect x="40" y="62" width="20" height="6" rx="3" fill="#c46d28" />

      {/* Torso */}
      <rect x="28" y="68" width="44" height="48" rx="10" fill="#ff9d5c" />
      {/* Chest plate */}
      <rect x="36" y="76" width="28" height="20" rx="4" fill="#c46d28" />
      {/* Chest square detail */}
      <rect x="40" y="80" width="20" height="12" rx="2" fill="rgba(4,16,28,0.4)" />
      {/* Belt */}
      <rect x="28" y="108" width="44" height="8" rx="4" fill="#c46d28" />

      {/* LEFT arm — relaxed at side */}
      <rect x="14" y="72" width="14" height="36" rx="7" fill="#ff9d5c" />
      <ellipse cx="21" cy="112" rx="7" ry="6" fill="#e8884a" />

      {/* RIGHT arm — raised in a wave */}
      <path
        d="M 72 76 C 82 72 92 58 88 44 C 86 38 80 36 74 40 C 78 52 76 64 72 76 Z"
        fill="#ff9d5c"
      />
      {/* Waving hand */}
      <ellipse cx="86" cy="40" rx="10" ry="8" fill="#ff9d5c" transform="rotate(30, 86, 40)" />
      {/* Fingers */}
      <line x1="93" y1="36" x2="96" y2="28" stroke="#e8884a" strokeWidth="3" strokeLinecap="round" />
      <line x1="88" y1="33" x2="90" y2="25" stroke="#e8884a" strokeWidth="3" strokeLinecap="round" />
      <line x1="83" y1="33" x2="84" y2="25" stroke="#e8884a" strokeWidth="3" strokeLinecap="round" />
      <line x1="79" y1="35" x2="78" y2="27" stroke="#e8884a" strokeWidth="3" strokeLinecap="round" />

      {/* Legs */}
      <rect x="34" y="114" width="14" height="36" rx="7" fill="#ff9d5c" />
      <rect x="52" y="114" width="14" height="36" rx="7" fill="#ff9d5c" />
      {/* Boots */}
      <rect x="32" y="144" width="18" height="12" rx="6" fill="#c46d28" />
      <rect x="50" y="144" width="18" height="12" rx="6" fill="#c46d28" />

      {/* Small stars */}
      <circle cx="88" cy="18" r="2" fill="#78c7ff" fillOpacity="0.6" />
      <circle cx="94" cy="50" r="1.5" fill="#6fe2cf" fillOpacity="0.5" />
      <circle cx="4" cy="80" r="1.5" fill="#78c7ff" fillOpacity="0.4" />
    </svg>
  );
}

export function Solution() {
  const { ref, isInView } = useInView();

  return (
    <section id="solution" className="py-[100px] relative scroll-mt-[86px]">
      <div className="shell">
        <div className="relative mb-[44px]">
          <div ref={ref} className={`relative z-10 max-w-[620px] reveal ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[16px]">The solution</div>
            <h2>What the overhaul is designed to do</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              A strategic, human-reviewed overhaul that turns your website into an answer-ready visibility system. The goal is not just better rankings — it is stronger machine understanding, clearer trust, and a website foundation that powers smarter future content.
            </p>
          </div>
          <div className="absolute right-0 top-[-40px] hidden lg:block pointer-events-none" aria-hidden="true" style={{ opacity: 0.50 }}>
            <WavingAstronautIllustration />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px] mb-[40px]">
          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11 4H5V20H19V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 15L19 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M14 5H19V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">Market and query mapping</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Identify what people actually ask, compare, and need answered in your category — and where competitors are easier to recommend.</p>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '70ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8"/><path d="M8 9H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 13H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">Website source-of-truth rebuild</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Organize business facts, audience paths, trust signals, and supporting answers into a clearer, reusable website foundation.</p>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '140ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 7H17V17H7V7Z" stroke="currentColor" strokeWidth="1.8"/><path d="M4 4H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M19 4H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M4 20H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M19 20H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">Answer-ready core pages</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Strengthen the most important pages so they are easier to understand for both search systems and real buyers.</p>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '210ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M4 12H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M4 17H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">FAQ and objection architecture</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Turn real buyer questions into assets that support AI answers, conversion clarity, and future content expansion.</p>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '280ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 19H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M7 15L10.5 11.5L13 14L17 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">Visibility monitoring and refinement</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Track where the business is becoming easier to surface, where gaps remain, and what should be prioritized next.</p>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '350ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5L14.2 9.8L19 12L14.2 14.2L12 19L9.8 14.2L5 12L9.8 9.8L12 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">Human-reviewed, governed growth</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Automated where speed matters. Human-reviewed where trust matters. Governed like a system — not treated like a black box.</p>
          </article>
        </div>

        <div className={`mt-[60px] reveal ${isInView ? "is-visible" : ""}`}>
          <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[16px]">Why Speakly</div>
          <h2 className="mb-[24px]">The positioning advantage</h2>
          <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch] mb-[30px]">
            Most agencies treat AI search like a bolt-on. Speakly positions it as a website system, a visibility system, and a content system at the same time. The result is stronger clarity, better reuse, and a more durable growth asset.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
            {["Clarity over clever", "Proof over promises", "Systems over one-off posts"].map((standard) => (
              <div key={standard} className="p-[18px_20px] rounded-[18px] bg-gradient-to-r from-[#78c7ff]/10 to-[#6fe2cf]/5 border border-[#78c7ff]/15 text-ink-muted font-medium flex items-center justify-center text-center">
                {standard}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
