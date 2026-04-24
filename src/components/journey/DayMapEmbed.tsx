import { Box } from '@chakra-ui/react';

interface Props {
  embedUrl: string;
  title?: string;
}

export function DayMapEmbed({ embedUrl, title = 'Route Map' }: Props) {
  return (
    <Box
      borderRadius="sm"
      h={{ base: '280px', md: '400px', lg: '480px' }}
      overflow="hidden"
      w="100%"
    >
      <iframe
        allowFullScreen
        height="100%"
        src={embedUrl}
        style={{ border: 0, display: 'block' }}
        title={title}
        width="100%"
      />
    </Box>
  );
}
