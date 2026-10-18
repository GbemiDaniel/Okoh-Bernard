"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, SectionIndex } from "@/components/kit";
import { GitHubIcon, LinkedInIcon, MailIcon, MediumIcon } from "@/components/site/icons";
import { OrbitGlyph } from "@/components/site/OrbitGlyph";
import { site } from "@/lib/site";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <div className="ct-mail">
      <span title={site.email}>{site.email}</span>
      <button
        type="button"
        data-copied={copied}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(site.email);
          } catch {}
          setCopied(true);
          clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setCopied(false), 1600);
        }}
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

/** The gradient-bordered card: one of the three places the gradient is allowed. */
function ContactCard({ withTitle }: { withTitle: boolean }) {
  return (
    <div className="ct-card">
      <div className="ct-in">
        <span className="ct-glow" aria-hidden="true" />
        {withTitle ? (
          <>
            <h2 id="contact-title" className="ct-h">
              Let&apos;s Work <span className="grad">Together</span>
            </h2>
            <p className="ct-p">Open to opportunities, collaborations and meaningful projects.</p>
          </>
        ) : null}
        <CopyEmail />
        <a href={`mailto:${site.email}`} className="btn-p rim ct-btn">
          <span className="grain" aria-hidden="true" />
          <span className="pdisc" aria-hidden="true">
            <MailIcon size={15} stroke={1.9} />
          </span>
          <span className="ct-btn-l">Contact me</span>
        </a>
        <div className="ct-tiles">
          {[
            { label: "GitHub", href: site.github, Icon: GitHubIcon },
            { label: "LinkedIn", href: site.linkedin, Icon: LinkedInIcon },
            { label: "Medium", href: site.medium, Icon: MediumIcon },
          ].map(({ label, href, Icon }) => (
            <a key={label} className="ct-t" href={href} target="_blank" rel="noopener noreferrer">
              <span className="grain" aria-hidden="true" />
              <Icon size={19} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 3.8 Contact (01 section 07 card; 00 section 07 headline and two columns). */
export function ContactBlock() {
  const big = useRef<HTMLHeadingElement>(null);

  // Desktop headline fills with light as it rises into view (00 onScroll).
  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      const el = big.current;
      if (!el || !el.offsetParent) return;
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const r = el.getBoundingClientRect();
      const f = still ? 1 : Math.max(0, Math.min(1, (window.innerHeight * 0.9 - r.top) / (window.innerHeight * 0.55)));
      el.style.setProperty("--fill", `${(f * 100).toFixed(1)}%`);
      el.style.setProperty("--fillN", f.toFixed(3));
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
  }, []);

  return (
    <section id="contact" className="hs hs-contact" aria-labelledby="contact-title">
      <div className="w">
        {/* Mobile */}
        <div className="ct-m">
          <SectionIndex index={7} total={7} />
          <ContactCard withTitle />
        </div>

        {/* Desktop */}
        <div className="ct-d">
          <Reveal desktopOnly>
            <div className="sh-k">
              <span>07</span>
              <i aria-hidden="true" />
              <span>CONTACT</span>
            </div>
          </Reveal>
          <h2 ref={big} className="ct-big" aria-label="Let's build something secure together.">
            Let&apos;s build something <span>secure</span> together.
          </h2>
          <div className="hs-2 ct-cols">
            <Reveal desktopOnly>
              {/* TODO(copy): Kachi to confirm "usually reply within a day". */}
              <p className="hs-lede ct-lede">
                Open to security engineering roles, collaborations and meaningful projects. The quickest way to reach me is email, and I usually reply within a
                day.
              </p>
              <div className="ct-avail">
                <OrbitGlyph dur="3s" width={16} />
                <span>OPEN TO REMOTE · HYBRID</span>
              </div>
            </Reveal>
            <Reveal desktopOnly delay={120}>
              <ContactCard withTitle={false} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
