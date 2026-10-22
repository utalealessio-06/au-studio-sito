import Link from "next/link";

export default function Logo({ inverted = false }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="Regalo Artigianato, torna alla home"
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-badge font-heading text-base ${
          inverted ? "bg-inverse-fg text-inverse" : "bg-fg text-bg"
        }`}
      >
        RA
      </span>
      <span className="leading-tight">
        <span className={`heading block text-xl ${inverted ? "text-inverse-fg" : "text-fg"}`}>
          Regalo Artigianato
        </span>
        <span className={`eyebrow block text-[10px] ${inverted ? "text-inverse-muted" : "text-accent"}`}>
          Made in Italy
        </span>
      </span>
    </Link>
  );
}
