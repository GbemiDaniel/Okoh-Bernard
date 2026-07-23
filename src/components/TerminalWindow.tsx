import React from 'react';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
}

export default function TerminalWindow({ title, children }: TerminalWindowProps) {
  return (
    <div className="w-full rounded-xl bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden">
      {/* Terminal Header - Fixed Centering */}
      <div className="relative flex items-center justify-center px-4 py-3 bg-white/2 border-b border-white/10 min-h-11">
        <div className="absolute left-4 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-[#10B981]/80"></div>
        </div>
        {title && (
          <span className="text-xs font-mono text-gray-500 truncate px-16">{title}</span>
        )}
      </div>
      
      {/* Terminal Body - Fluid Mobile Padding */}
      <div className="p-4 sm:p-6 md:p-8 text-gray-300 font-secondary leading-relaxed space-y-4 text-sm sm:text-base md:text-lg">
        {children}
      </div>
    </div>
  );
}
