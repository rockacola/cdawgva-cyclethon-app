import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';

export interface FlatCardProps {
  body: string;
  href?: string;
  icon: ReactNode;
  label?: string;
  title: string;
}

export function FlatCard({ body, href, icon, label, title }: FlatCardProps) {
  return (
    <Box borderColor="border" borderWidth="1px" p={5}>
      <Flex align="center" color="accent" gap={2} mb={3}>
        {icon}
        <Text fontFamily="mono" fontSize="xs" letterSpacing="widest" textTransform="uppercase">
          {title}
        </Text>
      </Flex>
      <Text color="fg.muted" fontSize="sm" lineHeight={1.6}>
        {body}
      </Text>
      {href && label ? (
        <Link
          _hover={{ color: 'fg' }}
          alignItems="center"
          color="fg.subtle"
          display="inline-flex"
          fontFamily="mono"
          fontSize="xs"
          gap={1.5}
          href={href}
          letterSpacing="wide"
          mt={3}
          rel="noopener noreferrer"
          target="_blank"
        >
          {label} <ExternalLink size={10} />
        </Link>
      ) : null}
    </Box>
  );
}
