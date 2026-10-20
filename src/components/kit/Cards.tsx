import Link from "next/link";

type GlassProps = {
  children: React.ReactNode;
  /** RGB channels for the edge and corner tint, e.g. "196 181 253" for AI. Defaults to mint. */
  rgb?: string;
  rim?: boolean;
  href?: string;
  className?: string;
};

/** Edge-lit glass card with grain (01 .wu, .op, .fx-t). Renders a link when `href` is set. */
export function GlassCard({ children, rgb, rim = false, href, className = "" }: GlassProps) {
  const cls = `glass ${rim ? "rim" : ""} ${className}`;
  const style = rgb ? ({ "--rgb": rgb } as React.CSSProperties) : undefined;
  const body = (
    <>
      <span className="grain" aria-hidden="true" />
      {children}
    </>
  );
  return href ? (
    <Link href={href} className={cls} style={style}>
      {body}
    </Link>
  ) : (
    <div className={cls} style={style}>
      {body}
    </div>
  );
}

/** Flat hairline panel (03 finding card .fd). */
export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`panel ${className}`}>{children}</div>;
}

/** Lesson quote with the mint-to-lilac rule (03 "What I learned"). */
export function Quote({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <figure className="quote">
      <blockquote style={{ margin: 0 }}>
        <p>{children}</p>
      </blockquote>
      <footer>{caption}</footer>
    </figure>
  );
}
