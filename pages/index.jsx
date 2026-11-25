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
  "Rispondi ogni giorno alle stesse domande su WhatsApp: orari, prezzi, “avete la M?”",
  "La sera e la domenica la saracinesca è abbassata, e chi ti cerca non ha nessun altro posto dove guardare",
  "Hai chiesto un preventivo a un’agenzia: cifre vaghe, tempi lunghi, e nessuno che ti risponde davvero",
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
            <h1 className="heading-display mt-5 text-fg">Quando ti cercano su Google, trovano il tuo negozio?</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              Ti preparo il sito vetrina o il negozio Shopify che fa trovare il tuo negozio di {CITY}{" "}
              <strong className="font-medium text-fg">in pochi giorni</strong>, con{" "}
              <strong className="font-medium text-fg">prezzi scritti</strong> e una sola persona da chiamare: io.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton className="btn-primary w-full sm:w-auto">Chiedi il preventivo gratuito</WhatsAppButton>
              <a href="#prezzi" className="btn-secondary w-full sm:w-auto">
                Guarda i prezzi
              </a>
            </div>
            <p className="mt-4 text-sm text-fg-muted">
              Si apre WhatsApp con il messaggio già scritto. Gratis e senza impegno.
            </p>
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

      {/* Il problema (APSOC: prima il problema, poi la soluzione) */}
      <section id="problema" className="py-section">
        <div className="page-container grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <Reveal>
            <SectionIntro
              eyebrow="Ti riconosci?"
              title="Il tuo negozio è curato in ogni dettaglio. Online, però, è come se fosse chiuso."
            />
            <p className="mt-6 max-w-2xl leading-relaxed text-fg-muted">
              Sono le nove di sera. Una cliente ha visto una giacca nella tua vetrina e vuole sapere se
              c’è la sua taglia. Ti cerca su Google: trova una foto vecchia e degli orari che non sa se
              sono giusti. Prova su Instagram: niente prezzi, nessun modo di chiedere al volo. Dopo due
              minuti chiude tutto e compra altrove, da chi le ha dato una risposta prima.
            </p>
          </Reveal>

          <Reveal delay={120} className="self-center">
            <ul className="border-t border-fg text-fg-muted">
              {PAINS.map((pain) => (
                <li key={pain} className="flex gap-3 border-b border-line py-4">
                  <Dot />
                  {pain}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="page-container">
          <Reveal className="mt-12 border-l-2 border-accent pl-5">
            <p className="max-w-3xl text-lg leading-relaxed text-fg">
              Ogni settimana senza un sito, le persone che cercano un negozio come il tuo{" "}
              <strong className="font-medium">trovano qualcun altro</strong>. Non perché sia più bravo
              di te: solo perché si fa trovare.
            </p>
          </Reveal>

          <Reveal className="mt-section-tight border-t border-fg pt-10">
            <p className="eyebrow text-accent">La soluzione</p>
            <h2 className="heading-2 mt-3 max-w-2xl text-fg">Per questo è nato {STORE_NAME}</h2>
          </Reveal>
          <ul className="mt-8 grid gap-grid md:grid-cols-3">
            {USP.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 120} className="rounded-card border border-line p-6">
                <p className="heading-3 text-fg">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Le 3 strade */}
      <section id="prezzi" className="bg-surface-alt py-section">
        <div className="page-container">
          <Reveal>
            <SectionIntro eyebrow="Le 3 strade" title="Scegli la strada giusta per te">
              Tocca una strada per vedere cosa include. Parti da quello che ti serve oggi e aggiungi il
              resto solo quando serve.
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
              <p className="mt-1 text-fg-muted">
                Scrivimi e ti dico io cosa ti serve davvero, anche se è la soluzione che costa meno.
              </p>
              <p className="mt-1 text-sm text-fg">
                Questi prezzi valgono <strong className="font-medium">fino al {PRICES_VALID_UNTIL}</strong>.
              </p>
            </div>
            <WhatsAppButton className="btn-primary w-full shrink-0 sm:w-auto">Dimmi cosa mi serve</WhatsAppButton>
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

          {/* Siti fatti per attività vere (lib/portfolio.js) */}
          <Reveal className="mt-section border-t border-fg pt-10">
            <SectionIntro eyebrow="Altri lavori" title="Come potrebbe essere il tuo">
              Ristoranti e B&amp;B veri del Lazio: per ognuno ho studiato l’attività, disegnato un sito su
              misura e l’ho mostrato al titolare (sono le “Proposte”). È lo stesso lavoro che farei per il
              tuo negozio, prima ancora che tu spenda un euro per vederlo.
            </SectionIntro>
          </Reveal>

          <div className="mt-10">
            <MockupShowcase />
          </div>
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
            <SectionIntro eyebrow="Domande frequenti" title="I dubbi che hanno tutti, prima di scrivermi">
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
              premere invia. Il preventivo è gratuito e non ti impegna a niente.
            </p>
            <p className="mt-2 text-sm italic text-inverse-muted">“{CONTACT_MESSAGE}”</p>
            <WhatsAppButton className="btn-inverse mt-8 w-full sm:w-auto">Chiedi il preventivo gratuito</WhatsAppButton>
            <p className="mt-3 text-xs text-inverse-muted">Prezzi del listino validi fino al {PRICES_VALID_UNTIL}.</p>
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
