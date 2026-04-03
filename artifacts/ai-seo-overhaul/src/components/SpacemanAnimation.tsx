import { useEffect, useRef, useState } from "react";

const BAD_TEXT = "how can I get really high";
const GOOD_TEXT = "when's the next rocket to the moon?";

type Phase =
  | "idle"
  | "typing-bad"
  | "pause-bad"
  | "deleting"
  | "typing-good"
  | "sending"
  | "sent"
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

export function SpacemanAnimation() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [botTyping, setBotTyping] = useState(false);
  const [pose, setPose] = useState(0);
  const phaseRef = useRef(phase);
  const inputRef = useRef(input);
  phaseRef.current = phase;
  inputRef.current = input;

  /* Pose cycling — bob between 3 astronaut frames */
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setPose((p) => (p + 1) % 3), 1100);
    return () => clearInterval(id);
  }, [reduced]);

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
        { from: "bot", text: "I found just the thing 🚀" },
      ]);
      t = setTimeout(() => setPhase("pause-end"), 3000);
    } else if (phase === "pause-end") {
      t = setTimeout(() => setPhase("idle"), 1100);
    }

    return () => clearTimeout(t);
  }, [phase, input, reduced]);

  if (reduced) return null;

  const poseX = pose === 0 ? "0%" : pose === 1 ? "50%" : "100%";

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
      {/* Keyframes */}
      <style>{`
        @keyframes spaceFloat {
          0%,100% { transform: translateY(0px) rotate(-0.8deg); }
          50%      { transform: translateY(-16px) rotate(0.8deg); }
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
      `}</style>

      {/* Soft halo behind phone area */}
      <div
        style={{
          position: "absolute",
          right: "4%",
          top: 140,
          width: 420,
          height: 560,
          background:
            "radial-gradient(ellipse at center, rgba(255,157,92,0.09) 0%, transparent 68%)",
          filter: "blur(36px)",
          borderRadius: "50%",
        }}
      />

      {/* Phone shell */}
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
          opacity: 0.82,
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
            minHeight: 270,
            padding: "10px 8px 8px",
            display: "flex",
            flexDirection: "column",
            gap: 0,
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

          {/* Messages */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 7,
              minHeight: 160,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
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
                      overflow: "hidden",
                      flexShrink: 0,
                      border: "1.5px solid #ff9d5c",
                      background: "#ff9d5c22",
                    }}
                  >
                    <div
                      style={{
                        width: "300%",
                        height: "100%",
                        backgroundImage: `url(${import.meta.env.BASE_URL}spaceman/astronaut-frames.png)`,
                        backgroundSize: "100% auto",
                        backgroundPosition: `${poseX} center`,
                        backgroundRepeat: "no-repeat",
                        transform: "translateX(-33.33%)",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Bot typing indicator */}
            {botTyping && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 5,
                }}
              >
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
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "#78c7ff",
                        animation: `dotBounce 1.1s ease-in-out ${i * 0.16}s infinite`,
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
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 12 }}
        >
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

      {/* Spaceman */}
      <div
        style={{
          position: "absolute",
          right: -16,
          top: 350,
          width: 200,
          height: 270,
          animation: "spaceFloat 3.4s ease-in-out infinite",
          willChange: "transform",
          overflow: "hidden",
          maskImage: [
            "linear-gradient(to bottom, transparent 0%, black 14%, black 80%, transparent 100%)",
            "linear-gradient(to right,  black 0%, black 62%, transparent 100%)",
          ].join(", "),
          WebkitMaskImage: [
            "linear-gradient(to bottom, transparent 0%, black 14%, black 80%, transparent 100%)",
            "linear-gradient(to right,  black 0%, black 62%, transparent 100%)",
          ].join(", "),
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}spaceman/astronaut-frames.png`}
          alt=""
          style={{
            width: "300%",
            maxWidth: "none",
            height: "100%",
            objectFit: "contain",
            objectPosition: "bottom",
            display: "block",
            transform: `translateX(${pose === 0 ? "0%" : pose === 1 ? "-33.333%" : "-66.666%"})`,
            transition: "transform 0.3s ease",
            filter: "drop-shadow(0 0 22px rgba(255,157,92,0.6))",
          }}
        />
      </div>
    </div>
  );
}
