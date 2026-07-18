"use client";
import { motion } from "framer-motion";
import { Terminal, Shield, Cpu, Github, ExternalLink, ChevronRight } from "lucide-react";
import TerminalWindow from "./TerminalWindow";

type Project = { title: string; url: string; category?: string };
type SkillGroup = { category: string; items: string[] };
type ExpertiseData = {
  title: string;
  icon: React.ReactNode;
  summary: string[];
  skills: SkillGroup[];
  projects: Project[];
};

export default function ExpertiseTemplate({ data }: { data: ExpertiseData }) {
  return (
    <div className="pb-20"> {/* Removed pt-*, px-*, and max-w classes to defer to layout.tsx */}
      
      {/* Header - Scaled Typography */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 md:mb-10">
        <div className="flex items-center gap-2 md:gap-3 mb-4 text-[#10B981]">
          {data.icon}
          <span className="font-mono text-xs md:text-sm tracking-wider uppercase">Specialization</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-secondary tracking-tight">
          {data.title}
        </h1>
      </motion.div>

      {/* Summary Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12 md:mb-16">
        <TerminalWindow title="Professional Summary">
          {data.summary.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </TerminalWindow>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Skills Column */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-5">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#10B981]"/> Core Skills & Tools
          </h2>
          <div className="space-y-6">
            {data.skills.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-sm font-sans font-medium text-gray-500 dark:text-gray-400">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, sIdx) => (
                    <span key={sIdx} className="px-3 py-1.5 text-xs md:text-sm rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Projects Column */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-7">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-[#10B981]"/> Featured Projects
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {data.projects.map((project, idx) => (
              <a 
                key={idx} 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 hover:border-[#10B981]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]"
              >
                <div className="flex flex-col gap-1 mb-3 sm:mb-0">
                  <span className="text-[10px] md:text-xs font-mono text-[#10B981]">{project.category || 'Documentation'}</span>
                  <span className="font-medium text-sm md:text-base text-gray-900 dark:text-gray-200 group-hover:text-[#10B981] transition-colors">{project.title}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 group-hover:text-[#10B981] transition-colors self-start sm:self-auto">
                  <Github className="w-4 h-4 md:w-5 md:h-5"/>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"/>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
