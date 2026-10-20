import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { HowLoop } from "@/components/about/HowLoop";
import { Hologram } from "@/components/hologram/Hologram";
import { Credentials } from "@/components/home/AboutBlock";
import { LinkCapsule, PageKicker, Reveal } from "@/components/kit";
import { OrbitGlyph } from "@/components/site/OrbitGlyph";
import { DownloadIcon } from "@/components/site/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: "I'm Kachi, a cloud security and DevSecOps engineer. How I work, what I focus on, and the credentials behind it.",
  path: "/about",
});

// 06-about "Three disciplines". Lab counts come from site config.
const DISCIPLINES = [
  { href: "/work?d=cloud", c: "var(--color-sky)", title: "Cloud security", sub: "Identity, network, compute and storage on AWS", tag: `${site.cloudLabs} LABS` },
  { href: "/work?d=devsecops", c: "var(--color-mint)", title: "DevSecOps", sub: "CI/CD, supply chain, containers and IaC", tag: `${site.devsecopsLabs} LABS` },
  { href: "/writeups", c: "var(--color-lavender)", title: "AI security", sub: "LLM security, adversarial ML and AI risk", tag: "WRITEUPS" },
];

/** About page (06-about). Location is never stated (GOALS, Conflicts); work mode is remote or hybrid. */
export default function AboutPage() {
  return (
    <div className="ab-page">
      <section className="pg-hero ab-hero">
        <nav className="pg-crumb" aria-label="Breadcrumb">
          <span className="pg-crumb-i">
            <Link href="/">Home</Link>
          </span>
          <span className="pg-crumb-i">
            <i aria-hidden="true" />
            <span aria-current="page">About</span>
          </span>
        </nav>
        <PageKicker lead="03" label="ABOUT" />
        <h1 className="pg-h1">
          Hi, I’m <em>Kachi.</em>
        </h1>
        <p className="pg-lede">Onyedikachi Bernard Okoh in full. I’m a cloud security and DevSecOps engineer, working remote or hybrid.</p>
        <div className="ab-holo">
          <Hologram height={400} />
        </div>
        <div className="ab-intro">
          <p className="pg-p">
            I learn by doing. Every misconfiguration I find gets fixed, verified and written up, so the next engineer can follow the same path. My labs cover AWS identity, networking, compute and storage, and the full software delivery path from commit to container.
          </p>
          <p className="pg-p">
            Lately I’m going deeper into AI security: how language models get manipulated, how to test their robustness and how frameworks like MITRE ATLAS and the NIST AI RMF help teams manage the risk.
          </p>
        </div>
      </section>

      <section className="pg-sec" aria-labelledby="how-title">
        <Reveal desktopOnly>
          <h2 className="pg-h2" id="how-title">
            How I <em>work</em>
          </h2>
          <p className="ab-sub">One loop, run on every lab. Tap a step.</p>
          <HowLoop />
        </Reveal>
      </section>

      <section className="pg-sec" aria-labelledby="dsc-title">
        <Reveal desktopOnly>
          <h2 className="pg-h2" id="dsc-title">
            Three <em>disciplines</em>
          </h2>
        </Reveal>
        <div className="dsc">
          {DISCIPLINES.map((d, i) => (
            <Reveal key={d.title} desktopOnly delay={i * 60}>
              <Link href={d.href} style={{ "--c": d.c } as React.CSSProperties}>
                <OrbitGlyph dur="3.4s" width={18} />
                <span>
                  <b>{d.title}</b>
                  <span>{d.sub}</span>
                </span>
                <em>{d.tag}</em>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pg-sec ab-cred">
        <Reveal desktopOnly>
          <Credentials />
        </Reveal>
      </section>

      <section className="pg-sec ab-cta">
        <a href={site.resume} className="btn-p rim ab-cv">
          <span className="grain" aria-hidden="true" />
          <span className="pdisc" aria-hidden="true">
            <DownloadIcon size={15} stroke={1.9} />
          </span>
          <span className="ab-cv-l">Download résumé</span>
        </a>
        <LinkCapsule href="/contact" label="Get in touch" meta="OPEN TO ROLES AND PROJECTS" />
      </section>
    </div>
  );
}
