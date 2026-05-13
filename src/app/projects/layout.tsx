import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "An archive of cybersecurity projects, penetration testing reports, and security research conducted by Okoh Bernard.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
