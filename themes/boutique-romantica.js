import { Nunito_Sans, Playfair_Display } from "next/font/google";

// BOUTIQUE ROMANTICA: toni caldi (crema, cipria, legno di rosa), titoli in un
// serif con grazie morbide, testo in un sans tondeggiante, angoli arrotondati,
// bottoni a pillola e card su fondo pieno con ombra leggera.

// I font si caricano qui con next/font: vengono ospitati dal sito stesso
// (nessuna richiesta a Google, ok GDPR) e si scaricano solo quelli del tema attivo.
const headingFont = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
});

const theme = {
  name: "boutique-romantica",
  label: "Boutique romantica",

  fonts: {
    heading: headingFont,
    body: bodyFont,
  },

  colors: {
    light: {
      bg: "#fdf8f4",
      surface: "#ffffff",
      surfaceAlt: "#f8ece5",
      fg: "#3b2a2a",
      fgMuted: "#7a6360",
      fgSubtle: "#b5a09a",
      line: "#f0e1d8",
      lineStrong: "#d9bfb2",
      primary: "#a4505a",
      primaryFg: "#ffffff",
      primaryHover: "#8b3f49",
      accent: "#b0625a",
      accentFg: "#ffffff",
      accentSoft: "#f8e3dc",
      inverse: "#4a2f2f",
      inverseFg: "#fbefe8",
      inverseMuted: "#cdb3a9",
      sale: "#b23a48",
      success: "#557a54",
      successSoft: "#edf3ea",
      danger: "#b23a48",
      glass: "rgba(255, 250, 246, 0.92)",
      focus: "#a4505a",
      placeholderFrom: "#faede6",
      placeholderTo: "#efd2c5",
      placeholderInk: "#7a3f3a",
      placeholderGlow: "rgba(255, 255, 255, 0.35)",
    },
    dark: {
      bg: "#1e1615",
      surface: "#291f1d",
      surfaceAlt: "#2e2321",
      fg: "#f5e9e2",
      fgMuted: "#c4aea6",
      fgSubtle: "#85706a",
      line: "#3d2f2c",
      lineStrong: "#5c4641",
      primary: "#e6a7a7",
      primaryFg: "#2a1a1a",
      primaryHover: "#f0c0bd",
      accent: "#e8ab9e",
      accentFg: "#2a1a1a",
      accentSoft: "#3a2826",
      inverse: "#140e0d",
      inverseFg: "#f5e9e2",
      inverseMuted: "#a8918a",
      sale: "#f08c96",
      success: "#a8c9a1",
      successSoft: "#1f2a1f",
      danger: "#f08c96",
      glass: "rgba(30, 22, 21, 0.85)",
      focus: "#e6a7a7",
      placeholderFrom: "#2e2321",
      placeholderTo: "#3d2c29",
      placeholderInk: "#e7c3b8",
      placeholderGlow: "rgba(255, 255, 255, 0.05)",
    },
  },

  typography: {
    headingWeight: 500,
    headingTracking: "-0.005em",
    headingCase: "none",
    headingLeading: 1.12,
    headingScale: 1, // moltiplica tutte le dimensioni dei titoli
    eyebrowSize: "0.72rem",
    eyebrowWeight: 700,
    eyebrowTracking: "0.16em",
    eyebrowCase: "uppercase",
  },

  radius: {
    btn: "999px", // bottoni a pillola
    input: "14px",
    chip: "999px",
    badge: "999px",
    card: "22px",
    media: "24px",
    panel: "20px",
  },

  spacing: {
    container: "78rem", // larghezza massima dei contenuti
    gutter: "clamp(1rem, 4vw, 2.5rem)", // margini laterali
    section: "clamp(4rem, 2.5rem + 5vw, 7.5rem)", // aria sopra/sotto le sezioni
    sectionTight: "clamp(2.5rem, 2rem + 3vw, 4.5rem)",
    grid: "clamp(1.25rem, 1rem + 1.5vw, 2.25rem)", // distanza tra le card
  },

  shadows: {
    card: "0 1px 2px rgba(74, 47, 47, 0.05), 0 12px 30px -16px rgba(74, 47, 47, 0.18)",
    cardHover: "0 2px 6px rgba(74, 47, 47, 0.08), 0 28px 50px -24px rgba(74, 47, 47, 0.32)",
    pop: "0 24px 48px -20px rgba(74, 47, 47, 0.35)",
  },

  buttons: {
    paddingX: "1.9rem",
    paddingY: "0.9rem",
    fontSize: "0.92rem",
    fontWeight: 700,
    letterSpacing: "0.01em",
    textTransform: "none",
    borderWidth: "1.5px",
    secondaryHover: "tint", // "invert" (si riempie) oppure "tint" (fondo tenue)
  },

  card: {
    padding: "1.25rem 1.25rem 1.5rem", // spazio attorno al testo della card
    borderWidth: "0px",
    imageRatio: "4 / 5",
    hoverLift: "4px", // quanto si solleva la card al passaggio
    imageZoom: 1.05, // ingrandimento della foto al passaggio (1 = nessuno)
    surface: true, // true = card su fondo pieno, false = foto e testo "liberi"
    align: "center", // "left" oppure "center"
    showCategory: true,
    showDescription: true,
    nameFont: "heading", // "heading" oppure "body"
    addButton: "outline", // "solid", "outline" oppure "link"
  },

  layout: {
    gridColumns: 4, // card per riga su desktop: 3 oppure 4
    navStyle: "pill", // menu in alto: "underline" oppure "pill"
    productTones: true, // false = segnaposto nei colori del tema, true = colore di ogni prodotto
  },
};

export default theme;
