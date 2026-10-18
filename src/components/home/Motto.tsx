"use client";

import { useEffect, useId, useRef } from "react";

const TEXT = "Always learning, always building.";

/**
 * "Always learning, always building." writes itself once when it scrolls into
 * view (01 mottoStart / mottoTick: 2.6s ease-in-out, then the hot edge cools
 * away over 0.7s). Not tappable, no replay. Reduced motion shows it written.
 */
export function Motto() {
  const raw = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (s: string) => `mt${s}${raw}`;
  const svg = useRef<SVGSVGElement>(null);
  const ink = useRef<SVGTextElement>(null);
  const nib = useRef<SVGGElement>(null);

  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const set = (e: number, nibA: number) => {
      const g = (name: string, a: number, b: number) => {
        const n = el.querySelector(`#${id(name)}`);
        n?.setAttribute("x1", a.toFixed(1));
        n?.setAttribute("x2", b.toFixed(1));
      };
      g("Rev", e - 26, e);
      g("Ahead", e - 4, e + 14);
      g("Hot", e - 90, e + 4);
      if (nib.current) {
        const y = 31 + Math.sin(e * 0.21) * 4 + Math.sin(e * 0.53) * 2;
        nib.current.setAttribute("transform", `translate(${e.toFixed(1)} ${y.toFixed(1)})`);
        nib.current.setAttribute("opacity", nibA.toFixed(2));
      }
    };
    set(-40, 0);

    let raf = 0, done = false;
    const start = () => {
      if (done) return;
      done = true;
      let W = 330;
      const t = ink.current;
      if (t) {
        const g = t.parentNode as SVGGElement;
        g.style.fontSize = "31px";
        let w = t.getComputedTextLength();
        if (w > 344) {
          g.style.fontSize = ((31 * 344) / w).toFixed(2) + "px";
          w = t.getComputedTextLength();
        }
        W = w + 2;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        set(W + 120, 0);
        return;
      }
      const t0 = performance.now(), D = 2600;
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / D);
        const ease = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        const e = -10 + (W + 20) * ease;
        const nibA = k < 0.06 ? k / 0.06 : k > 0.92 ? Math.max(0, (1 - k) / 0.08) : 1;
        if (k < 1) {
          set(e, nibA);
          raf = requestAnimationFrame(tick);
        } else {
          // After the last letter the hot band keeps travelling so the glow cools away.
          const tail = Math.min(1, (now - t0 - D) / 700);
          set(W + 10 + tail * 110, 0);
          if (tail < 1) raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          document.fonts.ready.then(() => setTimeout(start, 250));
        }
      },
      { threshold: 0.7 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mask = (name: string, x1: number, x2: number, stops: [number, string][]) => (
    <>
      <linearGradient id={id(name)} gradientUnits="userSpaceOnUse" x1={x1} y1="0" x2={x2} y2="0">
        {stops.map(([o, c]) => (
          <stop key={o} offset={o} stopColor={c} />
        ))}
      </linearGradient>
      <mask id={id("M" + name)} maskUnits="userSpaceOnUse" x="-20" y="-20" width="400" height="100">
        <rect x="-20" y="-20" width="400" height="100" fill={`url(#${id(name)})`} />
      </mask>
    </>
  );

  return (
    <div className="motto" role="img" aria-label={TEXT}>
      <svg ref={svg} width="352" height="60" viewBox="0 0 352 60" aria-hidden="true">
        <defs>
          {mask("Rev", -40, 0, [[0, "#fff"], [1, "#000"]])}
          {mask("Ahead", -20, 0, [[0, "#fff"], [1, "#000"]])}
          {mask("Hot", -90, 4, [[0, "#000"], [0.72, "#fff"], [1, "#000"]])}
          <filter id={id("Glow")} x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={id("Soft")} x="-10%" y="-60%" width="120%" height="220%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <g style={{ font: "500 31px var(--font-script)" }}>
          {/* light behind the canvas: a wide soft mint bleed that trails the pen */}
          <text x="2" y="40" fill="#5eead4" filter={`url(#${id("Soft")})`} mask={`url(#${id("MHot")})`} opacity=".9">
            {TEXT}
          </text>
          {/* etched outline running just ahead of the ink */}
          <text x="2" y="40" fill="none" stroke="#5eead4" strokeWidth=".7" strokeOpacity=".8" mask={`url(#${id("MAhead")})`}>
            {TEXT}
          </text>
          {/* the settled ink */}
          <text ref={ink} x="2" y="40" fill="#cfe7e3" mask={`url(#${id("MRev")})`}>
            {TEXT}
          </text>
          {/* the hot edge, glowing as it is written */}
          <text x="2" y="40" fill="#b9fff2" filter={`url(#${id("Glow")})`} mask={`url(#${id("MHot")})`}>
            {TEXT}
          </text>
        </g>
        <g ref={nib} opacity="0">
          <circle r="9" fill="#5eead4" opacity=".18" />
          <circle r="3.6" fill="#5eead4" opacity=".55" />
          <circle r="1.6" fill="#fff" />
        </g>
      </svg>
    </div>
  );
}
