import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; href?: string };

const SCRIPT: Line[] = [
  { kind: "cmd", text: "info" },
  { kind: "out", text: "Desarrollador & Creador de NexCord." },
  { kind: "out", text: "Construyendo herramientas y comunidades digitales." },
  { kind: "cmd", text: "cat ./contact.txt" },
  { kind: "out", text: "Discord: @elg1t4n0", href: "https://discord.com/users/elg1t4n0" },
  { kind: "cmd", text: "cat ./github.txt" },
  { kind: "out", text: "https://github.com/Gtnnn12", href: "https://github.com/Gtnnn12" },
];

const TOTAL = SCRIPT.reduce((n, l) => n + l.text.length, 0);

/** Terminal CLI con typewriter que se reproduce cada vez que entra en viewport. */
export function ContactTerminal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-90px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) {
      setN(0);
      return;
    }
    if (n >= TOTAL) return;
    const t = setTimeout(() => setN((v) => v + 1), 26);
    return () => clearTimeout(t);
  }, [inView, n]);

  let budget = n;
  const rendered: ReactNode[] = [];
  for (let i = 0; i < SCRIPT.length; i++) {
    const l = SCRIPT[i]!;
    if (budget <= 0) break;
    const shown = l.text.slice(0, budget);
    budget -= l.text.length;
    if (l.kind === "cmd") {
      rendered.push(
        <p key={i} className="mt-3 first:mt-0">
          <span className="text-primary">root@gtnn</span>
          <span className="text-white/40">:~$ </span>
          <span className="text-white">{shown}</span>
        </p>,
      );
    } else {
      rendered.push(
        <p key={i} className="text-white/80">
          {l.href ? (
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-primary/50 underline-offset-4 transition-colors hover:text-primary"
            >
              {shown}
            </a>
          ) : (
            shown
          )}
        </p>,
      );
    }
  }

  return (
    <div
      ref={ref}
      className="border-travel relative mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-primary/25 text-left shadow-[0_0_50px_-24px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="flex items-center gap-2 border-b border-primary/20 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="ml-2 font-mono text-[10px] tracking-widest text-primary/70 uppercase">
          root@gtnn — contact
        </span>
      </div>
      <div className="min-h-[220px] px-5 py-4 font-mono text-[13px] leading-relaxed break-words">
        {rendered}
        <p className="mt-3">
          <span className="text-primary">root@gtnn</span>
          <span className="text-white/40">:~$ </span>
          <span className="caret inline-block h-[1em] w-[8px] translate-y-[2px] bg-primary" />
        </p>
      </div>
    </div>
  );
}
