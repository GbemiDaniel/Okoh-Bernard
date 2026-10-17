import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWriteup, getWriteups } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getWriteups().map((w) => ({ slug: w.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const w = getWriteup((await params).slug);
  return w ? { title: w.title, description: w.summary } : {};
}

// Placeholder: the article template (05-article) is built in stage 5.
export default async function ArticlePage({ params }: Props) {
  const w = getWriteup((await params).slug);
  if (!w) notFound();
  return (
    <article className="mx-auto max-w-read px-gutter pt-page-top">
      <h1>{w.title}</h1>
    </article>
  );
}
