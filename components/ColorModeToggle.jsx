import { setColorMode, useColorMode } from "../lib/color-mode";

export default function ColorModeToggle({ className = "" }) {
  const mode = useColorMode();
  const next = mode === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setColorMode(next)}
      aria-label={next === "dark" ? "Attiva la modalità scura" : "Attiva la modalità chiara"}
      className={className}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        {/* Prima dell'hydration non si sa quale icona mostrare: resta vuota. */}
        {mode === "dark" && (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
          </>
        )}
        {mode === "light" && <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />}
      </svg>
    </button>
  );
}
