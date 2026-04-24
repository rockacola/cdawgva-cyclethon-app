import { Container } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export function PageContainer({ children }: Props) {
  return <Container maxW="5xl">{children}</Container>;
}
