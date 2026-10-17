import type { Metadata } from "next";
import Link from "next/link";
import { getWriteups } from "@/lib/content";

export const metadata: Metadata = { title: "Writeups" };

// Placeholder: the writeups list (04-writeups) is built in stage 5.
export default function WriteupsPage() {
  const posts = getWriteups();
  return (
    <section className="mx-auto max-w-read px-gutter pt-page-top">
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/writeups/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
