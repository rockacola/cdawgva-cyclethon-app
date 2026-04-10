'use client';

import { Box, Stack, Text } from '@chakra-ui/react';

import { DonationTime } from '@/components/DonationTime';
import { DonorName } from '@/components/DonorName';
import { RelativeTime } from '@/components/RelativeTime';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useNow } from '@/hooks/useNow';
import { formatAmount, getDonationBoxShadow } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function DonationFeedMobile({ donations }: Props) {
  const currencyPrefix = useCurrencyPrefix();
  const now = useNow(1000);

  return (
    <Stack borderRadius="md" borderWidth="1px" gap={0} overflow="hidden">
      {donations.map((d) => {
        return (
          <Box
            _hover={{ bg: 'bg.muted' }}
            _last={{ borderBottomWidth: 0 }}
            borderBottomWidth="1px"
            boxShadow={getDonationBoxShadow(d.completed_at, now, 3)}
            key={d.id}
            px={2}
            py={1.5}
            transition="box-shadow 0.3s ease"
          >
            <Box alignItems="baseline" display="flex" justifyContent="space-between">
              <Text fontSize="xs" fontWeight="semibold">
                <DonorName name={d.donor_name} />
              </Text>
              <Text fontSize="xs" fontWeight="semibold">
                {formatAmount(d.amount_cent, currencyPrefix)}
              </Text>
            </Box>
            {d.donor_comment ? (
              <Text color="fg.muted" fontSize="xs">
                {d.donor_comment}{' '}
              </Text>
            ) : null}
            <Text color="fg.subtle" fontSize="xs">
              <RelativeTime timestamp={d.completed_at} />
              {' · '}
              <DonationTime timestamp={d.completed_at} />
            </Text>
          </Box>
        );
      })}
    </Stack>
  );
}
