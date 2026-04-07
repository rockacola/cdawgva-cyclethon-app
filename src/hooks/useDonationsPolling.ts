import { useEffect } from 'react';

import { useDonations } from '@/contexts/DonationsContext';

export function useDonationsPolling(intervalMs: number) {
  const { refresh } = useDonations();

  useEffect(
    function startPolling() {
      const id = setInterval(refresh, intervalMs);
      return () => clearInterval(id);
    },
    [intervalMs, refresh]
  );
}
