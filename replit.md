# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.
The primary deliverable is the **Speakly AI-SEO Overhaul** landing page + two embeddable iframe widgets, deployed on Vercel and embedded on `speaklymedia.com`.

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

---

## AI-SEO Overhaul App (`artifacts/ai-seo-overhaul`)

React + Vite SPA. Serves three routes:

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` and `/*` | `MainApp` | Full dark-theme landing page (8 sections) |
| `/widget-home` | `WidgetHome` | Embeddable iframe: 3 value-prop tiles + CTA |
| `/widget-offers` | `WidgetOffers` | Embeddable iframe: pricing cards with Stripe checkout |

Routing uses `react-router-dom` with `BrowserRouter` and `basename={import.meta.env.BASE_URL}`.

### Widget embed URLs (production)

```
https://speakly-ai-seo-overhaul.vercel.app/widget-home
https://speakly-ai-seo-overhaul.vercel.app/widget-offers
```

### Widget iframe embed code (copy-paste for speaklymedia.com)

**Widget 1 — Home value props:**
```html
<iframe
  id="speakly-widget-home"
  src="https://speakly-ai-seo-overhaul.vercel.app/widget-home"
  width="100%" height="0" scrolling="no"
  style="border:none; border-radius:28px; display:block; overflow:hidden;"
  loading="lazy" title="Speakly AI-SEO"
></iframe>
<script>
window.addEventListener("message", function(e) {
  if (e.data && e.data.speaklyWidget) {
    var iframe = document.getElementById("speakly-widget-home");
    if (iframe && e.source === iframe.contentWindow) {
      iframe.style.height = e.data.height + "px";
    }
  }
});
</script>
```

**Widget 2 — Offer cards:**
```html
<iframe
  id="speakly-widget-offers"
  src="https://speakly-ai-seo-overhaul.vercel.app/widget-offers"
  width="100%" height="0" scrolling="no"
  style="border:none; display:block; overflow:hidden;"
  loading="lazy" title="Speakly AI-SEO Offers"
></iframe>
<script>
window.addEventListener("message", function(e) {
  if (e.data && e.data.speaklyWidget) {
    var iframe = document.getElementById("speakly-widget-offers");
    if (iframe && e.source === iframe.contentWindow) {
      iframe.style.height = e.data.height + "px";
    }
  }
});
</script>
```

### Widget auto-resize
Both widgets use `useIframeAutoresize` (`src/hooks/use-iframe-autoresize.ts`).
They measure `document.documentElement.scrollHeight`, post `{ speaklyWidget: true, height }` to `window.parent` on mount and via `ResizeObserver`. The listener scripts above receive these messages and set the iframe height. No fixed height needed.

### Widget design system (light theme)
Both widgets use a light theme designed to blend with the speaklymedia.com white/light WordPress host page. AI brand hints are touches only:

| Element | Value |
|---------|-------|
| Page background | `#f7f9fc` |
| Card background | `#ffffff` |
| Card border | `#e2eaf3` |
| Heading color | `#0f1923` |
| Body text | `#5a6a7e` |
| AI accent — gradient | `linear-gradient(135deg, #6fe2cf, #78c7ff)` |
| AI accent — teal text | `#1a9e8e` |
| AI accent — blue link | `#2a7ab5` |
| Highlighted card tint | `rgba(111,226,207,0.08)` |
| CTA / payment buttons | Full cyan-to-blue gradient on all cards |

---

## Stripe Integration

Connected via Replit's native Stripe integration (sandbox). `stripe-replit-sync` is used for:
- Running Stripe schema migrations on startup (`runMigrations`)
- Configuring a managed webhook to keep local DB in sync
- Syncing Stripe data to a `stripe` schema in PostgreSQL

### Products (created in Stripe sandbox)
- **Competitor Scan & AI-SEO Visibility Readiness Kit** — $350 one-time (`price_1TIHS5EHagIjCpKA4W8ff42R`)
- **Visibility Overhaul** — $950 one-time (`price_1TIHS5EHagIjCpKAITYXikae`)

### API endpoints (local Express — `artifacts/api-server`)
- `GET /api/products-with-prices` — returns all active products with their prices from `stripe` schema
- `POST /api/checkout` — accepts `{ planSlug }` (`"competitor-scan"` or `"visibility-overhaul"`); resolves the price and constructs success/cancel URLs server-side from `REPLIT_DOMAINS`; returns `{ url }` pointing to a Stripe Checkout session
- `POST /api/stripe/webhook` — Stripe webhook handler (registered before `express.json()`)
- `POST /api/assess` — mirrors Vercel assess handler; validates form data, sends lead confirmation + admin notification HTML emails via Resend, queues 24h + 48h follow-up emails via setTimeout; returns `{ success: true, zoomUrl }`

### API endpoints (Vercel serverless — `api/` at repo root)
- `POST /api/checkout` — maps `{ planSlug }` to hardcoded price IDs; verifies CORS origin; includes `planSlug` in Stripe session metadata; returns `{ url }`
- `POST /api/webhook` — receives Stripe `checkout.session.completed` events; verifies signature with `STRIPE_WEBHOOK_SECRET`; sends payment notification email via Resend. Uses `export const config = { api: { bodyParser: false } }` so raw body is available for signature verification.
- `POST /api/assess` — receives free assessment form submissions `{ name, email, website }`; validates inputs; sends confirmation email to lead (with Zoom booking link + 5-day deadline), admin notification email (HTML, with lead data + sequence confirmation), and queues 24h + 48h follow-up emails via setTimeout; returns `{ success: true, zoomUrl }`

### Key files
- `artifacts/api-server/src/stripeClient.ts` — Stripe client using Replit connectors (never cached)
- `artifacts/api-server/src/webhookHandlers.ts` — webhook processing via stripe-replit-sync
- `artifacts/api-server/src/storage.ts` — queries `stripe` schema tables
- `artifacts/api-server/src/routes/stripe.ts` — checkout and products routes
- `scripts/src/seed-products.ts` — idempotent script to create products in Stripe
- `artifacts/ai-seo-overhaul/src/components/sections/NextStep.tsx` — pricing cards (main landing page)
- `artifacts/ai-seo-overhaul/src/pages/WidgetOffers.tsx` — pricing cards (widget)
- `artifacts/ai-seo-overhaul/src/App.tsx` — payment success banner

### Important note on build
`stripe-replit-sync` is added to esbuild's `external` list in `build.mjs` because it uses `__dirname` to locate its SQL migration files at runtime.

---

## Vercel Deployment

GitHub repo: `SpeaklyMedia/speakly-ai-seo-overhaul`
Vercel project: `prj_YXWOyopYetXZrOR9zdoK13HCrWVK`, team `team_Fk5OMn1ovpKqUNQWuvLXJGGJ`
Production URL: `https://speakly-ai-seo-overhaul.vercel.app`

### Deployment files
- `vercel.json` (repo root) — build command, output directory, functions config (webhook `maxDuration`), SPA rewrite, iframe-allow headers
- `api/checkout.ts` (repo root) — Vercel serverless function; accepts `POST { planSlug }`, maps to hardcoded Stripe price IDs, returns Stripe Checkout URL; CORS restricted to `*.speaklymedia.com` + `*.vercel.app` (localhost in dev only)
- `api/webhook.ts` (repo root) — Vercel serverless function; receives Stripe `checkout.session.completed` events; verifies signature with `STRIPE_WEBHOOK_SECRET`; sends payment notification email via Resend. Uses `export const config = { api: { bodyParser: false } }` so raw body is available for signature verification.
- `api/assess.ts` (repo root) — Vercel serverless function; accepts free assessment form submissions; logs every lead as structured JSON; sends lead notification email via Resend when configured
- `DEPLOY.md` (repo root) — step-by-step Vercel setup guide with all 5 required env vars, webhook registration, lead capture, and iframe embedding instructions

### Vercel env vars required
- `STRIPE_SECRET_KEY` — Stripe secret key (`sk_live_...` or `sk_test_...`)
- `SITE_URL` — full URL of the deployed site (e.g. `https://speakly-ai-seo-overhaul.vercel.app`)
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret (`whsec_...`); obtained after registering `/api/webhook` as a Stripe webhook endpoint
- `RESEND_API_KEY` — Resend API key for sending email notifications (free at resend.com)
- `NOTIFY_EMAIL` — email address that receives payment confirmations and free assessment leads
- `ZOOM_BOOKING_URL` — Zoom Scheduler or booking page link (placeholder: `https://zoom.us/booking/your-booking-link-here`); the owner provides the real link post-build

### Deploying
Deployments are triggered via the Vercel API using the `VERCEL_TOKEN` secret:
```bash
curl -X POST "https://api.vercel.com/v13/deployments?teamId=team_Fk5OMn1ovpKqUNQWuvLXJGGJ" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"speakly-ai-seo-overhaul","gitSource":{"type":"github","org":"SpeaklyMedia","repo":"speakly-ai-seo-overhaul","ref":"main"},"target":"production","projectSettings":{"buildCommand":"pnpm --filter @workspace/ai-seo-overhaul run build","outputDirectory":"artifacts/ai-seo-overhaul/dist/public","installCommand":"pnpm install","framework":null}}'
```

---

## Known Issues & Limitations

### GitHub SSH deploy key must be re-created each session
The SSH deploy key for pushing to `SpeaklyMedia/speakly-ai-seo-overhaul` is stored at `/tmp/deploy_key_new` and **does not persist between Replit sessions**. At the start of any session that requires a `git push`:

1. Generate a new key: `ssh-keygen -t ed25519 -C "replit-deploy" -f /tmp/deploy_key_new -N ""`
2. Get GitHub token from the GitHub connector (via `code_execution`):
   ```js
   const conns = await listConnections('github');
   const token = conns[0].settings.access_token;
   ```
3. Add the public key to the repo via GitHub API:
   ```bash
   curl -X POST https://api.github.com/repos/SpeaklyMedia/speakly-ai-seo-overhaul/keys \
     -H "Authorization: token $GH_TOKEN" \
     -d '{"title":"replit-deploy-...","key":"<pubkey>","read_only":false}'
   ```
4. Configure SSH: write `~/.ssh/config` with `IdentityFile /tmp/deploy_key_new` and `ssh-keyscan github.com >> ~/.ssh/known_hosts`

Old deploy keys accumulate on the repo; they can be cleaned up via the GitHub repo settings.

### Stripe Checkout (`/api/checkout`) uses hardcoded price IDs
`api/checkout.ts` (Vercel serverless) maps `planSlug` to hardcoded Stripe price IDs. If prices are changed in Stripe, the file must be updated manually. See `DEPLOY.md` for instructions on regenerating live-mode price IDs.

### `NextStep.tsx` and `WidgetOffers.tsx` are not shared
The pricing/checkout card logic is duplicated between the main landing page (`NextStep.tsx`) and the widget (`WidgetOffers.tsx`). If checkout UX changes (error handling, button states, etc.), both files need updating.

### Local API server (`artifacts/api-server`) is not used by the Vercel deployment
The Express API server (`/api/checkout`, `/api/products-with-prices`) is used only in local Replit dev. The Vercel production deployment uses `api/checkout.ts` (a separate Vercel serverless function in the repo root). The two are not the same file and can drift.

### Widget `target="_parent"` navigation only works when embedded in an iframe
All CTA links in both widgets use `target="_parent"`. When accessed directly in a browser tab, `_parent` is equivalent to `_self`, so navigation works — but the behavior differs from the intended embedded experience.

### Stripe webhook and assessment emails require manual Vercel env var setup
`api/webhook.ts` and `api/assess.ts` are deployed but will silently skip email delivery if `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, or `NOTIFY_EMAIL` are not set in Vercel. See `DEPLOY.md` for full setup instructions.
