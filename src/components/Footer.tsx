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
    <footer className="w-full flex flex-col md:flex-row items-center justify-between gap-6 py-8 px-4 sm:px-8 md:px-12 text-sm font-secondary z-10 relative mt-auto border-t border-gray-200 dark:border-white/10 bg-[#F1F5F9]/80 dark:bg-base-dark/80 backdrop-blur-md">
      
      {/* System Status (Left) */}
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
        </span>
        <span className="text-slate-500 dark:text-white/60 tracking-wider text-xs md:text-sm">
          System Status: Online
        </span>
      </div>

      {/* Copyright & Signature (Center) */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-slate-500 dark:text-white/40 text-center leading-relaxed px-2">
          &copy; {new Date().getFullYear()} <span className="font-medium text-slate-800 dark:text-slate-200">Okoh Bernard Onyedikachi</span>.<br className="block sm:hidden" /> All rights reserved.
        </div>
        <Link 
          href="https://x.com/deecrypthub"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-slate-400 hover:text-[#10B981] transition-colors duration-300"
        >
          Engineered by Daniel
        </Link>
      </div>

      {/* Social Graph (Right) */}
      <div className="flex items-center gap-6">
        {socialLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            whileHover={{ y: -2, color: "#10B981" }}
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-300"
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
      
    </footer>
  );
}
