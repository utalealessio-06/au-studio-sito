import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import ProductGrid from "../../../components/ProductGrid";
import ProductImage from "../../../components/ProductImage";
import QuantitySelector from "../../../components/QuantitySelector";
import WhatsAppIcon from "../../../components/WhatsAppIcon";
import { FREE_SHIPPING_THRESHOLD, MAX_QUANTITY, addToCart } from "../../../lib/cart";
import { formatPrice } from "../../../lib/format";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "../../../lib/products";
import { productQuestionMessage, whatsappUrl } from "../../../lib/store";

const SERVICES = [
  {
    title: "Spedizione in 24/48h",
    text: `Gratuita per ordini sopra ${formatPrice(FREE_SHIPPING_THRESHOLD, { decimals: false })}.`,
    icon: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
  },
  {
    title: "Confezione regalo inclusa",
    text: "Con biglietto personalizzato.",
    icon: <path d="M4 9h16v11H4zM3 9h18M12 9v11M12 9c-1.5-3-5-3.5-5-1.2C7 9 9 9 12 9zm0 0c1.5-3 5-3.5 5-1.2C17 9 15 9 12 9z" />,
  },
  {
    title: "Reso gratuito in 30 giorni",
    text: "Nessuna domanda, rimborso completo.",
    icon: <path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4" />,
  },
];

export async function getStaticPaths() {
  return {
    paths: getAllProducts().map((product) => ({ params: { slug: product.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { notFound: true };

  return {
    props: {
      product,
      related: getRelatedProducts(product, 4),
    },
  };
}

function ProductDetail({ product, related }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const maxQuantity = Math.min(product.stock, MAX_QUANTITY);
  const lowStock = product.stock <= 5;

  function handleQuantityChange(value) {
    setQuantity(value);
    setAdded(false);
  }

  function handleAdd() {
    addToCart(product, quantity);
    setAdded(true);
  }

  return (
    <>
      <Head>
        <title>{`${product.name} | Regalo Artigianato`}</title>
        <meta name="description" content={product.shortDescription} />
      </Head>

      <div className="page-container py-section-tight">
        <Breadcrumb
          items={[
            { href: "/", label: "Home" },
            { href: "/prodotti", label: "Prodotti" },
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-grid">
          <div className="relative">
            <ProductImage
              product={product}
              className="product-card-media w-full rounded-media shadow-card"
              iconClassName="h-32 w-32 sm:h-44 sm:w-44"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            {product.badge && (
              <span className="eyebrow absolute left-5 top-5 rounded-badge bg-glass px-3 py-1.5 text-fg">
                {product.badge}
              </span>
            )}
          </div>

          <div className="lg:py-4">
            <p className="eyebrow text-accent">
              {product.category} · {product.origin}
            </p>
            <h1 className="heading-1 mt-4 text-fg">
              {product.name}
            </h1>

            <div className="mt-5 flex items-baseline gap-3">
              <p className={`text-3xl font-medium ${product.compareAtPrice ? "text-sale" : "text-fg"}`}>{formatPrice(product.price)}</p>
              {product.compareAtPrice && (
                <>
                  <p className="text-lg text-fg-subtle line-through">{formatPrice(product.compareAtPrice)}</p>
                  <span className="rounded-badge bg-accent-soft px-2.5 py-1 text-xs font-semibold text-sale">
                    -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-fg-muted">IVA inclusa</p>

            <p className="mt-6 text-lg leading-relaxed text-fg-muted">{product.shortDescription}</p>

            <div className="mt-8 border-t border-line pt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <QuantitySelector value={quantity} max={maxQuantity} onChange={handleQuantityChange} />
                <button type="button" onClick={handleAdd} className="btn-primary flex-1">
                  Aggiungi al carrello · {formatPrice(product.price * quantity)}
                </button>
              </div>

              <a
                href={whatsappUrl(productQuestionMessage(product))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary mt-3 w-full"
              >
                <WhatsAppIcon />
                Chiedi informazioni su WhatsApp
              </a>

              <p className={`mt-4 flex items-center gap-2 text-sm ${lowStock ? "text-sale" : "text-success"}`}>
                <span className={`h-2 w-2 rounded-full ${lowStock ? "bg-sale" : "bg-success"}`} />
                {lowStock ? `Disponibile · ultimi ${product.stock} pezzi` : "Disponibile · spedito entro 24 ore"}
              </p>

              <div role="status" aria-live="polite">
                {added && (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-panel bg-success-soft px-4 py-3 text-sm text-success ring-1 ring-success/30">
                    <span className="font-medium">
                      {quantity === 1 ? "Aggiunto" : `${quantity} pezzi aggiunti`} al carrello.
                    </span>
                    <Link href="/cart" className="font-semibold underline underline-offset-4 hover:opacity-80">
                      Vai al carrello
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <ul className="mt-8 grid gap-4 rounded-panel bg-surface-alt p-5 ring-1 ring-line sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {SERVICES.map((service) => (
                <li key={service.title} className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true">
                    {service.icon}
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-fg">{service.title}</p>
                    <p className="text-xs text-fg-muted">{service.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-8">
              <section>
                <h2 className="eyebrow text-fg">Descrizione</h2>
                <p className="mt-3 leading-relaxed text-fg-muted">{product.description}</p>
              </section>
              <section>
                <h2 className="eyebrow text-fg">Dettagli</h2>
                <ul className="mt-3 space-y-2">
                  {product.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-fg-muted">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {detail}
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-fg-muted">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    Realizzato a mano in {product.origin}
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-surface-alt py-section">
          <div className="page-container">
            <h2 className="heading-2 text-fg">
              Potrebbe piacerti anche
            </h2>
            <ProductGrid products={related} className="mt-10" />
          </div>
        </section>
      )}
    </>
  );
}

// La `key` azzera quantità e messaggi quando si passa da un prodotto all'altro
// (Next riusa la stessa istanza di pagina per le route dinamiche).
export default function ProductPage(props) {
  return <ProductDetail key={props.product.slug} {...props} />;
}
