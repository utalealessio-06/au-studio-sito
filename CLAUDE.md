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
| `themes/muschio.js` | **Tema del sito.** Scuro e architettonico: carbone `#121212`, muschio `#3B3C2E`, verde chiaro `#737158`, cemento `#707070`, grigio chiaro `#E1E1E1`; Inter Tight semibold + corsivo Instrument Serif, angoli quasi vivi (rettangoli come i blocchi della palette) |
| `themes/avorio.js` | Chiaro e caldo, palette `#f4f5ef` (avorio) `#aba398` (tortora) `#07080d` (quasi nero), tortora scurito per i testi piccoli; Inter Tight + corsivo Instrument Serif, bottoni a pillola neri, card arrotondate con ombre morbide |
| `themes/ardesia.js` | Scuro blu-ardesia, palette `#06141B` `#11212D` `#253745` `#4A5C6A` `#9BA8AB` `#CCD0CF`; Inter Tight + corsivo Instrument Serif per le parole in evidenza, bottoni a pillola, card arrotondate con ombre profonde |
| `themes/grigio.js` | Come editoriale ma in scala di grigi: tortora `#a8a19b` per bottoni e fascia centrale, grigio-azzurro `#99a3ad` come accento, fasce antracite `#3b3b3b`, fondo `#f7f7f7` |
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
  `next/font/google` nel file del tema stesso. Per i font variabili (es.
  Inter Tight) non indicare `weight`: con Turbopack un elenco di pesi rompe
  la build ("next/font/google queries have exactly one entry"). Sono ospitati dal sito, senza
  richieste a Google (ok GDPR), e si scaricano solo quelli del tema attivo.
- `colors.light`: i colori del sito (sfondo, testo, bordi, bottone
  principale, accento, fasce scure, saldi, successo...). I temi contengono
  ancora `colors.dark`, ma non si usa: la modalità scura è stata tolta.
- `typography`: peso, spaziatura, maiuscolo e scala dei titoli; stile degli
  occhielli (il testo piccolo sopra i titoli).
- `radius`: arrotondamenti di bottoni, campi, filtri, badge, card, immagini, pannelli.
- `spacing`: larghezza massima, margini laterali, aria tra le sezioni, distanza tra le card.
- `shadows`: ombre delle card e degli elementi in rilievo.
- `scheme` (facoltativo): `"dark"` per i temi con fondo scuro (barre di
  scorrimento e controlli del browser scuri). Di base `"light"`.
- `fonts.accent` (facoltativo): font delle parole in corsivo nei titoli
  (`<em>`). Se manca, resta il font dei titoli.
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
   freccia), `link-more`, `hero-backdrop`, `rise` / `wipe` (entrata
   dell'apertura, ritardo con `[--d:80ms]`), `accordion` (tendine
   `<details>` fluide), `glow` (luce morbida sul fondo), `product-card*`,
   `page-container`.
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
- `lib/portfolio.js` + `public/portfolio/*.jpg`: `LIVE_WORKS` sono i siti
  fatti e già online (SB · Sebastian Balaniuc, sbcontents.com), nella
  "Prova 1"; `MOCKUPS` sono le Proposte per attività vere (Rumino, Carpe
  Diem, L'Amicizia, La Finestra sul Lago), nella "Prova 2". Entrambi
  mostrati da `components/MockupShowcase.jsx` (prop `items`). Testi e punti
  dei lavori: solo cose che ci sono davvero sul sito, niente inventato. Le immagini sono screenshot dei siti in
  `~/Desktop/LAVORI` (1440×900 da computer, 390×844 da telefono).
  `status: "Proposta"` = anteprima non ancora comprata; quando diventa
  cliente si mette `"Cliente"` e l'`url` del sito online (compare il link).

## Logica del copy: APSOC

La pagina segue APSOC del "Manuale del copywriting" (Attenzione, Problema,
Soluzione, Obiezioni, Call to action). Lo schema è anche in cima a
`pages/index.jsx`. Regola rigida: **prima il problema, poi la soluzione**.

| Sezione | APSOC | Cosa fa |
| --- | --- | --- |
| Apertura | Attenzione | Titolo sul pain point in seconda persona ("Alle otto abbassi la saracinesca. / I tuoi clienti continuano a cercarti."), cosa faccio in una frase, USP in 3 parti, CTA con nota |
| 01 · Ti riconosci? | Problema | Storia della cliente alle nove di sera ("mostra, non dire"), 3 problemi, conseguenza del non agire (effetto domino) |
| 02 · La soluzione | Soluzione | 3 vantaggi (Ti trovano / Ti scrivono / Ti scelgono), USP "perché me e non un'agenzia", valore condiviso (negozi di quartiere) |
| 03 · Prezzi | Soluzione | Le 3 strade con i prezzi scritti |
| 04 · Come funziona | Soluzione | Chiarezza sul post-acquisto: cosa succede, passo per passo, dopo il primo messaggio |
| 05 · Perché fidarti | Obiezioni | L'obiezione più forte ("non mi conosci") con CPB: Claim, 3 Prove (Lumière online, Proposte fatte prima del pagamento, garanzie reali), Benefit |
| Fascia `bg-primary` | CTA | Conseguenza del non agire + scadenza vera del listino |
| 06 · Domande | Obiezioni | Le altre obiezioni, dalla più forte alla più debole |
| 07 · Contatti | CTA | CTA profonda ("Fai trovare il tuo negozio") e cosa succede quando si preme |

Regole per chi cambia i testi:
- Sotto ogni CTA c'è `CtaNote`: dice cosa succede quando si preme
  ("Si apre WhatsApp con il messaggio già scritto · Nessun impegno").
- Niente recensioni, numeri o statistiche inventati: si usano solo prove
  vere (siti online, garanzie del listino). L'unica urgenza è la scadenza
  reale `PRICES_VALID_UNTIL`.
- Grassetto solo sulle parole che convincono ("prezzo scritto", "gratuito").
- Liste da 3 dove possibile (regola del 3), frasi brevi.

## Movimento (Emil Kowalski)

Le curve sono in `@theme` in `styles/globals.css` e sostituiscono quelle di
Tailwind: `ease-out` = `cubic-bezier(0.23, 1, 0.32, 1)`, `ease-in-out` =
`cubic-bezier(0.77, 0, 0.175, 1)`, `ease-drawer`.

- **Quale curva:** cose che entrano/escono → `ease-out`; cose che si
  spostano o cambiano forma sullo schermo → `ease-in-out`; hover e colori →
  `ease`. Mai `ease-in`.
- **Quanto dura:** pressione 160 ms, tendine e popover 150–250 ms (sotto i
  300 ms), chiusura sempre più rapida dell'apertura. L'entrata dell'apertura
  e le foto che si scoprono possono durare di più (si vedono una volta).
- **Bottoni:** `scale(0.97)` alla pressione (nella classe `btn`). I cerchi
  "+" delle tendine scendono a `scale-90` con `group-active`.
- **Menu:** si apre dall'angolo del bottone (`origin-top-right`), da
  `scale-[0.97]` + opacità, mai da `scale(0)`. Chiuso con **Esc** sparisce
  senza animazione: le azioni da tastiera non si animano.
- **Hover:** solo con il mouse (`@media (hover: hover) and (pointer: fine)`;
  in Tailwind v4 la variante `hover:` lo fa già).
- **Proprietà:** solo quelle dichiarate (`transition-[opacity,translate]`),
  mai `transition-all`. Si animano `transform`/`opacity`/`clip-path`; le
  tendine animano l'altezza perché serve.
- **Scaglionamenti:** brevi e non uniformi (60–120 ms), mai bloccanti.
- **Riduci movimento:** niente spostamenti, ma le dissolvenze restano
  (`Reveal`, `rise`, `wipe`, `accordion`).

## Interazioni della landing

- Layout "a strati" (`pages/index.jsx`): apertura con il titolo a sinistra
  e a destra la pila di pillole dell'USP (`PillStack`, dalla più scura alla
  più chiara, l'ultima è il contatto WhatsApp). Le sezioni usano due schemi:
  `Split` (titolo fermo a sinistra mentre le card scorrono a destra) e
  `CenterHead` (titolo centrato e griglia di card sotto). Le card hanno la
  classe `CARD` (`rounded-panel border bg-surface shadow-card`); l'etichetta
  di sezione è `Chip` ("01 · Ti riconosci?"). Le forme seguono il raggio del
  tema (`rounded-btn`, `rounded-chip`...), non `rounded-full`: pillole con
  avorio, rettangoli con muschio. Restano tondi solo i cerchi con i numeri
  e il pulsante WhatsApp da telefono. Le parole in
  corsivo nei titoli sono `<em className="text-accent">`.
- `components/Header.jsx`: capsula sospesa in alto (fissa), con logo,
  "Scrivimi" e menu a tre linee; si fa più compatta appena si scorre e ha
  la barra di lettura sul bordo inferiore. La tendina si chiude con Esc,
  toccando fuori o scegliendo una sezione. `NAV_LINKS` ha il numero della
  sezione (`n`).
- `components/PathCards.jsx`: le 3 strade, una card per strada;
  toccandola si apre la tendina con i dettagli (spunte verdi = colori
  `success` / `successSoft` del tema).
- `components/MockupShowcase.jsx`: una card per sito; con il mouse sopra il
  telefono si solleva appena. `children` aggiunge card in fondo alla griglia.
- `components/Footer.jsx`: una card con sezioni e contatti e il nome dello
  studio gigante, appena visibile.
- `components/WhatsAppFloat.jsx`: tondo da telefono; da computer compare con
  la scritta solo dopo l'apertura.
- `components/Reveal.jsx` + `lib/use-in-view.js`: le sezioni compaiono
  salendo quando arrivano sullo schermo. Senza JavaScript (e sul server) il
  contenuto resta visibile. `ImageReveal` in `pages/index.jsx` scopre la
  foto di Lumière dall'alto con `clip-path`.

## Creare un nuovo tema

1. Copia `themes/minimal-lusso.js` in `themes/<nome>.js`.
2. Cambia font, colori (`colors.light`) e le altre voci.
3. Aggiungi il nome nell'elenco in `theme.js` e nella tabella qui sopra.
4. Prova tutta la pagina, da telefono e da computer.
