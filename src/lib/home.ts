import type { IconName } from "@/components/home/icons";
import { site } from "./site";

// Homepage content, copied from the boards (01-home-mobile, 00-home-desktop).
// Every line is first person or neutral, as checked on the boards.

const words: Record<number, string> = { 15: "Fifteen", 17: "Seventeen" };
const spell = (n: number) => words[n] ?? String(n);

/** Hues used per discipline: [hex token, rgb channels] */
export const HUE = {
  cloud: { c: "var(--color-sky)", rgb: "125 211 252" },
  devsecops: { c: "var(--color-mint)", rgb: "94 234 212" },
  ai: { c: "var(--color-lavender)", rgb: "196 181 253" },
} as const;

export type Discipline = keyof typeof HUE;

type Tool = { name: string; icon: IconName; c: string };

export const disciplines: {
  id: Discipline;
  label: string;
  kicker: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  tools: Tool[];
}[] = [
  {
    id: "cloud",
    label: "Cloud",
    kicker: "RING 01 · CLOUD",
    title: "Cloud security",
    body: `${spell(site.cloudLabs)} documented AWS labs across identity, network, compute and storage. Each one finds the misconfiguration, fixes it and proves the fix held.`,
    cta: `Browse ${site.cloudLabs} cloud labs`,
    href: "/work?d=cloud",
    tools: [
      { name: "AWS IAM", icon: "user", c: "var(--color-sky)" },
      { name: "VPC", icon: "net", c: "var(--color-sky)" },
      { name: "EC2", icon: "linux", c: "var(--color-sky)" },
      { name: "S3", icon: "aws", c: "var(--color-sky)" },
      { name: "KMS", icon: "key", c: "var(--color-lilac)" },
      { name: "CloudTrail", icon: "log", c: "var(--color-mint)" },
    ],
  },
  {
    id: "devsecops",
    label: "DevSecOps",
    kicker: "RING 02 · DEVSECOPS",
    title: "DevSecOps",
    body: `${spell(site.devsecopsLabs)} labs securing the path from commit to production: CI/CD pipelines, the software supply chain, containers and infrastructure as code.`,
    cta: `Browse ${site.devsecopsLabs} DevSecOps labs`,
    href: "/work?d=devsecops",
    tools: [
      { name: "GitLab CI", icon: "git", c: "var(--color-amber)" },
      { name: "Docker", icon: "docker", c: "var(--color-blue)" },
      { name: "Kubernetes", icon: "k8s", c: "var(--color-periwinkle)" },
      { name: "Terraform", icon: "tf", c: "var(--color-lilac)" },
      { name: "Python", icon: "py", c: "var(--color-sand)" },
      { name: "CI/CD", icon: "pipe", c: "var(--color-mint)" },
    ],
  },
  {
    id: "ai",
    label: "AI",
    kicker: "RING 03 · AI",
    title: "AI security",
    body: "Prompt injection, model risk and AI supply chain security, mapped to MITRE ATLAS, OWASP and NIST AI RMF, and explored in my writeups.",
    cta: "Read the AI writeups",
    href: "#writeups",
    tools: [
      { name: "Python", icon: "py", c: "var(--color-sand)" },
      { name: "LLM / AI Security", icon: "ai", c: "var(--color-lavender)" },
      { name: "MITRE ATLAS", icon: "doc", c: "var(--color-lavender)" },
      { name: "OWASP LLM", icon: "doc", c: "var(--color-lavender)" },
    ],
  },
];

/** Featured case studies (board 01 and 00, cards 01 to 04). */
export const featured: { slug: string; tag: string; title: string; body: string; hue: Discipline; icon: IconName }[] = [
  { slug: "iam-compromise-investigation", tag: "CLOUD · IDENTITY", title: "IAM Compromise Investigation", body: "Rogue admin access traced, removed and put under alerting.", hue: "cloud", icon: "user" },
  { slug: "the-overpowered-role", tag: "CLOUD · IDENTITY", title: "The Overpowered Role", body: "An app role scoped back to only what it needs.", hue: "cloud", icon: "aws" },
  { slug: "terraform-iac-hardening", tag: "DEVSECOPS · IAC", title: "Terraform IaC Hardening", body: "Infrastructure code reviewed and hardened before deploy.", hue: "devsecops", icon: "tf" },
  { slug: "securing-the-build-process", tag: "DEVSECOPS · CI/CD", title: "Securing the Build Process", body: "Exposed source code and a committed secret, found and flagged.", hue: "devsecops", icon: "git" },
];

/** Skills groups (board 01 section 04). */
export const skillGroups: { name: string; desc: string; hue: string; rgb: string; dur: string; items: { name: string; icon: IconName }[] }[] = [
  {
    name: "DEVSECOPS",
    desc: "Pipelines, containers, IaC",
    hue: "var(--color-mint)",
    rgb: "94 234 212",
    dur: "3s",
    items: [
      { name: "GitLab", icon: "git" }, { name: "CI/CD", icon: "pipe" }, { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "k8s" }, { name: "Terraform", icon: "tf" }, { name: "Ansible", icon: "ans" },
      { name: "Bash", icon: "bash" }, { name: "Linux", icon: "linux" }, { name: "OpenSSL", icon: "cert" },
    ],
  },
  {
    name: "CLOUD",
    desc: "AWS identity, network, data",
    hue: "var(--color-sky)",
    rgb: "125 211 252",
    dur: "3.6s",
    items: [
      { name: "AWS", icon: "aws" }, { name: "IAM", icon: "user" }, { name: "VPC", icon: "net" },
      { name: "EC2", icon: "linux" }, { name: "S3", icon: "doc" }, { name: "KMS", icon: "key" },
      { name: "CloudTrail", icon: "log" }, { name: "CloudWatch", icon: "wave" }, { name: "Systems Manager", icon: "bash" },
      { name: "EventBridge", icon: "pipe" },
    ],
  },
  {
    name: "AI & RISK",
    desc: "Models, frameworks, risk",
    hue: "var(--color-lavender)",
    rgb: "196 181 253",
    dur: "4.2s",
    items: [
      { name: "Python", icon: "py" }, { name: "LLM Security", icon: "ai" }, { name: "Prompt Injection", icon: "inj" },
      { name: "Adversarial ML", icon: "wave" }, { name: "MITRE ATLAS", icon: "doc" }, { name: "MITRE ATT&CK", icon: "tree" },
      { name: "STRIDE", icon: "tree" }, { name: "OWASP LLM", icon: "doc" }, { name: "NIST AI RMF", icon: "doc" },
    ],
  },
];
