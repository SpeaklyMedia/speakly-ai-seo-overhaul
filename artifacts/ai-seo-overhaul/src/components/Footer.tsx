export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#7db0e7]/15">
      <div className="absolute w-[600px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.06),transparent_70%)] pointer-events-none -top-[60px] left-1/2 -translate-x-1/2"></div>

      <div className="shell py-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-[48px] items-end">
          <div className="max-w-[620px]">
            <span className="inline-flex items-center gap-[10px] px-[14px] py-[8px] rounded-full border border-[#7db0e7]/20 bg-[#081624]/50 text-ink-muted text-[0.78rem] tracking-[0.14em] uppercase backdrop-blur-[12px] mb-[28px] before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full before:bg-gradient-to-br before:from-teal before:to-blue">
              AI-SEO Overhaul
            </span>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.6rem)] leading-[1.04] mb-[20px] tracking-[-0.03em]">
              AI search is changing how customers find businesses.
            </h2>
            <p className="text-ink-muted text-[clamp(1rem,1.6vw,1.15rem)] max-w-[56ch] mb-[32px]">
              Most websites were built to be browsed, not understood. Speakly's AI-SEO Overhaul turns your website into an answer-ready source of truth that helps AI search, future content, and campaigns work from one clear foundation.
            </p>
            <div className="flex flex-wrap gap-[14px]">
              <a
                href="#next-step"
                className="inline-flex items-center justify-center gap-[10px] min-h-[50px] px-[20px] rounded-full font-bold tracking-[0.01em] transition-all duration-300 border border-transparent cursor-pointer text-[#04101c] bg-gradient-to-br from-teal to-blue shadow-[0_12px_30px_rgba(70,170,214,0.28)] hover:-translate-y-[2px]"
              >
                Request a free AI-search readiness assessment
              </a>
              <a
                href="#solution"
                className="inline-flex items-center justify-center gap-[10px] min-h-[50px] px-[20px] rounded-full font-bold tracking-[0.01em] transition-all duration-300 border cursor-pointer text-ink bg-white/5 border-[#7db0e7]/20 hover:-translate-y-[2px]"
              >
                See the AI-SEO Overhaul
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-[10px] text-[0.9rem]">
            <a href="#top" className="text-ink-muted hover:text-ink transition-colors">Overview</a>
            <a href="#market" className="text-ink-muted hover:text-ink transition-colors">Market</a>
            <a href="#problem" className="text-ink-muted hover:text-ink transition-colors">Problem</a>
            <a href="#ssot" className="text-ink-muted hover:text-ink transition-colors">Source of Truth</a>
            <a href="#solution" className="text-ink-muted hover:text-ink transition-colors">Solution</a>
            <a href="#system" className="text-ink-muted hover:text-ink transition-colors">System</a>
            <a href="#proof" className="text-ink-muted hover:text-ink transition-colors">Proof</a>
            <a href="#next-step" className="text-ink-muted hover:text-ink transition-colors">Next Step</a>
          </nav>
        </div>

        <div className="mt-[56px] pt-[24px] border-t border-[#7db0e7]/10 flex flex-wrap gap-[14px] justify-between items-center text-[0.82rem] text-ink-soft">
          <span>Speakly Media — Website-first visibility systems for the answer era.</span>
          <a href="mailto:david@speaklymedia.com" className="hover:text-ink transition-colors">Questions? reach out to david@speaklymedia.com</a>
        </div>
      </div>
    </footer>
  );
}
