import { Box, Card, HStack, SimpleGrid, Text } from '@chakra-ui/react';

const history = [
  { edition: '#1', year: '2022', km: '500 km', raised: '$319,857', note: 'Where it all began' },
  {
    edition: '#2',
    year: '2023',
    km: '900 km',
    raised: '$555,171',
    note: 'Bigger. Longer. Louder.',
  },
  { edition: '#3', year: '2024', km: '1,200 km', raised: '$1M+', note: 'The million dollar ride' },
  { edition: '#4', year: '2025', km: 'Hokkaido', raised: 'TBD', note: 'Back to where it started' },
];

export function TrackRecord() {
  return (
    <Box borderBottomWidth="1px" py={{ base: 10, md: 16 }}>
      <Text
        color="fg.muted"
        fontSize="xs"
        fontWeight="semibold"
        letterSpacing="wide"
        mb={6}
        textTransform="uppercase"
      >
        The Track Record
      </Text>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
        {history.map(({ edition, year, km, raised, note }) => (
          <Card.Root key={edition} variant="outline">
            <Card.Body gap={1} p={4}>
              <HStack align="start" justify="space-between">
                <Text color="fg.subtle" fontSize="xs">
                  {year}
                </Text>
                <Text color="fg.muted" fontSize="xs" fontWeight="bold">
                  {edition}
                </Text>
              </HStack>
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" mt={1}>
                {raised}
              </Text>
              <Text color="fg.muted" fontSize="sm">
                {km}
              </Text>
              <Text color="fg.subtle" fontSize="xs" mt={1}>
                {note}
              </Text>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Box>
  );
}
