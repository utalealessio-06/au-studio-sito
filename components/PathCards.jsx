import { useEffect, useId, useRef, useState } from "react";
import PriceRow from "./PriceRow";
import WhatsAppButton from "./WhatsAppButton";
import { CLIENTI, SHOPIFY, VETRINA } from "../lib/listino";

// Le 3 strade. Scorrendo, la card che passa al centro dello schermo si
// ingrandisce; toccandola si apre la tendina con tutti i dettagli.

function Check() {
  return (
    <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
        <path d="M5 10.5l3.2 3L15 6.5" />
      </svg>
    </span>
  );
}

function CheckList({ items, className = "" }) {
  return (
    <ul className={`space-y-3 text-sm text-fg-muted ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function VetrinaDetails() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-panel bg-inverse p-6 text-inverse-fg">
        <p>
          <span className="heading text-5xl">{VETRINA.price}</span>{" "}
          <span className="heading text-xl text-inverse-muted">{VETRINA.unit}</span>
        </p>
        <p className="mt-2 text-sm text-inverse-muted">{VETRINA.setup}</p>
        <p className="mt-5 border-l-2 border-accent pl-4 text-sm text-inverse-muted">{VETRINA.terms}</p>
        <WhatsAppButton className="btn-inverse mt-6 w-full sm:w-auto">Voglio il sito vetrina</WhatsAppButton>
      </div>
      <CheckList items={VETRINA.features} className="self-center" />
    </div>
  );
}

function ShopifyDetails() {
  return (
    <>
      <div className="grid gap-grid md:grid-cols-3">
        {SHOPIFY.plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-card border p-5 ${plan.popular ? "border-fg bg-surface-alt" : "border-line"}`}
          >
            {plan.popular && <p className="eyebrow mb-1 text-accent">Il più scelto</p>}
            <p className="heading-3 text-fg">{plan.name}</p>
            <p className="mt-1 text-sm text-fg-muted">{plan.for}</p>
            <p className="heading mt-4 text-4xl text-fg">{plan.price}</p>
            <p className="mt-1 text-xs text-fg-muted">una volta sola</p>
            {plan.includes && <p className="mt-5 text-sm font-medium text-fg">{plan.includes}</p>}
            <CheckList items={plan.features} className={plan.includes ? "mt-3" : "mt-5"} />
          </div>
        ))}
      </div>

      <div className="mt-grid flex flex-col gap-3 rounded-card border border-dashed border-line-strong/40 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">Versione leggera</p>
          <p className="mt-2 font-medium text-fg">{SHOPIFY.light.name}</p>
          <p className="mt-1 text-sm text-fg-muted">{SHOPIFY.light.text}</p>
        </div>
        <p className="heading text-4xl text-fg">{SHOPIFY.light.price}</p>
      </div>
      <p className="mt-4 text-xs text-fg-muted">{SHOPIFY.note}</p>
    </>
  );
}

function ClientiDetails() {
  return (
    <ul className="border-y border-line">
      {CLIENTI.items.map((item) => (
        <PriceRow key={item.name} {...item} />
      ))}
    </ul>
  );
}

const PATHS = [
  { id: "vetrina", ...VETRINA, from: `${VETRINA.price} ${VETRINA.unit}`, Details: VetrinaDetails },
  { id: "shopify", ...SHOPIFY, from: `da ${SHOPIFY.plans[0].price}, una volta sola`, Details: ShopifyDetails },
  { id: "clienti", ...CLIENTI, from: `da ${CLIENTI.items[1].price}`, Details: ClientiDetails },
];

// Indice della card più vicina al centro dello schermo: una sola alla volta.
// `null` finché non si è misurato (sul server tutte appaiono attive) e quando
// le card sono lontane dallo schermo.
function useCenteredIndex(listRef) {
  const [index, setIndex] = useState(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const center = window.innerHeight / 2;
      let best = null;
      let bestDistance = window.innerHeight * 0.6;
      [...(listRef.current?.children ?? [])].forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const distance = rect.top <= center && rect.bottom >= center ? 0 : Math.min(Math.abs(rect.top - center), Math.abs(rect.bottom - center));
        if (distance < bestDistance) {
          best = i;
          bestDistance = distance;
        }
      });
      setIndex(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [listRef]);

  return index;
}

function PathCard({ path, number, open, active, onToggle }) {
  const panelId = useId();
  const { Details } = path;

  return (
    <li
      id={path.id}
      className={`scroll-mt-24 rounded-card border bg-surface transition-[scale,opacity,box-shadow,border-color] duration-500 ease-out motion-reduce:transition-none ${
        active ? "scale-100 border-fg opacity-100 shadow-pop" : "scale-[0.96] border-line opacity-60 motion-reduce:scale-100"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 p-5 text-left sm:gap-6 sm:p-7"
      >
        <span
          className={`heading flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-2xl transition-colors duration-500 ${
            active ? "border-accent bg-accent text-accent-fg" : "border-line text-accent"
          }`}
        >
          {number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-fg-muted">{path.question}</span>
          <span className="heading mt-1 block text-2xl text-fg">{path.title}</span>
          <span className="mt-1 block text-sm font-medium text-fg sm:hidden">{path.from}</span>
        </span>
        <span className="hidden text-right sm:block">
          <span className="block font-medium text-fg">{path.from}</span>
          <span className="block text-xs text-fg-muted">{open ? "Chiudi" : "Vedi cosa include"}</span>
        </span>
        <span
          aria-hidden="true"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M5 8l5 5 5-5" />
          </svg>
        </span>
      </button>

      {/* Tendina: si apre in modo fluido animando l'altezza della griglia (0fr → 1fr). */}
      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line px-5 pb-6 pt-5 sm:px-7 sm:pb-8">
            <p className="mb-6 max-w-2xl text-fg-muted">{path.intro}</p>
            <Details />
          </div>
        </div>
      </div>
    </li>
  );
}

export default function PathCards() {
  const [openId, setOpenId] = useState(null);
  const listRef = useRef(null);
  const centered = useCenteredIndex(listRef);

  return (
    <ol ref={listRef} className="space-y-4">
      {PATHS.map((path, index) => (
        <PathCard
          key={path.id}
          path={path}
          number={index + 1}
          open={openId === path.id}
          active={openId === path.id || centered === null || centered === index}
          onToggle={() => setOpenId((current) => (current === path.id ? null : path.id))}
        />
      ))}
    </ol>
  );
}
