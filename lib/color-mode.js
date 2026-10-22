import { useSyncExternalStore } from "react";

// Modalità chiara/scura, valida con qualunque tema (ogni tema definisce
// colors.light e colors.dark). Lo script in pages/_document.js imposta
// <html data-mode="..."> prima che la pagina compaia, così non c'è il lampo
// bianco; qui la si legge e la si cambia. Finché il visitatore non sceglie,
// il sito segue l'impostazione del suo dispositivo.

const STORAGE_KEY = "color-mode";
const SYSTEM_DARK = "(prefers-color-scheme: dark)";

export const colorModeScript = `(function(){var m;try{m=localStorage.getItem("${STORAGE_KEY}")}catch(e){}if(m!=="light"&&m!=="dark"){m=window.matchMedia("${SYSTEM_DARK}").matches?"dark":"light"}document.documentElement.dataset.mode=m})()`;

const listeners = new Set();

const isMode = (value) => value === "light" || value === "dark";

function readMode() {
  return document.documentElement.dataset.mode === "dark" ? "dark" : "light";
}

function storedMode() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isMode(value) ? value : null;
  } catch {
    return null;
  }
}

function applyMode(mode) {
  document.documentElement.dataset.mode = mode;
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  const media = window.matchMedia(SYSTEM_DARK);
  const onSystemChange = (event) => {
    if (!storedMode()) applyMode(event.matches ? "dark" : "light");
  };
  // Mantiene allineate più schede aperte sullo stesso sito.
  const onStorage = (event) => {
    if (event.key === STORAGE_KEY && isMode(event.newValue)) applyMode(event.newValue);
  };
  media.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function setColorMode(mode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Storage non disponibile: la scelta vale fino al ricaricamento.
  }
  applyMode(mode);
}

// `null` durante SSR e hydration: il server non conosce la scelta del visitatore.
export function useColorMode() {
  return useSyncExternalStore(subscribe, readMode, () => null);
}
