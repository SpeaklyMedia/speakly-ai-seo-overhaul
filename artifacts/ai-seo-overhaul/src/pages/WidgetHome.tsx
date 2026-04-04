import { useIframeAutoresize } from "@/hooks/use-iframe-autoresize";

const PROPS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="5.5" stroke="#78c7ff" strokeWidth="1.8" />
        <circle cx="14" cy="14" r="11" stroke="#78c7ff" strokeWidth="1.2" strokeOpacity="0.35" />
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
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="17" width="20" height="4" rx="2" fill="#6fe2cf" fillOpacity="0.25" stroke="#6fe2cf" strokeWidth="1.4" />
        <rect x="7" y="11" width="14" height="4" rx="2" fill="#6fe2cf" fillOpacity="0.18" stroke="#6fe2cf" strokeWidth="1.4" strokeOpacity="0.7" />
        <rect x="10" y="5" width="8" height="4" rx="2" fill="#6fe2cf" fillOpacity="0.12" stroke="#6fe2cf" strokeWidth="1.4" strokeOpacity="0.5" />
        <circle cx="14" cy="7" r="1.5" fill="#6fe2cf" />
      </svg>
    ),
    label: "Source of Truth",
    title: "Your website becomes your single source of truth.",
    body: "When the core is clear, AI answers, campaigns, sales assets, and future content all flow from the same clarified story.",
    accent: "#6fe2cf",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4 L17 10 L24 10 L18.5 14.5 L21 21 L14 17 L7 21 L9.5 14.5 L4 10 L11 10 Z" stroke="#ff9d5c" strokeWidth="1.5" strokeLinejoin="round" fill="#ff9d5c" fillOpacity="0.12" />
        <circle cx="14" cy="13" r="2.5" fill="#ff9d5c" fillOpacity="0.8" />
      </svg>
    ),
    label: "A System, Not Random Tasks",
    title: "Built to power everything that comes next.",
    body: "Not a pile of disconnected SEO work — a structured foundation that makes every future page, ad, and campaign easier to produce.",
    accent: "#ff9d5c",
  },
];

export function WidgetHome() {
  useIframeAutoresize();
  return (
    <div
      className="flex items-center justify-center p-4 sm:p-6"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120,199,255,0.14), transparent 50%), linear-gradient(180deg, #06111d 0%, #071321 60%, #081727 100%)",
      }}
    >
      <div
        className="w-full max-w-[960px] rounded-[28px] overflow-hidden relative"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 80% 0%, rgba(120,199,255,0.14), transparent 45%), radial-gradient(ellipse 65% 50% at 10% 100%, rgba(111,226,207,0.10), transparent 50%), linear-gradient(180deg, rgba(11,28,46,0.97), rgba(7,18,30,0.97))",
          border: "1px solid rgba(120,199,255,0.20)",
          boxShadow: "0 32px 100px rgba(2,7,16,0.55), inset 0 1px 0 rgba(111,226,207,0.06)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #6fe2cf 40%, #78c7ff 70%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div className="p-6 sm:p-8 md:p-10">
          <div className="mb-6 sm:mb-8">
            <span
              className="inline-flex items-center gap-[8px] px-[12px] py-[7px] rounded-full text-[0.76rem] tracking-[0.14em] uppercase mb-4"
              style={{
                background: "rgba(120,199,255,0.07)",
                border: "1px solid rgba(120,199,255,0.20)",
                color: "rgba(219,232,247,0.70)",
              }}
            >
              <span
                className="w-[6px] h-[6px] rounded-full"
                style={{ background: "linear-gradient(135deg, #6fe2cf, #78c7ff)", boxShadow: "0 0 8px rgba(111,226,207,0.6)" }}
                aria-hidden="true"
              />
              Speakly AI-SEO Overhaul
            </span>
            <h2
              className="text-[#dbe8f7] leading-[1.08] mb-3"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.3rem)", fontWeight: 800, letterSpacing: "-0.03em", maxWidth: "22ch" }}
            >
              Turn your website into the source AI recommends.
            </h2>
            <p style={{ color: "rgba(219,232,247,0.65)", fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", maxWidth: "58ch", lineHeight: 1.6 }}>
              AI-generated answers are reshaping how customers find businesses. Here's what changes when your website becomes the trusted, answer-ready foundation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
            {PROPS.map(({ icon, label, title, body, accent }) => (
              <div
                key={label}
                className="rounded-[18px] p-5 flex flex-col gap-3 transition-shadow duration-300"
                style={{
                  background: "rgba(10,24,40,0.70)",
                  border: `1px solid ${accent}22`,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.20)",
                }}
              >
                <div
                  className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center shrink-0"
                  style={{
                    background: `${accent}14`,
                    border: `1px solid ${accent}28`,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <p
                    className="text-[0.68rem] tracking-[0.14em] uppercase mb-[5px]"
                    style={{ color: accent, opacity: 0.75 }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-[0.95rem] font-bold mb-2 leading-[1.3]"
                    style={{ color: "#dbe8f7" }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-[0.83rem] leading-[1.55]"
                    style={{ color: "rgba(219,232,247,0.60)" }}
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
              boxShadow: "0 10px 28px rgba(70,170,214,0.28)",
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
