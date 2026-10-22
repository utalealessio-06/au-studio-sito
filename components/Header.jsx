import { useState } from "react";
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
  "inline-flex h-11 w-11 items-center justify-center rounded-btn text-fg transition-colors hover:bg-surface-alt";

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="page-container flex h-16 items-center justify-between gap-6 lg:h-20">
        <Logo />

        <nav aria-label="Sezioni della pagina" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
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
            className="btn-primary btn-sm ml-2 hidden sm:inline-flex"
          >
            <WhatsAppIcon />
            Scrivimi
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`${iconButton} lg:hidden`}
          >
            <span className="sr-only">{menuOpen ? "Chiudi menu" : "Apri menu"}</span>
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Sezioni della pagina" className="border-t border-line bg-bg lg:hidden">
          <div className="page-container flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="border-b border-line py-4 text-base text-fg last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
