# Vercel Deployment Guide — Speakly AI-SEO Overhaul

## Overview

This monorepo is set up for Vercel deployment. The `vercel.json` at the repo root
configures the build to produce the AI-SEO landing page SPA and three serverless
API functions:

| Function | Purpose |
|---|---|
| `POST /api/checkout` | Create a Stripe Checkout session for a paid plan |
| `POST /api/webhook` | Receive and verify Stripe webhook events; send payment notification email |
| `POST /api/assess` | Receive free assessment form submissions; send lead notification email |

---

## One-time Vercel setup

1. Repo is live at **https://github.com/SpeaklyMedia/speakly-ai-seo-overhaul**.
2. Import the project in [vercel.com/new](https://vercel.com/new) by selecting that GitHub repo.
3. **Framework preset**: Other (leave as-is — `vercel.json` handles everything).
4. Vercel will detect `vercel.json` automatically. No additional build settings needed.

---

## Required environment variables

Set these in the Vercel dashboard under **Settings → Environment Variables**.

| Variable | Required | Where to get it | Description |
|---|---|---|---|
| `STRIPE_SECRET_KEY` | Yes | Stripe Dashboard → Developers → API Keys | `sk_live_...` or `sk_test_...` |
| `SITE_URL` | Yes | Your deployment URL | e.g. `https://speakly-ai-seo-overhaul.vercel.app` |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe Dashboard → Webhooks → signing secret | `whsec_...` — set **after** registering the webhook endpoint (see below) |
| `RESEND_API_KEY` | Yes | [resend.com](https://resend.com) → API Keys (free tier, no credit card) | Used to send payment + assessment notification emails |
| `NOTIFY_EMAIL` | Yes | Your business inbox | Email address that receives payment confirmations and assessment leads |

> `VERCEL_URL` is automatically set by Vercel and used as a fallback if `SITE_URL`
> is not set, but `SITE_URL` should be set explicitly for stable redirect URLs.

---

## Registering the Stripe webhook (required for payment notifications)

The webhook endpoint at `/api/webhook` must be registered with Stripe so that
payment confirmation events are delivered to your Vercel deployment.

1. Go to **Stripe Dashboard → Developers → Webhooks**.
2. Click **Add endpoint**.
3. Set the endpoint URL to:
   ```
   https://<your-vercel-domain>/api/webhook
   ```
   e.g. `https://speakly-ai-seo-overhaul.vercel.app/api/webhook`
4. Under **Events to listen to**, select:
   - `checkout.session.completed`
5. Save the endpoint.
6. Click the endpoint you just created and copy the **Signing secret** (`whsec_...`).
7. Add it to Vercel as `STRIPE_WEBHOOK_SECRET` (Settings → Environment Variables).
8. Redeploy (or the next `git push` to main will pick it up).

**Why this matters:** Without the webhook, the business owner has no programmatic
record that a payment was completed. Stripe event signatures prevent spoofed events.

---

## Resend setup (required for email notifications)

Payment confirmations and free assessment leads are delivered via
[Resend](https://resend.com) — free tier: 100 emails/day, no credit card required.

1. Create a free account at [resend.com](https://resend.com).
2. Add your sending domain (e.g. `speaklymedia.com`) under **Domains** and verify the DNS records. Alternatively, use Resend's shared `onboarding@resend.dev` domain for testing.
3. Create an API key under **API Keys** and copy it.
4. Set `RESEND_API_KEY` in Vercel.
5. Set `NOTIFY_EMAIL` in Vercel (the address that will receive notifications).

> The `from` address in notification emails is `notifications@speaklymedia.com`.
> If you use a different domain, update the `from` field in `api/webhook.ts` and `api/assess.ts`.

---

## Test mode vs. live mode

If `STRIPE_SECRET_KEY` starts with `sk_test_`, **no real money is charged** — all
transactions are test payments. To go live:

1. In Stripe, switch to Live mode (toggle at the top of the dashboard).
2. Copy your **live** secret key (`sk_live_...`) and update `STRIPE_SECRET_KEY` in Vercel.
3. Regenerate products/prices in live mode:
   ```bash
   STRIPE_SECRET_KEY=sk_live_... pnpm --filter @workspace/scripts run seed-products
   ```
4. Update the `PRICE_IDS` map in `api/checkout.ts` with the new live-mode price IDs.
5. Register a new Stripe webhook endpoint pointing to your production URL (separate from any test webhook).
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel with the live webhook signing secret.

---

## Stripe price IDs

The serverless function at `api/checkout.ts` maps slugs to hardcoded price IDs:

| Slug | Price ID |
|---|---|
| `competitor-scan` | `price_1TIHS5EHagIjCpKA4W8ff42R` |
| `visibility-overhaul` | `price_1TIHS5EHagIjCpKAITYXikae` |

If these price IDs ever change, update the `PRICE_IDS` map in `api/checkout.ts`.

---

## CORS

`/api/checkout` and `/api/assess` restrict incoming requests to allowed origins:

- `https://speaklymedia.com` and `https://*.speaklymedia.com`
- Any `https://*.vercel.app` domain
- `http://localhost:*` (development only)

Requests with no `Origin` header (server-to-server) are allowed through. Requests
from any other origin receive a `403 Origin not allowed` response.

---

## iframe embedding on speaklymedia.com

Once deployed, embed the page on any domain using:

```html
<iframe
  src="https://YOUR_VERCEL_DOMAIN/"
  width="100%"
  height="900"
  style="border:none;"
  title="Speakly AI-SEO Overhaul"
  loading="lazy"
></iframe>
```

The `Content-Security-Policy: frame-ancestors *` header in `vercel.json` allows
embedding from any origin, including speaklymedia.com.

---

## Local build test

To verify the production build locally before pushing:

```bash
pnpm --filter @workspace/ai-seo-overhaul run build
```

The output lands in `artifacts/ai-seo-overhaul/dist/public/`.
