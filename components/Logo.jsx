import { OWNER_NAME, STORE_NAME } from "../lib/store";

// Come l'intestazione del listino: "AU STUDIO" in grassetto, il nome accanto.
export default function Logo({ inverted = false }) {
  return (
    <a href="#top" className="font-heading text-lg leading-tight sm:leading-none" aria-label={`${STORE_NAME}, torna all’inizio`}>
      <span className={`font-bold tracking-wide ${inverted ? "text-inverse-fg" : "text-fg"}`}>{STORE_NAME}</span>{" "}
      {/* Da telefono il nome va sotto, su una riga sua, invece di spezzarsi a caso. */}
      <span className={`block sm:inline ${inverted ? "text-inverse-muted" : "text-fg"}`}>{OWNER_NAME}</span>
    </a>
  );
}
