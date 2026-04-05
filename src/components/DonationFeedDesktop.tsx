'use client';

import { Table, Text } from '@chakra-ui/react';

import { DonationTime } from '@/components/DonationTime';
import { RelativeTime } from '@/components/RelativeTime';
import { useNow } from '@/hooks/useNow';
import { formatAmountParts, getDonationBoxShadow, isAnonymous } from '@/lib/donationUtils';
import type { Donation } from '@/lib/types';

interface Props {
  donations: Donation[];
}

export function DonationFeedDesktop({ donations }: Props) {
  const now = useNow(1000);

  return (
    <Table.Root size="sm" variant="outline">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader w="160px">Donor</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="right" w="120px">
            Amount
          </Table.ColumnHeader>
          <Table.ColumnHeader>Comment</Table.ColumnHeader>
          <Table.ColumnHeader minW="140px" whiteSpace="nowrap">
            Time
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
                <Text as="span" color="fg.subtle">
                  {cents}
                </Text>
              </Table.Cell>
              <Table.Cell color="fg.muted" maxW="480px">
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
