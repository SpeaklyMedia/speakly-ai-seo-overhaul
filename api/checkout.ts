import Stripe from "stripe";

interface CheckoutRequest {
  method?: string;
  body: { planSlug?: string };
  headers: Record<string, string | string[] | undefined>;
}

interface CheckoutResponse {
  status(code: number): CheckoutResponse;
  json(data: unknown): CheckoutResponse;
  setHeader(name: string, value: string): void;
}

const PRICE_IDS: Record<string, string> = {
  "competitor-scan": "price_1TIHS5EHagIjCpKA4W8ff42R",
  "visibility-overhaul": "price_1TIHS5EHagIjCpKAITYXikae",
};

const isProduction = process.env.VERCEL_ENV === "production";

const ALLOWED_ORIGINS: RegExp[] = [
  /^https:\/\/([a-z0-9-]+\.)*speaklymedia\.com$/,
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/,
  ...(!isProduction ? [/^http:\/\/localhost(:\d+)?$/] : []),
];

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true;
  return ALLOWED_ORIGINS.some((re) => re.test(origin));
}

function getOrigin(headers: CheckoutRequest["headers"]): string | undefined {
  const raw = headers["origin"];
  return Array.isArray(raw) ? raw[0] : raw;
}

export default async function handler(
  req: CheckoutRequest,
  res: CheckoutResponse,
): Promise<CheckoutResponse> {
  const origin = getOrigin(req.headers);

  if (req.method === "OPTIONS") {
    if (isAllowedOrigin(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin ?? "*");
    }
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", "86400");
    return res.status(204).json(null);
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isAllowedOrigin(origin)) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
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
      metadata: { planSlug },
    });

    return res.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Checkout error:", message);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
