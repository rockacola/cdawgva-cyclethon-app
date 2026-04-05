import type { Donation } from '@/lib/types';

const numberFormat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatCents(amountCent: number): string {
  return numberFormat.format(amountCent / 100);
}

export function formatAmount(d: Pick<Donation, 'amount_cent' | 'amount_currency'>): string {
  const value = formatCents(d.amount_cent);
  if (d.amount_currency === 'USD') {
    return `$${value}`;
  }
  return `${d.amount_currency} ${value}`;
}

export function formatAmountParts(d: Pick<Donation, 'amount_cent' | 'amount_currency'>): {
  whole: string;
  cents: string;
} {
  const value = formatCents(d.amount_cent);
  const dotIndex = value.lastIndexOf('.');
  const intPart = value.slice(0, dotIndex);
  const centsPart = value.slice(dotIndex + 1);
  const whole = d.amount_currency === 'USD' ? `$${intPart}` : `${d.amount_currency} ${intPart}`;
  return { whole, cents: `.${centsPart}` };
}

export function isAnonymous(name: string): boolean {
  return name.toLowerCase() === 'anonymous';
}

const NEW_DONATION_THRESHOLD_MS = 10_000;

export function isNewDonation(completedAtSeconds: number, nowMs: number): boolean {
  return nowMs - completedAtSeconds * 1000 < NEW_DONATION_THRESHOLD_MS;
}

export function formatCurrency(cents: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
