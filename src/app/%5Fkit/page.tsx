import type { Metadata } from "next";
import { KitDemo } from "./KitDemo";

// Temporary review page for the shared pieces (Phase 2). Remove before merge.
export const metadata: Metadata = {
  title: "Kit",
  robots: { index: false, follow: false },
};

export default function KitPage() {
  return <KitDemo />;
}
