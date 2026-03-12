"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import { useState, useEffect } from "react";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay for the cinematic entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            y: "-100%", 
            transition: { duration: 0.8, ease: "circIn" } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center min-h-screen bg-[#F1F5F9] dark:bg-[#050806]"
        >
          <div className="flex flex-col items-center gap-6 p-6">
            
            {/* Pulsing Icon */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Terminal className="w-16 h-16 md:w-20 md:h-20 text-[#10B981] relative z-10" />
              {/* Ambient Icon Glow */}
              <div className="absolute inset-0 bg-[#10B981] blur-xl opacity-20 dark:opacity-40 rounded-full" />
            </motion.div>
            
            {/* Terminal Loading Text */}
            <div className="flex items-center gap-2 font-secondary text-sm md:text-base text-slate-800 dark:text-slate-300">
              <span className="text-[#10B981] font-bold">{">"}</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 1.5, ease: "linear" }}
                className="overflow-hidden whitespace-nowrap"
              >
                Decrypting environment... 100%
              </motion.span>
              {/* Blinking Cursor */}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                className="w-2 md:w-3 h-5 md:h-6 bg-[#10B981] inline-block ml-0.5"
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
