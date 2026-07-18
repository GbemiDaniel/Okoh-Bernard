"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Award, Download, CheckCircle2, X } from "lucide-react";
import Image from "next/image";

const credentials = {
  pathways: [
    {
      id: 1,
      title: "Jr. Penetration Tester",
      issuer: "TryHackMe",
      date: "2025",
      type: "Certification",
      verifyUrl: "https://tryhackme.com/certificate/your-cert-id",
      image: "/badges/jr-pentester.png",
      previewImage: "/certificates/previews/jr-pentester-cert.png",
      description: "An intensive, hands-on pathway covering the entire attack lifecycle. This certification required exploiting numerous vulnerable lab environments, writing custom scripts, and demonstrating proficiency in industry-standard offensive security tooling.",
      skills: ["Vulnerability Scanning", "Web App Exploitation", "Privilege Escalation", "Burp Suite"]
    },
    {
      id: 2,
      title: "Security Engineer",
      issuer: "TryHackMe",
      date: "2025",
      type: "Certification",
      verifyUrl: "https://tryhackme.com/certificate/your-cert-id-2",
      image: "/badges/security-engineer.png",
      previewImage: "/certificates/previews/security-engineer-cert.png",
      description: "A comprehensive pathway focused on defensive security, incident response, and threat hunting. Required configuring SIEM solutions, analyzing logs, and implementing robust security architectures.",
      skills: ["SIEM", "Incident Response", "Network Security", "Threat Hunting"]
    },
    {
      id: 3,
      title: "Cyber Security 101",
      issuer: "TryHackMe",
      date: "2024",
      type: "Certification",
      verifyUrl: "https://tryhackme.com/certificate/your-cert-id-3",
      image: "/badges/cyber-101.png",
      previewImage: "/certificates/previews/cyber-101-cert.png",
      description: "A foundational pathway covering the core concepts of information security, including networking protocols, cryptography, and basic web vulnerabilities.",
      skills: ["Networking Basics", "Cryptography", "Linux Fundamentals", "Web Basics"]
    },
    {
      id: 4,
      title: "Pre-Security",
      issuer: "TryHackMe",
      date: "2024",
      type: "Certification",
      verifyUrl: "https://tryhackme.com/certificate/your-cert-id-4",
      image: "/badges/pre-security.png",
      previewImage: "/certificates/previews/pre-security-cert.png",
      description: "An introductory pathway designed to build prerequisite knowledge in networking, web technologies, and operating systems before diving into offensive security.",
      skills: ["OSI Model", "TCP/IP", "Web Infrastructure", "Linux Command Line"]
    }
  ],
  badges: [
    { id: 5, title: "Network & System Security", issuer: "TryHackMe", image: "/badges/network-security.png" },
    { id: 6, title: "Software Security", issuer: "TryHackMe", image: "/badges/software-security.png" },
    { id: 7, title: "AI Path Completion", issuer: "TryHackMe", image: "/badges/ai-security.png" },
    { id: 8, title: "Model Compromise", issuer: "TryHackMe", image: "/badges/model-compromise.png" }
  ]
};

export default function CertificationsPage() {
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  // Handle SSR & Scroll Locking
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
    <div className="pb-24 font-secondary">
      
      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Credentials & Certifications
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          A collection of verified learning pathways, specialized skill badges, and official certifications validating technical proficiency in offensive and defensive security.
        </p>
      </motion.div>

      {/* Section 1: Major Certifications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-6">
          <ShieldCheck className="w-6 h-6 text-[#10B981]"/>
          Learning Pathways
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {credentials.pathways.map((cert) => (
            <button
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group relative flex flex-col p-6 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl hover:border-[#10B981]/50 transition-all duration-300 shadow-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] overflow-hidden text-left"
            >
              {/* Image Placeholder / Rendering */}
              <div className="aspect-square w-24 sm:w-32 mx-auto mb-6 relative flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-full group-hover:scale-105 transition-transform duration-300">
                <Award className="w-10 h-10 text-gray-400 dark:text-gray-500 absolute" />
              </div>
              
              <div className="flex flex-col flex-grow text-center">
                <span className="text-xs font-mono text-[#10B981] uppercase tracking-wider mb-2">{cert.issuer}</span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#10B981] transition-colors">{cert.title}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4"/> View Details
                </span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Section 2: Specialized Badges */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-6">
          <Award className="w-6 h-6 text-[#10B981]"/>
          Specialized Skill Badges
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {credentials.badges.map((badge) => (
            <div
              key={badge.id}
              className="group flex flex-col items-center justify-center p-6 bg-transparent border border-gray-200 dark:border-white/5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 relative flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-full group-hover:rotate-12 transition-transform duration-300">
                 <ShieldCheck className="w-6 h-6 text-gray-400 dark:text-gray-500 absolute" />
              </div>
              <h3 className="text-sm font-medium text-center text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {badge.title}
              </h3>
            </div>
          ))}
        </div>
      </motion.div>

      {/* MODAL IMPLEMENTATION */}
      {/* Certification Detail Modal - Portal + Split View */}
      {mounted ? createPortal(
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6">
              
              {/* Dark Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              />
              
              {/* Modal Container - Split Layout */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 w-full max-w-4xl bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[85vh]"
                onClick={(e) => e.stopPropagation()} 
              >
                
                {/* Floating Close Button (Absolute to the whole modal) */}
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-2 rounded-full bg-white/80 dark:bg-black/50 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-black backdrop-blur-md transition-colors shadow-sm"
                >
                  <X className="w-5 h-5"/>
                </button>

                {/* LEFT COLUMN: Visual Preview */}
                {/* Mobile: 35vh height. Desktop: 50% width, auto height */}
                <div className="w-full h-[35vh] md:h-auto md:w-1/2 bg-gray-100 dark:bg-[#050505] border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/10 relative flex-shrink-0 flex items-center justify-center p-6 md:p-8">
                  <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500 z-10">
                    <Award className="w-10 h-10"/>
                    <span className="font-mono text-xs sm:text-sm truncate max-w-[200px] text-center">
                      [ {selectedCert.title.replace(/\s+/g, '_')}.png ]
                    </span>
                  </div>
                  
                  {/* UNCOMMENT ONCE IMAGES ARE IN PUBLIC FOLDER */}
                  {/* <Image alt={`${selectedCert.title} Certificate`} className="object-contain p-4 md:p-8 hover:scale-105 transition-transform duration-500 z-20" fill src={selectedCert.previewImage}/> */}
                </div>

                {/* RIGHT COLUMN: Content & Details */}
                {/* Takes up remaining height on mobile, 50% width on desktop */}
                <div className="w-full md:w-1/2 flex flex-col bg-white dark:bg-[#0A0A0A] flex-grow overflow-hidden h-[50vh] md:h-auto">
                  
                  {/* Pinned Header */}
                  <div className="p-6 pb-4 border-b border-gray-100 dark:border-white/10 flex-shrink-0 z-10 bg-white dark:bg-[#0A0A0A]">
                    <span className="text-[10px] sm:text-xs font-mono text-[#10B981] uppercase tracking-wider block mb-2">
                      {selectedCert.issuer} • {selectedCert.date}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white pr-8 leading-tight">
                      {selectedCert.title}
                    </h3>
                  </div>

                  {/* Scrollable Description & Skills */}
                  <div className="p-6 overflow-y-auto flex-grow">
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                      {selectedCert.description}
                    </p>

                    <div>
                      <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4">Validated Skills</h4>
                      <div className="flex flex-wrap gap-2.5">
                        {selectedCert.skills?.map((skill: string, idx: number) => (
                          <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300">
                            <CheckCircle2 className="w-3 h-3 text-[#10B981] flex-shrink-0"/> 
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pinned Footer / Action */}
                  <div className="p-6 pt-4 border-t border-gray-100 dark:border-white/10 flex-shrink-0 z-10 bg-white dark:bg-[#0A0A0A]">
                    <a 
                      href={selectedCert.verifyUrl || selectedCert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 w-full py-3.5 bg-transparent border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-xl font-secondary text-sm font-bold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
                    >
                      <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform"/> Verify Credential Online
                    </a>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      ) : null}
    </div>
  );
}
