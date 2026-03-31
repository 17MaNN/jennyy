import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Story" },
  { href: "/memories", label: "Memories" },
  { href: "/letters", label: "Letters" },
  { href: "/messages", label: "Messages" },
  { href: "/recipes", label: "Recipes" },
];

export default function Nav() {
  const [location] = useLocation();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        /* Enhanced glass effect — more translucent */
        background: theme === "dark"
          ? "rgba(26, 18, 20, 0.40)"
          : "rgba(255, 252, 249, 0.38)",
        backdropFilter: "blur(28px) saturate(200%) brightness(1.04)",
        WebkitBackdropFilter: "blur(28px) saturate(200%) brightness(1.04)",
        borderColor: theme === "dark"
          ? "rgba(255, 255, 255, 0.07)"
          : "rgba(255, 255, 255, 0.75)",
        boxShadow: theme === "dark"
          ? "0 2px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 2px 32px rgba(139, 74, 82, 0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
        height: "52px",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/">
          <span
            className="cursor-pointer select-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.15rem",
              color: "var(--deep)",
            }}
          >
            Mann & Jenny's Universe
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active =
              location === l.href ||
              (l.href !== "/" && location.startsWith(l.href));
            return (
              <Link key={l.href} href={l.href}>
                <span
                  className="px-3 py-1 rounded-full text-sm cursor-pointer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    transition: "all 0.2s ease",
                    background: active
                      ? "linear-gradient(135deg, var(--rose), var(--deep))"
                      : "transparent",
                    color: active ? "white" : "var(--muted-color)",
                    boxShadow: active
                      ? "0 2px 8px rgba(201, 123, 132, 0.35)"
                      : "none",
                  }}
                  data-testid={`nav-link-${l.label.toLowerCase()}`}
                >
                  {l.label}
                </span>
              </Link>
            );
          })}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            data-testid="button-theme-toggle"
            className="w-9 h-9 rounded-full flex items-center justify-center ml-1"
            style={{
              background: theme === "dark"
                ? "rgba(255,255,255,0.08)"
                : "rgba(201, 123, 132, 0.12)",
              color: "var(--rose)",
              border: "1px solid var(--blush)",
              backdropFilter: "blur(4px)",
              transition: "all 0.2s ease",
            }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Mobile buttons */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(201, 123, 132, 0.12)",
              color: "var(--rose)",
              border: "1px solid var(--blush)",
            }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(201, 123, 132, 0.12)",
              color: "var(--rose)",
              border: "1px solid var(--blush)",
            }}
            aria-label="Menu"
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown — also glassy */}
      {open && (
        <div
          className="md:hidden absolute left-0 right-0 border-b"
          style={{
            background: theme === "dark"
              ? "rgba(26, 18, 20, 0.88)"
              : "rgba(250, 247, 242, 0.88)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            borderColor: theme === "dark"
              ? "rgba(92, 56, 64, 0.45)"
              : "rgba(232, 196, 196, 0.55)",
            top: "52px",
            boxShadow: "0 8px 24px rgba(139, 74, 82, 0.12)",
          }}
        >
          <div className="flex flex-col p-3 gap-1">
            {links.map((l) => {
              const active =
                location === l.href ||
                (l.href !== "/" && location.startsWith(l.href));
              return (
                <Link key={l.href} href={l.href}>
                  <span
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm cursor-pointer"
                    style={{
                      background: active
                        ? "linear-gradient(135deg, var(--rose), var(--deep))"
                        : "transparent",
                      color: active ? "white" : "var(--ink)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {l.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
