import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Identity",
  description: "Learn more about Okoh Bernard's background, core competencies, and professional objectives as a Security Analyst.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
