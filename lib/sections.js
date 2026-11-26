import { CHI_SONO } from "./chi-sono";
import { RECENSIONI } from "./recensioni";

// Quali sezioni compaiono e con che numero ("01 · …"). Recensioni e Chi sono
// compaiono solo quando hanno contenuto vero; in anteprima (npm run dev) si
// vedono sempre, con un segnaposto, per poterle impostare.
const PREVIEW = process.env.NODE_ENV === "development";

export const SHOW_RECENSIONI = RECENSIONI.length > 0 || PREVIEW;
export const SHOW_CHI_SONO = CHI_SONO.paragrafi.length > 0 || PREVIEW;

const ORDER = [
  "problema",
  "soluzione",
  "prezzi",
  "come-funziona",
  "lavori",
  ...(SHOW_RECENSIONI ? ["recensioni"] : []),
  ...(SHOW_CHI_SONO ? ["chi-sono"] : []),
  "domande",
  "contatti",
];

// Numero a due cifre della sezione, es. num("prezzi") → "03".
export function num(id) {
  return String(ORDER.indexOf(id) + 1).padStart(2, "0");
}
