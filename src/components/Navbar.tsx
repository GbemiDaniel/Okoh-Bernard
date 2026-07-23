"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useTerminal } from "@/context/TerminalContext";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Expertise ▾",
    subLinks: [
      { href: "/security-engineering", label: "Security Engineering" },
      { href: "/penetration-testing", label: "Penetration Testing" },
      { href: "/ai-security", label: "AI Security" },
    ]
  },
  { href: "/projects", label: "Projects" },
  { href: "/certifications", label: "Certifications" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.2 } }
};

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Check if current path belongs to the Expertise category
  const isExpertiseActive =
    pathname === '/security-engineering' ||
    pathname === '/penetration-testing' ||
    pathname === '/ai-security';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpertiseOpen, setIsExpertiseOpen] = useState(false);

  const { activeSection } = useTerminal();

  const [displayText, setDisplayText] = useState("");
  const [homeIndex, setHomeIndex] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  // The sequence for the top of the homepage
  const homeSequence = ["Welcome", "I'm Kachi", "Scroll for more "];

  useEffect(() => {
    if (activeSection === null && pathname === "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHomeIndex(0);
    }
  }, [activeSection, pathname]);

  // 1. Determine the ultimate target string based on hierarchy
  let targetText = "";
  if (activeSection) {
    targetText = activeSection;
  } else if (pathname !== "/") {
    targetText = pathname.replace("/", "");
  } else {
    // Only access the array safely
    targetText = homeSequence[homeIndex] || homeSequence[0];
  }

  // 2. Continuous State Machine (Backspace & Type)
  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Condition A: We have reached the exact target text
    if (displayText === targetText) {
      // If we are doing the homepage intro sequence and haven't finished, queue the next word
      if (!activeSection && pathname === "/" && homeIndex < homeSequence.length - 1) {
        timer = setTimeout(() => {
          setHomeIndex(prev => prev + 1);
        }, 1500); // Pause for 1.5s so the user can read it before deleting
      }
      return () => clearTimeout(timer);
    }

    // Condition B: Transition Logic with Dynamic Speeds
    const isPrefix = targetText.startsWith(displayText);

    // Is this the slow intro sequence?
    const isIntro = !activeSection && pathname === "/";

    // Intro sequence needs authentic slow typing. Everything else (scrolling) goes into overdrive.
    const typeSpeed = isIntro ? 70 : 25;
    const backspaceSpeed = isIntro ? 35 : 10;

    if (isPrefix) {
      // Only type if we haven't reached the target
      if (displayText !== targetText) {
        timer = setTimeout(() => {
          setDisplayText(targetText.substring(0, displayText.length + 1));
        }, typeSpeed);
      }
    } else {
      // Rapid backspace
      timer = setTimeout(() => {
        setDisplayText(displayText.substring(0, displayText.length - 1));
      }, backspaceSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, targetText, activeSection, pathname, homeIndex, homeSequence.length]);

  // NEW: Calculate text overflow and apply panning animation
  useEffect(() => {
    if (textRef.current) {
      // Only measure and animate if the typewriter is fully finished typing the target text
      if (displayText === targetText) {
        const scrollWidth = textRef.current.scrollWidth;
        // Measure against the parent container's width instead of the span's width
        const clientWidth = textRef.current.parentElement?.clientWidth || textRef.current.clientWidth;
        const overflow = scrollWidth - clientWidth;

        if (overflow > 0) {
          // It's too long! Set the slide distance and trigger the animation
          textRef.current.style.setProperty('--overflow-distance', `-${overflow}px`);
          textRef.current.classList.add('animate-terminal-scroll');
        }
      } else {
        // While typing, ensure it resets to the start and doesn't animate
        textRef.current.classList.remove('animate-terminal-scroll');
        textRef.current.style.transform = 'translateX(0px)';
      }
    }
  }, [displayText, targetText]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Background Scroll Locking for Mobile Menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // NEW: Automate closing of mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="z-50 fixed top-0 w-full flex justify-center pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out relative z-50 ${isScrolled
          ? "backdrop-blur-md bg-white/90 dark:bg-black/60 border border-gray-200 dark:border-white/10 rounded-full py-3 px-6 md:px-8 lg:px-10 mt-4 w-[96%] max-w-6xl shadow-lg"
          : "bg-transparent border-transparent py-6 px-8 w-full max-w-7xl"
          }`}
      >
        {/* MAIN CONTAINER */}
        <div className="w-full flex items-center justify-between">

          {/* =========================================
              LEFT SIDE: Terminal + Separator
              ========================================= */}
          <div className="flex items-center shrink-0">
            <Link className="relative z-50 flex items-center group" href="/" onClick={() => setIsOpen(false)}>

              {/* THE RIGID PARKING SPACE: Protects the right-side layout from shifting */}
              <div className="flex items-center w-37.5 sm:w-45 md:w-52.5 lg:w-60">

                {/* THE FLEX GROUP: Logo, Text, and Cursor hug each other naturally */}
                <div className="flex items-center max-w-full gap-1.5 font-mono text-xs sm:text-sm font-medium text-[#10B981] tracking-wide">
                  <Terminal className="w-5 h-5 text-[#10B981] shrink-0 group-hover:scale-110 transition-transform duration-200" />

                  {/* THE MASK: Grows with text, but shrinks if it hits the rigid boundary */}
                  <div className="overflow-hidden relative shrink min-w-0">
                    <span
                      ref={textRef}
                      className="text-gray-700 dark:text-gray-300 whitespace-nowrap inline-block transition-opacity duration-300"
                    >
                      {displayText}
                    </span>
                  </div>

                  <span className="w-0.5 h-[1.1em] bg-[#10B981] animate-blink block shrink-0 opacity-80"></span>
                </div>

              </div>
            </Link>

            {/* VISUAL SEPARATOR: Properly spaced from the terminal and the nav links */}
            <div className="hidden lg:block w-px h-5 bg-gray-300 dark:bg-white/20 ml-5 mr-2 lg:ml-8 lg:mr-4 shrink-0"></div>
          </div>

          {/* =========================================
              RIGHT SIDE: Navlinks + Partition + Toggle
              ========================================= */}
          <div className="flex items-center justify-end shrink-0">

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <ul className="flex items-center gap-5 xl:gap-7">
                {navItems.map((item) => (
                  <li key={item.label || item.href} className="relative group">
                    {item.subLinks ? (
                      <>
                        <span className={`cursor-default flex items-center gap-1 whitespace-nowrap font-secondary text-sm transition-all duration-200 py-2 active:scale-95 ${isExpertiseActive
                            ? 'text-[#10B981] font-semibold'
                            : 'text-gray-800 dark:text-gray-300 hover:text-[#10B981] dark:hover:text-[#10B981]'
                          }`}>
                          {item.label.replace(' ▾', '')}
                          <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
                        </span>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                          <div className="backdrop-blur-xl bg-white/95 dark:bg-[#0A0A0A]/90 border border-gray-200 dark:border-white/10 rounded-xl p-2 flex flex-col gap-1 min-w-50 shadow-2xl">
                            {item.subLinks.map(subItem => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`whitespace-nowrap font-secondary text-sm px-4 py-2 rounded-lg transition-colors duration-200 hover:text-[#10B981] dark:hover:text-[#10B981] ${pathname === subItem.href
                                  ? "bg-accent-mint/10 text-[#10B981] font-medium"
                                  : "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                                  }`}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href!}
                        className={`whitespace-nowrap font-secondary text-sm transition-colors duration-200 hover:text-[#10B981] dark:hover:text-[#10B981] ${pathname === item.href
                          ? "text-[#10B981] font-medium"
                          : "text-gray-800 dark:text-gray-300"
                          }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stylish Vertical Divider (Partition for Toggle) */}
            <div className="hidden lg:block w-px h-5 bg-gray-300 dark:bg-white/10 mx-4 lg:mx-6 shrink-0"></div>

            {/* Theme Toggle / Mobile Hamburger Menu */}
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex lg:hidden shrink-0 items-center justify-center p-2 w-12 h-12 text-gray-800 dark:text-white/80 hover:text-[#10B981] dark:hover:text-[#10B981] transition-all duration-200 active:scale-95"
                aria-label="Toggle mobile menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Animated HUD Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-18 z-40 bg-white/95 dark:bg-black/90 backdrop-blur-xl h-dvh flex flex-col pt-8 px-6 lg:hidden pointer-events-auto overflow-y-auto pb-32"
          >
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col w-full text-left gap-4"
            >
              {navItems.map((item) => (
                <motion.li variants={itemVariants} key={item.label || item.href} className="w-full">
                  {item.subLinks ? (
                    <div className="flex flex-col gap-1 w-full">
                      <button
                        onClick={() => setIsExpertiseOpen(!isExpertiseOpen)}
                        className={`flex items-center justify-start gap-2 w-full py-4 px-4 font-secondary text-base transition-all duration-150 rounded-xl active:scale-[0.98] ${isExpertiseActive
                            ? 'text-[#10B981] font-semibold bg-accent-mint/10'
                            : 'text-gray-800 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5'
                          }`}
                      >
                        <span>{item.label.replace(' ▾', '')}</span>
                        <ChevronDown className={`w-4 h-4 text-[#10B981] transition-transform duration-200 ${isExpertiseOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isExpertiseOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col pl-4 border-l border-gray-200 dark:border-white/10 ml-6 mt-1 mb-2 gap-1">
                              {item.subLinks.map(subItem => (
                                <Link
                                  href={subItem.href}
                                  key={subItem.href}
                                  onClick={() => { setIsOpen(false); setIsExpertiseOpen(false); }}
                                  className={`block py-3 px-4 font-secondary text-sm transition-all duration-150 active:scale-[0.98] active:text-[#10B981] rounded-lg ${pathname === subItem.href
                                    ? "bg-accent-mint/10 text-[#10B981] font-medium"
                                    : "text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                                    }`}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={() => setIsOpen(false)}
                      className={`block py-4 px-4 font-secondary text-base transition-all duration-150 active:scale-[0.98] active:text-[#10B981] rounded-xl ${pathname === item.href
                        ? "bg-accent-mint/10 text-[#10B981] font-medium border border-[#10B981]/20"
                        : "text-gray-800 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5"
                        }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
