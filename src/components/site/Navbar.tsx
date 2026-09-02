import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { GithubWave } from "@/components/site/GithubWave";

type NavLink = { to: string; hash?: string; label: string; accent: "ember" | "vertex" };

const links: NavLink[] = [
  { to: "/", hash: "top", label: "Inicio", accent: "ember" },
  { to: "/vertex", label: "Vertex", accent: "vertex" },
  { to: "/", hash: "nexcord", label: "Proyectos", accent: "ember" },
  { to: "/plugins", label: "Plugins", accent: "ember" },
  { to: "/", hash: "discord", label: "Discord", accent: "ember" },
  { to: "/", hash: "contacto", label: "Contacto", accent: "ember" },
];

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (l: NavLink) => (l.to === "/" ? pathname === "/" && l.hash === "top" : pathname === l.to);

  const linkClass = (l: NavLink) =>
    [
      "nav-item relative font-semibold text-sm text-foreground/90 transition-colors duration-300",
      l.accent === "vertex" ? "nav-item-vertex" : "nav-item-ember",
      isActive(l) ? "is-active" : "",
    ].join(" ");

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid || open
          ? "border-b border-border/60 bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          hash="top"
          className="nav-item nav-item-ember font-mono text-sm font-semibold tracking-[0.35em] text-foreground uppercase"
        >
          <span className="heartbeat">
            <span className="breathe">Gtnn</span>
          </span>
          <motion.span
            className="text-primary"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            .
          </motion.span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex lg:gap-12">
          {links.map((l) => (
            <li key={l.label}>
              <Link to={l.to} {...(l.hash ? { hash: l.hash } : {})} className={linkClass(l)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Gtnnn12"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden text-foreground/70 transition-colors hover:text-primary sm:block"
          >
            <GithubWave className="h-[18px] w-[18px]" />
          </a>
          <a
            href="https://github.com/Gtnnn12"
            target="_blank"
            rel="noreferrer"
            className="btn-fill pulse-border hidden rounded-full px-4 py-1.5 font-mono text-xs font-semibold tracking-widest text-primary uppercase transition-colors hover:text-primary-foreground sm:inline-block"
          >
            Contratar
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="text-foreground transition-colors hover:text-primary md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background/90 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    {...(l.hash ? { hash: l.hash } : {})}
                    onClick={() => setOpen(false)}
                    className={`${linkClass(l)} block py-2`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
