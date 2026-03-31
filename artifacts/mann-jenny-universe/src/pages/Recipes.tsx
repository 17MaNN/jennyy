import { useEffect } from "react";

const recipes = [
  {
    flag: "🇮🇳",
    name: "Roti",
    description:
      "Soft whole wheat flatbread, made fresh every meal. The scent of a home kitchen in Dehradun.",
    culture: "India",
    dream: false,
  },
  {
    flag: "🇮🇳",
    name: "Dal Chawal",
    description:
      "Lentils slow-cooked with spices, served over steamed basmati rice. Comfort in a bowl, every single time.",
    culture: "India",
    dream: false,
  },
  {
    flag: "🇮🇳",
    name: "Dosa",
    description:
      "Crispy fermented rice crepes from South India. Eaten with coconut chutney and sambar on quiet mornings.",
    culture: "India",
    dream: false,
  },
  {
    flag: "🇲🇽",
    name: "Tortillas de Maíz",
    description:
      "Hand-pressed corn tortillas, the kind that take practice and love. Suna's side of the kitchen.",
    culture: "Guatemala / Latin America",
    dream: false,
  },
  {
    flag: "🇬🇹",
    name: "Pepián",
    description:
      "A rich Guatemalan stew made from roasted seeds and chilies. Deep, complex, and entirely worth it.",
    culture: "Guatemala",
    dream: false,
  },
  {
    flag: "🌙",
    name: "Beetroot Parathas",
    description:
      "From the 2:39 AM dream — made together, someday. Flatbread filled with spiced beetroot stuffing, deep pink and warm. A future kitchen. A future morning.",
    culture: "India · A Dream",
    dream: true,
  },
];

export default function Recipes() {
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <p
          className="text-xs uppercase tracking-[0.2em] mb-2"
          style={{ color: "var(--rose)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Food & Culture
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
          A Recipe Exchange
        </h1>
        <p
          style={{
            marginTop: "0.5rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.9rem",
            color: "var(--muted-color)",
          }}
        >
          Two cultures, two kitchens, one future table.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {recipes.map((recipe) => (
          <div
            key={recipe.name}
            className={`scale-in ${recipe.dream ? "dream-float" : ""}`}
            data-testid={`recipe-${recipe.name.replace(/\s/g, "-")}`}
            style={{
              background: recipe.dream ? "transparent" : "hsl(var(--card))",
              border: recipe.dream
                ? "2px dashed var(--rose)"
                : "1px solid var(--blush)",
              borderRadius: "1.25rem",
              padding: "1.5rem",
              position: "relative",
            }}
          >
            {recipe.dream && (
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--rose)",
                  color: "white",
                  fontSize: "10px",
                  padding: "2px 10px",
                  borderRadius: "999px",
                  fontFamily: "'DM Sans', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  whiteSpace: "nowrap",
                }}
              >
                dream recipe ✦
              </div>
            )}

            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
              {recipe.flag}
            </div>

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
              {recipe.culture}
            </p>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.3rem",
                fontWeight: 400,
                color: "var(--deep)",
                marginBottom: "0.5rem",
              }}
            >
              {recipe.name}
            </h3>

            <p
              style={{
                fontFamily: recipe.dream ? "'Cormorant Garamond', serif" : "'DM Sans', sans-serif",
                fontStyle: recipe.dream ? "italic" : "normal",
                fontWeight: 300,
                fontSize: recipe.dream ? "15px" : "0.875rem",
                lineHeight: recipe.dream ? 1.9 : 1.7,
                color: recipe.dream ? "var(--rose)" : "var(--muted-color)",
              }}
            >
              {recipe.description}
            </p>

            {recipe.dream && (
              <p
                style={{
                  marginTop: "0.75rem",
                  fontSize: "11px",
                  color: "var(--gold)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontStyle: "italic",
                }}
              >
                from the 2:39 AM dream — made together, someday
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
