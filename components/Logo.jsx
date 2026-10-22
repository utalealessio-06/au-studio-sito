import { OWNER_NAME, STORE_NAME } from "../lib/store";

// Come l'intestazione del listino: "AU STUDIO" in grassetto, il nome accanto.
export default function Logo({ inverted = false }) {
  return (
    <a href="#top" className="font-heading text-lg leading-none" aria-label={`${STORE_NAME}, torna all’inizio`}>
      <span className={`font-bold tracking-wide ${inverted ? "text-inverse-fg" : "text-fg"}`}>{STORE_NAME}</span>{" "}
      <span className={inverted ? "text-inverse-muted" : "text-fg"}>{OWNER_NAME}</span>
    </a>
  );
}
