import Head from "next/head";
import Image from "next/image";
import MockupShowcase from "../components/MockupShowcase";
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
  "Sito vetrina da €35 al mese (o €350 una volta sola) e negozio Shopify da €350, per i negozi di Roma. Prezzi chiari, pronto in pochi giorni. Scrivimi su WhatsApp, il preventivo è gratuito.";

const LUMIERE = {
  name: "Lumière Candles",
  url: "https://lumierecandle.net",
  domain: "lumierecandle.net",
  text: "Candele profumate fatte a mano, che adesso si ordinano in tre tocchi dal telefono, a qualsiasi ora. Le candele sono belle: il sito doveva esserlo altrettanto.",
  done: [
    "Catalogo con foto, prezzi e varianti",
    "Ordini e pagamenti online, pensati prima di tutto per il telefono",
    "Prodotti e prezzi aggiornabili in autonomia, senza chiamare nessuno",
  ],
};

// APSOC, parte "Problema": prima il problema del titolare, poi la soluzione.
const PAINS = [
  {
    title: "Sempre le stesse domande",
    text: "Rispondi ogni giorno su WhatsApp a orari, prezzi, “avete la M?”",
  },
  {
    title: "Chiuso la sera e la domenica",
    text: "La saracinesca è abbassata, e chi ti cerca non ha nessun altro posto dove guardare.",
  },
  {
    title: "Preventivi vaghi",
    text: "Hai chiesto a un’agenzia: cifre vaghe, tempi lunghi, e nessuno che ti risponde davvero.",
  },
];

// La fascia in fondo all'apertura: i servizi, come un indice.
const HERO_INDEX = [
  ["01", "Sito vetrina", "#vetrina"],
  ["02", "Negozio Shopify", "#shopify"],
  ["03", "Scheda Google", "#clienti"],
  ["04", "Pubblicità locale", "#clienti"],
];

// Il punto unico di vendita (USP): tre vantaggi che insieme nessuna agenzia offre.
const USP = [
  {
    title: "Prezzi scritti, non “dipende”",
    text: "Li trovi qui sotto, con tutto quello che è incluso. Nessuna voce a sorpresa a fine lavoro.",
  },
  {
    title: "Parli solo con me",
    text: "Niente centralino e niente account manager: mi scrivi su WhatsApp e ti rispondo io, di persona.",
  },
  {
    title: "Online in pochi giorni",
    text: "Il sito vetrina è pronto in 5–7 giorni lavorativi da quando ricevo foto e testi. Non in tre mesi.",
  },
];

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
    text: "Da quel giorno chi ti cerca ti trova, a qualsiasi ora. Resto a disposizione: con il sito vetrina gli aggiornamenti li faccio io.",
  },
];

// Le obiezioni, dalla più forte alla più debole (manuale APSOC, parte "Obiezioni").
const FAQS = [
  {
    q: "Non ti conosco: perché dovrei fidarmi?",
    a: "Perché non devi farlo sulla parola. Il sito di Lumière Candles è online e puoi aprirlo adesso. Il tuo sito lo vedi e lo approvi prima che vada online, e per il negozio Shopify il saldo si paga solo alla consegna. E dall’altra parte del telefono ci sono io, con nome, faccia e numero: se qualcosa non va, sai sempre chi chiamare.",
  },
  {
    q: "Ho già Instagram: mi serve davvero un sito?",
    a: "Instagram è ottimo per farti vedere, ma non mostra prezzi, orari e taglie in un colpo d’occhio, e su Google conta poco. Il sito lavora insieme a Instagram, non al posto suo: chi ti scopre nei post trova tutto in un unico posto e ti scrive con un tocco.",
  },
  {
    q: "Meglio il sito vetrina o il negozio Shopify?",
    a: "Se vuoi farti trovare e far venire gente in negozio, basta il sito vetrina: i clienti ti scrivono o passano a trovarti. Se vuoi vendere online e spedire, ti serve il negozio Shopify. Se hai dubbi, scrivimi: ti dico io cosa ti serve davvero, anche se è la soluzione che costa meno.",
  },
  {
    q: "Ci sono altri costi?",
    a: "Con il sito vetrina in abbonamento no: hosting e dominio sono inclusi nel canone. Senza abbonamento paghi solo il dominio, circa €12 l’anno. Con Shopify, l’abbonamento mensile a Shopify, il dominio e le commissioni sui pagamenti li paghi direttamente a Shopify e ai fornitori.",
  },
  {
    q: "Non ho tempo e non sono pratico di computer. È un problema?",
    a: "No. Mi mandi foto e testi una volta, con una lista che ti preparo io, e al resto penso io. Con il sito vetrina, quando hai una novità mi mandi un messaggio e la pubblico io, fino a 4 aggiornamenti al mese. Con il negozio Shopify sono incluse la formazione e un periodo di assistenza.",
  },
  {
    q: "Quanto tempo ci vuole?",
    a: "Sito vetrina e negozio Boutique: 5–7 giorni lavorativi da quando ricevo foto e testi. Negozio e Completo: 10–15 giorni. I servizi extra: 1–3 giorni.",
  },
  {
    q: "Il sito è mio?",
    a: "Il negozio Shopify e il suo account sono intestati a te fin dall’inizio, e restano tuoi. Il sito vetrina in abbonamento resta attivo finché è attivo l’abbonamento; quello senza abbonamento è tuo, sul tuo dominio.",
  },
  {
    q: "Come si paga?",
    a: "Negozio Shopify e sito senza abbonamento: acconto del 30% e saldo alla consegna. Sito vetrina in abbonamento: l’attivazione all’inizio, poi il canone ogni mese, in anticipo.",
  },
  {
    q: "Posso disdire il sito vetrina?",
    a: "Sì. Il minimo è 6 mesi, poi continui mese per mese e puoi disdire quando vuoi.",
  },
  {
    q: "Il preventivo è gratis?",
    a: `Sì, gratuito e senza impegno: se non fa per te, me lo dici e finisce lì. I prezzi del listino sono validi fino al ${PRICES_VALID_UNTIL}.`,
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


// Le note sotto i bottoni: brevi rassicurazioni in maiuscoletto.
function CtaNote({ className = "" }) {
  return (
    <p className={`mt-4 text-[0.7rem] uppercase tracking-[0.12em] ${className}`}>
      Si apre WhatsApp · Ti rispondo io · Gratis e senza impegno
    </p>
  );
}

// Intestazione delle sezioni: "01 · Etichetta", titolo grande a sinistra e,
// se c'è, il testo di accompagnamento a destra, allineato in basso.
function SectionHead({ index, label, title, children, inverse = false }) {
  return (
    <Reveal className="mb-12 grid items-end gap-6 lg:mb-18 lg:grid-cols-[7fr_4fr] lg:gap-14">
      <div>
        <p className={`eyebrow ${inverse ? "text-inverse-accent" : "text-accent"}`}>
          {index} · {label}
        </p>
        <h2 className={`heading-1 mt-5 ${inverse ? "text-inverse-fg" : "text-fg"}`}>{title}</h2>
      </div>
      {children && (
        <p className={`max-w-[44ch] text-lg lg:justify-self-end ${inverse ? "text-inverse-muted" : "text-fg-muted"}`}>{children}</p>
      )}
    </Reveal>
  );
}

// Un passo di "Come lavoro": quando arriva sullo schermo la linea sopra si
// riempie dell'accento, un passo dopo l'altro.
function Step({ step, number }) {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -15% 0px", once: true });
  const lit = inView !== false;
  const delay = { transitionDelay: `${(number - 1) * 150}ms` };

  return (
    <li ref={ref} className="relative border-line pb-2 pt-10 sm:px-8 sm:first:pl-0 lg:border-l lg:first:border-l-0">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
      <span
        aria-hidden="true"
        style={delay}
        className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-accent transition-transform duration-700 ease-out motion-reduce:transition-none ${lit ? "scale-x-100" : "scale-x-0"}`}
      />
      <span className="heading mb-5 block text-7xl italic text-accent">{number}</span>
      <h3 className="heading-2 text-fg">{step.title}</h3>
      <p className="mt-4 border-t border-line pt-4 text-[0.97rem] leading-relaxed text-fg-muted">{step.text}</p>
    </li>
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

      {/* Apertura: fascia scura a tutto schermo, testo al centro, cornice sottile. */}
      <section className="hero-backdrop relative flex min-h-[min(100svh,61rem)] flex-col overflow-hidden pt-[4.75rem] text-inverse-fg lg:pt-[6.25rem]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-2.5 z-10 border border-inverse-fg/15 sm:inset-4" />

        <div className="page-container relative z-20 flex flex-1 flex-col">
          <div className="mx-auto flex max-w-[61rem] flex-1 flex-col items-center justify-center py-16 text-center sm:pb-22 sm:pt-18">
            <p className="flex items-center gap-3 text-inverse-accent">
              <Image
                src={ownerPhoto}
                alt=""
                sizes="40px"
                preload
                className="h-9 w-9 rounded-full object-cover object-[50%_20%] ring-1 ring-inverse-accent ring-offset-2 ring-offset-inverse"
              />
              <span className="eyebrow">
                {OWNER_NAME} · {CITY}
              </span>
            </p>

            <h1 className="heading-display mb-8 mt-7">
              <span className="block">Quando ti cercano su Google,</span>
              <span className="mt-1 block whitespace-nowrap text-[0.82em] italic leading-[1.05] text-inverse-accent sm:text-[1.1em]">
                <span className="type-in inline-block">
                  trovano il tuo negozio?
                  <span aria-hidden="true" className="caret" />
                </span>
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-[48ch] text-lg text-inverse-fg/80 sm:text-xl">
              Ti preparo il sito vetrina o il negozio Shopify che fa trovare il tuo negozio di {CITY}{" "}
              <strong className="font-semibold text-inverse-fg">in pochi giorni</strong>, con{" "}
              <strong className="font-semibold text-inverse-fg">prezzi scritti</strong> e una sola persona da chiamare: io.
            </p>

            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <WhatsAppButton className="btn-primary">Chiedi il preventivo gratuito</WhatsAppButton>
              <a href="#prezzi" className="btn-ghost">
                Guarda i prezzi
              </a>
            </div>
            <CtaNote className="text-inverse-muted" />
          </div>

          {/* Indice dei servizi in fondo all'apertura */}
          <ul className="mb-4 grid grid-cols-2 border-t border-inverse-fg/15 lg:grid-cols-4">
            {HERO_INDEX.map(([n, label, href], i) => (
              <li key={label} className={`border-inverse-fg/15 ${i % 2 ? "border-l pl-5" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-l lg:pl-6" : ""}`}>
                <a href={href} className="group flex items-baseline gap-3 py-5 lg:gap-4 lg:py-6">
                  <b className="text-[0.7rem] font-semibold tracking-[0.14em] text-inverse-accent">{n}</b>
                  <span className="heading text-lg transition-colors group-hover:text-inverse-accent sm:text-[1.4rem]">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 01 · Il problema */}
      <section id="problema" className="bg-surface-alt py-section">
        <div className="page-container">
          <SectionHead
            index="01"
            label="Ti riconosci?"
            title={
              <>
                Il tuo negozio è curato in ogni dettaglio. Online, però, <em className="text-accent">è come se fosse chiuso.</em>
              </>
            }
          />

          <div className="grid items-start gap-11 lg:grid-cols-[7fr_5fr] lg:gap-18">
            <Reveal>
              <p className="text-[1.2rem] leading-[1.55] text-fg sm:text-[1.32rem]">
                Sono le nove di sera. Una cliente ha visto una giacca nella tua vetrina e vuole sapere se
                c’è la sua taglia. Ti cerca su Google: trova una foto vecchia e degli orari che non sa se
                sono giusti. Prova su Instagram: niente prezzi, nessun modo di chiedere al volo.
              </p>
              <p className="heading mt-8 text-[clamp(2.1rem,1.5rem+2vw,3rem)] italic leading-[1.05] text-fg">
                Dopo due minuti chiude tutto e compra altrove.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="border-t border-line">
                {PAINS.map((pain) => (
                  <li key={pain.title} className="border-b border-line py-5 text-[0.97rem] text-fg-muted">
                    <b className="heading mb-1.5 block text-[1.7rem] font-normal leading-tight text-fg">{pain.title}</b>
                    {pain.text}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-l-[3px] border-inverse-accent bg-inverse px-7 py-6 text-inverse-fg">
                Ogni settimana senza un sito, le persone che cercano un negozio come il tuo{" "}
                <strong className="font-semibold text-inverse-accent">trovano qualcun altro</strong>. Non perché sia più
                bravo di te: solo perché si fa trovare.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 · La soluzione */}
      <section id="soluzione" className="py-section">
        <div className="page-container">
          <SectionHead
            index="02"
            label="La soluzione"
            title={
              <>
                Per questo è nato <em className="text-accent">{STORE_NAME}</em>
              </>
            }
          >
            Tre cose che, messe insieme, un’agenzia non ti offre.
          </SectionHead>

          <ol className="border-t border-line">
            {USP.map((item, index) => (
              <Reveal
                as="li"
                key={item.title}
                delay={index * 100}
                className="grid grid-cols-[2.75rem_1fr] items-center gap-x-4 gap-y-3 border-b border-line py-8 sm:grid-cols-[5.5rem_1.15fr_1fr] sm:gap-x-6 sm:py-10"
              >
                <span className="text-xs font-semibold tracking-[0.14em] text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="heading text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] text-fg">{item.title}</h3>
                <p className="col-start-2 max-w-[46ch] text-fg-muted sm:col-start-auto">{item.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 · Prezzi: le 3 strade */}
      <section id="prezzi" className="bg-surface-alt py-section">
        <div className="page-container">
          <SectionHead
            index="03"
            label="Le 3 strade"
            title={
              <>
                Scegli la strada <em className="text-accent">giusta per te</em>
              </>
            }
          >
            Tocca una strada per vedere cosa include. Parti da quello che ti serve oggi e aggiungi il resto solo quando
            serve.
          </SectionHead>

          <PathCards />

          <Reveal>
            <details className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-7 [&::-webkit-details-marker]:hidden">
                <span className="heading text-[1.75rem] text-fg">Altri servizi, da aggiungere quando servono</span>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong/30 text-xl font-light text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <ul className="mb-8 border border-line bg-surface px-5 sm:px-8">
                {EXTRAS.map((item) => (
                  <PriceRow key={item.name} {...item} />
                ))}
              </ul>
            </details>
          </Reveal>

          <Reveal className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="heading-2 text-fg">
                Non sai quale <em className="text-accent">scegliere?</em>
              </p>
              <p className="mt-3 max-w-xl text-fg-muted">
                Scrivimi e ti dico io cosa ti serve davvero, anche se è la soluzione che costa meno. Questi prezzi
                valgono <strong className="font-semibold text-fg">fino al {PRICES_VALID_UNTIL}</strong>.
              </p>
            </div>
            <WhatsAppButton className="btn-primary w-full shrink-0 sm:w-auto">Dimmi cosa mi serve</WhatsAppButton>
          </Reveal>
        </div>
      </section>

      {/* 04 · Lavori, su fascia scura */}
      <section id="lavori" className="bg-inverse py-section text-inverse-fg">
        <div className="page-container">
          <SectionHead
            index="04"
            label="Lavori"
            inverse
            title={
              <>
                Guarda <em className="text-inverse-accent">cosa ne esce</em>
              </>
            }
          >
            Un negozio online vero, già in vendita, e i siti che ho disegnato per ristoranti e B&amp;B del Lazio. Niente
            immagini di repertorio.
          </SectionHead>

          {/* Il lavoro in evidenza */}
          <Reveal className="grid items-center gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
            <a href={LUMIERE.url} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-media">
              <Image
                src={lumierePhoto}
                alt="Candela Raspberry Delight di Lumière Candles"
                sizes="(min-width: 1024px) 55vw, 100vw"
                placeholder="blur"
                className="card-zoom aspect-16/11 w-full object-cover"
              />
              <span className="absolute left-4 top-4 bg-inverse/85 px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em]">
                Cliente · Negozio online
              </span>
            </a>
            <div>
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 border-b border-inverse-fg/15 pb-5">
                <span className="text-[0.7rem] tracking-[0.12em] text-inverse-muted">01</span>
                <h3 className="heading text-[clamp(2.2rem,1.6rem+2vw,3.4rem)]">{LUMIERE.name}</h3>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-inverse-fg/90">{LUMIERE.text}</p>
              <ul className="mt-6 border-t border-inverse-fg/15 text-inverse-muted">
                {LUMIERE.done.map((item) => (
                  <li key={item} className="border-b border-inverse-fg/15 py-3">
                    {item}
                  </li>
                ))}
              </ul>
              <a href={LUMIERE.url} target="_blank" rel="noopener noreferrer" className="link-more mt-8 hover:text-inverse-accent!">
                Guarda il sito: {LUMIERE.domain} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>

          {/* Siti fatti per attività vere (lib/portfolio.js) */}
          <Reveal className="mb-12 mt-section grid items-end gap-6 border-t border-inverse-fg/15 pt-12 lg:grid-cols-[7fr_4fr] lg:gap-14">
            <h3 className="heading-2">
              Come potrebbe essere <em className="text-inverse-accent">il tuo</em>
            </h3>
            <p className="max-w-[44ch] text-inverse-muted lg:justify-self-end">
              Per ognuno ho studiato l’attività, disegnato un sito su misura e l’ho mostrato al titolare (sono le
              “Proposte”). È lo stesso lavoro che farei per il tuo negozio, prima ancora che tu spenda un euro per vederlo.
            </p>
          </Reveal>

          <MockupShowcase start={2} />
        </div>
      </section>

      {/* Fascia centrale nel colore principale */}
      <section className="bg-primary py-section text-center text-primary-fg">
        <Reveal className="page-container">
          <p className="eyebrow">Il prossimo può essere il tuo negozio</p>
          <h2 className="heading-1 mx-auto mb-7 mt-6 max-w-[18ch]">
            Online in pochi giorni, <em>con un prezzo scritto.</em>
          </h2>
          <p className="mx-auto mb-10 max-w-[50ch] text-lg opacity-85">
            Mi scrivi, mi racconti il tuo negozio e ti mando il preventivo. Se non fa per te, me lo dici e finisce lì.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <WhatsAppButton className="btn-on-primary">Chiedi il preventivo gratuito</WhatsAppButton>
            <a href="#prezzi" className="btn-ghost">
              Rivedi i prezzi
            </a>
          </div>
          <CtaNote className="opacity-75" />
        </Reveal>
      </section>

      {/* 05 · Come lavoro */}
      <section id="come-lavoro" className="py-section">
        <div className="page-container">
          <SectionHead
            index="05"
            label="Come lavoro"
            title={
              <>
                Dal primo messaggio al sito online, <em className="text-accent">in 4 passi</em>
              </>
            }
          />

          <ol className="grid gap-x-0 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <Step key={step.title} step={step} number={index + 1} />
            ))}
          </ol>
        </div>
      </section>

      {/* 06 · Domande frequenti */}
      <section id="domande" className="bg-surface-alt py-section">
        <div className="page-container">
          <SectionHead
            index="06"
            label="Domande frequenti"
            title={
              <>
                I dubbi che hanno tutti, <em className="text-accent">prima di scrivermi</em>
              </>
            }
          >
            Non trovi la tua? Chiedimela su WhatsApp.
          </SectionHead>

          <Reveal className="grid items-start gap-x-16 lg:grid-cols-2">
            {[FAQS.slice(0, Math.ceil(FAQS.length / 2)), FAQS.slice(Math.ceil(FAQS.length / 2))].map((column, c) => (
              <div key={c} className={`border-line ${c === 0 ? "border-t" : "lg:border-t"}`}>
                {column.map((faq) => (
                  <details key={faq.q} className="group border-b border-line">
                    <summary className="relative flex cursor-pointer list-none items-center gap-4 py-6 pr-10 [&::-webkit-details-marker]:hidden">
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-sm font-semibold text-accent transition-colors group-open:border-inverse group-open:bg-inverse group-open:text-inverse-accent"
                      >
                        ?
                      </span>
                      <span className="heading text-[1.4rem] leading-tight text-fg sm:text-[1.65rem]">{faq.q}</span>
                      <span aria-hidden="true" className="absolute right-1 top-1/2 -translate-y-1/2 text-2xl font-light text-accent">
                        <span className="group-open:hidden">+</span>
                        <span className="hidden group-open:inline">–</span>
                      </span>
                    </summary>
                    <p className="max-w-[60ch] pb-6 pl-13 text-fg-muted">{faq.a}</p>
                  </details>
                ))}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 07 · Contatti */}
      <section id="contatti" className="border-t border-inverse-fg/15 bg-inverse py-section text-inverse-fg">
        <div className="page-container grid items-end gap-12 lg:grid-cols-[7fr_4fr] lg:gap-18">
          <Reveal>
            <p className="eyebrow text-inverse-accent">07 · Contatti</p>
            <h2 className="heading-display mb-7 mt-6">
              Parliamo del <em className="text-inverse-accent">tuo negozio.</em>
            </h2>
            <p className="max-w-[48ch] text-lg text-inverse-fg/80">
              Scrivimi su WhatsApp: ti rispondo io, di persona. Il messaggio è già pronto, devi solo premere invia. Il
              preventivo è gratuito e non ti impegna a niente.
            </p>
            <p className="mt-3 text-sm italic text-inverse-muted">“{CONTACT_MESSAGE}”</p>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-3">
            <div className="mb-3 flex items-center gap-4">
              <Image
                src={ownerPhoto}
                alt={`${OWNER_NAME}, ${STORE_NAME}`}
                sizes="64px"
                className="h-16 w-16 rounded-full object-cover object-[50%_20%] ring-1 ring-inverse-accent ring-offset-2 ring-offset-inverse"
              />
              <div>
                <p className="heading text-2xl">{OWNER_NAME}</p>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-inverse-muted">Fondatore di {STORE_NAME}</p>
              </div>
            </div>
            <WhatsAppButton className="btn-primary w-full justify-between!">WhatsApp · {PHONE_DISPLAY}</WhatsAppButton>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-between!">
              <span>
                <span className="max-sm:hidden">Instagram · </span>@{INSTAGRAM}
              </span>
            </a>
            <a href={`mailto:${EMAIL}`} className="btn-ghost w-full justify-between! normal-case! tracking-[0.04em]!">
              {EMAIL}
            </a>
            <p className="mt-2 text-[0.7rem] uppercase tracking-[0.14em] text-inverse-muted">
              Prezzi del listino validi fino al {PRICES_VALID_UNTIL}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
