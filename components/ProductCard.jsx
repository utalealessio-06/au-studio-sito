import Link from "next/link";
import { useState } from "react";
import ProductImage from "./ProductImage";
import { addToCart } from "../lib/cart";
import { formatPrice } from "../lib/format";
import { productUrl } from "../lib/products";
import { useTheme } from "../lib/use-theme";

// Aspetto della card deciso da theme.card: misure e bordi arrivano dalle
// classi product-card*, le scelte di struttura dalle opzioni lette qui.
const ADD_BUTTON = {
  solid: { idle: "btn-primary btn-sm", added: "btn btn-sm border-success bg-success text-bg" },
  outline: { idle: "btn-secondary btn-sm", added: "btn btn-sm border-success text-success" },
  link: {
    idle: "eyebrow py-2 text-fg underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-fg-muted",
    added: "eyebrow py-2 text-success",
  },
};

export default function ProductCard({ product }) {
  const { card } = useTheme();
  const centered = card.align === "center";
  const [added, setAdded] = useState(false);
  const href = productUrl(product);
  const addButton = ADD_BUTTON[card.addButton] ?? ADD_BUTTON.solid;

  function handleAdd() {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className={`product-card group flex flex-col overflow-hidden ${card.surface ? "bg-surface" : ""}`}>
      {/* Link duplicato del titolo: nascosto a tastiera e screen reader. */}
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden">
        <ProductImage product={product} className="product-card-media card-zoom" />
        {product.badge && (
          <span className="eyebrow absolute left-3 top-3 rounded-badge bg-glass px-2.5 py-1 text-fg">
            {product.badge}
          </span>
        )}
      </Link>

      <div className={`product-card-body flex flex-1 flex-col ${centered ? "items-center text-center" : ""}`}>
        {card.showCategory && <p className="eyebrow text-fg-muted">{product.category}</p>}
        <h3 className={card.nameFont === "heading" ? "heading-3 mt-1.5 text-fg" : "mt-1.5 text-base font-medium leading-snug text-fg"}>
          <Link href={href} className="transition-colors hover:text-fg-muted">
            {product.name}
          </Link>
        </h3>
        {card.showDescription && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-muted">{product.shortDescription}</p>
        )}

        <div className={`mt-auto flex gap-3 pt-4 ${centered ? "flex-col items-center" : "items-end justify-between"}`}>
          <div className={`flex items-baseline gap-2 ${centered ? "justify-center" : ""}`}>
            <span className={`text-base font-medium ${product.compareAtPrice ? "text-sale" : "text-fg"}`}>
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-fg-subtle line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Aggiungi ${product.name} al carrello`}
            className={`inline-flex items-center gap-1.5 ${added ? addButton.added : addButton.idle}`}
          >
            {added ? (
              <>
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z" clipRule="evenodd" />
                </svg>
                Aggiunto
              </>
            ) : (
              "Aggiungi"
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
