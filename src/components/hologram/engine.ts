/*
  Hologram engine, ported from build(), ensureCtx(), loop() and draw() in
  handoff/designs/01-home-mobile.dc.html. Values were tuned with the client:
  keep the seed, timings, alphas and blend modes exactly as they are.

  Differences from the board, all mechanical:
  - Assets load from /public instead of inline base64.
  - The artboard is 390 wide; the canvas can be any CSS width and the
    drawing scales to it (the desktop board renders the same art at 1.5x).
  - Reduced motion draws the settled final frame once instead of looping.
*/

type Particles = {
  n: number;
  tx: Float32Array; ty: Float32Array; sx: Float32Array; sy: Float32Array;
  qx: Float32Array; qy: Float32Array; d: Float32Array; tr: Float32Array;
  b: Float32Array; ph: Float32Array; keep: Uint8Array;
};

type Grads = Record<"cone" | "side" | "front" | "spec" | "floor" | "face" | "core" | "halo", CanvasGradient>;

const W = 390;
const CX = 195;
const DW = 240, DH = 336, HX = CX - DW / 2, HY = 16, BT = HY + DH - 8;
export const PORTRAIT_SRC = "/hologram/portrait.webp";
export const PARTICLES_SRC = "/hologram/particles.bin";

// Decoded once per page load; the seeded build is identical every time.
let particlesPromise: Promise<Particles> | null = null;
function loadParticles(): Promise<Particles> {
  particlesPromise ??= fetch(PARTICLES_SRC)
    .then((r) => {
      if (!r.ok) throw new Error(`particles ${r.status}`);
      return r.arrayBuffer();
    })
    .then((buf) => {
      const view = new DataView(buf), n = buf.byteLength >> 2;
      const F = () => new Float32Array(n);
      const P: Particles = { n, tx: F(), ty: F(), sx: F(), sy: F(), qx: F(), qy: F(), d: F(), tr: F(), b: F(), ph: F(), keep: new Uint8Array(n) };
      let seed = 7;
      const rnd = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
      for (let i = 0; i < n; i++) {
        const v = view.getUint32(i * 4); // big-endian
        const xn = (v >>> 20) / 4095, yn = ((v >>> 8) & 4095) / 4095;
        const tx = HX + xn * DW, ty = HY + yn * DH, sx = CX + (rnd() - 0.5) * 64, sy = BT - 1;
        P.tx[i] = tx; P.ty[i] = ty; P.sx[i] = sx; P.sy[i] = sy;
        P.qx[i] = (sx + tx) / 2 + (rnd() - 0.5) * 120;
        P.qy[i] = sy - (sy - ty) * 0.5 - rnd() * 26;
        P.d[i] = 0.35 + (1 - yn) * 1.1 + rnd() * 0.28;
        P.tr[i] = 1.75 + (1 - yn) * 1.45;
        P.b[i] = (v & 255) / 255;
        P.ph[i] = rnd() * 6.283;
        P.keep[i] = rnd() < 0.3 ? 1 : 0;
      }
      return P;
    });
  return particlesPromise;
}

export class HologramEngine {
  private cv: HTMLCanvasElement;
  private H: number;
  private ctx: CanvasRenderingContext2D | null = null;
  private grads: Grads | null = null;
  private bk: number[][][] = [[], []].map(() => Array.from({ length: 8 }, () => [] as number[]));
  private P: Particles | null = null;
  private img = new Image();
  private imgOk = false;
  private born = 0;
  private sparks: { x: number; y: number; v: number; l: number }[] = [];
  private tier: "low" | "high";
  private fEma = 16;
  private frames = 0;
  private last = 0;
  private hdt = 0;
  private raf = 0;
  private on = true;
  private still: boolean;
  private glitchAt = 0;
  private glitch: { y: number; h: number; dx: number; until: number } | null = null;
  private dip = 0;
  private scale = 1;
  private destroyed = false;
  private onTier?: (tier: "low") => void;

  constructor(canvas: HTMLCanvasElement, opts: { height: number; reduced: boolean; onLowTier?: () => void }) {
    this.cv = canvas;
    this.H = opts.height;
    this.still = opts.reduced;
    this.onTier = opts.onLowTier;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const hc = nav.hardwareConcurrency || 8, dm = nav.deviceMemory || 8;
    this.tier = hc <= 4 || dm <= 3 ? "low" : "high";
    if (this.tier === "low") this.onTier?.("low");
    for (let i = 0; i < 34; i++) this.sparks.push({ x: CX + (Math.random() - 0.5) * 90, y: 60 + Math.random() * 270, v: 8 + Math.random() * 14, l: Math.random() });
  }

  start() {
    this.img.decoding = "async";
    const imgReady = new Promise<void>((res) => {
      this.img.onload = () => {
        this.imgOk = true;
        res();
        if (this.still) this.drawOnce();
      };
      this.img.onerror = () => res();
    });
    this.img.src = PORTRAIT_SRC;
    loadParticles()
      .then(async (P) => {
        if (this.destroyed) return;
        this.P = P;
        // Start the build once the portrait is in, or after 1.2s so a slow image never holds the particles back.
        await Promise.race([imgReady, new Promise((r) => setTimeout(r, 1200))]);
        if (this.destroyed) return;
        this.born = performance.now();
        this.last = this.born;
        this.glitchAt = this.born + 4000;
        if (this.still) this.drawOnce();
        else this.raf = requestAnimationFrame(this.loop);
      })
      .catch(() => {});
  }

  /** Off-screen pause (IntersectionObserver) */
  setVisible(on: boolean) {
    this.on = on;
  }

  /** Canvas CSS size changed */
  resize() {
    this.ctx = null;
    if (this.still) this.drawOnce();
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
  }

  private drawOnce() {
    if (this.P) this.draw(performance.now(), 0);
  }

  private loop = (now: number) => {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    // Frame budget: a phone that keeps missing frames drops to the light renderer.
    this.frames++;
    this.fEma = this.fEma * 0.95 + dt * 1000 * 0.05;
    if (this.tier !== "low" && this.frames > 120 && this.fEma > 24) {
      this.tier = "low";
      this.ctx = null;
      this.onTier?.("low");
    }
    this.hdt += dt;
    if (this.on && (this.tier !== "low" || (this.frames & 1) === 0)) {
      this.draw(now, this.hdt);
      this.hdt = 0;
    }
    this.raf = requestAnimationFrame(this.loop);
  };

  private ensureCtx() {
    const cv = this.cv;
    const cssW = cv.clientWidth || W;
    this.scale = cssW / W;
    const dpr = (this.tier === "low" ? 1 : Math.min(2, window.devicePixelRatio || 1)) * this.scale;
    const pw = Math.round(W * dpr), ph = Math.round(this.H * dpr);
    if (!this.ctx || cv.width !== pw || cv.height !== ph) {
      cv.width = pw;
      cv.height = ph;
      const ctx = cv.getContext("2d");
      this.ctx = ctx;
      if (!ctx) return null;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rg = (r: number, stops: [number, string][]) => {
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
        stops.forEach((x) => g.addColorStop(x[0], x[1]));
        return g;
      };
      const cone = ctx.createLinearGradient(0, BT, 0, 10);
      cone.addColorStop(0, "rgba(94,234,212,.13)"); cone.addColorStop(0.5, "rgba(94,234,212,.035)"); cone.addColorStop(1, "rgba(94,234,212,0)");
      const side = ctx.createLinearGradient(0, BT, 0, BT + 24);
      side.addColorStop(0, "#163540"); side.addColorStop(0.35, "#0b1a26"); side.addColorStop(1, "#04090f");
      const front = ctx.createLinearGradient(CX - 135, 0, CX + 135, 0);
      front.addColorStop(0, "rgba(94,234,212,0)"); front.addColorStop(0.5, "rgba(240,255,252,.95)"); front.addColorStop(1, "rgba(167,139,250,0)");
      const spec = ctx.createLinearGradient(CX - 64, 0, CX + 64, 0);
      spec.addColorStop(0, "rgba(255,255,255,0)"); spec.addColorStop(0.3, "rgba(255,255,255,.22)"); spec.addColorStop(0.5, "rgba(255,255,255,.05)"); spec.addColorStop(1, "rgba(255,255,255,0)");
      this.grads = {
        cone, side, front, spec,
        floor: rg(150, [[0, "rgba(94,234,212,.22)"], [0.5, "rgba(124,58,237,.08)"], [1, "rgba(124,58,237,0)"]]),
        face: rg(64, [[0, "rgba(94,234,212,.42)"], [0.55, "rgba(94,234,212,.08)"], [1, "rgba(94,234,212,0)"]]),
        core: rg(26, [[0, "rgba(244,255,253,1)"], [0.3, "rgba(94,234,212,.85)"], [1, "rgba(94,234,212,0)"]]),
        halo: rg(170, [[0, "rgba(20,184,166,.12)"], [0.6, "rgba(124,58,237,.06)"], [1, "rgba(124,58,237,0)"]]),
      };
    }
    return this.ctx;
  }

  private draw(now: number, dt: number) {
    const ctx = this.ensureCtx();
    if (!ctx || !this.P || !this.grads) return;
    const still = this.still, low = this.tier === "low", H = this.H, cx = CX, G = this.grads, PI = Math.PI;
    const RX = 64, RY = 11.5, HH = 12;
    const t = still ? 99 : this.born ? (now - this.born) / 1000 : 99, tn = now / 1000;
    const cl = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
    const power = cl(t / 0.6), beamOn = cl((t - 0.15) / 0.7);
    const bob = still ? 0 : Math.sin(tn * 0.9) * 1.6;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    // ambient halo and floor light
    ctx.globalAlpha = power;
    ctx.save(); ctx.translate(cx, 190); ctx.fillStyle = G.halo; ctx.fillRect(-170, -170, 340, 340); ctx.restore();
    ctx.save(); ctx.translate(cx, BT + HH); ctx.scale(1, 0.19); ctx.fillStyle = G.floor; ctx.beginPath(); ctx.arc(0, 0, 150, 0, PI * 2); ctx.fill(); ctx.restore();
    // volumetric beam: three soft layers instead of one hard-edged shape
    const flick = still ? 1 : 0.92 + 0.08 * Math.sin(tn * 7.1) * Math.sin(tn * 2.3);
    ctx.fillStyle = G.cone;
    for (let k = 0; k < 3; k++) {
      const w0 = 40 + k * 10, w1 = 112 + k * 22;
      ctx.globalAlpha = beamOn * flick * (k === 0 ? 1 : 0.55);
      ctx.beginPath(); ctx.moveTo(cx - w0, BT); ctx.lineTo(cx - w1, 8); ctx.lineTo(cx + w1, 8); ctx.lineTo(cx + w0, BT); ctx.closePath(); ctx.fill();
    }
    // dust drifting through the light
    ctx.fillStyle = "#bff7ec";
    for (let i = 0, n = low ? 16 : this.sparks.length; i < n; i++) {
      const sp = this.sparks[i];
      if (!still) { sp.y -= sp.v * 0.45 * dt; sp.x += Math.sin(tn * 0.7 + i) * 3 * dt; sp.l -= dt * 0.22; }
      if (sp.l <= 0 || sp.y < 24) { sp.y = BT - 4 - Math.random() * 30; sp.x = cx + (Math.random() - 0.5) * 90; sp.l = 1; sp.v = 8 + Math.random() * 14; }
      ctx.globalAlpha = beamOn * Math.sin(Math.max(0, sp.l) * PI) * 0.55; ctx.fillRect(sp.x, sp.y, 1.2, 1.2);
    }
    // the portrait resolves upward behind the particles
    const rk = cl((t - 1.75) / 1.45), re = rk < 0.5 ? 2 * rk * rk : 1 - Math.pow(-2 * rk + 2, 2) / 2;
    const revY = HY + DH - re * (DH + 24);
    if (this.imgOk && rk > 0) {
      if (!still && now > this.glitchAt) {
        this.glitch = { y: HY + 40 + Math.random() * 200, h: 4 + Math.random() * 10, dx: (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 4), until: now + 90 };
        this.glitchAt = now + 5200 + Math.random() * 5000;
      }
      const gl = t > 3.4 && this.glitch && now < this.glitch.until ? this.glitch : null;
      const ia = 0.95 * (still ? 1 : 0.95 + 0.05 * Math.sin(tn * 11.3) * Math.sin(tn * 3.7)) * (this.dip && now < this.dip ? 0.82 : 1);
      if (!still && !this.dip && Math.random() < 0.002) this.dip = now + 70;
      else if (this.dip && now > this.dip + 400) this.dip = 0;
      const top = HY + bob;
      const slice = (y0: number, y1: number, dx: number, al: number) => {
        if (y1 <= y0) return;
        ctx.save(); ctx.globalCompositeOperation = "source-over"; ctx.beginPath(); ctx.rect(HX - 30, y0, DW + 60, y1 - y0); ctx.clip(); ctx.globalAlpha = al; ctx.drawImage(this.img, HX + dx, top, DW, DH); ctx.restore();
      };
      const y0 = Math.max(HY - 10, revY);
      // The glow layer stays disabled, as on the board (if (false && this.glowOk)).
      if (gl) { slice(y0, gl.y, 0, ia); slice(Math.max(y0, gl.y), gl.y + gl.h, gl.dx, ia); slice(Math.max(y0, gl.y + gl.h), H, 0, ia); }
      else slice(y0, H, 0, ia);
      slice(revY - 18, revY, 0, ia * 0.35);
      // scan band: a brighter slice of the image travels down every few seconds
      if (!still && rk >= 1) {
        const sb = HY + ((tn % 5.5) / 5.5) * (DH + 60) - 30;
        ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.beginPath(); ctx.rect(HX - 30, sb, DW + 60, 14); ctx.clip(); ctx.globalAlpha = 0.12; ctx.drawImage(this.img, HX, top, DW, DH); ctx.restore();
      }
    }
    // particles: stream out of the emitter on curved paths and land on his features
    const P = this.P, B = this.bk;
    B.forEach((r) => r.forEach((q) => { q.length = 0; }));
    const stride = low ? 2 : 1;
    for (let i = 0; i < P.n; i += stride) {
      const u0 = cl((t - P.d[i]) / 1.25);
      if (u0 <= 0) continue;
      const settle = cl((t - P.tr[i] - 0.1) / 0.55);
      let a: number;
      if (settle >= 1) {
        if (!P.keep[i]) continue;
        a = P.b[i] * (still ? 0.16 : 0.06 + 0.16 * (0.5 + 0.5 * Math.sin(tn * 2.2 + P.ph[i] * 4)));
      } else {
        const land = u0 >= 1 ? 1 : 0.85 + 0.15 * u0;
        a = P.b[i] * land * (1 - settle) + (P.keep[i] ? settle * P.b[i] * 0.3 : 0);
        if (u0 < 1) a = Math.min(1, a + 0.35 * (1 - u0));
      }
      let x: number, y: number;
      if (u0 >= 1) { x = P.tx[i]; y = P.ty[i] + bob; }
      else {
        const u = 1 - Math.pow(1 - u0, 4), v = 1 - u;
        x = v * v * P.sx[i] + 2 * v * u * P.qx[i] + u * u * P.tx[i];
        y = v * v * P.sy[i] + 2 * v * u * P.qy[i] + u * u * P.ty[i] + bob * u;
      }
      const q = Math.min(7, (a * 9) | 0);
      if (q < 1 && a < 0.04) continue;
      B[P.b[i] > 0.72 ? 1 : 0][q].push(x, y);
    }
    const sz = low ? 1.7 : 1.3, hs = sz / 2;
    for (let c = 0; c < 2; c++) {
      ctx.fillStyle = c ? "#effffb" : "#5eead4";
      for (let q = 0; q < 8; q++) {
        const arr = B[c][q];
        if (!arr.length) continue;
        ctx.globalAlpha = (q + 0.7) / 8;
        ctx.beginPath();
        for (let j = 0; j < arr.length; j += 2) ctx.rect(arr[j] - hs, arr[j + 1] - hs, sz, sz);
        ctx.fill();
      }
    }
    // the resolve line
    if (rk > 0 && rk < 1) {
      ctx.globalAlpha = Math.sin(rk * PI); ctx.fillStyle = G.front; ctx.fillRect(cx - 135, revY - 0.6, 270, 1.2);
      ctx.globalAlpha = Math.sin(rk * PI) * 0.25; ctx.fillRect(cx - 135, revY - 4, 270, 8);
    }
    ctx.globalAlpha = 1;
    // fine scanlines carved through the projection
    ctx.globalCompositeOperation = "destination-out"; ctx.globalAlpha = 0.12; ctx.fillStyle = "#000"; ctx.beginPath();
    for (let y = HY - 8; y < BT; y += 3) ctx.rect(HX - 30, y, DW + 60, 1);
    ctx.fill(); ctx.globalAlpha = 1;
    // projector: dark machined puck, glass face, glowing lens
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = G.side; ctx.beginPath(); ctx.moveTo(cx - RX, BT); ctx.lineTo(cx - RX, BT + HH); ctx.ellipse(cx, BT + HH, RX, RY, 0, PI, 0, true); ctx.lineTo(cx + RX, BT); ctx.ellipse(cx, BT, RX, RY, 0, 0, PI, false); ctx.closePath(); ctx.fill();
    ctx.fillStyle = G.spec; ctx.beginPath(); ctx.moveTo(cx - RX, BT); ctx.lineTo(cx - RX, BT + HH); ctx.ellipse(cx, BT + HH, RX, RY, 0, PI, 0, true); ctx.lineTo(cx + RX, BT); ctx.ellipse(cx, BT, RX, RY, 0, 0, PI, false); ctx.closePath(); ctx.globalAlpha = 0.6; ctx.fill(); ctx.globalAlpha = 1;
    ctx.fillStyle = "#071119"; ctx.beginPath(); ctx.ellipse(cx, BT, RX, RY, 0, 0, PI * 2); ctx.fill();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = power;
    ctx.save(); ctx.translate(cx, BT); ctx.scale(1, RY / RX); ctx.fillStyle = G.face; ctx.beginPath(); ctx.arc(0, 0, RX, 0, PI * 2); ctx.fill(); ctx.restore();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(160,240,228,.55)"; ctx.beginPath(); ctx.ellipse(cx, BT, RX, RY, 0, 0, PI * 2); ctx.stroke();
    ctx.strokeStyle = "rgba(94,234,212,.16)"; ctx.beginPath(); ctx.ellipse(cx, BT, RX - 12, RY - 2.2, 0, 0, PI * 2); ctx.stroke();
    ctx.strokeStyle = "rgba(94,234,212,.12)"; ctx.beginPath(); ctx.ellipse(cx, BT + HH, RX, RY, 0, 0.12, PI - 0.12, false); ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,.2)"; ctx.beginPath(); ctx.ellipse(cx, BT + 1.2, RX - 2.5, RY - 1, 0, PI * 1.1, PI * 1.9, false); ctx.stroke();
    ctx.save(); ctx.translate(cx, BT); ctx.scale(1, 0.2); ctx.globalAlpha = power * (still ? 0.95 : 0.82 + 0.18 * Math.sin(tn * 2.4)); ctx.fillStyle = G.core; ctx.beginPath(); ctx.arc(0, 0, 26, 0, PI * 2); ctx.fill(); ctx.restore();
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
  }
}
