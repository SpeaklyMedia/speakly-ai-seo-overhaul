import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import chipShield from "@assets/9B2F690A-4269-4AFA-A53E-71DACE864366_1775246793840.png";

interface FormState {
  name: string;
  email: string;
  website: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  website?: string;
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email";
  if (!form.website.trim()) errors.website = "Website is required";
  return errors;
}

function PricingCard({
  title,
  price,
  description,
  features,
  badge,
  highlight,
  emailSubject,
}: {
  title: string;
  price: string | null;
  description: string;
  features: string[];
  badge?: string;
  highlight?: boolean;
  emailSubject: string;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", website: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    window.location.href = `mailto:david@speaklymedia.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nWebsite: ${form.website}`
    )}`;
    setSubmitted(true);
  }

  return (
    <div
      className="relative flex flex-col rounded-[22px] overflow-hidden transition-all duration-300"
      style={{
        background: highlight
          ? "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(120,199,255,0.18), transparent 55%), linear-gradient(180deg, rgba(13,34,58,0.98), rgba(8,20,36,0.98))"
          : "linear-gradient(180deg, rgba(10,24,40,0.96), rgba(7,18,30,0.96))",
        border: highlight ? "1.5px solid rgba(120,199,255,0.40)" : "1px solid rgba(120,199,255,0.15)",
        boxShadow: highlight
          ? "0 0 0 1px rgba(120,199,255,0.10), 0 24px 60px rgba(2,7,16,0.45)"
          : "0 10px 30px rgba(0,0,0,0.22)",
      }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[22px]"
        style={{
          background: highlight
            ? "linear-gradient(90deg, transparent, #78c7ff 40%, #6fe2cf 70%, transparent)"
            : "linear-gradient(90deg, transparent, rgba(120,199,255,0.25) 50%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Badge */}
      {badge && (
        <div className="absolute top-[-13px] left-[50%] translate-x-[-50%] z-10">
          <span className="inline-flex items-center gap-[6px] px-[14px] py-[5px] rounded-full text-[0.72rem] font-bold tracking-[0.10em] uppercase"
            style={{ background: "linear-gradient(135deg, #6fe2cf, #78c7ff)", color: "#04101c" }}>
            ★ {badge}
          </span>
        </div>
      )}

      <div className="p-[28px] flex flex-col flex-1">
        {/* Header */}
        <div className="mb-[18px]">
          <p className="text-[0.72rem] tracking-[0.16em] uppercase text-teal/70 mb-[8px]">Speakly AI-SEO</p>
          <h3 className="text-[1.1rem] font-extrabold mb-[6px] leading-tight">{title}</h3>
          <div className="flex items-baseline gap-[6px] mb-[10px]">
            {price ? (
              <>
                <span className="text-[2rem] font-extrabold tracking-[-0.04em]" style={{ color: highlight ? "#78c7ff" : "var(--ink)" }}>{price}</span>
                <span className="text-[0.8rem] text-ink-soft">one-time</span>
              </>
            ) : (
              <span className="text-[1.1rem] font-bold text-teal">Free</span>
            )}
          </div>
          <p className="text-[0.85rem] text-ink-muted leading-[1.5]">{description}</p>
        </div>

        {/* Features */}
        <ul className="list-none p-0 grid gap-[9px] mb-[24px] flex-1">
          {features.map((f) => (
            <li key={f} className="relative pl-[20px] text-[0.85rem] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-[7px] before:h-[7px] before:rounded-full before:bg-gradient-to-br before:from-teal before:to-blue">
              {f}
            </li>
          ))}
        </ul>

        {/* CTA / Form toggle */}
        {!open && !submitted && (
          <button
            onClick={() => setOpen(true)}
            className="w-full min-h-[46px] rounded-full font-bold text-[0.9rem] tracking-[0.01em] transition-all duration-200 border"
            style={
              highlight
                ? { background: "linear-gradient(135deg, #6fe2cf, #78c7ff)", color: "#04101c", border: "none" }
                : { background: "rgba(120,199,255,0.06)", color: "var(--ink)", borderColor: "rgba(120,199,255,0.22)" }
            }
          >
            {price ? "Get started →" : "Request free assessment →"}
          </button>
        )}

        {/* Inline intake form */}
        {open && !submitted && (
          <form onSubmit={handleSubmit} className="grid gap-[10px]" noValidate>
            {(["name", "email", "website"] as const).map((field) => (
              <div key={field}>
                <input
                  type={field === "email" ? "email" : "text"}
                  placeholder={field === "name" ? "Your name" : field === "email" ? "you@company.com" : "yoursite.com"}
                  value={form[field]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
                  className="w-full px-[14px] py-[10px] rounded-[12px] text-[0.9rem] text-ink outline-none transition-all duration-200"
                  style={{
                    background: "rgba(8,20,36,0.80)",
                    border: errors[field] ? "1px solid rgba(255,100,100,0.6)" : "1px solid rgba(120,199,255,0.20)",
                  }}
                />
                {errors[field] && <p className="mt-[4px] text-[0.72rem] text-[#ff7a7a]">{errors[field]}</p>}
              </div>
            ))}
            <div className="flex gap-[8px] mt-[4px]">
              <button
                type="submit"
                className="flex-1 min-h-[42px] rounded-full font-bold text-[0.85rem] transition-all duration-200 border-none"
                style={{ background: "linear-gradient(135deg, #6fe2cf, #78c7ff)", color: "#04101c" }}
              >
                Send →
              </button>
              <button
                type="button"
                onClick={() => { setOpen(false); setErrors({}); }}
                className="px-[16px] min-h-[42px] rounded-full text-[0.85rem] text-ink-soft transition-all duration-200"
                style={{ background: "rgba(120,199,255,0.06)", border: "1px solid rgba(120,199,255,0.14)" }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Success state */}
        {submitted && (
          <div className="text-center py-[10px]">
            <div className="w-[40px] h-[40px] rounded-full mx-auto mb-[10px] flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6fe2cf22, #78c7ff22)", border: "1px solid rgba(111,226,207,0.35)" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <polyline points="3,9 7,13 15,5" stroke="#6fe2cf" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[0.85rem] font-semibold text-teal mb-[4px]">Request sent</p>
            <p className="text-[0.78rem] text-ink-muted">We'll be in touch within 1 business day.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function NextStep() {
  const { ref, isInView } = useInView();

  const cards = [
    {
      title: "Free AI-Search Assessment",
      price: null,
      description: "A no-cost snapshot of where you stand in AI-driven search today — and where the gaps are.",
      features: [
        "AI visibility snapshot",
        "Competitor comparison",
        "Source-of-truth gap review",
        "Tailored roadmap overview",
      ],
      emailSubject: "Free AI-Search Readiness Assessment",
      highlight: false,
    },
    {
      title: "Competitor Visibility Scan",
      price: "$350",
      description: "A deep competitive intelligence report showing exactly how your rivals are being surfaced by AI — and why.",
      features: [
        "Full AI-citation audit for 3–5 competitors",
        "Structured content gap analysis",
        "Answer-layer positioning report",
        "Prioritized opportunity matrix",
      ],
      emailSubject: "Competitor Visibility Scan — $350",
      highlight: false,
    },
    {
      title: "AI-SEO Visibility Overhaul",
      price: "$950",
      description: "The complete Phase 0–2 system: source-of-truth content, schema, structured data, and a content engine built to fuel AI recommendations.",
      features: [
        "Everything in the Competitor Scan",
        "Source-of-truth content architecture",
        "Schema & structured data implementation",
        "AI-ready content templates",
        "Ongoing content engine setup",
      ],
      badge: "Most popular",
      emailSubject: "AI-SEO Visibility Overhaul — $950",
      highlight: true,
    },
  ];

  return (
    <section id="next-step" className="py-[100px] relative scroll-mt-[86px] section-nextstep-bg">
      <div className="shell">
        <div
          ref={ref}
          className={`p-[34px] md:p-[50px] rounded-[28px] relative overflow-hidden reveal ${isInView ? "is-visible" : ""}`}
          style={{
            background: "radial-gradient(ellipse 90% 60% at 80% 0%, rgba(120,199,255,0.18), transparent 45%), radial-gradient(ellipse 70% 55% at 10% 100%, rgba(111,226,207,0.13), transparent 50%), linear-gradient(180deg, rgba(11,28,46,0.97), rgba(7,18,30,0.97))",
            border: "1px solid rgba(120,199,255,0.22)",
            boxShadow: "0 32px 100px rgba(2,7,16,0.55), inset 0 1px 0 rgba(111,226,207,0.06)",
          }}
        >
          {/* Top-edge teal accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[28px]" style={{ background: "linear-gradient(90deg, transparent 0%, #6fe2cf 40%, #78c7ff 70%, transparent 100%)" }} aria-hidden="true" />

          {/* Ambient bloom inside card */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 85% 0%, rgba(111,226,207,0.07), transparent 55%)" }} aria-hidden="true" />

          {/* Chip shield — enlarged */}
          <div
            className="hidden md:block absolute bottom-0 right-[48px] pointer-events-none overflow-hidden rounded-t-[22px]"
            aria-hidden="true"
            style={{
              background: "linear-gradient(to top, rgba(7,18,30,0.97) 0%, rgba(10,24,40,0.80) 100%)",
              border: "1px solid rgba(120,199,255,0.12)",
              borderBottom: "none",
              backdropFilter: "blur(14px)",
              padding: "18px 18px 0",
            }}
          >
            <img src={chipShield} alt="" width={200} height={200} style={{ display: "block", opacity: 0.84 }} />
          </div>

          <div className="relative z-10">
            {/* Section intro */}
            <div className={`mb-[42px] max-w-[720px] reveal-left ${isInView ? "is-visible" : ""}`}>
              <div className="text-[0.8rem] tracking-[0.16em] uppercase text-teal mb-[14px]">Next step</div>
              <h2 className="max-w-[16ch] mb-[16px]">Choose the right starting point for your visibility.</h2>
              <p className="text-[clamp(1.05rem,1.7vw,1.2rem)] text-ink-muted max-w-[62ch]">
                Start with a free assessment, go deeper with competitive intelligence, or commit to the full system. All paths include a conversation before anything starts.
              </p>
            </div>

            {/* Pricing cards — pt-[28px] gives room for the "Most popular" badge that sits above the card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mb-[48px] pt-[28px]">
              {cards.map((card) => (
                <PricingCard key={card.title} {...card} />
              ))}
            </div>

            {/* Best-fit + sources panel */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-[28px]">
              <aside className="p-[28px] rounded-[24px] bg-[#0a1828]/80 border border-[#7db0e7]/15">
                <h3 className="mb-[16px] text-[1rem]">Best-fit prospects</h3>
                <ul className="list-none p-0 grid gap-[11px]">
                  {[
                    "Businesses with strong real-world value but weak AI-era visibility",
                    "Teams that have outgrown a brochure-style website",
                    "Brands that want future content to be easier, faster, and more consistent",
                    "Owners who want a system, not a random pile of SEO activity",
                  ].map((item) => (
                    <li key={item} className="relative pl-[22px] text-ink-muted text-[0.9rem] before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[6px] before:h-[6px] before:rounded-full before:bg-gradient-to-br before:from-blue before:to-teal">
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>

              <aside className="p-[28px] rounded-[24px] bg-[#0a1828]/80 border border-[#7db0e7]/15">
                <p className="mb-[10px] text-[0.9rem] font-medium text-ink-soft">Sources used</p>
                <ul className="list-none p-0 grid gap-[8px] text-[0.8rem] text-ink-muted">
                  <li>1. Bain &amp; Company — consumer reliance on AI search results (Feb 2025)</li>
                  <li>2. Pew Research Center — AI summaries reduce clicks (Jul 2025)</li>
                  <li>3. SparkToro / Datos — search happens everywhere (Mar 2026)</li>
                  <li>4. Google — AI Overviews and AI Mode updates (Jan 2026)</li>
                </ul>
              </aside>
            </div>
          </div>
        </div>

        {/* Closing rule — Speakly brand treatment */}
        <div className="mt-[60px] flex flex-col items-center gap-[16px]">
          <div className="flex items-center gap-[16px] w-full max-w-[400px]">
            <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(111,226,207,0.30))" }} aria-hidden="true" />
            <div className="shrink-0 flex items-center gap-[8px] px-[14px] py-[8px] rounded-full border border-[#6fe2cf]/20 bg-[#071321]/60">
              <div className="w-[6px] h-[6px] rounded-full bg-gradient-to-br from-teal to-blue shadow-[0_0_10px_rgba(111,226,207,0.6)]" aria-hidden="true" />
              <span className="text-[0.72rem] tracking-[0.16em] uppercase text-ink-soft">Speakly Media</span>
            </div>
            <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, rgba(120,199,255,0.30), transparent)" }} aria-hidden="true" />
          </div>
          <p className="text-[0.76rem] tracking-[0.10em] text-ink-soft/50 uppercase">AI-SEO Overhaul · speaklymedia.com</p>
        </div>
      </div>
    </section>
  );
}
