"use client";

import { useEffect, useRef } from "react";
import { Hologram } from "@/components/hologram/Hologram";
import { Reveal, SplitCapsule } from "@/components/kit";

const ARROW = (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const MAIL = (
  <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
    <path d="M3 6h18v12H3zM4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 3.1 Hero (01-home-mobile, 00-home-desktop). Copy is taken from the boards. */
export function Hero() {
  const copyRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);

  // Desktop parallax from 00: the copy drifts up faster than the hologram, both soften as they leave.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const apply = () => {
      raf = 0;
      const L = copyRef.current, R = artRef.current;
      if (!L || !R) return;
      if (!desktop.matches || reduced.matches) {
        L.style.transform = L.style.opacity = R.style.transform = R.style.opacity = "";
        return;
      }
      const sy = window.scrollY, k = Math.min(1, sy / 900);
      if (sy > 1200) return;
      L.style.transform = `translateY(${(-sy * 0.22).toFixed(1)}px)`;
      L.style.opacity = (1 - k * 0.9).toFixed(3);
      R.style.transform = `translateY(${(sy * 0.18).toFixed(1)}px) scale(${(1 - k * 0.08).toFixed(4)})`;
      R.style.opacity = (1 - k * 0.75).toFixed(3);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    desktop.addEventListener("change", apply);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      desktop.removeEventListener("change", apply);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-name">
      <div className="hero-r" ref={artRef}>
        <div className="hero-stage">
          <Hologram height={440} />
        </div>
      </div>

      <div className="hero-copy" ref={copyRef}>
        <Reveal desktopOnly as="p" className="hero-hello">
          <i aria-hidden="true" />
          HELLO, I&apos;M
        </Reveal>
        <Reveal desktopOnly delay={80}>
          <h1 id="hero-name">
            Onyedikachi
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            <span className="grad">Bernard</span>
          </h1>
        </Reveal>
        {/* Mobile lede (01) */}
        <p className="hero-lede">Cloud security and DevSecOps engineer. I find the misconfiguration, prove the risk, fix it and validate the fix.</p>
        {/* Desktop role line and lede (00) */}
        <Reveal desktopOnly delay={140} as="p" className="hero-role">
          Cloud Security &amp; DevSecOps Engineer
        </Reveal>
        <Reveal desktopOnly delay={200} as="p" className="hero-lede-d">
          I find the misconfiguration, prove the risk, fix it and validate the fix.
        </Reveal>
        <Reveal desktopOnly delay={240}>
          <SplitCapsule
            primary={{ label: "View my work", href: "#work", fallback: "/work", icon: ARROW }}
            secondary={{ label: "Get in touch", href: "#contact", fallback: "/contact", icon: MAIL }}
          />
        </Reveal>
        {/* The board's stats row is left out: The Record, one scroll below, owns those numbers. */}
      </div>

      <a href="#record" className="hero-scroll" aria-label="Scroll down">
        <span className="hero-mouse">
          <i />
        </span>
        <span>SCROLL</span>
      </a>
    </section>
  );
}
