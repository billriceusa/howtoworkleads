# HowToWorkLeads.com — Archive Plan

**Written:** 2026-08-28  **Tier:** 4  **State:** merged away — this repo is legacy

This repo describes a live, independently-ranked property. That property no longer exists.
Every conclusion below is checked against the code and the git history of this repo and of
`agedleadsales.com`, not against the prose in this repo's own documentation — which is the
thing that is wrong.

---

## What happened

howtoworkleads.com and agedleadsales.com were consolidated onto a third domain,
workagedleads.com. The evidence lives in the other repo, because that is where the work was
done and this repo was never told.

**The plan.** `agedleadsales.com` → `git show origin/main:data/migration/MIGRATION-PLAN.md`.
Authored 2026-07-29, written into the repo 2026-07-31. Its stated outcome: "one site on
workagedleads.com … with a single content corpus, one email list, and the agedleadstore.com
link inventory repointed."

**The URL map.** `git show origin/main:data/migration/url-map.csv` — 445 rows, of which **175
are howtoworkleads.com URLs**, every one resolved: 82 `MIGRATE`, 27 `FOLD`, 26 `MERGE`, 40
`PRUNE`. `data/migration/htwl-sitemap.txt` is this site's live sitemap as of 2026-07-29 (175
URLs); `htwl-gsc-pages.json` and `htwl-gsc-pages-2026-06-05.json` are the two GSC windows the
prune rule was gated on.

**The content import.** `agedleadsales.com` commit `4270458` (2026-07-29) —
*"feat(migration): Phase 2a — import 68 howtoworkleads posts as staged drafts."* Normalization
of this site's Portable Text followed in `6c46bf2` (2026-07-30). By 2026-07-31 the migration
plan records **81 staged drafts verified against Sanity project `p7rbtajg/production`** (the 68
imported posts plus the merge destinations), and by the 2026-08-03 status pass they are
published and live.

**The cutover.** 2026-08-03, in this order: `7dcde94` built the merged 424-domain disavow for
the new property; `021da3e` ended the soft launch and made workagedleads.com indexable;
`d950133` (PR #65) fired the 301s. On 2026-08-04, `5450119` flipped the affiliate UTM source to
`workagedleads`, and `ccf6ca7` generated the cross-host redirect table this repo was supposed to
receive.

**Where it stands.** `agedleadsales.com` `BACKLOG.md` on `origin/main`, entry dated 2026-08-18:
Google has not recrawled the old URLs, so it has never seen the 301s. The latest trend snapshot
(`a4794ca`, 2026-08-27) reads *agedleadsales.com 26 clicks / 4,017 impressions; workagedleads.com
0 clicks / 262 impressions.* Combined affiliate sessions fell from ~14–16.5/day pre-cutover to
5.4/day. The consolidation is stalled at the crawl, not failing — but it is stalled.

**This repo's last commit is `8022284`, 2026-07-31** — four days before the domain was
redirected away. Nothing here knows any of the above.

---

## Why this repo is dangerous as-is

Not "out of date." Each stale document leads a specific reader to a specific wrong action.

**`README.md`** — a getting-started guide for an independent Next.js/Sanity product, with clone,
install, env-var and `vercel deploy` instructions and no indication the site is retired.
*Wrong conclusion:* this is a maintained application. *Wrong action:* someone runs the deploy
path and re-publishes the Vercel project that currently exists only to serve a domain-level 301.

**`CLAUDE.md:7`** — `**Live URL:** https://howtoworkleads.com`. It is the file an AI session
reads first, and it presents the site as operating. It also documents a content-generation
pipeline that no longer exists: `apps/web/next.config.js:35` still traces `sharp` binaries into
`/api/cron/weekly-content`, a route with no directory under `apps/web/app/api/` (the only routes
left are `download`, `generate-featured-image`, `newsletter`, `lead-order`).
*Wrong action:* a session opens work on "restoring the content engine" for a dead domain. The
portfolio plan records that this has already nearly happened once.

**`BACKLOG.md:4–6`** — `122+ pages live`, `Revenue: $2,918/mo affiliate rev share (March 2026…)`,
and a newsletter block whose closing line is *"Resume by re-adding the cron line."*
*Wrong conclusion:* a revenue-producing site with a paused-but-resumable publication.
*Wrong action:* someone resumes the cron and sends from a retired domain to Resend audience
`8a35228e-…`, which the migration merged into `43fe6675-…` on the new property. The $2,918 is a
March 2026 figure carried forward without re-measurement; that affiliate revenue now flows
through workagedleads at roughly a third of pre-cutover volume.

**`BACKLOG.md:25`** — `**Portfolio rank: TIER 1 — one of the two REAL converters**`, followed by
a ranked work list. `_portfolio/PORTFOLIO-PLAN.md` places this property at **Tier 4, archive**.
*Wrong action:* prioritization. A reader with only this repo open spends the fleet's scarcest
resource on its deadest asset — and the list's own item 1 ("fix the `sharp` featured-image
webhook … it blocks safely resuming the content engine") is work on a publishing pipeline for a
site that cannot publish.

**`BACKLOG.md` P1, IUL cluster** — four Sanity drafts staged "pending publish in Studio"
(`drafts.dufjwBP1dSaXDJiWEvyvzk` and three siblings). Those live in this site's Sanity project
`e9k38j42`, not the destination's `p7rbtajg`. *Wrong action:* publishing them puts new content
on a 301'd host, where it will never be crawled.

**`NEWSLETTER-STRATEGY.md`** — 21KB describing *The Aged Lead Playbook* as a weekly Tuesday
publication with a launch calendar and staged growth targets (250 → 1,000 → 3,000 subscribers,
`:358`, `:370`, `:383`). This repo's own `BACKLOG.md:6` contradicts it: paused 2026-06-09, eight
issues written, **three subscribers**, Issue 1 never actually sent. *Wrong conclusion:* a
functioning channel with an audience. Whoever reads the strategy doc without the backlog line
plans against a publication that never launched.

**`SEO-AUDIT-AND-STRATEGY-2026.md`, `SEO-GROWTH-STRATEGY.md`, `SEO-LLM-OPTIMIZATION-PLAN.md`** —
their AEO guidance predates the evidence in `_portfolio/AEO-SEO-STANDARD-2026.md` §1. The
backlog's open P2 *"`faqSection` on `blogPost` … lights up AEO structure on 77 posts"* is dead
twice over: FAQ rich results stopped rendering 2026-05-07, and the 77 posts live in another
Sanity project now.

The through-line: **every number in this repo is undated relative to the migration, and the
migration is the only fact that matters.**

---

## Live problems that must migrate before archiving

### (a) The welcome email promises a newsletter nothing sends — CONFIRMED

`apps/web/lib/email/welcome-sequence.ts:54` — *"**Every Tuesday at 8 AM ET**, you'll get one
email with…"* — inside Email 1.

Email 1 is not dormant. Both capture routes send it synchronously on every signup:
`apps/web/app/api/newsletter/route.ts:70` and `apps/web/app/api/download/route.ts:94`, each
calling `getWelcomeEmail(0)`.

Nothing produces the Tuesday email. `apps/web/vercel.json` declares no crons. There is no
`apps/web/app/api/cron/` directory. The only sender in the repo is `scripts/send-newsletter.mjs`,
a manual CLI. The file's own header (`welcome-sequence.ts:1–8`) states the drip was retired and
emails 2–5 are kept for reference only.

**The twin on verifiedvector.com is real — verified, not assumed.**
`verifiedvector.com/src/app/api/newsletter-subscribe/route.ts:105` — *"Every Tuesday, you'll get
one specific system for scaling fintech lending revenue"* — sent in the welcome email on every
subscribe. The same promise is made in page copy at
`verifiedvector.com/src/app/(site)/brief/page.tsx:30`. That repo has **no `vercel.json` at all**
and no cron route, so nothing sends it either.

**The urgency inverts.** Here the domain 301s, so no new subscriber can reach the form and the
promise is frozen at whoever already received it. On verifiedvector the form is live today and
still making the promise. **Fix it there, not here.** Carry the finding across; do not carry a
task.

### (b) Sanity write token — the backlog is wrong about the code, right about the risk

`BACKLOG.md:56` claims *"A live write token is hardcoded in committed source"* in
`scripts/md-to-sanity.mjs`. **That is no longer true and has not been since 2026-07-03.**

Current state: `scripts/md-to-sanity.mjs:8` reads `process.env.SANITY_API_TOKEN` with a
fail-loud guard at `:9–12`. Commit `20c53da` (2026-07-03, *"security: read Sanity write token
from env, not hardcoded source"*) made the same change to three scripts —
`scripts/md-to-sanity.mjs`, `scripts/cleanup-frontmatter.mjs`, `scripts/fix-internal-links.mjs`.
A full scan of the working tree finds no hardcoded Sanity token in any script.

**What is still true:** the value remains readable in git history, in the parent commit of
`20c53da`, on a repo with nine remote branches. `20c53da`'s own message says it: *"the exposed
token is burned and must be rotated in manage.sanity.io — this change only prevents
re-committing one."* No commit after that date records a rotation.

**Open action:** rotate the write token for Sanity project `e9k38j42`
(`scripts/md-to-sanity.mjs:13`) at manage.sanity.io. It is a console action, not a code change,
and it survives archiving the repo — an archived GitHub repo is still readable, and history is
not rewritten by archiving. The token value is not reproduced in this document and should not be
pasted into any issue, commit message or chat.

### (c) Everything else that is genuinely live

1. **Both capture routes hardcode the retiring Resend audience.**
   `apps/web/app/api/newsletter/route.ts:7` and `apps/web/app/api/download/route.ts:6` both set
   `NEWSLETTER_AUDIENCE_ID = '8a35228e-…'`. The migration plan names this as an unclosed loose
   end ("Two loose ends this does not close", item 1): *"Those routes keep writing to the
   retiring audience until that site stops serving."* Any request that still reaches this app
   adds a contact to a list nobody sends to. Closes when the Vercel project is retired — step 4
   of the checklist below.

2. **The cross-host redirect table was never delivered, and it costs equity today.**
   `agedleadsales.com` commit `ccf6ca7` (2026-08-04) added
   `scripts/export-cross-host-redirects.mjs`, whose usage line writes to
   `…/howtoworkleads/apps/web/data/migration/cross-host-redirects.json` and instructs *"Re-run
   and commit the result in BOTH repos."* **That file does not exist here** — there is no
   `apps/web/data/` directory. Per that commit's own message, the consequence is that 52 of the
   445 rows take **two hops from the apex and three from www** instead of one, because this
   host preserves the path on handoff and the second hop happens on the far side. This is the
   only item on this page that is actively costing something on a property already stalled at
   the crawl. It is also cheap: run the generator, commit the JSON here, wire it into
   `apps/web/next.config.js`, deploy once.

3. **Eleven stale same-host redirects** at `apps/web/next.config.js:40–105`, all pre-migration
   path fixes. Inert while the domain-level 301 fires first, but they are the trap that turns a
   casual redeploy into a redirect chain.

4. **Dead build config.** `apps/web/next.config.js:35` traces `sharp` into
   `/api/cron/weekly-content`, a route that does not exist. Harmless. Delete on archive.

5. **The 278-domain disavow is superseded — close it, do not act on it.** `BACKLOG.md`
   (2026-07-21) stages a file at `~/Desktop/brsg-disavow-2026-07-21/howtoworkleads.com-disavow.txt`
   awaiting Bill's upload. `agedleadsales.com` commit `7dcde94` (2026-08-03) replaced it: a
   merged, de-duplicated **424-domain** file covering both source profiles, for the URL-prefix
   property `https://workagedleads.com/`. Uploading the old file now would protect a domain that
   no longer serves content.

---

## What is worth keeping

Archive, do not delete. Three asset classes are reusable, and one is not.

**The content briefs — `content-briefs/`, 166 files.** Verified: 111 are `*-CONTENT.md` (finished
long-form drafts), the remainder are the briefs behind them. They are vertical-specific and
written in an operator voice, which is exactly the differentiator
`AEO-SEO-STANDARD-2026.md` §3.2 says the fleet is failing to use.
**Move to:** `agedleadsales.com/content-briefs/`, alongside
`data/migration/merge-sources/`.
**Use them as inventory, not as a queue.** workagedleads' own measurement is 76 posts → 34 clicks
in 80 days. These are worth drawing on to fill a specific fan-out gap (§3.1), and worth nothing
as a publishing target.

**The lead magnets — `lead-magnets/`.** Five magnets in paired `.md` + `.pdf`
(aged-lead-quick-start-kit, 7-day-follow-up-cadence, insurance-lead-scripts-bundle,
mortgage-lead-scripts-bundle, lead-vendor-comparison-scorecard) plus `pdf-style.css`, the build
styling. These are download-gate assets and the destination needs them: the migration plan's
Phase 2b item 3 flags hard-coded lead-magnet download URLs in the destination newsletter route.
**Move to:** `agedleadsales.com/lead-magnets/`, and repoint those URLs in the same commit.

**The SEO strategy docs.** `SEO-AUDIT-AND-STRATEGY-2026.md`, `SEO-GROWTH-STRATEGY.md`,
`INTERNAL-LINKING-AUDIT.md`, `AI-CONTENT-PLAYBOOK.md`, `SEO-LLM-OPTIMIZATION-PLAN.md`, and
`data/` (the GSC exports and the 2026-04-14 / 2026-06-05 baselines).
**Keep in place, in the archived repo.** They are the pre-migration baseline and the record of
how this corpus was built. **Do not copy them into the live repo as guidance** — their AEO
sections would re-import assumptions `AEO-SEO-STANDARD-2026.md` §1 has already falsified.

**The newsletter issues — `newsletters/`.** Eight written issues and the welcome sequence. The
editorial content and subject-line calendar are reusable; the send infrastructure and the
audience are not. workagedleads restarted a weekly broadcast on 2026-08-10 behind a real
approval gate (`3c9939f`) to 2,464 subscribers. If these issues are used anywhere, it is there.

**What is not worth keeping:** the open checkboxes. Every P1/P2 in `BACKLOG.md` is either done,
moot, or now belongs to another repo. They go under a `## Closed` line, not into a new backlog.

---

## Archive checklist

Ordered so that nothing is lost before the thing that holds it is turned off.

1. **Rotate the Sanity write token** for project `e9k38j42` at manage.sanity.io. Do this first —
   it is the only item with a security clock, and archiving does not close it.
2. **Ship the cross-host redirect table.** In `agedleadsales.com`, run
   `node scripts/export-cross-host-redirects.mjs` and commit the JSON in both repos; wire it into
   `apps/web/next.config.js` here; deploy once. This is the last code change this repo receives.
3. **Move the reusable assets** — `content-briefs/` and `lead-magnets/` into `agedleadsales.com`,
   in one commit each, and repoint the destination's hard-coded lead-magnet URLs in the same
   commit as the magnets.
4. **Retire the Vercel project** once the domain-level 301 is confirmed to be served outside it.
   This is what actually closes the `8a35228e-…` audience writes. Verify the redirect before and
   after with `node scripts/verify-redirects.mjs --mode=post` in the other repo.
5. **Prepend the deprecation header** below to `README.md`, `CLAUDE.md` and `BACKLOG.md`,
   verbatim, as the first lines of each file. Do not edit anything beneath it.
6. **Move `BACKLOG.md`'s open items under a `## Closed` line**, with a one-line note naming the
   migration. Do not delete them — the history is the defence against re-litigating this.
7. **Carry the Tuesday-promise finding to `verifiedvector.com`** and file it there. Nothing to
   fix here.
8. **Close the disavow item** with a pointer to `agedleadsales.com` `7dcde94`.
9. **Archive the GitHub repo** (Settings → Archive this repository). Read-only, still cloneable,
   still searchable. **Do not delete.**
10. **Record the archive date** in `_portfolio/PORTFOLIO-PLAN.md` Tier 4, so the fleet document
    stops describing a pending decision.

---

## Deprecation header to prepend to README.md / CLAUDE.md / BACKLOG.md

Paste this block, unchanged, as the first lines of each of the three files. It is not applied
here — applying it is checklist step 5.

```markdown
> ## ⚠️ ARCHIVED — this site no longer exists
>
> **howtoworkleads.com was 301-redirected onto workagedleads.com on 2026-08-03** and merged with
> agedleadsales.com. Its 68 blog posts were imported into the destination Sanity project on
> 2026-07-29 (`agedleadsales.com` commit `4270458`) and published before cutover.
>
> **Everything below this line is pre-migration and is retained as history only.** Specifically:
> the "Live URL", the 122-pages-live and $2,918/mo revenue lines, the TIER 1 portfolio rank, the
> weekly Tuesday newsletter, and every open backlog item are **all false as of 2026-08-03**.
> Do not plan, prioritize, publish or deploy from this repo.
>
> **The live property is `agedleadsales.com` (workagedleads.com).** Start there:
> - `data/migration/MIGRATION-PLAN.md` — what moved, when, and what is still open
> - `data/migration/url-map.csv` — all 445 URLs, 175 of them from this site
> - `BACKLOG.md` on `origin/main` — current state; the local checkout runs behind
> - `WORK-PLAN.md` in this repo — why this repo is archived and what was salvaged
>
> Last substantive commit here: `8022284`, 2026-07-31 — four days before the redirect.
```
