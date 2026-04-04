import type { IncomingMessage, ServerResponse } from "http";
import Stripe from "stripe";
import { Resend } from "resend";

/**
 * Raw body is required for Stripe signature verification.
 *
 * For plain Vercel serverless functions (non-Next.js), using the Node.js
 * `IncomingMessage` / `ServerResponse` types is the correct mechanism to
 * receive an unparsed request stream — Vercel does NOT auto-parse bodies
 * for handlers with this signature. Body is read manually via `readRawBody`
 * so that `stripe.webhooks.constructEvent` can verify the HMAC signature.
 *
 * `vercel.json` functions config governs runtime, memory, and maxDuration;
 * it has no `bodyParser` field for non-Next.js functions. This handler's
 * type signature is the authoritative body-parsing control point.
 */

function readRawBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function sendPaymentEmail(session: Stripe.Checkout.Session): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;
  if (!resendKey || !notifyEmail) {
    console.warn("RESEND_API_KEY or NOTIFY_EMAIL not set — skipping payment email");
    return;
  }

  const resend = new Resend(resendKey);
  const customerEmail = session.customer_details?.email ?? "unknown";
  const amountTotal = session.amount_total != null
    ? `$${(session.amount_total / 100).toFixed(2)}`
    : "unknown";

  const planSlug = (session.metadata as Record<string, string> | null)?.planSlug ?? "unknown";
  const planLabels: Record<string, string> = {
    "competitor-scan": "Competitor Scan & AI-SEO Visibility Readiness Kit ($350)",
    "visibility-overhaul": "Visibility Overhaul ($950)",
  };
  const planLabel = planLabels[planSlug] ?? planSlug;

  await resend.emails.send({
    from: "Speakly Notifications <notifications@speaklymedia.com>",
    to: notifyEmail,
    subject: `New payment received — ${planLabel}`,
    text: [
      "A new Speakly AI-SEO payment has been completed.",
      "",
      `Plan:           ${planLabel}`,
      `Amount:         ${amountTotal}`,
      `Customer email: ${customerEmail}`,
      `Stripe session: ${session.id}`,
      `Payment intent: ${session.payment_intent ?? "n/a"}`,
      "",
      `View in Stripe: https://dashboard.stripe.com/payments/${session.payment_intent ?? ""}`,
    ].join("\n"),
  });
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Stripe keys not configured" }));
    return;
  }

  let rawBody: Buffer;
  try {
    rawBody = await readRawBody(req);
  } catch {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to read request body" }));
    return;
  }

  const sig = req.headers["stripe-signature"];
  if (!sig || Array.isArray(sig)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing stripe-signature header" }));
    return;
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2025-11-17.clover" });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Signature verification failed";
    console.error("Webhook signature error:", message);
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: message }));
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await sendPaymentEmail(session);
    } catch (err: unknown) {
      console.error("Failed to send payment notification email:", err);
    }
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ received: true }));
}
