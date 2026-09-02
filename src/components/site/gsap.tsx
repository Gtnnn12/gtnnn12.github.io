import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/** Zoom-out "nacimiento" de la página al cargar. */
export function HeroBirth({ children, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale: 1.22, opacity: 0, filter: "blur(14px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "expo.out" },
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

/** Capa con parallax vertical controlada por scroll. speed > 0 = más lenta (queda atrás). */
export function ParallaxLayer({
  children,
  className,
  speed = 0.3,
  fade = false,
}: Props & { speed?: number; fade?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * 100,
        ...(fade ? { opacity: 0 } : {}),
        ease: "none",
        scrollTrigger: {
          trigger: ref.current!.parentElement ?? ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [speed, fade]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/** El elemento "crece" desde el centro mientras haces scroll (scrub). */
export function ScrollExpand({
  children,
  className,
  from = 0.55,
  to = 1,
}: Props & { from?: number; to?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale: from, opacity: 0.35 },
        {
          scale: to,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current!,
            start: "top 90%",
            end: "top 30%",
            scrub: true,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [from, to]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}

/** Revelado con stagger de los hijos directos (o de los nodos que casen con `selector`). */
export function GsapStagger({
  children,
  className,
  selector = ":scope > *",
  y = 40,
  stagger = 0.12,
}: Props & { selector?: string; y?: number; stagger?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || reduced()) return;
    const ctx = gsap.context(() => {
      const targets = Array.from(ref.current!.querySelectorAll(selector));
      if (!targets.length) return;
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: ref.current!,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [selector, y, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Zoom-in suave al entrar en viewport (se revierte al subir). */
export function GsapZoom({ children, className, from = 0.86 }: Props & { from?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale: from, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current!,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [from]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}

/** Carrusel: el track se desplaza horizontalmente mientras la sección está fijada. */
export function HorizontalScroll({
  children,
  className,
  trackClassName,
}: Props & { trackClassName?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || !track.current || reduced()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const el = track.current!;
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 96);
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: ref.current!,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(el, { x: 0 });
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      <div
        ref={track}
        className={trackClassName}
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
}

/** Flotado perpetuo con GSAP (sin ScrollTrigger). */
export function GsapFloat({
  children,
  className,
  amplitude = 10,
  duration = 4,
  delay = 0,
}: Props & { amplitude?: number; duration?: number; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || reduced()) return;
    const tween = gsap.to(ref.current, {
      y: -amplitude,
      rotate: amplitude * 0.06,
      duration,
      delay,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, [amplitude, duration, delay]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
