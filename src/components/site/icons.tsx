// Icon paths copied from the boards' inline SVGs (24px grid, round stroke).

type IconProps = { size?: number; stroke?: number; className?: string };

function make(d: string, defaultStroke = 1.7) {
  return function Icon({ size = 18, stroke = defaultStroke, className }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d={d} stroke="currentColor" strokeWidth={stroke} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };
}

export const DownloadIcon = make("M12 4v11M7 11l5 5 5-5M5 20h14", 2);
export const ArrowRightIcon = make("M5 12h14M13 6l6 6-6 6", 2);
export const ArrowUpIcon = make("M12 19V5M6 11l6-6 6 6", 2);
export const MailIcon = make("M3 6h18v12H3zM4 7l8 6 8-6");
export const GitHubIcon = make(
  "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2",
);
export const LinkedInIcon = make("M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM6 4a2 2 0 1 1-4 0 2 2 0 1 1 4 0z");
export const MediumIcon = make("M2 12a5.5 5.5 0 1 0 11 0 5.5 5.5 0 1 0-11 0zM15 12c0 3 1.1 5.4 2.5 5.4S20 15 20 12s-1.1-5.4-2.5-5.4S15 9 15 12zM22.5 7v10");
