# Addicted Bespoken Shopify Theme Assignment

Shopify Dawn theme work for the Addicted Bespoken developer assignment. The source in this repository is the local theme; the GitHub remote is `https://github.com/03Adi/addicted-bespoken-demo.git`.

## Task status

| Task | Status | Implemented / observed | Remaining before submission |
| --- | --- | --- | --- |
| 1. Style Session landing page | Configured on live theme; approved testimonials intentionally blank | `templates/page.style-session.json` and reusable sections for hero, steps, featured suits, testimonials, FAQ, and booking. The page uses responsive demo SVG hero artwork, the `wedding-suits` collection, a Calendly embed, and the floating WhatsApp CTA. The page template is assigned to the Style Session page. | Review desktop/mobile and replace demo artwork only if approved brand photos are supplied. Add approved testimonials if available; the empty section is hidden from storefront visitors. |
| 2. Ad attribution through booking | Code and booking links configured; live booking test pending | `assets/addicted-attribution.js` keeps first-touch UTM values and `fbclid` for 30 days and appends them to the Calendly URL; campaign is added to WhatsApp text. Calendly and WhatsApp values were saved in Shopify Theme Editor and are intentionally not stored in this public repository. | Complete a test booking and verify that referral values arrive as expected. |
| 3. Bespoke product detail | Built locally; product-data QA pending | `templates/product.bespoke.json` and `sections/ab-product-bespoke-details.liquid` provide optional fabric, production-time, lapel, lining, and monogram details from product metafields. | Assign the template to a suitable product, populate its metafields, and inspect desktop/mobile product views and cart flow. |
| 4. Tracking audit | Audit written; event-level validation incomplete | Findings and recommendations are in [TASK-4-5-LIVE-AUDIT.md](TASK-4-5-LIVE-AUDIT.md) and [TASK-2-4-5-SUBMISSION.md](TASK-2-4-5-SUBMISSION.md). | Validate real browser events with Meta Pixel Helper/Tag Assistant and Network tools; confirm consent behavior and deduplication. Those tools/test events were unavailable during the audit. |
| 5. Mobile speed and booking review | Review written; screenshot still to attach | Audit notes include mobile PageSpeed field data and ranked booking friction fixes. | Save a screenshot from the linked PageSpeed report, confirm the tested URL matches the assignment's landing-page requirement, and include it with submission. PSI lab diagnosis was still loading; no Lighthouse lab score is claimed. |

### Why some items remain

The implementation and available audit work were completed first within the time available. Approved customer testimonials and brand photography were not provided, so demo artwork is used and the empty testimonial section is hidden. A real booking/test event, PageSpeed screenshot, and screen recording remain submission/QA steps and should not be represented as completed until captured.

## Local preview

Use Shopify CLI v3+ from this theme directory. The old `shopify login --store ...` command is not part of current Shopify CLI; authenticate automatically when a store command prompts, or run `shopify auth login`.

```powershell
shopify auth login
shopify theme dev --store addicted-bespoken-demo.myshopify.com
```

Theme ID `188152742139` is the published live assignment theme. Use an unpublished theme for future development and QA. Push to the live theme only after reviewing the exact files and confirming the intended deployment. Shopify CLI requires `--allow-live` when pushing selected files to a live theme.

For a fresh unpublished QA theme, authenticate and run:

```powershell
shopify theme push --store addicted-bespoken-demo.myshopify.com --unpublished --theme "Addicted Bespoken QA" `
  --only "assets/**" `
  --only "config/**" `
  --only "layout/**" `
  --only "locales/**" `
  --only "sections/**" `
  --only "snippets/**" `
  --only "templates/**"
```

Shopify CLI will return the preview and editor URLs. Do not use `--publish` for assignment review unless the store owner explicitly decides to publish after QA.

## Git workflow (PowerShell)

Run from the repository root. Review what is being committed, then commit and push the current `main` branch:

```powershell
git status
git diff --stat
git add -A
git status
git commit -m "Build Addicted Bespoken assignment theme"
git push -u origin main
```

Review `git status` after `git add -A` and make sure it lists only assignment/theme files before committing. If Git reports “nothing to commit,” check `git status` and `git log -1` before retrying. If `main` is not the intended branch, check `git branch --show-current` and use that branch name in the push command. Never commit storefront passwords, access tokens, customer data, or private collaborator credentials.

## Submission materials

- [Submission checklist](SUBMISSION-CHECKLIST.md)
- [5–10 minute Tasks 1–3 recording guide](SCREEN-RECORDING-GUIDE.md)
- [PageSpeed result and screenshot capture steps](PAGESPEED-RESULT.md)
- [Tasks 2, 4, 5 and assumptions](TASK-2-4-5-SUBMISSION.md)
- [Task 2 attribution detail](TASK-2-ATTRIBUTION.md)
- [Tasks 4–5 live audit](TASK-4-5-LIVE-AUDIT.md)

The assignment PDF does not specify a recipient or submission portal. Send these items through the recruiter/interviewer's channel and confirm the recipient if it was not provided.
