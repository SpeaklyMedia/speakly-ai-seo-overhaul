/**
 * Shared branded HTML email template utility for Speakly AI-SEO.
 * Wraps content in consistent brand styling (dark theme, Speakly colors, footer).
 */

const BRAND_PRIMARY = '#6366f1';
const BRAND_BG = '#0f172a';
const BRAND_CARD = '#1e293b';
const BRAND_TEXT = '#e2e8f0';
const BRAND_MUTED = '#94a3b8';
const BRAND_BORDER = '#334155';

export function buildEmailHtml(opts: {
  title: string;
  preheader: string;
  bodyHtml: string;
}): string {
  const { title, preheader, bodyHtml } = opts;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <style>
    body { margin: 0; padding: 0; background-color: ${BRAND_BG}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${BRAND_TEXT}; }
    .preheader { display: none; max-height: 0; overflow: hidden; mso-hide: all; }
    .wrapper { width: 100%; background-color: ${BRAND_BG}; padding: 40px 16px; box-sizing: border-box; }
    .container { max-width: 560px; margin: 0 auto; }
    .logo-bar { text-align: center; margin-bottom: 32px; }
    .logo-text { font-size: 22px; font-weight: 700; color: ${BRAND_PRIMARY}; letter-spacing: -0.5px; }
    .logo-dot { color: ${BRAND_TEXT}; }
    .card { background-color: ${BRAND_CARD}; border: 1px solid ${BRAND_BORDER}; border-radius: 12px; padding: 36px 32px; }
    h1 { margin: 0 0 16px; font-size: 22px; font-weight: 700; color: ${BRAND_TEXT}; line-height: 1.3; }
    p { margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: ${BRAND_TEXT}; }
    p:last-child { margin-bottom: 0; }
    .highlight-box { background-color: ${BRAND_BG}; border-left: 3px solid ${BRAND_PRIMARY}; border-radius: 4px; padding: 14px 16px; margin: 20px 0; font-size: 14px; color: ${BRAND_MUTED}; }
    .btn { display: inline-block; margin-top: 24px; padding: 12px 28px; background-color: ${BRAND_PRIMARY}; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: 600; }
    .divider { border: none; border-top: 1px solid ${BRAND_BORDER}; margin: 28px 0; }
    .footer { text-align: center; margin-top: 28px; font-size: 12px; color: ${BRAND_MUTED}; line-height: 1.6; }
    .todo-note { background: #1c1c0e; border: 1px dashed #ca8a04; border-radius: 6px; padding: 10px 14px; font-size: 12px; color: #ca8a04; margin: 16px 0; }
  </style>
</head>
<body>
  <span class="preheader">${escapeHtml(preheader)}</span>
  <div class="wrapper">
    <div class="container">
      <div class="logo-bar">
        <span class="logo-text">Speakly<span class="logo-dot"> AI-SEO</span></span>
      </div>
      <div class="card">
        ${bodyHtml}
      </div>
      <div class="footer">
        <p>Speakly AI-SEO &mdash; Helping businesses win in AI-driven search</p>
        <p>You received this because you purchased a Speakly service.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
