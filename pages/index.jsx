import Head from "next/head";
import Image from "next/image";
import MockupShowcase from "../components/MockupShowcase";
import { LIVE_WORKS, MOCKUPS } from "../lib/portfolio";
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
import { whatsappUrl } from "../lib/store";
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
// Nella pila di pillole a destra del titolo.
const HERO_USP = [
  ["Prezzo scritto", "prima di cominciare"],
  ["Online in 5–7 giorni", "non in tre mesi"],
  ["Una persona sola", "ti rispondo io"],
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
  return <p className={`mt-3 text-xs text-fg-subtle ${className}`}>{children}</p>;
}

// Etichetta della sezione: una piccola pillola con numero e nome.
function Chip({ n, children }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-4 text-xs text-fg-muted">
      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-accent-soft px-1.5 tabular-nums text-fg">{n}</span>
      {children}
    </span>
  );
}

const CARD = "rounded-panel border border-line bg-surface shadow-card";

// Layout "a due colonne": a sinistra il titolo resta fermo (sticky) mentre
// a destra scorrono le card. `aside` va sotto il titolo (es. un CTA).
function Split({ id, n, label, title, intro, aside, children, className = "" }) {
  return (
    <section id={id} className={`py-section ${className}`}>
      <div className="page-container grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Chip n={n}>{label}</Chip>
          </Reveal>
          <Reveal as="h2" delay={60} className="heading-1 mt-6 text-fg">
            {title}
          </Reveal>
          {intro && (
            <Reveal as="p" delay={120} className="mt-5 max-w-[42ch] text-lg text-fg-muted">
              {intro}
            </Reveal>
          )}
          {aside && (
            <Reveal delay={160} className="mt-8">
              {aside}
            </Reveal>
          )}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

// Intestazione centrata, per le sezioni a tutta larghezza.
function CenterHead({ n, label, title, intro }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
      <Reveal>
        <Chip n={n}>{label}</Chip>
      </Reveal>
      <Reveal as="h2" delay={60} className="heading-1 mt-6 text-fg">
        {title}
      </Reveal>
      {intro && (
        <Reveal as="p" delay={120} className="mx-auto mt-5 max-w-[48ch] text-lg text-fg-muted">
          {intro}
        </Reveal>
      )}
    </div>
  );
}

// Un passo di "Come funziona": quando la card arriva sullo schermo il
// numero si accende, un passo dopo l'altro (scaglionamento breve).
function Step({ step, number }) {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -15% 0px", once: true });
  const lit = inView !== false;
  const delay = { transitionDelay: `${(number - 1) * 110}ms` };

  return (
    <li ref={ref} className={`${CARD} p-7`}>
      <span
        style={delay}
        className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-medium tabular-nums transition-[background-color,color] duration-500 ease-out ${
          lit ? "bg-primary text-primary-fg" : "bg-accent-soft text-fg-muted"
        }`}
      >
        {String(number).padStart(2, "0")}
      </span>
      <h3 className="heading-3 mt-8 text-fg">{step.title}</h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">{step.text}</p>
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

// La pila di pillole dell'apertura, come la palette: avorio, tortora chiaro,
// tortora, ognuna appoggiata sulla precedente. L'ultima, nel colore del
// bottone principale, è il contatto diretto. Entrano una dopo l'altra (ritardi non uniformi).
const PILL_TONES = ["bg-surface text-fg", "bg-accent-soft text-fg", "bg-line-strong text-fg"];
const PILL_DELAYS = ["[--d:320ms]", "[--d:390ms]", "[--d:470ms]", "[--d:560ms]"];

function PillStack() {
  return (
    <ul className="relative mx-auto w-full max-w-md lg:max-w-none">
      {HERO_USP.map(([title, note], i) => (
        <li
          key={title}
          style={{ zIndex: i + 1 }}
          className={`rise relative ${i > 0 ? "-mt-9" : ""} rounded-full px-8 pb-12 pt-5 shadow-pop ring-1 ring-fg/5 sm:px-10 ${PILL_TONES[i]} ${PILL_DELAYS[i]}`}
        >
          <span className="text-xs tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
          <span className="heading ml-3 text-xl sm:text-2xl">{title}</span>
          <span className="ml-3 text-sm opacity-70 max-sm:hidden">· {note}</span>
        </li>
      ))}
      <li style={{ zIndex: 9 }} className={`rise relative -mt-9 ${PILL_DELAYS[3]}`}>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-full bg-primary py-5 pl-5 pr-8 text-primary-fg shadow-pop transition-[background-color,transform] duration-160 ease-out hover:bg-primary-hover active:scale-[0.98] sm:pl-6"
        >
          <Image
            src={ownerPhoto}
            alt=""
            sizes="56px"
            preload
            className="h-12 w-12 shrink-0 rounded-full object-cover object-[50%_20%] sm:h-14 sm:w-14"
          />
          <span className="min-w-0 flex-1">
            <span className="heading block text-xl sm:text-2xl">{OWNER_NAME}</span>
            <span className="block text-sm opacity-70">Ti rispondo io, su WhatsApp</span>
          </span>
          <span aria-hidden="true" className="text-xl transition-transform duration-200 ease-out group-hover:translate-x-1">
            →
          </span>
        </a>
      </li>
    </ul>
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
          Titolo sul pain point a sinistra, l'USP come pila di pillole a
          destra. Luce morbida dall'alto a sinistra, come nella palette. */}
      <section className="glow relative flex min-h-[min(100svh,58rem)] items-center pb-16 pt-32 lg:pt-36">
        <div className="page-container grid w-full items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <p className="rise">
              <Chip n="AU">Siti per i negozi di {CITY}</Chip>
            </p>

            <h1 className="heading mt-7 text-[clamp(2.7rem,1.5rem+4vw,5.4rem)] text-fg">
              <span className="rise block [--d:80ms]">Alle otto abbassi la saracinesca.</span>
              <em className="wipe mt-1 block text-accent [--d:300ms]">I tuoi clienti continuano a cercarti.</em>
            </h1>

            <p className="rise mt-7 max-w-[50ch] text-lg text-fg-muted [--d:440ms] sm:text-xl">
              Ti preparo il sito che fa trovare il tuo negozio su Google anche quando sei chiuso: orari, prezzi e un
              pulsante per scriverti su WhatsApp. <strong className="font-medium text-fg">Pronto in pochi giorni</strong>, con il{" "}
              <strong className="font-medium text-fg">prezzo scritto</strong> prima di cominciare.
            </p>

            <div className="rise mt-9 flex flex-col gap-3 [--d:520ms] sm:flex-row">
              <WhatsAppButton className="btn-primary">Chiedi il preventivo gratuito</WhatsAppButton>
              <a href="#prezzi" className="btn-ghost">
                Guarda i prezzi
              </a>
            </div>
            <CtaNote className="rise [--d:580ms]" />
          </div>

          <PillStack />
        </div>
      </section>

      {/* ── P · PROBLEMA ────────────────────────────────────────────────
          "Mostra, non dire": una storia concreta, i 3 problemi e la
          conseguenza del non agire. */}
      <Split
        id="problema"
        n="01"
        label="Ti riconosci?"
        title={
          <>
            Il tuo negozio è curato in ogni dettaglio. <em className="text-accent">Online, invece, sembra chiuso.</em>
          </>
        }
      >
        <Reveal className={`${CARD} p-8 sm:p-12`}>
          <div className="space-y-5 text-[1.15rem] leading-[1.6] text-fg-muted sm:text-[1.3rem]">
            <p>
              Sono le nove di sera. Una cliente ha visto una giacca nella tua vetrina e vuole sapere se c’è la sua taglia.
            </p>
            <p>
              Ti cerca su Google: trova una foto vecchia e degli orari che non sa se sono giusti. Prova su Instagram: niente
              prezzi, nessun modo di chiedere al volo.
            </p>
          </div>
          <p className="heading mt-8 text-[clamp(1.8rem,1.3rem+1.8vw,2.6rem)] text-fg">
            Dopo due minuti chiude tutto. <em className="text-accent">E compra da chi le ha risposto prima.</em>
          </p>
        </Reveal>

        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {PAINS.map((pain, i) => (
            <Reveal as="li" key={pain.title} delay={i * 70} className={`${CARD} p-6`}>
              <b className="heading block text-xl font-medium leading-tight text-fg">{pain.title}</b>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{pain.text}</p>
            </Reveal>
          ))}
        </ul>

        {/* Conseguenza del non agire: l'effetto domino. */}
        <Reveal delay={120} className="mt-3 rounded-panel bg-accent-soft p-8 sm:p-10">
          <p className="eyebrow text-fg-muted">E non finisce lì</p>
          <p className="mt-4 text-lg text-fg">
            Chi non ti trova oggi non torna domani: si abitua a comprare altrove. E ogni settimana il negozio che si fa
            trovare si prende <strong className="font-semibold">i tuoi clienti, e le loro recensioni</strong>. Non perché sia più
            bravo di te: solo perché si fa trovare.
          </p>
        </Reveal>
      </Split>

      {/* ── S · SOLUZIONE (1/3) ─────────────────────────────────────────
          Cambio di tono: il prodotto entra solo adesso. Prima i vantaggi,
          poi l'USP, poi un valore condiviso. */}
      <section id="soluzione" className="py-section">
        <div className="page-container">
          <CenterHead
            n="02"
            label="La soluzione"
            title={
              <>
                Un sito che lavora <em className="text-accent">anche quando sei chiuso</em>
              </>
            }
            intro={`Per questo è nato ${STORE_NAME}: siti vetrina e negozi online per i negozi di ${CITY}, fatti per farti trovare, farti scrivere e farti scegliere.`}
          />

          <ul className="grid gap-3 md:grid-cols-3">
            {BENEFITS.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 80} className={`${CARD} flex flex-col p-8 sm:p-10`}>
                <span className="text-xs tabular-nums text-fg-subtle">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="heading mt-12 text-[clamp(2.2rem,1.7rem+1.6vw,3rem)] text-fg">
                  <em className="text-accent">{item.title}</em>
                </h3>
                <p className="mt-4 text-fg-muted">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Split
        n="02"
        label="Perché io"
        className="pt-0!"
        title={
          <>
            Perché scegliere me <em className="text-accent">e non un’agenzia?</em>
          </>
        }
        intro="Tre cose che, messe insieme, un’agenzia non ti offre."
      >
        <ol className="space-y-3">
          {USP.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 70} className={`${CARD} grid gap-4 p-7 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-9`}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-sm tabular-nums text-fg">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="heading-2 text-fg">{item.title}</h3>
                <p className="mt-3 max-w-[50ch] text-fg-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Perché è importante: un valore condiviso con chi legge. */}
        <Reveal as="blockquote" className="heading mt-12 text-[clamp(1.8rem,1.3rem+1.8vw,2.6rem)] leading-[1.15] text-fg">
          “I negozi di quartiere sono quello che rende viva {CITY}. <em className="text-accent">Meritano di farsi trovare quanto le catene.</em>”
        </Reveal>
      </Split>

      {/* ── S · SOLUZIONE (2/3): l'offerta, con i prezzi scritti ────────── */}
      <Split
        id="prezzi"
        n="03"
        label="Prezzi"
        title={
          <>
            Scegli la strada <em className="text-accent">giusta per te</em>
          </>
        }
        intro="Tocca una strada per vedere cosa include. Parti da quello che ti serve oggi e aggiungi il resto solo quando serve."
        aside={
          <div className={`${CARD} p-7`}>
            <p className="heading-3 text-fg">
              Non sai quale <em className="text-accent">scegliere?</em>
            </p>
            <p className="mt-2 text-sm text-fg-muted">
              Scrivimi e ti dico io cosa ti serve davvero,{" "}
              <strong className="font-medium text-fg">anche se è la soluzione che costa meno</strong>. Prezzi validi fino al{" "}
              {PRICES_VALID_UNTIL}.
            </p>
            <WhatsAppButton className="btn-primary btn-sm mt-5">Dimmi cosa mi serve</WhatsAppButton>
          </div>
        }
      >
        <PathCards />

        <Reveal className="mt-3">
          <details className={`accordion group ${CARD}`}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 sm:px-8 [&::-webkit-details-marker]:hidden">
              <span className="heading text-xl text-fg">Altri servizi, da aggiungere quando servono</span>
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xl font-light text-fg transition-[rotate,scale] duration-200 ease-out group-open:rotate-45 group-active:scale-90"
              >
                +
              </span>
            </summary>
            <ul className="border-t border-line px-6 sm:px-8">
              {EXTRAS.map((item) => (
                <PriceRow key={item.name} {...item} />
              ))}
            </ul>
          </details>
        </Reveal>
      </Split>

      {/* ── S · SOLUZIONE (3/3): chiarezza sul post-acquisto ──────────── */}
      <section id="come-funziona" className="py-section">
        <div className="page-container">
          <CenterHead
            n="04"
            label="Come funziona"
            title={
              <>
                Ecco cosa succede <em className="text-accent">quando mi scrivi</em>
              </>
            }
            intro="Quattro passi, dal primo messaggio al sito online. Tu ti occupi del negozio, io del resto."
          />

          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <Step key={step.title} step={step} number={index + 1} />
            ))}
          </ol>

          <Reveal className="mt-12 flex flex-col items-center text-center">
            <WhatsAppButton className="btn-primary">Inizia dal passo 1</WhatsAppButton>
            <CtaNote />
          </Reveal>
        </div>
      </section>

      {/* ── O · OBIEZIONI: la più forte, con CPB ─────────────────────────
          Claim "non mi conosci", 3 prove di tipo diverso, Benefit. */}
      <section id="lavori" className="py-section">
        <div className="page-container">
          <CenterHead
            n="05"
            label="Perché fidarti"
            title={
              <>
                Non mi conosci. <em className="text-accent">Perché dovresti fidarti?</em>
              </>
            }
            intro="Domanda giusta. Non devi farlo sulla parola: ecco tre prove, che puoi verificare da solo. I siti sono online: aprili."
          />

          {/* Prova 1 */}
          <Reveal className={`${CARD} grid items-center gap-8 p-3 sm:p-4 lg:grid-cols-[7fr_5fr] lg:gap-12`}>
            <ImageReveal>
              <a href={LUMIERE.url} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-[calc(var(--r-panel)-0.75rem)]">
                <Image
                  src={lumierePhoto}
                  alt="Candela Raspberry Delight di Lumière Candles"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  placeholder="blur"
                  className="card-zoom aspect-16/11 w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-glass px-3 py-1.5 text-xs text-fg backdrop-blur">
                  Cliente · Negozio online
                </span>
              </a>
            </ImageReveal>
            <div className="px-4 pb-6 lg:py-6 lg:pr-8">
              <p className="eyebrow text-fg-subtle">Prova 1 · Lavori veri, già online</p>
              <h3 className="heading-2 mt-4 text-fg">{LUMIERE.name}</h3>
              <p className="mt-4 text-fg-muted">{LUMIERE.text}</p>
              <ul className="mt-6 space-y-2">
                {LUMIERE.done.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-fg-muted">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={LUMIERE.url} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm mt-8">
                Apri {LUMIERE.domain}
              </a>
            </div>
          </Reveal>

          {/* Prova 1, continua: gli altri siti online (lib/portfolio.js → LIVE_WORKS) */}
          <div className="mt-grid">
            <MockupShowcase items={LIVE_WORKS} start={2}>
              {LIVE_WORKS.length % 2 === 1 && (
                <Reveal as="li" delay={90} className="flex flex-col justify-end rounded-panel border border-dashed border-line-strong p-8 sm:p-10">
                  <p className="eyebrow text-fg-subtle">Il prossimo</p>
                  <p className="heading-2 mt-4 text-fg">
                    Può essere <em className="text-accent">il tuo negozio.</em>
                  </p>
                  <p className="mt-3 text-fg-muted">Scrivimi: ti preparo un’idea per il tuo sito e il preventivo, gratis.</p>
                  <WhatsAppButton className="btn-primary btn-sm mt-6 self-start">Scrivimi su WhatsApp</WhatsAppButton>
                </Reveal>
              )}
            </MockupShowcase>
          </div>

          {/* Prova 2 */}
          <Reveal className="mb-8 mt-section-tight grid items-end gap-4 lg:grid-cols-[7fr_5fr] lg:gap-12">
            <div>
              <p className="eyebrow text-fg-subtle">Prova 2 · Il lavoro, prima del pagamento</p>
              <h3 className="heading-2 mt-4 text-fg">
                Come potrebbe essere <em className="text-accent">il tuo</em>
              </h3>
            </div>
            <p className="text-fg-muted">
              Ristoranti e B&amp;B veri del Lazio: per ognuno ho studiato l’attività, disegnato un sito su misura e l’ho
              mostrato al titolare, <strong className="font-medium text-fg">prima ancora che spendesse un euro</strong>. Farei lo
              stesso con il tuo negozio.
            </p>
          </Reveal>

          <MockupShowcase items={MOCKUPS} start={2 + LIVE_WORKS.length} />

          {/* Prova 3 */}
          <Reveal as="p" className="eyebrow mt-section-tight text-fg-subtle">
            Prova 3 · Non rischi niente
          </Reveal>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {GUARANTEES.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 80} className={`${CARD} p-8`}>
                <h3 className="heading-3 text-fg">{item.title}</h3>
                <p className="mt-3 text-fg-muted">{item.text}</p>
              </Reveal>
            ))}
          </ul>

          {/* Benefit */}
          <Reveal className="mt-3 flex flex-col gap-6 rounded-panel bg-accent-soft p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <p className="heading-2 max-w-[24ch] text-fg">
              Adesso sai con chi parli. <em className="text-accent">Resta solo da decidere quando vuoi farti trovare.</em>
            </p>
            <WhatsAppButton className="btn-primary w-full shrink-0 sm:w-auto">Scrivimi su WhatsApp</WhatsAppButton>
          </Reveal>
        </div>
      </section>

      {/* ── C · CTA a metà pagina: la pillola chiara della palette ─────── */}
      <section className="px-3 sm:px-5">
        <Reveal className="relative mx-auto max-w-[var(--sp-container)] overflow-hidden rounded-panel bg-primary px-6 py-section text-center text-primary-fg">
          <p className="eyebrow opacity-70">Prezzi validi fino al {PRICES_VALID_UNTIL}</p>
          <h2 className="heading-1 mx-auto mb-6 mt-6 max-w-[18ch]">
            Ogni settimana che aspetti, <em>qualcuno sceglie un altro negozio.</em>
          </h2>
          <p className="mx-auto mb-10 max-w-[50ch] text-lg opacity-75">
            Scrivimi oggi: mi racconti il tuo negozio e ti mando il preventivo. Se non fa per te, me lo dici e finisce lì.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <WhatsAppButton className="btn-on-primary">Chiedi il preventivo gratuito</WhatsAppButton>
            <a href="#prezzi" className="btn-ghost">
              Rivedi i prezzi
            </a>
          </div>
          <p className="mt-4 text-xs opacity-60">Si apre WhatsApp con il messaggio già scritto · Nessun impegno</p>
        </Reveal>
      </section>

      {/* ── O · OBIEZIONI: le altre, dalla più forte alla più debole ────── */}
      <Split
        id="domande"
        n="06"
        label="Domande"
        title={
          <>
            I dubbi che hanno tutti, <em className="text-accent">prima di scrivermi</em>
          </>
        }
        intro="Non trovi il tuo? Chiedimelo su WhatsApp, ti rispondo io."
      >
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={Math.min(i, 4) * 40}>
              <details className="accordion group rounded-card border border-line bg-surface transition-[border-color] duration-200 open:border-line-strong">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="text-[1.05rem] font-medium text-fg">{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-lg font-light text-fg transition-[rotate,scale,background-color,color] duration-200 ease-out group-open:rotate-45 group-open:bg-primary group-open:text-primary-fg group-active:scale-90"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[62ch] px-6 pb-6 text-fg-muted">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Split>

      {/* ── C · CALL TO ACTION FINALE ───────────────────────────────────
          CTA profonda (legata al problema) e chiarezza su cosa succede. */}
      <section id="contatti" className="px-3 pb-section sm:px-5">
        <Reveal className="glow mx-auto grid max-w-[var(--sp-container)] items-end gap-12 rounded-panel border border-line p-8 sm:p-12 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:p-16">
          <div>
            <Chip n="07">Contatti</Chip>
            <h2 className="heading-display mt-6 text-fg">
              Fai trovare <em className="text-accent">il tuo negozio.</em>
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg text-fg-muted">
              Premi il pulsante: si apre WhatsApp con il messaggio già scritto. Mi racconti il negozio e io ti dico cosa ti
              serve e quanto costa, <strong className="font-medium text-fg">per iscritto</strong>. Se non fa per te, finisce lì.
            </p>
            <p className="mt-3 text-sm italic text-fg-subtle">“{CONTACT_MESSAGE}”</p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="mb-3 flex items-center gap-4">
              <Image
                src={ownerPhoto}
                alt={`${OWNER_NAME}, ${STORE_NAME}`}
                sizes="64px"
                className="h-16 w-16 rounded-full object-cover object-[50%_20%] ring-1 ring-line-strong ring-offset-2 ring-offset-bg"
              />
              <div>
                <p className="heading text-2xl text-fg">{OWNER_NAME}</p>
                <p className="text-sm text-fg-muted">Ti rispondo io, di persona</p>
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
            <a href={`mailto:${EMAIL}`} className="btn-ghost w-full justify-between!">
              {EMAIL}
            </a>
            <p className="mt-2 text-xs text-fg-subtle">Preventivo gratuito · Prezzi validi fino al {PRICES_VALID_UNTIL}</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
