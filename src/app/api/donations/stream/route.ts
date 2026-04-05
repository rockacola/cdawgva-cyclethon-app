import type { NextRequest } from 'next/server';

import { donationsEmitter } from '@/lib/donations-emitter';
import type { CampaignFact, Donation } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const sendDonation = (donation: Donation) => {
        controller.enqueue(
          encoder.encode(`event: donation\ndata: ${JSON.stringify(donation)}\n\n`)
        );
      };

      const sendFact = (fact: CampaignFact) => {
        controller.enqueue(encoder.encode(`event: fact\ndata: ${JSON.stringify(fact)}\n\n`));
      };

      // Flush headers immediately so the browser transitions to OPEN
      controller.enqueue(encoder.encode(': connected\n\n'));

      donationsEmitter.on('donation', sendDonation);
      donationsEmitter.on('fact', sendFact);

      req.signal.addEventListener('abort', () => {
        donationsEmitter.off('donation', sendDonation);
        donationsEmitter.off('fact', sendFact);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
