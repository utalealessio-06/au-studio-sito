@AGENTS.md

# Temi: "macchina + vestiti intercambiabili"

Il sito è diviso in due parti che non si toccano:

- **La macchina** (componenti, pagine, `lib/`): la landing page di AU STUDIO
  su una sola pagina (`pages/index.jsx`), pulsanti WhatsApp. Solo modalità chiara.
  Non è più un e-commerce: carrello, catalogo e schede prodotto sono stati tolti.
  Le voci `card` e `layout` dei temi restano nel contratto ma la pagina non le usa.
- **I vestiti** (`themes/`): tutte le scelte di stile. Un file = un tema.

## Cambiare tema

Si modifica una sola riga in `theme.js`:

```js
export { default } from "./themes/minimal-lusso";
```

Poi si riavvia `npm run dev` (oppure si rifà `npm run build`). Non serve
toccare altro.

Temi disponibili:

| File | Stile |
| --- | --- |
| `themes/grigio.js` | **Tema del sito.** Come editoriale ma in scala di grigi: tortora `#a8a19b` per bottoni e fascia centrale, grigio-azzurro `#99a3ad` come accento, fasce antracite `#3b3b3b`, fondo `#f7f7f7` |
| `themes/editoriale.js` | Stile rivista: blu notte `#14213d` e oro `#fca311`, Instrument Serif + Inter, titoli grandi con una parola in corsivo oro, angoli vivi, bottoni in maiuscolo con freccia ↗ |
| `themes/au-studio.js` | Blu navy `#0f3a66` e oro `#b8902a` come il listino PDF, Lora + Poppins, filetti sottili, angoli appena arrotondati |
| `themes/minimal-lusso.js` | Bianco/nero, Cormorant Garamond + Jost, niente angoli né ombre, tanto spazio vuoto |
| `themes/boutique-romantica.js` | Crema, cipria e legno di rosa, Playfair Display + Nunito Sans, bottoni a pillola, card arrotondate e centrate |
| `themes/street-urban.js` | Nero su cemento con fasce arancio, Anton (maiuscolo, enorme) + Space Grotesk, zero angoli, bordi pieni e ombre "dure" |
| `themes/classico-sartoriale.js` | Blu notte e oro su avorio, Libre Baskerville + Source Sans 3, angoli appena accennati, griglia ordinata a 3 colonne |

## Selettore di anteprima (solo in locale)

Con `npm run dev` in basso a sinistra compare il riquadro "Anteprima tema": una
tendina con tutti i file di `themes/` che cambia il tema al volo, senza
ricaricare la pagina e senza modificare `theme.js`. Ricaricando la pagina si
torna al tema di `theme.js`.

- `next.config.mjs` legge la cartella `themes/` solo in fase di sviluppo e
  passa l'elenco come `process.env.THEME_PREVIEW_LIST`. Un tema nuovo
  compare nella tendina dopo aver riavviato `npm run dev`.
- `pages/_app.js` carica `components/ThemePreview.jsx` solo se
  `NODE_ENV === "development"`: nel build per il sito online il selettore e
  gli altri temi non vengono inclusi (verificato sul contenuto di `.next/`).
- Per questo i componenti leggono le opzioni del tema con `useTheme()`
  (`lib/use-theme.js`) e non con `import theme from "../theme"`, che è
  riservato a `pages/_app.js`, `lib/use-theme.js` e al selettore.
  Sul sito online `useTheme()` restituisce sempre il tema di `theme.js`.
- `import.meta.glob` non funziona in questo progetto (con il percorso iCloud
  restituisce un elenco vuoto): per questo l'elenco arriva da next.config.

## Cosa contiene un tema

Ogni file in `themes/` esporta un oggetto con queste sezioni (vedi
`themes/minimal-lusso.js` come modello commentato):

- `fonts`: font dei titoli (`heading`) e del testo (`body`), caricati con
  `next/font/google` nel file del tema stesso. Sono ospitati dal sito, senza
  richieste a Google (ok GDPR), e si scaricano solo quelli del tema attivo.
- `colors.light`: i colori del sito (sfondo, testo, bordi, bottone
  principale, accento, fasce scure, saldi, successo...). I temi contengono
  ancora `colors.dark`, ma non si usa: la modalità scura è stata tolta.
- `typography`: peso, spaziatura, maiuscolo e scala dei titoli; stile degli
  occhielli (il testo piccolo sopra i titoli).
- `radius`: arrotondamenti di bottoni, campi, filtri, badge, card, immagini, pannelli.
- `spacing`: larghezza massima, margini laterali, aria tra le sezioni, distanza tra le card.
- `shadows`: ombre delle card e degli elementi in rilievo.
- `buttons`: misure, carattere ed effetto al passaggio dei bottoni.
  `arrow` (facoltativo) è il simbolo dopo il testo di ogni bottone, es. `"↗"`.
- `card`: aspetto della card prodotto (proporzione della foto, bordo,
  allineamento, cosa mostrare, tipo di bottone "Aggiungi").
- `layout`: card per riga, stile del menu, segnaposto nei colori del tema o del prodotto.

L'elenco completo delle voci obbligatorie è in `lib/theme-css.js`. Se in un
tema ne manca una, in sviluppo compare un errore che dice quale.

## Come arriva lo stile ai componenti

1. `pages/_app.js` passa il tema attivo a `themeCss()` (`lib/theme-css.js`),
   che lo trasforma in variabili CSS: `--c-*` per i colori, più `--f-*`, `--r-*`, `--sp-*`,
   `--sh-*`, `--btn-*` e `--card-*`.
2. `styles/globals.css` collega quelle variabili alle classi Tailwind:
   `bg-surface`, `text-fg-muted`, `border-line`, `rounded-card`,
   `font-heading`, `py-section`, `gap-grid`, `shadow-card`...
   Lo stesso file definisce le classi composte: `heading-display`,
   `heading-1`/`-2`/`-3`, `eyebrow`, `btn-primary`/`btn-secondary`/`btn-inverse`,
   `btn-ghost` (solo bordo, nel colore del testo intorno), `btn-on-primary`
   (pieno, sopra la fascia `bg-primary`), più `btn-sm` e `btn-plain` (senza
   freccia), `link-more`, `hero-backdrop`, `type-in` + `caret` (titolo che si
   scrive), `product-card*`, `page-container`.
3. Le scelte di struttura (es. `card.addButton`, `layout.gridColumns`,
   `layout.navStyle`) i componenti le leggono direttamente con
   `const { card, layout } = useTheme()` (vedi "Selettore di anteprima").

## Regole per chi modifica i componenti

- **Niente valori di stile nei componenti**: solo le classi del tema
  elencate sopra. La palette standard di Tailwind è disattivata
  (`--color-*: initial`), quindi `bg-white`, `text-red-600`, ecc. non funzionano.
- Le misure di layout (`grid-cols-*`, `gap-4`, `text-sm`, `p-6`...) sono
  ammesse. Colori, font, arrotondamenti, ombre e spaziature delle sezioni no.
- `inverseAccent` è l'accento leggibile sulle fasce scure (occhielli, parole
  in corsivo, nome gigante nel footer).
- Un nuovo colore, prima di usarlo, va aggiunto a `COLOR_KEYS` in
  `lib/theme-css.js`, a `@theme inline` in `styles/globals.css` e a **tutti**
  i temi, in `colors.light`.
- Ogni modifica va verificata con almeno due temi.

## Modalità scura

Tolta: il sito è sempre chiaro, anche se il dispositivo è impostato in
modalità scura. Non c'è più il pulsante in header né lo script in
`pages/_document.js`.

## Contatti e prezzi

- `lib/store.js`: numero WhatsApp, messaggio precompilato ("Ciao Alessio,
  vorrei informazioni per il mio negozio"), email, Instagram.
- `lib/listino.js`: le 3 strade e i servizi aggiuntivi con i prezzi, presi da
  `../LISTINO-PREZZI-AU-STUDIO-NUOVO.pdf`. Se cambia il listino si aggiorna
  solo questo file.
- `public/lavori/`: foto dei lavori realizzati (Lumière Candles).
- `lib/portfolio.js` + `public/portfolio/*.jpg`: i siti fatti per attività
  vere (Rumino, Carpe Diem, Le Falesie, L'Amicizia, La Finestra sul Lago)
  della sezione "Come potrebbe essere il tuo", mostrati da
  `components/MockupShowcase.jsx`. Le immagini sono screenshot dei siti in
  `~/Desktop/LAVORI` (1440×900 da computer, 390×844 da telefono).
  `status: "Proposta"` = anteprima non ancora comprata; quando diventa
  cliente si mette `"Cliente"` e l'`url` del sito online (compare il link).

## Interazioni della landing

- Struttura della pagina: apertura scura (`bg-inverse`) a tutto schermo con
  cornice sottile, poi sezioni numerate "01 · …" fino a "07 · Contatti"
  (`SectionHead` in `pages/index.jsx`). Le parole in corsivo nei titoli sono
  `<em className="text-accent">` (`text-inverse-accent` sulle fasce scure).
  Fondi alternati: `bg-surface-alt`, `bg-bg`, `bg-inverse` (Lavori, Contatti,
  footer) e la fascia `bg-primary` dopo i lavori.
- `components/Header.jsx`: fisso, trasparente sopra l'apertura e pieno
  (`bg-inverse`) appena si scorre. Sta sempre su fondo scuro, come il footer.
  A destra "Scrivimi" e il menu a tre linee: apre una tendina con le
  sezioni (pannello a destra da computer, a tutta larghezza da telefono),
  si chiude con Esc, toccando fuori o scegliendo una sezione.
- `components/PathCards.jsx`: le 3 strade, una per riga come un indice;
  toccandola si apre la tendina con i dettagli (spunte verdi = colori
  `success` / `successSoft` del tema).
- `components/WhatsAppFloat.jsx`: tondo da telefono; da computer compare con
  la scritta solo dopo l'apertura.
- `components/Reveal.jsx` + `lib/use-in-view.js`: le sezioni compaiono
  salendo quando arrivano sullo schermo. Senza JavaScript (e sul server) il
  contenuto resta visibile; con "riduci movimento" attivo non si anima niente.
- `components/Header.jsx`: barra di lettura e voce del menu evidenziata
  per la sezione in cui ci si trova.

## Creare un nuovo tema

1. Copia `themes/minimal-lusso.js` in `themes/<nome>.js`.
2. Cambia font, colori (`colors.light`) e le altre voci.
3. Aggiungi il nome nell'elenco in `theme.js` e nella tabella qui sopra.
4. Prova tutta la pagina, da telefono e da computer.
