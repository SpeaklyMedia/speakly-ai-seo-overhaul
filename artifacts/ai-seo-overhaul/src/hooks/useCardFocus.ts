import { useEffect } from "react";

export function useCardFocus(): void {
  useEffect(() => {
    const noHover = window.matchMedia("(hover: none)");
    if (!noHover.matches) return;

    let active: Element | null = null;

    function updateFocus() {
      const targetY = window.innerHeight * 0.35;
      const cards = Array.from(document.querySelectorAll(".glass-card"));

      let closest: Element | null = null;
      let minDist = Infinity;

      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
        // Skip hidden / display:none responsive duplicates
        if (rect.width === 0 && rect.height === 0) continue;
        // Skip cards whose reveal animation hasn't completed yet
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
  }, []);
}
