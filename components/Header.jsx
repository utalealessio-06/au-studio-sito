import { useEffect, useRef, useState } from "react";
import ColorModeToggle from "./ColorModeToggle";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappUrl } from "../lib/store";

// Link alle sezioni della pagina (gli id sono in pages/index.jsx).
export const NAV_LINKS = [
  { href: "#prezzi", label: "Prezzi" },
  { href: "#lavori", label: "Lavori" },
  { href: "#come-lavoro", label: "Come lavoro" },
  { href: "#domande", label: "Domande" },
  { href: "#contatti", label: "Contatti" },
];

const iconButton =
  "inline-flex h-11 w-11 items-center justify-center rounded-btn text-inverse-fg transition-colors hover:bg-inverse-fg/10";

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
  const closeMenu = () => setMenuOpen(false);
  const activeSection = useActiveSection();
  const scrolled = useScrolled();
  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 text-inverse-fg transition-colors duration-300 ${
        solid ? "border-b border-inverse-fg/15 bg-inverse" : "border-b border-transparent"
      }`}
    >
      {scrolled && <ScrollProgress />}
      <div
        className={`page-container flex items-center justify-between gap-6 transition-[height] duration-200 ${
          scrolled ? "h-[4.75rem] lg:h-[5.25rem]" : "h-[4.75rem] lg:h-[6.25rem]"
        }`}
      >
        <Logo />

        <nav aria-label="Sezioni della pagina" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.href ? "true" : undefined}
              className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:text-inverse-accent ${
                activeSection === link.href ? "text-inverse-accent" : "text-inverse-fg/85"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ColorModeToggle className={iconButton} />

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-plain btn-sm ml-2 hidden sm:inline-flex"
          >
            <WhatsAppIcon />
            Scrivimi
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="ml-1 px-2 py-3 text-xs font-semibold uppercase tracking-[0.18em] lg:hidden"
          >
            {menuOpen ? "Chiudi" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Sezioni della pagina" className="border-t border-inverse-fg/15 bg-inverse lg:hidden">
          <div className="page-container flex flex-col pb-6 pt-2">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="flex items-baseline gap-4 border-b border-inverse-fg/15 py-4 font-heading text-3xl"
              >
                <span className="font-body text-[0.7rem] font-semibold tracking-[0.14em] text-inverse-accent">
                  {String(index + 3).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            ))}
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
              <WhatsAppIcon className="h-5 w-5" />
              Scrivimi su WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
