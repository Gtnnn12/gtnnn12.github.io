import type { ReactNode } from "react";
import { motion } from "motion/react";

/** Flotado perpetuo suave, con ritmo propio según el índice. */
export function Float({
  children,
  index = 0,
  amplitude = 8,
  className,
}: {
  children: ReactNode;
  index?: number;
  amplitude?: number;
  className?: string;
}) {
  const duration = 6.5 + (index % 4) * 1.4;
  const delay = (index % 5) * 0.7;
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0, amplitude * 0.6, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
