import { NAV_LINKS } from "./Header";
import { CITY, EMAIL, INSTAGRAM_URL, OWNER_NAME, STORE_NAME, whatsappUrl } from "../lib/store";

const linkClass = "block py-1 text-fg-muted transition-colors duration-150 hover:text-fg";

// Una card con firma, sezioni e contatti, poi il nome dello studio enorme
// e appena visibile, come inciso nel fondo.
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-3 pb-3 text-sm sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-[var(--sp-container)] overflow-hidden rounded-panel border border-line bg-surface">
        <div className="grid gap-10 p-8 sm:grid-cols-[2fr_1fr_1fr] sm:p-12">
          <div>
            <p className="heading text-2xl text-fg">{STORE_NAME}</p>
            <p className="mt-3 max-w-xs text-fg-muted">
              Siti vetrina e negozi online per i negozi di {CITY}. Una persona sola, prezzi scritti.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3 text-fg-subtle">Sezioni</p>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </a>
            ))}
          </div>
          <div>
            <p className="eyebrow mb-3 text-fg-subtle">Contatti</p>
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
        </div>

        <div aria-hidden="true" className="flex justify-center overflow-hidden px-6">
          <span className="heading translate-y-[0.18em] whitespace-nowrap text-[clamp(4rem,17vw,15rem)] leading-none text-accent-soft">
            {STORE_NAME}
          </span>
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-[var(--sp-container)] px-4 text-xs text-fg-subtle">
        © {year} {STORE_NAME} di {OWNER_NAME} · {CITY}
      </p>
    </footer>
  );
}
