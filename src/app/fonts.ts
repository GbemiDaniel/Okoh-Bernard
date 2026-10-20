import { Caveat, Geist, Geist_Mono } from "next/font/google";

// Geist + Geist Mono per 08-type-geist. Caveat is only for the motto.
// Variable fonts: the desktop hero name is set at weight 750.

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-caveat",
  display: "swap",
});

export const fontVariables = `${geist.variable} ${geistMono.variable} ${caveat.variable}`;
