import { marked, type Token, type Tokens } from "marked";
import { CaseSectionHeading } from "@/components/kit";
import type { CaseStudy, Severity } from "@/lib/content";
import { Blocks, CodeBlock, DataTable, Inline } from "./Md";

// Section order follows the content file's own headings (HANDOFF 8b: "its body
// headings as the section order"). Each known heading gets its board component;
// anything else renders as prose in the same section style. Missing sections
// simply do not render, and numbering closes up.

const lex = (md: string) => marked.lexer(md);
const SEV = /^finding\s+(\d+)\s*\((high|medium|low)\)\s*:\s*(.+)$/i;
const sevClass = (s: string) => `sev-${s.toLowerCase()}`;

/** Splits tokens at h3 headings: [intro, ...{heading, tokens}] */
function bySubheading(tokens: Token[]) {
  const intro: Token[] = [];
  const subs: { heading: string; tokens: Token[] }[] = [];
  for (const t of tokens) {
    if (t.type === "heading" && (t as Tokens.Heading).depth === 3) subs.push({ heading: (t as Tokens.Heading).text, tokens: [] });
    else (subs.length ? subs[subs.length - 1].tokens : intro).push(t);
  }
  return { intro, subs };
}

function Findings({ md }: { md: string }) {
  const { intro, subs } = bySubheading(lex(md));
  return (
    <>
      <Blocks tokens={intro} />
      {subs.map((s, i) => {
        const m = s.heading.match(SEV);
        if (!m) {
          return (
            <div key={i}>
              <p className="pg-lab cs-sub">{s.heading.toUpperCase()}</p>
              <Blocks tokens={s.tokens} />
            </div>
          );
        }
        const [, no, sev, title] = m;
        // The board puts the offending policy above its finding card.
        const code = s.tokens.filter((t) => t.type === "code") as Tokens.Code[];
        const rest = s.tokens.filter((t) => t.type !== "code");
        return (
          <div key={i}>
            {code.map((c, j) => (
              <CodeBlock key={j} token={c} />
            ))}
            <article className="fd">
              <div className="fd-h">
                <span>FINDING {no.padStart(2, "0")}</span>
                <b className={sevClass(sev)}>{sev.toUpperCase()}</b>
              </div>
              <h3>{title}</h3>
              <Blocks tokens={rest} />
            </article>
          </div>
        );
      })}
    </>
  );
}

function Steps({ md }: { md: string }) {
  const { intro, subs } = bySubheading(lex(md));
  return (
    <>
      {intro.map((t, i) => {
        if (t.type !== "list" || !(t as Tokens.List).ordered) return <Blocks key={i} tokens={[t]} />;
        return (
          <ol key={i} className="stp">
            {(t as Tokens.List).items.map((it, j) => {
              // "**Traced the identity chain.** I followed ..." -> title + text
              const inline = it.tokens.flatMap((x) => (x as Tokens.Text).tokens ?? [x]);
              const first = inline[0];
              const hasTitle = first?.type === "strong";
              const title = hasTitle ? (first as Tokens.Strong).text.replace(/[.:]\s*$/, "") : null;
              const body = hasTitle ? inline.slice(1) : inline;
              return (
                <li key={j}>
                  <span className="n" aria-hidden="true">
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  <div>
                    {title ? <b>{title}</b> : null}
                    <p>
                      <Inline tokens={body} />
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        );
      })}
      {subs.map((s, i) => (
        <div key={i} className="cs-evidence">
          <p className="pg-lab cs-sub">{s.heading.replace(/ snippets$/i, "").toUpperCase()}</p>
          <Blocks tokens={s.tokens} />
        </div>
      ))}
    </>
  );
}

function TableSection({ md }: { md: string }) {
  return (
    <>
      {lex(md).map((t, i) => (t.type === "table" ? <DataTable key={i} token={t as Tokens.Table} /> : <Blocks key={i} tokens={[t]} />))}
    </>
  );
}

const SECTION: Record<string, (p: { md: string }) => React.ReactNode> = {
  "what i found": Findings,
  "what i did": Steps,
  "before and after": TableSection,
  validation: TableSection,
};

export function CaseBody({ cs }: { cs: CaseStudy }) {
  let n = 0;
  return (
    <>
      {Object.entries(cs.sections).map(([heading, md]) => {
        const key = heading.trim().toLowerCase();
        // The lesson renders as the quote from frontmatter; skip its prose duplicate.
        if (key === "what i learned" && cs.lesson) return null;
        if (!md.trim()) return null;
        const Render = SECTION[key];
        n += 1;
        const id = key.replace(/[^a-z0-9]+/g, "-");
        return (
          <section key={heading} className="pg-sec" aria-labelledby={`cs-${id}`}>
            <CaseSectionHeading index={n} title={heading} id={`cs-${id}`} />
            {Render ? <Render md={md} /> : <Blocks tokens={lex(md)} />}
          </section>
        );
      })}
    </>
  );
}

export const severityClass = (s: Severity) => sevClass(s);
