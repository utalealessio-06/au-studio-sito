import Image from "next/image";
import { useTheme } from "../lib/use-theme";

// Illustrazioni segnaposto per i prodotti mock. Quando un prodotto ha un campo
// `image` (es. URL dello Storage Supabase) viene mostrata la foto reale.
const ICONS = {
  candle: (
    <>
      <path d="M8.5 10h7v10a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V10z" />
      <path d="M12 10V8" />
      <path d="M12 2.8c1.3 1.5 1.9 2.6 1.9 3.4a1.9 1.9 0 0 1-3.8 0c0-.8.6-1.9 1.9-3.4z" />
    </>
  ),
  cup: (
    <>
      <path d="M4.5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9z" />
      <path d="M15.5 10.5h1.5a2.5 2.5 0 0 1 0 5h-1.5" />
      <path d="M8 3.5v2.5M11 3.5v2.5M14 3.5v2.5" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 10h18" />
      <path d="M15.5 14.5h2.5" />
    </>
  ),
  board: (
    <>
      <rect x="3.5" y="6.5" width="13" height="13" rx="3" />
      <path d="M16.5 11.5h2.5a1.5 1.5 0 0 1 0 3h-2.5" />
      <path d="M7.5 10.5v5M10 9.5v7M12.5 10.5v5" />
    </>
  ),
  scarf: (
    <>
      <ellipse cx="12" cy="6" rx="6" ry="3" />
      <path d="M8.5 8.5 7 19.5h3.5l1.5-10.6" />
      <path d="M13.5 8.9l1.5 10.6h3.5L16.5 8.3" />
      <path d="M7.5 19.5V21M9 19.5V21M10.5 19.5V21M15.5 19.5V21M17 19.5V21M18.5 19.5V21" />
    </>
  ),
  soap: (
    <>
      <rect x="4" y="10" width="16" height="10" rx="3" />
      <path d="M8 15h8" />
      <circle cx="9" cy="5.5" r="1.5" />
      <circle cx="14" cy="4" r="1" />
      <circle cx="16.5" cy="7" r="1" />
    </>
  ),
  vase: (
    <>
      <path d="M9 3h6" />
      <path d="M10 3v3.5C8 8 6.5 10.5 6.5 13.5 6.5 17.6 8.9 21 12 21s5.5-3.4 5.5-7.5c0-3-1.5-5.5-3.5-7V3" />
      <path d="M7 13h10" />
    </>
  ),
  notebook: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M12 8h4M12 11.5h4" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M3 9h18M12 9v11" />
      <path d="M12 9c-1.5-3-5-3.5-5-1.2C7 9 9 9 12 9zM12 9c1.5-3 5-3.5 5-1.2C17 9 15 9 12 9z" />
    </>
  ),
};

// Senza foto si mostra un'illustrazione: nei colori del tema oppure, se il
// tema ha layout.productTones = true, nel colore proprio di ogni prodotto.
export default function ProductImage({
  product,
  className = "",
  iconClassName = "h-16 w-16",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}) {
  const { layout } = useTheme();

  if (product.image) {
    return (
      <div className={`relative overflow-hidden bg-surface-alt ${className}`}>
        <Image src={product.image} alt={product.name} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  const tone = layout.productTones ? product.tone : null;

  return (
    <div
      role="img"
      aria-label={product.name}
      className={`relative flex items-center justify-center overflow-hidden ${tone ? "" : "bg-placeholder"} ${className}`}
      style={tone ? { background: `linear-gradient(135deg, ${tone.from} 0%, ${tone.to} 100%)` } : undefined}
    >
      <span aria-hidden="true" className="absolute -right-[15%] -top-[20%] h-[65%] w-[65%] rounded-full bg-placeholder-glow" />
      <span aria-hidden="true" className="absolute -bottom-[25%] -left-[10%] h-[55%] w-[55%] rounded-full bg-placeholder-glow" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={tone ? tone.ink : "var(--c-placeholder-ink)"}
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`relative ${iconClassName}`}
        aria-hidden="true"
      >
        {ICONS[product.icon] ?? ICONS.gift}
      </svg>
    </div>
  );
}
