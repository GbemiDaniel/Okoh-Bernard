"use client";
import { useState, useEffect, useRef } from "react";
import { useTerminal } from "@/context/TerminalContext";
import { FiMail, FiDownload, FiSend } from "react-icons/fi";
import { FaLinkedinIn, FaGithub, FaMediumM } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiTryhackme } from "react-icons/si";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { useForm, ValidationError } from '@formspree/react';

export default function ContactPage() {
  const { setActiveSection } = useTerminal();
  const textRef = useRef<HTMLDivElement>(null);
  const [statusText, setStatusText] = useState("Initializing...");
  const [state, handleSubmit] = useForm("xykrnzzd");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (state.succeeded) {
      setFormData({ name: "", email: "", message: "" });
    }
  }, [state.succeeded]);

  useEffect(() => {
    if (textRef.current) {
      const scrollWidth = textRef.current.scrollWidth;
      const clientWidth = textRef.current.parentElement?.clientWidth || textRef.current.clientWidth;
      const overflow = scrollWidth - clientWidth;

      if (overflow > 0) {
        // Add padding to ensure it scrolls past the very end
        textRef.current.style.setProperty('--overflow-distance', `-${overflow + 20}px`);
        textRef.current.classList.add('animate-terminal-scroll');
      } else {
        textRef.current.classList.remove('animate-terminal-scroll');
        textRef.current.style.transform = 'translateX(0px)';
      }
    }
  }, [statusText]);

  // Terminal Ping Pong Animation Sequence
  useEffect(() => {
    setActiveSection("Contact Me");
    setStatusText("Initializing...");

    const sequence = ["Initializing...", "Ping...", "Pong...", "Status: Accepting new opportunities"];
    let step = 0;
    
    const interval = setInterval(() => {
      step++;
      if (step < sequence.length) {
        setStatusText(sequence[step]);
      } else {
        clearInterval(interval);
      }
    }, 800); // 800ms between sequence changes

    return () => {
      setActiveSection(null);
      clearInterval(interval);
    };
  }, [setActiveSection]);

  return (
    <main className="flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-28 md:pt-32 pb-16">
      
      {/* HEADER */}
      <section className="mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Establish Connection
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Initialize a secure channel for collaborations, inquiries, or security engagements.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16">
        
        {/* CLEAR, HR-FRIENDLY FORM */}
        <div className="md:col-span-3">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name..." 
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] transition-all duration-300" 
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email..." 
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] transition-all duration-300" 
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">Your Message</label>
              <textarea 
                rows={5} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="How can we collaborate?" 
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] transition-all duration-300 resize-none" 
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
            
            <button
              type="submit"
              disabled={state.submitting || state.succeeded}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#10B981] hover:bg-[#0EA5E9] text-white font-medium rounded-xl transition-colors duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 self-start mt-2 shadow-lg shadow-[#10B981]/20 hover:shadow-[#0ea5e9]/20"
            >
              {!state.submitting && !state.succeeded && !state.errors && (
                <>Send Message <Send className="w-4 h-4" /></>
              )}
              {state.submitting && (
                <>Establishing Connection... <Loader2 className="w-4 h-4 animate-spin" /></>
              )}
              {state.succeeded && (
                <>Transmission Sent <CheckCircle className="w-4 h-4" /></>
              )}
              {Boolean(state.errors) && (
                <>Transmission Failed. Retry?</>
              )}
            </button>
          </form>
        </div>

        {/* METADATA & LINKS */}
        <div className="md:col-span-2 flex flex-col gap-10 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-800 pt-10 md:pt-0 md:pl-10">
          
          {/* ANIMATED STATUS TERMINAL */}
          <div>
            <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-sm mb-4 tracking-wide uppercase">Availability</h3>
            <div className="relative flex items-center bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-gray-800 p-4 rounded-lg font-mono text-sm shadow-sm dark:shadow-inner dark:shadow-black/50 overflow-hidden">
              
              {/* Pinned Green Dot with background to mask text sliding behind it */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-50 dark:bg-[#050505] pr-3 py-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] block animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              </div>

              {/* Single Line Ping Pong Text */}
              <div className="pl-6 w-full whitespace-nowrap">
                <div ref={textRef} className="inline-block">
                  <span className="text-[#10B981] leading-none">
                    {statusText}
                    <span className="animate-pulse">_</span>
                  </span>
                </div>
              </div>
              
              {/* Right Edge Fade Mask */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-gray-50 dark:from-[#050505] to-transparent z-10 pointer-events-none"></div>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-sm mb-4 tracking-wide uppercase">Direct Contact</h3>
            <div className="flex flex-col gap-4">
              <a href="mailto:kachisichobernardokoh@gmail.com" className="group flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <div className="p-2 bg-gray-50 dark:bg-[#0a0a0a] rounded border border-gray-200 dark:border-gray-800 group-hover:border-[#10B981] transition-colors">
                  <FiMail className="text-[#10B981]"/> 
                </div>
                kachisichobernardokoh@gmail.com
              </a>
              
              <a href="/resume.pdf" target="_blank" className="group flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                 <div className="p-2 bg-gray-50 dark:bg-[#0a0a0a] rounded border border-gray-200 dark:border-gray-800 group-hover:border-[#10B981] transition-colors">
                  <FiDownload className="text-[#10B981]"/> 
                </div>
                Download CV / Resume
              </a>
            </div>
          </div>

          {/* LOGO-DRIVEN SOCIAL NETWORK */}
          <div>
            <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-sm mb-4 tracking-wide uppercase">Professional Network</h3>
            <div className="grid grid-cols-2 gap-3">
              <a href="https://www.linkedin.com/in/onyedikachi-bernard-okoh-405861262" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-[#10B981] dark:hover:border-[#10B981] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2.5 rounded-lg text-sm transition-all hover:-translate-y-0.5 active:scale-95 shadow-sm dark:shadow-md">
                <FaLinkedinIn className="text-[#0A66C2]"/> LinkedIn
              </a>
              <a href="https://tryhackme.com/p/Kachisicho" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-[#10B981] dark:hover:border-[#10B981] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2.5 rounded-lg text-sm transition-all hover:-translate-y-0.5 active:scale-95 shadow-sm dark:shadow-md">
                <SiTryhackme className="text-gray-900 dark:text-white"/> TryHackMe
              </a>
              <a href="https://github.com/OnyedikachiO" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-[#10B981] dark:hover:border-[#10B981] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2.5 rounded-lg text-sm transition-all hover:-translate-y-0.5 active:scale-95 shadow-sm dark:shadow-md">
                <FaGithub className="text-gray-900 dark:text-white"/> GitHub
              </a>
              <a href="https://medium.com/@kachisichobernardokoh" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-[#10B981] dark:hover:border-[#10B981] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2.5 rounded-lg text-sm transition-all hover:-translate-y-0.5 active:scale-95 shadow-sm dark:shadow-md">
                <FaMediumM className="text-gray-900 dark:text-white"/> Medium
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
