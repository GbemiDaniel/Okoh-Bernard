"use client";

import { useReducedMotion } from "framer-motion";

const PATH = "M32 17 A15 6 0 1 1 2 17 A15 6 0 1 1 32 17";

// Orbit glyph with a pinging core (07-contact status readout).
export function StatusOrbit() {
  const still = useReducedMotion();
  return (
    <svg className="sig-o" width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <g transform="rotate(-24 17 17)">
        <ellipse cx="17" cy="17" rx="15" ry="6" fill="none" stroke="rgba(94,234,212,.45)" />
        <circle cx="17" cy="17" r="3.4" fill="#5eead4" />
        <circle cx="17" cy="17" r="3.4" fill="none" stroke="#5eead4" className="sig-p" />
        {still ? (
          <circle r="2" fill="#effffb" cx="32" cy="17" />
        ) : (
          <circle r="2" fill="#effffb">
            <animateMotion dur="2.8s" repeatCount="indefinite" path={PATH} />
          </circle>
        )}
      </g>
    </svg>
  );
}
