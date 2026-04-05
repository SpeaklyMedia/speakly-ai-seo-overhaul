import { useEffect } from "react";

export function useCardFocus(): void {
  useEffect(() => {
    /* ── Mouse hover (runs on ALL environments) ───────────────────
       Document-level mouseover/mouseout delegation — works inside
       canvas iframes regardless of (hover:none) media query.      */
    function onOver(e: MouseEvent) {
      const card = (e.target as Element | null)?.closest?.(".glass-card");
      if (card && !card.classList.contains("is-focused")) {
        card.classList.add("is-focused");
      }
    }

    function onOut(e: MouseEvent) {
      const card = (e.target as Element | null)?.closest?.(".glass-card");
      if (!card) return;
      if (!card.contains(e.relatedTarget as Node | null)) {
        card.classList.remove("is-focused");
      }
    }

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    /* ── Scroll-based touch focus (coarse-pointer touch devices only) */
    let scrollActive: Element | null = null;
    let scrollFn: (() => void) | null = null;

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)");
    if (isTouch.matches) {
      scrollFn = () => {
        const targetY = window.innerHeight * 0.35;
        const cards = Array.from(document.querySelectorAll(".glass-card"));
        let closest: Element | null = null;
        let minDist = Infinity;

        for (const card of cards) {
          const rect = card.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
          if (rect.width === 0 && rect.height === 0) continue;
          if (card.classList.contains("reveal") && !card.classList.contains("is-visible")) continue;
          const dist = Math.abs(rect.top - targetY);
          if (dist < minDist) { minDist = dist; closest = card; }
        }

        if (closest !== scrollActive) {
          scrollActive?.classList.remove("is-focused");
          closest?.classList.add("is-focused");
          scrollActive = closest;
        }
      };

      scrollFn();
      window.addEventListener("scroll", scrollFn, { passive: true });
      window.addEventListener("resize", scrollFn, { passive: true });
    }

    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (scrollFn) {
        window.removeEventListener("scroll", scrollFn);
        window.removeEventListener("resize", scrollFn);
        scrollActive?.classList.remove("is-focused");
      }
    };
  }, []);
}
