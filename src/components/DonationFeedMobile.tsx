import { Box, Stack, Text } from '@chakra-ui/react';

import { RelativeTime } from '@/components/RelativeTime';
import { formatAmount, isAnonymous } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function DonationFeedMobile({ donations }: Props) {
  return (
    <Stack borderRadius="md" borderWidth="1px" gap={0} overflow="hidden">
      {donations.map((d) => {
        const isAnon = isAnonymous(d.donor_name);
        return (
          <Box
            _hover={{ bg: 'bg.muted' }}
            _last={{ borderBottomWidth: 0 }}
            borderBottomWidth="1px"
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
                {formatAmount(d.amount)}
              </Text>
            </Box>
            {d.donor_comment ? (
              <Text color="fg.muted" fontSize="xs">
                {d.donor_comment}
              </Text>
            ) : null}
            <Text color="fg.subtle" fontSize="xs">
              <RelativeTime iso={d.completed_at} />
            </Text>
          </Box>
        );
      })}
    </Stack>
  );
}
