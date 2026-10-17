"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { DownloadIcon } from "./icons";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href + "/");

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
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  const activeIndex = nav.findIndex((n) => isActive(pathname, n.href));

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
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="pm-l"
              style={{ "--n": i } as React.CSSProperties}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
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
        <Link className="dh-logo" href="/" aria-label={`${site.shortName}, home`}>
          <Logo />
        </Link>
        <nav
          className="dn"
          aria-label="Pages"
          style={{ "--li": Math.max(0, activeIndex), "--lo": activeIndex < 0 ? 0 : 1 } as React.CSSProperties}
        >
          <span className="dn-lens" aria-hidden="true">
            <span className="grain" />
          </span>
          {nav.map((item, i) => (
            <Link key={item.href} href={item.href} aria-current={i === activeIndex ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
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
