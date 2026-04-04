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

function validateUrl(value: string): boolean {
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) {
    errors.name = "Name is required";
  }
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!form.website.trim()) {
    errors.website = "Website URL is required";
  } else if (!validateUrl(form.website.trim())) {
    errors.website = "Enter a valid website URL";
  }
  return errors;
}

function FreeAssessmentCard({
  title,
  description,
  features,
  submitLabel,
  emailSubject,
}: {
  title: string;
  description: string;
  features: string[];
  submitLabel: string;
  emailSubject: string;
}) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", website: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const idSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    console.log("NextStep form submission:", { tier: title, emailSubject, ...form });
    await new Promise((res) => setTimeout(res, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div
      className="relative flex flex-col rounded-[22px] overflow-hidden h-full transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(120,199,255,0.22),0_28px_64px_rgba(2,7,16,0.48)]"
      style={{
        background: "linear-gradient(180deg, rgba(10,24,40,0.96), rgba(7,18,30,0.96))",
        border: "1px solid rgba(120,199,255,0.15)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[22px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(120,199,255,0.25) 50%, transparent)",
        }}
        aria-hidden="true"
      />
      <div className="p-[28px] flex flex-col flex-1">
        <div className="mb-[20px]">
          <p className="text-[0.72rem] tracking-[0.16em] uppercase text-teal/70 mb-[8px]">Speakly AI-SEO</p>
          <h3 className="mb-[8px] leading-[1.18]" style={{ fontSize: "clamp(1rem, 1.8vw, 1.14rem)", fontWeight: 800 }}>
            {title}
          </h3>
          <div className="flex items-baseline gap-[6px] mb-[12px]">
            <span className="text-[1.15rem] font-bold text-teal">Free</span>
          </div>
          <p className="text-[0.85rem] text-ink-muted leading-[1.56]">{description}</p>
        </div>
        <ul className="list-none p-0 grid gap-[8px] mb-[24px]">
          {features.map((f) => (
            <li key={f} className="relative pl-[20px] text-[0.84rem] text-ink-muted" style={{ lineHeight: 1.5 }}>
              <span
                className="absolute left-0 top-[0.52em] w-[7px] h-[7px] rounded-full"
                style={{ background: "linear-gradient(135deg, #6fe2cf, #78c7ff)", display: "block" }}
                aria-hidden="true"
              />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          {submitted ? (
            <div
              className="flex flex-col items-center text-center py-[20px] px-[10px] rounded-[16px]"
              style={{
                background: "rgba(111,226,207,0.06)",
                border: "1px solid rgba(111,226,207,0.22)",
              }}
            >
              <div
                className="w-[44px] h-[44px] rounded-full mb-[12px] flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(111,226,207,0.18), rgba(120,199,255,0.18))",
                  border: "1px solid rgba(111,226,207,0.35)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <polyline
                    points="3.5,10 8,14.5 16.5,5.5"
                    stroke="#6fe2cf"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-[0.92rem] font-semibold text-teal mb-[4px]">We'll be in touch!</p>
              <p className="text-[0.78rem] text-ink-muted">Expect a reply within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-[10px]" noValidate>
              <div>
                <label className="sr-only" htmlFor={`name-${idSlug}`}>Your name</label>
                <input
                  id={`name-${idSlug}`}
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={submitting}
                  className="w-full px-[14px] py-[10px] rounded-[11px] text-[0.88rem] text-ink outline-none transition-all duration-200 placeholder:text-ink-soft/50 disabled:opacity-60"
                  style={{
                    background: "rgba(8,20,36,0.80)",
                    border: errors.name ? "1px solid rgba(255,100,100,0.65)" : "1px solid rgba(120,199,255,0.20)",
                  }}
                />
                {errors.name && <p className="mt-[4px] text-[0.71rem] text-[#ff8a8a]">{errors.name}</p>}
              </div>
              <div>
                <label className="sr-only" htmlFor={`email-${idSlug}`}>Email address</label>
                <input
                  id={`email-${idSlug}`}
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={submitting}
                  className="w-full px-[14px] py-[10px] rounded-[11px] text-[0.88rem] text-ink outline-none transition-all duration-200 placeholder:text-ink-soft/50 disabled:opacity-60"
                  style={{
                    background: "rgba(8,20,36,0.80)",
                    border: errors.email ? "1px solid rgba(255,100,100,0.65)" : "1px solid rgba(120,199,255,0.20)",
                  }}
                />
                {errors.email && <p className="mt-[4px] text-[0.71rem] text-[#ff8a8a]">{errors.email}</p>}
              </div>
              <div>
                <label className="sr-only" htmlFor={`website-${idSlug}`}>Website URL</label>
                <input
                  id={`website-${idSlug}`}
                  type="text"
                  placeholder="yoursite.com"
                  autoComplete="url"
                  value={form.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  disabled={submitting}
                  className="w-full px-[14px] py-[10px] rounded-[11px] text-[0.88rem] text-ink outline-none transition-all duration-200 placeholder:text-ink-soft/50 disabled:opacity-60"
                  style={{
                    background: "rgba(8,20,36,0.80)",
                    border: errors.website ? "1px solid rgba(255,100,100,0.65)" : "1px solid rgba(120,199,255,0.20)",
                  }}
                />
                {errors.website && <p className="mt-[4px] text-[0.71rem] text-[#ff8a8a]">{errors.website}</p>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[44px] mt-[4px] rounded-full font-bold text-[0.88rem] tracking-[0.01em] transition-all duration-200 flex items-center justify-center gap-[8px] disabled:opacity-70"
                style={{
                  background: submitting
                    ? "linear-gradient(135deg, rgba(111,226,207,0.7), rgba(120,199,255,0.7))"
                    : "linear-gradient(135deg, #6fe2cf, #78c7ff)",
                  color: "#04101c",
                  border: "none",
                }}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Sending…
                  </>
                ) : submitLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

interface CheckoutResponse {
  url?: string;
  error?: string;
}

function CheckoutCard({
  title,
  price,
  description,
  features,
  badge,
  highlight,
  submitLabel,
  planSlug,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
  highlight?: boolean;
  submitLabel: string;
  planSlug: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planSlug }),
      });

      const data = (await response.json()) as CheckoutResponse;
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Failed to start checkout");
      }
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const borderColor = highlight ? "rgba(120,199,255,0.40)" : "rgba(120,199,255,0.15)";
  const cardBg = highlight
    ? "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(120,199,255,0.18), transparent 55%), linear-gradient(180deg, rgba(13,34,58,0.98), rgba(8,20,36,0.98))"
    : "linear-gradient(180deg, rgba(10,24,40,0.96), rgba(7,18,30,0.96))";

  return (
    <div className="relative pt-[14px]">
      {badge && (
        <div className="absolute top-0 left-[50%] -translate-x-1/2 z-10">
          <span
            className="inline-flex items-center gap-[5px] px-[14px] py-[5px] rounded-full text-[0.72rem] font-bold tracking-[0.10em] uppercase whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #6fe2cf, #78c7ff)", color: "#04101c" }}
          >
            ★ {badge}
          </span>
        </div>
      )}
      <div
        className="relative flex flex-col rounded-[22px] overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(120,199,255,0.22),0_28px_64px_rgba(2,7,16,0.48)] h-full"
        style={{
          background: cardBg,
          border: `${highlight ? "1.5px" : "1px"} solid ${borderColor}`,
          boxShadow: highlight
            ? "0 0 0 1px rgba(120,199,255,0.10), 0 24px 60px rgba(2,7,16,0.45)"
            : "0 10px 30px rgba(0,0,0,0.22)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[22px]"
          style={{
            background: highlight
              ? "linear-gradient(90deg, transparent, #78c7ff 40%, #6fe2cf 70%, transparent)"
              : "linear-gradient(90deg, transparent, rgba(120,199,255,0.25) 50%, transparent)",
          }}
          aria-hidden="true"
        />
      <div className="p-[28px] flex flex-col flex-1">
        <div className="mb-[20px]">
          <p className="text-[0.72rem] tracking-[0.16em] uppercase text-teal/70 mb-[8px]">Speakly AI-SEO</p>
          <h3
            className="mb-[8px] leading-[1.18]"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.14rem)", fontWeight: 800 }}
          >
            {title}
          </h3>
          <div className="flex items-baseline gap-[6px] mb-[12px]">
            <span
              className="text-[2rem] font-extrabold tracking-[-0.04em]"
              style={{ color: highlight ? "#78c7ff" : "var(--ink)" }}
            >
              {price}
            </span>
            <span className="text-[0.8rem] text-ink-soft">one-time</span>
          </div>
          <p className="text-[0.85rem] text-ink-muted leading-[1.56]">{description}</p>
        </div>
        <ul className="list-none p-0 grid gap-[8px] mb-[24px]">
          {features.map((f) => (
            <li key={f} className="relative pl-[20px] text-[0.84rem] text-ink-muted" style={{ lineHeight: 1.5 }}>
              <span
                className="absolute left-0 top-[0.52em] w-[7px] h-[7px] rounded-full"
                style={{ background: "linear-gradient(135deg, #6fe2cf, #78c7ff)", display: "block" }}
                aria-hidden="true"
              />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto grid gap-[8px]">
          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="w-full min-h-[44px] rounded-full font-bold text-[0.88rem] tracking-[0.01em] transition-all duration-200 flex items-center justify-center gap-[8px] disabled:opacity-70"
            style={
              highlight
                ? {
                    background: loading
                      ? "linear-gradient(135deg, rgba(111,226,207,0.7), rgba(120,199,255,0.7))"
                      : "linear-gradient(135deg, #6fe2cf, #78c7ff)",
                    color: "#04101c",
                    border: "none",
                  }
                : {
                    background: loading ? "rgba(120,199,255,0.12)" : "rgba(120,199,255,0.08)",
                    color: "var(--ink)",
                    border: "1px solid rgba(120,199,255,0.28)",
                  }
            }
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Opening checkout…
              </>
            ) : submitLabel}
          </button>
          {error && (
            <p className="text-center text-[0.75rem] text-[#ff8a8a] px-[4px]">{error}</p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

export function NextStep() {
  const { ref, isInView } = useInView();

  return (
    <section id="next-step" className="py-[100px] relative scroll-mt-[86px] section-nextstep-bg">
      <div className="shell">
        <div
          ref={ref}
          className={`p-[34px] md:p-[50px] rounded-[28px] relative overflow-hidden reveal ${isInView ? "is-visible" : ""}`}
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 80% 0%, rgba(120,199,255,0.18), transparent 45%), radial-gradient(ellipse 70% 55% at 10% 100%, rgba(111,226,207,0.13), transparent 50%), linear-gradient(180deg, rgba(11,28,46,0.97), rgba(7,18,30,0.97))",
            border: "1px solid rgba(120,199,255,0.22)",
            boxShadow: "0 32px 100px rgba(2,7,16,0.55), inset 0 1px 0 rgba(111,226,207,0.06)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[28px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #6fe2cf 40%, #78c7ff 70%, transparent 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 85% 0%, rgba(111,226,207,0.07), transparent 55%)",
            }}
            aria-hidden="true"
          />
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
            <div className={`mb-[42px] max-w-[720px] reveal-left ${isInView ? "is-visible" : ""}`}>
              <div className="text-[0.8rem] tracking-[0.16em] uppercase text-teal mb-[14px]">
                Next step
              </div>
              <h2 className="max-w-[18ch] mb-[16px]">
                Choose the right starting point for your visibility.
              </h2>
              <p className="text-[clamp(1.05rem,1.7vw,1.2rem)] text-ink-muted max-w-[62ch]">
                Start with a free assessment, go deeper with competitive intelligence, or commit to
                the full system. All paths include a conversation before anything starts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] mb-[48px] pt-[28px]">
              <div className="pt-[14px] flex flex-col">
              <FreeAssessmentCard
                title="Free Assessment"
                description="A no-cost snapshot of where you stand in AI-driven search today — and where your biggest gaps are."
                features={[
                  "AI visibility snapshot",
                  "Competitor comparison",
                  "Source-of-truth gap review",
                  "Tailored roadmap overview",
                ]}
                submitLabel="Get my free assessment"
                emailSubject="Free AI-Search Readiness Assessment"
              />
              </div>
              <CheckoutCard
                title="Competitor Scan & AI-SEO Visibility Readiness Kit"
                price="$350"
                description="A deep competitive intelligence report showing how your rivals are surfaced by AI — and how to close the gap."
                features={[
                  "Full AI-citation audit for 3–5 competitors",
                  "Structured content gap analysis",
                  "Answer-layer positioning report",
                  "Prioritized opportunity matrix",
                ]}
                submitLabel="Get started — $350"
                planSlug="competitor-scan"
              />
              <CheckoutCard
                title="Visibility Overhaul"
                price="$950"
                description="The complete Phase 0–2 system: source-of-truth content, schema, structured data, and a content engine built to fuel AI recommendations."
                features={[
                  "Everything in the Competitor Scan",
                  "Source-of-truth content architecture",
                  "Schema & structured data implementation",
                  "AI-ready content templates",
                  "Ongoing content engine setup",
                ]}
                badge="Most popular"
                highlight={true}
                submitLabel="Begin overhaul — $950"
                planSlug="visibility-overhaul"
              />
            </div>

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
                    <li
                      key={item}
                      className="relative pl-[22px] text-ink-muted text-[0.9rem]"
                      style={{ lineHeight: 1.5 }}
                    >
                      <span
                        className="absolute left-0 top-[0.6em] w-[6px] h-[6px] rounded-full"
                        style={{ background: "linear-gradient(135deg, #78c7ff, #6fe2cf)", display: "block" }}
                        aria-hidden="true"
                      />
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

        {/* Closing Speakly brand rule */}
        <div className="mt-[60px] flex flex-col items-center gap-[16px]">
          <div className="flex items-center gap-[16px] w-full max-w-[400px]">
            <div
              className="flex-1 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(111,226,207,0.30))" }}
              aria-hidden="true"
            />
            <div className="shrink-0 flex items-center gap-[8px] px-[14px] py-[8px] rounded-full border border-[#6fe2cf]/20 bg-[#071321]/60">
              <div
                className="w-[6px] h-[6px] rounded-full"
                style={{
                  background: "linear-gradient(135deg, #6fe2cf, #78c7ff)",
                  boxShadow: "0 0 10px rgba(111,226,207,0.6)",
                }}
                aria-hidden="true"
              />
              <span className="text-[0.72rem] tracking-[0.16em] uppercase text-ink-soft">
                Speakly Media
              </span>
            </div>
            <div
              className="flex-1 h-[1px]"
              style={{ background: "linear-gradient(90deg, rgba(120,199,255,0.30), transparent)" }}
              aria-hidden="true"
            />
          </div>
          <p className="text-[0.76rem] tracking-[0.10em] text-ink-soft/50 uppercase">
            AI-SEO Overhaul · speaklymedia.com
          </p>
        </div>
      </div>
    </section>
  );
}
