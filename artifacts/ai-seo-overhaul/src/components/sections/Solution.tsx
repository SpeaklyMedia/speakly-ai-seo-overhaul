import { useInView } from "@/hooks/use-in-view";
import { useParallax } from "@/hooks/use-parallax";
import spaceshipIcon from "@assets/8F8B77A1-1E0D-4616-A3E6-42759D6AF3F2_1775255124092.png";
import aiBrainHead from "@assets/FC0BFFD3-D5CB-47F7-A959-30E0EBA3A1AE_1775255124092.png";
import astronautChat from "@assets/B360D418-5C13-49A9-B3D5-E5B625E203B2_1775255124092.png";
import magnetIcon from "@assets/B8D35E42-BF1A-4E3C-AA9D-9556E2C80BD2_1775255124092.png";
import spaceOrangeBg from "@assets/IMG_0231_1775246914295.png";

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
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 12H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M10 17H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
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

const brandItems = [
  {
    src: aiBrainHead,
    alt: "AI brain — machine intelligence",
    label: "Machine intelligence",
    darkCard: true,
    delay: 0,
  },
  {
    src: astronautChat,
    alt: "Astronaut chatting — AI conversation",
    label: "AI-native copy",
    darkCard: true,
    delay: 80,
  },
  {
    src: spaceshipIcon,
    alt: "Spaceship — velocity and reach",
    label: "Visibility at scale",
    darkCard: true,
    delay: 160,
  },
  {
    src: magnetIcon,
    alt: "Magnet — attraction and authority",
    label: "Authority signals",
    darkCard: true,
    delay: 240,
  },
];

function BrandGrid({ inView }: { inView: boolean }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 14,
      }}
    >
      {brandItems.map(({ src, alt, label, darkCard, delay }, i) => (
        <div
          key={i}
          className={`reveal ${inView ? "is-visible" : ""}`}
          style={{
            transitionDelay: `${delay}ms`,
            borderRadius: 20,
            overflow: "hidden",
            background: darkCard
              ? "rgba(4, 14, 28, 0.72)"
              : "transparent",
            border: darkCard
              ? "1px solid rgba(120,199,255,0.14)"
              : "none",
            backdropFilter: darkCard ? "blur(12px)" : "none",
            WebkitBackdropFilter: darkCard ? "blur(12px)" : "none",
            boxShadow: darkCard
              ? "0 4px 24px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: `astronautFloat ${3.6 + i * 0.42}s ease-in-out ${i * 0.65}s infinite`,
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              objectFit: darkCard ? "contain" : "cover",
              padding: darkCard ? "10%" : 0,
              display: "block",
              mixBlendMode: darkCard ? "normal" : "screen",
              filter: darkCard
                ? "brightness(1.05)"
                : "drop-shadow(0 0 12px rgba(255,157,92,0.28))",
            }}
          />
          <div
            style={{
              width: "100%",
              padding: darkCard ? "6px 12px 10px" : "6px 12px 10px",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textAlign: "center",
              color: darkCard ? "rgba(120,199,255,0.75)" : "rgba(255,157,92,0.72)",
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

const WRENCH_PARTICLES = [
  { top: "10%",  right: "40%", w: 5, delay: 0,    color: "rgba(255,157,92,0.92)" },
  { top: "26%",  right: "22%", w: 3, delay: 0.8,  color: "rgba(245,200,111,0.82)" },
  { top: "44%",  right: "45%", w: 4, delay: 1.5,  color: "rgba(255,157,92,0.78)" },
  { top: "16%",  right: "12%", w: 3, delay: 1.1,  color: "rgba(245,200,111,0.72)" },
  { top: "56%",  right: "30%", w: 6, delay: 0.4,  color: "rgba(255,157,92,0.68)" },
  { top: "32%",  right: "8%",  w: 4, delay: 1.9,  color: "rgba(255,157,92,0.80)" },
  { top: "68%",  right: "38%", w: 3, delay: 0.6,  color: "rgba(245,200,111,0.65)" },
  { top: "6%",   right: "18%", w: 4, delay: 2.2,  color: "rgba(255,157,92,0.70)" },
];

export function Solution() {
  const { ref: mobileRef, isInView: mobileInView } = useInView();
  const { ref: desktopRef, isInView: desktopInView } = useInView();
  const { ref: wrenchRef, offset: wrenchOffset } = useParallax(0.15);

  return (
    <section id="solution" className="py-[100px] relative scroll-mt-[86px] overflow-hidden">
      {/* Orange-star space background — full bleed */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <img
          src={spaceOrangeBg}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            opacity: 0.28,
          }}
        />
      </div>

      {/* Dark overlay — keeps warm orange tint without overwhelming */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(180deg, rgba(4,14,24,0.82) 0%, rgba(5,16,28,0.72) 50%, rgba(4,12,22,0.85) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Warm orange radial accent overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "radial-gradient(ellipse 60% 55% at 5% 50%, rgba(111,226,207,0.07), transparent 50%), radial-gradient(ellipse 50% 40% at 95% 0%, rgba(255,157,92,0.08), transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div className="shell" style={{ position: "relative", zIndex: 3 }}>

        {/* Mobile layout: brand grid → heading → 2-col cards */}
        <div className="md:hidden">
          <div ref={mobileRef} className="mb-[28px] pointer-events-none" aria-hidden="true" style={{ maxWidth: 280, margin: "0 auto 28px" }}>
            <BrandGrid inView={mobileInView} />
          </div>
          <div className={`mb-[32px] reveal-left glass-card ${mobileInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-teal mb-[16px]">The solution</div>
            <h2>What the overhaul is designed to do</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              A strategic, human-reviewed overhaul that turns your website into an answer-ready visibility system. The goal is not just better rankings — it is stronger machine understanding, clearer trust, and a website foundation that powers smarter future content.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] mb-[40px] glass-card-group">
            {overhauls.map(({ icon, title, body }, i) => (
              <article
                key={title}
                className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 border-l-[3px] border-l-[#6fe2cf]/35 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] glass-card reveal ${mobileInView ? "is-visible" : ""}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(111,226,207,0.10),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
                <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#6fe2cf]/10 border border-[#6fe2cf]/15 text-teal" aria-hidden="true">{icon}</div>
                <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">{title}</h3>
                <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">{body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Desktop: 2-col split — brand grid LEFT, heading + 2-col cards RIGHT */}
        <div className="hidden md:grid grid-cols-[280px_1fr] gap-[52px] items-start mb-[40px]">

          {/* Left column: brand image grid */}
          <div ref={desktopRef} className="relative flex flex-col items-center pt-[8px] sticky top-[100px]" aria-hidden="true">
            <div style={{ width: "100%" }}>
              <BrandGrid inView={desktopInView} />
            </div>
            <div className="mt-[14px] pointer-events-none" style={{ opacity: 0.30 }}>
              <img src={spaceshipIcon} alt="" width={56} height={56} style={{ display: "block", objectFit: "contain", mixBlendMode: "screen" }} />
            </div>
          </div>

          {/* Right column: heading + 2-col card grid */}
          <div>
            <div className="relative mb-[32px]">
              <div className={`relative z-10 max-w-[620px] reveal-left glass-card ${desktopInView ? "is-visible" : ""}`}>
                <div className="text-[0.8rem] tracking-[0.16em] uppercase text-teal mb-[16px]">The solution</div>
                <h2>What the overhaul is designed to do</h2>
                <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
                  A strategic, human-reviewed overhaul that turns your website into an answer-ready visibility system. The goal is not just better rankings — it is stronger machine understanding, clearer trust, and a website foundation that powers smarter future content.
                </p>
              </div>
            </div>

            {/* 2-col card grid within right column */}
            <div className="grid grid-cols-2 gap-[18px] glass-card-group">
              {overhauls.map(({ icon, title, body }, i) => (
                <article
                  key={title}
                  className={`p-[22px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 border-l-[3px] border-l-[#6fe2cf]/35 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] glass-card reveal ${desktopInView ? "is-visible" : ""}`}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(111,226,207,0.10),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
                  <div className="w-[42px] h-[42px] rounded-[14px] inline-grid place-items-center mb-[16px] bg-[#6fe2cf]/10 border border-[#6fe2cf]/15 text-teal" aria-hidden="true">{icon}</div>
                  <h3 className="mb-[14px] font-extrabold tracking-[-0.03em] leading-[1.04] text-[1rem]">{title}</h3>
                  <p className="m-0 text-ink-muted text-[0.9rem]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Why Speakly — full width on all breakpoints */}
        <div className={`mt-[48px] relative reveal ${(mobileInView || desktopInView) ? "is-visible" : ""}`} style={{ transitionDelay: "420ms" }}>

          {/* Keyframes for floating particles */}
          <style>{`
            @keyframes wParticleFloat {
              0%, 100% { transform: translateY(0px) scale(1);   opacity: 0.72; }
              50%       { transform: translateY(-18px) scale(1.15); opacity: 1;    }
            }
          `}</style>

          {/* ── Parallax background layer ─────────────────────── */}
          <div
            ref={wrenchRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",
              transform: `translateY(${wrenchOffset}px)`,
            }}
          >
            {/* Neon wrench — dimmed so it reads as texture, not focal point */}
            <img
              src={`${import.meta.env.BASE_URL}wrench-illustration.webp`}
              alt=""
              style={{
                position: "absolute",
                top: "-30%",
                right: "-4%",
                width: "440px",
                opacity: 0.20,
                mixBlendMode: "screen",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />

            {/* Orange glowing particles floating around the wrench */}
            {WRENCH_PARTICLES.map(({ top, right, w, delay, color }, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top,
                  right,
                  width: w,
                  height: w,
                  borderRadius: "50%",
                  background: color,
                  boxShadow: `0 0 ${w * 5}px ${w * 2.5}px ${color}`,
                  animation: `wParticleFloat ${3.4 + delay * 0.7}s ease-in-out ${delay}s infinite`,
                }}
              />
            ))}
          </div>

          {/* ── Content — truly in front ────────────────────── */}
          <div className="relative z-10">
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
      </div>
    </section>
  );
}
