"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { footerNav, site, socials } from "@/lib/site";
import { ArrowRightIcon, ArrowUpIcon, GitHubIcon, LinkedInIcon, MailIcon, MediumIcon } from "./icons";
import { OrbitGlyph } from "./OrbitGlyph";

const SOCIAL_ICONS = { GitHub: GitHubIcon, LinkedIn: LinkedInIcon, Medium: MediumIcon, Email: MailIcon } as const;

// Ridge horizon artwork, copied from 01-home-mobile (390 wide) and 00-home-desktop (1440 wide).
const MOBILE = {
  view: "0 0 390 190",
  c: [195, 104],
  glowR: 140, planetR: 46, dashR: 54,
  orbit: "M48 124 A148 22 -8 1 1 342 82 A148 22 -8 1 1 48 124",
  orbitDur: "14s", satR: 3,
  far: "M0 156 L56 118 L102 140 L150 112 L176 128 L214 134 L262 106 L320 142 L390 112 L390 190 L0 190z",
  near: "M0 168 L70 132 L130 160 L190 120 L250 156 L320 126 L390 150 L390 190 L0 190z",
  ridge: "M0 168 L70 132 L130 160 L190 120 L250 156 L320 126 L390 150",
  ridgeW: 1.2, rimW: 1.4, dash: "1 5", orbitDash: "2 6", stops: [0.3, 0.7], glowA: 0.34, glowM: 0.14,
};
const DESKTOP = {
  view: "0 0 1440 300",
  c: [720, 170],
  glowR: 330, planetR: 92, dashR: 106,
  orbit: "M360 196 A372 46 -5 1 1 1080 134 A372 46 -5 1 1 360 196",
  orbitDur: "22s", satR: 3.4,
  far: "M0 240 L120 170 L210 210 L330 150 L430 196 L560 140 L650 186 L760 156 L880 204 L1000 146 L1110 192 L1230 152 L1340 200 L1440 166 L1440 300 L0 300z",
  near: "M0 262 L140 214 L260 246 L380 204 L520 240 L660 206 L800 244 L940 210 L1080 246 L1220 214 L1340 240 L1440 220 L1440 300 L0 300z",
  ridge: "M0 262 L140 214 L260 246 L380 204 L520 240 L660 206 L800 244 L940 210 L1080 246 L1220 214 L1340 240 L1440 220",
  ridgeW: 1.3, rimW: 1.6, dash: "1 6", orbitDash: "2 7", stops: [0.25, 0.75], glowA: 0.3, glowM: 0.13,
};

function Horizon({ art, id, className, still }: { art: typeof MOBILE; id: string; className: string; still: boolean }) {
  const [cx, cy] = art.c;
  return (
    <svg className={className} viewBox={art.view} preserveAspectRatio="xMidYMax slice">
      <defs>
        <radialGradient id={`${id}g`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--color-mint)" stopOpacity={art.glowA} />
          <stop offset=".45" stopColor="var(--color-violet-strong)" stopOpacity={art.glowM} />
          <stop offset="1" stopColor="var(--color-violet-strong)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-ink)" />
          <stop offset=".35" stopColor="var(--color-mint)" />
          <stop offset="1" stopColor="var(--color-lilac)" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id={`${id}l`} x1="0" x2="1">
          <stop offset="0" stopColor="var(--color-mint)" stopOpacity="0" />
          <stop offset={art.stops[0]} stopColor="var(--color-mint)" />
          <stop offset={art.stops[1]} stopColor="var(--color-lilac)" />
          <stop offset="1" stopColor="var(--color-lilac)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle className="ft-glow" cx={cx} cy={cy} r={art.glowR} fill={`url(#${id}g)`} />
      <circle cx={cx} cy={cy} r={art.planetR} fill="var(--color-bg)" />
      <circle cx={cx} cy={cy} r={art.planetR} fill="none" stroke={`url(#${id}r)`} strokeWidth={art.rimW} />
      <circle cx={cx} cy={cy} r={art.dashR} fill="none" stroke="rgb(94 234 212 / .14)" strokeDasharray={art.dash} />
      <path d={art.orbit} fill="none" stroke="rgb(167 139 250 / .28)" strokeDasharray={art.orbitDash} />
      {still ? null : (
        <circle r={art.satR} fill="var(--color-ink)" style={{ filter: "drop-shadow(0 0 4px var(--color-mint))" }}>
          <animateMotion dur={art.orbitDur} repeatCount="indefinite" path={art.orbit} />
        </circle>
      )}
      <path d={art.far} fill="var(--color-mountain-far)" />
      <path d={art.near} fill="var(--color-mountain-near)" />
      <path className="ft-ridge" d={art.ridge} fill="none" stroke={`url(#${id}l)`} strokeWidth={art.ridgeW} strokeLinejoin="round" />
    </svg>
  );
}

function WatClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: site.timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="ft-clk">
      <OrbitGlyph />
      <span>{time ? `NG · ${time} WAT` : "NG · WAT"}</span>
    </span>
  );
}

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const [off, setOff] = useState(true);
  const still = useReducedMotion() ?? false;

  // Motion runs only while the footer is on screen, as on the boards.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setOff(!e.isIntersecting);
      el.querySelectorAll("svg").forEach((s) => (e.isIntersecting ? s.unpauseAnimations() : s.pauseAnimations()));
    }, { rootMargin: "120px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer ref={ref} className={off ? "ft off" : "ft"}>
      <div className="ft-hz" aria-hidden="true">
        <Horizon art={MOBILE} id="ftm" className="ft-hz-m" still={still} />
        <Horizon art={DESKTOP} id="ftd" className="ft-hz-d" still={still} />
      </div>
      <div className="ft-body">
        <div className="ft-card rim">
          <span className="grain" aria-hidden="true" />
          <div className="ft-hd">
            <span className="ft-mark" aria-hidden="true">
              K<b>B</b>
            </span>
            <span className="ft-id">
              <strong>{site.displayName}</strong>
              <span>SECURITY · CLOUD · AI</span>
            </span>
            <a className="ft-top rim" href="#top" aria-label="Back to top">
              <span className="grain" aria-hidden="true" />
              <ArrowUpIcon />
            </a>
          </div>
          <div className="ft-hr" />
          <nav className="ft-nav" aria-label="Footer">
            {footerNav.map((item, i) => {
              const inner = (
                <>
                  <span className="k">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                  <ArrowRightIcon size={14} className="a" />
                </>
              );
              // Files (the résumé PDF) are plain links, not routes.
              return item.href.endsWith(".pdf") ? (
                <a key={item.href} className="ft-ln" href={item.href}>
                  {inner}
                </a>
              ) : (
                <Link key={item.href} className="ft-ln" href={item.href}>
                  {inner}
                </Link>
              );
            })}
          </nav>
          <div className="ft-hr" />
          <div className="ft-ft">
            <div className="ft-soc">
              {socials.map(({ label, href }) => {
                const Icon = SOCIAL_ICONS[label];
                const external = href.startsWith("http");
                return (
                  <a
                    key={label}
                    className="ft-ic"
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="grain" aria-hidden="true" />
                    <Icon />
                  </a>
                );
              })}
            </div>
            <WatClock />
          </div>
        </div>
        <div className="ft-base">
          <span>
            © {new Date().getFullYear()} {site.displayName}. All rights reserved.
          </span>
          <span className="mono">BUILT IN NIGERIA · SECURE BY DESIGN</span>
        </div>
      </div>
    </footer>
  );
}
