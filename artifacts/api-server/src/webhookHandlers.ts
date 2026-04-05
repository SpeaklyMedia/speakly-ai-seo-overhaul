import Stripe from 'stripe';
import { getStripeSync, getStripeSecretKey } from './stripeClient.js';
import { logger } from './lib/logger.js';
import {
  sendCompetitorScanSequence,
  sendVisibilityOverhaulSequence,
  sendAdminPurchaseNotification,
} from './lib/emailSequences.js';

/**
 * Maps Stripe product names (as stored in our catalog) to plan slugs.
 * Keep in sync with routes/stripe.ts PLAN_PRODUCT_NAMES.
 */
const PRODUCT_NAME_TO_PLAN: Record<string, string> = {
  'Competitor Scan & AI-SEO Visibility Readiness Kit': 'competitor-scan',
  'Visibility Overhaul': 'visibility-overhaul',
};

export class WebhookHandlers {
  static async processWebhook(payload: Buffer, signature: string): Promise<void> {
    if (!Buffer.isBuffer(payload)) {
      throw new Error(
        'STRIPE WEBHOOK ERROR: Payload must be a Buffer. ' +
        'Received type: ' + typeof payload + '. ' +
        'This usually means express.json() parsed the body before reaching this handler. ' +
        'FIX: Ensure webhook route is registered BEFORE app.use(express.json()).'
      );
    }

    // 1. Let stripe-replit-sync handle DB sync and signature verification.
    //    It throws if the signature is invalid, so if we reach step 2 the
    //    payload is already trusted.
    const sync = await getStripeSync();
    await sync.processWebhook(payload, signature);

    // 2. Parse the verified payload to drive email sequences.
    let event: { type: string; data: { object: Stripe.Checkout.Session } };
    try {
      event = JSON.parse(payload.toString('utf8')) as typeof event;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error({ err: msg }, 'Failed to parse verified webhook payload');
      return;
    }

    if (event.type !== 'checkout.session.completed') {
      return;
    }

    await WebhookHandlers.handleCheckoutCompleted(event.data.object);
  }

  private static async handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name ?? null;
    const sessionId = session.id;
    const amountTotal = session.amount_total;
    const currency = session.currency;

    if (!customerEmail) {
      logger.warn({ sessionId }, 'checkout.session.completed has no customer email — skipping email sequences');
      return;
    }

    // Determine plan from line items. We expand line_items on the session via API.
    const planSlug = await WebhookHandlers.resolvePlanSlug(sessionId);
    if (!planSlug) {
      logger.warn({ sessionId }, 'Could not resolve plan slug from session line items — skipping email sequences');
      return;
    }

    logger.info({ sessionId, planSlug, customerEmail }, 'Dispatching post-purchase email sequence');

    // Send admin notification.
    try {
      const planName = planSlug === 'competitor-scan'
        ? 'Competitor Scan & AI-SEO Visibility Readiness Kit ($350)'
        : 'Visibility Overhaul ($950)';
      await sendAdminPurchaseNotification({
        planName,
        customerEmail,
        customerName,
        amountTotal,
        currency,
        sessionId,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error({ err: msg, sessionId }, 'Failed to send admin purchase notification');
    }

    // Dispatch customer email sequence (Email 1 is immediate; later emails are
    // scheduled via setTimeout as noted in emailSequences.ts).
    try {
      if (planSlug === 'competitor-scan') {
        await sendCompetitorScanSequence({ customerEmail, customerName });
      } else if (planSlug === 'visibility-overhaul') {
        await sendVisibilityOverhaulSequence({ customerEmail, customerName });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error({ err: msg, sessionId, planSlug }, 'Failed to send customer Email 1 in sequence');
    }
  }

  /**
   * Retrieve the checkout session with expanded line_items from Stripe, then
   * match the product name against our plan map to return the plan slug.
   */
  private static async resolvePlanSlug(sessionId: string): Promise<string | null> {
    try {
      const secretKey = await getStripeSecretKey();
      const stripe = new Stripe(secretKey);
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items.data.price.product'],
      });

      const lineItems = session.line_items?.data ?? [];
      for (const item of lineItems) {
        const price = item.price as Stripe.Price | null;
        if (!price) continue;
        const product = price.product as Stripe.Product | string | null;
        if (!product || typeof product === 'string') continue;
        const productName = product.name;
        if (productName && productName in PRODUCT_NAME_TO_PLAN) {
          return PRODUCT_NAME_TO_PLAN[productName];
        }
      }
      return null;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error({ err: msg, sessionId }, 'Error resolving plan slug from session');
      return null;
    }
  }
}
