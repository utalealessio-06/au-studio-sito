import { Anton, Space_Grotesk } from "next/font/google";

// STREET URBAN: contrasti forti, titoli enormi in maiuscolo con un carattere
// condensato e squadrato, nero su bianco cemento con un arancio acceso come
// colore di rottura. Zero arrotondamenti, bordi pieni e ombre "dure" spostate,
// come adesivi e poster da strada.

// I font si caricano qui con next/font: vengono ospitati dal sito stesso
// (nessuna richiesta a Google, ok GDPR) e si scaricano solo quelli del tema attivo.
const headingFont = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

const theme = {
  name: "street-urban",
  label: "Street urban",

  fonts: {
    heading: headingFont,
    body: bodyFont,
  },

  colors: {
    light: {
      bg: "#f2f2ee",
      surface: "#ffffff",
      surfaceAlt: "#e6e6e0",
      fg: "#0a0a0a",
      fgMuted: "#454545",
      fgSubtle: "#8a8a85",
      line: "#0a0a0a",
      lineStrong: "#0a0a0a",
      primary: "#0a0a0a",
      primaryFg: "#f2f2ee",
      primaryHover: "#d63a0c",
      accent: "#d63a0c",
      accentFg: "#ffffff",
      accentSoft: "#ffe2d6",
      inverse: "#ff4d1a", // fasce arancio: barra annunci, footer, banner
      inverseFg: "#0a0a0a",
      inverseMuted: "#4a1a08",
      sale: "#c4001a",
      success: "#16733a",
      successSoft: "#dcf5e3",
      danger: "#c4001a",
      glass: "rgba(242, 242, 238, 0.95)",
      focus: "#d63a0c",
      placeholderFrom: "#e6e6e0",
      placeholderTo: "#d2d2cb",
      placeholderInk: "#0a0a0a",
      placeholderGlow: "rgba(255, 255, 255, 0.3)",
    },
    dark: {
      bg: "#0a0a0a",
      surface: "#141414",
      surfaceAlt: "#1c1c1c",
      fg: "#f2f2ee",
      fgMuted: "#b5b5b0",
      fgSubtle: "#6e6e6a",
      line: "#f2f2ee",
      lineStrong: "#f2f2ee",
      primary: "#f2f2ee",
      primaryFg: "#0a0a0a",
      primaryHover: "#ff6a3d",
      accent: "#ff6a3d",
      accentFg: "#0a0a0a",
      accentSoft: "#2a140c",
      inverse: "#ff4d1a",
      inverseFg: "#0a0a0a",
      inverseMuted: "#4a1a08",
      sale: "#ff4d6a",
      success: "#4ade80",
      successSoft: "#0f2416",
      danger: "#ff4d6a",
      glass: "rgba(10, 10, 10, 0.9)",
      focus: "#ff6a3d",
      placeholderFrom: "#1a1a1a",
      placeholderTo: "#262626",
      placeholderInk: "#f2f2ee",
      placeholderGlow: "rgba(255, 255, 255, 0.04)",
    },
  },

  typography: {
    headingWeight: 400, // Anton ha un solo peso, già molto pieno
    headingTracking: "0.01em",
    headingCase: "uppercase",
    headingLeading: 0.95,
    headingScale: 1.35, // moltiplica tutte le dimensioni dei titoli
    eyebrowSize: "0.72rem",
    eyebrowWeight: 700,
    eyebrowTracking: "0.14em",
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
    container: "90rem", // larghezza massima dei contenuti
    gutter: "clamp(1rem, 3vw, 2rem)", // margini laterali
    section: "clamp(3.5rem, 2rem + 5vw, 7rem)", // aria sopra/sotto le sezioni
    sectionTight: "clamp(2.5rem, 2rem + 2.5vw, 4rem)",
    grid: "clamp(0.75rem, 0.5rem + 1vw, 1.25rem)", // distanza tra le card
  },

  // Ombre "dure" nel colore del testo: si adattano da sole a chiaro e scuro.
  shadows: {
    card: "none",
    cardHover: "6px 6px 0 0 var(--c-fg)",
    pop: "8px 8px 0 0 var(--c-fg)",
  },

  buttons: {
    paddingX: "1.75rem",
    paddingY: "1rem",
    fontSize: "0.82rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    borderWidth: "2px",
    secondaryHover: "invert", // "invert" (si riempie) oppure "tint" (fondo tenue)
  },

  card: {
    padding: "0.9rem 1rem 1rem", // spazio attorno al testo della card
    borderWidth: "2px",
    imageRatio: "1 / 1",
    hoverLift: "4px", // quanto si solleva la card al passaggio
    imageZoom: 1.06, // ingrandimento della foto al passaggio (1 = nessuno)
    surface: true, // true = card su fondo pieno, false = foto e testo "liberi"
    align: "left", // "left" oppure "center"
    showCategory: true,
    showDescription: false,
    nameFont: "heading", // "heading" oppure "body"
    addButton: "solid", // "solid", "outline" oppure "link"
  },

  layout: {
    gridColumns: 4, // card per riga su desktop: 3 oppure 4
    navStyle: "pill", // menu in alto: "underline" oppure "pill"
    productTones: false, // false = segnaposto nei colori del tema, true = colore di ogni prodotto
  },
};

export default theme;
