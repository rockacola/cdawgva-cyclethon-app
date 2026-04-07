'use client';

import { createContext, useCallback, useContext, useState } from 'react';

import { DONATIONS_FULL_URL } from '@/lib/constants';
import { filterAndWarnCurrency } from '@/lib/donationUtils';
import type { Donation, DonationsData } from '@/lib/types';

interface DonationsContextValue {
  donations: Donation[];
  isRefreshing: boolean;
  lastCheckedAt: number;
  refresh: () => Promise<void>;
}

const DonationsContext = createContext<DonationsContextValue | null>(null);

interface Props {
  children: React.ReactNode;
  initialDonations: Donation[];
}

export function DonationsProvider({ children, initialDonations }: Props) {
  const [donations, setDonations] = useState<Donation[]>(() =>
    filterAndWarnCurrency(initialDonations)
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState(() => Math.floor(Date.now() / 1000));

  const refresh = useCallback(async function refresh() {
    setIsRefreshing(true);
    try {
      const res = await fetch(DONATIONS_FULL_URL, { cache: 'no-store' });
      const data: DonationsData = await res.json();
      setDonations(filterAndWarnCurrency(data.donations));
      setLastCheckedAt(Math.floor(Date.now() / 1000));
    } catch {
      // silently ignore poll failures
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  return (
    <DonationsContext.Provider value={{ donations, isRefreshing, lastCheckedAt, refresh }}>
      {children}
    </DonationsContext.Provider>
  );
}

export function useDonations(): DonationsContextValue {
  const ctx = useContext(DonationsContext);
  if (!ctx) {
    throw new Error('useDonations must be used within DonationsProvider');
  }
  return ctx;
}
