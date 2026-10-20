"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow, Reveal, SectionHeading } from "@/components/kit";
import { disciplines, HUE, type Discipline } from "@/lib/home";
import { site } from "@/lib/site";
import { ICON } from "./icons";

const N = disciplines.length;
const STEP = 360 / N;
const CORE_ICON: Record<Discipline, string> = { cloud: ICON.aws, devsecops: ICON.pipe, ai: ICON.ai };
const CORE_META: Record<Discipline, string> = { cloud: `${site.cloudLabs} LABS`, devsecops: `${site.devsecopsLabs} LABS`, ai: "WRITEUPS" };

/** Signed shortest turn from one planet to another, in degrees. */
const shortest = (from: number, to: number) => {
  const d = (((to - from) % N) + N) % N;
  return (d > N / 2 ? d - N : d) * -STEP;
};

/**
 * The orbit dial (Phase 10f; replaces the board's three tilted rings).
 * One orbit, three planets. Picking a planet turns the orbit the short way
 * round until that planet sits in the lit dock at the top, while the labels
 * stay upright. One transform, strong ease-in-out (movement on screen), and a
 * CSS transition so a second pick mid-turn retargets from where it is.
 */
function OrbitDial({ index, rot, onPick }: { index: number; rot: number; onPick: (i: number) => void }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // A radio group: arrow keys move the selection and focus (no animation is skipped; it is the same turn).
  const onKey = (e: React.KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const n = (index + step + N) % N;
    onPick(n);
    refs.current[n]?.focus();
  };

  const d = disciplines[index];
  return (
    <div className="od" style={{ "--c": HUE[d.id].c, "--rgb": HUE[d.id].rgb } as React.CSSProperties}>
      <svg className="od-art" viewBox="0 0 400 400" aria-hidden="true">
        <defs>
          <linearGradient id="odDock" x1="0" x2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0" />
            <stop offset=".5" stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="150" className="od-orbit" />
        <circle cx="200" cy="200" r="118" className="od-inner" />
        {/* The dock: a lit arc at the top where the selected planet comes to rest. */}
        <path className="od-dock" d="M136.6 64.1 A150 150 0 0 1 263.4 64.1" stroke="url(#odDock)" />
        <path className="od-dock-g" d="M136.6 64.1 A150 150 0 0 1 263.4 64.1" />
      </svg>

      <div className="od-core" aria-hidden="true">
        {disciplines.map((x) => (
          <span key={x.id} className="od-core-i" data-on={x.id === d.id} style={{ color: HUE[x.id].c }}>
            <svg width="26" height="26" viewBox="0 0 24 24">
              <path d={CORE_ICON[x.id]} stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <small>{CORE_META[x.id]}</small>
          </span>
        ))}
      </div>

      <div className="od-sys" role="radiogroup" aria-label="Disciplines" onKeyDown={onKey} style={{ transform: `rotate(${rot}deg)` }}>
        {disciplines.map((x, i) => (
          <button
            key={x.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={i === index}
            tabIndex={i === index ? 0 : -1}
            className="od-p"
            data-on={i === index}
            onClick={() => onPick(i)}
            style={{ "--a": `${i * STEP}deg`, "--pc": HUE[x.id].c, "--prgb": HUE[x.id].rgb } as React.CSSProperties}
          >
            {/* Counter-turns with the orbit, so the planet and its label stay upright. */}
            <span className="od-p-in" style={{ transform: `rotate(${-rot - i * STEP}deg)` }}>
              <span className="od-dot" aria-hidden="true" />
              <span className="od-lb">{x.label === "AI" ? "AI security" : x.label}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Orbits() {
  const [index, setIndex] = useState(1); // DevSecOps first, as on the boards
  const [rot, setRot] = useState(-STEP); // its planet starts in the dock
  const [dir, setDir] = useState<1 | -1>(1);
  const [swap, setSwap] = useState(0);
  const down = useRef<{ x: number; t: number } | null>(null);
  const d = disciplines[index];
  const hue = HUE[d.id];

  const pick = (i: number) => {
    const n = ((i % N) + N) % N;
    if (n === index) return;
    const turn = shortest(index, n);
    setRot((r) => r + turn);
    // The card slides the way the orbit turned (spatial consistency).
    setDir(turn < 0 ? 1 : -1);
    setIndex(n);
    setSwap((s) => s + 1);
  };

  // Tell the section rail which colour this discipline is.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("kb:ring", { detail: ["#7dd3fc", "#5eead4", "#c4b5fd"][index] }));
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
            <span className="lg:hidden">Cloud security, DevSecOps and AI security. Tap a planet, or swipe the card, to move between them.</span>
            <span className="hidden lg:inline">Cloud security, DevSecOps and AI security. Pick a planet to bring it round.</span>
          </Reveal>
        </div>
        <div className="hs-2 hs-orbits">
          <Reveal desktopOnly delay={120}>
            <OrbitDial index={index} rot={rot} onPick={pick} />
          </Reveal>
          <Reveal desktopOnly delay={220}>
            <div
              className="op"
              aria-live="polite"
              style={{ "--rgb": hue.rgb } as React.CSSProperties}
              onPointerDown={(e) => (down.current = { x: e.clientX, t: e.timeStamp })}
              onPointerCancel={() => (down.current = null)}
              onPointerUp={(e) => {
                if (!down.current) return;
                const dx = e.clientX - down.current.x;
                const v = Math.abs(dx) / Math.max(1, e.timeStamp - down.current.t);
                down.current = null;
                // A long drag or a quick flick (velocity above 0.11 px/ms) both turn the orbit.
                if (Math.abs(dx) > 44 || (Math.abs(dx) > 16 && v > 0.11)) pick(index + (dx < 0 ? 1 : -1));
              }}
            >
              <span className="grain" aria-hidden="true" />
              <div key={swap} className="op-in" data-dir={swap ? dir : 0}>
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
