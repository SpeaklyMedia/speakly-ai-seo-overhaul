import { Router, type IRouter } from "express";
import { Resend } from "resend";
import {
  buildConfirmationEmail,
  buildFollowUp24Email,
  buildFollowUp48Email,
  buildAdminEmail,
} from "../lib/assessEmailTemplates";

const router: IRouter = Router();

// In-memory set of lead emails that have booked (placeholder — a real implementation
// would use a durable store keyed by a booking webhook from Zoom or a UUID token).
// This allows follow-up sends to be conditionally skipped once booking is confirmed.
const bookedLeads = new Set<string>();

router.post("/assess", async (req, res) => {
  const body = req.body as { name?: string; email?: string; website?: string };
  const { name, email, website } = body ?? {};

  if (!name?.trim()) return res.status(400).json({ error: "Name is required" });
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: "Valid email is required" });
  if (!website?.trim()) return res.status(400).json({ error: "Website is required" });

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanWebsite = website.trim();

  const zoomUrl = process.env.ZOOM_BOOKING_URL ?? "https://zoom.us/booking/your-booking-link-here";

  console.log(
    JSON.stringify({
      event: "assessment_lead",
      timestamp: new Date().toISOString(),
      name: cleanName,
      email: cleanEmail,
      website: cleanWebsite,
    }),
  );

  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (!resendKey || !notifyEmail) {
    return res.status(200).json({ success: true, zoomUrl });
  }

  const resend = new Resend(resendKey);

  try {
    await resend.emails.send({
      from: "Speakly Notifications <notifications@speaklymedia.com>",
      to: cleanEmail,
      replyTo: notifyEmail,
      subject: "Your free AI-SEO assessment is queued — schedule your call",
      html: buildConfirmationEmail(cleanName, zoomUrl),
    });
  } catch (err) {
    console.error("Failed to send confirmation email to lead:", err);
  }

  try {
    await resend.emails.send({
      from: "Speakly Notifications <notifications@speaklymedia.com>",
      to: notifyEmail,
      replyTo: cleanEmail,
      subject: "New Free Assessment Request",
      html: buildAdminEmail(cleanName, cleanEmail, cleanWebsite),
    });
  } catch (err) {
    console.error("Failed to send admin notification email:", err);
  }

  // 24-hour follow-up. Only sends if lead has not yet booked.
  // Note: setTimeout is acceptable for low volume on this always-running Express server.
  // Migrate to a queue/cron for scale or if serverless deployment is ever used.
  setTimeout(async () => {
    if (bookedLeads.has(cleanEmail)) {
      console.log(JSON.stringify({ event: "followup_24h_skipped_booked", email: cleanEmail }));
      return;
    }
    try {
      const r = new Resend(resendKey);
      await r.emails.send({
        from: "Speakly Notifications <notifications@speaklymedia.com>",
        to: cleanEmail,
        replyTo: notifyEmail,
        subject: "Still thinking it over? Here's your link.",
        html: buildFollowUp24Email(cleanName, zoomUrl),
      });
      console.log(JSON.stringify({ event: "followup_24h_sent", email: cleanEmail }));
    } catch (err) {
      console.error("Failed to send 24h follow-up email:", err);
    }
  }, 24 * 60 * 60 * 1000);

  // 48-hour follow-up. Only sends if lead has not yet booked.
  setTimeout(async () => {
    if (bookedLeads.has(cleanEmail)) {
      console.log(JSON.stringify({ event: "followup_48h_skipped_booked", email: cleanEmail }));
      return;
    }
    try {
      const r = new Resend(resendKey);
      await r.emails.send({
        from: "Speakly Notifications <notifications@speaklymedia.com>",
        to: cleanEmail,
        replyTo: notifyEmail,
        subject: "Last chance to grab your spot.",
        html: buildFollowUp48Email(cleanName, zoomUrl),
      });
      console.log(JSON.stringify({ event: "followup_48h_sent", email: cleanEmail }));
    } catch (err) {
      console.error("Failed to send 48h follow-up email:", err);
    }
  }, 48 * 60 * 60 * 1000);

  return res.status(200).json({ success: true, zoomUrl });
});

// Stub endpoint: mark a lead as booked so follow-ups are suppressed.
// In production, call this from a Zoom webhook or booking confirmation callback.
router.post("/assess/booked", (req, res) => {
  const body = req.body as { email?: string };
  if (!body.email?.trim()) return res.status(400).json({ error: "Email required" });
  bookedLeads.add(body.email.trim().toLowerCase());
  console.log(JSON.stringify({ event: "lead_marked_booked", email: body.email.trim() }));
  return res.status(200).json({ ok: true });
});

export default router;
