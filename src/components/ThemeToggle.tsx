"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  // This prevents hydration mismatch errors
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-full glass-panel w-9 h-9 flex items-center justify-center opacity-50 cursor-default">
         <span className="w-4 h-4 rounded-full bg-white/20 animate-pulse" />
      </button>
    );
  }

  const isDark = theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={(e) => e.preventDefault()} // Disabled for now
      className="p-2 rounded-full glass-panel flex items-center justify-center transition-all duration-300 opacity-50 cursor-not-allowed border-white/10"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-accent-mint hover:text-white transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-500 hover:text-indigo-700 transition-colors" />
      )}
    </button>
  );
}
