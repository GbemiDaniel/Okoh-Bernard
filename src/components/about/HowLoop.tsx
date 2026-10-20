"use client";

import { useEffect, useRef, useState } from "react";

const STEP_MS = 3400;
const HOLD_MS = 9000;
const TRACK = "M175 49 A150 66 0 0 1 325 115 A150 66 0 0 1 175 181 A150 66 0 0 1 25 115 A150 66 0 0 1 175 49";

// Copy from 06-about. Each example is a control or a validation result from a
// real case study (public S3 bucket, IAM compromise, overpowered role).
const STEPS = [
  { t: "Find", b: "Audit configs, roles and pipelines for the gap.", e: "e.g. Block Public Access checked on every layer" },
  { t: "Prove", b: "Show the risk is real with safe, scoped evidence.", e: "e.g. CloudTrail rule matching 13 high-risk IAM calls" },
  { t: "Fix", b: "Apply least privilege and hardened defaults.", e: "e.g. IMDSv2 required, hop limit 1" },
  { t: "Validate", b: "Re-test and automate the check so it stays fixed.", e: "e.g. AccessDenied on the finance bucket · PASS" },
] as const;

// Node geometry and label placement from the board's 350x232 SVG.
const NODES = [
  { x: 175, y: 49, lx: 175, ly: 24, anchor: "middle", icon: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4" },
  { x: 325, y: 115, lx: 342, ly: 156, anchor: "end", icon: "M12 3v4M12 17v4M3 12h4M17 12h4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" },
  { x: 175, y: 181, lx: 175, ly: 222, anchor: "middle", icon: "M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z" },
  { x: 25, y: 115, lx: 8, ly: 156, anchor: "start", icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 12l3 3 5-6" },
] as const;

/**
 * "How I work" orbit loop (06-about). Advances every 3400ms; a tap jumps to a
 * node and holds auto-advance for 9000ms. Reduced motion: no auto-advance.
 * Mouse hover and keyboard focus also pause it, and only taps are announced.
 * `n` only counts up, so the trail always travels forward round the ellipse.
 */
export function HowLoop() {
  const [n, setN] = useState(0);
  const hold = useRef(0);
  const visible = useRef(true);
  const paused = useRef(false);
  const [tapped, setTapped] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const i = n % 4;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    const id = window.setInterval(() => {
      if (!visible.current || paused.current || document.hidden || performance.now() < hold.current) return;
      setN((v) => v + 1);
    }, STEP_MS);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, []);

  // Event timeStamp shares performance.now()'s clock.
  const go = (k: number, at: number) => {
    hold.current = at + HOLD_MS;
    setTapped(true);
    setN((v) => v + ((k - (v % 4) + 4) % 4));
  };

  const step = STEPS[i];
  return (
    <div
      className="lp"
      ref={wrap}
      onPointerEnter={(e) => e.pointerType === "mouse" && (paused.current = true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && (paused.current = false)}
      onFocus={(e) => (paused.current = e.target.matches(":focus-visible"))}
      onBlur={() => (paused.current = false)}
    >
      <div className="lp-stage">
        <svg viewBox="0 0 350 232" role="group" aria-label="How I work, four steps">
          <defs>
            <linearGradient id="lpg" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#5eead4" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
            <radialGradient id="lpc">
              <stop offset="0" stopColor="rgba(94,234,212,.16)" />
              <stop offset="1" stopColor="rgba(94,234,212,0)" />
            </radialGradient>
          </defs>
          <ellipse cx="175" cy="115" rx="120" ry="44" fill="url(#lpc)" />
          <ellipse cx="175" cy="115" rx="150" ry="66" fill="none" stroke="rgba(255,255,255,.08)" />
          <ellipse cx="175" cy="115" rx="112" ry="46" fill="none" stroke="rgba(255,255,255,.05)" strokeDasharray="2 6" />
          <path className="lp-trk" d={TRACK} pathLength={100} />
          <path className="lp-com" d={TRACK} pathLength={100} style={{ strokeDashoffset: -(n - 1) * 25 }} />
          {NODES.map((nd, k) => (
            <g
              key={STEPS[k].t}
              className="lp-n"
              data-on={k === i}
              role="button"
              tabIndex={0}
              aria-pressed={k === i}
              aria-label={`Step 0${k + 1}: ${STEPS[k].t}`}
              onClick={(e) => go(k, e.timeStamp)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  go(k, e.timeStamp);
                }
              }}
            >
              <circle className="hit" cx={nd.x} cy={nd.y} r="26" />
              <circle className="halo" cx={nd.x} cy={nd.y} r="24" />
              <circle className="disc" cx={nd.x} cy={nd.y} r="18" />
              <g transform={`translate(${nd.x - 8.4} ${nd.y - 8.4}) scale(.7)`}>
                <path d={nd.icon} />
              </g>
              <text x={nd.lx} y={nd.ly} textAnchor={nd.anchor}>
                <tspan className="k">0{k + 1}</tspan> {STEPS[k].t.toUpperCase()}
              </text>
            </g>
          ))}
        </svg>
        <div className="lp-c" aria-live={tapped ? "polite" : "off"}>
          <span className="st">STEP 0{i + 1} / 04</span>
          <b>{step.t}</b>
          <span className="rp" aria-hidden="true">↻ THEN AGAIN</span>
        </div>
      </div>
      <div className="how-d" key={i}>
        <p className="how-b">{step.b}</p>
        <span className="how-e">{step.e}</span>
      </div>
    </div>
  );
}
