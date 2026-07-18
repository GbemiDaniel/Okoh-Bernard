"use client";
import ExpertiseTemplate from "@/components/ExpertiseTemplate";
import { Shield } from "lucide-react";
import { useSectionObserver } from "@/hooks/useSectionObserver";

export default function SecurityEngineeringPage() {
  const heroRef = useSectionObserver("Expertise / Security Engineering");

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
      { title: "Secure Network Architecture", url: "#", category: "Architecture" },
      { title: "Active Directory Hardening", url: "#", category: "Infrastructure" },
      { title: "Linux System Hardening", url: "#", category: "Infrastructure" },
      { title: "Windows System Hardening", url: "#", category: "Infrastructure" },
      { title: "Implementing Cloud Security Controls in AWS", url: "#", category: "Cloud" },
      { title: "Identity & Access Management (IAM) Fundamentals", url: "#", category: "IAM" }
    ]
  };

  return (
    <div ref={heroRef}>
      <ExpertiseTemplate data={data} />
    </div>
  );
}
