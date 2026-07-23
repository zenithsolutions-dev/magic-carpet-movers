"use client";

import * as React from "react";
import { useActionState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Input } from "@/components/primitives/Input";
import { Select } from "@/components/primitives/Select";
import { Slider } from "@/components/primitives/Slider";
import { Button } from "@/components/primitives/Button";
import { SubmitButton } from "@/components/forms/SubmitButton";
import { MultiStepProgress } from "@/components/forms/MultiStepProgress";
import { submitQuote } from "@/app/actions/quote";
import { initialQuoteState, type QuoteState } from "@/lib/form-state";
import { HOME_SIZES, type HomeSize } from "@/lib/schemas";
import { useFormValidator } from "@/lib/use-form-validator";
import {
  required,
  email as emailValidator,
  phone as phoneValidator,
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

const homeSizeOptions: { value: HomeSize; label: string }[] = [
  { value: "studio", label: "Studio" },
  { value: "1br", label: "1 bedroom" },
  { value: "2br", label: "2 bedrooms" },
  { value: "3br", label: "3 bedrooms" },
  { value: "4br+", label: "4+ bedrooms" },
  { value: "office", label: "Office / commercial" },
];

const densityMarks = ["Empty-ish", "Light", "Average", "Full", "Packed"];

const stepLabels = ["Route", "Volume", "Contact"];

type QuoteFields = {
  fromPostal: string;
  toPostal: string;
  homeSize: string;
  density: number;
  moveDate: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const quoteSchema = {
  fromPostal: {
    initialValue: "",
    validator: compose(
      required("Tell us where you're moving from"),
      canadianPostal(),
    ),
  },
  toPostal: {
    initialValue: "",
    validator: compose(
      required("Tell us where you're moving to"),
      canadianPostal(),
    ),
  },
  homeSize: {
    initialValue: "",
    validator: compose(
      required("Pick a home size"),
      oneOf(HOME_SIZES, "Pick a home size"),
    ),
  },
  density: {
    initialValue: 3,
    validator: numberInRange(1, 5, "Density should be 1 — 5"),
  },
  moveDate: {
    initialValue: "",
    validator: compose(
      required("Pick a move date"),
      isoDate(),
      futureOrToday(),
    ),
  },
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
    validator: compose(required("We need an email"), emailValidator()),
  },
  phone: {
    initialValue: "",
    validator: compose(required("We need a phone number"), phoneValidator()),
  },
  notes: {
    initialValue: "",
    validator: optional(
      maxLength(1000, "Please keep notes under 1000 characters"),
    ),
  },
} satisfies {
  [K in keyof QuoteFields]: {
    initialValue: QuoteFields[K];
    validator: Validator<QuoteFields[K]>;
  };
};

const STEP_FIELDS: (keyof QuoteFields)[][] = [
  ["fromPostal", "toPostal"],
  ["homeSize", "density", "moveDate"],
  ["name", "email", "phone", "notes"],
];

// Postal-code typing helper: uppercase, strip junk, auto-space after 3 chars.
function normalizePostalInput(raw: string) {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9 ]/g, "").slice(0, 7);
  const compact = cleaned.replace(/\s+/g, "");
  if (compact.length >= 4) {
    return `${compact.slice(0, 3)} ${compact.slice(3, 6)}`;
  }
  return compact;
}

export function QuoteForm() {
  const [state, formAction] = useActionState<QuoteState, FormData>(
    submitQuote,
    initialQuoteState,
  );
  const form = useFormValidator(quoteSchema);

  const [step, setStep] = React.useState(0);
  const reduce = useReducedMotion();

  // Prefill from the hero quick-quote card (?from=&to=&date=).
  // Postal-looking values seed the postal fields; free-text city names are
  // preserved in the notes so the visitor never has to repeat themselves.
  const prefilled = React.useRef(false);
  React.useEffect(() => {
    if (prefilled.current) return;
    prefilled.current = true;
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from")?.trim() ?? "";
    const to = params.get("to")?.trim() ?? "";
    const date = params.get("date")?.trim() ?? "";
    const postalRe = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
    const freeText: string[] = [];

    if (from) {
      if (postalRe.test(from)) form.setValue("fromPostal", normalizePostalInput(from));
      else freeText.push(`Moving from: ${from}`);
    }
    if (to) {
      if (postalRe.test(to)) form.setValue("toPostal", normalizePostalInput(to));
      else freeText.push(`Moving to: ${to}`);
    }
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) form.setValue("moveDate", date);
    if (freeText.length) form.setValue("notes", freeText.join("\n"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (state.fieldErrors) {
      form.setServerErrors(state.fieldErrors);
      // Jump to the step that holds the first errored field
      const errKeys = Object.keys(state.fieldErrors);
      for (let i = 0; i < STEP_FIELDS.length; i++) {
        if (STEP_FIELDS[i].some((f) => errKeys.includes(f))) {
          setStep(i);
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.fieldErrors]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { valid } = form.validateAll();
    if (!valid) {
      e.preventDefault();
      // Find the earliest step with a remaining error and switch to it.
      const errKeys = Object.keys(form.errors).filter(
        (k) => form.errors[k as keyof QuoteFields],
      );
      for (let i = 0; i < STEP_FIELDS.length; i++) {
        if (STEP_FIELDS[i].some((f) => errKeys.includes(f))) {
          setStep(i);
          break;
        }
      }
    }
  };

  const goNext = () => {
    const ok = form.validateFields(STEP_FIELDS[step]);
    if (ok) {
      setStep((s) => Math.min(2, s + 1));
    }
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  if (state.ok) {
    return <SuccessPanel />;
  }

  // Compute "step is currently valid" from the hook's live state. Used to
  // keep the Continue button enabled-looking but clicking it will still
  // surface errors via validateFields.
  const stepHasError = STEP_FIELDS[step].some(
    (f) => !!form.errors[f as keyof QuoteFields],
  );

  return (
    <div className="rounded-xl bg-cloud border border-border-soft p-6 md:p-10 shadow-card">
      <MultiStepProgress
        current={step}
        total={3}
        labels={stepLabels}
        className="mb-8 md:mb-10"
      />

      <form
        action={formAction}
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <HiddenInputs values={form.values} activeStep={step} />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5 min-h-70"
          >
            {step === 0 && <StepRoute form={form} />}
            {step === 1 && <StepVolume form={form} />}
            {step === 2 && <StepContact form={form} />}
          </motion.div>
        </AnimatePresence>

        {state.error && (
          <p
            role="alert"
            aria-live="polite"
            className="text-sm font-medium text-danger bg-danger/10 border border-danger/20 rounded-md px-4 py-3"
          >
            {state.error}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-border-soft">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={goBack}
            disabled={step === 0}
            className={step === 0 ? "invisible" : ""}
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Button>

          {step < 2 ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={goNext}
              aria-disabled={stepHasError || undefined}
            >
              Continue
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          ) : (
            <SubmitButton size="md">
              Send it
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

type FormApi = ReturnType<typeof useFormValidator<typeof quoteSchema>>;

function StepRoute({ form }: { form: FormApi }) {
  const fromProps = form.fieldProps("fromPostal");
  const toProps = form.fieldProps("toPostal");
  return (
    <Step
      eyebrow="Step 1"
      title={
        <>
          Where to, <span className="italic text-coral">where from?</span>
        </>
      }
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          {...fromProps}
          label="From postal code"
          mandatory
          placeholder="K1P 5G3"
          inputMode="text"
          autoComplete="postal-code"
          autoCapitalize="characters"
          spellCheck={false}
          onChange={(e) =>
            form.setValue("fromPostal", normalizePostalInput(e.target.value))
          }
        />
        <Input
          {...toProps}
          label="To postal code"
          mandatory
          placeholder="J8X 3X6"
          inputMode="text"
          autoComplete="postal-code"
          autoCapitalize="characters"
          spellCheck={false}
          onChange={(e) =>
            form.setValue("toPostal", normalizePostalInput(e.target.value))
          }
        />
      </div>
    </Step>
  );
}

function StepVolume({ form }: { form: FormApi }) {
  const homeSizeProps = form.fieldProps("homeSize");
  const dateProps = form.fieldProps("moveDate");
  return (
    <Step
      eyebrow="Step 2"
      title={
        <>
          How much, <span className="italic text-coral">when?</span>
        </>
      }
    >
      <Select
        {...homeSizeProps}
        label="Home size"
        mandatory
        options={homeSizeOptions}
        placeholder="Pick one"
      />
      <Slider
        name="density"
        label="How packed is the place?"
        min={1}
        max={5}
        marks={densityMarks}
        value={form.values.density}
        onChange={(v) => form.setValue("density", v)}
      />
      <Input
        {...dateProps}
        label="Target move date"
        type="date"
        mandatory
      />
    </Step>
  );
}

function StepContact({ form }: { form: FormApi }) {
  const nameProps = form.fieldProps("name");
  const emailProps = form.fieldProps("email");
  const phoneProps = form.fieldProps("phone");
  const notesProps = form.fieldProps("notes");
  return (
    <Step
      eyebrow="Step 3"
      title={
        <>
          Where do we send <span className="italic text-coral">the number?</span>
        </>
      }
    >
      <Input
        {...nameProps}
        label="Your name"
        mandatory
        autoComplete="name"
        placeholder="Maya Rodriguez"
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          {...emailProps}
          label="Email"
          mandatory
          inputMode="email"
          autoComplete="email"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="you@example.com"
        />
        <Input
          {...phoneProps}
          label="Phone"
          mandatory
          inputMode="tel"
          autoComplete="tel"
          placeholder="(613) 555-0420"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="qf-notes"
          className="text-sm font-medium text-twilight"
        >
          Anything we should know?{" "}
          <span className="text-ink-muted/70 font-normal">(optional)</span>
        </label>
        <textarea
          id="qf-notes"
          name="notes"
          rows={3}
          value={notesProps.value}
          onChange={notesProps.onChange}
          onBlur={notesProps.onBlur}
          aria-invalid={notesProps["aria-invalid"]}
          aria-describedby={notesProps.error ? "qf-notes-error" : undefined}
          placeholder="Stairs, parking, fragile items, tight timeline…"
          className={
            "w-full rounded-md bg-cloud border border-border px-4 py-3 text-base text-ink placeholder:text-ink-muted/60 focus:border-coral focus:outline-none focus:ring-4 focus:ring-coral/15 resize-y" +
            (notesProps.error ? " border-danger focus:border-danger focus:ring-danger/15" : "")
          }
        />
        {notesProps.error && (
          <p
            id="qf-notes-error"
            role="alert"
            aria-live="polite"
            className="text-xs text-danger font-medium"
          >
            {notesProps.error}
          </p>
        )}
      </div>
    </Step>
  );
}

function Step({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mb-2">
        <p className="text-xs uppercase tracking-[0.18em] text-coral font-semibold mb-2">
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl md:text-3xl text-twilight text-balance">
          {title}
        </h2>
      </div>
      {children}
    </>
  );
}

function HiddenInputs({
  values,
  activeStep,
}: {
  values: QuoteFields;
  activeStep: number;
}) {
  // Inputs that ARE rendered on the active step submit naturally. For the
  // others, mirror their values into hidden inputs so the final FormData
  // includes everything.
  const hidden: { name: keyof QuoteFields; value: string | number }[] = [];
  if (activeStep !== 0) {
    hidden.push(
      { name: "fromPostal", value: values.fromPostal },
      { name: "toPostal", value: values.toPostal },
    );
  }
  if (activeStep !== 1) {
    hidden.push(
      { name: "homeSize", value: values.homeSize },
      { name: "density", value: values.density },
      { name: "moveDate", value: values.moveDate },
    );
  } else {
    // density is rendered as a custom slider (with name="density" already),
    // so no hidden duplicate needed here.
  }
  if (activeStep !== 2) {
    hidden.push(
      { name: "name", value: values.name },
      { name: "email", value: values.email },
      { name: "phone", value: values.phone },
      { name: "notes", value: values.notes },
    );
  }
  return (
    <>
      {hidden.map((h) => (
        <input
          key={h.name}
          type="hidden"
          name={h.name}
          value={String(h.value ?? "")}
        />
      ))}
    </>
  );
}

function SuccessPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl bg-cloud border border-border-soft p-10 md:p-14 text-center shadow-card"
    >
      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-coral text-cloud">
        <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="font-display text-3xl md:text-4xl text-twilight">
        Up, up, and <span className="italic text-coral">away.</span>
      </h2>
      <p className="mt-4 text-ink-muted text-pretty max-w-md mx-auto">
        We&apos;ve got your details. A real person — not a bot — will come back to
        you with a quote within the same business day.
      </p>
    </motion.div>
  );
}
