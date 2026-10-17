# GOALS: Kachi Portfolio Build Tracker

This file is the single plan for the build. Claude Code reads it at the start of every run and updates it at the end of every run. Daniel decides when the next phase starts.

## How to work (read every run)

1. **One phase per run.** Do the first unchecked phase and nothing else. Never start the next phase, even if it looks small or you have time left.
2. **Stop at the gate.** Each phase ends with a gate. When every box in the phase is ticked, push `redesign`, then stop and report. Do not carry on.
3. **Report format.** At the end of a run send: what was built, the preview link, a compare checklist (what to look at against which board and at which widths), anything where board and handoff disagreed, and new TODOs. Keep it short.
4. **Update this file.** Tick boxes only when the work is done and checked (type-check, lint and build pass, and you have looked at the result in a browser at 390 and 1440). Change the phase status line. Add dated notes under "Run log".
5. **Do not mark a phase complete on Daniel's behalf.** Set it to `READY FOR REVIEW`. Only Daniel sets `APPROVED`. If a phase is not `APPROVED`, do not build anything that depends on it.
6. **Board wins.** The boards in `handoff/designs/` are the visual truth. When a board and HANDOFF.md disagree, follow the board and log it under "Conflicts".
7. **Copy rules, every phase.** First person as Kachi, no em dashes, no invented stats or links, nothing ported from the old site. Missing facts become a TODO in `src/lib/site.ts`, not made-up text.
8. **Small commits** on `redesign`. Never touch `main`.

Status values: `NOT STARTED` | `IN PROGRESS` | `READY FOR REVIEW` | `APPROVED`

---

## Phase 0: Cleanup and shell
Status: IN PROGRESS
Board: none
- [ ] Branch `redesign` exists; old UI, old content and unused packages removed per the approved deletion list
- [ ] Redirects in `next.config.ts` (all return 308); `/certifications` goes to `/#credentials`; `/projects/:slug` goes to `/work`
- [ ] README replaced with a short real one; `handoff/` gitignored
- [ ] `layout.tsx` wired with fonts, tokens and the empty header and footer shell; dark only
- [ ] Open Graph and Twitter metadata point to a real, resolving banner image
- [ ] Type-check, lint and production build pass; branch pushed
Gate: Daniel opens the preview. Routes load on the dark ground in Geist, no old UI visible, old links redirect.

## Phase 1: Design tokens, header and footer
Status: NOT STARTED
Boards: 00-home-desktop, 01-home-mobile, 08-type-geist
- [ ] Tokens (color, type, spacing, radii, shadows, motion) match the boards
- [ ] Header, mobile (390): logo with satellite, resume pill, pages menu
- [ ] Header, desktop (1440): pill nav with sliding lens
- [ ] Footer: ridge, nav list, social icons, WAT clock, base line
- [ ] Menu opens and closes by touch, mouse and keyboard; focus rings; reduced motion respected
Gate: header and footer compared side by side with the boards at 390 and 1440.

## Phase 2: Shared pieces
Status: NOT STARTED
Boards: 09-button-pairs, 03-case-study, 00-home-desktop
- [ ] Lens button pair (primary and secondary) moves like one piece of glass by mouse, touch and keyboard
- [ ] Capsule, section heading, chips, glass card, rim and grain
- [ ] Scroll reveal helper with reduced-motion fallback
- [ ] Shown on a hidden temporary page, `/_kit`, removed before merge
Gate: Daniel tries the buttons on a phone and a laptop.

## Phase 3: Homepage sections (one section per run, mobile first, then desktop)
Boards: 01-home-mobile, 00-home-desktop
Each section below is its own run. Tick it, set it `READY FOR REVIEW`, stop.

- 3.1 Hero with the hologram portrait. Status: NOT STARTED
  - [ ] Hologram assembles once on load, matches board colour grade, seed and timing
  - [ ] Hero text, buttons, "Remote" tile, motto (static, no replay button)
  - [ ] Smooth on a mid-range phone; low-tier fallback works; desktop hero hierarchy matches
- 3.2 The Record. Status: NOT STARTED
  - [ ] Matches board at 390 and 1440
- 3.3 Three Orbits. Status: NOT STARTED
  - [ ] Matches board; animation respects reduced motion
- 3.4 Case Studies strip. Status: NOT STARTED
  - [ ] Cards use real slugs; desktop pinned horizontal strip works
- 3.5 Skills. Status: NOT STARTED
  - [ ] Matches board
- 3.6 Writeups preview. Status: NOT STARTED
  - [ ] Matches board; real Medium links only
- 3.7 About and credentials. Status: NOT STARTED
  - [ ] Matches board; element with `id="credentials"` exists; badges and certificates from `public/`
- 3.8 Contact block. Status: NOT STARTED
  - [ ] Matches board; real contact details from `site.ts`
Gate for the whole homepage: every section `APPROVED`, then the full page is checked top to bottom at 360, 390, 768, 1024, 1440.

## Phase 4: Case study template (one lab)
Status: NOT STARTED
Boards: 03-case-study. Content: `content/case-studies/the-overpowered-role.md`
- [ ] Hero, meta, result strip, Objective, What I found, What I did, Before and after, lesson quote, skills, repo button, previous and next
- [ ] Extra sections from the reference file (Scenario, Validation, Recommendations, Tools) in the same section style
- [ ] Handles missing sections without gaps (DevSecOps labs have a shorter template)
- [ ] Code blocks and tables render cleanly at 390
Gate: The Overpowered Role side by side with board 03.

## Phase 5: Work hub
Status: NOT STARTED
Board: 02-work
- [ ] All / Cloud / DevSecOps filters over grouped sections
- [ ] Cards link to `/work/[slug]`; works with only one lab present
Gate: filters and grouping match the board.

## Phase 6: Notion import, cloud track (15 labs)
Status: NOT STARTED
Source: Notion "CYBER-SECURITY GITHUB PROJECT DOCUMENTATION"
- [ ] Import in batches of 4 (one folder per run), first person, identifiers masked
- [ ] Batch A: Access Identity Management (3)
- [ ] Batch B: Network and Perimeter Defense (4)
- [ ] Batch C: Secure Compute (4)
- [ ] Batch D: Storage and Data Security (4)
- [ ] Real GitHub repo URLs added or left as logged TODOs
Gate: Daniel reads each batch and approves wording before the next.

## Phase 7: Notion import, DevSecOps track (17 labs)
Status: NOT STARTED
Source: Notion "DevSecOp Website Portfolio"
- [ ] Batches of 4 to 5, same rules, plus mask internal IPs, hostnames, usernames, flags and keys
- [ ] Batch A: Build and pipeline (6)
- [ ] Batch B: Supply chain, Kubernetes (3)
- [ ] Batch C: Docker (5)
- [ ] Batch D: Infrastructure as Code (3)
Gate: same as Phase 6.

## Phase 8: Writeups list and article
Status: NOT STARTED
Boards: 04-writeups, 05-article
- [ ] List page and article template
- [ ] Real titles, dates, read times and links from Medium; cover images or a designed fallback
Gate: compared against boards 04 and 05.

## Phase 9: About page
Status: NOT STARTED
Board: 06-about
- [ ] Hologram, lede, credentials, How I work orbit loop (3400ms per step, 9000ms hold after a tap)
Gate: compared against board 06.

## Phase 10: Contact page
Status: NOT STARTED
Board: 07-contact
- [ ] Form posts to Formspree, shows success, resets, handles errors
- [ ] Real email and social links
Gate: Daniel sends a real test message and it arrives.

## Phase 11: 404, SEO and share previews
Status: NOT STARTED
- [ ] Designed 404, page titles and descriptions, sitemap, robots
- [ ] Open Graph and Twitter cards checked on LinkedIn and X
- [ ] Analytics only if Daniel asks

## Phase 12: QA and launch
Status: NOT STARTED
- [ ] Widths 360 to 1440, reduced motion on and off, a low-end Android
- [ ] Lighthouse: performance 85 or more, accessibility 95 or more
- [ ] Temporary `/_kit` page removed; all TODOs in `site.ts` resolved or accepted
- [ ] Daniel approves the preview, then merge `redesign` into `main`

---

## Open TODOs (mirror of `site.ts` todos)
- Resume PDF
- Real GitHub repo URL per lab
- Medium article bodies, publish dates, read times
- Writeup cover images
- New Open Graph image check

## Conflicts (board vs handoff, log every one)
- Severity Medium colour: board shows red, handoff says amber. Decision: amber.
- Work hub filters: board chips win over the handoff's four categories plus tab.
- Homepage sections: board wins over the handoff's list.

## Run log
(Claude Code adds a dated line per run: what was done, what is ready for review.)
