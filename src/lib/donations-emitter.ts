import { EventEmitter } from 'events';

import type { Donation } from '@/lib/types';

class DonationsEmitter extends EventEmitter {
  emitDonation(donation: Donation) {
    this.emit('donation', donation);
  }
}

// Module-level singleton — shared across requests in the same process
export const donationsEmitter = new DonationsEmitter();
