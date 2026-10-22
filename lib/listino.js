// Prezzi e servizi, presi dal listino LISTINO-PREZZI-AU-STUDIO-NUOVO.pdf.
// Quando cambia il listino si aggiorna solo questo file.

export const PRICES_VALID_UNTIL = "31 dicembre 2026";

// 1. Senza vendita online
export const VETRINA = {
  eyebrow: "Senza vendita online",
  question: "Vuoi farti trovare e far venire gente in negozio?",
  title: "Sito vetrina",
  intro: "Un solo canone al mese, tutto compreso. Niente spedizioni: i clienti ti scrivono o passano a trovarti.",
  price: "€35",
  unit: "/ mese",
  setup: "più €150 di attivazione, una volta sola",
  terms: "Minimo 12 mesi, poi continui mese per mese e disdici quando vuoi.",
  features: [
    "Sito con il tuo nome, logo, colori e foto",
    "Fino a 30 prodotti con foto, prezzo e taglie",
    "Pulsanti “Scrivimi su WhatsApp” e “Vieni a trovarci”",
    "Hosting e dominio inclusi: li pago io",
    "Fino a 4 aggiornamenti al mese: nuovi arrivi, prezzi, foto",
    "Perfetto da telefono e computer",
  ],
};

// 2. Con vendita online
export const SHOPIFY = {
  eyebrow: "Con vendita online",
  question: "Vuoi vendere online e spedire?",
  title: "Negozio Shopify",
  intro: "Paghi una volta sola. Pagamenti, spedizioni e ordini già pronti. Il negozio è intestato a te e resta tuo.",
  plans: [
    {
      name: "Boutique",
      for: "Per iniziare a vendere online.",
      price: "€350",
      features: [
        "Tema scelto da te, con logo e colori",
        "Fino a 30 prodotti con taglie e colori",
        "Pagamenti online",
        "Spedizioni e ritiro in negozio",
        "Pagine chi siamo, resi, privacy",
        "Formazione e 2 settimane di assistenza",
      ],
    },
    {
      name: "Negozio",
      for: "Se hai tante collezioni e clienti anche turisti.",
      price: "€550",
      popular: true,
      includes: "Tutto di Boutique, più:",
      features: [
        "Fino a 80 prodotti",
        "Negozio anche in inglese",
        "Codici sconto e saldi",
        "Shop Instagram e Facebook",
        "1 mese di assistenza",
      ],
    },
    {
      name: "Completo",
      for: "Se vuoi il negozio pronto a crescere.",
      price: "€850",
      includes: "Tutto di Negozio, più:",
      features: [
        "Fino a 200 prodotti",
        "Grafica più personalizzata",
        "SEO di base e scheda Google",
        "Newsletter con prima campagna",
        "2 mesi di assistenza",
      ],
    },
  ],
  light: {
    name: "Avvio Shopify",
    text: "Preferisci caricare tu i prodotti? Imposto io tema, pagamenti, spedizioni, pagine legali e dominio. Ti insegno a caricare i prodotti in una sessione di formazione.",
    price: "€150",
  },
  note: "L’abbonamento a Shopify, il dominio e le commissioni sui pagamenti li paghi direttamente a Shopify e ai fornitori.",
};

// 3. Per tutti, anche senza sito
export const CLIENTI = {
  eyebrow: "Per tutti",
  question: "Vuoi più gente che entra dalla porta?",
  title: "Più clienti in negozio",
  intro: "Ti faccio trovare da chi è vicino al negozio. Puoi aggiungere questi servizi quando vuoi, anche più avanti.",
  items: [
    {
      name: "Scheda Google",
      text: "Creo o sistemo la tua scheda su Google Maps: descrizione, orari, foto, prodotti, recensioni.",
      price: "€50",
    },
    {
      name: "Card recensioni Google NFC",
      text: "Una card con il tuo logo da tenere in cassa: il cliente avvicina il telefono e lascia subito una recensione.",
      price: "€35",
      unit: "a card",
    },
    {
      name: "Pubblicità locale",
      text: "Annunci Instagram e Facebook mostrati solo a chi è vicino al negozio, con un report a fine mese. Il budget per gli annunci è a parte.",
      price: "da €150",
      unit: "al mese",
    },
  ],
};

// Tutti gli altri servizi aggiuntivi del listino.
export const EXTRAS = [
  { name: "Gestione mensile negozio", text: "Nuovi arrivi, prezzi, foto, saldi e piccole modifiche al negozio Shopify.", price: "€50", unit: "al mese" },
  { name: "Modifica singola", text: "Una modifica quando serve, senza abbonamento.", price: "da €25" },
  { name: "Prodotti extra", text: "Foto, descrizioni e taglie oltre i prodotti inclusi.", price: "€3", unit: "a prodotto" },
  { name: "Versione in inglese", text: "Per il sito vetrina o per Boutique, pensata per i turisti.", price: "€120" },
  { name: "SEO di base", text: "Titoli, descrizioni e struttura per comparire meglio su Google.", price: "€100" },
  { name: "Newsletter", text: "Modulo di iscrizione, email con i tuoi colori e prima campagna pronta.", price: "€100" },
  { name: "Gestione newsletter", text: "Preparo e invio 2 email al mese: nuovi arrivi, promozioni, eventi.", price: "€50", unit: "al mese" },
  { name: "Shop Instagram e Facebook", text: "Collego il catalogo, così puoi taggare i prodotti nei post.", price: "€80" },
  { name: "Privacy e cookie", text: "Banner cookie e pagine privacy con testi standard, da far verificare al tuo consulente.", price: "€50" },
];
