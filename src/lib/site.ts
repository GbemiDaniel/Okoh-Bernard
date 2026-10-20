// Single source of truth for Kachi's identity, links and contact details.
// Values come from HANDOFF.md section 8. Reference these everywhere instead of
// hard-coding a link or address in a component.

export const site = {
  name: "Onyedikachi Bernard Okoh",
  shortName: "Kachi Bernard",
  displayName: "Onyedikachi Bernard",
  url: "https://okoh-bernard-portfolio.vercel.app",
  // Never state his location or local time anywhere on the site (Daniel, 2026-10-18).
  workMode: "Remote or hybrid",
  email: "kachisichobernardokoh@gmail.com",
  linkedin: "https://www.linkedin.com/in/onyedikachi-bernard-okoh-405861262",
  github: "https://github.com/OnyedikachiO",
  medium: "https://medium.com/@kachisichobernardokoh",
  mediumHandle: "@kachisichobernardokoh",
  tryhackme: "https://tryhackme.com/p/Kachisicho",
  // TODO(resume): the PDF is not in public/. Daniel to supply it before launch.
  resume: "/Onyedikachi_Bernard_Okoh_CV.pdf",
  formspreeId: "mwvgjkrl",
  // Notion count: 15 cloud + 17 DevSecOps. TODO(lab count): confirm with Kachi.
  // Replace with getCaseStudies().length once every lab is imported.
  labCount: 32,
  cloudLabs: 15,
  devsecopsLabs: 17,
} as const;

// Pages nav. `hint` is the mono tag in the mobile pages menu (01-home-mobile).
export const nav = [
  { label: "Work", href: "/work", hint: "32 LABS" },
  { label: "Writeups", href: "/writeups", hint: "ARTICLES" },
  { label: "About", href: "/about", hint: "CERTIFICATES" },
  { label: "Contact", href: "/contact", hint: "SAY HELLO" },
] as const;

// Footer profile icons (F1/F2), in board order.
export const profiles = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Medium", href: site.medium },
  { label: "TryHackMe", href: site.tryhackme },
] as const;

// Footer credit (F1/F2). Daniel set this link on 2026-10-20.
export const credit = { label: "Daniel", href: "https://gbemidaniel.vercel.app" } as const;

// Every open placeholder on the site, so nothing ships by accident.
// Remove an entry once the real value is in place.
export const todos = [
  "resume: add /public/Onyedikachi_Bernard_Okoh_CV.pdf (missing from the old repo)",
  "case studies: real GitHub repo URL per lab (designs link to the profile for now)",
  "case studies: bodies for every lab except the-overpowered-role (Notion import pending)",
  "writeups: confirm the Medium read times for the 5 newest imports (estimated at 265 wpm; marked in their frontmatter)",
  "writeups: confirm Medium has no posts older than the RSS feed's 10 (profile and API block scripted access)",
  "writeups: Kachi to confirm masking in Diffie-Hellman (lab hostname, HMAC key, cracked password) and including the two opinion pieces",
  "lab count: confirm 15 cloud + 17 DevSecOps = 32, and de-duplicate the two build-process pages",
  "share preview: og:image is absolute to the production domain, so previews resolve only after merge",
  "credentials: check the TryHackMe badge links in a browser (scripted requests get 429)",
  "copy: Kachi to confirm \"Your details are only used to reply to you.\" (contact form note)",
  "featured cards: check the board blurbs against the Notion labs on import",
  "severity: Kachi to confirm per-finding severities on imported labs (listed in GOALS.md)",
] as const;
