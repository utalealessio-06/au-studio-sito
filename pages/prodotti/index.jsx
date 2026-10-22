import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import ProductGrid from "../../components/ProductGrid";
import { CATEGORIES, getAllProducts } from "../../lib/products";

const SORT_OPTIONS = [
  { value: "consigliati", label: "Consigliati" },
  { value: "prezzo-asc", label: "Prezzo: dal più basso" },
  { value: "prezzo-desc", label: "Prezzo: dal più alto" },
  { value: "nome", label: "Nome (A–Z)" },
];

export async function getStaticProps() {
  return {
    props: {
      products: getAllProducts(),
      categories: CATEGORIES,
    },
  };
}

export default function ProductsPage({ products, categories }) {
  const router = useRouter();
  const [sort, setSort] = useState("consigliati");

  // La categoria vive nell'URL (?categoria=...) così i link del footer e la
  // condivisione della pagina filtrata funzionano.
  const requested = typeof router.query.categoria === "string" ? router.query.categoria : null;
  const activeCategory = categories.find((category) => category.slug === requested) ?? null;

  const visibleProducts = useMemo(() => {
    const filtered = activeCategory
      ? products.filter((product) => product.categorySlug === activeCategory.slug)
      : products;
    const sorted = [...filtered];
    if (sort === "prezzo-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "prezzo-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "nome") sorted.sort((a, b) => a.name.localeCompare(b.name, "it"));
    return sorted;
  }, [products, activeCategory, sort]);

  function selectCategory(slug) {
    router.replace(
      { pathname: "/prodotti", query: slug ? { categoria: slug } : {} },
      undefined,
      { shallow: true, scroll: false }
    );
  }

  const filters = [
    { slug: null, name: "Tutti", count: products.length },
    ...categories.map((category) => ({
      ...category,
      count: products.filter((product) => product.categorySlug === category.slug).length,
    })),
  ];

  return (
    <>
      <Head>
        <title>{`${activeCategory ? activeCategory.name : "Tutti i prodotti"} | Regalo Artigianato`}</title>
        <meta
          name="description"
          content="Scopri il catalogo di idee regalo artigianali: ceramiche, pelletteria, legno, tessili e profumi per la casa fatti a mano in Italia."
        />
      </Head>

      <section className="border-b border-line bg-surface-alt">
        <div className="page-container py-section-tight">
          <Breadcrumb items={[{ href: "/", label: "Home" }, { label: "Prodotti" }]} />
          <h1 className="heading-1 mt-5 text-fg">
            {activeCategory ? activeCategory.name : "Tutti i prodotti"}
          </h1>
          <p className="mt-4 max-w-2xl text-fg-muted">
            Oggetti realizzati a mano da artigiani italiani, scelti uno per uno per chi
            ama i regali autentici.
          </p>
        </div>
      </section>

      <section className="page-container pb-section pt-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filtra per categoria"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {filters.map((filter) => {
              const active = (activeCategory?.slug ?? null) === filter.slug;
              return (
                <button
                  key={filter.slug ?? "tutti"}
                  type="button"
                  onClick={() => selectCategory(filter.slug)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-chip px-4 py-2 text-sm font-medium ring-1 ring-inset transition-colors ${
                    active
                      ? "bg-primary text-primary-fg ring-primary"
                      : "bg-surface text-fg ring-line hover:bg-surface-alt"
                  }`}
                >
                  {filter.name}
                  <span className={`ml-1.5 text-xs ${active ? "opacity-60" : "text-fg-subtle"}`}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <p className="text-sm text-fg-muted" aria-live="polite">
              {visibleProducts.length} {visibleProducts.length === 1 ? "prodotto" : "prodotti"}
            </p>
            <label className="flex items-center gap-2 text-sm text-fg-muted">
              <span className="whitespace-nowrap">Ordina per</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-input bg-surface py-2 pl-3 pr-8 text-sm font-medium text-fg ring-1 ring-inset ring-line-strong focus:outline-none focus:ring-2 focus:ring-focus"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {visibleProducts.length > 0 ? (
          <ProductGrid products={visibleProducts} className="mt-10" />
        ) : (
          <div className="mt-10 rounded-panel bg-surface-alt px-6 py-16 text-center ring-1 ring-line">
            <p className="font-medium text-fg">Nessun prodotto in questa categoria</p>
            <button type="button" onClick={() => selectCategory(null)} className="btn-secondary mt-6">
              Mostra tutti i prodotti
            </button>
          </div>
        )}
      </section>
    </>
  );
}
