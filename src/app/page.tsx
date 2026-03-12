"use client";

import { TerminalSubtitle } from "@/components/TerminalSubtitle";
import { SkillCard } from "@/components/SkillCard";
import { CyberParticles } from "@/components/CyberParticles";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Terminal, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const skills = [
    { label: "Network Exploitation", progress: 92 },
    { label: "Web App Penetration", progress: 88 },
    { label: "OSINT Gathering", progress: 95 },
    { label: "Reverse Engineering", progress: 75 },
    { label: "Cloud Security (AWS)", progress: 82 },
    { label: "Social Engineering", progress: 90 },
  ];

  const buttonVariants: Variants = {
    hover: { scale: 1.05, transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };

  const iconVariants: Variants = {
    hover: { x: 5, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex flex-col">
      {/* ===================== HERO ===================== */}
      {/* Grid wrapper: place-items-center gives bulletproof centering */}
      <div className="relative w-full min-h-[100dvh] grid place-items-center overflow-hidden px-4">

        {/* Performant HTML5 Canvas Background */}
        <CyberParticles />

        {/* Inner Content Block — dead-centered by the grid parent */}
        <div className="corner-brackets relative flex flex-col items-center justify-center text-center w-full max-w-4xl gap-5 sm:gap-6 z-10 p-6 sm:p-10">

          {/* Hero Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_35px_rgba(16,185,129,0.3)]"
          >
            <Image
              src="/Palli-img 1.jpg"
              alt="Palliative Profile"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 96px, 112px"
              priority
            />
          </motion.div>

          {/* Main Heading */}
          <h1 className="font-primary font-bold tracking-tight text-center text-4xl sm:text-5xl md:text-7xl w-full">
            <span className="bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 text-transparent bg-clip-text">
              Palliative Umunwa
            </span>
          </h1>

          {/* Terminal Typewriter Subtitle */}
          <TerminalSubtitle />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-5 w-full max-w-md mx-auto sm:max-w-none">
            <Link href="/projects" className="w-full sm:w-auto outline-none block group">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-3 rounded-full bg-accent-mint text-base-dark font-primary font-bold shadow-[0_0_20px_rgba(45,212,191,0.4)] flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
              >
                View Write-ups
                <motion.div variants={iconVariants}>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </Link>

            <Link href="/certifications" className="w-full sm:w-auto outline-none block">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-3 rounded-full backdrop-blur-md bg-white/30 dark:bg-white/5 border border-gray-900 text-gray-900 hover:bg-white/60 dark:border-white/10 dark:text-white dark:hover:bg-white/10 font-primary font-medium flex items-center justify-center gap-2 transition-colors w-full sm:w-auto shadow-sm cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-gray-900 dark:text-white/70" />
                View Credentials
              </motion.div>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <a href="https://github.com/deecrypthub" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-300">
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="https://twitter.com/deecrypthub" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-300">
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="https://linkedin.com/in/deecrypthub" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-300">
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* ===================== SKILLS GRID ===================== */}
      <div className="w-full px-4 py-24">
        <section className="flex flex-col gap-12 w-full max-w-6xl mx-auto">
          <div className="flex flex-col gap-2 items-center text-center">
            <h2 className="font-primary text-3xl font-bold text-gray-900 dark:text-white">
              Offensive Capabilities
            </h2>
            <p className="font-secondary text-sm text-gray-600 dark:text-gray-400">
              // Core technical proficiencies and primary toolsets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.label}
                label={skill.label}
                progress={skill.progress}
                delay={index * 0.1}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
