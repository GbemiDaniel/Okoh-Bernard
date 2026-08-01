"use client";
import { useState, useEffect } from "react";
import { useTerminal } from "@/context/TerminalContext";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Shield, Terminal, Cpu } from "lucide-react";

// --- DATA MAPPING ---
const projects = [
  // --- SECURITY ENGINEERING (NETWORK & SYSTEMS) ---
  {
    id: 1,
    title: "Secure Network Architecture",
    category: "Security Engineering",
    icon: Shield,
    description: "Design and implementation of robust network topologies focused on segmentation, zero-trust principles, and traffic analysis.",
    tools: ["Network Security", "Architecture", "Zero-Trust"],
    url: "https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Network%20And%20System%20Security/Secure%20Network%20Architecture.md"
  },
  {
    id: 2,
    title: "Active Directory Security & Hardening",
    category: "Security Engineering",
    icon: Shield,
    description: "Mitigating lateral movement and privilege escalation by securing AD environments against modern identity-based attacks.",
    tools: ["Active Directory", "GPO", "IAM"],
    url: "https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Network%20And%20System%20Security/Active%20Directory%20Hardening.md"
  },
  {
    id: 3,
    title: "Linux System Hardening",
    category: "Security Engineering",
    icon: Terminal,
    description: "Comprehensive configuration baselines, access controls, and kernel hardening to secure Linux infrastructure.",
    tools: ["Linux", "Kernel", "Bash"],
    url: "https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Network%20And%20System%20Security/Linux%20System%20Hardening.md"
  },
  {
    id: 4,
    title: "Windows System Hardening",
    category: "Security Engineering",
    icon: Shield,
    description: "Enforcing Group Policy Objects (GPOs), endpoint protection, and OS-level security boundaries for Windows environments.",
    tools: ["Windows Server", "Endpoint Protection"],
    url: "https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Network%20And%20System%20Security/Microsoft%20Windows%20System%20Hardening.md"
  },
  {
    id: 5,
    title: "Cloud Security Fundamentals",
    category: "Security Engineering",
    icon: Shield,
    description: "Securing cloud-native infrastructure, managing IAM policies, and defending against cloud misconfigurations.",
    tools: ["Cloud Security", "AWS", "IAM"],
    url: "https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Network%20And%20System%20Security/Cloud%20Security%20Fundamentals.md"
  },
  {
    id: 6,
    title: "Introduction to Security Engineering",
    category: "Security Engineering",
    icon: Shield,
    description: "Foundational frameworks and methodologies governing enterprise-grade security engineering and risk management.",
    tools: ["Frameworks", "Risk Management"],
    url: "https://github.com/OnyedikachiO/Security-Engineer-Projects-/tree/main/Intro%20To%20Security%20Engeering"
  },

  // --- AI SECURITY ---
  {
    id: 7,
    title: "System Prompt Hardening",
    category: "AI Security",
    icon: Cpu,
    description: "Developing robust meta-prompts to secure Large Language Models against unauthorized instructional overrides.",
    tools: ["LLMs", "Prompt Engineering"],
    url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Prompt%20Security/System%20Prompt%20Hardening.md"
  },
  {
    id: 8,
    title: "Prompt Injection Mitigation",
    category: "AI Security",
    icon: Terminal,
    description: "Analysis and defense strategies against adversarial inputs designed to manipulate LLM output generation.",
    tools: ["Adversarial AI", "Testing"],
    url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Prompt%20Security/Prompt%20Injection.md"
  },
  {
    id: 9,
    title: "LLM Jailbreaking Vectors",
    category: "AI Security",
    icon: Cpu,
    description: "Researching advanced techniques used to bypass safety guardrails in AI models and corresponding defensive countermeasures.",
    tools: ["Red Teaming", "LLMs"],
    url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Prompt%20Security/Jailbreaking.md"
  },
  {
    id: 10,
    title: "Prompt Defense Frameworks",
    category: "AI Security",
    icon: Shield,
    description: "Implementing programmatic input validation and sanitization pipelines for AI application interfaces.",
    tools: ["Sanitization", "Validation"],
    url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Prompt%20Security/Prompt%20Defense.md"
  },
  {
    id: 11,
    title: "Data Poisoning in RAG Systems",
    category: "AI Security",
    icon: Cpu,
    description: "Exploring vulnerability vectors where malicious external data compromises Retrieval-Augmented Generation outputs.",
    tools: ["RAG", "Data Integrity"],
    url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Data%20Poisoning%20/Data%20Poisoning%20in%20RAG%20Systems.md"
  },
  {
    id: 12,
    title: "Sensitive Information Disclosure",
    category: "AI Security",
    icon: Shield,
    description: "Preventing inadvertent data leaks and PII exposure through LLM memorization and context window exploitation.",
    tools: ["DLP", "Privacy"],
    url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Data%20Poisoning%20/Sensitive%20Information%20Disclosure.md"
  },
  {
    id: 13,
    title: "Securing AI Systems Architecture",
    category: "AI Security",
    icon: Cpu,
    description: "End-to-end security architecture for deploying machine learning models in enterprise production environments.",
    tools: ["MLSecOps", "Architecture"],
    url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Secure%20AI%20Systems/Securing%20AI%20Systems.md"
  },
  {
    id: 14,
    title: "AI Threat Modeling",
    category: "AI Security",
    icon: Shield,
    description: "Adapting standard threat modeling methodologies (STRIDE, DREAD) specifically for AI/ML application lifecycles.",
    tools: ["Threat Modeling", "STRIDE"],
    url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Secure%20AI%20Systems/AI%20Threat%20Modelling.md"
  },
  {
    id: 15,
    title: "AI Supply Chain Attack Vectors",
    category: "AI Security",
    icon: Terminal,
    description: "Securing model weights, open-source dependencies, and training pipelines against supply chain compromises.",
    tools: ["Supply Chain", "Dependencies"],
    url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/AI%20Supply%20Chain%20Security/AI%20Supply%20Chain%20Attack%20Vectors.md"
  },
  {
    id: 16,
    title: "AI Forensics",
    category: "AI Security",
    icon: Cpu,
    description: "Techniques for investigating AI incidents, tracing anomalous model behavior, and establishing digital provenance.",
    tools: ["Forensics", "Incident Response"],
    url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/AI%20Fundamental/AI%20Forensics.md"
  },

  // --- PENETRATION TESTING ---
  {
    id: 17,
    title: "Secured API Development: OWASP API Security Top 10",
    category: "Penetration Testing",
    icon: Terminal,
    description: "Executed comprehensive vulnerability assessments on REST APIs, identifying and exploiting business logic flaws and authorization vulnerabilities.",
    tools: ["Burp Suite", "API Security", "OWASP"],
    url: "https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/Secure%20API%20Development%3A%20OWASP%20API%20Security%20Top%2010%20Practical%20Assessment.md"
  },
  {
    id: 18,
    title: "Linux Privilege Escalation via Kernel Exploitation",
    category: "Penetration Testing",
    icon: Terminal,
    description: "Conducted advanced post-exploitation simulations leveraging misconfigured binaries and kernel vulnerabilities to elevate privileges.",
    tools: ["LinPEAS", "Exploitation", "Bash"],
    url: "https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/Linux%20Privilege%20Escalation%20via%20Kernel%20Exploitation.md"
  },
  {
    id: 19,
    title: "JWT Signature Validation Vulnerabilities",
    category: "Penetration Testing",
    icon: Terminal,
    description: "Analyzed and exploited cryptographic flaws in JSON Web Token implementations, targeting algorithm confusion and missing verification.",
    tools: ["Burp Suite", "Cryptography", "Web App"],
    url: "https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/JWT%20Signature%20Validation%20Vulnerabilities%20Assessment.md"
  },
  {
    id: 20,
    title: "OWASP Top 10 2025: IAAA Failures Analysis",
    category: "Penetration Testing",
    icon: Terminal,
    description: "In-depth analysis and practical exploitation of Identification, Authentication, and Authorization failures in modern web applications.",
    tools: ["Web App", "Authentication", "OWASP"],
    url: "https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/OWASP%20Top%2010%202025%3A%20IAAA%20Failures%20Analysis.md"
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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pb-24 pt-28 md:pt-32">
      
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
        className="sticky top-22 z-30 py-4 mb-8 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5"
      >
        {/* PREMIUM FILTER UI: Scroll Shadows + Snapping */}
        <div className="relative w-full -mx-4 px-4 sm:mx-0 sm:px-0">
          
          {/* Right Edge Scroll Shadow (Fades to your dark background color) */}
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-linear-to-l from-white dark:from-[#050505] to-transparent pointer-events-none z-10 hidden sm:hidden xs:block"></div>

          {/* Scrollable Track */}
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide snap-x snap-mandatory pr-12 sm:pr-0 sm:pb-0">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 snap-start px-4 py-2 rounded-full text-xs sm:text-sm font-secondary transition-all duration-300 active:scale-95 ${
                activeFilter === filter
                  ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30"
                  : "bg-gray-100 dark:bg-white/3 text-gray-600 dark:text-gray-400 border border-transparent hover:border-gray-300 dark:hover:border-white/10"
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
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full p-5 sm:p-6 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl transition-all duration-300 shadow-sm hover:bg-gray-50 dark:hover:bg-[#121212] hover:border-[#10B981]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#10B981]/40"
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
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 grow line-clamp-3">
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
