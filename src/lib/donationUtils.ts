import type { Donation } from '@/lib/types';

export function formatAmount(amount: Donation['amount']): string {
  const value = parseFloat(amount.value).toFixed(2);
  if (amount.currency === 'USD') return `$${value}`;
  return `${amount.currency} ${value}`;
}

export function isAnonymous(name: string): boolean {
  return name.toLowerCase() === 'anonymous';
}
