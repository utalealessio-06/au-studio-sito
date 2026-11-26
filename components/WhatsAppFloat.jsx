import { useEffect, useState } from "react";
import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappUrl } from "../lib/store";

// Pulsante WhatsApp sempre a portata: tondo da telefono, con la scritta da
// computer. Da computer compare solo dopo l'apertura (lì c'è già "Scrivimi").
function usePastHero() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const update = () => setPast(window.scrollY > window.innerHeight * 0.7);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return past;
}

export default function WhatsAppFloat() {
  const past = usePastHero();

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivimi su WhatsApp"
      // Entra in 250 ms, esce in 150 ms: chiusure sempre più rapide delle aperture.
      className={`btn-primary fixed bottom-4 right-4 z-40 h-14 w-14 rounded-full p-0! shadow-pop transition-[opacity,translate,transform,background-color]! ease-out after:content-none! sm:bottom-7 sm:right-7 sm:h-auto sm:w-auto sm:rounded-btn sm:px-[1.375rem]! sm:py-4! sm:after:content-[var(--btn-arrow)]! motion-reduce:translate-y-0! ${
        past ? "duration-250" : "duration-150 sm:pointer-events-none sm:translate-y-3 sm:opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-5 sm:w-5" />
      <span className="hidden sm:inline">Scrivimi su WhatsApp</span>
    </a>
  );
}
