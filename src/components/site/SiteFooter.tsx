import Link from "next/link";
import { credit, profiles, site } from "@/lib/site";
import { FooterOrbit } from "./FooterOrbit";
import { ArrowUpIcon, GitHubIcon, LinkedInIcon, MediumIcon, TryHackMeIcon } from "./icons";

const PROFILE_ICONS = { GitHub: GitHubIcon, LinkedIn: LinkedInIcon, Medium: MediumIcon, TryHackMe: TryHackMeIcon } as const;

function Profiles() {
  return (
    <div className="ft-soc">
      {profiles.map(({ label, href }) => {
        const Icon = PROFILE_ICONS[label];
        return (
          <a key={label} className="ft-ic" href={href} target="_blank" rel="noopener" aria-label={`${label} (opens in a new tab)`} title={label}>
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}

// Plain anchor: the html element scrolls smoothly, and instantly under reduced motion (globals.css).
function BackToTop() {
  return (
    <a className="ft-up" href="#top" aria-label="Back to top">
      <ArrowUpIcon size={16} />
    </a>
  );
}

/**
 * Footer v3 (F1/F2): sign-off only. A hairline split by the KB orbit node,
 * then the mark and name, the four profiles and back to top, then the
 * copyright and credit. Page links live in the header, the email in Contact.
 */
export function SiteFooter() {
  return (
    <footer className="ft">
      <div className="ft-in">
        <div className="ft-dv" aria-hidden="true">
          <i />
          <FooterOrbit />
          <i />
        </div>
        <div className="ft-r1">
          <Link className="ft-id" href="/" aria-label={`${site.displayName}, home`}>
            <span className="ft-mk" aria-hidden="true">
              K<b>B</b>
            </span>
            {site.displayName}
          </Link>
          <div className="ft-rt">
            <Profiles />
            <BackToTop />
          </div>
        </div>
        <div className="ft-bar">
          <span className="ft-cpr">
            © {new Date().getFullYear()} {site.displayName}
          </span>
          <a className="ft-cred" href={credit.href} target="_blank" rel="noopener">
            BUILT BY <b>{credit.label.toUpperCase()}</b> ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
