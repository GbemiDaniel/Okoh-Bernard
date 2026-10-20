import { marked, type Token, type Tokens } from "marked";
import { CodeBlock, DataTable, Inline } from "@/components/case/Md";

// Article body (05-article .prose). Renders marked tokens to React, no raw
// HTML. ## headings get anchors for the contents list and the desktop rail.

const plain = (s: string) => s.replace(/[*_`]/g, "").trim();

function slugger() {
  const seen = new Map<string, number>();
  return (text: string) => {
    const base = "s-" + plain(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  };
}

/** The article's main sections (## headings) in order, with their anchor ids. */
export function articleSections(body: string) {
  const id = slugger();
  return marked
    .lexer(body)
    .filter((t): t is Tokens.Heading => t.type === "heading" && (t as Tokens.Heading).depth === 2)
    .map((h) => ({ id: id(h.text), label: plain(h.text) }));
}

/** A list item's children: inline text, paragraphs (loose lists), nested lists, code. */
function Item({ tokens }: { tokens: Token[] }) {
  return (
    <>
      {tokens.map((t, i) => {
        if (t.type === "text") return <Inline key={i} tokens={(t as Tokens.Text).tokens ?? [t]} />;
        if (t.type === "paragraph") return <Inline key={i} tokens={(t as Tokens.Paragraph).tokens} />;
        if (t.type === "list") return <List key={i} token={t as Tokens.List} />;
        if (t.type === "code") return <CodeBlock key={i} token={t as Tokens.Code} />;
        return null;
      })}
    </>
  );
}

function List({ token }: { token: Tokens.List }) {
  const Tag = token.ordered ? "ol" : "ul";
  return (
    <Tag start={token.ordered && token.start !== 1 && token.start !== "" ? Number(token.start) : undefined}>
      {token.items.map((it, j) => (
        <li key={j}>
          <Item tokens={it.tokens} />
        </li>
      ))}
    </Tag>
  );
}

const SHIELD = "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7zM12 8v5M12 16h.01";

export function Prose({ body }: { body: string }) {
  const id = slugger();
  return (
    <div className="prose">
      {marked.lexer(body).map((t, i) => {
        switch (t.type) {
          case "heading": {
            const h = t as Tokens.Heading;
            if (h.depth === 2)
              return (
                <h2 key={i} id={id(h.text)}>
                  <Inline tokens={h.tokens} />
                </h2>
              );
            const Tag = h.depth === 3 ? "h3" : "h4";
            return (
              <Tag key={i}>
                <Inline tokens={h.tokens} />
              </Tag>
            );
          }
          case "paragraph":
            return (
              <p key={i}>
                <Inline tokens={(t as Tokens.Paragraph).tokens} />
              </p>
            );
          case "list":
            return <List key={i} token={t as Tokens.List} />;
          case "blockquote":
            // Medium notes ("Architectural Note: ...") read as the board's callout.
            return (
              <div key={i} className="callout">
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={SHIELD} stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  {(t as Tokens.Blockquote).tokens.map((q, j) =>
                    q.type === "paragraph" ? (
                      <p key={j}>
                        <Inline tokens={(q as Tokens.Paragraph).tokens} />
                      </p>
                    ) : null,
                  )}
                </div>
              </div>
            );
          case "code":
            return <CodeBlock key={i} token={t as Tokens.Code} />;
          case "table":
            return <DataTable key={i} token={t as Tokens.Table} />;
          case "hr":
            return <hr key={i} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
