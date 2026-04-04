import { Table } from '@chakra-ui/react';

import { RelativeTime } from '@/components/RelativeTime';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

function formatAmount(amount: Donation['amount']) {
  return `$${parseFloat(amount.value).toFixed(2)}`;
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
        {donations.map((d) => (
          <Table.Row key={d.id}>
            <Table.Cell data-utc={d.completed_at}>
              <RelativeTime iso={d.completed_at} />
            </Table.Cell>
            <Table.Cell>{d.donor_name}</Table.Cell>
            <Table.Cell color="gray.500">{d.donor_comment ?? '—'}</Table.Cell>
            <Table.Cell textAlign="right">{formatAmount(d.amount)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
