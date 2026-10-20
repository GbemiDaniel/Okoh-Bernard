"use client";

import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { HologramEngine, PARTICLES_SRC, PORTRAIT_SRC } from "./engine";

// The full build plays once per tab session; later homepage visits start it
// 2.6s in, so the portrait resolves in about half a second instead of 3.2s.
const SEEN = "kb:holo-seen";
const REPLAY_FROM = 2.6;

// Decided once per mount. React's dev Strict Mode runs the effect twice in a
// row; a second call within a second is that same mount, not a return visit.
let decided: { at: number; seen: boolean } | null = null;
function seenThisSession() {
  const now = performance.now();
  if (decided && now - decided.at < 1000) return decided.seen;
  let seen = decided !== null; // an earlier mount in this tab already played it
  try {
    seen = seen || sessionStorage.getItem(SEEN) === "1";
    sessionStorage.setItem(SEEN, "1");
  } catch {
    // storage blocked: rely on the in-memory flag only
  }
  decided = { at: now, seen };
  return seen;
}

/**
 * Hologram portrait stage (01-home-mobile, 00-home-desktop). Builds once on
 * load, pauses off screen, drops to the light renderer on slow devices and
 * shows the settled frame under reduced motion. The artboard is 390 wide;
 * size the stage with CSS and the drawing follows.
 *
 * Until the engine's first frame, a CSS stand-in of the projector (in the
 * server HTML) holds the stage, so it is never an empty box while scripts load.
 */
export function Hologram({ height = 440, className = "" }: { height?: number; className?: string }) {
  // Default priority on purpose: the page scripts gate hydration, and the
  // engine cannot start before hydration, so they must not lose bandwidth to
  // assets that are only needed after it (the portrait not until 1.75s into the build).
  preload(PARTICLES_SRC, { as: "fetch", crossOrigin: "anonymous" });
  preload(PORTRAIT_SRC, { as: "image" });

  const ref = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const engine = new HologramEngine(cv, {
      height,
      reduced,
      skipTo: !reduced && seenThisSession() ? REPLAY_FROM : 0,
      // Same switch as the board: slow devices get still-lit surfaces site-wide.
      onLowTier: () => document.documentElement.classList.add("lite"),
      onFirstDraw: () => {
        stage.current?.setAttribute("data-live", "");
        // Close the first-visit loader (BootLoader's inline script).
        (window as Window & { __boot?: { done: () => void } }).__boot?.done();
      },
    });
    engine.start();
    const io = new IntersectionObserver(([e]) => engine.setVisible(e.isIntersecting));
    io.observe(cv);
    const ro = new ResizeObserver(() => engine.resize());
    ro.observe(cv);
    return () => {
      engine.destroy();
      io.disconnect();
      ro.disconnect();
    };
  }, [height]);

  return (
    <div
      ref={stage}
      className={`holo ${className}`}
      style={{ aspectRatio: `390 / ${height}`, "--halo-top": `${(190 / height) * 100}%`, "--puck-top": `${(344 / height) * 100}%` } as React.CSSProperties}
    >
      <span className="holo-halo" aria-hidden="true" />
      <span className="holo-stand" aria-hidden="true">
        <span className="holo-beam" />
        <span className="holo-puck" />
      </span>
      <canvas ref={ref} role="img" aria-label="Hologram portrait of Onyedikachi Bernard, projected from a glowing base" />
    </div>
  );
}
