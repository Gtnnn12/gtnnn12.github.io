import { useEffect, useRef } from "react";

const CHARS = "#%&$@{}();=/\\<>[]*+".split("");

/** Lluvia de caracteres ASCII estilo Matrix, apenas perceptible. */
export function AsciiRain({ opacity = 0.06 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let cols = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    const size = 14;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(window.innerWidth / size);
      drops = Array.from({ length: cols }, () => Math.random() * window.innerHeight);
      speeds = Array.from({ length: cols }, () => 0.25 + Math.random() * 0.6);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = `${size}px "JetBrains Mono", monospace`;
      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)] ?? "#";
        const y = drops[i] ?? 0;
        const speed = speeds[i] ?? 0.4;
        ctx.fillStyle = i % 9 === 0 ? "rgba(200, 78, 42, 0.55)" : "rgba(235, 225, 220, 0.5)";
        ctx.fillText(char, i * size, y);
        drops[i] = y > window.innerHeight + Math.random() * 400 ? 0 : y + speed;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity }}
    />
  );
}
