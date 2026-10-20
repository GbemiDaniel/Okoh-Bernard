import type { Category } from "./content";

// Every lab, in the order and grouping of the work hub board (02-work), with
// the board's titles. Slugs are the kebab-cased titles, which match the
// previous/next slugs in the reference case study. The content files in
// content/case-studies/ supply the full case study once a lab is imported.
const RAW: [Category, string[]][] = [
  ["identity-access", ["The Over-Privileged User", "The Overpowered Role", "AWS IAM Compromise Investigation"]],
  ["network-perimeter", ["The Wide-Open Security Group", "Exposed AWS Private Network", "The Forgotten NACL", "VPC Flow Logs Visibility Assessment"]],
  ["secure-compute", ["Exposed EC2 Management Port", "Unpatched EC2 Instance", "IMDSv1 Exposure and IMDSv2 Remediation", "ECS Container IAM Least Privilege"]],
  ["storage-data", ["Public S3 Bucket Remediation", "S3 SSE-KMS Encryption and Validation", "S3 Activity Monitoring Audit", "Public EBS Snapshot Remediation"]],
  [
    "build-cicd",
    [
      "Securing the Build Process",
      "Build Process Security",
      "Build Server Security",
      "Pipeline Access Gate Hardening",
      "Environment Segregation for Build Runners",
      "CI/CD Build Secret Segregation",
    ],
  ],
  ["supply-chain", ["External Dependency Supply Chain Risk", "Python Dependency Confusion Defence"]],
  [
    "containers-kubernetes",
    [
      "Kubernetes Secrets and RBAC Hardening",
      "Container Isolation: cgroups",
      "Docker Socket Exposure",
      "Docker Engine TCP Socket Exposure",
      "Container Isolation: Namespaces",
      "Docker Hardening and Security Controls",
    ],
  ],
  ["infrastructure-as-code", ["IaC Pipeline Provisioning", "On-Prem IaC Pipeline Assessment", "Terraform Cloud IaC Hardening"]],
];

export const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export type LabEntry = { no: number; slug: string; title: string; category: Category };

let n = 0;
export const labs: LabEntry[] = RAW.flatMap(([category, titles]) => titles.map((title) => ({ no: ++n, slug: slugify(title), title, category })));

export const labBySlug = (slug: string) => labs.find((l) => l.slug === slug) ?? null;
