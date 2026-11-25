import Image from "next/image";
import Reveal from "./Reveal";
import { MOCKUPS } from "../lib/portfolio";
import { whatsappUrl } from "../lib/store";

// Sta nella sezione "Lavori", su fascia scura (bg-inverse).

// Lo screenshot da computer dentro la finestra del browser, con quello da
// telefono appoggiato sopra.
function Devices({ mockup }) {
  return (
    <div className="relative pb-8 pr-5">
      <div className="overflow-hidden rounded-media border border-inverse-fg/15 bg-surface">
        <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="ml-2 truncate rounded-input bg-surface-alt px-3 py-0.5 text-[10px] text-fg-muted">
            {mockup.url ? mockup.url.replace(/^https?:\/\//, "") : mockup.name}
          </span>
        </div>
        <div className="relative">
          <Image
            src={mockup.desktop}
            alt={`Il sito di ${mockup.name}, da computer`}
            sizes="(min-width: 768px) 45vw, 90vw"
            placeholder="blur"
            className="aspect-16/10 h-auto w-full object-cover object-top"
          />
          <span className="absolute left-3 top-3 bg-inverse/85 px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-inverse-fg">
            {mockup.status}
          </span>
        </div>
      </div>

      {/* Telefono */}
      <div className="absolute bottom-0 right-0 w-[26%] rounded-[1.25rem] bg-inverse p-1 shadow-pop ring-1 ring-inverse-fg/25">
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

// `start`: numero del primo progetto (il lavoro in evidenza sopra è lo 01).
export default function MockupShowcase({ start = 1 }) {
  return (
    <ul className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
      {MOCKUPS.map((mockup, index) => (
        <Reveal as="li" key={mockup.name} delay={(index % 2) * 120} className={`flex min-w-0 flex-col ${index % 2 ? "md:mt-18" : ""}`}>
          <Devices mockup={mockup} />

          <div className="mt-5 grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-1 border-t border-inverse-fg/15 pt-5 sm:grid-cols-[auto_1fr_auto]">
            <span className="text-[0.7rem] tracking-[0.12em] text-inverse-muted">{String(start + index).padStart(2, "0")}</span>
            <h3 className="heading text-[clamp(1.75rem,1.3rem+1.4vw,2.4rem)] text-inverse-fg">{mockup.name}</h3>
            <small className="col-start-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-inverse-muted sm:col-start-auto">
              {mockup.kind}
            </small>
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-inverse-muted">
            {mockup.points.map((point, i) => (
              <li key={point} className="flex gap-4">
                {i > 0 && <span aria-hidden="true" className="text-inverse-accent">·</span>}
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-inverse-fg">
            {mockup.url && (
              <a href={mockup.url} target="_blank" rel="noopener noreferrer" className="link-more hover:text-inverse-accent!">
                Guarda il sito <span aria-hidden="true">↗</span>
              </a>
            )}
            <a
              href={whatsappUrl(`Ciao Alessio, ho visto il sito di “${mockup.name}”: vorrei qualcosa di simile per la mia attività`)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-more hover:text-inverse-accent!"
            >
              Ne voglio uno così <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
