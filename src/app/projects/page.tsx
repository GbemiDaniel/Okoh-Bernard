"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, TerminalSquare } from "lucide-react";
import Link from "next/link";

// Placeholder Project Data
const projects = [
  {
    id: "vuln-api-01",
    date: "2026.02.14",
    severity: "Critical",
    category: "Web Exploitation",
    title: "Bypassing JWT Authentication in Legacy API",
    description: "Detailed analysis of a zero-day vulnerability found in a custom JWT implementation. Demonstrated how weak signing algorithms allowed arbitrary role escalation to admin.",
    tools: ["Burp Suite", "Python", "jwt_tool"],
    link: "/projects/jwt-bypass",
  },
  {
    id: "ad-lateral-mx",
    date: "2025.11.02",
    severity: "High",
    category: "Active Directory",
    title: "Lateral Movement via AS-REP Roasting",
    description: "A comprehensive lab report documenting the exploitation path from a low-level domain user to Domain Admin by exploiting accounts without pre-authentication required.",
    tools: ["Impacket", "Rubeus", "BloodHound", "Hashcat"],
    link: "/projects/mock-2",
  },
  {
    id: "htb-machine-sc",
    date: "2025.09.28",
    severity: "Medium",
    category: "OSCP Prep",
    title: "HackTheBox 'Scrambled' Write-up",
    description: "End-to-end walkthrough of solving the Scrambled machine. Covered initial foothold via an exposed SMB share and privilege escalation leveraging a misconfigured cronjob.",
    tools: ["Nmap", "Enum4Linux", "LinPEAS", "Netcat"],
    link: "/projects/mock-3",
  },
  {
    id: "cve-research-xxe",
    date: "2025.07.15",
    severity: "High",
    category: "Vulnerability Research",
    title: "Out-of-Band XXE Data Exfiltration",
    description: "Research paper on exploiting XML External Entities in a modern web application framework, showcasing techniques for extracting local files via a malicious DTD.",
    tools: ["Burp Suite Pro", "Ngrok", "Custom DTD Server"],
    link: "/projects/mock-4",
  },
];

export default function ProjectsPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
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

  const iconVariants: Variants = {
    hover: { x: 5, opacity: 1, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-[80vh] w-full max-w-5xl mx-auto flex flex-col gap-12">
      
      {/* Page Header */}
      <div className="flex flex-col gap-2 relative z-10 w-full mb-4">
        <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 text-transparent bg-clip-text">
            Vulnerability Reports
          </span>
        </h1>
        <p className="font-secondary text-accent-mint text-sm flex items-center gap-2 mt-2">
          <TerminalSquare className="w-4 h-4 text-[#10B981]" />
          {">"} Fetching 0-days and lab documentation...
        </p>
      </div>

      {/* The Archive Vertical List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6 w-full pb-12"
      >
        {projects.map((project) => (
          <motion.article
            key={project.id}
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full backdrop-blur-md bg-white/70 border border-gray-200 shadow-xl dark:bg-white/5 dark:border-white/10 dark:shadow-inner rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 relative overflow-hidden hover:border-[#10B981] dark:hover:border-[#10B981] transition-colors duration-300 group"
          >
            {/* Left Column (Metadata) */}
            <div className="flex lg:flex-col gap-4 lg:w-48 font-secondary text-xs md:text-sm shrink-0">
              <span className="text-slate-500 dark:text-slate-400">[{project.date}]</span>
              <div className="flex flex-col gap-2 border-l-2 border-gray-300 dark:border-white/10 pl-3">
                <span className={`font-medium ${
                  project.severity === "Critical" ? "text-red-500 dark:text-red-400" :
                  project.severity === "High" ? "text-orange-500 dark:text-orange-400" :
                  "text-yellow-600 dark:text-yellow-400"
                }`}>
                  [{project.severity}]
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  [{project.category}]
                </span>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 gap-4 lg:border-l lg:border-gray-300 lg:dark:border-white/10 lg:pl-8 relative z-10">
              
              <div className="flex flex-col gap-3">
                <Link href={project.link} className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-accent-mint rounded w-fit">
                  <motion.h2 
                    variants={titleVariants} 
                    className="font-primary text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text leading-tight group-hover:to-gray-900 dark:group-hover:to-white transition-all duration-300 cursor-pointer"
                  >
                    {project.title}
                  </motion.h2>
                </Link>
                <p className="font-secondary text-slate-700 dark:text-slate-300 text-sm leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Pills & Action Link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 pt-4 border-t border-gray-200 dark:border-white/5">
                
                {/* Tools */}
                <div className="flex flex-wrap gap-2 font-secondary text-xs">
                  {project.tools.map((tool) => (
                    <motion.span 
                      key={tool}
                      variants={pillVariants}
                      className="px-2 py-1 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded text-slate-600 dark:text-slate-400"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>

                {/* Read Link */}
                <Link 
                  href={project.link}
                  className="font-secondary text-accent-mint hover:text-emerald-400 dark:text-accent-mint/80 dark:hover:text-accent-mint text-sm font-medium flex items-center gap-1.5 shrink-0 outline-none"
                >
                  Read Report
                  <motion.div variants={iconVariants}>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </div>

            </div>
            
            {/* Subtle Hover Glow Line (Targeting right edge) */}
            <motion.div 
              initial={{ opacity: 0 }}
              variants={{ hover: { opacity: 1, transition: { duration: 0.3 } } }}
              className="absolute top-0 right-0 w-1 h-full bg-accent-mint shadow-[0_0_15px_rgba(45,212,191,0.5)]" 
            />
            
          </motion.article>
        ))}
      </motion.div>

    </div>
  );
}
