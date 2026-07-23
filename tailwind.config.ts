import type { Config } from "tailwindcss";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        base: {
          dark: "#050806",
          light: "#f1f5f9",
        },
        accent: {
          emerald: "#00f098",
          mint: "#2dd4bf",
        },
      },
      fontFamily: {
        primary: ["var(--font-primary)", "sans-serif"],
        secondary: ["var(--font-secondary)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      keyframes: {
        "ping-pong": {
          "0%, 100%": { transform: "translateX(5%)" },
          "50%": { transform: "translateX(-15%)" },
        }
      },
      animation: {
        "ping-pong": "ping-pong 4s ease-in-out infinite",
      }
    },
  },
  plugins: [],
};

export default config;
