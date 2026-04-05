import { Table, Text } from '@chakra-ui/react';

import { RelativeTime } from '@/components/RelativeTime';
import { formatAmountParts, isAnonymous } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function DonationFeedDesktop({ donations }: Props) {
  return (
    <Table.Root size="sm" variant="outline">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader w="160px">Donor</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="right" w="120px">Amount</Table.ColumnHeader>
          <Table.ColumnHeader>Comment</Table.ColumnHeader>
          <Table.ColumnHeader w="140px" whiteSpace="nowrap">
            Time
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {donations.map((d) => {
          const isAnon = isAnonymous(d.donor_name);
          const { whole, cents } = formatAmountParts(d);
          return (
            <Table.Row _hover={{ bg: 'bg.muted' }} key={d.id}>
              <Table.Cell maxW="160px">
                <Text
                  color={isAnon ? 'fg.subtle' : undefined}
                  fontStyle={isAnon ? 'italic' : undefined}
                  overflowWrap="break-word"
                >
                  {d.donor_name}
                </Text>
              </Table.Cell>
              <Table.Cell textAlign="right" whiteSpace="nowrap">
                {whole}
                <Text as="span" color="fg.subtle">
                  {cents}
                </Text>
              </Table.Cell>
              <Table.Cell color="fg.muted" maxW="480px">
                <Text overflowWrap="break-word">{d.donor_comment ?? ''}</Text>
              </Table.Cell>
              <Table.Cell>
                <RelativeTime timestamp={d.completed_at} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
