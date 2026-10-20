import type { MetadataRoute } from "next";
import { getCaseStudies } from "@/lib/content";
import { site } from "@/lib/site";

// Writeups are left out: their canonical is the Medium original.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/writeups", "/about", "/contact"].map((p) => ({ url: `${site.url}${p}` }));
  const cases = getCaseStudies().map((c) => ({ url: `${site.url}/work/${c.slug}` }));
  return [...pages, ...cases];
}
