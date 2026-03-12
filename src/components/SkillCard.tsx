"use client";

import { motion, Variants } from "framer-motion";

interface SkillCardProps {
  label: string;
  progress: number; // 0 to 100
  delay?: number;
}

export function SkillCard({ label, progress, delay = 0 }: SkillCardProps) {
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

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true, margin: "-50px" }}
      className="p-4 sm:p-6 flex flex-col gap-4 rounded-2xl bg-white border border-gray-200 shadow-md dark:bg-white/5 dark:border-white/10 dark:shadow-inner hover:border-[#10B981] dark:hover:border-[#10B981] transition-colors duration-300 relative overflow-hidden"
    >
      <div className="flex justify-between items-end font-secondary text-sm">
        <motion.span variants={titleVariants} className="text-slate-800 dark:text-slate-300">
          [{label}]
        </motion.span>
        <span className="text-accent-mint font-medium">{progress}%</span>
      </div>
      
      {/* Progress Bar Track */}
      <div className="w-full h-[2px] bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden relative">
        {/* Progress Bar Fill */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "circOut" }}
          className="absolute top-0 left-0 h-full progress-glow"
        />
      </div>
    </motion.div>
  );
}
