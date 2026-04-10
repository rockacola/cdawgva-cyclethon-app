import { Box, Text } from '@chakra-ui/react';

import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';

interface Props {
  amount: number;
  currency: string | undefined;
  label: string;
}

export function FundraiseCard({ amount, currency, label }: Props) {
  const currencyPrefix = useCurrencyPrefix();

  return (
    <Box
      _dark={{ bgColor: 'yellow.900/30', borderColor: 'yellow.400/30' }}
      bgColor="yellow.50/50"
      borderColor="yellow.500/30"
      borderRadius="xl"
      borderWidth="2px"
      p={4}
    >
      <Text
        color="fg.muted"
        fontSize="xs"
        fontWeight="semibold"
        letterSpacing="wide"
        mb={1}
        textTransform="uppercase"
      >
        {label}
      </Text>
      <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" lineHeight="1.2">
        {currencyPrefix}
        {amount.toLocaleString()}
      </Text>
      {!!currency && (
        <Text color="fg.subtle" fontSize="xs" mt={0.5}>
          {currency}
        </Text>
      )}
    </Box>
  );
}
