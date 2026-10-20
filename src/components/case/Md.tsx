import type { Token, Tokens } from "marked";

// Renders marked tokens to React elements (no raw HTML from content files).

export function Inline({ tokens }: { tokens?: Token[] }) {
  if (!tokens) return null;
  return (
    <>
      {tokens.map((t, i) => {
        switch (t.type) {
          case "strong":
            return <strong key={i}><Inline tokens={(t as Tokens.Strong).tokens} /></strong>;
          case "em":
            return <em key={i}><Inline tokens={(t as Tokens.Em).tokens} /></em>;
          case "codespan":
            return <code key={i} className="ic">{decode((t as Tokens.Codespan).text)}</code>;
          case "link": {
            const l = t as Tokens.Link;
            const ext = /^https?:/.test(l.href);
            return (
              <a key={i} href={l.href} className="il" {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Inline tokens={l.tokens} />
              </a>
            );
          }
          case "br":
            return <br key={i} />;
          case "text": {
            const tt = t as Tokens.Text;
            return tt.tokens ? <Inline key={i} tokens={tt.tokens} /> : <span key={i}>{decode(tt.text)}</span>;
          }
          case "escape":
            return <span key={i}>{(t as Tokens.Escape).text}</span>;
          default:
            return <span key={i}>{decode((t as { raw: string }).raw)}</span>;
        }
      })}
    </>
  );
}

// marked escapes entities in text tokens; content is plain text, so turn them back.
function decode(s: string) {
  return s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

/** Parses a fence info string like `json file=Policy.json flag=WILDCARD` or `json clean`. */
export function fenceInfo(lang?: string) {
  const parts = (lang ?? "").trim().split(/\s+/).filter(Boolean);
  const out: { lang: string; file?: string; flag?: string; clean?: boolean } = { lang: (parts[0] ?? "").toLowerCase() };
  for (const p of parts.slice(1)) {
    const [k, ...v] = p.split("=");
    if (k === "file") out.file = v.join("=");
    // Underscores stand in for spaces: flag=IGW_ROUTE shows as "IGW ROUTE".
    if (k === "flag") out.flag = v.join("=").replace(/_/g, " ");
    // `clean`: a remediated policy, so do not mark wildcards as problems.
    if (k === "clean") out.clean = true;
  }
  return out;
}

const WILDCARD = /^"(\*|[a-z0-9-]+:\*)"$/i;

function highlightJson(code: string, markWildcards = true) {
  const out: React.ReactNode[] = [];
  const re = /"(?:\\.|[^"\\])*"(\s*:)?/g;
  let last = 0, m: RegExpExecArray | null, i = 0;
  while ((m = re.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const str = m[1] ? m[0].slice(0, m[0].length - m[1].length) : m[0];
    const cls = m[1] ? "tk" : markWildcards && WILDCARD.test(str) ? "tw" : "ts";
    out.push(
      <span key={i++} className={cls}>
        {str}
      </span>,
    );
    if (m[1]) out.push(m[1]);
    last = m.index + m[0].length;
  }
  out.push(code.slice(last));
  return out;
}

function highlightShell(code: string) {
  return code.split("\n").map((line, i, all) => (
    <span key={i}>
      {/^\s*#/.test(line) ? <span className="tc">{line}</span> : line}
      {i < all.length - 1 ? "\n" : null}
    </span>
  ));
}

export function CodeBlock({ token }: { token: Tokens.Code }) {
  const info = fenceInfo(token.lang);
  const body = info.lang === "json" ? highlightJson(token.text, !info.clean) : ["bash", "sh", "shell"].includes(info.lang) ? highlightShell(token.text) : token.text;
  const label = info.file ?? (info.lang ? info.lang.toUpperCase() : "CODE");
  return (
    <figure className="code">
      <figcaption className="code-h">
        <span>{label}</span>
        {info.flag ? <b>{info.flag}</b> : null}
      </figcaption>
      <pre tabIndex={0}>
        <code>{body}</code>
      </pre>
    </figure>
  );
}

/** Colour cells the way the board does: "Before" column red, "After" mint, PASS mint, FAIL red. */
export function DataTable({ token }: { token: Tokens.Table }) {
  const heads = token.header.map((h) => h.text.trim().toLowerCase());
  const colClass = (ci: number, text: string) => {
    const v = text.trim().toUpperCase();
    if (v === "PASS") return "a";
    if (v === "FAIL") return "b";
    if (heads[ci] === "before") return "b";
    if (heads[ci] === "after") return "a";
    return undefined;
  };
  return (
    <div className="ba-wrap" tabIndex={0} role="region" aria-label="Table">
      <table className="ba">
        <thead>
          <tr>
            {token.header.map((h, i) => (
              <th key={i} scope="col">
                {h.text.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {token.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) =>
                ci === 0 ? (
                  <th key={ci} scope="row">
                    <Inline tokens={cell.tokens} />
                  </th>
                ) : (
                  <td key={ci} className={colClass(ci, cell.text)}>
                    <Inline tokens={cell.tokens} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Any block tokens, in the case study's prose style. */
export function Blocks({ tokens }: { tokens: Token[] }) {
  return (
    <>
      {tokens.map((t, i) => {
        switch (t.type) {
          case "paragraph":
            return (
              <p key={i} className="pg-p">
                <Inline tokens={(t as Tokens.Paragraph).tokens} />
              </p>
            );
          case "code":
            return <CodeBlock key={i} token={t as Tokens.Code} />;
          case "table":
            return <DataTable key={i} token={t as Tokens.Table} />;
          case "list": {
            const l = t as Tokens.List;
            const Tag = l.ordered ? "ol" : "ul";
            return (
              <Tag key={i} className={l.ordered ? "cl cl-o" : "cl"}>
                {l.items.map((it, j) => (
                  <li key={j}>
                    {l.ordered ? <span className="cl-n">{String(j + 1).padStart(2, "0")}</span> : null}
                    <span>
                      <Inline tokens={it.tokens.flatMap((x) => ((x as Tokens.Text).tokens ? (x as Tokens.Text).tokens! : [x]))} />
                    </span>
                  </li>
                ))}
              </Tag>
            );
          }
          case "heading":
            return (
              <p key={i} className="pg-lab cs-sub">
                {(t as Tokens.Heading).text.toUpperCase()}
              </p>
            );
          case "space":
          case "hr":
            return null;
          default:
            return null;
        }
      })}
    </>
  );
}
