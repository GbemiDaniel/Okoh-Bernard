"use client";

import { motion, Variants } from "framer-motion";
import { globalTheme } from "@/lib/theme";

interface SkillCardProps {
  label: string;
  progress: number; // 0 to 100
  tag?: string;
  colorVariant?: 'offensive' | 'defensive' | 'standard';
  delay?: number;
}

export function SkillCard({ label, progress, tag, colorVariant = 'standard', delay = 0 }: SkillCardProps) {
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

  const titleVariants: Variants = {
    hover: { x: 5, transition: { duration: 0.2 } }
  };

  const getTagStyle = (tagStr?: string) => {
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

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true, margin: "-50px" }}
      className={`p-5 md:p-6 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 ${globalTheme.colors.primary.borderHover} transition-colors duration-300 relative overflow-hidden flex flex-col w-full`}
    >
      {/* Top Row: Title (No Wrapping, No Ellipsis) */}
      <motion.span 
        variants={titleVariants} 
        className="font-mono text-sm lg:text-[15px] xl:text-base tracking-tight whitespace-nowrap overflow-hidden text-gray-200 block w-full"
      >
        {label}
      </motion.span>

      {/* Middle Row: The Tag (Cyber Pill) */}
      {tag && (
        <div className="mt-1.5 mb-1">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-medium border ${getTagStyle(tag)}`}>
            {tag}
          </span>
        </div>
      )}
      
      {/* Bottom Row: Inline Progress Bar & Percentage */}
      <div className="flex items-center gap-3 w-full mt-5">
        {/* The Bar (Left Side) */}
        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.2, ease: "circOut" }}
            className="absolute top-0 left-0 h-full bg-[#10B981] progress-glow"
          />
        </div>
        
        {/* The Percentage (Right Side) */}
        <span className="font-mono text-xs text-[#10B981] shrink-0">
          {progress}%
        </span>
      </div>
    </motion.div>
  );
}
