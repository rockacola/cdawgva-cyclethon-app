import { Box, HStack, Heading, Link, List, Stack, Text } from '@chakra-ui/react';
import { ArrowRight, ExternalLink, Map, MessageSquare, Video } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getJourneyDay, getJourneyDays } from '@/lib/journey';
import { journeyData } from '@/lib/journey-data';

interface Props {
  params: Promise<{ day: string }>;
}

export function generateStaticParams() {
  return getJourneyDays().map(({ slug }) => ({ day: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { day: slug } = await params;
  const day = getJourneyDay(slug);
  if (!day) {
    return {};
  }
  return { title: `${day.label} | Cyclethon Tracker` };
}

export default async function DayPage({ params }: Props) {
  const { day: slug } = await params;
  const day = getJourneyDay(slug);
  if (!day) {
    notFound();
  }

  const content = journeyData[slug];

  const dateLabel = day.date.toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <Stack gap={8}>
      {/* Header */}
      <Box>
        <Heading as="h1" mb={1} size={{ base: 'xl', md: '2xl' }}>
          {day.label}
        </Heading>
        <Text color="fg.muted" fontSize="sm">
          {dateLabel}
        </Text>
      </Box>

      {!content ? (
        <Text color="fg.subtle" fontSize="sm">
          No content yet for this day.
        </Text>
      ) : (
        <>
          {/* Route */}
          {content.startPoint || content.destination ? (
            <Box>
              <Text
                color="fg.muted"
                fontSize="xs"
                fontWeight="semibold"
                letterSpacing="wide"
                mb={3}
                textTransform="uppercase"
              >
                Route
              </Text>
              <HStack flexWrap="wrap" gap={4}>
                <Box>
                  <Text color="fg.subtle" fontSize="xs" mb={0.5}>
                    From
                  </Text>
                  <Text fontWeight="semibold">{content.startPoint || 'TBD'}</Text>
                </Box>
                <ArrowRight size={16} />
                <Box>
                  <Text color="fg.subtle" fontSize="xs" mb={0.5}>
                    To
                  </Text>
                  <Text fontWeight="semibold">{content.destination || 'TBD'}</Text>
                </Box>
              </HStack>
            </Box>
          ) : null}

          {/* Landmarks */}
          {!!content.landmarks?.length && (
            <Box>
              <Text
                color="fg.muted"
                fontSize="xs"
                fontWeight="semibold"
                letterSpacing="wide"
                mb={3}
                textTransform="uppercase"
              >
                Featured Landmarks
              </Text>
              <List.Root gap={1.5} listStyle="none" ps={0}>
                {content.landmarks.map((landmark) => (
                  <List.Item fontSize="sm" key={landmark}>
                    {landmark}
                  </List.Item>
                ))}
              </List.Root>
            </Box>
          )}

          {/* Links */}
          {content.mapUrl || !!content.redditLinks?.length || !!content.videoLinks?.length ? (
            <Box>
              <Text
                color="fg.muted"
                fontSize="xs"
                fontWeight="semibold"
                letterSpacing="wide"
                mb={3}
                textTransform="uppercase"
              >
                Links
              </Text>
              <Stack gap={2}>
                {content.mapUrl ? (
                  <HStack gap={2}>
                    <Map size={14} />
                    <Link
                      fontSize="sm"
                      href={content.mapUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      View Map{' '}
                      <ExternalLink
                        size={11}
                        style={{ display: 'inline', verticalAlign: 'middle' }}
                      />
                    </Link>
                  </HStack>
                ) : null}
                {content.redditLinks?.map((r) => (
                  <HStack gap={2} key={r.url}>
                    <MessageSquare size={14} />
                    <Link fontSize="sm" href={r.url} rel="noopener noreferrer" target="_blank">
                      {r.label ?? 'Reddit discussion'}{' '}
                      <ExternalLink
                        size={11}
                        style={{ display: 'inline', verticalAlign: 'middle' }}
                      />
                    </Link>
                  </HStack>
                ))}
                {content.videoLinks?.map((v) => (
                  <HStack gap={2} key={v.url}>
                    <Video size={14} />
                    <Link fontSize="sm" href={v.url} rel="noopener noreferrer" target="_blank">
                      {v.label ?? v.platform}{' '}
                      <ExternalLink
                        size={11}
                        style={{ display: 'inline', verticalAlign: 'middle' }}
                      />
                    </Link>
                  </HStack>
                ))}
              </Stack>
            </Box>
          ) : null}
        </>
      )}
    </Stack>
  );
}
