import { useEffect } from "react";

const chapters = [
  {
    number: "Chapter I",
    title: "A message on Discord, May 6th",
    content: `Two people on opposite ends of the world — Dehradun in the foothills of the Himalayas, and Florida warm with its ocean air. They found each other on Discord and something just clicked. One message turned into hours. Hours turned into something neither of them had words for yet.`,
    quote: "Different continents, different skies… yet somehow the same conversation felt like home.",
  },
  {
    number: "Chapter II",
    title: "The laughing, the chatters, every lil' moment",
    content: `We were just getting to know each other
spamming braincell counts, playing truth & dare,
and laughing over the dumbest things.

Somewhere in all that chaos,
we started caring for each other…
without even realizing it.`,
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
    number: "Chapter VII",
    title: "New Year's, January 1, 2026",
    content: `They were still at it on New Year's Day. Long after it should have faded, long after the novelty wore off, long after the distances should have made things complicated. They were still talking. Still sending signals. Still choosing this — whatever this is — across 13,612 kilometers.


It is not finished. It will keep growing.`,
    quote: "Still being written. Still the best story.",
  },
  {
    number: "Chapter ∞",
    title: "Still being written",
    content: `This story has no ending. Every morning clock, every late night voice call, every recipe exchanged, every dream about cooking together — it's all still happening. Right now. Across 13,612 km of sky and sea.`,
    quote: "No ending, just moments.. still happening, still ours..",
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
