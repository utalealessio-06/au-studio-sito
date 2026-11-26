import { useEffect, useRef, useState } from "react";

// Dice se un elemento è sullo schermo (IntersectionObserver).
// Restituisce `null` finché non è stato misurato (sul server e al primo
// disegno): i componenti in quel caso mostrano il contenuto normalmente,
// così senza JavaScript non sparisce niente.
//
// - rootMargin: restringe la zona "visibile", es. "-45% 0px -45% 0px" =
//   solo la fascia centrale dello schermo.
// - once: dopo la prima volta resta `true` (per le animazioni di entrata).
// - replay: torna `false` solo quando l'elemento esce dal BASSO dello
//   schermo (si sta scorrendo verso l'alto), così l'entrata si ripete
//   quando si torna giù. Se esce dall'alto resta `true`: risalendo la
//   pagina si trova già piena.
export function useInView({ rootMargin = "0px", once = false, replay = false } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const leftAbove = !entry.isIntersecting && entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0);
        setInView(entry.isIntersecting || (replay && leftAbove));
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, once, replay]);

  return [ref, inView];
}
