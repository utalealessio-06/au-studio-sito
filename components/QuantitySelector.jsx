const SIZES = {
  sm: { button: "h-9 w-9", value: "w-8 text-sm" },
  md: { button: "h-11 w-11", value: "w-10 text-base" },
};

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  size = "md",
  label = "Quantità",
}) {
  const s = SIZES[size] ?? SIZES.md;
  const buttonClass = `${s.button} inline-flex items-center justify-center text-lg text-fg transition-colors hover:bg-surface-alt disabled:cursor-not-allowed disabled:text-fg-subtle disabled:hover:bg-transparent`;

  return (
    <div role="group" aria-label={label} className="inline-flex items-center overflow-hidden rounded-input bg-surface ring-1 ring-inset ring-line-strong">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Diminuisci quantità"
        className={buttonClass}
      >
        −
      </button>
      <span className={`${s.value} text-center font-medium tabular-nums text-fg`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Aumenta quantità"
        className={buttonClass}
      >
        +
      </button>
    </div>
  );
}
