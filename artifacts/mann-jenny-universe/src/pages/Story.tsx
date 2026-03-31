import { useEffect } from "react";

const chapters = [
  {
    number: "Chapter I",
    title: "A Worm, a Discord, and a Beginning",
    content: `It started the way all the best things do — unexpectedly. On May 6, 2025, Mann joined a Discord server and found Suna. Not because of grand plans or fate carefully arranged, but because Suna asked a question about worms. A deeply sincere, curious question about whether worms could feel love. And Mann — who was passing by, who almost didn't stop — answered. That question opened a door neither of them knew existed.

They talked. About nothing, about everything. About the strange comfort of a voice you've never heard in person but somehow already know. About what it means to find someone who asks about worms at midnight and means it with their whole heart.`,
    quote: "She asked about worms and accidentally caught everything.",
  },
  {
    number: "Chapter II",
    title: "The Long Conversations",
    content: `After that first evening, the conversations didn't stop. They stretched across time zones — Mann in Dehradun where evenings blur into night, Suna in Florida where the day still held light. They talked past the point of exhaustion, past the point where sleep made more sense, because leaving felt like a small loss neither wanted.

Suna wrote Mann a tiny love note sometime in that first week. Small letters on a screen. But Mann read them the way you read something you want to keep. He kept them.`,
    quote: "Some conversations don't end. They just pause until morning.",
  },
  {
    number: "Chapter III",
    title: "The Confession — June 1, 2025",
    content: `By June, something had shifted. The conversations had grown roots. On June 1, 2025, someone said what both of them had been circling around. A confession — careful and genuine. The kind that changes the shape of things without making a sound.

There was a yes on the other end. There is always a yes when the question is real.`,
    quote: "The bravest thing is to say it first.",
  },
  {
    number: "Chapter IV",
    title: "Discord Married — June 7, 2025",
    content: `It was a Saturday. On Discord. With no guests except the two of them and whatever quiet magic the internet allows. Mann and Suna became husband and wife in the only way they could, across 13,612 kilometers, with words on a screen and something very real in their chests.

It wasn't traditional. It was better. Because they chose it — just the two of them, with full certainty.`,
    quote: "Real enough that it counted. Real enough that it still does.",
  },
  {
    number: "Chapter V",
    title: "Mornings & the Poem That Came After",
    content: `Mann wrote Suna a poem about mornings. About the particular grief of waking up in a different time zone than the person you love. About how IST and EDT are not just clocks but distance measured in hours. About pixels and warmth and hugs that cross screens.

The poem became a small act of maintenance — a way of saying: I am thinking of you at this exact moment, even when I cannot say it out loud.`,
    quote: "Though hugs are pixels on a screen, they hold more warmth than some have seen.",
  },
  {
    number: "Chapter VI",
    title: "The 2:39 AM Dream",
    content: `At 2:39 AM, Mann dreamt of beetroot parathas. Not as food exactly, but as something he wanted to make for Suna. In the dream they were in a kitchen — one that doesn't exist yet — and he was rolling the dough and she was nearby, doing what she does, and it was entirely ordinary.

He woke up and told her. She said she wanted to try them. Someday they will make them together in a kitchen that exists.`,
    quote: "Some dreams are just early memories.",
  },
  {
    number: "Epilogue",
    title: "New Year's, January 1, 2026",
    content: `They were still at it on New Year's Day. Long after it should have faded, long after the novelty wore off, long after the distances should have made things complicated. They were still talking. Still sending signals. Still choosing this — whatever this is — across 13,612 kilometers.

Mann built this website for Suna. A place that holds all of it. The worm question, the Discord wedding, the 2:39 AM dream, the mornings. Everything.

It is not finished. It will keep growing.`,
    quote: "Still being written. Still the best story.",
  },
];

export default function Story() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(
      ".fade-up, .fade-in, .scale-in, .slide-left"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p
          className="text-xs uppercase tracking-[0.2em] mb-2 fade-up"
          style={{ color: "var(--rose)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Our story
        </p>
        <h1
          className="fade-up"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "var(--deep)",
          }}
          data-delay="0.1"
        >
          How Mann & Jenny Began
        </h1>
        <p
          className="mt-3 fade-up"
          data-delay="0.2"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            color: "var(--muted-color)",
            fontSize: "0.95rem",
          }}
        >
          A love story told in six chapters and one epilogue.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        {chapters.map((ch, i) => (
          <div key={ch.number}>
            <article
              className="fade-up"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--rose)",
                  marginBottom: "6px",
                }}
              >
                {ch.number}
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "1.5rem",
                  color: "var(--deep)",
                  marginBottom: "1rem",
                }}
              >
                {ch.title}
              </h2>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.95rem",
                  lineHeight: 1.85,
                  color: "hsl(var(--foreground))",
                  whiteSpace: "pre-line",
                }}
              >
                {ch.content}
              </div>

              {/* Pull quote */}
              <blockquote
                className="slide-left mt-4"
                style={{
                  borderLeft: "2px solid var(--blush)",
                  paddingLeft: "1rem",
                  margin: "1.5rem 0 0",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "var(--rose)",
                }}
              >
                "{ch.quote}"
              </blockquote>
            </article>

            {/* Divider */}
            {i < chapters.length - 1 && (
              <div
                className="fade-in"
                style={{
                  marginTop: "4rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div style={{ flex: 1, height: "1px", background: "var(--blush)" }} />
                <span style={{ color: "var(--gold)", fontSize: "1rem" }}>✦</span>
                <div style={{ flex: 1, height: "1px", background: "var(--blush)" }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
