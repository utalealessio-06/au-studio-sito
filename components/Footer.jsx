import { NAV_LINKS } from "./Header";
import { CITY, EMAIL, INSTAGRAM_URL, OWNER_NAME, STORE_NAME, whatsappUrl } from "../lib/store";

const linkClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-inverse-fg transition-colors hover:text-inverse-accent";

// Firma, link alle sezioni e contatti, poi il nome dello studio enorme.
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-inverse text-sm text-inverse-muted">
      <div className="page-container">
        <div className="grid gap-10 border-t border-inverse-fg/15 pt-10 sm:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="mb-3 font-heading text-[1.75rem] leading-tight text-inverse-fg">{STORE_NAME}</p>
            <p className="max-w-xs">Siti vetrina e negozi online per i negozi di {CITY}. Una persona sola, prezzi scritti.</p>
          </div>
          <div>
            <p className="eyebrow mb-4">Sezioni</p>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </a>
            ))}
          </div>
          <div>
            <p className="eyebrow mb-4">Contatti</p>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>
              WhatsApp
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Instagram
            </a>
            <a href={`mailto:${EMAIL}`} className={linkClass}>
              Email
            </a>
          </div>
          <p className="text-[0.7rem] uppercase tracking-[0.14em] sm:col-span-3">
            © {year} {STORE_NAME} di {OWNER_NAME} · {CITY}
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="flex justify-center overflow-hidden px-6 pb-8 pt-4">
        <span className="whitespace-nowrap font-heading text-[clamp(4rem,19vw,17rem)] leading-[1.05] tracking-[-0.02em] text-inverse-accent">
          {STORE_NAME}
        </span>
      </div>
    </footer>
  );
}
