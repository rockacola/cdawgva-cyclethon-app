'use client';

import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface LedgerSectionProps {
  borderBottom?: boolean;
  children: ReactNode;
  index: string;
  title: string;
}

export function LedgerSection({ borderBottom = true, children, index, title }: LedgerSectionProps) {
  return (
    <Box borderBottomWidth={borderBottom ? '1px' : 0} py={{ base: 10, md: 16 }}>
      <Grid columnGap={{ base: 0, md: 10 }} templateColumns={{ base: '1fr', md: '200px 1fr' }}>
        {/* Side label column */}
        <Box display={{ base: 'none', md: 'block' }} position="relative">
          <Box position="sticky" pt={1} top={6}>
            <Text
              color="accent"
              fontFamily="mono"
              fontSize="sm"
              letterSpacing="widest"
              mb={3}
              textTransform="uppercase"
            >
              § {index}
            </Text>
            <Heading
              as="h2"
              fontFamily="heading"
              fontSize="xl"
              fontWeight={400}
              letterSpacing="-0.02em"
              lineHeight={1.2}
            >
              {title}
            </Heading>
          </Box>
        </Box>

        {/* Mobile label */}
        <Box display={{ base: 'block', md: 'none' }} mb={5}>
          <Text
            color="accent"
            fontFamily="mono"
            fontSize="sm"
            letterSpacing="widest"
            mb={1}
            textTransform="uppercase"
          >
            § {index}
          </Text>
          <Heading
            as="h2"
            fontFamily="heading"
            fontSize="xl"
            fontWeight={400}
            letterSpacing="-0.02em"
          >
            {title}
          </Heading>
        </Box>

        {/* Content column */}
        <Box>{children}</Box>
      </Grid>
    </Box>
  );
}
