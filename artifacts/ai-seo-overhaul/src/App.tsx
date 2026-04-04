import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { WidgetHome } from "./pages/WidgetHome";
import { WidgetOffers } from "./pages/WidgetOffers";
import starfieldLandscape from "@assets/IMG_0228_1775246914295.png";
import starfieldPortrait from "@assets/IMG_0231_1775246914295.png";

function StarfieldBackground() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--starfield-landscape", `url("${starfieldLandscape}")`);
    root.style.setProperty("--starfield-portrait", `url("${starfieldPortrait}")`);
  }, []);

  return null;
}

function PaymentSuccessBanner({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-[12px] px-[20px] py-[14px]"
      style={{
        background: "linear-gradient(90deg, rgba(7,18,30,0.97), rgba(11,28,46,0.97))",
        borderBottom: "1px solid rgba(111,226,207,0.30)",
        boxShadow: "0 4px 32px rgba(2,7,16,0.55)",
      }}
    >
      <div className="flex items-center gap-[12px]">
        <div
          className="w-[32px] h-[32px] shrink-0 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(111,226,207,0.20), rgba(120,199,255,0.20))",
            border: "1px solid rgba(111,226,207,0.40)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <polyline
              points="3.5,10 8,14.5 16.5,5.5"
              stroke="#6fe2cf"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-[0.9rem] font-semibold text-teal leading-snug">Payment confirmed!</p>
          <p className="text-[0.78rem] text-ink-muted">
            Thank you — we'll be in touch within 1 business day to kick things off.
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Dismiss"
        className="shrink-0 w-[28px] h-[28px] rounded-full flex items-center justify-center transition-colors duration-150"
        style={{ color: "var(--ink-soft)", background: "rgba(120,199,255,0.07)", border: "1px solid rgba(120,199,255,0.15)" }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <line x1="1.5" y1="1.5" x2="10.5" y2="10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="10.5" y1="1.5" x2="1.5" y2="10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function MainApp() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      setPaymentSuccess(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("payment");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <StarfieldBackground />
      {paymentSuccess && (
        <PaymentSuccessBanner onClose={() => setPaymentSuccess(false)} />
      )}
      <Nav />
      <Home />
    </div>
  );
}

function App() {
  const basename = import.meta.env.BASE_URL ?? "/";
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/widget-home" element={<WidgetHome />} />
        <Route path="/widget-offers" element={<WidgetOffers />} />
        <Route path="/" element={<MainApp />} />
        <Route path="*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
