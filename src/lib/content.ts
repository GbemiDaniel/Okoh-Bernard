import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Reads the Notion exports in content/. Case study frontmatter follows
// content/case-studies/the-overpowered-role.md, which is the schema reference.

const ROOT = path.join(process.cwd(), "content");

export const tracks = ["cloud", "devsecops"] as const;
export type Track = (typeof tracks)[number];

// Order and labels follow the work hub board (02-work). The cloud slugs come
// from HANDOFF section 8b; the DevSecOps slugs mirror the board's group labels.
export const categories = [
  { slug: "identity-access", track: "cloud", label: "Identity & access" },
  { slug: "network-perimeter", track: "cloud", label: "Network & perimeter" },
  { slug: "secure-compute", track: "cloud", label: "Secure compute" },
  { slug: "storage-data", track: "cloud", label: "Storage & data" },
  { slug: "build-cicd", track: "devsecops", label: "Build & CI/CD" },
  { slug: "supply-chain", track: "devsecops", label: "Software supply chain" },
  { slug: "containers-kubernetes", track: "devsecops", label: "Containers & Kubernetes" },
  { slug: "infrastructure-as-code", track: "devsecops", label: "Infrastructure as code" },
] as const;
export type Category = (typeof categories)[number]["slug"];

export type Severity = "High" | "Medium" | "Low";

export type CaseStudy = {
  slug: string;
  title: string;
  track: Track;
  category: Category;
  caseNumber: number;
  breadcrumb?: string[];
  kicker: string;
  lede: string;
  platformTags: string[];
  status: string;
  meta: { domain: string; platform: string; severity: Severity; outcome: string };
  result: { before: string; after: string };
  tools?: string[];
  skills: string[];
  lesson: string;
  /** null while the real repo URL is still a placeholder */
  repo: string | null;
  previous?: string;
  next?: string;
  source?: string;
  /** Raw markdown body, and the same body split by its ## headings */
  body: string;
  sections: Record<string, string>;
};

export type Writeup = {
  slug: string;
  title: string;
  area: string;
  summary: string;
  /** YYYY-MM, as shown on the cards */
  date: string;
  readMinutes: number;
  mediumUrl: string;
  tags?: string[];
  cover?: string;
  body: string;
  sections: Record<string, string>;
};

function readDir(dir: string) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      return { file: `${dir}/${file}`, data: data as Record<string, unknown>, body: content.trim() };
    });
}

function splitSections(body: string) {
  const sections: Record<string, string> = {};
  const parts = body.split(/^## +/m).slice(1);
  for (const part of parts) {
    const nl = part.indexOf("\n");
    const heading = (nl === -1 ? part : part.slice(0, nl)).trim();
    sections[heading] = nl === -1 ? "" : part.slice(nl + 1).trim();
  }
  return sections;
}

function need(file: string, data: Record<string, unknown>, keys: string[]) {
  const missing = keys.filter((k) => data[k] === undefined || data[k] === null || data[k] === "");
  if (missing.length) throw new Error(`${file}: missing frontmatter ${missing.join(", ")}`);
}

// A value like https://github.com/OnyedikachiO/<lab-repo> is a placeholder, not a link.
const realUrl = (v: unknown) => (typeof v === "string" && /^https?:\/\//.test(v) && !/[<>]/.test(v) ? v : null);

let caseCache: CaseStudy[] | null = null;

export function getCaseStudies(): CaseStudy[] {
  if (caseCache) return caseCache;
  const items = readDir("case-studies").map(({ file, data, body }) => {
    need(file, data, ["slug", "title", "track", "category", "caseNumber", "kicker", "lede", "platformTags", "status", "meta", "result", "skills", "lesson"]);
    if (!tracks.includes(data.track as Track)) throw new Error(`${file}: unknown track "${data.track}"`);
    if (!categories.some((c) => c.slug === data.category)) throw new Error(`${file}: unknown category "${data.category}"`);
    return { ...(data as Omit<CaseStudy, "repo" | "body" | "sections">), repo: realUrl(data.repo), body, sections: splitSections(body) };
  });
  const order = (c: CaseStudy) => categories.findIndex((x) => x.slug === c.category);
  caseCache = items.sort((a, b) => order(a) - order(b) || a.caseNumber - b.caseNumber);
  return caseCache;
}

export function getCaseStudy(slug: string) {
  return getCaseStudies().find((c) => c.slug === slug) ?? null;
}

let writeupCache: Writeup[] | null = null;

export function getWriteups(): Writeup[] {
  if (writeupCache) return writeupCache;
  const items = readDir("writeups").map(({ file, data, body }) => {
    need(file, data, ["slug", "title", "area", "summary", "date", "readMinutes", "mediumUrl"]);
    return { ...(data as Omit<Writeup, "body" | "sections">), body, sections: splitSections(body) };
  });
  writeupCache = items.sort((a, b) => b.date.localeCompare(a.date));
  return writeupCache;
}

export function getWriteup(slug: string) {
  return getWriteups().find((w) => w.slug === slug) ?? null;
}
