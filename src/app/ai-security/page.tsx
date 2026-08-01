import { Metadata } from "next";
import ExpertiseTemplate from "@/components/ExpertiseTemplate";
import { Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Security Portfolio | Okoh Bernard Onyedikachi",
  description: "Specialized expertise in AI Security, LLM Threat Modeling, and Model Compromise Assessment.",
};

export default function AISecurityPage() {
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
      { title: "System Prompt Hardening", url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Prompt%20Security/System%20Prompt%20Hardening.md", category: "LLM Security" },
      { title: "Prompt Injection Mitigation", url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Prompt%20Security/Prompt%20Injection.md", category: "Testing" },
      { title: "LLM Jailbreaking Vectors", url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Prompt%20Security/Jailbreaking.md", category: "Research" },
      { title: "Data Poisoning in RAG Systems", url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Data%20Poisoning%20/Data%20Poisoning%20in%20RAG%20Systems.md", category: "Data Security" },
      { title: "Securing AI Systems Architecture", url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Secure%20AI%20Systems/Securing%20AI%20Systems.md", category: "Architecture" },
      { title: "AI Threat Modeling", url: "https://github.com/OnyedikachiO/AI-Security-Portfolio/blob/main/Secure%20AI%20Systems/AI%20Threat%20Modelling.md", category: "Threat Modeling" }
    ]
  };

  return (
    <main>
      <ExpertiseTemplate data={data} />
    </main>
  );
}
