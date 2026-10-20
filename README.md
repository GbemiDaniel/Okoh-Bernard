# Kachi Bernard, portfolio

Portfolio of Onyedikachi (Kachi) Bernard Okoh, cloud security and DevSecOps engineer. Live at [okoh-bernard-portfolio.vercel.app](https://okoh-bernard-portfolio.vercel.app).

The `redesign` branch is a full rebuild. Progress is tracked phase by phase in [GOALS.md](GOALS.md).

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS v4, Framer Motion, Formspree for the contact form, deployed on Vercel.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/lib/site.ts` | Contact details, links, nav, and every open TODO |
| `src/lib/content.ts` | Loader for the markdown in `content/` |
| `src/lib/credentials.ts` | TryHackMe certificates and badges with verify links |
| `src/styles/tokens.css` | Design tokens (colour, type, spacing, radii, motion) |
| `content/case-studies/` | One markdown file per lab; `the-overpowered-role.md` is the schema reference |
| `content/writeups/` | One markdown file per article, with its Medium URL |
| `public/hologram/` | Hologram portrait and particle data |

The design handoff is kept locally in `handoff/` and is never committed.

## Content rules

All copy is first person, as Kachi describing his own work. No em dashes, no invented numbers or links, and AWS account IDs, instance IDs and keys are masked in lab content.
