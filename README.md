# Addicted Bespoken — Shopify Developer Assignment

Shopify Dawn theme assignment implementation and handoff notes. This repository is the theme source; the Shopify store and GitHub links below are the review entry points.

## Review links and access

- Storefront: https://addicted-bespoken-demo.myshopify.com/
- Style Session landing page: https://addicted-bespoken-demo.myshopify.com/pages/style-session
- GitHub repository: https://github.com/03Adi/addicted-bespoken-demo
- Published theme ID: `188152742139` (Copy of Dawn)
- Development-store storefront password: `Demo`
- PageSpeed Insights mobile report (public Addicted Bespoken page, not this password-protected demo store): https://pagespeed.web.dev/analysis/https-www-addictedbespoken-com-pages-book-your-suit/hb2sssgdbv?form_factor=mobile

The Pagespeed report is field data for `https://www.addictedbespoken.com/pages/book-your-suit`; it is not a Lighthouse lab score or a measurement of this assignment theme. No PageSpeed screenshot is included in this repository. Capture and attach one only if requested by the reviewer.

## Assignment status

| Task | Status | Delivered | Remaining / limitations |
| --- | --- | --- | --- |
| 1. Style Session landing page | Implemented and published | `templates/page.style-session.json`; reusable hero, steps, featured suits, testimonials, FAQ, and booking sections; responsive demo SVG artwork; `wedding-suits` collection; Calendly embed and WhatsApp CTA configured in Shopify. | Approved brand photography and testimonials were not provided; demo artwork remains and the empty testimonials section is hidden. Review desktop/mobile and availability before final review. |
| 2. Ad attribution through booking | Code implemented; configured links verified; end-to-end test pending | `assets/addicted-attribution.js` stores first-touch UTM parameters and `fbclid` for 30 days and carries them to Calendly; WhatsApp text can include the campaign name. | No test booking was completed, so attribution persistence into the booking record and conversion reporting remain unverified. |
| 3. Bespoke product detail | Template and section implemented; product QA pending | `templates/product.bespoke.json` and `sections/ab-product-bespoke-details.liquid` display optional product metafields for fabric, production time, lapel, lining, and monogram. | Assign the template to a suitable product, populate real metafields, then check product, cart, and mobile behavior. |
| 4. Tracking audit | Audit findings documented; event-level validation pending | Reviewed the public site's tag inventory, consent/console observations, duplicate-configuration risk, and recommended checkout and Calendly event tracking approach. | Meta Pixel Helper, Tag Assistant, and Network-level event/deduplication checks require access to those tools and a test event. Findings are observations, not proof of duplicate conversions. |
| 5. Mobile speed and booking review | Review documented; screenshot/assignment-URL confirmation pending | Reviewed mobile PSI field data and prioritized booking-friction opportunities on the public site. | Confirm which URL the assignment expects, run PSI on that exact URL, and attach a screenshot if requested. The assignment dev store may report its password page. No lab score is claimed. |

## Task 2, 4, 5 notes and assumptions

### Task 2 — attribution behavior

The attribution script reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, and `fbclid` on storefront entry. It keeps the first tagged visit in browser `localStorage` for 30 days; an unexpired first-touch record is not overwritten by later ad visits. When browser storage is unavailable, attribution is limited to the current page. This is browser-local, not a server-side customer profile, and does not follow a visitor across devices or browsers. The Calendly embed receives these values as query parameters. Calendly's handling of `fbclid` in saved booking records is unverified. WhatsApp can append the campaign name to its prefilled message. The live Calendly URL and WhatsApp number are configured in Shopify theme settings and are intentionally omitted from this public source repository.

### Task 4 — public-site tracking audit

Reviewed the public homepage, `/products/velvet-three-piece-suit`, and `/pages/designer-desk` on 14 October 2026. Observed tags included Meta Pixel `1424443661520269`, GA4 `G-0PZD4THN8W` and `G-EE7P2WFDRE`, Google Ads `AW-11039493971`, GTM `GTM-NFWJ77Z`, Microsoft Clarity `tbnjerwj8s`, HubSpot portal `247408262`, and Shopify web pixels. Two Google Ads configuration requests appeared per page for the same Ads ID with different ID formatting; this is a duplicate-configuration risk to investigate, not confirmation of duplicate conversions.

The public source included a Calendly `postMessage` listener that forwarded `calendly_invitee_email` to `dataLayer`; review whether that personal data is necessary and consented before forwarding it to tags. A Calendly `calendly.event_scheduled` event is the appropriate point to consider for a booking Lead, with deduplication by booking/invitee identifier. No actual Meta/GA event payload, deduplication, test booking, form submission, or purchase was validated. Checkout tracking should use Shopify Customer Events/web pixels and respect consent; remove or reconcile older tracking before adding replacement pixels.

### Task 5 — speed and booking review

The mobile PageSpeed Insights report showed 28-day Chrome UX field data: homepage Core Web Vitals failed (LCP 2.6 s, INP 206 ms, CLS 0); the public product page showed origin-level data passing (LCP 1.7 s, INP 148 ms, CLS 0). These are field metrics from the public site, not a lab score for this assignment theme. The report's lab diagnosis was still loading during review.

Prioritized opportunities observed: prevent a timed mobile offer modal from obscuring the booking call to action; standardize booking destinations; correct a mismatched product-gallery image; audit third-party scripts before removing any; and verify mobile image sizing/`srcset` in Network tools. The Designer Desk form also asks for several qualification fields before a consultation. These are recommendations, not changes made to the public merchant site.

## Local development

Use Shopify CLI v3+ from the theme root. Current CLI uses `shopify auth login`; the old `shopify login --store ...` command is unavailable.

```powershell
shopify auth login
shopify theme dev --store addicted-bespoken-demo.myshopify.com
```

The published theme is ID `188152742139`. Prefer an unpublished theme for development and QA. Review the exact changes before pushing to the published theme; Shopify CLI requires `--allow-live` for a live theme push.

## Git workflow (PowerShell)

Run at the repository root and inspect staged changes before committing:

```powershell
git status
git pull --rebase origin main
git add -A
git diff --cached --stat
git status
git commit -m "Update assignment handoff notes"
git push -u origin main
```

Do not commit Shopify access tokens, customer data, or private collaborator credentials. The development storefront password is listed above for assignment review; rotate/remove it when the store no longer needs to be shared.
