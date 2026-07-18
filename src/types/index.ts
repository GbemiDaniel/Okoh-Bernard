export type Specialization = "Security Engineering" | "Penetration Testing" | "AI Security" | "Foundational";

export interface Project {
  id: string;
  title: string;
  category: Specialization;
  description: string;
  repoUrl: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: Specialization;
  url: string;
}

export interface Article {
  id: string;
  title: string;
  url: string;
}

export interface ToolCategory {
  categoryName: string;
  tools: string[];
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  hook: string;
  bio: string[];
  education: string;
  contact: {
    email: string;
    linkedin: string;
    tryhackme: string;
    github: {
      security: string;
      pentest: string;
      ai: string;
    };
  };
}
