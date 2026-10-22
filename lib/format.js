const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

const euroNoDecimals = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function formatPrice(value, { decimals = true } = {}) {
  return (decimals ? euro : euroNoDecimals).format(value);
}
