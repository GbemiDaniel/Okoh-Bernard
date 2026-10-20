import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Share image for every page (1200 x 630), rendered once at build. Current
 * aesthetic: night background with the teal wash, the hologram portrait over
 * its violet halo and projector, name with the brand gradient, the three
 * orbits. Fonts and a PNG copy of the portrait live in src/app/_og (the image
 * renderer reads neither woff2 nor webp).
 */
export const alt = `${site.name}, Cloud Security & DevSecOps Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dir = join(process.cwd(), "src/app/_og");
const MINT = "#5eead4";

export default async function OgImage() {
  const [bold, regular, mono, portrait] = await Promise.all([
    readFile(join(dir, "Geist-Bold.ttf")),
    readFile(join(dir, "Geist-Regular.ttf")),
    readFile(join(dir, "GeistMono-Medium.ttf")),
    readFile(join(dir, "portrait.png")),
  ]);
  const src = `data:image/png;base64,${portrait.toString("base64")}`;
  const host = new URL(site.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "radial-gradient(70% 120% at 78% 0%, #0b2229 0%, #070f1c 62%)",
          fontFamily: "Geist",
          color: "#eaf2f4",
        }}
      >
        {/* Violet halo behind the portrait */}
        <div style={{ position: "absolute", right: 70, top: 40, width: 520, height: 520, borderRadius: 520, background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.30) 0%, rgba(124,58,237,0.10) 38%, rgba(124,58,237,0) 70%)" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={330} height={462} style={{ position: "absolute", right: 165, top: 58, opacity: 0.92 }} alt="" />
        {/* Projector puck */}
        <div style={{ position: "absolute", right: 238, top: 506, width: 184, height: 34, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 50%, rgba(244,255,253,0.95) 0%, rgba(94,234,212,0.75) 18%, rgba(14,36,48,1) 52%, #070f17 100%)", boxShadow: "0 0 0 1px rgba(94,234,212,0.3), 0 14px 40px rgba(94,234,212,0.25)" }} />

        {/* Copy */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 84, width: 660 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Geist Mono", fontSize: 18, letterSpacing: 4, color: MINT }}>
            <div style={{ width: 36, height: 1.5, background: `linear-gradient(90deg, ${MINT}, rgba(94,234,212,0))` }} />
            PORTFOLIO
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 22, fontSize: 92, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4.6 }}>
            <span>Onyedikachi</span>
            <span style={{ backgroundImage: "linear-gradient(90deg, #5eead4, #8b5cf6 70%, #a78bfa)", backgroundClip: "text", color: "transparent", paddingBottom: 8 }}>Bernard</span>
          </div>
          <div style={{ marginTop: 26, fontSize: 30, fontWeight: 700, letterSpacing: -0.6 }}>Cloud Security &amp; DevSecOps Engineer</div>
          <div style={{ marginTop: 12, fontSize: 21, lineHeight: 1.5, color: "#94a3b8", maxWidth: 520 }}>
            I find the misconfiguration, prove the risk, fix it and validate the fix.
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 34, fontFamily: "Geist Mono", fontSize: 14, letterSpacing: 2 }}>
            {[
              ["CLOUD", "#7dd3fc"],
              ["DEVSECOPS", MINT],
              ["AI SECURITY", "#c4b5fd"],
            ].map(([label, c]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 15px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "#cbd5e1" }}>
                <div style={{ width: 7, height: 7, borderRadius: 7, background: c, boxShadow: `0 0 8px ${c}` }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Site address, bottom right */}
        <div style={{ position: "absolute", right: 64, bottom: 34, fontFamily: "Geist Mono", fontSize: 15, letterSpacing: 1.5, color: "#64748b" }}>{host}</div>
        {/* Horizon line */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: "linear-gradient(90deg, rgba(94,234,212,0), #5eead4 35%, #8b5cf6 70%, rgba(139,92,246,0))" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: bold, weight: 700, style: "normal" },
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
