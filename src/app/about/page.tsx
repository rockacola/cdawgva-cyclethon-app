import {
  Box,
  Card,
  Container,
  HStack,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Activity, Droplets, ExternalLink, Hash, Heart, MessageSquare, Tv } from 'lucide-react';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'About | Cyclethon Tracker',
};

const sources: {
  name: string;
  detail: string;
  href?: string;
  linkLabel?: string;
  icon: ReactNode;
}[] = [
  {
    icon: <Activity size={16} />,
    name: 'Tiltify API',
    detail:
      'Live donation data, totals, and donor info pulled directly from the official campaign.',
  },
  {
    icon: <MessageSquare size={16} />,
    name: 'Reddit',
    detail: 'Community discussion threads and daily recaps from the CDawgVA subreddit.',
    href: 'https://www.reddit.com/r/CDawgVA/',
    linkLabel: 'r/CDawgVA',
  },
  {
    icon: <Hash size={16} />,
    name: 'CDawgVA Discord',
    detail: 'Announcements, guest reveals, and live hype from the official Discord server.',
    href: 'https://discord.com/invite/cdawgva',
    linkLabel: 'Join the Discord',
  },
];

const supportLinks: {
  title: string;
  body: string;
  href: string;
  label: string;
  icon: ReactNode;
}[] = [
  {
    icon: <Heart size={16} />,
    title: 'Donate',
    body: 'Give directly to the Immune Deficiency Foundation via the official Tiltify campaign.',
    href: 'https://tiltify.com/@cdawgva/cyclethon-5',
    label: 'Open donation page',
  },
  {
    icon: <Droplets size={16} />,
    title: 'Donate Plasma',
    body: 'Plasma donations are life saving for people with primary immunodeficiency. Find out how.',
    href: 'https://www.idfa.org.au/plasma-awareness/',
    label: 'Plasma awareness',
  },
  {
    icon: <Tv size={16} />,
    title: 'Spread the Word',
    body: 'Share the stream, share the cause. Tell a friend. Post about it. Every bit of noise helps.',
    href: 'https://www.twitch.tv/cdawg',
    label: 'Watch on Twitch',
  },
];

export default function AboutPage() {
  return (
    <Box py={{ base: 6, md: 20 }}>
      <Container maxW="4xl" px={{ base: 3, md: 8 }}>
        {/* Project */}
        <Stack gap={4} mb={16}>
          <Heading as="h1" size={{ base: 'xl', md: '2xl' }}>
            About this site
          </Heading>
          <Text color="fg.muted" maxW="2xl">
            Cyclethon Tracker is a fan-made companion site for CDawgVA Cyclethon 5. No affiliation
            with Connor, Chris, or the official event. Just a fan project pulling together data so
            you do not have to dig around for it.
          </Text>
          <Text color="fg.muted" maxW="2xl">
            We aggregate live donation data, community discussion, and event updates into one place.
            Think of it as your go-to spot for keeping up with the ride.
          </Text>
        </Stack>

        {/* Data sources */}
        <Stack gap={4} mb={16}>
          <Text
            color="fg.muted"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            Where the data comes from
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
            {sources.map(({ name, detail, href, linkLabel, icon }) => (
              <Card.Root key={name} variant="outline">
                <Card.Body gap={3} p={4}>
                  <HStack color="fg.subtle" gap={2}>
                    {icon}
                    <Text color="fg" fontSize="sm" fontWeight="semibold">
                      {name}
                    </Text>
                  </HStack>
                  <Text color="fg.muted" fontSize="xs">
                    {detail}
                  </Text>
                  {href && linkLabel ? (
                    <Link
                      alignItems="center"
                      display="inline-flex"
                      fontSize="xs"
                      gap={1}
                      href={href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {linkLabel} <ExternalLink size={10} />
                    </Link>
                  ) : null}
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Stack>

        {/* Support */}
        <Stack gap={4}>
          <Text
            color="fg.muted"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            How to support
          </Text>
          <Text color="fg.muted" maxW="2xl">
            Connor and Chris are putting their legs on the line for a genuinely good cause. Whether
            you chip in $5 or just share the stream link, it all adds up. Here is how you can get
            involved.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
            {supportLinks.map(({ title, body, href, label, icon }) => (
              <Card.Root key={title} variant="outline">
                <Card.Body gap={3} p={4}>
                  <HStack color="fg.subtle" gap={2}>
                    {icon}
                    <Text color="fg" fontSize="sm" fontWeight="semibold">
                      {title}
                    </Text>
                  </HStack>
                  <Text color="fg.muted" fontSize="xs">
                    {body}
                  </Text>
                  <Link
                    alignItems="center"
                    display="inline-flex"
                    fontSize="xs"
                    gap={1}
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {label} <ExternalLink size={10} />
                  </Link>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
