import React from 'react';

interface ArticleBriefingProps {
  title: string;
  description: string;
  link: string;
  date: string;
  category: string;
  colorClass: string;
}

export function ArticleBriefing({ title, description, link, date, category, colorClass }: ArticleBriefingProps) {
  // Clean markdown style links if provided that way
  const cleanLink = link.match(/\]\((.*?)\)/)?.[1] || link;

  return (
    <div className="pb-12 mb-12 border-b border-white/5 last:border-0 last:pb-0 last:mb-0 group">
      {/* Metadata Bar */}
      <div className="flex flex-row border border-white/10 rounded-lg overflow-hidden font-mono text-[9px] xs:text-[10px] sm:text-xs mb-6 w-full md:w-max bg-white/[0.01]">
        <div className="px-2 sm:px-4 py-2 sm:py-3 border-r border-white/10 flex-1 sm:flex-none">
          <span className="text-gray-500 block mb-1">Published</span>
          <span className="text-gray-300">{date}</span>
        </div>
        <div className="px-2 sm:px-4 py-2 sm:py-3 border-r border-white/10 flex-1 sm:flex-none">
          <span className="text-gray-500 block mb-1">Topic</span>
          <span className={colorClass}>{category}</span>
        </div>
        <div className="px-2 sm:px-4 py-2 sm:py-3 flex flex-col justify-center flex-1 sm:flex-none">
          <span className="text-gray-500 block mb-1">Platform</span>
          <span className="text-gray-300 flex items-center gap-1.5">
            {/* Medium SVG Icon */}
            <svg viewBox="0 0 1043.63 592.71" className="w-3 h-3 fill-current opacity-80" xmlns="http://www.w3.org/2000/svg">
              <g data-name="Layer 2">
                <g data-name="Layer 1">
                  <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"/>
                </g>
              </g>
            </svg>
            Medium
          </span>
        </div>
      </div>

      {/* Header Row */}
      <div className="flex items-start sm:items-center gap-3 mb-3">
        <svg className="w-5 h-5 text-[#10B981] shrink-0 mt-1 sm:mt-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <polyline points="10 8 14 12 10 16"></polyline>
        </svg>
        <h3 className="text-lg sm:text-xl font-bold text-gray-100 tracking-wide hover:text-[#10B981] transition-colors">
          <a href={cleanLink} target="_blank" rel="noopener noreferrer">{title}</a>
        </h3>
      </div>

      {/* Body Text */}
      <p className="text-gray-400 text-sm leading-relaxed sm:leading-loose ml-0 sm:ml-8 max-w-4xl">
        {description}
      </p>

      {/* Action Link */}
      <a href={cleanLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-5 ml-0 sm:ml-8 text-[#10B981] font-mono text-xs hover:underline group-hover:translate-x-1 transition-transform">
        Read Full Article ↗
      </a>
    </div>
  );
}
