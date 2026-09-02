import { useEffect, useState } from "react";
import { motion } from "motion/react";

const LINES: { cmd: string; out: string[] }[] = [
  {
    cmd: "git clone https://github.com/Gtnnn12/NexCordInstaller",
    out: ["Clonando en 'NexCordInstaller'...", "✔ 214 objetos recibidos, 123 completados"],
  },
  {
    cmd: "cd NexCordInstaller && pnpm install",
    out: ["✔ 214 paquetes auditados · 0 vulnerabilidades"],
  },
  {
    cmd: "pnpm run dev",
    out: ["> NexCord@1.0.0 dev", "> next dev", "⚡ Servidor listo en http://localhost:3000"],
  },
];

export function TerminalSim() {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output" | "clearing">("typing");

  const current = LINES[line]!;

  useEffect(() => {
    if (phase === "typing") {
      if (chars < current.cmd.length) {
        const t = setTimeout(() => setChars((c) => c + 1), 42);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("output"), 420);
      return () => clearTimeout(t);
    }
    if (phase === "output") {
      const t = setTimeout(() => setPhase("clearing"), 2400);
      return () => clearTimeout(t);
    }
    if (chars > 0) {
      const t = setTimeout(() => setChars((c) => Math.max(0, c - 4)), 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLine((l) => (l + 1) % LINES.length);
      setPhase("typing");
    }, 320);
    return () => clearTimeout(t);
  }, [phase, chars, current.cmd.length]);

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      style={{ willChange: "transform", backgroundColor: "oklch(0.11 0 0)" }}
      className="relative w-full max-w-md overflow-hidden rounded-xl border border-primary/25 shadow-[0_0_40px_-18px_color-mix(in_oklab,var(--primary)_60%,transparent)] backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 border-b border-primary/20 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="ml-2 font-mono text-[10px] tracking-widest text-primary/70 uppercase">
          gtnn@dev — zsh
        </span>
      </div>
      <div className="min-h-[132px] px-4 py-4 font-mono text-[13px] leading-relaxed">
        <div className="flex flex-wrap items-center">
          <span className="mr-2 text-[oklch(0.78_0.16_150)]">$</span>
          <span className="break-all text-[oklch(0.85_0.13_180)]">{current.cmd.slice(0, chars)}</span>
          <span className="caret ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-[oklch(0.8_0.17_150)]" />
        </div>
        <div className="mt-2 space-y-1">
          {current.out.map((o, i) => (
            <motion.p
              key={`${line}-${i}-${phase}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: phase === "output" ? 1 : 0, y: phase === "output" ? 0 : 4 }}
              transition={{ duration: 0.4, delay: phase === "output" ? i * 0.28 : 0 }}
              className="text-xs break-all text-[oklch(0.76_0.14_155)]"
            >
              {o}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
