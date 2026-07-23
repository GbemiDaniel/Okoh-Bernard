"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PremiumLoader() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Typewriter State
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  // 1. Loader Duration Control
  useEffect(() => {
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      setIsLoading(false);
      return;
    }

    // Extended to 3.8s to allow the typewriter loop to be seen
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasBooted", "true");
    }, 3800); 

    return () => clearTimeout(timer);
  }, []);

  // 2. Prevent Scrolling
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  // 3. Typewriter Logic
  useEffect(() => {
    if (!isLoading) return;

    const roles = ["SECURITY ENGINEER", "PENETRATION TESTER", "AI SECURITY"];
    const i = loopNum % roles.length;
    const fullText = roles[i];
    
    // Typing speeds (ms)
    const typingSpeed = isDeleting ? 25 : 45; 

    let typingTimer: NodeJS.Timeout;

    if (isDeleting) {
      typingTimer = setTimeout(() => {
        setText(fullText.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }, typingSpeed);
    } else {
      typingTimer = setTimeout(() => {
        setText(fullText.substring(0, text.length + 1));
        if (text === fullText) {
          // Pause at the end of the word before deleting
          setTimeout(() => setIsDeleting(true), 700); 
        }
      }, typingSpeed);
    }

    return () => clearTimeout(typingTimer);
  }, [text, isDeleting, loopNum, isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="premium-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#050505]"
        >
          <div className="flex flex-col items-center justify-center">
            {/* Blurred Typography Reveal */}
            <div className="overflow-hidden pb-2">
              <motion.h1
                initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-white font-mono text-sm sm:text-base tracking-[0.4em] uppercase font-light"
              >
                Okoh Bernard
              </motion.h1>
            </div>

            {/* Dynamic Typewriter Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="flex items-center justify-center h-4 mt-2"
            >
              <p className="text-[#10B981] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase opacity-80">
                {text}
              </p>
              {/* Blinking Cursor */}
              <span className="w-0.5 h-3 sm:h-4 bg-[#10B981] ml-1 animate-pulse" />
            </motion.div>

            {/* 1px Minimalist Progress Line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "40px", opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-[#10B981] mt-6"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
