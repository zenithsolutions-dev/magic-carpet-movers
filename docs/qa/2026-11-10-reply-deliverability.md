# QA report: customer acknowledgement email + no-reply sender (branch fix/reply-deliverability-ack)

## Verdict: READY WITH GAPS

The code is tested and builds. What has not been tested is the thing the
client actually reported: whether a real reply now reaches a real inbox. That
needs one live submission after deploy.

## Why this change exists

The owner's replies to leads landed in customers' junk folders. DNS was
checked on 2026-11-10 and is correct (SPF, DKIM for IONOS and Resend, DMARC
p=none), so authentication was not the fault. He replied by pressing Reply on
the internal "New quote" notification, so the customer received a "Re:" from
an address they had never heard from, on a thread they never started. That
diagnosis is a reasoned hypothesis: no junked message's headers were examined.

The fix is the pattern already used on the Marwah Amer site: a
"Website <no-reply@...>" sender plus a short acknowledgement to the visitor
whose Reply-To is the business inbox.

## User journeys

- As a customer who sends a quote or contact form, I get a short receipt from
  the site's own domain, so the mover's follow-up is part of a conversation I
  started.
- As the owner, a submission never fails or hangs because that receipt failed.

## What was run (Windows 11, Node 24.14.0, Next 16.2.4)

| Check | Command | Result |
|---|---|---|
| Unit tests | `npm test` | 20 passed, 0 failed |
| RED before code | `npm test` at e56d5f7/0a148da, a8fe9e2 | failed: module not found |
| RED for timeout | `npm test` before the timeout fix | 1 failed (hung provider) |
| Mutation check | Reply-To set to the customer; name filter removed | 2 tests failed, then restored to 20/20 |
| Types | `npx tsc --noEmit` | clean |
| Lint | `npx eslint lib/email app/actions` | clean |
| Build | `npm run build` | compiled, 15/15 pages |
| Code review | independent TypeScript reviewer | 1 HIGH (fixed), no CRITICAL |
| Security review | independent security reviewer | no CRITICAL or HIGH |

## What the tests guarantee

| # | Guarantee | Test file |
|---|---|---|
| 1 | Subject is a plain first-contact line, never "Re:" | ack-template |
| 2 | Greets by first name only | ack-template |
| 3 | A name holding a link or markup is never echoed back | ack-template |
| 4 | Real names in any script, with accents, hyphens, apostrophes, are kept | ack-template |
| 5 | Body gives the business email and phone and invites a reply | ack-template |
| 6 | Ends with the business name, region, site and why it was received | ack-template |
| 7 | List-Unsubscribe header and the same link in the HTML | ack-template |
| 8 | HTML is escaped; no images or scripts | ack-template |
| 9 | No response-time promise | ack-template |
| 10 | Sent to the customer, from the no-reply sender, Reply-To the business | ack-delivery |
| 11 | Provider error, exception or no answer returns false and never throws | ack-delivery |
| 12 | Never sent to the business's own address or a blank address | ack-delivery |

## Findings

- HIGH, fixed: `lib/email/send-acknowledgement.ts` had code outside any guard
  and no timeout on the provider call, so a slow or failing receipt could have
  failed a submission the business had already received. Now fully guarded,
  with a 4 second ceiling, proven by a test.
- MEDIUM, open: the receipt goes to whatever address a visitor types. Limits
  are per IP and per recipient, 3 per 10 minutes, but held in memory per
  serverless instance, so they slow abuse without stopping it. The body is
  fixed text with no visitor content, so the harm is nuisance mail and sender
  reputation. Full fix: Turnstile on both forms, or a shared counter.
- MEDIUM, partly fixed: the quote form had no limit of its own. It now has the
  same per-IP ceiling as the contact form. It still has no honeypot.
- LOW, open: DMARC is p=none. Move to quarantine once reports are clean.
- LOW, open: the unsubscribe link is a mailto to the business inbox and is
  handled by hand.

## NOT TESTED

- A live send through Resend, and where the receipt lands (inbox or junk) at
  Gmail, Outlook and Yahoo. Risk: the fix may not move junk placement at all.
- The server action wiring and the wrapper (`send-acknowledgement.ts`) under a
  real Next runtime. Covered only by types, lint and build.
- The form's step transitions in a real browser (unchanged by this work).
- Whether the owner's own follow-up now reaches the inbox. Only he can test it.

## Next steps, waiting for the owner's go

1. Merge to main, which deploys to production.
2. Send one real quote from a personal Outlook address and one from Gmail;
   confirm the receipt arrives and note inbox or junk.
3. Reply to the receipt from the customer side, then have the owner answer
   that thread from Gmail; confirm his answer lands in the inbox.
4. Decide on Turnstile keys to close the open MEDIUM.
