import { Hero } from "@/components/home/Hero";
import { categories } from "@/lib/content";
import { learningPaths, skillBadges } from "@/lib/credentials";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="home">
      <div className="home-wash" aria-hidden="true" />
      <Hero
        stats={{
          labs: site.labCount,
          domains: categories.length,
          credentials: learningPaths.length + skillBadges.length,
        }}
      />
      {/* Sections 3.2 to 3.8 land here, one per run. Until 3.7, this keeps the /certifications redirect target alive. */}
      <div id="credentials" />
    </div>
  );
}
