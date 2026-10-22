import { Lora, Poppins } from "next/font/google";

// AU STUDIO: lo stesso stile del listino prezzi. Blu navy e oro su bianco,
// titoli in Lora (serif elegante, peso normale), testi in Poppins grigio,
// filetti sottili al posto delle ombre e angoli appena arrotondati.
// In modalità scura il navy diventa lo sfondo e l'oro passa ai bottoni.

// I font si caricano qui con next/font: vengono ospitati dal sito stesso
// (nessuna richiesta a Google, ok GDPR) e si scaricano solo quelli del tema attivo.
const headingFont = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const theme = {
  name: "au-studio",
  label: "AU STUDIO",

  fonts: {
    heading: headingFont,
    body: bodyFont,
  },

  colors: {
    light: {
      bg: "#ffffff",
      surface: "#ffffff",
      surfaceAlt: "#f3f5f9", // come la card "Il più scelto" del listino
      fg: "#0f3a66",
      fgMuted: "#5a6475",
      fgSubtle: "#98a1b0",
      line: "#e2e6ed",
      lineStrong: "#0f3a66",
      primary: "#0f3a66",
      primaryFg: "#ffffff",
      primaryHover: "#0a2c4f",
      accent: "#b8902a", // oro del listino: occhielli, puntini, filetti
      accentFg: "#ffffff",
      accentSoft: "#f7f0de",
      inverse: "#0f3a66",
      inverseFg: "#ffffff",
      inverseMuted: "#c5d2e2",
      sale: "#b42318",
      success: "#2f7a4f",
      successSoft: "#e8f3ec",
      danger: "#b42318",
      glass: "rgba(255, 255, 255, 0.92)",
      focus: "#b8902a",
      placeholderFrom: "#f3f5f9",
      placeholderTo: "#dfe5ee",
      placeholderInk: "#0f3a66",
      placeholderGlow: "rgba(255, 255, 255, 0.4)",
    },
    dark: {
      bg: "#08182b",
      surface: "#0d2239",
      surfaceAlt: "#102a46",
      fg: "#f3efe4",
      fgMuted: "#b4c0d0",
      fgSubtle: "#6f8098",
      line: "#1c3654",
      lineStrong: "#d2ad4f",
      primary: "#d2ad4f",
      primaryFg: "#08182b",
      primaryHover: "#e0c068",
      accent: "#d2ad4f",
      accentFg: "#08182b",
      accentSoft: "#1a2f46",
      inverse: "#0f3a66",
      inverseFg: "#ffffff",
      inverseMuted: "#c5d2e2",
      sale: "#f08a80",
      success: "#8fcaa5",
      successSoft: "#13261d",
      danger: "#f08a80",
      glass: "rgba(8, 24, 43, 0.88)",
      focus: "#d2ad4f",
      placeholderFrom: "#102a46",
      placeholderTo: "#183657",
      placeholderInk: "#d2ad4f",
      placeholderGlow: "rgba(255, 255, 255, 0.04)",
    },
  },

  typography: {
    headingWeight: 400,
    headingTracking: "-0.005em",
    headingCase: "none",
    headingLeading: 1.15,
    headingScale: 0.92, // moltiplica tutte le dimensioni dei titoli
    eyebrowSize: "0.72rem",
    eyebrowWeight: 600,
    eyebrowTracking: "0.18em",
    eyebrowCase: "uppercase",
  },

  radius: {
    btn: "4px",
    input: "4px",
    chip: "999px",
    badge: "4px",
    card: "4px",
    media: "4px",
    panel: "4px",
  },

  spacing: {
    container: "72rem", // larghezza massima dei contenuti
    gutter: "clamp(1.25rem, 4vw, 2.5rem)", // margini laterali
    section: "clamp(4rem, 3rem + 4vw, 6.5rem)", // aria sopra/sotto le sezioni
    sectionTight: "clamp(2.5rem, 2rem + 2vw, 4rem)",
    grid: "clamp(1rem, 0.75rem + 1vw, 1.75rem)", // distanza tra le card
  },

  shadows: {
    card: "none",
    cardHover: "0 14px 30px -18px rgba(15, 58, 102, 0.3)",
    pop: "0 18px 40px -18px rgba(15, 58, 102, 0.45)",
  },

  buttons: {
    paddingX: "1.6rem",
    paddingY: "1rem",
    fontSize: "0.95rem",
    fontWeight: 500,
    letterSpacing: "0em",
    textTransform: "none",
    borderWidth: "1px",
    secondaryHover: "invert", // "invert" (si riempie) oppure "tint" (fondo tenue)
  },

  card: {
    padding: "1.5rem",
    borderWidth: "1px",
    imageRatio: "3 / 4",
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
