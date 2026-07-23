"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface Badge {
  id: string;
  name: string;
  issuer: string;
  image: string; // URL or local path to the badge image
  skills: string[];
  verifyUrl: string;
}

interface BadgeModalProps {
  badge: Badge | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BadgeModal({ badge, isOpen, onClose }: BadgeModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && badge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
            className="relative w-full max-w-lg overflow-hidden border bg-white dark:bg-[#0A0A0A] border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-white/5">
              <div className="flex items-center gap-2 text-[#10B981]">
                <ShieldCheck className="w-5 h-5"/>
                <span className="text-sm font-mono tracking-wide uppercase">Credential Metadata</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white active:scale-95"
              >
                <X className="w-5 h-5"/>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex flex-col items-center text-center gap-6">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl">
                <Image alt={badge.name} className="object-contain" fill src={badge.image}/>
              </div>
              
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">{badge.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-secondary">Issued by {badge.issuer}</p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {badge.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs font-medium text-[#10B981] bg-[#10B981]/10 rounded-full border border-[#10B981]/20">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Verify Action */}
              <a 
                href={badge.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#10B981] hover:bg-[#0EA5E9] text-white font-medium rounded-xl transition-colors duration-300 active:scale-95"
              >
                Verify Credential
                <ExternalLink className="w-4 h-4"/>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
