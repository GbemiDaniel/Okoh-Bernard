"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/kit";
import { ArrowRightIcon, MailIcon } from "@/components/site/icons";
import { site } from "@/lib/site";

/** The email with a copy button. The icon crossfades to a check and back after 2s. */
function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <div className="ct-mail">
      <span>{site.email}</span>
      <button
        type="button"
        className="ct-cpy"
        data-copied={copied}
        aria-label="Copy email address"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(site.email);
          } catch {}
          setCopied(true);
          clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setCopied(false), 2000);
        }}
      >
        <svg className="cp" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="8" y="8" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <svg className="ok" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}

/**
 * 3.8 Contact v3 (F1 desktop, F2 mobile): starts a conversation and nothing
 * else. Phones get one gradient-bordered card; desktop puts the copy on the
 * left and the email card on the right. Profiles live in the footer.
 */
export function ContactBlock() {
  return (
    <section id="contact" className="hs hs-contact" aria-labelledby="contact-title">
      <div className="w">
        <div className="ct-k">
          <span>
            07<span className="ct-k-of"> / 07</span>
          </span>
          <i aria-hidden="true" />
          CONTACT
        </div>
        <div className="ct">
          <Reveal desktopOnly className="ct-copy">
            <h2 id="contact-title" className="ct-h">
              <span className="ct-m">
                Let&apos;s work <span className="grad">together</span>
              </span>
              <span className="ct-d">
                Let&apos;s build something <span className="grad">secure</span> together.
              </span>
            </h2>
            <p className="ct-p">I&apos;m open to cloud security and DevSecOps roles, contract work and collaborations. Email reaches me fastest.</p>
            <span className="ct-av">
              <b aria-hidden="true" />
              AVAILABLE · {site.workMode.toUpperCase()}
            </span>
          </Reveal>
          <Reveal desktopOnly delay={120} className="ct-card">
            <span className="ct-cap">EMAIL</span>
            <CopyEmail />
            <a className="ct-pri" href={`mailto:${site.email}`}>
              <span className="d" aria-hidden="true">
                <MailIcon size={15} stroke={1.9} />
              </span>
              <span className="lb">Email me</span>
            </a>
            <Link className="ct-sec" href="/contact">
              Or send a message through the form
              <ArrowRightIcon size={14} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
