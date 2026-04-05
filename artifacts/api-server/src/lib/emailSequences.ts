/**
 * Post-purchase email sequences for Speakly AI-SEO paid plans.
 *
 * $350 Competitor Scan  — 3 emails: immediate, Day 2, Day 5
 * $950 Visibility Overhaul — 3 emails: immediate, Day 2, Day 7
 *
 * Delayed emails are scheduled with setTimeout. This is intentionally simple
 * for a single-server setup. TODO: migrate to a proper job queue (e.g.
 * pg-boss, BullMQ, or a managed scheduler) before scaling horizontally.
 */

import { Resend } from 'resend';
import { buildEmailHtml } from './emailTemplates.js';
import { logger } from './logger.js';

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  return new Resend(key);
}

const FROM_ADDRESS = 'Speakly AI-SEO <notifications@speaklymedia.com>';

async function sendEmail(opts: {
  to: string;
  subject: string;
  title: string;
  preheader: string;
  bodyHtml: string;
}): Promise<void> {
  const resend = getResend();
  const html = buildEmailHtml({
    title: opts.title,
    preheader: opts.preheader,
    bodyHtml: opts.bodyHtml,
  });
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: opts.to,
    subject: opts.subject,
    html,
  });
  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }
}

function scheduleEmail(delayMs: number, label: string, fn: () => Promise<void>): void {
  // TODO: Replace setTimeout with a persistent job queue before horizontal scaling.
  setTimeout(() => {
    fn().catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error({ label, err: msg }, 'Scheduled email failed');
    });
  }, delayMs);
  logger.info({ label, delayMs }, 'Scheduled follow-up email');
}

// ─── $350 Competitor Scan sequence ──────────────────────────────────────────

export async function sendCompetitorScanSequence(opts: {
  customerEmail: string;
  customerName: string | null;
}): Promise<void> {
  const { customerEmail, customerName } = opts;
  const greeting = customerName ? `Hi ${customerName}` : 'Hi there';

  // Email 1 — Immediate: Purchase confirmation
  await sendEmail({
    to: customerEmail,
    subject: "You're in — your Competitor Scan is confirmed",
    title: 'Competitor Scan Confirmed',
    preheader: "We've received your order and will be in touch within 1 business day.",
    bodyHtml: `
      <h1>Your Competitor Scan is confirmed!</h1>
      <p>${greeting},</p>
      <p>Thank you for purchasing the <strong>Competitor Scan &amp; AI-SEO Visibility Readiness Kit</strong>. We're excited to dig in for you.</p>
      <div class="highlight-box">
        <strong>What happens next:</strong><br />
        We'll reach out within <strong>1 business day</strong> to begin your scan. Keep an eye on your inbox — we may ask a quick question or two to make sure we target the right competitors.
      </div>
      <p>In the meantime, if you have any questions, just reply to this email.</p>
      <p>Talk soon,<br /><strong>The Speakly AI-SEO Team</strong></p>
    `,
  });
  logger.info({ customerEmail }, 'Competitor Scan: Email 1 sent (confirmation)');

  // Email 2 — Day 2: Scan underway
  // [TODO: finalize copy] — placeholder body below, clearly marked.
  scheduleEmail(48 * 60 * 60 * 1000, 'competitor-scan:email-2', async () => {
    await sendEmail({
      to: customerEmail,
      subject: 'Your Competitor Scan is underway',
      title: 'Your Scan Is Underway',
      preheader: "Here's a quick update on where things stand.",
      bodyHtml: `
        <h1>Your scan is underway</h1>
        <p>${greeting},</p>
        <div class="todo-note">
          ✏️ [TODO: finalize copy] — Replace this section with a real status update,
          specific competitor findings teaser, or timeline update before going live.
        </div>
        <p>We're currently working through your competitor analysis. We'll have your full report ready soon.</p>
        <p>If you have any questions while we work, just reply to this email.</p>
        <p>Talk soon,<br /><strong>The Speakly AI-SEO Team</strong></p>
      `,
    });
    logger.info({ customerEmail }, 'Competitor Scan: Email 2 sent (scan underway)');
  });

  // Email 3 — Day 5: Delivery nudge / upsell toward $950 Visibility Overhaul
  // [TODO: finalize copy] — placeholder body below, clearly marked.
  scheduleEmail(5 * 24 * 60 * 60 * 1000, 'competitor-scan:email-3', async () => {
    await sendEmail({
      to: customerEmail,
      subject: 'Your Competitor Scan results — and what comes next',
      title: 'Your Scan Results & What Comes Next',
      preheader: 'Ready to take the next step with a full Visibility Overhaul?',
      bodyHtml: `
        <h1>Your results are on the way</h1>
        <p>${greeting},</p>
        <div class="todo-note">
          ✏️ [TODO: finalize copy] — Replace this section with the actual report
          delivery message, key findings summary, and a compelling upsell toward the
          $950 Visibility Overhaul. Include a CTA button pointing to the checkout page.
        </div>
        <p>We hope your Competitor Scan gave you clarity on where you stand in AI-driven search. If you're ready to take it further, our <strong>Visibility Overhaul</strong> is the natural next step — a deeper, hands-on engagement to fix the gaps we found.</p>
        <p>Reply to this email if you'd like to learn more.</p>
        <p>Talk soon,<br /><strong>The Speakly AI-SEO Team</strong></p>
      `,
    });
    logger.info({ customerEmail }, 'Competitor Scan: Email 3 sent (delivery/upsell)');
  });
}

// ─── $950 Visibility Overhaul sequence ──────────────────────────────────────

export async function sendVisibilityOverhaulSequence(opts: {
  customerEmail: string;
  customerName: string | null;
}): Promise<void> {
  const { customerEmail, customerName } = opts;
  const greeting = customerName ? `Hi ${customerName}` : 'Hi there';

  // Email 1 — Immediate: Purchase confirmation + onboarding next steps
  await sendEmail({
    to: customerEmail,
    subject: "You're in — your Visibility Overhaul is confirmed",
    title: 'Visibility Overhaul Confirmed',
    preheader: "We'll be in touch within 1 business day to kick off your overhaul.",
    bodyHtml: `
      <h1>Your Visibility Overhaul is confirmed!</h1>
      <p>${greeting},</p>
      <p>Thank you for investing in the <strong>Visibility Overhaul</strong>. This is a significant step toward owning your presence in AI-driven search.</p>
      <div class="highlight-box">
        <strong>What happens next:</strong><br />
        We'll be in touch within <strong>1 business day</strong> to kick off your overhaul. We'll send you a short intake form so we can hit the ground running.
      </div>
      <p>If you have immediate questions or context you'd like to share, feel free to reply directly to this email — we read every one.</p>
      <p>Talk soon,<br /><strong>The Speakly AI-SEO Team</strong></p>
    `,
  });
  logger.info({ customerEmail }, 'Visibility Overhaul: Email 1 sent (confirmation)');

  // Email 2 — Day 2: Let's get started / intake kickoff
  // [TODO: finalize copy] — placeholder body below, clearly marked.
  scheduleEmail(48 * 60 * 60 * 1000, 'visibility-overhaul:email-2', async () => {
    await sendEmail({
      to: customerEmail,
      subject: "Let's get started on your Visibility Overhaul",
      title: "Let's Get Started",
      preheader: 'A quick intake to make sure we hit the ground running.',
      bodyHtml: `
        <h1>Let's get started</h1>
        <p>${greeting},</p>
        <div class="todo-note">
          ✏️ [TODO: finalize copy] — Replace this section with a real intake/kickoff
          email: link to an intake form (Typeform, Notion, Google Form, etc.), key
          questions to gather, and what to expect in the first week.
        </div>
        <p>We're ready to kick off your overhaul. To make the most of our time together, we'll need a bit of information about your business and goals.</p>
        <p>Reply to this email or use the intake form we'll send shortly.</p>
        <p>Talk soon,<br /><strong>The Speakly AI-SEO Team</strong></p>
      `,
    });
    logger.info({ customerEmail }, 'Visibility Overhaul: Email 2 sent (kickoff)');
  });

  // Email 3 — Day 7: Check-in / progress update
  // [TODO: finalize copy] — placeholder body below, clearly marked.
  scheduleEmail(7 * 24 * 60 * 60 * 1000, 'visibility-overhaul:email-3', async () => {
    await sendEmail({
      to: customerEmail,
      subject: 'Progress update on your Visibility Overhaul',
      title: 'Your Overhaul Progress Update',
      preheader: "Here's where things stand at the one-week mark.",
      bodyHtml: `
        <h1>One week in — here's your update</h1>
        <p>${greeting},</p>
        <div class="todo-note">
          ✏️ [TODO: finalize copy] — Replace this section with a real progress update:
          what has been completed so far, what is in flight, and any questions or
          decisions needed from the client.
        </div>
        <p>We're making good progress on your Visibility Overhaul. We'll be back in touch soon with a more detailed update.</p>
        <p>As always, reply to this email if anything comes up.</p>
        <p>Talk soon,<br /><strong>The Speakly AI-SEO Team</strong></p>
      `,
    });
    logger.info({ customerEmail }, 'Visibility Overhaul: Email 3 sent (check-in)');
  });
}

// ─── Admin notification ──────────────────────────────────────────────────────

export async function sendAdminPurchaseNotification(opts: {
  planName: string;
  customerEmail: string;
  customerName: string | null;
  amountTotal: number | null;
  currency: string | null;
  sessionId: string;
}): Promise<void> {
  const notifyEmail = process.env.NOTIFY_EMAIL;
  if (!notifyEmail) {
    logger.warn('NOTIFY_EMAIL is not set — skipping admin notification');
    return;
  }

  const { planName, customerEmail, customerName, amountTotal, currency, sessionId } = opts;
  const amount = amountTotal != null
    ? `${(amountTotal / 100).toFixed(2)} ${(currency ?? 'usd').toUpperCase()}`
    : 'Unknown';

  await sendEmail({
    to: notifyEmail,
    subject: `New purchase: ${planName}`,
    title: 'New Purchase Notification',
    preheader: `${customerEmail} just purchased ${planName}.`,
    bodyHtml: `
      <h1>New purchase received</h1>
      <p>A customer just completed checkout.</p>
      <div class="highlight-box">
        <strong>Plan:</strong> ${escHtml(planName)}<br />
        <strong>Amount:</strong> ${escHtml(amount)}<br />
        <strong>Customer email:</strong> ${escHtml(customerEmail)}<br />
        <strong>Customer name:</strong> ${escHtml(customerName ?? 'Not provided')}<br />
        <strong>Session ID:</strong> ${escHtml(sessionId)}
      </div>
      <p>The customer follow-up email sequence has been triggered automatically.</p>
    `,
  });
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
