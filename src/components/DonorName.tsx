import { Text } from '@chakra-ui/react';

import { isAnonymous } from '@/lib/donationUtils';

interface Props {
  name: string;
}

export function DonorName({ name }: Props) {
  if (isAnonymous(name)) {
    return (
      <Text as="span" color="fg.muted" fontStyle="italic" fontWeight="normal">
        {name}
      </Text>
    );
  }
  return <>{name}</>;
}
