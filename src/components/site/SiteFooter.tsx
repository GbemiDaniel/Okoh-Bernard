import { site } from "@/lib/site";

// Placeholder shell. Stage 1 replaces it with the ridge footer and footer card
// from 01-home-mobile (mobile) and 00-home-desktop (desktop).
export function SiteFooter() {
  return (
    <footer className="mt-section bg-mountain-near px-gutter py-6">
      <p className="text-caption text-ink-550">
        © {new Date().getFullYear()} {site.displayName}. All rights reserved.
      </p>
    </footer>
  );
}
