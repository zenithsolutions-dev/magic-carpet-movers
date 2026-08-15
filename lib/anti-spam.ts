/**
 * Server-side spam defenses for the contact form. Four independent layers:
 *
 *   1. Honeypot   — a hidden "website" field humans never see. Bots fill it.
 *   2. Rate limit — per-IP, in-memory. Survives within one warm serverless
 *                   instance; a distributed store (Vercel KV) can swap in
 *                   behind the same function signature later.
 *   3. Heuristics — cheap shape checks that catch the bulk of low-effort bots.
 *   4. Turnstile  — Cloudflare's CAPTCHA-less challenge, verified server-side.
 *                   Only enforced when TURNSTILE_SECRET_KEY is configured, so
 *                   the form keeps working before the keys are provisioned.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 3;

// hits: IP -> timestamps of submissions inside the current window.
// Module-level state persists across invocations on a warm instance.
const hits = new Map<string, number[]>();

/** True when this IP has already used its quota for the window. */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  // Opportunistic prune so the map can't grow unbounded on a long-lived
  // instance: drop any IP whose newest hit predates the window.
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if ((v[v.length - 1] ?? 0) < windowStart) hits.delete(k);
    }
  }

  const recent = (hits.get(ip) ?? []).filter((t) => t >= windowStart);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

/** First hop of x-forwarded-for, or a stable fallback key. */
export function clientIpFrom(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}

/**
 * Shape checks for obviously non-human input:
 *  - "name" with no spaces, longer than 15 chars, with mixed-case gibberish
 *    (interior capitals the way random generators produce, e.g. "xKqRmWpZnVbTyH")
 *  - a message that is nothing but digits
 * Returns a reason string (for the server log) or null when the input passes.
 */
export function spamHeuristic(name: string, message: string): string | null {
  if (!name.includes(" ") && name.length > 15) {
    const interior = name.slice(1);
    const hasLower = /[a-z]/.test(interior);
    const hasUpper = /[A-Z]/.test(interior);
    if (hasLower && hasUpper) return "gibberish-name";
  }

  const digitsOnly = message.replace(/\s/g, "");
  if (digitsOnly.length > 0 && /^\d+$/.test(digitsOnly)) return "digits-only-message";

  return null;
}

/**
 * Verify a Cloudflare Turnstile token. Modes:
 *  - secret not configured  -> pass (feature is off until keys exist)
 *  - configured, bad token  -> fail
 *  - configured, API down   -> fail closed (spam protection over availability
 *    for a low-volume lead form; the visitor sees "try again or call us")
 */
export async function verifyTurnstile(
  token: string,
  ip: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
          ...(ip !== "unknown" ? { remoteip: ip } : {}),
        }),
      },
    );
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verify failed", err);
    return false;
  }
}
