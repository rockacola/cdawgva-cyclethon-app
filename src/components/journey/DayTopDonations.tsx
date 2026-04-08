'use client';

import { Box, Span, Table, Text } from '@chakra-ui/react';
import { Crown } from 'lucide-react';
import { useMemo } from 'react';

import { useDonations } from '@/contexts/DonationsContext';
import { formatAmountParts, getTopDonationsForDay, isAnonymous } from '@/lib/donationUtils';
import { getJSTDayBounds } from '@/lib/timezoneUtils';

interface Props {
  dateStr: string;
}

export function DayTopDonations({ dateStr }: Props) {
  const { donations } = useDonations();

  const topDonations = useMemo(
    function computeTopDonations() {
      const { end, start } = getJSTDayBounds(dateStr);
      return getTopDonationsForDay(donations, start, end);
    },
    [donations, dateStr]
  );

  if (topDonations.length === 0) {
    return null;
  }

  return (
    <Table.Root size="sm" variant="outline">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader textAlign="center" w={10} />
          <Table.ColumnHeader>Donor</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="right">Amount</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {topDonations.map((d, i) => {
          const anon = isAnonymous(d.donor_name);
          return (
            <Table.Row key={d.id}>
              <Table.Cell>
                <Box display="flex" justifyContent="center">
                  {i === 0 ? (
                    <Crown color="#eab308" size={14} />
                  ) : (
                    <Text color="fg.subtle">{i + 1}</Text>
                  )}
                </Box>
              </Table.Cell>
              <Table.Cell>
                <Span
                  color={anon ? 'fg.subtle' : undefined}
                  fontStyle={anon ? 'italic' : undefined}
                >
                  {d.donor_name}
                </Span>
                {d.donor_comment ? (
                  <Text color="fg.subtle" fontSize="xs" mt={0.5}>
                    {d.donor_comment}
                  </Text>
                ) : null}
              </Table.Cell>
              <Table.Cell textAlign="right" whiteSpace="nowrap">
                {(() => {
                  const { whole, cents } = formatAmountParts(d);
                  return (
                    <>
                      {whole}
                      <Span color="fg.subtle">{cents}</Span>
                    </>
                  );
                })()}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
