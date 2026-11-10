import {
  buildAcknowledgement,
  type AckBrand,
  type AckKind,
} from "./ack-template.ts";

/**
 * Sends the customer acknowledgement through an injected mail sender.
 *
 * Never throws and never fails the submission: by the time this runs the
 * business has already received the request, so a problem here is logged
 * and reported as `false`, nothing more.
 */

export type AckSendPayload = {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  text: string;
  html: string;
  headers: Record<string, string>;
};

export type AckSender = (
  payload: AckSendPayload,
) => Promise<{ error?: unknown } | null | undefined>;

export async function deliverAcknowledgement(opts: {
  send: AckSender;
  from: string;
  brand: AckBrand;
  to: string;
  name: string;
  kind: AckKind;
}): Promise<boolean> {
  const to = opts.to.trim();
  // A test submission from the business's own address needs no receipt, and
  // mailing the Reply-To address to itself only builds a loop.
  if (!to || to.toLowerCase() === opts.brand.email.toLowerCase()) return false;

  const mail = buildAcknowledgement({
    name: opts.name,
    kind: opts.kind,
    brand: opts.brand,
  });

  try {
    const result = await opts.send({
      from: opts.from,
      to: [to],
      replyTo: opts.brand.email,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      headers: mail.headers,
    });
    if (result?.error) {
      console.error("Acknowledgement email rejected", result.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Acknowledgement email failed", err);
    return false;
  }
}
