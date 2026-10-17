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
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Writeups", href: "/writeups" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Every open placeholder on the site, so nothing ships by accident.
// Remove an entry once the real value is in place.
export const todos = [
  "resume: add /public/Onyedikachi_Bernard_Okoh_CV.pdf (missing from the old repo)",
  "case studies: real GitHub repo URL per lab (designs link to the profile for now)",
  "case studies: bodies for every lab except the-overpowered-role (Notion import pending)",
  "writeups: article bodies and cover images (Medium import pending)",
  "writeups: confirm publish dates and read times against Medium",
  "lab count: confirm 15 cloud + 17 DevSecOps = 32, and de-duplicate the two build-process pages",
  "share preview: og:image is absolute to the production domain, so previews resolve only after merge",
  "credentials: check the TryHackMe badge links in a browser (scripted requests get 429)",
  "slugs: confirm iam-compromise-investigation vs aws-iam-compromise-investigation, and the Terraform lab slug",
] as const;
