import { Instrument_Serif, Inter } from "next/font/google";

// EDITORIALE: blu notte e oro, stile rivista. Titoli grandi in Instrument
// Serif (con una parola in corsivo oro), testi in Inter, angoli vivi,
// bottoni in maiuscolo spaziato con la freccia ↗, filetti sottili ovunque
// al posto di ombre e card. Le fasce scure sono blu notte, la fascia
// "chiamata all'azione" è oro pieno.

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
  name: "editoriale",
  label: "AU STUDIO · Editoriale",

  fonts: {
    heading: headingFont,
    body: bodyFont,
  },

  colors: {
    light: {
      bg: "#ffffff",
      surface: "#ffffff",
      surfaceAlt: "#f4f4f4",
      fg: "#16181d",
      fgMuted: "#5b6170",
      fgSubtle: "#9aa0ad",
      line: "#dcdde1",
      lineStrong: "#16181d",
      primary: "#fca311", // oro pieno: bottone principale e fascia centrale
      primaryFg: "#14213d",
      primaryHover: "#ffb83d",
      accent: "#b06d00", // oro scuro: leggibile come testo su bianco
      accentFg: "#ffffff",
      accentSoft: "#fdf1dc",
      inverse: "#14213d", // blu notte: apertura, lavori, contatti, footer
      inverseFg: "#ffffff",
      inverseMuted: "#a9b0c0",
      inverseAccent: "#fca311",
      sale: "#b42318",
      success: "#2f7a4f",
      successSoft: "#e8f3ec",
      danger: "#b42318",
      glass: "rgba(255, 255, 255, 0.92)",
      focus: "#fca311",
      placeholderFrom: "#f4f4f4",
      placeholderTo: "#e5e5e5",
      placeholderInk: "#14213d",
      placeholderGlow: "rgba(255, 255, 255, 0.4)",
    },
    dark: {
      bg: "#0a0f1c",
      surface: "#0f1729",
      surfaceAlt: "#0d1424",
      fg: "#eef0f4",
      fgMuted: "#a9b0c0",
      fgSubtle: "#6b7385",
      line: "#222c42",
      lineStrong: "#eef0f4",
      primary: "#fca311",
      primaryFg: "#14213d",
      primaryHover: "#ffb83d",
      accent: "#fca311",
      accentFg: "#14213d",
      accentSoft: "#2a2110",
      inverse: "#14213d",
      inverseFg: "#ffffff",
      inverseMuted: "#a9b0c0",
      inverseAccent: "#fca311",
      sale: "#f08a80",
      success: "#8fcaa5",
      successSoft: "#13261d",
      danger: "#f08a80",
      glass: "rgba(10, 15, 28, 0.88)",
      focus: "#fca311",
      placeholderFrom: "#0f1729",
      placeholderTo: "#14213d",
      placeholderInk: "#fca311",
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
