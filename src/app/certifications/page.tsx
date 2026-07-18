"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Award, X, CheckCircle2 } from "lucide-react";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";

// INJECTED REAL USER DATA
const credentials = {
  pathways: [
    {
      id: "jr-pentester",
      title: "Jr. Penetration Tester",
      issuer: "TryHackMe",
      date: "2024",
      verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-1EWKAEDRRQ.pdf",
      previewImage: "/certificates/jr-pentester.png", // User to provide this screenshot
      description: "Comprehensive offensive security pathway focusing on web application vulnerabilities, privilege escalation techniques, and network exploitation methodologies.",
      skills: ["Web App Pentesting", "Privilege Escalation", "Network Security", "Burp Suite"]
    },
    {
      id: "security-engineer",
      title: "Security Engineer",
      issuer: "TryHackMe",
      date: "2024",
      verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-GKYKNDUGUI.pdf",
      previewImage: "/certificates/security-engineer.png",
      description: "Advanced defensive security training focusing on network architecture, system hardening, identity and access management (IAM), and incident response.",
      skills: ["System Hardening", "IAM", "Network Architecture", "Threat Modeling"]
    },
    {
      id: "ai-security",
      title: "AI Security",
      issuer: "TryHackMe",
      date: "2024",
      verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-ILD2RSGBVA.pdf",
      previewImage: "/certificates/ai-security.png",
      description: "Specialized training in artificial intelligence security, covering vulnerabilities in machine learning models including prompt injection and model compromise.",
      skills: ["Prompt Injection", "Model Compromise", "AI Governance", "ML Security"]
    },
    {
      id: "cyber-101",
      title: "Cyber Security 101",
      issuer: "TryHackMe",
      date: "2024",
      verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-4AYVMHVUCS.pdf",
      previewImage: "/certificates/cyber-101.png",
      description: "Core foundational concepts of information security, establishing baseline knowledge in threat landscapes and defense-in-depth strategies.",
      skills: ["Security Fundamentals", "Threat Landscapes", "Defense-in-Depth"]
    },
    {
      id: "pre-security",
      title: "Pre-Security",
      issuer: "TryHackMe",
      date: "2024",
      verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-9M5XCYAEFN.pdf",
      previewImage: "/certificates/pre-security.png",
      description: "Technical prerequisites for cybersecurity, covering networking protocols, Linux command line fundamentals, and Windows OS mechanics.",
      skills: ["Networking", "Linux Basics", "Windows OS", "TCP/IP"]
    }
  ],
  badges: [
    { id: "badge-1", title: "Network & System Security", issuer: "TryHackMe", url: "https://tryhackme.com/Kachisicho/badges/network-and-system-security" },
    { id: "badge-2", title: "Software Security", issuer: "TryHackMe", url: "https://tryhackme.com/Kachisicho/badges/software-security" },
    { id: "badge-3", title: "AI Path Completion", issuer: "TryHackMe", url: "https://tryhackme.com/Kachisicho/badges/ai-path-completion" },
    { id: "badge-4", title: "Model Compromise", issuer: "TryHackMe", url: "https://tryhackme.com/Kachisicho/badges/model-compromise" }
  ]
};

export default function CertificationsPage() {
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { 
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'unset'; 
    };
  }, [selectedCert]);

  return (
    <main className="flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-24 relative font-sans">
      
      {/* HIDDEN PRELOAD CACHE FOR ZERO-LATENCY MODAL IMAGES */}
      <div className="hidden">
        {credentials.pathways.map(cert => (
          <Image alt="preload" height={600} key={`preload-${cert.id}`} priority src={cert.previewImage} width={800}/>
        ))}
      </div>

      {/* HEADER SECTION */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-gray-800 pb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Verified Credentials
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Industry validations, technical security clearances, and completed learning pathways hosted on TryHackMe.
        </p>
      </motion.section>

      {/* SECTION 1: MAJOR CERTIFICATIONS */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16">
        <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6 font-mono uppercase tracking-wide text-sm">
          <ShieldCheck className="w-5 h-5 text-[#10B981]"/>
          Learning Pathways
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.pathways.map((cert) => (
            <button
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group relative flex flex-col p-6 bg-[#050505] border border-gray-800/60 rounded-xl hover:bg-[#0a0a0a] hover:border-[#10B981]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-[#10B981]/40"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] sm:text-xs font-mono font-semibold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded border border-[#10B981]/20">
                  {cert.issuer}
                </span>
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-2 group-hover:text-[#10B981] transition-colors">
                {cert.title}
              </h3>
              
              <span className="text-gray-500 font-mono text-xs mt-auto pt-4 flex items-center gap-2 border-t border-gray-800/60 w-full">
                <ShieldCheck className="w-4 h-4"/> Click to preview credential
              </span>
            </button>
          ))}
        </div>
      </motion.section>

      {/* SECTION 2: SPECIALIZED BADGES */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6 font-mono uppercase tracking-wide text-sm">
          <Award className="w-5 h-5 text-[#10B981]"/>
          Specialized Skill Badges
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {credentials.badges.map((badge) => (
            <a
              key={badge.id}
              href={badge.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-6 bg-[#050505] border border-gray-800/60 rounded-xl hover:bg-[#0a0a0a] hover:border-[#10B981]/40 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#10B981]/40"
            >
              <div className="w-12 h-12 mb-3 relative flex items-center justify-center bg-[#10B981]/10 rounded-full group-hover:scale-110 transition-transform duration-300 border border-[#10B981]/20">
                 <ShieldCheck className="w-5 h-5 text-[#10B981]"/>
              </div>
              <h3 className="text-xs font-medium text-center text-gray-400 group-hover:text-gray-100 transition-colors font-mono">
                {badge.title}
              </h3>
            </a>
          ))}
        </div>
      </motion.section>

      {/* MODAL IMPLEMENTATION */}
      {mounted ? createPortal(
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6">
              
              {/* Dark Overlay */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              />
              
              {/* Modal Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 w-full max-w-4xl bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} 
              >
                
                {/* Floating Close Button */}
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-2 rounded-full bg-black/50 text-gray-400 hover:text-white hover:bg-[#10B981]/20 border border-gray-700 hover:border-[#10B981] backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[#10B981]/40"
                >
                  <X className="w-5 h-5"/>
                </button>

                {/* LEFT COLUMN: Visual Preview */}
                <div className="w-full h-[35vh] md:h-auto md:w-1/2 bg-[#050505] border-b md:border-b-0 md:border-r border-gray-800 relative flex-shrink-0 flex items-center justify-center p-6">
                  <div className="flex flex-col items-center gap-3 text-gray-600 z-10">
                    <Award className="w-10 h-10"/>
                    <span className="font-mono text-xs text-center">[ Awaiting image: {selectedCert.previewImage} ]</span>
                  </div>
                  
                  {/* Image Render (Will overlay the text above once images exist in /public/certificates/) */}
                  <Image alt={selectedCert.title} className="object-contain p-4 z-20" fill src={selectedCert.previewImage} />
                </div>

                {/* RIGHT COLUMN: Content & Details */}
                <div className="w-full md:w-1/2 flex flex-col bg-[#0a0a0a] flex-grow overflow-hidden h-[50vh] md:h-auto">
                  
                  {/* Header */}
                  <div className="p-6 pb-4 border-b border-gray-800 flex-shrink-0 z-10">
                    <span className="text-[10px] sm:text-xs font-mono text-[#10B981] uppercase tracking-wider block mb-2">
                      {selectedCert.issuer} • {selectedCert.date}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white pr-8 leading-tight">
                      {selectedCert.title}
                    </h3>
                  </div>

                  {/* Scrollable Description */}
                  <div className="p-6 overflow-y-auto flex-grow custom-scrollbar">
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
                      {selectedCert.description}
                    </p>

                    <div>
                      <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">Validated Skills</h4>
                      <div className="flex flex-wrap gap-2.5">
                        {selectedCert.skills?.map((skill: string, idx: number) => (
                          <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-[#050505] border border-gray-800 text-gray-300">
                            <CheckCircle2 className="w-3 h-3 text-[#10B981] flex-shrink-0"/> 
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-6 pt-4 border-t border-gray-800 flex-shrink-0 z-10">
                    <a 
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 w-full py-3.5 bg-[#10B981]/10 border border-[#10B981]/50 text-[#10B981] rounded-xl font-mono text-sm font-bold hover:bg-[#10B981]/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/40"
                    >
                      Verify Official PDF <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16}/>
                    </a>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      ) : null}
    </main>
  );
}
