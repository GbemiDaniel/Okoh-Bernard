// Filter groups on the writeups list (04-writeups chips), in board order.
export const writeupTopics = [
  { slug: "ai", label: "AI security", c: "var(--color-lavender)", rgb: "196 181 253" },
  { slug: "identity", label: "Identity", c: "var(--color-sky)", rgb: "125 211 252" },
  { slug: "crypto", label: "Cryptography", c: "var(--color-mint)", rgb: "94 234 212" },
  { slug: "risk", label: "Risk", c: "var(--color-mint)", rgb: "94 234 212" },
] as const;
export type WriteupTopic = (typeof writeupTopics)[number]["slug"];
