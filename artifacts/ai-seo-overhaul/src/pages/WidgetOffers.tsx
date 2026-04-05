import { useState } from "react";
import { useIframeAutoresize } from "@/hooks/use-iframe-autoresize";

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
  const [zoomUrl, setZoomUrl] = useState<string | null>(null);

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
    try {
      const response = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({})) as { error?: string };
        setErrors({ email: data.error ?? "Submission failed. Please try again." });
        return;
      }
      const data = await response.json().catch(() => ({})) as { zoomUrl?: string };
      setZoomUrl(data.zoomUrl ?? null);
      setSubmitted(true);
    } catch {
      setErrors({ email: "Network error. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="relative flex flex-col rounded-[20px] overflow-hidden h-full transition-shadow duration-300"
      style={{
        background: "#ffffff",
        border: "1px solid #e2eaf3",
        boxShadow: "0 2px 12px rgba(30,60,100,0.06)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px]"
        style={{ background: "linear-gradient(90deg, #6fe2cf, #78c7ff)" }}
        aria-hidden="true"
      />
      <div className="p-[26px] flex flex-col flex-1 pt-[30px]">
        <div className="mb-[18px]">
          <p className="text-[0.68rem] tracking-[0.16em] uppercase font-semibold mb-[7px]" style={{ color: "#1a9e8e" }}>Speakly AI-SEO</p>
          <h3 className="mb-[8px] leading-[1.2]" style={{ fontSize: "clamp(1rem, 1.8vw, 1.12rem)", fontWeight: 800, color: "#0f1923" }}>
            Free Assessment
          </h3>
          <div className="flex items-baseline gap-[6px] mb-[10px]">
            <span className="text-[1.1rem] font-bold" style={{ color: "#1a9e8e" }}>Free</span>
          </div>
          <p className="text-[0.84rem] leading-[1.58]" style={{ color: "#5a6a7e" }}>
            A no-cost snapshot of where you stand in AI-driven search today — and where your biggest gaps are.
          </p>
        </div>
        <ul className="list-none p-0 grid gap-[7px] mb-[22px]">
          {["AI visibility snapshot", "Competitor comparison", "Source-of-truth gap review", "Tailored roadmap overview"].map((f) => (
            <li key={f} className="relative pl-[18px] text-[0.83rem]" style={{ color: "#5a6a7e", lineHeight: 1.5 }}>
              <span
                className="absolute left-0 top-[0.52em] w-[6px] h-[6px] rounded-full"
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
              className="flex flex-col rounded-[14px] overflow-hidden"
              style={{ background: "rgba(111,226,207,0.08)", border: "1px solid rgba(111,226,207,0.28)" }}
            >
              <div className="flex flex-col items-center text-center pt-[18px] pb-[14px] px-[14px]">
                <div
                  className="w-[38px] h-[38px] rounded-full mb-[9px] flex items-center justify-center"
                  style={{ background: "rgba(111,226,207,0.18)", border: "1px solid rgba(111,226,207,0.35)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <polyline points="3.5,10 8,14.5 16.5,5.5" stroke="#1a9e8e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[0.88rem] font-bold mb-[3px]" style={{ color: "#0f1923" }}>Your assessment is queued</p>
                <p className="text-[0.75rem] leading-[1.5]" style={{ color: "#5a6a7e" }}>
                  Grab a time while spots are open this week.
                </p>
              </div>
              {zoomUrl && (
                <div className="px-[14px] pb-[16px]">
                  <a
                    href={zoomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-[7px] w-full min-h-[42px] rounded-full font-bold text-[0.84rem] tracking-[0.01em] transition-all duration-200"
                    style={{
                      background: "linear-gradient(135deg, #6fe2cf, #78c7ff)",
                      color: "#04101c",
                      textDecoration: "none",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="2" y="7" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M17 10l5-3v10l-5-3V10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                    Schedule your call — spots available
                  </a>
                  <p className="text-center text-[0.68rem] mt-[8px]" style={{ color: "#8a9ab0" }}>
                    A confirmation email is on its way to you.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-[9px]" noValidate>
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
                    className="w-full px-[13px] py-[10px] rounded-[10px] text-[0.87rem] outline-none transition-all duration-200 disabled:opacity-60"
                    style={{
                      background: "#ffffff",
                      border: errors[field] ? "1px solid rgba(220,60,60,0.55)" : "1px solid #dde5ef",
                      color: "#0f1923",
                    }}
                  />
                  {errors[field] && <p className="mt-[4px] text-[0.70rem]" style={{ color: "#c0392b" }}>{errors[field]}</p>}
                </div>
              ))}
              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[44px] mt-[4px] rounded-full font-bold text-[0.88rem] tracking-[0.01em] transition-all duration-200 flex items-center justify-center gap-[8px] disabled:opacity-70"
                style={{
                  background: submitting ? "linear-gradient(135deg, rgba(111,226,207,0.65), rgba(120,199,255,0.65))" : "linear-gradient(135deg, #6fe2cf, #78c7ff)",
                  color: "#04101c",
                  border: "none",
                }}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Sending…
                  </>
                ) : "Get my free assessment"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

interface CheckoutResponse { url?: string; error?: string; }

function CheckoutCard({ title, price, description, features, badge, highlight, submitLabel, planSlug }: {
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
      if (!response.ok || !data.url) throw new Error(data.error ?? "Failed to start checkout");
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const cardStyle = highlight
    ? {
        background: "rgba(111,226,207,0.08)",
        border: "1.5px solid rgba(111,226,207,0.35)",
        boxShadow: "0 4px 24px rgba(111,226,207,0.12), 0 2px 8px rgba(30,60,100,0.06)",
      }
    : {
        background: "#ffffff",
        border: "1px solid #e2eaf3",
        boxShadow: "0 2px 12px rgba(30,60,100,0.06)",
      };

  const topBarStyle = highlight
    ? { background: "linear-gradient(90deg, #6fe2cf, #78c7ff)" }
    : { background: "linear-gradient(90deg, rgba(111,226,207,0.40), rgba(120,199,255,0.40))" };

  return (
    <div className="relative pt-[14px]">
      {badge && (
        <div className="absolute top-0 left-[50%] -translate-x-1/2 z-10">
          <span
            className="inline-flex items-center gap-[5px] px-[13px] py-[4px] rounded-full text-[0.70rem] font-bold tracking-[0.10em] uppercase whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #6fe2cf, #78c7ff)", color: "#04101c" }}
          >
            ★ {badge}
          </span>
        </div>
      )}
      <div
        className="relative flex flex-col rounded-[20px] overflow-hidden transition-shadow duration-300 hover:shadow-[0_6px_28px_rgba(111,226,207,0.18)] h-full"
        style={cardStyle}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px]"
          style={topBarStyle}
          aria-hidden="true"
        />
        <div className="p-[26px] flex flex-col flex-1 pt-[30px]">
          <div className="mb-[18px]">
            <p className="text-[0.68rem] tracking-[0.16em] uppercase font-semibold mb-[7px]" style={{ color: "#1a9e8e" }}>Speakly AI-SEO</p>
            <h3 className="mb-[8px] leading-[1.2]" style={{ fontSize: "clamp(1rem, 1.8vw, 1.12rem)", fontWeight: 800, color: "#0f1923" }}>{title}</h3>
            <div className="flex items-baseline gap-[6px] mb-[10px]">
              <span className="text-[1.9rem] font-extrabold tracking-[-0.04em]" style={{ color: highlight ? "#1a9e8e" : "#0f1923" }}>{price}</span>
              <span className="text-[0.78rem]" style={{ color: "#8a9ab0" }}>one-time</span>
            </div>
            <p className="text-[0.84rem] leading-[1.58]" style={{ color: "#5a6a7e" }}>{description}</p>
          </div>
          <ul className="list-none p-0 grid gap-[7px] mb-[22px]">
            {features.map((f) => (
              <li key={f} className="relative pl-[18px] text-[0.83rem]" style={{ color: "#5a6a7e", lineHeight: 1.5 }}>
                <span
                  className="absolute left-0 top-[0.52em] w-[6px] h-[6px] rounded-full"
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
              style={{
                background: loading
                  ? "linear-gradient(135deg, rgba(111,226,207,0.65), rgba(120,199,255,0.65))"
                  : "linear-gradient(135deg, #6fe2cf, #78c7ff)",
                color: "#04101c",
                border: "none",
                opacity: highlight ? 1 : 0.88,
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Opening checkout…
                </>
              ) : submitLabel}
            </button>
            {error && <p className="text-center text-[0.74rem] px-[4px]" style={{ color: "#c0392b" }}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WidgetOffers() {
  useIframeAutoresize();
  return (
    <div className="py-8 px-4 sm:px-6" style={{ background: "#f7f9fc" }}>
      <div className="w-full max-w-[1040px] mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <span
            className="inline-flex items-center gap-[8px] px-[12px] py-[6px] rounded-full text-[0.72rem] tracking-[0.14em] uppercase mb-4"
            style={{
              background: "rgba(111,226,207,0.10)",
              border: "1px solid rgba(111,226,207,0.30)",
              color: "#1a9e8e",
            }}
          >
            <span
              className="w-[6px] h-[6px] rounded-full"
              style={{ background: "linear-gradient(135deg, #6fe2cf, #78c7ff)" }}
              aria-hidden="true"
            />
            AI-Search Visibility
          </span>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#0f1923",
              lineHeight: 1.08,
              margin: "0 0 14px",
            }}
          >
            Choose the right starting point for your visibility.
          </h2>
          <p
            style={{
              color: "#5a6a7e",
              fontSize: "clamp(0.9rem, 1.5vw, 1.02rem)",
              maxWidth: "56ch",
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
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
          className="text-center py-4 px-6 rounded-[14px]"
          style={{ background: "#eef2f7", border: "1px solid #dde5ef" }}
        >
          <p className="text-[0.84rem]" style={{ color: "#5a6a7e", margin: 0 }}>
            All plans include a conversation before anything starts —{" "}
            <a
              href="https://speaklymedia.com/ai-seo-overhaul/"
              target="_parent"
              rel="noopener noreferrer"
              style={{ color: "#2a7ab5", textDecoration: "none", fontWeight: 600 }}
            >
              see how the full system works →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
