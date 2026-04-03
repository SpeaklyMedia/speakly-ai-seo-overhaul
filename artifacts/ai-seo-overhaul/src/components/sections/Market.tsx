import { useInView } from "@/hooks/use-in-view";

export function Market() {
  const { ref, isInView } = useInView();

  return (
    <section id="market" className="py-[100px] relative scroll-mt-[86px]">
      <div className="shell">
        <div ref={ref} className={`max-w-[760px] mb-[44px] reveal ${isInView ? "is-visible" : ""}`}>
          <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[16px]">The market</div>
          <h2>Search is no longer just a list of links. It is an answer layer.</h2>
          <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
            The shift is not "Google versus AI." AI is increasingly built into Google, while ChatGPT, Perplexity, commerce, video, and social all influence discovery. If your brand is hard to interpret, it becomes easy to ignore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 19H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M6 15L10 11L13 14L18 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">AI search is now built into Google's main experience</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Google made Gemini 3 the default model for AI Overviews globally and now lets users continue directly into AI Mode conversations from the results page.<sup>4</sup></p>
            <div className="inline-flex items-center gap-[8px] px-[10px] py-[7px] rounded-full bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-[0.72rem] text-ink-soft uppercase tracking-[0.12em] mt-[12px] w-fit">Google • Jan 2026</div>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '100ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M7 8C7 5.791 9.239 4 12 4C14.761 4 17 5.791 17 8C17 10.209 14.761 12 12 12C9.239 12 7 13.791 7 16C7 18.209 9.239 20 12 20C14.761 20 17 18.209 17 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">AI answers are already changing click behavior</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">Bain reports that about 60% of searches now end without the user moving to another destination, and Pew found that users click traditional results far less often when AI summaries appear.<sup>1,2</sup></p>
            <div className="inline-flex items-center gap-[8px] px-[10px] py-[7px] rounded-full bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-[0.72rem] text-ink-soft uppercase tracking-[0.12em] mt-[12px] w-fit">Bain + Pew • 2025</div>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '200ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div className="w-[46px] h-[46px] rounded-[14px] inline-grid place-items-center mb-[18px] bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-blue" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 4V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8"/></svg>
            </div>
            <h3 className="mb-[18px] font-extrabold tracking-[-0.03em] leading-[1.04]">Search now happens everywhere</h3>
            <p className="m-0 text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">SparkToro and Datos frame search as a behavior, not a single channel. Google still dominates, but discovery also happens on AI tools, commerce sites, video platforms, and social.<sup>3</sup></p>
            <div className="inline-flex items-center gap-[8px] px-[10px] py-[7px] rounded-full bg-[#78c7ff]/10 border border-[#78c7ff]/15 text-[0.72rem] text-ink-soft uppercase tracking-[0.12em] mt-[12px] w-fit">SparkToro / Datos • Mar 2026</div>
          </article>
        </div>

        <div className={`mt-[48px] relative rounded-[20px] overflow-hidden border border-[#7db0e7]/12 shadow-[0_24px_80px_rgba(2,7,16,0.5)] reveal ${isInView ? "is-visible" : ""}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#071321] pointer-events-none z-10"></div>
          <img
            src={`${import.meta.env.BASE_URL}previews/market.png`}
            alt="Market shift — AI answer layer overview"
            className="w-full h-auto object-cover object-top max-h-[440px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
