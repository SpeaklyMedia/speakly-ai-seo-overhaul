import React from "react";
import { useInView } from "@/hooks/use-in-view";
import aiSeoHub from "@assets/300ADAF0-C994-41B2-8324-1C87A6EC9BA4_1775246793841.png";

const phases = [
  {
    num: "0",
    label: "Phase 0",
    title: "Diagnose and map",
    items: ["Current-site visibility review", "Competitor and market snapshot", "AI-readiness gap identification", "Priority opportunity roadmap"],
  },
  {
    num: "1",
    label: "Phase 1",
    title: "Build and align",
    items: ["Website source-of-truth alignment", "Core page enhancement", "Answer-ready visibility improvements", "Measurement and reporting setup"],
  },
  {
    num: "2",
    label: "Phase 2",
    title: "Expand and compound",
    items: ["Supporting content expansion", "Visibility refinement cycles", "Performance review and iteration", "Growth roadmap updates"],
  },
] as const;

function PhaseConnector() {
  return (
    <div className="hidden md:flex items-center justify-center shrink-0 w-[36px]" aria-hidden="true">
      <svg width="36" height="22" viewBox="0 0 36 22" fill="none">
        <line x1="0" y1="11" x2="19" y2="11" stroke="#78c7ff" strokeWidth="1.4" strokeOpacity="0.35" strokeDasharray="4 3" />
        <path d="M21 5 L30 11 L21 17" stroke="#78c7ff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.40" />
      </svg>
    </div>
  );
}

export function System() {
  const { ref, isInView } = useInView();

  return (
    <section id="system" className="py-[100px] relative scroll-mt-[86px] section-system-bg">
      {/* Precision grid overlay — brighter, scoped to this section */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(120,199,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(120,199,255,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 70% at 70% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 70% 50%, black 30%, transparent 80%)",
        }}
      />
      <div className="shell">
        <div className="relative mb-[44px]">
          <div ref={ref} className={`relative z-10 max-w-[620px] reveal-left ${isInView ? "is-visible" : ""}`}>
            <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[16px]">How it works</div>
            <h2>A three-phase engagement built for momentum</h2>
            <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[62ch]">
              Speakly's customer-facing process mirrors the operator system without exposing proprietary mechanics. The structure is simple: diagnose, align, then compound.
            </p>
          </div>
          <div className={`absolute right-[-20px] top-[-50px] hidden md:block pointer-events-none reveal-right ${isInView ? "is-visible" : ""}`} aria-hidden="true" style={{ opacity: 0.72 }}>
            <img
              src={aiSeoHub}
              alt=""
              width={380}
              height={380}
              style={{ display: "block", mixBlendMode: "screen", animation: "astronautFloat 5.5s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* Desktop: flex with connector arrows */}
        <div className="hidden md:flex items-stretch gap-0">
          {phases.map((phase, i) => (
            <React.Fragment key={phase.num}>
              <article
                className={`flex-1 p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] glass-card reveal ${isInView ? "is-visible" : ""}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
                <div>
                  <div
                    className="font-extrabold text-blue/20 leading-none mb-[8px] select-none"
                    style={{ fontSize: "5.5rem", letterSpacing: "-0.06em", lineHeight: 0.85 }}
                    aria-hidden="true"
                  >
                    {phase.num}
                  </div>
                  <small className="block uppercase tracking-[0.16em] text-ink-soft text-[0.76rem] mb-[10px]">{phase.label}</small>
                  <h3 className="mb-[18px]">{phase.title}</h3>
                </div>
                <ul className="list-none p-0 grid gap-[12px]">
                  {phase.items.map(item => (
                    <li key={item} className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
              {i < phases.length - 1 && <PhaseConnector />}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile: standard stack */}
        <div className="md:hidden grid gap-[18px]">
          {phases.map((phase, i) => (
            <article
              key={phase.num}
              className={`p-[24px] relative overflow-hidden bg-panel border border-[#7db0e7]/15 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px] glass-card reveal ${isInView ? "is-visible" : ""}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(120,199,255,0.14),transparent_70%)] pointer-events-none translate-y-[50%] -bottom-[20%] -right-[20%]"></div>
              <div>
                <div
                  className="font-extrabold text-blue/20 leading-none mb-[8px] select-none"
                  style={{ fontSize: "4rem", letterSpacing: "-0.06em", lineHeight: 0.85 }}
                  aria-hidden="true"
                >
                  {phase.num}
                </div>
                <small className="block uppercase tracking-[0.16em] text-ink-soft text-[0.76rem] mb-[10px]">{phase.label}</small>
                <h3 className="mb-[18px]">{phase.title}</h3>
              </div>
              <ul className="list-none p-0 grid gap-[12px]">
                {phase.items.map(item => (
                  <li key={item} className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal before:shadow-[0_0_0_4px_rgba(120,199,255,0.08)]">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
