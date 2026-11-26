// Progetti reali per la sezione "Come potrebbe essere il tuo": siti fatti per
// attività vere. Le schermate in public/portfolio/ sono screenshot dei siti
// (1440×900 da computer, 390×844 da telefono, a doppia risoluzione).
// I sorgenti dei siti sono in ~/Desktop/LAVORI.
//
// status: "Proposta" = anteprima mandata al titolare, non ancora acquistata.
//         "Cliente"  = sito comprato e online.
// Quando una proposta diventa cliente, cambia lo status (e aggiungi `url`
// per mostrare il link al sito online).
import finestraDesktop from "../public/portfolio/finestra-desktop.jpg";
import finestraMobile from "../public/portfolio/finestra-mobile.jpg";
import lamiciziaDesktop from "../public/portfolio/lamicizia-desktop.jpg";
import lamiciziaMobile from "../public/portfolio/lamicizia-mobile.jpg";
import carpediemDesktop from "../public/portfolio/carpediem-desktop.jpg";
import carpediemMobile from "../public/portfolio/carpediem-mobile.jpg";
import ruminoDesktop from "../public/portfolio/rumino-desktop.jpg";
import ruminoMobile from "../public/portfolio/rumino-mobile.jpg";
import sbDesktop from "../public/portfolio/sbcontents-desktop.jpg";
import sbMobile from "../public/portfolio/sbcontents-mobile.jpg";
import lumiereDesktop from "../public/portfolio/lumiere-desktop.jpg";
import lumiereMobile from "../public/portfolio/lumiere-mobile.jpg";

// I lavori in primo piano: siti fatti e già online, con le schermate vere
// (computer e telefono). Testi e punti presi solo da quello che c'è davvero
// sul sito (niente numeri o risultati inventati).
export const FEATURED_WORKS = [
  {
    name: "SB · Sebastian Balaniuc",
    kind: "Content marketing · Roma",
    status: "Online",
    url: "https://sbcontents.com",
    domain: "sbcontents.com",
    desktop: sbDesktop,
    mobile: sbMobile,
    text: "Il sito di Sebastian, che gira e monta reel e video per le attività: base a Roma, in tutta Italia. È online, puoi aprirlo adesso.",
    points: [
      "Lavori filtrabili per tipo: Reel, Interviste, Brand",
      "Confronto con agenzia e fai da te, riga per riga",
      "Dati sui video con le fonti citate",
    ],
  },
  {
    // Schermate fatte senza l'ombra dei pannelli laterali chiusi (carrello,
    // preferiti...), che sul sito resta visibile al bordo destro: è un bug.
    name: "Lumière Candles",
    kind: "Negozio online · Candele fatte a mano",
    status: "Cliente",
    url: "https://lumierecandle.net",
    domain: "lumierecandle.net",
    desktop: lumiereDesktop,
    mobile: lumiereMobile,
    text: "Candele profumate fatte a mano, che adesso si ordinano in tre tocchi dal telefono, a qualsiasi ora. Puoi aprire il sito adesso e provarlo tu.",
    points: [
      "Catalogo con foto, prezzi e varianti",
      "Ordini e pagamenti online, pensati prima di tutto per il telefono",
      "Prodotti e prezzi aggiornabili in autonomia, senza chiamare nessuno",
    ],
  },
];

export const MOCKUPS = [
  {
    name: "Rumino",
    kind: "Ristorante · Centocelle, Roma",
    status: "Proposta",
    desktop: ruminoDesktop,
    mobile: ruminoMobile,
    points: ["Menù con allergeni, anche in inglese", "Prenotazione del tavolo", "Orari, aperitivo e lo chef in evidenza"],
  },
  {
    name: "Carpe Diem",
    kind: "B&B · Castel Gandolfo",
    status: "Proposta",
    desktop: carpediemDesktop,
    mobile: carpediemMobile,
    points: ["Due sedi in un unico sito", "Calendario delle disponibilità", "In italiano e in inglese"],
  },
  {
    name: "L’Amicizia",
    kind: "B&B · Montefiascone",
    status: "Proposta",
    desktop: lamiciziaDesktop,
    mobile: lamiciziaMobile,
    points: ["Recensioni Google in primo piano", "Verifica disponibilità in un tocco", "Camere, colazione e dintorni"],
  },
  {
    name: "La Finestra sul Lago",
    kind: "B&B · Ronciglione",
    status: "Proposta",
    desktop: finestraDesktop,
    mobile: finestraMobile,
    points: ["Apertura con la vista sul lago di Vico", "Camere e sentiero per il lago", "Pulsante “Scrivici” sempre a portata"],
  },
];
