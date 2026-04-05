import { Box, HStack, Image, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ExternalLink, Globe, MapPin, Tv2 } from 'lucide-react';

import type { MapLocation } from '@/lib/journey-data';

function LocationCard({ location }: { location: MapLocation }) {
  const hasLinks =
    location.googleMapsUrl ||
    location.websiteUrl ||
    location.twitchTimestampUrl ||
    !!location.socials?.length;

  return (
    <Box borderRadius="xl" borderWidth="1px" overflow="hidden">
      {location.imageUrl ? (
        <Box h="180px" overflow="hidden">
          <Image alt={location.title} h="100%" objectFit="cover" src={location.imageUrl} w="100%" />
        </Box>
      ) : (
        <Box alignItems="center" bg="bg.subtle" display="flex" h="100px" justifyContent="center">
          <MapPin color="var(--chakra-colors-fg-subtle)" size={28} />
        </Box>
      )}
      <Box p={4}>
        <Text fontWeight="bold" mb={1}>
          {location.title}
        </Text>
        <Text color="fg.muted" fontSize="sm" mb={3}>
          {location.blurb}
        </Text>
        {location.address ? (
          <HStack color="fg.subtle" fontSize="xs" gap={1.5} mb={2}>
            <MapPin size={11} />
            <Text>{location.address}</Text>
          </HStack>
        ) : null}
        {hasLinks ? (
          <Stack gap={1.5} mt={2}>
            {location.twitchTimestampUrl ? (
              <HStack gap={2}>
                <Tv2 color="#9146ff" size={12} />
                <Link
                  fontSize="xs"
                  href={location.twitchTimestampUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Watch this moment{' '}
                  <ExternalLink size={10} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </Link>
              </HStack>
            ) : null}
            {location.googleMapsUrl ? (
              <HStack gap={2}>
                <MapPin size={12} />
                <Link
                  fontSize="xs"
                  href={location.googleMapsUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View on Google Maps{' '}
                  <ExternalLink size={10} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </Link>
              </HStack>
            ) : null}
            {location.websiteUrl ? (
              <HStack gap={2}>
                <Globe size={12} />
                <Link
                  fontSize="xs"
                  href={location.websiteUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Website{' '}
                  <ExternalLink size={10} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </Link>
              </HStack>
            ) : null}
            {location.socials?.map((social) => (
              <HStack gap={2} key={social.url}>
                <Globe size={12} />
                <Link fontSize="xs" href={social.url} rel="noopener noreferrer" target="_blank">
                  {social.platform}{' '}
                  <ExternalLink size={10} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </Link>
              </HStack>
            ))}
          </Stack>
        ) : null}
      </Box>
    </Box>
  );
}

interface Props {
  locations: MapLocation[];
}

export function DayMapLocations({ locations }: Props) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
      {locations.map((loc) => (
        <LocationCard key={loc.id} location={loc} />
      ))}
    </SimpleGrid>
  );
}
