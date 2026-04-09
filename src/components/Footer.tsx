import { HStack, Link, Spacer, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export function Footer() {
  return (
    <HStack as="footer" bgColor="bg.subtle" borderTopWidth="1px" mt={12} px={4} py={6}>
      <HStack gap={4}>
        <Text color="fg.subtle" fontSize="sm">
          Cyclethon Tracker
        </Text>
        <Text color="fg.subtle" fontSize="sm">
          ·
        </Text>
        <Link
          _hover={{ color: 'fg', textDecoration: 'none' }}
          asChild
          color="fg.muted"
          fontSize="sm"
        >
          <NextLink href="/about">About</NextLink>
        </Link>
      </HStack>
      <Spacer />
      <Text color="fg.subtle" fontSize="xs" opacity={0.5}>
        v{process.env.APP_VERSION}
      </Text>
      <Spacer />
    </HStack>
  );
}
