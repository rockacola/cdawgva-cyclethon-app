'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { DonationActivityChart } from '@/components/DonationActivityChart';
import { DonationFeed } from '@/components/DonationFeed';
import { DonationProgressBar } from '@/components/DonationProgressBar';
import { LiveDot } from '@/components/LiveDot';
import { PageHeader } from '@/components/PageHeader';
import { useAnimatedValue } from '@/hooks/useAnimatedValue';
import { useCurrencyPrefix } from '@/hooks/useCurrencyPrefix';
import { useTranslations } from '@/hooks/useTranslations';
import { DONATIONS_URL, DONATION_REFETCH_INTERVAL } from '@/lib/constants';
import { formatAmountParts } from '@/lib/donationUtils';
import type { CampaignFact, Donation, DonationsData } from '@/lib/types';

const MAX_DONATIONS = 100;

interface Props {
  initialCampaignFact: CampaignFact | null;
  initialDonations: Donation[];
}

export function DonationLiveFeed({ initialCampaignFact, initialDonations }: Props) {
  const [donationMap, setDonationMap] = useState<Map<string, Donation>>(
    () => new Map(initialDonations.map((d) => [d.id, d]))
  );
  const [isConnected, setIsConnected] = useState(false);
  const [campaignFact, setCampaignFact] = useState<CampaignFact | null>(initialCampaignFact);

  useEffect(function startPolling() {
    const poll = async () => {
      try {
        const res = await fetch(DONATIONS_URL, { cache: 'no-store' });
        const data: DonationsData = await res.json();
        setDonationMap((prev) => {
          const additions = data.donations.filter((d) => !prev.has(d.id));
          if (additions.length === 0) {
            return prev;
          }
          const next = new Map(prev);
          additions.forEach((d) => next.set(d.id, d));
          return next;
        });
      } catch {
        // silently ignore poll failures
      }
    };

    const id = setInterval(poll, DONATION_REFETCH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  useEffect(function startSSE() {
    let es: EventSource | null = null;

    function connect() {
      console.log('[sse] connecting');
      es = new EventSource('/api/donations/stream');

      es.onopen = () => {
        console.log('[sse] connected');
        setIsConnected(true);
      };

      es.addEventListener('donation', (event) => {
        const donation: Donation = JSON.parse(event.data);
        setDonationMap((prev) => {
          if (prev.has(donation.id)) {
            return prev;
          }
          const next = new Map(prev);
          next.set(donation.id, donation);
          return next;
        });
      });

      es.addEventListener('fact', (event) => {
        const fact: CampaignFact = JSON.parse(event.data);
        setCampaignFact(fact);
      });

      // Don't close on error — EventSource will auto-reconnect
      es.onerror = () => {
        console.log('[sse] disconnected — reconnecting');
        setIsConnected(false);
      };
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        console.log('[sse] disconnected — tab hidden');
        es?.close();
        es = null;
        setIsConnected(false);
      } else {
        connect();
      }
    }

    connect();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      es?.close();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const donations = useMemo(
    () =>
      Array.from(donationMap.values())
        .sort((a, b) => b.completed_at - a.completed_at)
        .slice(0, MAX_DONATIONS),
    [donationMap]
  );

  const currencyPrefix = useCurrencyPrefix();
  const raisedCent = useAnimatedValue(campaignFact?.total_amount_raised_cent ?? 0);
  const { whole: raisedWhole } = formatAmountParts(raisedCent, currencyPrefix);

  const t = useTranslations('donationLive');

  return (
    <Box>
      {/* ── Page header ───────────────────────────── */}
      <PageHeader>
        <Flex align="center" gap={3} mb={4}>
          <Box bg="accent" flexShrink={0} h="1px" w={5} />
          <Text
            color="accent"
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="widest"
            textTransform="uppercase"
          >
            {t('sectionLabel')}
          </Text>
        </Flex>

        <Text
          as="h1"
          fontFamily="heading"
          fontSize={{ base: '5xl', md: '7xl' }}
          fontWeight={400}
          letterSpacing="-0.03em"
          lineHeight="0.95"
        >
          {t('headline')}{' '}
          <Box as="em" color="accent" fontStyle="italic">
            {t('headlineAccent')}
          </Box>
        </Text>

        <Text
          color="fg.muted"
          fontSize={{ base: 'md', md: 'lg' }}
          lineHeight={1.55}
          maxW="2xl"
          mt={5}
        >
          {t('description')}
        </Text>
      </PageHeader>

      {/* ── Status strip ──────────────────────────── */}
      <Box
        bg="bg.subtle"
        borderBottomWidth="1px"
        borderColor="border"
        px={{ base: 4, md: 8 }}
        py={5}
      >
        <Flex align="center" flexWrap="wrap" gap={8}>
          <Flex align="center" gap={2.5}>
            <LiveDot active={isConnected} />
            <Text
              color="fg.subtle"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              {isConnected ? t('connected') : t('disconnected')}
            </Text>
          </Flex>
          <Box flex={1} />
          {campaignFact ? (
            <>
              <Box textAlign="right">
                <Text
                  color="fg.subtle"
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="widest"
                  textTransform="uppercase"
                >
                  {t('totalRaised')}
                </Text>
                <Text
                  fontFamily="heading"
                  fontSize="2xl"
                  letterSpacing="-0.02em"
                  lineHeight={1}
                  mt={1}
                >
                  {raisedWhole}
                </Text>
              </Box>
            </>
          ) : null}
        </Flex>
      </Box>

      {/* ── Main content ──────────────────────────── */}
      <Box py={{ base: 6, md: 8 }}>
        <Grid
          alignItems="start"
          gap={{ base: 8, md: 12 }}
          templateColumns={{ base: '1fr', md: '1fr 300px' }}
        >
          {/* Feed */}
          <Box order={{ base: 1, md: 0 }}>
            <Flex align="center" gap={3} mb={5}>
              <Box bg="accent" flexShrink={0} h="1px" w={5} />
              <Text
                color="accent"
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                {t('feedLabel')}
              </Text>
            </Flex>
            <DonationFeed donations={donations} />
            <Text color="fg.subtle" fontSize="xs" mt={6}>
              {t('disclaimer')}
            </Text>
          </Box>

          {/* Sidebar */}
          <Box order={{ base: 0, md: 1 }} position={{ base: 'static', md: 'sticky' }} top={20}>
            <Box borderColor="border" borderWidth="1px">
              <Box borderBottomWidth="1px" borderColor="border" p={5}>
                <Flex align="center" gap={3} mb={4}>
                  <Box bg="accent" flexShrink={0} h="1px" w={5} />
                  <Text
                    color="accent"
                    fontFamily="mono"
                    fontSize="xs"
                    letterSpacing="widest"
                    textTransform="uppercase"
                  >
                    {t('activityLabel')}
                  </Text>
                </Flex>
                <DonationActivityChart />
              </Box>
              <Box p={5}>
                <Flex align="center" gap={3} mb={3}>
                  <Box bg="accent" flexShrink={0} h="1px" w={5} />
                  <Text
                    color="accent"
                    fontFamily="mono"
                    fontSize="xs"
                    letterSpacing="widest"
                    textTransform="uppercase"
                  >
                    {t('campaignProgressLabel')}
                  </Text>
                </Flex>
                <DonationProgressBar fact={campaignFact} />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
