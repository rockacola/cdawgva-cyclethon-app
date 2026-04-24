'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';

import { useTranslations } from '@/hooks/useTranslations';
import { useLocaleContext } from '@/providers/LocaleProvider';

export interface Edition {
  days: number;
  edition: string;
  raised: number;
  route: string;
  routeJa: string;
  year: number;
}

interface EditionsByRaiseChartProps {
  currencyPrefix: string;
  editions: Edition[];
}

function fmtShort(n: number, currencyPrefix: string): string {
  if (n >= 1_000_000) {
    return `${currencyPrefix}${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `${currencyPrefix}${Math.round(n / 1_000)}k`;
  }
  return `${currencyPrefix}${n}`;
}

function DesktopChart({ currencyPrefix, editions }: EditionsByRaiseChartProps) {
  const t = useTranslations('aboutCyclethon');
  const { resolvedLocale } = useLocaleContext();
  const max = Math.max(...editions.map((e) => e.raised));

  return (
    <>
      {/* Bar chart area */}
      <Grid
        alignItems="end"
        gap={5}
        gridTemplateColumns={`repeat(${editions.length}, 1fr)`}
        h="240px"
        pt={5}
      >
        {editions.map((e, i) => {
          const isLatest = i === editions.length - 1;
          const pct = e.raised / max;
          return (
            <Flex direction="column" h="100%" justify="flex-end" key={e.edition}>
              <Text
                fontFamily="heading"
                fontSize="md"
                fontVariantNumeric="tabular-nums"
                letterSpacing="-0.02em"
                mb={2}
              >
                {fmtShort(e.raised, currencyPrefix)}
              </Text>
              <Box
                bg={isLatest ? 'accent' : 'fg'}
                borderTopColor="accent"
                borderTopWidth={isLatest ? '3px' : '0'}
                minH="4px"
                opacity={isLatest ? 1 : 0.15}
                style={{ height: `${pct * 100}%` }}
              />
            </Flex>
          );
        })}
      </Grid>

      {/* Label area */}
      <Grid gap={5} gridTemplateColumns={`repeat(${editions.length}, 1fr)`} mt={4}>
        {editions.map((e, i) => {
          const isLatest = i === editions.length - 1;
          return (
            <Box key={e.edition}>
              <Text
                color={isLatest ? 'accent' : 'fg'}
                fontFamily="heading"
                fontSize="lg"
                fontStyle="italic"
              >
                Cyclethon {e.edition}
              </Text>
              <Text
                color="fg.subtle"
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="wide"
                mt={0.5}
                textTransform="uppercase"
              >
                {e.year}
              </Text>
              <Text color="fg.muted" fontSize="xs" lineHeight={1.4} mt={1.5}>
                {resolvedLocale === 'JA' ? e.routeJa : e.route}
              </Text>
              <Text color="fg.subtle" fontFamily="mono" fontSize="xs" mt={1}>
                {t('editionDays', { count: e.days })}
              </Text>
            </Box>
          );
        })}
      </Grid>
    </>
  );
}

function MobileChart({ currencyPrefix, editions }: EditionsByRaiseChartProps) {
  const t = useTranslations('aboutCyclethon');
  const { resolvedLocale } = useLocaleContext();
  const max = Math.max(...editions.map((e) => e.raised));

  return (
    <Flex direction="column" gap={5} pt={5}>
      {editions.map((e, i) => {
        const isLatest = i === editions.length - 1;
        const pct = e.raised / max;
        return (
          <Box key={e.edition}>
            {/* Edition meta row */}
            <Flex align="baseline" gap={2} mb={1.5}>
              <Text
                color={isLatest ? 'accent' : 'fg'}
                fontFamily="heading"
                fontSize="sm"
                fontStyle="italic"
              >
                Cyclethon {e.edition}
              </Text>
              <Text
                color="fg.subtle"
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="wide"
                textTransform="uppercase"
              >
                {e.year}
              </Text>
            </Flex>

            {/* Horizontal bar + amount */}
            <Flex align="center" gap={3}>
              <Box flex={1} h="28px" position="relative">
                <Box
                  bg={isLatest ? 'accent' : 'fg'}
                  borderRightColor="accent"
                  borderRightWidth={isLatest ? '3px' : '0'}
                  h="100%"
                  minW="4px"
                  opacity={isLatest ? 1 : 0.15}
                  style={{ width: `${pct * 100}%` }}
                />
              </Box>
              <Text
                fontFamily="heading"
                fontSize="sm"
                fontVariantNumeric="tabular-nums"
                letterSpacing="-0.02em"
                minW="48px"
                textAlign="right"
              >
                {fmtShort(e.raised, currencyPrefix)}
              </Text>
            </Flex>

            {/* Route + days */}
            <Text color="fg.muted" fontSize="xs" lineHeight={1.4} mt={1}>
              {resolvedLocale === 'JA' ? e.routeJa : e.route}
              {' · '}
              {t('editionDays', { count: e.days })}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
}

export function EditionsByRaiseChart({ currencyPrefix, editions }: EditionsByRaiseChartProps) {
  return (
    <>
      <Box display={{ base: 'none', md: 'block' }}>
        <DesktopChart currencyPrefix={currencyPrefix} editions={editions} />
      </Box>
      <Box display={{ base: 'block', md: 'none' }}>
        <MobileChart currencyPrefix={currencyPrefix} editions={editions} />
      </Box>
    </>
  );
}
