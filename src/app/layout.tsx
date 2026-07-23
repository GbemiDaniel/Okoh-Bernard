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
  title: {
    default: "Okoh Bernard | Pentester & Security Researcher",
    template: "%s | Okoh Bernard"
  },
  description: "Portfolio of Okoh Bernard Onyedikachi, a Security Analyst and Pentester specializing in web application security, offensive operations, and vulnerability research.",
  keywords: ["Okoh Bernard", "Pentester", "Security Researcher", "Cybersecurity Portfolio", "Offensive Security", "Ethical Hacking", "Bernard Onyedikachi"],
  authors: [{ name: "Okoh Bernard Onyedikachi" }],
  creator: "Okoh Bernard Onyedikachi",
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://okohbernard.com", // Placeholder: User can update this
    title: "Okoh Bernard | Pentester & Security Researcher",
    description: "Security Analyst and Pentester specializing in offensive security and vulnerability research.",
    siteName: "Okoh Bernard Portfolio",
    images: [
      {
        url: "/Palli-img 2.jpg",
        width: 1200,
        height: 630,
        alt: "Okoh Bernard | Pentester & Security Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Okoh Bernard | Pentester & Security Researcher",
    description: "Security Analyst and Pentester specializing in offensive security and vulnerability research.",
    images: ["/Palli-img 2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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

