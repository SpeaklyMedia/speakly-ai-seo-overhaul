import { useInView } from "@/hooks/use-in-view";
import spaceshipIcon from "@assets/8F8B77A1-1E0D-4616-A3E6-42759D6AF3F2_1775246793840.png";

function WavingAstronautIllustration({ width = 190 }: { width?: number }) {
  return (
    <svg
      viewBox="0 0 120 200"
      width={width}
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", animation: "astronautFloat 3.8s ease-in-out infinite" }}
    >
      <defs>
        <radialGradient id="sol-body-glow" cx="50%" cy="65%" r="55%">
          <stop offset="0%" stopColor="#ff9d5c" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sol-helmet-grad" cx="30%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffb87d" />
          <stop offset="100%" stopColor="#e8884a" />
        </radialGradient>
        <radialGradient id="sol-visor-grad" cx="30%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#1a3a5c" />
          <stop offset="100%" stopColor="#04101c" />
        </radialGradient>
        <filter id="sol-visor-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <ellipse cx="58" cy="130" rx="44" ry="55" fill="url(#sol-body-glow)" />
      <ellipse cx="30" cy="96" rx="17" ry="12" fill="#e8884a" />
      <ellipse cx="86" cy="96" rx="17" ry="12" fill="#e8884a" />
      <rect x="28" y="84" width="60" height="56" rx="14" fill="#ff9d5c" />
      <rect x="38" y="94" width="40" height="28" rx="5" fill="#0d2d2a" />
      <rect x="38" y="94" width="40" height="28" rx="5" fill="#6fe2cf" fillOpacity="0.12" />
      <circle cx="46" cy="105" r="4" fill="#6fe2cf" />
      <circle cx="58" cy="105" r="4" fill="#ff9d5c" />
      <circle cx="70" cy="105" r="4" fill="#78c7ff" />
      <rect x="40" y="114" width="36" height="3" rx="1.5" fill="#6fe2cf" fillOpacity="0.35" />
      <rect x="28" y="132" width="60" height="8" rx="4" fill="#c46d28" />
      <rect x="12" y="88" width="16" height="40" rx="8" fill="#ff9d5c" />
      <ellipse cx="20" cy="132" rx="9" ry="7" fill="#c46d28" />
      <path d="M 88 92 C 96 86 106 74 102 60 C 100 54 94 53 90 57 C 93 66 92 78 88 92 Z" fill="#ff9d5c" />
      <ellipse cx="100" cy="56" rx="12" ry="9" fill="#ff9d5c" transform="rotate(-20,100,56)" />
      <ellipse cx="100" cy="56" rx="10" ry="7" fill="#c46d28" transform="rotate(-20,100,56)" />
      <ellipse cx="92" cy="50" rx="4" ry="6" fill="#c46d28" transform="rotate(20,92,50)" />
      <path d="M 94 61 C 100 57 108 58 110 62" stroke="#ff9d5c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="34" y="138" width="20" height="40" rx="10" fill="#e8884a" />
      <rect x="62" y="138" width="20" height="40" rx="10" fill="#e8884a" />
      <rect x="30" y="170" width="28" height="14" rx="7" fill="#c46d28" />
      <rect x="58" y="170" width="28" height="14" rx="7" fill="#c46d28" />
      <rect x="46" y="78" width="24" height="8" rx="4" fill="#c46d28" />
      <circle cx="58" cy="52" r="32" fill="url(#sol-helmet-grad)" />
      <circle cx="58" cy="52" r="32" fill="none" stroke="#ffb87d" strokeWidth="1.8" strokeOpacity="0.4" />
      <rect x="24" y="48" width="8" height="10" rx="4" fill="#c46d28" />
      <rect x="84" y="48" width="8" height="10" rx="4" fill="#c46d28" />
      <path d="M 40 48 C 40 36 48 30 58 30 C 68 30 76 36 76 48 C 76 60 68 66 58 66 C 48 66 40 60 40 48 Z" fill="url(#sol-visor-grad)" />
      <path d="M 42 46 C 42 38 48 34 58 34 C 62 34 65 35 68 38" stroke="#6fe2cf" strokeWidth="3.5" fill="none" strokeLinecap="round" filter="url(#sol-visor-glow)" />
      <circle cx="46" cy="40" r="3" fill="#78c7ff" fillOpacity="0.5" />
      <line x1="58" y1="20" x2="58" y2="32" stroke="#c46d28" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="58" cy="17" r="4" fill="#6fe2cf" filter="url(#sol-visor-glow)" />
      <circle cx="108" cy="20" r="2.5" fill="#78c7ff" fillOpacity="0.55" />
      <circle cx="112" cy="80" r="1.8" fill="#6fe2cf" fillOpacity="0.45" />
      <circle cx="6" cy="110" r="2" fill="#f5c86f" fillOpacity="0.45" />
    </svg>
  );
}

const overhauls = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11 4H5V20H19V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 15L19 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M14 5H19V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    title: "Market and query mapping",
    body: "Identify what people actually ask, compare, and need answered in your category — and where competitors are easier to recommend.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8"/><path d="M8 9H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 13H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    title: "Website source-of-truth rebuild",
    body: "Organize business facts, audience paths, trust signals, and supporting answers into a clearer, reusable website foundation.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 7H17V17H7V7Z" stroke="currentColor" strokeWidth="1.8"/><path d="M4 4H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M19 4H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M4 20H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M19 20H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    title: "Answer-ready core pages",
    body: "Strengthen the most important pages so they are easier to understand for both search systems and real buyers.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M4 12H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M4 17H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    title: "FAQ and objection architecture",
    body: "Turn real buyer questions into assets that support AI answers, conversion clarity, and future content expansion.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 19H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M7 15L10.5 11.5L13 14L17 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "Visibility monitoring and refinement",
    body: "Track where the business is becoming easier to surface, where gaps remain, and what should be prioritized next.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5L14.2 9.8L19 12L14.2 14.2L12 19L9.8 14.2L5 12L9.8 9.8L12 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
    title: "Human-reviewed, governed growth",
    body: "Automated where speed matters. Human-reviewed where trust matters. Governed like a system — not treated like a black box.",
  },
];

export function Solution() {
  const { ref, isInView } = useInView();

  return (
    <section id="solution" className="py-[100px] relative scroll-mt-[86px] section-solution-bg">
      <div className="shell">

        {/* Mobile astronaut — centered above content */}
        <div className="md:hidden flex justify-center mb-[30px] pointer-events-none" aria-hidden="true" style={{ opacity: 0.38 }}>
          <WavingAstronautIllustration width={140} />
        </div>

        {/* Desktop: two-column split — astronaut left, content right */}
        <div className="hidden md:grid grid-cols-[auto_1fr] gap-[52px] items-start mb-[44px]">
          {/* Left: astronaut column */}
          <div className="relative flex flex-col items-center pt-[20px] pointer-events-none" aria-hidden="true">
            {/* Teal radiance behind astronaut */}
            <div className="absolute inset-[-30px] rounded-full" style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(111,226,207,0.12), transparent 70%)", filter: "blur(20px)" }} />
            <div className={`relative reveal ${isInView ? "is-visible" : ""}`} style={{ opacity: 0.88 }}>
              <WavingAstronautIllustration width={240} />
            </div>
            <div className="mt-[14px] pointer-events-none" style={{ opacity: 0.32 }}>
              <img src={spaceshipIcon} alt="" width={72} height={72} style={{ display: "block", objectFit: "contain", mixBlendMode: "screen" }} />
            </div>
          </div>

          {/* Right: heading + intro */}
          <div ref={ref} className={`reveal-left ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-teal mb-[16px]">The solution</div>
            <h2>What the overhaul is designed to do</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              A strategic, human-reviewed overhaul that turns your website into an answer-ready visibility system. The goal is not just better rankings — it is stronger machine understanding, clearer trust, and a website foundation that powers smarter future content.
            </p>
          </div>
        </div>

        {/* Mobile heading */}
        <div className="md:hidden mb-[32px]">
          <div ref={ref} className={`reveal ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-teal mb-[16px]">The solution</div>
            <h2>What the overhaul is designed to do</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              A strategic, human-reviewed overhaul that turns your website into an answer-ready visibility system. The goal is not just better rankings — it is stronger machine understanding, clearer trust, and a website foundation that powers smarter future content.
            </p>
          </div>
        </div>

        {/* Card grid — 2-col on desktop (inside right column area) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px] mb-[40px]">
          {overhauls.map(({ icon, title, body }, i) => (
            <article
              key={title}
              className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 border-l-[3px] border-l-[#6fe2cf]/35 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] glass-card reveal ${isInView ? "is-visible" : ""}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(111,226,207,0.10),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
              <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#6fe2cf]/10 border border-[#6fe2cf]/15 text-teal" aria-hidden="true">
                {icon}
              </div>
              <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">{title}</h3>
              <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">{body}</p>
            </article>
          ))}
        </div>

        <div className={`mt-[60px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: "420ms" }}>
          <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[16px]">Why Speakly</div>
          <h2 className="mb-[24px]">The positioning advantage</h2>
          <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch] mb-[30px]">
            Most agencies treat AI search like a bolt-on. Speakly positions it as a website system, a visibility system, and a content system at the same time. The result is stronger clarity, better reuse, and a more durable growth asset.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
            {["Clarity over clever", "Proof over promises", "Systems over one-off posts"].map((standard) => (
              <div key={standard} className="p-[18px_20px] rounded-[18px] bg-gradient-to-r from-[#6fe2cf]/10 to-[#78c7ff]/5 border border-[#6fe2cf]/15 text-ink-muted font-medium flex items-center justify-center text-center">
                {standard}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
