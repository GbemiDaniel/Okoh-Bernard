import Link from "next/link";
import { nav, site } from "@/lib/site";

// Placeholder shell. Stage 1 replaces it with the mobile header (logo,
// résumé pill, pages menu) and the desktop header (pill nav with lens) from
// 01-home-mobile and 00-home-desktop.
export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-4.5 py-2.5">
      <Link href="/" aria-label={`${site.shortName}, home`} className="flex min-h-11 items-center font-extrabold">
        KB
      </Link>
      <nav aria-label="Pages" className="hidden gap-6 md:flex">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="text-ink-muted hover:text-ink">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
