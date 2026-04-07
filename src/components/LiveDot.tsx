'use client';

import { Box } from '@chakra-ui/react';

interface Props {
  active: boolean;
}

export function LiveDot({ active }: Props) {
  return (
    <>
      <style>{`
        @keyframes radarRing {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
      <Box flexShrink={0} position="relative">
        {/* Expanding ring */}
        {active ? (
          <Box
            animation="radarRing 1.5s ease-out infinite"
            bgColor="red.500"
            borderRadius="full"
            h={3}
            left={0}
            position="absolute"
            top={0}
            w={3}
          />
        ) : null}
        {/* Solid centre dot */}
        <Box
          bgColor={active ? 'red.500' : 'fg.subtle'}
          borderRadius="full"
          h={3}
          position="relative"
          w={3}
        />
      </Box>
    </>
  );
}
