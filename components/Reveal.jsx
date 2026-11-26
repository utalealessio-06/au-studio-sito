import { useInView } from "../lib/use-in-view";

// Il contenuto sale e compare quando arriva sullo schermo. Scorrendo verso
// l'alto, quando esce dal basso svanisce, e ricompare tornando giù
// (useInView con `replay`). Uscita più rapida dell'entrata (300 contro
// 650 ms) e senza scaglionamento.
// `delay` (ms) serve a farne comparire diversi uno dopo l'altro: tienilo
// breve (40–120 ms tra un elemento e l'altro), sennò la pagina sembra lenta.
// Con "riduci movimento" non si sposta: sfuma soltanto.
// Senza JavaScript (e sul server) il contenuto è sempre visibile.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...props }) {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -12% 0px", replay: true });
  const hidden = inView === false;

  return (
    <Tag
      ref={ref}
      style={delay && !hidden ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,translate] ease-out motion-reduce:transition-opacity ${
        hidden ? "translate-y-4 opacity-0 duration-300 motion-reduce:translate-y-0" : "translate-y-0 opacity-100 duration-[650ms]"
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
