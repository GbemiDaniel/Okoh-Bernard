import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = { title: "Work" };

// Placeholder: the work hub (02-work) is built in stage 4.
export default function WorkPage() {
  const labs = getCaseStudies();
  return (
    <section className="mx-auto max-w-read px-gutter pt-page-top">
      <ul>
        {labs.map((lab) => (
          <li key={lab.slug}>
            <Link href={`/work/${lab.slug}`}>{lab.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
