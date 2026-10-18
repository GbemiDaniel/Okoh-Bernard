// Single source of truth for Kachi's identity, links and contact details.
// Values come from HANDOFF.md section 8. Reference these everywhere instead of
// hard-coding a link or address in a component.

export const site = {
  name: "Onyedikachi Bernard Okoh",
  shortName: "Kachi Bernard",
  displayName: "Onyedikachi Bernard",
  url: "https://okoh-bernard-portfolio.vercel.app",
  location: "Nigeria",
  timeZone: "Africa/Lagos",
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

export const footerNav = [
  ...nav.map(({ label, href }) => ({ label, href })),
  { label: "Certificates & Badges", href: "/about#credentials" },
  { label: "Résumé", href: site.resume },
] as const;

export const socials = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Medium", href: site.medium },
  { label: "Email", href: `mailto:${site.email}` },
] as const;

// Every open placeholder on the site, so nothing ships by accident.
// Remove an entry once the real value is in place.
export const todos = [
  "resume: add /public/Onyedikachi_Bernard_Okoh_CV.pdf (missing from the old repo)",
  "case studies: real GitHub repo URL per lab (designs link to the profile for now)",
  "case studies: bodies for every lab except the-overpowered-role (Notion import pending)",
  "writeups: article bodies and cover images (Medium import pending)",
  "lab count: confirm 15 cloud + 17 DevSecOps = 32, and de-duplicate the two build-process pages",
  "share preview: og:image is absolute to the production domain, so previews resolve only after merge",
  "credentials: check the TryHackMe badge links in a browser (scripted requests get 429)",
  "slugs: confirm iam-compromise-investigation vs aws-iam-compromise-investigation, and the Terraform lab slug",
  "copy: Kachi to confirm \"I usually reply within a day\" and \"Works remote\" (desktop contact)",
  "featured cards: check the board blurbs against the Notion labs on import",
] as const;
