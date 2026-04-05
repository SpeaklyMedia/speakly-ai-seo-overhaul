import { useEffect } from "react";

export function useCardFocus(): void {
  useEffect(() => {
    /* ── Touch scroll-focus (coarse-pointer, no-hover devices only) ──────────
       Desktop hover is handled entirely by CSS :hover — no JS needed there.
       This handler exists only for touch phones/tablets where :hover is
       unavailable. It finds the glass-card closest to the 35vh mark and
       applies `is-focused` so the card gets the same lift/brighten treatment.

       Media query: (hover: none) and (pointer: coarse)
         - matches: touch phones, touch tablets (Android, iOS)
         - does NOT match: desktop browsers, canvas iframes (always fine-pointer)
         - does NOT match: stylus/pen devices (pointer: fine even on tablets)  */

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)");
    if (!isTouch.matches) return;

    let scrollActive: Element | null = null;

    const scrollFn = () => {
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

    // Defer initial run by one rAF so the page-load scroll position (hash
    // anchor) has settled before we sample card positions.
    const raf = requestAnimationFrame(scrollFn);

    window.addEventListener("scroll", scrollFn, { passive: true });
    window.addEventListener("resize", scrollFn, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scrollFn);
      window.removeEventListener("resize", scrollFn);
      scrollActive?.classList.remove("is-focused");
    };
  }, []);
}
