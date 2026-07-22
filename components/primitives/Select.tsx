import * as React from "react";
import { cn } from "@/lib/utils/cn";

type Option = { value: string; label: string };

type Props = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "children" | "required"
> & {
  label?: string;
  error?: string;
  options: Option[];
  placeholder?: string;
  // Visual marker only. Renders the coral asterisk and sets aria-required.
  // Does NOT enable browser-native validation.
  mandatory?: boolean;
};

export const Select = React.forwardRef<HTMLSelectElement, Props>(function Select(
  { label, error, options, placeholder, className, id, mandatory, ...rest },
  ref,
) {
  const autoId = React.useId();
  const selectId = id ?? autoId;
  const errorId = `${selectId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
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
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          aria-required={mandatory || undefined}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-12 w-full rounded-md bg-cloud border border-border px-4 pr-10 text-base text-ink appearance-none",
            "transition-all duration-150",
            "focus:border-coral focus:outline-none focus:ring-4 focus:ring-coral/15",
            error && "border-danger focus:border-danger focus:ring-danger/15",
            className,
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-3 text-ink-muted"
        >
          <path
            d="M2 4.5L6 8.5L10 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
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
