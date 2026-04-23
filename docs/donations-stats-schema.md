# donations-stats.json Schema

Hosted on Cloudflare R2 at `NEXT_PUBLIC_R2_BASE_URL/donations-stats.json`.

Fetched server-side via `src/lib/getStats.ts` and client-side via `src/hooks/useDailyTotals.ts`.

## Structure

```json
{
  "_meta": {
    "generated_at": "ISO 8601 timestamp",
    "timezone": "IANA timezone (e.g. Asia/Tokyo)",
    "utc_offset": "offset string (e.g. +09:00)"
  },
  "campaign": {
    "fetched_at": "ISO 8601 timestamp",
    "amount_raised_cent": 27711181,
    "amount_raised_currency": "USD",
    "goal_cent": 25000000,
    "goal_currency": "USD"
  },
  "stats": {
    "daily_totals": [
      {
        "date": "YYYY-MM-DD",
        "by_currency": {
          "USD": {
            "amount_cent": 10841771,
            "count": 1360
          }
        },
        "cumulative_by_currency": {
          "USD": {
            "amount_cent": 11022941,
            "count": 1476
          }
        }
      }
    ]
  }
}
```

## Notes

- `campaign` is optional — may be absent if the Tiltify fetch failed.
- `by_currency[currency].count` — number of donations on that day for that currency.
- `cumulative_by_currency[currency].count` — running total of all donations up to and including that day.
- The last entry in `daily_totals` holds the overall campaign totals in `cumulative_by_currency`.
- There is no unique donor count in this file — `count` tracks donation transactions, not distinct donors.
