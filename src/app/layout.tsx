import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "./Providers";
import { PremiumLoader } from "@/components/PremiumLoader";
import { TerminalProvider } from "@/context/TerminalContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-secondary",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://okoh-bernard-portfolio.vercel.app"),
  title: {
    default: "Okoh Onyedikachi Bernard | Security Engineer",
    template: "%s |Okoh Onyedikachi Bernard"
  },
  description: "Cybersecurity professional specializing in Security Engineering, Penetration Testing, and AI Security. Explore my vulnerability assessments, architectural designs, and technical research.",
  keywords: [
    "Security Engineer",
    "Penetration Tester",
    "AI Security",
    "Cybersecurity Portfolio",
    "LLM Security",
    "Red Team",
    "Vulnerability Assessment"
  ],
  authors: [{ name: "Onyedikachi Bernard Okoh" }],
  creator: "Onyedikachi Bernard Okoh",
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://okoh-bernard-portfolio.vercel.app", // TODO: Update with actual deployment URL
    title: "Onyedikachi Bernard Okoh | Security Engineer",
    description: "Cybersecurity professional specializing in Security Engineering, Penetration Testing, and AI Security.",
    siteName: "Onyedikachi Bernard Okoh Portfolio",
    images: [
      {
        url: "/og-banner.png",
        width: 1672,
        height: 941,
        alt: "Onyedikachi Bernard Okoh - Security Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Onyedikachi Bernard Okoh | Security Engineer",
    description: "Cybersecurity professional specializing in Security Engineering, Penetration Testing, and AI Security.",
    images: ["/og-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col relative overflow-x-hidden bg-base-light dark:bg-base-dark text-foreground`}
      >
        <Providers attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Preloader overlay handles transition into the site */}
          <PremiumLoader />

          {/* Ambient Background Glows */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="glow-emerald top-1/4 left-1/4 opacity-0 dark:opacity-50 transition-opacity duration-700" />
            <div className="glow-emerald top-3/4 right-1/4 opacity-0 dark:opacity-30 transition-opacity duration-700" />
            {/* Light Mode subtle pearlescent glows */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-radial-[at_100%_0%] from-indigo-200/40 to-transparent rounded-full blur-3xl opacity-100 dark:opacity-0 transition-opacity duration-700 pointer-events-none mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-radial-[at_0%_100%] from-emerald-100/30 to-transparent rounded-full blur-3xl opacity-100 dark:opacity-0 transition-opacity duration-700 pointer-events-none mix-blend-multiply" />
          </div>

          {/* Wrap Navbar and Main in TerminalProvider */}
          <TerminalProvider>
            <Navbar />
            {/* SPACING FIX APPLIED HERE */}
            <main className="flex-1 w-full flex flex-col relative z-0">
              {children}
            </main>
          </TerminalProvider>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}

