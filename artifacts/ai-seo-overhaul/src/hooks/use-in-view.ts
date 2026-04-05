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

    // If the element is already above the current viewport (page loaded at a
    // hash anchor below this element), mark it visible immediately so reveal
    // animations don't leave it at opacity:0 when the user scrolls up to it.
    if (currentRef.getBoundingClientRect().bottom <= 0) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(currentRef);
      }
    }, {
      threshold: 0.1,
      ...options
    });

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, []);

  return { ref, isInView };
}
