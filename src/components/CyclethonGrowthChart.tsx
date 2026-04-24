'use client';

import { HStack, Text, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { TooltipProps } from 'recharts/types/component/Tooltip';

import { useColorModeValue } from '@/components/ui/color-mode';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useTranslations } from '@/hooks/useTranslations';
import { buildChartRows, cyclethonHistory } from '@/lib/cyclethonHistory';

const data = buildChartRows();
const LINE_TYPE: 'linear' | 'monotone' = 'linear';

function fmt(v: number, currencyPrefix: string) {
  if (v >= 1_000_000) {
    return `${currencyPrefix}${(v / 1_000_000).toFixed(2)}M`;
  }
  if (v >= 1_000) {
    return `${currencyPrefix}${(v / 1_000).toFixed(0)}K`;
  }
  return `${currencyPrefix}${v}`;
}

interface ChartTooltipExtraProps {
  bg: string;
  borderColor: string;
  label?: string | number;
  textColor: string;
}

function ChartTooltip({
  active,
  bg,
  borderColor,
  label,
  payload,
  textColor,
}: TooltipProps<ValueType, NameType> &
  ChartTooltipExtraProps & { payload?: readonly Payload<ValueType, NameType>[] }) {
  const currencyPrefix = useCurrencyPrefix();
  const tNav = useTranslations('dayNav');

  if (!active || !payload?.length) {
    return null;
  }

  const entries = payload.filter((p) => p.value !== null);
  if (!entries.length) {
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
      <div style={{ fontWeight: 600, marginBottom: 4 }}>
        {label ? tNav('dayLabel', { day: label }) : null}
      </div>
      {entries.map((p) => (
        <div
          key={p.name}
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 8,
            justifyContent: 'space-between',
            marginTop: 2,
          }}
        >
          <span style={{ alignItems: 'center', display: 'flex', gap: 4 }}>
            <span
              style={{
                background: p.color as string,
                borderRadius: 2,
                display: 'inline-block',
                height: 8,
                width: 8,
              }}
            />
            {p.name}
          </span>
          <span>{fmt(Number(p.value), currencyPrefix)}</span>
        </div>
      ))}
    </div>
  );
}

function CustomLegend({
  hidden,
  onToggle,
}: {
  hidden: Set<string>;
  onToggle: (label: string) => void;
}) {
  return (
    <HStack flexWrap="wrap" gap={4} justify="center" mt={3}>
      {cyclethonHistory.map((s) => {
        const isHidden = hidden.has(s.label);
        return (
          <HStack
            _hover={{ opacity: 0.7 }}
            cursor="pointer"
            gap={1.5}
            key={s.label}
            onClick={() => onToggle(s.label)}
            opacity={isHidden ? 0.35 : 1}
          >
            <span
              style={{
                background: isHidden ? 'transparent' : s.color,
                border: `1.5px solid ${s.color}`,
                borderRadius: 2,
                display: 'inline-block',
                height: 3,
                width: 16,
              }}
            />
            <Text color="fg.muted" fontSize="xs">
              {s.label}
            </Text>
          </HStack>
        );
      })}
    </HStack>
  );
}

export function CyclethonGrowthChart() {
  const tooltipBg = useColorModeValue('#ffffff', '#1f2937');
  const tooltipBorder = useColorModeValue('#e5e7eb', '#374151');
  const tooltipText = useColorModeValue('#111827', '#f9fafb');
  const axisColor = useColorModeValue('#9ca3af', '#6b7280');
  const tNav = useTranslations('dayNav');
  const currencyPrefix = useCurrencyPrefix();
  const showDayLabel = useBreakpointValue({ base: false, md: true });
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  function toggleSeries(label: string) {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }

  return (
    <>
      <ResponsiveContainer height={300} width="100%">
        <LineChart data={data} margin={{ bottom: 0, left: 0, right: 24, top: 4 }}>
          <XAxis
            axisLine={{ stroke: axisColor }}
            dataKey="day"
            interval={1}
            tick={({
              payload,
              x,
              y,
            }: {
              payload: { value: number };
              x: string | number;
              y: string | number;
            }) => (
              <text
                fill={axisColor}
                style={{ fontSize: 12 }}
                textAnchor="middle"
                x={Number(x)}
                y={Number(y) + 12}
              >
                {showDayLabel ? tNav('dayLabel', { day: payload.value }) : String(payload.value)}
              </text>
            )}
            tickLine={false}
          />
          <YAxis
            axisLine={{ stroke: axisColor }}
            tick={({
              payload,
              x,
              y,
            }: {
              payload: { value: number };
              x: string | number;
              y: string | number;
            }) => (
              <text
                dominantBaseline="middle"
                fill={axisColor}
                style={{ fontSize: 12 }}
                textAnchor="end"
                x={Number(x) - 4}
                y={Number(y)}
              >
                {fmt(payload.value, currencyPrefix)}
              </text>
            )}
            tickLine={false}
            width={72}
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
            cursor={{ stroke: axisColor, strokeDasharray: '3 3', strokeWidth: 1 }}
          />
          {cyclethonHistory.map((s) => (
            <Line
              connectNulls={false}
              dataKey={s.label}
              dot={false}
              hide={hidden.has(s.label)}
              key={s.label}
              stroke={s.color}
              strokeWidth={2}
              type={LINE_TYPE}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <CustomLegend hidden={hidden} onToggle={toggleSeries} />
    </>
  );
}
