import { Instrument_Serif, Inter } from "next/font/google";

// GRIGIO: lo stesso impianto di "editoriale" (Instrument Serif + Inter,
// angoli vivi, bottoni in maiuscolo con ↗), in scala di grigi. Colori dalla
// palette: #727272, grigio-azzurro #99a3ad, tortora #a8a19b, #a5a5a5,
// #b1b1b1 su fondo #f7f7f7. Il tortora fa da colore principale (bottoni e
// fascia centrale), il grigio-azzurro da accento; le fasce scure sono antracite.

const headingFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
});

const theme = {
  name: "grigio",
  label: "AU STUDIO · Grigio",

  fonts: {
    heading: headingFont,
    body: bodyFont,
  },

  colors: {
    light: {
      bg: "#f7f7f7",
      surface: "#ffffff",
      surfaceAlt: "#ededed",
      fg: "#262626",
      fgMuted: "#5c5c5c",
      fgSubtle: "#a5a5a5",
      line: "#d9d9d9",
      lineStrong: "#262626",
      primary: "#a8a19b", // tortora: bottone principale e fascia centrale
      primaryFg: "#1f1f1f",
      primaryHover: "#b6b0aa",
      accent: "#5e6a76", // grigio-azzurro scurito: leggibile come testo
      accentFg: "#ffffff",
      accentSoft: "#e6e9ec",
      inverse: "#3b3b3b", // antracite: apertura, lavori, contatti, footer
      inverseFg: "#ffffff",
      inverseMuted: "#b1b1b1",
      inverseAccent: "#a9b3bd", // grigio-azzurro sulle fasce scure
      sale: "#9b2c2c",
      success: "#4f6b58",
      successSoft: "#e5ebe7",
      danger: "#9b2c2c",
      glass: "rgba(255, 255, 255, 0.92)",
      focus: "#5e6a76",
      placeholderFrom: "#ededed",
      placeholderTo: "#d9d9d9",
      placeholderInk: "#727272",
      placeholderGlow: "rgba(255, 255, 255, 0.4)",
    },
    dark: {
      bg: "#1c1c1c",
      surface: "#242424",
      surfaceAlt: "#202020",
      fg: "#ededed",
      fgMuted: "#b1b1b1",
      fgSubtle: "#727272",
      line: "#333333",
      lineStrong: "#ededed",
      primary: "#a8a19b",
      primaryFg: "#1c1c1c",
      primaryHover: "#b6b0aa",
      accent: "#99a3ad",
      accentFg: "#1c1c1c",
      accentSoft: "#2a2e33",
      inverse: "#2e2e2e",
      inverseFg: "#ffffff",
      inverseMuted: "#b1b1b1",
      inverseAccent: "#a9b3bd",
      sale: "#e08a8a",
      success: "#9cbfa6",
      successSoft: "#1e2620",
      danger: "#e08a8a",
      glass: "rgba(28, 28, 28, 0.88)",
      focus: "#99a3ad",
      placeholderFrom: "#242424",
      placeholderTo: "#2e2e2e",
      placeholderInk: "#a5a5a5",
      placeholderGlow: "rgba(255, 255, 255, 0.04)",
    },
  },

  typography: {
    headingWeight: 400,
    headingTracking: "-0.015em",
    headingCase: "none",
    headingLeading: 1.02,
    headingScale: 1.35, // Instrument Serif è stretto: titoli più grandi
    eyebrowSize: "0.75rem",
    eyebrowWeight: 600,
    eyebrowTracking: "0.18em",
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
    container: "82.5rem",
    gutter: "clamp(1.5rem, 3vw, 2.5rem)",
    section: "clamp(5.5rem, 3rem + 6vw, 8.5rem)",
    sectionTight: "clamp(3rem, 2rem + 3vw, 4.5rem)",
    grid: "clamp(1.25rem, 1rem + 1.5vw, 3rem)",
  },

  shadows: {
    card: "none",
    cardHover: "none",
    pop: "0 6px 16px rgba(0, 0, 0, 0.18)",
  },

  buttons: {
    paddingX: "1.625rem",
    paddingY: "1.125rem",
    fontSize: "0.78rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    borderWidth: "1px",
    secondaryHover: "invert",
    arrow: "↗", // facoltativo: freccia dopo il testo dei bottoni
  },

  card: {
    padding: "1.75rem",
    borderWidth: "1px",
    imageRatio: "4 / 5",
    hoverLift: "0px",
    imageZoom: 1.03,
    surface: true,
    align: "left",
    showCategory: true,
    showDescription: true,
    nameFont: "heading",
    addButton: "outline",
  },

  layout: {
    gridColumns: 3,
    navStyle: "underline",
    productTones: false,
  },
};

export default theme;
