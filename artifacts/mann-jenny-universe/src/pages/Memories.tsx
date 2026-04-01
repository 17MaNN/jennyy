import { useEffect, useRef } from "react";

const entries = [
  {
    date: "May 6, 2025",
    title: "First Hello",
    description:
      "One message on Discord. The beginning of everything.",
    tags: ["beginning", "Discord", "hello"],
    filled: true,
  },
  {
    date: "May, 2025",
    title: "First Long Conversations",
    description:
      "Hours stretching past midnight, past reasonable hours, past the point where stopping made sense. A tiny love note from Suna, kept ever since.",
    tags: ["conversations", "love note", "late nights"],
    filled: true,
  },
  {
    date: "June 1, 2025",
    title: "The Confession",
    description:
      "Someone said it first. The thing that had been circling for weeks. There was a yes on the other side. There always is when the question is real.",
    tags: ["confession", "milestone"],
    filled: true,
  },
  {
    date: "June 7, 2025",
    title: "Discord Married",
    description:
      "A Saturday. A Discord server. Two people who chose each other with full certainty across 13,612 kilometers. No guests. All meaning.",
    tags: ["married", "Discord", "milestone"],
    filled: true,
  },
  {
    date: "Summer 2025",
    title: "Mornings~! — a handmade poem",
    description:
      "I still feel your presence when I close my eyes. May today carry an extra twinkle! — Artsy Suna, ~♡~",
    tags: ["poem", "mornings", "love"],
    filled: true,
  },
  {
    date: "Late 2025",
    title: "The beetroot paratha dream",
    description:
      "I was cooking for you.. we both enjoyed making it together." She said "me?!?" He said "rlly wanna cook for u.",
    tags: ["dream", "food", "someday"],
    filled: true,
  },
  {
    date: "January 1, 2026",
    title: "New Year's Together Apart",
    description:
      "Still talking. Still choosing. Long after novelty fades, still here — across time zones, on a new year, still the same people who answered a question about worms.",
    tags: ["New Year", "milestone"],
    filled: true,
  },
  {
    date: "Right now",
    title: "Still Being Written",
    description:
      "Every day that passes adds a line to this story. The kitchen with the beetroot parathas is still ahead. The hugs are still ahead. The story is still happening.",
    tags: ["present", "future", "always"],
    filled: false,
  },
];

const DOT_COL = 44; // px — fixed width for the dot column
const DOT_SIZE = 16; // px
const LINE_X = DOT_COL / 2 - 1; // center of dot column minus half line width

export default function Memories() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".tl-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.transitionDelay = `${idx * 0.1}s`;
            el.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-14">
        <p
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--rose)",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: "8px",
          }}
        >
          Timeline
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "var(--deep)",
          }}
        >
          Our Memories
        </h1>
        <p
          style={{
            marginTop: "0.75rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            color: "var(--muted-color)",
            fontSize: "0.95rem",
          }}
        >
          From May 2025 to right now — and still being written.
        </p>
      </div>

      {/* Timeline */}
      <div ref={sectionRef} style={{ position: "relative" }}>
        {/* Vertical line — sits behind everything, centered in dot column */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${LINE_X}px`,
            top: `${DOT_SIZE / 2}px`,
            bottom: `${DOT_SIZE / 2}px`,
            width: "2px",
            background: `linear-gradient(to bottom, var(--rose), var(--blush))`,
            borderRadius: "2px",
            zIndex: 0,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {entries.map((entry, i) => (
            <div
              key={i}
              className="tl-item fade-up"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                position: "relative",
              }}
            >
              {/* Dot column — fixed width so line stays perfectly centred */}
              <div
                style={{
                  flexShrink: 0,
                  width: `${DOT_COL}px`,
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "1.4rem", /* align dot with first line of card title */
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: `${DOT_SIZE}px`,
                    height: `${DOT_SIZE}px`,
                    borderRadius: "50%",
                    background: entry.filled
                      ? "linear-gradient(135deg, var(--rose), var(--deep))"
                      : "transparent",
                    border: entry.filled ? "none" : `2px solid var(--rose)`,
                    boxShadow: entry.filled
                      ? "0 0 0 4px hsl(var(--background)), 0 0 0 5px var(--blush)"
                      : "0 0 0 4px hsl(var(--background))",
                    flexShrink: 0,
                  }}
                  className={!entry.filled ? "tl-dot-animated" : ""}
                />
              </div>

              {/* Card */}
              <div
                className="flex-1"
                style={{
                  background: "hsl(var(--card) / 0.85)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid var(--blush)",
                  borderRadius: "1rem",
                  padding: "1.25rem 1.4rem",
                  boxShadow: "0 2px 12px rgba(139, 74, 82, 0.06)",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    fontFamily: "'DM Sans', sans-serif",
                    color: "var(--rose)",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginBottom: "4px",
                  }}
                >
                  {entry.date}
                </p>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    fontWeight: 400,
                    color: "var(--deep)",
                    marginBottom: "0.5rem",
                    lineHeight: 1.3,
                  }}
                >
                  {entry.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.875rem",
                    lineHeight: 1.75,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {entry.description}
                </p>

                {(entry as { note?: string }).note && (
                  <blockquote
                    style={{
                      marginTop: "0.75rem",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: "0.95rem",
                      color: "var(--rose)",
                      borderLeft: "2px solid var(--blush)",
                      paddingLeft: "0.75rem",
                    }}
                  >
                    "{(entry as { note?: string }).note}"
                  </blockquote>
                )}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    marginTop: "0.875rem",
                  }}
                >
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "hsl(var(--accent) / 0.7)",
                        color: "var(--deep)",
                        fontSize: "10px",
                        padding: "2px 9px",
                        borderRadius: "999px",
                        fontFamily: "'DM Sans', sans-serif",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
