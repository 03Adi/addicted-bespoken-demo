# Addicted Bespoken - Tasks 4 and 5

**Public-site review: 14 October 2026 (UTC);** checked the homepage, one men's suit product page, and `/pages/designer-desk` as a visitor. PSI was run in Mobile mode. Cookie banner was present. The site reported its latest 28-day CrUX field data; this is not a Lighthouse lab score.

## Task 4 - Tracking audit

### Observed tag inventory (shared tags on all three pages)

| Platform | IDs observed |
| --- | --- |
| Meta Pixel | `1424443661520269` |
| Google Analytics 4 | `G-0PZD4THN8W`, `G-EE7P2WFDRE` |
| Google Ads | `AW-11039493971` |
| Google Tag Manager | `GTM-NFWJ77Z` |
| Microsoft Clarity | `tbnjerwj8s` |
| HubSpot | portal `247408262` |
| Shopify Web Pixels | app pixel `430997722` on all three; custom pixel sandbox `134643930` observed on product |

The public-page source includes a Calendly `postMessage` listener that pushes `calendly.*` events into `dataLayer`, including `calendly_event_type` and `calendly_invitee_email`. This means the invitee email may reach any GTM tag listening to that layer; remove that field unless a documented, consented use requires it. Calendly's `calendly.event_scheduled` is the suitable completion signal, but I could not verify a Meta `Lead` network hit from the available browser session.

**Event/duplication result:** Google Ads emitted two `viewthroughconversion` configuration requests per page for the same Ads ID, with one URL carrying `11039493971` and another `AW-11039493971`. This is a duplication risk to reconcile in Tag Assistant/Network; it does not by itself prove that a conversion was counted twice. Actual Meta/GA event payloads and repeat counts were **not confirmed**: Meta Pixel Helper and Tag Assistant extensions were not available in this browser, and its developer console access did not expose the Network request log. Do not report event names or deduplication as verified until the Pixel Helper/Tag Assistant and Network panels are checked.

**Console findings:** product page raised a Dawn `getComputedStyle` TypeError during slide selection, a duplicate Shopify customer privacy/tracking-consent API warning, a sandboxed `addEventListener` warning, and a “Timed out waiting for user consent” error. Homepage and Designer Desk also logged the consent-timeout error. Recheck with the browser's normal consent choice and confirm whether the slide error reproduces in a supported browser.

**Checkout on Shopify Grow:** use Shopify Customer Events (an app pixel or custom pixel) and subscribe to standard events such as `checkout_started`, `payment_info_submitted`, and `checkout_completed`. This tracks checkout without editing `checkout.liquid`; Plus is required for some information/shipping/payment-page UI customizations, not for using web pixels. Remove old theme/additional-script tracking before connecting a replacement pixel to avoid double counting. Follow Shopify's consent settings.

**One Meta Lead per Calendly booking:** fire only on the Calendly `calendly.event_scheduled` message, not on the booking-page view or earlier Calendly steps. Deduplicate with the stable invitee/event URI (or booking ID) before calling `fbq('track','Lead')`; use a shared `event_id` if a server event is also sent. Verify one browser Lead in Meta Pixel Helper/Events Manager per test booking and inspect Network for a single matching event. Never forward invitee email as a tag parameter unless consent and the platform's policy explicitly allow it.

## Task 5 - Mobile speed and booking review

**PageSpeed Insights, mobile, latest 28-day field data:** Homepage: Core Web Vitals **failed**, LCP **2.6 s**, INP **206 ms**, CLS **0** (FCP 1.5 s, TTFB 0.7 s). Product page: PSI displayed origin-level field data and Core Web Vitals **passed**, LCP **1.7 s**, INP **148 ms**, CLS **0** (FCP 1.3 s, TTFB 0.6 s). The PSI lab diagnosis stayed in a loading state during this review, so no lab performance score is claimed.

| Rank | Fix found on the site | Why it may cost bookings | Effort |
| --- | --- | --- | --- |
| 1 | On mobile, the homepage's timed “Enter If You Dare” offer modal covers the page and dims the storefront. Test the newsletter drawer as well; avoid stacking first-visit interruptions and delay offers until after the booking CTA is visible. | It blocks the first impression and the route to a style session. | 2-4 h |
| 2 | Standardize booking links: homepage and Designer Desk use `/pages/style-session`, while the product page's “Book a Style Session” points to `/pages/book-a-style-session`. | Different destinations fragment the booking journey and may send shoppers to a different flow. | 1-2 h |
| 3 | Clean the product gallery: the Velvet Three Piece Suit gallery has a final image labelled “Poppy Sunrise Tailored Pantsuit.” Verify/remove that mismatched asset and its thumbnail. | A mismatched garment image undermines confidence in a high-value made-to-measure purchase. | 1-2 h |
| 4 | Review app/tag footprint before loading every integration on every page. I counted 57 external script tags on the homepage and Designer Desk, 61 on the product page; examples include GTM, two GA4 IDs, Google Ads, Meta, Clarity, HubSpot, PageFly, review/affiliate/video apps. Defer or remove only integrations shown to be unused. | Third-party work competes for mobile CPU/network; homepage field vitals currently fail. | 3-6 h |
| 5 | Serve product-gallery images at mobile display sizes and modern formats. The product gallery requests 1000 px images for a 410 px natural display and includes lazy gallery sources up to 2025 px; confirm responsive `srcset`/format selection in Network before changing. | Oversized image transfers can delay product detail and add-to-cart/booking actions on mobile. | 2-4 h |

**Mobile journey observation:** at a 450 × 764 browser viewport, the timed promotion modal obscured the homepage. The product page offers both Add to cart and Book a Style Session, but the booking link differs from the site's other `/pages/style-session` links. Designer Desk's form requires country, event date, budget, name, email, phone, and a 50-character message; the page states a 4-6 hour average response time. Consider whether this qualification load is needed before a customer can begin a consultation.

**Limits/assumptions:** the assignment asks for Pixel Helper and Tag Assistant event-by-event validation. Those extensions and the Network panel were not available here, so the document reports only loaded scripts, source-level event wiring, PSI field metrics, visible UI, and console messages actually observed. No test form was submitted and no purchase/Calendly booking was made.
