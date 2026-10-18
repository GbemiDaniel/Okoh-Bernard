"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHeading } from "@/components/kit";
import { OrbitGlyph } from "@/components/site/OrbitGlyph";

const TILE_ICONS = {
  labs: "M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9c0 4-6 3-12 6",
  domains: "M4 20h4L19 9l-4-4L4 16zM13 7l4 4",
  creds: "M12 3l7 4v10l-7 4-7-4V7zM9 12l2 2 4-4",
  remote: "M3 5h18v11H3zM8 20h8M12 16v4",
};

function TileIcon({ d }: { d: string }) {
  return (
    <span className="fx-ic" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24">
        <path d={d} stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Counts up from 0 once the tiles are seen (01 fxRun: 1100ms, ease-out cubic). */
function useCountUp(target: number, delay: number, run: boolean) {
  const [v, setV] = useState(target);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const t0 = performance.now() + delay;
    const step = (now: number) => {
      const k = Math.max(0, Math.min(1, (now - t0) / 1100));
      setV(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, delay]);
  return v;
}

export function Record({ labs, domains, credentials }: { labs: number; domains: number; credentials: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const n1 = useCountUp(labs, 380, seen);
  const n2 = useCountUp(domains, 470, seen);
  const n3 = useCountUp(credentials, 560, seen);

  return (
    <section id="record" className="hs hs-record" aria-labelledby="record-title">
      <div className="w hs-2 hs-rec">
        <Reveal desktopOnly>
          <SectionHeading
            id="record-title"
            index={1}
            total={7}
            label="The record"
            lead="The"
            accent="Record"
            lede="Every lab is written up end to end, from the first finding to the validated fix, so the work can be checked rather than taken on trust."
          />
        </Reveal>
        <Reveal desktopOnly delay={180}>
          <div ref={ref} className={seen ? "fx in" : "fx"}>
            <a className="fx-t" href="#work" style={{ "--d": "0ms" } as React.CSSProperties}>
              <span className="grain" aria-hidden="true" />
              <span className="fx-k">
                <TileIcon d={TILE_ICONS.labs} />
                DOCUMENTED LABS
              </span>
              <span className="fx-v">
                <b>{n1}</b>
                <span className="fx-sub">Cloud + DevSecOps</span>
              </span>
            </a>
            <a className="fx-t" href="#work" style={{ "--d": "90ms" } as React.CSSProperties}>
              <span className="grain" aria-hidden="true" />
              <span className="fx-k">
                <TileIcon d={TILE_ICONS.domains} />
                SECURITY DOMAINS
              </span>
              <span className="fx-v">
                <b>{n2}</b>
                <span className="fx-sub">From IAM to IaC</span>
              </span>
            </a>
            <a className="fx-t" href="#about" style={{ "--d": "180ms" } as React.CSSProperties}>
              <span className="grain" aria-hidden="true" />
              <span className="fx-k">
                <TileIcon d={TILE_ICONS.creds} />
                CERTIFICATES &amp; BADGES
              </span>
              <span className="fx-v">
                <b>{n3}</b>
                <span className="fx-sub">Issued by TryHackMe</span>
              </span>
            </a>
            <div className="fx-t" style={{ "--d": "270ms" } as React.CSSProperties}>
              <span className="grain" aria-hidden="true" />
              <span className="fx-k">
                <TileIcon d={TILE_ICONS.remote} />
                WORKS
              </span>
              <span className="fx-v">
                <b>Remote</b>
                <span className="fx-sub">
                  <OrbitGlyph />
                  <span>Or hybrid</span>
                </span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
