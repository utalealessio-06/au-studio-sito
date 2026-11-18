// Progetti dimostrativi per la sezione "Lavori": negozi inventati, uno per
// ciascuna strada del listino. Le schermate sono SVG in public/portfolio/
// (1200×1500 da computer, 360×760 da telefono) con i colori del "cliente",
// non del tema: valgono come foto.
// Sul sito sono sempre presentati come esempi, non come clienti reali.
import panificioDesktop from "../public/portfolio/panificio-desktop.svg";
import panificioMobile from "../public/portfolio/panificio-mobile.svg";
import atelierDesktop from "../public/portfolio/atelier-desktop.svg";
import atelierMobile from "../public/portfolio/atelier-mobile.svg";
import pelletteriaDesktop from "../public/portfolio/pelletteria-desktop.svg";
import pelletteriaMobile from "../public/portfolio/pelletteria-mobile.svg";
import { SHOPIFY, VETRINA } from "./listino";

// I prezzi arrivano da lib/listino.js: se cambia il listino, cambiano anche qui.
const plan = (name) => SHOPIFY.plans.find((p) => p.name === name);

export const MOCKUPS = [
  {
    name: "Panificio Rosa",
    kind: "Forno di quartiere",
    path: "Sito vetrina",
    price: `${VETRINA.price} al mese ${VETRINA.setup.replace(/, una volta sola$/, "")}, minimo 6 mesi. Oppure ${VETRINA.once.price} ${VETRINA.once.unit}`,
    domain: "panificio-rosa.esempio",
    desktop: panificioDesktop,
    mobile: panificioMobile,
    points: ["Prodotti del giorno con i prezzi", "Ordini e prenotazioni su WhatsApp", "Orari, “aperto ora” e mappa"],
  },
  {
    name: "Atelier Viola",
    kind: "Boutique di abbigliamento",
    path: "Negozio Shopify · Boutique",
    price: `${plan("Boutique").price} una volta sola`,
    domain: "atelier-viola.esempio",
    desktop: atelierDesktop,
    mobile: atelierMobile,
    points: ["Taglie e colori per ogni capo", "Pagamenti online con carta e PayPal", "Spedizione o ritiro in negozio"],
  },
  {
    name: "Pelletteria Corvo",
    kind: "Laboratorio artigiano",
    path: "Negozio Shopify · Negozio",
    price: `${plan("Negozio").price} una volta sola`,
    domain: "pelletteria-corvo.esempio",
    desktop: pelletteriaDesktop,
    mobile: pelletteriaMobile,
    points: ["In italiano e in inglese per i turisti", "Codici sconto per il primo ordine", "Spedizioni in tutto il mondo"],
  },
];
