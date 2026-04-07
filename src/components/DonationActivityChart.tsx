'use client';

import { useBreakpointValue } from '@chakra-ui/react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import type { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { TooltipProps } from 'recharts/types/component/Tooltip';

import { useColorModeValue } from '@/components/ui/color-mode';
import { useActivityBuckets } from '@/hooks/useActivityBuckets';
import { ACTIVITY_CHART_BARS_DESKTOP, ACTIVITY_CHART_BARS_MOBILE } from '@/lib/constants';
import { formatCurrency } from '@/lib/donationUtils';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

const BUCKET_SECONDS = 15 * 60;

interface ChartTooltipExtraProps {
  bg: string;
  borderColor: string;
  endLabel: string;
  textColor: string;
}

function ChartTooltip({
  active,
  bg,
  borderColor,
  endLabel,
  payload,
  textColor,
}: TooltipProps<ValueType, NameType> &
  ChartTooltipExtraProps & { payload?: readonly Payload<ValueType, NameType>[] }) {
  if (!active || !payload?.length) {
    return null;
  }
  const entry = payload[0]?.payload as
    | { amountCent: number; count: number; label: string; timestamp: number }
    | undefined;
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

// Format epoch seconds as "h:mma" (e.g. "2:15pm") using Intl, respecting the given IANA timezone.
function formatTime(epochSeconds: number, timeZone: string | undefined): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
    timeZone,
  })
    .format(new Date(epochSeconds * 1000))
    .replace(' ', '')
    .toLowerCase();
}

function timezoneToIANA(mode: string): string | undefined {
  if (mode === 'JST') {
    return 'Asia/Tokyo';
  }
  if (mode === 'UTC') {
    return 'UTC';
  }
  return undefined;
}

export function DonationActivityChart() {
  const { timezoneMode } = useTimezoneContext();
  const buckets = useActivityBuckets();
  const barCount =
    useBreakpointValue({ base: ACTIVITY_CHART_BARS_MOBILE, md: ACTIVITY_CHART_BARS_DESKTOP }) ??
    ACTIVITY_CHART_BARS_DESKTOP;

  const barColor = useColorModeValue('#7dd3fc', '#7dd3fc');
  const barColorActive = useColorModeValue('#38bdf8', '#38bdf8');
  const tooltipBg = useColorModeValue('#ffffff', '#1f2937');
  const tooltipBorder = useColorModeValue('#e5e7eb', '#374151');
  const tooltipText = useColorModeValue('#111827', '#f9fafb');

  const latestBuckets = buckets.slice(-barCount);
  const maxAmount = Math.max(...latestBuckets.map((b) => b.amountCent), 1);
  const yAxisMax = Math.ceil(maxAmount / 0.75);
  const timeZone = timezoneToIANA(timezoneMode);

  return (
    <ResponsiveContainer height={90} width="100%">
      <BarChart data={latestBuckets} margin={{ bottom: 0, left: 0, right: 0, top: 4 }}>
        <YAxis domain={[0, yAxisMax]} hide />
        <Tooltip
          content={(props) => {
            const timestamp = (props.payload?.[0]?.payload as { timestamp?: number } | undefined)
              ?.timestamp;
            const endLabel =
              timestamp !== undefined ? formatTime(timestamp + BUCKET_SECONDS, timeZone) : '';
            return (
              <ChartTooltip
                {...props}
                bg={tooltipBg}
                borderColor={tooltipBorder}
                endLabel={endLabel}
                textColor={tooltipText}
              />
            );
          }}
          cursor={{ fill: 'rgba(128,128,128,0.1)' }}
        />
        <Bar
          activeBar={{ fill: barColorActive }}
          dataKey="amountCent"
          fill={barColor}
          radius={[2, 2, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
