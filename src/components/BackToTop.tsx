'use client';

import { IconButton } from '@chakra-ui/react';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const SCROLL_THRESHOLD = 300;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(function trackScroll() {
    function onScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <IconButton
      _hover={{ opacity: 1 }}
      aria-label="Back to top"
      bottom={6}
      boxShadow="md"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      opacity={0.4}
      position="fixed"
      right={{ base: 4, md: 8 }}
      size="md"
      transition="opacity 0.2s"
      variant="solid"
      zIndex="overlay"
    >
      <ArrowUp size={18} />
    </IconButton>
  );
}
