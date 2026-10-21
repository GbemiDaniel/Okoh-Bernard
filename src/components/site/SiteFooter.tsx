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
 * Footer v4: one sign-off. The KB orbit divider sits above a single bar:
 * copyright and credit, with the four profiles and back to top. The name
 * and mark are not repeated here (the header carries them) and the divider
 * replaces the hairline that used to sit above the bar.
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
        <div className="ft-bar">
          <span className="ft-cpr">
            © {new Date().getFullYear()} {site.displayName}
          </span>
          <a className="ft-cred" href={credit.href} target="_blank" rel="noopener">
            BUILT BY <b>{credit.label.toUpperCase()}</b> ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <div className="ft-rt">
            <Profiles />
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
