import { HStack, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export function Footer() {
  return (
    <HStack
      as="footer"
      bg="bg.subtle"
      borderTopWidth="1px"
      justify="space-between"
      mt={12}
      px={4}
      py={6}
    >
      <Text color="fg.muted" fontSize="sm">
        Cyclethon Tracker
      </Text>
      <Link _hover={{ color: 'fg', textDecoration: 'none' }} asChild color="fg.muted" fontSize="sm">
        <NextLink href="/about">About</NextLink>
      </Link>
    </HStack>
  );
}
