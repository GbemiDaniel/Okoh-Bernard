import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { StatusOrbit } from "@/components/contact/StatusOrbit";
import { PageKicker, Reveal } from "@/components/kit";
import { ArrowRightIcon, GitHubIcon, LinkedInIcon, MailIcon, MediumIcon } from "@/components/site/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: "Hiring for cloud security or DevSecOps, or want a second pair of eyes on a pipeline? Send me a note.",
  path: "/contact",
});

const handle = (url: string) => url.replace(/\/$/, "").split("/").pop();

// 07-contact "Or reach me directly". Every value comes from site.ts.
const DIRECT = [
  { label: "Email", sub: site.email, href: `mailto:${site.email}`, Icon: MailIcon },
  { label: "LinkedIn", sub: site.name, href: site.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", sub: `@${handle(site.github)}`, href: site.github, Icon: GitHubIcon },
  { label: "Medium", sub: site.mediumHandle, href: site.medium, Icon: MediumIcon },
];

/** Contact page (07-contact). */
export default function ContactPage() {
  return (
    <div className="co-page">
      <section className="pg-hero">
        <nav className="pg-crumb" aria-label="Breadcrumb">
          <span className="pg-crumb-i">
            <Link href="/">Home</Link>
          </span>
          <span className="pg-crumb-i">
            <i aria-hidden="true" />
            <span aria-current="page">Contact</span>
          </span>
        </nav>
        <PageKicker lead="04" label="CONTACT" />
        <h1 className="pg-h1">
          Let’s talk <em>security.</em>
        </h1>
        <p className="pg-lede">
          Hiring for cloud security or DevSecOps, or want a second pair of eyes on a pipeline? Send a note and I’ll get back to you.
        </p>
        <div className="sig">
          <StatusOrbit />
          <span className="sig-t">
            <small>STATUS · LIVE</small>
            <b>Open to new opportunities</b>
          </span>
          <svg className="sig-w" width="74" height="26" viewBox="0 0 74 26" aria-hidden="true">
            <path className="tr" d="M0 13 H22 L27 5 L32 21 L37 9 L41 13 H74" />
            <path className="hb" d="M0 13 H22 L27 5 L32 21 L37 9 L41 13 H74" pathLength={100} />
          </svg>
        </div>
      </section>

      <section className="pg-sec co-form" aria-label="Send a message">
        <Reveal desktopOnly delay={120} className="co-panel">
          <ContactForm />
        </Reveal>
      </section>

      <section className="pg-sec co-direct" aria-labelledby="direct-title">
        <h2 className="pg-lab" id="direct-title">
          OR REACH ME DIRECTLY
        </h2>
        <ul className="ct-rows">
          {DIRECT.map(({ label, sub, href, Icon }) => (
            <li key={label}>
              <a className="ct-row" href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <span className="i">
                  <Icon size={18} />
                </span>
                <span className="t">
                  <b>{label}</b>
                  <span>{sub}</span>
                </span>
                <span className="go">
                  <ArrowRightIcon size={15} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
