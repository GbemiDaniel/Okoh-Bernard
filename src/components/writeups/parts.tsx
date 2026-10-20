import Link from "next/link";
import { OrbitGlyph } from "@/components/site/OrbitGlyph";
import type { Writeup } from "@/lib/content";
import { writeupTopics, type WriteupTopic } from "@/lib/writeup-topics";

// Shared pieces for the writeups list (04) and article (05).

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
export const monthYear = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;

export const topicOf = (slug: WriteupTopic) => writeupTopics.find((t) => t.slug === slug)!;

// Row thumbnails, from the board's icons per topic.
const TOPIC_ICON: Record<WriteupTopic, string> = {
  ai: "M4 5h16v11H9l-5 4zM9 9l2 2-2 2M13 13h3",
  identity: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 4-6 8-6s8 2 8 6",
  crypto: "M14.5 9.5a4 4 0 1 0-1.4 3L20 19.5M17 16.5l2-2",
  risk: "M12 4v16M12 8l-6 4M12 8l6 4M12 14l-4 3M12 14l4 3",
};

/** The fields a list card needs, so article bodies never reach the browser. */
export type WriteupCard = Pick<Writeup, "slug" | "title" | "area" | "summary" | "date" | "readMinutes" | "topic">;
export const toCard = ({ slug, title, area, summary, date, readMinutes, topic }: Writeup): WriteupCard => ({ slug, title, area, summary, date, readMinutes, topic });

/** List row (04 .wl-r): topic thumbnail, area and read time, title, two-line summary. */
export function WriteupRow({ w, summary = true }: { w: WriteupCard; summary?: boolean }) {
  const t = topicOf(w.topic);
  return (
    <Link className="wl-r" href={`/writeups/${w.slug}`} style={{ "--c": t.c } as React.CSSProperties}>
      <span className="wl-th" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path d={TOPIC_ICON[w.topic]} stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="wl-tx">
        <span className="tg">
          <span>{w.area}</span>
          <span>{w.readMinutes} MIN</span>
        </span>
        <b>{w.title}</b>
        {summary ? <p>{w.summary}</p> : null}
      </span>
    </Link>
  );
}

/** Lead card cover (04 .wl-cv): two drifting waves in the topic colour. */
export function WaveCover({ w, latest }: { w: WriteupCard; latest: boolean }) {
  const t = topicOf(w.topic);
  return (
    <span className="wl-cv" style={{ "--rgb": t.rgb } as React.CSSProperties}>
      <svg className="w" viewBox="0 0 350 110" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 70 C40 70 50 30 90 30 S140 80 175 60 S230 20 260 40 S320 75 350 50" fill="none" stroke={`rgb(${t.rgb} / .8)`} strokeWidth="1.5" />
        <path d="M0 74 C40 74 52 38 92 36 S142 84 177 66 S232 28 262 46 S322 80 350 58" fill="none" stroke="rgb(94 234 212 / .6)" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="175" cy="60" r="4" fill={`rgb(${t.rgb})`} />
        <circle cx="177" cy="66" r="3" fill="#5eead4" />
      </svg>
      <span className="tg">
        <OrbitGlyph dur="3s" />
        {w.area}
      </span>
      {latest ? <span className="nw">LATEST</span> : null}
    </span>
  );
}

/** Article cover (05 .ar-cv): the article's own terms as raised tiles over a topic glow. */
export function TileCover({ keys, caption, topic }: { keys: string[]; caption: string; topic: WriteupTopic }) {
  return (
    <div className="ar-cv" data-n={keys.length > 5 ? "many" : undefined} style={{ "--rgb": topicOf(topic).rgb } as React.CSSProperties} aria-hidden="true">
      <div className="k">
        {keys.map((k, i) => (
          <span key={i}>{k}</span>
        ))}
      </div>
      <small>{caption}</small>
    </div>
  );
}
