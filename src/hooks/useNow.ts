import { useEffect, useState } from 'react';

// Re-renders consumers every `intervalMs` so time-based checks stay current.
export function useNow(intervalMs = 5_000): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(
    function tick() {
      const id = setInterval(() => setNow(Date.now()), intervalMs);
      return () => clearInterval(id);
    },
    [intervalMs]
  );

  return now;
}
