import type { QuoteInput } from "@/lib/schemas";

const homeSizeLabels: Record<QuoteInput["homeSize"], string> = {
  studio: "Studio",
  "1br": "1 bedroom",
  "2br": "2 bedrooms",
  "3br": "3 bedrooms",
  "4br+": "4+ bedrooms",
  office: "Office / commercial",
};

const densityLabels = [
  "Empty-ish",
  "Light",
  "Average",
  "Full",
  "Packed to the rafters",
];

export function renderQuoteEmail(payload: QuoteInput): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New quote — ${payload.name} (${formatPostal(payload.fromPostal)} → ${formatPostal(payload.toPostal)})`;

  const text = [
    `New quote request from magiccarpet`,
    ``,
    `Name:   ${payload.name}`,
    `Email:  ${payload.email}`,
    `Phone:  ${payload.phone}`,
    ``,
    `From:   ${formatPostal(payload.fromPostal)}`,
    `To:     ${formatPostal(payload.toPostal)}`,
    `Size:   ${homeSizeLabels[payload.homeSize]}`,
    `Density:${payload.density}/5 (${densityLabels[payload.density - 1] ?? "—"})`,
    `Date:   ${payload.moveDate}`,
    ``,
    payload.notes ? `Notes:\n${payload.notes}` : "(no notes)",
  ].join("\n");

  const html = `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#F5F8FF;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0B1730;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#FFFFFF;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px -10px rgba(12,26,62,0.18);">
        <tr><td style="background:#0C1A3E;color:#FFFFFF;padding:24px 32px;">
          <div style="font-family:Georgia,serif;font-size:22px;font-weight:500;">New quote request</div>
          <div style="margin-top:4px;color:#1E6BFF;font-size:14px;">Magic Carpet</div>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <div style="font-size:13px;color:#5B5F7A;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Customer</div>
          <div style="font-size:18px;font-weight:600;margin-bottom:2px;">${esc(payload.name)}</div>
          <div style="font-size:14px;color:#5B5F7A;">${esc(payload.email)} · ${esc(payload.phone)}</div>
          <hr style="border:none;border-top:1px solid #E8DFCB;margin:20px 0;" />
          ${row("From postal code", formatPostal(payload.fromPostal))}
          ${row("To postal code", formatPostal(payload.toPostal))}
          ${row("Home size", homeSizeLabels[payload.homeSize])}
          ${row("Density", `${payload.density} / 5 — ${densityLabels[payload.density - 1] ?? ""}`)}
          ${row("Move date", payload.moveDate)}
          ${
            payload.notes
              ? `<hr style="border:none;border-top:1px solid #E8DFCB;margin:20px 0;" /><div style="font-size:13px;color:#5B5F7A;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Notes</div><div style="font-size:14px;line-height:1.55;white-space:pre-wrap;">${esc(payload.notes)}</div>`
              : ""
          }
        </td></tr>
      </table>
      <div style="font-size:12px;color:#5B5F7A;margin-top:16px;">Magic Carpet · sent via Resend</div>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}

function row(label: string, value: string) {
  return `
    <table role="presentation" width="100%" style="margin:6px 0;">
      <tr>
        <td style="font-size:13px;color:#5B5F7A;width:120px;padding:4px 0;">${esc(label)}</td>
        <td style="font-size:14px;color:#0B1730;padding:4px 0;font-weight:500;">${esc(value)}</td>
      </tr>
    </table>`;
}

function formatPostal(p: string) {
  const clean = p.toUpperCase().replace(/[ -]/g, "");
  return clean.length === 6 ? `${clean.slice(0, 3)} ${clean.slice(3)}` : clean;
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
