import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { site } from "@/lib/site";

const title = `${site.name} | Cloud Security & DevSecOps Engineer`;
// The hero line from 01-home-mobile.
const description =
  "Cloud security and DevSecOps engineer. I find the misconfiguration, prove the risk, fix it and validate the fix.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description,
  keywords: ["Cloud Security", "DevSecOps", "AWS Security", "AI Security", "Security Engineer", "Portfolio"],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title,
    description,
    siteName: site.name,
    images: [{ url: "/og-banner.png", width: 1672, height: 941, alt: `${site.name}, security engineer` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#070f1c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="relative flex min-h-dvh flex-col bg-bg font-sans text-ink antialiased">
        <noscript>
          <style>{".rv,.rv-lg{opacity:1!important;transform:none!important;filter:none!important}"}</style>
        </noscript>
        <div id="top" className="absolute top-0" aria-hidden="true" />
        <SiteHeader />
        <main className="flex w-full flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
