import type { NextRequest } from 'next/server';

import { donationsEmitter } from '@/lib/donations-emitter';
import type { Donation } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = (donation: Donation) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(donation)}\n\n`));
      };

      donationsEmitter.on('donation', send);

      req.signal.addEventListener('abort', () => {
        donationsEmitter.off('donation', send);
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
