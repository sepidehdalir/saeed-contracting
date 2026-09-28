# Launch verification — 28 September 2026

## Checks

- ESLint, strict TypeScript, two unit/API tests and the production Next.js build passed.
- All 18 end-to-end checks passed locally. On Vercel, 17 passed initially; the combined resize test timed out in Chromium. Using a fresh browser context per viewport resolved the harness timeout, and that check passed against production in 7.7 seconds.
- All 15 public pages passed automated WCAG 2 A/AA and WCAG 2.1 AA axe checks, title/canonical checks, internal link requests, and narrow/wide overflow checks. Automated checks do not replace assistive-technology user testing.
- Seven homepage widths checked: 375, 390, 430, 768, 1024, 1440 and 1920 pixels. Menu open/close, Escape, navigation, FAQ disclosures, and quote service preselection were verified.
- Quote validation, unsent-email review, sitemap, robots, genuine 404s, hidden future services, and the unconfigured API's safe 503 response passed. Delivery unit tests mock Turnstile and Resend; no real enquiry was sent.
- Production hero image returned HTTP 200 and decoded successfully. Screenshots wait for decoding.
- GitHub Actions passed for the performance build `321fbc5c4e7c1e3eafe6b78b79453be5a23ec058`.

## Launch limitations

The Vercel alias is live. The custom domain is assigned but still points at GoDaddy parking DNS. Direct form delivery is not activated: the connected Resend account reached its domain limit, and a domain-scoped sender key plus Turnstile credentials are still needed. The working launch flow prepares an email for the visitor to send. See [Operations](OPERATIONS.md) for exact setup steps.

No analytics run. Search Console sitemap submission should follow domain activation. No ratings, street address, licence claims or client-project claims were invented. The hero is explicitly identified as an architectural illustration.

## Production Lighthouse

Lighthouse 13.5.0, mobile simulation against `https://saeed-contracting.vercel.app/`, measured performance build `321fbc5`:

| Category       | Score |
| -------------- | ----: |
| Performance    |    97 |
| Accessibility  |   100 |
| Best practices |   100 |
| SEO            |   100 |

FCP 1.0 seconds; LCP 2.3 seconds; total blocking time 140 ms; cumulative layout shift 0. This is one lab run, not field Core Web Vitals. Lighthouse reported a browser-cache clearing timeout, so cache state may have affected the result. The final homepage title refinement does not change page layout or assets.
