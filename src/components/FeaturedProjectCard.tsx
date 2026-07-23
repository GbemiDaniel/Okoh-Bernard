import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface FeaturedProjectCardProps {
  title: string;
  description: string;
  tag: string;
  link: string;
  tools: string[];
  delay?: number;
}

export function FeaturedProjectCard({
  title,
  description,
  tag,
  link,
  tools,
  delay = 0
}: FeaturedProjectCardProps) {
  // Same dynamic color mapping logic as the SkillCard Cyber Pills
  const getTagStyle = (tagStr: string) => {
    switch (tagStr) {
      case "PENTESTING":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "SEC-ENG":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "AI-SEC":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay, ease: "easeOut" }
    },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  };

  // Extract clean URL if it's formatted as markdown link [URL](URL)
  const cleanLink = link.match(/\]\((.*?)\)/)?.[1] || link;

  return (
    <Link href={cleanLink} className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded-xl group">
      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        whileTap="tap"
        viewport={{ once: true, margin: "-50px" }}
        className="p-5 md:p-6 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 transition-colors duration-300 relative overflow-hidden flex flex-col h-full hover:border-[#10B981]/50"
      >
        {/* Top Row: Cyber Pill Tag */}
        <div className="flex justify-between items-start w-full mb-4">
          <div className="mt-1.5 mb-1">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-medium border ${getTagStyle(tag)}`}>
              {tag}
            </span>
          </div>
        </div>

        {/* Middle: Title & Description */}
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="font-primary text-xl font-bold text-gray-100 group-hover:text-[#10B981] transition-colors">{title}</h3>
          <p className="font-secondary text-sm text-gray-400 leading-relaxed">{description}</p>
        </div>

        {/* Lower Middle: Tools / Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tools.map(tool => (
            <span key={tool} className="text-[10px] text-gray-500 font-mono tracking-tight px-2 py-1 bg-white/5 rounded-md border border-white/5">
              {tool}
            </span>
          ))}
        </div>

        {/* Bottom: CTA text inline link */}
        <div className="mt-5 sm:mt-6">
          <span className="text-[#10B981] font-mono text-xs inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
            Read Report →
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
