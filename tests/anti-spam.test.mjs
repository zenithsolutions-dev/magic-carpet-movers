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
