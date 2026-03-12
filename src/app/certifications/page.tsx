"use client";

import { motion, Variants } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2 } from "lucide-react";

const certifications = [
  {
    id: "oscp",
    title: "Offensive Security Certified Professional",
    issuer: "OffSec",
    date: "Dec 2025",
    status: "Active",
    badgeUrl: "#", // Placeholder for actual credential block/image
    skills: ["Active Directory", "Buffer Overflows", "Privilege Escalation"],
    icon: <ShieldCheck className="w-8 h-8 text-[#10B981]" />
  },
  {
    id: "pnpt",
    title: "Practical Network Penetration Tester",
    issuer: "TCM Security",
    date: "Aug 2025",
    status: "Active",
    skills: ["OSINT", "External Pentesting", "Internal Pentesting"],
    icon: <Award className="w-8 h-8 text-[#10B981]" />
  },
  {
    id: "ewpt",
    title: "eLearnSecurity Web Application Penetration Tester",
    issuer: "eLearnSecurity",
    date: "Mar 2025",
    status: "Active",
    skills: ["XSS", "SQLi", "Web Architecture"],
    icon: <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
  }
];

export default function CertificationsPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 } 
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: { scale: 1.01, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  };

  const titleVariants: Variants = {
    hover: { x: 5, transition: { duration: 0.2 } }
  };

  const pillVariants: Variants = {
    hover: { y: -2, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-[80vh] w-full max-w-6xl mx-auto flex flex-col gap-12">
      
      {/* Page Header */}
      <div className="flex flex-col gap-2 relative z-10 w-full text-center md:text-left mb-6">
        <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 text-transparent bg-clip-text">
            Verified Credentials
          </span>
        </h1>
        <p className="font-secondary text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center md:justify-start gap-2 mt-2">
          {">"} Accessing certification database... 100%
        </p>
      </div>

      {/* Grid Layout */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      >
        {certifications.map((cert) => (
          <motion.article
            key={cert.id}
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full backdrop-blur-md bg-white/70 border border-gray-200 shadow-xl dark:bg-white/5 dark:border-white/10 dark:shadow-inner rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden group hover:border-[#10B981] dark:hover:border-[#10B981] transition-all duration-300 cursor-pointer"
          >
            {/* Status Dot */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            {/* Icon & Meta */}
            <motion.div 
              variants={{ hover: { scale: 1.05, transition: { duration: 0.2 } } }}
              className="mb-6 bg-white/50 dark:bg-white/5 p-4 rounded-xl inline-block border border-gray-200 dark:border-white/10"
            >
              {cert.icon}
            </motion.div>

            <div className="flex flex-col gap-4">
              {/* Title & Issuer */}
              <div>
                <motion.h2 
                  variants={titleVariants} 
                  className="font-primary text-xl font-bold text-slate-800 dark:text-white leading-tight mb-2"
                >
                  {cert.title}
                </motion.h2>
                <div className="flex items-center justify-between font-secondary text-xs text-slate-500 dark:text-slate-400 border-b border-gray-200 dark:border-white/10 pb-4">
                  <span>{cert.issuer}</span>
                  <span>[{cert.date}]</span>
                </div>
              </div>

              {/* Skills Footer */}
              <div className="flex flex-wrap gap-2 mt-2">
                {cert.skills.map(skill => (
                  <motion.span 
                    key={skill}
                    variants={pillVariants}
                    className="font-secondary text-[10px] sm:text-xs px-2.5 py-1 rounded bg-white/60 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-slate-700 dark:text-white/60"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Hover Glare Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 dark:via-white/5 to-white/0 -translate-x-[150%] skew-x-[-30deg] group-hover:animate-[glare_1s_ease-out] pointer-events-none" />
          </motion.article>
        ))}
      </motion.div>

    </div>
  );
}
