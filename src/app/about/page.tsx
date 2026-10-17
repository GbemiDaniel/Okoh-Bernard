import type { Metadata } from "next";
import { Placeholder } from "@/components/site/Placeholder";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return <Placeholder title="About" phase="Phase 9" />;
}
