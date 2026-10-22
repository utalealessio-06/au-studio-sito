import Head from "next/head";
import Image from "next/image";
import PathCards from "../components/PathCards";
import PriceRow from "../components/PriceRow";
import Reveal from "../components/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { EXTRAS, PRICES_VALID_UNTIL, SHOPIFY, VETRINA } from "../lib/listino";
import {
  CITY,
  CONTACT_MESSAGE,
  EMAIL,
  INSTAGRAM,
  INSTAGRAM_URL,
  OWNER_NAME,
  PHONE_DISPLAY,
  STORE_NAME,
  WHATSAPP_NUMBER,
  whatsappUrl,
} from "../lib/store";
import ownerPhoto from "../public/alessio-utale.jpg";
import lumierePhoto from "../public/lavori/lumiere-candles.jpg";
import { useInView } from "../lib/use-in-view";

const TITLE = `${STORE_NAME} | Siti e negozi online per i negozi di ${CITY}`;
const DESCRIPTION =
  "Sito vetrina da €35 al mese o negozio Shopify da €350, per i negozi di Roma. Prezzi chiari, pronto in pochi giorni. Scrivimi su WhatsApp, il preventivo è gratuito.";

const LUMIERE = {
  name: "Lumière Candles",
  url: "https://lumierecandle.net",
  domain: "lumierecandle.net",
  text: "Negozio online di candele profumate fatte a mano. Le candele sono belle: il sito doveva esserlo altrettanto, e rendere facile ordinarle anche dal telefono.",
  done: [
    "Catalogo con foto, prezzi e varianti",
    "Carrello e ordini online",
    "Pannello per aggiornare prodotti e prezzi in autonomia",
    "Pensato prima di tutto per il telefono",
  ],
};

const STEPS = [
  {
    title: "Ci sentiamo",
    text: "Mi scrivi su WhatsApp e mi racconti il tuo negozio. Ti consiglio la strada giusta e ti mando il preventivo, gratis e senza impegno.",
  },
  {
    title: "Mi mandi foto e testi",
    text: "Logo, foto dei prodotti, prezzi, orari. Ti dico io cosa serve, con una lista semplice.",
  },
  {
    title: "Preparo il sito",
    text: "Il sito vetrina e Boutique sono pronti in 5–7 giorni lavorativi, Negozio e Completo in 10–15. Lo vedi e lo approvi prima che vada online.",
  },
  {
    title: "Sei online",
    text: "Ti spiego come funziona e resto a disposizione. Con il sito vetrina gli aggiornamenti li faccio io.",
  },
];

const FAQS = [
  {
    q: "Quanto tempo ci vuole?",
    a: "Sito vetrina e negozio Boutique: 5–7 giorni lavorativi da quando ricevo foto e testi. Negozio e Completo: 10–15 giorni. I servizi extra: 1–3 giorni.",
  },
  {
    q: "Meglio il sito vetrina o il negozio Shopify?",
    a: "Se vuoi farti trovare e far venire gente in negozio, basta il sito vetrina: i clienti ti scrivono o passano a trovarti. Se vuoi vendere online e spedire, ti serve il negozio Shopify. Se hai dubbi, scrivimi e ne parliamo.",
  },
  {
    q: "Ci sono altri costi?",
    a: "Con il sito vetrina no: hosting e dominio sono inclusi nel canone. Con Shopify, l’abbonamento mensile a Shopify, il dominio e le commissioni sui pagamenti li paghi direttamente a Shopify e ai fornitori.",
  },
  {
    q: "Come si paga?",
    a: "Negozio Shopify: acconto del 30% e saldo alla consegna. Sito vetrina: l’attivazione all’inizio, poi il canone ogni mese, in anticipo.",
  },
  {
    q: "Il sito è mio?",
    a: "Il negozio Shopify e il suo account sono intestati a te fin dall’inizio, e restano tuoi. Il sito vetrina resta attivo finché è attivo l’abbonamento.",
  },
  {
    q: "Posso disdire il sito vetrina?",
    a: "Sì. Il minimo è 12 mesi, poi continui mese per mese e puoi disdire quando vuoi.",
  },
  {
    q: "Non sono pratico di computer. È un problema?",
    a: "No. Con il negozio Shopify è inclusa la formazione e un periodo di assistenza. Con il sito vetrina non devi fare niente: mi mandi le novità e le pubblico io, fino a 4 aggiornamenti al mese.",
  },
  {
    q: "Il preventivo è gratis?",
    a: `Sì, gratuito e senza impegno. I prezzi del listino sono validi fino al ${PRICES_VALID_UNTIL}.`,
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: STORE_NAME,
  founder: OWNER_NAME,
  description: DESCRIPTION,
  areaServed: CITY,
  address: { "@type": "PostalAddress", addressLocality: CITY, addressCountry: "IT" },
  telephone: `+${WHATSAPP_NUMBER}`,
  email: EMAIL,
  sameAs: [INSTAGRAM_URL],
};

function Dot() {
  return <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />;
}

// Un passo di "Come lavoro": quando arriva sullo schermo il numero si accende
// e la linea sopra si riempie d'oro, un passo dopo l'altro.
function Step({ step, number }) {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -15% 0px", once: true });
  const lit = inView !== false;
  const delay = { transitionDelay: `${(number - 1) * 150}ms` };

  return (
    <li ref={ref} className="relative pt-6">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
      <span
        aria-hidden="true"
        style={delay}
        className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-accent transition-transform duration-700 ease-out motion-reduce:transition-none ${lit ? "scale-x-100" : "scale-x-0"}`}
      />
      <span
        style={delay}
        className={`heading flex h-12 w-12 items-center justify-center rounded-full border text-2xl transition-colors duration-700 ${
          lit ? "border-accent bg-accent text-accent-fg" : "border-line text-accent"
        }`}
      >
        {number}
      </span>
      <h3 className="heading-3 mt-4 text-fg">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.text}</p>
    </li>
  );
}

function SectionIntro({ eyebrow, title, children }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow text-accent">{eyebrow}</p>
      <h2 className="heading-1 mt-3 text-fg">{title}</h2>
      {children && <p className="mt-4 text-fg-muted">{children}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </Head>

      {/* Apertura */}
      <section className="page-container pb-section-tight pt-10 sm:pt-20">
        {/* Testo a sinistra, foto a destra. Da telefono la foto va sotto i pulsanti:
            il pulsante WhatsApp resta visibile senza scorrere. */}
        <div className="grid items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <div>
            <p className="eyebrow text-accent">
              {STORE_NAME} · {OWNER_NAME} · {CITY}
            </p>
            <h1 className="heading-display mt-5 text-fg">Porta il tuo negozio online</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              Siti vetrina e negozi Shopify per i negozi di {CITY}, pronti in pochi giorni. Prezzi
              chiari, niente sorprese, e parli sempre con me.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton className="btn-primary w-full sm:w-auto" />
              <a href="#prezzi" className="btn-secondary w-full sm:w-auto">
                Guarda i prezzi
              </a>
            </div>
            <p className="mt-4 text-sm text-fg-muted">Preventivo gratuito e senza impegno.</p>
          </div>

          {/* Ritratto nel formato originale, con una cornice oro sfalsata come i filetti del listino. */}
          <figure className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative mr-4">
              <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-media border border-accent" />
              <Image
                src={ownerPhoto}
                alt={`${OWNER_NAME}, ${STORE_NAME}`}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 384px, 90vw"
                preload
                className="relative h-auto w-full rounded-media"
              />
            </div>
            <figcaption className="mt-8 text-sm text-fg-muted">
              <span className="font-heading text-base text-fg">{OWNER_NAME}</span> · fondatore di {STORE_NAME}
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 grid gap-6 border-t border-fg pt-8 sm:grid-cols-2">
          {[
            [VETRINA.question, `${VETRINA.title}: ${VETRINA.price} al mese, tutto compreso.`],
            [SHOPIFY.question, `${SHOPIFY.title}: da ${SHOPIFY.plans[0].price}, una volta sola.`],
          ].map(([question, answer]) => (
            <div key={question} className="border-l-2 border-accent pl-4">
              <p className="font-medium text-fg">{question}</p>
              <p className="mt-1 text-sm text-fg-muted">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Le 3 strade */}
      <section id="prezzi" className="bg-surface-alt py-section">
        <div className="page-container">
          <Reveal>
            <SectionIntro eyebrow="Le 3 strade" title="Scegli la strada giusta per te">
              Tocca una strada per vedere cosa include. E aggiungi il resto solo quando serve.
            </SectionIntro>
          </Reveal>

          <div className="mt-10">
            <PathCards />
          </div>

          <Reveal>
            <details className="group mt-8 rounded-card border border-line bg-surface">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium text-fg [&::-webkit-details-marker]:hidden">
                Altri servizi, da aggiungere quando servono
                <span aria-hidden="true" className="heading text-2xl leading-none text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <ul className="border-t border-line px-5">
                {EXTRAS.map((item) => (
                  <PriceRow key={item.name} {...item} />
                ))}
              </ul>
            </details>
          </Reveal>

          <Reveal className="mt-12 flex flex-col gap-5 border-t border-fg pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="heading-3 text-fg">Non sai quale scegliere?</p>
              <p className="mt-1 text-fg-muted">Scrivimi e ti dico io cosa ti serve davvero. Il preventivo è gratuito.</p>
              <p className="mt-1 text-xs text-fg-muted">Prezzi validi fino al {PRICES_VALID_UNTIL}.</p>
            </div>
            <WhatsAppButton className="btn-primary w-full shrink-0 sm:w-auto" />
          </Reveal>
        </div>
      </section>

      {/* Lavori realizzati */}
      <section id="lavori" className="py-section">
        <div className="page-container">
          <Reveal>
            <SectionIntro eyebrow="Lavori realizzati" title={LUMIERE.name} />
          </Reveal>

          <Reveal className="mt-8 grid items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-14">
            <a href={LUMIERE.url} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-media">
              <Image
                src={lumierePhoto}
                alt="Candela Raspberry Delight di Lumière Candles"
                sizes="(min-width: 768px) 40vw, 100vw"
                placeholder="blur"
                className="card-zoom aspect-4/3 w-full object-cover md:aspect-4/5"
              />
            </a>
            <div>
              <p className="eyebrow text-accent">Negozio online</p>
              <p className="mt-3 text-lg leading-relaxed text-fg">{LUMIERE.text}</p>
              <ul className="mt-6 border-t border-line text-fg-muted">
                {LUMIERE.done.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-line py-3">
                    <Dot />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={LUMIERE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary mt-8 w-full sm:w-auto"
              >
                Guarda il sito: {LUMIERE.domain} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Come lavoro */}
      <section id="come-lavoro" className="bg-surface-alt py-section">
        <div className="page-container">
          <Reveal>
            <SectionIntro eyebrow="Come lavoro" title="Dal primo messaggio al sito online, in 4 passi" />
          </Reveal>

          <ol className="mt-10 grid gap-grid sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <Step key={step.title} step={step} number={index + 1} />
            ))}
          </ol>
        </div>
      </section>

      {/* Domande frequenti */}
      <section id="domande" className="py-section">
        <div className="page-container grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <SectionIntro eyebrow="Domande frequenti" title="Le risposte, prima di scrivermi">
              Non trovi la tua? Chiedimela su WhatsApp.
            </SectionIntro>
          </Reveal>

          <Reveal className="border-t border-fg">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 font-medium text-fg [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span aria-hidden="true" className="heading text-2xl leading-none text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="-mt-1 pb-5 pr-8 text-fg-muted">{faq.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Contatti */}
      <section id="contatti" className="bg-inverse py-section text-inverse-fg">
        <div className="page-container grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow text-accent">Contatti</p>
            <h2 className="heading-1 mt-3">Parliamo del tuo negozio</h2>
            <p className="mt-4 max-w-md text-inverse-muted">
              Scrivimi su WhatsApp: ti rispondo io, di persona. Il messaggio è già pronto, devi solo
              premere invia.
            </p>
            <p className="mt-2 text-sm italic text-inverse-muted">“{CONTACT_MESSAGE}”</p>
            <WhatsAppButton className="btn-inverse mt-8 w-full sm:w-auto" />
          </div>

          <dl className="divide-y divide-inverse-fg/15 border-y border-inverse-fg/15">
            {[
              ["WhatsApp", PHONE_DISPLAY, whatsappUrl()],
              ["Email", EMAIL, `mailto:${EMAIL}`],
              ["Instagram", `@${INSTAGRAM}`, INSTAGRAM_URL],
            ].map(([label, value, href]) => (
              <div key={label} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4">
                <dt className="eyebrow text-inverse-muted">{label}</dt>
                <dd>
                  <a
                    href={href}
                    {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    className="break-all underline-offset-4 hover:underline"
                  >
                    {value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
