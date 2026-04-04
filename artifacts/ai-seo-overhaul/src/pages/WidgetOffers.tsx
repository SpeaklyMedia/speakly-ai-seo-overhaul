import { useState } from "react";

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
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address";
  if (!form.website.trim()) errors.website = "Website URL is required";
  else if (!validateUrl(form.website.trim())) errors.website = "Enter a valid website URL";
  return errors;
}

function FreeAssessmentCard() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", website: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    console.log("WidgetOffers free assessment:", form);
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
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[22px]" style={{ background: "linear-gradient(90deg, transparent, rgba(120,199,255,0.25) 50%, transparent)" }} aria-hidden="true" />
      <div className="p-[28px] flex flex-col flex-1">
        <div className="mb-[20px]">
          <p className="text-[0.72rem] tracking-[0.16em] uppercase mb-[8px]" style={{ color: "rgba(111,226,207,0.70)" }}>Speakly AI-SEO</p>
          <h3 className="mb-[8px] leading-[1.18]" style={{ fontSize: "clamp(1rem, 1.8vw, 1.14rem)", fontWeight: 800, color: "#dbe8f7" }}>
            Free Assessment
          </h3>
          <div className="flex items-baseline gap-[6px] mb-[12px]">
            <span className="text-[1.15rem] font-bold" style={{ color: "#6fe2cf" }}>Free</span>
          </div>
          <p className="text-[0.85rem] leading-[1.56]" style={{ color: "rgba(219,232,247,0.65)" }}>
            A no-cost snapshot of where you stand in AI-driven search today — and where your biggest gaps are.
          </p>
        </div>
        <ul className="list-none p-0 grid gap-[8px] mb-[24px]">
          {["AI visibility snapshot", "Competitor comparison", "Source-of-truth gap review", "Tailored roadmap overview"].map((f) => (
            <li key={f} className="relative pl-[20px] text-[0.84rem]" style={{ color: "rgba(219,232,247,0.65)", lineHeight: 1.5 }}>
              <span className="absolute left-0 top-[0.52em] w-[7px] h-[7px] rounded-full" style={{ background: "linear-gradient(135deg, #6fe2cf, #78c7ff)", display: "block" }} aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-[20px] px-[10px] rounded-[16px]" style={{ background: "rgba(111,226,207,0.06)", border: "1px solid rgba(111,226,207,0.22)" }}>
              <div className="w-[44px] h-[44px] rounded-full mb-[12px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(111,226,207,0.18), rgba(120,199,255,0.18))", border: "1px solid rgba(111,226,207,0.35)" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><polyline points="3.5,10 8,14.5 16.5,5.5" stroke="#6fe2cf" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <p className="text-[0.92rem] font-semibold mb-[4px]" style={{ color: "#6fe2cf" }}>We'll be in touch!</p>
              <p className="text-[0.78rem]" style={{ color: "rgba(219,232,247,0.55)" }}>Expect a reply within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-[10px]" noValidate>
              {(["name", "email", "website"] as const).map((field) => (
                <div key={field}>
                  <label className="sr-only" htmlFor={`wo-${field}`}>{field === "name" ? "Your name" : field === "email" ? "Email address" : "Website URL"}</label>
                  <input
                    id={`wo-${field}`}
                    type={field === "email" ? "email" : "text"}
                    placeholder={field === "name" ? "Your name" : field === "email" ? "you@company.com" : "yoursite.com"}
                    autoComplete={field === "website" ? "url" : field}
                    value={form[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    disabled={submitting}
                    className="w-full px-[14px] py-[10px] rounded-[11px] text-[0.88rem] outline-none transition-all duration-200 disabled:opacity-60"
                    style={{
                      background: "rgba(8,20,36,0.80)",
                      border: errors[field] ? "1px solid rgba(255,100,100,0.65)" : "1px solid rgba(120,199,255,0.20)",
                      color: "#dbe8f7",
                    }}
                  />
                  {errors[field] && <p className="mt-[4px] text-[0.71rem]" style={{ color: "#ff8a8a" }}>{errors[field]}</p>}
                </div>
              ))}
              <button type="submit" disabled={submitting} className="w-full min-h-[44px] mt-[4px] rounded-full font-bold text-[0.88rem] tracking-[0.01em] transition-all duration-200 flex items-center justify-center gap-[8px] disabled:opacity-70" style={{ background: submitting ? "linear-gradient(135deg, rgba(111,226,207,0.7), rgba(120,199,255,0.7))" : "linear-gradient(135deg, #6fe2cf, #78c7ff)", color: "#04101c", border: "none" }}>
                {submitting ? (<><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Sending…</>) : "Get my free assessment"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

interface CheckoutResponse { url?: string; error?: string; }

function CheckoutCard({ title, price, description, features, badge, highlight, submitLabel, planSlug }: { title: string; price: string; description: string; features: string[]; badge?: string; highlight?: boolean; submitLabel: string; planSlug: string; }) {
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
      if (!response.ok || !data.url) throw new Error(data.error ?? "Failed to start checkout");
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
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
          <span className="inline-flex items-center gap-[5px] px-[14px] py-[5px] rounded-full text-[0.72rem] font-bold tracking-[0.10em] uppercase whitespace-nowrap" style={{ background: "linear-gradient(135deg, #6fe2cf, #78c7ff)", color: "#04101c" }}>★ {badge}</span>
        </div>
      )}
      <div className="relative flex flex-col rounded-[22px] overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(120,199,255,0.22),0_28px_64px_rgba(2,7,16,0.48)] h-full" style={{ background: cardBg, border: `${highlight ? "1.5px" : "1px"} solid ${borderColor}`, boxShadow: highlight ? "0 0 0 1px rgba(120,199,255,0.10), 0 24px 60px rgba(2,7,16,0.45)" : "0 10px 30px rgba(0,0,0,0.22)" }}>
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[22px]" style={{ background: highlight ? "linear-gradient(90deg, transparent, #78c7ff 40%, #6fe2cf 70%, transparent)" : "linear-gradient(90deg, transparent, rgba(120,199,255,0.25) 50%, transparent)" }} aria-hidden="true" />
        <div className="p-[28px] flex flex-col flex-1">
          <div className="mb-[20px]">
            <p className="text-[0.72rem] tracking-[0.16em] uppercase mb-[8px]" style={{ color: "rgba(111,226,207,0.70)" }}>Speakly AI-SEO</p>
            <h3 className="mb-[8px] leading-[1.18]" style={{ fontSize: "clamp(1rem, 1.8vw, 1.14rem)", fontWeight: 800, color: "#dbe8f7" }}>{title}</h3>
            <div className="flex items-baseline gap-[6px] mb-[12px]">
              <span className="text-[2rem] font-extrabold tracking-[-0.04em]" style={{ color: highlight ? "#78c7ff" : "#dbe8f7" }}>{price}</span>
              <span className="text-[0.8rem]" style={{ color: "rgba(219,232,247,0.50)" }}>one-time</span>
            </div>
            <p className="text-[0.85rem] leading-[1.56]" style={{ color: "rgba(219,232,247,0.65)" }}>{description}</p>
          </div>
          <ul className="list-none p-0 grid gap-[8px] mb-[24px]">
            {features.map((f) => (
              <li key={f} className="relative pl-[20px] text-[0.84rem]" style={{ color: "rgba(219,232,247,0.65)", lineHeight: 1.5 }}>
                <span className="absolute left-0 top-[0.52em] w-[7px] h-[7px] rounded-full" style={{ background: "linear-gradient(135deg, #6fe2cf, #78c7ff)", display: "block" }} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-[8px]">
            <button type="button" onClick={handleCheckout} disabled={loading} className="w-full min-h-[44px] rounded-full font-bold text-[0.88rem] tracking-[0.01em] transition-all duration-200 flex items-center justify-center gap-[8px] disabled:opacity-70" style={highlight ? { background: loading ? "linear-gradient(135deg, rgba(111,226,207,0.7), rgba(120,199,255,0.7))" : "linear-gradient(135deg, #6fe2cf, #78c7ff)", color: "#04101c", border: "none" } : { background: loading ? "rgba(120,199,255,0.12)" : "rgba(120,199,255,0.08)", color: "#dbe8f7", border: "1px solid rgba(120,199,255,0.28)" }}>
              {loading ? (<><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>Opening checkout…</>) : submitLabel}
            </button>
            {error && <p className="text-center text-[0.75rem] px-[4px]" style={{ color: "#ff8a8a" }}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WidgetOffers() {
  return (
    <div
      className="py-8 px-4 sm:px-6"
      style={{
        background:
          "radial-gradient(ellipse 80% 55% at 50% 100%, rgba(111,226,207,0.10), transparent 55%), radial-gradient(ellipse 55% 45% at 80% 0%, rgba(120,199,255,0.10), transparent 50%), linear-gradient(180deg, #06111d 0%, #071321 50%, #081727 100%)",
      }}
    >
      <div className="w-full max-w-[1040px] mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <span
            className="inline-flex items-center gap-[8px] px-[12px] py-[7px] rounded-full text-[0.76rem] tracking-[0.14em] uppercase mb-4"
            style={{ background: "rgba(111,226,207,0.07)", border: "1px solid rgba(111,226,207,0.18)", color: "rgba(219,232,247,0.65)" }}
          >
            <span className="w-[6px] h-[6px] rounded-full" style={{ background: "linear-gradient(135deg, #6fe2cf, #78c7ff)", boxShadow: "0 0 8px rgba(111,226,207,0.6)" }} aria-hidden="true" />
            AI-Search Visibility
          </span>
          <h2
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#dbe8f7", lineHeight: 1.06, margin: "0 0 14px" }}
          >
            Choose the right starting point for your visibility.
          </h2>
          <p style={{ color: "rgba(219,232,247,0.60)", fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", maxWidth: "56ch", margin: "0 auto", lineHeight: 1.6 }}>
            Start with a free assessment, go deeper with competitive intelligence, or commit to the full system. All paths include a conversation before anything starts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="pt-[14px] flex flex-col">
            <FreeAssessmentCard />
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

        <div
          className="text-center py-5 px-6 rounded-[18px]"
          style={{ background: "rgba(8,20,36,0.60)", border: "1px solid rgba(120,199,255,0.12)" }}
        >
          <p className="text-[0.85rem]" style={{ color: "rgba(219,232,247,0.55)", margin: 0 }}>
            All plans include a conversation before anything starts —{" "}
            <a
              href="https://speaklymedia.com/ai-seo-overhaul/"
              target="_parent"
              rel="noopener noreferrer"
              style={{ color: "#78c7ff", textDecoration: "none", fontWeight: 600 }}
            >
              see how the full system works →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
