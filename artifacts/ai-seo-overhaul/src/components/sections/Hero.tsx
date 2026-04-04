import { useInView } from "@/hooks/use-in-view";
import { useCountUp } from "@/hooks/use-count-up";
import { StarsAnimation, AstronautFloat, PhoneAnimation } from "@/components/SpacemanAnimation";

export function Hero() {
  const { ref, isInView } = useInView();
  const { ref: statRef, isInView: statsVisible } = useInView();

  const count80  = useCountUp(80,  { enabled: statsVisible, duration: 1400 });
  const count60  = useCountUp(60,  { enabled: statsVisible, duration: 1200 });
  const count8   = useCountUp(8,   { enabled: statsVisible, duration: 900 });
  const count15  = useCountUp(15,  { enabled: statsVisible, duration: 1100 });

  return (
    <section id="top" className="pt-[92px] pb-[82px] overflow-hidden relative">
      <StarsAnimation />
      <AstronautFloat />

      <div className="shell">

        {/* Two-column hero: copy left, phone right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-[48px] lg:gap-[72px] items-start">

          {/* LEFT — hero copy */}
          <div ref={ref} className={`relative z-10 reveal ${isInView ? "is-visible" : ""}`}>
            <span className="inline-flex items-center gap-[10px] px-[14px] py-[10px] rounded-full border border-[#7db0e7]/25 bg-[#081624]/50 text-ink-muted text-[0.84rem] tracking-[0.14em] uppercase backdrop-blur-[12px] mb-6 before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-teal before:to-blue before:shadow-[0_0_14px_rgba(111,226,207,0.6)]">
              AI-SEO Overhaul
            </span>
            <h1>Turn your website into the source AI recommends.</h1>
            <p className="text-[clamp(1.08rem,1.8vw,1.2rem)] text-ink-muted max-w-[52ch] mb-[30px]">
              AI-generated answers are reshaping discovery. Speakly's AI-SEO Overhaul transforms your website into a clear, trusted, answer-ready foundation that improves visibility now and fuels smarter future content later.
            </p>
            <div className="flex flex-wrap gap-[14px] mb-[24px]">
              <a className="inline-flex items-center justify-center gap-[10px] min-h-[50px] px-[20px] rounded-full font-bold tracking-[0.01em] transition-all duration-300 border border-transparent cursor-pointer text-[#04101c] bg-gradient-to-br from-teal to-blue shadow-[0_12px_30px_rgba(70,170,214,0.28)] hover:-translate-y-[2px]" href="#next-step" data-testid="button-hero-primary">
                Request a free AI-search readiness assessment
              </a>
              <a className="inline-flex items-center justify-center gap-[10px] min-h-[50px] px-[20px] rounded-full font-bold tracking-[0.01em] transition-all duration-300 border cursor-pointer text-ink bg-white/5 border-[#7db0e7]/20 hover:-translate-y-[2px]" href="#solution" data-testid="button-hero-secondary">
                See how the overhaul works
              </a>
            </div>
            <div className="flex flex-wrap gap-[10px] mt-[14px]" aria-label="Speakly principles">
              {["Clarity over clever", "Proof over promises", "Systems over one-off posts"].map((principle) => (
                <span key={principle} className="inline-flex items-center gap-[8px] px-[14px] py-[10px] rounded-full bg-[#091624]/50 border border-[#7db0e7]/15 text-ink-muted text-[0.9rem]">
                  {principle}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — animated phone; visible at md+ centered (tablet) or in right column (lg+) */}
          <div
            className={`hidden md:flex items-start justify-center lg:justify-start relative z-[5] reveal ${isInView ? "is-visible" : ""}`}
            style={{ transitionDelay: "120ms" }}
          >
            <div style={{ width: "100%", maxWidth: "clamp(260px, 40vw, 340px)" }} className="lg:max-w-none">
              <PhoneAnimation />
            </div>
          </div>
        </div>

        {/* Data panel — full width below the 2-col row */}
        <div className={`relative mt-[52px] rounded-xl border border-[#7db0e7]/15 bg-[radial-gradient(circle_at_50%_0%,rgba(120,199,255,0.14),transparent_40%),linear-gradient(180deg,rgba(13,32,52,0.92),rgba(8,19,33,0.92))] shadow-[0_24px_80px_rgba(2,7,16,0.45)] overflow-hidden reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: "70ms" }} aria-label="AI-SEO core visual">
          <div className="absolute w-[280px] h-[280px] -right-[40px] -top-[30px] rounded-full blur-[16px] opacity-80 pointer-events-none bg-[radial-gradient(circle,rgba(120,199,255,0.42),transparent_70%)]" />
          <div className="absolute w-[260px] h-[260px] -left-[60px] -bottom-[40px] rounded-full blur-[16px] opacity-80 pointer-events-none bg-[radial-gradient(circle,rgba(255,157,92,0.28),transparent_70%)]" />

          <div className="relative p-[18px] lg:p-[26px] grid gap-[18px]">

            {/* Stat row */}
            <div ref={statRef} className="grid grid-cols-1 sm:grid-cols-3 gap-[14px]">
              <div className="p-[18px] min-h-[110px] bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px]">
                <strong className="block text-[clamp(1.44rem,2.6vw,2.25rem)] leading-none mb-[10px] tracking-[-0.04em]" style={{ color: "var(--gold)" }}>
                  {count80}%
                </strong>
                <small className="block text-ink-soft text-[0.78rem] leading-[1.5]">of search users rely on AI summaries at least 40% of the time.<sup>1</sup></small>
              </div>
              <div className="p-[18px] min-h-[110px] bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px]">
                <strong className="block text-[clamp(1.44rem,2.6vw,2.25rem)] leading-none mb-[10px] tracking-[-0.04em]" style={{ color: "var(--orange)" }}>
                  {count60}%
                </strong>
                <small className="block text-ink-soft text-[0.78rem] leading-[1.5]">of searches now end without the user progressing to another destination.<sup>1</sup></small>
              </div>
              <div className="p-[18px] min-h-[110px] bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px]">
                <strong className="block text-[clamp(1.44rem,2.6vw,2.25rem)] leading-none mb-[10px] tracking-[-0.04em]">
                  <span style={{ color: "var(--orange)" }}>{count8}%</span>
                  <span className="text-ink-soft/60 text-[0.75em] mx-[0.25em]">vs</span>
                  <span style={{ color: "var(--teal)" }}>{count15}%</span>
                </strong>
                <small className="block text-ink-soft text-[0.78rem] leading-[1.5]">Traditional-result click rate when AI summaries appear vs. when they don't.<sup>2</sup></small>
              </div>
            </div>

            {/* Core idea + mini cards row */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-[16px]">

              {/* Core idea card */}
              <div className="p-[26px] rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,rgba(120,199,255,0.18),transparent_55%),linear-gradient(180deg,rgba(11,28,46,0.94),rgba(7,18,30,0.94))] border border-[#78c7ff]/20 shadow-[0_24px_70px_rgba(0,0,0,0.35)] relative overflow-hidden">
                <div className="absolute w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.12),transparent_70%)] pointer-events-none -bottom-[40%] -right-[10%]" />
                <b className="block text-[0.82rem] uppercase tracking-[0.16em] text-blue mb-[14px]">Core idea</b>
                <strong className="block text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.03] mb-[14px]">Your website = your single source of truth</strong>
                <p className="m-0 mb-[16px] max-w-[38ch] text-ink-muted text-[clamp(1rem,1.5vw,1.08rem)]">When the source is clear, AI answers, future pages, campaigns, and sales assets all become more consistent, more discoverable, and easier to trust.</p>
                <div className="inline-flex items-center gap-[10px] px-[14px] py-[10px] rounded-[16px] bg-white/5 border border-[#ff9d5c]/20 text-ink-muted text-[0.92rem]">This is the fuel tank for the future content engine.</div>
              </div>

              {/* Mini cards 2×2 + brand trust */}
              <div className="grid grid-cols-2 gap-[14px] content-start">
                <div className="p-[18px] min-h-[120px] bg-[#091726]/80 rounded-md border border-[#7db0e7]/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px]">
                  <strong className="block text-[0.94rem] mb-[8px]">AI answers</strong>
                  <span className="block text-ink-soft text-[0.83rem] leading-[1.5]">Google AI Overviews, AI Mode, ChatGPT, Perplexity, maps, assistants.</span>
                </div>
                <div className="p-[18px] min-h-[120px] bg-[#091726]/80 rounded-md border border-[#7db0e7]/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px]">
                  <strong className="block text-[0.94rem] mb-[8px]">Core pages</strong>
                  <span className="block text-ink-soft text-[0.83rem] leading-[1.5]">Service pages, audience routes, location pages, and proof pages get sharper.</span>
                </div>
                <div className="p-[18px] min-h-[120px] bg-[#091726]/80 rounded-md border border-[#7db0e7]/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px]">
                  <strong className="block text-[0.94rem] mb-[8px]">Content engine</strong>
                  <span className="block text-ink-soft text-[0.83rem] leading-[1.5]">FAQs, articles, supporting pages, and proof assets expand from a stronger base.</span>
                </div>
                <div className="p-[18px] min-h-[120px] bg-[#091726]/80 rounded-md border border-[#7db0e7]/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px]">
                  <strong className="block text-[0.94rem] mb-[8px]">Campaigns</strong>
                  <span className="block text-ink-soft text-[0.83rem] leading-[1.5]">Ads, landing pages, email, and sales enablement pull from the same clarified story.</span>
                </div>
                <div className="col-span-2 p-[18px] rounded-md border border-[#78c7ff]/20 bg-gradient-to-r from-[#78c7ff]/10 to-[#6fe2cf]/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px]">
                  <strong className="block text-[0.94rem] mb-[8px]">Brand trust</strong>
                  <span className="block text-ink-soft text-[0.83rem] leading-[1.5]">Consistency, proof, and conversion clarity improve because the business story is no longer fragmented.</span>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="p-[18px_20px] grid gap-[10px] rounded-[20px] bg-[#07121e]/85 border border-[#ff9d5c]/20">
              <strong className="text-[0.8rem] uppercase tracking-[0.16em] text-orange">Not more random content</strong>
              <span className="text-ink-muted text-[0.9rem]">This is a website-first visibility system for the answer era — not a pile of disconnected SEO tasks.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
