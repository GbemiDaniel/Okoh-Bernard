import Link from "next/link";
import { Placeholder } from "@/components/site/Placeholder";

export default function NotFound() {
  return (
    <Placeholder title="404" phase="Phase 11">
      <Link href="/" className="mt-6 inline-block text-mint-ink">
        Back to home
      </Link>
    </Placeholder>
  );
}
