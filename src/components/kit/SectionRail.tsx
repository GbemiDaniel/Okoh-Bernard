"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type RailItem = { id: string; label: string; meta?: string };

/**
 * Desktop contents rail (no board: built for the inner pages at 1024px and
 * up). Marks the section being read; the indicator glides to it (state
 * indication, 220ms strong ease-in-out, transform only). With `progress`, a
 * hairline fills as the article is read, driven by a CSS scroll timeline the
 * page names `--read` (off the main thread; hidden where unsupported).
 */
export function SectionRail({ label, items, progress = false }: { label: string; items: RailItem[]; progress?: boolean }) {
  const [active, setActive] = useState(items[0]?.id);
  const list = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const ids = items.map((i) => i.id).join("|");

  useEffect(() => {
    const els = ids
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    // The section being read is the last one whose top has passed a line 30%
    // down the screen. Measured once per frame while scrolling, so a fast
    // scroll or an anchor jump never skips a section; state only changes when
    // the answer does.
    let raf = 0;
    const pick = () => {
      raf = 0;
      const line = window.innerHeight * 0.3;
      let cur = els[0];
      for (const el of els) if (el.getBoundingClientRect().top <= line) cur = el;
      setActive(cur.id);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [ids]);

  // Write the transform straight to the element: no re-render, no inherited variable.
  useLayoutEffect(() => {
    const a = list.current?.querySelector<HTMLElement>(`[data-id="${CSS.escape(active ?? "")}"]`);
    if (!a || !bar.current) return;
    // A fixed-height marker centred on the link; only its transform changes.
    bar.current.style.transform = `translateY(${a.offsetTop + a.offsetHeight / 2 - 10}px)`;
  }, [active, ids]);

  return (
    <nav className="toc" aria-label={label}>
      {progress ? <span className="toc-prog" aria-hidden="true" /> : null}
      <div className="toc-track" ref={list}>
        <span ref={bar} className="toc-bar" aria-hidden="true" />
        <ol>
          {items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} data-id={it.id} aria-current={it.id === active ? "location" : undefined}>
                <span>{it.label}</span>
                {it.meta ? <small>{it.meta}</small> : null}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
