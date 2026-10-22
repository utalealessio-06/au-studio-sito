import ProductCard from "./ProductCard";
import { useTheme } from "../lib/use-theme";

// Classi scritte per intero: Tailwind deve trovarle nel codice sorgente.
const COLUMNS = {
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export default function ProductGrid({ products, className = "" }) {
  const { layout } = useTheme();
  return (
    <div className={`grid gap-x-grid gap-y-[calc(var(--sp-grid)*1.25)] ${COLUMNS[layout.gridColumns] ?? COLUMNS[4]} ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
