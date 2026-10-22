import { useState } from "react";
import siteTheme from "../theme";
import { themeCss } from "../lib/theme-css";
import { setPreviewTheme, useTheme } from "../lib/use-theme";

// Selettore di temi per l'anteprima locale. Viene caricato da pages/_app.js
// SOLO con `npm run dev`: nel build per il sito online non esiste.
// Non modifica theme.js: ricaricando la pagina torna il tema "vero".

// Nomi dei file in themes/, letti da next.config.mjs all'avvio di npm run dev
// (un tema nuovo compare dopo aver riavviato). Ogni tema si carica solo quando
// lo si sceglie.
const THEME_NAMES = (process.env.THEME_PREVIEW_LIST ?? "").split(",").filter(Boolean);

const loadTheme = (name) => import(`../themes/${name}.js`);

export default function ThemePreview() {
  const active = useTheme();
  const [css, setCss] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function choose(name) {
    setError(null);
    if (name === siteTheme.name) {
      setCss("");
      setPreviewTheme(null);
      return;
    }
    setLoading(true);
    try {
      const theme = (await loadTheme(name)).default;
      // Le stesse variabili di _app.js, ma scritte dopo: vincono su quelle del sito.
      setCss(themeCss(theme));
      setPreviewTheme(theme);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      <div className="fixed bottom-4 right-4 z-50 w-64 rounded-panel bg-surface p-3 text-fg shadow-pop ring-1 ring-line">
        <label className="block">
          <span className="eyebrow text-fg-muted">Anteprima tema</span>
          <select
            value={active.name}
            onChange={(event) => choose(event.target.value)}
            disabled={loading}
            className="mt-1.5 w-full rounded-input bg-surface py-2 pl-3 pr-8 text-sm text-fg ring-1 ring-inset ring-line-strong focus:outline-none focus:ring-2 focus:ring-focus disabled:opacity-50"
          >
            {THEME_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
                {name === siteTheme.name ? " (theme.js)" : ""}
              </option>
            ))}
          </select>
        </label>
        <p className="mt-2 text-xs leading-snug text-fg-muted">
          {error ?? "Solo sul tuo computer. Il sito usa sempre il tema di theme.js."}
        </p>
      </div>
    </>
  );
}
