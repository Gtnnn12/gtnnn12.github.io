import { motion } from "motion/react";
import { Code2, Rocket } from "lucide-react";
import { DiscordWave } from "@/components/site/DiscordWave";

const badges = [
  { label: "Nitro", icon: DiscordWave, tone: "text-[oklch(0.82_0.14_85)]" },
  { label: "Developer", icon: Code2, tone: "text-[oklch(0.72_0.12_265)]" },
  { label: "Server Booster", icon: Rocket, tone: "text-[oklch(0.7_0.17_320)]" },
];

/** Tarjeta que simula un perfil de Discord. */
export function DiscordProfile() {
  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      style={{ willChange: "transform" }}
      className="border-travel w-full max-w-sm overflow-hidden rounded-2xl border border-primary/20 shadow-[0_28px_70px_-40px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
    >
      <div className="h-24" style={{ backgroundImage: "var(--gradient-ember)" }} />
      <div style={{ backgroundColor: "#2F3136" }} className="relative px-5 pt-0 pb-6">
        <div className="-mt-10 flex items-end justify-between">
          <div className="relative">
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-full blur-xl"
              style={{ background: "radial-gradient(circle, #C84E2A 0%, #6B2E1E 45%, transparent 70%)" }}
              animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.06, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="relative flex h-20 w-20 items-center justify-center rounded-full border-[5px] font-display text-3xl font-bold text-white"
              style={{
                borderColor: "#2F3136",
                backgroundImage: "linear-gradient(135deg, #C84E2A 0%, #A63D2A 45%, #4A1A1A 100%)",
                textShadow: "0 1px 6px rgba(0,0,0,0.45)",
              }}
            >
              G
            </div>
            <motion.span
              className="absolute right-0 bottom-0 h-5 w-5 rounded-full border-[3px]"
              style={{ borderColor: "#2F3136", backgroundColor: "oklch(0.72 0.18 148)" }}
              animate={{ opacity: [1, 0.55, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="mb-1 flex gap-2 rounded-lg px-2 py-1.5" style={{ backgroundColor: "#1E1F22" }}>
            {badges.map((b, i) => (
              <motion.span
                key={b.label}
                title={b.label}
                aria-label={b.label}
                className={`inline-flex h-4 w-4 ${b.tone}`}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3.5, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <b.icon className="h-4 w-4" />
              </motion.span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xl font-semibold text-white">elg1t4n0</p>
          <p className="font-mono text-xs text-white/45">elg1t4n0#0001</p>
        </div>

        <div className="mt-4 rounded-lg p-3" style={{ backgroundColor: "#1E1F22" }}>
          <p className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
            Sobre mí
          </p>
          <p className="mt-1.5 text-sm text-white/80">Creador de Vertex y NexCord</p>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg p-3" style={{ backgroundColor: "#1E1F22" }}>
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "oklch(0.72 0.18 148)" }}
          />
          <span className="font-mono text-xs text-white/70">Programando · Disponible</span>
        </div>
      </div>
    </motion.div>
  );
}
