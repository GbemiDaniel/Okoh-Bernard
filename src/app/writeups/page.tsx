import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { PageKicker } from "@/components/kit";
import { WriteupsList } from "@/components/writeups/WriteupsList";
import { toCard } from "@/components/writeups/parts";
import { getWriteups } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Writeups",
  description: "Long-form explainers on AI security, identity, cryptography and risk, in full on the site and on Medium.",
  path: "/writeups",
});

/** Writeups list (04-writeups). */
export default function WriteupsPage() {
  const cards = getWriteups().map(toCard);
  return (
    <div className="wl-page">
      <section className="pg-hero">
        <nav className="pg-crumb" aria-label="Breadcrumb">
          <span className="pg-crumb-i">
            <Link href="/">Home</Link>
          </span>
          <span className="pg-crumb-i">
            <i aria-hidden="true" />
            <span aria-current="page">Writeups</span>
          </span>
        </nav>
        <PageKicker lead="02" label="WRITEUPS" />
        <h1 className="pg-h1">
          Notes from
          <br />
          <em>the field.</em>
        </h1>
        <p className="pg-lede">Long-form explainers on AI security, identity, cryptography and risk. Read them in full here, then join the discussion on Medium.</p>
      </section>
      <section className="wl-sec" aria-label="Writeups">
        <WriteupsList cards={cards} />
      </section>
      <section className="pg-sec">
        <a className="sub" href={site.medium} target="_blank" rel="noopener noreferrer">
          <span className="i" aria-hidden="true">
            M
          </span>
          <span className="sub-t">
            <b>Follow on Medium</b>
            <span>New writeups land there first, with comments and claps.</span>
          </span>
          <span className="sub-go" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </section>
    </div>
  );
}
