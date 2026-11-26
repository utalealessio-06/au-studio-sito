import Head from "next/head";
import Image from "next/image";
import MockupShowcase from "../components/MockupShowcase";
import PathCards from "../components/PathCards";
import PriceRow from "../components/PriceRow";
import Reveal from "../components/Reveal";
import WhatsAppButton from "../components/WhatsAppButton";
import { EXTRAS, PRICES_VALID_UNTIL } from "../lib/listino";
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
} from "../lib/store";
import ownerPhoto from "../public/alessio-utale.jpg";
import lumierePhoto from "../public/lavori/lumiere-candles.jpg";
import { useInView } from "../lib/use-in-view";

// ─────────────────────────────────────────────────────────────────────────
//  La pagina segue APSOC (Il manuale del copywriting):
//    A  Attenzione  → apertura: titolo sul problema + USP + CTA
//    P  Problema    → 01: la storia della cliente, i 3 problemi, cosa
//                     succede se non fai niente (effetto domino)
//    S  Soluzione   → 02: i 3 vantaggi e l'USP; 03: i prezzi;
//                     04: cosa succede quando mi scrivi (chiarezza post-acquisto)
//    O  Obiezioni   → 05: la più forte ("non ti conosco") con Claim, 3 Prove
//                     e Vantaggio (CPB); 06: le altre, dalla più forte alla più debole
//    C  CTA         → dopo ogni sezione, fascia centrale e 07 · Contatti
//  Regola rigida: prima il problema, poi la soluzione.
// ─────────────────────────────────────────────────────────────────────────

const TITLE = `${STORE_NAME} | Siti e negozi online per i negozi di ${CITY}`;
const DESCRIPTION =
  "Il sito che fa trovare il tuo negozio di Roma anche quando sei chiuso. Sito vetrina da €35 al mese o negozio Shopify da €350, pronto in pochi giorni, con il prezzo scritto. Preventivo gratuito su WhatsApp.";

// Attenzione: l'USP in tre parti, già nell'apertura (regola del 3).
const HERO_USP = [
  ["01", "Prezzo scritto", "prima di cominciare"],
  ["02", "Online in 5–7 giorni", "non in tre mesi"],
  ["03", "Una persona sola", "ti rispondo io"],
];

// Problema: tre situazioni che il titolare vive davvero.
const PAINS = [
  {
    title: "Sempre le stesse domande",
    text: "Rispondi ogni giorno su WhatsApp a orari, prezzi, “avete la M?”. Mentre sei in cassa con un cliente vero.",
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

// Soluzione: prima i vantaggi per chi compra dal negozio, poi le caratteristiche.
const BENEFITS = [
  {
    title: "Ti trovano",
    text: "Chi cerca il tuo negozio su Google trova il tuo sito: nome, orari, indirizzo e foto aggiornate. Non una scheda vecchia di tre anni.",
  },
  {
    title: "Ti scrivono",
    text: "Un tocco e sono su WhatsApp con te. Niente moduli da compilare, niente email che nessuno legge.",
  },
  {
    title: "Ti scelgono",
    text: "Vedono prodotti, prezzi e taglie prima di uscire di casa. Quando entrano in negozio sanno già cosa vogliono.",
  },
];

// USP: tre vantaggi che, messi insieme, un'agenzia non offre.
const USP = [
  {
    title: "Prezzi scritti, non “dipende”",
    text: "Li trovi su questa pagina, con tutto quello che è incluso. Nessuna voce a sorpresa a fine lavoro.",
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

// Chiarezza sul post-acquisto: cosa succede, passo per passo, dopo il primo messaggio.
const STEPS = [
  {
    title: "Mi scrivi",
    text: "Premi il pulsante e mi racconti il tuo negozio. Ti consiglio la strada giusta e ti mando il preventivo, gratis e senza impegno.",
  },
  {
    title: "Mi mandi foto e testi",
    text: "Logo, foto dei prodotti, prezzi, orari. Ti dico io cosa serve, con una lista semplice.",
  },
  {
    title: "Lo vedi prima di tutti",
    text: "Sito vetrina e Boutique sono pronti in 5–7 giorni lavorativi, Negozio e Completo in 10–15. Lo approvi tu, prima che vada online.",
  },
  {
    title: "Sei online",
    text: "Da quel giorno chi ti cerca ti trova, a qualsiasi ora. Con il sito vetrina gli aggiornamenti li faccio io.",
  },
];

// Obiezioni: Lumière Candles, la prova n. 1 (un lavoro vero, già online).
const LUMIERE = {
  name: "Lumière Candles",
  url: "https://lumierecandle.net",
  domain: "lumierecandle.net",
  text: "Candele profumate fatte a mano, che adesso si ordinano in tre tocchi dal telefono, a qualsiasi ora. Puoi aprire il sito adesso e provarlo tu.",
  done: [
    "Catalogo con foto, prezzi e varianti",
    "Ordini e pagamenti online, pensati prima di tutto per il telefono",
    "Prodotti e prezzi aggiornabili in autonomia, senza chiamare nessuno",
  ],
};

// Obiezioni: la prova n. 3, le garanzie (tutte reali, dal listino).
const GUARANTEES = [
  {
    title: "Lo approvi prima",
    text: "Vedi il sito finito e lo approvi tu. Va online solo quando ti piace.",
  },
  {
    title: "Il saldo alla consegna",
    text: "Per il negozio Shopify paghi un acconto del 30%: il resto solo quando è pronto.",
  },
  {
    title: "Sai chi chiamare",
    text: "Dall’altra parte ci sono io, con nome, faccia e numero. Se qualcosa non va, mi scrivi e rispondo.",
  },
];

// Le altre obiezioni, dalla più forte alla più debole. La più forte di
// tutte ("non ti conosco") ha una sezione sua: 05 · Perché fidarti.
const FAQS = [
  {
    q: "Ho già Instagram: mi serve davvero un sito?",
    a: "Instagram è ottimo per farti vedere, ma non mostra prezzi, orari e taglie in un colpo d’occhio, e su Google conta poco. Il sito lavora insieme a Instagram, non al posto suo: chi ti scopre nei post trova tutto in un unico posto e ti scrive con un tocco.",
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
    q: "Ci penso più avanti: c’è fretta?",
    a: `Puoi aspettare, certo. Ma ogni settimana chi ti cerca e non ti trova compra da qualcun altro, e si abitua a farlo. E i prezzi di questo listino valgono fino al ${PRICES_VALID_UNTIL}: scrivermi adesso non ti impegna, e ti blocca il prezzo.`,
  },
  {
    q: "Meglio il sito vetrina o il negozio Shopify?",
    a: "Se vuoi farti trovare e far venire gente in negozio, basta il sito vetrina: i clienti ti scrivono o passano a trovarti. Se vuoi vendere online e spedire, ti serve il negozio Shopify. Se hai dubbi, scrivimi: ti dico io cosa ti serve davvero, anche se è la soluzione che costa meno.",
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
    a: "Sì, gratuito e senza impegno: se non fa per te, me lo dici e finisce lì.",
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

// Chiarezza post-azione: sotto ogni CTA si dice cosa succede quando lo premi.
function CtaNote({ className = "", children = "Si apre WhatsApp con il messaggio già scritto · Nessun impegno" }) {
  return <p className={`mt-4 text-[0.7rem] uppercase tracking-[0.12em] ${className}`}>{children}</p>;
}

// Intestazione delle sezioni: "01 · Etichetta", titolo grande a sinistra e,
// se c'è, il testo a destra. Occhiello, titolo e testo entrano scaglionati.
function SectionHead({ index, label, title, children, inverse = false }) {
  return (
    <div className="mb-12 grid items-end gap-6 lg:mb-18 lg:grid-cols-[7fr_4fr] lg:gap-14">
      <div>
        <Reveal as="p" className={`eyebrow ${inverse ? "text-inverse-accent" : "text-accent"}`}>
          {index} · {label}
        </Reveal>
        <Reveal as="h2" delay={60} className={`heading-1 mt-5 ${inverse ? "text-inverse-fg" : "text-fg"}`}>
          {title}
        </Reveal>
      </div>
      {children && (
        <Reveal
          as="p"
          delay={140}
          className={`max-w-[44ch] text-lg lg:justify-self-end ${inverse ? "text-inverse-muted" : "text-fg-muted"}`}
        >
          {children}
        </Reveal>
      )}
    </div>
  );
}

// Un passo di "Come funziona": quando arriva sullo schermo la linea sopra
// si riempie dell'accento, un passo dopo l'altro (linea: ease-in-out, si
// muove sullo schermo; scaglionamento breve).
function Step({ step, number }) {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -15% 0px", once: true });
  const lit = inView !== false;
  const delay = { transitionDelay: `${(number - 1) * 110}ms` };

  return (
    <li ref={ref} className="relative pb-2 pt-10 sm:px-8 sm:first:pl-0 lg:border-l lg:border-line lg:first:border-l-0">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
      <span
        aria-hidden="true"
        style={delay}
        className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-accent transition-transform duration-700 ease-in-out motion-reduce:transition-none ${lit ? "scale-x-100" : "scale-x-0"}`}
      />
      <span className="heading mb-5 block text-7xl italic tabular-nums text-accent">{number}</span>
      <h3 className="heading-2 text-fg">{step.title}</h3>
      <p className="mt-4 border-t border-line pt-4 text-[0.97rem] leading-relaxed text-fg-muted">{step.text}</p>
    </li>
  );
}

// Foto che si scopre dall'alto in basso quando arriva sullo schermo.
function ImageReveal({ className = "", children }) {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -10% 0px", once: true });
  const hidden = inView === false;

  return (
    <div
      ref={ref}
      className={`transition-[clip-path] duration-1000 ease-in-out motion-reduce:transition-none ${
        hidden ? "[clip-path:inset(0_0_100%_0)] motion-reduce:[clip-path:none]" : "[clip-path:inset(0_0_0_0)]"
      } ${className}`}
    >
      {children}
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

      {/* ── A · ATTENZIONE ──────────────────────────────────────────────
          Il titolo punta sul pain point, in seconda persona, e lascia una
          curiosità; il sottotitolo dice cosa faccio (semplice) con l'USP.
          Entrata coreografata: gli elementi salgono uno dopo l'altro. */}
      <section className="hero-backdrop relative flex min-h-[min(100svh,61rem)] flex-col overflow-hidden pt-[4.75rem] text-inverse-fg lg:pt-[6.25rem]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-2.5 z-10 border border-inverse-fg/15 sm:inset-4" />

        <div className="page-container relative z-20 flex flex-1 flex-col">
          <div className="mx-auto flex max-w-[68rem] flex-1 flex-col items-center justify-center py-16 text-center sm:pb-20 sm:pt-14">
            <p className="rise flex items-center gap-3 text-inverse-accent">
              <Image
                src={ownerPhoto}
                alt=""
                sizes="40px"
                preload
                className="h-9 w-9 rounded-full object-cover object-[50%_20%] ring-1 ring-inverse-accent ring-offset-2 ring-offset-inverse"
              />
              <span className="eyebrow">
                {OWNER_NAME} · Siti per i negozi di {CITY}
              </span>
            </p>

            {/* Più piccolo di heading-display: titolo e pulsante devono stare
                insieme nella prima schermata. */}
            <h1 className="heading mb-8 mt-7 text-[clamp(2.6rem,1.5rem+3.4vw,4.6rem)]">
              <span className="rise block [--d:80ms]">Alle otto abbassi la saracinesca.</span>
              <span className="wipe mt-1 block italic text-inverse-accent [--d:320ms]">I tuoi clienti continuano a cercarti.</span>
            </h1>

            <p className="rise mx-auto mb-10 max-w-[50ch] text-lg text-inverse-fg/80 [--d:480ms] sm:text-xl">
              Ti preparo il sito che fa trovare il tuo negozio su Google anche quando sei chiuso: orari, prezzi e un
              pulsante per scriverti su WhatsApp. <strong className="font-semibold text-inverse-fg">Pronto in pochi giorni</strong>,
              con il <strong className="font-semibold text-inverse-fg">prezzo scritto</strong> prima di cominciare.
            </p>

            <div className="rise flex w-full flex-col justify-center gap-3 [--d:560ms] sm:w-auto sm:flex-row">
              <WhatsAppButton className="btn-primary">Chiedi il preventivo gratuito</WhatsAppButton>
              <a href="#prezzi" className="btn-ghost">
                Guarda i prezzi
              </a>
            </div>
            <CtaNote className="rise text-inverse-muted [--d:620ms]" />
          </div>

          {/* L'USP in tre parti, in fondo all'apertura */}
          <ul className="rise mb-4 grid border-t border-inverse-fg/15 [--d:720ms] sm:grid-cols-3">
            {HERO_USP.map(([n, title, note], i) => (
              <li key={title} className={`flex items-baseline gap-3 border-inverse-fg/15 py-5 lg:gap-4 lg:py-6 ${i > 0 ? "border-t sm:border-l sm:border-t-0 sm:pl-6" : ""}`}>
                <b className="text-[0.7rem] font-semibold tabular-nums tracking-[0.14em] text-inverse-accent">{n}</b>
                <span>
                  <span className="heading block text-xl sm:text-[1.4rem]">{title}</span>
                  <span className="text-[0.7rem] uppercase tracking-[0.14em] text-inverse-muted">{note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── P · PROBLEMA ────────────────────────────────────────────────
          "Mostra, non dire": una storia concreta invece di "online perdi
          clienti". Poi i 3 problemi e la conseguenza del non agire. */}
      <section id="problema" className="bg-surface-alt py-section">
        <div className="page-container">
          <SectionHead
            index="01"
            label="Ti riconosci?"
            title={
              <>
                Il tuo negozio è curato in ogni dettaglio. <em className="text-accent">Online, invece, sembra chiuso.</em>
              </>
            }
          />

          <div className="grid items-start gap-11 lg:grid-cols-[7fr_5fr] lg:gap-18">
            <Reveal>
              <div className="space-y-5 text-[1.2rem] leading-[1.55] text-fg sm:text-[1.32rem]">
                <p>
                  Sono le nove di sera. Una cliente ha visto una giacca nella tua vetrina e vuole sapere se c’è la sua
                  taglia.
                </p>
                <p>
                  Ti cerca su Google: trova una foto vecchia e degli orari che non sa se sono giusti. Prova su
                  Instagram: niente prezzi, nessun modo di chiedere al volo.
                </p>
              </div>
              <p className="heading mt-8 text-[clamp(2.1rem,1.5rem+2vw,3rem)] italic leading-[1.05] text-fg">
                Dopo due minuti chiude tutto. E compra da chi le ha risposto prima.
              </p>
            </Reveal>

            <div>
              <ul className="border-t border-line">
                {PAINS.map((pain, i) => (
                  <Reveal as="li" key={pain.title} delay={i * 70} className="border-b border-line py-5 text-[0.97rem] text-fg-muted">
                    <b className="heading mb-1.5 block text-[1.7rem] font-normal leading-tight text-fg">{pain.title}</b>
                    {pain.text}
                  </Reveal>
                ))}
              </ul>

              {/* Conseguenza del non agire: l'effetto domino. */}
              <Reveal delay={120} className="mt-7 border-l-[3px] border-inverse-accent bg-inverse px-7 py-6 text-inverse-fg">
                <p className="eyebrow mb-3 text-inverse-accent">E non finisce lì</p>
                <p>
                  Chi non ti trova oggi non torna domani: si abitua a comprare altrove. E ogni settimana il negozio che si
                  fa trovare si prende <strong className="font-semibold text-inverse-accent">i tuoi clienti, e le loro recensioni</strong>.
                  Non perché sia più bravo di te: solo perché si fa trovare.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── S · SOLUZIONE (1/3) ─────────────────────────────────────────
          Cambio di tono: il prodotto entra solo adesso. Prima i vantaggi
          (cosa ci guadagna il titolare), poi l'USP e perché è importante. */}
      <section id="soluzione" className="py-section">
        <div className="page-container">
          <SectionHead
            index="02"
            label="La soluzione"
            title={
              <>
                Un sito che lavora <em className="text-accent">anche quando sei chiuso</em>
              </>
            }
          >
            Per questo è nato {STORE_NAME}: siti vetrina e negozi online per i negozi di {CITY}, fatti per farti trovare,
            farti scrivere e farti scegliere.
          </SectionHead>

          <ul className="grid gap-x-12 border-t border-line md:grid-cols-3">
            {BENEFITS.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 80} className="border-b border-line py-8 md:border-b-0 md:pb-0">
                <span className="text-xs font-semibold tabular-nums tracking-[0.14em] text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="heading mt-4 text-[clamp(2.4rem,1.8rem+2vw,3.4rem)] italic text-fg">{item.title}</h3>
                <p className="mt-3 max-w-[40ch] text-fg-muted">{item.text}</p>
              </Reveal>
            ))}
          </ul>

          {/* USP: perché io e non un'agenzia */}
          <Reveal className="mb-10 mt-section-tight grid items-end gap-6 border-t border-line pt-12 lg:grid-cols-[7fr_4fr] lg:gap-14">
            <h3 className="heading-2 text-fg">
              Perché scegliere me <em className="text-accent">e non un’agenzia?</em>
            </h3>
            <p className="max-w-[44ch] text-fg-muted lg:justify-self-end">
              Tre cose che, messe insieme, un’agenzia non ti offre.
            </p>
          </Reveal>

          <ol className="border-t border-line">
            {USP.map((item, index) => (
              <Reveal
                as="li"
                key={item.title}
                delay={index * 70}
                className="grid grid-cols-[2.75rem_1fr] items-center gap-x-4 gap-y-3 border-b border-line py-8 sm:grid-cols-[5.5rem_1.15fr_1fr] sm:gap-x-6 sm:py-10"
              >
                <span className="text-xs font-semibold tabular-nums tracking-[0.14em] text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h4 className="heading text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] text-fg">{item.title}</h4>
                <p className="col-start-2 max-w-[46ch] text-fg-muted sm:col-start-auto">{item.text}</p>
              </Reveal>
            ))}
          </ol>

          {/* Perché è importante: un valore condiviso con chi legge. */}
          <Reveal as="blockquote" className="heading mx-auto mt-section-tight max-w-[24ch] text-center text-[clamp(2rem,1.4rem+2.2vw,3.2rem)] leading-[1.1] text-fg">
            “I negozi di quartiere sono quello che rende viva {CITY}. <em className="text-accent">Meritano di farsi trovare quanto le catene.</em>”
          </Reveal>
        </div>
      </section>

      {/* ── S · SOLUZIONE (2/3): l'offerta, con i prezzi scritti ────────── */}
      <section id="prezzi" className="bg-surface-alt py-section">
        <div className="page-container">
          <SectionHead
            index="03"
            label="Prezzi"
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
            <details className="accordion group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-7 [&::-webkit-details-marker]:hidden">
                <span className="heading text-[1.75rem] text-fg">Altri servizi, da aggiungere quando servono</span>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong/30 text-xl font-light text-accent transition-[rotate,scale] duration-200 ease-out group-open:rotate-45 group-active:scale-90"
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
                Scrivimi e ti dico io cosa ti serve davvero, <strong className="font-semibold text-fg">anche se è la soluzione che costa meno</strong>.
                Questi prezzi valgono fino al {PRICES_VALID_UNTIL}.
              </p>
            </div>
            <WhatsAppButton className="btn-primary w-full shrink-0 sm:w-auto">Dimmi cosa mi serve</WhatsAppButton>
          </Reveal>
        </div>
      </section>

      {/* ── S · SOLUZIONE (3/3): chiarezza sul post-acquisto ──────────────
          Chi legge deve sapere esattamente cosa succede dopo il primo messaggio. */}
      <section id="come-funziona" className="py-section">
        <div className="page-container">
          <SectionHead
            index="04"
            label="Come funziona"
            title={
              <>
                Ecco cosa succede <em className="text-accent">quando mi scrivi</em>
              </>
            }
          >
            Quattro passi, dal primo messaggio al sito online. Tu ti occupi del negozio, io del resto.
          </SectionHead>

          <ol className="grid gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <Step key={step.title} step={step} number={index + 1} />
            ))}
          </ol>

          <Reveal className="mt-14 flex flex-col items-start gap-1">
            <WhatsAppButton className="btn-primary w-full sm:w-auto">Inizia dal passo 1</WhatsAppButton>
            <CtaNote className="text-fg-muted" />
          </Reveal>
        </div>
      </section>

      {/* ── O · OBIEZIONI: la più forte, con CPB ─────────────────────────
          Claim: "non mi conosci". Proof: 3 prove di tipo diverso (un lavoro
          vero, il lavoro mostrato prima del pagamento, le garanzie).
          Benefit: cosa ci guadagna chi legge, una volta tolto il dubbio. */}
      <section id="lavori" className="bg-inverse py-section text-inverse-fg">
        <div className="page-container">
          <SectionHead
            index="05"
            label="Perché fidarti"
            inverse
            title={
              <>
                Non mi conosci. <em className="text-inverse-accent">Perché dovresti fidarti?</em>
              </>
            }
          >
            Domanda giusta. Non devi farlo sulla parola: ecco tre prove, che puoi verificare da solo.
          </SectionHead>

          {/* Prova 1 */}
          <div className="grid items-center gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
            <ImageReveal>
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
            </ImageReveal>
            <Reveal delay={120}>
              <p className="eyebrow text-inverse-accent">Prova 1 · Un negozio vero, già online</p>
              <h3 className="heading mt-4 border-b border-inverse-fg/15 pb-5 text-[clamp(2.2rem,1.6rem+2vw,3.4rem)]">{LUMIERE.name}</h3>
              <p className="mt-6 text-lg leading-relaxed text-inverse-fg/90">{LUMIERE.text}</p>
              <ul className="mt-6 border-t border-inverse-fg/15 text-inverse-muted">
                {LUMIERE.done.map((item) => (
                  <li key={item} className="border-b border-inverse-fg/15 py-3">
                    {item}
                  </li>
                ))}
              </ul>
              <a href={LUMIERE.url} target="_blank" rel="noopener noreferrer" className="link-more mt-8 hover:text-inverse-accent!">
                Apri {LUMIERE.domain} <span aria-hidden="true">↗</span>
              </a>
            </Reveal>
          </div>

          {/* Prova 2 */}
          <Reveal className="mb-12 mt-section grid items-end gap-6 border-t border-inverse-fg/15 pt-12 lg:grid-cols-[7fr_4fr] lg:gap-14">
            <div>
              <p className="eyebrow text-inverse-accent">Prova 2 · Il lavoro, prima del pagamento</p>
              <h3 className="heading-2 mt-4">
                Come potrebbe essere <em className="text-inverse-accent">il tuo</em>
              </h3>
            </div>
            <p className="max-w-[44ch] text-inverse-muted lg:justify-self-end">
              Ristoranti e B&amp;B veri del Lazio: per ognuno ho studiato l’attività, disegnato un sito su misura e l’ho
              mostrato al titolare, <strong className="font-semibold text-inverse-fg">prima ancora che spendesse un euro</strong>. Sono
              le “Proposte”. Farei lo stesso con il tuo negozio.
            </p>
          </Reveal>

          <MockupShowcase start={2} />

          {/* Prova 3 */}
          <div className="mt-section border-t border-inverse-fg/15 pt-12">
            <Reveal as="p" className="eyebrow text-inverse-accent">
              Prova 3 · Non rischi niente
            </Reveal>
            <ul className="mt-8 grid gap-x-12 md:grid-cols-3">
              {GUARANTEES.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 80} className="border-t border-inverse-fg/15 py-6">
                  <h3 className="heading text-[1.9rem] leading-tight">{item.title}</h3>
                  <p className="mt-2 text-inverse-muted">{item.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Benefit */}
          <Reveal className="mt-14 flex flex-col gap-6 border-t border-inverse-fg/15 pt-10 lg:flex-row lg:items-end lg:justify-between">
            <p className="heading-2 max-w-[22ch]">
              Adesso sai con chi parli. <em className="text-inverse-accent">Resta solo da decidere quando vuoi farti trovare.</em>
            </p>
            <WhatsAppButton className="btn-primary w-full shrink-0 sm:w-auto">Scrivimi su WhatsApp</WhatsAppButton>
          </Reveal>
        </div>
      </section>

      {/* ── C · CTA a metà pagina: conseguenza del non agire + scadenza vera ── */}
      <section className="bg-primary py-section text-center text-primary-fg">
        <div className="page-container">
          <Reveal as="p" className="eyebrow">
            Prezzi validi fino al {PRICES_VALID_UNTIL}
          </Reveal>
          <Reveal as="h2" delay={60} className="heading-1 mx-auto mb-7 mt-6 max-w-[18ch]">
            Ogni settimana che aspetti, <em>qualcuno sceglie un altro negozio.</em>
          </Reveal>
          <Reveal as="p" delay={120} className="mx-auto mb-10 max-w-[50ch] text-lg opacity-85">
            Scrivimi oggi: mi racconti il tuo negozio e ti mando il preventivo. Se non fa per te, me lo dici e finisce lì.
          </Reveal>
          <Reveal delay={180} className="flex flex-col justify-center gap-3 sm:flex-row">
            <WhatsAppButton className="btn-on-primary">Chiedi il preventivo gratuito</WhatsAppButton>
            <a href="#prezzi" className="btn-ghost">
              Rivedi i prezzi
            </a>
          </Reveal>
          <CtaNote className="opacity-75" />
        </div>
      </section>

      {/* ── O · OBIEZIONI: le altre, dalla più forte alla più debole ────── */}
      <section id="domande" className="bg-surface-alt py-section">
        <div className="page-container">
          <SectionHead
            index="06"
            label="Domande"
            title={
              <>
                I dubbi che hanno tutti, <em className="text-accent">prima di scrivermi</em>
              </>
            }
          >
            Non trovi il tuo? Chiedimelo su WhatsApp, ti rispondo io.
          </SectionHead>

          <Reveal className="grid items-start gap-x-16 lg:grid-cols-2">
            {[FAQS.slice(0, Math.ceil(FAQS.length / 2)), FAQS.slice(Math.ceil(FAQS.length / 2))].map((column, c) => (
              <div key={c} className={`border-line ${c === 0 ? "border-t" : "lg:border-t"}`}>
                {column.map((faq) => (
                  <details key={faq.q} className="accordion group border-b border-line">
                    <summary className="relative flex cursor-pointer list-none items-center gap-4 py-6 pr-10 [&::-webkit-details-marker]:hidden">
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-sm font-semibold text-accent transition-[background-color,border-color,color,scale] duration-200 ease-out group-open:border-inverse group-open:bg-inverse group-open:text-inverse-accent group-active:scale-90"
                      >
                        ?
                      </span>
                      <span className="heading text-[1.4rem] leading-tight text-fg sm:text-[1.65rem]">{faq.q}</span>
                      <span
                        aria-hidden="true"
                        className="absolute right-1 top-1/2 -translate-y-1/2 text-2xl font-light text-accent transition-[rotate] duration-200 ease-out group-open:rotate-45"
                      >
                        +
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

      {/* ── C · CALL TO ACTION FINALE ───────────────────────────────────
          CTA profonda (legata al problema, non "contattami") e chiarezza
          su cosa succede quando si preme. */}
      <section id="contatti" className="border-t border-inverse-fg/15 bg-inverse py-section text-inverse-fg">
        <div className="page-container grid items-end gap-12 lg:grid-cols-[7fr_4fr] lg:gap-18">
          <div>
            <Reveal as="p" className="eyebrow text-inverse-accent">
              07 · Contatti
            </Reveal>
            <Reveal as="h2" delay={60} className="heading-display mb-7 mt-6">
              Fai trovare <em className="text-inverse-accent">il tuo negozio.</em>
            </Reveal>
            <Reveal as="p" delay={120} className="max-w-[48ch] text-lg text-inverse-fg/80">
              Premi il pulsante: si apre WhatsApp con il messaggio già scritto. Mi racconti il negozio e io ti dico cosa ti
              serve e quanto costa, <strong className="font-semibold text-inverse-fg">per iscritto</strong>. Se non fa per te,
              finisce lì.
            </Reveal>
            <Reveal as="p" delay={160} className="mt-3 text-sm italic text-inverse-muted">
              “{CONTACT_MESSAGE}”
            </Reveal>
          </div>

          <Reveal delay={180} className="flex flex-col gap-3">
            <div className="mb-3 flex items-center gap-4">
              <Image
                src={ownerPhoto}
                alt={`${OWNER_NAME}, ${STORE_NAME}`}
                sizes="64px"
                className="h-16 w-16 rounded-full object-cover object-[50%_20%] ring-1 ring-inverse-accent ring-offset-2 ring-offset-inverse"
              />
              <div>
                <p className="heading text-2xl">{OWNER_NAME}</p>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-inverse-muted">Ti rispondo io, di persona</p>
              </div>
            </div>
            <WhatsAppButton className="btn-primary w-full justify-between!">
              <span>
                <span className="max-sm:hidden">WhatsApp · </span>
                {PHONE_DISPLAY}
              </span>
            </WhatsAppButton>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-between!">
              <span>
                <span className="max-sm:hidden">Instagram · </span>@{INSTAGRAM}
              </span>
            </a>
            <a href={`mailto:${EMAIL}`} className="btn-ghost w-full justify-between! normal-case! tracking-[0.04em]!">
              {EMAIL}
            </a>
            <p className="mt-2 text-[0.7rem] uppercase tracking-[0.14em] text-inverse-muted">
              Preventivo gratuito · Prezzi validi fino al {PRICES_VALID_UNTIL}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
