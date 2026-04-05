import { useState, useEffect, useRef, RefObject } from "react";

export function useInView<T extends HTMLElement = HTMLDivElement>(options: IntersectionObserverInit = {}): {
  ref: RefObject<T | null>;
  isInView: boolean;
} {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // Wait one rAF so the browser's hash-anchor scroll has settled, then
    // check if the element is already above the viewport. If it is (i.e. the
    // page loaded at a hash anchor below this element), mark it visible
    // immediately without registering the observer — prevents opacity:0 lock
    // when the user scrolls up from a hash link.
    const raf = requestAnimationFrame(() => {
      if (!ref.current) return;

      if (ref.current.getBoundingClientRect().bottom <= 0) {
        setIsInView(true);
        return;
      }

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(ref.current!);
        }
      }, {
        threshold: 0.1,
        ...options
      });

      observer.observe(ref.current);

      // Store cleanup on the raf callback's closure
      (currentRef as any).__io_cleanup = () => observer.unobserve(ref.current!);
    });

    return () => {
      cancelAnimationFrame(raf);
      (currentRef as any).__io_cleanup?.();
    };
  }, []);

  return { ref, isInView };
}
