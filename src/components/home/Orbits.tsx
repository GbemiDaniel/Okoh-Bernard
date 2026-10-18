"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading, SegmentedCapsule, Arrow } from "@/components/kit";
import { OrbitGlyph } from "@/components/site/OrbitGlyph";
import { disciplines, HUE, type Discipline } from "@/lib/home";
import { ICON } from "./icons";

// Ring geometry from 01-home-mobile renderVals (OM): radii, tilt, label angle, bead period.
const OM = [
  { rx: 158, ry: 34, tilt: -8, la: 3.35, dur: "13s" },
  { rx: 124, ry: 54, tilt: 24, la: -0.62, dur: "17s" },
  { rx: 88, ry: 74, tilt: -52, la: 1.95, dur: "10s" },
];
const CORE_ICON = [ICON.aws, ICON.pipe, ICON.ai];
const HEX = ["#7dd3fc", "#5eead4", "#c4b5fd"]; // SVG stop colours need literal values

function ringPath(i: number) {
  const o = OM[i], tt = (o.tilt * Math.PI) / 180;
  const P = (a: number): [number, number] => {
    const x = o.rx * Math.cos(a), y = o.ry * Math.sin(a);
    return [195 + x * Math.cos(tt) - y * Math.sin(tt), 104 + x * Math.sin(tt) + y * Math.cos(tt)];
  };
  let d = "";
  for (let k = 0; k <= 72; k++) {
    const q = P((k / 72) * Math.PI * 2);
    d += (k ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1);
  }
  const lp = P(o.la);
  return { d: d + "Z", lx: Math.max(52, Math.min(338, lp[0])), ly: Math.max(14, Math.min(196, lp[1])) };
}

const TICKS = Array.from({ length: 36 }, (_, k) => {
  const a = (k / 36) * Math.PI * 2, r1 = k % 3 ? 33 : 31, r2 = 36;
  return { x1: 195 + r1 * Math.cos(a), y1: 104 + r1 * Math.sin(a), x2: 195 + r2 * Math.cos(a), y2: 104 + r2 * Math.sin(a) };
});

function OrbitMap({ index, onPick }: { index: number; onPick: (i: number) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const rings = useMemo(() => disciplines.map((_, i) => ringPath(i)), []);
  const still = useReducedMotion() ?? false;

  // The map is drawn on the 390 x 210 artboard and scaled to its container.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 390));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const hex = HEX[index];
  return (
    <div ref={wrap} className="om-wrap" style={{ height: 210 * scale }}>
      <div className="om" style={{ transform: `scale(${scale})` }}>
        <svg width="390" height="210" viewBox="0 0 390 210" aria-hidden="true">
          <defs>
            <radialGradient id="omCore" cx="50%" cy="40%" r="60%">
              <stop offset="0" stopColor={hex} stopOpacity=".55" />
              <stop offset="1" stopColor={hex} stopOpacity="0" />
            </radialGradient>
            <filter id="omGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle cx="195" cy="104" r="96" fill="url(#omCore)" opacity=".35" />
          <g className="om-ticks">
            {TICKS.map((k, i) => (
              <line key={i} x1={k.x1.toFixed(1)} y1={k.y1.toFixed(1)} x2={k.x2.toFixed(1)} y2={k.y2.toFixed(1)} />
            ))}
          </g>
          {rings.map((r, i) => (
            <g key={i} className="om-ring" data-on={i === index} style={{ "--c": HEX[i] } as React.CSSProperties}>
              <path className="om-base" d={r.d} />
              <path className="om-lit" d={r.d} filter="url(#omGlow)" />
              {still ? (
                <circle className="om-bead" r={i === index ? 4 : 2.4} cx={r.lx} cy={r.ly} />
              ) : (
                <circle className="om-bead" r={i === index ? 4 : 2.4}>
                  <animateMotion dur={OM[i].dur} repeatCount="indefinite" path={r.d} />
                </circle>
              )}
              <path className="om-hit" d={r.d} onClick={() => onPick(i)} />
            </g>
          ))}
          <circle cx="195" cy="104" r="25" className="om-core" />
          <circle cx="195" cy="104" r="25" fill="none" stroke={hex} strokeOpacity=".5" />
          <g transform="translate(183 92)">
            <path d={CORE_ICON[index]} stroke={hex} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
        {rings.map((r, i) => (
          <button
            key={i}
            type="button"
            className="om-tag"
            data-on={i === index}
            onClick={() => onPick(i)}
            style={{ left: r.lx, top: r.ly, "--c": HEX[i] } as React.CSSProperties}
            aria-label={`${disciplines[i].label} ring`}
            aria-pressed={i === index}
          >
            <OrbitGlyph dur="3.6s" />
            {`0${i + 1} ${disciplines[i].label.toUpperCase()}`}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Orbits() {
  const [index, setIndex] = useState(1); // DevSecOps first, as on the boards
  const [swap, setSwap] = useState(0);
  const downX = useRef<number | null>(null);
  const d = disciplines[index];
  const hue = HUE[d.id];

  const pick = (i: number) => {
    const n = (i + disciplines.length) % disciplines.length;
    if (n === index) return;
    setIndex(n);
    setSwap((s) => s + 1);
  };

  // Tell the section rail which colour this ring is.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("kb:ring", { detail: HEX[index] }));
  }, [index]);

  // The panel link: cloud and DevSecOps jump to their case studies, AI to the writeups.
  const go = (e: React.MouseEvent) => {
    const id = d.id as Discipline;
    const target = document.getElementById(id === "ai" ? "writeups" : "work");
    if (!target) return;
    e.preventDefault();
    if (id !== "ai") window.dispatchEvent(new CustomEvent("kb:slide", { detail: id === "cloud" ? 0 : 2 }));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
  };

  return (
    <section id="expertise" className="hs" aria-labelledby="orbits-title">
      <div className="w">
        <div className="hs-head">
          <Reveal desktopOnly>
            <SectionHeading id="orbits-title" index={2} total={7} label="Disciplines" lead="Three" accent="Orbits" />
          </Reveal>
          <Reveal desktopOnly delay={120} as="p" className="hs-lede">
            <span className="lg:hidden">Cloud security, DevSecOps and AI security. Tap a ring or a label, or swipe the card, to move between them.</span>
            <span className="hidden lg:inline">Cloud security, DevSecOps and AI security. Pick a ring, a label or a tab to move between them.</span>
          </Reveal>
        </div>
        <div className="hs-2 hs-orbits">
          <Reveal desktopOnly delay={120}>
            <OrbitMap index={index} onPick={pick} />
            <SegmentedCapsule
              label="Disciplines"
              variant="row"
              className="om-seg"
              value={d.id}
              onChange={(v) => pick(disciplines.findIndex((x) => x.id === v))}
              options={disciplines.map((x) => ({ value: x.id, label: x.label, rgb: HUE[x.id].rgb, icon: <OrbitGlyph dur="3s" /> }))}
            />
          </Reveal>
          <Reveal desktopOnly delay={220}>
            <div
              className="op"
              aria-live="polite"
              style={{ "--rgb": hue.rgb } as React.CSSProperties}
              onPointerDown={(e) => (downX.current = e.clientX)}
              onPointerCancel={() => (downX.current = null)}
              onPointerUp={(e) => {
                if (downX.current == null) return;
                const dx = e.clientX - downX.current;
                downX.current = null;
                if (Math.abs(dx) > 44) pick(index + (dx < 0 ? 1 : -1));
              }}
            >
              <span className="grain" aria-hidden="true" />
              <div key={swap} className="op-in">
                <div className="op-hd" style={{ "--n": 0 } as React.CSSProperties}>
                  <span style={{ color: hue.c }}>{d.kicker}</span>
                  <span className="op-count">{String(d.tools.length).padStart(2, "0")} TOOLS</span>
                </div>
                <h3 style={{ "--n": 1 } as React.CSSProperties}>{d.title}</h3>
                <p style={{ "--n": 2 } as React.CSSProperties}>{d.body}</p>
                <div className="op-tools" style={{ "--n": 3 } as React.CSSProperties}>
                  {d.tools.map((t) => (
                    <span key={t.name} className="op-tool" style={{ "--c": t.c } as React.CSSProperties}>
                      <span className="op-ti">
                        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                          <path d={ICON[t.icon]} stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {t.name}
                    </span>
                  ))}
                </div>
                <div className="op-ft" style={{ "--n": 4 } as React.CSSProperties}>
                  <a href={d.href} className="lnk" onClick={go}>
                    {d.cta}
                    <Arrow />
                  </a>
                  <span className="op-dots" aria-hidden="true">
                    {disciplines.map((x, i) => (
                      <i key={x.id} data-on={i === index} style={{ "--c": HUE[x.id].c } as React.CSSProperties} />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
