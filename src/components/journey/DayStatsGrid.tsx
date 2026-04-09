import { SimpleGrid } from '@chakra-ui/react';
import { Flame, Gauge, Route, Thermometer, Timer, Wind } from 'lucide-react';

import { StatCard } from '@/components/journey/StatCard';
import type { StatCardProps } from '@/components/journey/StatCard';
import type { DayEntry } from '@/lib/journey-data';
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

export function DayStatsGrid({
  avgTempCelsius,
  caloriesBurnt,
  distanceKm,
  timeCycling,
  windSpeedMs,
}: Props) {
  const avgSpeedKmh = distanceKm! / (timeCycling! / 60);
  const statItems: StatCardProps[] = [
    {
      color: '#3b82f6',
      conversion: `≈ ${(distanceKm! * KM_TO_MI).toFixed(1)} mi`,
      icon: <Route size={16} />,
      label: 'Distance',
      value: `${distanceKm} km`,
    },
    {
      color: '#8b5cf6',
      icon: <Timer size={16} />,
      label: 'Cycling Time',
      value: formatMinutesToCyclingTime(timeCycling!),
    },
    {
      color: '#f97316',
      conversion: `≈ ${(avgSpeedKmh * KM_TO_MI).toFixed(2)} mph`,
      icon: <Gauge size={16} />,
      label: 'Average Speed',
      value: `${avgSpeedKmh.toFixed(2)} km/h`,
    },
    {
      color: '#06b6d4',
      conversion: `≈ ${celsiusToFahrenheit(avgTempCelsius!).toFixed(1)}°F`,
      icon: <Thermometer size={16} />,
      label: 'Average Temp',
      value: `${avgTempCelsius}°C`,
    },
    {
      color: '#ef4444',
      conversion: `≈ ${Math.round(caloriesBurnt! * KCAL_TO_KJ).toLocaleString()} kJ`,
      icon: <Flame size={16} />,
      label: 'Calories Burnt',
      value: `${caloriesBurnt!.toLocaleString()} kcal`,
    },
    ...(windSpeedMs !== undefined
      ? [
          {
            color: '#64748b',
            conversion: `≈ ${(windSpeedMs * MS_TO_MPH).toFixed(1)} mph`,
            icon: <Wind size={16} />,
            label: 'Wind Speed',
            value: `${(windSpeedMs * MS_TO_KMH).toFixed(1)} km/h`,
          } satisfies StatCardProps,
        ]
      : []),
  ];

  return (
    <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
      {statItems.map((item) => (
        <StatCard
          color={item.color}
          conversion={item.conversion}
          icon={item.icon}
          key={item.label}
          label={item.label}
          value={item.value}
        />
      ))}
    </SimpleGrid>
  );
}
