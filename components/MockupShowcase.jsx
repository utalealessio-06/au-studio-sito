import Image from "next/image";
import Reveal from "./Reveal";
import { MOCKUPS } from "../lib/portfolio";
import { whatsappUrl } from "../lib/store";

// Una schermata da computer dentro la finestra del browser, con la versione
// da telefono appoggiata sopra. Passando il mouse la pagina scorre fino in fondo.
function Devices({ mockup }) {
  return (
    <div className="group relative pb-8 pr-5">
      <div className="overflow-hidden rounded-media border border-line bg-surface shadow-card">
        <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="ml-2 truncate rounded-input bg-surface-alt px-3 py-0.5 text-[10px] text-fg-muted">
            {mockup.domain}
          </span>
        </div>
        <div className="aspect-16/10">
          <Image
            src={mockup.desktop}
            alt={`Esempio di sito per ${mockup.name}, da computer`}
            unoptimized
            className="h-full w-full object-cover object-top transition-[object-position] duration-4000 ease-in-out group-hover:object-bottom motion-reduce:transition-none"
          />
        </div>
      </div>

      {/* Telefono */}
      <div className="absolute bottom-0 right-0 w-[28%] rounded-[1.25rem] bg-fg p-1 shadow-card">
        <Image
          src={mockup.mobile}
          alt={`Lo stesso sito da telefono`}
          unoptimized
          className="aspect-9/19 w-full rounded-2xl object-cover object-top"
        />
      </div>
    </div>
  );
}

export default function MockupShowcase() {
  return (
    <ul className="grid grid-cols-1 gap-x-grid gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {MOCKUPS.map((mockup, index) => (
        <Reveal as="li" key={mockup.name} delay={index * 120} className="flex min-w-0 flex-col">
          <Devices mockup={mockup} />
          <p className="eyebrow mt-6 text-accent">{mockup.path}</p>
          <h3 className="heading-3 mt-2 text-fg">{mockup.name}</h3>
          <p className="mt-1 text-sm text-fg-muted">
            {mockup.kind} · {mockup.price}
          </p>
          <ul className="mt-4 border-t border-line text-sm text-fg-muted">
            {mockup.points.map((point) => (
              <li key={point} className="flex gap-3 border-b border-line py-2.5">
                <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
          <a
            href={whatsappUrl(`Ciao Alessio, ho visto l’esempio “${mockup.name}”: vorrei un sito così per il mio negozio`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 text-sm font-medium text-fg underline decoration-accent underline-offset-4 hover:text-accent"
          >
            Ne voglio uno così →
          </a>
        </Reveal>
      ))}
    </ul>
  );
}
