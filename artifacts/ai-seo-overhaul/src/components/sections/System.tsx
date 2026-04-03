import { useInView } from "@/hooks/use-in-view";

export function System() {
  const { ref, isInView } = useInView();

  return (
    <section id="system" className="py-[100px] relative scroll-mt-[86px]">
      <div className="shell">
        <div ref={ref} className={`max-w-[760px] mb-[44px] reveal ${isInView ? "is-visible" : ""}`}>
          <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[16px]">How it works</div>
          <h2>A three-phase engagement built for momentum</h2>
          <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
            Speakly's customer-facing process mirrors the operator system without exposing proprietary mechanics. The structure is simple: diagnose, align, then compound.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div>
              <div className="text-[2rem] font-bold text-blue/30 leading-none mb-[10px]">0</div>
              <small className="block uppercase tracking-[0.16em] text-ink-soft text-[0.76rem] mb-[10px]">Phase 0</small>
              <h3 className="mb-[18px]">Diagnose and map</h3>
            </div>
            <ul className="list-none p-0 grid gap-[12px]">
              {["Current-site visibility review", "Competitor and market snapshot", "AI-readiness gap identification", "Priority opportunity roadmap"].map(item => (
                <li key={item} className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '100ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div>
              <div className="text-[2rem] font-bold text-blue/30 leading-none mb-[10px]">1</div>
              <small className="block uppercase tracking-[0.16em] text-ink-soft text-[0.76rem] mb-[10px]">Phase 1</small>
              <h3 className="mb-[18px]">Build and align</h3>
            </div>
            <ul className="list-none p-0 grid gap-[12px]">
              {["Website source-of-truth alignment", "Core page enhancement", "Answer-ready visibility improvements", "Measurement and reporting setup"].map(item => (
                <li key={item} className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] reveal ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: '200ms' }}>
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
            <div>
              <div className="text-[2rem] font-bold text-blue/30 leading-none mb-[10px]">2</div>
              <small className="block uppercase tracking-[0.16em] text-ink-soft text-[0.76rem] mb-[10px]">Phase 2</small>
              <h3 className="mb-[18px]">Expand and compound</h3>
            </div>
            <ul className="list-none p-0 grid gap-[12px]">
              {["Supporting content expansion", "Visibility refinement cycles", "Performance review and iteration", "Growth roadmap updates"].map(item => (
                <li key={item} className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className={`mt-[48px] relative rounded-[20px] overflow-hidden border border-[#7db0e7]/12 shadow-[0_24px_80px_rgba(2,7,16,0.5)] reveal ${isInView ? "is-visible" : ""}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#071321] pointer-events-none z-10"></div>
          <img
            src={`${import.meta.env.BASE_URL}previews/system.png`}
            alt="Three-phase system — Diagnose, Build, Expand"
            className="w-full h-auto object-cover object-top max-h-[440px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
