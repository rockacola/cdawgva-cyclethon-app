'use client';

import { Box, Grid, Text } from '@chakra-ui/react';

import { useTranslations } from '@/hooks/useTranslations';
import type { DayEntry } from '@/lib/journey';
import {
  KCAL_TO_KJ,
  KM_TO_MI,
  MS_TO_KMH,
  MS_TO_MPH,
  celsiusToFahrenheit,
  formatMinutesToCyclingTime,
} from '@/lib/unitConversions';

type Props = Pick<
  DayEntry,
  'avgTempCelsius' | 'caloriesBurnt' | 'distanceKm' | 'timeCycling' | 'windSpeedMs'
>;

interface StatItem {
  label: string;
  sub?: string;
  value: string;
}

export function DayStatsGrid({
  avgTempCelsius,
  caloriesBurnt,
  distanceKm,
  timeCycling,
  windSpeedMs,
}: Props) {
  const t = useTranslations('dayPage');

  const avgSpeedKmh =
    distanceKm !== undefined && timeCycling ? distanceKm / (timeCycling / 60) : undefined;

  const items: StatItem[] = [
    {
      label: t('distance'),
      sub: `≈ ${(distanceKm! * KM_TO_MI).toFixed(1)} mi`,
      value: `${distanceKm} km`,
    },
    ...(timeCycling !== undefined
      ? [{ label: t('cyclingTime'), value: formatMinutesToCyclingTime(timeCycling) }]
      : []),
    ...(avgSpeedKmh
      ? [
          {
            label: t('averageSpeed'),
            sub: `≈ ${(avgSpeedKmh * KM_TO_MI).toFixed(1)} mph`,
            value: `${avgSpeedKmh.toFixed(1)} km/h`,
          },
        ]
      : []),
    ...(avgTempCelsius !== undefined
      ? [
          {
            label: t('averageTemp'),
            sub: `≈ ${celsiusToFahrenheit(avgTempCelsius).toFixed(1)}°F`,
            value: `${avgTempCelsius}°C`,
          },
        ]
      : []),
    ...(caloriesBurnt !== undefined
      ? [
          {
            label: t('caloriesBurnt'),
            sub: `≈ ${Math.round(caloriesBurnt * KCAL_TO_KJ).toLocaleString()} kJ`,
            value: `${caloriesBurnt.toLocaleString()} kcal`,
          },
        ]
      : []),
    ...(windSpeedMs !== undefined
      ? [
          {
            label: t('windSpeed'),
            sub: `≈ ${(windSpeedMs * MS_TO_MPH).toFixed(1)} mph`,
            value: `${(windSpeedMs * MS_TO_KMH).toFixed(1)} km/h`,
          },
        ]
      : []),
  ];

  return (
    <Grid
      bg="border"
      borderColor="border"
      borderWidth="1px"
      gap="1px"
      gridTemplateColumns={{ base: '1fr 1fr', md: 'repeat(3, 1fr)' }}
    >
      {items.map((item) => (
        <Box bg="bg" key={item.label} p={5}>
          <Text
            color="fg.subtle"
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="widest"
            textTransform="uppercase"
          >
            {item.label}
          </Text>
          <Text
            fontFamily="heading"
            fontSize="2xl"
            fontVariantNumeric="tabular-nums"
            letterSpacing="-0.02em"
            lineHeight={1}
            mt={1}
          >
            {item.value}
          </Text>
          {item.sub ? (
            <Text color="fg.subtle" fontFamily="mono" fontSize="xs" mt={1}>
              {item.sub}
            </Text>
          ) : null}
        </Box>
      ))}
    </Grid>
  );
}
