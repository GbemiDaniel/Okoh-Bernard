"use client";

import { useState } from "react";
import {
  ArrowLink,
  CaseSectionHeading,
  FilterChips,
  GlassCard,
  LinkCapsule,
  MonoTag,
  OrbitTag,
  PageKicker,
  Panel,
  Quote,
  Reveal,
  SectionHeading,
  SegmentedCapsule,
  SkillChips,
  SplitCapsule,
} from "@/components/kit";
import { OrbitGlyph } from "@/components/site/OrbitGlyph";

const glyph = (d: string, size = 15, sw = 1.8) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Icons and labels from the boards (01 hero pair, 07 topic picker, 01 rings).
const HERO_ARROW = (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const HERO_MAIL = glyph("M3 6h18v12H3zM4 7l8 6 8-6", 13, 1.9);

const TOPICS = [
  { value: "hiring", label: "Hiring", icon: glyph("M4 8h16v11H4zM9 8V5h6v3M4 13h16") },
  { value: "project", label: "Project", icon: glyph("M12 3l9 5-9 5-9-5zM3 13l9 5 9-5") },
  { value: "speaking", label: "Speaking", icon: glyph("M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v4") },
  { value: "other", label: "Other", icon: glyph("M4 5h16v11H9l-5 4zM9 10.5h.01M12 10.5h.01M15 10.5h.01") },
] as const;
type Topic = (typeof TOPICS)[number]["value"];

const RINGS = [
  { value: "cloud", label: "Cloud", rgb: "125 211 252", hex: "var(--color-sky)" },
  { value: "devsecops", label: "DevSecOps", rgb: "94 234 212", hex: "var(--color-mint)" },
  { value: "ai", label: "AI", rgb: "196 181 253", hex: "var(--color-lavender)" },
] as const;
type Ring = (typeof RINGS)[number]["value"];

type Filter = "all" | "cloud" | "devsecops";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-8 pb-12">
      <p className="mb-6 font-mono text-meta tracking-mono-wide text-ink-600 uppercase">{title}</p>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}

export function KitDemo() {
  const [topic, setTopic] = useState<Topic>("hiring");
  const [ring, setRing] = useState<Ring>("devsecops");
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <div className="mx-auto w-full max-w-read px-gutter pt-page-top lg:pt-[120px]">
      <p className="font-mono text-meta tracking-mono-wide text-ink-600 uppercase">Phase 2 · shared pieces · temporary page</p>
      <h1 className="mt-4 mb-10 text-display-page">Kit</h1>

      <Block title="Lens button pair (01 hero)">
        <SplitCapsule
          primary={{ label: "View my work", href: "/work", icon: HERO_ARROW }}
          secondary={{ label: "Get in touch", href: "/contact", icon: HERO_MAIL }}
        />
        <div className="max-w-[430px]">
          <SplitCapsule
            primary={{ label: "View my work", href: "#kit-headings", icon: HERO_ARROW }}
            secondary={{ label: "Get in touch", href: "#kit-cards", icon: HERO_MAIL }}
          />
        </div>
        <p className="text-caption text-ink-600">Top pair navigates to pages. The 430px pair (desktop hero width) scrolls within this page.</p>
      </Block>

      <Block title="Segmented capsule (07 topic picker, 01 rings)">
        <SegmentedCapsule label="Topic" options={[...TOPICS]} value={topic} onChange={setTopic} />
        <SegmentedCapsule
          label="Disciplines"
          variant="row"
          options={RINGS.map((r) => ({ value: r.value, label: r.label, rgb: r.rgb, icon: <OrbitGlyph dur="3s" /> }))}
          value={ring}
          onChange={setRing}
        />
        <p className="text-caption text-ink-600">
          Selected: {topic} · {ring}. Arrow keys move the selection.
        </p>
      </Block>

      <Block title="Links">
        <div>
          <ArrowLink href="/work">Browse 17 DevSecOps labs</ArrowLink>
        </div>
        <LinkCapsule href="/work" label="View all projects" meta="32 LABS · 8 DOMAINS" />
        <div>
          <a className="btn-p rim" href="/contact">
            <span className="grain" aria-hidden="true" />
            Get in touch
          </a>
        </div>
      </Block>

      <section id="kit-headings">
        <Block title="Section headings">
          <SectionHeading
            index={1}
            total={7}
            label="The record"
            lead="The"
            accent="Record"
            lede="Every lab is written up end to end, from the first finding to the validated fix, so the work can be checked rather than taken on trust."
          />
          <SectionHeading index={3} total={7} label="Featured work" lead="Featured" accent="Case Studies" breakBeforeAccent />
          <SectionHeading index={7} total={7} label="Contact" lead="Let's Work" accent="Together" gradient />
          <div>
            <PageKicker lead="CASE 02" label="IDENTITY & ACCESS" />
            <h2 className="text-display-page">
              The Overpowered <em className="text-mint-ink not-italic">Role</em>
            </h2>
          </div>
          <CaseSectionHeading index={1} title="Objective" />
        </Block>
      </section>

      <Block title="Chips and tags">
        <SkillChips label="Skills it proves" items={["Cloud Security", "AWS IAM", "Least Privilege", "S3 Access Control"]} />
        <div className="flex flex-wrap gap-2">
          <OrbitTag color="var(--color-sky)">CLOUD · IDENTITY</OrbitTag>
          <OrbitTag>DEVSECOPS · IAC</OrbitTag>
          <OrbitTag color="var(--color-lavender)">AI · ADVERSARIAL ML</OrbitTag>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <MonoTag>AWS IAM</MonoTag>
          <MonoTag>EC2</MonoTag>
          <MonoTag>IMDSv2</MonoTag>
        </div>
        <FilterChips
          label="Filter projects"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "All", count: 32 },
            { value: "cloud", label: "Cloud", count: 15, color: "var(--color-sky)" },
            { value: "devsecops", label: "DevSecOps", count: 17 },
          ]}
        />
      </Block>

      <section id="kit-cards">
        <Block title="Cards">
          <GlassCard href="/writeups" rgb="196 181 253">
            <span className="flex justify-between font-mono text-micro tracking-[.1em]">
              <span className="text-lavender">AI · ADVERSARIAL ML</span>
              <span className="text-ink-600">JUL 2026</span>
            </span>
            <span className="mt-3 block text-title">Glass card, AI tint, as a link</span>
          </GlassCard>
          <GlassCard rim>
            <span className="block text-title">Glass card with rim light</span>
            <span className="mt-2 block text-body-s text-ink-muted">Mint tint, grain, rotating rim.</span>
          </GlassCard>
          <Panel>
            <span className="flex items-center justify-between font-mono text-micro tracking-[.12em] text-ink-600">
              FINDING 01
              <b className="rounded-xs px-[7px] py-1 font-medium text-sev-high shadow-[inset_0_0_0_1px_rgb(252_165_165/.35)]">HIGH</b>
            </span>
            <strong className="mt-2.5 block text-[16px] leading-[1.3] font-semibold">Over-privileged S3 permissions</strong>
          </Panel>
          <Quote caption="WHAT I LEARNED">
            “An EC2 role is part of the workload’s attack surface. Securing it means protecting how credentials are obtained and limiting what they can do.”
          </Quote>
        </Block>
      </section>

      <Block title="Scroll reveal">
        {[0, 1, 2, 3].map((i) => (
          <Reveal key={i} delay={i * 90}>
            <GlassCard>
              <span className="block text-title">Reveal {i + 1}</span>
              <span className="mt-1 block text-body-s text-ink-muted">Fades and rises once, {i * 90}ms stagger.</span>
            </GlassCard>
          </Reveal>
        ))}
      </Block>
    </div>
  );
}
