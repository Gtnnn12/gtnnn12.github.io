import { useEffect, useRef, useState } from "react";
import { HeroBirth, ParallaxLayer, ScrollExpand, GsapStagger } from "@/components/site/gsap";
import { gsap } from "gsap";

export const accents = [
  { id: "mono", name: "Mono", tag: "PURE", color: "#ffffff" },
  { id: "indigo", name: "Indigo", tag: "SIGNAL", color: "#6366f1" },
  { id: "blue", name: "Blue", tag: "DEEP", color: "#3b82f6" },
  { id: "emerald", name: "Emerald", tag: "CALM", color: "#10b981" },
  { id: "crimson", name: "Crimson", tag: "EMBER", color: "#ef4444" },
  { id: "violet", name: "Violet", tag: "QUIET", color: "#a855f7" },
] as const;

/** Sección de la izquierda que se desliza al entrar en viewport. */
function SlideIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current!, start: "top 85%", toggleActions: "play none none reverse" },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}

export function VertexIntro({
  accent,
  onAccent,
}: {
  accent: string;
  onAccent: (color: string) => void;
}) {
  return (
    <>
      {/* HERO */}
      <section
        id="vertex"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
      >
        <ParallaxLayer speed={0.14} className="absolute inset-0 z-0">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 15% 10%, #1a1a1a, transparent 60%), radial-gradient(ellipse at 85% 90%, #1a1a1a, transparent 60%)",
            }}
          />
        </ParallaxLayer>

        <ParallaxLayer speed={-0.08} fade className="relative z-10 w-full">
          <HeroBirth className="mx-auto flex w-full max-w-4xl flex-col items-center py-28 text-center">
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.4em] text-[#808080] uppercase">
              <span
                className="grid h-6 w-6 place-items-center rounded-md text-[11px] font-semibold text-black"
                style={{ background: accent }}
              >
                V
              </span>
              Vertex
              <span className="hidden h-px w-40 bg-white/15 sm:block" />
              <span>v0.1.0</span>
            </div>

            <h1 className="mt-8 text-6xl font-bold text-white md:text-8xl">
              Vertex<span style={{ color: accent }}>.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-xl text-[#d0d0d0] md:text-2xl">
              Tu espacio. Tu identidad. Tu interfaz.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-[#b0b0b0]">
              {["v0.1.0", "Autohospedado", "Open-source", "Federado"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-4 py-1.5 font-mono text-xs tracking-widest uppercase transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.16)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)")}
                >
                  {t}
                </span>
              ))}
            </div>
          </HeroBirth>
        </ParallaxLayer>
      </section>

      {/* TÍTULO QUE SE EXPANDE */}
      <section className="relative z-10 py-20">
        <ScrollExpand from={0.6} to={1.4} className="text-center">
          <h2 className="text-5xl font-bold text-white sm:text-6xl">
            Vertex<span style={{ color: accent }}>.</span>
          </h2>
        </ScrollExpand>
      </section>

      {/* APARIENCIA / COLORES */}
      <section id="vertex-colors" className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
          <SlideIn>
            <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.4em] uppercase">
              <span style={{ color: accent }}>01</span>
              <span className="h-px w-10 bg-white/20" />
              <span className="text-[#808080]">Apariencia</span>
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">Colores</h2>
            <p className="mt-4 max-w-xl text-[#b0b0b0]">
              Personaliza la identidad visual de VERTEX: el acento actúa como una única capa de
              color sobre una base monocroma.
            </p>

            <GsapStagger
              selector="button"
              y={26}
              stagger={0.07}
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {accents.map((a) => {
                const active = a.color === accent;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => onAccent(a.color)}
                    className="group rounded-xl border p-4 text-left transition-all duration-300 hover:-translate-y-1"
                    style={{
                      borderColor: active ? a.color : "rgba(255,255,255,0.1)",
                      background: active
                        ? `linear-gradient(135deg, color-mix(in oklab, ${a.color} 14%, transparent), rgba(255,255,255,0.02))`
                        : "rgba(255,255,255,0.02)",
                      boxShadow: active ? `0 18px 50px -24px ${a.color}` : "none",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="grid h-6 w-6 place-items-center rounded-md text-[11px] font-semibold text-black"
                        style={{ background: a.color }}
                      >
                        V
                      </span>
                      <span className="h-1.5 flex-1 rounded-full bg-white/12" />
                      <span className="h-5 w-5 rounded-md" style={{ background: a.color }} />
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{a.name}</p>
                        <p className="font-mono text-[10px] tracking-[0.28em] text-[#808080] uppercase">
                          {a.tag}
                        </p>
                      </div>
                      <span
                        className="grid h-5 w-5 place-items-center rounded-full border text-[10px] text-black"
                        style={{
                          borderColor: active ? a.color : "rgba(255,255,255,0.22)",
                          background: active ? a.color : "transparent",
                        }}
                      >
                        {active ? "✓" : ""}
                      </span>
                    </div>
                  </button>
                );
              })}
            </GsapStagger>

            <p className="mt-8 border-l-2 pl-4 text-sm text-[#808080] italic" style={{ borderColor: accent }}>
              La base de la interfaz permanece en blanco, negro y grises. El color es una capa
              encima, nunca al revés.
            </p>
          </SlideIn>

          <SlideIn>
            <p className="font-mono text-[11px] tracking-[0.4em] text-[#808080] uppercase">
              Tema actual
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <div className="flex items-center justify-between border-b border-white/8 px-3 py-2">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/25" />
                  <span className="h-2 w-2 rounded-full bg-white/25" />
                  <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                </div>
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#808080] uppercase">
                  Vertex
                </span>
              </div>
              <div className="flex gap-3 p-3">
                <div className="flex flex-col gap-2">
                  <span
                    className="grid h-6 w-6 place-items-center rounded-md text-[10px] font-semibold text-black"
                    style={{ background: accent }}
                  >
                    V
                  </span>
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                </div>
                <div className="flex-1 space-y-2">
                  <div
                    className="h-5 rounded-md border"
                    style={{
                      borderColor: `color-mix(in oklab, ${accent} 55%, transparent)`,
                      background: `color-mix(in oklab, ${accent} 12%, transparent)`,
                    }}
                  />
                  <div className="h-4 rounded-md bg-white/6" />
                  <div className="h-4 rounded-md bg-white/6" />
                  <div className="h-4 w-2/3 rounded-md bg-white/6" />
                  <div
                    className="h-5 rounded-md"
                    style={{ background: `color-mix(in oklab, ${accent} 35%, transparent)` }}
                  />
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-[#808080]">
              Tu acento se propaga por toda la interfaz: botones, enlaces, estados activos y
              resplandores.
            </p>
          </SlideIn>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/8 pt-6 text-sm text-[#808080] sm:flex-row sm:items-center sm:justify-between">
          <p>Más personalización — superficies, spaces y temas completos — llegará próximamente.</p>
          <p className="font-mono text-xs">v0.1.0 — © 2026 Vertex</p>
        </div>
      </section>
    </>
  );
}

export function useAccent() {
  const [accent, setAccent] = useState<string>(accents[0].color);
  return { accent, setAccent };
}
