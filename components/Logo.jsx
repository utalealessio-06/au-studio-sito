import { CITY, OWNER_NAME, STORE_NAME } from "../lib/store";

// Il nome dello studio, con il nome del titolare accanto in piccolo.
export default function Logo() {
  return (
    <a href="#top" className="flex items-baseline gap-2.5 text-fg" aria-label={`${STORE_NAME}, torna all’inizio`}>
      <span className="heading text-xl">{STORE_NAME}</span>
      <span className="hidden text-xs text-fg-subtle sm:inline">
        {OWNER_NAME} · {CITY}
      </span>
    </a>
  );
}
