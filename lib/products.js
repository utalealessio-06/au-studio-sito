// Catalogo mock. Quando Supabase sarà configurato, queste funzioni potranno
// leggere dalla tabella "products" mantenendo la stessa forma dei dati.
// Nota: niente `undefined` nei campi, perché le props di getStaticProps
// devono essere serializzabili in JSON (usare `null`).

export const CATEGORIES = [
  { slug: "casa-profumi", name: "Casa & Profumi" },
  { slug: "ceramiche", name: "Ceramiche" },
  { slug: "pelletteria", name: "Pelletteria" },
  { slug: "legno", name: "Legno" },
  { slug: "tessili", name: "Tessili" },
  { slug: "cartoleria", name: "Cartoleria" },
];

const products = [
  {
    id: 1,
    slug: "candela-soia-lavanda",
    name: "Candela di soia alla lavanda",
    category: "Casa & Profumi",
    categorySlug: "casa-profumi",
    price: 24.9,
    compareAtPrice: null,
    badge: "Bestseller",
    featured: true,
    stock: 18,
    origin: "Piemonte",
    shortDescription:
      "Cera di soia naturale, stoppino in cotone e olio essenziale di lavanda.",
    description:
      "Colata a mano in piccoli lotti, questa candela unisce cera di soia 100% vegetale e olio essenziale di lavanda coltivata sulle colline piemontesi. Brucia in modo pulito e uniforme, diffondendo un profumo delicato e rilassante in tutta la stanza.",
    details: [
      "Cera di soia 100% vegetale",
      "Durata di combustione: circa 40 ore",
      "Vasetto in vetro riutilizzabile",
      "Peso netto: 200 g",
    ],
    icon: "candle",
    tone: { from: "#efeaf7", to: "#cfc3e8", ink: "#4f3f7a" },
    image: null,
  },
  {
    id: 2,
    slug: "tazza-ceramica-deruta",
    name: "Tazza in ceramica di Deruta",
    category: "Ceramiche",
    categorySlug: "ceramiche",
    price: 19.5,
    compareAtPrice: null,
    badge: "Novità",
    featured: true,
    stock: 25,
    origin: "Deruta, Umbria",
    shortDescription:
      "Decorata a mano con motivi tradizionali umbri, perfetta per tè e caffè.",
    description:
      "Modellata al tornio e dipinta a pennello da una bottega di Deruta, questa tazza porta in tavola i colori e i decori della tradizione ceramica umbra. Ogni pezzo presenta piccole variazioni che lo rendono unico.",
    details: [
      "Ceramica smaltata e dipinta a mano",
      "Capacità: 300 ml",
      "Adatta a lavastoviglie e microonde",
      "Ogni pezzo è unico",
    ],
    icon: "cup",
    tone: { from: "#e8f0f7", to: "#b9d0e6", ink: "#1f4a73" },
    image: null,
  },
  {
    id: 3,
    slug: "portafoglio-pelle-toscana",
    name: "Portafoglio in pelle toscana",
    category: "Pelletteria",
    categorySlug: "pelletteria",
    price: 59,
    compareAtPrice: 69,
    badge: "Offerta",
    featured: true,
    stock: 9,
    origin: "Firenze, Toscana",
    shortDescription:
      "Pelle conciata al vegetale e cuciture a mano, elegante e senza tempo.",
    description:
      "Realizzato a Firenze con pelle conciata al vegetale secondo metodi tradizionali, questo portafoglio sviluppa con il tempo una patina calda e personale. Linee essenziali, cuciture a mano e una struttura pensata per durare anni.",
    details: [
      "Pelle conciata al vegetale",
      "6 tasche per carte e 2 scomparti",
      "Cuciture eseguite a mano",
      "Dimensioni: 11 × 9,5 cm",
    ],
    icon: "wallet",
    tone: { from: "#f3e6da", to: "#d9b594", ink: "#6b3f1f" },
    image: null,
  },
  {
    id: 4,
    slug: "tagliere-legno-ulivo",
    name: "Tagliere in legno d’ulivo",
    category: "Legno",
    categorySlug: "legno",
    price: 39,
    compareAtPrice: null,
    badge: null,
    featured: true,
    stock: 14,
    origin: "Puglia",
    shortDescription:
      "Ricavato da un unico blocco di ulivo pugliese, con venature inconfondibili.",
    description:
      "Ogni tagliere nasce da legno d’ulivo pugliese proveniente da potature sostenibili, lavorato e rifinito a mano. Le venature naturali lo rendono un pezzo unico, ideale per servire salumi e formaggi o come elemento d’arredo in cucina.",
    details: [
      "Legno d’ulivo massello",
      "Trattato con olio per uso alimentare",
      "Dimensioni: 35 × 18 cm",
      "Venature uniche per ogni pezzo",
    ],
    icon: "board",
    tone: { from: "#eef0e4", to: "#c8cfa6", ink: "#4a5325" },
    image: null,
  },
  {
    id: 5,
    slug: "sciarpa-lana-merino",
    name: "Sciarpa in lana merino",
    category: "Tessili",
    categorySlug: "tessili",
    price: 49,
    compareAtPrice: null,
    badge: null,
    featured: false,
    stock: 12,
    origin: "Biella, Piemonte",
    shortDescription:
      "Tessuta su telaio tradizionale nel distretto laniero di Biella.",
    description:
      "Una sciarpa morbida e calda, tessuta su telaio da un piccolo lanificio biellese con lana merino extrafine. La trama leggera la rende perfetta dall’autunno alla primavera, da sola o sotto il cappotto.",
    details: [
      "100% lana merino extrafine",
      "Tessuta su telaio tradizionale",
      "Dimensioni: 180 × 30 cm",
      "Lavaggio a mano a 30 °C",
    ],
    icon: "scarf",
    tone: { from: "#f5e9e7", to: "#dfb8b1", ink: "#7a3a31" },
    image: null,
  },
  {
    id: 6,
    slug: "set-saponi-naturali",
    name: "Set di saponi naturali",
    category: "Casa & Profumi",
    categorySlug: "casa-profumi",
    price: 22,
    compareAtPrice: null,
    badge: "Novità",
    featured: false,
    stock: 30,
    origin: "Sicilia",
    shortDescription:
      "Tre saponette all’olio extravergine d’oliva e agrumi di Sicilia.",
    description:
      "Prodotti con il metodo della saponificazione a freddo, questi saponi uniscono olio extravergine d’oliva e oli essenziali di agrumi siciliani. Delicati sulla pelle e confezionati in carta riciclata, sono un regalo semplice e raffinato.",
    details: [
      "3 saponette da 100 g",
      "Olio extravergine d’oliva e agrumi",
      "Saponificazione a freddo",
      "Senza parabeni né coloranti",
    ],
    icon: "soap",
    tone: { from: "#fbf3dc", to: "#ecd08a", ink: "#6f5412" },
    image: null,
  },
  {
    id: 7,
    slug: "vaso-terracotta-impruneta",
    name: "Vaso in terracotta dell’Impruneta",
    category: "Ceramiche",
    categorySlug: "ceramiche",
    price: 34,
    compareAtPrice: null,
    badge: null,
    featured: false,
    stock: 5,
    origin: "Impruneta, Toscana",
    shortDescription:
      "Terracotta toscana cotta ad alta temperatura, resistente al gelo.",
    description:
      "L’argilla dell’Impruneta, ricca di minerali, viene modellata e cotta ad alta temperatura per ottenere una terracotta compatta e resistente al gelo. Un vaso dalle linee classiche, bello sia in casa sia sul balcone.",
    details: [
      "Terracotta cotta ad alta temperatura",
      "Resistente al gelo",
      "Altezza: 22 cm",
      "Con foro di drenaggio",
    ],
    icon: "vase",
    tone: { from: "#f6e4da", to: "#e0a98a", ink: "#7c3b1c" },
    image: null,
  },
  {
    id: 8,
    slug: "taccuino-carta-amalfi",
    name: "Taccuino in carta di Amalfi",
    category: "Cartoleria",
    categorySlug: "cartoleria",
    price: 27.5,
    compareAtPrice: null,
    badge: null,
    featured: false,
    stock: 20,
    origin: "Amalfi, Campania",
    shortDescription:
      "Carta di cotone fatta a mano con i bordi sfrangiati tipici di Amalfi.",
    description:
      "La carta di Amalfi si produce da secoli a partire da fibre di cotone, lavorata foglio per foglio. Questo taccuino ne conserva la trama e i bordi irregolari, racchiusi in una morbida copertina in pelle: perfetto per appunti, schizzi e dediche.",
    details: [
      "Carta di cotone fatta a mano",
      "96 pagine con bordi sfrangiati",
      "Copertina in pelle morbida",
      "Formato: 13 × 18 cm",
    ],
    icon: "notebook",
    tone: { from: "#f1efe9", to: "#d6cfbd", ink: "#4d4535" },
    image: null,
  },
];

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts(limit = 4) {
  return products.filter((product) => product.featured).slice(0, limit);
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) ?? null;
}

// Prima i prodotti della stessa categoria, poi il resto del catalogo.
export function getRelatedProducts(product, limit = 4) {
  const others = products.filter((item) => item.slug !== product.slug);
  const sameCategory = others.filter(
    (item) => item.categorySlug === product.categorySlug
  );
  const rest = others.filter(
    (item) => item.categorySlug !== product.categorySlug
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function productUrl(product) {
  return `/prodotto/regalo-artigianato/${product.slug}`;
}
