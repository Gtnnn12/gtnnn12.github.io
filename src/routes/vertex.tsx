import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Headphones,
  Zap,
  Users,
  Lock,
  MonitorPlay,
  ShieldCheck,
  Rocket,
  Wallet,
  Check,
  Minus,
} from "lucide-react";

import { CursorGlow } from "@/components/site/CursorGlow";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { AudioWaves } from "@/components/site/AudioWaves";
import { CodeLines } from "@/components/site/CodeLines";
import { Navbar } from "@/components/site/Navbar";
import { Reveal } from "@/components/site/Reveal";
import { ParallaxLayer, HorizontalScroll, GsapZoom } from "@/components/site/gsap";
import { VertexIntro, useAccent } from "@/components/site/VertexIntro";
import { Float } from "@/components/site/Float";
import { GithubWave } from "@/components/site/GithubWave";
import { DiscordWave } from "@/components/site/DiscordWave";

export const Route = createFileRoute("/vertex")({
  head: () => ({
    meta: [
      { title: "Vertex — Alternativa gratuita a Discord y TeamSpeak" },
      {
        name: "description",
        content:
          "Vertex: audio en alta definición, latencia ultrabaja, cifrado de extremo a extremo, sin límite de usuarios y totalmente gratis. Lanzamiento 2026.",
      },
      { property: "og:title", content: "Vertex — La comunicación como nunca antes" },
      {
        property: "og:description",
        content:
          "La alternativa definitiva a Discord y TeamSpeak: calidad de estudio, latencia ultrabaja y sin suscripciones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VertexPage,
});

const features = [
  {
    icon: Headphones,
    title: "Audio en alta definición",
    desc: "Hasta 192 kHz sin compresión destructiva. Calidad de estudio en cada conversación.",
  },
  {
    icon: Zap,
    title: "Latencia ultrabaja",
    desc: "Menos de 10 ms de latencia real gracias a un stack de red optimizado.",
  },
  {
    icon: Users,
    title: "Sin límite de usuarios",
    desc: "Llamadas y salas de voz sin techo artificial de participantes.",
  },
  {
    icon: Lock,
    title: "Cifrado de extremo a extremo",
    desc: "Tus conversaciones son tuyas. Cifrado E2E activado por defecto.",
  },
  {
    icon: MonitorPlay,
    title: "Pantalla compartida en 4K",
    desc: "Comparte a 4K y 60 fps sin marcas de agua ni muros de pago.",
  },
  {
    icon: ShieldCheck,
    title: "Moderación avanzada",
    desc: "Permisos granulares, auditoría y herramientas anti-raid integradas.",
  },
  {
    icon: Rocket,
    title: "Rápido y ligero",
    desc: "Cliente nativo optimizado: arranque instantáneo y bajo consumo de RAM.",
  },
  {
    icon: Wallet,
    title: "Totalmente gratuito",
    desc: "Sin suscripciones, sin niveles premium, sin funciones tras un pago.",
  },
];

const comparison = [
  { row: "Precio", vertex: "Gratis, siempre", discord: "Nitro de pago", ts: "Licencia de pago" },
  { row: "Calidad de audio", vertex: "Hasta 192 kHz", discord: "96 kbps – 384 kbps", ts: "48 kHz" },
  { row: "Latencia", vertex: "< 10 ms", discord: "30 – 60 ms", ts: "20 – 40 ms" },
  { row: "Límite de usuarios", vertex: "Sin límite", discord: "Limitado por canal", ts: "Según licencia" },
  { row: "Cifrado", vertex: "E2E por defecto", discord: "Parcial", ts: "En tránsito" },
  { row: "Personalización", vertex: "Total, con plugins", discord: "Limitada", ts: "Básica" },
  { row: "Rendimiento", vertex: "Nativo y ligero", discord: "Pesado (Electron)", ts: "Ligero" },
];

function VertexPage() {
  const { accent, setAccent } = useAccent();

  return (
    <div
      className="vertex-surface grain relative min-h-screen scroll-smooth"
      style={{ ["--vertex-blue" as string]: accent }}
    >
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <VertexIntro accent={accent} onAccent={setAccent} />


      {/* INTRO / ESTADO */}
      <section className="relative z-10 mx-auto max-w-4xl overflow-hidden px-6 py-20 text-center">
        <ParallaxLayer speed={0.18} className="pointer-events-none absolute inset-0 z-0 opacity-40">
          <CodeLines className="absolute inset-0" />
          <AudioWaves className="absolute inset-x-0 bottom-0 h-[40vh] w-full opacity-50" />
        </ParallaxLayer>

        <Reveal className="relative z-10">
          <p className="text-xl text-white sm:text-2xl">
            Reinventando la comunicación. Gratis, sin límites, con calidad de estudio.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-balance" style={{ color: "var(--vertex-text)" }}>
            Vertex es la alternativa definitiva a Discord y TeamSpeak. Audio en alta definición
            (192 kHz), latencia ultrabaja (&lt; 10 ms), cifrado de extremo a extremo, sin límite de
            usuarios, pantalla compartida en 4K, moderación avanzada, y totalmente gratuito.
          </p>
          <p className="mt-6 font-mono text-xs tracking-widest text-white uppercase">
            🚀 En desarrollo activo · Lanzamiento: 2026
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              className="vertex-btn rounded-full px-7 py-3 font-mono text-xs tracking-widest uppercase"
            >
              Próximamente
            </button>
            <a
              href="#caracteristicas"
              className="vertex-ring rounded-full px-7 py-3 font-mono text-xs tracking-widest uppercase"
            >
              Ver características
            </a>
          </div>
        </Reveal>
      </section>


      {/* CARACTERÍSTICAS — carrusel horizontal */}
      <section id="caracteristicas" className="relative z-10 py-28">
        <Reveal className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="vertex-gradient text-4xl font-semibold sm:text-5xl">¿Por qué Vertex?</h2>
          <p className="mt-4" style={{ color: "var(--vertex-text)" }}>
            Todo lo que necesitas, sin límites ni suscripciones.
          </p>
          <hr
            className="mx-auto mt-8 w-40 border-0"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #ffffff, var(--vertex-purple), transparent)",
            }}
          />
        </Reveal>

        <HorizontalScroll
          className="mt-14 flex min-h-[70vh] items-center overflow-hidden"
          trackClassName="flex w-full flex-wrap items-stretch gap-6 px-6 md:flex-nowrap md:px-12"
        >
          {features.map((f, i) => (
            <Float
              key={f.title}
              index={i}
              amplitude={6}
              className="w-full sm:w-[calc(50%-0.75rem)] md:w-[320px] md:shrink-0"
            >
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="vertex-card h-full w-full rounded-2xl p-6"
              >
                <motion.span
                  className="inline-flex rounded-xl p-3"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#ffffff" }}
                  whileHover={{ scale: 1.12, rotate: -6 }}
                >
                  <f.icon className="h-6 w-6" strokeWidth={1.6} />
                </motion.span>
                <h3 className="mt-5 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--vertex-text)" }}>
                  {f.desc}
                </p>
              </motion.article>
            </Float>
          ))}
        </HorizontalScroll>
      </section>

      {/* COMPARATIVA */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-28">
        <Reveal className="text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Vertex vs Discord vs TeamSpeak
          </h2>
        </Reveal>

        <GsapZoom from={0.8} className="mt-12">
          <div className="vertex-card overflow-x-auto rounded-2xl">
            <div className="min-w-[640px]">
              <div
                className="grid grid-cols-4 gap-2 border-b px-5 py-4 font-mono text-[11px] tracking-widest uppercase"
                style={{ borderColor: "rgba(255,255,255,0.22)" }}
              >
                <span style={{ color: "var(--vertex-text)" }}>Criterio</span>
                <span className="vertex-gradient font-semibold">Vertex</span>
                <span style={{ color: "#9a9a9a" }}>Discord</span>
                <span style={{ color: "#7a7a7a" }}>TeamSpeak</span>
              </div>
              {comparison.map((c) => (
                <div
                  key={c.row}
                  className="compare-row grid grid-cols-4 items-center gap-2 border-b px-5 py-4 text-sm last:border-b-0"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <span style={{ color: "var(--vertex-text)" }}>{c.row}</span>
                  <span className="flex items-center gap-2 font-medium text-white">
                    <Check className="h-4 w-4 shrink-0" style={{ color: "#ffffff" }} />
                    {c.vertex}
                  </span>
                  <span className="flex items-center gap-2" style={{ color: "var(--vertex-text)" }}>
                    <Minus className="h-3.5 w-3.5 shrink-0" style={{ color: "#9a9a9a" }} />
                    {c.discord}
                  </span>
                  <span className="flex items-center gap-2" style={{ color: "var(--vertex-text)" }}>
                    <Minus className="h-3.5 w-3.5 shrink-0" style={{ color: "#7a7a7a" }} />
                    {c.ts}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </GsapZoom>
      </section>


      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-28">
        <Reveal>
          <div
            className="border-travel relative overflow-hidden rounded-3xl p-10 text-center sm:p-14"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)), #0a0a0a",
            }}
          >
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Únete a la revolución de la comunicación.
            </h2>
            <p className="mt-4" style={{ color: "var(--vertex-text)" }}>
              Vertex está en desarrollo activo. Sé de los primeros en probarlo.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                className="vertex-btn rounded-full px-7 py-3 font-mono text-xs tracking-widest uppercase"
              >
                Próximamente
              </button>
              <a
                href="#caracteristicas"
                className="vertex-ring rounded-full px-7 py-3 font-mono text-xs tracking-widest uppercase"
              >
                Ver características
              </a>
            </div>

            <p className="mt-6 font-mono text-xs tracking-widest uppercase" style={{ color: "#ffffff" }}>
              🚀 Lanzamiento: 2026
            </p>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-border/60 px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
          <p className="text-sm text-muted-foreground">Hecho con ❤️ para la comunidad.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Gtnnn12"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-foreground/70 transition-colors hover:text-primary"
            >
              <GithubWave className="h-5 w-5" />
            </a>
            <a
              href="https://discord.com/users/elg1t4n0"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className="text-foreground/70 transition-colors hover:text-primary"
            >
              <DiscordWave className="h-5 w-5" />
            </a>
            <Link
              to="/"
              className="nav-link font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase"
            >
              Gtnn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
