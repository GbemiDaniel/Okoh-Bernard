"use client";
import { useEffect } from "react";
import { useTerminal } from "@/context/TerminalContext";

export default function ContactPage() {
  const { setActiveSection } = useTerminal();

  useEffect(() => {
    setActiveSection("Secure Channel / Contact");
    return () => setActiveSection(null);
  }, [setActiveSection]);

  return (
    <main className="flex flex-col w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-16">
      <section className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Establish Connection
        </h1>
        <p className="text-gray-400 font-mono text-sm md:text-base">
          // Initialize a secure channel for collaborations, inquiries, or freelance engagements.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* SECURE FORM */}
        <div className="md:col-span-3">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            
            <div className="flex flex-col gap-2">
              <label className="text-[#10B981] font-mono text-sm">root@contact:~# whoami</label>
              <input 
                type="text" 
                placeholder="Enter your name..."
                className="bg-[#0a0a0a] border border-gray-800 focus:border-[#10B981] outline-none text-gray-200 px-4 py-3 rounded-md font-mono text-sm transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#10B981] font-mono text-sm">root@contact:~# ping -c 1</label>
              <input 
                type="email" 
                placeholder="Enter your email address..."
                className="bg-[#0a0a0a] border border-gray-800 focus:border-[#10B981] outline-none text-gray-200 px-4 py-3 rounded-md font-mono text-sm transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#10B981] font-mono text-sm">root@contact:~# cat message.txt</label>
              <textarea 
                rows={5}
                placeholder="Write your transmission..."
                className="bg-[#0a0a0a] border border-gray-800 focus:border-[#10B981] outline-none text-gray-200 px-4 py-3 rounded-md font-mono text-sm transition-colors resize-none"
              />
            </div>

            <button className="self-start bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/50 hover:bg-[#10B981]/20 px-6 py-3 rounded-md font-mono text-sm font-medium transition-all flex items-center gap-2 mt-2">
              <span>./transmit.sh</span>
            </button>
          </form>
        </div>

        {/* SOCIAL LINKS / METADATA */}
        <div className="md:col-span-2 flex flex-col gap-8 border-t md:border-t-0 md:border-l border-gray-800 pt-8 md:pt-0 md:pl-8">
          <div>
            <h3 className="text-gray-400 font-mono text-sm mb-4">// Direct Links</h3>
            <div className="flex flex-col gap-4 font-mono text-sm">
              <a href="#" className="text-gray-300 hover:text-[#10B981] transition-colors flex items-center gap-2">
                <span>[LinkedIn]</span> {`->`} Profile
              </a>
              <a href="#" className="text-gray-300 hover:text-[#10B981] transition-colors flex items-center gap-2">
                <span>[X_Twitter]</span> {`->`} Feed
              </a>
              <a href="#" className="text-gray-300 hover:text-[#10B981] transition-colors flex items-center gap-2">
                <span>[Medium]</span> {`->`} Articles
              </a>
              <a href="#" className="text-gray-300 hover:text-[#10B981] transition-colors flex items-center gap-2">
                <span>[GitHub]</span> {`->`} Repositories
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-400 font-mono text-sm mb-3">// Status</h3>
            <p className="text-gray-300 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              Accepting new opportunities
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
