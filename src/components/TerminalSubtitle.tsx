"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function TerminalSubtitle() {
  const [text, setText] = useState("");
  const fullText = "> Brostitute CEO | Junior Pentester & Security Researcher";
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === fullText.length) {
        clearInterval(interval);
      }
    }, 50); // Adjust typing speed here
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-secondary text-sm sm:text-base md:text-lg flex flex-col items-center justify-center text-center mt-6 w-full max-w-lg mx-auto px-4 sm:px-0 min-h-[4rem] md:min-h-[2rem]">
      <div className="text-center w-auto max-w-full break-words whitespace-pre-wrap leading-relaxed inline">
        <span className="text-slate-800 dark:text-slate-300 font-medium inline">
          {text.startsWith(">") ? <span className="text-[#10B981]">{">"}</span> : null}
          {text.startsWith(">") ? text.slice(1) : text}
        </span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2.5 sm:w-3 h-4 sm:h-5 bg-[#10B981] ml-0.5 align-middle -mt-1"
        />
      </div>
    </div>
  );
}
