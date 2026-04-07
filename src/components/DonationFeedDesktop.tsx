'use client';

import { Span, Table, Text } from '@chakra-ui/react';

import { DonationTime } from '@/components/DonationTime';
import { RelativeTime } from '@/components/RelativeTime';
import { useNow } from '@/hooks/useNow';
import { formatAmountParts, getDonationBoxShadow, isAnonymous } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

export type SortDir = 'asc' | 'desc';
export type SortKey = 'amount' | 'comment' | 'name' | 'time';

interface Props {
  donations: Donation[];
  onSort?: (key: SortKey) => void;
  sortDir?: SortDir;
  sortKey?: SortKey;
}

function sortIndicator(col: SortKey, sortKey?: SortKey, sortDir?: SortDir): string {
  if (col !== sortKey) {
    return '';
  }
  return sortDir === 'asc' ? ' ↑' : ' ↓';
}

export function DonationFeedDesktop({ donations, onSort, sortDir, sortKey }: Props) {
  const now = useNow(1000);
  const headerProps = onSort ? { _hover: { color: 'fg' }, cursor: 'pointer' as const } : {};

  return (
    <Table.Root size="sm" variant="outline">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader {...headerProps} onClick={() => onSort?.('name')} w="160px">
            Donor{sortIndicator('name', sortKey, sortDir)}
          </Table.ColumnHeader>
          <Table.ColumnHeader
            {...headerProps}
            onClick={() => onSort?.('amount')}
            textAlign="right"
            w="120px"
          >
            Amount{sortIndicator('amount', sortKey, sortDir)}
          </Table.ColumnHeader>
          <Table.ColumnHeader {...headerProps} minW="200px" onClick={() => onSort?.('comment')}>
            Comment{sortIndicator('comment', sortKey, sortDir)}
          </Table.ColumnHeader>
          <Table.ColumnHeader
            {...headerProps}
            minW="140px"
            onClick={() => onSort?.('time')}
            whiteSpace="nowrap"
          >
            Time{sortIndicator('time', sortKey, sortDir)}
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {donations.map((d) => {
          const isAnon = isAnonymous(d.donor_name);
          const { whole, cents } = formatAmountParts(d);
          return (
            <Table.Row
              _hover={{ bg: 'bg.muted' }}
              boxShadow={getDonationBoxShadow(d.completed_at, now, 4)}
              key={d.id}
              transition="box-shadow 0.3s ease"
            >
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
                <Span color="fg.subtle">{cents}</Span>
              </Table.Cell>
              <Table.Cell color="fg.muted" maxW="480px" minW="200px">
                <Text overflowWrap="break-word">{d.donor_comment ?? ''}</Text>
              </Table.Cell>
              <Table.Cell whiteSpace="nowrap">
                <RelativeTime timestamp={d.completed_at} />
                <DonationTime timestamp={d.completed_at} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
