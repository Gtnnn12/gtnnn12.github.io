import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Plug, Search, Zap } from "lucide-react";

import { plugins } from "@/data/plugins";
import { AmbientAura } from "@/components/site/AmbientAura";
import { CursorGlow } from "@/components/site/CursorGlow";
import { ScrollProgress } from "@/components/site/ScrollProgress";

export const Route = createFileRoute("/plugins")({
  head: () => ({
    meta: [
      { title: "NexCord Plugins — Catálogo completo de plugins" },
      {
        name: "description",
        content:
          "Explora todos los plugins disponibles para NexCord, el mod de Discord: buscador en tiempo real, estado de cada plugin y descripciones.",
      },
      { property: "og:title", content: "NexCord Plugins — Catálogo completo de plugins" },
      {
        property: "og:description",
        content: "Busca y descubre los plugins de NexCord: activos, inactivos y sus funciones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PluginsPage,
});

function PluginsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return plugins;
    return plugins.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="grain relative min-h-screen scroll-smooth bg-background">
      <AmbientAura />
      <ScrollProgress />
      <CursorGlow />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-20">
        <header className="text-center">
          <Link
            to="/"
            className="nav-link font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase"
          >
            ← Gtnn
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex items-center justify-center gap-3 text-5xl font-semibold sm:text-6xl"
          >
            <motion.span
              animate={{ scale: [1, 1.12, 1], rotate: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <Zap className="h-9 w-9 text-primary" />
            </motion.span>
            <motion.span
              className="text-ember-flow"
              animate={{
                filter: [
                  "drop-shadow(0 0 0px color-mix(in oklab, var(--primary) 0%, transparent))",
                  "drop-shadow(0 0 26px color-mix(in oklab, var(--primary) 60%, transparent))",
                  "drop-shadow(0 0 0px color-mix(in oklab, var(--primary) 0%, transparent))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              NexCord Plugins
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            Explora todos los plugins disponibles para tu mod de Discord.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pulse-border mt-7 inline-flex items-center gap-2 rounded-full bg-surface px-5 py-2 font-mono text-xs text-foreground/75"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {plugins.length} plugins • Actualizados
          </motion.p>
        </header>

        <div className="mx-auto mt-14 max-w-xl">
          <label htmlFor="plugin-search" className="sr-only">
            Buscar plugin
          </label>
          <div className="hairline group flex items-center gap-3 rounded-full bg-surface px-5 py-3.5 transition-colors focus-within:border-primary/60">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <input
              id="plugin-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar plugin por nombre o descripción..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>

        <main
          className="mt-12 grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {filtered.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: Math.min(i * 0.05, 1.2),
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="card-glow hairline flex h-full flex-col rounded-2xl bg-surface/70 p-6 transition-colors hover:border-primary/50"
              style={{ willChange: "transform" }}
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base font-bold text-foreground">{p.name}</h2>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] whitespace-nowrap ${
                    p.active
                      ? "bg-primary/12 text-primary"
                      : "bg-surface-2 text-muted-foreground"
                  }`}
                >
                  {p.active ? "✅ Activo" : "⛔ Inactivo"}
                </span>
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-surface-2 px-3 py-1 font-mono text-[11px] text-foreground/60">
                  NexCord
                </span>
                {p.active && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 font-mono text-[11px] text-primary">
                    <Plug className="h-3 w-3" />
                    plugin
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </main>

        {filtered.length === 0 && (
          <p className="mt-16 text-center font-mono text-sm text-muted-foreground">
            Sin resultados para “{query}”.
          </p>
        )}

        <hr className="divider-flow mt-20" />

        <footer className="mt-8 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <span className="font-mono">Hecho con ❤️ para la comunidad de NexCord</span>
          <div className="flex items-center gap-5">
            <span className="font-mono">{filtered.length} mostrados</span>
            <a
              href="https://github.com/Gtnnn12/NexCordInstaller"
              target="_blank"
              rel="noreferrer"
              className="nav-link font-mono text-primary"
            >
              Descargar NexCord
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
