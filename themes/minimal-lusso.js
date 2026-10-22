import { Cormorant_Garamond, Jost } from "next/font/google";

// MINIMAL LUSSO: bianco e nero, titoli in un Garamond sottile, testo in un
// geometrico pulito, niente arrotondamenti né ombre, tanto spazio vuoto.
// L'unico colore è il rosso scuro dei saldi.

// I font si caricano qui con next/font: vengono ospitati dal sito stesso
// (nessuna richiesta a Google, ok GDPR) e si scaricano solo quelli del tema attivo.
const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = Jost({
  subsets: ["latin"],
  display: "swap",
});

const theme = {
  name: "minimal-lusso",
  label: "Minimal lusso",

  fonts: {
    heading: headingFont,
    body: bodyFont,
  },

  colors: {
    light: {
      bg: "#ffffff",
      surface: "#ffffff",
      surfaceAlt: "#f6f5f3",
      fg: "#0b0b0b",
      fgMuted: "#5f5f5f",
      fgSubtle: "#a1a1a1",
      line: "#e8e8e6",
      lineStrong: "#0b0b0b",
      primary: "#0b0b0b",
      primaryFg: "#ffffff",
      primaryHover: "#333333",
      accent: "#0b0b0b",
      accentFg: "#ffffff",
      accentSoft: "#f1f1ef",
      inverse: "#0b0b0b",
      inverseFg: "#ffffff",
      inverseMuted: "#9a9a9a",
      sale: "#8f1d1d",
      success: "#2e5e3e",
      successSoft: "#eef3ef",
      danger: "#8f1d1d",
      glass: "rgba(255, 255, 255, 0.92)",
      focus: "#0b0b0b",
      placeholderFrom: "#f5f5f3",
      placeholderTo: "#e3e3df",
      placeholderInk: "#1a1a1a",
      placeholderGlow: "rgba(255, 255, 255, 0.35)",
    },
    dark: {
      bg: "#0a0a0a",
      surface: "#111111",
      surfaceAlt: "#161616",
      fg: "#f3f2ef",
      fgMuted: "#a3a3a0",
      fgSubtle: "#5e5e5c",
      line: "#242424",
      lineStrong: "#f3f2ef",
      primary: "#f3f2ef",
      primaryFg: "#0a0a0a",
      primaryHover: "#cfcfcb",
      accent: "#f3f2ef",
      accentFg: "#0a0a0a",
      accentSoft: "#1c1c1c",
      inverse: "#000000",
      inverseFg: "#f3f2ef",
      inverseMuted: "#8a8a87",
      sale: "#e07a7a",
      success: "#8fc4a0",
      successSoft: "#142019",
      danger: "#e07a7a",
      glass: "rgba(10, 10, 10, 0.85)",
      focus: "#f3f2ef",
      placeholderFrom: "#1a1a1a",
      placeholderTo: "#262626",
      placeholderInk: "#d6d6d2",
      placeholderGlow: "rgba(255, 255, 255, 0.04)",
    },
  },

  typography: {
    headingWeight: 300,
    headingTracking: "-0.01em",
    headingCase: "none",
    headingLeading: 1.05,
    headingScale: 1.15, // moltiplica tutte le dimensioni dei titoli
    eyebrowSize: "0.68rem",
    eyebrowWeight: 500,
    eyebrowTracking: "0.28em",
    eyebrowCase: "uppercase",
  },

  radius: {
    btn: "0px",
    input: "0px",
    chip: "0px",
    badge: "0px",
    card: "0px",
    media: "0px",
    panel: "0px",
  },

  spacing: {
    container: "84rem", // larghezza massima dei contenuti
    gutter: "clamp(1.25rem, 5vw, 4rem)", // margini laterali
    section: "clamp(5rem, 2.5rem + 8vw, 10rem)", // aria sopra/sotto le sezioni
    sectionTight: "clamp(3rem, 2rem + 4vw, 5.5rem)",
    grid: "clamp(2rem, 1rem + 3vw, 4rem)", // distanza tra le card
  },

  shadows: {
    card: "none",
    cardHover: "none",
    pop: "0 30px 60px -30px rgba(0, 0, 0, 0.35)",
  },

  buttons: {
    paddingX: "2.75rem",
    paddingY: "1.15rem",
    fontSize: "0.68rem",
    fontWeight: 500,
    letterSpacing: "0.26em",
    textTransform: "uppercase",
    borderWidth: "1px",
    secondaryHover: "invert", // "invert" (si riempie) oppure "tint" (fondo tenue)
  },

  card: {
    padding: "1.25rem 0 0", // spazio attorno al testo della card
    borderWidth: "0px",
    imageRatio: "3 / 4",
    hoverLift: "0px", // quanto si solleva la card al passaggio
    imageZoom: 1.04, // ingrandimento della foto al passaggio (1 = nessuno)
    surface: false, // true = card su fondo pieno, false = foto e testo "liberi"
    align: "left", // "left" oppure "center"
    showCategory: true,
    showDescription: false,
    nameFont: "heading", // "heading" oppure "body"
    addButton: "link", // "solid", "outline" oppure "link"
  },

  layout: {
    gridColumns: 3, // card per riga su desktop: 3 oppure 4
    navStyle: "underline", // menu in alto: "underline" oppure "pill"
    productTones: false, // false = segnaposto nei colori del tema, true = colore di ogni prodotto
  },
};

export default theme;
