// Temporary stand-in for pages that are built in later phases. Not site copy.
export function Placeholder({ title, phase, children }: { title: string; phase: string; children?: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-read px-gutter pt-page-top">
      <p className="font-mono text-meta tracking-mono-wide text-ink-600 uppercase">Placeholder · {phase}</p>
      <h1 className="mt-4 text-display-page">{title}</h1>
      {children}
    </section>
  );
}
