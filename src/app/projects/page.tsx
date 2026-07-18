"use client";
import { useState, useEffect } from "react";
import { useTerminal } from "@/context/TerminalContext";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Shield, Terminal, Cpu } from "lucide-react";

// --- DATA MAPPING ---
const projects = [
  {
    id: 1,
    title: "Secured API Development: OWASP Top 10",
    category: "Penetration Testing",
    icon: Terminal,
    description: "Executed comprehensive vulnerability assessments on REST APIs, identifying and exploiting business logic flaws, broken object level authorization (BOLA), and mass assignment vulnerabilities.",
    tools: ["Burp Suite", "Postman", "API Security"],
    url: "/projects/secured-api-development"
  },
  {
    id: 2,
    title: "Active Directory Hardening",
    category: "Security Engineering",
    icon: Shield,
    description: "Architected secure AD environments by implementing strict group policies, disabling legacy protocols, enforcing least privilege, and mitigating common attack paths like Kerberoasting.",
    tools: ["Windows Server", "Entra ID", "GPO"],
    url: "/projects/active-directory-hardening"
  },
  {
    id: 3,
    title: "Linux Privilege Escalation via Kernel Exploitation",
    category: "Penetration Testing",
    icon: Terminal,
    description: "Conducted advanced post-exploitation simulations, leveraging misconfigured SUID binaries, cron jobs, and kernel vulnerabilities to elevate privileges in restricted Linux environments.",
    tools: ["LinPEAS", "Bash", "Exploitation"],
    url: "/projects/linux-privilege-escalation"
  },
  {
    id: 4,
    title: "Secure Network Architecture & Zoning",
    category: "Security Engineering",
    icon: Shield,
    description: "Designed and deployed a defense-in-depth enterprise network topology. Focused on secure zoning, firewall rule optimization, and traffic isolation to minimize lateral movement.",
    tools: ["AWS", "VPC", "Network Security"],
    url: "/projects/secure-network-architecture"
  },
  {
    id: 5,
    title: "LLM Model Compromise Validation",
    category: "AI Security",
    icon: Cpu,
    description: "Tested machine learning environments against novel attack vectors, focusing on prompt injection, data poisoning, and unauthorized extraction of sensitive training data.",
    tools: ["Python", "Threat Modeling", "LLMs"],
    url: "/projects/llm-model-compromise-validation"
  },
  {
    id: 6,
    title: "JWT Signature Validation Vulnerabilities",
    category: "Penetration Testing",
    icon: Terminal,
    description: "Analyzed and exploited cryptographic flaws in JSON Web Token implementations, specifically targeting algorithm confusion and missing signature verification mechanisms.",
    tools: ["Burp Suite", "Cryptography", "Python"],
    url: "/projects/jwt-signature-validation"
  },
  {
    id: 7,
    title: "Implementing Cloud Security Controls",
    category: "Security Engineering",
    icon: Shield,
    description: "Hardened cloud infrastructure by configuring robust IAM roles, setting up centralized logging with CloudTrail, and enforcing encryption at rest and in transit.",
    tools: ["AWS", "IAM", "CloudTrail"],
    url: "/projects/implementing-cloud-security-controls"
  }
];

const filters = ["All", "Security Engineering", "Penetration Testing", "AI Security"];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { setActiveSection } = useTerminal();

  // Lock the terminal text statically for this entire page
  useEffect(() => {
    setActiveSection("My Projects");
    
    // Cleanup when leaving the page
    return () => setActiveSection(null);
  }, [setActiveSection]);

  const filteredProjects = projects.filter((project) => 
    activeFilter === "All" ? true : project.category === activeFilter
  );

  return (
    <div className="pb-24">
      
      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-secondary tracking-tight">
          Project Portfolio
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          A verifiable record of executed labs, architectural designs, and vulnerability assessments. Select a category below to filter by specialization.
        </p>
      </motion.div>

      {/* Sticky Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.1 }}
        className="sticky top-[88px] z-30 py-4 mb-8 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5"
      >
        {/* PREMIUM FILTER UI: Scroll Shadows + Snapping */}
        <div className="relative w-full -mx-4 px-4 sm:mx-0 sm:px-0">
          
          {/* Right Edge Scroll Shadow (Fades to your dark background color) */}
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-white dark:from-[#050505] to-transparent pointer-events-none z-10 hidden sm:hidden xs:block"></div>

          {/* Scrollable Track */}
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide snap-x snap-mandatory pr-12 sm:pr-0 sm:pb-0">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 snap-start px-4 py-2 rounded-full text-xs sm:text-sm font-secondary transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30"
                  : "bg-gray-100 dark:bg-white/[0.03] text-gray-600 dark:text-gray-400 border border-transparent hover:border-gray-300 dark:hover:border-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.a
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={project.id}
                href={project.url}
                className="group flex flex-col h-full p-5 sm:p-6 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl hover:border-[#10B981]/50 transition-all duration-300 shadow-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[10px] sm:text-xs font-mono text-[#10B981] uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#10B981] transition-colors" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#10B981] transition-colors font-secondary">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                  <Github className="w-4 h-4 text-gray-500 mr-1" />
                  {project.tools.map((tool, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-1 text-[10px] sm:text-xs rounded-md bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </motion.div>
      
    </div>
  );
}
