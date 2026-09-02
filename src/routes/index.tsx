import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Code2,
  Download,
  Puzzle,
  ShieldCheck,
  Sparkles,
  Terminal,
  GitBranch,
} from "lucide-react";


import { Navbar } from "@/components/site/Navbar";
import { Reveal, Stagger, Item } from "@/components/site/Reveal";
import { CursorGlow } from "@/components/site/CursorGlow";
import { Particles } from "@/components/site/Particles";
import { Typewriter } from "@/components/site/Typewriter";
import { GlitchTitle } from "@/components/site/GlitchTitle";
import { Loader } from "@/components/site/Loader";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { AmbientAura } from "@/components/site/AmbientAura";
import { MatrixCode } from "@/components/site/MatrixCode";
import { TerminalSim } from "@/components/site/TerminalSim";
import { CountUp } from "@/components/site/CountUp";
import { Float } from "@/components/site/Float";
import { GithubWave } from "@/components/site/GithubWave";
import { DiscordWave } from "@/components/site/DiscordWave";
import { DiscordProfile } from "@/components/site/DiscordProfile";
import { ContactTerminal } from "@/components/site/ContactTerminal";
import { AsciiRain } from "@/components/site/AsciiRain";
import { AsciiStream } from "@/components/site/AsciiStream";
import { HeroBirth, ParallaxLayer, GsapFloat, GsapStagger } from "@/components/site/gsap";

import { HalftoneWaves } from "@/components/site/HalftoneWaves";
import { ArrowLoopIcon, GearLoopIcon, TerminalLoopIcon } from "@/components/site/AnimatedIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gtnn — Desarrollador de Software & Creador de NexCord" },
      {
        name: "description",
        content:
          "Portafolio de Gtnn: desarrollador de software enfocado en seguridad, plugins y herramientas para comunidades digitales. Creador de NexCord.",
      },
      { property: "og:title", content: "Gtnn — Desarrollador de Software & Creador de NexCord" },
      {
        property: "og:description",
        content:
          "Apasionado por el software seguro y las comunidades digitales. Proyectos, stack y contacto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stack = [
  "TypeScript",
  "React",
  "Node.js",
  "Electron",
  "Python",
  "Rust",
  "Tailwind",
  "PostgreSQL",
];

const nexcordFeatures = [
  {
    icon: Puzzle,
    title: "Plugins",
    text: "Arquitectura modular: instala, activa y crea plugins sin romper el cliente.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad",
    text: "Código auditable, permisos explícitos y cero telemetría oculta.",
  },
  {
    icon: Sparkles,
    title: "Personalización",
    text: "Temas, atajos y ajustes finos para una experiencia realmente tuya.",
  },
  {
    icon: GitBranch,
    title: "Código abierto",
    text: "Todo el código es público: revísalo, contribuye o haz tu propio fork.",
  },
];


const projects = [
  {
    icon: Puzzle,
    title: "NexCord",
    text: "Mod de Discord con plugins avanzados y personalización total.",
    tags: ["TypeScript", "Plugins"],
  },
  {
    icon: Download,
    title: "NexCordInstaller",
    text: "Instalador oficial de NexCord: instala, actualiza y repara en un clic.",
    tags: ["Electron", "Instalador"],
  },
];

const socials = [
  { label: "GitHub", value: "Gtnnn12", href: "https://github.com/Gtnnn12" },
  { label: "Discord", value: "elg1t4n0", href: "https://discord.com/users/elg1t4n0" },
];


function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const [typed, setTyped] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gx = useSpring(mx, { stiffness: 60, damping: 20 });
  const gy = useSpring(my, { stiffness: 60, damping: 20 });
  const titleX = useTransform(gx, (v) => v * 0.02);
  const titleY = useTransform(gy, (v) => v * 0.02);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-20"
    >
      <ParallaxLayer speed={0.18} className="absolute inset-0">
        <Particles />
      </ParallaxLayer>

      <ParallaxLayer speed={0.4} className="absolute inset-0">
        <MatrixCode />
      </ParallaxLayer>

      <ParallaxLayer speed={0.6} className="pointer-events-none absolute inset-0">
        <div aria-hidden className="absolute top-24 left-[8%] h-32 w-32 rounded-full border border-white/5" />
        <div aria-hidden className="absolute right-[12%] bottom-24 h-52 w-52 rounded-full border border-white/5" />
      </ParallaxLayer>

      <motion.div
        aria-hidden
        style={{ x: gx, y: gy, opacity: fade }}
        className="pointer-events-none absolute top-1/3 left-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.2] blur-[170px]"
      >
        <div className="h-full w-full" style={{ background: "radial-gradient(circle, #6B2E1E 0%, #4A1A1A 45%, transparent 70%)" }} />
      </motion.div>

      <HeroBirth className="relative w-full">
      <motion.div
        style={{ y: parallaxFast, opacity: fade }}
        className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            className="font-mono text-xs tracking-[0.4em] text-primary uppercase"
          >
            Software Engineer
          </motion.p>

          <motion.h1
            style={{ x: titleX, y: titleY }}
            className="mt-6 max-w-4xl text-5xl leading-[1.02] font-semibold sm:text-7xl lg:text-7xl"
          >
            {typed ? (
              <GlitchTitle text="Hola, soy Gtnn" />
            ) : (
              <Typewriter text="Hola, soy Gtnn" startDelay={1700} onDone={() => setTyped(true)} />
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.1 }}
            className="mt-6 text-xl text-foreground/80 sm:text-2xl"
          >
            Desarrollador de software & creador de{" "}
            <span className="text-ember-flow font-semibold">Vertex</span> y{" "}
            <span className="text-ember-flow font-semibold">NexCord</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.35 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            Apasionado por el software libre, la seguridad y la optimización. Construyo
            herramientas abiertas que la gente realmente usa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 3.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#nexcord"
              className="group border-travel pulse-border inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              style={{ backgroundImage: "var(--gradient-ember)", boxShadow: "var(--shadow-card)" }}
            >
              Ver proyectos
              <ArrowLoopIcon />
            </a>
            <a
              href="https://github.com/Gtnnn12"
              target="_blank"
              rel="noreferrer"
              className="btn-fill border-travel group inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm text-foreground/80 transition-colors hover:border-transparent hover:text-primary-foreground"
            >
              <GithubWave className="h-4 w-4" />
              GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.9 }}
            className="mt-14 flex max-w-md items-center justify-between gap-6"
          >
            <CountUp to={1284} label="commits" delay={3900} />
            <div className="h-10 w-px bg-border/70" />
            <CountUp to={186} label="estrellas" delay={4100} />
            <div className="h-10 w-px bg-border/70" />
            <CountUp to={27} label="repos" delay={4300} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <TerminalSim />
        </motion.div>
      </motion.div>
      </HeroBirth>
    </section>
  );
}

function Index() {
  return (
    <div id="top" className="grain relative min-h-screen bg-background">
      <Loader />
      <AmbientAura />
      <AsciiRain />
      <AsciiStream />
      <HalftoneWaves />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <div className="relative z-10">
      <Hero />

      <hr className="divider-flow mx-auto max-w-6xl" />

      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="relative px-6 py-32">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="text-ember-flow text-4xl font-semibold sm:text-5xl">Sobre mí</h2>
            <p className="mt-4 flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
              <GearLoopIcon className="text-primary" />
              01 — Perfil
            </p>
          </Reveal>
          <Stagger className="space-y-6">
            <Item>
              <p className="text-lg leading-relaxed text-foreground/85">
                Programo porque me obsesiona entender cómo funcionan las cosas por dentro. Mi
                enfoque está en la seguridad y la calidad: código legible, auditable y pensado para
                durar más de un sprint.
              </p>
            </Item>
            <Item>
              <p className="leading-relaxed text-muted-foreground">
                Me interesa construir herramientas para la comunidad — software abierto que la gente
                pueda inspeccionar, extender y hacer suyo. Todo mi trabajo vive en{" "}
                <a
                  href="https://github.com/Gtnnn12"
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link text-primary"
                >
                  github.com/Gtnnn12
                </a>
                .
              </p>
            </Item>
            <Item>
              <ul className="flex flex-wrap gap-2 pt-2">
                {stack.map((t) => (
                  <li
                    key={t}
                    className="hairline rounded-full bg-surface px-4 py-1.5 font-mono text-xs text-foreground/70 transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Item>
          </Stagger>
        </div>
      </section>

      <hr className="divider-flow mx-auto max-w-6xl" />

      {/* NEXCORD */}
      <section id="nexcord" className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="pulse-border relative overflow-hidden rounded-3xl bg-surface p-8 sm:p-14">
              <MatrixCode count={12} />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full opacity-20 blur-[130px]"
                style={{ background: "var(--gradient-ember)" }}
                animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="relative font-mono text-xs tracking-[0.3em] text-primary uppercase">
                02 — Proyecto destacado
              </p>
              <h2 className="text-ember-flow relative mt-5 text-5xl font-semibold sm:text-6xl">
                NexCord
              </h2>
              <p className="relative mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Modificador de Discord con plugins avanzados, seguro y en constante evolución.
                Arquitectura modular, permisos explícitos y una experiencia de usuario cuidada al
                detalle.
              </p>

              <Stagger className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                {nexcordFeatures.map((f, i) => (
                  <Item key={f.title} className="h-full">
                    <Float index={i + 1} amplitude={7} className="h-full">
                      <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="card-glow hairline group h-full rounded-2xl bg-surface-2/60 p-6 hover:border-primary/40"
                      >
                        <motion.span
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                          className="inline-block"
                        >
                          <f.icon className="h-5 w-5 text-primary" />
                        </motion.span>
                        <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {f.text}
                        </p>
                      </motion.div>
                    </Float>
                  </Item>
                ))}
              </Stagger>


              <div className="relative mt-12 flex flex-wrap justify-center gap-4">
                <a
                  href="https://github.com/Gtnnn12/NexCordInstaller"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-fill border-travel inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground/80 transition-colors hover:border-transparent hover:text-primary-foreground"
                >
                  <TerminalLoopIcon /> Ver código en GitHub
                </a>
                <a
                  href="#nexcord"
                  className="btn-fill inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground/70 transition-colors hover:border-transparent hover:text-primary-foreground"
                >
                  Ver proyecto <ArrowLoopIcon />
                </a>
              </div>

              <motion.div
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative mt-6 inline-flex flex-wrap items-center gap-3 rounded-2xl border border-[oklch(0.6_0.15_150)]/35 bg-[oklch(0.6_0.15_150)]/8 px-5 py-3"
              >
                <ShieldCheck className="h-5 w-5 text-[oklch(0.75_0.16_150)]" />
                <span className="font-mono text-xs text-[oklch(0.82_0.1_150)]">
                  Verificado sin virus · Escaneado con 60+ motores antivirus
                </span>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="divider-flow mx-auto max-w-6xl" />

      {/* PERFIL DE DISCORD */}
      <section id="discord" className="relative px-6 py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
              03 — Discord
            </p>
            <h2 className="text-ember-flow mt-4 text-4xl font-semibold sm:text-5xl">
              Mi perfil
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
              Paso el día entre plugins, revisiones de código y la comunidad de NexCord. Si quieres
              hablar de un plugin o reportar algo, escríbeme por Discord.
            </p>
            <p className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-2.5 font-mono text-sm text-foreground/80">
              <DiscordWave className="h-4 w-4 text-primary" />
              elg1t4n0
            </p>
          </Reveal>
          <GsapFloat amplitude={12} duration={5} className="flex justify-center lg:justify-end">
            <DiscordProfile />
          </GsapFloat>
        </div>
      </section>


      {/* OTROS PROYECTOS */}
      <section id="proyectos" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
              04 — Otros proyectos
            </p>
            <h2 className="text-ember-flow mt-4 text-4xl font-semibold sm:text-5xl">
              Más de mi trabajo
            </h2>
          </Reveal>

          <GsapStagger className="mt-14 grid gap-6 sm:grid-cols-2">
            {projects.map((p, i) => (
              <Item key={p.title} className="h-full">
                <Float index={i} amplitude={9} className="h-full">
                  <motion.a
                    href="https://github.com/Gtnnn12"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="card-glow group block h-full rounded-2xl border border-border bg-surface/70 p-7 hover:border-primary/50"
                  >
                    <div className="flex items-start justify-between">
                      <motion.span
                        animate={{ scale: [1, 1.06, 1], rotate: [0, 4, 0] }}
                        transition={{
                          duration: 5 + i,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="inline-block"
                      >
                        <p.icon className="h-6 w-6 text-primary" />
                      </motion.span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-surface-2 px-3 py-1 font-mono text-[11px] text-foreground/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                </Float>
              </Item>
            ))}
          </GsapStagger>

        </div>
      </section>

      <hr className="divider-flow mx-auto max-w-6xl" />

      {/* CONTACTO */}
      <section id="contacto" className="relative overflow-hidden px-6 py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[680px] -translate-x-1/2 translate-y-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: "var(--gradient-ember)" }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
              05 — Contacto
            </p>
            <h2 className="mt-5 text-4xl font-semibold sm:text-6xl">Hablemos</h2>
            <p className="mt-5 text-muted-foreground">
              Conéctate conmigo en GitHub o Discord.
            </p>
          </Reveal>

          <Stagger className="mt-12 flex flex-wrap justify-center gap-4">
            {socials.map((s, i) => (
              <Item key={s.label}>
                <Float index={i} amplitude={6}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="card-glow shine hairline group flex items-center gap-3 rounded-full bg-surface px-6 py-3.5 text-foreground/75 transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary"
                  >
                    {s.label === "GitHub" ? (
                      <GithubWave className="h-5 w-5" />
                    ) : (
                      <DiscordWave className="h-5 w-5" />
                    )}
                    <span className="text-left">
                      <span className="block text-sm font-medium">{s.label}</span>
                      <span className="block font-mono text-[11px] text-muted-foreground">
                        {s.value}
                      </span>
                    </span>
                  </a>
                </Float>
              </Item>
            ))}
          </Stagger>


          <Reveal delay={0.1} className="mt-10">
            <ContactTerminal />
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-ember-flow mt-16 font-mono text-sm">
              Construyendo el futuro, un commit a la vez.
            </p>
          </Reveal>
        </div>
      </section>

      <hr className="divider-flow mx-auto max-w-6xl" />

      <footer className="px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <span className="font-mono">© {new Date().getFullYear()} Gtnn</span>
          <span className="font-mono">Apasionado por el software seguro</span>
        </div>
      </footer>
      </div>
    </div>
  );
}
