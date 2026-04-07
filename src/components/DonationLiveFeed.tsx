'use client';

import { Flex, Heading, Link, Text } from '@chakra-ui/react';
import { ExternalLink } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { DonationActivityChart } from '@/components/DonationActivityChart';
import { DonationFeed } from '@/components/DonationFeed';
import { DonationProgressBar } from '@/components/DonationProgressBar';
import { LiveDot } from '@/components/LiveDot';
import { DONATIONS_URL, DONATION_REFETCH_INTERVAL } from '@/lib/constants';
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

  return (
    <>
      <Flex align="center" gap={4} mb={2}>
        <Heading as="h1" size={{ base: 'xl', md: '2xl' }}>
          Live Donations
        </Heading>
        <LiveDot active={isConnected} />
      </Flex>
      <Text color="fg.muted" fontSize="sm" mb={6}>
        Every donation counts. Support the ride on{' '}
        <Link href="https://tiltify.com/@cdawgva/cyclethon-5" target="_blank">
          Tiltify <ExternalLink size={10} />
        </Link>
        .
      </Text>

      <DonationActivityChart />

      <DonationProgressBar fact={campaignFact} />

      <DonationFeed donations={donations} />
    </>
  );
}
