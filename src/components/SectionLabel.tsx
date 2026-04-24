import { Box, Flex, Text } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export function SectionLabel({ children }: Props) {
  return (
    <Flex align="center" gap={3} mb={5}>
      <Box bg="accent" flexShrink={0} h="1px" w={5} />
      <Text
        color="accent"
        fontFamily="mono"
        fontSize="xs"
        letterSpacing="widest"
        textTransform="uppercase"
      >
        {children}
      </Text>
    </Flex>
  );
}
