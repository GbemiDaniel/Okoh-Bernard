# CORE ARCHITECTURE RULES
- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion (for all animations), Lucide React (for icons).
- **Typography:** Strictly TWO fonts. `Plus Jakarta Sans` (Primary/Headings) and `JetBrains Mono` (Secondary/Data/Badges).
- **SPA Architecture:** Use Next.js `layout.tsx` for persistent Navbar/Footer. Use Framer Motion in `template.tsx` for seamless page transitions. Pages: `/`, `/about`, `/certifications`, `/projects`.
- **Theme Engine Base:** Dark mode default (`#050806`). Light mode is a "Frosted Platinum" (`#F1F5F9`). Metallic text via `bg-clip-text`.

### MICRO-SCREEN SCALING RULES (< 360px)
- **Typography:** Never use static large text. Always scale up from a mobile-safe base (e.g., `text-3xl sm:text-5xl lg:text-7xl`). Use `break-words` or `truncate` on long strings.
- **Padding & Gaps:** Base padding for cards/containers must be tight on mobile. Use `p-4 sm:p-6 lg:p-8`. Base flex/grid gaps should start small: `gap-4 sm:gap-6`.
- **Flex Layouts:** Elements that sit side-by-side must have `flex-wrap` enabled on mobile if they risk overflowing, or stack vertically (`flex-col sm:flex-row`).
