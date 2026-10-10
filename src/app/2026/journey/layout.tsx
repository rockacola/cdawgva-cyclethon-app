import { Box, Container, Flex } from '@chakra-ui/react';

import { DayNav } from '@/components/DayNav';
import { DonationsProvider } from '@/contexts/DonationsContext';
import { getArchivedDonationsFullUrl } from '@/lib/constants';
import { getEdition } from '@/lib/editions';
import { getDonationsFull } from '@/lib/getDonationsFull';
import { getJourneyDays } from '@/lib/journey';
import { journeyData } from '@/lib/journey-data';

const archivedFullUrl = getArchivedDonationsFullUrl(getEdition(2026)!.eventKey);

export default async function JourneyLayout2026({ children }: { children: React.ReactNode }) {
  const [days, { donations }] = await Promise.all([
    Promise.resolve(getJourneyDays()),
    getDonationsFull(archivedFullUrl),
  ]);

  const availableDaySlugs = new Set(
    journeyData.filter((d) => d.destination || d.startPoint).map((d) => d.dayKey)
  );

  return (
    <DonationsProvider initialDonations={donations} sourceUrl={archivedFullUrl}>
      <Container maxW="6xl" px={{ base: 2, md: 0 }}>
        <Flex align="start" direction={{ base: 'column', md: 'row' }} gap={8}>
          <DayNav availableDaySlugs={availableDaySlugs} days={days} />
          <Box flex={1} minW={0}>
            {children}
          </Box>
        </Flex>
      </Container>
    </DonationsProvider>
  );
}
