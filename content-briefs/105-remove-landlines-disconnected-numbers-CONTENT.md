# How to Remove Landlines and Disconnected Numbers Before You Dial

> **Sanity CMS Fields**
> - **Slug:** `remove-landlines-disconnected-numbers`
> - **SEO Title:** `Remove Landlines & Disconnected Numbers Before You Dial (2026)`
> - **Meta Description:** `How phone validation strips dead, disconnected, and reassigned numbers from a purchased list, flags landline vs. wireless, and saves you from wasted dials and reassigned-number lawsuits.`
> - **Excerpt:** `Half the work of a clean list is removing the numbers that can't or shouldn't be dialed. Here's how phone validation drops disconnected and invalid records, flags line type, and catches reassigned-number traps before you dial.`
> - **Category:** Resources
> - **Published Date:** 2026-07-11

---

Every purchased list has dead weight in it. Numbers that were disconnected months ago. Numbers that were never valid. Numbers that belonged to your prospect once but have since been handed to a stranger. And numbers that are landlines when you assumed they were cells. None of those can become a customer, and a couple of them can become a lawsuit. Clearing them out before you dial is half the job of working a list well.

This is the data-quality side of lead hygiene — the part that makes a list *productive*, not just *legal*. Here's how it works and how to do it.

> *Operational guidance, not legal advice — liability for every call sits with you, the caller. Confirm specifics with a TCPA attorney.*

## Why Dirty Numbers Cost You Twice

A bad number on your list costs you in two currencies.

The first is **time**. If a fifth of your list is disconnected or invalid — not unusual for aged data — then a fifth of your dialing session is spent listening to "the number you have dialed is no longer in service." On a list you paid for, every dead dial is money you've already spent producing nothing. Strip those numbers and your contacts-per-hour climbs without any change to your pitch.

The second is **legal exposure**, and this one's sharper. When a phone number gets disconnected, the carrier eventually **reassigns** it to a new person. That new person never filled out your form, never asked to hear from you, and has no relationship with you whatsoever. Call them as if they were your original lead and you're now making an unsolicited call to a stranger — a classic TCPA trap, and a favorite of plaintiffs. Validation is how you catch a reassigned number before it catches you.

## What Phone Validation Actually Does

**Phone validation** (you'll also see it called a "ping," a real-time lookup, or an HLR lookup) checks each number against live carrier and network records and tells you three things:

1. **Is it active?** — live, disconnected, or unassigned.
2. **What line type is it?** — wireless, landline, or VoIP.
3. **Has it likely changed hands?** — flags consistent with reassignment.

Some services also cross-reference the FCC's **Reassigned Numbers Database**, the official source for checking whether a number has been reassigned since a given date. Together, these checks turn a raw, unverified file into one where you know — before dialing — which numbers are worth your time and which are risks.

## Splitting Landlines from Wireless (and Why It Matters)

Line-type identification usually rides along with validation, and it's worth understanding what it buys you.

Knowing whether a number is a **landline, wireless, or VoIP** line lets you work your list with discipline instead of treating every record the same. You can prioritize and route by line type, set expectations on reachability, and stay aware of the different rules that attach to different line types.

But here's the line you must not cross: **knowing a number is a cell phone does not give you permission to text it.** Purchased, non-consent data should never be texted, no matter the line type. Line-type data is for working the phone list *smarter* — not for opening an SMS channel you don't have consent for. Texting purchased data is a TCPA danger zone, and several states (Texas's SB 140 among them) now expressly cover text messages. If you're thinking about SMS at all, read the [Text Message Lead Follow-Up Compliance Guide](/text-messaging-compliance-guide) first.

## What It Costs

Validation is the layer you'll spend the most on, and the one that returns the most in recovered dialing time.

| Service | Typical cost | What you get |
| --- | --- | --- |
| Basic validity check | ~$0.005–$0.02 / lookup | Active / disconnected / invalid |
| Validation + line type | ~$0.01–$0.05 / lookup | Above, plus wireless/landline/VoIP |
| Reassigned-number check | Varies; often bundled | Flags numbers that may have changed hands |

On a list you paid real money for, this pays for itself before you account for the legal protection. If you spent good money buying leads, spending a fraction of a cent more per record to make sure they're dialable is the easiest yes in the workflow.

## How to Run the Pass

The practical sequence, once your list is already DNC- and litigator-scrubbed:

1. **Run the full file through validation** — batch upload, or via API if it's connected to your dialer.
2. **Drop disconnected and invalid records** — they can't convert; don't keep them "just in case."
3. **Flag possible reassignments** — set those aside or verify before dialing.
4. **Tag survivors by line type** — wireless / landline / VoIP, for routing.
5. **Re-validate aged lists before re-working them** — numbers that were live three months ago may not be now.

That's it. The clean, validated file that comes out the other side is the one you actually dial.

## Frequently Asked Questions

### How do I check if a phone number is disconnected before I call it?

Run the list through a phone-validation service (also called a ping or HLR lookup). It checks each number against live carrier and network records and returns its status — active, disconnected, or unassigned — so you can drop the dead ones before they waste a dial. For a list you're re-working after it's aged, re-validate first, because a number that was live a few months ago may have been disconnected since.

### How do I remove landlines from a phone list?

Use a validation or line-type identification service. It tags each number as wireless, landline, or VoIP, and you filter from there. Just remember the reason you're identifying line type is to work the list intelligently — not to start texting the cell numbers. Purchased, non-consent data shouldn't be texted regardless of line type.

### What is a reassigned number, and why is it risky?

When a phone number is disconnected, the carrier eventually gives it to a new subscriber. That new person has no relationship with you and never consented to your contact, so calling them as though they were your original lead is an unsolicited call — exactly the kind that draws TCPA complaints and lawsuits. The FCC maintains a Reassigned Numbers Database to help callers check whether a number has changed hands since a given date; many validation services check it for you.

### Does line type tell me whether I can legally text a number?

No. Knowing a number is a wireless line tells you the channel exists technically — it does not grant you consent to use it. Texting purchased or non-consent data is a TCPA risk regardless of line type, and several states now expressly regulate SMS. Line-type data is for routing and prioritizing calls, not for unlocking a texting channel you don't have permission for.

### Where does validation fit in the overall cleaning process?

After your DNC and litigator scrubs, not before. You filter for legal risk first (DNC, litigators), then for data quality (disconnected, invalid, line type), then suppress your own opt-outs last. Running them in that order means each pass works on a smaller, cleaner file. The full sequence is laid out in the [Lead-Data Hygiene Checklist](/lead-data-hygiene-checklist).

## Dial Numbers That Can Actually Answer

Removing dead, invalid, and reassigned numbers does two things at once: it hands your dialer back the time it was wasting on disconnected lines, and it keeps you off the reassigned-number traps that plaintiffs love. That's the whole point of data hygiene — safer *and* more productive from the same hour of work.

Validation is one layer of the routine. Run every list you buy through the complete [Lead-Data Hygiene Checklist](/lead-data-hygiene-checklist) so nothing dirty reaches your dialer, and when you're sourcing fresh inventory, you can browse and filter aged leads by type, age, and state at [AgedLeadStore](https://www.agedleadstore.com/?ref=howtoworkleads).
