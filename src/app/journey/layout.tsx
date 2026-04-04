import { Box, Container, Flex } from '@chakra-ui/react';

import { DayNav } from '@/components/DayNav';
import { getJourneyDays } from '@/lib/journey';

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  const days = getJourneyDays();

  return (
    <Container maxW="6xl" px={{ base: 3, md: 8 }} py={{ base: 6, md: 10 }}>
      <Flex align="start" direction={{ base: 'column', md: 'row' }} gap={8}>
        <DayNav days={days} />
        <Box flex={1} minW={0}>
          {children}
        </Box>
      </Flex>
    </Container>
  );
}
