# Addicted Bespoken - Tasks 2, 4 and 5

## Task 2 - Keep ad attribution through booking

`assets/addicted-attribution.js` reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, and `fbclid` on any storefront landing page. It stores first-touch values in `localStorage` under `ab_first_touch_attribution_v1` for 30 days, so browsing to another page does not replace them. Once expired, a later tagged visit starts a new window. If storage is unavailable, attribution is limited to the current page. The data is browser-local, not a server-side customer record, and does not follow someone across browsers or devices.

The Style Session page's Calendly URL and global WhatsApp button are configured in Shopify Theme Editor. The lazy-loaded embed receives stored values as URL parameters; Calendly supports the five UTM values, while persistence of `fbclid` in its booking record depends on Calendly. WhatsApp appends `(ref: campaign-name)` when `utm_campaign` exists. These account settings are not included in this public repository. A test booking has not been completed, so end-to-end attribution is still unverified.

## Task 4 - Tracking audit of the public live site

**Reviewed 14 October 2026 (UTC):** homepage, `/products/velvet-three-piece-suit`, and `/pages/designer-desk`, as a public visitor. Cookie banner was present.

### Tag inventory observed on all three pages

| Platform | IDs observed |
| --- | --- |
| Meta Pixel | `1424443661520269` |
| Google Analytics 4 | `G-0PZD4THN8W`, `G-EE7P2WFDRE` |
| Google Ads | `AW-11039493971` |
| Google Tag Manager | `GTM-NFWJ77Z` |
| Microsoft Clarity | `tbnjerwj8s` |
| HubSpot | portal `247408262` |
| Shopify Web Pixels | app pixel `430997722`; custom pixel sandbox `134643930` observed on product |

The site's source includes a Calendly `postMessage` listener that pushes `calendly.*` events and `calendly_invitee_email` into `dataLayer`. That email may be exposed to any GTM tag listening there; remove it unless a documented, consented use requires it. The code alone does not establish that a Meta `Lead` event fires.

**Events and duplication:** two Google Ads `viewthroughconversion` endpoint requests per page referenced the same Ads ID, one using `11039493971` and one `AW-11039493971`, both with `en=gtag.config`. This is a duplicate-configuration risk to check in Network/Tag Assistant, not proof of duplicate conversions. I could not verify Meta/GA event payloads or repeat counts: Meta Pixel Helper and Tag Assistant were not available in this browser and the available developer console did not expose Network requests. Do not treat event names or deduplication as verified until those tools are checked.

**Console findings:** product page raised a Dawn `getComputedStyle` TypeError during slide selection, a duplicate Shopify customer privacy/tracking-consent API warning, a sandboxed `addEventListener` warning, and “Timed out waiting for user consent.” Homepage and Designer Desk also logged the consent timeout. Recheck consent behavior and confirm whether the slide error reproduces in a supported browser.

**Checkout on Shopify Grow:** track checkout with Shopify Customer Events using an app pixel or custom pixel subscribed to standard events such as `checkout_started`, `payment_info_submitted`, and `checkout_completed`. This does not require editing `checkout.liquid`; Plus is required for some checkout-page UI customization, not web-pixel event tracking. Remove older theme/additional-script copies before connecting new pixels and honor consent settings. [Shopify pixels overview](https://help.shopify.com/en/manual/promoting-marketing/pixels/overview), [custom pixel event examples](https://help.shopify.com/en/manual/promoting-marketing/pixels/custom-pixels/code).

**One Meta Lead per Calendly booking:** send Lead only after `calendly.event_scheduled`, not on page view or earlier booking steps. Deduplicate using the invitee/event URI or booking ID; if sending both browser and server events, use the same event ID for platform deduplication. Validate one Lead per test booking in Pixel Helper/Events Manager and Network. Calendly documents `calendly.event_scheduled` as an embed event. [Calendly embed event tracking](https://help.calendly.com/hc/en-us/articles/4412934840087-How-to-track-embed-activity-in-Google-Analytics).

## Task 5 - Mobile speed and booking review

**PageSpeed Insights, Mobile, latest 28-day field data:** homepage Core Web Vitals **failed**: LCP **2.6 s**, INP **206 ms**, CLS **0** (FCP 1.5 s, TTFB 0.7 s). Product page showed origin-level field data and Core Web Vitals **passed**: LCP **1.7 s**, INP **148 ms**, CLS **0** (FCP 1.3 s, TTFB 0.6 s). PSI's lab diagnosis remained loading in this session, so no lab score is claimed.

| Rank | Fix found on the site | Why it may cost bookings | Effort |
| --- | --- | --- | --- |
| 1 | On mobile, the timed “Enter If You Dare” offer modal covers the homepage and dims the storefront. Test the newsletter drawer too; avoid stacking first-visit interruptions and delay offers until the booking CTA is visible. | It obstructs the first impression and the route to a style session. | 2-4 h |
| 2 | Standardize booking links: homepage and Designer Desk use `/pages/style-session`; the product page's “Book a Style Session” points to `/pages/book-a-style-session`. | Different destinations can fragment the booking journey. | 1-2 h |
| 3 | Fix the Velvet Three Piece Suit gallery: one final thumbnail is labelled “Poppy Sunrise Tailored Pantsuit.” Verify/remove the mismatched asset. | An unrelated product image weakens trust in a high-value purchase. | 1-2 h |
| 4 | Audit the app/tag footprint. I counted 57 external script tags on the homepage and Designer Desk and 61 on the product page, including GTM, two GA4 IDs, Ads, Meta, Clarity, HubSpot, PageFly, reviews, affiliate, and video shopping. Defer or remove only integrations proved unused. | Third-party work competes for mobile CPU/network while the homepage field vitals fail. | 3-6 h |
| 5 | Serve gallery images at mobile display dimensions and modern formats. Product images request 1000 px for a 410 px natural display; lazy gallery URLs include widths up to 2025 px. Confirm actual transfer/`srcset` selection in Network before editing. | Oversized transfers can slow product evaluation and booking/cart actions. | 2-4 h |

**Mobile journey:** at a 450 × 764 viewport the timed promotion obscured the homepage. The product page offers Add to cart and a booking link, but its route differs from the other pages. Designer Desk requires country, event date, budget, name, email, phone, and a 50-character message; it says the average response time is 4-6 hours. Consider whether this much qualification is needed before a shopper can start a consultation.

**Limits and assumptions:** the requested Pixel Helper/Tag Assistant event-by-event checks could not be completed because those extensions and the Network panel were unavailable in this browser. This review records loaded scripts, source-level event wiring, PSI field data, visible page content, and console messages actually observed. No form was submitted, and no test booking or purchase was made.
