"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  const Prefix = () => <span className="text-[#10B981] font-bold mr-2">[root@core]~$</span>;

  return (
    <div className="w-full flex flex-col items-center justify-center">

      {/* Bulletproof CSS Grid — minmax() protects the image column from squishing */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(300px,1fr)_2fr] gap-8 md:gap-12 w-full max-w-6xl mx-auto z-10 min-h-[70vh] items-stretch">

        {/* ── LEFT COLUMN: Vertical Portrait ID Card ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full h-full min-h-[300px] md:h-auto rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-white/70 dark:bg-white/5 backdrop-blur-md"
        >
          {/* Tech overlay badge */}
          <div className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-secondary text-[#10B981] bg-[#10B981]/10 rounded border border-[#10B981]/20 z-10">
            [OPERATOR_VERIFIED]
          </div>

          <Image
            src="/Palli-img 2.jpg"
            alt="Operator ID"
            fill
            className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </motion.div>

        {/* ── RIGHT COLUMN: Terminal Log Card ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full backdrop-blur-md bg-white/80 border border-gray-300 shadow-xl dark:bg-white/5 dark:border-white/10 dark:shadow-inner rounded-2xl p-4 sm:p-6 md:p-10 relative corner-brackets"
        >
          {/* Header */}
          <div className="mb-6 border-b border-gray-300 dark:border-white/10 pb-4 sm:pb-6">
            <h1 className="font-primary text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 text-transparent bg-clip-text">
                System Out: Identity_
              </span>
            </h1>
          </div>

          {/* Terminal Logs */}
          <div className="font-secondary text-slate-800 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 sm:space-y-6">

            <motion.p variants={itemVariants}>
              <Prefix />
              <span>Initializing user profile... Success.</span>
            </motion.p>

            <motion.p variants={itemVariants} className="pl-4 border-l-2 border-gray-300 dark:border-white/5">
              I am a Junior Penetration Tester and Security Researcher dedicated to
              discovering vulnerabilities before threat actors do. My approach combines
              methodical reconnaissance with creative exploitation techniques.
            </motion.p>

            <motion.p variants={itemVariants}>
              <Prefix />
              <span>Loading core competencies...</span>
            </motion.p>

            <motion.ul variants={itemVariants} className="list-none pl-4 space-y-2 border-l-2 border-gray-300 dark:border-white/5">
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] shrink-0">{"->"}</span>
                <span>Offensive Security Operations (Red Teaming)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] shrink-0">{"->"}</span>
                <span>Web Application Security Architectures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] shrink-0">{"->"}</span>
                <span>Vulnerability Research & Disclosure</span>
              </li>
            </motion.ul>

            <motion.p variants={itemVariants}>
              <Prefix />
              <span>Querying objective status...</span>
            </motion.p>

            <motion.p variants={itemVariants} className="pl-4 border-l-2 border-gray-300 dark:border-white/5">
              Currently seeking opportunities to join a forward-thinking security team
              where I can leverage my skills to harden infrastructure, conduct rigorous
              adversarial simulations, and contribute to the broader security community.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-2">
              <a
                href="mailto:contact@deecrypt.com"
                className="text-[#10B981] font-bold hover:bg-[#10B981]/10 px-4 py-2 rounded-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                {">"} Initiate_Handshake
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6 mt-4 border-t border-gray-300 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-white/40">
              <span>Status: <span className="text-[#10B981] uppercase">Listen Mode Active</span></span>
              <span className="text-slate-800 dark:text-white animate-pulse">_</span>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
