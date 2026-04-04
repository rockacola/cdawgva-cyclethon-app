import { Table, Text } from '@chakra-ui/react';

import { RelativeTime } from '@/components/RelativeTime';
import { formatAmount, isAnonymous } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function DonationFeedDesktop({ donations }: Props) {
  return (
    <Table.Root size="sm" variant="outline">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader w="140px" whiteSpace="nowrap">
            Time
          </Table.ColumnHeader>
          <Table.ColumnHeader>Donor</Table.ColumnHeader>
          <Table.ColumnHeader>Comment</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="right">Amount</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {donations.map((d) => {
          const isAnon = isAnonymous(d.donor_name);
          return (
            <Table.Row _hover={{ bg: 'bg.muted' }} key={d.id}>
              <Table.Cell data-utc={d.completed_at}>
                <RelativeTime iso={d.completed_at} />
              </Table.Cell>
              <Table.Cell>
                <Text
                  color={isAnon ? 'fg.subtle' : undefined}
                  fontStyle={isAnon ? 'italic' : undefined}
                >
                  {d.donor_name}
                </Text>
              </Table.Cell>
              <Table.Cell color="fg.muted">{d.donor_comment ?? ''}</Table.Cell>
              <Table.Cell textAlign="right">{formatAmount(d.amount)}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
