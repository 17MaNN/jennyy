import { useEffect, useRef } from "react";

export default function Stars() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 55; i++) {
      const star = document.createElement("div");
      const size = 1 + Math.random() * 2.5;
      const dur = 2 + Math.random() * 3;
      const delay = Math.random() * 4;
      star.className = "star";
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        top: ${Math.random() * 100}vh;
        left: ${Math.random() * 100}vw;
        --dur: ${dur}s;
        --delay: ${delay}s;
        opacity: 0.2;
      `;
      container.appendChild(star);
    }
  }, []);

  return <div ref={containerRef} className="pointer-events-none" aria-hidden="true" />;
}
