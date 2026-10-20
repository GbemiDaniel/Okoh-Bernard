import { AboutBlock } from "@/components/home/AboutBlock";
import { BootLoader } from "@/components/home/BootLoader";
import { CaseStrip } from "@/components/home/CaseStrip";
import { ContactBlock } from "@/components/home/ContactBlock";
import { Hero } from "@/components/home/Hero";
import { Orbits } from "@/components/home/Orbits";
import { Record } from "@/components/home/Record";
import { SectionNav } from "@/components/home/SectionNav";
import { Skills } from "@/components/home/Skills";
import { WriteupsPreview } from "@/components/home/WriteupsPreview";
import { categories, getCaseStudies, getWriteups } from "@/lib/content";
import { learningPaths, skillBadges } from "@/lib/credentials";
import { site } from "@/lib/site";

export default function HomePage() {
  const stats = {
    labs: site.labCount,
    domains: categories.length,
    credentials: learningPaths.length + skillBadges.length,
  };
  const available = getCaseStudies().map((c) => c.slug);
  const posts = getWriteups()
    .filter((w) => w.homeOrder != null)
    .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));

  return (
    <>
      <BootLoader />
      <div className="home">
      <div className="home-wash" aria-hidden="true" />
      <Hero />
      <Record {...stats} />
      <Orbits />
      <CaseStrip available={available} labs={stats.labs} domains={stats.domains} />
      <Skills />
      <WriteupsPreview posts={posts} />
      <AboutBlock />
      <ContactBlock />
      <SectionNav />
      </div>
    </>
  );
}
