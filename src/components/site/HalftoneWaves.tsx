import { useEffect, useRef } from "react";

/** Ondas halftone rojizas que reaccionan al ratón y al scroll. */
export function HalftoneWaves() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const W = 380;
    const H = 380;
    const gap = 11;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let mx = 0.5;
    let my = 0.5;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.02;
      const scroll = window.scrollY * 0.002;
      ctx.clearRect(0, 0, W, H);
      for (let x = 0; x < W; x += gap) {
        for (let y = 0; y < H; y += gap) {
          const dx = x / W - mx;
          const dy = y / H - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin(d * 12 - t * 1.6 + scroll) * 0.5 + 0.5;
          const r = wave * (gap * 0.42);
          if (r < 0.3) continue;
          ctx.fillStyle = `rgba(200, 78, 42, ${0.12 + wave * 0.35})`;
          ctx.fillRect(x, y, r, r);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed right-0 bottom-0 z-0 h-[380px] w-[380px] opacity-40"
      style={{ maskImage: "radial-gradient(circle at 80% 80%, #000 10%, transparent 72%)" }}
    />
  );
}
