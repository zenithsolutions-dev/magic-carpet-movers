"use server";

import { siteConfig } from "@/lib/site-config";
import { getResend } from "@/lib/email/resend";
import { renderContactEmail } from "@/lib/email/contact-template";
import type { ContactState } from "@/lib/form-state";
import type { ContactInput } from "@/lib/schemas";
import { validatePayload } from "@/lib/validate-payload";
import {
  required,
  email,
  phone,
  minLength,
  maxLength,
  compose,
  optional,
  type Validator,
} from "@/lib/validators";

const contactSchema: { [K in keyof ContactInput]: Validator<ContactInput[K]> } =
  {
    name: compose(
      required("Tell us your name"),
      minLength(2, "Names need at least 2 characters"),
      maxLength(80, "That name looks too long — try shortening it"),
    ),
    email: compose(required("We need an email to write back"), email()),
    phone: optional(phone()),
    message: compose(
      required("Tell us what's on your mind"),
      minLength(10, "A few more words helps us help you"),
      maxLength(2000, "Please keep this under 2000 characters"),
    ),
  };

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || undefined,
    message: String(formData.get("message") ?? "").trim(),
  };

  const result = validatePayload<ContactInput>(raw, contactSchema);
  if (!result.ok) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: result.fieldErrors,
    };
  }

  const resend = getResend();
  if (!resend) {
    return {
      ok: false,
      error:
        "Email service isn't configured yet. Add RESEND_API_KEY to your environment.",
    };
  }

  const { subject, html, text } = renderContactEmail(result.data);

  try {
    const sendResult = await resend.emails.send({
      from: siteConfig.fromEmail,
      to: [...siteConfig.contactRecipientEmail],
      replyTo: result.data.email,
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
    console.error("Contact submit failed", err);
    return {
      ok: false,
      error: "We couldn't send that just now. Please try again or call us.",
    };
  }

  return { ok: true };
}
