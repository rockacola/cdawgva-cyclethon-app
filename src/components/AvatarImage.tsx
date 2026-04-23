import { Box } from '@chakra-ui/react';
import Image from 'next/image';

interface Props {
  alt: string;
  src: string;
}

export function AvatarImage({ alt, src }: Props) {
  return (
    <Box
      _hover={{ filter: 'opacity(1)' }}
      aspectRatio={4 / 3}
      filter="opacity(0.85)"
      overflow="hidden"
      position="relative"
      transition="filter 0.2s ease"
      w="full"
    >
      <Image
        alt={alt}
        fill
        src={src}
        style={{
          borderBottomRightRadius: '999px',
          borderTopLeftRadius: '999px',
          objectFit: 'cover',
        }}
      />
    </Box>
  );
}
