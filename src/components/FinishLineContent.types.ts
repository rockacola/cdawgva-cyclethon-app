import type { ReactNode } from 'react';

export interface InfoItem {
  detailKey: string;
  icon: ReactNode;
  labelKey: string;
}

export interface ReservationRow {
  labelKey: string;
  timeKey: string;
}

export interface SpecialPizza {
  nameKey: string;
  toppingsKey: string;
}
