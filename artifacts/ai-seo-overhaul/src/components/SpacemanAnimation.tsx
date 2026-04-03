import { useEffect, useRef, useState } from "react";

const BAD_TEXT = "how can I get really high";
const GOOD_TEXT = "when's the next rocket to the moon?";

// Static star data: [left%, top%, sizePx, delayS, isOrange] — 145 entries, no render-time randomization
const STARS: Array<[number, number, number, number, boolean]> = [
  [3, 6, 1.5, 0.0, false], [9, 18, 1, 0.9, false], [15, 4, 2, 1.7, true],
  [22, 11, 1, 0.3, false], [28, 27, 1.5, 2.1, false], [35, 7, 1, 1.3, false],
  [41, 20, 2, 0.6, true], [48, 3, 1, 2.8, false], [54, 14, 1.5, 1.1, false],
  [61, 9, 1, 0.4, false], [68, 22, 2, 1.9, false], [74, 5, 1, 3.2, true],
  [80, 16, 1.5, 0.7, false], [87, 8, 1, 2.4, false], [93, 24, 1, 1.5, false],
  [6, 34, 1.5, 2.6, false], [13, 42, 1, 0.2, false], [19, 38, 2, 1.8, true],
  [25, 55, 1, 3.0, false], [32, 47, 1.5, 0.8, false], [38, 61, 1, 2.2, false],
  [45, 52, 2, 1.4, false], [51, 68, 1, 0.5, true], [57, 44, 1.5, 2.9, false],
  [63, 73, 1, 1.0, false], [70, 58, 2, 3.3, false], [76, 66, 1, 0.1, false],
  [83, 48, 1.5, 2.0, true], [90, 62, 1, 1.6, false], [96, 38, 1, 0.9, false],
  [7, 78, 2, 2.7, false], [14, 86, 1, 1.2, false], [21, 72, 1.5, 0.4, true],
  [27, 91, 1, 3.1, false], [33, 80, 1, 1.8, false], [40, 95, 2, 0.6, false],
  [47, 83, 1.5, 2.3, false], [53, 76, 1, 1.0, true], [59, 89, 1, 3.4, false],
  [65, 96, 2, 0.3, false], [72, 81, 1, 2.5, false], [78, 93, 1.5, 1.7, false],
  [85, 87, 1, 0.8, true], [91, 75, 1, 2.0, false], [97, 90, 2, 1.3, false],
  [4, 50, 1, 3.2, false], [11, 62, 1.5, 0.0, false], [17, 58, 1, 1.5, true],
  [24, 70, 2, 2.8, false], [30, 43, 1, 0.7, false], [37, 33, 1.5, 1.9, false],
  [43, 65, 1, 3.0, false], [50, 36, 2, 1.1, false], [56, 57, 1, 0.2, true],
  [62, 32, 1.5, 2.4, false], [69, 46, 1, 1.6, false], [75, 40, 1, 0.5, false],
  [82, 29, 2, 2.9, true], [88, 53, 1.5, 1.3, false], [95, 45, 1, 0.6, false],
  [8, 25, 1, 1.8, false], [16, 30, 1.5, 3.3, false], [44, 85, 1, 0.4, true],
  [71, 13, 2, 2.1, false], [86, 74, 1, 1.0, false], [2, 88, 1.5, 0.8, false],
  [58, 22, 1, 2.6, false], [34, 15, 2, 1.4, true], [79, 98, 1, 3.1, false],
  [92, 11, 1.5, 0.3, false],
  // 75 additional stars
  [5, 12, 1, 1.1, false], [11, 8, 1, 2.3, false], [23, 3, 1.5, 1.8, false],
  [29, 9, 1, 3.0, false], [36, 19, 1.5, 1.2, false], [42, 7, 1, 0.4, false],
  [49, 16, 1.5, 2.7, false], [62, 11, 1, 1.5, false], [69, 7, 1, 3.1, true],
  [75, 17, 1.5, 0.2, false], [88, 14, 1, 0.6, false], [94, 19, 1, 2.5, false],
  [2, 30, 1, 1.3, false], [14, 33, 1, 0.7, false], [20, 46, 1, 1.6, false],
  [26, 36, 1.5, 3.2, false], [32, 53, 1, 0.1, false], [39, 42, 1, 2.4, false],
  [46, 49, 1, 1.0, false], [58, 55, 1.5, 2.1, true], [64, 69, 1, 1.4, false],
  [71, 48, 1.5, 3.0, false], [77, 60, 1, 0.3, false], [84, 54, 1, 1.7, false],
  [91, 67, 1, 2.6, false], [3, 74, 1, 1.9, false], [10, 82, 1, 3.3, false],
  [16, 69, 1.5, 0.8, false], [22, 79, 1, 2.2, false], [28, 87, 1, 1.1, false],
  [35, 76, 1, 0.0, false], [41, 92, 1.5, 3.1, false], [54, 94, 1, 0.4, true],
  [60, 84, 1, 2.8, false], [66, 77, 1, 1.2, false], [73, 90, 1.5, 0.6, false],
  [79, 85, 1, 2.3, false], [86, 96, 1, 1.8, false], [92, 80, 1, 0.9, false],
  [6, 21, 1, 1.4, false], [12, 16, 1, 0.3, false], [18, 26, 1.5, 2.9, true],
  [24, 13, 1, 1.6, false], [31, 22, 1, 0.7, false], [43, 28, 1, 1.1, false],
  [50, 18, 1.5, 3.2, false], [57, 31, 1, 0.2, false], [63, 24, 1, 1.8, false],
  [70, 12, 1, 0.9, false], [76, 28, 1.5, 2.6, false], [89, 35, 1, 0.4, false],
  [95, 27, 1, 2.0, false], [4, 60, 1, 3.3, false], [9, 55, 1.5, 0.6, false],
  [15, 67, 1, 1.9, false], [21, 48, 1, 1.0, false], [33, 57, 1, 0.1, false],
  [40, 72, 1.5, 1.5, false], [46, 59, 1, 3.0, false], [53, 50, 1, 0.8, false],
  [59, 74, 1.5, 2.3, true], [1, 45, 1, 2.8, false], [7, 53, 1, 1.1, false],
  [13, 37, 1.5, 3.3, false], [19, 43, 1, 0.6, false], [25, 31, 1, 2.0, false],
  [31, 65, 1.5, 0.9, false], [37, 87, 1, 2.2, false], [44, 40, 1, 1.7, false],
  [50, 29, 1, 3.1, false], [56, 41, 1.5, 0.3, false], [68, 36, 1, 1.4, false],
  [74, 51, 1, 2.7, false], [81, 40, 1.5, 0.1, false], [87, 28, 1, 1.8, false],
];

// Larger glowing stars — [left%, top%, sizePx, delayS]
const BRIGHT_STARS: Array<[number, number, number, number]> = [
  [17, 15, 3.5, 0.5], [55, 2, 3, 0.9], [82, 4, 2.5, 1.9], [8, 39, 3, 2.0],
  [52, 63, 2.5, 0.8], [97, 41, 3.5, 0.5], [48, 80, 3, 1.5], [98, 72, 2.5, 3.0],
  [37, 10, 3, 2.4], [83, 18, 3.5, 1.3], [27, 64, 2.5, 2.7],
];

// 4 shooting stars: [left%, top%, animationName, delayS]
const SHOOTING_STARS: Array<[number, number, string, number]> = [
  [78, 4, "shA", 0],
  [42, 8, "shB", 5],
  [88, 15, "shC", 10],
  [18, 3, "shD", 15],
];

type Phase =
  | "idle"
  | "typing-bad"
  | "pause-bad"
  | "deleting"
  | "typing-good"
  | "sending"
  | "bot-typing"
  | "bot-replied"
  | "pause-end";

interface Message {
  from: "user" | "bot";
  text: string;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function HelmIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="6" r="5" fill="#0a1e30" stroke="#ff9d5c" strokeWidth="1.2"/>
      <ellipse cx="7" cy="7" rx="3" ry="2.2" fill="#040f1c"/>
      <path d="M 4.5 5 Q 7 3.5 9.5 5" stroke="#6fe2cf" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <ellipse cx="7" cy="11.2" rx="3.5" ry="1.3" fill="#ff9d5c"/>
    </svg>
  );
}

function AstronautSVG() {
  return (
    <svg
      viewBox="0 0 160 272"
      width="200"
      height="340"
      style={{ overflow: "visible", filter: "drop-shadow(0 0 20px rgba(255,157,92,0.55)) drop-shadow(0 4px 16px rgba(0,0,0,0.7))" }}
      aria-hidden="true"
    >
      {/* Backpack — behind body */}
      <rect x="38" y="108" width="18" height="54" rx="7" fill="#0d2640" stroke="#ff9d5c" strokeWidth="1.5"/>
      <rect x="42" y="118" width="10" height="5" rx="2" fill="#78c7ff" opacity="0.55"/>
      <rect x="42" y="129" width="10" height="5" rx="2" fill="#6fe2cf" opacity="0.55"/>
      <rect x="42" y="140" width="10" height="5" rx="2" fill="#78c7ff" opacity="0.4"/>
      <line x1="55" y1="120" x2="50" y2="120" stroke="#ff9d5c" strokeWidth="1" opacity="0.5"/>
      <line x1="55" y1="148" x2="50" y2="148" stroke="#ff9d5c" strokeWidth="1" opacity="0.5"/>

      {/* Body group — gentle sway */}
      <g style={{ animation: "astronautBody 2.8s ease-in-out infinite", transformBox: "fill-box" as const, transformOrigin: "50% 95%", willChange: "transform" }}>
        {/* Torso */}
        <rect x="50" y="94" width="60" height="72" rx="18" fill="#ff9d5c"/>
        <rect x="88" y="94" width="22" height="72" rx="18" fill="rgba(0,0,0,0.15)"/>
        {/* Chest display */}
        <rect x="61" y="108" width="38" height="28" rx="5" fill="#030d18" stroke="#78c7ff" strokeWidth="1"/>
        <circle cx="68" cy="116" r="2.8" fill="#6fe2cf"/>
        <circle cx="77" cy="116" r="2.8" fill="#ff9d5c"/>
        <circle cx="86" cy="116" r="2.8" fill="#78c7ff"/>
        <rect x="64" y="123" width="32" height="1.5" rx="1" fill="#78c7ff" opacity="0.35"/>
        <rect x="64" y="128" width="22" height="1.5" rx="1" fill="#78c7ff" opacity="0.2"/>
        {/* Shoulder pads */}
        <ellipse cx="46" cy="107" rx="14" ry="10" fill="#e08545"/>
        <ellipse cx="114" cy="107" rx="14" ry="10" fill="#e08545"/>

        {/* Legs — rendered before arms so arms appear in front */}
        <rect x="56" y="162" width="23" height="60" rx="11.5" fill="#e08545"/>
        <rect x="81" y="162" width="23" height="60" rx="11.5" fill="#e08545"/>
        <ellipse cx="67.5" cy="192" rx="10" ry="6" fill="#c06830" opacity="0.6"/>
        <ellipse cx="92.5" cy="192" rx="10" ry="6" fill="#c06830" opacity="0.6"/>
        <ellipse cx="67.5" cy="223" rx="16" ry="10" fill="#0d2640" stroke="#ff9d5c" strokeWidth="1.8"/>
        <ellipse cx="92.5" cy="223" rx="16" ry="10" fill="#0d2640" stroke="#ff9d5c" strokeWidth="1.8"/>

        {/* Left arm — holding pose: upper arm down, forearm bends sharply inward */}
        <polygon points="30,102 46,102 48,144 32,144" fill="#ff9d5c"/>
        <polygon points="32,140 48,144 66,156 50,153" fill="#e08545"/>
        <ellipse cx="60" cy="157" rx="12" ry="8" fill="#c06830"/>

        {/* Right arm — mirrored holding pose */}
        <polygon points="130,102 114,102 112,144 128,144" fill="#ff9d5c"/>
        <polygon points="128,140 112,144 94,156 110,153" fill="#e08545"/>
        <ellipse cx="100" cy="157" rx="12" ry="8" fill="#c06830"/>

        {/* Thumbs — typing rhythm, centered at hand level */}
        <g style={{ animation: "astronautThumb 0.52s ease-in-out infinite", transformBox: "fill-box" as const, transformOrigin: "50% 50%", willChange: "transform" }}>
          <rect x="56" y="154" width="10" height="5" rx="2.5" fill="#a05520"/>
          <rect x="94" y="154" width="10" height="5" rx="2.5" fill="#a05520"/>
        </g>

        {/* Helmet group — head bob */}
        <g style={{ animation: "astronautHead 2.4s ease-in-out infinite", transformBox: "fill-box" as const, transformOrigin: "50% 100%", willChange: "transform" }}>
          <rect x="66" y="86" width="28" height="14" rx="7" fill="#c06830"/>
          <ellipse cx="80" cy="96" rx="32" ry="8" fill="#e08545"/>
          <circle cx="80" cy="60" r="36" fill="#1a3a58" stroke="#ff9d5c" strokeWidth="2.5"/>
          <circle cx="80" cy="60" r="36" fill="url(#helmetGrad)"/>
          <ellipse cx="80" cy="65" rx="24" ry="19" fill="#040f1d"/>
          <ellipse cx="80" cy="65" rx="22" ry="17" fill="rgba(10,30,60,0.8)" stroke="#78c7ff" strokeWidth="0.5" opacity="0.6"/>
          <path d="M 61 53 Q 72 44 93 50" stroke="#6fe2cf" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
          <path d="M 67 47 Q 74 43 81 45" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <rect x="44" y="54" width="6" height="3" rx="1.5" fill="#0a2040" opacity="0.8"/>
          <rect x="44" y="60" width="6" height="3" rx="1.5" fill="#0a2040" opacity="0.8"/>
          <rect x="110" y="54" width="6" height="3" rx="1.5" fill="#0a2040" opacity="0.8"/>
          <rect x="110" y="60" width="6" height="3" rx="1.5" fill="#0a2040" opacity="0.8"/>
          <line x1="80" y1="26" x2="80" y2="40" stroke="#78c7ff" strokeWidth="2" opacity="0.7"/>
          <circle cx="80" cy="22" r="4.5" fill="#6fe2cf" style={{ animation: "helmetLight 1.9s ease-in-out infinite" }}/>
          <circle cx="80" cy="22" r="2.5" fill="white" opacity="0.6" style={{ animation: "helmetLight 1.9s ease-in-out 0.3s infinite" }}/>
          <circle cx="113" cy="44" r="3.5" fill="#ff9d5c" style={{ animation: "helmetLight 2.8s ease-in-out 0.7s infinite" }}/>
        </g>
      </g>

      <defs>
        <radialGradient id="helmetGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.06)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.22)"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

function ResultCard() {
  return (
    <div
      style={{
        marginTop: 8,
        background: "linear-gradient(135deg, rgba(13,36,64,0.97), rgba(9,24,44,0.97))",
        border: "1px solid rgba(120,199,255,0.3)",
        borderRadius: 12,
        padding: "10px 12px",
        animation: "cardFadeIn 0.4s ease forwards",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
        <span style={{ fontSize: 12 }}>🚀</span>
        <span style={{ fontSize: 10, color: "#5d8099", letterSpacing: "0.02em" }}>nasa.gov</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#dbe8f7", marginBottom: 5, lineHeight: 1.3 }}>
        Book Your Moon Trip
      </div>
      <div style={{ fontSize: 10, color: "#7d9ab5", lineHeight: 1.5, marginBottom: 9 }}>
        Reserve your seat on the next lunar mission.
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "4px 10px", borderRadius: 7, background: "#ff9d5c", color: "#04101c", fontSize: 10, fontWeight: 700 }}>
        Book your trip →
      </div>
    </div>
  );
}

export function SpacemanAnimation() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [botTyping, setBotTyping] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const phaseRef = useRef(phase);
  const inputRef = useRef(input);
  phaseRef.current = phase;
  inputRef.current = input;

  // Show result card 500ms after bot reply
  useEffect(() => {
    if (phase === "bot-replied") {
      const id = setTimeout(() => setShowCard(true), 500);
      return () => clearTimeout(id);
    }
    setShowCard(false);
    return;
  }, [phase]);

  // Typewriter state machine
  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;

    if (phase === "idle") {
      setInput("");
      setMessages([]);
      setBotTyping(false);
      t = setTimeout(() => setPhase("typing-bad"), 1200);
    } else if (phase === "typing-bad") {
      if (input.length < BAD_TEXT.length) {
        t = setTimeout(() => setInput(BAD_TEXT.slice(0, input.length + 1)), 72 + Math.random() * 45);
      } else {
        t = setTimeout(() => setPhase("pause-bad"), 750);
      }
    } else if (phase === "pause-bad") {
      t = setTimeout(() => setPhase("deleting"), 550);
    } else if (phase === "deleting") {
      if (input.length > 0) {
        t = setTimeout(() => setInput((p) => p.slice(0, -1)), 36 + Math.random() * 18);
      } else {
        t = setTimeout(() => setPhase("typing-good"), 420);
      }
    } else if (phase === "typing-good") {
      if (input.length < GOOD_TEXT.length) {
        t = setTimeout(() => setInput(GOOD_TEXT.slice(0, input.length + 1)), 63 + Math.random() * 38);
      } else {
        t = setTimeout(() => setPhase("sending"), 600);
      }
    } else if (phase === "sending") {
      setMessages([{ from: "user", text: GOOD_TEXT }]);
      setInput("");
      t = setTimeout(() => setPhase("bot-typing"), 350);
    } else if (phase === "bot-typing") {
      setBotTyping(true);
      t = setTimeout(() => setPhase("bot-replied"), 1900);
    } else if (phase === "bot-replied") {
      setBotTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text: "Found it — here's what came up 👇" }]);
      t = setTimeout(() => setPhase("pause-end"), 5500);
    } else if (phase === "pause-end") {
      t = setTimeout(() => setPhase("idle"), 1100);
    }

    return () => clearTimeout(t);
  }, [phase, input, reduced]);

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none", overflow: "hidden" }}
    >
      <style>{`
        @keyframes starTwinkle {
          0%,100% { opacity:1.0; transform:scale(1.2); }
          50%      { opacity:0.15; transform:scale(0.8); }
        }
        @keyframes starGlimmer {
          0%,100% { opacity:1; transform:scale(1.25); filter:brightness(1.6); }
          50%      { opacity:0.38; transform:scale(0.78); filter:brightness(0.5); }
        }
        @keyframes blinkCaret {
          0%,100% { opacity:1; }
          50%      { opacity:0; }
        }
        @keyframes dotBounce {
          0%,80%,100% { transform:scale(0.65); opacity:0.35; }
          40%          { transform:scale(1.15); opacity:1; }
        }
        @keyframes phonePulse {
          0%,100% { box-shadow:0 0 20px 6px rgba(255,157,92,0.50), 0 0 80px 24px rgba(255,157,92,0.16), inset 0 1px 0 rgba(255,255,255,0.08); }
          50%      { box-shadow:0 0 32px 10px rgba(255,157,92,0.68), 0 0 110px 32px rgba(255,157,92,0.24), inset 0 1px 0 rgba(255,255,255,0.08); }
        }
        @keyframes astronautFloat {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-14px); }
        }
        @keyframes astronautBody {
          0%,100% { transform:rotate(-0.4deg); }
          50%      { transform:rotate(0.4deg); }
        }
        @keyframes astronautHead {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-2.5px); }
        }
        @keyframes astronautThumb {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-2.5px); }
        }
        @keyframes helmetLight {
          0%,100% { opacity:1; }
          50%      { opacity:0.15; }
        }
        @keyframes cardFadeIn {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shA {
          0%,18%,100% { opacity:0; transform:translate(0px,0px) rotate(148deg); }
          3%  { opacity:0.95; transform:translate(-60px,42px) rotate(148deg); }
          16% { opacity:0; transform:translate(-240px,168px) rotate(148deg); }
        }
        @keyframes shB {
          0%,18%,100% { opacity:0; transform:translate(0px,0px) rotate(32deg); }
          3%  { opacity:0.95; transform:translate(52px,33px) rotate(32deg); }
          16% { opacity:0; transform:translate(210px,130px) rotate(32deg); }
        }
        @keyframes shC {
          0%,18%,100% { opacity:0; transform:translate(0px,0px) rotate(152deg); }
          3%  { opacity:0.95; transform:translate(-50px,37px) rotate(152deg); }
          16% { opacity:0; transform:translate(-200px,148px) rotate(152deg); }
        }
        @keyframes shD {
          0%,18%,100% { opacity:0; transform:translate(0px,0px) rotate(28deg); }
          3%  { opacity:0.95; transform:translate(44px,23px) rotate(28deg); }
          16% { opacity:0; transform:translate(175px,92px) rotate(28deg); }
        }

        /* ── Responsive overrides ─────────────────────────────────── */

        /* < 1280px: shrink phone slightly, maintain centering */
        @media (max-width: 1279px) {
          .spaceman-phone {
            width: 286px !important;
            transform: translateX(-50%) !important;
          }
        }

        /* < 1024px (tablet/stacked layout): adjust spaceman, keep phone centered */
        @media (max-width: 1023px) {
          .spaceman-halo  { opacity: 0.7 !important; }
          .spaceman-astronaut {
            right: 10px !important;
            left: auto !important;
            top: 160px !important;
            opacity: 0.50 !important;
            width: 160px !important;
            height: 272px !important;
          }
        }

        /* 768–1023px: tablet — phone visible and centered, no scale */
        @media (min-width: 768px) and (max-width: 1023px) {
          .spaceman-phone {
            width: 272px !important;
            top: 56px !important;
            transform: translateX(-50%) !important;
          }
        }

        /* < 768px (mobile): show phone smaller and slightly transparent as background element */
        @media (max-width: 767px) {
          .spaceman-phone {
            width: 220px !important;
            top: 36px !important;
            opacity: 0.52 !important;
            transform: translateX(-50%) !important;
          }
        }

        /* < 640px (mobile): hide astronaut — only stars remain */
        @media (max-width: 639px) {
          .spaceman-astronaut { display: none !important; }
          .spaceman-halo      { display: none !important; }
        }
      `}</style>

      {/* Deep-space atmospheric gradient — preserves star visibility in mid-section, anchors edges */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background: `
          radial-gradient(ellipse 140% 55% at 62% 0%, rgba(14,42,84,0.74) 0%, transparent 55%),
          radial-gradient(ellipse 70% 40% at 18% 100%, rgba(8,24,50,0.50) 0%, transparent 50%),
          radial-gradient(ellipse 50% 30% at 85% 60%, rgba(255,157,92,0.08) 0%, transparent 50%),
          linear-gradient(180deg, rgba(4,10,20,0.78) 0%, rgba(7,18,34,0.12) 45%, rgba(4,10,20,0.78) 100%)
        `,
        pointerEvents: "none",
      }}/>

      {/* Regular starfield */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {STARS.map(([l, t, s, d, o], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${l}%`,
              top: `${t}%`,
              width: s,
              height: s,
              borderRadius: "50%",
              background: o ? "rgba(255,157,92,0.72)" : "rgba(255,255,255,0.82)",
              animation: `starTwinkle ${Math.min(1.8 + d * 0.6, 3.9).toFixed(2)}s ease-in-out ${(d * 0.9).toFixed(2)}s infinite`,
              willChange: "opacity, transform",
            }}
          />
        ))}

        {/* Bright glowing stars */}
        {BRIGHT_STARS.map(([l, t, s, d], i) => (
          <div
            key={`b${i}`}
            style={{
              position: "absolute",
              left: `${l}%`,
              top: `${t}%`,
              width: s,
              height: s,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.97)",
              boxShadow: `0 0 ${s * 3}px ${s}px rgba(200,225,255,0.62)`,
              animation: `starGlimmer ${Math.min(2.2 + d * 0.5, 4.0).toFixed(2)}s ease-in-out ${(d * 0.8).toFixed(2)}s infinite`,
              willChange: "opacity, transform, filter",
            }}
          />
        ))}

        {/* Shooting stars */}
        {SHOOTING_STARS.map(([l, t, name, delay], i) => (
          <div
            key={`sh${i}`}
            style={{
              position: "absolute",
              left: `${l}%`,
              top: `${t}%`,
              width: 200,
              height: 2,
              background: "linear-gradient(90deg, rgba(255,210,130,0.95), rgba(255,157,92,0.6) 35%, transparent 100%)",
              borderRadius: 2,
              opacity: 0,
              animation: `${name} 20s linear ${delay}s infinite`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      {/* Astronaut — upper-right, clearly floating in space, intentional placement */}
      <div
        className="spaceman-astronaut"
        style={{
          position: "absolute",
          right: 60,
          top: 30,
          width: 200,
          height: 340,
          zIndex: 1,
          opacity: 0.82,
          animation: "astronautFloat 3.6s ease-in-out infinite",
          willChange: "transform",
        }}
      >
        <AstronautSVG />
      </div>

      {/* Orange halo anchored behind astronaut — upper-right */}
      <div
        className="spaceman-halo"
        style={{
          position: "absolute",
          right: -60,
          top: -30,
          width: 500,
          height: 580,
          background: "radial-gradient(ellipse at center, rgba(255,157,92,0.18) 0%, transparent 62%)",
          filter: "blur(50px)",
          borderRadius: "50%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Phone — centered horizontally, near top of hero */}
      <div
        className="spaceman-phone"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 50,
          width: 310,
          background: "rgba(4, 12, 26, 0.22)",
          backdropFilter: "blur(16px) saturate(1.6)",
          WebkitBackdropFilter: "blur(16px) saturate(1.6)",
          borderRadius: 32,
          border: "1px solid rgba(255,157,92,0.40)",
          boxShadow: "0 0 20px 6px rgba(255,157,92,0.50), 0 0 80px 24px rgba(255,157,92,0.16), inset 0 1px 0 rgba(255,255,255,0.08)",
          animation: "phonePulse 3.2s ease-in-out infinite",
          zIndex: 3,
          overflow: "hidden",
          padding: "14px 14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {/* Status bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, padding: "0 2px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <HelmIcon />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#dbe8f7", letterSpacing: "0.04em" }}>SPEAKLY AI</span>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <span style={{ fontSize: 9, color: "#6fe2cf", fontWeight: 600 }}>ONLINE</span>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6fe2cf", boxShadow: "0 0 6px #6fe2cf" }} />
          </div>
        </div>

        {/* Chat area */}
        <div style={{ minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8, padding: "4px 0" }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                maxWidth: "82%",
                padding: "9px 13px",
                borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: msg.from === "user"
                  ? "linear-gradient(135deg, #ff9d5c, #f5c86f)"
                  : "rgba(120,199,255,0.12)",
                border: msg.from === "bot" ? "1px solid rgba(120,199,255,0.22)" : "none",
                color: msg.from === "user" ? "#04101c" : "#dbe8f7",
                fontSize: 11,
                fontWeight: msg.from === "user" ? 600 : 400,
                lineHeight: 1.45,
                animation: "cardFadeIn 0.3s ease forwards",
              }}
            >
              {msg.text}
            </div>
          ))}

          {botTyping && (
            <div style={{
              alignSelf: "flex-start",
              padding: "10px 14px",
              borderRadius: "16px 16px 16px 4px",
              background: "rgba(120,199,255,0.10)",
              border: "1px solid rgba(120,199,255,0.20)",
              display: "flex",
              gap: 5,
              alignItems: "center",
            }}>
              {[0, 0.16, 0.32].map((d) => (
                <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: "#78c7ff", animation: `dotBounce 1.1s ease-in-out ${d}s infinite` }} />
              ))}
            </div>
          )}

          {showCard && <ResultCard />}
        </div>

        {/* Input row */}
        <div style={{
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 12px",
          borderRadius: 18,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(120,199,255,0.18)",
        }}>
          <span style={{ flex: 1, fontSize: 11, color: input ? "#dbe8f7" : "#4a6a8a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {input || "Ask anything…"}
            {(phase === "typing-bad" || phase === "typing-good" || phase === "deleting") && (
              <span style={{ display: "inline-block", width: 1.5, height: "1em", background: "#78c7ff", verticalAlign: "middle", marginLeft: 1, animation: "blinkCaret 0.85s step-end infinite" }} />
            )}
          </span>
          <div style={{ width: 26, height: 26, borderRadius: 9, background: "linear-gradient(135deg, #6fe2cf, #78c7ff)", display: "grid", placeItems: "center", flexShrink: 0 }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1 10L10 1M10 1H3M10 1V8" stroke="#04101c" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
