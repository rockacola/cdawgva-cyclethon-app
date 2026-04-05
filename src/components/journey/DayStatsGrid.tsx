import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { CircleDollarSign, Flame, Gauge, Route, Thermometer, Timer } from 'lucide-react';
import type { ReactNode } from 'react';

import type { DayStats } from '@/lib/journey-data';

const KM_TO_MI = 0.621371;
const C_TO_F = (c: number): number => (c * 9) / 5 + 32;
const KCAL_TO_KJ = 4.184;

interface StatCardProps {
  color: string;
  conversion?: string;
  icon: ReactNode;
  label: string;
  value: string;
}

function StatCard({ color, conversion, icon, label, value }: StatCardProps) {
  return (
    <Box borderRadius="xl" borderWidth="1px" p={4}>
      <Box
        alignItems="center"
        borderRadius="lg"
        display="inline-flex"
        justifyContent="center"
        mb={3}
        p={2}
        style={{ backgroundColor: `${color}22`, color }}
      >
        {icon}
      </Box>
      <Text
        color="fg.muted"
        fontSize="xs"
        fontWeight="semibold"
        letterSpacing="wide"
        mb={1}
        textTransform="uppercase"
      >
        {label}
      </Text>
      <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" lineHeight="1.2">
        {value}
      </Text>
      {conversion ? (
        <Text color="fg.subtle" fontSize="xs" mt={0.5}>
          {conversion}
        </Text>
      ) : null}
    </Box>
  );
}

interface Props {
  stats: DayStats;
}

export function DayStatsGrid({ stats }: Props) {
  const statItems: StatCardProps[] = [
    {
      color: '#3b82f6',
      conversion: `≈ ${(stats.distanceKm * KM_TO_MI).toFixed(1)} mi`,
      icon: <Route size={18} />,
      label: 'Distance',
      value: `${stats.distanceKm} km`,
    },
    {
      color: '#8b5cf6',
      icon: <Timer size={18} />,
      label: 'Cycling Time',
      value: stats.timeCycling,
    },
    {
      color: '#f97316',
      conversion: `≈ ${(stats.avgSpeedKmh * KM_TO_MI).toFixed(2)} mph`,
      icon: <Gauge size={18} />,
      label: 'Avg Speed',
      value: `${stats.avgSpeedKmh} km/h`,
    },
    {
      color: '#06b6d4',
      conversion: `≈ ${C_TO_F(stats.avgTempCelsius).toFixed(1)}°F`,
      icon: <Thermometer size={18} />,
      label: 'Avg Temp',
      value: `${stats.avgTempCelsius}°C`,
    },
    {
      color: '#ef4444',
      conversion: `≈ ${Math.round(stats.caloriesBurnt * KCAL_TO_KJ).toLocaleString()} kJ`,
      icon: <Flame size={18} />,
      label: 'Calories Burnt',
      value: `${stats.caloriesBurnt.toLocaleString()} kcal`,
    },
    {
      color: '#22c55e',
      icon: <CircleDollarSign size={18} />,
      label: 'Amount Raised',
      value: `$${stats.amountRaised.toLocaleString()} ${stats.amountRaisedCurrency}`,
    },
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
