"use client";

import { useEffect, useState } from "react";

// The satellite's path traces the tilted ring (rx 15, ry 4.8, -14deg about 22,10), as on F1/F2.
const PATH = "M36.6 6.4 A15 4.8 -14 1 1 7.4 13.6 A15 4.8 -14 1 1 36.6 6.4";

/**
 * The KB orbit node that splits the footer hairline. One lap every 12s; at rest
 * under reduced motion. The preference is read after mount so the server and
 * first client render match on every page.
 */
export function FooterOrbit() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setStill(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return (
    <svg width="44" height="20" viewBox="0 0 44 20" aria-hidden="true">
      <ellipse className="ring" cx="22" cy="10" rx="15" ry="4.8" transform="rotate(-14 22 10)" />
      <circle className="core" cx="22" cy="10" r="3.6" />
      {still ? (
        <circle className="sat" cx="36.6" cy="6.4" r="1.7" />
      ) : (
        <circle className="sat" r="1.7">
          <animateMotion dur="12s" repeatCount="indefinite" path={PATH} />
        </circle>
      )}
    </svg>
  );
}
