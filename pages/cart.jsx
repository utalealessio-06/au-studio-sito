import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import ProductImage from "../components/ProductImage";
import QuantitySelector from "../components/QuantitySelector";
import WhatsAppIcon from "../components/WhatsAppIcon";
import {
  FREE_SHIPPING_THRESHOLD,
  clearCart,
  removeFromCart,
  updateQuantity,
  useCart,
  useHydrated,
} from "../lib/cart";
import { formatPrice } from "../lib/format";
import { productUrl } from "../lib/products";
import { orderMessage, whatsappUrl } from "../lib/store";

const fieldClass =
  "mt-1.5 w-full rounded-input bg-surface px-3 py-2.5 text-sm text-fg ring-1 ring-inset ring-line-strong placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-focus";

function CartLine({ item }) {
  const href = productUrl(item);

  return (
    <li className="flex gap-4 p-4 sm:gap-6 sm:p-6">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="shrink-0 overflow-hidden rounded-media">
        <ProductImage product={item} className="h-24 w-24 sm:h-28 sm:w-28" iconClassName="h-10 w-10" sizes="112px" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="eyebrow text-fg-muted">{item.category}</p>
            <h3 className="mt-1 font-medium text-fg">
              <Link href={href} className="transition-colors hover:text-fg-muted">
                {item.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-fg-muted">{formatPrice(item.price)} cad.</p>
          </div>
          <p className="shrink-0 font-medium text-fg">{formatPrice(item.price * item.qty)}</p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-4">
          <QuantitySelector
            size="sm"
            value={item.qty}
            max={item.maxQty}
            onChange={(qty) => updateQuantity(item.slug, qty)}
            label={`Quantità di ${item.name}`}
          />
          <button
            type="button"
            onClick={() => removeFromCart(item.slug)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-danger"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
            </svg>
            Rimuovi
            <span className="sr-only"> {item.name}</span>
          </button>
        </div>
      </div>
    </li>
  );
}

function CartSkeleton() {
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-12" aria-hidden="true">
      <div className="space-y-4 lg:col-span-8">
        {[0, 1].map((key) => (
          <div key={key} className="flex gap-6 rounded-panel p-6 ring-1 ring-line">
            <div className="h-28 w-28 animate-pulse rounded-media bg-surface-alt" />
            <div className="flex-1 space-y-3 py-2">
              <div className="h-3 w-24 animate-pulse rounded-badge bg-surface-alt" />
              <div className="h-4 w-2/3 animate-pulse rounded-badge bg-surface-alt" />
              <div className="h-3 w-20 animate-pulse rounded-badge bg-surface-alt" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-panel bg-surface-alt lg:col-span-4" />
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="mt-10 rounded-panel bg-surface-alt px-6 py-20 text-center ring-1 ring-line">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-badge bg-surface text-fg shadow-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
          <path d="M6 7h12l-1 12.1a2 2 0 0 1-2 1.9H9a2 2 0 0 1-2-1.9L6 7z" />
          <path d="M9 10V6a3 3 0 0 1 6 0v4" />
        </svg>
      </span>
      <h2 className="heading-2 mt-6 text-fg">Il tuo carrello è vuoto</h2>
      <p className="mx-auto mt-3 max-w-md text-fg-muted">
        Scopri le nostre idee regalo fatte a mano e aggiungi i tuoi preferiti.
      </p>
      <Link href="/prodotti" className="btn-primary mt-8">
        Vai ai prodotti
      </Link>
    </div>
  );
}

export default function CartPage() {
  const hydrated = useHydrated();
  const { items, count, subtotal, shipping, total } = useCart();
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  function handleClear() {
    if (window.confirm("Vuoi davvero svuotare il carrello?")) clearCart();
  }

  return (
    <>
      <Head>
        <title>Carrello | Regalo Artigianato</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="page-container py-section-tight">
        <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Carrello" }]} />
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h1 className="heading-1 text-fg">
            Il tuo carrello
          </h1>
          {hydrated && count > 0 && (
            <p className="text-sm text-fg-muted">
              {count} {count === 1 ? "articolo" : "articoli"}
            </p>
          )}
        </div>

        {!hydrated ? (
          <CartSkeleton />
        ) : items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
            <section aria-labelledby="cart-items-title" className="lg:col-span-8">
              <h2 id="cart-items-title" className="sr-only">
                Articoli nel carrello
              </h2>
              <ul className="divide-y divide-line rounded-panel bg-surface ring-1 ring-line">
                {items.map((item) => (
                  <CartLine key={item.slug} item={item} />
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between gap-4">
                <Link href="/prodotti" className="text-sm font-medium text-fg transition-colors hover:text-fg-muted">
                  <span aria-hidden="true">←</span> Continua lo shopping
                </Link>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-sm font-medium text-fg-muted transition-colors hover:text-danger"
                >
                  Svuota carrello
                </button>
              </div>
            </section>

            <aside
              aria-labelledby="cart-summary-title"
              className="rounded-panel bg-surface-alt p-6 ring-1 ring-line sm:p-8 lg:sticky lg:top-28 lg:col-span-4"
            >
              <h2 id="cart-summary-title" className="heading-3 text-fg">
                Riepilogo ordine
              </h2>

              <div className="mt-5 rounded-panel bg-surface p-4 ring-1 ring-line">
                <p className="text-sm text-fg-muted">
                  {missingForFreeShipping > 0 ? (
                    <>
                      Aggiungi <strong className="font-semibold text-fg">{formatPrice(missingForFreeShipping)}</strong> per la spedizione gratuita.
                    </>
                  ) : (
                    <strong className="font-semibold text-success">Spedizione gratuita sbloccata!</strong>
                  )}
                </p>
                <div
                  className="mt-3 h-1.5 overflow-hidden rounded-full bg-line"
                  role="progressbar"
                  aria-label="Avanzamento verso la spedizione gratuita"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(shippingProgress)}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${missingForFreeShipping > 0 ? "bg-accent" : "bg-success"}`}
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-fg-muted">Subtotale</dt>
                  <dd className="font-medium text-fg">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-fg-muted">Spedizione</dt>
                  <dd className="font-medium text-fg">{shipping === 0 ? "Gratuita" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-fg-muted">Confezione regalo</dt>
                  <dd className="font-medium text-fg">Inclusa</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-line pt-4">
                  <dt className="text-base font-medium text-fg">Totale</dt>
                  <dd className="text-xl font-medium text-fg">{formatPrice(total)}</dd>
                </div>
              </dl>
              <p className="mt-1 text-right text-xs text-fg-muted">IVA inclusa</p>

              <div className="mt-6 space-y-4">
                <label className="block text-sm text-fg-muted">
                  Nome (facoltativo)
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    className={fieldClass}
                  />
                </label>
                <label className="block text-sm text-fg-muted">
                  Note (es. dedica per il biglietto)
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={2}
                    className={`${fieldClass} resize-none`}
                  />
                </label>
              </div>

              <a
                href={whatsappUrl(orderMessage(items, { subtotal, shipping, total }, { name, notes }))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 w-full"
              >
                <WhatsAppIcon />
                Invia l’ordine su WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-fg-muted">
                Ti rispondiamo per confermare disponibilità e pagamento.
              </p>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
