import { formatPrice } from "./format";

// Dati del negozio e ordini via WhatsApp: il cliente compone il carrello sul
// sito e lo invia al negozio con un messaggio già compilato.

// DA COMPLETARE per ogni cliente: solo cifre, con prefisso internazionale e
// senza "+" (es. "393331234567").
export const WHATSAPP_NUMBER = "390000000000";

export const STORE_NAME = "Regalo Artigianato";

export function whatsappUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Messaggio d'ordine precompilato con tutti gli articoli del carrello.
export function orderMessage(items, { subtotal, shipping, total }, { name = "", notes = "" } = {}) {
  const lines = items.map(
    (item) => `• ${item.name} × ${item.qty} — ${formatPrice(item.price * item.qty)}`
  );

  return [
    `Ciao ${STORE_NAME}! Vorrei ordinare:`,
    "",
    ...lines,
    "",
    `Subtotale: ${formatPrice(subtotal)}`,
    `Spedizione: ${shipping === 0 ? "gratuita" : formatPrice(shipping)}`,
    `Totale: ${formatPrice(total)}`,
    name.trim() ? `Nome: ${name.trim()}` : null,
    notes.trim() ? `Note: ${notes.trim()}` : null,
    "",
    "Mi confermate disponibilità e modalità di pagamento? Grazie!",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

// Domanda veloce su un singolo prodotto dalla scheda prodotto.
export function productQuestionMessage(product) {
  return `Ciao ${STORE_NAME}! Vorrei informazioni su: ${product.name}. È disponibile?`;
}

export const CONTACT_MESSAGE = `Ciao ${STORE_NAME}! Vorrei un'informazione.`;
