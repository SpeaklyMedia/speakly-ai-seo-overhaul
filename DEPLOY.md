# Vercel Deployment Guide — Speakly AI-SEO Overhaul

## Overview

This monorepo is set up for Vercel deployment. The `vercel.json` at the repo root
configures the build to produce the AI-SEO landing page SPA and a serverless
`/api/checkout` endpoint for Stripe payments.

## One-time Vercel setup

1. Repo is live at **https://github.com/SpeaklyMedia/speakly-ai-seo-overhaul**.
2. Import the project in [vercel.com/new](https://vercel.com/new) by selecting that GitHub repo.
3. **Framework preset**: Other (leave as-is — `vercel.json` handles everything).
4. Vercel will detect `vercel.json` automatically. No additional build settings needed.

## Required environment variables

Set these in the Vercel dashboard under **Settings → Environment Variables**:

| Variable | Required | Description |
|---|---|---|
| `STRIPE_SECRET_KEY` | Yes | Your Stripe secret key (`sk_live_...` or `sk_test_...`) |
| `SITE_URL` | Yes | Full URL of your deployment, e.g. `https://ai-seo.speaklymedia.com` |

> `VERCEL_URL` is set automatically by Vercel and used as a fallback if `SITE_URL`
> is not set, but `SITE_URL` should be set explicitly for stable redirect URLs.

## Stripe price IDs

The serverless function at `api/checkout.ts` maps slugs to hardcoded price IDs:

| Slug | Price ID |
|---|---|
| `competitor-scan` | `price_1TIHS5EHagIjCpKA4W8ff42R` |
| `visibility-overhaul` | `price_1TIHS5EHagIjCpKAITYXikae` |

If these price IDs ever change, update the `PRICE_IDS` map in `api/checkout.ts`.

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

## Local build test

To verify the production build locally before pushing:

```bash
pnpm --filter @workspace/ai-seo-overhaul run build
```

The output lands in `artifacts/ai-seo-overhaul/dist/public/`.
