import Logo from "./Logo";
import { CITY, OWNER_NAME, STORE_NAME } from "../lib/store";

// I contatti sono nella sezione "Contatti" subito sopra: qui solo la firma.
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-inverse-fg/10 bg-inverse text-inverse-muted">
      <div className="page-container flex flex-col gap-3 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo inverted />
          <p className="mt-2">Siti e negozi online per i negozi di {CITY}.</p>
        </div>
        <p className="text-xs">© {year} {STORE_NAME} di {OWNER_NAME}</p>
      </div>
    </footer>
  );
}
