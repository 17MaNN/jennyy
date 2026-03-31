import { useEffect } from "react";

export function useScrollAnimation() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(
      ".fade-up, .fade-in, .scale-in, .slide-left"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}
