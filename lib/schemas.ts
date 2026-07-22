/**
 * Type definitions for form payloads. Validation rules live in
 * `lib/validators.ts` and `app/actions/*` — this file only declares shapes.
 */

export const HOME_SIZES = [
  "studio",
  "1br",
  "2br",
  "3br",
  "4br+",
  "office",
] as const;

export type HomeSize = (typeof HOME_SIZES)[number];

export type QuoteInput = {
  fromPostal: string;
  toPostal: string;
  homeSize: HomeSize;
  density: number;
  moveDate: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

export type ContactInput = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};
