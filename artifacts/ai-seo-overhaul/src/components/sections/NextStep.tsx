import { useInView } from "@/hooks/use-in-view";
import chipShield from "@assets/9B2F690A-4269-4AFA-A53E-71DACE864366_1775246793840.png";

export function NextStep() {
  const { ref, isInView } = useInView();

  return (
    <section id="next-step" className="py-[100px] relative scroll-mt-[86px]">
      <div className="shell">
        <div ref={ref} className={`p-[34px] md:p-[50px] rounded-[28px] bg-[radial-gradient(circle_at_80%_0%,rgba(120,199,255,0.18),transparent_40%),linear-gradient(180deg,rgba(11,28,46,0.96),rgba(7,18,30,0.96))] border border-[#78c7ff]/20 shadow-[0_24px_80px_rgba(2,7,16,0.45)] relative overflow-hidden reveal ${isInView ? "is-visible" : ""}`}>

          <div
            className="hidden md:block absolute bottom-0 right-[48px] pointer-events-none overflow-hidden rounded-t-[22px]"
            aria-hidden="true"
            style={{
              background: "linear-gradient(to top, rgba(7,18,30,0.96) 0%, rgba(10,24,40,0.78) 100%)",
              border: "1px solid rgba(120,199,255,0.12)",
              borderBottom: "none",
              backdropFilter: "blur(14px)",
              padding: "18px 18px 0",
            }}
          >
            <img
              src={chipShield}
              alt=""
              width={160}
              height={160}
              style={{ display: "block", opacity: 0.80 }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-[40px] items-start relative z-10">
            <div>
              <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[14px]">Next step</div>
              <h2 className="max-w-[12ch] mb-[18px]">Start with a free AI-search readiness assessment.</h2>
              <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch] mb-[24px]">
                We'll show you where AI can see you today, where competitors are easier to recommend, and what a Phase 0 to Phase 2 overhaul could look like for your business.
              </p>

              <ul className="list-none p-0 grid gap-[12px] mb-[34px]">
                {["AI visibility snapshot", "Competitor comparison", "Source-of-truth gap review", "Tailored roadmap"].map(item => (
                  <li key={item} className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-[14px]">
                <a className="inline-flex items-center justify-center gap-[10px] min-h-[50px] px-[20px] rounded-full font-bold tracking-[0.01em] transition-all duration-300 border border-transparent cursor-pointer text-[#04101c] bg-gradient-to-br from-teal to-blue shadow-[0_12px_30px_rgba(70,170,214,0.28)] hover:-translate-y-[2px]" href="mailto:mark@speaklymedia.com?subject=AI-Search%20Readiness%20Assessment" data-testid="button-cta-primary">
                  Request assessment
                </a>
                <a className="inline-flex items-center justify-center gap-[10px] min-h-[50px] px-[20px] rounded-full font-bold tracking-[0.01em] transition-all duration-300 border cursor-pointer text-ink bg-white/5 border-[#7db0e7]/20 hover:-translate-y-[2px]" href="#market" data-testid="button-cta-secondary">
                  Review market shift
                </a>
              </div>
            </div>

            <aside className="p-[28px] rounded-[24px] bg-[#0a1828]/80 border border-[#7db0e7]/15">
              <h3 className="mb-[18px] text-[1.1rem]">Best-fit prospects</h3>
              <ul className="list-none p-0 grid gap-[12px] mb-[28px]">
                <li className="relative pl-[22px] text-ink-muted text-[0.9rem] before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[6px] before:h-[6px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal">Businesses with strong real-world value but weak AI-era visibility</li>
                <li className="relative pl-[22px] text-ink-muted text-[0.9rem] before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[6px] before:h-[6px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal">Teams that have outgrown a brochure-style website</li>
                <li className="relative pl-[22px] text-ink-muted text-[0.9rem] before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[6px] before:h-[6px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal">Brands that want future content to be easier, faster, and more consistent</li>
                <li className="relative pl-[22px] text-ink-muted text-[0.9rem] before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[6px] before:h-[6px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal">Owners who want a system, not a random pile of SEO activity</li>
              </ul>

              <div className="pt-[20px] border-t border-[#7db0e7]/15">
                <p className="mb-[10px] text-[0.9rem] font-medium text-ink-soft">Sources used</p>
                <ul className="list-none p-0 grid gap-[8px] text-[0.8rem] text-ink-muted">
                  <li>1. Bain &amp; Company — consumer reliance on AI search results (Feb 2025)</li>
                  <li>2. Pew Research Center — AI summaries reduce clicks (Jul 2025)</li>
                  <li>3. SparkToro / Datos — search happens everywhere (Mar 2026)</li>
                  <li>4. Google — AI Overviews and AI Mode updates (Jan 2026)</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
