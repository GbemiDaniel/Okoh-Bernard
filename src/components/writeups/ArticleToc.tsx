"use client";

import { useId, useState } from "react";

/**
 * "In this article" (05 .toc): collapsed by default on phones and tablets.
 * From 1024px the contents rail beside the article takes over (hidden in CSS).
 */
export function ArticleToc({ items }: { items: { id: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  if (items.length < 2) return null;
  return (
    <nav className="ar-toc" data-open={open} aria-label="In this article">
      <button type="button" aria-expanded={open} aria-controls={listId} onClick={() => setOpen(!open)}>
        <span>
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 6h16M4 12h10M4 18h13" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          In this article
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ol id={listId} hidden={!open}>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} onClick={() => setOpen(false)}>
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
