import { useId, useState } from "react";
import PriceRow from "./PriceRow";
import WhatsAppButton from "./WhatsAppButton";
import { CLIENTI, SHOPIFY, VETRINA } from "../lib/listino";

// Le 3 strade, una card per strada: numero, titolo e prezzo.
// Toccando una card si apre la tendina con tutti i dettagli.

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
      <div className="rounded-card bg-accent-soft p-6 text-fg sm:p-8">
        <p>
          <span className="heading text-5xl tabular-nums">{VETRINA.price}</span>{" "}
          <span className="heading text-xl text-fg-muted">{VETRINA.unit}</span>
        </p>
        <p className="mt-2 text-sm text-fg-muted">{VETRINA.setup}</p>
        <p className="mt-5 border-l-2 border-accent pl-4 text-sm text-fg-muted">{VETRINA.terms}</p>
        <WhatsAppButton className="btn-primary mt-6 w-full sm:w-auto">Voglio il sito vetrina</WhatsAppButton>
      </div>
      <CheckList items={VETRINA.features} className="self-center" />
      <div className="flex flex-col gap-3 rounded-card border border-dashed border-line-strong/40 p-5 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">Oppure</p>
          <p className="mt-2 font-medium text-fg">{VETRINA.once.name}</p>
          <p className="mt-1 text-sm text-fg-muted">{VETRINA.once.text}</p>
        </div>
        <p className="shrink-0 text-right">
          <span className="heading block text-4xl text-fg">{VETRINA.once.price}</span>
          <span className="block text-xs text-fg-muted">{VETRINA.once.unit}</span>
        </p>
      </div>
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

function PathCard({ path, number, open, onToggle }) {
  const panelId = useId();
  const { Details } = path;

  return (
    <li
      id={path.id}
      className={`scroll-mt-28 rounded-panel border bg-surface shadow-card transition-[border-color] duration-200 ${open ? "border-line-strong" : "border-line"}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 p-6 text-left sm:grid-cols-[auto_1fr_auto_auto] sm:gap-x-6 sm:p-8"
      >
        <span className="hidden h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-sm font-medium tabular-nums text-fg sm:flex">
          {String(number).padStart(2, "0")}
        </span>
        <span className="min-w-0">
          <span className="block text-sm text-fg-muted">{path.question}</span>
          <span className="heading mt-1.5 block text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] text-fg">{path.title}</span>
          <span className="mt-2 block text-sm font-medium text-fg sm:hidden">{path.from}</span>
        </span>
        <span className="hidden text-right sm:block">
          <span className="heading block text-xl tabular-nums text-fg">{path.from}</span>
          <span className="mt-1 block text-xs text-fg-subtle">{open ? "Chiudi" : "Vedi cosa include"}</span>
        </span>
        {/* Niente scala sulla card intera (è grande): la pressione la mostra il cerchio. */}
        <span
          aria-hidden="true"
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl font-light transition-[background-color,color,rotate,scale] duration-200 ease-out group-active:scale-90 ${
            open ? "rotate-45 bg-primary text-primary-fg" : "bg-accent-soft text-fg group-hover:bg-fg-subtle"
          }`}
        >
          +
        </span>
      </button>

      {/* Tendina: si apre in modo fluido animando l'altezza della griglia (0fr → 1fr). */}
      <div
        id={panelId}
        inert={!open}
        className={`grid ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] duration-300" : "grid-rows-[0fr] duration-200"
        } transition-[grid-template-rows]`}
      >
        <div className="overflow-hidden">
          {/* Il contenuto sfuma e scende di poco mentre la tendina si apre. */}
          <div
            className={`border-t border-line px-6 pb-8 pt-6 transition-[opacity,translate] ease-out sm:px-8 motion-reduce:translate-y-0 ${
              open ? "translate-y-0 opacity-100 delay-75 duration-300" : "-translate-y-1 opacity-0 duration-150"
            }`}
          >
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

  return (
    <ol className="space-y-3">
      {PATHS.map((path, index) => (
        <PathCard
          key={path.id}
          path={path}
          number={index + 1}
          open={openId === path.id}
          onToggle={() => setOpenId((current) => (current === path.id ? null : path.id))}
        />
      ))}
    </ol>
  );
}
