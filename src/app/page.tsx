import { Placeholder } from "@/components/site/Placeholder";

export default function HomePage() {
  return (
    <Placeholder title="Home" phase="Phase 3">
      {/* Target of the /certifications redirect until 3.7 builds the real section. */}
      <div id="credentials" />
    </Placeholder>
  );
}
