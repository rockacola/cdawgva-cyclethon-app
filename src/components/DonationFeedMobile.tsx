import { Box, Stack, Text } from '@chakra-ui/react';

import { RelativeTime } from '@/components/RelativeTime';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

function formatAmount(amount: Donation['amount']) {
  return `$${parseFloat(amount.value).toFixed(2)}`;
}

export function DonationFeedMobile({ donations }: Props) {
  return (
    <Stack gap={0} borderWidth="1px" borderRadius="md" overflow="hidden">
      {donations.map((d) => (
        <Box key={d.id} px={2} py={1.5} borderBottomWidth="1px" _last={{ borderBottomWidth: 0 }}>
          <Box display="flex" justifyContent="space-between" alignItems="baseline">
            <Text fontSize="xs" fontWeight="semibold">{d.donor_name}</Text>
            <Text fontSize="xs" fontWeight="semibold">{formatAmount(d.amount)}</Text>
          </Box>
          {d.donor_comment && <Text color="gray.500" fontSize="xs">{d.donor_comment}</Text>}
          <Text color="gray.400" fontSize="xs">
            <RelativeTime iso={d.completed_at} />
          </Text>
        </Box>
      ))}
    </Stack>
  );
}
