import Link from "next/link";
import { ShieldAlert, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 bg-[#050505]">
      {/* Ambient Red Glow for Error State */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Glassmorphic Error Card */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full bg-white/5 border border-white/10 p-8 sm:p-12 rounded-2xl backdrop-blur-md">
        
        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <ShieldAlert className="w-8 h-8"/>
        </div>

        {/* Status Codes */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 font-mono">
          404
        </h1>
        <h2 className="text-[#10B981] tracking-[0.2em] uppercase text-sm sm:text-base mb-6 font-mono font-semibold">
          Endpoint Unreachable
        </h2>
        
        {/* System Message */}
        <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
          The requested node does not exist on this server. The directory may have been deleted, relocated, or you lack the required clearance to access it.
        </p>

        {/* Recovery Action */}
        <Link className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-[#10B981] border border-white/10 hover:border-[#10B981] text-white font-medium rounded-xl transition-all duration-300 active:scale-95 group" href="/">
          <Terminal className="w-4 h-4 group-hover:text-black transition-colors"/>
          <span className="group-hover:text-black transition-colors font-mono uppercase tracking-wider text-sm">
            Return to Root
          </span>
        </Link>
      </div>
    </main>
  );
}
