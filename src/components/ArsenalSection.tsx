"use client";
import { useState } from "react";
import { FiCrosshair, FiShield, FiChevronDown, FiTerminal } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// Outcomes-First Data Structure
const capabilitiesData = {
  offensive: [
    { id: "recon", title: "Network Reconnaissance", desc: "Mapping external and internal attack surfaces to identify exposed assets and open ports before a malicious actor does.", tools: ["Nmap", "Masscan", "ffuf"] },
    { id: "appsec", title: "Application Security", desc: "Discovering business logic flaws, injection points, and vulnerabilities in web applications prior to deployment.", tools: ["Burp Suite", "OWASP ZAP", "sqlmap"] },
    { id: "simulation", title: "Threat Simulation", desc: "Safely executing real-world attack scenarios to validate the severity of security gaps and test defense mechanisms.", tools: ["Metasploit", "Netcat", "PrivEsc"] },
    { id: "auth", title: "Credential Assessment", desc: "Auditing password strength and authentication workflows to ensure resilience against brute-force and dictionary attacks.", tools: ["Hashcat", "Hydra", "John the Ripper"] }
  ],
  defensive: [
    { id: "iam", title: "Identity & Access Management", desc: "Enforcing zero-trust policies, managing domain privileges, and securing user authentication pathways.", tools: ["Active Directory", "Microsoft Entra ID"] },
    { id: "detection", title: "Threat Detection & SIEM", desc: "Aggregating system logs and network telemetry to monitor, detect, and alert on suspicious behavior in real-time.", tools: ["Splunk", "Microsoft Sentinel", "Wazuh"] },
    { id: "cloud", title: "Cloud & Container Security", desc: "Hardening cloud environments, configuring strict IAM guardrails, and securing containerized applications.", tools: ["AWS", "Docker", "Kubernetes"] },
    { id: "vuln", title: "Vulnerability Management", desc: "Continuously scanning internal and external infrastructure to identify, prioritize, and patch known vulnerabilities.", tools: ["Nessus", "Wireshark", "OS Hardening"] }
  ]
};

const frameworks = [
  { name: "PTES", desc: "Penetration Testing Execution Standard" },
  { name: "OWASP Top 10", desc: "Web Application Security Guidelines" },
  { name: "NIST CSF", desc: "Cybersecurity Framework Controls" }
];

export default function ArsenalSection() {
  const [mode, setMode] = useState<"offensive" | "defensive">("offensive");
  
  // Advanced Desktop State Logic
  const [lockedCap, setLockedCap] = useState(capabilitiesData.offensive[0]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [hoverCap, setHoverCap] = useState<any | null>(null);
  
  // Mobile Accordion State
  const [openMobileId, setOpenMobileId] = useState<string | null>(capabilitiesData.offensive[0].id);

  const currentData = capabilitiesData[mode];
  
  // The terminal always shows the hovered card, unless nothing is hovered, then it shows the locked card
  const displayCap = hoverCap || lockedCap;

  // Handle Mode Switch
  const handleModeSwitch = (newMode: "offensive" | "defensive") => {
    setMode(newMode);
    setLockedCap(capabilitiesData[newMode][0]);
    setHoverCap(null);
    setOpenMobileId(capabilitiesData[newMode][0].id);
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-16 sm:py-24 flex flex-col gap-8 sm:gap-12 font-sans relative">
      
      {/* CENTERED HEADER & TOGGLE */}
      <div className="flex flex-col items-center text-center gap-6 border-b border-gray-800 pb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Core Capabilities
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A high-level view of how I identify vulnerabilities, secure infrastructure, and maintain industry compliance.
          </p>
        </div>

        {/* RED / BLUE TEAM TOGGLE */}
        <div className="flex items-center bg-[#050505] border border-gray-800 rounded-lg p-1 shadow-inner shadow-black/50 w-full md:w-auto mt-2">
          <button 
            onClick={() => handleModeSwitch("offensive")}
            className={`flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
              mode === "offensive" ? "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20 shadow-sm" : "text-gray-500 hover:text-gray-300 border border-transparent"
            }`}
          >
            <FiCrosshair size={16}/> Offensive
          </button>
          <button 
            onClick={() => handleModeSwitch("defensive")}
            className={`flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
              mode === "defensive" ? "bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20 shadow-sm" : "text-gray-500 hover:text-gray-300 border border-transparent"
            }`}
          >
            <FiShield size={16}/> Defensive
          </button>
        </div>
      </div>

      {/* MOBILE VIEW: Interactive Accordion */}
      <div className="lg:hidden flex flex-col gap-3">
        {currentData.map((cap) => (
          <div key={cap.id} className="bg-[#050505] border border-gray-800/80 rounded-xl overflow-hidden shadow-md">
            <button 
              onClick={() => setOpenMobileId(openMobileId === cap.id ? null : cap.id)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
            >
              <h3 className={`font-semibold sm:text-lg transition-colors ${openMobileId === cap.id ? (mode === "offensive" ? "text-[#ef4444]" : "text-[#3b82f6]") : "text-gray-200"}`}>
                {cap.title}
              </h3>
              <FiChevronDown className={`text-gray-500 duration-300 transition-transform ${openMobileId === cap.id ? "rotate-180" : "rotate-0"}`} size={18} />
            </button>
            
            <AnimatePresence initial={false}>
              {openMobileId === cap.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 sm:p-5 pt-0 border-t border-gray-800/50">
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{cap.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {cap.tools.map(tool => (
                        <span key={tool} className={`text-[10px] font-mono px-2 py-1 rounded bg-[#0a0a0a] border ${mode === "offensive" ? "border-[#ef4444]/20 text-gray-300" : "border-[#3b82f6]/20 text-gray-300"}`}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: List + Terminal Split */}
      <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
        
        {/* Left: Capability Selector List */}
        <div 
          className="col-span-5 flex flex-col gap-3"
          onMouseLeave={() => setHoverCap(null)} // Revert to locked state when mouse leaves the list
        >
          {currentData.map((cap) => (
            <button
              key={cap.id}
              onClick={() => setLockedCap(cap)}
              onMouseEnter={() => setHoverCap(cap)}
              className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                lockedCap.id === cap.id 
                  ? (mode === "offensive" ? "bg-[#0a0a0a] border-[#ef4444]/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]" : "bg-[#0a0a0a] border-[#3b82f6]/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]") 
                  : hoverCap?.id === cap.id
                  ? "bg-[#0a0a0a] border-gray-600"
                  : "bg-[#050505] border-gray-800/60 hover:bg-[#0a0a0a]"
              }`}
            >
              <h3 className={`font-bold text-lg mb-1 ${lockedCap.id === cap.id ? "text-white" : "text-gray-400"}`}>
                {cap.title}
              </h3>
              <p className={`text-sm line-clamp-1 ${lockedCap.id === cap.id ? "text-gray-400" : "text-gray-600"}`}>
                {cap.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Right: Interactive Terminal Display */}
        <div className="col-span-7 bg-[#050505] border border-gray-800/80 rounded-2xl p-8 flex flex-col h-full min-h-[300px] shadow-2xl relative overflow-hidden">
          
          {/* Animated Terminal Header */}
          <div className="flex items-center gap-2 mb-6 border-b border-gray-800/50 pb-4">
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.1 }} className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_rgba(255,95,86,0.5)]"></motion.div>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.2 }} className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_rgba(255,189,46,0.5)]"></motion.div>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.3 }} className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.5)]"></motion.div>
            <span className="ml-2 text-gray-500 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
              <FiTerminal/> Active Module: {displayCap.title}
            </span>
          </div>
          
          {/* Terminal Output */}
          <div className="flex-grow flex flex-col justify-center font-mono">
            <p className="text-[#10B981] text-base leading-relaxed mb-6">
              <span className="text-gray-500 mr-2">&gt;</span> {displayCap.desc}
            </p>
            
            <div className="mt-auto">
              <span className="text-gray-600 text-xs uppercase tracking-widest mb-3 block">Key Tools Utilized:</span>
              <div className="flex flex-wrap gap-3">
                {displayCap.tools.map((tool: string) => (
                  <span key={tool} className={`text-xs px-3 py-1.5 rounded border ${mode === "offensive" ? "bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]" : "bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]"}`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPACT METHODOLOGY ANCHORS */}
      <div className="mt-8 border-t border-gray-800/50 pt-10">
        <h3 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-6 text-center">Governing Compliance Frameworks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {frameworks.map((fw) => (
            <div key={fw.name} className="flex items-center justify-between p-4 bg-[#050505] border border-gray-800/80 rounded-xl hover:bg-[#0a0a0a] transition-colors">
              <div>
                <h4 className="text-gray-200 font-bold text-sm">{fw.name}</h4>
                <p className="text-gray-500 text-xs mt-1">{fw.desc}</p>
              </div>
              <div className="flex flex-col items-end gap-1 ml-4">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]"></span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
