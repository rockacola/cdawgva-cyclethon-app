import { timingSafeEqual } from 'crypto';

import type { NextRequest } from 'next/server';

const SIGNING_ID = process.env.TILTIFY_WEBHOOK_SIGNING_ID;

function verifyEndpoint(endpointHeader: string): boolean {
  if (!SIGNING_ID) {
    return false;
  }
  const a = Buffer.from(endpointHeader, 'utf8');
  const b = Buffer.from(SIGNING_ID, 'utf8');
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const endpoint = req.headers.get('x-tiltify-endpoint');
  console.log('[tiltify webhook] endpoint header:', endpoint, '| env signing id:', SIGNING_ID);
  if (!endpoint || !verifyEndpoint(endpoint)) {
    console.log('[tiltify webhook] unauthorized - mismatch or missing env var');
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = await req.json();
  const { meta, data } = payload;

  console.log('[tiltify webhook]', {
    event_type: meta?.event_type,
    generated_at: meta?.generated_at,
    data,
  });

  return new Response('OK', { status: 200 });
}
