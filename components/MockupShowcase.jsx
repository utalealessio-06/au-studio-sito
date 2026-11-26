import Image from "next/image";
import Reveal from "./Reveal";
import { MOCKUPS } from "../lib/portfolio";
import { whatsappUrl } from "../lib/store";

// Una card per sito, con la schermata da computer dentro la finestra del
// browser e quella da telefono appoggiata sopra. Serve sia per i siti
// online (`LIVE_WORKS`) sia per le Proposte (`MOCKUPS`).

export function Devices({ mockup }) {
  return (
    <div className="relative pb-8 pr-5">
      <div className="overflow-hidden rounded-media border border-line bg-bg">
        <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-accent-soft" />
          <span className="h-2 w-2 rounded-full bg-accent-soft" />
          <span className="h-2 w-2 rounded-full bg-accent-soft" />
          <span className="ml-2 truncate rounded-chip bg-surface px-3 py-0.5 text-[10px] text-fg-subtle">
            {mockup.url ? mockup.url.replace(/^https?:\/\//, "") : mockup.name}
          </span>
        </div>
        <Image
          src={mockup.desktop}
          alt={`Il sito di ${mockup.name}, da computer`}
          sizes="(min-width: 768px) 45vw, 90vw"
          placeholder="blur"
          className="aspect-16/10 h-auto w-full object-cover object-top"
        />
      </div>

      {/* Telefono: con il mouse sopra la card si solleva appena. */}
      <div className="absolute bottom-0 right-0 w-[26%] rounded-[1.25rem] bg-bg p-1 shadow-pop ring-1 ring-line-strong transition-[translate] duration-300 ease-out group-hover:-translate-y-1.5 motion-reduce:translate-y-0!">
        <Image
          src={mockup.mobile}
          alt={`Il sito di ${mockup.name}, da telefono`}
          sizes="(min-width: 768px) 12vw, 26vw"
          placeholder="blur"
          className="aspect-390/844 h-auto w-full rounded-2xl object-cover object-top"
        />
      </div>
    </div>
  );
}

// `items`: i siti da mostrare (di base le Proposte, `MOCKUPS`).
// `start`: numero del primo progetto della lista.
// `children`: elementi <li> in più in fondo alla griglia (es. un invito).
export default function MockupShowcase({ items = MOCKUPS, start = 1, children }) {
  return (
    <ul className="grid grid-cols-1 gap-grid md:grid-cols-2">
      {items.map((mockup, index) => (
        <Reveal
          as="li"
          key={mockup.name}
          delay={(index % 2) * 90}
          className="group flex min-w-0 flex-col rounded-panel border border-line bg-surface p-3 shadow-card sm:p-4"
        >
          <Devices mockup={mockup} />

          <div className="flex flex-1 flex-col px-3 pb-3 pt-4 sm:px-4">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h3 className="heading text-[clamp(1.5rem,1.2rem+1vw,2rem)] text-fg">{mockup.name}</h3>
              <span className="rounded-chip bg-accent-soft px-3 py-1 text-xs tabular-nums text-fg-muted">
                {String(start + index).padStart(2, "0")} · {mockup.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-fg-subtle">{mockup.kind}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {mockup.points.map((point) => (
                <li key={point} className="rounded-chip border border-line px-3 py-1 text-xs text-fg-muted">
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-6 text-sm font-medium text-fg">
              {mockup.url && (
                <a href={mockup.url} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-fg">
                  Guarda il sito <span aria-hidden="true">↗</span>
                </a>
              )}
              <a
                href={whatsappUrl(`Ciao Alessio, ho visto il sito di “${mockup.name}”: vorrei qualcosa di simile per la mia attività`)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-fg"
              >
                Ne voglio uno così <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </Reveal>
      ))}
      {children}
    </ul>
  );
}
