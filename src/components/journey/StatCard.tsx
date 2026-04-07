import { Box, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export interface StatCardProps {
  color: string;
  conversion?: string;
  icon: ReactNode;
  label: string;
  value: string;
}

export function StatCard({ color, conversion, icon, label, value }: StatCardProps) {
  return (
    <Box borderRadius="lg" borderWidth="1px" p={3}>
      <Box
        alignItems="center"
        borderRadius="md"
        display="inline-flex"
        justifyContent="center"
        mb={2}
        p={1.5}
        style={{ backgroundColor: `${color}22`, color }}
      >
        {icon}
      </Box>
      <Text
        color="fg.muted"
        fontSize="xs"
        fontWeight="semibold"
        letterSpacing="wide"
        mb={0.5}
        textTransform="uppercase"
      >
        {label}
      </Text>
      <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold" lineHeight="1.2">
        {value}
      </Text>
      {conversion ? (
        <Text color="fg.subtle" fontSize="xs" mt={0.5}>
          {conversion}
        </Text>
      ) : null}
    </Box>
  );
}
