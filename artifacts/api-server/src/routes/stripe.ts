import { Router, type IRouter } from 'express';
import { storage } from '../storage';
import { getUncachableStripeClient } from '../stripeClient';

const router: IRouter = Router();

const PRICE_IDS: Record<string, string> = {
  'competitor-scan': 'price_1TIHS5EHagIjCpKA4W8ff42R',
  'visibility-overhaul': 'price_1TIHS5EHagIjCpKAITYXikae',
};

router.post('/checkout', async (req, res) => {
  try {
    const body = req.body as { planSlug?: string };
    const { planSlug } = body;

    if (!planSlug || !(planSlug in PRICE_IDS)) {
      return res.status(400).json({ error: 'Invalid plan slug' });
    }

    const domain = process.env.REPLIT_DOMAINS?.split(',')[0];
    if (!domain) {
      return res.status(500).json({ error: 'Server misconfiguration: REPLIT_DOMAINS not set' });
    }

    const frontendBase = `https://${domain}/ai-seo-overhaul/`;
    const successUrl = `${frontendBase}?payment=success`;
    const cancelUrl = `${frontendBase}#next-step`;

    const priceId = PRICE_IDS[planSlug];

    const stripe = await getUncachableStripeClient();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { planSlug },
    });

    return res.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Checkout error:', message);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

router.get('/products-with-prices', async (_req, res) => {
  try {
    const rows = await storage.listProductsWithPrices();

    const productsMap = new Map<string, {
      id: string;
      name: string;
      description: string | null;
      active: boolean;
      prices: Array<{ id: string; unit_amount: number | null; currency: string; active: boolean }>;
    }>();

    for (const row of rows) {
      if (!productsMap.has(row.product_id)) {
        productsMap.set(row.product_id, {
          id: row.product_id,
          name: row.product_name,
          description: row.product_description,
          active: row.product_active,
          prices: [],
        });
      }
      if (row.price_id) {
        productsMap.get(row.product_id)!.prices.push({
          id: row.price_id,
          unit_amount: row.unit_amount,
          currency: row.currency ?? 'usd',
          active: row.price_active ?? true,
        });
      }
    }

    return res.json({ data: Array.from(productsMap.values()) });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Products error:', message);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;
