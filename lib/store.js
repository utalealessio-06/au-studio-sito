// Dati dello studio e contatti. Il pulsante WhatsApp apre la chat con un
// messaggio già scritto: il cliente deve solo premere "invia".

// Solo cifre, con prefisso internazionale e senza "+".
export const WHATSAPP_NUMBER = "393516869664";

export const STORE_NAME = "AU STUDIO";
export const OWNER_NAME = "Alessio Utale";
export const CITY = "Roma";

export const PHONE_DISPLAY = "351 686 9664";
export const EMAIL = "utalealessio@icloud.com";
export const INSTAGRAM = "alessio.agency";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM}/`;

export const CONTACT_MESSAGE = "Ciao Alessio, vorrei informazioni per il mio negozio";

export function whatsappUrl(text = CONTACT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
