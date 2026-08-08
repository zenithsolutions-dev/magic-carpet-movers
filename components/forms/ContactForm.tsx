"use client";

import * as React from "react";
import { useActionState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/primitives/Input";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { submitContact } from "@/app/actions/contact";
import { initialContactState, type ContactState } from "@/lib/form-state";
import { useFormValidator } from "@/lib/use-form-validator";
import {
  required,
  email as emailValidator,
  phone as phoneValidator,
  minLength,
  maxLength,
  compose,
  optional,
  type Validator,
} from "@/lib/validators";
import { cn } from "@/lib/utils/cn";

type ContactFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const contactSchema = {
  name: {
    initialValue: "",
    validator: compose(
      required("Tell us your name"),
      minLength(2, "Names need at least 2 characters"),
      maxLength(80, "That name looks too long — try shortening it"),
    ),
  },
  email: {
    initialValue: "",
    validator: compose(
      required("We need an email to write back"),
      emailValidator(),
    ),
  },
  phone: {
    initialValue: "",
    validator: optional(phoneValidator()),
  },
  message: {
    initialValue: "",
    validator: compose(
      required("Tell us what's on your mind"),
      minLength(10, "A few more words helps us help you"),
      maxLength(2000, "Please keep this under 2000 characters"),
    ),
  },
} satisfies {
  [K in keyof ContactFields]: {
    initialValue: ContactFields[K];
    validator: Validator<ContactFields[K]>;
  };
};

export function ContactForm() {
  const [state, formAction] = useActionState<ContactState, FormData>(
    submitContact,
    initialContactState,
  );
  const form = useFormValidator(contactSchema);

  // When the server returns field errors, mirror them into the hook so they
  // appear under the right inputs and persist until the user edits.
  React.useEffect(() => {
    if (state.fieldErrors) {
      form.setServerErrors(state.fieldErrors);
    }
    // We only react to a new fieldErrors object reference from the server.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.fieldErrors]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { valid } = form.validateAll();
    if (!valid) {
      e.preventDefault();
    }
  };

  if (state.ok) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl bg-cloud border border-border-soft p-10 text-center shadow-card"
      >
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-coral text-cloud">
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-twilight">
          Got it. <span className="italic text-coral">Talk soon.</span>
        </h3>
        <p className="mt-3 text-ink-muted text-pretty max-w-md mx-auto">
          We&apos;re available 24/7 — expect a reply shortly.
        </p>
      </motion.div>
    );
  }

  const messageProps = form.fieldProps("message");

  return (
    <form
      action={formAction}
      noValidate
      onSubmit={handleSubmit}
      className="rounded-xl bg-cloud border border-border-soft p-6 md:p-8 shadow-card flex flex-col gap-5"
    >
      <Input
        {...form.fieldProps("name")}
        label="Name"
        mandatory
        autoComplete="name"
        placeholder="Maya Rodriguez"
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          {...form.fieldProps("email")}
          label="Email"
          mandatory
          inputMode="email"
          autoComplete="email"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="you@example.com"
        />
        <Input
          {...form.fieldProps("phone")}
          label="Phone (optional)"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(613) 555-0420"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="cf-message"
          className="text-sm font-medium text-twilight"
        >
          What can we help with?
          <span aria-hidden className="text-coral ml-0.5">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          value={messageProps.value}
          onChange={messageProps.onChange}
          onBlur={messageProps.onBlur}
          aria-required
          aria-invalid={messageProps["aria-invalid"]}
          aria-describedby={messageProps.error ? "cf-message-error" : undefined}
          placeholder="Tell us about your move, or anything you’re wondering about…"
          className={cn(
            "w-full rounded-md bg-cloud border border-border px-4 py-3 text-base text-ink placeholder:text-ink-muted/60",
            "transition-all duration-150",
            "focus:border-coral focus:outline-none focus:ring-4 focus:ring-coral/15",
            "resize-y",
            messageProps.error &&
              "border-danger focus:border-danger focus:ring-danger/15",
          )}
        />
        {messageProps.error && (
          <p
            id="cf-message-error"
            role="alert"
            aria-live="polite"
            className="text-xs text-danger font-medium"
          >
            {messageProps.error}
          </p>
        )}
      </div>

      {state.error && !state.fieldErrors && (
        <p
          role="alert"
          aria-live="polite"
          className="text-sm font-medium text-danger bg-danger/10 border border-danger/20 rounded-md px-4 py-3"
        >
          {state.error}
        </p>
      )}

      <div className="flex justify-end pt-2">
        <SubmitButton size="md">
          Send message
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </SubmitButton>
      </div>
    </form>
  );
}
