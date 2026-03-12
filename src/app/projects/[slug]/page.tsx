"use client";

import { motion, Variants } from "framer-motion";
import { ArrowLeft, TerminalSquare } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  // In a real app, you would fetch data based on the slug here
  // For now, we use a static mock based on the first project
  const report = {
    title: slug === "jwt-bypass" ? "Bypassing JWT Authentication in Legacy API" : "Mock Vulnerability Report",
    date: "2026.02.14",
    severity: "Critical",
    target: "legacy-api.local",
    summary: "During a routine application penetration test, a zero-day vulnerability was discovered within a custom implementation of JSON Web Tokens (JWT). The application failed to validate the signing algorithm specified in the token header, allowing an attacker to modify the payload, set the algorithm to 'none', and forge a token as a high-privileged administrator.",
    description: "The authentication service issues a JWT upon successful login. However, the backend validation routine relies solely on the 'alg' header parameter to determine how to verify the signature. By stripping the signature entirely and modifying the header to `{'alg': 'none', 'typ': 'JWT'}`, the backend processes the token as valid without requiring the secret key. This permits arbitrary manipulation of the 'role' claim within the payload.",
    remediation: [
      "Hardcode the expected algorithm (e.g., HS256 or RS256) in the verification library instead of trusting the token header.",
      "Reject any tokens where the algorithm is set to 'none'.",
      "Ensure the JWT library being used is up to date and not vulnerable to 'alg: none' attacks inherently."
    ]
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 } 
    }
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-[80vh] w-full max-w-4xl mx-auto flex flex-col gap-8 pb-24">
      
      {/* Back Navigation */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-accent-mint hover:text-emerald-400 dark:text-accent-mint/80 dark:hover:text-accent-mint font-secondary text-sm group transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-mint rounded"
        >
          <motion.div variants={{ hover: { x: -5, transition: { duration: 0.2 } } }} whileHover="hover" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Archive
          </motion.div>
        </Link>
      </motion.div>

      <motion.article 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-10"
      >
        {/* Header & Metadata */}
        <motion.header variants={sectionVariants} className="flex flex-col gap-6">
          <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight break-words">
            <span className="bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 text-transparent bg-clip-text">
              {report.title}
            </span>
          </h1>
          
          <div className="backdrop-blur-md bg-white/70 border border-gray-200 shadow-md dark:bg-white/5 dark:border-white/10 dark:shadow-inner rounded-xl p-4 flex flex-wrap gap-4 md:gap-8 font-secondary text-xs sm:text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-slate-500 dark:text-slate-400">Date</span>
              <span className="text-slate-800 dark:text-slate-300 font-medium">[{report.date}]</span>
            </div>
            
            <div className="hidden sm:block w-px bg-gray-300 dark:bg-white/10" />
            
            <div className="flex flex-col gap-1">
              <span className="text-slate-500 dark:text-slate-400">Severity</span>
              <span className={`font-medium ${
                report.severity === "Critical" ? "text-red-500 dark:text-red-400" :
                report.severity === "High" ? "text-orange-500 dark:text-orange-400" :
                "text-yellow-600 dark:text-yellow-400"
              }`}>
                [{report.severity}]
              </span>
            </div>

            <div className="hidden sm:block w-px bg-gray-300 dark:bg-white/10" />

            <div className="flex flex-col gap-1">
              <span className="text-slate-500 dark:text-slate-400">Scope</span>
              <span className="text-slate-800 dark:text-slate-300 font-medium">Target: {report.target}</span>
            </div>
          </div>
        </motion.header>

        {/* Executive Summary */}
        <motion.section variants={sectionVariants} className="flex flex-col gap-4">
          <h2 className="font-secondary text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TerminalSquare className="w-5 h-5 text-accent-mint" />
            01_Executive_Summary
          </h2>
          <p className="font-primary text-slate-800 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            {report.summary}
          </p>
        </motion.section>

        {/* Technical Description */}
        <motion.section variants={sectionVariants} className="flex flex-col gap-4">
          <h2 className="font-secondary text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TerminalSquare className="w-5 h-5 text-accent-mint" />
            02_Technical_Description
          </h2>
          <p className="font-primary text-slate-800 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            {report.description}
          </p>
        </motion.section>

        {/* Proof of Concept */}
        <motion.section variants={sectionVariants} className="flex flex-col gap-4">
          <h2 className="font-secondary text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TerminalSquare className="w-5 h-5 text-accent-mint" />
            03_Proof_of_Concept
          </h2>
          
          <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#0a0a0a] shadow-2xl">
            {/* MacOS Window Bar */}
            <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-4 font-secondary text-xs text-slate-400">exploit.py</span>
            </div>
            
            {/* Code Content */}
            <div className="p-4 overflow-x-auto text-xs sm:text-sm font-secondary scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              <pre className="text-slate-300">
<span className="text-pink-400">import</span> base64
<span className="text-pink-400">import</span> json

<span className="text-slate-500"># 1. Create original payload</span>
header = <span className="text-emerald-300">&#123;"alg": "none", "typ": "JWT"&#125;</span>
payload = <span className="text-emerald-300">&#123;"user": "attacker", "role": "admin"&#125;</span>

<span className="text-slate-500"># 2. Encode without signature</span>
enc_header = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip(<span className="text-yellow-300">"="</span>)
enc_payload = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip(<span className="text-yellow-300">"="</span>)

<span className="text-slate-500"># 3. Forge token</span>
forged_token = f<span className="text-yellow-300">"&#123;enc_header&#125;.&#123;enc_payload&#125;."</span>
<span className="text-sky-400">print</span>(f<span className="text-yellow-300">"Sending forged token: &#123;forged_token&#125;"</span>)
              </pre>
            </div>
          </div>
        </motion.section>

        {/* Remediation */}
        <motion.section variants={sectionVariants} className="flex flex-col gap-4">
          <h2 className="font-secondary text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TerminalSquare className="w-5 h-5 text-accent-mint" />
            04_Remediation
          </h2>
          <ul className="list-disc pl-6 space-y-2 font-primary text-slate-800 dark:text-slate-300 text-sm sm:text-base marker:text-accent-mint">
            {report.remediation.map((item, index) => (
              <li key={index} className="pl-2">{item}</li>
            ))}
          </ul>
        </motion.section>
        
      </motion.article>
    </div>
  );
}
