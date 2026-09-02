import { motion } from "motion/react";

const LINES = [
  "const stream = await vertex.connect({ hz: 192000 })",
  "encrypt(session, { e2e: true, cipher: 'xchacha20' })",
  "latency :: 8.4ms | jitter :: 0.6ms",
  "room.join('vertex://studio', { limit: Infinity })",
  "screen.share({ res: '4k', fps: 60 })",
  "audio.pipeline.optimize() -> lossless",
];

/** Líneas de código flotantes (capa media del parallax de Vertex). */
export function CodeLines({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none select-none ${className ?? ""}`}>
      {LINES.map((line, i) => (
        <motion.p
          key={line}
          className="absolute font-mono text-[11px] whitespace-nowrap sm:text-xs"
          style={{
            top: `${12 + i * 13}%`,
            left: i % 2 === 0 ? "4%" : "auto",
            right: i % 2 === 0 ? "auto" : "6%",
            color: i % 2 === 0 ? "#ffffff" : "var(--vertex-purple)",
            opacity: 0.22,
            willChange: "transform, opacity",
          }}
          animate={{
            x: i % 2 === 0 ? [0, 26, 0] : [0, -26, 0],
            y: [0, -14, 0],
            opacity: [0.12, 0.3, 0.12],
          }}
          transition={{
            duration: 9 + i * 1.6,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
