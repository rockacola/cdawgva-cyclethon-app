'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

import { DonationBarChartTooltip } from '@/components/DonationBarChartTooltip';
import { useColorModeValue } from '@/components/ui/color-mode';
import type { ActivityBucket } from '@/hooks/useActivityBuckets';
import { formatTime, timezoneToIANA } from '@/lib/timezoneUtils';
import { useTimezoneContext } from '@/providers/TimezoneProvider';

const BUCKET_SECONDS = 15 * 60;

interface Props {
  buckets: ActivityBucket[];
  height?: number;
}

export function DonationBarChart({ buckets, height = 90 }: Props) {
  const { timezoneMode } = useTimezoneContext();

  const barColor = useColorModeValue('#a5b4fc', '#a5b4fc'); // indigo.300
  const barColorActive = useColorModeValue('#818cf8', '#818cf8'); // indigo.400
  const tooltipBg = useColorModeValue('#ffffff', '#1f2937');
  const tooltipBorder = useColorModeValue('#e5e7eb', '#374151');
  const tooltipText = useColorModeValue('#111827', '#f9fafb');

  const maxAmount = Math.max(...buckets.map((b) => b.amountCent), 1);
  const yAxisMax = Math.ceil(maxAmount / 0.75);
  const timeZone = timezoneToIANA(timezoneMode);

  return (
    <ResponsiveContainer height={height} width="100%">
      <BarChart data={buckets} margin={{ bottom: 0, left: 0, right: 0, top: 4 }}>
        <YAxis domain={[0, yAxisMax]} hide />
        <Tooltip
          content={(props) => {
            const timestamp = (props.payload?.[0]?.payload as { timestamp?: number } | undefined)
              ?.timestamp;
            const endLabel =
              timestamp !== undefined ? formatTime(timestamp + BUCKET_SECONDS, timeZone) : '';
            return (
              <DonationBarChartTooltip
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
