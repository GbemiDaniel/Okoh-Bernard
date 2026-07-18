"use client";
import { useEffect, useRef } from "react";
import { useTerminal } from "@/context/TerminalContext";

export function useSectionObserver(sectionName: string | null) {
  const ref = useRef<any>(null);
  const { setActiveSection } = useTerminal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger the state update when this specific section comes into view
        if (entry.isIntersecting) {
          setActiveSection(sectionName);
        }
      },
      // Use an 80% high trigger zone for massive mobile section coverage
      { 
        root: null,
        rootMargin: "-10% 0px -10% 0px", 
        threshold: 0 
      } 
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [sectionName, setActiveSection]);

  return ref;
}
