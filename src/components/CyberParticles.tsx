"use client";

import { useCallback, useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "next-themes";

export function CyberParticles() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  if (!mounted) return null;

  const isLightMode = resolvedTheme === "light";
  const particleColors = isLightMode 
    ? ["#059669", "#64748B"] // Deep Mint & Slate for Light Mode
    : ["#10B981", "#334155"]; // Neon Mint & Dark Slate for Dark Mode

  return (
    <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden h-full w-full">
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="w-full h-full absolute inset-0"
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 120,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: particleColors,
            },
            links: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "out",
              },
              random: true,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 30, // sparse base value
            },
            opacity: {
              value: { min: 0.2, max: 0.5 },
            },
            shape: {
              type: "char",
              character: [
                {
                  fill: true,
                  font: "JetBrains Mono",
                  style: "",
                  value: ["0", "1", "[", "]", "/", "x", "$", "{", "}", "⌜", "⌟"],
                  weight: "400",
                },
              ],
            },
            size: {
              value: { min: 12, max: 18 },
            },
          },
          detectRetina: true,
          // Mobile scaling rules for performance
          responsive: [
            {
              maxWidth: 768,
              options: {
                interactivity: {
                  events: {
                    onHover: {
                      enable: false, // Save battery, no touch tracking
                    },
                  },
                },
                particles: {
                  number: {
                    value: 12, // Reduced by ~60%
                  },
                },
              },
            },
          ],
        }}
      />
    </div>
  );
}
