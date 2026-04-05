import { useEffect } from "react";

export function useCardFocus(): void {
  useEffect(() => {
    /* ── Touch scroll-focus (coarse-pointer, no-hover devices only) ──────────
       Desktop hover is handled entirely by CSS :hover — no JS needed there.
       This handler exists only for touch phones/tablets where :hover is
       unavailable.

       Algorithm (row-aware, with hysteresis):
       1. Collect all visible glass-cards with their current rects each frame.
       2. Group them into rows: cards whose rect.top values are within ±20 px
          of each other belong to the same row.
       3. Find the row whose representative top is closest to the 35 vh target.
       4. If ANY currently-focused card is already in that row → no-op
          (entire row is already active).
       5. If a different row would win, apply a 40 px deadband: only switch
          when the new row is at least 40 px closer than the CURRENT distance
          from the active row to the target (computed fresh this frame).
          This prevents oscillation at row boundaries.
       6. On a switch, add is-focused to EVERY card in the winning row so the
          whole row activates simultaneously.

       Media query: (hover: none) and (pointer: coarse)
         - matches: touch phones, touch tablets (Android, iOS)
         - does NOT match: desktop browsers, canvas iframes (fine-pointer)    */

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)");
    if (!isTouch.matches) return;

    // Track all cards in the currently-focused row (not just one).
    let scrollActive: Element[] = [];

    const DEADBAND = 40; // px — minimum improvement before switching rows
    const ROW_TOLERANCE = 20; // px — cards within this vertical range = same row

    /** Group [element, rect] pairs into rows by approximate rect.top. */
    function groupIntoRows(
      entries: Array<[Element, DOMRect]>
    ): Array<Array<[Element, DOMRect]>> {
      const rows: Array<Array<[Element, DOMRect]>> = [];
      for (const entry of entries) {
        const top = entry[1].top;
        const existing = rows.find(
          (row) => Math.abs(row[0][1].top - top) <= ROW_TOLERANCE
        );
        if (existing) {
          existing.push(entry);
        } else {
          rows.push([entry]);
        }
      }
      return rows;
    }

    /** Remove is-focused from every element in the active set and clear it. */
    function clearActive() {
      for (const el of scrollActive) {
        el.classList.remove("is-focused");
      }
      scrollActive = [];
    }

    const scrollFn = () => {
      const targetY = window.innerHeight * 0.35;

      // Collect all visible, non-hidden glass-cards with fresh rects.
      const entries: Array<[Element, DOMRect]> = [];
      for (const card of document.querySelectorAll(".glass-card")) {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
        if (rect.width === 0 && rect.height === 0) continue;
        if (
          card.classList.contains("reveal") &&
          !card.classList.contains("is-visible")
        ) continue;
        entries.push([card, rect]);
      }

      if (entries.length === 0) {
        clearActive();
        return;
      }

      const rows = groupIntoRows(entries);

      // Find the row closest to the 35 vh target.
      let bestRow: Array<[Element, DOMRect]> | null = null;
      let bestDist = Infinity;
      for (const row of rows) {
        const dist = Math.abs(row[0][1].top - targetY);
        if (dist < bestDist) {
          bestDist = dist;
          bestRow = row;
        }
      }

      if (!bestRow) return;

      // If ANY currently-focused card is in the winning row → entire row is
      // already active, nothing to do.
      const activeIsInBestRow =
        scrollActive.length > 0 &&
        bestRow.some(([card]) => scrollActive.includes(card));

      if (activeIsInBestRow) return;

      // Different row (or no active row yet).
      // Compute the CURRENT distance of the active row — fresh this frame —
      // so the deadband comparison is never stale.
      let activeRowDist = Infinity;
      if (scrollActive.length > 0) {
        for (const row of rows) {
          if (row.some(([card]) => scrollActive.includes(card))) {
            activeRowDist = Math.abs(row[0][1].top - targetY);
            break;
          }
        }
        // If scrollActive cards are no longer visible, activeRowDist stays
        // Infinity and we switch immediately to the best visible row.
      }

      // Apply hysteresis deadband — only switch when the new row is
      // meaningfully closer than the current active row (or there is no
      // active row yet, in which case activeRowDist is Infinity).
      if (scrollActive.length > 0 && bestDist >= activeRowDist - DEADBAND) return;

      // Switch to the winning row: activate EVERY card in it simultaneously.
      clearActive();
      scrollActive = bestRow.map(([card]) => card);
      for (const el of scrollActive) {
        el.classList.add("is-focused");
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
      clearActive();
    };
  }, []);
}
