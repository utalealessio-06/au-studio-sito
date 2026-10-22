import Head from "next/head";
import Link from "next/link";
import ProductGrid from "../components/ProductGrid";
import ProductImage from "../components/ProductImage";
import { getAllProducts, getFeaturedProducts } from "../lib/products";
import { useTheme } from "../lib/use-theme";

const BENEFITS = [
  {
    title: "Spedizione in 24/48h",
    text: "Consegna tracciata in tutta Italia.",
    icon: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
  },
  {
    title: "Confezione regalo",
    text: "Inclusa, con biglietto personalizzato.",
    icon: <path d="M4 9h16v11H4zM3 9h18M12 9v11M12 9c-1.5-3-5-3.5-5-1.2C7 9 9 9 12 9zm0 0c1.5-3 5-3.5 5-1.2C17 9 15 9 12 9z" />,
  },
  {
    title: "Reso gratuito",
    text: "Hai 30 giorni per ripensarci.",
    icon: <path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4" />,
  },
  {
    title: "Pagamenti sicuri",
    text: "Transazioni protette e crittografate.",
    icon: <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3zM9 12l2 2 4-4" />,
  },
];

const STEPS = [
  {
    title: "Selezioniamo i laboratori",
    text: "Visitiamo di persona botteghe e piccoli produttori in tutta Italia e scegliamo solo chi lavora con materiali e tecniche autentiche.",
  },
  {
    title: "Controlliamo ogni pezzo",
    text: "Ogni oggetto viene verificato a mano prima della spedizione: le piccole imperfezioni sono il segno dell’artigianato, i difetti no.",
  },
  {
    title: "Confezioniamo con cura",
    text: "Carta riciclata, nastro in cotone e un biglietto scritto con il tuo messaggio: il regalo arriva pronto da consegnare.",
  },
];

export async function getStaticProps() {
  return {
    props: {
      featured: getFeaturedProducts(4),
      heroProducts: getAllProducts().slice(4, 7),
    },
  };
}

export default function HomePage({ featured, heroProducts }) {
  const { layout } = useTheme();
  const [heroMain, ...heroSide] = heroProducts;

  return (
    <>
      <Head>
        <title>Regalo Artigianato | Idee regalo fatte a mano in Italia</title>
        <meta
          name="description"
          content="Ceramiche, pelletteria, tessuti e profumi per la casa realizzati a mano da artigiani italiani. Confezione regalo inclusa e spedizione in 24/48 ore."
        />
      </Head>

      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-alt">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-bg/60 to-transparent lg:block"
        />
        <div className="page-container relative grid items-center gap-16 py-section lg:grid-cols-2">
          <div>
            <p className="eyebrow inline-flex items-center gap-2 rounded-chip bg-bg px-3 py-1 text-accent ring-1 ring-line">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Artigianato italiano
            </p>
            <h1 className="heading-display mt-6 text-fg">
              Regali unici, <em className="text-accent">fatti a mano</em> in Italia.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              Selezioniamo oggetti autentici dai laboratori artigiani di tutta Italia:
              ceramiche, pelletteria, tessuti e profumi per la casa, pronti da regalare.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/prodotti" className="btn-primary">
                Scopri i prodotti
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a1 1 0 0 1 1-1h9.6l-3.3-3.3a1 1 0 1 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4l3.3-3.3H4a1 1 0 0 1-1-1z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#come-lavoriamo" className="btn-secondary">
                Come lavoriamo
              </Link>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8">
              {[
                ["100%", "Made in Italy"],
                ["30 gg", "Reso gratuito"],
                ["24/48h", "Consegna"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-xs text-fg-muted">{label}</dt>
                  <dd className="heading order-first text-2xl text-fg">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative pb-8">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <ProductImage
                product={heroMain}
                className="row-span-2 min-h-72 rounded-media shadow-card"
                iconClassName="h-24 w-24 sm:h-28 sm:w-28"
              />
              {heroSide.map((product) => (
                <ProductImage
                  key={product.id}
                  product={product}
                  className="aspect-square rounded-media shadow-card"
                  iconClassName="h-14 w-14 sm:h-16 sm:w-16"
                />
              ))}
            </div>
            <div className="absolute bottom-0 left-4 right-4 flex items-center gap-4 rounded-panel bg-surface p-4 shadow-pop ring-1 ring-line sm:left-auto sm:right-8 sm:w-80">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-badge bg-accent-soft text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                  {BENEFITS[1].icon}
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium text-fg">Confezione regalo inclusa</p>
                <p className="text-xs text-fg-muted">Con biglietto personalizzato, senza costi extra.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vantaggi */}
      <section aria-label="I nostri servizi" className="border-b border-line bg-bg">
        <div className="page-container grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-badge bg-surface-alt text-fg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  {benefit.icon}
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium text-fg">{benefit.title}</p>
                <p className="mt-0.5 text-sm text-fg-muted">{benefit.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prodotti in evidenza */}
      <section className="page-container py-section">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-accent">In evidenza</p>
            <h2 className="heading-2 mt-3 text-fg">
              I più amati del momento
            </h2>
            <p className="mt-4 max-w-xl text-fg-muted">
              Una selezione dei pezzi preferiti dai nostri clienti, perfetti per ogni occasione.
            </p>
          </div>
          <Link
            href="/prodotti"
            className="eyebrow inline-flex items-center gap-2 text-fg underline-offset-8 transition-colors hover:underline"
          >
            Vedi tutti i prodotti <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Una riga piena: tante card quante sono le colonne del tema. */}
        <ProductGrid products={featured.slice(0, layout.gridColumns)} className="mt-12" />
      </section>

      {/* Come lavoriamo */}
      <section id="come-lavoriamo" className="scroll-mt-24 bg-surface-alt py-section">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-accent">Il nostro metodo</p>
            <h2 className="heading-2 mt-3 text-fg">
              Dalla bottega a casa tua
            </h2>
            <p className="mt-4 text-fg-muted">
              Lavoriamo solo con artigiani che conosciamo di persona, per offrirti oggetti
              autentici e un’esperienza d’acquisto senza pensieri.
            </p>
          </div>

          <ol className="mt-14 grid gap-grid md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="rounded-panel bg-surface p-8 shadow-card ring-1 ring-line">
                <span className="heading text-4xl text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="heading-3 mt-4 text-fg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Regali aziendali */}
      <section className="page-container py-section">
        <div className="relative overflow-hidden rounded-media bg-inverse px-6 py-14 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-16 lg:py-16">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-inverse-fg/10" />
          <div aria-hidden="true" className="absolute -bottom-32 right-40 h-64 w-64 rounded-full bg-inverse-fg/5" />
          <div className="relative max-w-2xl">
            <p className="eyebrow text-inverse-muted">Regali aziendali</p>
            <h2 className="heading-2 mt-3 text-inverse-fg">
              Un pensiero su misura per clienti e collaboratori
            </h2>
            <p className="mt-4 text-inverse-muted">
              Personalizzazione con il vostro logo, biglietti dedicati e spedizioni a più
              indirizzi: scegliete i prodotti, al resto pensiamo noi.
            </p>
          </div>
          <div className="relative mt-8 lg:mt-0 lg:shrink-0">
            <Link href="/prodotti" className="btn-inverse">
              Esplora il catalogo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
