import { Metadata } from "next";
import ExpertiseTemplate from "@/components/ExpertiseTemplate";
import { Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Penetration Testing Portfolio | Okoh Bernard Onyedikachi",
  description: "Specialized expertise in Penetration Testing, Web Application Security, and Vulnerability Assessment.",
};

export default function PenetrationTestingPage() {
  const data = {
    title: "Penetration Testing",
    icon: <Terminal className="w-5 h-5" />,
    summary: [
      "Penetration Tester specializing in identifying and exploiting critical security vulnerabilities across diverse technical environments.",
      "I perform full-scope assessments—from external network perimeter breaching and internal lateral movement to deep-dive web application logic flaws—focusing on delivering actionable remediation."
    ],
    skills: [
      { category: "Recon & Mapping", items: ["Nmap", "Wireshark", "BloodHound"] },
      { category: "Web App Testing", items: ["Burp Suite", "OWASP ZAP", "sqlmap"] },
      { category: "Exploitation & AD", items: ["Metasploit", "Impacket", "CrackMapExec", "Responder"] },
      { category: "Post-Exploitation", items: ["LinPEAS", "WinPEAS", "Mimikatz"] },
      { category: "Credential Attacks", items: ["Hashcat", "John the Ripper"] }
    ],
    projects: [
      { title: "Secured API Development: OWASP API Security Top 10", url: "https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/Secure%20API%20Development%3A%20OWASP%20API%20Security%20Top%2010%20Practical%20Assessment.md", category: "Web App" },
      { title: "Linux Privilege Escalation via Kernel Exploitation", url: "https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/Linux%20Privilege%20Escalation%20via%20Kernel%20Exploitation.md", category: "Exploitation" },
      { title: "JWT Signature Validation", url: "https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/JWT%20Signature%20Validation%20Vulnerabilities%20Assessment.md", category: "Web App" },
      { title: "OWASP Top 10 2025: IAAA Failures", url: "https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/OWASP%20Top%2010%202025%3A%20IAAA%20Failures%20Analysis.md", category: "Vulnerability Research" }
    ]
  };

  return (
    <main>
      <ExpertiseTemplate data={data} />
    </main>
  );
}
