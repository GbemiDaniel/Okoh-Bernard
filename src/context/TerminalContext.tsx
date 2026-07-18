"use client";
import React, { createContext, useContext, useState } from "react";

interface TerminalContextType {
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <TerminalContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}
