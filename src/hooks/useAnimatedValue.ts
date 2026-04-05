import { useEffect, useRef, useState } from 'react';

export function useAnimatedValue(target: number, duration = 1000) {
  const [current, setCurrent] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef(0);

  useEffect(
    function animateValue() {
      const from = prevRef.current;
      const to = target;
      if (from === to) {
        return;
      }

      const start = performance.now();

      function tick(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setCurrent(Math.round(from + (to - from) * eased));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          prevRef.current = to;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    },
    [target, duration]
  );

  return current;
}
