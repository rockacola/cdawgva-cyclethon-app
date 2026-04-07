import { Card, HStack, Text } from '@chakra-ui/react';
import { Crown } from 'lucide-react';

import { DonorName } from '@/components/DonorName';

interface Props {
  amount: string;
  name: string;
  place: number;
  subLabel?: string;
}

export function PlaceCard({ amount, name, place, subLabel }: Props) {
  return (
    <Card.Root variant="outline">
      <Card.Body gap={2} p={4}>
        <HStack gap={2} justify="space-between">
          <HStack flex={1} gap={2} minW={0}>
            {place === 1 ? (
              <Crown color="var(--chakra-colors-yellow-400)" size={16} />
            ) : (
              <Text color="fg.subtle" fontSize="xs" fontWeight="semibold" minW={4}>
                #{place}
              </Text>
            )}
            <Text fontSize="sm" fontWeight="semibold" lineClamp={1}>
              <DonorName name={name} />
            </Text>
          </HStack>
          <Text color="fg.muted" fontSize="sm" fontWeight="medium" whiteSpace="nowrap">
            {amount}
          </Text>
        </HStack>
        {subLabel ? (
          <Text color="fg.subtle" fontSize="xs">
            {subLabel}
          </Text>
        ) : null}
      </Card.Body>
    </Card.Root>
  );
}
