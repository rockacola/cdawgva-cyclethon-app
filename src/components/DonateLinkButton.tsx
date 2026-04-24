'use client';

import type { LinkProps } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';

import { useTranslations } from '@/hooks/useTranslations';
import { MAIN_DONATION_URL } from '@/lib/constants';

type DonateLinkButtonProps = Omit<LinkProps, 'href'> & {
  href?: string;
};

export function DonateLinkButton({ href = MAIN_DONATION_URL, ...props }: DonateLinkButtonProps) {
  const t = useTranslations('aboutCyclethon');

  return (
    <Link
      _hover={{ opacity: 0.85, textDecoration: 'none' }}
      bg="accent"
      color="white"
      display="inline-block"
      fontFamily="heading"
      fontSize="sm"
      fontWeight={500}
      href={href}
      px={5}
      py={3}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {t('charityDonateLink')}
    </Link>
  );
}
