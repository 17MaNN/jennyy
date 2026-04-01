import { useState, useEffect, useRef } from "react";

const mannLetters = [
  {
    title: "Why Would I Fall for You, Suna?",
    type: "poem",
    lines: [
      "You asked me once, \"Why me, hmm?\" ....with a curious little tilt,",
      "Like love was a riddle wrapped in silk...",
      "But if you saw you through my eyes,",
      "You'd know you're the calm to all my whys...",
      "",

      "I'd fall for that moment... when you said, \"Would you love me if I was a worm?\" and I laughed instead...",
      "Not because it was silly,",
      "But 'cause even as a worm, you'd still be lit...",

      "I'd fall for the hugs sent in digital air,",
      "For how you care from way over there...",
      "You're far, but feel like home to me,",
      "Like Kuromi plushies and sweet movie scenes...",

      "I'd fall for your tears... the way you plead:",
      "\"In this marriage I better die first, indeed!!\"",
      "But no, Sunaa, love, let's just be,",
      "Grow old like vines on an old cherry tree...",

      "I'd fall for the way you remind me to rest,",
      "For \"be kind to yourself\"... you mean it best...",
      "When I rush through dreams and run on fumes,",
      "You fill my hours with pastel blooms...",

      "So why would I fall? You ask again...",
      "Because you're my warmth in all the rain...",
      "Not one reason, Suna, not just a few...",
      "But a million little moments that feel like you...",
    ],
  },
  {
    title: "For Suna From Far But Never Far",
    type: "poem",
    lines: [
      "Across the miles where stars may play,",
      "You light my skies in softest way.",
      "A whisper warm, a steady tune,",
      "My heart still hears you past the moon.",

      "You're made of kindness, soul, and spark,",
      "A gentle flame that warms the dark.",
      "You lift me up when I feel small,",
      "With words that catch me when I fall.",

      "Though hugs are pixels on a screen,",
      "They hold more warmth than some have seen.",
      "You check on me with sweetest care,",
      "Like sending love through open air.",

      "So here's my thank-you, soft and true,",
      "For being kind in all you do.",
      "This poem's a hug in quiet rhyme,",
      "From me to you, for all the time...",
    ],
  },
  {
    title: "If This is the Last Time...",
    type: "poem",
    lines: [
      "It wasn't as though she was the only dream I had,",
      "but she was the one I never wanted to wake from.",
      "The wind wove through the night like a quiet song,",
      "and she stood before me — half-moon eyes, trembling lips.",

      "A strand of her hairs danced against her cheek,",
      "restless as a whispered wish on a starry night.",
      "I lifted my hand to tuck it away,",
      "but when she looked up, time forgot to move.",

      "For a moment, the universe rewrote itself —",
      "no past, no future, only us,",
      "standing in the quiet glow of something endless.",

      "If this is the last time I'll hold her in my gaze,",
      "let it be carved into my dreams forever.",
      "Where the wind will always carry her laughter,",
      "and the stars will keep the memory of her touch.",

      "In This Dream, We Stay....",
    ],
  },
];

const sunnaLetters = [
  {
    title: "Oiiiiiii! mini love note",
    type: "note",
    author: "Aracely M.",
    date: "May 2025",
    lines: [
      "oiiii mann!!!!",
      "",
      "i just wanted to say u make me rlly happy",
      "like genuinely rlly happy",
      "which is kind of a lot coming from me bc i dont say that often",

      "ur so kind and patient and u listen",
      "and u always know what to say when i dont",

      "thank u for being here",
      "even from very very far away",

      "— ur aracely 🐱",
    ],
  },
  {
    title: "From ur yappy aracely with love",
    type: "note",
    author: "Suna",
    lines: [
      "mann.",
      "",
      "i know i talk a lot.",
      "like. a LOT.",
      "and u just let me.",
      "which is the kindest thing.",

      "i keep thinking about how",
      "the distance is so unfair",
      "but also how it doesn't really matter",
      "when i'm talking to u",

      "it just feels close",
      "even when it isn't.",

      "— suna, ur yappy one",
    ],
  },
  {
    title: "Mornings~! artsy Suna poem",
    type: "poem",
    author: "Suna",
    lines: [
      "mornings are weird when u love someone far away",

      "bc my morning is ur night",
      "and when i wake up ur almost sleeping",
      "and that is both sad and also",
      "a little beautiful",

      "like we are the same day",
      "just opposite ends of it",

      "i'll keep my end warm",
      "u keep yours.",

      "and someday we will have",
      "the same morning",
      "in the same light",
      "in the same kitchen",
      "with parathas probably",

      "— mornings from florida, for dehradun",
    ],
  },
  {
    title: "A Confession????? 06/01/25",
    type: "letter",
    author: "Aracely",
    date: "June 1, 2025",
    lines: [
      "okay so.",

      "i've been thinking about how to say this for like two weeks",
      "and i keep chickening out bc",
      "what if it's too much",
      "what if it's weird",
      "what if—",

      "but also.",
      "i think u already know.",
      "u probably know.",

      "i like u mann.",
      "like actually like u.",
      "like i would cross 13,612 kilometers for u",
      "if that were a thing i could do right now.",

      "that's the confession.",
      "that's all of it.",

      "— aracely, very nervous, june 1st",
    ],
  },
];

function PoemLines({ lines, open }: { lines: string[]; open: boolean }) {
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      linesRef.current.forEach((el, i) => {
        if (el) {
          el.style.transitionDelay = `${i * 0.04}s`;
          el.classList.add("visible");
        }
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <div className="poem-content" style={{ paddingTop: "0.5rem" }}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="poem-line"
          ref={(el) => { linesRef.current[i] = el; }}
          style={{ minHeight: line === "" ? "1em" : undefined }}
        >
          {line || "\u00A0"}
        </span>
      ))}
    </div>
  );
}

function LetterCard({
  letter,
  tab,
  index,
}: {
  letter: (typeof mannLetters)[0] | (typeof sunnaLetters)[0];
  tab: "mann" | "suna";
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasAuthor = "author" in letter;
  const hasDate = "date" in letter;

  return (
    <div
      className="scale-in"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "hsl(var(--card))",
        border: `1px solid ${hovered ? "var(--rose)" : "var(--blush)"}`,
        borderRadius: "1rem",
        overflow: "hidden",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 28px rgba(201, 123, 132, 0.18)"
          : "0 1px 6px rgba(139, 74, 82, 0.05)",
        transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.28s ease, border-color 0.28s ease",
        transitionDelay: `${index * 0.06}s`,
      }}
    >
      <button
        className="w-full text-left p-5"
        onClick={() => setOpen(!open)}
        data-testid={`letter-toggle-${letter.title.slice(0, 20)}`}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--rose)",
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: "4px",
            }}
          >
            {tab === "mann" ? "From Mann" : "From Suna"}{hasDate ? ` · ${(letter as { date?: string }).date}` : ""}
          </p>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.15rem",
              fontWeight: 400,
              color: "var(--deep)",
            }}
          >
            {letter.title}
          </h3>
          {hasAuthor && (
            <p style={{ fontSize: "11px", color: "var(--muted-color)", marginTop: "2px", fontFamily: "'DM Sans', sans-serif" }}>
              — {(letter as { author: string }).author}
            </p>
          )}
        </div>
        <span
          style={{
            color: "var(--rose)",
            fontSize: "1.2rem",
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
            display: "inline-block",
          }}
        >
          +
        </span>
      </button>

      {/* Animated accordion panel */}
      <div
        style={{
          maxHeight: open ? "900px" : "0px",
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: open
            ? "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease 0.05s"
            : "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
        }}
      >
        <div
          style={{
            borderTop: "1px solid var(--blush)",
            padding: "1.25rem 1.5rem 1.5rem",
            background: "hsl(var(--soft-white, var(--card)))",
          }}
        >
          <PoemLines lines={letter.lines} open={open} />
        </div>
      </div>
    </div>
  );
}

export default function Letters() {
  const [tab, setTab] = useState<"mann" | "suna">("mann");
  const [listVisible, setListVisible] = useState(true);

  const switchTab = (t: "mann" | "suna") => {
    if (t === tab) return;
    setListVisible(false);
    setTimeout(() => {
      setTab(t);
      setListVisible(true);
    }, 220);
  };

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".scale-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.transitionDelay = `${i * 0.1}s`;
            el.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  const letters = tab === "mann" ? mannLetters : sunnaLetters;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <p
          className="text-xs uppercase tracking-[0.2em] mb-2"
          style={{ color: "var(--rose)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Letters & Poems
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
          Words Across the Distance
        </h1>
      </div>

      {/* Smooth sliding tab toggle */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            padding: "4px",
            background: "hsl(var(--muted))",
            borderRadius: "999px",
            border: "1px solid var(--blush)",
          }}
        >
          {/* Sliding pill background */}
          <div
            style={{
              position: "absolute",
              top: "4px",
              bottom: "4px",
              left: "4px",
              width: "calc(50% - 4px)",
              background: "linear-gradient(135deg, var(--rose) 0%, var(--deep) 100%)",
              borderRadius: "999px",
              transform: tab === "mann" ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 2px 12px rgba(201, 123, 132, 0.45)",
              zIndex: 0,
            }}
          />
          {/* Buttons sitting above the pill */}
          {(["mann", "suna"] as const).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              data-testid={`tab-${t}`}
              style={{
                position: "relative",
                zIndex: 1,
                padding: "7px 0",
                width: "152px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.01em",
                background: "transparent",
                color: tab === t ? "white" : "var(--muted-color)",
                transition: "color 0.3s ease",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              {t === "mann" ? "From Mann" : "From Jenny / Suna"}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          opacity: listVisible ? 1 : 0,
          transform: listVisible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {letters.map((letter, i) => (
          <LetterCard key={letter.title} letter={letter} tab={tab} index={i} />
        ))}
      </div>
    </div>
  );
}
