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
  bg: "#121212", // carbone
  surface: "#1a1a19",
  surfaceAlt: "#161615",
  fg: "#e1e1e1", // grigio chiaro
  fgMuted: "#a3a3a0",
  fgSubtle: "#707070", // cemento
  line: "#2a2a27",
  lineStrong: "#737158", // verde chiaro: bordi forti e terza lastra dell'apertura
  primary: "#e1e1e1",
  primaryFg: "#121212",
  primaryHover: "#f2f2f2",
  accent: "#8f8d70", // verde chiaro appena schiarito: parole in corsivo
  accentFg: "#121212",
  accentSoft: "#3b3c2e", // muschio
  inverse: "#3b3c2e",
  inverseFg: "#e1e1e1",
  inverseMuted: "#a3a3a0",
  inverseAccent: "#a5a385",
  sale: "#e08a8a",
  success: "#a5b98f",
  successSoft: "#262b1f",
  danger: "#e08a8a",
  glass: "rgba(18, 18, 18, 0.72)",
  focus: "#e1e1e1",
  placeholderFrom: "#1a1a19",
  placeholderTo: "#3b3c2e",
  placeholderInk: "#737158",
  placeholderGlow: "rgba(225, 225, 225, 0.05)",
};

const theme = {
  name: "muschio",
  label: "AU STUDIO · Muschio",
  scheme: "dark",

  fonts: {
    heading: headingFont,
    body: bodyFont,
    accent: accentFont,
  },

  // Il sito è solo "light" (una serie di colori): qui sono i toni scuri.
  colors: { light: palette, dark: palette },

  typography: {
    headingWeight: 600,
    headingTracking: "-0.03em",
    headingCase: "none",
    headingLeading: 1.04,
    headingScale: 1.05,
    eyebrowSize: "0.72rem",
    eyebrowWeight: 500,
    eyebrowTracking: "0.16em",
    eyebrowCase: "uppercase",
  },

  radius: {
    btn: "4px", // rettangoli, come i blocchi della palette
    input: "4px",
    chip: "3px",
    badge: "3px",
    card: "6px",
    media: "4px",
    panel: "8px",
  },

  spacing: {
    container: "80rem",
    gutter: "clamp(1.25rem, 3vw, 2.5rem)",
    section: "clamp(5rem, 3rem + 5vw, 8rem)",
    sectionTight: "clamp(3rem, 2rem + 3vw, 4.5rem)",
    grid: "clamp(0.75rem, 0.5rem + 1vw, 1.25rem)",
  },

  shadows: {
    // Ombre lunghe, come la luce di taglio nella foto della palette.
    card: "0 1px 0 rgba(225, 225, 225, 0.04) inset, 0 24px 48px -24px rgba(0, 0, 0, 0.6)",
    cardHover: "0 1px 0 rgba(225, 225, 225, 0.06) inset, 0 32px 64px -24px rgba(0, 0, 0, 0.75)",
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
