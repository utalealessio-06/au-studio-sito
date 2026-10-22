import { Libre_Baskerville, Source_Sans_3 } from "next/font/google";

// CLASSICO SARTORIALE: blu notte e oro su fondo avorio, come l'etichetta di
// una sartoria. Titoli in un Baskerville classico, testo in un sans sobrio,
// angoli appena accennati, griglia ordinata a tre colonne e card con un
// filo sottile al posto delle ombre. In modalità scura il blu notte diventa
// lo sfondo e l'oro passa ai bottoni.

// I font si caricano qui con next/font: vengono ospitati dal sito stesso
// (nessuna richiesta a Google, ok GDPR) e si scaricano solo quelli del tema attivo.
const headingFont = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
});

const theme = {
  name: "classico-sartoriale",
  label: "Classico sartoriale",

  fonts: {
    heading: headingFont,
    body: bodyFont,
  },

  colors: {
    light: {
      bg: "#fbfaf6",
      surface: "#ffffff",
      surfaceAlt: "#f3efe4",
      fg: "#14213d",
      fgMuted: "#4f5b75",
      fgSubtle: "#98a0b3",
      line: "#e3dccb",
      lineStrong: "#14213d",
      primary: "#14213d",
      primaryFg: "#fbfaf6",
      primaryHover: "#24365f",
      accent: "#94722a", // oro scuro: leggibile anche come testo piccolo
      accentFg: "#ffffff",
      accentSoft: "#f5ecd6",
      inverse: "#0f1a33",
      inverseFg: "#f4ecd8",
      inverseMuted: "#b5bccd",
      sale: "#a3242f",
      success: "#2f6b4a",
      successSoft: "#e7f1ea",
      danger: "#a3242f",
      glass: "rgba(251, 250, 246, 0.94)",
      focus: "#94722a",
      placeholderFrom: "#f3efe4",
      placeholderTo: "#e2d9c3",
      placeholderInk: "#14213d",
      placeholderGlow: "rgba(255, 255, 255, 0.35)",
    },
    dark: {
      bg: "#0b1222",
      surface: "#111a2e",
      surfaceAlt: "#152039",
      fg: "#f1ead8",
      fgMuted: "#b3b9c9",
      fgSubtle: "#6b7590",
      line: "#24304d",
      lineStrong: "#d4b46a",
      primary: "#d4b46a",
      primaryFg: "#0b1222",
      primaryHover: "#e2c682",
      accent: "#d4b46a",
      accentFg: "#0b1222",
      accentSoft: "#1f2a44",
      inverse: "#070c18",
      inverseFg: "#f1ead8",
      inverseMuted: "#9aa2b8",
      sale: "#ef7f88",
      success: "#8fc9a5",
      successSoft: "#13261d",
      danger: "#ef7f88",
      glass: "rgba(11, 18, 34, 0.88)",
      focus: "#d4b46a",
      placeholderFrom: "#152039",
      placeholderTo: "#1e2b49",
      placeholderInk: "#d4b46a",
      placeholderGlow: "rgba(255, 255, 255, 0.04)",
    },
  },

  typography: {
    headingWeight: 400,
    headingTracking: "0em",
    headingCase: "none",
    headingLeading: 1.15,
    headingScale: 0.95, // moltiplica tutte le dimensioni dei titoli
    eyebrowSize: "0.7rem",
    eyebrowWeight: 600,
    eyebrowTracking: "0.22em",
    eyebrowCase: "uppercase",
  },

  radius: {
    btn: "2px",
    input: "2px",
    chip: "2px",
    badge: "2px",
    card: "4px",
    media: "4px",
    panel: "4px",
  },

  spacing: {
    container: "76rem", // larghezza massima dei contenuti
    gutter: "clamp(1rem, 4vw, 2.5rem)", // margini laterali
    section: "clamp(4rem, 3rem + 4vw, 6.5rem)", // aria sopra/sotto le sezioni
    sectionTight: "clamp(2.5rem, 2rem + 2vw, 4rem)",
    grid: "clamp(1.25rem, 1rem + 1vw, 2rem)", // distanza tra le card
  },

  shadows: {
    card: "none",
    cardHover: "0 14px 30px -18px rgba(20, 33, 61, 0.35)",
    pop: "0 18px 40px -20px rgba(20, 33, 61, 0.4)",
  },

  buttons: {
    paddingX: "2rem",
    paddingY: "0.95rem",
    fontSize: "0.76rem",
    fontWeight: 600,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    borderWidth: "1px",
    secondaryHover: "invert", // "invert" (si riempie) oppure "tint" (fondo tenue)
  },

  card: {
    padding: "1.25rem 1.25rem 1.4rem", // spazio attorno al testo della card
    borderWidth: "1px",
    imageRatio: "4 / 5",
    hoverLift: "0px", // quanto si solleva la card al passaggio
    imageZoom: 1.03, // ingrandimento della foto al passaggio (1 = nessuno)
    surface: true, // true = card su fondo pieno, false = foto e testo "liberi"
    align: "left", // "left" oppure "center"
    showCategory: true,
    showDescription: true,
    nameFont: "heading", // "heading" oppure "body"
    addButton: "outline", // "solid", "outline" oppure "link"
  },

  layout: {
    gridColumns: 3, // card per riga su desktop: 3 oppure 4
    navStyle: "underline", // menu in alto: "underline" oppure "pill"
    productTones: false, // false = segnaposto nei colori del tema, true = colore di ogni prodotto
  },
};

export default theme;
