import type { Donation } from '@/lib/types';

const numberFormat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatValue(value: string): string {
  return numberFormat.format(parseFloat(value));
}

export function formatAmount(amount: Donation['amount']): string {
  const value = formatValue(amount.value);
  if (amount.currency === 'USD') {
    return `$${value}`;
  }
  return `${amount.currency} ${value}`;
}

export function formatAmountParts(amount: Donation['amount']): { whole: string; cents: string } {
  const value = formatValue(amount.value);
  const dotIndex = value.lastIndexOf('.');
  const intPart = value.slice(0, dotIndex);
  const centsPart = value.slice(dotIndex + 1);
  const whole = amount.currency === 'USD' ? `$${intPart}` : `${amount.currency} ${intPart}`;
  return { whole, cents: `.${centsPart}` };
}

export function isAnonymous(name: string): boolean {
  return name.toLowerCase() === 'anonymous';
}
