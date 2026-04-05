import { useEffect } from "react";

export function useCardFocus(): void {
  useEffect(() => {
    /* ── Touch scroll-focus (coarse-pointer, no-hover devices only) ──────────
       Desktop hover is handled entirely by CSS :hover — no JS needed there.
       This handler exists only for touch phones/tablets where :hover is
       unavailable.

       The algorithm groups visible glass-cards into "rows" by approximate
       rect.top similarity (cards within ±20 px share the same row). It then
       finds the row whose top edge is closest to the 35 vh target, applies a
       40 px hysteresis deadband so the active row only changes once the new
       row is meaningfully closer — preventing oscillation at row boundaries.
       Within the winning row the currently-active card is kept if it already
       belongs to that row; otherwise the DOM-first card in the row is used.

       Media query: (hover: none) and (pointer: coarse)
         - matches: touch phones, touch tablets (Android, iOS)
         - does NOT match: desktop browsers, canvas iframes (always fine-pointer)
         - does NOT match: stylus/pen devices (pointer: fine even on tablets)  */

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)");
    if (!isTouch.matches) return;

    let scrollActive: Element | null = null;
    // Distance from the 35vh target to the currently-active row's representative top.
    // Initialise to Infinity so the first scroll always picks a row.
    let activeRowDist = Infinity;

    /** Group an array of [element, rect] pairs into rows by approximate rect.top. */
    function groupIntoRows(
      entries: Array<[Element, DOMRect]>
    ): Array<Array<[Element, DOMRect]>> {
      const rows: Array<Array<[Element, DOMRect]>> = [];

      for (const entry of entries) {
        const top = entry[1].top;
        // Find an existing row whose representative top is within ±20 px.
        const existingRow = rows.find(
          (row) => Math.abs(row[0][1].top - top) <= 20
        );
        if (existingRow) {
          existingRow.push(entry);
        } else {
          rows.push([entry]);
        }
      }

      return rows;
    }

    const DEADBAND = 40; // px — minimum improvement before switching active row

    const scrollFn = () => {
      const targetY = window.innerHeight * 0.35;

      // Collect all visible, non-hidden glass-cards with their current rects.
      const entries: Array<[Element, DOMRect]> = [];
      for (const card of document.querySelectorAll(".glass-card")) {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
        if (rect.width === 0 && rect.height === 0) continue;
        if (card.classList.contains("reveal") && !card.classList.contains("is-visible")) continue;
        entries.push([card, rect]);
      }

      if (entries.length === 0) {
        // Nothing visible — clear focus
        if (scrollActive) {
          scrollActive.classList.remove("is-focused");
          scrollActive = null;
          activeRowDist = Infinity;
        }
        return;
      }

      // Group into rows, then find the row closest to the target.
      const rows = groupIntoRows(entries);

      let bestRow: Array<[Element, DOMRect]> | null = null;
      let bestDist = Infinity;
      for (const row of rows) {
        const rowTop = row[0][1].top; // representative top for the row
        const dist = Math.abs(rowTop - targetY);
        if (dist < bestDist) {
          bestDist = dist;
          bestRow = row;
        }
      }

      if (!bestRow) return;

      // Apply hysteresis: only switch active row if the winning row is at least
      // DEADBAND px closer than the currently-active row's distance.
      const shouldSwitch = bestDist < activeRowDist - DEADBAND;

      if (!shouldSwitch && scrollActive) {
        // Keep the current active card — no switch needed.
        return;
      }

      // Determine the card to focus within the winning row.
      // Prefer keeping the currently-active card if it lives in that row.
      let newActive: Element | null = null;
      if (
        scrollActive &&
        bestRow.some(([card]) => card === scrollActive)
      ) {
        newActive = scrollActive; // already in the winning row — keep it
      } else {
        newActive = bestRow[0][0]; // fall back to DOM-first in the row
      }

      if (newActive !== scrollActive) {
        scrollActive?.classList.remove("is-focused");
        newActive.classList.add("is-focused");
        scrollActive = newActive;
      }

      // Update the tracked distance for the now-active row.
      activeRowDist = bestDist;
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
