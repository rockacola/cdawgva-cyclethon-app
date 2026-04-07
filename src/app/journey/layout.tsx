import { Box, Container, Flex } from '@chakra-ui/react';

import { DayNav } from '@/components/DayNav';
import { DonationsProvider } from '@/contexts/DonationsContext';
import { getDonationsFull } from '@/lib/getDonationsFull';
import { getJourneyDays } from '@/lib/journey';

export default async function JourneyLayout({ children }: { children: React.ReactNode }) {
  const [days, { donations }] = await Promise.all([
    Promise.resolve(getJourneyDays()),
    getDonationsFull(),
  ]);

  return (
    <DonationsProvider initialDonations={donations}>
      <Container maxW="6xl" px={{ base: 3, md: 8 }} py={{ base: 6, md: 10 }}>
        <Flex align="start" direction={{ base: 'column', md: 'row' }} gap={8}>
          <DayNav days={days} />
          <Box flex={1} minW={0}>
            {children}
          </Box>
        </Flex>
      </Container>
    </DonationsProvider>
  );
}
