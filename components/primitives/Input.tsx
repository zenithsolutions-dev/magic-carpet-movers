import * as React from "react";
import { cn } from "@/lib/utils/cn";

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  // Strip HTML5 native validation attributes — validation is custom.
  "required" | "pattern" | "minLength" | "maxLength" | "min" | "max"
> & {
  label?: string;
  error?: string;
  hint?: string;
  // Visual marker only. Renders the coral asterisk and sets aria-required.
  // Does NOT enable browser-native validation.
  mandatory?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, hint, className, id, mandatory, ...rest },
  ref,
) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-twilight"
        >
          {label}
          {mandatory && (
            <span aria-hidden className="text-coral ml-0.5">
              *
            </span>
          )}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-required={mandatory || undefined}
        aria-invalid={!!error || undefined}
        aria-describedby={cn(error && errorId, hint && hintId) || undefined}
        className={cn(
          "h-12 w-full rounded-md bg-cloud border border-border px-4 text-base text-ink placeholder:text-ink-muted/60",
          "transition-all duration-150",
          "focus:border-coral focus:outline-none focus:ring-4 focus:ring-coral/15",
          error && "border-danger focus:border-danger focus:ring-danger/15",
          className,
        )}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-xs text-danger font-medium"
        >
          {error}
        </p>
      )}
    </div>
  );
});
