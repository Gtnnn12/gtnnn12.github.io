import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CountUp({
  to,
  label,
  suffix = "",
  duration = 2200,
  delay = 0,
}: {
  to: number;
  label: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    let start = 0;
    const timer = setTimeout(() => {
      const tick = (t: number) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(to * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [to, duration, delay]);

  return (
    <div className="text-center">
      <motion.p
        animate={{ opacity: [0.75, 1, 0.75], textShadow: [
          "0 0 0px transparent",
          "0 0 18px color-mix(in oklab, var(--primary) 55%, transparent)",
          "0 0 0px transparent",
        ] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="font-display text-3xl font-semibold text-primary sm:text-4xl"
      >
        {value.toLocaleString("es-ES")}
        {suffix}
      </motion.p>
      <p className="mt-1 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
        {label}
      </p>
    </div>
  );
}
