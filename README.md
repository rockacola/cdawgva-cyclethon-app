# CDawgVA Cyclethon Tracker

A live donation tracker for the [CDawgVA Cyclethon 5](https://tiltify.com/@cdawgva/cyclethon-5) charity event: a cross-Japan cycling challenge raising money for charity.

The app polls a live donation feed and displays supporters in a real-time table, with relative timestamps, formatted amounts, and a configurable page size.

## Stack

- **Next.js**: App Router, server components for initial data fetch
- **Chakra UI**: component library and theming
- **Cloudflare R2**: public bucket serving the JSON data feed
- **Vercel**: hosting and continuous deployment

## Getting started

```bash
npm install
cp .env.example .env.local
# Fill in .env.local with your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

| Variable                  | Description                                 |
| ------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_R2_BASE_URL` | Base URL of the Cloudflare R2 public bucket |

## Scripts

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm start             # Start production server
npm run lint          # ESLint
npm run format        # Prettier (write)
npm run format:check  # Prettier (check only)
```

## Deployment

Every push to `main` deploys automatically via Vercel. Set `NEXT_PUBLIC_R2_BASE_URL` in the Vercel project environment variables.
