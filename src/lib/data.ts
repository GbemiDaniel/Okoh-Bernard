import { Project, Certification, Article, ToolCategory, PersonalInfo } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Onyedikachi Bernard Okoh",
  tagline: "Security Engineer | Penetration Testing | AI Security",
  hook: "From finding critical vulnerabilities to embedding security into the development lifecycle — I break things on purpose, so your systems stay unbreakable.",
  bio: [
    "Hi, I’m Onyedikachi Bernard Okoh, a cybersecurity professional passionate about understanding how systems operate, how they fail, and how to enhance their security. My journey into the field of cybersecurity was not traditional. I graduated from the University of Nigeria in 2024 with a Bachelor's degree in Agriculture (Crop Science), but my passion for technology began long before I considered it as a career.",
    "Even before university, I spent countless hours exploring computers, experimenting with both Windows and Linux, and learning basic computing skills. I was naturally drawn to command-line interfaces, system configurations, and the underlying mechanics of operating systems.",
    "In 2023, my curiosity evolved into something much greater. I became intrigued by the technology behind websites, applications, and digital systems. Every platform I encountered prompted me to ask, 'How does this work?' This question became the driving force behind my learning journey, leading me into software engineering.",
    "One of the aspects that naturally drew me to cybersecurity was my ability to recognize patterns—not just in technology but also in human behavior. I realized that securing technology is not solely about code and tools; it is also about understanding the human behaviors that influence security.",
    "Since then, I have committed myself to building practical skills through continuous learning, hands-on experimentation, and tackling real-world security challenges. At my core, what defines me most is my curiosity. I enjoy questioning assumptions, exploring how systems work beneath the surface, and approaching problems with both the curiosity of an attacker and the responsibility of a defender.",
    "Outside of cybersecurity, I enjoy playing football, reading, singing, and playing the guitar. I believe that the best security professionals are those who never stop learning. Technology evolves every day, and so do I."
  ],
  education: "University of Nigeria, Nsukka",
  contact: {
    email: "kachisichobernardokoh@gmail.com",
    linkedin: "[https://www.linkedin.com/in/onyedikachi-bernard-okoh-405861262](https://www.linkedin.com/in/onyedikachi-bernard-okoh-405861262)",
    tryhackme: "[https://tryhackme.com/p/Kachisicho](https://tryhackme.com/p/Kachisicho)",
    github: {
      security: "[https://github.com/OnyedikachiO/Security-Engineer-Projects-](https://github.com/OnyedikachiO/Security-Engineer-Projects-)",
      pentest: "[https://github.com/OnyedikachiO/TryHackMe_Projects](https://github.com/OnyedikachiO/TryHackMe_Projects)",
      ai: "[https://github.com/OnyedikachiO/AI-Security-Portfolio](https://github.com/OnyedikachiO/AI-Security-Portfolio)"
    }
  }
};

export const projects: Project[] = [
  {
    id: "pt-1",
    title: "Secured API Development: OWASP API Security Top 10",
    category: "Penetration Testing",
    description: "Practical assessment focusing on OWASP API Security Top 10 vulnerabilities.",
    repoUrl: "[https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/Secure%20API%20Development%3A%20OWASP%20API%20Security%20Top%2010%20Practical%20Assessment.md](https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/Secure%20API%20Development%3A%20OWASP%20API%20Security%20Top%2010%20Practical%20Assessment.md)"
  },
  {
    id: "pt-2",
    title: "Linux Privilege Escalation via Kernel Exploitation",
    category: "Penetration Testing",
    description: "Advanced privilege escalation techniques in Linux environments.",
    repoUrl: "[https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/Linux%20Privilege%20Escalation%20via%20Kernel%20Exploitation.md](https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/Linux%20Privilege%20Escalation%20via%20Kernel%20Exploitation.md)"
  },
  {
    id: "pt-3",
    title: "JWT Signature Validation Vulnerabilities",
    category: "Penetration Testing",
    description: "Assessment of JWT implementation flaws and signature bypass techniques.",
    repoUrl: "[https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/JWT%20Signature%20Validation%20Vulnerabilities%20Assessment.md](https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/JWT%20Signature%20Validation%20Vulnerabilities%20Assessment.md)"
  },
  {
    id: "pt-4",
    title: "OWASP Top 10 2025: IAAA Failures Analysis",
    category: "Penetration Testing",
    description: "Detailed analysis of Identification, Authentication, and Authorization failures.",
    repoUrl: "[https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/OWASP%20Top%2010%202025%3A%20IAAA%20Failures%20Analysis.md](https://github.com/OnyedikachiO/TryHackMe_Projects/blob/main/OWASP%20Top%2010%202025%3A%20IAAA%20Failures%20Analysis.md)"
  },
  {
    id: "se-1",
    title: "Secure Network Architecture",
    category: "Security Engineering",
    description: "Design and implementation of a secure enterprise network topology.",
    repoUrl: "[https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Secure%20Network%20Architecture.md](https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Secure%20Network%20Architecture.md)"
  },
  {
    id: "se-2",
    title: "Active Directory Security & Hardening",
    category: "Security Engineering",
    description: "Comprehensive hardening of Active Directory environments.",
    repoUrl: "[https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Active%20Directory%20Hardening.md](https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Active%20Directory%20Hardening.md)"
  },
  {
    id: "se-3",
    title: "Linux System Hardening",
    category: "Security Engineering",
    description: "Implementing CIS benchmarks and security controls on Linux infrastructure.",
    repoUrl: "[https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Linux%20System%20Hardening.md](https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Linux%20System%20Hardening.md)"
  },
  {
    id: "se-4",
    title: "Windows System Hardening",
    category: "Security Engineering",
    description: "Securing Microsoft Windows environments against modern threat vectors.",
    repoUrl: "[https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Microsoft%20Windows%20System%20Hardening.md](https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Microsoft%20Windows%20System%20Hardening.md)"
  },
  {
    id: "se-5",
    title: "Implementing Cloud Security Controls in AWS",
    category: "Security Engineering",
    description: "Deployment of fundamental cloud security mechanisms within Amazon Web Services.",
    repoUrl: "[https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Implementing%20Cloud%20Security%20Controls%20in%20AWS.md](https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Implementing%20Cloud%20Security%20Controls%20in%20AWS.md)"
  },
  {
    id: "se-6",
    title: "Identity & Access Management (IAM) Fundamentals",
    category: "Security Engineering",
    description: "Architecting robust IAM policies and zero-trust principles.",
    repoUrl: "[https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Identity%20%26%20Access%20Management%20(IAM)%20Fundamentals.md](https://github.com/OnyedikachiO/Security-Engineer-Projects-/blob/main/Identity%20%26%20Access%20Management%20(IAM)%20Fundamentals.md)"
  }
];

export const articles: Article[] = [
  {
    id: "art-1",
    title: "Understanding Identity and Access Management (IAM)",
    url: "[https://medium.com/@kachisichobernardokoh/understanding-identity-and-access-management-iam-dec3f14e139a](https://medium.com/@kachisichobernardokoh/understanding-identity-and-access-management-iam-dec3f14e139a)"
  },
  {
    id: "art-2",
    title: "Cracking the Code: A Practical Guide to Classical & Modern Cryptography",
    url: "[https://medium.com/@kachisichobernardokoh/cracking-the-code-a-practical-guide-to-classical-modern-cryptography-tryhackme-walkthrough-e0ea319d9d11](https://medium.com/@kachisichobernardokoh/cracking-the-code-a-practical-guide-to-classical-modern-cryptography-tryhackme-walkthrough-e0ea319d9d11)"
  },
  {
    id: "art-3",
    title: "Threat Modeling and Risk Assessment Frameworks",
    url: "[https://medium.com/@kachisichobernardokoh/threat-modeling-and-risk-assessment-frameworks-70a93b193313](https://medium.com/@kachisichobernardokoh/threat-modeling-and-risk-assessment-frameworks-70a93b193313)"
  },
  {
    id: "art-4",
    title: "Navigating Security Governance, Frameworks, and Compliance",
    url: "[https://medium.com/@kachisichobernardokoh/navigating-security-governance-frameworks-and-compliance-7ab8ae780b0c](https://medium.com/@kachisichobernardokoh/navigating-security-governance-frameworks-and-compliance-7ab8ae780b0c)"
  }
];

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "Security Engineer",
    issuer: "TryHackMe",
    category: "Security Engineering",
    url: "[https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-GKYKNDUGUI.pdf](https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-GKYKNDUGUI.pdf)"
  },
  {
    id: "cert-2",
    title: "Jr. Penetration Tester",
    issuer: "TryHackMe",
    category: "Penetration Testing",
    url: "[https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-1EWKAEDRRQ.pdf](https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-1EWKAEDRRQ.pdf)"
  },
  {
    id: "cert-3",
    title: "AI Security",
    issuer: "TryHackMe",
    category: "AI Security",
    url: "[https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-ILD2RSGBVA.pdf](https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-ILD2RSGBVA.pdf)"
  },
  {
    id: "cert-4",
    title: "Cyber Security 101",
    issuer: "TryHackMe",
    category: "Foundational",
    url: "[https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-4AYVMHVUCS.pdf](https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-4AYVMHVUCS.pdf)"
  },
  {
    id: "cert-5",
    title: "Pre-Security",
    issuer: "TryHackMe",
    category: "Foundational",
    url: "[https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-9M5XCYAEFN.pdf](https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-9M5XCYAEFN.pdf)"
  }
];

export const tools: ToolCategory[] = [
  {
    categoryName: "Top 15 Security Engineering Tools",
    tools: ["Windows Server", "Linux", "Active Directory", "Microsoft Entra ID", "Wireshark", "Microsoft Sentinel", "Splunk Enterprise", "Wazuh", "Nessus", "Amazon Web Services", "Docker", "Kubernetes", "Python", "PowerShell", "Terraform"]
  },
  {
    categoryName: "Top 15 Penetration Testing Tools",
    tools: ["Nmap", "Burp Suite", "Metasploit Framework", "Wireshark", "BloodHound", "Impacket", "CrackMapExec", "Hashcat", "John the Ripper", "sqlmap", "OWASP ZAP", "LinPEAS", "WinPEAS", "Responder", "Mimikatz"]
  }
];
