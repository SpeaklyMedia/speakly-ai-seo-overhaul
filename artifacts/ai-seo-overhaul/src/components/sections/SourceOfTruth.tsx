import { useInView } from "@/hooks/use-in-view";
import { useParallax } from "@/hooks/use-parallax";
import ssotBg from "@assets/9A82FBF2-5FBA-43CA-882D-CF0156AC44A9_2_1775246793840.png";
import ssotFg from "@assets/9A82FBF2-5FBA-43CA-882D-CF0156AC44A9_1775246793840.png";

function WrenchParallax() {
  const { ref, offset } = useParallax(0.14);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ position: "relative", width: 280, height: 440, overflow: "hidden", borderRadius: 4 }}
    >
      <img
        src={ssotBg}
        alt=""
        style={{
          position: "absolute",
          inset: "-12px",
          width: "calc(100% + 24px)",
          height: "calc(100% + 24px)",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <img
        src={ssotFg}
        alt=""
        style={{
          position: "absolute",
          inset: "-12px",
          width: "calc(100% + 24px)",
          height: "calc(100% + 24px)",
          objectFit: "cover",
          objectPosition: "center",
          mixBlendMode: "screen",
          transform: `translateY(${offset}px)`,
        }}
      />
    </div>
  );
}

const miniCardBorders = [
  "border-l-[3px] border-l-[#6fe2cf]/60",
  "border-l-[3px] border-l-[#78c7ff]/60",
  "border-l-[3px] border-l-[#f5c86f]/55",
  "border-l-[3px] border-l-[#ff9d5c]/50",
] as const;

export function SourceOfTruth() {
  const { ref, isInView } = useInView();

  return (
    <section id="ssot" className="py-[100px] relative scroll-mt-[86px] section-ssot-bg">
      <div className="shell">
        <div className="relative mb-[44px]">

          {/* Gold/teal radiance halo behind heading */}
          <div className="absolute left-[-30px] top-[-20px] w-[500px] h-[260px] pointer-events-none" aria-hidden="true"
            style={{ background: "radial-gradient(ellipse 70% 80% at 30% 50%, rgba(245,200,111,0.07), rgba(111,226,207,0.05) 50%, transparent 75%)", filter: "blur(24px)" }}
          />

          <div ref={ref} className={`relative z-10 max-w-[620px] reveal-left ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-teal mb-[16px]">The core idea</div>
            <h2>Your website becomes the single source of truth.</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              Once your website is structured as the clearest version of your business, it starts fueling every other asset you create. Future service pages, FAQs, articles, campaigns, and sales materials become faster to produce and more consistent because the source is already clear.
            </p>
          </div>

          {/* WrenchParallax — visible from tablet, larger */}
          <div className={`absolute right-0 top-[-50px] hidden sm:block pointer-events-none reveal-right ${isInView ? "is-visible" : ""}`} aria-hidden="true" style={{ opacity: 0.88 }}>
            <WrenchParallax />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,1fr)_minmax(0,1.3fr)] gap-[22px] items-stretch">
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
