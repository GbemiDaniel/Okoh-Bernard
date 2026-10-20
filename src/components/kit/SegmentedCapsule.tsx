"use client";

import { useRef, useState } from "react";

export type Segment<V extends string> = {
  value: V;
  label: string;
  icon?: React.ReactNode;
  /** RGB channels for the lens tint, e.g. "125 211 252". Defaults to mint. */
  rgb?: string;
};

/**
 * Segmented glass capsule: the topic picker in 07-contact (.tp, label under
 * icon) and the discipline switch in 01-home-mobile (.seg, `row` variant).
 * The lens leads with the edge it is travelling towards.
 */
export function SegmentedCapsule<V extends string>({
  label,
  options,
  value,
  onChange,
  variant = "stack",
  className = "",
}: {
  label: string;
  options: Segment<V>[];
  value: V;
  onChange: (v: V) => void;
  variant?: "stack" | "row";
  className?: string;
}) {
  const index = Math.max(0, options.findIndex((o) => o.value === value));
  const [dir, setDir] = useState<"l" | "r">("r");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const pick = (i: number, focus = false) => {
    const n = (i + options.length) % options.length;
    setDir(n < index ? "l" : "r");
    onChange(options[n].value);
    if (focus) refs.current[n]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (step) {
      e.preventDefault();
      pick(index + step, true);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      pick(e.key === "Home" ? 0 : options.length - 1, true);
    }
  };

  const rgb = options[index]?.rgb;
  const style = { "--i": index, "--n": options.length, ...(rgb ? { "--rgb": rgb } : {}) } as React.CSSProperties;

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`tp rim ${variant === "row" ? "tp-row" : ""} ${className}`}
      data-dir={dir}
      style={style}
      onKeyDown={onKey}
    >
      <span className="halo" aria-hidden="true" />
      <span className="lens" aria-hidden="true">
        <span className="grain" />
      </span>
      {options.map((o, i) => (
        <button
          key={o.value}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          role="radio"
          aria-checked={i === index}
          tabIndex={i === index ? 0 : -1}
          onClick={() => pick(i)}
        >
          {o.icon}
          {o.label}
        </button>
      ))}
    </div>
  );
}
