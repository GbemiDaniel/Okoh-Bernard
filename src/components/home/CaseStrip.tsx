"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LinkCapsule, OrbitTag, Reveal, SectionHeading } from "@/components/kit";
import { featured, HUE } from "@/lib/home";
import { ICON } from "./icons";

const CARD_STEP = 284; // 270px card + 14px gap (01)
const pad = (n: number) => String(n).padStart(2, "0");

type Card = (typeof featured)[number] & { href: string };

function Visual({ card, i, height }: { card: Card; i: number; height: "m" | "d" }) {
  const c = HUE[card.hue].c;
  return (
    <span className={height === "m" ? "csm-v" : "dcs-v"} style={{ "--c": c } as React.CSSProperties}>
      <span className="cv-ra" style={{ transform: `rotateX(70deg) rotateZ(${i * 30}deg)` }} />
      <span className="cv-rb" />
      <span className="cv-ic">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path d={ICON[card.icon]} stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="cv-tag">
        <OrbitTag color={c}>{card.tag}</OrbitTag>
      </span>
    </span>
  );
}

function Foot({ no }: { no: number }) {
  return (
    <span className="csm-f">
      <span>CASE STUDY · {pad(no)}</span>
      <span className="csm-go" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="14" height="14">
          <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  );
}

/** Mobile: snap carousel with a fanned deck and an arc of dots (01). */
function Carousel({ cards }: { cards: Card[] }) {
  const snap = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  // The Three Orbits panel asks for a slide (cloud = 0, DevSecOps = 2).
  useEffect(() => {
    const on = (e: Event) => {
      const n = (e as CustomEvent<number>).detail;
      setSlide(n);
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      snap.current?.scrollTo({ left: n * CARD_STEP, behavior: still ? "auto" : "smooth" });
    };
    window.addEventListener("kb:slide", on);
    return () => window.removeEventListener("kb:slide", on);
  }, []);

  return (
    <div className="cs-m">
      <span className="cs-count" aria-hidden="true">
        {pad(slide + 1)} / {pad(cards.length)}
      </span>
      <div
        ref={snap}
        className="snap"
        onScroll={(e) => {
          const i = Math.max(0, Math.min(cards.length - 1, Math.round(e.currentTarget.scrollLeft / CARD_STEP)));
          if (i !== slide) setSlide(i);
        }}
      >
        {cards.map((card, i) => {
          const off = i - slide, ao = Math.min(2, Math.abs(off));
          return (
            <Link
              key={card.slug}
              href={card.href}
              className="csm"
              data-cur={off === 0}
              style={{ transform: `rotate(${off * 7}deg) translateY(${ao * 10}px)`, opacity: off === 0 ? 1 : 0.55 }}
            >
              <Visual card={card} i={i} height="m" />
              <span className="csm-t">{card.title}</span>
              <span className="csm-d">{card.body}</span>
              <Foot no={i + 1} />
            </Link>
          );
        })}
      </div>
      <svg className="cs-arc" viewBox="0 0 390 40" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path d="M30 6 Q195 40 360 6" fill="none" stroke="rgb(255 255 255 / .12)" strokeDasharray="2 6" />
        {cards.map((_, i) => {
          const t = 0.2 + i * 0.2;
          return (
            <circle
              key={i}
              cx={(30 + 330 * t).toFixed(1)}
              cy={(6 + 68 * t * (1 - t)).toFixed(1)}
              r={i === slide ? 5 : 3}
              fill={i === slide ? "var(--color-mint)" : "rgb(255 255 255 / .3)"}
            />
          );
        })}
      </svg>
    </div>
  );
}

/** Desktop: the section pins while the track glides sideways (00). */
function PinnedTrack({ cards, labs, domains }: { cards: Card[]; labs: number; domains: number }) {
  const sec = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      const s = sec.current, t = track.current;
      if (!s || !t || !s.offsetParent) return; // hidden below lg
      const top = s.getBoundingClientRect().top + window.scrollY;
      const len = s.offsetHeight - window.innerHeight;
      const q = Math.max(0, Math.min(1, (window.scrollY - top) / Math.max(1, len)));
      const max = Math.max(0, t.scrollWidth - document.documentElement.clientWidth);
      t.style.transform = `translateX(${(-q * max).toFixed(1)}px)`;
      if (bar.current) bar.current.style.transform = `scaleX(${q.toFixed(4)})`;
      setCount(Math.min(cards.length, 1 + Math.floor(q * (cards.length + 0.2))));
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
    };
  }, [cards.length]);

  return (
    <div ref={sec} className="cs-d">
      <div className="cs-pin">
        <div className="w hs-head cs-head">
          <Reveal desktopOnly>
            <SectionHeading index={3} total={7} label="Featured work" lead="Featured" accent="Case Studies" />
          </Reveal>
          <div className="cs-wmeta" aria-hidden="true">
            <span>
              {pad(count)} / {pad(cards.length)}
            </span>
            <span className="cs-wbar">
              <i ref={bar} />
            </span>
          </div>
        </div>
        <div ref={track} className="cs-track">
          {cards.map((card, i) => (
            <Link key={card.slug} href={card.href} className="dcs" style={{ "--c": HUE[card.hue].c } as React.CSSProperties}>
              <Visual card={card} i={i} height="d" />
              <span className="dcs-t">{card.title}</span>
              <span className="dcs-d">{card.body}</span>
              <Foot no={i + 1} />
            </Link>
          ))}
          <Link href="/work" className="dcs dcs-all">
            <span className="grain" aria-hidden="true" />
            <span className="dcs-k">THE FULL RECORD</span>
            <span className="dcs-big">
              {labs} labs.
              <br />
              {domains} domains.
            </span>
            <span className="dcs-d">Every project, filterable by discipline and domain.</span>
            <span className="all rim" style={{ margin: 0 }}>
              <span className="grain" aria-hidden="true" />
              <span>View all projects</span>
              <span className="go" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="15" height="15">
                  <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CaseStrip({ available, labs, domains }: { available: string[]; labs: number; domains: number }) {
  // Link a card to its case study once that lab is imported; until then, to the work hub.
  const cards: Card[] = featured.map((f) => ({ ...f, href: available.includes(f.slug) ? `/work/${f.slug}` : "/work" }));
  return (
    <section id="work" className="hs hs-work" aria-labelledby="work-title">
      <div className="cs-mobile">
        <div className="w cs-mhead">
          <SectionHeading id="work-title" index={3} total={7} label="Featured work" lead="Featured" accent="Case Studies" breakBeforeAccent />
        </div>
        <Carousel cards={cards} />
        <div className="w">
          <LinkCapsule href="/work" label="View all projects" meta={`${labs} LABS · ${domains} DOMAINS`} />
        </div>
      </div>
      <PinnedTrack cards={cards} labs={labs} domains={domains} />
    </section>
  );
}
