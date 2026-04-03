import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  duration?: number;
  enabled?: boolean;
}

export function useCountUp(target: number, options: UseCountUpOptions = {}): number {
  const { duration = 1400, enabled = false } = options;
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!enabled || hasStarted.current) return;
    hasStarted.current = true;
    startRef.current = performance.now();

    function step(now: number) {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, target, duration]);

  return count;
}
