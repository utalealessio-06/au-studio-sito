import { useSyncExternalStore } from "react";
import siteTheme from "../theme";

// Tema attivo per i componenti. Sul sito pubblicato è sempre quello di
// theme.js; solo in anteprima locale (npm run dev) il selettore
// components/ThemePreview.jsx può sostituirlo al volo con setPreviewTheme.

let previewTheme = null;
const listeners = new Set();

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setPreviewTheme(theme) {
  previewTheme = theme;
  listeners.forEach((listener) => listener());
}

export function useTheme() {
  return useSyncExternalStore(
    subscribe,
    () => previewTheme ?? siteTheme,
    () => siteTheme
  );
}
