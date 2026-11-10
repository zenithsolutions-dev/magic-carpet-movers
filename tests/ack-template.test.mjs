// Customer acknowledgement email. Run with: npm test
// Node strips the TypeScript types on import, so the template must stay
// dependency-free.
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildAcknowledgement, safeFirstName } from "../lib/email/ack-template.ts";

const brand = {
  name: "Magic Carpet Movers",
  email: "magicarpet.inc@gmail.com",
  phone: "(514) 246-8463",
  url: "https://magiccarpetmoving.com",
  region: "Ottawa – Gatineau, Canada",
};

test("quote acknowledgement has a plain first-contact subject, never a reply prefix", () => {
  const mail = buildAcknowledgement({ name: "Sara Bishara", kind: "quote", brand });
  assert.equal(mail.subject, "We received your moving quote request");
  assert.doesNotMatch(mail.subject, /^re:/i);
});

test("contact acknowledgement uses its own subject", () => {
  const mail = buildAcknowledgement({ name: "Sara Bishara", kind: "contact", brand });
  assert.equal(mail.subject, "We received your message");
});

test("greets the customer by first name only", () => {
  const mail = buildAcknowledgement({ name: "Sara Bishara", kind: "quote", brand });
  assert.match(mail.text, /^Hello Sara,/);
  assert.doesNotMatch(mail.text, /Bishara/);
});

test("a name carrying a link or markup is never echoed back", () => {
  for (const name of ["<script>alert(1)</script>", "http://evil.example", "www.spam.biz now", "win$$$"]) {
    const mail = buildAcknowledgement({ name, kind: "quote", brand });
    assert.match(mail.text, /^Hello there,/, `text for ${name}`);
    assert.ok(!mail.html.includes("<script"), `html for ${name}`);
    assert.ok(!mail.html.includes("evil.example"), `html for ${name}`);
  }
});

test("safeFirstName keeps real names, including accents, hyphens and apostrophes", () => {
  assert.equal(safeFirstName("Geneviève Lavoie"), "Geneviève");
  assert.equal(safeFirstName("Jean-Luc Picard"), "Jean-Luc");
  assert.equal(safeFirstName("O'Brien"), "O'Brien");
  assert.equal(safeFirstName("  أحمد أيمن "), "أحمد");
  assert.equal(safeFirstName(""), "there");
  assert.equal(safeFirstName("x".repeat(60)), "there");
});

test("tells the customer how to reach the business and to reply", () => {
  const mail = buildAcknowledgement({ name: "Sara", kind: "quote", brand });
  assert.ok(mail.text.includes(brand.email));
  assert.ok(mail.text.includes(brand.phone));
  assert.match(mail.text, /reply to this email/i);
});

test("ends with who sent it, where from, and why it was received", () => {
  const mail = buildAcknowledgement({ name: "Sara", kind: "quote", brand });
  assert.ok(mail.text.includes(brand.name));
  assert.ok(mail.text.includes(brand.region));
  assert.ok(mail.text.includes(brand.url));
  assert.match(mail.text, /because you contacted us through our website/i);
});

test("carries a List-Unsubscribe header pointing at the business inbox", () => {
  const mail = buildAcknowledgement({ name: "Sara", kind: "quote", brand });
  assert.equal(
    mail.headers["List-Unsubscribe"],
    "<mailto:magicarpet.inc@gmail.com?subject=Unsubscribe>",
  );
});

test("html escapes brand values and has no remote images or scripts", () => {
  const risky = { ...brand, name: 'A & B <Movers> "Co"' };
  const mail = buildAcknowledgement({ name: "Sara", kind: "quote", brand: risky });
  assert.ok(mail.html.includes("A &amp; B &lt;Movers&gt; &quot;Co&quot;"));
  assert.ok(!/<img|<script/i.test(mail.html));
});

test("makes no response-time promise", () => {
  const mail = buildAcknowledgement({ name: "Sara", kind: "quote", brand });
  assert.doesNotMatch(mail.text, /within|hour|business day|minutes/i);
});

test("contact acknowledgement opens with the contact wording", () => {
  const mail = buildAcknowledgement({ name: "Sara", kind: "contact", brand });
  assert.match(mail.text, /Thank you for contacting Magic Carpet Movers\./);
});

test("html carries the same unsubscribe address as the header", () => {
  const mail = buildAcknowledgement({ name: "Sara", kind: "quote", brand });
  assert.ok(mail.html.includes('href="mailto:magicarpet.inc@gmail.com?subject=Unsubscribe"'));
});
