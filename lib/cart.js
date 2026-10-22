import { useSyncExternalStore } from "react";

// Carrello persistito in localStorage ed esposto come store esterno a React
// (useSyncExternalStore): Header, card e pagina carrello restano sincronizzati
// senza un Context, e il rendering lato server parte sempre da carrello vuoto.
// Ogni riga salva una "fotografia" del prodotto (nome, prezzo, aspetto), così il
// carrello resta leggibile anche quando il catalogo arriverà da Supabase.

const STORAGE_KEY = "regalo-artigianato:cart";

export const MAX_QUANTITY = 10;
export const FREE_SHIPPING_THRESHOLD = 60;
export const SHIPPING_COST = 6.9;

const EMPTY_CART = [];
const listeners = new Set();
let cachedRaw = null;
let cachedItems = EMPTY_CART;

function isValidItem(item) {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof item.slug === "string" &&
    typeof item.name === "string" &&
    Number.isFinite(item.price) &&
    Number.isInteger(item.qty) &&
    item.qty > 0
  );
}

// Restituisce sempre lo stesso array finché il contenuto salvato non cambia:
// useSyncExternalStore richiede snapshot stabili.
function readItems() {
  let raw;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return cachedItems;
  }
  if (raw === cachedRaw) return cachedItems;

  cachedRaw = raw;
  try {
    const parsed = raw ? JSON.parse(raw) : EMPTY_CART;
    cachedItems = Array.isArray(parsed) ? parsed.filter(isValidItem) : EMPTY_CART;
  } catch {
    cachedItems = EMPTY_CART;
  }
  return cachedItems;
}

function writeItems(items) {
  cachedRaw = JSON.stringify(items);
  cachedItems = items;
  try {
    window.localStorage.setItem(STORAGE_KEY, cachedRaw);
  } catch {
    // Storage non disponibile (es. navigazione privata): il carrello resta in memoria.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  // Mantiene allineate più schede aperte sullo stesso sito.
  const onStorage = (event) => {
    if (event.key === null || event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getServerSnapshot = () => EMPTY_CART;
const roundCents = (value) => Math.round(value * 100) / 100;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function maxQuantityFor(product) {
  return clamp(product.stock ?? MAX_QUANTITY, 1, MAX_QUANTITY);
}

export function addToCart(product, quantity = 1) {
  const items = readItems();
  const maxQty = maxQuantityFor(product);
  const existing = items.find((item) => item.slug === product.slug);

  if (existing) {
    writeItems(
      items.map((item) =>
        item.slug === product.slug
          ? { ...item, maxQty, qty: Math.min(item.qty + quantity, maxQty) }
          : item
      )
    );
    return;
  }

  writeItems([
    ...items,
    {
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image ?? null,
      icon: product.icon,
      tone: product.tone,
      maxQty,
      qty: clamp(quantity, 1, maxQty),
    },
  ]);
}

export function updateQuantity(slug, quantity) {
  writeItems(
    readItems().map((item) =>
      item.slug === slug
        ? { ...item, qty: clamp(quantity, 1, item.maxQty ?? MAX_QUANTITY) }
        : item
    )
  );
}

export function removeFromCart(slug) {
  writeItems(readItems().filter((item) => item.slug !== slug));
}

export function clearCart() {
  writeItems(EMPTY_CART);
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, readItems, getServerSnapshot);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = roundCents(
    items.reduce((sum, item) => sum + item.price * item.qty, 0)
  );
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  return {
    items,
    count,
    subtotal,
    shipping,
    total: roundCents(subtotal + shipping),
  };
}

const noopSubscribe = () => () => {};

// `false` durante SSR e hydration, `true` dopo: evita di mostrare il
// "carrello vuoto" per un istante prima di aver letto localStorage.
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}
