// TryHackMe credentials. Titles, verify links and images are the factual
// records HANDOFF section 8 says to keep from the old certifications page.
// Order follows the boards (01-home-mobile, 06-about).

export const issuer = "TryHackMe";

export const learningPaths = [
  {
    id: "pre-security",
    title: "Pre-Security",
    verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-9M5XCYAEFN.pdf",
    image: "/certificates/pre-security.png",
  },
  {
    id: "cyber-101",
    title: "Cyber Security 101",
    verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-4AYVMHVUCS.pdf",
    image: "/certificates/cyber-101.png",
  },
  {
    id: "jr-pentester",
    title: "Jr. Penetration Tester",
    verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-1EWKAEDRRQ.pdf",
    image: "/certificates/jr-pentester.png",
  },
  {
    id: "security-engineer",
    title: "Security Engineer",
    verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-GKYKNDUGUI.pdf",
    image: "/certificates/security-engineer.png",
  },
  {
    id: "ai-security",
    title: "AI Security",
    verifyUrl: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-ILD2RSGBVA.pdf",
    image: "/certificates/ai-security.png",
  },
] as const;

export const skillBadges = [
  {
    id: "network-and-system-security",
    title: "Network & System Security",
    verifyUrl: "https://tryhackme.com/Kachisicho/badges/network-and-system-security",
    image: "/badges/network-and-system-security.png",
  },
  {
    id: "software-security",
    title: "Software Security",
    verifyUrl: "https://tryhackme.com/Kachisicho/badges/software-security",
    image: "/badges/software-security.png",
  },
  {
    id: "ai-path",
    title: "AI Path",
    verifyUrl: "https://tryhackme.com/Kachisicho/badges/ai-path-completion",
    image: "/badges/ai-path.png",
  },
  {
    id: "model-compromise",
    title: "Model Compromise",
    verifyUrl: "https://tryhackme.com/Kachisicho/badges/model-compromise",
    image: "/badges/model-compromise.png",
  },
] as const;
