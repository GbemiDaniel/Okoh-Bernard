"use client";
import ExpertiseTemplate from "@/components/ExpertiseTemplate";
import { Cpu } from "lucide-react";
import { useSectionObserver } from "@/hooks/useSectionObserver";

export default function AISecurityPage() {
  const heroRef = useSectionObserver("Expertise / AI Security");

  const data = {
    title: "AI Security",
    icon: <Cpu className="w-5 h-5" />,
    summary: [
      "As artificial intelligence rapidly integrates into enterprise environments, I focus on identifying and mitigating the unique attack vectors introduced by Machine Learning models and Large Language Models (LLMs).",
      "I conduct threat modeling for AI pipelines, test for prompt injection vulnerabilities, and validate model compromise scenarios to ensure secure AI deployment."
    ],
    skills: [
      { category: "AI Threat Modeling", items: ["Model Compromise Analysis", "Prompt Injection Testing", "LLM Security"] },
      { category: "Secure AI Lifecycle", items: ["AI Governance", "Secure AI Deployment", "ML Security"] },
      { category: "Tooling", items: ["Python"] }
    ],
    projects: [
      { title: "AI Path Completion", url: "#", category: "Research" },
      { title: "Model Compromise Validation", url: "#", category: "Testing" },
      { title: "AI Security Portfolio", url: "#", category: "Documentation" }
    ]
  };

  return (
    <div ref={heroRef}>
      <ExpertiseTemplate data={data} />
    </div>
  );
}
