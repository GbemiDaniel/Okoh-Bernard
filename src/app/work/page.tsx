import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { Suspense } from "react";
import { LinkCapsule, PageKicker } from "@/components/kit";
import { WorkHub, WorkHubFromUrl, type HubGroup } from "@/components/work/WorkHub";
import { categories, getCaseStudies } from "@/lib/content";
import { featured } from "@/lib/home";
import { labs } from "@/lib/labs";

export const metadata: Metadata = pageMeta({
  title: "Work",
  description: "Every cloud security and DevSecOps lab I have documented, from the first finding to the validated fix.",
  path: "/work",
});

const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const TEENS = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
function words(n: number) {
  if (n < 10) return ONES[n];
  if (n < 20) return TEENS[n - 10];
  return TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : "");
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function WorkPage() {
  const live = new Set(getCaseStudies().map((c) => c.slug));
  const star = new Set(featured.map((f) => f.slug));
  const groups: HubGroup[] = categories
    .map((c) => ({
      slug: c.slug,
      label: c.label,
      track: c.track,
      rows: labs.filter((l) => l.category === c.slug).map((l) => ({ ...l, live: live.has(l.slug), featured: star.has(l.slug) })),
    }))
    .filter((g) => g.rows.length);
  const trackOf = (slug: string) => categories.find((c) => c.slug === slug)?.track;
  const counts = {
    all: labs.length,
    cloud: labs.filter((l) => trackOf(l.category) === "cloud").length,
    devsecops: labs.filter((l) => trackOf(l.category) === "devsecops").length,
  };

  const intro = (
    <>
      <nav className="pg-crumb" aria-label="Breadcrumb">
        <span className="pg-crumb-i">
          <Link href="/">Home</Link>
        </span>
        <span className="pg-crumb-i">
          <i aria-hidden="true" />
          <span aria-current="page">Work</span>
        </span>
      </nav>
      <PageKicker lead="01" label="ALL PROJECTS" />
      <h1 className="pg-h1">
        {cap(words(labs.length))} labs.
        <br />
        <em>Every fix proven.</em>
      </h1>
      <p className="pg-lede">
        Each lab follows the same arc: find the misconfiguration, prove the risk, fix it and confirm the fix held. Filter by discipline, then open any lab for the full case study.
      </p>
    </>
  );
  const footer = (
    <div className="wk-ft">
      <span>
        <i aria-hidden="true" />
        FEATURED CASE STUDY
      </span>
      <span>{groups.length} DOMAINS</span>
    </div>
  );
  const hub = { groups, counts, intro, footer };

  return (
    <div className="wk-page">
      <section className="pg-hero wk-hero">
        <Suspense fallback={<WorkHub {...hub} />}>
          <WorkHubFromUrl {...hub} />
        </Suspense>
      </section>
      <section className="pg-sec">
        <LinkCapsule href="/writeups" label="Read the writeups" meta="AI SECURITY · IAM · CRYPTOGRAPHY" />
      </section>
    </div>
  );
}
