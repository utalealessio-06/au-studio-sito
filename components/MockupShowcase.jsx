import Image from "next/image";
import Reveal from "./Reveal";
import { MOCKUPS } from "../lib/portfolio";
import { whatsappUrl } from "../lib/store";

// Lo screenshot da computer dentro la finestra del browser, con quello da
// telefono appoggiato sopra.
function Devices({ mockup }) {
  return (
    <div className="relative pb-8 pr-5">
      <div className="overflow-hidden rounded-media border border-line bg-surface shadow-card">
        <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="ml-2 truncate rounded-input bg-surface-alt px-3 py-0.5 text-[10px] text-fg-muted">
            {mockup.url ? mockup.url.replace(/^https?:\/\//, "") : mockup.name}
          </span>
        </div>
        <Image
          src={mockup.desktop}
          alt={`Il sito di ${mockup.name}, da computer`}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
          placeholder="blur"
          className="aspect-16/10 h-auto w-full object-cover object-top"
        />
      </div>

      {/* Telefono */}
      <div className="absolute bottom-0 right-0 w-[28%] rounded-[1.25rem] bg-fg p-1 shadow-card">
        <Image
          src={mockup.mobile}
          alt={`Il sito di ${mockup.name}, da telefono`}
          sizes="(min-width: 1024px) 9vw, 26vw"
          placeholder="blur"
          className="aspect-390/844 h-auto w-full rounded-2xl object-cover object-top"
        />
      </div>
    </div>
  );
}

export default function MockupShowcase() {
  return (
    <ul className="grid grid-cols-1 gap-x-grid gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {MOCKUPS.map((mockup, index) => (
        <Reveal as="li" key={mockup.name} delay={(index % 3) * 120} className="flex min-w-0 flex-col">
          <Devices mockup={mockup} />
          <p className="eyebrow mt-6 text-accent">{mockup.status}</p>
          <h3 className="heading-3 mt-2 text-fg">{mockup.name}</h3>
          <p className="mt-1 text-sm text-fg-muted">{mockup.kind}</p>
          <ul className="mt-4 border-t border-line text-sm text-fg-muted">
            {mockup.points.map((point) => (
              <li key={point} className="flex gap-3 border-b border-line py-2.5">
                <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            {mockup.url && (
              <a
                href={mockup.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline decoration-accent underline-offset-4 hover:text-accent"
              >
                Guarda il sito <span aria-hidden="true">↗</span>
              </a>
            )}
            <a
              href={whatsappUrl(`Ciao Alessio, ho visto il sito di “${mockup.name}”: vorrei qualcosa di simile per la mia attività`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg underline decoration-accent underline-offset-4 hover:text-accent"
            >
              Ne voglio uno così →
            </a>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
