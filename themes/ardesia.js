import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";

// ARDESIA: sito scuro blu-ardesia, morbido e "a strati". Palette in sei
// toni: #06141B (fondo), #11212D (card), #253745 (card in rilievo, filetti),
// #4A5C6A (testo terziario), #9BA8AB (testo secondario, accento),
// #CCD0CF (testo, bottone principale). Titoli in Inter Tight, parole in
// evidenza in corsivo Instrument Serif, bottoni a pillola, card con angoli
// ampi e ombre profonde.

// Font variabile: niente elenco di pesi (con Turbopack l'elenco rompe la build).
const headingFont = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
});

const accentFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
});

const palette = {
  bg: "#06141b",
  surface: "#11212d",
  surfaceAlt: "#0b1a23",
  fg: "#ccd0cf",
  fgMuted: "#9ba8ab",
  fgSubtle: "#4a5c6a",
  line: "#1d2e3a",
  lineStrong: "#4a5c6a",
  primary: "#ccd0cf", // pillola chiara: il tono più chiaro della palette
  primaryFg: "#06141b",
  primaryHover: "#e1e4e3",
  accent: "#9ba8ab",
  accentFg: "#06141b",
  accentSoft: "#253745",
  inverse: "#11212d",
  inverseFg: "#ccd0cf",
  inverseMuted: "#9ba8ab",
  inverseAccent: "#9ba8ab",
  sale: "#e08a8a",
  success: "#9cc2ab",
  successSoft: "#1c3329",
  danger: "#e08a8a",
  glass: "rgba(6, 20, 27, 0.72)",
  focus: "#ccd0cf",
  placeholderFrom: "#11212d",
  placeholderTo: "#253745",
  placeholderInk: "#9ba8ab",
  placeholderGlow: "rgba(204, 208, 207, 0.06)",
};

const theme = {
  name: "ardesia",
  label: "AU STUDIO · Ardesia",
  scheme: "dark",

  fonts: {
    heading: headingFont,
    body: bodyFont,
    accent: accentFont,
  },

  // Il sito è solo "light" (una serie di colori): qui sono i toni scuri.
  colors: { light: palette, dark: palette },

  typography: {
    headingWeight: 500,
    headingTracking: "-0.035em",
    headingCase: "none",
    headingLeading: 1.04,
    headingScale: 1.05,
    eyebrowSize: "0.72rem",
    eyebrowWeight: 500,
    eyebrowTracking: "0.16em",
    eyebrowCase: "uppercase",
  },

  radius: {
    btn: "999px", // pillole, come la palette
    input: "14px",
    chip: "999px",
    badge: "999px",
    card: "28px",
    media: "20px",
    panel: "36px",
  },

  spacing: {
    container: "80rem",
    gutter: "clamp(1.25rem, 3vw, 2.5rem)",
    section: "clamp(5rem, 3rem + 5vw, 8rem)",
    sectionTight: "clamp(3rem, 2rem + 3vw, 4.5rem)",
    grid: "clamp(0.75rem, 0.5rem + 1vw, 1.25rem)",
  },

  shadows: {
    // Ombre lunghe e morbide, come le pillole impilate della palette.
    card: "0 1px 0 rgba(204, 208, 207, 0.05) inset, 0 24px 48px -24px rgba(0, 0, 0, 0.55)",
    cardHover: "0 1px 0 rgba(204, 208, 207, 0.07) inset, 0 32px 64px -24px rgba(0, 0, 0, 0.7)",
    pop: "0 30px 60px -18px rgba(0, 0, 0, 0.7)",
  },

  buttons: {
    paddingX: "1.6rem",
    paddingY: "1rem",
    fontSize: "0.95rem",
    fontWeight: 500,
    letterSpacing: "-0.005em",
    textTransform: "none",
    borderWidth: "1px",
    secondaryHover: "tint",
    arrow: "→",
  },

  card: {
    padding: "1.75rem",
    borderWidth: "1px",
    imageRatio: "4 / 5",
    hoverLift: "4px",
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
