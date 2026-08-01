"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/deecrypthub", label: "GitHub" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/deecrypthub", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/deecrypthub", label: "LinkedIn" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:contact@deecrypt.com", label: "Email" },
  ];

  return (
    <footer className="w-full relative z-10 mt-auto border-t border-gray-200 dark:border-white/10 bg-white/60 dark:bg-black/60 backdrop-blur-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-4 sm:px-8 md:px-12 w-full max-w-7xl mx-auto font-secondary text-sm">
        
        {/* Left: System Status */}
        <div className="flex items-center gap-3 w-full md:w-1/3 justify-center md:justify-start">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
          </span>
          <span className="text-gray-700 dark:text-gray-300 font-medium tracking-wider text-xs sm:text-sm">
            SYS.STATUS: <span className="text-[#10B981]">ONLINE</span>
          </span>
        </div>

        {/* Center: Copyright & Signature */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-1/3">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-800 dark:text-gray-200">Okoh Bernard Onyedikachi</span>
          </div>
          <div className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <span>All rights reserved</span>
            <span className="text-[#10B981]/50">//</span>
            <Link 
              href="https://x.com/deecrypthub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#10B981] transition-colors duration-300"
            >
              Engineered by Daniel
            </Link>
          </div>
        </div>

        {/* Right: Social Graph */}
        <div className="flex items-center justify-center md:justify-end gap-5 w-full md:w-1/3">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              whileHover={{ y: -3, color: "#10B981" }}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 relative group"
            >
              {link.icon}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-black/80 dark:bg-white/10 text-[#10B981] px-2 py-1 rounded pointer-events-none whitespace-nowrap hidden md:block border border-[#10B981]/20 backdrop-blur-md">
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>
        
      </div>
    </footer>
  );
}
