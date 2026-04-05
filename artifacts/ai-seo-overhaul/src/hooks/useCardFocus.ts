import { useEffect } from "react";

export function useCardFocus(): void {
  useEffect(() => {
    const noHover = window.matchMedia("(hover: none)");

    if (noHover.matches) {
      /* ── Touch / no-hover: scroll-based closest-card focus ── */
      let active: Element | null = null;

      function updateFocus() {
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
          if (dist < minDist) {
            minDist = dist;
            closest = card;
          }
        }

        if (closest !== active) {
          active?.classList.remove("is-focused");
          closest?.classList.add("is-focused");
          active = closest;
        }
      }

      updateFocus();
      window.addEventListener("scroll", updateFocus, { passive: true });
      window.addEventListener("resize", updateFocus, { passive: true });
      window.addEventListener("orientationchange", updateFocus, { passive: true });

      return () => {
        window.removeEventListener("scroll", updateFocus);
        window.removeEventListener("resize", updateFocus);
        window.removeEventListener("orientationchange", updateFocus);
        active?.classList.remove("is-focused");
      };
    } else {
      /* ── Desktop: JS mouseenter/mouseleave on every .glass-card ──
         Bypasses CSS :hover so hover brightening works in all
         preview/iframe contexts (canvas previews, embedded frames). */
      let removeListeners: (() => void) | null = null;

      function attachListeners() {
        const cards = Array.from(document.querySelectorAll<Element>(".glass-card"));

        const handlers = cards.map((card) => {
          function onEnter() { card.classList.add("is-focused"); }
          function onLeave() { card.classList.remove("is-focused"); }
          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
          return { card, onEnter, onLeave };
        });

        return () => {
          handlers.forEach(({ card, onEnter, onLeave }) => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
            card.classList.remove("is-focused");
          });
        };
      }

      const timer = setTimeout(() => {
        removeListeners = attachListeners();
      }, 80);

      return () => {
        clearTimeout(timer);
        removeListeners?.();
      };
    }
  }, []);
}
