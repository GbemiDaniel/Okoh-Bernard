"use client";

import { TerminalSubtitle } from "@/components/TerminalSubtitle";
import ArsenalSection from "@/components/ArsenalSection";
import { FeaturedProjectCard } from "@/components/FeaturedProjectCard";
import { ArticleBriefing } from "@/components/ArticleBriefing";
import { CyberParticles } from "@/components/CyberParticles";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Terminal, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSectionObserver } from "@/hooks/useSectionObserver";

export default function Home() {
  // Initialize the scroll sensors
  const heroRef = useSectionObserver(null); // null triggers default sequence
  const offensiveRef = useSectionObserver("Offensive Capabilities");
  const projectsRef = useSectionObserver("Featured Projects");
  const publicationsRef = useSectionObserver("Featured Publications");

  const featuredProjects = [
    {
      title: "Secured API Development",
      description: "OWASP API Security Top 10 Practical Assessment.",
      tag: "PENTESTING",
      tools: ["Burp Suite", "OWASP ZAP"],
      link: "[https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/Secure%20API%20Development%3A%20OWASP%20API%20Security%20Top%2010%20Practical%20Assessment.md](https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/Secure%20API%20Development%3A%20OWASP%20API%20Security%20Top%2010%20Practical%20Assessment.md)"
    },
    {
      title: "Linux Privilege Escalation",
      description: "Exploitation analysis via Kernel vulnerabilities.",
      tag: "PENTESTING",
      tools: ["LinPEAS", "Bash", "Linux"],
      link: "[https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/Linux%20Privilege%20Escalation%20via%20Kernel%20Exploitation.md](https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/Linux%20Privilege%20Escalation%20via%20Kernel%20Exploitation.md)"
    },
    {
      title: "Active Directory Hardening",
      description: "Enterprise environment security and defense.",
      tag: "SEC-ENG",
      tools: ["Active Directory", "Windows Server", "PowerShell"],
      link: "[https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Active%20Directory%20Hardening.md](https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Active%20Directory%20Hardening.md)"
    },
    {
      title: "Cloud Security Controls",
      description: "Implementing defensive security architecture in AWS.",
      tag: "SEC-ENG",
      tools: ["Amazon Web Services", "IAM"],
      link: "[https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Implementing%20Cloud%20Security%20Controls%20in%20AWS.md](https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Implementing%20Cloud%20Security%20Controls%20in%20AWS.md)"
    },
    {
      title: "Prompt Security in LLMs",
      description: "Context window integrity and vulnerability analysis.",
      tag: "AI-SEC",
      tools: ["Python", "Prompt Injection"],
      link: "[https://github.com/OnyedikachiO/AI-Security-Portfolio](https://github.com/OnyedikachiO/AI-Security-Portfolio)"
    },
    {
      title: "Model Compromise Assessment",
      description: "Defensive automation and ML vulnerability mapping.",
      tag: "AI-SEC",
      tools: ["Machine Learning Security", "Python"],
      link: "[https://github.com/OnyedikachiO/AI-Security-Portfolio](https://github.com/OnyedikachiO/AI-Security-Portfolio)"
    }
  ];

  const recentArticles = [
    {
      title: "Understanding Identity and Access Management (IAM)",
      description: "An analysis of the core principles of enterprise access control. This article covers the implementation of robust IAM frameworks to prevent unauthorized privilege escalation and ensure secure authentication pipelines.",
      link: "[https://medium.com/@kachisichobernardokoh/understanding-identity-and-access-management-iam-dec3f14e139a](https://medium.com/@kachisichobernardokoh/understanding-identity-and-access-management-iam-dec3f14e139a)",
      date: "Nov 12, 2024",
      category: "Security Engineering",
      colorClass: "text-cyan-400"
    },
    {
      title: "Threat Modeling and Risk Assessment Frameworks",
      description: "A comprehensive breakdown of how to proactively identify and mitigate system vulnerabilities before deployment. This piece evaluates modern frameworks used to map attack surfaces and calculate potential exploit impacts.",
      link: "[https://medium.com/@kachisichobernardokoh/threat-modeling-and-risk-assessment-frameworks-70a93b193313](https://medium.com/@kachisichobernardokoh/threat-modeling-and-risk-assessment-frameworks-70a93b193313)",
      date: "Oct 28, 2024",
      category: "Architecture",
      colorClass: "text-purple-400"
    },
    {
      title: "Navigating Security Governance and Compliance",
      description: "Aligning technical security controls with rigid business and regulatory requirements. This documentation explores the intersection of compliance frameworks and active defense mechanisms within enterprise environments.",
      link: "[https://medium.com/@kachisichobernardokoh/navigating-security-governance-frameworks-and-compliance-7ab8ae780b0c](https://medium.com/@kachisichobernardokoh/navigating-security-governance-frameworks-and-compliance-7ab8ae780b0c)",
      date: "Oct 15, 2024",
      category: "Governance",
      colorClass: "text-orange-400"
    }
  ];

  const buttonVariants: Variants = {
    hover: { scale: 1.05, transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };

  return (
    <div className="flex flex-col">
      {/* ===================== HERO ===================== */}
      <div ref={heroRef} className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center -mt-32 pt-28 pb-12 overflow-hidden px-4 sm:px-6">
        
        {/* Performant HTML5 Canvas Background */}
        <CyberParticles/>

        {/* The Dashboard Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl bg-[#030303]/80 backdrop-blur-2xl border border-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* ================= METALLIC GLASS OVERLAYS ================= */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* The primary diagonal metallic cut */}
            <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left -rotate-35 translate-y-[30%] -translate-x-[10%] bg-gradient-to-b from-white/[0.04] via-white/[0.01] to-transparent border-t border-white/[0.15] shadow-[inset_0_1px_15px_rgba(255,255,255,0.02)] backdrop-blur-md mix-blend-screen transition-transform duration-1000"></div>
            {/* Secondary subtle shadow edge */}
            <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left -rotate-35 translate-y-[30.2%] -translate-x-[10%] border-t border-black/50"></div>
          </div>

          {/* ================= CONTENT LAYER ================= */}
          {/* Adjusted padding for ultra-small screens (p-5 on mobile) */}
          <div className="relative z-10 flex flex-col h-full w-full p-5 sm:p-10 gap-8 sm:gap-10">
            
            {/* TOP ROW: Identity & Comms */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-20 w-full">
              
              {/* Avatar & Name Group */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-5 md:gap-8">
                
                {/* ID Badge Photo */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-2xl md:rounded-3xl overflow-hidden border border-gray-700 shadow-[0_0_20px_rgba(16,185,129,0.15)] shrink-0 bg-[#0a0a0a] group/avatar">
                  <Image alt="Okoh Bernard Onyedikachi Profile" className="object-cover object-top grayscale group-hover/avatar:grayscale-0 transition-all duration-700" fill priority sizes="(max-width: 768px) 80px, 144px" src="/Palli-img 1.jpg"/>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10B981]/10 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"></div>
                </div>

                {/* Identity Text - Scaled for S8 screens (text-lg) to prevent wrap/truncate */}
                <div>
                  <span className="text-[#10B981] font-mono text-[9px] sm:text-[10px] uppercase tracking-widest mb-1.5 sm:mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                    Clearance: Active
                  </span>
                  <h1 className="font-primary font-bold tracking-tight text-[1.1rem] xs:text-lg sm:text-2xl lg:text-3xl text-white leading-tight whitespace-nowrap">
                    Okoh Bernard Onyedikachi
                  </h1>
                </div>
              </div>
              
              {/* Circular Social Modules */}
              <div className="flex items-center gap-3 shrink-0">
                <a href="https://github.com/deecrypthub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-700 bg-[#0a0a0a]/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#10B981]/50 hover:bg-[#10B981]/10 transition-all shadow-sm">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5"/>
                </a>
                <a href="https://twitter.com/deecrypthub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-700 bg-[#0a0a0a]/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#10B981]/50 hover:bg-[#10B981]/10 transition-all shadow-sm">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5"/>
                </a>
                <a href="https://linkedin.com/in/deecrypthub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-700 bg-[#0a0a0a]/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#10B981]/50 hover:bg-[#10B981]/10 transition-all shadow-sm">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5"/>
                </a>
              </div>
            </div>

            {/* MIDDLE ROW (Moved up): Integrated Terminal */}
            <div className="bg-[#000000]/80 border border-gray-800 rounded-xl overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] flex flex-col relative z-20 w-full mt-2 sm:mt-0">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-800/80 bg-white/[0.02]">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] shadow-[0_0_5px_rgba(255,95,86,0.3)]"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_5px_rgba(255,189,46,0.3)]"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] shadow-[0_0_5px_rgba(39,201,63,0.3)]"></div>
                <span className="ml-2 sm:ml-3 text-gray-600 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">root@system:~# protocol_init</span>
              </div>
              
              {/* Terminal Body */}
              <div className="p-4 sm:p-6 min-h-[100px] sm:min-h-[120px] flex items-center bg-black/40">
                <TerminalSubtitle/>
              </div>
            </div>

            {/* BOTTOM ROW (Moved down): Actionable Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-20 w-full md:w-max">
              <Link className="w-full sm:w-auto outline-none" href="/certifications">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg bg-[#10B981] hover:bg-[#0ea5e9] text-black font-mono font-bold flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)] text-sm sm:text-base"
                >
                  <Terminal className="w-4 h-4"/>
                  View Credentials
                </motion.div>
              </Link>

              <Link className="w-full sm:w-auto outline-none group/btn" href="/projects">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg border border-gray-600 bg-black/40 text-gray-300 hover:text-white hover:border-gray-400 font-mono font-medium flex items-center justify-center gap-2 transition-all backdrop-blur-sm text-sm sm:text-base"
                >
                  View Arsenal
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"/>
                </motion.div>
              </Link>
            </div>

          </div>
        </motion.div>
      </div>

      {/* ===================== SKILLS GRID ===================== */}
      <div ref={offensiveRef} className="w-full">
        <ArsenalSection />
      </div>

      {/* ===================== FEATURED PROJECTS ===================== */}
      <div ref={projectsRef} className="w-full pb-24 pt-12">
        <section className="flex flex-col gap-12 w-full max-w-6xl mx-auto">
          <div className="flex flex-col gap-2 items-center text-center">
            <h2 className="font-primary text-3xl font-bold text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <p className="font-secondary text-sm text-gray-600 dark:text-gray-400">
              Technical assessments and architectural implementations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl mx-auto mt-8">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tag={project.tag}
                link={project.link}
                tools={project.tools}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link href="/projects" className="px-6 py-3 border border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/10 rounded-lg font-mono text-sm transition-all flex items-center gap-2 group">
              View Full Arsenal <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </section>
      </div>

      {/* ===================== PUBLICATIONS ===================== */}
      <section ref={publicationsRef} className="w-full max-w-4xl mx-auto mt-32 mb-24">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Featured Publications</h2>
        <p className="text-gray-400 text-sm mb-12 text-center">Technical write-ups on architecture, threat modeling, and defensive engineering.</p>
        
        {recentArticles.map(article => (
          <ArticleBriefing
            key={article.title}
            title={article.title}
            description={article.description}
            link={article.link}
            date={article.date}
            category={article.category}
            colorClass={article.colorClass}
          />
        ))}

        <div className="mt-12 flex justify-center">
          <Link href="/blog" className="px-6 py-3 bg-white/[0.02] border border-white/10 hover:border-[#10B981]/50 hover:bg-[#10B981]/5 text-gray-300 hover:text-[#10B981] rounded-lg font-mono text-sm transition-all flex items-center gap-2">
            View All Publications <span className="text-lg">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
