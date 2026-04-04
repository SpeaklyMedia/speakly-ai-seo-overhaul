import { Resend } from "resend";

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

const ALLOWED_ORIGINS = [
  /^https:\/\/([a-z0-9-]+\.)*speaklymedia\.com$/,
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/,
  /^http:\/\/localhost(:\d+)?$/,
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

  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  console.log(
    JSON.stringify({
      event: "assessment_lead",
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      website: website.trim(),
    }),
  );

  if (!resendKey || !notifyEmail) {
    return res.status(200).json({ ok: true });
  }

  try {
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "Speakly Notifications <notifications@speaklymedia.com>",
      to: notifyEmail,
      subject: "New Free Assessment Request",
      text: [
        "Someone has submitted a free AI-SEO assessment request.",
        "",
        `Name:    ${name.trim()}`,
        `Email:   ${email.trim()}`,
        `Website: ${website.trim()}`,
        "",
        "Reply directly to this email to respond.",
      ].join("\n"),
      replyTo: email.trim(),
    });
  } catch (err: unknown) {
    console.error("Failed to send assessment notification email:", err);
    return res.status(500).json({ error: "Failed to send submission. Please try again." });
  }

  return res.status(200).json({ ok: true });
}
