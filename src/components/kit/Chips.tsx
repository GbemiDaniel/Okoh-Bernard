"use client";

import { OrbitGlyph } from "@/components/site/OrbitGlyph";

/** "Skills it proves" chip (03-case-study .chips). */
export function SkillChips({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="chips" aria-label={label}>
      {items.map((s) => (
        <li key={s} className="skc">
          <OrbitGlyph dur="3.4s" />
          {s}
        </li>
      ))}
    </ul>
  );
}

/** Tinted mono tag with an orbit glyph, e.g. "CLOUD · IDENTITY" on a card visual. `color` is any CSS colour. */
export function OrbitTag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="otag" style={color ? ({ "--c": color } as React.CSSProperties) : undefined}>
      <OrbitGlyph dur="3.4s" />
      {children}
    </span>
  );
}

/** Small mono tool tag (01 .cs-tl). */
export function MonoTag({ children }: { children: React.ReactNode }) {
  return <span className="mtag">{children}</span>;
}

export type FilterOption<V extends string> = { value: V; label: string; count?: number; color?: string };

/** Filter chips with counts (02-work, 04-writeups). Toggle buttons, one pressed at a time. */
export function FilterChips<V extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: FilterOption<V>[];
  value: V;
  onChange: (v: V) => void;
}) {
  return (
    <div className="pch" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
          style={o.color ? ({ "--c": o.color } as React.CSSProperties) : undefined}
        >
          <OrbitGlyph dur="3s" />
          {o.label}
          {o.count != null ? <small>{String(o.count).padStart(2, "0")}</small> : null}
        </button>
      ))}
    </div>
  );
}
