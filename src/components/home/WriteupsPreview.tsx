import Link from "next/link";
import { Arrow, LinkCapsule, Reveal, SectionHeading } from "@/components/kit";
import type { Writeup } from "@/lib/content";
import { HUE } from "@/lib/home";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const monthYear = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;

/**
 * 3.6 Latest writeups (01 section 05, 00 section 05). Cards open the full
 * article on the site; each article links out to Medium.
 */
export function WriteupsPreview({ posts }: { posts: Writeup[] }) {
  return (
    <section id="writeups" className="hs" aria-labelledby="writeups-title">
      <div className="w">
        <div className="hs-head wu-head">
          <Reveal desktopOnly>
            <SectionHeading id="writeups-title" index={5} total={7} label="Writing" lead="Latest" accent="Writeups" breakBeforeAccent />
          </Reveal>
          <span className="wu-on" aria-hidden="true">
            READ ON SITE
          </span>
          <Reveal desktopOnly delay={120} className="wu-all-d">
            <LinkCapsule href="/writeups" label="All writeups" meta="FULL ARTICLES · ALSO ON MEDIUM" />
          </Reveal>
        </div>
        <div className="wu-grid">
          {posts.map((p, i) => (
            <Reveal key={p.slug} desktopOnly delay={i * 90} className={i === 0 ? "wu-cell wu-lead-cell" : "wu-cell"}>
              <Link className={i === 0 ? "wu lead" : "wu"} href={`/writeups/${p.slug}`} style={{ "--rgb": HUE[p.hue].rgb } as React.CSSProperties}>
                <span className="grain" aria-hidden="true" />
                <span className="wu-h">
                  <span style={{ color: HUE[p.hue].c }}>{p.area}</span>
                  <span className="wu-date">{monthYear(p.date)}</span>
                </span>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <span className="wu-f">
                  <span className="wu-go">
                    Read article
                    <Arrow />
                  </span>
                  <span className="wu-rd">{p.readMinutes} MIN READ</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="wu-all-m">
          <LinkCapsule href="/writeups" label="All writeups" meta="FULL ARTICLES · ALSO ON MEDIUM" />
        </div>
      </div>
    </section>
  );
}
