"use client";

import { useEffect, useRef, useState } from "react";

// Homepage sections, in order (01 secDefs, 00 RL). Colours per section from 00 RC.
const SECTIONS = [
  { label: "Home", id: "top", c: "#5eead4" },
  { label: "Record", id: "record", c: "#5eead4" },
  { label: "Orbits", id: "expertise", c: "#5eead4" },
  { label: "Work", id: "work", c: "#7dd3fc" },
  { label: "Skills", id: "skills", c: "#5eead4" },
  { label: "Writeups", id: "writeups", c: "#c4b5fd" },
  { label: "About", id: "about", c: "#a78bfa" },
  { label: "Contact", id: "contact", c: "#5eead4" },
] as const;
const N = SECTIONS.length;
const pad = (n: number) => String(n).padStart(2, "0");

function useScrollState() {
  const [sec, setSec] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0, last = -2;
    const apply = () => {
      raf = 0;
      const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      const line = window.innerHeight * (window.innerWidth >= 1024 ? 0.5 : 0.45);
      let a = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < line) a = i;
      });
      setSec(a);
      if (a !== last) {
        last = a;
        window.dispatchEvent(new CustomEvent("kb:section", { detail: a }));
      }
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      window.dispatchEvent(new CustomEvent("kb:section", { detail: -1 }));
    };
  }, []);
  return { sec, progress };
}

const jump = (id: string) => (e: React.MouseEvent) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
};

/** Mobile orbit dial (01): progress ring, section number, a fan of section links. */
function Dial({ sec, progress }: { sec: number; progress: number }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="dial-wrap">
      {open ? <button type="button" className="dial-scrim" aria-label="Close sections menu" onClick={() => setOpen(false)} /> : null}
      <nav className="dial" aria-label="Sections" data-open={open}>
        {SECTIONS.map((s, i) => {
          const k = N - 1 - i;
          const y = -(k + 1) * 46 - 6, x = -Math.sin(((k + 1) / (N + 1)) * Math.PI) * 58 - 20;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="dial-l"
              aria-current={sec === i ? "true" : undefined}
              tabIndex={open ? 0 : -1}
              onClick={(e) => {
                setOpen(false);
                jump(s.id)(e);
              }}
              style={
                {
                  "--x": `${x.toFixed(0)}px`,
                  "--y": `${y.toFixed(0)}px`,
                  "--dl": `${(open ? (N - 1 - i) * 0.035 : 0).toFixed(3)}s`,
                } as React.CSSProperties
              }
            >
              <span>{pad(i)}</span>
              {s.label}
            </a>
          );
        })}
        <button ref={btn} type="button" className="dial-b" aria-expanded={open} aria-label="Sections menu" onClick={() => setOpen((o) => !o)}>
          <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="27" fill="none" stroke="rgb(255 255 255 / .1)" strokeWidth="2" />
            <circle cx="32" cy="32" r="27" fill="none" stroke="var(--color-mint)" strokeWidth="2" strokeLinecap="round" strokeDasharray={`${(progress * 169.6).toFixed(1)} 170`} />
            {SECTIONS.map((_, i) => {
              const a = (i / N) * Math.PI * 2;
              return <circle key={i} cx={(32 + 27 * Math.cos(a)).toFixed(1)} cy={(32 + 27 * Math.sin(a)).toFixed(1)} r="2" fill={i <= sec ? "var(--color-mint)" : "rgb(255 255 255 / .35)"} />;
            })}
          </svg>
          <span className="dial-x" aria-hidden="true">
            <i />
            <i />
          </span>
          <span className="dial-no">{pad(sec)}</span>
        </button>
      </nav>
    </div>
  );
}

/** Desktop progress rail (00): nodes per section, a fill line, the current label. */
function Rail({ sec, progress }: { sec: number; progress: number }) {
  const [ring, setRing] = useState("#5eead4");
  useEffect(() => {
    const on = (e: Event) => setRing((e as CustomEvent<string>).detail);
    window.addEventListener("kb:ring", on);
    return () => window.removeEventListener("kb:ring", on);
  }, []);
  const c = sec === 2 ? ring : SECTIONS[sec].c;
  return (
    <nav className="rail" aria-label="Sections" data-hero={sec === 0} style={{ "--ri": sec, "--rc": c } as React.CSSProperties}>
      <span className="rail-tr" aria-hidden="true">
        <span className="rail-f" style={{ transform: `scaleY(${progress.toFixed(4)})` }} />
      </span>
      {SECTIONS.map((s, i) => (
        <a key={s.id} href={`#${s.id}`} className="rail-i" aria-current={sec === i ? "true" : undefined} data-past={i < sec} aria-label={s.label} onClick={jump(s.id)}>
          <i />
          <b>{s.label}</b>
        </a>
      ))}
      <span className="rail-cur" aria-hidden="true">
        <span className="rail-con">
          <i />
        </span>
        <span className="rail-tx">
          <span>{pad(sec)}</span>
          <span className="rail-lb">{SECTIONS[sec].label}</span>
        </span>
      </span>
    </nav>
  );
}

export function SectionNav() {
  const { sec, progress } = useScrollState();
  return (
    <>
      <Dial sec={sec} progress={progress} />
      <Rail sec={sec} progress={progress} />
    </>
  );
}
