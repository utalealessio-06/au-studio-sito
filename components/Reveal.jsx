import { useInView } from "../lib/use-in-view";

// Il contenuto sale e compare quando arriva sullo schermo, una volta sola.
// `delay` (ms) serve a farne comparire diversi uno dopo l'altro: tienilo
// breve (40–120 ms tra un elemento e l'altro), sennò la pagina sembra lenta.
// Con "riduci movimento" non si sposta: sfuma soltanto.
// Senza JavaScript (e sul server) il contenuto è sempre visibile.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...props }) {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -12% 0px", once: true });
  const hidden = inView === false;

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,translate] duration-[650ms] ease-out motion-reduce:transition-opacity motion-reduce:duration-300 ${
        hidden ? "translate-y-4 opacity-0 motion-reduce:translate-y-0" : "translate-y-0 opacity-100"
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
