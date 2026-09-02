import { useEffect, useRef } from "react";

/** Partículas que se mueven como ondas de sonido y reaccionan al ratón. */
export function AudioWaves({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = 0.5;
    let my = 0.5;
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) / Math.max(r.width, 1);
      my = (e.clientY - r.top) / Math.max(r.height, 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const colors = ["rgba(255,255,255,", "rgba(200,200,200,", "rgba(150,150,150,"];
    let raf = 0;
    let t = 0;

    const draw = () => {
      t += reduce ? 0 : 0.012;
      ctx.clearRect(0, 0, w, h);
      const cols = Math.max(28, Math.floor(w / 26));
      const rows = 3;
      for (let r = 0; r < rows; r++) {
        const color = colors[r % colors.length]!;
        for (let i = 0; i < cols; i++) {
          const x = (i / (cols - 1)) * w;
          const p = i / cols;
          const pull = 1 - Math.min(1, Math.abs(p - mx) * 2.2);
          const amp = h * (0.05 + r * 0.02) * (0.6 + pull * 0.9);
          const y =
            h * (0.5 + (r - 1) * 0.11 + (my - 0.5) * 0.08) +
            Math.sin(p * 9 + t * (1.2 + r * 0.35)) * amp;
          const rad = 1.1 + pull * 1.8;
          ctx.beginPath();
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${(0.18 + pull * 0.45).toFixed(3)})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
