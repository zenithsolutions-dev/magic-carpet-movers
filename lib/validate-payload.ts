import type { Validator } from "@/lib/validators";

type Schema<T> = { [K in keyof T]: Validator<T[K]> };

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; fieldErrors: Record<string, string[]> };

/**
 * Server-side payload validator. Runs each schema validator against the raw
 * input. Returns the typed value on success, or a per-field error map on
 * failure (matching the shape forms render in `fieldErrors`).
 */
export function validatePayload<T extends Record<string, unknown>>(
  raw: Record<string, unknown>,
  schema: Schema<T>,
): ValidationResult<T> {
  const fieldErrors: Record<string, string[]> = {};
  const data: Record<string, unknown> = {};
  let ok = true;

  for (const key of Object.keys(schema) as (keyof T)[]) {
    const validator = schema[key];
    const value = raw[key as string];
    const err = validator(value as T[typeof key], raw);
    if (err) {
      fieldErrors[key as string] = [err];
      ok = false;
    }
    data[key as string] = value;
  }

  if (!ok) return { ok: false, fieldErrors };
  return { ok: true, data: data as T };
}
