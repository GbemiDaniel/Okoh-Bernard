"use client";

import Link from "next/link";
import { useState } from "react";
import { FilterChips, Reveal } from "@/components/kit";
import { writeupTopics, type WriteupTopic } from "@/lib/writeup-topics";
import { WaveCover, WriteupRow, monthYear, type WriteupCard } from "./parts";

type Filter = "all" | WriteupTopic;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Topic filters, lead card and rows (04-writeups). The lead is the newest
 * article in the current filter; "LATEST" marks the newest overall.
 */
export function WriteupsList({ cards }: { cards: WriteupCard[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  // Rows reveal on first view only; rows a filter brings in appear at once.
  const [filtered, setFiltered] = useState(false);
  const shown = filter === "all" ? cards : cards.filter((c) => c.topic === filter);
  const [lead, ...rest] = shown;

  return (
    <>
      <FilterChips
        label="Filter writeups"
        value={filter}
        onChange={(f) => {
          setFiltered(true);
          setFilter(f);
        }}
        options={[
          { value: "all" as Filter, label: "All", count: cards.length, color: "var(--color-mint)" },
          ...writeupTopics.map((t) => ({ value: t.slug as Filter, label: t.label, count: cards.filter((c) => c.topic === t.slug).length, color: t.c })),
        ]}
      />
      <div className="wl" aria-live="polite">
        {lead ? (
          <Link className="wl-lead" href={`/writeups/${lead.slug}`}>
            <WaveCover w={lead} latest={lead.slug === cards[0]?.slug} />
            <span className="wl-lt">
              <b>{lead.title}</b>
              <p>{lead.summary}</p>
              <span className="wl-ft">
                <span>
                  {monthYear(lead.date)} · {lead.readMinutes} MIN
                </span>
                <span className="go">
                  READ
                  <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </span>
          </Link>
        ) : null}
        {rest.length ? (
          <ul className="wl-rows" aria-label={`${pad(rest.length)} more writeups`}>
            {rest.map((w, i) => (
              <li key={w.slug}>
                <Reveal desktopOnly instant={filtered} delay={i < 4 ? i * 50 : 0}>
                  <WriteupRow w={w} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}
