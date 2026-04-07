'use client';

import { Center, Spinner, useBreakpointValue } from '@chakra-ui/react';
import { Bar, ComposedChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import type { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { TooltipProps } from 'recharts/types/component/Tooltip';

import { useColorModeValue } from '@/components/ui/color-mode';
import { useDailyTotals } from '@/hooks/useDailyTotals';
import type { DailyTotal } from '@/lib/types';

const DAY_COUNT = 15;
// Date strings match the timezone in the stats payload (Asia/Tokyo)
const EVENT_START_DATE = '2026-04-05'; // Day 1
const EVENT_END_DATE = '2026-04-19'; // Day 15

function buildChartData(
  dailyTotals: DailyTotal[]
): { cumulative: number | null; day: string; dollars: number }[] {
  const byDate = new Map<string, number>();
  for (const entry of dailyTotals) {
    const usd = entry.by_currency['USD'];
    if (usd) {
      byDate.set(entry.date, usd.amount_cent / 100);
    }
  }

  let preDollars = 0;
  let postDollars = 0;
  for (const entry of dailyTotals) {
    const usd = entry.by_currency['USD'];
    if (!usd) {
      continue;
    }
    const dollars = usd.amount_cent / 100;
    if (entry.date < EVENT_START_DATE) {
      preDollars += dollars;
    } else if (entry.date > EVENT_END_DATE) {
      postDollars += dollars;
    }
  }

  let running = preDollars;
  const preEntry = { cumulative: running, day: 'Pre', dollars: preDollars };

  // Generate day date strings for map lookups — UTC-based generation is fine
  // since ISO date strings (YYYY-MM-DD) are timezone-agnostic keys
  const dayOneMs = Date.UTC(2026, 3, 5);
  const dayEntries = Array.from({ length: DAY_COUNT }, (_, i) => {
    const dateStr = new Date(dayOneMs + i * 86_400_000).toISOString().slice(0, 10);
    const dollars = byDate.get(dateStr) ?? 0;
    running += dollars;
    return { cumulative: running, day: `Day ${i + 1}`, dollars };
  });

  running += postDollars;
  const postEntry = { cumulative: running, day: 'Post', dollars: postDollars };

  const all = [preEntry, ...dayEntries, postEntry];
  const lastDataIdx = all.findLastIndex((e) => e.dollars > 0);
  return all.map((entry, i) => ({
    ...entry,
    cumulative: i > lastDataIdx ? null : entry.cumulative,
  }));
}

const fmt = (v: number) => `$${Number(v).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

interface ChartTooltipExtraProps {
  bg: string;
  borderColor: string;
  textColor: string;
}

function ChartTooltip({
  active,
  bg,
  borderColor,
  payload,
  textColor,
}: TooltipProps<ValueType, NameType> &
  ChartTooltipExtraProps & { payload?: readonly Payload<ValueType, NameType>[] }) {
  if (!active || !payload?.length) {
    return null;
  }
  const daily = Number(payload.find((p) => p.dataKey === 'dollars')?.value ?? 0);
  if (daily === 0) {
    return null;
  }
  const rawTotal = payload.find((p) => p.dataKey === 'cumulative')?.value;
  const total = rawTotal !== null ? Number(rawTotal) : null;
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
      <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between' }}>
        <span>Daily</span>
        <span>{fmt(daily)}</span>
      </div>
      {total !== null && (
        <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between', marginTop: 6 }}>
          <span>Total</span>
          <span>{fmt(total)}</span>
        </div>
      )}
    </div>
  );
}

export function DailyDonationsChart() {
  const { dailyTotals, isLoading } = useDailyTotals();
  const barSize = useBreakpointValue({ base: 12, md: 18 });
  const barColor = useColorModeValue('#7dd3fc', '#7dd3fc'); // sky.300
  const barColorActive = useColorModeValue('#38bdf8', '#38bdf8'); // sky.400
  const lineColor = useColorModeValue('#f97316', '#fb923c'); // orange.500 / orange.400
  const tooltipBg = useColorModeValue('#ffffff', '#1f2937');
  const tooltipBorder = useColorModeValue('#e5e7eb', '#374151');
  const tooltipText = useColorModeValue('#111827', '#f9fafb');

  if (isLoading) {
    return (
      <Center height={240} width="100%">
        <Spinner color="blue.300" />
      </Center>
    );
  }

  const data = buildChartData(dailyTotals);

  // Scale bar axis so the tallest bar fills 75% of the chart height
  const maxDollars = Math.max(...data.map((d) => d.dollars));
  const barAxisMax = maxDollars > 0 ? maxDollars / 0.75 : 1;
  // Prevents the line from stretching to fill the chart when cumulative total is still low
  const lineCumulativeMinCeiling = 1_000_000;

  return (
    <ResponsiveContainer height={240} width="100%">
      <ComposedChart data={data} margin={{ bottom: 0, left: 0, right: 0, top: 0 }}>
        <YAxis domain={[0, barAxisMax]} hide yAxisId="bars" />
        <YAxis
          domain={[0, (max: number) => Math.max(max, lineCumulativeMinCeiling)]}
          hide
          orientation="right"
          yAxisId="line"
        />
        <Tooltip
          content={(props) => (
            <ChartTooltip
              {...props}
              bg={tooltipBg}
              borderColor={tooltipBorder}
              textColor={tooltipText}
            />
          )}
          cursor={{ fill: 'transparent' }}
        />
        <Line
          dataKey="cumulative"
          dot={false}
          stroke={lineColor}
          strokeWidth={2}
          type="monotone"
          yAxisId="line"
        />
        <Bar
          activeBar={{ fill: barColorActive }}
          barSize={barSize}
          dataKey="dollars"
          fill={barColor}
          radius={[2, 2, 0, 0]}
          yAxisId="bars"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
