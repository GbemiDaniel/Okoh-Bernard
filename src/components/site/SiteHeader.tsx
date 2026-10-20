"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { DownloadIcon } from "./icons";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href + "/");

// The desktop bar also carries Home (Daniel, 2026-10-19). "/" only matches itself.
const deskNav = [{ label: "Home", href: "/" }, ...nav];
const menuNav = [{ label: "Home", href: "/", hint: "START HERE" }, ...nav];
const isCurrent = (pathname: string, href: string) => (href === "/" ? pathname === "/" : isActive(pathname, href));

/*
  The lens marks the current page. On navigation it stretches: the edge facing
  the new tab leaves first and the far edge trails, so the lens reaches across
  and gathers itself on the new tab. A lit copy of the labels is clipped to the
  same edges, so the text brightens exactly where the lens is.
*/
function DeskNav({ pathname }: { pathname: string }) {
  const active = deskNav.findIndex((n) => isCurrent(pathname, n.href));
  // Direction of the last move, derived from the previous render's tab.
  const [move, setMove] = useState({ from: active, dir: "r" });
  if (move.from !== active) setMove({ from: active, dir: move.from >= 0 && active < move.from ? "l" : "r" });

  return (
    <nav
      className="dn"
      aria-label="Pages"
      data-dir={move.dir}
      style={
        { "--li": Math.max(0, active), "--lo": active < 0 ? 0 : 1, "--dn-n": deskNav.length } as React.CSSProperties
      }
    >
      <span className="dn-lens" aria-hidden="true">
        <span className="grain" />
      </span>
      {deskNav.map((item, i) => (
        <Link key={item.href} href={item.href} aria-current={i === active ? "page" : undefined}>
          {item.label}
        </Link>
      ))}
      <span className="dn-lit" aria-hidden="true">
        {deskNav.map((item) => (
          <span key={item.href}>{item.label}</span>
        ))}
      </span>
    </nav>
  );
}

function ResumePill() {
  return (
    <a className="hd-cv" href={site.resume} aria-label="Download résumé">
      <span className="grain" aria-hidden="true" />
      <DownloadIcon size={13} />
      Résumé
    </a>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  // The page the menu was opened on. Navigating anywhere else closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = useCallback((next: boolean) => setOpenOn(next ? pathname : null), [pathname]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(
    (restoreFocus: boolean) => {
      setOpen(false);
      if (restoreFocus) buttonRef.current?.focus();
    },
    [setOpen],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Lets the homepage section dial step aside while the pages menu is open (01).
    document.documentElement.dataset.menu = "open";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    // The menu is a desktop-hidden overlay; closing it on resize avoids a stuck scroll lock.
    const mq = window.matchMedia("(min-width: 64rem)");
    const onMq = () => mq.matches && close(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      delete document.documentElement.dataset.menu;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  return (
    <>
      {/* Mobile and tablet (01-home-mobile) */}
      <header className="hd">
        <Link className="hd-logo" href="/" aria-label={`${site.shortName}, home`}>
          <Logo />
        </Link>
        <div className="hd-r">
          <ResumePill />
          <button
            ref={buttonRef}
            type="button"
            className="hd-mb"
            aria-expanded={open}
            aria-controls="pages-menu"
            aria-label={open ? "Close pages menu" : "Pages menu"}
            onClick={() => setOpen(!open)}
          >
            <i />
            <i />
          </button>
        </div>
      </header>
      <div id="pages-menu" ref={menuRef} className="pm" data-open={open} inert={!open}>
        <nav aria-label="Pages">
          {menuNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="pm-l"
              style={{ "--n": i } as React.CSSProperties}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="grain" aria-hidden="true" />
              <span className="k">{String(i + 1).padStart(2, "0")}</span>
              <b>{item.label}</b>
              <small>{item.hint}</small>
            </Link>
          ))}
        </nav>
        <div className="pm-ft">
          <span>ONYEDIKACHI BERNARD</span>
          <span>CLOUD · DEVSECOPS · AI</span>
        </div>
      </div>

      {/* Desktop (00-home-desktop) */}
      <header className="dh">
        <span className="dh-fog" aria-hidden="true" />
        <Link className="dh-logo" href="/" aria-label={`${site.shortName}, home`}>
          <Logo />
        </Link>
        <DeskNav pathname={pathname} />
        <div className="dh-r">
          <ResumePill />
          <Link className="btn-p rim dh-cta" href="/contact">
            <span className="grain" aria-hidden="true" />
            Get in touch
          </Link>
        </div>
      </header>
    </>
  );
}
