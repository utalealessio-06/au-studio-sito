import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappUrl } from "../lib/store";

export default function WhatsAppButton({ className = "btn-primary", children = "Scrivimi su WhatsApp" }) {
  return (
    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={className}>
      <WhatsAppIcon className="h-5 w-5" />
      {children}
    </a>
  );
}
