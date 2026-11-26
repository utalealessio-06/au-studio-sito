// Recensioni VERE dei clienti: testo esatto come l'hanno mandato (si può
// accorciare, mai cambiare il senso), con nome, attività e sito, così chi
// legge può controllare. Niente recensioni inventate o "di esempio".
//
// Finché l'elenco è vuoto, la sezione "Recensioni" sul sito online non
// compare; in anteprima (npm run dev) si vede con un riquadro segnaposto.
//
// Modello di una recensione:
// {
//   testo: "Il testo esatto del cliente",
//   nome: "Sebastian Balaniuc",
//   attivita: "SB · Content marketing",
//   sito: "https://sbcontents.com",   // facoltativo
//   fonte: "WhatsApp",                 // dove l'ha scritta: WhatsApp, Google...
//   data: "novembre 2026",             // facoltativo
// }
export const RECENSIONI = [
  {
    testo:
      "Alessio è stato molto veloce e preciso, ci sono state delle cose da modificare e le ha fatte in giornata senza problemi. Per quanto riguarda il lavoro, mi ha fatto un bel sito, pulito e secondo le mie esigenze!",
    nome: "Sebastian Balaniuc",
    attivita: "SB · Content marketing",
    sito: "https://sbcontents.com",
    fonte: "WhatsApp",
    data: "novembre 2026",
  },
];

// Solo per il segnaposto in anteprima: da chi si aspetta una recensione.
export const RECENSIONI_IN_ARRIVO = [];
