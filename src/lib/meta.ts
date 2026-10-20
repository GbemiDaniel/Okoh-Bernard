import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Page metadata with matching share tags. Next replaces the root openGraph and
 * twitter objects per page rather than merging them, so a page that sets only
 * a title would share with the homepage's title and URL, and setting openGraph
 * here drops the inherited image, so the root share image
 * (app/opengraph-image.tsx) is named again.
 */
const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}, Cloud Security & DevSecOps Engineer` };

export function pageMeta({
  title,
  description,
  path,
  article,
}: {
  title: string;
  description: string;
  path: string;
  article?: { publishedTime?: string };
}): Metadata {
  const full = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: article ? "article" : "website",
      ...(article?.publishedTime ? { publishedTime: article.publishedTime } : {}),
      url: path,
      siteName: site.name,
      locale: "en_US",
      title: full,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: full, description, images: [image] },
  };
}
