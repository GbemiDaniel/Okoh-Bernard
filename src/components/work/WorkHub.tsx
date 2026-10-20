"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FilterChips, Reveal, SectionRail } from "@/components/kit";

export type HubGroup = {
  slug: string;
  label: string;
  track: "cloud" | "devsecops";
  rows: { no: number; slug: string; title: string; live: boolean; featured: boolean }[];
};

type Filter = "all" | "cloud" | "devsecops";
const COLOR = { cloud: "var(--color-sky)", devsecops: "var(--color-mint)" } as const;
const pad = (n: number) => String(n).padStart(2, "0");

const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Filters and grouped lab rows (02-work). The filter follows ?d=cloud|devsecops.
 * From 1024px the intro, filters and a domain rail share a sticky side column.
 */
type HubProps = {
  groups: HubGroup[];
  counts: Record<Filter, number>;
  intro: React.ReactNode;
  footer: React.ReactNode;
};

/** Reads the filter from the URL. Wrap in Suspense with `<WorkHub>` as the fallback so the page prerenders in full. */
export function WorkHubFromUrl(props: HubProps) {
  const d = useSearchParams().get("d");
  const initial = (["cloud", "devsecops"] as const).find((x) => x === d) ?? "all";
  return <WorkHub {...props} initial={initial} />;
}

export function WorkHub({ groups, counts, intro, footer, initial = "all" }: HubProps & { initial?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initial);
  // Groups reveal on first view only; ones a filter brings back appear at once.
  const [filtered, setFiltered] = useState(false);

  // ?c=<category> (from a case study breadcrumb) scrolls to that group.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("c");
    if (c) document.getElementById(`g-${c}`)?.scrollIntoView({ block: "start" });
  }, []);

  const pick = (f: Filter) => {
    setFiltered(true);
    setFilter(f);
    const url = new URL(window.location.href);
    if (f === "all") url.searchParams.delete("d");
    else url.searchParams.set("d", f);
    url.searchParams.delete("c");
    window.history.replaceState(null, "", url);
  };

  const shown = groups.filter((g) => filter === "all" || g.track === filter);

  return (
    <div className="wk-lay">
      <div className="wk-side">
        {intro}
        {/* Filters and the domain rail stay in view from 1024px; the intro scrolls away. */}
        <div className="wk-stick">
          <FilterChips
            label="Filter projects"
            value={filter}
            onChange={pick}
            options={[
              { value: "all", label: "All", count: counts.all },
              { value: "cloud", label: "Cloud", count: counts.cloud, color: COLOR.cloud },
              { value: "devsecops", label: "DevSecOps", count: counts.devsecops, color: COLOR.devsecops },
            ]}
          />
          <SectionRail label="Domains" items={shown.map((g) => ({ id: `g-${g.slug}`, label: g.label, meta: pad(g.rows.length) }))} />
        </div>
      </div>
      <div className="wk" aria-live="polite">
        {shown.map((g, gi) => (
          <section key={g.slug} id={`g-${g.slug}`} className="wk-g" style={{ "--c": COLOR[g.track] } as React.CSSProperties} aria-labelledby={`gh-${g.slug}`}>
            <Reveal desktopOnly instant={filtered} delay={gi < 3 ? gi * 60 : 0}>
              <h2 className="wk-gh" id={`gh-${g.slug}`}>
                <span>{g.label.toUpperCase()}</span>
                <i aria-hidden="true" />
                <span aria-label={`${g.rows.length} labs`}>{pad(g.rows.length)}</span>
              </h2>
              <ul>
                {g.rows.map((r) => {
                  const inner = (
                    <>
                      <span className="no">{pad(r.no)}</span>
                      <b>
                        {r.title}
                        {r.featured ? <span className="sr-only"> (featured case study)</span> : null}
                      </b>
                      {r.live ? (
                        <span className="go" aria-hidden="true">
                          <Arrow />
                        </span>
                      ) : (
                        <span className="soon">SOON</span>
                      )}
                    </>
                  );
                  return (
                    <li key={r.slug}>
                      {r.live ? (
                        <Link className="wk-r" href={`/work/${r.slug}`} data-star={r.featured}>
                          {inner}
                        </Link>
                      ) : (
                        <div className="wk-r wk-off" data-star={r.featured}>
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </section>
        ))}
        {footer}
      </div>
    </div>
  );
}
