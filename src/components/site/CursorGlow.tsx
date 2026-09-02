import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Cursor doble: nube de luz + anillo con retraso + punto sólido inmediato. */
export function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const cloudX = useSpring(x, { stiffness: 22, damping: 26, mass: 1.4 });
  const cloudY = useSpring(y, { stiffness: 22, damping: 26, mass: 1.4 });
  const ringX = useSpring(x, { stiffness: 140, damping: 18, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 140, damping: 18, mass: 0.6 });
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHot(Boolean(el?.closest("a, button, [data-cursor='hot']")));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-30 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: cloudX,
          top: cloudY,
          background:
            "radial-gradient(circle, rgba(200,78,42,0.10) 0%, rgba(166,61,42,0.05) 35%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/45"
        style={{ left: ringX, top: ringY }}
        animate={{ width: hot ? 62 : 30, height: hot ? 62 : 30, opacity: hot ? 0.85 : 0.5 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-50 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ left: x, top: y }}
      />
    </>
  );
}
