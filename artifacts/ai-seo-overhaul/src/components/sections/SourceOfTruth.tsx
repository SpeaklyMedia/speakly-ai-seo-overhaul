import { useRef, useState, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import ssotBg from "@assets/9A82FBF2-5FBA-43CA-882D-CF0156AC44A9_2_1775246793840.png";
import ssotFg from "@assets/9A82FBF2-5FBA-43CA-882D-CF0156AC44A9_1775246793840.png";

function useFullBleedParallax(speeds: [number, number]) {
  const ref = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    function update() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const relY = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffsets([relY * speeds[0], relY * speeds[1]]);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [speeds[0], speeds[1]]);

  return { ref, offsets };
}

const miniCardBorders = [
  "border-l-[3px] border-l-[#6fe2cf]/60",
  "border-l-[3px] border-l-[#78c7ff]/60",
  "border-l-[3px] border-l-[#f5c86f]/55",
  "border-l-[3px] border-l-[#ff9d5c]/50",
] as const;

export function SourceOfTruth() {
  const { ref: inViewRef, isInView } = useInView();
  const { ref: sectionRef, offsets } = useFullBleedParallax([0.06, 0.14]);

  return (
    <section
      id="ssot"
      ref={sectionRef}
      className="py-[100px] relative scroll-mt-[86px] overflow-hidden"
    >
      {/* Full-bleed background: wrench beam (deep layer, static) */}
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
          src={ssotBg}
          alt=""
          style={{
            position: "absolute",
            inset: "-8% 0",
            width: "100%",
            height: "116%",
            objectFit: "cover",
            objectPosition: "center 30%",
            transform: `translateY(${offsets[0]}px)`,
          }}
        />
      </div>

      {/* Full-bleed foreground: hand+wrench (parallax lift layer) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      >
        <img
          src={ssotFg}
          alt=""
          style={{
            position: "absolute",
            inset: "-12% 0",
            width: "100%",
            height: "124%",
            objectFit: "cover",
            objectPosition: "center 25%",
            transform: `translateY(${offsets[1]}px)`,
            opacity: 0.72,
          }}
        />
      </div>

      {/* Dark overlay — reduced to let wrench image show through at all breakpoints */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "linear-gradient(110deg, rgba(4,16,28,0.72) 0%, rgba(4,16,28,0.52) 45%, rgba(4,16,28,0.28) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Section ambient gradient accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background: "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(245,200,111,0.06), transparent 45%), radial-gradient(ellipse 55% 45% at 85% 60%, rgba(111,226,207,0.05), transparent 45%)",
          pointerEvents: "none",
        }}
      />

      <div className="shell" style={{ position: "relative", zIndex: 4 }}>
        <div className="relative mb-[44px]">

          {/* Gold/teal radiance halo behind heading */}
          <div className="absolute left-[-30px] top-[-20px] w-[500px] h-[260px] pointer-events-none" aria-hidden="true"
            style={{ background: "radial-gradient(ellipse 70% 80% at 30% 50%, rgba(245,200,111,0.07), rgba(111,226,207,0.05) 50%, transparent 75%)", filter: "blur(24px)" }}
          />

          <div ref={inViewRef} className={`relative z-10 max-w-[620px] reveal-left ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-teal mb-[16px]">The core idea</div>
            <h2>Your website becomes the single source of truth.</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              Once your website is structured as the clearest version of your business, it starts fueling every other asset you create. Future service pages, FAQs, articles, campaigns, and sales materials become faster to produce and more consistent because the source is already clear.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(300px,1fr)_minmax(0,1.3fr)] gap-[22px] items-stretch">
          {/* Feature card with top-edge gold→teal gradient accent */}
          <article className={`p-[32px] rounded-[28px] relative bg-[radial-gradient(circle_at_50%_0%,rgba(120,199,255,0.18),transparent_40%),linear-gradient(180deg,rgba(11,28,46,0.96),rgba(7,18,30,0.96))] border border-[#78c7ff]/20 shadow-[0_24px_80px_rgba(2,7,16,0.45)] grid content-start gap-[20px] overflow-hidden glass-card reveal ${isInView ? "is-visible" : ""}`}>
            {/* Top-edge gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[28px]" style={{ background: "linear-gradient(90deg, #f5c86f 0%, #6fe2cf 60%, transparent 100%)" }} aria-hidden="true" />
            <div className="inline-flex items-center gap-[8px] px-[10px] py-[7px] rounded-full bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-[0.72rem] text-ink-soft uppercase tracking-[0.12em] w-fit">Website-first strategy</div>
            <strong className="block text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02] tracking-[-0.04em]">Your site stops acting like a brochure and starts acting like infrastructure.</strong>
            <p className="text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">It becomes the place where your business facts, audience routes, proof, offers, FAQs, differentiators, and positioning are aligned — so every downstream asset has a stronger starting point.</p>
            <div className="p-[18px] rounded-[18px] bg-white/5 border border-[#ff9d5c]/20 text-ink-muted">
              <strong className="block mb-[8px] text-gold">This is the fuel tank for the future content engine.</strong>
              Future service pages, local pages, articles, campaigns, email sequences, and sales assets become faster to produce — and more consistent — because the source is already clear.
            </div>
          </article>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] content-start">
            {[
              {
                title: "AI answers and recommendation flows",
                body: "Clearer source material makes you easier to interpret and easier to cite across AI-assisted discovery.",
              },
              {
                title: "Core service and location pages",
                body: "The most important pages become more consistent, more discoverable, and more persuasive.",
              },
              {
                title: "FAQs, supporting content, and proof assets",
                body: "Instead of \u201cwhat should we publish next?\u201d, you work from a structured expansion plan.",
              },
              {
                title: "Ads, social, email, and sales enablement",
                body: "Campaign language becomes stronger because it pulls from the same clarified business story.",
              },
            ].map(({ title, body }, i) => (
              <article
                key={title}
                className={`p-[22px] rounded-[22px] relative bg-[#0a1828]/70 border border-[#7db0e7]/15 min-h-[160px] glass-card reveal ${isInView ? "is-visible" : ""} ${miniCardBorders[i]}`}
                style={{ transitionDelay: `${(i + 1) * 70}ms` }}
              >
                <div className="hidden md:block absolute -left-[15px] top-1/2 w-[15px] h-[1px] bg-gradient-to-r from-[#78c7ff]/55 to-transparent"></div>
                <strong className="block mb-[10px] text-[1.04rem]">{title}</strong>
                <p className="text-ink-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
