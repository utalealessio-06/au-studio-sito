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

// Siti fatti e già online. Testi e punti presi solo da quello che c'è
// davvero sul sito (niente numeri o risultati inventati).
export const LIVE_WORKS = [
  {
    name: "SB · Sebastian Balaniuc",
    kind: "Content marketing · Roma",
    status: "Online",
    url: "https://sbcontents.com",
    desktop: sbDesktop,
    mobile: sbMobile,
    points: [
      "Lavori filtrabili per tipo: Reel, Interviste, Brand",
      "Confronto con agenzia e fai da te, riga per riga",
      "Dati sui video con le fonti citate",
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
