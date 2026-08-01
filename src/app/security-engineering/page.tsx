import { Metadata } from "next";
import ExpertiseTemplate from "@/components/ExpertiseTemplate";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Security Engineering Portfolio | Okoh Bernard Onyedikachi",
  description: "Specialized expertise in Security Architecture, DevSecOps, and Cloud Security.",
};

export default function SecurityEngineeringPage() {
  const data = {
    title: "Security Engineering",
    icon: <Shield className="w-5 h-5" />,
    summary: [
      "Security Engineer specializing in designing and implementing robust defense-in-depth architectures.",
      "I excel at securing REST APIs, conducting rigorous threat modeling, hardening on-premise and cloud infrastructure, and orchestrating comprehensive security monitoring and response strategies."
    ],
    skills: [
      { category: "Infrastructure & Cloud", items: ["Windows Server", "Linux Hardening", "AWS", "Docker", "Kubernetes", "Terraform"] },
      { category: "Identity & Access", items: ["Active Directory", "Microsoft Entra ID", "IAM", "Access Control"] },
      { category: "Monitoring & Defense", items: ["Microsoft Sentinel", "Splunk Enterprise", "Wazuh", "Nessus", "Wireshark"] },
      { category: "Automation", items: ["Python", "PowerShell", "Bash"] }
    ],
    projects: [
      { title: "Secure Network Architecture", url: "https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Network%20And%20System%20Security/Secure%20Network%20Architecture.md", category: "Architecture" },
      { title: "Active Directory Hardening", url: "https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Network%20And%20System%20Security/Active%20Directory%20Hardening.md", category: "Infrastructure" },
      { title: "Linux System Hardening", url: "https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Network%20And%20System%20Security/Linux%20System%20Hardening.md", category: "Infrastructure" },
      { title: "Windows System Hardening", url: "https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Network%20And%20System%20Security/Microsoft%20Windows%20System%20Hardening.md", category: "Infrastructure" },
      { title: "Cloud Security Fundamentals", url: "https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Network%20And%20System%20Security/Cloud%20Security%20Fundamentals.md", category: "Cloud" },
      { title: "Introduction to Security Engineering", url: "https://github.com/OnyedikachiO/Security-Engineer-Projects-/tree/main/Intro%20To%20Security%20Engeering", category: "Frameworks" }
    ]
  };

  return (
    <main>
      <ExpertiseTemplate data={data} />
    </main>
  );
}
