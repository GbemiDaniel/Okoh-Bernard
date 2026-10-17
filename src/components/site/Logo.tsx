"use client";

import { useEffect, useId, useRef } from "react";

// KB monogram with its orbit (01-home-mobile). The satellite passes behind
// the letters on the back half of the ellipse and in front on the near half.
const LX = 38, LY = 20, LRX = 24, LRY = 7.5, TILT = (-18 * Math.PI) / 180;

function point(t: number): [number, number] {
  const x = LRX * Math.cos(t), y = LRY * Math.sin(t);
  return [LX + x * Math.cos(TILT) - y * Math.sin(TILT), LY + x * Math.sin(TILT) + y * Math.cos(TILT)];
}

function arc(a: number, b: number) {
  let d = "";
  for (let i = 0; i <= 48; i++) {
    const p = point(a + ((b - a) * i) / 48);
    d += (i ? "L" : "M") + p[0].toFixed(2) + " " + p[1].toFixed(2);
  }
  return d;
}

const BACK = arc(Math.PI, 2 * Math.PI);
const FRONT = arc(0, Math.PI);
const START = 0.9;

function placement(t: number) {
  const p = point(t);
  return { transform: `translate(${p[0].toFixed(2)} ${p[1].toFixed(2)})`, front: Math.sin(t) > 0 };
}

export function Logo() {
  const gid = "kb" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const backRef = useRef<SVGGElement>(null);
  const frontRef = useRef<SVGGElement>(null);
  const initial = placement(START);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = START, last = performance.now(), raf = 0;
    const tick = (now: number) => {
      t += (Math.min(0.05, (now - last) / 1000)) * 0.8;
      last = now;
      const { transform, front } = placement(t);
      for (const [el, show] of [[backRef.current, !front], [frontRef.current, front]] as const) {
        if (!el) continue;
        el.setAttribute("transform", transform);
        el.style.opacity = show ? "1" : "0";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const sat = (
    <>
      <circle r="4.5" fill="var(--color-mint)" opacity=".25" />
      <circle r="2.2" fill="var(--color-mint)" />
    </>
  );

  return (
    <svg width="54" height="33" viewBox="0 0 66 40" aria-hidden="true" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={gid} x1="0" x2="1">
          <stop offset="0" stopColor="var(--color-mint)" />
          <stop offset="1" stopColor="var(--color-lilac)" />
        </linearGradient>
      </defs>
      <path d={BACK} fill="none" stroke="rgb(255 255 255 / .26)" strokeWidth="1" />
      <g ref={backRef} transform={initial.transform} style={{ opacity: initial.front ? 0 : 1 }}>{sat}</g>
      <text x="1" y="30" style={{ font: "800 29px var(--font-sans)", letterSpacing: "-2.4px" }}>
        <tspan fill="var(--color-ink)">K</tspan>
        <tspan fill={`url(#${gid})`}>B</tspan>
      </text>
      <path d={FRONT} fill="none" stroke="rgb(255 255 255 / .26)" strokeWidth="1" />
      <g ref={frontRef} transform={initial.transform} style={{ opacity: initial.front ? 1 : 0 }}>{sat}</g>
    </svg>
  );
}
