import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "./Providers";
import { Preloader } from "@/components/Preloader";

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
  title: "// DEECRYPT | Junior Pentester",
  description: "Junior Pentester & Security Researcher Portfolio",
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
          <Preloader />

          {/* Ambient Background Glows */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="glow-emerald top-1/4 left-1/4 opacity-0 dark:opacity-50 transition-opacity duration-700" />
            <div className="glow-emerald top-3/4 right-1/4 opacity-0 dark:opacity-30 transition-opacity duration-700" />
            {/* Light Mode subtle pearlescent glows */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-radial-[at_100%_0%] from-indigo-200/40 to-transparent rounded-full blur-3xl opacity-100 dark:opacity-0 transition-opacity duration-700 pointer-events-none mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-radial-[at_0%_100%] from-emerald-100/30 to-transparent rounded-full blur-3xl opacity-100 dark:opacity-0 transition-opacity duration-700 pointer-events-none mix-blend-multiply" />
          </div>

          <Navbar />
          
          <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-16 flex flex-col relative z-0">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}

