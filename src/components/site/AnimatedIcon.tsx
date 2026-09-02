import { motion } from "motion/react";

type Props = { className?: string };

const box = "inline-flex h-7 w-7 shrink-0 items-center justify-center [aspect-ratio:1]";

/** Flecha animada en bucle (28x28), pensada para ir inline con texto. */
export function ArrowLoopIcon({ className = "" }: Props) {
  return (
    <span className={`${box} ${className}`} aria-hidden>
      <svg viewBox="0 0 28 28" className="h-7 w-7">
        <motion.circle
          cx="14"
          cy="14"
          r="11"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="18 52"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "14px 14px" }}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={{ x: [-2, 2, -2], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M9 14h9" />
          <path d="M14.5 10.5 18 14l-3.5 3.5" />
        </motion.g>
      </svg>
    </span>
  );
}

/** Engranaje girando en bucle. */
export function GearLoopIcon({ className = "" }: Props) {
  return (
    <span className={`${box} ${className}`} aria-hidden>
      <svg viewBox="0 0 28 28" className="h-7 w-7">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "14px 14px" }}
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
        >
          <circle cx="14" cy="14" r="4" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="14"
              y1="4.5"
              x2="14"
              y2="7.5"
              transform={`rotate(${i * 45} 14 14)`}
              strokeLinecap="round"
            />
          ))}
        </motion.g>
      </svg>
    </span>
  );
}

/** Terminal con prompt parpadeante. */
export function TerminalLoopIcon({ className = "" }: Props) {
  return (
    <span className={`${box} ${className}`} aria-hidden>
      <svg viewBox="0 0 28 28" className="h-7 w-7">
        <rect
          x="3.5"
          y="5.5"
          width="21"
          height="17"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.3"
        />
        <path
          d="M8 11.5 11 14l-3 2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.rect
          x="13.5"
          y="16"
          width="6"
          height="1.6"
          rx="0.8"
          fill="currentColor"
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </span>
  );
}
