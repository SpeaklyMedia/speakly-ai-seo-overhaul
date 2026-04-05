/**
 * Post-purchase email sequences for Speakly AI-SEO paid plans.
 *
 * $350 Competitor Scan  — 3 emails: immediate, Day 2, Day 5
 * $950 Visibility Overhaul — 3 emails: immediate, Day 2, Day 7
 *
 * Delayed emails are scheduled with setTimeout. This is intentionally simple
 * for a single-server setup. Migrate to a proper job queue (e.g. pg-boss,
 * BullMQ, or a managed scheduler) before running multiple server instances.
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
  scheduleEmail(48 * 60 * 60 * 1000, 'competitor-scan:email-2', async () => {
    await sendEmail({
      to: customerEmail,
      subject: 'Your Competitor Scan is underway',
      title: 'Your Scan Is Underway',
      preheader: "Here's a quick update on where things stand.",
      bodyHtml: `
        <h1>Your scan is underway</h1>
        <p>${greeting},</p>
        <p>We're actively working through your competitor analysis — pulling citations, surfacing gaps, and mapping where your rivals show up in AI-generated answers across your category.</p>
        <div class="highlight-box">
          This typically takes 2–3 business days to complete thoroughly. We'll send your full report as soon as it's ready, along with a short video walkthrough of the key findings.
        </div>
        <p>If you have any questions in the meantime, or want to share additional context about your business or competitors, just reply to this email.</p>
        <p>Talk soon,<br /><strong>The Speakly AI-SEO Team</strong></p>
      `,
    });
    logger.info({ customerEmail }, 'Competitor Scan: Email 2 sent (scan underway)');
  });

  // Email 3 — Day 5: Delivery nudge / upsell toward $950 Visibility Overhaul
  scheduleEmail(5 * 24 * 60 * 60 * 1000, 'competitor-scan:email-3', async () => {
    await sendEmail({
      to: customerEmail,
      subject: 'Your Competitor Scan results — and what comes next',
      title: 'Your Scan Results & What Comes Next',
      preheader: 'Ready to take the next step with a full Visibility Overhaul?',
      bodyHtml: `
        <h1>Your results are on the way</h1>
        <p>${greeting},</p>
        <p>Your Competitor Scan report is being finalised. You'll receive it as a PDF with a short video walkthrough — typically delivered within 5–7 business days of your purchase.</p>
        <p>In the meantime, a thought worth considering: the Competitor Scan shows you <em>where</em> you're invisible in AI-driven search and <em>why</em> your rivals are winning citations you should be earning. The natural next step is fixing it.</p>
        <div class="highlight-box">
          <strong>The Visibility Overhaul ($950)</strong> takes your scan findings and implements them — source-of-truth content architecture, schema &amp; structured data, and a content engine built to fuel AI recommendations. It's the complete Phase 0–2 system, done for you.
        </div>
        <p>If you'd like to learn more or get started after you review your report, just reply to this email. We're happy to walk you through it.</p>
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
        We'll be in touch within <strong>1 business day</strong> to kick off your overhaul. We'll send you a short intake form so we can hit the ground running — understanding your business, your competitors, and your goals before we write a single line of content.
      </div>
      <p>If you have immediate questions or context you'd like to share, feel free to reply directly to this email — we read every one.</p>
      <p>Talk soon,<br /><strong>The Speakly AI-SEO Team</strong></p>
    `,
  });
  logger.info({ customerEmail }, 'Visibility Overhaul: Email 1 sent (confirmation)');

  // Email 2 — Day 2: Intake / kickoff
  scheduleEmail(48 * 60 * 60 * 1000, 'visibility-overhaul:email-2', async () => {
    await sendEmail({
      to: customerEmail,
      subject: "Let's get started on your Visibility Overhaul",
      title: "Let's Get Started",
      preheader: 'A quick intake to make sure we hit the ground running.',
      bodyHtml: `
        <h1>Let's get started</h1>
        <p>${greeting},</p>
        <p>We're ready to begin your Visibility Overhaul. To make the most of our time together, we need a few details about your business — your main service areas, the competitors you care about most, and any existing content or structured data we should work with.</p>
        <div class="highlight-box">
          <strong>Your intake form is on its way.</strong> Watch for a separate email with a link to a short form (5–10 minutes). Completing it promptly helps us start your project without delay.
        </div>
        <p>If you'd prefer to answer the intake questions over a call, reply to this email and we'll set up a quick 20-minute kick-off session instead.</p>
        <p>Talk soon,<br /><strong>The Speakly AI-SEO Team</strong></p>
      `,
    });
    logger.info({ customerEmail }, 'Visibility Overhaul: Email 2 sent (kickoff)');
  });

  // Email 3 — Day 7: Progress update
  scheduleEmail(7 * 24 * 60 * 60 * 1000, 'visibility-overhaul:email-3', async () => {
    await sendEmail({
      to: customerEmail,
      subject: 'Progress update on your Visibility Overhaul',
      title: 'Your Overhaul Progress Update',
      preheader: "Here's where things stand at the one-week mark.",
      bodyHtml: `
        <h1>One week in — here's your update</h1>
        <p>${greeting},</p>
        <p>We're one week into your Visibility Overhaul. We wanted to give you a quick status update so you know exactly where things stand.</p>
        <p>Your dedicated project update will arrive shortly via email with a full breakdown of what's been completed, what's in flight, and any decisions or inputs we'll need from you to keep momentum going.</p>
        <div class="highlight-box">
          As always, you can reply to this email at any time to ask questions or share feedback. Fast, clear communication from both sides is one of the biggest factors in a successful overhaul.
        </div>
        <p>We'll be in touch soon with your detailed update.</p>
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
