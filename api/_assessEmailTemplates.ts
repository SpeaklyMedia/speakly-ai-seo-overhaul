export function getDeadlineDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export function buildConfirmationEmail(name: string, zoomUrl: string): string {
  const deadline = getDeadlineDate(5);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Your Free AI-SEO Assessment</title>
</head>
<body style="margin:0;padding:0;background:#f7f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fc;padding:32px 16px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e2eaf3;overflow:hidden;">
      <tr><td style="background:linear-gradient(90deg,#6fe2cf,#78c7ff);height:4px;"></td></tr>
      <tr><td style="padding:36px 40px 28px;">
        <p style="margin:0 0 4px;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;font-weight:600;color:#1a9e8e;">Speakly AI-SEO</p>
        <h1 style="margin:0 0 20px;font-size:1.5rem;font-weight:800;color:#0f1923;line-height:1.2;">Your assessment is queued, ${name}.</h1>
        <p style="margin:0 0 24px;font-size:0.95rem;color:#5a6a7e;line-height:1.65;">
          Thanks for submitting your free AI-SEO assessment request. We've got your info and will be reviewing your website's AI visibility shortly.
        </p>
        <p style="margin:0 0 12px;font-size:0.95rem;font-weight:600;color:#0f1923;">Ready to dig deeper right now?</p>
        <p style="margin:0 0 28px;font-size:0.9rem;color:#5a6a7e;line-height:1.6;">
          Grab a strategy call while spots are still available. We'll walk through your AI visibility gaps together and map out exactly where you're losing ground to competitors in AI search.
        </p>
        <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
          <tr><td style="border-radius:24px;background:linear-gradient(135deg,#6fe2cf,#78c7ff);">
            <a href="${zoomUrl}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:0.9rem;font-weight:700;color:#04101c;text-decoration:none;letter-spacing:0.01em;">
              Schedule your free strategy call &rarr;
            </a>
          </td></tr>
        </table>
        <div style="background:rgba(111,226,207,0.08);border:1px solid rgba(111,226,207,0.28);border-radius:10px;padding:14px 18px;margin-bottom:28px;">
          <p style="margin:0;font-size:0.84rem;color:#1a9e8e;font-weight:600;">
            &#x26A1; Spots are limited &mdash; schedule before ${deadline}
          </p>
        </div>
        <p style="margin:0;font-size:0.84rem;color:#8a9ab0;line-height:1.6;">
          You can also reply directly to this email with any questions. We're here to help.
        </p>
      </td></tr>
      <tr><td style="background:#f7f9fc;padding:20px 40px;border-top:1px solid #e2eaf3;">
        <p style="margin:0;font-size:0.75rem;color:#8a9ab0;text-align:center;">
          Speakly AI-SEO &mdash; <a href="https://speaklymedia.com" style="color:#1a9e8e;text-decoration:none;">speaklymedia.com</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export function buildFollowUp24Email(name: string, zoomUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Still thinking it over?</title>
</head>
<body style="margin:0;padding:0;background:#f7f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fc;padding:32px 16px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e2eaf3;overflow:hidden;">
      <tr><td style="background:linear-gradient(90deg,#6fe2cf,#78c7ff);height:4px;"></td></tr>
      <tr><td style="padding:36px 40px 28px;">
        <p style="margin:0 0 4px;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;font-weight:600;color:#1a9e8e;">Speakly AI-SEO</p>
        <h1 style="margin:0 0 20px;font-size:1.4rem;font-weight:800;color:#0f1923;line-height:1.2;">Still thinking it over, ${name}?</h1>
        <p style="margin:0 0 24px;font-size:0.95rem;color:#5a6a7e;line-height:1.65;">
          Just checking in &mdash; your free AI-SEO assessment is ready, and a strategy call slot is still available with your name on it.
        </p>
        <p style="margin:0 0 24px;font-size:0.9rem;color:#5a6a7e;line-height:1.6;">
          Booking takes less than a minute and there's no commitment involved. We just want to show you exactly where your website stands in AI-driven search today.
        </p>
        <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
          <tr><td style="border-radius:24px;background:linear-gradient(135deg,#6fe2cf,#78c7ff);">
            <a href="${zoomUrl}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:0.9rem;font-weight:700;color:#04101c;text-decoration:none;letter-spacing:0.01em;">
              Grab your spot now &rarr;
            </a>
          </td></tr>
        </table>
        <p style="margin:0;font-size:0.84rem;color:#8a9ab0;line-height:1.6;">
          Reply to this email if you have any questions first &mdash; happy to help.
        </p>
      </td></tr>
      <tr><td style="background:#f7f9fc;padding:20px 40px;border-top:1px solid #e2eaf3;">
        <p style="margin:0;font-size:0.75rem;color:#8a9ab0;text-align:center;">
          Speakly AI-SEO &mdash; <a href="https://speaklymedia.com" style="color:#1a9e8e;text-decoration:none;">speaklymedia.com</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export function buildFollowUp48Email(name: string, zoomUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Last chance to grab your spot</title>
</head>
<body style="margin:0;padding:0;background:#f7f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fc;padding:32px 16px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e2eaf3;overflow:hidden;">
      <tr><td style="background:linear-gradient(90deg,#6fe2cf,#78c7ff);height:4px;"></td></tr>
      <tr><td style="padding:36px 40px 28px;">
        <p style="margin:0 0 4px;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;font-weight:600;color:#1a9e8e;">Speakly AI-SEO</p>
        <h1 style="margin:0 0 20px;font-size:1.4rem;font-weight:800;color:#0f1923;line-height:1.2;">Last chance to grab your spot, ${name}.</h1>
        <p style="margin:0 0 24px;font-size:0.95rem;color:#5a6a7e;line-height:1.65;">
          This is our final nudge. If we don't hear from you, we'll release your assessment slot so another business can take it.
        </p>
        <p style="margin:0 0 24px;font-size:0.9rem;color:#5a6a7e;line-height:1.6;">
          AI-driven search is reshaping how customers find businesses like yours. Every week you wait is a week competitors gain ground. Book now and see exactly what's at stake.
        </p>
        <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
          <tr><td style="border-radius:24px;background:linear-gradient(135deg,#6fe2cf,#78c7ff);">
            <a href="${zoomUrl}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:0.9rem;font-weight:700;color:#04101c;text-decoration:none;letter-spacing:0.01em;">
              Book my free strategy call &rarr;
            </a>
          </td></tr>
        </table>
        <div style="background:rgba(111,226,207,0.08);border:1px solid rgba(111,226,207,0.28);border-radius:10px;padding:14px 18px;margin-bottom:24px;">
          <p style="margin:0;font-size:0.84rem;color:#1a9e8e;font-weight:600;">
            Your assessment slot will be released if not booked within 48 hours.
          </p>
        </div>
        <p style="margin:0;font-size:0.84rem;color:#8a9ab0;line-height:1.6;">
          Questions? Just reply to this email.
        </p>
      </td></tr>
      <tr><td style="background:#f7f9fc;padding:20px 40px;border-top:1px solid #e2eaf3;">
        <p style="margin:0;font-size:0.75rem;color:#8a9ab0;text-align:center;">
          Speakly AI-SEO &mdash; <a href="https://speaklymedia.com" style="color:#1a9e8e;text-decoration:none;">speaklymedia.com</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export function buildAdminEmail(name: string, email: string, website: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>New Assessment Lead</title>
</head>
<body style="margin:0;padding:0;background:#f7f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fc;padding:32px 16px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e2eaf3;overflow:hidden;">
      <tr><td style="background:linear-gradient(90deg,#6fe2cf,#78c7ff);height:4px;"></td></tr>
      <tr><td style="padding:32px 36px 28px;">
        <p style="margin:0 0 4px;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;font-weight:600;color:#1a9e8e;">Speakly AI-SEO</p>
        <h2 style="margin:0 0 20px;font-size:1.25rem;font-weight:800;color:#0f1923;">New Free Assessment Request</h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#f7f9fc;border-radius:10px;border:1px solid #e2eaf3;overflow:hidden;">
          <tr><td style="padding:8px 16px;border-bottom:1px solid #e2eaf3;">
            <span style="font-size:0.75rem;color:#8a9ab0;text-transform:uppercase;letter-spacing:0.08em;">Name</span>
            <p style="margin:2px 0 0;font-size:0.92rem;font-weight:600;color:#0f1923;">${name}</p>
          </td></tr>
          <tr><td style="padding:8px 16px;border-bottom:1px solid #e2eaf3;">
            <span style="font-size:0.75rem;color:#8a9ab0;text-transform:uppercase;letter-spacing:0.08em;">Email</span>
            <p style="margin:2px 0 0;font-size:0.92rem;font-weight:600;color:#0f1923;"><a href="mailto:${email}" style="color:#2a7ab5;text-decoration:none;">${email}</a></p>
          </td></tr>
          <tr><td style="padding:8px 16px;">
            <span style="font-size:0.75rem;color:#8a9ab0;text-transform:uppercase;letter-spacing:0.08em;">Website</span>
            <p style="margin:2px 0 0;font-size:0.92rem;font-weight:600;color:#0f1923;"><a href="${website.startsWith("http") ? website : "https://" + website}" style="color:#2a7ab5;text-decoration:none;">${website}</a></p>
          </td></tr>
        </table>
        <div style="background:rgba(111,226,207,0.08);border:1px solid rgba(111,226,207,0.28);border-radius:10px;padding:14px 18px;">
          <p style="margin:0;font-size:0.84rem;color:#1a9e8e;font-weight:600;">
            &#x2713; Scheduling sequence triggered &mdash; confirmation + 24h + 48h follow-up emails sent to lead.
          </p>
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}
