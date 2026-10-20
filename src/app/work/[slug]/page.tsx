import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseBody, caseSections, severityClass } from "@/components/case/CaseBody";
import { MonoTag, OrbitTag, PageKicker, Quote, Reveal, SectionRail, SkillChips } from "@/components/kit";
import { GitHubIcon } from "@/components/site/icons";
import { getCaseStudies, getCaseStudy, type CaseStudy } from "@/lib/content";
import { labBySlug } from "@/lib/labs";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return cs ? pageMeta({ title: cs.title, description: cs.lede, path: `/work/${slug}` }) : {};
}

const TRACK = {
  cloud: { c: "var(--color-sky)", rgb: "125 211 252", d: "cloud" },
  devsecops: { c: "var(--color-mint)", rgb: "94 234 212", d: "devsecops" },
} as const;

const pad = (n: number) => String(n).padStart(2, "0");

/** Title with its last word in the accent colour (03: "The Overpowered <em>Role</em>"). */
function AccentTitle({ title }: { title: string }) {
  const i = title.lastIndexOf(" ");
  if (i < 0) return <em>{title}</em>;
  return (
    <>
      {title.slice(0, i)} <em>{title.slice(i + 1)}</em>
    </>
  );
}

/** Previous / next: the imported case study if it exists, otherwise the work hub. */
function Neighbour({ slug, dir }: { slug?: string; dir: "prev" | "next" }) {
  if (!slug) return <span />;
  const imported = getCaseStudy(slug);
  const title = imported?.title ?? labBySlug(slug)?.title;
  if (!title) return <span />;
  const arrow =
    dir === "prev" ? (
      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return (
    <Link href={imported ? `/work/${slug}` : "/work"} className={dir === "next" ? "pn-next" : undefined} rel={dir}>
      <small>
        {dir === "prev" ? arrow : null}
        {dir === "prev" ? "PREVIOUS" : "NEXT"}
        {dir === "next" ? arrow : null}
      </small>
      <b>{title}</b>
    </Link>
  );
}

function Hero({ cs }: { cs: CaseStudy }) {
  const tr = TRACK[cs.track];
  const crumbs = cs.breadcrumb ?? ["Work"];
  return (
    <section className="pg-hero cs-hero" style={{ "--rgb": tr.rgb, "--c": tr.c } as React.CSSProperties}>
      {/* Two columns from 1024px; below that the wrappers dissolve and the board's order holds. */}
      <div className="cs-ha">
        <nav className="pg-crumb" aria-label="Breadcrumb">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            const href = i === 0 ? "/work" : i === 1 ? `/work?d=${tr.d}` : `/work?c=${cs.category}`;
            return (
              <span key={c} className="pg-crumb-i">
                {i > 0 ? <i aria-hidden="true" /> : null}
                {last ? <span aria-current="page">{c}</span> : <Link href={href}>{c}</Link>}
              </span>
            );
          })}
        </nav>
        <PageKicker lead={`CASE ${pad(cs.caseNumber)}`} label={cs.kicker} />
        <h1 className="pg-h1">
          <AccentTitle title={cs.title} />
        </h1>
        <p className="pg-lede">{cs.lede}</p>
      </div>

      <div className="cs-hb">
        <div className="cs-vis" aria-hidden="true">
          <span className="r1" />
          <span className="r2" />
          <span className="core">
            <svg width="26" height="26" viewBox="0 0 24 24">
              <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7zM9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="tg">
            <OrbitTag color={tr.c}>{cs.platformTags.join(" · ").toUpperCase()}</OrbitTag>
          </span>
          <span className="st">
            <i />
            {cs.status}
          </span>
        </div>
        {/* The status line is decorative in the visual; repeat it for screen readers. */}
        <p className="sr-only">Status: {cs.status}</p>
      </div>

      <div className="cs-hc">
        <dl className="cs-meta">
          <div>
            <dt>DOMAIN</dt>
            <dd>{cs.meta.domain}</dd>
          </div>
          <div>
            <dt>PLATFORM</dt>
            <dd>{cs.meta.platform}</dd>
          </div>
          <div>
            <dt>SEVERITY</dt>
            <dd className={severityClass(cs.meta.severity)}>{cs.meta.severity}</dd>
          </div>
          <div>
            <dt>OUTCOME</dt>
            <dd className="cs-out">{cs.meta.outcome}</dd>
          </div>
        </dl>

        {cs.tools?.length ? (
          <div className="cs-tools">
            <p className="pg-lab">TOOLS</p>
            <div className="cs-tools-l">
              {cs.tools.map((t) => (
                <MonoTag key={t}>{t}</MonoTag>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="cs-res">
        <span className="grain" aria-hidden="true" />
        <span className="l">RESULT</span>
        <div className="cs-rv">
          <div>
            <small>BEFORE</small>
            <s>{cs.result.before}</s>
          </div>
          <span className="ra" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <small>AFTER</small>
            <i>{cs.result.after}</i>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const cs = getCaseStudy((await params).slug);
  if (!cs) notFound();
  // TODO(repo): until a lab's repo URL is known, the button opens the GitHub profile (as on the board).
  const repo = cs.repo ?? site.github;

  const rail = [
    ...caseSections(cs).map((x) => ({ id: x.id, label: x.heading, meta: String(x.n).padStart(2, "0") })),
    ...(cs.lesson ? [{ id: "cs-lesson", label: "What I learned" }] : []),
  ];

  return (
    <article className="cs-page">
      <Hero cs={cs} />
      <div className="cs-body">
        <aside className="cs-aside">
          <SectionRail label="On this page" items={rail} progress />
        </aside>
        <div className="cs-main">
          <CaseBody cs={cs} />

          {cs.lesson ? (
            <section className="pg-sec cs-s" id="cs-lesson">
              <Reveal desktopOnly>
                <Quote caption="WHAT I LEARNED">“{cs.lesson}”</Quote>
              </Reveal>
            </section>
          ) : null}

          {cs.skills?.length ? (
            <section className="pg-sec">
              <p className="pg-lab">SKILLS IT PROVES</p>
              <SkillChips label="Skills it proves" items={cs.skills} />
            </section>
          ) : null}

          <section className="pg-sec">
            <a href={repo} target="_blank" rel="noopener noreferrer" className="btn-p rim cs-repo">
              <span className="grain" aria-hidden="true" />
              <span className="pdisc" aria-hidden="true">
                <GitHubIcon size={15} stroke={1.9} />
              </span>
              <span className="cs-repo-l">{cs.repo ? "View the lab on GitHub" : "View my labs on GitHub"}</span>
            </a>
            {cs.previous || cs.next ? (
              <nav className="pn" aria-label="More case studies">
                <Neighbour slug={cs.previous} dir="prev" />
                <Neighbour slug={cs.next} dir="next" />
              </nav>
            ) : null}
          </section>
        </div>
      </div>
    </article>
  );
}
