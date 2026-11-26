import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";

// AVORIO: chiaro e caldo, da studio di bellezza. Palette in tre toni:
// #f4f5ef (avorio, fondo), #aba398 (tortora, filetti e pillole),
// #07080d (quasi nero, testo e bottone principale). Per i testi piccoli il
// tortora è scurito (#5c564e, #857c70), sennò non si legge sull'avorio.
// Stesso impianto di "ardesia": Inter Tight + corsivo Instrument Serif,
// bottoni a pillola, card arrotondate con ombre morbide.

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
  bg: "#f4f5ef",
  surface: "#fbfbf8",
  surfaceAlt: "#ebe9e2",
  fg: "#07080d",
  fgMuted: "#5c564e",
  fgSubtle: "#857c70",
  line: "#e3e0d8",
  lineStrong: "#aba398", // tortora della palette
  primary: "#07080d", // pillola nera
  primaryFg: "#f4f5ef",
  primaryHover: "#24252b",
  accent: "#857c70", // tortora scurito: parole in corsivo nei titoli
  accentFg: "#f4f5ef",
  accentSoft: "#e6e2da",
  inverse: "#07080d",
  inverseFg: "#f4f5ef",
  inverseMuted: "#aba398",
  inverseAccent: "#aba398",
  sale: "#9b2c2c",
  success: "#4f6b58",
  successSoft: "#e5ebe2",
  danger: "#9b2c2c",
  glass: "rgba(244, 245, 239, 0.82)",
  focus: "#07080d",
  placeholderFrom: "#ebe9e2",
  placeholderTo: "#d9d4ca",
  placeholderInk: "#857c70",
  placeholderGlow: "rgba(255, 255, 255, 0.5)",
};

const theme = {
  name: "avorio",
  label: "AU STUDIO · Avorio",

  fonts: {
    heading: headingFont,
    body: bodyFont,
    accent: accentFont,
  },

    colors: { light: palette, dark: palette },

  typography: {
    headingWeight: 400,
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
    // Ombre morbide e calde, come le pillole della palette.
    card: "0 1px 2px rgba(7, 8, 13, 0.04), 0 18px 40px -24px rgba(60, 50, 40, 0.22)",
    cardHover: "0 1px 2px rgba(7, 8, 13, 0.05), 0 26px 56px -24px rgba(60, 50, 40, 0.3)",
    pop: "0 22px 44px -18px rgba(40, 32, 24, 0.32)",
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
