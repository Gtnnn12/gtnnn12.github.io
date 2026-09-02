import { motion } from "motion/react";

/** Neblina naranja en movimiento + viñeta que "respira". Todo muy tenue. */
export function AmbientAura() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute -top-40 -left-32 h-[70vh] w-[70vw] rounded-full blur-[160px]"
        style={{ background: "var(--gradient-ember)", opacity: 0.1 }}
        animate={{ x: [0, 120, -60, 0], y: [0, 80, 140, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] bottom-[-20%] h-[65vh] w-[60vw] rounded-full blur-[180px]"
        style={{ background: "var(--gradient-ember)", opacity: 0.08 }}
        animate={{ x: [0, -140, 60, 0], y: [0, -90, -30, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 46, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 h-[50vh] w-[50vw] -translate-x-1/2 rounded-full blur-[200px]"
        style={{ background: "var(--gradient-ember)", opacity: 0.06 }}
        animate={{ x: ["-55%", "-35%", "-60%", "-55%"], y: [0, 60, -40, 0] }}
        transition={{ duration: 52, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, oklch(0.06 0 0 / 0.75) 100%)",
        }}
        animate={{ opacity: [0.65, 0.95, 0.65] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
