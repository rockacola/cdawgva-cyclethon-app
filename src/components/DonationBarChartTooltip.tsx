import type { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { TooltipProps } from 'recharts/types/component/Tooltip';

import type { ActivityBucket } from '@/hooks/useActivityBuckets';
import { formatCurrency } from '@/lib/donationUtils';

type Props = TooltipProps<ValueType, NameType> & {
  bg: string;
  borderColor: string;
  endLabel: string;
  payload?: readonly Payload<ValueType, NameType>[];
  textColor: string;
};

export function DonationBarChartTooltip({
  active,
  bg,
  borderColor,
  endLabel,
  payload,
  textColor,
}: Props) {
  if (!active || !payload?.length) {
    return null;
  }

  const entry = payload[0]?.payload as ActivityBucket | undefined;
  if (!entry) {
    return null;
  }

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${borderColor}`,
        borderRadius: 4,
        color: textColor,
        fontSize: 12,
        padding: '6px 10px',
      }}
    >
      <div style={{ marginBottom: 6, opacity: 0.7 }}>
        {entry.label}–{endLabel}
      </div>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between' }}>
        <span>
          {entry.count} donation{entry.count !== 1 ? 's' : ''}
        </span>
        <span>{formatCurrency(entry.amountCent, 'USD')}</span>
      </div>
    </div>
  );
}
