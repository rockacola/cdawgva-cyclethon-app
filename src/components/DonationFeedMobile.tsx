'use client';

import { Box, Stack, Text } from '@chakra-ui/react';

import { DonationTime } from '@/components/DonationTime';
import { RelativeTime } from '@/components/RelativeTime';
import { useNow } from '@/hooks/useNow';
import { formatAmount, isAnonymous, isNewDonation } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function DonationFeedMobile({ donations }: Props) {
  const now = useNow(1000);

  return (
    <Stack borderRadius="md" borderWidth="1px" gap={0} overflow="hidden">
      {donations.map((d) => {
        const isAnon = isAnonymous(d.donor_name);
        const isNew = isNewDonation(d.completed_at, now);
        return (
          <Box
            _hover={{ bg: 'bg.muted' }}
            _last={{ borderBottomWidth: 0 }}
            borderBottomWidth="1px"
            boxShadow={isNew ? 'inset 3px 0 0 0 var(--chakra-colors-orange-300)' : undefined}
            key={d.id}
            px={2}
            py={1.5}
          >
            <Box alignItems="baseline" display="flex" justifyContent="space-between">
              <Text
                color={isAnon ? 'fg.subtle' : undefined}
                fontSize="xs"
                fontStyle={isAnon ? 'italic' : undefined}
                fontWeight="semibold"
              >
                {d.donor_name}
              </Text>
              <Text fontSize="xs" fontWeight="semibold">
                {formatAmount(d)}
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
