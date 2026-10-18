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
Status: APPROVED (Daniel, 2026-10-18: "move on to the next")
Board: none
- [x] Branch `redesign` exists; old UI, old content and unused packages removed per the approved deletion list
- [x] Redirects in `next.config.ts` (all return 308); `/certifications` goes to `/#credentials`; `/projects/:slug` goes to `/work`
- [x] README replaced with a short real one; `handoff/` gitignored
- [x] `layout.tsx` wired with fonts, tokens and the empty header and footer shell; dark only
- [x] Open Graph and Twitter metadata point to a real, resolving banner image
- [x] Type-check, lint and production build pass; branch pushed
Gate: Daniel opens the preview. Routes load on the dark ground in Geist, no old UI visible, old links redirect.

## Phase 1: Design tokens, header and footer
Status: APPROVED (Daniel, 2026-10-18: "looks good carry on")
Boards: 00-home-desktop, 01-home-mobile, 08-type-geist
- [x] Tokens (color, type, spacing, radii, shadows, motion) match the boards
- [x] Header, mobile (390): logo with satellite, resume pill, pages menu
- [x] Header, desktop (1440): pill nav with sliding lens
- [x] Footer: ridge, nav list, social icons, WAT clock, base line
- [x] Menu opens and closes by touch, mouse and keyboard; focus rings; reduced motion respected
Gate: header and footer compared side by side with the boards at 390 and 1440.

## Phase 2: Shared pieces
Status: APPROVED (Daniel, 2026-10-18: "alright. lets go.")
Boards: 09-button-pairs, 03-case-study, 00-home-desktop
- [x] Lens button pair (primary and secondary) moves like one piece of glass by mouse, touch and keyboard
- [x] Capsule, section heading, chips, glass card, rim and grain
- [x] Scroll reveal helper with reduced-motion fallback
- [x] Shown on a hidden temporary page, `/_kit`, removed before merge
Gate: Daniel tries the buttons on a phone and a laptop.

## Phase 3: Homepage sections (one section per run, mobile first, then desktop)
Boards: 01-home-mobile, 00-home-desktop
Each section below is its own run. Tick it, set it `READY FOR REVIEW`, stop. (Overridden by Daniel on 2026-10-18 for this phase: all sections in one run.)

- 3.1 Hero with the hologram portrait. Status: APPROVED (Daniel, 2026-10-18: "go ahead, finish phase three")
  - [x] Hologram assembles once on load, matches board colour grade, seed and timing
  - [x] Hero text, buttons (no "Remote" tile or motto in either hero board; see Conflicts)
  - [x] Low-tier fallback works; desktop hero hierarchy matches. Smooth on a mid-range phone: Daniel to confirm on a real device
- 3.2 The Record. Status: READY FOR REVIEW
  - [x] Matches board at 390 and 1440
- 3.3 Three Orbits. Status: READY FOR REVIEW
  - [x] Matches board; animation respects reduced motion
- 3.4 Case Studies strip. Status: READY FOR REVIEW
  - [x] Cards use real slugs (unimported labs open the work hub until their case study exists); desktop pinned horizontal strip works
- 3.5 Skills. Status: READY FOR REVIEW
  - [x] Matches board
- 3.6 Writeups preview. Status: READY FOR REVIEW
  - [x] Matches board; real Medium links only (dates and read times verified on Medium)
- 3.7 About and credentials. Status: READY FOR REVIEW
  - [x] Matches board; element with `id="credentials"` exists; badges and certificates from the TryHackMe records (board icons, each links to its verify page)
- 3.8 Contact block. Status: READY FOR REVIEW
  - [x] Matches board; real contact details from `site.ts`
- 3.9 Homepage section nav (added: on both boards, not listed above). Status: READY FOR REVIEW
  - [x] Mobile orbit dial, desktop progress rail, header lens follows the section in view
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
- Medium article bodies (publish dates and read times now verified)
- Writeup cover images
- New Open Graph image check (og:image is absolute to the production domain, so previews only resolve after merge)
- TryHackMe badge links: check in a browser (scripted requests get 429); certificate PDFs return 200
- Copy to confirm with Kachi: "I usually reply within a day" and "Works remote" (desktop contact, board copy)
- Featured card blurbs (board copy) to check against the Notion labs when they are imported (Phase 6 and 7)
- Canonical slugs: `iam-compromise-investigation` vs `aws-iam-compromise-investigation`; "Terraform IaC Hardening" vs "Terraform Cloud IaC Hardening"

## Conflicts (board vs handoff, log every one)
- Severity Medium colour: board shows red, handoff says amber. Decision: amber.
- Work hub filters: board chips win over the handoff's four categories plus tab.
- Homepage sections: board wins over the handoff's list.
- Heading weight: boards set display type at 700 (desktop hero 750); tokens.json says 800. Board wins.
- Hero wash: boards use #0b2229; tokens.json says #0e2a33. Board wins.
- Desktop nav: board tabs are Work, Writeups, About, Contact; the Navbar README says Home, About, Work, Contact. Board wins.
- Footer credit: HANDOFF allows an "Engineered by Daniel" link to deecrypthub. Left out for now; Daniel has not decided whether to add it.
- Desktop header: the Navbar README describes a transparent bar that fills on scroll, a gradient progress line and a Home tab. Board 00 has a constant blurred bar, no progress line, and Work, Writeups, About, Contact. Board wins.
- Desktop nav lens: on the homepage board it follows the section in view; site-wide it marks the current page. Homepage section tracking comes with Phase 3.
- Mobile header scrolls away with the page (absolute, as on every board); the desktop header is fixed.
- Breakpoint: desktop header and footer from 1024px. No tablet board, so 768 to 1023 uses the mobile header.
- Rim light, grain and the primary glass button (`btn-p`) were built in Phase 1 because the header and footer use them. Phase 2 turns them into the full kit.
- Button pair: board 09 recommends "A · Split capsule" (golden-ratio split, lens always visible). The homepage boards (00, 01) use a later version: lens hidden at rest, 58/42 split, lit discs, tap fires then navigates. Built the homepage version.
- Lens motion: HANDOFF suggests Framer Motion or animating the board's own variables. Used the board's variables and data attributes in CSS, so timings match exactly.
- Lens active state: Daniel found the board's lens (white top sheen, bright bottom edge, heavy glow) off from the rest of the system. Changed on both capsules to a soft tint, 1px hairline and a faint glow, matching the active filter chip and cards. Daniel's call overrides the board here.
- Button scaling: boards scale with a preview zoom. Built fluid sizes instead: capsules, link capsule and glass button scale from 80% at 312px to the board size at 390px and up.
- 3.1 hero contents: GOALS lists a "Remote" tile and the motto in the hero. Neither hero board has them: the mobile hero is hologram, eyebrow, name, lede and the button pair; the desktop hero adds the role line, stats and scroll cue. The motto lives in section 06 About (3.7) and "Based in Nigeria" is a Record tile (3.2). Board wins.
- Hologram start: the board starts the build clock at mount, even while assets are still loading. The site starts it once the particles and portrait are ready (or after 1.2s), so visitors always see the build from the first frame. Seed, timings and look are unchanged.
- Hero links: "View my work" and "Get in touch" point to #work and #contact as on the board; until 3.4 and 3.8 add those sections they open /work and /contact.
- Desktop hero stats: 08 domains and 09 credentials are computed from the data; 32 labs is `site.labCount` until every lab is imported (lab count TODO).
- Header nav at 1024: tabs are 108px on the board; they now shrink to 88px at 1024 so the pill never touches the résumé pill. Unchanged at 1440.
- Location: Daniel's rule (2026-10-18), applies to every page: never mention Kachi's location or show his local time; describe his work mode as remote or hybrid. Overrides the boards: the Record "Based in" tile is now "Works · Remote · Or hybrid", the About line drops "based in Nigeria", the footer clock is a "Remote · Hybrid" pill, the footer base line is "Secure by design", the desktop contact pill reads "Open to remote · hybrid". Board 06 (About page) says "based in Nigeria" too: leave it out in Phase 9.
- Run scope: Daniel asked for all of Phase 3 in one run ("finish phase three and report back"), overriding one section per run for this phase.
- Writeups header: the board says "READ ON SITE"; until the on-site articles exist (Phase 8) the cards open Medium, so the label reads "READ ON MEDIUM". Restore with Phase 8.
- Credentials: the board shows them as icons only; each now links to its TryHackMe verify page so every claim can be checked.
- Motto: the desktop board makes it a replay button; HANDOFF says it writes once and is not tappable. HANDOFF wins here (it records the client decision).
- Record tiles: the board nests links inside a <dl>, which is invalid HTML; built as a grid of links with the same look.
- Email row: at a true 390px the board's own email row overflows (its preview was zoomed to 1.15). Text now scales to fit from 360px up; at 320px it truncates with the full address in the tooltip and the Copy button.
- Desktop content width: with the progress rail showing (1280px and up), content starts at least 180px in so the rail's label never covers copy. Below 1280 the rail is hidden. 1920 keeps the board's 1200px column.
- Tablet (768 to 1023, no board): sections keep a 720px column, the orbit map caps at 546px and the hero button pair at 430px.
- Overflow bug found and fixed: the hologram halo (118% of the stage, as on the board) widened the mobile layout viewport to 425px, zooming the page out. main now clips horizontal overflow. This also affected the approved 3.1 hero.
- Scrollbar: boards hide it. Daniel asked for a themed one instead: thin mint glass pill on the night track, native CSS only so scroll-linked motion keeps native scrolling.
- OG banner: Daniel chose to keep the original banner as the share image. Renamed to `public/og-banner.png` (1672x941).

## Run log
(Claude Code adds a dated line per run: what was done, what is ready for review.)
- 2026-10-17, Phase 0 (IN PROGRESS): added GOALS.md; committed site config, content loader, tokens, fonts, `/work` and `/writeups` skeletons, hologram assets; redirects verified (all 308, `/projects/:slug` to `/work`); README replaced; TryHackMe records moved to `src/lib/credentials.ts`; new share banner and KB favicon. BLOCKED: the removal of the old UI was stopped by the auto-mode safety check and needs Daniel's explicit approval, so layout wiring and the push wait. Branch not pushed yet.
- 2026-10-18, Phase 0 (READY FOR REVIEW): Daniel kept the original banner as the share image (renamed to `og-banner.png`) and approved the deletions. Removed the old UI, content, three unused photos and the packages `react-tsparticles`, `tsparticles-slim`, `react-icons`, `next-themes`. Wired `globals.css` and `layout.tsx` (tokens, Geist, header and footer shell, dark only); placeholders on `/`, `/about`, `/contact` and the 404. Checked every route at 390 and 1440 in headless Chrome. Branch pushed.
- 2026-10-18, Phase 0 review feedback: themed scrollbar added; body uses `overflow-x: clip` so sticky scroll effects work; footer credit stays out until Daniel decides; missing pages stay as placeholders. Still READY FOR REVIEW.
- 2026-10-18, Phase 0 approved by Daniel. Phase 1 (READY FOR REVIEW): tokens extended (alpha channels, nav and lift colours); grain and rim light; mobile header (orbiting KB logo, résumé pill, pages menu) and desktop header (pill nav with lens, résumé, Get in touch); footer with mobile and desktop ridge art, card, socials, live WAT clock and base line; motion pauses off screen and stops under reduced motion. Checked in Chrome at 360, 390 and 1440: no horizontal overflow, menu opens by click and closes by Escape with focus returned, scroll locks while open, focus ring 2px mint. Branch pushed.
- 2026-10-18, Phase 1 approved by Daniel. Phase 2 (READY FOR REVIEW): kit in `src/components/kit` and `src/styles/kit.css`: split capsule (hero pair), segmented capsule (topic picker and ring switch, arrow keys), link capsule, arrow link, section headings (mobile orbit index, desktop rule, page kicker, case study head), skill chips, orbit and mono tags, filter chips, glass card, panel, quote, scroll reveal. Demo at `/_kit` (noindex, folder `src/app/%5Fkit`). Checked in Chrome at 390 and 1440: hover, keyboard focus and touch tap on the capsule (fires, then navigates), arrow keys and lens direction on the segmented capsule, reveal on scroll, no overflow, reduced motion shows final states. Branch pushed.
- 2026-10-18, Phase 2 review feedback: buttons and capsules now scale fluidly on small phones; quieter lens active state on both capsules. Checked at 320, 360, 390 and 1440: no label overflows its segment, no page overflow. Still READY FOR REVIEW.
- 2026-10-18, Phase 2 approved by Daniel. 3.1 Hero (READY FOR REVIEW): hologram engine ported from the board (seed 7, same decode, timings, grade, scanlines, scan band, glitches, puck), assets from `public/hologram`, scales to any width (1.5x on desktop as on the board), pauses off screen, low tier at 4 or fewer cores, 3GB memory or slow frames (adds `lite` site-wide), reduced motion draws the settled frame once. Mobile hero from 01, desktop hero from 00 with desktop-only reveals and the parallax. Checked in Chrome: final frame identical to the board side by side; 0 draws off screen; 1 draw under reduced motion; low tier at 4 cores; no overflow at 360, 390, 1024, 1440. Branch pushed.
- 2026-10-18, 3.1 approved by Daniel; Phase 3 finished in one run at his request. 3.2 to 3.8 and the added 3.9 section nav set to READY FOR REVIEW. Writeups metadata added as content files (dates and read times verified on Medium). Fixed a horizontal overflow from the hologram halo that also affected 3.1. Checked in Chrome at 320, 360, 390, 768, 1024, 1280, 1440 and 1920: no overflow; count-ups, motto, reveals, orbit switching by ring, label, tab and swipe, panel jump to the right slide, copy email, dial (open, Escape, focus), rail and header lens, pinned strip, contact fill; reduced motion stops loops and shows final states. Branch pushed.
- 2026-10-18, Phase 3 feedback: removed every mention of Kachi's location and the live local-time clocks (Record tile, About line, footer pill and base line, desktop contact pill); work mode reads remote or hybrid. Checked: no page renders location text; build, lint and type-check pass. Phase 3 still READY FOR REVIEW.
