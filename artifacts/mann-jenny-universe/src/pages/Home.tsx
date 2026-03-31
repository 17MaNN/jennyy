import { useEffect, useRef, useState } from "react";

const MET_DATE = new Date("2025-05-06");
const MARRIED_DATE = new Date("2025-06-07");

function daysSince(date: Date) {
  const now = new Date();
  return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}

function useClock() {
  const [times, setTimes] = useState({ ist: "", edt: "" });
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const edt = now.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTimes({ ist, edt });
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);
  return times;
}

function useCountUp(target: number, start: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      current = Math.min(current + step, target);
      setVal(current);
      if (current >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target, start]);
  return val;
}

const SIGNALS = [
  { label: "Send a hug", emoji: "🤗", msg: "Mann sent you a warm hug! ♡" },
  { label: "Send heart", emoji: "💕", msg: "Mann sent you his heart. ♡" },
  { label: "Thinking of you", emoji: "🌸", msg: "Mann is thinking of you right now. ♡" },
  { label: "Cooking for you", emoji: "🍳", msg: "Mann wishes he could cook for you. ♡" },
  { label: "Smol munch", emoji: "🐱", msg: "Smol munch! mrrp ♡" },
  { label: "Had a dream of u", emoji: "🌙", msg: "Mann dreamt of you last night. ♡" },
];

function Toast({ msg, fading }: { msg: string; fading: boolean }) {
  return (
    <div
      className="toast-msg"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        animation: fading
          ? "toastOut 0.32s cubic-bezier(0.4,0,0.2,1) forwards"
          : "toastIn 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards",
      }}
    >
      {msg}
    </div>
  );
}

export default function Home() {
  const { ist, edt } = useClock();
  const [started, setStarted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const metDays = daysSince(MET_DATE);
  const marriedDays = daysSince(MARRIED_DATE);
  const metCount = useCountUp(metDays, started);
  const marriedCount = useCountUp(marriedDays, started);
  const [activeToast, setActiveToast] = useState<{ key: number; msg: string } | null>(null);
  const [toastFading, setToastFading] = useState(false);
  const toastId = useRef(0);
  const toastTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (heroRef.current) obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(
      ".fade-up, .fade-in, .scale-in, .slide-left"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay || "0";
            el.style.transitionDelay = delay + "s";
            el.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  const clearToastTimers = () => {
    toastTimers.current.forEach(clearTimeout);
    toastTimers.current = [];
  };

  const showToast = (msg: string) => {
    const key = ++toastId.current;
    setActiveToast({ key, msg });
    setToastFading(false);
    // Auto-dismiss after 3s with fade-out
    const t1 = setTimeout(() => {
      setToastFading(true);
      const t2 = setTimeout(() => setActiveToast(null), 340);
      toastTimers.current.push(t2);
    }, 3000);
    toastTimers.current.push(t1);
  };

  const sendSignal = (msg: string) => {
    clearToastTimers();
    if (activeToast) {
      // Fade out the current toast, then show the new one
      setToastFading(true);
      const t = setTimeout(() => showToast(msg), 280);
      toastTimers.current.push(t);
    } else {
      showToast(msg);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Presence indicator */}
      <div className="flex justify-center pt-6">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm fade-in"
          data-delay="0"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid var(--blush)",
            fontFamily: "'DM Sans', sans-serif",
            color: "var(--muted-color)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "#4caf82",
              boxShadow: "0 0 6px #4caf82",
              animation: "twinkle 2s ease-in-out infinite",
            }}
          />
          <span>Suna is visiting your universe right now ♡</span>
        </div>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="max-w-3xl mx-auto px-4 pt-12 pb-8 text-center">
        <p
          className="text-xs uppercase tracking-[0.2em] mb-3 fade-up"
          data-delay="0"
          style={{ color: "var(--rose)", fontFamily: "'DM Sans', sans-serif" }}
        >
          A private universe
        </p>
        <h1
          className="fade-up mb-4"
          data-delay="0.1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
            lineHeight: 1.15,
            color: "var(--deep)",
          }}
        >
          Mann & Jenny's Universe
        </h1>
        <p
          className="fade-up"
          data-delay="0.2"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            color: "var(--muted-color)",
            fontSize: "1rem",
            lineHeight: 1.7,
          }}
        >
          Built by Mann, for Suna — from Dehradun to Florida, 13,612 km apart.
        </p>

        {/* Clocks */}
        <div
          className="flex flex-col sm:flex-row justify-center gap-6 mt-8 fade-up"
          data-delay="0.3"
        >
          {[
            { city: "Dehradun", label: "Mann's time", tz: "IST", time: ist },
            { city: "Florida", label: "Suna's time", tz: "EDT", time: edt },
          ].map((c) => (
            <div
              key={c.city}
              className="px-6 py-4 rounded-2xl text-center"
              style={{ background: "hsl(var(--card))", border: "1px solid var(--blush)" }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--rose)",
                  marginBottom: "4px",
                }}
              >
                {c.label} · {c.tz}
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontWeight: 300,
                  color: "var(--deep)",
                  lineHeight: 1,
                }}
              >
                {c.time}
              </p>
              <p style={{ fontSize: "12px", color: "var(--muted-color)", marginTop: "4px" }}>
                {c.city}
              </p>
            </div>
          ))}
        </div>

        {/* Counters */}
        <div
          className="flex flex-col sm:flex-row justify-center gap-6 mt-6 scale-in"
          data-delay="0.4"
        >
          {[
            { count: metCount, label: "days since we met", sub: "May 6, 2025" },
            { count: marriedCount, label: "days married on Discord", sub: "June 7, 2025" },
          ].map((c) => (
            <div
              key={c.label}
              className="px-6 py-4 rounded-2xl text-center flex-1"
              style={{ background: "hsl(var(--card))", border: "1px solid var(--blush)" }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  color: "var(--rose)",
                  lineHeight: 1,
                }}
              >
                {c.count}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "var(--muted-color)",
                  marginTop: "4px",
                }}
              >
                {c.label}
              </p>
              <p style={{ fontSize: "11px", color: "var(--blush)", marginTop: "2px" }}>
                {c.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Distance quote */}
        <p
          className="mt-6 fade-in"
          data-delay="0.5"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "var(--muted-color)",
          }}
        >
          13,612 km apart — and still the closest.
        </p>

        {/* Hero poem quote */}
        <blockquote
          className="mt-6 mx-auto max-w-md fade-in"
          data-delay="0.5"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "1.1rem",
            lineHeight: 2.0,
            fontWeight: 300,
            color: "var(--deep)",
            borderLeft: "2px solid var(--blush)",
            paddingLeft: "1rem",
            textAlign: "left",
          }}
        >
          "Though hugs are pixels on a screen,<br />
          they hold more warmth than some have seen."
          <cite
            style={{
              display: "block",
              fontStyle: "normal",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--rose)",
              marginTop: "8px",
            }}
          >
            — Mann
          </cite>
        </blockquote>
      </section>

      {/* Connection Signals */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2
          className="text-center mb-6 fade-up"
          data-delay="0"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "1.4rem",
            fontWeight: 300,
            color: "var(--deep)",
          }}
        >
          Send a signal across the distance
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SIGNALS.map((s, i) => (
            <button
              key={s.label}
              className="fade-up"
              data-delay={String(0.6 + i * 0.05)}
              data-testid={`button-signal-${i}`}
              onClick={() => sendSignal(s.msg)}
              style={{
                background: "hsl(var(--card))",
                border: "1px solid var(--blush)",
                borderRadius: "1rem",
                padding: "1rem",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s ease",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--rose)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--blush)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>{s.emoji}</div>
              <div style={{ fontSize: "12px", color: "var(--muted-color)", fontWeight: 400 }}>
                {s.label}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Toast container */}
      <div className="toast-container">
        {activeToast && (
          <Toast key={activeToast.key} msg={activeToast.msg} fading={toastFading} />
        )}
      </div>
    </div>
  );
}
