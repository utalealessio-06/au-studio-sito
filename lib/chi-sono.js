// La sezione "Chi sono". Solo cose vere, scritte in prima persona.
//
// Finché `paragrafi` è vuoto, la sezione sul sito online non compare;
// in anteprima (npm run dev) si vede con un riquadro segnaposto.
//
// Copy (Manuale del copywriting, obiezione "non mi fido di chi vende"):
// 1. chi sono e chi ti risponde; 2. il "100% personalizzato" mostrato, non
// solo detto; 3. l'età genera un'obiezione ("è giovane, inesperto"), quindi
// va gestita subito con prove vere (siti online, anteprima prima di pagare);
// 4. il cliente soddisfatto è un fatto reale (recensione di Sebastian).
export const CHI_SONO = {
  // Titolo della sezione. Se resta vuoto: "Piacere, sono Alessio."
  titolo: "",
  // I paragrafi del racconto, in ordine. Frasi brevi.
  paragrafi: [
    "Ho 20 anni, sono di Roma e faccio siti per i negozi e le attività di quartiere. Lavoro da solo: quando scrivi su WhatsApp, ti rispondo io. Non un commerciale, non un centralino.",
    "Ogni sito lo costruisco intorno a te. Prima della grafica ti chiedo cosa vendi, chi entra in negozio e cosa ti domandano ogni giorno. Poi metto sul sito proprio quelle risposte, con le tue foto e i tuoi colori. Nessun modello uguale per tutti.",
    "Lo so, 20 anni sono pochi. Per questo non ti chiedo di fidarti sulla parola: due siti fatti da me sono già online e puoi aprirli adesso dal telefono. E prima di pagare qualsiasi cosa, vedi l’anteprima del tuo.",
    "Il lavoro finisce quando il sito ti piace, non quando scade una data. Se c’è qualcosa da cambiare, me lo scrivi: a Sebastian le modifiche le ho fatte in giornata.",
  ],
  // Fatti brevi in evidenza, es. { label: "Base", value: "Roma" }.
  fatti: [
    { label: "Base", value: "Roma" },
    { label: "Ti risponde", value: "Sempre io" },
    { label: "Prima di pagare", value: "Vedi l’anteprima" },
  ],
};
