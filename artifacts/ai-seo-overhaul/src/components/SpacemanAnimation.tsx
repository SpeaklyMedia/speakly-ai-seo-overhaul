import { useEffect, useRef, useState } from "react";

const BAD_TEXT = "how can I get really high";
const GOOD_TEXT = "when's the next rocket to the moon?";

/* ─── Static star field ────────────────────────────────────────────────────
   Each tuple: [left%, top%, sizePx, delayS, isOrange]
   Defined outside component — no Math.random() at render time.
──────────────────────────────────────────────────────────────────────────── */
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

/* ─── Small user avatar (orange helmet icon) ────────────────────────────── */
function HelmIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="6" r="5" fill="#0a1e30" stroke="#ff9d5c" strokeWidth="1.2"/>
      <ellipse cx="7" cy="7" rx="3" ry="2.2" fill="#040f1c"/>
      <path d="M 4.5 5 Q 7 3.5 9.5 5" stroke="#6fe2cf" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <ellipse cx="7" cy="11.2" rx="3.5" ry="1.3" fill="#ff9d5c"/>
    </svg>
  );
}

/* ─── SVG Astronaut ─────────────────────────────────────────────────────── */
function AstronautSVG() {
  return (
    <svg
      viewBox="0 0 160 272"
      width="200"
      height="340"
      style={{
        overflow: "visible",
        filter:
          "drop-shadow(0 0 20px rgba(255,157,92,0.55)) drop-shadow(0 6px 16px rgba(0,0,0,0.7))",
      }}
      aria-hidden="true"
    >
      {/* ── Backpack (behind body, rendered first) ── */}
      <rect x="38" y="108" width="18" height="54" rx="7"
        fill="#0d2640" stroke="#ff9d5c" strokeWidth="1.5"/>
      <rect x="42" y="118" width="10" height="5" rx="2"
        fill="#78c7ff" opacity="0.55"/>
      <rect x="42" y="129" width="10" height="5" rx="2"
        fill="#6fe2cf" opacity="0.55"/>
      <rect x="42" y="140" width="10" height="5" rx="2"
        fill="#78c7ff" opacity="0.4"/>
      <line x1="55" y1="120" x2="50" y2="120" stroke="#ff9d5c"
        strokeWidth="1" opacity="0.5"/>
      <line x1="55" y1="148" x2="50" y2="148" stroke="#ff9d5c"
        strokeWidth="1" opacity="0.5"/>

      {/* ── Body group — gentle sway ── */}
      <g
        style={{
          animation: "astBody 2.8s ease-in-out infinite",
          transformBox: "fill-box" as const,
          transformOrigin: "50% 95%",
          willChange: "transform",
        }}
      >
        {/* Torso */}
        <rect x="50" y="94" width="60" height="72" rx="18" fill="#ff9d5c"/>
        {/* Torso shading */}
        <rect x="88" y="94" width="22" height="72" rx="18"
          fill="rgba(0,0,0,0.15)"/>

        {/* Chest display panel */}
        <rect x="61" y="108" width="38" height="28" rx="5"
          fill="#030d18" stroke="#78c7ff" strokeWidth="1"/>
        {/* LED row */}
        <circle cx="68" cy="116" r="2.8" fill="#6fe2cf"/>
        <circle cx="77" cy="116" r="2.8" fill="#ff9d5c"/>
        <circle cx="86" cy="116" r="2.8" fill="#78c7ff"/>
        {/* Scan lines */}
        <rect x="64" y="123" width="32" height="1.5" rx="1"
          fill="#78c7ff" opacity="0.35"/>
        <rect x="64" y="128" width="22" height="1.5" rx="1"
          fill="#78c7ff" opacity="0.2"/>

        {/* Left shoulder pad */}
        <ellipse cx="46" cy="107" rx="14" ry="10" fill="#e08545"/>
        {/* Right shoulder pad */}
        <ellipse cx="114" cy="107" rx="14" ry="10" fill="#e08545"/>

        {/* Left upper arm */}
        <rect x="24" y="104" width="26" height="12" rx="6" fill="#ff9d5c"/>
        {/* Left forearm */}
        <rect x="20" y="112" width="12" height="40" rx="6" fill="#ff9d5c"/>
        {/* Left glove */}
        <ellipse cx="26" cy="157" rx="11" ry="9" fill="#c06830"/>
        <ellipse cx="26" cy="157" rx="8" ry="6" fill="#a85428" opacity="0.5"/>

        {/* Right upper arm */}
        <rect x="110" y="104" width="26" height="12" rx="6" fill="#ff9d5c"/>
        {/* Right forearm */}
        <rect x="128" y="112" width="12" height="40" rx="6" fill="#ff9d5c"/>
        {/* Right glove */}
        <ellipse cx="134" cy="157" rx="11" ry="9" fill="#c06830"/>
        <ellipse cx="134" cy="157" rx="8" ry="6" fill="#a85428" opacity="0.5"/>

        {/* ── Thumbs group — fast typing rhythm ── */}
        <g
          style={{
            animation: "astThumb 0.52s ease-in-out infinite",
            transformBox: "fill-box" as const,
            transformOrigin: "50% 50%",
            willChange: "transform",
          }}
        >
          {/* Left thumb */}
          <rect x="29" y="152" width="9" height="5" rx="2.5" fill="#a05520"/>
          {/* Right thumb */}
          <rect x="122" y="152" width="9" height="5" rx="2.5" fill="#a05520"/>
        </g>

        {/* Left leg */}
        <rect x="56" y="162" width="23" height="60" rx="11.5" fill="#e08545"/>
        {/* Right leg */}
        <rect x="81" y="162" width="23" height="60" rx="11.5" fill="#e08545"/>
        {/* Knee pads */}
        <ellipse cx="67.5" cy="192" rx="10" ry="6" fill="#c06830" opacity="0.6"/>
        <ellipse cx="92.5" cy="192" rx="10" ry="6" fill="#c06830" opacity="0.6"/>
        {/* Left boot */}
        <ellipse cx="67.5" cy="223" rx="16" ry="10" fill="#0d2640" stroke="#ff9d5c" strokeWidth="1.8"/>
        <ellipse cx="67.5" cy="221" rx="10" ry="5" fill="#172e48" opacity="0.6"/>
        {/* Right boot */}
        <ellipse cx="92.5" cy="223" rx="16" ry="10" fill="#0d2640" stroke="#ff9d5c" strokeWidth="1.8"/>
        <ellipse cx="92.5" cy="221" rx="10" ry="5" fill="#172e48" opacity="0.6"/>

        {/* ── Helmet group — head bob ── */}
        <g
          style={{
            animation: "astHead 2.4s ease-in-out infinite",
            transformBox: "fill-box" as const,
            transformOrigin: "50% 100%",
            willChange: "transform",
          }}
        >
          {/* Neck collar */}
          <rect x="66" y="86" width="28" height="14" rx="7" fill="#c06830"/>
          {/* Helmet base ring */}
          <ellipse cx="80" cy="96" rx="32" ry="8" fill="#e08545"/>
          {/* Helmet dome */}
          <circle cx="80" cy="60" r="36" fill="#1a3a58" stroke="#ff9d5c" strokeWidth="2.5"/>
          {/* Helmet dome shading */}
          <circle cx="80" cy="60" r="36"
            fill="url(#helmetGrad)"/>
          {/* Visor */}
          <ellipse cx="80" cy="65" rx="24" ry="19" fill="#040f1d"/>
          {/* Visor inner glow */}
          <ellipse cx="80" cy="65" rx="22" ry="17"
            fill="rgba(10,30,60,0.8)" stroke="#78c7ff" strokeWidth="0.5" opacity="0.6"/>
          {/* Visor shine top */}
          <path d="M 61 53 Q 72 44 93 50" stroke="#6fe2cf"
            strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
          {/* Visor shine small */}
          <path d="M 67 47 Q 74 43 81 45" stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Side vent left */}
          <rect x="44" y="54" width="6" height="3" rx="1.5" fill="#0a2040" opacity="0.8"/>
          <rect x="44" y="60" width="6" height="3" rx="1.5" fill="#0a2040" opacity="0.8"/>
          {/* Side vent right */}
          <rect x="110" y="54" width="6" height="3" rx="1.5" fill="#0a2040" opacity="0.8"/>
          <rect x="110" y="60" width="6" height="3" rx="1.5" fill="#0a2040" opacity="0.8"/>
          {/* Antenna */}
          <line x1="80" y1="24" x2="80" y2="26" stroke="#78c7ff" strokeWidth="2"/>
          <line x1="80" y1="26" x2="80" y2="40" stroke="#78c7ff" strokeWidth="2" opacity="0.7"/>
          {/* Antenna tip light — blinks */}
          <circle cx="80" cy="22" r="4.5" fill="#6fe2cf"
            style={{ animation: "helmetLight 1.9s ease-in-out infinite" }}/>
          <circle cx="80" cy="22" r="2.5" fill="white" opacity="0.6"
            style={{ animation: "helmetLight 1.9s ease-in-out 0.3s infinite" }}/>
          {/* Side light */}
          <circle cx="113" cy="44" r="3.5" fill="#ff9d5c"
            style={{ animation: "helmetLight 2.8s ease-in-out 0.7s infinite" }}/>
        </g>
      </g>

      {/* SVG gradient def */}
      <defs>
        <radialGradient id="helmetGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.06)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.22)"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ─── Result card ───────────────────────────────────────────────────────── */
function ResultCard() {
  return (
    <div
      style={{
        marginTop: 6,
        background:
          "linear-gradient(135deg, rgba(13,36,64,0.96), rgba(9,24,44,0.96))",
        border: "1px solid rgba(120,199,255,0.28)",
        borderRadius: 10,
        padding: "8px 10px",
        animation: "cardFadeIn 0.4s ease forwards",
      }}
    >
      {/* Source row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          marginBottom: 5,
        }}
      >
        <span style={{ fontSize: 10 }}>🚀</span>
        <span style={{ fontSize: 8, color: "#5d8099", letterSpacing: "0.02em" }}>
          nasa.gov
        </span>
      </div>
      {/* Title */}
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#dbe8f7",
          marginBottom: 4,
          lineHeight: 1.3,
        }}
      >
        Book Your Moon Trip
      </div>
      {/* Description */}
      <div
        style={{
          fontSize: 8.5,
          color: "#7d9ab5",
          lineHeight: 1.45,
          marginBottom: 8,
        }}
      >
        Reserve your seat on the next lunar mission. Applications open now.
      </div>
      {/* CTA */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 3,
          padding: "3px 9px",
          borderRadius: 6,
          background: "#ff9d5c",
          color: "#04101c",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.01em",
        }}
      >
        Book your trip →
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */
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

  /* Show result card 600 ms after bot reply arrives */
  useEffect(() => {
    if (phase === "bot-replied") {
      const id = setTimeout(() => setShowCard(true), 600);
      return () => clearTimeout(id);
    }
    setShowCard(false);
    return;
  }, [phase]);

  /* Main typewriter state machine */
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
        t = setTimeout(
          () => setInput(BAD_TEXT.slice(0, input.length + 1)),
          72 + Math.random() * 45,
        );
      } else {
        t = setTimeout(() => setPhase("pause-bad"), 750);
      }
    } else if (phase === "pause-bad") {
      t = setTimeout(() => setPhase("deleting"), 550);
    } else if (phase === "deleting") {
      if (input.length > 0) {
        t = setTimeout(
          () => setInput((p) => p.slice(0, -1)),
          36 + Math.random() * 18,
        );
      } else {
        t = setTimeout(() => setPhase("typing-good"), 420);
      }
    } else if (phase === "typing-good") {
      if (input.length < GOOD_TEXT.length) {
        t = setTimeout(
          () => setInput(GOOD_TEXT.slice(0, input.length + 1)),
          63 + Math.random() * 38,
        );
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
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Found it — here's what came up 👇" },
      ]);
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
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes starTwinkle {
          0%,100% { opacity: 0.85; transform: scale(1); }
          50%      { opacity: 0.12; transform: scale(0.72); }
        }
        @keyframes blinkCaret {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes dotBounce {
          0%,80%,100% { transform: scale(0.65); opacity: 0.35; }
          40%          { transform: scale(1.15); opacity: 1; }
        }
        @keyframes phonePulse {
          0%,100% { box-shadow: 0 0 18px 5px rgba(255,157,92,0.48), 0 0 70px 22px rgba(255,157,92,0.14), inset 0 1px 0 rgba(255,255,255,0.06); }
          50%      { box-shadow: 0 0 26px 8px rgba(255,157,92,0.62), 0 0 90px 28px rgba(255,157,92,0.20), inset 0 1px 0 rgba(255,255,255,0.06); }
        }
        @keyframes astFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes astBody {
          0%,100% { transform: rotate(-0.4deg); }
          50%      { transform: rotate(0.4deg); }
        }
        @keyframes astHead {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-2.5px); }
        }
        @keyframes astThumb {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-2px); }
        }
        @keyframes helmetLight {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.15; }
        }
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
      `}</style>

      {/* ── Starfield layer ── */}
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
              background: o
                ? "rgba(255,157,92,0.72)"
                : "rgba(255,255,255,0.82)",
              animation: `starTwinkle ${1.85 + d * 0.68}s ease-in-out ${d * 0.9}s infinite`,
              willChange: "opacity",
            }}
          />
        ))}
      </div>

      {/* ── Soft orange halo behind phone ── */}
      <div
        style={{
          position: "absolute",
          right: "4%",
          top: 100,
          width: 460,
          height: 600,
          background:
            "radial-gradient(ellipse at center, rgba(255,157,92,0.08) 0%, transparent 68%)",
          filter: "blur(40px)",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />

      {/* ── Phone shell ── */}
      <div
        style={{
          position: "absolute",
          right: "7%",
          top: 130,
          width: 196,
          background: "#030d18",
          borderRadius: 30,
          border: "2.5px solid #ff9d5c",
          animation: "phonePulse 3.8s ease-in-out infinite",
          padding: "13px 0 11px",
          display: "flex",
          flexDirection: "column",
          opacity: 0.88,
          zIndex: 2,
        }}
      >
        {/* Speaker notch */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <div
            style={{
              width: 42,
              height: 5,
              borderRadius: 3,
              background: "#172840",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
            }}
          />
        </div>

        {/* Screen */}
        <div
          style={{
            background: "#060f1c",
            margin: "0 7px",
            borderRadius: 12,
            minHeight: 310,
            padding: "10px 8px 8px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 10,
              paddingBottom: 8,
              borderBottom: "1px solid rgba(120,199,255,0.10)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#0a2036",
                border: "1px solid rgba(120,199,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                flexShrink: 0,
              }}
            >
              🤖
            </div>
            <span
              style={{
                fontSize: 9,
                color: "#78c7ff",
                fontWeight: 600,
                letterSpacing: "0.04em",
                flex: 1,
              }}
            >
              AI Agent
            </span>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#6fe2cf",
                boxShadow: "0 0 5px #6fe2cf",
              }}
            />
          </div>

          {/* Messages area */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 7,
              minHeight: 190,
            }}
          >
            {messages.map((msg, i) => (
              <div key={i}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                    gap: 5,
                  }}
                >
                  {msg.from === "bot" && (
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "#0a2036",
                        border: "1px solid rgba(120,199,255,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 8,
                        flexShrink: 0,
                      }}
                    >
                      🤖
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: "78%",
                      padding: "6px 9px",
                      borderRadius:
                        msg.from === "user"
                          ? "12px 12px 3px 12px"
                          : "12px 12px 12px 3px",
                      background:
                        msg.from === "user" ? "#6fe2cf" : "#0b2236",
                      color: msg.from === "user" ? "#03111e" : "#b8d5ee",
                      fontSize: 10,
                      fontWeight: msg.from === "user" ? 700 : 400,
                      lineHeight: 1.45,
                      border:
                        msg.from === "bot"
                          ? "1px solid rgba(120,199,255,0.18)"
                          : "none",
                    }}
                  >
                    {msg.text}
                  </div>
                  {msg.from === "user" && (
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        flexShrink: 0,
                        border: "1.5px solid #ff9d5c",
                        background: "#0a1e30",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <HelmIcon />
                    </div>
                  )}
                </div>

                {/* Result card — only under bot's message */}
                {msg.from === "bot" && showCard && <ResultCard />}
              </div>
            ))}

            {/* Bot typing indicator */}
            {botTyping && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5 }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#0a2036",
                    border: "1px solid rgba(120,199,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8,
                    flexShrink: 0,
                  }}
                >
                  🤖
                </div>
                <div
                  style={{
                    padding: "7px 10px",
                    borderRadius: "12px 12px 12px 3px",
                    background: "#0b2236",
                    border: "1px solid rgba(120,199,255,0.18)",
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((idx) => (
                    <div
                      key={idx}
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "#78c7ff",
                        animation: `dotBounce 1.1s ease-in-out ${idx * 0.16}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input row */}
          <div
            style={{
              background: "#0c1e30",
              border: `1px solid ${input ? "rgba(255,157,92,0.60)" : "rgba(255,157,92,0.22)"}`,
              borderRadius: 10,
              padding: "6px 8px",
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginTop: 8,
              flexShrink: 0,
              transition: "border-color 0.3s",
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: 9,
                color: input ? "#c8dff0" : "#3d586e",
                lineHeight: 1.5,
                letterSpacing: "0.01em",
                minHeight: 14,
              }}
            >
              {input || "Ask anything…"}
              {input && (
                <span
                  style={{
                    display: "inline-block",
                    width: 1,
                    height: 10,
                    background: "#ff9d5c",
                    marginLeft: 1,
                    verticalAlign: "text-bottom",
                    animation: "blinkCaret 0.85s step-end infinite",
                  }}
                />
              )}
            </span>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background:
                  phase === "sending" || messages.length > 0
                    ? "#ff9d5c"
                    : "#172840",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
                color: "#04101c",
                fontWeight: 900,
                transition: "background 0.3s",
                flexShrink: 0,
              }}
            >
              ↑
            </div>
          </div>
        </div>

        {/* Home button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              border: "2px solid rgba(255,157,92,0.55)",
              boxShadow: "0 0 8px rgba(255,157,92,0.25)",
            }}
          />
        </div>
      </div>

      {/* ── SVG Astronaut ── */}
      <div
        style={{
          position: "absolute",
          right: -28,
          top: 295,
          width: 200,
          height: 340,
          zIndex: 3,
          animation: "astFloat 3.6s ease-in-out infinite",
          willChange: "transform",
        }}
      >
        <AstronautSVG />
      </div>
    </div>
  );
}
