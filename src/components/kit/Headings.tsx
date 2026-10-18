const pad = (n: number) => String(n).padStart(2, "0");

/** The small ring with a dot that marks a section's place on the page (01-home-mobile). */
function OrbitIndex({ index, total }: { index: number; total: number }) {
  const a = ((-90 + ((index - 1) * 360) / total) * Math.PI) / 180;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="11" r="8" fill="none" stroke="rgb(var(--mint-rgb) / .5)" />
      <circle cx={(11 + 8 * Math.cos(a)).toFixed(1)} cy={(11 + 8 * Math.sin(a)).toFixed(1)} r="2.6" fill="var(--color-mint)" />
    </svg>
  );
}

/** Just the mobile "07 / 07" orbit index, for sections whose title sits elsewhere (01 contact card). */
export function SectionIndex({ index, total }: { index: number; total: number }) {
  return (
    <div className="sh-idx">
      <OrbitIndex index={index} total={total} />
      <span>
        {pad(index)} / {pad(total)}
      </span>
    </div>
  );
}

/**
 * Section opener. Mobile: orbit index and "01 / 07" (01-home-mobile).
 * Desktop: "01" with a drawn rule and a mono label (00-home-desktop).
 * The accent word is mint; pass `gradient` only for "Let's Work Together".
 */
export function SectionHeading({
  index,
  total,
  label,
  lead,
  accent,
  breakBeforeAccent = false,
  gradient = false,
  lede,
  id,
  as: Tag = "h2",
}: {
  id?: string;
  index: number;
  total: number;
  label: string;
  lead: string;
  accent: string;
  breakBeforeAccent?: boolean;
  gradient?: boolean;
  lede?: React.ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div>
      <div className="sh-idx">
        <OrbitIndex index={index} total={total} />
        <span>
          {pad(index)} / {pad(total)}
        </span>
      </div>
      <div className="sh-k">
        <span>{pad(index)}</span>
        <i aria-hidden="true" />
        <span>{label.toUpperCase()}</span>
      </div>
      <Tag className="sh-title" id={id}>
        {lead}
        {breakBeforeAccent ? <br /> : " "}
        {gradient ? <span className="grad">{accent}</span> : <em>{accent}</em>}
      </Tag>
      {lede ? <p className="sh-lede">{lede}</p> : null}
    </div>
  );
}

/** Inner page kicker above the h1, e.g. "CASE 02 ── IDENTITY & ACCESS" (03-case-study). */
export function PageKicker({ lead, label }: { lead: string; label: string }) {
  return (
    <div className="pg-k">
      <span>{lead}</span>
      <i aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

/** Numbered section head inside a case study, e.g. "01 Objective" (03-case-study). */
export function CaseSectionHeading({ index, title, id }: { index: number; title: string; id?: string }) {
  return (
    <div className="cs-sh">
      <span>{pad(index)}</span>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
