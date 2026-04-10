'use client';

import { Box, Span, Table, Text } from '@chakra-ui/react';
import { Crown } from 'lucide-react';
import { useMemo } from 'react';

import { DonorName } from '@/components/DonorName';
import { useDonations } from '@/contexts/DonationsContext';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useTranslations } from '@/hooks/useTranslations';
import { formatAmountParts, getTopDonationsForDay } from '@/lib/donationUtils';
import { getJSTDayBounds } from '@/lib/timezoneUtils';

interface Props {
  dateStr: string;
}

export function DayTopDonations({ dateStr }: Props) {
  const { donations } = useDonations();
  const currencyPrefix = useCurrencyPrefix();
  const t = useTranslations('dayPage');

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
          <Table.ColumnHeader>{t('donor')}</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="right">{t('amount')}</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {topDonations.map((d, i) => {
          return (
            <Table.Row _hover={{ bg: 'bg.muted' }} key={d.id}>
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
                <Span>
                  <DonorName name={d.donor_name} />
                </Span>
                {d.donor_comment ? (
                  <Text color="fg.subtle" fontSize="xs" mt={0.5}>
                    {d.donor_comment}
                  </Text>
                ) : null}
              </Table.Cell>
              <Table.Cell textAlign="right" whiteSpace="nowrap">
                {(() => {
                  const { whole, cents } = formatAmountParts(d.amount_cent, currencyPrefix);
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
