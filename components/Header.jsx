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

  return <div ref={bar} aria-hidden="true" className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-inverse-accent" />;
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
  const solid = scrolled || menuOpen;
  useCloseOnOutside(menuRef, menuOpen, closeMenu);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 text-inverse-fg transition-[background-color,border-color] duration-200 ${
        solid ? "border-b border-inverse-fg/15 bg-inverse" : "border-b border-transparent"
      }`}
    >
      {scrolled && <ScrollProgress />}
      <div
        className={`page-container flex items-center justify-between gap-6 transition-[height] duration-200 ease-out ${
          scrolled ? "h-[4.75rem] lg:h-[5.25rem]" : "h-[4.75rem] lg:h-[6.25rem]"
        }`}
      >
        <Logo />

        <div ref={menuRef} className="relative flex items-center gap-3 sm:gap-5">
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
            className="flex items-center gap-3 py-3 pl-2 text-xs font-semibold uppercase tracking-[0.18em] transition-[color,scale] duration-150 hover:text-inverse-accent active:scale-[0.97]"
          >
            <span className="sr-only sm:not-sr-only">{menuOpen ? "Chiudi" : "Menu"}</span>
            <MenuIcon open={menuOpen} />
          </button>

          {/* Tendina: si apre dal bottone (angolo in alto a destra), non dal
              centro. Entra in 200 ms, esce più in fretta (150 ms).
              A tutta larghezza da telefono, un pannello a destra da computer. */}
          <nav
            id="site-menu"
            aria-label="Sezioni della pagina"
            inert={!menuOpen}
            className={`fixed inset-x-0 top-[4.75rem] origin-top border-y border-inverse-fg/15 bg-inverse ease-out motion-reduce:scale-100! motion-reduce:translate-y-0! sm:absolute sm:inset-x-auto sm:right-0 sm:top-[calc(100%+0.75rem)] sm:w-80 sm:origin-top-right sm:border sm:shadow-pop ${
              instant ? "duration-0" : menuOpen ? "duration-200" : "duration-150"
            } transition-[opacity,scale,translate] ${
              menuOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-[0.97] opacity-0"
            }`}
          >
            <div className="page-container flex flex-col pb-6 pt-2 sm:px-6!">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => closeMenu()}
                  aria-current={activeSection === link.href ? "true" : undefined}
                  className={`flex items-baseline gap-4 border-b border-inverse-fg/15 py-4 font-heading text-3xl transition-colors duration-150 hover:text-inverse-accent ${
                    activeSection === link.href ? "italic text-inverse-accent" : ""
                  }`}
                >
                  <span className="font-body text-[0.7rem] font-semibold not-italic tabular-nums tracking-[0.14em] text-inverse-accent">
                    {link.n}
                  </span>
                  {link.label}
                </a>
              ))}
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => closeMenu()}
                className="btn-primary mt-6 w-full sm:hidden"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Scrivimi su WhatsApp
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
