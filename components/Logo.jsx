import { CITY, OWNER_NAME, STORE_NAME } from "../lib/store";

// Il nome dello studio nel font dei titoli, con il nome del titolare sotto
// in piccolo. Sta sempre su una fascia scura (header e footer).
export default function Logo() {
  return (
    <a href="#top" className="flex flex-col leading-none text-inverse-fg" aria-label={`${STORE_NAME}, torna all’inizio`}>
      <span className="font-heading text-[1.75rem] tracking-[0.01em] sm:text-[2rem]">{STORE_NAME}</span>
      <span className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-inverse-muted">
        {OWNER_NAME} · {CITY}
      </span>
    </a>
  );
}
