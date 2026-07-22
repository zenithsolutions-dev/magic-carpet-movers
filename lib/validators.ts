/**
 * Hand-rolled validators. No third-party validation library, no HTML5 native
 * validation (required, pattern, type="email", etc.). Each validator factory
 * returns a function that takes a value and returns either:
 *   - null  → the value is valid
 *   - string → an error message to show the user
 *
 * Validators are pure and isomorphic — they run client-side (live as the user
 * types/blurs) and server-side (final check inside server actions).
 */

export type Validator<T = unknown> = (
  value: T,
  allValues?: Record<string, unknown>,
) => string | null;

const isString = (v: unknown): v is string => typeof v === "string";

// Trim and collapse a value for "is empty?" checks. Numbers count as
// non-empty even when zero; only strings can be "empty by whitespace".
function isEmpty(v: unknown): boolean {
  if (v === null || v === undefined) return true;
  if (isString(v)) return v.trim().length === 0;
  return false;
}

export const required =
  (msg = "This field is required"): Validator =>
  (v) =>
    isEmpty(v) ? msg : null;

export const minLength =
  (n: number, msg?: string): Validator<string> =>
  (v) => {
    if (!isString(v) || v.trim().length === 0) return null;
    return v.trim().length < n
      ? msg ?? `Please enter at least ${n} character${n === 1 ? "" : "s"}`
      : null;
  };

export const maxLength =
  (n: number, msg?: string): Validator<string> =>
  (v) => {
    if (!isString(v)) return null;
    return v.length > n
      ? msg ?? `Please keep this under ${n} characters`
      : null;
  };

// Pragmatic email check. Not RFC-5322 perfect — that regex is unreadable and
// rejects valid addresses. This catches typos like "you@" or "you@x" while
// allowing real-world addresses including +tags and subdomains.
export const email =
  (msg = "Enter a valid email address"): Validator<string> =>
  (v) => {
    if (!isString(v) || v.trim().length === 0) return null;
    const trimmed = v.trim();
    const at = trimmed.lastIndexOf("@");
    if (at < 1 || at === trimmed.length - 1) return msg;
    const local = trimmed.slice(0, at);
    const domain = trimmed.slice(at + 1);
    if (local.length > 64 || domain.length > 253) return msg;
    if (/[\s,;<>()[\]\\]/.test(trimmed)) return msg;
    if (!domain.includes(".")) return msg;
    if (domain.startsWith(".") || domain.endsWith(".")) return msg;
    if (domain.includes("..")) return msg;
    const tld = domain.slice(domain.lastIndexOf(".") + 1);
    if (tld.length < 2) return msg;
    if (!/^[A-Za-z]+$/.test(tld)) return msg;
    return null;
  };

// Phone: count digits only. Accepts 7–15 digits (E.164 max), strips
// formatting like (), -, ., spaces, +.
export const phone =
  (msg = "Enter a valid phone number"): Validator<string> =>
  (v) => {
    if (!isString(v) || v.trim().length === 0) return null;
    const digits = v.replace(/\D/g, "");
    if (digits.length < 7) return msg;
    if (digits.length > 15) return msg;
    return null;
  };

// Canadian postal code: A1A 1A1 / A1A1A1, case-insensitive. Excludes the
// letters Canada Post does not use (D, F, I, O, Q, U in the first position
// and other invalid letters in subsequent letter positions).
const POSTAL_RE =
  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

export const canadianPostal =
  (msg = "Enter a valid postal code (e.g. K2K 1K1)"): Validator<string> =>
  (v) => {
    if (!isString(v) || v.trim().length === 0) return null;
    return POSTAL_RE.test(v.trim()) ? null : msg;
  };

// ISO date string (yyyy-mm-dd) parses to a real calendar date.
export const isoDate =
  (msg = "Pick a valid date"): Validator<string> =>
  (v) => {
    if (!isString(v) || v.trim().length === 0) return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v.trim());
    if (!m) return msg;
    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = Number(m[3]);
    if (month < 1 || month > 12) return msg;
    if (day < 1 || day > 31) return msg;
    const d = new Date(Date.UTC(year, month - 1, day));
    if (
      d.getUTCFullYear() !== year ||
      d.getUTCMonth() !== month - 1 ||
      d.getUTCDate() !== day
    ) {
      return msg;
    }
    return null;
  };

// Date is today or in the future (compared in local time).
export const futureOrToday =
  (msg = "Pick a date today or later"): Validator<string> =>
  (v) => {
    if (!isString(v) || v.trim().length === 0) return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v.trim());
    if (!m) return null; // let isoDate handle format errors
    const picked = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return picked.getTime() < today.getTime() ? msg : null;
  };

export const oneOf =
  <T extends string>(
    values: readonly T[],
    msg = "Pick one of the available options",
  ): Validator<string> =>
  (v) => {
    if (!isString(v) || v.length === 0) return null;
    return values.includes(v as T) ? null : msg;
  };

export const numberInRange =
  (min: number, max: number, msg?: string): Validator<unknown> =>
  (v) => {
    const n = typeof v === "number" ? v : Number(v);
    if (Number.isNaN(n)) return msg ?? "Must be a number";
    if (n < min || n > max) {
      return msg ?? `Must be between ${min} and ${max}`;
    }
    return null;
  };

/**
 * Run a list of validators in order. The first error wins; later validators
 * don't run. Pass `required()` first when the field is mandatory; everything
 * after it short-circuits empty values to a no-op.
 */
export function compose<T>(...rules: Validator<T>[]): Validator<T> {
  return (value, allValues) => {
    for (const rule of rules) {
      const err = rule(value, allValues);
      if (err) return err;
    }
    return null;
  };
}

/**
 * Optional field: only run inner validators when the value is non-empty.
 * Useful for "phone (optional)" style fields. Accepts undefined as valid;
 * since `Validator<T | undefined>` is assignable to `Validator<T>` in
 * contravariant position, the result drops into form schemas that expect
 * a string-only validator without casts.
 */
export function optional<T>(
  ...rules: Validator<T>[]
): Validator<T | undefined> {
  return (value, allValues) => {
    if (isEmpty(value)) return null;
    for (const rule of rules) {
      const err = rule(value as T, allValues);
      if (err) return err;
    }
    return null;
  };
}
