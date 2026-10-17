"use client";

import { useReducedMotion } from "framer-motion";

const PATH = "M14.6 5 A6.6 2.6 0 1 1 1.4 5 A6.6 2.6 0 1 1 14.6 5";

// The small tilted orbit used in pills and status lines across the boards.
export function OrbitGlyph({ dur = "2.6s", width = 14 }: { dur?: string; width?: number }) {
  const still = useReducedMotion();
  return (
    <svg className="og" width={width} height={10} viewBox="0 0 16 10" aria-hidden="true">
      <g transform="rotate(-20 8 5)">
        <ellipse cx="8" cy="5" rx="6.6" ry="2.6" />
        <circle className="og-c" cx="8" cy="5" r="1.5" />
        {still ? (
          <circle className="og-b" cx="14.6" cy="5" r="1.35" />
        ) : (
          <circle className="og-b" r="1.35">
            <animateMotion dur={dur} repeatCount="indefinite" path={PATH} />
          </circle>
        )}
      </g>
    </svg>
  );
}
