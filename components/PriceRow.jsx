// Riga del listino: nome, descrizione e prezzo allineato a destra.
export default function PriceRow({ name, text, price, unit }) {
  return (
    <li className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-line py-4 last:border-b-0 sm:grid-cols-[14rem_1fr_auto]">
      <p className="font-medium text-fg">{name}</p>
      <p className="order-last col-span-2 text-sm text-fg-muted sm:order-0 sm:col-span-1">{text}</p>
      <p className="text-right font-heading text-xl leading-none text-fg">
        {price}
        {unit && <span className="mt-1 block font-body text-xs text-fg-muted">{unit}</span>}
      </p>
    </li>
  );
}
