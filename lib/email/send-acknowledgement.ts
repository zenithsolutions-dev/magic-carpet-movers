import { headers } from "next/headers";
import { siteConfig } from "@/lib/site-config";
import { getResend } from "@/lib/email/resend";
import { clientIpFrom, isRateLimited } from "@/lib/anti-spam";
import { deliverAcknowledgement } from "@/lib/email/ack-delivery";
import type { AckKind } from "@/lib/email/ack-template";

/**
 * Server-side entry point for the customer acknowledgement.
 *
 * The address comes from a public form, so anyone can type someone else's.
 * Two limits keep the form from being used to flood a third party: one per
 * sender IP and one per recipient address. A skipped acknowledgement is
 * silent because the business has already received the request.
 */
export async function sendAcknowledgement(opts: {
  to: string;
  name: string;
  kind: AckKind;
}): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const ip = clientIpFrom(await headers());
  const recipient = opts.to.trim().toLowerCase();
  if (isRateLimited(`ack-ip:${ip}`) || isRateLimited(`ack-to:${recipient}`)) {
    return false;
  }

  return deliverAcknowledgement({
    send: (payload) => resend.emails.send(payload),
    from: siteConfig.fromEmail,
    brand: {
      name: siteConfig.name,
      email: siteConfig.email,
      phone: siteConfig.phone,
      url: siteConfig.url,
      region: siteConfig.serviceArea.label,
    },
    to: opts.to,
    name: opts.name,
    kind: opts.kind,
  });
}
