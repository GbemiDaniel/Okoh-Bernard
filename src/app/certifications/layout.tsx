import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Explore the verified professional credentials and certifications held by Okoh Bernard in the field of cybersecurity and offensive security.",
};

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
