# webapp

Next.js 15 web app for the CDawgVA Cyclethon 5 donation tracker, deployed to Vercel.

The app fetches donation data at request time from a Cloudflare R2 public bucket. The `generated_at` field in the JSON drives the **Last checked** timestamp shown on the page.

## Requirements

- Node.js (see `.tool-versions`)
- npm

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in .env.local with your values
```

## Environment variables

| Variable                  | Description                                 |
| ------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_R2_BASE_URL` | Base URL of the Cloudflare R2 public bucket |

## Usage

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Deployment

Vercel is configured via `vercel.json` at the repo root. Every push to `main` triggers a new build automatically. Set `NEXT_PUBLIC_R2_BASE_URL` in the Vercel project environment variables.

## Other scripts

```bash
npm run lint          # ESLint
npm run format        # Prettier (write)
npm run format:check  # Prettier (check only)
```
