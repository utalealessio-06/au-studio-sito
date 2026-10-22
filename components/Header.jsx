import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ColorModeToggle from "./ColorModeToggle";
import Logo from "./Logo";
import { FREE_SHIPPING_THRESHOLD, useCart } from "../lib/cart";
import { formatPrice } from "../lib/format";
import { useTheme } from "../lib/use-theme";

const NAV_LINKS = [
  { href: "/", label: "Home", isActive: (path) => path === "/" },
  {
    href: "/prodotti",
    label: "Prodotti",
    // Attivo anche sulle schede prodotto (/prodotto/...).
    isActive: (path) => path.startsWith("/prodott"),
  },
];

// Stile del menu scelto dal tema (theme.layout.navStyle).
const NAV_STYLE = {
  pill: {
    base: "rounded-btn px-4 py-2 text-sm font-medium",
    active: "bg-surface-alt text-fg",
    idle: "text-fg-muted hover:bg-surface-alt hover:text-fg",
  },
  underline: {
    base: "eyebrow px-4 py-2 underline-offset-[10px]",
    active: "text-fg underline decoration-1",
    idle: "text-fg-muted hover:text-fg",
  },
};

const iconButton =
  "inline-flex h-11 items-center justify-center gap-2 rounded-btn px-3 text-fg transition-colors hover:bg-surface-alt";

function CartIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 7h12l-1 12.1a2 2 0 0 1-2 1.9H9a2 2 0 0 1-2-1.9L6 7z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export default function Header() {
  const { pathname } = useRouter();
  const { layout } = useTheme();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const nav = NAV_STYLE[layout.navStyle] ?? NAV_STYLE.pill;

  const cartLabel = `Carrello, ${count} ${count === 1 ? "articolo" : "articoli"}`;

  return (
    <>
      <div className="bg-inverse text-inverse-fg">
        <p className="page-container eyebrow py-2.5 text-center">
          Spedizione gratuita sopra {formatPrice(FREE_SHIPPING_THRESHOLD, { decimals: false })}
          <span className="hidden sm:inline"> · Confezione regalo sempre inclusa</span>
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
        <div className="page-container flex h-16 items-center justify-between gap-6 lg:h-20">
          <Logo />

          <nav aria-label="Navigazione principale" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = link.isActive(pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`${nav.base} transition-colors ${active ? nav.active : nav.idle}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ColorModeToggle className={`${iconButton} w-11 px-0`} />

            <Link
              href="/cart"
              aria-label={cartLabel}
              aria-current={pathname === "/cart" ? "page" : undefined}
              className={`relative text-sm font-medium ${iconButton}`}
            >
              <CartIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Carrello</span>
              {count > 0 && (
                <span className="absolute right-0.5 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-semibold text-accent-fg sm:static">
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`${iconButton} w-11 px-0 md:hidden`}
            >
              <span className="sr-only">{menuOpen ? "Chiudi menu" : "Apri menu"}</span>
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" aria-label="Navigazione mobile" className="border-t border-line bg-bg md:hidden">
            <div className="page-container flex flex-col gap-1 py-3">
              {[...NAV_LINKS, { href: "/cart", label: "Carrello", isActive: (path) => path === "/cart" }].map(
                (link) => {
                  const active = link.isActive(pathname);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-btn px-3 py-3 text-base font-medium ${
                        active ? "bg-surface-alt text-fg" : "text-fg-muted hover:bg-surface-alt hover:text-fg"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                }
              )}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
