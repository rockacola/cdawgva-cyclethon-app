'use client';

import { useBreakpointValue } from '@chakra-ui/react';

import { DonationBarChart } from '@/components/DonationBarChart';
import { useActivityBuckets } from '@/hooks/useActivityBuckets';
import { ACTIVITY_CHART_BARS_DESKTOP, ACTIVITY_CHART_BARS_MOBILE } from '@/lib/constants';

export function DonationActivityChart() {
  const buckets = useActivityBuckets();
  const barCount =
    useBreakpointValue({ base: ACTIVITY_CHART_BARS_MOBILE, md: ACTIVITY_CHART_BARS_DESKTOP }) ??
    ACTIVITY_CHART_BARS_DESKTOP;

  return <DonationBarChart buckets={buckets.slice(-barCount)} />;
}
