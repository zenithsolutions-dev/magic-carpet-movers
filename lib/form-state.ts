export type QuoteState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export type ContactState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export const initialQuoteState: QuoteState = { ok: false };
export const initialContactState: ContactState = { ok: false };
