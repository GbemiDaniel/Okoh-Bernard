"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type CapsuleAction = {
  label: string;
  href: string;
  icon: React.ReactNode;
  /** Page to open when an in-page target (#work) is not on this page. */
  fallback?: string;
};

type Side = 0 | 1 | 2;

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Linked button pair from 01-home-mobile (.cap): one glass shell, two links,
 * one lens that stretches to whichever half you point at, touch or focus.
 * The leading edge moves first and the trailing edge follows 70ms later.
 */
export function SplitCapsule({ primary, secondary, className = "" }: { primary: CapsuleAction; secondary: CapsuleAction; className?: string }) {
  const router = useRouter();
  const [on, setOn] = useState<Side>(0);
  const [pos, setPos] = useState<1 | 2>(1);
  const [press, setPress] = useState<Side>(0);
  const [fire, setFire] = useState<Side>(0);
  const busy = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const light = (i: 1 | 2) => {
    setOn(i);
    setPos(i);
  };
  const leave = () => {
    if (!busy.current) {
      setOn(0);
      setPress(0);
    }
  };

  // Tap or click: light the half, pulse it, then travel.
  const go = (e: React.MouseEvent<HTMLAnchorElement>, i: 1 | 2, href: string, fallback?: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    busy.current = true;
    timers.current.forEach(clearTimeout);
    light(i);
    setPress(0);
    setFire(0);
    requestAnimationFrame(() => setFire(i));
    try {
      navigator.vibrate?.(8);
    } catch {}
    const still = reduced();
    timers.current = [
      window.setTimeout(() => {
        const target = href.startsWith("#") ? document.querySelector(href) : null;
        if (target) {
          target.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
        } else if (href.startsWith("#")) {
          if (fallback) router.push(fallback);
        } else {
          router.push(href);
        }
      }, still ? 0 : 280),
      window.setTimeout(() => {
        busy.current = false;
        setFire(0);
        setOn(0);
      }, 1100),
    ];
  };

  const half = (i: 1 | 2, a: CapsuleAction) => (
    <a
      className={i === 1 ? "s1" : "s2"}
      href={a.href}
      onPointerEnter={(e) => e.pointerType !== "touch" && light(i)}
      onPointerLeave={leave}
      onPointerDown={() => {
        light(i);
        setPress(i);
      }}
      onPointerUp={() => setPress(0)}
      onPointerCancel={() => setPress(0)}
      onFocus={() => light(i)}
      onBlur={leave}
      onClick={(e) => go(e, i, a.href, a.fallback)}
    >
      <span className="disc" aria-hidden="true">
        {a.icon}
      </span>
      {a.label}
    </a>
  );

  return (
    <div className={`cap rim ${className}`} data-on={on} data-pos={pos} data-press={press} data-fire={fire}>
      <span className="halo" aria-hidden="true" />
      <span className="lens" aria-hidden="true">
        <span className="grain" />
      </span>
      <span className="div" aria-hidden="true" />
      {half(1, primary)}
      {half(2, secondary)}
    </div>
  );
}
