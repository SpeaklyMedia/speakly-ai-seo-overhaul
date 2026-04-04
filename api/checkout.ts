import Stripe from "stripe";

interface CheckoutRequest {
  method?: string;
  body: { planSlug?: string };
}

interface CheckoutResponse {
  status(code: number): CheckoutResponse;
  json(data: unknown): CheckoutResponse;
}

const PRICE_IDS: Record<string, string> = {
  "competitor-scan": "price_1TIHS5EHagIjCpKA4W8ff42R",
  "visibility-overhaul": "price_1TIHS5EHagIjCpKAITYXikae",
};

export default async function handler(
  req: CheckoutRequest,
  res: CheckoutResponse,
): Promise<CheckoutResponse> {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { planSlug } = req.body;

  if (!planSlug || !(planSlug in PRICE_IDS)) {
    return res.status(400).json({ error: "Invalid plan slug" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: "Stripe secret key not configured" });
  }

  const rawSiteUrl =
    process.env.SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

  if (!rawSiteUrl) {
    return res.status(500).json({ error: "Site URL not configured" });
  }

  const siteUrl = rawSiteUrl.replace(/\/$/, "");

  try {
    const stripe = new Stripe(secretKey, { apiVersion: "2025-11-17.clover" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: PRICE_IDS[planSlug], quantity: 1 }],
      mode: "payment",
      success_url: `${siteUrl}?payment=success`,
      cancel_url: `${siteUrl}#next-step`,
    });

    return res.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Checkout error:", message);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
