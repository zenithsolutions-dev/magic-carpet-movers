"use server";

import { siteConfig } from "@/lib/site-config";
import { getResend } from "@/lib/email/resend";
import { renderQuoteEmail } from "@/lib/email/quote-template";
import type { QuoteState } from "@/lib/form-state";
import { type QuoteInput, HOME_SIZES } from "@/lib/schemas";
import { validatePayload } from "@/lib/validate-payload";
import {
  required,
  email,
  phone,
  minLength,
  maxLength,
  canadianPostal,
  isoDate,
  futureOrToday,
  oneOf,
  numberInRange,
  compose,
  optional,
  type Validator,
} from "@/lib/validators";

const quoteSchema: { [K in keyof QuoteInput]: Validator<QuoteInput[K]> } = {
  fromPostal: compose(
    required("Tell us where you're moving from"),
    canadianPostal(),
  ),
  toPostal: compose(
    required("Tell us where you're moving to"),
    canadianPostal(),
  ),
  homeSize: compose(
    required("Pick a home size"),
    oneOf(HOME_SIZES, "Pick a home size"),
  ) as Validator<QuoteInput["homeSize"]>,
  density: numberInRange(1, 5, "Density should be 1 — 5"),
  moveDate: compose(
    required("Pick a move date"),
    isoDate(),
    futureOrToday(),
  ),
  name: compose(
    required("Tell us your name"),
    minLength(2, "Names need at least 2 characters"),
    maxLength(80, "That name looks too long — try shortening it"),
  ),
  email: compose(required("We need an email to send the quote"), email()),
  phone: compose(required("We need a phone number"), phone()),
  notes: optional(maxLength(1000, "Please keep notes under 1000 characters")),
};

function normalizePostal(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.trim().toUpperCase().replace(/[ -]/g, "");
}

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  const raw = {
    fromPostal: String(formData.get("fromPostal") ?? "").trim(),
    toPostal: String(formData.get("toPostal") ?? "").trim(),
    homeSize: String(formData.get("homeSize") ?? "").trim(),
    density: Number(formData.get("density") ?? NaN),
    moveDate: String(formData.get("moveDate") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim() || undefined,
  };

  const result = validatePayload<QuoteInput>(raw, quoteSchema);
  if (!result.ok) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: result.fieldErrors,
    };
  }

  // Normalize postal codes after validation passes.
  const data: QuoteInput = {
    ...result.data,
    fromPostal: normalizePostal(result.data.fromPostal),
    toPostal: normalizePostal(result.data.toPostal),
  };

  const resend = getResend();
  if (!resend) {
    return {
      ok: false,
      error:
        "Email service isn't configured yet. Add RESEND_API_KEY to your environment.",
    };
  }

  const { subject, html, text } = renderQuoteEmail(data);

  try {
    const sendResult = await resend.emails.send({
      from: siteConfig.fromEmail,
      to: [...siteConfig.quoteRecipientEmail],
      replyTo: data.email,
      subject,
      html,
      text,
    });
    if (sendResult.error) {
      console.error("Resend error", sendResult.error);
      return {
        ok: false,
        error: "We couldn't send that just now. Please try again or call us.",
      };
    }
  } catch (err) {
    console.error("Quote submit failed", err);
    return {
      ok: false,
      error: "We couldn't send that just now. Please try again or call us.",
    };
  }

  return { ok: true };
}
