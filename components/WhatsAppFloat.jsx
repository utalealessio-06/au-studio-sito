import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappUrl } from "../lib/store";

// Pulsante WhatsApp sempre a portata di pollice, solo da telefono.
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivimi su WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-fg shadow-pop transition-colors hover:bg-primary-hover sm:hidden"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
