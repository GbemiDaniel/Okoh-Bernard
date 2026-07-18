"use client";
import { useEffect } from "react";
import { useTerminal } from "@/context/TerminalContext";
import Link from "next/link";

export default function BlogDirectory() {
  const { setActiveSection } = useTerminal();

  useEffect(() => {
    setActiveSection("Security Blog");
    return () => setActiveSection(null);
  }, [setActiveSection]);

  // Placeholder Data
  const posts = [
    {
      id: 1,
      title: "Rendering Costs of Glassmorphism in Modern UI",
      date: "2026-06-15",
      tag: "PERFORMANCE",
      slug: "glassmorphism-rendering-costs"
    },
    {
      id: 2,
      title: "Exploiting Logic Flaws in JWT Authentication",
      date: "2026-05-22",
      tag: "WEB-SEC",
      slug: "jwt-logic-flaws"
    }
  ];

  return (
    <main className="flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-16">
      {/* HEADER */}
      <section className="mb-12 border-b border-gray-800 pb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Writeups & Research
        </h1>
        <p className="text-gray-400 font-mono text-sm md:text-base">
          // Technical deep-dives, vulnerability research, and engineering logs
        </p>
      </section>

      {/* POSTS LIST (Terminal Style) */}
      <section className="flex flex-col">
        {posts.map((post) => (
          <Link className="group flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-gray-800/50 hover:bg-[#10B981]/5 transition-colors px-4 -mx-4 rounded-lg" href={`/blog/${post.slug}`} key={post.id}>
            <div className="flex items-center gap-4 mb-2 md:mb-0">
              <span className="text-gray-500 font-mono text-sm">{post.date}</span>
              <h3 className="text-lg font-medium text-gray-200 group-hover:text-[#10B981] transition-colors">
                {post.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded border border-[#10B981]/20">
                [{post.tag}]
              </span>
              <span className="text-gray-600 group-hover:text-[#10B981] transition-colors font-mono">
                {'->'}
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
