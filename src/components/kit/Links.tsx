import Link from "next/link";

const ARROW = "M2 8h11M9 4l4 4-4 4";

/** Two-arrow swap from the boards: the arrow slides out and a copy slides in on hover. */
export function Arrow({ size = 14, stroke = 1.8 }: { size?: number; stroke?: number }) {
  const svg = (
    <svg viewBox="0 0 16 16" width={size} height={size}>
      <path d={ARROW} stroke="currentColor" strokeWidth={stroke} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <span className="arr" aria-hidden="true" style={{ width: size, height: size }}>
      {svg}
      {svg}
    </span>
  );
}

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);

function Anchor({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  if (isExternal(href)) {
    return (
      <a className={className} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

/** Mint text link with a drawn underline (01 "Browse 17 DevSecOps labs", "More about me"). */
export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Anchor href={href} className="lnk">
      {children}
      <Arrow />
    </Anchor>
  );
}

/** Full-width pill with a mint go disc (01 "View all projects", "All writeups"). */
export function LinkCapsule({ href, label, meta }: { href: string; label: string; meta?: string }) {
  return (
    <Anchor href={href} className="all rim">
      <span className="grain" aria-hidden="true" />
      <span className="lbl">
        {label}
        {meta ? <span className="n">{meta}</span> : null}
      </span>
      <span className="go" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="15" height="15">
          <path d={ARROW} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Anchor>
  );
}
