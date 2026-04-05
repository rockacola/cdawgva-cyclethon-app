import { EventEmitter } from 'events';

import type { CampaignFact, Donation } from '@/lib/types';

class DonationsEmitter extends EventEmitter {
  emitDonation(donation: Donation) {
    this.emit('donation', donation);
  }

  emitFact(fact: CampaignFact) {
    this.emit('fact', fact);
  }
}

// Module-level singleton — shared across requests in the same process
export const donationsEmitter = new DonationsEmitter();
