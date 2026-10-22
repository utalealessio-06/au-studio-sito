// Trasforma il tema attivo (theme.js) in variabili CSS. styles/globals.css
// collega queste variabili alle classi Tailwind (bg-surface, rounded-card,
// font-heading, py-section...), quindi i componenti non contengono mai valori.
//
// Le liste qui sotto sono il "contratto" che ogni file in themes/ deve
// rispettare: se manca una voce, in sviluppo compare un errore che la nomina.

const COLOR_KEYS = [
  "bg", // sfondo della pagina
  "surface", // card, pannelli, campi
  "surfaceAlt", // sezioni in evidenza, hover leggeri
  "fg", // testo principale
  "fgMuted", // testo secondario
  "fgSubtle", // testo terziario, separatori, disabilitati
  "line", // bordi leggeri
  "lineStrong", // bordi di campi e bottoni secondari
  "primary", // bottone principale
  "primaryFg",
  "primaryHover",
  "accent", // occhielli, badge contatore, dettagli
  "accentFg",
  "accentSoft", // fondo tenue dell'accento
  "inverse", // fasce scure: footer, banner, barra annunci
  "inverseFg",
  "inverseMuted",
  "sale", // prezzi scontati
  "success",
  "successSoft",
  "danger",
  "glass", // etichette semitrasparenti sopra le foto
  "focus", // anello di focus da tastiera
  "placeholderFrom", // illustrazioni segnaposto (prodotti senza foto)
  "placeholderTo",
  "placeholderInk",
  "placeholderGlow",
];

const REQUIRED = {
  fonts: ["heading", "body"],
  typography: [
    "headingWeight",
    "headingTracking",
    "headingCase",
    "headingLeading",
    "headingScale",
    "eyebrowSize",
    "eyebrowWeight",
    "eyebrowTracking",
    "eyebrowCase",
  ],
  radius: ["btn", "input", "chip", "badge", "card", "media", "panel"],
  spacing: ["container", "gutter", "section", "sectionTight", "grid"],
  shadows: ["card", "cardHover", "pop"],
  buttons: [
    "paddingX",
    "paddingY",
    "fontSize",
    "fontWeight",
    "letterSpacing",
    "textTransform",
    "borderWidth",
    "secondaryHover",
  ],
  card: [
    "padding",
    "borderWidth",
    "imageRatio",
    "hoverLift",
    "imageZoom",
    "surface",
    "align",
    "showCategory",
    "showDescription",
    "nameFont",
    "addButton",
  ],
  layout: ["gridColumns", "navStyle", "productTones"],
};

function checkTheme(theme) {
  const missing = [];
  for (const mode of ["light", "dark"]) {
    for (const key of COLOR_KEYS) {
      if (theme.colors?.[mode]?.[key] == null) missing.push(`colors.${mode}.${key}`);
    }
  }
  for (const [group, keys] of Object.entries(REQUIRED)) {
    for (const key of keys) {
      if (theme[group]?.[key] == null) missing.push(`${group}.${key}`);
    }
  }
  if (missing.length > 0) {
    throw new Error(`Tema "${theme.name}" incompleto, mancano: ${missing.join(", ")}`);
  }
}

const kebab = (key) => key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
const declarations = (entries) => entries.map(([name, value]) => `${name}:${value};`).join("");

// "invert": al passaggio il bottone secondario si riempie del colore del testo;
// "tint": prende solo un fondo tenue.
const SECONDARY_HOVER = {
  invert: ["var(--c-fg)", "var(--c-bg)"],
  tint: ["var(--c-surface-alt)", "var(--c-fg)"],
};

export function themeCss(theme) {
  if (process.env.NODE_ENV !== "production") checkTheme(theme);

  const { fonts, typography: t, radius: r, spacing: sp, shadows: sh, buttons: b, card: c } = theme;
  const [secondaryHoverBg, secondaryHoverFg] = SECONDARY_HOVER[b.secondaryHover] ?? SECONDARY_HOVER.tint;
  const colors = (mode) => COLOR_KEYS.map((key) => [`--c-${kebab(key)}`, theme.colors[mode][key]]);

  const base = [
    ["--f-heading", fonts.heading.style.fontFamily],
    ["--f-body", fonts.body.style.fontFamily],
    ["--heading-weight", t.headingWeight],
    ["--heading-tracking", t.headingTracking],
    ["--heading-case", t.headingCase],
    ["--heading-leading", t.headingLeading],
    ["--heading-scale", t.headingScale],
    ["--eyebrow-size", t.eyebrowSize],
    ["--eyebrow-weight", t.eyebrowWeight],
    ["--eyebrow-tracking", t.eyebrowTracking],
    ["--eyebrow-case", t.eyebrowCase],
    ...Object.entries(r).map(([key, value]) => [`--r-${kebab(key)}`, value]),
    ...Object.entries(sp).map(([key, value]) => [`--sp-${kebab(key)}`, value]),
    ...Object.entries(sh).map(([key, value]) => [`--sh-${kebab(key)}`, value]),
    ["--btn-px", b.paddingX],
    ["--btn-py", b.paddingY],
    ["--btn-size", b.fontSize],
    ["--btn-weight", b.fontWeight],
    ["--btn-tracking", b.letterSpacing],
    ["--btn-case", b.textTransform],
    ["--btn-border", b.borderWidth],
    ["--btn2-hover-bg", secondaryHoverBg],
    ["--btn2-hover-fg", secondaryHoverFg],
    ["--card-pad", c.padding],
    ["--card-border", c.borderWidth],
    ["--card-ratio", c.imageRatio],
    ["--card-lift", c.hoverLift],
    ["--card-zoom", c.imageZoom],
  ];

  return [
    `:root{color-scheme:light;${declarations(base)}${declarations(colors("light"))}}`,
    `:root[data-mode="dark"]{color-scheme:dark;${declarations(colors("dark"))}}`,
  ].join("\n");
}
