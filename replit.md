# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/scripts run seed-products` — create Stripe products for the AI-SEO Overhaul

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Stripe Integration

Connected via Replit's native Stripe integration (sandbox). `stripe-replit-sync` is used for:
- Running Stripe schema migrations on startup (`runMigrations`)
- Configuring a managed webhook to keep local DB in sync
- Syncing Stripe data to a `stripe` schema in PostgreSQL

### Products (created in Stripe sandbox)
- **Competitor Scan & AI-SEO Visibility Readiness Kit** — $350 one-time (`price_1TIHS5EHagIjCpKA4W8ff42R`)
- **Visibility Overhaul** — $950 one-time (`price_1TIHS5EHagIjCpKAITYXikae`)

### API endpoints
- `GET /api/products-with-prices` — returns all active products with their prices from `stripe` schema
- `POST /api/checkout` — accepts `{ planSlug }` (`"competitor-scan"` or `"visibility-overhaul"`); resolves the price and constructs success/cancel URLs server-side from `REPLIT_DOMAINS`; returns `{ url }` pointing to a Stripe Checkout session
- `POST /api/stripe/webhook` — Stripe webhook handler (registered before `express.json()`)

### Key files
- `artifacts/api-server/src/stripeClient.ts` — Stripe client using Replit connectors (never cached)
- `artifacts/api-server/src/webhookHandlers.ts` — webhook processing via stripe-replit-sync
- `artifacts/api-server/src/storage.ts` — queries `stripe` schema tables
- `artifacts/api-server/src/routes/stripe.ts` — checkout and products routes
- `scripts/src/seed-products.ts` — idempotent script to create products in Stripe
- `artifacts/ai-seo-overhaul/src/components/sections/NextStep.tsx` — pricing cards with Stripe checkout
- `artifacts/ai-seo-overhaul/src/App.tsx` — payment success banner

### Important note on build
`stripe-replit-sync` is added to esbuild's `external` list in `build.mjs` because it uses `__dirname` to locate its SQL migration files at runtime.

## Vercel Deployment

The repo is configured for Vercel deployment of the AI-SEO landing page as a standalone SPA with a serverless checkout function.

### Files
- `vercel.json` (repo root) — build command, output directory, SPA rewrite, iframe-allow headers
- `api/checkout.ts` (repo root) — Vercel serverless function; accepts `POST { planSlug }`, maps to hardcoded Stripe price IDs, returns Stripe Checkout URL
- `DEPLOY.md` (repo root) — step-by-step Vercel setup guide with required env vars and iframe snippet

### Vercel env vars required
- `STRIPE_SECRET_KEY` — Stripe secret key
- `SITE_URL` — full URL of the deployed site (e.g. `https://ai-seo.speaklymedia.com`)

### Pricing cards / badge fix
The "Most Popular" badge on the Visibility Overhaul card is positioned outside the `overflow-hidden` inner card via a `relative pt-[14px]` outer wrapper. FreeAssessmentCard is wrapped in a matching `pt-[14px]` wrapper at the call site for consistent grid alignment.
