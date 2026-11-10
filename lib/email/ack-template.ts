/**
 * Short acknowledgement sent to the visitor after a quote or contact
 * submission. It gives the customer an authenticated first message from the
 * site's own domain whose Reply-To is the business inbox, so the owner's
 * follow-up arrives inside a real conversation instead of as a cold "Re:"
 * from an unknown sender.
 *
 * Kept dependency-free on purpose: the tests import this file directly.
 *
 * The body never echoes free text from the form. Only a first name is used,
 * and only when it looks like a name, so the form cannot be used to deliver
 * someone else's message from our domain.
 */

export type AckKind = "quote" | "contact";

export type AckBrand = {
  name: string;
  email: string;
  phone: string;
  url: string;
  region: string;
};

export type AckEmail = {
  subject: string;
  text: string;
  html: string;
  headers: Record<string, string>;
};

const FALLBACK_NAME = "there";
const MAX_FIRST_NAME_LENGTH = 40;
// Letters in any script, plus the marks, apostrophes and hyphens real names use.
const NAME_PATTERN = /^[\p{L}\p{M}'’-]+$/u;

const SUBJECTS: Record<AckKind, string> = {
  quote: "We received your moving quote request",
  contact: "We received your message",
};

const OPENERS: Record<AckKind, string> = {
  quote: "Thank you for requesting a moving quote from",
  contact: "Thank you for contacting",
};

export function safeFirstName(raw: string): string {
  const first = raw.trim().split(/\s+/)[0] ?? "";
  if (!first || first.length > MAX_FIRST_NAME_LENGTH) return FALLBACK_NAME;
  return NAME_PATTERN.test(first) ? first : FALLBACK_NAME;
}

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (c) => entities[c]);
}

export function buildAcknowledgement(opts: {
  name: string;
  kind: AckKind;
  brand: AckBrand;
}): AckEmail {
  const { brand, kind } = opts;
  const lines = [
    `Hello ${safeFirstName(opts.name)},`,
    `${OPENERS[kind]} ${brand.name}.`,
    "Our team will review your request and contact you.",
    `If you need to add anything, reply to this email or write to ${brand.email}. You can also call or text ${brand.phone}.`,
  ];
  const signature = [brand.name, brand.region, brand.phone, brand.url];
  const why = "You received this email because you contacted us through our website.";
  const unsubscribe = `mailto:${brand.email}?subject=Unsubscribe`;

  const text = [
    ...lines,
    "",
    ...signature,
    "",
    why,
    `To stop emails from us: ${unsubscribe}`,
  ].join("\n");

  const html =
    `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#333;max-width:560px">` +
    lines.map((l) => `<p>${escapeHtml(l)}</p>`).join("") +
    `<p style="margin-top:24px;font-size:13px;color:#667175">${signature
      .map(escapeHtml)
      .join("<br>")}</p>` +
    `<p style="font-size:12px;color:#667175">${escapeHtml(why)} ` +
    `<a href="${escapeHtml(unsubscribe)}" style="color:#667175">Unsubscribe</a></p>` +
    `</div>`;

  return {
    subject: SUBJECTS[kind],
    text,
    html,
    headers: { "List-Unsubscribe": `<${unsubscribe}>` },
  };
}
