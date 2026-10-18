"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHeading } from "@/components/kit";
import { OrbitGlyph } from "@/components/site/OrbitGlyph";
import { skillGroups } from "@/lib/home";
import { ICON } from "./icons";

/** 3.5 Skills (01 section 04, the clean list version): three groups, tools rise in once. */
export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills" className="hs" aria-labelledby="skills-title">
      <div className="w">
        <div className="hs-head">
          <Reveal desktopOnly>
            <SectionHeading id="skills-title" index={4} total={7} label="Toolkit" lead="Skills &" accent="Technologies" />
          </Reveal>
          <Reveal desktopOnly delay={120} as="p" className="hs-lede">
            My core skills and the technologies behind them, across cloud security, DevSecOps and AI security.
          </Reveal>
        </div>
        <Reveal desktopOnly delay={160}>
          <div ref={ref} className={inView ? "stk in" : "stk"}>
            {skillGroups.map((g, gi) => (
              <div key={g.name} className="stk-g" style={{ "--rgb": g.rgb, "--c": g.hue, "--gi": gi } as React.CSSProperties}>
                <div className="stk-h">
                  <span className="stk-n">
                    <OrbitGlyph dur={g.dur} width={16} />
                    {g.name}
                  </span>
                  <span className="stk-s">{g.desc}</span>
                </div>
                <ul className="stk-l" aria-label={`${g.name} tools`}>
                  {g.items.map((t, i) => (
                    <li key={t.name} className="stk-t" style={{ "--i": i } as React.CSSProperties}>
                      <span className="stk-ic" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24">
                          <path d={ICON[t.icon]} stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {t.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
