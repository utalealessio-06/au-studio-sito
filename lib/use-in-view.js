import { useEffect, useRef, useState } from "react";

// Dice se un elemento è sullo schermo (IntersectionObserver).
// Restituisce `null` finché non è stato misurato (sul server e al primo
// disegno): i componenti in quel caso mostrano il contenuto normalmente,
// così senza JavaScript non sparisce niente.
//
// - rootMargin: restringe la zona "visibile", es. "-45% 0px -45% 0px" =
//   solo la fascia centrale dello schermo.
// - once: dopo la prima volta resta `true` (per le animazioni di entrata).
export function useInView({ rootMargin = "0px", once = false } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return [ref, inView];
}
