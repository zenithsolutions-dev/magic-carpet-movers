import type { ContactInput } from "@/lib/schemas";

export function renderContactEmail(payload: ContactInput): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New contact — ${payload.name}`;

  const text = [
    `New contact form submission`,
    ``,
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    payload.phone ? `Phone:   ${payload.phone}` : "",
    ``,
    `Message:`,
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#F5F8FF;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0B1730;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#FFFFFF;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px -10px rgba(12,26,62,0.18);">
        <tr><td style="background:#0C1A3E;color:#FFFFFF;padding:24px 32px;">
          <div style="font-family:Georgia,serif;font-size:22px;font-weight:500;">New contact</div>
          <div style="margin-top:4px;color:#1E6BFF;font-size:14px;">Magic Carpet</div>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <div style="font-size:18px;font-weight:600;margin-bottom:2px;">${esc(payload.name)}</div>
          <div style="font-size:14px;color:#5B5F7A;">${esc(payload.email)}${payload.phone ? ` · ${esc(payload.phone)}` : ""}</div>
          <hr style="border:none;border-top:1px solid #E8DFCB;margin:20px 0;" />
          <div style="font-size:13px;color:#5B5F7A;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Message</div>
          <div style="font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(payload.message)}</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
