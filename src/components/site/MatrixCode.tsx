import { useMemo } from "react";
import { motion } from "motion/react";

const HEX = "0123456789ABCDEF";

function makeToken(seed: number) {
  const binary = seed % 3 === 0;
  const len = binary ? 8 : 6;
  let out = "";
  for (let i = 0; i < len; i++) {
    const v = Math.floor(Math.abs(Math.sin(seed * 12.9898 + i * 78.233)) * 1000) % 16;
    out += binary ? String(v % 2) : HEX[v];
  }
  return binary ? out : `0x${out}`;
}

/** Hex/binario flotando muy sutilmente al fondo. */
export function MatrixCode({ count = 26 }: { count?: number }) {
  const tokens = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        text: makeToken(i + 1),
        left: (Math.abs(Math.sin(i * 3.7)) * 96).toFixed(2),
        top: (Math.abs(Math.cos(i * 2.3)) * 96).toFixed(2),
        drift: 20 + (i % 5) * 12,
        duration: 18 + (i % 7) * 5,
        delay: (i % 9) * 1.4,
        size: i % 4 === 0 ? "text-sm" : "text-xs",
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {tokens.map((t, i) => (
        <motion.span
          key={i}
          className={`absolute font-mono ${t.size} text-primary select-none`}
          style={{ left: `${t.left}%`, top: `${t.top}%` }}
          animate={{
            y: [0, -t.drift, 0],
            x: [0, t.drift / 3, 0],
            opacity: [0.04, 0.11, 0.04],
          }}
          transition={{
            duration: t.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: t.delay,
          }}
        >
          {t.text}
        </motion.span>
      ))}
    </div>
  );
}
