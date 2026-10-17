import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudy } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug);
  return cs ? { title: cs.title, description: cs.lede } : {};
}

// Placeholder: the case study template (03-case-study) is built in stage 4.
export default async function CaseStudyPage({ params }: Props) {
  const cs = getCaseStudy((await params).slug);
  if (!cs) notFound();
  return (
    <article className="mx-auto max-w-read px-gutter pt-page-top">
      <h1>{cs.title}</h1>
      <p>{cs.lede}</p>
    </article>
  );
}
