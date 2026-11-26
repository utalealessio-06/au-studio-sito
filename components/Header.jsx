import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappUrl } from "../lib/store";

// Link alle sezioni della pagina (gli id sono in pages/index.jsx).
// Il numero è quello della sezione ("03 · Prezzi").
export const NAV_LINKS = [
  { href: "#prezzi", label: "Prezzi", n: "03" },
  { href: "#come-funziona", label: "Come funziona", n: "04" },
  { href: "#lavori", label: "Lavori", n: "05" },
  { href: "#domande", label: "Domande", n: "06" },
  { href: "#contatti", label: "Contatti", n: "07" },
];

// Tre linee che diventano una X quando il menu è aperto.
function MenuIcon({ open }) {
  const line = "absolute left-0 h-px w-full bg-current transition-[translate,rotate,opacity] duration-200 ease-in-out motion-reduce:transition-none";
  return (
    <span aria-hidden="true" className="relative block h-3.5 w-6">
      <span className={`${line} top-0 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
      <span className={`${line} top-[7px] ${open ? "opacity-0" : ""}`} />
      <span className={`${line} top-[14px] ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
    </span>
  );
}

// Chiude il menu con Esc o toccando fuori. Con Esc si chiude di colpo:
// le azioni da tastiera non si animano mai (sembrerebbero lente).
function useCloseOnOutside(ref, open, close) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && close({ instant: true });
    const onPointer = (event) => {
      if (ref.current && !ref.current.contains(event.target)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [ref, open, close]);
}

// Sezione che occupa il centro dello schermo, per evidenziarla nel menu.
function useActiveSection() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_LINKS.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

// Vero appena si scorre un po': l'header passa da trasparente (sopra
// l'apertura scura) a fascia piena.
function useScrolled(offset = 40) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > offset);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [offset]);

  return scrolled;
}

// Barra sotto l'header: si riempie man mano che si scorre la pagina.
// Aggiorna lo stile direttamente (niente re-render a ogni scroll).
function ScrollProgress() {
  const bar = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // La scala iniziale è nello style e non in una classe: `scale-x-0` di
  // Tailwind usa la proprietà `scale`, che si moltiplica con `transform` e
  // terrebbe la barra sempre a zero.
  return <div ref={bar} aria-hidden="true" style={{ transform: "scaleX(0)" }} className="absolute inset-0 origin-left bg-accent" />;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const closeMenu = useCallback(({ instant: now = false } = {}) => {
    setInstant(now);
    setMenuOpen(false);
  }, []);
  const toggleMenu = () => {
    setInstant(false);
    setMenuOpen((open) => !open);
  };
  const menuRef = useRef(null);
  const activeSection = useActiveSection();
  const scrolled = useScrolled();
  useCloseOnOutside(menuRef, menuOpen, closeMenu);

  // Una capsula sospesa sopra la pagina: si fa più compatta appena si scorre.
  // L'<header> è una fascia piena nel colore del fondo, attaccata al bordo
  // in alto: Safari 26 (barra degli strumenti trasparente) riconosce gli
  // elementi fissi in alto con un colore pieno e ci tinge la sua barra;
  // senza, sfuma la parte alta della pagina e la capsula sembra tagliata.
  // Sotto la fascia una sfumatura breve evita lo stacco con la pagina.
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-bg px-3 pb-2 pt-3 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-6 after:bg-linear-to-b after:from-bg after:to-transparent sm:px-5 sm:pt-4">
      <div ref={menuRef} className="relative mx-auto max-w-[var(--sp-container)]">
        <div
          className={`relative flex items-center justify-between gap-4 rounded-full border border-line bg-bg/75 pl-5 pr-2 shadow-card backdrop-blur-xl transition-[height,background-color] duration-200 ease-out sm:pl-7 ${
            scrolled ? "h-14 bg-bg/90" : "h-16"
          }`}
        >
          {scrolled && (
            <span aria-hidden="true" className="absolute inset-x-8 bottom-0 h-px overflow-hidden">
              <ScrollProgress />
            </span>
          )}
          <Logo />

          <div className="flex items-center gap-1.5">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-plain btn-sm hidden sm:inline-flex"
            >
              <WhatsAppIcon />
              Scrivimi
            </a>

            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className="flex h-11 items-center gap-3 rounded-full px-4 text-sm font-medium text-fg transition-[background-color,scale] duration-150 ease-out hover:bg-surface active:scale-[0.97]"
            >
              <span className="sr-only sm:not-sr-only">{menuOpen ? "Chiudi" : "Menu"}</span>
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {/* Tendina: si apre dal bottone (in alto a destra), non dal centro.
            Entra in 200 ms, esce in 150 ms; con Esc sparisce subito. */}
        <nav
          id="site-menu"
          aria-label="Sezioni della pagina"
          inert={!menuOpen}
          className={`absolute right-0 top-[calc(100%+0.5rem)] w-full origin-top-right rounded-panel border border-line bg-surface p-2 shadow-pop ease-out motion-reduce:scale-100! motion-reduce:translate-y-0! sm:w-80 ${
            instant ? "duration-0" : menuOpen ? "duration-200" : "duration-150"
          } transition-[opacity,scale,translate] ${
            menuOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-[0.97] opacity-0"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => closeMenu()}
              aria-current={activeSection === link.href ? "true" : undefined}
              className={`flex items-center justify-between rounded-[calc(var(--r-panel)-0.5rem)] px-5 py-3.5 text-lg transition-colors duration-150 hover:bg-accent-soft ${
                activeSection === link.href ? "bg-accent-soft text-fg" : "text-fg-muted hover:text-fg"
              }`}
            >
              {link.label}
              <span className="text-xs tabular-nums text-fg-subtle">{link.n}</span>
            </a>
          ))}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => closeMenu()}
            className="btn-primary mt-2 w-full sm:hidden"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Scrivimi su WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
