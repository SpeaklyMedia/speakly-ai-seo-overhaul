import { Resend } from "resend";
import {
  buildConfirmationEmail,
  buildAdminEmail,
} from "./_assessEmailTemplates";

interface AssessRequest {
  method?: string;
  body: { name?: string; email?: string; website?: string };
  headers: Record<string, string | string[] | undefined>;
}

interface AssessResponse {
  status(code: number): AssessResponse;
  json(data: unknown): AssessResponse;
  setHeader(name: string, value: string): void;
  end(): void;
}

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

function getOrigin(headers: AssessRequest["headers"]): string | undefined {
  const raw = headers["origin"];
  return Array.isArray(raw) ? raw[0] : raw;
}

export default async function handler(
  req: AssessRequest,
  res: AssessResponse,
): Promise<AssessResponse> {
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

  const { name, email, website } = req.body ?? {};

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
    return res.status(200).json({ ok: true, zoomUrl });
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
  } catch (err: unknown) {
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
  } catch (err: unknown) {
    console.error("Failed to send admin notification email:", err);
  }

  return res.status(200).json({ ok: true, zoomUrl });
}
