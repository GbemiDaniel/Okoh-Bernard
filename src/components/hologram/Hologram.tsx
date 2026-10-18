"use client";

import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { HologramEngine, PARTICLES_SRC, PORTRAIT_SRC } from "./engine";

/**
 * Hologram portrait stage (01-home-mobile, 00-home-desktop). Builds once on
 * load, pauses off screen, drops to the light renderer on slow devices and
 * shows the settled frame under reduced motion. The artboard is 390 wide;
 * size the stage with CSS and the drawing follows.
 */
export function Hologram({ height = 440, className = "" }: { height?: number; className?: string }) {
  preload(PORTRAIT_SRC, { as: "image", fetchPriority: "high" });
  preload(PARTICLES_SRC, { as: "fetch", crossOrigin: "anonymous" });

  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const engine = new HologramEngine(cv, {
      height,
      reduced,
      // Same switch as the board: slow devices get still-lit surfaces site-wide.
      onLowTier: () => document.documentElement.classList.add("lite"),
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
    <div className={`holo ${className}`} style={{ aspectRatio: `390 / ${height}`, "--halo-top": `${(190 / height) * 100}%` } as React.CSSProperties}>
      <span className="holo-halo" aria-hidden="true" />
      <canvas ref={ref} role="img" aria-label="Hologram portrait of Onyedikachi Bernard, projected from a glowing base" />
    </div>
  );
}
