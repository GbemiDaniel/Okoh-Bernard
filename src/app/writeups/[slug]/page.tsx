import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageKicker, Reveal, SectionRail } from "@/components/kit";
import { ArticleToc } from "@/components/writeups/ArticleToc";
import { Prose, articleSections } from "@/components/writeups/Prose";
import { TileCover, WriteupRow, monthYear, toCard, topicOf } from "@/components/writeups/parts";
import { getWriteup, getWriteups, type Writeup } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getWriteups().map((w) => ({ slug: w.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const w = getWriteup((await params).slug);
  if (!w) return {};
  const meta = pageMeta({ title: w.title, description: w.summary, path: `/writeups/${w.slug}`, article: { publishedTime: w.date } });
  // The article was first published on Medium; point search engines at the original.
  return { ...meta, alternates: { canonical: w.mediumUrl } };
}

/** Title with its last word in the accent colour (05: "Understanding Identity and Access <em>Management</em>"). */
function AccentTitle({ title }: { title: string }) {
  const i = title.lastIndexOf(" ");
  if (i < 0) return <em>{title}</em>;
  return (
    <>
      {title.slice(0, i)} <em>{title.slice(i + 1)}</em>
    </>
  );
}

/** Next in the same topic (newest to oldest, wrapping); the next article overall if it is the only one. */
function readNext(w: Writeup, all: Writeup[]) {
  const same = all.filter((x) => x.topic === w.topic);
  const pool = same.length > 1 ? same : all;
  return pool[(pool.findIndex((x) => x.slug === w.slug) + 1) % pool.length];
}

/** Article (05-article). */
export default async function ArticlePage({ params }: Props) {
  const w = getWriteup((await params).slug);
  if (!w) notFound();
  const t = topicOf(w.topic);
  const sections = articleSections(w.body);
  const next = readNext(w, getWriteups());

  return (
    <article className="ar-page" style={{ "--c": t.c, "--rgb": t.rgb } as React.CSSProperties}>
      <span className="ar-bar" aria-hidden="true" />
      <header className="pg-hero ar-hero">
        <div className="ar-ha">
          <nav className="pg-crumb" aria-label="Breadcrumb">
            <span className="pg-crumb-i">
              <Link href="/writeups">Writeups</Link>
            </span>
            <span className="pg-crumb-i">
              <i aria-hidden="true" />
              <span aria-current="page">{t.label}</span>
            </span>
          </nav>
          <PageKicker lead="ARTICLE" label={w.area} />
          <h1 className="pg-h1 ar-h1">
            <AccentTitle title={w.title} />
          </h1>
          <div className="ar-meta">
            <span>
              <time dateTime={w.date}>{monthYear(w.date)}</time>
            </span>
            <i aria-hidden="true" />
            <span>{w.readMinutes} MIN READ</span>
            <i aria-hidden="true" />
            <a href={w.mediumUrl} target="_blank" rel="noopener noreferrer">
              ALSO ON MEDIUM
            </a>
          </div>
        </div>
        {w.cover ? <TileCover keys={w.cover.keys} caption={w.cover.caption} topic={w.topic} /> : null}
        <ArticleToc items={sections} />
      </header>

      <div className="ar-body">
        <aside className="cs-aside">{sections.length > 1 ? <SectionRail label="In this article" items={sections} progress /> : null}</aside>
        <div className="cs-main ar-main">
          <Prose body={w.body} />

          <section className="pg-sec ar-end">
            <div className="author">
              <span className="av" aria-hidden="true">
                <b>KB</b>
              </span>
              <span>
                <strong>Kachi Bernard</strong>
                <span>Cloud security and DevSecOps engineer. I write about what I break, fix and verify.</span>
              </span>
            </div>
          </section>

          <section className="pg-sec ar-md" aria-labelledby="md-title">
            <Reveal desktopOnly>
              <div className="md">
                <span className="grain" aria-hidden="true" />
                <span className="pg-lab md-k">JOIN THE CONVERSATION</span>
                <h2 id="md-title">Comment or clap on Medium</h2>
                <p>This article also lives on Medium, where you can leave a comment, clap and follow for new writeups.</p>
                <div className="md-ic" aria-hidden="true">
                  <span>
                    <svg width="13" height="13" viewBox="0 0 24 24">
                      <path d="M7 11l3-7 2 1-1 5h6l-2 9H7zM3 11h4v9H3z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Clap
                  </span>
                  <span>
                    <svg width="13" height="13" viewBox="0 0 24 24">
                      <path d="M4 5h16v11H8l-4 4z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Comment
                  </span>
                  <span>
                    <svg width="13" height="13" viewBox="0 0 24 24">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Follow
                  </span>
                </div>
                <a href={w.mediumUrl} target="_blank" rel="noopener noreferrer" className="btn-p rim md-btn">
                  <span className="grain" aria-hidden="true" />
                  <span className="pdisc" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24">
                      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="md-btn-l">Open on Medium</span>
                </a>
              </div>
            </Reveal>
          </section>

          {next && next.slug !== w.slug ? (
            <section className="pg-sec">
              <p className="pg-lab">READ NEXT</p>
              <div className="ar-next">
                <WriteupRow w={toCard(next)} summary={false} />
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
