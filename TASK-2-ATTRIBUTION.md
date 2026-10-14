# Task 2: Ad attribution through booking

## Implementation

- `assets/addicted-attribution.js` reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, and `fbclid` from the landing-page URL. The script is loaded from `layout/theme.liquid`, so it runs on product pages and every other storefront page, not only the Style Session page.
- The first tagged visit is stored in browser `localStorage` under `ab_first_touch_attribution_v1` for 30 days. Navigation between pages retains that first-touch record. An expired record is removed; the next tagged landing starts a new 30-day window. If a visitor returns from a different ad before expiry, the original record stays in place and the new ad does not overwrite it.
- If storage is unavailable, the script uses the current page's values for that page only; cross-page attribution cannot be guaranteed in that browser session.
- When the marketer adds a Calendly URL in the Style Session section settings, the lazy-loaded iframe receives the stored UTM parameters and `fbclid` as URL query parameters. Calendly documents the five UTM fields; `fbclid` is also passed as a query parameter, but its persistence in Calendly's booking record depends on Calendly's handling of that parameter.
- If the global WhatsApp button is enabled and has a phone number, its prefilled message appends `(ref: campaign-name)` when `utm_campaign` exists. Without a campaign value, it uses the configured base message.

## Assumptions and setup

- This is first-touch attribution for 30 days. A new ad click does not overwrite an unexpired attribution record.
- Attribution stays in the visitor's browser on the current storefront hostname; it is not a server-side customer profile and does not follow the visitor to another browser or device.
- The Calendly URL is currently blank, and the WhatsApp button remains disabled until the store owner supplies their own booking URL and phone number. The implementation is ready for those theme-editor settings.
