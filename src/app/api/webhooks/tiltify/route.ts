import { createHmac, timingSafeEqual } from 'crypto';

import type { NextRequest } from 'next/server';

import { donationsEmitter } from '@/lib/donations-emitter';
import type { CampaignFact, Donation } from '@/lib/types';

const SIGNING_ID = process.env.TILTIFY_WEBHOOK_SIGNING_ID;

function verifySignature(timestamp: string, rawBody: string, signature: string): boolean {
  if (!SIGNING_ID) {
    return false;
  }
  const payload = `${timestamp}.${rawBody}`;
  const expected = createHmac('sha256', SIGNING_ID).update(payload).digest('base64');
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get('x-tiltify-signature');
  const timestamp = req.headers.get('x-tiltify-timestamp');

  if (!signature || !timestamp) {
    return new Response('Missing headers', { status: 401 });
  }

  const rawBody = await req.text();

  if (!verifySignature(timestamp, rawBody, signature)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const { meta, data } = payload;

  if (meta?.event_type?.endsWith('donation_updated') && data?.id) {
    const donation: Donation = {
      id: data.id,
      completed_at: Math.floor(new Date(data.completed_at).getTime() / 1000),
      amount_cent: Math.round(parseFloat(data.amount?.value ?? '0') * 100),
      amount_currency: data.amount?.currency ?? 'USD',
      donor_name: data.donor_name ?? 'Anonymous',
      donor_comment: data.donor_comment ?? null,
    };
    donationsEmitter.emitDonation(donation);
  }

  if (meta?.event_type?.endsWith('fact_updated') && data?.total_amount_raised) {
    const fact: CampaignFact = {
      total_amount_raised_cent: Math.round(parseFloat(data.total_amount_raised.value) * 100),
      goal_cent: Math.round(parseFloat(data.goal?.value ?? '0') * 100),
      currency: data.total_amount_raised.currency ?? 'USD',
    };
    donationsEmitter.emitFact(fact);
  }

  return new Response('OK', { status: 200 });
}
