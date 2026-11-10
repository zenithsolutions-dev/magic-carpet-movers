// Spam defences shared by the contact and quote forms. Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  clientIpFrom,
  isHoneypotTripped,
  isRateLimited,
  spamHeuristic,
} from "../lib/anti-spam.ts";

test("prefers the address Vercel itself reports over a client-supplied header", () => {
  const h = new Headers({
    "x-vercel-forwarded-for": "203.0.113.9",
    "x-forwarded-for": "6.6.6.6, 10.0.0.1",
  });
  assert.equal(clientIpFrom(h), "203.0.113.9");
});

test("falls back to the first forwarded hop, then x-real-ip, then a fixed key", () => {
  assert.equal(clientIpFrom(new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" })), "1.2.3.4");
  assert.equal(clientIpFrom(new Headers({ "x-real-ip": "9.9.9.9" })), "9.9.9.9");
  assert.equal(clientIpFrom(new Headers()), "unknown");
});

test("honeypot trips on any non-blank value and stays quiet otherwise", () => {
  assert.equal(isHoneypotTripped("https://spam.example"), true);
  assert.equal(isHoneypotTripped(" x "), true);
  assert.equal(isHoneypotTripped(""), false);
  assert.equal(isHoneypotTripped("   "), false);
  assert.equal(isHoneypotTripped(null), false);
  assert.equal(isHoneypotTripped(undefined), false);
});

test("allows three submissions per key in the window, then blocks", () => {
  const key = `test-${Date.now()}-${Math.random()}`;
  assert.deepEqual([1, 2, 3].map(() => isRateLimited(key)), [false, false, false]);
  assert.equal(isRateLimited(key), true);
  assert.equal(isRateLimited(`${key}-other`), false);
});

test("heuristics reject gibberish names and digits-only messages, and pass real input", () => {
  assert.equal(spamHeuristic("xKqRmWpZnVbTyHdQ", "Hello there"), "gibberish-name");
  assert.equal(spamHeuristic("Maya Rodriguez", "123 456 7890"), "digits-only-message");
  assert.equal(spamHeuristic("Maya Rodriguez", "Moving from Kanata next month"), null);
  assert.equal(spamHeuristic("Wolfeschlegelstein", "Real inquiry"), null);
});

// ── Turnstile verification (only the network call to Cloudflare is faked) ──
import { verifyTurnstile } from "../lib/anti-spam.ts";

async function withTurnstile({ secret, respond }, run) {
  const realFetch = globalThis.fetch;
  const realSecret = process.env.TURNSTILE_SECRET_KEY;
  const calls = [];
  if (secret === undefined) delete process.env.TURNSTILE_SECRET_KEY;
  else process.env.TURNSTILE_SECRET_KEY = secret;
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), body: String(init?.body ?? "") });
    return respond();
  };
  try {
    return await run(calls);
  } finally {
    globalThis.fetch = realFetch;
    if (realSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY;
    else process.env.TURNSTILE_SECRET_KEY = realSecret;
  }
}
const json = (body, ok = true) => () => ({ ok, json: async () => body });

test("turnstile is skipped, and Cloudflare is not called, when no secret is configured", async () => {
  await withTurnstile({ secret: undefined, respond: json({ success: false }) }, async (calls) => {
    assert.equal(await verifyTurnstile("", "1.2.3.4"), true);
    assert.equal(calls.length, 0);
  });
});

test("turnstile rejects a missing token without calling Cloudflare", async () => {
  await withTurnstile({ secret: "s3cret", respond: json({ success: true }) }, async (calls) => {
    assert.equal(await verifyTurnstile("", "1.2.3.4"), false);
    assert.equal(calls.length, 0);
  });
});

test("turnstile accepts a token Cloudflare confirms, sending secret, token and client address", async () => {
  await withTurnstile({ secret: "s3cret", respond: json({ success: true }) }, async (calls) => {
    assert.equal(await verifyTurnstile("tok-123", "1.2.3.4"), true);
    assert.equal(calls[0].url, "https://challenges.cloudflare.com/turnstile/v0/siteverify");
    assert.match(calls[0].body, /secret=s3cret/);
    assert.match(calls[0].body, /response=tok-123/);
    assert.match(calls[0].body, /remoteip=1\.2\.3\.4/);
  });
});

test("turnstile rejects a token Cloudflare refuses, an HTTP error, and a network failure", async () => {
  await withTurnstile({ secret: "s3cret", respond: json({ success: false }) }, async () => {
    assert.equal(await verifyTurnstile("bad", "1.2.3.4"), false);
  });
  await withTurnstile({ secret: "s3cret", respond: json({}, false) }, async () => {
    assert.equal(await verifyTurnstile("tok", "1.2.3.4"), false);
  });
  await withTurnstile({ secret: "s3cret", respond: () => { throw new Error("down"); } }, async () => {
    assert.equal(await verifyTurnstile("tok", "1.2.3.4"), false);
  });
});

test("turnstile gives up when Cloudflare never answers", { timeout: 4000 }, async () => {
  await withTurnstile({ secret: "s3cret", respond: () => new Promise(() => {}) }, async () => {
    assert.equal(await verifyTurnstile("tok", "1.2.3.4", 50), false);
  });
});
