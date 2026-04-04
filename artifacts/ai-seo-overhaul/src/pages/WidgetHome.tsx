import { useIframeAutoresize } from "@/hooks/use-iframe-autoresize";

const PROPS = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="5.5" stroke="#78c7ff" strokeWidth="1.8" />
        <circle cx="14" cy="14" r="11" stroke="#78c7ff" strokeWidth="1.2" strokeOpacity="0.40" />
        <line x1="14" y1="3" x2="14" y2="8" stroke="#78c7ff" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="14" y1="20" x2="14" y2="25" stroke="#78c7ff" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="3" y1="14" x2="8" y2="14" stroke="#78c7ff" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="20" y1="14" x2="25" y2="14" stroke="#78c7ff" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="14" cy="14" r="2.5" fill="#78c7ff" fillOpacity="0.9" />
      </svg>
    ),
    label: "AI Visibility",
    title: "Turn your website into the source AI recommends.",
    body: "AI-generated answers now drive discovery. Businesses with clear, structured websites get cited. Others get skipped.",
    accent: "#78c7ff",
    accentDark: "#2a7ab5",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="17" width="20" height="4" rx="2" fill="#6fe2cf" fillOpacity="0.22" stroke="#6fe2cf" strokeWidth="1.4" />
        <rect x="7" y="11" width="14" height="4" rx="2" fill="#6fe2cf" fillOpacity="0.15" stroke="#6fe2cf" strokeWidth="1.4" strokeOpacity="0.7" />
        <rect x="10" y="5" width="8" height="4" rx="2" fill="#6fe2cf" fillOpacity="0.10" stroke="#6fe2cf" strokeWidth="1.4" strokeOpacity="0.5" />
        <circle cx="14" cy="7" r="1.5" fill="#6fe2cf" />
      </svg>
    ),
    label: "Source of Truth",
    title: "Your website becomes your single source of truth.",
    body: "When the core is clear, AI answers, campaigns, sales assets, and future content all flow from the same clarified story.",
    accent: "#6fe2cf",
    accentDark: "#1a9e8e",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4 L17 10 L24 10 L18.5 14.5 L21 21 L14 17 L7 21 L9.5 14.5 L4 10 L11 10 Z" stroke="#ff9d5c" strokeWidth="1.5" strokeLinejoin="round" fill="#ff9d5c" fillOpacity="0.12" />
        <circle cx="14" cy="13" r="2.5" fill="#ff9d5c" fillOpacity="0.85" />
      </svg>
    ),
    label: "A System, Not Random Tasks",
    title: "Built to power everything that comes next.",
    body: "Not a pile of disconnected SEO work — a structured foundation that makes every future page, ad, and campaign easier to produce.",
    accent: "#ff9d5c",
    accentDark: "#c4621a",
  },
];

export function WidgetHome() {
  useIframeAutoresize();
  return (
    <div className="p-4 sm:p-6" style={{ background: "#f7f9fc" }}>
      <div
        className="w-full max-w-[960px] mx-auto rounded-[24px] overflow-hidden relative"
        style={{
          background: "#ffffff",
          border: "1px solid #e2eaf3",
          boxShadow: "0 2px 16px rgba(30,60,100,0.07), 0 1px 4px rgba(30,60,100,0.05)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, #6fe2cf 0%, #78c7ff 100%)" }}
          aria-hidden="true"
        />

        <div className="p-6 sm:p-8 md:p-10">
          <div className="mb-6 sm:mb-8">
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
              Speakly AI-SEO Overhaul
            </span>
            <h2
              className="leading-[1.1] mb-3"
              style={{
                fontSize: "clamp(1.45rem, 3.2vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#0f1923",
                maxWidth: "24ch",
              }}
            >
              Turn your website into the source AI recommends.
            </h2>
            <p style={{ color: "#5a6a7e", fontSize: "clamp(0.9rem, 1.4vw, 1.02rem)", maxWidth: "58ch", lineHeight: 1.65 }}>
              AI-generated answers are reshaping how customers find businesses. Here's what changes when your website becomes the trusted, answer-ready foundation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
            {PROPS.map(({ icon, label, title, body, accent, accentDark }) => (
              <div
                key={label}
                className="rounded-[16px] p-5 flex flex-col gap-3"
                style={{
                  background: "#f7f9fc",
                  border: `1px solid ${accent}38`,
                }}
              >
                <div
                  className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center shrink-0"
                  style={{
                    background: `${accent}16`,
                    border: `1px solid ${accent}30`,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <p
                    className="text-[0.67rem] tracking-[0.14em] uppercase font-semibold mb-[5px]"
                    style={{ color: accentDark }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-[0.94rem] font-bold mb-2 leading-[1.3]"
                    style={{ color: "#0f1923" }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-[0.83rem] leading-[1.58]"
                    style={{ color: "#5a6a7e" }}
                  >
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://speaklymedia.com/ai-seo-overhaul/"
            target="_parent"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-[10px] w-full min-h-[48px] px-[32px] rounded-full font-bold tracking-[0.01em] transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #6fe2cf, #78c7ff)",
              color: "#04101c",
              fontSize: "0.95rem",
              boxShadow: "0 6px 20px rgba(111,226,207,0.30)",
              textDecoration: "none",
            }}
          >
            See the full picture
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
