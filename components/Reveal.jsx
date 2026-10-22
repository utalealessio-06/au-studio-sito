import { useInView } from "../lib/use-in-view";

// Il contenuto sale e compare quando arriva sullo schermo, una volta sola.
// `delay` (ms) serve a farne comparire diversi uno dopo l'altro.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...props }) {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -10% 0px", once: true });
  const hidden = inView === false;

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${
        hidden ? "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100" : "translate-y-0 opacity-100"
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
