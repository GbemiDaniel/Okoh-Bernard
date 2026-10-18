import { ArrowLink, Reveal, SectionHeading } from "@/components/kit";
import { learningPaths, skillBadges } from "@/lib/credentials";
import { Motto } from "./Motto";

// Board icon and mono sub-label per credential (01 section 06).
const PATH_META: Record<string, { sub: string; icon: string }> = {
  "pre-security": { sub: "FOUNDATIONS", icon: "M5 12l4 4L19 6" },
  "cyber-101": { sub: "CORE CONCEPTS", icon: "M4 5h16v14H4zM8 10l3 3-3 3M13 16h4" },
  "jr-pentester": { sub: "OFFENSIVE TESTING", icon: "M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 12l6-6" },
  "security-engineer": { sub: "DEFENSIVE ENGINEERING", icon: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" },
  "ai-security": { sub: "AI & MODEL RISK", icon: "M9 4h6M12 4v3M6 9h12v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM10 13h.01M14 13h.01" },
};
const BADGE_ICON: Record<string, string> = {
  "network-and-system-security": "M4 4h6v6H4zM14 4h6v6h-6zM9 14h6v6H9zM7 10v2h10v-2M12 12v2",
  "software-security": "M8 6l-5 6 5 6M16 6l5 6-5 6",
  "ai-path": "M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z",
  "model-compromise": "M3 12h4l3-7 4 14 3-7h4",
};

const Glyph = ({ d, size }: { d: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Learning paths and skill badges (01, 00 section 06). Each links to its TryHackMe record. */
export function Credentials() {
  return (
    <div className="cx" id="credentials">
      <div className="cx-h">
        <span>CERTIFICATES &amp; BADGES</span>
        <span className="cx-iss">ISSUED BY TRYHACKME</span>
      </div>
      <div className="cx-sub">LEARNING PATHS</div>
      <ol className="cx-path">
        {learningPaths.map((p, i) => (
          <li key={p.id} className="cx-s">
            <a href={p.verifyUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} certificate, verify on TryHackMe`}>
              <span className="cx-node">
                <Glyph d={PATH_META[p.id].icon} size={15} />
              </span>
              <span className="cx-t">
                <b>{p.title}</b>
                <small>{PATH_META[p.id].sub}</small>
              </span>
              <span className="cx-no">{String(i + 1).padStart(2, "0")}</span>
            </a>
          </li>
        ))}
      </ol>
      <div className="cx-sub">SKILL BADGES</div>
      <ul className="cx-badges">
        {skillBadges.map((b, i) => (
          <li key={b.id} style={{ "--n": i } as React.CSSProperties}>
            <a className="cx-b" href={b.verifyUrl} target="_blank" rel="noopener noreferrer" aria-label={`${b.title} badge, verify on TryHackMe`}>
              <span className="cx-hex">
                <Glyph d={BADGE_ICON[b.id]} size={17} />
              </span>
              <span className="cx-bl">{b.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 3.7 About Me (01, 00 section 06). */
export function AboutBlock() {
  return (
    <section id="about" className="hs" aria-labelledby="about-title">
      <div className="w hs-2 hs-about">
        <div>
          <Reveal desktopOnly>
            <SectionHeading id="about-title" index={6} total={7} label="About" lead="About" accent="Me" />
          </Reveal>
          <Reveal desktopOnly delay={120} as="p" className="about-p">
            I&apos;m Kachi, a security engineer working across cloud security, DevSecOps and AI security. I learn by doing:
            every misconfiguration I find gets fixed, verified and written up so someone else can follow the same path.
          </Reveal>
          <Reveal desktopOnly delay={180}>
            <Motto />
          </Reveal>
          <Reveal desktopOnly delay={240} className="about-more about-more-d">
            <ArrowLink href="/about">More about me</ArrowLink>
          </Reveal>
        </div>
        <Reveal desktopOnly delay={200}>
          <Credentials />
          <div className="about-more about-more-m">
            <ArrowLink href="/about">More about me</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
