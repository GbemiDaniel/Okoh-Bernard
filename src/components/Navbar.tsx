"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/certifications", label: "Certifications" },
  { href: "/projects", label: "Projects" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const getBrandText = () => {
    if (pathname === "/" || pathname === "") {
      return { mobile: "Pentester- Benard", desktop: "Pentest- Okoh Bernard" };
    }

    // Extract the first path segment
    const pathSegment = pathname.split('/')[1] || "";

    // Map long path names to shorter versions for the navbar
    const labelMap: Record<string, string> = {
      "certifications": "Certs",
      "projects": "Projects",
      "about": "About"
    };

    const label = labelMap[pathSegment.toLowerCase()] || (pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1));

    return {
      mobile: `Pentester's-${label}`,
      desktop: `Pentester's-${label}`
    };
  };

  const brand = getBrandText();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20 && !isScrolled) {
      setIsScrolled(true);
    } else if (latest <= 20 && isScrolled) {
      setIsScrolled(false);
    }
  });

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] max-w-4xl">
      <nav
        className={`flex items-center justify-between px-4 sm:px-6 py-3 rounded-full relative transition-all duration-300 ease-in-out ${isScrolled
            ? "backdrop-blur-2xl bg-white/60 dark:bg-base-dark/80 border border-gray-200 dark:border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
            : "backdrop-blur-md bg-white/30 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-inner"
          }`}
      >

        {/* Brand Container */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 shrink-0 z-50"
        >
          <Terminal className="w-5 h-5 text-accent-mint shrink-0" />
          <motion.span
            key={pathname} // Re-trigger animation on route change
            className="text-sm font-secondary font-medium tracking-tight bg-[linear-gradient(110deg,#059669,45%,#A7F3D0,55%,#059669)] dark:bg-[linear-gradient(110deg,#10B981,45%,#ECFDF5,55%,#10B981)] bg-[length:200%_100%] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -5 }}
            animate={{
              opacity: 1, y: 0,
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              opacity: { duration: 0.3 },
              y: { duration: 0.3 },
              backgroundPosition: {
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }
            }}
          >
            <span className="sm:hidden">{brand.mobile}</span>
            <span className="hidden sm:inline">{brand.desktop}</span>
          </motion.span>
        </Link>

        {/* Desktop Navigation Links & Theme Toggle */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-secondary text-sm transition-all duration-300 hover:-translate-y-[1px] ${pathname === item.href
                      ? "text-accent-mint font-medium"
                      : "text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pl-6 border-l border-gray-300 dark:border-white/10">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Hamburger Toggle & Theme Toggle (Hidden on Desktop) */}
        <div className="flex md:hidden items-center gap-2 z-50">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center p-2 text-gray-800 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu (Framer Motion) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 w-full mt-4 backdrop-blur-xl bg-white/90 dark:bg-base-dark/90 border border-gray-200 dark:border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-2xl md:hidden overflow-hidden origin-top"
            >
              <ul className="flex flex-col w-full text-center">
                {navItems.map((item) => (
                  <li key={item.href} className="w-full">
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 px-4 font-secondary text-base transition-colors rounded-xl ${pathname === item.href
                          ? "bg-accent-mint/10 text-accent-mint font-medium border border-accent-mint/20"
                          : "text-gray-800 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 dark:hover:text-white"
                        }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </header>
  );
}
