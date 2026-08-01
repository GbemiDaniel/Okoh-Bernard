"use client";
import { useState, useEffect, useMemo } from "react";
import { useTerminal } from "@/context/TerminalContext";
import { FiExternalLink, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogDirectory() {
  const { setActiveSection } = useTerminal();

  useEffect(() => {
    setActiveSection("Security Blog");
    return () => setActiveSection(null);
  }, [setActiveSection]);

  const posts = [
    {
      id: 1,
      title: "Understanding Identity and Access Management (IAM)",
      tag: "Security Architecture",
      category: "Security Architecture",
      date: "Oct 2023",
      platform: "Medium",
      description: "An architectural breakdown of why perimeter defenses fail when identity pipelines are broken, exploring the IAAA framework, MFA, and modern SSO strategies.",
      excerpt: "An architectural breakdown of why perimeter defenses fail when identity pipelines are broken, exploring the IAAA framework, MFA, and modern SSO strategies.",
      link: "https://medium.com/@kachisichobernardokoh/understanding-identity-and-access-management-iam-dec3f14e139a",
      url: "https://medium.com/@kachisichobernardokoh/understanding-identity-and-access-management-iam-dec3f14e139a"
    },
    {
      id: 2,
      title: "Prompt Security and Context Window Integrity in Large Language Models",
      tag: "AI Security",
      category: "AI Security",
      date: "Nov 2023",
      platform: "Medium",
      description: "A comprehensive analysis of LLM vulnerabilities, detailing how attackers weaponize context windows and outlining enterprise defensive strategies like strict context isolation.",
      excerpt: "A comprehensive analysis of LLM vulnerabilities, detailing how attackers weaponize context windows and outlining enterprise defensive strategies like strict context isolation.",
      link: "https://medium.com/@kachisichobernardokoh/prompt-security-and-context-window-integrity-in-large-language-models-roles-security-d9149c9e4a86",
      url: "https://medium.com/@kachisichobernardokoh/prompt-security-and-context-window-integrity-in-large-language-models-roles-security-d9149c9e4a86"
    },
    {
      id: 3,
      title: "Threat Modeling and Risk Assessment Frameworks",
      tag: "Risk Management",
      category: "Risk Management",
      date: "Jan 2024",
      platform: "Medium",
      description: "A strategic overview of moving from reactive alerting to proactive defense by integrating standard threat modeling methodologies into the development lifecycle.",
      excerpt: "A strategic overview of moving from reactive alerting to proactive defense by integrating standard threat modeling methodologies into the development lifecycle.",
      link: "https://medium.com/@kachisichobernardokoh/threat-modeling-and-risk-assessment-frameworks-70a93b193313",
      url: "https://medium.com/@kachisichobernardokoh/threat-modeling-and-risk-assessment-frameworks-70a93b193313"
    },
    {
      id: 4,
      title: "Navigating Security Governance, Frameworks, and Compliance",
      tag: "Governance & Compliance",
      category: "Governance & Compliance",
      date: "Feb 2024",
      platform: "Medium",
      description: "Bridging the gap between technical execution and business compliance by exploring how organizations align with industry frameworks and regulatory mandates.",
      excerpt: "Bridging the gap between technical execution and business compliance by exploring how organizations align with industry frameworks and regulatory mandates.",
      link: "https://medium.com/@kachisichobernardokoh/navigating-security-governance-frameworks-and-compliance-7ab8ae780b0c",
      url: "https://medium.com/@kachisichobernardokoh/navigating-security-governance-frameworks-and-compliance-7ab8ae780b0c"
    },
    {
      id: 5,
      title: "Why Every AI Security Professional Should Understand FGSM, BIM, and PGD",
      tag: "Adversarial Machine Learning",
      category: "Adversarial Machine Learning",
      date: "Mar 2024",
      platform: "Medium",
      description: "Exploring advanced adversarial attacks against machine learning models, focusing on how malicious inputs intentionally degrade AI performance.",
      excerpt: "Exploring advanced adversarial attacks against machine learning models, focusing on how malicious inputs intentionally degrade AI performance.",
      link: "https://medium.com/@kachisichobernardokoh",
      url: "https://medium.com/@kachisichobernardokoh"
    },
    {
      id: 6,
      title: "Cracking the Code: A Practical Guide to Classical & Modern Cryptography",
      tag: "Cryptography",
      category: "Cryptography",
      date: "Apr 2024",
      platform: "Medium",
      description: "Tracing the evolution of data protection from classical ciphers to the modern cryptographic algorithms securing today's enterprise communications.",
      excerpt: "Tracing the evolution of data protection from classical ciphers to the modern cryptographic algorithms securing today's enterprise communications.",
      link: "https://medium.com/@kachisichobernardokoh/cracking-the-code-a-practical-guide-to-classical-modern-cryptography-tryhackme-walkthrough-e0ea319d9d11",
      url: "https://medium.com/@kachisichobernardokoh/cracking-the-code-a-practical-guide-to-classical-modern-cryptography-tryhackme-walkthrough-e0ea319d9d11"
    },
    {
      id: 7,
      title: "Diffie-Hellman: Establishing Secrets over Insecure Channels",
      tag: "Cryptography",
      category: "Cryptography",
      date: "May 2024",
      platform: "Medium",
      description: "A technical breakdown of secure key exchange protocols, demonstrating how systems safely negotiate encryption keys across fully monitored public networks.",
      excerpt: "A technical breakdown of secure key exchange protocols, demonstrating how systems safely negotiate encryption keys across fully monitored public networks.",
      link: "https://medium.com/@kachisichobernardokoh/diffie-hellman-establishing-secrets-over-insecure-channels-4cd687575a3f",
      url: "https://medium.com/@kachisichobernardokoh/diffie-hellman-establishing-secrets-over-insecure-channels-4cd687575a3f"
    }
  ];

  // State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Derive unique categories dynamically
  const categories = ["All", ...Array.from(new Set(posts.map(post => post.tag)))];

  // Filter posts based on search query AND active category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || post.tag === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <main className="flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-28 md:pt-32 pb-16">
      
      {/* HEADER */}
      <section className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          Articles & Insights
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          A collection of my best writing on cybersecurity, technology, and keeping digital spaces safe, published across platforms like Medium and LinkedIn.
        </p>
      </section>

      {/* FILTERING & SEARCH CONTROLS */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        
        {/* PREMIUM CATEGORY FILTERS (Scroll Shadows + Snapping) */}
        <div className="relative w-full md:max-w-2xl -mx-4 px-4 md:mx-0 md:px-0">
          
          {/* Right Edge Scroll Shadow (Mobile Only) */}
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-linear-to-l from-white dark:from-[#050505] to-transparent pointer-events-none z-10 md:hidden"></div>

          {/* Scrollable Track */}
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory pr-12 md:pr-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 snap-start px-4 py-2 rounded-full text-xs sm:text-sm font-secondary transition-all duration-300 border active:scale-95 ${
                  activeCategory === category
                    ? "bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]"
                    : "bg-gray-100 dark:bg-white/3 border-transparent text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/10 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"/>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#050505] border border-gray-200 dark:border-gray-800 focus:border-[#10B981] dark:focus:border-[#10B981] outline-none text-gray-900 dark:text-gray-200 pl-11 pr-4 py-3 rounded-full text-sm transition-colors shadow-sm dark:shadow-inner dark:shadow-black/50"
          />
        </div>
      </section>

      {/* STRUCTURED CARD GRID */}
      {filteredPosts.length > 0 ? (
        <motion.section layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.a 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col p-5 sm:p-8 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl transition-all duration-300 h-full shadow-sm hover:bg-gray-50 dark:hover:bg-[#121212] hover:border-[#10B981]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#10B981]/40"
            >
              <div className="flex justify-between items-start mb-4 sm:mb-5">
                <span className="text-[10px] sm:text-xs font-mono font-semibold text-[#10B981] bg-[#10B981]/10 px-2.5 sm:px-3 py-1 rounded-md border border-[#10B981]/20">
                  [{post.tag}]
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs font-mono mt-1">
                  {post.date}
                </span>
              </div>
              
              <h3 className="text-lg sm:text-xl font-sans font-semibold text-gray-900 dark:text-gray-100 group-hover:text-[#10B981] transition-colors leading-snug mb-2 sm:mb-3">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 grow line-clamp-3">
                {post.description}
              </p>
              
              {/* Bottom Action Row (Multi-Platform UI) */}
              <div className="flex flex-wrap items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4 sm:pt-5 mt-auto gap-3">
                <span className="text-gray-500 font-mono text-[10px] sm:text-xs flex items-center">
                  Published on <span className="text-gray-900 dark:text-gray-300 ml-1 font-semibold">{post.platform}</span>
                </span>
                <span className="text-gray-600 dark:text-gray-300 group-hover:text-[#10B981] transition-colors flex items-center gap-1.5 font-mono text-xs sm:text-sm font-medium ml-auto sm:ml-0">
                  Read Post <FiExternalLink className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={14} />
                </span>
              </div>
            </motion.a>
          ))}
          </AnimatePresence>
        </motion.section>
      ) : (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center py-20 text-center border border-gray-200 dark:border-gray-800 border-dashed rounded-2xl bg-gray-50 dark:bg-[#050505]">
          <FiSearch className="text-gray-400 dark:text-gray-600 mb-4" size={32} />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300 mb-2">No articles found</h3>
          <p className="text-gray-500 text-sm max-w-sm">
            We couldn't find any articles matching "{searchQuery}" in the {activeCategory} category.
          </p>
          <button 
            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
            className="mt-6 text-[#10B981] hover:underline text-sm font-mono"
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
}
