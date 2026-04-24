import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

export function PageHeader({ children, ...props }: BoxProps) {
  return (
    <Box borderBottomWidth="1px" borderColor="border" py={{ base: 8, md: 12 }} {...props}>
      {children}
    </Box>
  );
}
