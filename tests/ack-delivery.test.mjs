// Delivery of the customer acknowledgement. The mail provider is the only
// thing faked here; everything else is the real code.
import { test } from "node:test";
import assert from "node:assert/strict";
import { deliverAcknowledgement } from "../lib/email/ack-delivery.ts";

const brand = {
  name: "Magic Carpet Movers",
  email: "magicarpet.inc@gmail.com",
  phone: "(514) 246-8463",
  url: "https://magiccarpetmoving.com",
  region: "Serving Ottawa & across Ontario",
};
const from = "Magic Carpet Movers Website <no-reply@magiccarpetmoving.com>";
const base = { from, brand, to: "sara@example.com", name: "Sara Bishara", kind: "quote" };

function recorder(result = { error: null }) {
  const calls = [];
  return { calls, send: async (payload) => (calls.push(payload), result) };
}

test("sends to the customer, from the no-reply sender, with replies going to the business", async () => {
  const { calls, send } = recorder();
  const ok = await deliverAcknowledgement({ ...base, send });
  assert.equal(ok, true);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].to, ["sara@example.com"]);
  assert.equal(calls[0].from, from);
  assert.equal(calls[0].replyTo, "magicarpet.inc@gmail.com");
});

test("passes the subject, both bodies and the unsubscribe header through", async () => {
  const { calls, send } = recorder();
  await deliverAcknowledgement({ ...base, send });
  assert.equal(calls[0].subject, "We received your moving quote request");
  assert.match(calls[0].text, /^Hello Sara,/);
  assert.match(calls[0].html, /<p>Hello Sara,<\/p>/);
  assert.ok(calls[0].headers["List-Unsubscribe"]);
});

test("returns false, without throwing, when the provider reports an error", async () => {
  const { send } = recorder({ error: { message: "domain not verified" } });
  assert.equal(await deliverAcknowledgement({ ...base, send }), false);
});

test("returns false, without throwing, when the provider throws", async () => {
  const send = async () => {
    throw new Error("network down");
  };
  assert.equal(await deliverAcknowledgement({ ...base, send }), false);
});

test("never sends when the recipient is the business inbox itself", async () => {
  const { calls, send } = recorder();
  const ok = await deliverAcknowledgement({ ...base, to: "MagiCarpet.inc@gmail.com", send });
  assert.equal(ok, false);
  assert.equal(calls.length, 0);
});
