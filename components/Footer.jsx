import Link from "next/link";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import { FREE_SHIPPING_THRESHOLD } from "../lib/cart";
import { formatPrice } from "../lib/format";
import { CATEGORIES } from "../lib/products";
import { CONTACT_MESSAGE, whatsappUrl } from "../lib/store";

const SHOP_LINKS = [
  { href: "/", label: "Home" },
  { href: "/prodotti", label: "Tutti i prodotti" },
  { href: "/cart", label: "Carrello" },
];

const SERVICES = [
  `Spedizione gratuita sopra ${formatPrice(FREE_SHIPPING_THRESHOLD, { decimals: false })}`,
  "Consegna tracciata in 24/48 ore",
  "Reso gratuito entro 30 giorni",
  "Confezione regalo sempre inclusa",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-inverse text-inverse-muted">
      <div className="page-container grid gap-12 py-section-tight sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Selezioniamo oggetti realizzati a mano dai laboratori artigiani di tutta
            Italia, pronti da regalare a chi ami o ai tuoi clienti.
          </p>
          <a
            href={whatsappUrl(CONTACT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-inverse-fg underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            <WhatsAppIcon />
            Scrivici su WhatsApp
          </a>
        </div>

        <div className="lg:col-span-2">
          <h2 className="eyebrow text-inverse-fg">Negozio</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {SHOP_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-inverse-fg">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="eyebrow text-inverse-fg">Categorie</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm lg:grid-cols-1">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  href={{ pathname: "/prodotti", query: { categoria: category.slug } }}
                  className="transition-colors hover:text-inverse-fg"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="eyebrow text-inverse-fg">Servizi</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {SERVICES.map((service) => (
              <li key={service} className="flex items-start gap-2">
                <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-inverse-fg" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z" clipRule="evenodd" />
                </svg>
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-inverse-fg/10">
        <div className="page-container flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Regalo Artigianato. Tutti i diritti riservati.</p>
          <p>Prezzi IVA inclusa · Ordini anche su WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}
