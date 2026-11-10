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
 *
 * The counters live in memory, one copy per serverless instance, so they slow
 * abuse rather than stop it. A shared store (Vercel KV) or a firewall rule is
 * the full fix.
 *
 * Nothing in here may fail the submission: the whole body is guarded.
 */
export async function sendAcknowledgement(opts: {
  to: string;
  name: string;
  kind: AckKind;
}): Promise<boolean> {
  try {
    const resend = getResend();
    if (!resend) return false;

    const ip = clientIpFrom(await headers());
    const recipient = opts.to.trim().toLowerCase();
    if (isRateLimited(`ack-ip:${ip}`) || isRateLimited(`ack-to:${recipient}`)) {
      return false;
    }

    return await deliverAcknowledgement({
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
  } catch (err) {
    console.error(
      "Acknowledgement skipped:",
      err instanceof Error ? err.message : "unknown error",
    );
    return false;
  }
}
