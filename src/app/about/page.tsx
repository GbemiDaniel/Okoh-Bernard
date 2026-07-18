"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useSectionObserver } from "@/hooks/useSectionObserver";

export default function AboutPage() {
  // Initialize personalized scroll sensors
  const bioRef = useSectionObserver("About Me"); 
  const skillsRef = useSectionObserver("My Skills"); 
  const certsRef = useSectionObserver("My Qualifications"); 
  const articlesRef = useSectionObserver("My Insights"); 

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
          className="relative flex flex-col w-full h-full max-h-[650px] sm:max-h-[750px] bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Sticky Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-4 bg-white/[0.02] border-b border-white/10 z-10 sticky top-0">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-[#10B981]/80"></div>
            <span className="ml-3 text-xs font-mono text-gray-500">sys.admin - Profile Dossier</span>
          </div>

          {/* Scrollable Text Area */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
            
            {/* Block 1: Bio */}
            <div ref={bioRef} className="mb-10">
              <h3 className="text-[#10B981] font-mono text-base sm:text-lg mb-4">Profile Overview</h3>
              <div className="flex flex-col gap-4 text-gray-400 text-sm sm:text-base leading-relaxed">
                <p>Hi, I&apos;m Onyedikachi Bernard Okoh. I am a cybersecurity professional specializing in Security Engineering, Penetration Testing, and AI Security.</p>
                <p>My technical foundation began at the system level. Long before pursuing security professionally, I spent years exploring the underlying mechanics of Windows and Linux environments, developing a deep proficiency with command-line interfaces and OS-level configurations. I naturally gravitated toward the logic governing systems beneath the graphical interface.</p>
                <p>In 2023, my curiosity about how websites and digital systems function drove me to gain structured exposure to software engineering. This foundational understanding of how technology is built ultimately led me to my true strength: cybersecurity. I realized that to effectively secure or test an application, you must first understand its underlying mechanics.</p>
                <p>Graduating from the University of Nigeria in 2024 with a degree in Agriculture (Crop Science) further shaped my analytical approach. It trained me to recognize complex patterns, isolate variables, and systematically troubleshoot interconnected systems. As I transitioned fully into cybersecurity, I realized that securing technology requires more than just technical tooling—it requires understanding the human behaviors and business logic that influence system integrity. I approach every environment with the curiosity of an attacker and the responsibility of a defender, aiming to provide clear, actionable remediation.</p>
              </div>
            </div>

            {/* Block 2: Technical Skills */}
            <div ref={skillsRef} className="mb-10">
              <h3 className="text-[#10B981] font-mono text-base sm:text-lg mb-4">Technical Skills</h3>
              <ul className="space-y-3 text-gray-300 font-mono text-sm sm:text-base ml-1 sm:ml-2">
                <li className="flex items-start gap-2"><span className="text-[#10B981] mt-0.5 shrink-0">→</span> <span><strong className="text-white font-sans">Security Engineering:</strong> Active Directory, Windows Server, Linux System Hardening, IAM, Cloud Security (AWS).</span></li>
                <li className="flex items-start gap-2"><span className="text-[#10B981] mt-0.5 shrink-0">→</span> <span><strong className="text-white font-sans">Penetration Testing:</strong> Web App & API Security, Privilege Escalation, Post-Exploitation, Vulnerability Validation (Nmap, Burp Suite, Metasploit, Wireshark).</span></li>
                <li className="flex items-start gap-2"><span className="text-[#10B981] mt-0.5 shrink-0">→</span> <span><strong className="text-white font-sans">AI Security:</strong> LLM Vulnerability Research, Prompt Injection, Machine Learning Security, Model Compromise.</span></li>
                <li className="flex items-start gap-2"><span className="text-[#10B981] mt-0.5 shrink-0">→</span> <span><strong className="text-white font-sans">Scripting & Automation:</strong> Python, PowerShell, Bash.</span></li>
              </ul>
            </div>

            {/* Block 3: Certifications & Qualifications */}
            <div ref={certsRef} className="mb-10">
              <h3 className="text-[#10B981] font-mono text-base sm:text-lg mb-4">Certifications & Qualifications</h3>
              <ul className="space-y-3 text-gray-300 font-mono text-sm sm:text-base ml-1 sm:ml-2">
                <li className="flex items-start gap-2"><span className="text-[#10B981] mt-0.5 shrink-0">→</span> <span><strong className="text-white font-sans">TryHackMe:</strong> Jr. Penetration Tester, Security Engineer, AI Security, Cyber Security 101, Pre-Security.</span></li>
                <li className="flex items-start gap-2"><span className="text-[#10B981] mt-0.5 shrink-0">→</span> <span><strong className="text-white font-sans">Badges:</strong> Network & System Security, Software Security, AI Path Completion, Model Compromise.</span></li>
              </ul>
            </div>

            {/* Block 4: Articles & Insights */}
            <div ref={articlesRef} className="mb-4">
              <h3 className="text-[#10B981] font-mono text-base sm:text-lg mb-4">Articles & Insights</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-4">I actively document my technical methodologies, architectural reviews, and vulnerability assessments:</p>
              <ul className="space-y-3 text-gray-300 font-mono text-sm sm:text-base ml-1 sm:ml-2">
                <li className="flex items-start gap-2"><span className="text-[#10B981] mt-0.5 shrink-0">→</span> <span>Understanding Identity and Access Management (IAM)</span></li>
                <li className="flex items-start gap-2"><span className="text-[#10B981] mt-0.5 shrink-0">→</span> <span>Threat Modeling and Risk Assessment Frameworks</span></li>
                <li className="flex items-start gap-2"><span className="text-[#10B981] mt-0.5 shrink-0">→</span> <span>Navigating Security Governance, Frameworks, and Compliance</span></li>
                <li className="flex items-start gap-2"><span className="text-[#10B981] mt-0.5 shrink-0">→</span> <span>Cracking the Code: A Practical Guide to Classical & Modern Cryptography</span></li>
              </ul>
            </div>

            {/* Block 5: Resume Download Action */}
            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-start pb-4">
              <a 
                href="/Onyedikachi_Bernard_Okoh_CV.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                download 
                className="group relative inline-flex items-center gap-3 px-6 py-3 bg-[#10B981]/5 hover:bg-[#10B981]/15 border border-[#10B981]/30 hover:border-[#10B981]/60 rounded-md font-mono text-sm text-[#10B981] transition-all shadow-[0_0_15px_rgba(16,185,129,0.0)] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              >
                <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>[Download_CV.pdf]</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
