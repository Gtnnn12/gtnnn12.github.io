import { motion } from "motion/react";

/** Icono de Discord con "saludo" periódico (rotación tipo ola). */
export function DiscordWave({ className = "" }: { className?: string }) {
  return (
    <motion.span
      className={`inline-flex ${className}`}
      style={{ transformOrigin: "50% 80%", willChange: "transform" }}
      animate={{ rotate: [0, 0, -14, 12, -10, 8, 0], y: [0, 0, -2, 0, -1, 0, 0] }}
      transition={{ duration: 5, times: [0, 0.6, 0.68, 0.76, 0.84, 0.92, 1], repeat: Infinity }}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path d="M20.317 4.369A19.79 19.79 0 0 0 15.432 3c-.21.375-.45.88-.615 1.28a18.27 18.27 0 0 0-5.634 0A12.6 12.6 0 0 0 8.56 3a19.74 19.74 0 0 0-4.885 1.372C.716 8.72-.087 12.977.293 17.176a19.9 19.9 0 0 0 5.993 3.03c.472-.64.892-1.32 1.253-2.033a12.9 12.9 0 0 1-1.973-.94c.166-.12.328-.246.484-.375a14.2 14.2 0 0 0 11.9 0c.158.132.32.257.484.375-.63.37-1.293.686-1.977.942.36.71.78 1.39 1.253 2.03a19.86 19.86 0 0 0 5.996-3.03c.45-4.86-.77-9.08-3.39-12.807ZM8.02 14.61c-1.18 0-2.15-1.08-2.15-2.41 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.33-.96 2.41-2.16 2.41Zm7.96 0c-1.18 0-2.15-1.08-2.15-2.41 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.33-.95 2.41-2.16 2.41Z" />
      </svg>
    </motion.span>
  );
}
