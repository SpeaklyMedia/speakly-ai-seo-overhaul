import { useInView } from "@/hooks/use-in-view";

export function SourceOfTruth() {
  const { ref, isInView } = useInView();

  return (
    <section id="ssot" className="py-[100px] relative scroll-mt-[86px]">
      <div className="shell">
        <div ref={ref} className={`max-w-[760px] mb-[44px] reveal ${isInView ? "is-visible" : ""}`}>
          <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[16px]">The core idea</div>
          <h2>Your website becomes the single source of truth.</h2>
          <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
            Once your website is structured as the clearest version of your business, it starts fueling every other asset you create. Future service pages, FAQs, articles, campaigns, and sales materials become faster to produce and more consistent because the source is already clear.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,1fr)_minmax(0,1.3fr)] gap-[22px] items-stretch">
          <article className={`p-[32px] rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,rgba(120,199,255,0.18),transparent_40%),linear-gradient(180deg,rgba(11,28,46,0.96),rgba(7,18,30,0.96))] border border-[#78c7ff]/20 shadow-[0_24px_80px_rgba(2,7,16,0.45)] grid content-start gap-[20px] relative reveal ${isInView ? "is-visible" : ""}`}>
            <div className="inline-flex items-center gap-[8px] px-[10px] py-[7px] rounded-full bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-[0.72rem] text-ink-soft uppercase tracking-[0.12em] w-fit">Website-first strategy</div>
            <strong className="block text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02] tracking-[-0.04em]">Your site stops acting like a brochure and starts acting like infrastructure.</strong>
            <p className="text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">It becomes the place where your business facts, audience routes, proof, offers, FAQs, differentiators, and positioning are aligned — so every downstream asset has a stronger starting point.</p>
            <div className="p-[18px] rounded-[18px] bg-white/5 border border-[#ff9d5c]/20 text-ink-muted">
              <strong className="block mb-[8px] text-gold">This is the fuel tank for the future content engine.</strong>
              Future service pages, local pages, articles, campaigns, email sequences, and sales assets become faster to produce — and more consistent — because the source is already clear.
            </div>
          </article>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] content-start">
            <article className={`p-[22px] rounded-[22px] relative bg-[#0a1828]/70 border border-[#7db0e7]/15 min-h-[160px] reveal ${isInView ? "is-visible" : ""}`}>
              <div className="hidden md:block absolute -left-[15px] top-1/2 w-[15px] h-[1px] bg-gradient-to-r from-[#78c7ff]/55 to-transparent"></div>
              <strong className="block mb-[10px] text-[1.04rem]">AI answers and recommendation flows</strong>
              <p className="text-ink-muted">Clearer source material makes you easier to interpret and easier to cite across AI-assisted discovery.</p>
            </article>
            <article className={`p-[22px] rounded-[22px] relative bg-[#0a1828]/70 border border-[#7db0e7]/15 min-h-[160px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '100ms' }}>
              <div className="hidden md:block absolute -left-[15px] top-1/2 w-[15px] h-[1px] bg-gradient-to-r from-[#78c7ff]/55 to-transparent"></div>
              <strong className="block mb-[10px] text-[1.04rem]">Core service and location pages</strong>
              <p className="text-ink-muted">The most important pages become more consistent, more discoverable, and more persuasive.</p>
            </article>
            <article className={`p-[22px] rounded-[22px] relative bg-[#0a1828]/70 border border-[#7db0e7]/15 min-h-[160px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '200ms' }}>
              <div className="hidden md:block absolute -left-[15px] top-1/2 w-[15px] h-[1px] bg-gradient-to-r from-[#78c7ff]/55 to-transparent"></div>
              <strong className="block mb-[10px] text-[1.04rem]">FAQs, supporting content, and proof assets</strong>
              <p className="text-ink-muted">Instead of “what should we publish next?”, you work from a structured expansion plan.</p>
            </article>
            <article className={`p-[22px] rounded-[22px] relative bg-[#0a1828]/70 border border-[#7db0e7]/15 min-h-[160px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '300ms' }}>
              <div className="hidden md:block absolute -left-[15px] top-1/2 w-[15px] h-[1px] bg-gradient-to-r from-[#78c7ff]/55 to-transparent"></div>
              <strong className="block mb-[10px] text-[1.04rem]">Ads, social, email, and sales enablement</strong>
              <p className="text-ink-muted">Campaign language becomes stronger because it pulls from the same clarified business story.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
