"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CyberCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  clipVariant?: "tl" | "tr" | "bl" | "br"; // which corner to clip
}

// Each variant clips a different corner to create the octagonal look
const CLIP_PATHS = {
  tl: "polygon(20px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20px)", // top-left corner clipped
  tr: "polygon(0% 0%, calc(100% - 20px) 0%, 100% 20px, 100% 100%, 0% 100%)", // top-right corner clipped
  bl: "polygon(0% 0%, 100% 0%, 100% 100%, 20px 100%, 0% calc(100% - 20px))", // bottom-left corner clipped
  br: "polygon(0% 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%)", // bottom-right corner clipped
};

// SVG polygon points for drawing the border — normalized to viewBox="0 0 100 100" with corner cuts
const BORDER_POLYGONS = {
  tl: "20,0 100,0 100,100 0,100 0,20",
  tr: "0,0 80,0 100,20 100,100 0,100",
  bl: "0,0 100,0 100,100 20,100 0,80",
  br: "0,0 100,0 100,80 80,100 0,100",
};

export function CyberCard({
  title,
  subtitle,
  icon,
  children,
  className = "",
  clipVariant = "tr",
}: CyberCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover="hovered"
      className={`relative group ${className}`}
    >
      {/* SVG neon border overlay */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id={`glow-${clipVariant}`} x="-20%" y="-20%" width="140%" height="140%">
            <motion.feDropShadow
              dx="0"
              dy="0"
              stdDeviation="3"
              floodColor="#10B981"
              floodOpacity="0.9"
              variants={{
                hovered: { stdDeviation: 7 } as never
              }}
              transition={{ duration: 0.3 }}
            />
          </filter>
        </defs>

        {/* Static ambient glow pulse on scroll-enter */}
        <motion.polygon
          points={BORDER_POLYGONS[clipVariant]}
          fill="none"
          stroke="#10B981"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          filter={`url(#glow-${clipVariant})`}
          initial={{ opacity: 0.4 }}
          animate={isInView ? { opacity: [0.4, 0.85, 0.5] } : { opacity: 0.4 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          variants={{ hovered: { opacity: 1 } }}
        />

        {/* Secondary thinner accent line at 50% opacity */}
        <polygon
          points={BORDER_POLYGONS[clipVariant]}
          fill="none"
          stroke="#22D3EE"
          strokeWidth="0.4"
          vectorEffect="non-scaling-stroke"
          opacity="0.3"
        />
      </motion.svg>

      {/* Card inner content — clipped to octagonal shape */}
      <div
        className="relative overflow-hidden backdrop-blur-md bg-[#050c06]/80 dark:bg-[#050c06]/90 border-0"
        style={{ clipPath: CLIP_PATHS[clipVariant] }}
      >
        {/* Inner blueprint-line subtle overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #10B98115 1px, transparent 1px), linear-gradient(to bottom, #10B98115 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 p-4 sm:p-5">
          {/* Card Header */}
          {(icon || title) && (
            <div className="flex items-start gap-3 mb-3">
              {icon && (
                <div className="text-[#10B981] shrink-0 mt-0.5">{icon}</div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-primary font-bold text-sm sm:text-base text-white leading-tight">
                  {title}
                </h3>
                {subtitle && (
                  <p className="font-secondary text-[10px] sm:text-xs text-[#10B981]/70 mt-0.5 uppercase tracking-wider">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          )}
          {children && (
            <div className="font-secondary text-xs text-white/60 leading-relaxed">
              {children}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
