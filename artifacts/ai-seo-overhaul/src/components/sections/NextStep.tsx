import { useState, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import chipShield from "@assets/9B2F690A-4269-4AFA-A53E-71DACE864366_1775246793840.png";

type FormState = "idle" | "submitting" | "success";

interface FormData {
  name: string;
  email: string;
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  website?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email";
  }
  if (!data.website.trim()) {
    errors.website = "Website URL is required";
  } else if (!/^https?:\/\/.+/.test(data.website.trim())) {
    errors.website = "Include https:// in your URL";
  }
  return errors;
}

interface PricingCard {
  id: string;
  badge?: string;
  price?: string;
  period?: string;
  title: string;
  description: string;
  items: string[];
  cta: string;
  highlighted?: boolean;
}

const PLANS: PricingCard[] = [
  {
    id: "assessment",
    title: "Free AI-Search Assessment",
    description: "See where AI can find you today, where you're invisible, and what to fix first.",
    items: [
      "AI visibility snapshot",
      "Competitor comparison",
      "Source-of-truth gap review",
      "Tailored priority roadmap",
    ],
    cta: "Request free assessment",
  },
  {
    id: "scan",
    price: "$350",
    period: "one-time",
    badge: "Most popular",
    title: "Competitor Visibility Scan",
    description: "A detailed look at what competitors are getting right in AI search — and where you can take ground.",
    items: [
      "3–5 competitor deep-dive",
      "AI citation & recommendation audit",
      "Content gap mapping",
      "Prioritized quick-win list",
      "Written findings report",
    ],
    cta: "Start competitor scan",
    highlighted: true,
  },
  {
    id: "overhaul",
    price: "$950",
    period: "one-time",
    title: "AI-SEO Visibility Overhaul",
    description: "A full Phase 0–2 engagement: diagnose, build, and compound your AI-era visibility.",
    items: [
      "Everything in Competitor Scan",
      "Website source-of-truth rebuild",
      "Core page enhancement",
      "Answer-ready FAQ architecture",
      "Visibility monitoring setup",
      "Human-reviewed throughout",
    ],
    cta: "Start visibility overhaul",
  },
];

function IntakeForm({ planId, cta }: { planId: string; cta: string }) {
  const [form, setForm] = useState<FormData>({ name: "", email: "", website: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormState>("idle");
  const nameRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof FormData, val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErr = errs.name ? "name" : errs.email ? "email" : "website";
      (document.getElementById(`${planId}-${firstErr}`) as HTMLInputElement)?.focus();
      return;
    }
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  if (status === "success") {
    return (
      <div
        style={{
          padding: "20px 16px",
          borderRadius: 16,
          background: "rgba(111,226,207,0.08)",
          border: "1px solid rgba(111,226,207,0.25)",
          textAlign: "center",
          animation: "cardFadeIn 0.4s ease forwards",
        }}
      >
        <div style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6fe2cf, #78c7ff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 12px",
          fontSize: 18,
        }}>
          ✓
        </div>
        <p style={{ margin: 0, fontWeight: 700, color: "#dbe8f7", fontSize: "0.95rem" }}>
          Got it — we'll be in touch.
        </p>
        <p style={{ margin: "8px 0 0", color: "rgba(180,210,240,0.62)", fontSize: "0.8rem" }}>
          Expect a reply within 1–2 business days.
        </p>
      </div>
    );
  }

  const inputStyle = (hasErr: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "10px 13px",
    borderRadius: 10,
    background: "rgba(4,14,28,0.60)",
    border: `1px solid ${hasErr ? "rgba(255,120,120,0.55)" : "rgba(120,199,255,0.18)"}`,
    color: "#dbe8f7",
    fontSize: "0.86rem",
    outline: "none",
    transition: "border-color 200ms",
    boxSizing: "border-box",
  });

  const errStyle: React.CSSProperties = {
    fontSize: "0.74rem",
    color: "#ff8f8f",
    marginTop: 4,
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <input
          ref={nameRef}
          id={`${planId}-name`}
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          style={inputStyle(!!errors.name)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${planId}-name-err` : undefined}
        />
        {errors.name && <p id={`${planId}-name-err`} style={errStyle}>{errors.name}</p>}
      </div>
      <div>
        <input
          id={`${planId}-email`}
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          style={inputStyle(!!errors.email)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${planId}-email-err` : undefined}
        />
        {errors.email && <p id={`${planId}-email-err`} style={errStyle}>{errors.email}</p>}
      </div>
      <div>
        <input
          id={`${planId}-website`}
          type="url"
          placeholder="https://yourwebsite.com"
          value={form.website}
          onChange={(e) => handleChange("website", e.target.value)}
          style={inputStyle(!!errors.website)}
          aria-invalid={!!errors.website}
          aria-describedby={errors.website ? `${planId}-website-err` : undefined}
        />
        {errors.website && <p id={`${planId}-website-err`} style={errStyle}>{errors.website}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          width: "100%",
          padding: "11px 16px",
          borderRadius: 32,
          border: "none",
          cursor: status === "submitting" ? "wait" : "pointer",
          fontWeight: 700,
          fontSize: "0.88rem",
          letterSpacing: "0.01em",
          transition: "all 200ms",
          background: "linear-gradient(135deg, #6fe2cf, #78c7ff)",
          color: "#04101c",
          opacity: status === "submitting" ? 0.7 : 1,
          marginTop: 2,
        }}
      >
        {status === "submitting" ? "Sending…" : cta}
      </button>
    </form>
  );
}

function PricingCard({ plan, delay, inView }: { plan: PricingCard; delay: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`reveal ${inView ? "is-visible" : ""}`}
      style={{
        transitionDelay: `${delay}ms`,
        display: "flex",
        flexDirection: "column",
        borderRadius: 22,
        overflow: "hidden",
        background: plan.highlighted
          ? "linear-gradient(180deg, rgba(12,32,58,0.97) 0%, rgba(8,22,40,0.97) 100%)"
          : "rgba(7,18,30,0.88)",
        border: plan.highlighted
          ? "1px solid rgba(111,226,207,0.35)"
          : "1px solid rgba(120,199,255,0.15)",
        boxShadow: plan.highlighted
          ? "0 0 0 1px rgba(111,226,207,0.10), 0 20px 60px rgba(0,0,0,0.40), inset 0 1px 0 rgba(111,226,207,0.09)"
          : "0 10px 36px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.04)",
        position: "relative",
      }}
    >
      {/* Highlighted top glow accent */}
      {plan.highlighted && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            borderRadius: "22px 22px 0 0",
            background: "linear-gradient(90deg, transparent, #6fe2cf 40%, #78c7ff 70%, transparent)",
          }}
        />
      )}

      <div style={{ padding: "26px 26px 20px" }}>
        {/* Badge + price row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
          {plan.badge ? (
            <span style={{
              display: "inline-block",
              padding: "4px 11px",
              borderRadius: 32,
              background: "linear-gradient(135deg, rgba(111,226,207,0.20), rgba(120,199,255,0.12))",
              border: "1px solid rgba(111,226,207,0.28)",
              fontSize: "0.70rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6fe2cf",
            }}>
              {plan.badge}
            </span>
          ) : <span />}

          {plan.price && (
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "1.55rem", fontWeight: 800, color: "#dbe8f7", letterSpacing: "-0.03em" }}>
                {plan.price}
              </span>
              {plan.period && (
                <span style={{ fontSize: "0.72rem", color: "rgba(180,210,240,0.45)", marginLeft: 4 }}>
                  {plan.period}
                </span>
              )}
            </div>
          )}
        </div>

        <h3 style={{ margin: "0 0 8px", fontSize: "1rem", fontWeight: 700, color: "#e8f2ff", lineHeight: 1.22 }}>
          {plan.title}
        </h3>
        <p style={{ margin: "0 0 16px", fontSize: "0.84rem", color: "rgba(180,210,240,0.60)", lineHeight: 1.5 }}>
          {plan.description}
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 8 }}>
          {plan.items.map((item) => (
            <li
              key={item}
              style={{
                position: "relative",
                paddingLeft: 18,
                fontSize: "0.82rem",
                color: "rgba(180,210,240,0.72)",
                lineHeight: 1.4,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  top: "0.4em",
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: plan.highlighted
                    ? "linear-gradient(135deg, #6fe2cf, #78c7ff)"
                    : "rgba(120,199,255,0.55)",
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Expandable intake form section */}
      <div style={{ padding: "0 26px 26px", marginTop: "auto" }}>
        {!expanded ? (
          <button
            onClick={() => setExpanded(true)}
            style={{
              width: "100%",
              padding: "11px 16px",
              borderRadius: 32,
              border: plan.highlighted ? "none" : "1px solid rgba(120,199,255,0.22)",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "0.88rem",
              letterSpacing: "0.01em",
              transition: "all 200ms",
              background: plan.highlighted
                ? "linear-gradient(135deg, #6fe2cf, #78c7ff)"
                : "rgba(120,199,255,0.08)",
              color: plan.highlighted ? "#04101c" : "#dbe8f7",
            }}
          >
            {plan.cta}
          </button>
        ) : (
          <div style={{ animation: "cardFadeIn 0.3s ease forwards" }}>
            <IntakeForm planId={plan.id} cta={plan.cta} />
          </div>
        )}
      </div>
    </article>
  );
}

export function NextStep() {
  const { ref, isInView } = useInView();

  return (
    <section id="next-step" className="py-[100px] relative scroll-mt-[86px] section-nextstep-bg">
      <div className="shell">
        {/* Header */}
        <div ref={ref} className={`mb-[52px] text-center reveal ${isInView ? "is-visible" : ""}`}>
          <div className="text-[0.8rem] tracking-[0.16em] uppercase text-teal mb-[14px]">Next step</div>
          <h2 className="mb-[16px]">Choose where to start.</h2>
          <p className="text-[clamp(1.08rem,1.8vw,1.25rem)] text-ink-muted max-w-[56ch] mx-auto">
            Every engagement begins with understanding your current AI-search visibility. Pick the depth that fits your situation.
          </p>
        </div>

        {/* Pricing cards — 3 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mb-[60px] items-start">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} delay={i * 90} inView={isInView} />
          ))}
        </div>

        {/* Closing panel — chip shield + sourcing */}
        <div
          className={`p-[34px] md:p-[50px] rounded-[28px] relative overflow-hidden reveal ${isInView ? "is-visible" : ""}`}
          style={{
            transitionDelay: "270ms",
            background: "radial-gradient(ellipse 90% 60% at 80% 0%, rgba(120,199,255,0.18), transparent 45%), radial-gradient(ellipse 70% 55% at 10% 100%, rgba(111,226,207,0.13), transparent 50%), linear-gradient(180deg, rgba(11,28,46,0.97), rgba(7,18,30,0.97))",
            border: "1px solid rgba(120,199,255,0.22)",
            boxShadow: "0 32px 100px rgba(2,7,16,0.55), inset 0 1px 0 rgba(111,226,207,0.06)",
          }}
        >
          {/* Top-edge teal accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[28px]" style={{ background: "linear-gradient(90deg, transparent 0%, #6fe2cf 40%, #78c7ff 70%, transparent 100%)" }} aria-hidden="true" />

          {/* Ambient bloom inside card */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 85% 0%, rgba(111,226,207,0.07), transparent 55%)" }} aria-hidden="true" />

          {/* Chip shield */}
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
            <img src={chipShield} alt="" width={180} height={180} style={{ display: "block", opacity: 0.84 }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-[40px] items-start relative z-10">
            <div>
              <div className="text-[0.8rem] tracking-[0.16em] uppercase text-blue mb-[14px]">Best-fit prospects</div>
              <h3 className="mb-[18px]">Who this is designed for</h3>
              <ul className="list-none p-0 grid gap-[12px]">
                {[
                  "Businesses with strong real-world value but weak AI-era visibility",
                  "Teams that have outgrown a brochure-style website",
                  "Brands that want future content to be easier, faster, and more consistent",
                  "Owners who want a system, not a random pile of SEO activity",
                ].map((item) => (
                  <li key={item} className="relative pl-[22px] text-ink-muted before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[8px] before:h-[8px] before:rounded-full before:bg-gradient-to-br before:from-teal before:to-blue before:shadow-[0_0_0_4px_rgba(111,226,207,0.10)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="p-[24px] rounded-[20px] bg-[#0a1828]/80 border border-[#7db0e7]/15">
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
