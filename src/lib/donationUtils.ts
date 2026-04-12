import type { Donation, DonorTotal } from '@/lib/types';

const TRACKED_CURRENCY = 'USD';

export function aggregateByDonor(donations: Donation[]): DonorTotal[] {
  const map = new Map<string, DonorTotal>();
  for (const d of donations) {
    const key = d.donor_name.toLowerCase();
    const existing = map.get(key);
    if (existing) {
      existing.amount_cent += d.amount_cent;
      existing.count += 1;
    } else {
      map.set(key, {
        amount_cent: d.amount_cent,
        amount_currency: d.amount_currency,
        count: 1,
        donor_name: d.donor_name,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.amount_cent - a.amount_cent);
}

export function topByTransaction(donations: Donation[]): Donation[] {
  return [...donations].sort(
    (a, b) => b.amount_cent - a.amount_cent || a.completed_at - b.completed_at
  );
}

export function getTopDonationsForDay(
  donations: Donation[],
  start: number,
  end: number
): Donation[] {
  return donations
    .filter((d) => d.completed_at >= start && d.completed_at < end)
    .sort((a, b) => b.amount_cent - a.amount_cent)
    .slice(0, 10);
}

export function filterAndWarnCurrency(donations: Donation[]): Donation[] {
  const otherCurrencies = [
    ...new Set(donations.map((d) => d.amount_currency).filter((c) => c !== TRACKED_CURRENCY)),
  ];
  if (otherCurrencies.length > 0) {
    console.warn(
      '[TopDonors] Non-USD currencies detected — rankings only reflect USD donations. ' +
        'Multi-currency support needed for: ' +
        otherCurrencies.join(', ')
    );
  }
  return donations.filter((d) => d.amount_currency === TRACKED_CURRENCY);
}

const numberFormat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatCents(amountCent: number): string {
  return numberFormat.format(amountCent / 100);
}

export function formatAmount(amountCent: number, prefix: string): string {
  const { whole, cents } = formatAmountParts(amountCent, prefix);
  return `${whole}${cents}`;
}

export function formatAmountParts(
  amountCent: number,
  prefix: string
): {
  whole: string;
  cents: string;
} {
  const value = formatCents(amountCent);
  const dotIndex = value.lastIndexOf('.');
  const intPart = value.slice(0, dotIndex);
  const centsPart = value.slice(dotIndex + 1);
  const whole = `${prefix}${intPart}`;
  return { whole, cents: `.${centsPart}` };
}

export function isAnonymous(name: string): boolean {
  return name.toLowerCase() === 'anonymous';
}

const DONATION_AGE_HOT_MS = 10_000;
const DONATION_AGE_NEW_MS = 30_000;

export function getDonationBoxShadow(
  completedAtSeconds: number,
  nowMs: number,
  insetWidth: number
): string | undefined {
  const ageMs = nowMs - completedAtSeconds * 1000;
  if (ageMs < DONATION_AGE_HOT_MS) {
    return `inset ${insetWidth}px 0 0 0 var(--chakra-colors-orange-400)`;
  }
  if (ageMs <= DONATION_AGE_NEW_MS) {
    return `inset ${insetWidth}px 0 0 0 var(--chakra-colors-orange-200)`;
  }
  return undefined;
}
