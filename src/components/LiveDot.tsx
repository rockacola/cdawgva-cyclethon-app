'use client';

import { Box } from '@chakra-ui/react';

interface Props {
  active: boolean;
}

export function LiveDot({ active }: Props) {
  return (
    <>
      <style>{`
        @keyframes liveDotPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
      <Box
        animation={active ? 'liveDotPulse 1.5s ease-in-out infinite' : undefined}
        bg={active ? 'red.500' : 'fg.subtle'}
        borderRadius="full"
        flexShrink={0}
        h={3}
        w={3}
      />
    </>
  );
}
