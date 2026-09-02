import { motion } from "motion/react";
import { Github } from "lucide-react";

/** Icono de GitHub que "saluda" con una ola cada 5s. */
export function GithubWave({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <motion.span
      className="inline-block origin-bottom"
      animate={{ rotate: [0, 0, 16, -12, 14, -8, 0, 0] }}
      transition={{
        duration: 5,
        times: [0, 0.6, 0.68, 0.75, 0.82, 0.89, 0.95, 1],
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Github className={className} />
    </motion.span>
  );
}
